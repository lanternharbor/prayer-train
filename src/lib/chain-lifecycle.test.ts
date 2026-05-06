import { describe, expect, it } from "vitest";
import {
  AUTO_CLOSE_GRACE_DAYS,
  shouldAutoClose,
  shouldSendClosingPrompt,
} from "./chain-lifecycle";

const TZ = "America/New_York";

/**
 * Pin the chain end-of-life cron predicates. Both predicates are the
 * final guard between "the SQL query returned a row" and "we're
 * about to send an email or mutate state" — exact behavior matters
 * for idempotency and to prevent silent edge cases (e.g., double-
 * sending the closing prompt, auto-closing before the grace period).
 */

describe("shouldSendClosingPrompt", () => {
  const baseChain = {
    status: "ACTIVE",
    endDate: new Date("2026-05-05T00:00:00Z"),
    closingPromptSentAt: null,
    organizer: { email: "william@example.com" },
  };

  it("returns true when active + endDate is today + prompt not yet sent + organizer has email", () => {
    // 2026-05-05 in America/New_York. The chain ends today.
    const now = new Date("2026-05-05T15:00:00Z");
    expect(shouldSendClosingPrompt(baseChain, now, TZ)).toBe(true);
  });

  it("returns false when chain is not ACTIVE", () => {
    const now = new Date("2026-05-05T15:00:00Z");
    expect(
      shouldSendClosingPrompt({ ...baseChain, status: "COMPLETED" }, now, TZ),
    ).toBe(false);
    expect(
      shouldSendClosingPrompt({ ...baseChain, status: "CANCELLED" }, now, TZ),
    ).toBe(false);
  });

  it("returns false when the prompt has already been sent", () => {
    const now = new Date("2026-05-05T15:00:00Z");
    // Idempotency guard — re-running the cron the same day must
    // not re-send the prompt.
    expect(
      shouldSendClosingPrompt(
        { ...baseChain, closingPromptSentAt: new Date("2026-05-05T11:05:00Z") },
        now,
        TZ,
      ),
    ).toBe(false);
  });

  it("returns false when the organizer has no email on file", () => {
    const now = new Date("2026-05-05T15:00:00Z");
    expect(
      shouldSendClosingPrompt(
        { ...baseChain, organizer: { email: null } },
        now,
        TZ,
      ),
    ).toBe(false);
    expect(
      shouldSendClosingPrompt({ ...baseChain, organizer: null }, now, TZ),
    ).toBe(false);
  });

  it("returns false the day before endDate", () => {
    // Chain still has one day to go — premature.
    const now = new Date("2026-05-04T15:00:00Z");
    expect(shouldSendClosingPrompt(baseChain, now, TZ)).toBe(false);
  });

  it("returns false the day after endDate", () => {
    // The closing-prompt is one-shot on the last day. After that
    // it's the auto-close cron's job (after the grace period).
    const now = new Date("2026-05-06T15:00:00Z");
    expect(shouldSendClosingPrompt(baseChain, now, TZ)).toBe(false);
  });
});

describe("shouldAutoClose", () => {
  const baseChain = {
    status: "ACTIVE",
    endDate: new Date("2026-05-05T00:00:00Z"),
  };

  it("returns false when chain is already not ACTIVE", () => {
    const now = new Date("2026-05-15T15:00:00Z"); // 10 days past end
    expect(
      shouldAutoClose({ ...baseChain, status: "COMPLETED" }, now, TZ),
    ).toBe(false);
    expect(
      shouldAutoClose({ ...baseChain, status: "CANCELLED" }, now, TZ),
    ).toBe(false);
  });

  it("returns false on endDate itself (0 days past)", () => {
    const now = new Date("2026-05-05T23:00:00Z");
    expect(shouldAutoClose(baseChain, now, TZ)).toBe(false);
  });

  it("returns false within the grace period", () => {
    // 7 days past endDate but the threshold is `> 7`, not `>= 7`.
    const now = new Date("2026-05-12T15:00:00Z");
    expect(shouldAutoClose(baseChain, now, TZ)).toBe(false);
  });

  it("returns true past the grace period", () => {
    // 8 days past — first day the cron should sweep this chain.
    const now = new Date("2026-05-13T15:00:00Z");
    expect(shouldAutoClose(baseChain, now, TZ)).toBe(true);
  });

  it("returns true many days past the grace period (idempotent re-runs)", () => {
    // The chain was somehow missed (cron outage, etc.) — auto-close
    // still fires on the next successful run.
    const now = new Date("2026-06-15T15:00:00Z");
    expect(shouldAutoClose(baseChain, now, TZ)).toBe(true);
  });

  it("respects an overridden grace period", () => {
    // 3 days past endDate; with graceDays=2 it should auto-close.
    const now = new Date("2026-05-08T15:00:00Z");
    expect(shouldAutoClose(baseChain, now, TZ, 2)).toBe(true);
    // With graceDays=10 (longer than default), should NOT auto-close.
    expect(shouldAutoClose(baseChain, now, TZ, 10)).toBe(false);
  });
});

describe("AUTO_CLOSE_GRACE_DAYS", () => {
  it("is exported as a numeric constant", () => {
    // Pinned so docs / cron logic / tests stay in sync. Changing
    // the default is a deliberate product call, not a side-effect.
    expect(AUTO_CLOSE_GRACE_DAYS).toBe(7);
  });
});
