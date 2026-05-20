import { describe, expect, it } from "vitest";
import {
  shouldAutoCancelAbandoned,
  shouldAutoClose,
  shouldSendAbandonmentPrompt,
  shouldSendClosingPrompt,
  TRAIN_ABANDONMENT_GRACE_DAYS,
  TRAIN_ABANDONMENT_PROMPT_DAYS,
  TRAIN_AUTO_CLOSE_GRACE_DAYS,
} from "./train-lifecycle";

const TZ = "America/New_York";

/**
 * Train lifecycle predicate tests. Mirrors chain-lifecycle.test.ts
 * but with PAUSED-handling test cases that don't apply to chains
 * (chains have no PAUSED status).
 */

describe("shouldSendClosingPrompt (train)", () => {
  const baseTrain = {
    status: "ACTIVE",
    endDate: new Date("2026-05-23T00:00:00Z"),
    closingPromptSentAt: null,
    organizer: { email: "william@example.com" },
  };

  it("returns true when active + endDate is today + prompt not yet sent + organizer has email", () => {
    const now = new Date("2026-05-23T15:00:00Z");
    expect(shouldSendClosingPrompt(baseTrain, now, TZ)).toBe(true);
  });

  it("returns false when train is PAUSED (organizer chose to stop sign-ups intentionally)", () => {
    const now = new Date("2026-05-23T15:00:00Z");
    expect(
      shouldSendClosingPrompt({ ...baseTrain, status: "PAUSED" }, now, TZ),
    ).toBe(false);
  });

  it("returns false when train is COMPLETED or CANCELLED", () => {
    const now = new Date("2026-05-23T15:00:00Z");
    expect(
      shouldSendClosingPrompt({ ...baseTrain, status: "COMPLETED" }, now, TZ),
    ).toBe(false);
    expect(
      shouldSendClosingPrompt({ ...baseTrain, status: "CANCELLED" }, now, TZ),
    ).toBe(false);
  });

  it("returns false when the prompt has already been sent", () => {
    const now = new Date("2026-05-23T15:00:00Z");
    expect(
      shouldSendClosingPrompt(
        {
          ...baseTrain,
          closingPromptSentAt: new Date("2026-05-23T11:00:00Z"),
        },
        now,
        TZ,
      ),
    ).toBe(false);
  });

  it("returns false when the organizer has no email on file", () => {
    const now = new Date("2026-05-23T15:00:00Z");
    expect(
      shouldSendClosingPrompt(
        { ...baseTrain, organizer: { email: null } },
        now,
        TZ,
      ),
    ).toBe(false);
    expect(
      shouldSendClosingPrompt({ ...baseTrain, organizer: null }, now, TZ),
    ).toBe(false);
  });

  it("returns false the day before endDate", () => {
    const now = new Date("2026-05-22T15:00:00Z");
    expect(shouldSendClosingPrompt(baseTrain, now, TZ)).toBe(false);
  });

  it("returns false the day after endDate", () => {
    const now = new Date("2026-05-24T15:00:00Z");
    expect(shouldSendClosingPrompt(baseTrain, now, TZ)).toBe(false);
  });
});

describe("shouldAutoClose (train)", () => {
  const baseTrain = {
    status: "ACTIVE",
    endDate: new Date("2026-05-23T00:00:00Z"),
  };

  it("returns false when train is PAUSED (must not silently override organizer's pause choice)", () => {
    // 10 days past end, but the organizer paused — auto-close
    // would conflict with their explicit intent to stop sign-ups
    // without ending the train.
    const now = new Date("2026-06-02T15:00:00Z");
    expect(
      shouldAutoClose({ ...baseTrain, status: "PAUSED" }, now, TZ),
    ).toBe(false);
  });

  it("returns false when train is already COMPLETED or CANCELLED", () => {
    const now = new Date("2026-06-02T15:00:00Z");
    expect(
      shouldAutoClose({ ...baseTrain, status: "COMPLETED" }, now, TZ),
    ).toBe(false);
    expect(
      shouldAutoClose({ ...baseTrain, status: "CANCELLED" }, now, TZ),
    ).toBe(false);
  });

  it("returns false on endDate itself (0 days past)", () => {
    const now = new Date("2026-05-23T23:00:00Z");
    expect(shouldAutoClose(baseTrain, now, TZ)).toBe(false);
  });

  it("returns false within the grace period", () => {
    // 7 days past endDate but the threshold is `> 7`, not `>= 7`.
    const now = new Date("2026-05-30T15:00:00Z");
    expect(shouldAutoClose(baseTrain, now, TZ)).toBe(false);
  });

  it("returns true past the grace period", () => {
    // 8 days past — first day the cron should sweep this train.
    const now = new Date("2026-05-31T15:00:00Z");
    expect(shouldAutoClose(baseTrain, now, TZ)).toBe(true);
  });

  it("returns true many days past the grace period (idempotent re-runs)", () => {
    const now = new Date("2026-07-15T15:00:00Z");
    expect(shouldAutoClose(baseTrain, now, TZ)).toBe(true);
  });

  it("respects an overridden grace period", () => {
    // 3 days past endDate; with graceDays=2 it should auto-close.
    const now = new Date("2026-05-26T15:00:00Z");
    expect(shouldAutoClose(baseTrain, now, TZ, 2)).toBe(true);
    // With graceDays=10, should NOT auto-close.
    expect(shouldAutoClose(baseTrain, now, TZ, 10)).toBe(false);
  });
});

describe("TRAIN_AUTO_CLOSE_GRACE_DAYS", () => {
  it("is exported as a numeric constant matching chain default", () => {
    expect(TRAIN_AUTO_CLOSE_GRACE_DAYS).toBe(7);
  });
});

describe("shouldSendAbandonmentPrompt (train)", () => {
  // Default fixture: an unprotected, ACTIVE, 14-day-old, empty train
  // with no prompt sent yet and an organizer email on file. Every
  // condition the predicate cares about is satisfied; tests below flip
  // one field at a time to assert each gate.
  const baseTrain = {
    slug: "test-train-abcd",
    status: "ACTIVE",
    createdAt: new Date("2026-05-05T00:00:00Z"),
    abandonmentPromptSentAt: null,
    organizer: { email: "william@example.com" },
  };
  // Today is exactly 14 days after createdAt — first day the prompt
  // is eligible to fire.
  const now14 = new Date("2026-05-19T15:00:00Z");

  it("returns true on day 14 with zero signups and zero warriors", () => {
    expect(shouldSendAbandonmentPrompt(baseTrain, 0, 0, now14, TZ)).toBe(true);
  });

  it("returns false on day 13 (boundary just before threshold)", () => {
    const now13 = new Date("2026-05-18T15:00:00Z");
    expect(shouldSendAbandonmentPrompt(baseTrain, 0, 0, now13, TZ)).toBe(false);
  });

  it("returns false when train has any signup (claimed slot)", () => {
    expect(shouldSendAbandonmentPrompt(baseTrain, 1, 0, now14, TZ)).toBe(false);
  });

  it("returns false when train has any warrior pledge", () => {
    expect(shouldSendAbandonmentPrompt(baseTrain, 0, 1, now14, TZ)).toBe(false);
  });

  it("returns false when train is PAUSED (organizer halted sign-ups intentionally)", () => {
    expect(
      shouldSendAbandonmentPrompt(
        { ...baseTrain, status: "PAUSED" },
        0,
        0,
        now14,
        TZ,
      ),
    ).toBe(false);
  });

  it("returns false when train is COMPLETED or CANCELLED", () => {
    expect(
      shouldSendAbandonmentPrompt(
        { ...baseTrain, status: "COMPLETED" },
        0,
        0,
        now14,
        TZ,
      ),
    ).toBe(false);
    expect(
      shouldSendAbandonmentPrompt(
        { ...baseTrain, status: "CANCELLED" },
        0,
        0,
        now14,
        TZ,
      ),
    ).toBe(false);
  });

  it("returns false when prompt has already been sent (idempotency)", () => {
    expect(
      shouldSendAbandonmentPrompt(
        {
          ...baseTrain,
          abandonmentPromptSentAt: new Date("2026-05-19T11:00:00Z"),
        },
        0,
        0,
        now14,
        TZ,
      ),
    ).toBe(false);
  });

  it("returns false when organizer has no email on file", () => {
    expect(
      shouldSendAbandonmentPrompt(
        { ...baseTrain, organizer: { email: null } },
        0,
        0,
        now14,
        TZ,
      ),
    ).toBe(false);
    expect(
      shouldSendAbandonmentPrompt(
        { ...baseTrain, organizer: null },
        0,
        0,
        now14,
        TZ,
      ),
    ).toBe(false);
  });

  it("returns false for protected slugs (Spina, Denis Wilson)", () => {
    expect(
      shouldSendAbandonmentPrompt(
        { ...baseTrain, slug: "the-spina-family-dlmm" },
        0,
        0,
        now14,
        TZ,
      ),
    ).toBe(false);
    expect(
      shouldSendAbandonmentPrompt(
        { ...baseTrain, slug: "denis-wilson-hn9g" },
        0,
        0,
        now14,
        TZ,
      ),
    ).toBe(false);
  });

  it("respects an overridden daysSinceCreated threshold", () => {
    // 5 days old, threshold of 3 → eligible
    const now5 = new Date("2026-05-10T15:00:00Z");
    expect(
      shouldSendAbandonmentPrompt(baseTrain, 0, 0, now5, TZ, 3),
    ).toBe(true);
    // 5 days old, threshold of 30 → not eligible
    expect(
      shouldSendAbandonmentPrompt(baseTrain, 0, 0, now5, TZ, 30),
    ).toBe(false);
  });
});

describe("shouldAutoCancelAbandoned (train)", () => {
  // Default fixture: an unprotected, ACTIVE, empty train that received
  // its abandonment prompt 7 days ago. Today is the first day the
  // auto-cancel pass is eligible to fire.
  const baseTrain = {
    slug: "test-train-abcd",
    status: "ACTIVE",
    abandonmentPromptSentAt: new Date("2026-05-12T11:00:00Z"),
  };
  const now7 = new Date("2026-05-19T11:00:00Z");

  it("returns true on day 7 after prompt with zero signups and zero warriors", () => {
    expect(shouldAutoCancelAbandoned(baseTrain, 0, 0, now7, TZ)).toBe(true);
  });

  it("returns false on day 6 (boundary just before grace expires)", () => {
    const now6 = new Date("2026-05-18T11:00:00Z");
    expect(shouldAutoCancelAbandoned(baseTrain, 0, 0, now6, TZ)).toBe(false);
  });

  it("returns false when train picked up any signup since the prompt", () => {
    // The whole point of the grace window: if signups arrive, the
    // train is no longer abandoned and should continue toward endDate.
    expect(shouldAutoCancelAbandoned(baseTrain, 1, 0, now7, TZ)).toBe(false);
  });

  it("returns false when train picked up any warrior since the prompt", () => {
    expect(shouldAutoCancelAbandoned(baseTrain, 0, 1, now7, TZ)).toBe(false);
  });

  it("returns false when train is not ACTIVE (e.g. organizer manually cancelled mid-grace)", () => {
    expect(
      shouldAutoCancelAbandoned(
        { ...baseTrain, status: "CANCELLED" },
        0,
        0,
        now7,
        TZ,
      ),
    ).toBe(false);
  });

  it("returns false when prompt never fired (defense-in-depth)", () => {
    expect(
      shouldAutoCancelAbandoned(
        { ...baseTrain, abandonmentPromptSentAt: null },
        0,
        0,
        now7,
        TZ,
      ),
    ).toBe(false);
  });

  it("returns false for protected slugs", () => {
    expect(
      shouldAutoCancelAbandoned(
        { ...baseTrain, slug: "the-spina-family-dlmm" },
        0,
        0,
        now7,
        TZ,
      ),
    ).toBe(false);
  });
});

describe("TRAIN_ABANDONMENT_PROMPT_DAYS / TRAIN_ABANDONMENT_GRACE_DAYS", () => {
  it("are pinned constants", () => {
    expect(TRAIN_ABANDONMENT_PROMPT_DAYS).toBe(14);
    expect(TRAIN_ABANDONMENT_GRACE_DAYS).toBe(7);
  });
});
