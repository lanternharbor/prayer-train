/**
 * Tests for the dispatchEmail contract — exercised through the public
 * sendChainDailyReminder helper, since dispatchEmail itself is private
 * to email.ts.
 *
 * The contract this file pins:
 *
 *   - When Resend SDK responds with `{ data: ..., error: null }`,
 *     the helper returns `{ ok: true, id }`.
 *   - When Resend SDK responds with `{ data: null, error: ... }`
 *     (the API-error path that the legacy try/catch was blind to),
 *     the helper returns `{ ok: false, error }`. This is the path
 *     that caused the May 8 2026 priscilla-jhg4 silent failure.
 *   - When the SDK throws (network, fetch, programmer error), the
 *     helper catches and returns `{ ok: false, error }` rather than
 *     letting the exception escape.
 *   - When the SDK returns a malformed response (no id on success),
 *     the helper treats it as failure rather than phantom success.
 *
 * Why this lives in a separate file from email.test.ts: email.test.ts
 * is render-helper-focused and uses no mocks. dispatchEmail tests
 * require mocking the Resend SDK at the module level, which would
 * change the test file's shape entirely.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const sendMock = vi.fn();

vi.mock("resend", () => ({
  Resend: class {
    emails = {
      send: (...args: unknown[]) => sendMock(...args),
    };
  },
}));

beforeEach(() => {
  // The lazy resend client in email.ts caches across calls. Resetting
  // the module-level cache requires reimporting; vi.resetModules() at
  // the test boundary handles this. Combined with RESEND_API_KEY set
  // to a non-empty value so getResend() takes the real-client branch
  // (which our mock intercepts via vi.mock("resend") above).
  vi.resetModules();
  process.env.RESEND_API_KEY = "test-key";
  sendMock.mockReset();
});

afterEach(() => {
  delete process.env.RESEND_API_KEY;
});

const baseInput = {
  to: "test@example.com",
  memberName: "Test Member",
  organizerName: "Krysta",
  prayerName: "Novena to St. Therese",
  prayerText: "...",
  prayerInstructions: null,
  recipientName: "Priscilla",
  intention: "her healing",
  day: 1,
  durationDays: 9,
  chainUrl: "https://prayertrains.com/chain/test",
  markCompleteUrl: "https://prayertrains.com/chain/test/complete",
  unsubscribeUrl: "https://prayertrains.com/api/chain/unsubscribe?id=m1",
  otherMembersCount: 4,
};

describe("sendChainDailyReminder — EmailDispatchResult contract", () => {
  it("returns { ok: true, id } when Resend resolves with data + null error", async () => {
    sendMock.mockResolvedValueOnce({
      data: { id: "em_abc123" },
      error: null,
    });
    const { sendChainDailyReminder } = await import("./email");

    const result = await sendChainDailyReminder(baseInput);

    expect(result).toEqual({ ok: true, id: "em_abc123" });
    expect(sendMock).toHaveBeenCalledTimes(1);
  });

  it("returns { ok: false } when Resend resolves with an error body (the May 8 2026 priscilla regression path)", async () => {
    // This is the failure mode the legacy try/catch was blind to:
    // Resend returns errors via the response body, not by throwing.
    // Pre-fix: the helper resolved with undefined and the cron read
    // it as success, writing lastReminderSentForDay even though no
    // email was sent. Post-fix: helper returns { ok: false } so the
    // cron skips the audit-trail write.
    const errorBody = {
      name: "validation_error",
      message: "Invalid `to` field — recipient suppressed",
    };
    sendMock.mockResolvedValueOnce({ data: null, error: errorBody });
    const { sendChainDailyReminder } = await import("./email");

    const result = await sendChainDailyReminder(baseInput);

    expect(result).toEqual({ ok: false, error: errorBody });
  });

  it("returns { ok: false } when the Resend SDK itself throws", async () => {
    // Network failure, fetch error, JSON parse failure, etc.
    // The legacy try/catch caught these but swallowed them silently;
    // the new contract surfaces them via the result shape so callers
    // can distinguish success from failure without grep-ing logs.
    const thrown = new Error("ECONNREFUSED");
    sendMock.mockRejectedValueOnce(thrown);
    const { sendChainDailyReminder } = await import("./email");

    const result = await sendChainDailyReminder(baseInput);

    expect(result).toEqual({ ok: false, error: thrown });
  });

  it("returns { ok: false } when Resend resolves with no id (defensive)", async () => {
    // Belt-and-suspenders: if the SDK's contract drifts or our
    // dev-mode no-key stub returns { data: null, error: null }, we
    // should NOT pretend the send succeeded. Otherwise a
    // misconfigured environment would advance the audit trail
    // without any email actually leaving the network.
    sendMock.mockResolvedValueOnce({ data: null, error: null });
    const { sendChainDailyReminder } = await import("./email");

    const result = await sendChainDailyReminder(baseInput);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(String(result.error)).toContain("no id");
    }
  });
});
