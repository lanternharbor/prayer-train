import { describe, expect, it } from "vitest";
import {
  shouldAutoClose,
  shouldSendClosingPrompt,
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
