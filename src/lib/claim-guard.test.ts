import { describe, expect, it } from "vitest";
import {
  checkNovenaFullyAvailable,
  checkSlotClaimable,
  checkTrainAcceptingClaims,
  checkUpdateCountMatches,
  ERR_NOVENA_NOT_AVAILABLE,
  ERR_SLOT_NOT_AVAILABLE,
  ERR_TRAIN_CANCELLED,
  ERR_TRAIN_PAUSED,
} from "./claim-guard";

describe("checkSlotClaimable", () => {
  it("does not throw for an OPEN slot", () => {
    expect(() => checkSlotClaimable({ status: "OPEN" })).not.toThrow();
  });

  it("throws for a CLAIMED slot", () => {
    expect(() => checkSlotClaimable({ status: "CLAIMED" })).toThrowError(
      ERR_SLOT_NOT_AVAILABLE,
    );
  });

  it("throws for a COMPLETED slot", () => {
    expect(() => checkSlotClaimable({ status: "COMPLETED" })).toThrowError(
      ERR_SLOT_NOT_AVAILABLE,
    );
  });

  it("throws for a null slot (race lost the row read)", () => {
    expect(() => checkSlotClaimable(null)).toThrowError(
      ERR_SLOT_NOT_AVAILABLE,
    );
  });

  it("throws for any unknown status string", () => {
    expect(() => checkSlotClaimable({ status: "WHATEVER" })).toThrowError(
      ERR_SLOT_NOT_AVAILABLE,
    );
  });
});

describe("checkTrainAcceptingClaims", () => {
  it("does not throw for an ACTIVE train", () => {
    expect(() => checkTrainAcceptingClaims({ status: "ACTIVE" })).not.toThrow();
  });

  it("throws for a PAUSED train (matches the UI promise: 'No new sign-ups while paused')", () => {
    // Closes a previously-known server-side gap: the manage page told
    // the organizer that pausing stops new sign-ups, but the server
    // happily accepted claims anyway. This pin keeps the UI promise
    // and the server contract aligned.
    expect(() => checkTrainAcceptingClaims({ status: "PAUSED" })).toThrowError(
      ERR_TRAIN_PAUSED,
    );
  });

  it("does not throw for a COMPLETED train (no OPEN slots remain by definition)", () => {
    expect(() =>
      checkTrainAcceptingClaims({ status: "COMPLETED" }),
    ).not.toThrow();
  });

  it("throws for a CANCELLED train", () => {
    expect(() => checkTrainAcceptingClaims({ status: "CANCELLED" })).toThrowError(
      ERR_TRAIN_CANCELLED,
    );
  });

  it("uses the pastoral 'will resume when the organizer reactivates' wording for paused", () => {
    // The pause case is recoverable (organizer can hit Activate), so
    // the message tells the volunteer to come back rather than
    // implying finality. Pinning the wording so a future copy edit
    // doesn't accidentally make it sound like CANCELLED.
    try {
      checkTrainAcceptingClaims({ status: "PAUSED" });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "";
      expect(msg).toContain("paused");
      expect(msg).toContain("reactivates");
    }
  });
});

describe("checkNovenaFullyAvailable", () => {
  it("does not throw when all required days are open", () => {
    expect(() => checkNovenaFullyAvailable(9, 9)).not.toThrow();
  });

  it("does not throw when more days than required are open", () => {
    expect(() => checkNovenaFullyAvailable(10, 9)).not.toThrow();
  });

  it("throws when fewer days than required are open", () => {
    expect(() => checkNovenaFullyAvailable(8, 9)).toThrowError(
      ERR_NOVENA_NOT_AVAILABLE,
    );
  });

  it("throws when no days are open", () => {
    expect(() => checkNovenaFullyAvailable(0, 9)).toThrowError(
      ERR_NOVENA_NOT_AVAILABLE,
    );
  });
});

describe("checkUpdateCountMatches", () => {
  it("does not throw when count matches expected", () => {
    expect(() => checkUpdateCountMatches(1, 1)).not.toThrow();
    expect(() => checkUpdateCountMatches(9, 9)).not.toThrow();
  });

  it("throws when fewer rows were updated than expected (race lost)", () => {
    expect(() => checkUpdateCountMatches(0, 1)).toThrowError(
      ERR_SLOT_NOT_AVAILABLE,
    );
    expect(() => checkUpdateCountMatches(8, 9)).toThrowError(
      ERR_SLOT_NOT_AVAILABLE,
    );
  });

  it("throws when more rows were updated than expected (defensive; should never happen but guard catches it)", () => {
    expect(() => checkUpdateCountMatches(2, 1)).toThrowError(
      ERR_SLOT_NOT_AVAILABLE,
    );
  });
});
