import { describe, expect, it } from "vitest";
import {
  checkNovenaFullyAvailable,
  checkSlotClaimable,
  checkTrainAcceptingClaims,
  checkUpdateCountMatches,
  ERR_NOVENA_NOT_AVAILABLE,
  ERR_SLOT_NOT_AVAILABLE,
  ERR_TRAIN_CANCELLED,
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

  it("does not throw for a PAUSED train (server-side gap is intentional; UI copy says paused but no enforcement here)", () => {
    expect(() => checkTrainAcceptingClaims({ status: "PAUSED" })).not.toThrow();
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
