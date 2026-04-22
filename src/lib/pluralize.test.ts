import { describe, expect, it } from "vitest";
import { pluralize } from "./pluralize";

describe("pluralize", () => {
  it("returns the singular form when count is exactly 1", () => {
    expect(pluralize(1, "Prayer Commitment")).toBe("Prayer Commitment");
  });

  it("returns singular + 's' for count 0 (default plural)", () => {
    expect(pluralize(0, "Active Train")).toBe("Active Trains");
  });

  it("returns singular + 's' for count 2 (default plural)", () => {
    expect(pluralize(2, "Active Train")).toBe("Active Trains");
  });

  it("returns singular + 's' for large counts", () => {
    expect(pluralize(47, "Prayer")).toBe("Prayers");
  });

  it("uses the explicit plural form when provided and count != 1", () => {
    expect(pluralize(2, "goose", "geese")).toBe("geese");
  });

  it("still uses singular when count is 1 even if an explicit plural is provided", () => {
    expect(pluralize(1, "goose", "geese")).toBe("goose");
  });

  it("returns singular + 's' for negative counts (edge case)", () => {
    // Defensive: the function treats any count != 1 as plural. Negative
    // is unlikely but should not produce a surprising result.
    expect(pluralize(-1, "Prayer")).toBe("Prayers");
  });

  it("handles multi-word singulars correctly", () => {
    expect(pluralize(3, "Active Prayer Train")).toBe("Active Prayer Trains");
  });

  it("preserves an empty string singular (defensive)", () => {
    expect(pluralize(1, "")).toBe("");
    expect(pluralize(5, "")).toBe("s");
  });
});
