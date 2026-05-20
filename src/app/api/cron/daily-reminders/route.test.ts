/**
 * Tests for the train daily-reminder cron route handler — abandonment-
 * cleanup passes only.
 *
 * Coverage focus: the new Pass 3 (abandonment prompt) and Pass 4
 * (abandonment auto-cancel) added for empty trains (zero claimed slots
 * + zero warriors) that never picked up engagement. The pre-existing
 * Pass 1 (closing prompt) and Pass 2 (auto-close past endDate) are
 * covered by the predicates in train-lifecycle.test.ts; this file's
 * scope is wiring the new passes end-to-end through the route handler.
 *
 * The daily-reminder dispatch itself (Pass 0 — per-slot reminders for
 * today's claimed slots) is intentionally not exercised here. That path
 * predates the test file and is covered by integration testing against
 * the Spina train; this file's purpose is to lock in the new code.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const updateTrain = vi.fn();
const sendDailyReminderMock = vi.fn();
const sendTrainClosingPromptMock = vi.fn();
const sendTrainBouquetReadyMock = vi.fn();
const sendTrainAbandonmentPromptMock = vi.fn();
const sendTrainAbandonmentArchivedMock = vi.fn();

vi.mock("@/lib/db", () => ({
  prisma: {
    prayerSlot: {
      findMany: vi.fn().mockResolvedValue([]),
      update: vi.fn(),
    },
    prayerTrain: {
      // Route calls findMany four times in the end-of-life section:
      // closing-prompt candidates, auto-close candidates, abandonment-
      // prompt candidates, abandonment-cancel candidates.
      findMany: vi.fn(),
      update: (...args: unknown[]) => updateTrain(...args),
    },
  },
}));

vi.mock("@/lib/email", () => ({
  sendDailyReminder: (...args: unknown[]) => sendDailyReminderMock(...args),
  sendTrainClosingPrompt: (...args: unknown[]) =>
    sendTrainClosingPromptMock(...args),
  sendTrainBouquetReady: (...args: unknown[]) =>
    sendTrainBouquetReadyMock(...args),
  sendTrainAbandonmentPrompt: (...args: unknown[]) =>
    sendTrainAbandonmentPromptMock(...args),
  sendTrainAbandonmentArchived: (...args: unknown[]) =>
    sendTrainAbandonmentArchivedMock(...args),
}));

vi.mock("@/lib/url", () => ({
  getBaseUrl: () => "https://prayertrains.com",
}));

vi.mock("@/lib/completion-tokens", () => ({
  signCompletionToken: () => "fake-token",
}));

vi.mock("@/lib/prayer-localization", () => ({
  localizePrayer: (base: Record<string, unknown>) => base,
}));

import { GET } from "./route";
import { prisma } from "@/lib/db";

beforeEach(() => {
  vi.clearAllMocks();
  process.env.CRON_SECRET = "test-secret";

  // Default no-data behavior for every sweep. Tests override by
  // re-calling mockReset() with their own sequence. Order:
  //   1. closing-prompt candidates
  //   2. auto-close candidates
  //   3. abandonment-prompt candidates
  //   4. abandonment-cancel candidates
  (prisma.prayerTrain.findMany as ReturnType<typeof vi.fn>)
    .mockReset()
    .mockResolvedValueOnce([])
    .mockResolvedValueOnce([])
    .mockResolvedValueOnce([])
    .mockResolvedValueOnce([]);
});

afterEach(() => {
  delete process.env.CRON_SECRET;
});

function makeRequest(): Request {
  return new Request("https://prayertrains.com/api/cron/daily-reminders", {
    method: "GET",
    headers: { authorization: "Bearer test-secret" },
  });
}

function makeAbandonedTrain(overrides: Record<string, unknown> = {}) {
  return {
    id: "train-abandoned-1",
    slug: "test-empty-train",
    status: "ACTIVE",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15d old
    recipientName: "Shaleen Wilson",
    abandonmentPromptSentAt: null,
    organizerAnonymous: false,
    organizer: { name: "Jilu Chengat", email: "jilu@example.com" },
    ...overrides,
  };
}

describe("GET /api/cron/daily-reminders — auth gate", () => {
  it("rejects requests without a Bearer token", async () => {
    const res = await GET(
      new Request("https://prayertrains.com/api/cron/daily-reminders"),
    );
    expect(res.status).toBe(401);
  });

  it("rejects requests with the wrong Bearer token", async () => {
    const res = await GET(
      new Request("https://prayertrains.com/api/cron/daily-reminders", {
        headers: { authorization: "Bearer wrong" },
      }),
    );
    expect(res.status).toBe(401);
  });
});

describe("GET /api/cron/daily-reminders — abandonment cleanup passes", () => {
  it("sends abandonment prompt + sets timestamp for an empty 15-day-old train", async () => {
    (prisma.prayerTrain.findMany as ReturnType<typeof vi.fn>)
      .mockReset()
      .mockResolvedValueOnce([]) // closing-prompt candidates
      .mockResolvedValueOnce([]) // auto-close candidates
      .mockResolvedValueOnce([makeAbandonedTrain()]) // abandonment-prompt candidates
      .mockResolvedValueOnce([]); // abandonment-cancel candidates

    const res = await GET(makeRequest());
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.abandonmentPromptsSent).toBe(1);
    expect(body.abandonedCancelled).toBe(0);
    expect(sendTrainAbandonmentPromptMock).toHaveBeenCalledTimes(1);
    expect(sendTrainAbandonmentPromptMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "jilu@example.com",
        recipientName: "Shaleen Wilson",
        trainUrl: "https://prayertrains.com/p/test-empty-train",
        trainManageUrl: "https://prayertrains.com/p/test-empty-train/manage",
      }),
    );
    // Idempotency: timestamp written so the next cron run skips this train.
    expect(updateTrain).toHaveBeenCalledWith({
      where: { id: "train-abandoned-1" },
      data: expect.objectContaining({
        abandonmentPromptSentAt: expect.any(Date),
      }),
    });
  });

  it("skips protected train slugs (Spina) even if the SQL query returns them", async () => {
    const protectedFixture = makeAbandonedTrain({
      slug: "the-spina-family-dlmm",
    });

    (prisma.prayerTrain.findMany as ReturnType<typeof vi.fn>)
      .mockReset()
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([protectedFixture])
      .mockResolvedValueOnce([]);

    const res = await GET(makeRequest());
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.abandonmentPromptsSent).toBe(0);
    expect(sendTrainAbandonmentPromptMock).not.toHaveBeenCalled();
    expect(updateTrain).not.toHaveBeenCalled();
  });

  it("flips status to CANCELLED + sends archived notification when grace elapses", async () => {
    const cancelCandidate = {
      id: "train-cancel-1",
      slug: "test-empty-train",
      status: "ACTIVE",
      abandonmentPromptSentAt: new Date(
        Date.now() - 8 * 24 * 60 * 60 * 1000, // 8d past prompt
      ),
      recipientName: "Shaleen Wilson",
      organizerAnonymous: false,
      organizer: { name: "Jilu", email: "jilu@example.com" },
    };

    (prisma.prayerTrain.findMany as ReturnType<typeof vi.fn>)
      .mockReset()
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([cancelCandidate]);

    const res = await GET(makeRequest());
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.abandonedCancelled).toBe(1);
    expect(updateTrain).toHaveBeenCalledWith({
      where: { id: "train-cancel-1" },
      data: { status: "CANCELLED" },
    });
    expect(sendTrainAbandonmentArchivedMock).toHaveBeenCalledTimes(1);
    expect(sendTrainAbandonmentArchivedMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "jilu@example.com",
        recipientName: "Shaleen Wilson",
      }),
    );
    // Crucial: auto-cancel does NOT send the bouquet — these trains
    // have nothing to bouquet.
    expect(sendTrainBouquetReadyMock).not.toHaveBeenCalled();
  });

  it("skips protected slugs in the auto-cancel pass too", async () => {
    const protectedCancel = {
      id: "train-spina-empty",
      slug: "denis-wilson-hn9g",
      status: "ACTIVE",
      abandonmentPromptSentAt: new Date(
        Date.now() - 8 * 24 * 60 * 60 * 1000,
      ),
      recipientName: "Denis Wilson",
      organizerAnonymous: false,
      organizer: { name: "Jilu", email: "jilu@example.com" },
    };

    (prisma.prayerTrain.findMany as ReturnType<typeof vi.fn>)
      .mockReset()
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([protectedCancel]);

    const res = await GET(makeRequest());
    const body = await res.json();

    expect(body.abandonedCancelled).toBe(0);
    expect(updateTrain).not.toHaveBeenCalled();
    expect(sendTrainAbandonmentArchivedMock).not.toHaveBeenCalled();
  });

  it("response payload includes the new counters", async () => {
    const res = await GET(makeRequest());
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body).toHaveProperty("abandonmentPromptsSent");
    expect(body).toHaveProperty("abandonedCancelled");
    expect(body.abandonmentPromptsSent).toBe(0);
    expect(body.abandonedCancelled).toBe(0);
  });
});
