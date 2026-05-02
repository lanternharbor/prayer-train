import { describe, expect, it } from "vitest";
import {
  confirmationMatches,
  isProtectedTrain,
  PROTECTED_SLUGS,
} from "./train-protection";

describe("isProtectedTrain", () => {
  it("returns true for the Spina family slug", () => {
    expect(isProtectedTrain("the-spina-family-dlmm")).toBe(true);
  });

  it("returns false for any other slug", () => {
    expect(isProtectedTrain("any-other-train-slug")).toBe(false);
    expect(isProtectedTrain("the-spina-family")).toBe(false); // close but no match
    expect(isProtectedTrain("the-spina-family-dlmm-2")).toBe(false);
  });

  it("returns false for empty input", () => {
    expect(isProtectedTrain("")).toBe(false);
  });

  it("is case-sensitive (slugs are lowercase by convention)", () => {
    // PROTECTED_SLUGS holds the canonical lowercase form. Slug column
    // is lowercase by generateSlug() convention; capitals shouldn't
    // happen but if they do they're not the protected slug.
    expect(isProtectedTrain("THE-SPINA-FAMILY-DLMM")).toBe(false);
  });

  it("PROTECTED_SLUGS contains the Spina slug", () => {
    expect(PROTECTED_SLUGS.has("the-spina-family-dlmm")).toBe(true);
  });
});

describe("confirmationMatches", () => {
  it("matches exact recipient name", () => {
    expect(confirmationMatches("Kathleen Lubowski", "Kathleen Lubowski")).toBe(
      true,
    );
  });

  it("is case-insensitive", () => {
    expect(confirmationMatches("KATHLEEN LUBOWSKI", "Kathleen Lubowski")).toBe(
      true,
    );
    expect(confirmationMatches("kathleen lubowski", "Kathleen Lubowski")).toBe(
      true,
    );
  });

  it("trims whitespace from typed input and recipient name", () => {
    expect(
      confirmationMatches("  Kathleen Lubowski  ", "Kathleen Lubowski"),
    ).toBe(true);
    expect(
      confirmationMatches("Kathleen Lubowski", "  Kathleen Lubowski  "),
    ).toBe(true);
  });

  it("rejects partial matches", () => {
    expect(confirmationMatches("Kathleen", "Kathleen Lubowski")).toBe(false);
    expect(confirmationMatches("Lubowski", "Kathleen Lubowski")).toBe(false);
    expect(confirmationMatches("Kathleen L", "Kathleen Lubowski")).toBe(false);
  });

  it("rejects empty inputs", () => {
    expect(confirmationMatches("", "Kathleen Lubowski")).toBe(false);
    expect(confirmationMatches("Kathleen Lubowski", "")).toBe(false);
    expect(confirmationMatches("", "")).toBe(false);
  });

  it("rejects whitespace-only inputs", () => {
    expect(confirmationMatches("   ", "Kathleen Lubowski")).toBe(false);
    expect(confirmationMatches("\t\n", "Kathleen Lubowski")).toBe(false);
  });

  it("rejects with extra characters", () => {
    expect(confirmationMatches("Kathleen Lubowski!", "Kathleen Lubowski")).toBe(
      false,
    );
    expect(confirmationMatches("Kathleen Lubowski.", "Kathleen Lubowski")).toBe(
      false,
    );
  });

  it("handles single-name recipients", () => {
    expect(confirmationMatches("Benji", "Benji")).toBe(true);
    expect(confirmationMatches("Bo", "Bo Nix")).toBe(false);
  });
});
