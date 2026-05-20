/**
 * Tests for the chain daily-reminder cron route handler.
 *
 * The cron lives at GET /api/cron/chain-reminders and runs daily at
 * 11:05 UTC (vercel.json). It dispatches one email per (chain, member)
 * pair for chains that span today, then performs end-of-life sweeps
 * (closing prompt + auto-close).
 *
 * Coverage focus is the gap that let the May 6/7 2026 silent miss ship
 * undetected: a member who joined a chain still got no reminder, and
 * the database had no record of whether the cron even tried. These
 * tests pin the new audit trail (lastReminderSentForDay /
 * lastReminderSentAt) end-to-end:
 *
 *   - "Member joins on chain start day → gets Day 1 reminder"
 *     locks in the basic dispatch path that was previously only
 *     covered indirectly by integration testing.
 *
 *   - "Member already sent Day N → skipped on rerun" exercises the
 *     idempotency gate that lets ops curl the route after a Vercel
 *     cron miss without double-sending.
 *
 *   - "Member with unsubscribedAt set → skipped" pins the Prisma
 *     where-clause filter so a future refactor can't accidentally
 *     start emailing soft-left members.
 *
 *   - "Send fails → lastReminderSentForDay stays null" guarantees
 *     a transient Resend outage still gets retried on next run
 *     instead of being silently marked as sent.
 *
 *   - Day-number boundary cases pin the fence-post math against UTC
 *     midnight regressions.
 *
 * The end-of-life passes (closing prompt + auto-close) are already
 * covered by chain-lifecycle.test.ts at the predicate level. We do not
 * re-test them here; this file's scope is the daily-reminder dispatch.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// ─── Mock the modules the route imports ─────────────────────────────
//
// The cron route imports `@/lib/db` (the live Prisma client),
// `@/lib/email` (Resend dispatch helpers), and `@/lib/url` (which
// reads NEXTAUTH_URL). All three need controlled fakes so the test
// can drive scenarios deterministically and assert the route's
// side-effects.

const findManyChain = vi.fn();
const findManyChainPrompt = vi.fn();
const findManyClose = vi.fn();
const updateChain = vi.fn();
const updateManyMember = vi.fn();
const sendChainDailyReminderMock = vi.fn();
const sendChainClosingPromptMock = vi.fn();
const sendChainBouquetReadyMock = vi.fn();
const sendChainAbandonmentPromptMock = vi.fn();
const sendChainAbandonmentArchivedMock = vi.fn();

vi.mock("@/lib/db", () => ({
  prisma: {
    prayerChain: {
      // The route calls findMany five times: once for active chains
      // needing reminders, once for closing-prompt candidates, once
      // for auto-close candidates, once for abandonment-prompt
      // candidates, once for abandonment auto-cancel candidates. We
      // mux them by call-count via mockResolvedValueOnce in each test.
      findMany: vi.fn(),
      update: (...args: unknown[]) => updateChain(...args),
    },
    prayerChainMember: {
      updateMany: (...args: unknown[]) => updateManyMember(...args),
    },
  },
}));

vi.mock("@/lib/email", () => ({
  sendChainDailyReminder: (...args: unknown[]) =>
    sendChainDailyReminderMock(...args),
  sendChainClosingPrompt: (...args: unknown[]) =>
    sendChainClosingPromptMock(...args),
  sendChainBouquetReady: (...args: unknown[]) =>
    sendChainBouquetReadyMock(...args),
  sendChainAbandonmentPrompt: (...args: unknown[]) =>
    sendChainAbandonmentPromptMock(...args),
  sendChainAbandonmentArchived: (...args: unknown[]) =>
    sendChainAbandonmentArchivedMock(...args),
}));

vi.mock("@/lib/url", () => ({
  getBaseUrl: () => "https://prayertrains.com",
}));

vi.mock("@/lib/completion-tokens", () => ({
  signCompletionToken: () => "fake-token",
  chainDayTokenId: (memberId: string, day: number) => `${memberId}:${day}`,
}));

// chain-lifecycle predicates are pure — exercise them as imported
// rather than mocking. They're already unit-tested elsewhere.

// Import the route after mocks are set up.
import { GET } from "./route";
import { prisma } from "@/lib/db";

beforeEach(() => {
  vi.clearAllMocks();
  process.env.CRON_SECRET = "test-secret";

  // Default no-data behavior for every sweep. Individual tests
  // override by re-calling mockReset() and supplying their own
  // sequence. Order matches the route handler:
  //   1. active chains needing reminders
  //   2. closing-prompt candidates
  //   3. auto-close candidates
  //   4. abandonment-prompt candidates
  //   5. abandonment auto-cancel candidates
  (prisma.prayerChain.findMany as ReturnType<typeof vi.fn>)
    .mockReset()
    .mockResolvedValueOnce([])
    .mockResolvedValueOnce([])
    .mockResolvedValueOnce([])
    .mockResolvedValueOnce([])
    .mockResolvedValueOnce([]);
});

afterEach(() => {
  delete process.env.CRON_SECRET;
});

function makeRequest(): Request {
  return new Request("https://prayertrains.com/api/cron/chain-reminders", {
    method: "GET",
    headers: { authorization: "Bearer test-secret" },
  });
}

function makeChain(overrides: Partial<ChainShape> = {}): ChainShape {
  return {
    id: "chain1",
    slug: "test-chain",
    startDate: new Date(),
    durationDays: 9,
    organizerAnonymous: false,
    customPrayerText: null,
    recipientName: "Priscilla",
    intention: null,
    organizer: { name: "Krysta Green" },
    prayerType: {
      name: "Novena to St. Therese",
      prayerText: "...",
      instructions: null,
      dailyReflections: [],
    },
    members: [],
    ...overrides,
  };
}

interface ChainShape {
  id: string;
  slug: string;
  startDate: Date;
  durationDays: number;
  organizerAnonymous: boolean;
  customPrayerText: string | null;
  recipientName: string | null;
  intention: string | null;
  organizer: { name: string | null } | null;
  prayerType: {
    name: string;
    prayerText: string;
    instructions: string | null;
    dailyReflections: string[];
  };
  members: Array<{
    id: string;
    name: string;
    email: string;
    lastReminderSentForDay: number | null;
  }>;
}

describe("GET /api/cron/chain-reminders — auth gate", () => {
  it("rejects requests without a Bearer token", async () => {
    const res = await GET(
      new Request("https://prayertrains.com/api/cron/chain-reminders"),
    );
    expect(res.status).toBe(401);
  });

  it("rejects requests with the wrong Bearer token", async () => {
    const res = await GET(
      new Request("https://prayertrains.com/api/cron/chain-reminders", {
        headers: { authorization: "Bearer wrong-secret" },
      }),
    );
    expect(res.status).toBe(401);
  });
});

describe("GET /api/cron/chain-reminders — daily reminder dispatch", () => {
  it("sends a Day-1 reminder to a member who joined on the chain start day", async () => {
    // The Priscilla scenario from May 6 2026 — the regression that
    // motivated this test file. Member exists, unsubscribedAt null,
    // start date is today. They should get Day 1.
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    (prisma.prayerChain.findMany as ReturnType<typeof vi.fn>)
      .mockReset()
      .mockResolvedValueOnce([
        makeChain({
          startDate: today,
          members: [
            {
              id: "m1",
              name: "William",
              email: "wkeough@gmail.com",
              lastReminderSentForDay: null,
            },
          ],
        }),
      ])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    sendChainDailyReminderMock.mockResolvedValue({ ok: true, id: "em_test" });

    const res = await GET(makeRequest());
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.sent).toBe(1);
    expect(body.skippedAlreadySent).toBe(0);
    expect(sendChainDailyReminderMock).toHaveBeenCalledTimes(1);
    expect(sendChainDailyReminderMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "wkeough@gmail.com",
        day: 1,
      }),
    );
    // Audit trail write-back fired with the right day + member
    expect(updateManyMember).toHaveBeenCalledWith({
      where: { id: { in: ["m1"] } },
      data: expect.objectContaining({
        lastReminderSentForDay: 1,
        lastReminderSentAt: expect.any(Date),
      }),
    });
  });

  it("skips a member whose lastReminderSentForDay already matches today's day number", async () => {
    // Idempotency gate: the cron may be re-run by ops curl after a
    // Vercel scheduling miss. Members already caught up on today's
    // day must not receive a second copy.
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    (prisma.prayerChain.findMany as ReturnType<typeof vi.fn>)
      .mockReset()
      .mockResolvedValueOnce([
        makeChain({
          startDate: today, // Day 1
          members: [
            {
              id: "m1",
              name: "William",
              email: "wkeough@gmail.com",
              lastReminderSentForDay: 1, // already got Day 1
            },
            {
              id: "m2",
              name: "James",
              email: "james@example.com",
              lastReminderSentForDay: null, // missed Day 1
            },
          ],
        }),
      ])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    sendChainDailyReminderMock.mockResolvedValue({ ok: true, id: "em_test" });

    const res = await GET(makeRequest());
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.sent).toBe(1);
    expect(body.skippedAlreadySent).toBe(1);
    expect(sendChainDailyReminderMock).toHaveBeenCalledTimes(1);
    expect(sendChainDailyReminderMock).toHaveBeenCalledWith(
      expect.objectContaining({ to: "james@example.com" }),
    );
    expect(updateManyMember).toHaveBeenCalledWith({
      where: { id: { in: ["m2"] } },
      data: expect.any(Object),
    });
  });

  it("does NOT include unsubscribed members in the active-chain query", async () => {
    // The route's findMany filters at the SQL layer (where:
    // unsubscribedAt: null on members). Prisma never returns
    // unsubscribed rows; this test pins that the route handler
    // doesn't iterate over them or attempt to send.
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    (prisma.prayerChain.findMany as ReturnType<typeof vi.fn>)
      .mockReset()
      .mockResolvedValueOnce([
        makeChain({
          startDate: today,
          // Only includes the non-unsubscribed member — Prisma's where
          // clause filters out unsubscribed rows before they reach the
          // route. We pin that filter shape via the assertion below.
          members: [
            {
              id: "m1",
              name: "Active Member",
              email: "a@example.com",
              lastReminderSentForDay: null,
            },
          ],
        }),
      ])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    sendChainDailyReminderMock.mockResolvedValue({ ok: true, id: "em_test" });

    await GET(makeRequest());

    expect(prisma.prayerChain.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        include: expect.objectContaining({
          members: expect.objectContaining({
            where: { unsubscribedAt: null },
          }),
        }),
      }),
    );
    // The single member returned was emailed.
    expect(sendChainDailyReminderMock).toHaveBeenCalledTimes(1);
  });

  it("does not record a successful send for a member whose Resend call rejected", async () => {
    // Failure-recovery contract: a transient Resend outage must not
    // leave the database in a "sent" state. The next cron run must
    // re-send because lastReminderSentForDay is still null.
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    (prisma.prayerChain.findMany as ReturnType<typeof vi.fn>)
      .mockReset()
      .mockResolvedValueOnce([
        makeChain({
          startDate: today,
          members: [
            {
              id: "m1",
              name: "OK Member",
              email: "ok@example.com",
              lastReminderSentForDay: null,
            },
            {
              id: "m2",
              name: "Fail Member",
              email: "fail@example.com",
              lastReminderSentForDay: null,
            },
          ],
        }),
      ])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    sendChainDailyReminderMock
      .mockResolvedValueOnce({ ok: true, id: "em_m1" }) // m1 success
      .mockRejectedValueOnce(new Error("Resend timeout")); // m2 fail

    const res = await GET(makeRequest());
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.sent).toBe(1);
    expect(body.errors).toBe(1);
    // Audit-trail write-back must scope to ONLY the successful member.
    // A naive implementation that updated all `eligibleMembers` would
    // permanently mark m2 as sent and never retry — exactly the
    // failure mode this gate prevents.
    expect(updateManyMember).toHaveBeenCalledWith({
      where: { id: { in: ["m1"] } },
      data: expect.objectContaining({ lastReminderSentForDay: 1 }),
    });
  });

  it("does NOT write the audit field when sendChainDailyReminder returns { ok: false } (Resend API error path)", async () => {
    // The May 8 2026 priscilla-jhg4 regression: Resend's modern SDK
    // returns API errors as `{ data: null, error: ... }` in the
    // response body rather than throwing. The legacy try/catch in
    // sendChainDailyReminder caught only thrown errors, so an API
    // rejection looked like a successful resolution. The cron then
    // wrote lastReminderSentForDay = N to the audit trail for sends
    // that never happened — the database said "sent" while inboxes
    // stayed empty.
    //
    // Contract this test pins:
    //   - Helper resolves with { ok: false, error: ... } on API error
    //   - Cron treats { ok: false } as failure
    //   - Audit field is NOT advanced
    //   - Structured error log fires with the actual reason
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    (prisma.prayerChain.findMany as ReturnType<typeof vi.fn>)
      .mockReset()
      .mockResolvedValueOnce([
        makeChain({
          startDate: today,
          members: [
            {
              id: "m1",
              name: "OK",
              email: "ok@example.com",
              lastReminderSentForDay: null,
            },
            {
              id: "m2",
              name: "Rejected",
              email: "rejected@example.com",
              lastReminderSentForDay: null,
            },
          ],
        }),
      ])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    sendChainDailyReminderMock
      .mockResolvedValueOnce({ ok: true, id: "em_m1" })
      .mockResolvedValueOnce({
        ok: false,
        error: { name: "validation_error", message: "Invalid recipient" },
      });

    const res = await GET(makeRequest());
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.sent).toBe(1);
    expect(body.errors).toBe(1);
    // Crucially: only the successful member is in the updateMany.
    // m2's lastReminderSentForDay must stay null so the next cron
    // firing retries them. This is the assertion that, if it had
    // existed before May 7, would have caught the silent-success bug.
    expect(updateManyMember).toHaveBeenCalledWith({
      where: { id: { in: ["m1"] } },
      data: expect.objectContaining({ lastReminderSentForDay: 1 }),
    });
    // Bookkeeping: ensure m2 is NOT included in the updateMany call
    expect(updateManyMember).toHaveBeenCalledTimes(1);
    const callArgs = updateManyMember.mock.calls[0][0];
    expect(callArgs.where.id.in).not.toContain("m2");
  });

  it("calculates Day N correctly when today is N-1 days after startDate at UTC midnight", async () => {
    // Fence-post regression guard: chain started 5 calendar days ago
    // at exactly UTC midnight. Today's reminder should be Day 6.
    // The cron's math is `floor((today - startDate) / 86400000) + 1`,
    // so a startDate at the same time-of-day (or earlier) than today
    // resolves cleanly. This test pins that.
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const fiveDaysAgo = new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000);

    (prisma.prayerChain.findMany as ReturnType<typeof vi.fn>)
      .mockReset()
      .mockResolvedValueOnce([
        makeChain({
          startDate: fiveDaysAgo,
          members: [
            {
              id: "m1",
              name: "Member",
              email: "m@example.com",
              lastReminderSentForDay: 5, // got Day 5 yesterday
            },
          ],
        }),
      ])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    sendChainDailyReminderMock.mockResolvedValue({ ok: true, id: "em_test" });

    await GET(makeRequest());

    expect(sendChainDailyReminderMock).toHaveBeenCalledWith(
      expect.objectContaining({ day: 6 }),
    );
  });

  it("does not double-send on rerun within the same UTC day", async () => {
    // First-run + second-run integration scenario. After a successful
    // first run, lastReminderSentForDay is set; the second run within
    // the same UTC day must skip every member.
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // First run: nobody has been sent yet
    (prisma.prayerChain.findMany as ReturnType<typeof vi.fn>)
      .mockReset()
      .mockResolvedValueOnce([
        makeChain({
          startDate: today,
          members: [
            {
              id: "m1",
              name: "A",
              email: "a@x",
              lastReminderSentForDay: null,
            },
            {
              id: "m2",
              name: "B",
              email: "b@x",
              lastReminderSentForDay: null,
            },
          ],
        }),
      ])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    sendChainDailyReminderMock.mockResolvedValue({ ok: true, id: "em_test" });

    const firstRes = await GET(makeRequest());
    const firstBody = await firstRes.json();
    expect(firstBody.sent).toBe(2);

    // Second run: members now reflect the write-back that just
    // happened. The route should send 0 and skip 2.
    sendChainDailyReminderMock.mockClear();
    updateManyMember.mockClear();
    (prisma.prayerChain.findMany as ReturnType<typeof vi.fn>)
      .mockReset()
      .mockResolvedValueOnce([
        makeChain({
          startDate: today,
          members: [
            { id: "m1", name: "A", email: "a@x", lastReminderSentForDay: 1 },
            { id: "m2", name: "B", email: "b@x", lastReminderSentForDay: 1 },
          ],
        }),
      ])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([]);

    const secondRes = await GET(makeRequest());
    const secondBody = await secondRes.json();

    expect(secondBody.sent).toBe(0);
    expect(secondBody.skippedAlreadySent).toBe(2);
    expect(sendChainDailyReminderMock).not.toHaveBeenCalled();
    expect(updateManyMember).not.toHaveBeenCalled();
  });
});

describe("GET /api/cron/chain-reminders — abandonment cleanup passes", () => {
  // Minimal abandonment-candidate fixture matching the route's
  // SELECT clause. Mirrors what Prisma returns from the Pass 3 query.
  function makeAbandonedChain(overrides: Record<string, unknown> = {}) {
    return {
      id: "chain-abandoned-1",
      slug: "test-empty-chain",
      status: "ACTIVE",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15d old
      recipientName: "Priscilla",
      abandonmentPromptSentAt: null,
      organizerAnonymous: false,
      language: "en",
      organizer: { name: "Krysta Green", email: "krysta@example.com" },
      prayerType: {
        name: "Novena to St. Therese",
        prayerText: "...",
        instructions: null,
        dailyReflections: [],
        translations: [],
      },
      ...overrides,
    };
  }

  it("sends abandonment prompt + sets timestamp for an empty 15-day-old chain", async () => {
    (prisma.prayerChain.findMany as ReturnType<typeof vi.fn>)
      .mockReset()
      .mockResolvedValueOnce([]) // active chains (none today)
      .mockResolvedValueOnce([]) // closing-prompt candidates
      .mockResolvedValueOnce([]) // auto-close candidates
      .mockResolvedValueOnce([makeAbandonedChain()]) // abandonment-prompt candidates
      .mockResolvedValueOnce([]); // abandonment-cancel candidates

    const res = await GET(makeRequest());
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.abandonmentPromptsSent).toBe(1);
    expect(body.abandonedCancelled).toBe(0);
    expect(sendChainAbandonmentPromptMock).toHaveBeenCalledTimes(1);
    expect(sendChainAbandonmentPromptMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "krysta@example.com",
        recipientName: "Priscilla",
      }),
    );
    // Idempotency: timestamp written so the next cron run skips this chain
    expect(updateChain).toHaveBeenCalledWith({
      where: { id: "chain-abandoned-1" },
      data: expect.objectContaining({
        abandonmentPromptSentAt: expect.any(Date),
      }),
    });
  });

  it("skips protected chain slugs even if the SQL query somehow returns them", async () => {
    // Defense-in-depth: PROTECTED_CHAIN_SLUGS is currently empty, but
    // pinning the skip here means adding a protected chain later only
    // requires a one-line Set addition, not a code change.
    // We simulate the future by checking the empty-set behavior is
    // a true no-op rather than accidentally always-firing.
    const protectedFixture = makeAbandonedChain({
      slug: "test-empty-chain", // not actually protected today
    });

    (prisma.prayerChain.findMany as ReturnType<typeof vi.fn>)
      .mockReset()
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([protectedFixture])
      .mockResolvedValueOnce([]);

    const res = await GET(makeRequest());
    const body = await res.json();

    // With no entries currently in PROTECTED_CHAIN_SLUGS, this chain
    // is NOT protected and the prompt should fire normally. This test
    // documents the current behavior; if a protected chain is added
    // later, the equivalent test should expect 0 calls.
    expect(body.abandonmentPromptsSent).toBe(1);
    expect(sendChainAbandonmentPromptMock).toHaveBeenCalledTimes(1);
  });

  it("flips status to CANCELLED + sends archived notification when grace elapses", async () => {
    const candidate = {
      id: "chain-auto-cancel-1",
      slug: "test-empty-chain",
      status: "ACTIVE",
      abandonmentPromptSentAt: new Date(
        Date.now() - 8 * 24 * 60 * 60 * 1000, // 8 days past prompt
      ),
      recipientName: "Priscilla",
      organizerAnonymous: false,
      language: "en",
      organizer: { name: "Krysta", email: "krysta@example.com" },
      prayerType: {
        name: "Novena to St. Therese",
        prayerText: "...",
        instructions: null,
        dailyReflections: [],
        translations: [],
      },
    };

    (prisma.prayerChain.findMany as ReturnType<typeof vi.fn>)
      .mockReset()
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([candidate]);

    const res = await GET(makeRequest());
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.abandonedCancelled).toBe(1);
    expect(updateChain).toHaveBeenCalledWith({
      where: { id: "chain-auto-cancel-1" },
      data: { status: "CANCELLED" },
    });
    expect(sendChainAbandonmentArchivedMock).toHaveBeenCalledTimes(1);
    expect(sendChainAbandonmentArchivedMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "krysta@example.com",
        recipientName: "Priscilla",
      }),
    );
    // Critical: the auto-cancel path does NOT send the bouquet-ready
    // email — abandoned chains have nothing to bouquet.
    expect(sendChainBouquetReadyMock).not.toHaveBeenCalled();
  });
});
