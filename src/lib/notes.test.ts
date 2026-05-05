import { describe, expect, it } from "vitest";
import {
  normalizeNoteText,
  NOTE_MAX_LENGTH,
  shouldShowNoteOnWall,
} from "./notes";

describe("normalizeNoteText", () => {
  it("returns null for null input", () => {
    expect(normalizeNoteText(null)).toBe(null);
  });

  it("returns null for undefined input", () => {
    expect(normalizeNoteText(undefined)).toBe(null);
  });

  it("returns null for empty string", () => {
    expect(normalizeNoteText("")).toBe(null);
  });

  it("returns null for whitespace-only string", () => {
    expect(normalizeNoteText("   ")).toBe(null);
    expect(normalizeNoteText("\n\t  \n")).toBe(null);
  });

  it("trims surrounding whitespace from real text", () => {
    expect(normalizeNoteText("  Praying for you  ")).toBe("Praying for you");
  });

  it("preserves internal whitespace", () => {
    expect(normalizeNoteText("Praying  for  you")).toBe("Praying  for  you");
  });

  it("ignores non-string input defensively", () => {
    // @ts-expect-error: testing the runtime guard against bad inputs
    expect(normalizeNoteText(42)).toBe(null);
    // @ts-expect-error: testing the runtime guard against bad inputs
    expect(normalizeNoteText({ note: "x" })).toBe(null);
  });
});

describe("shouldShowNoteOnWall", () => {
  it("returns false when shareWall is false", () => {
    expect(
      shouldShowNoteOnWall({
        completionNote: "Praying for you",
        completionNoteShareWall: false,
      }),
    ).toBe(false);
  });

  it("returns false when note is null (even with shareWall on)", () => {
    expect(
      shouldShowNoteOnWall({
        completionNote: null,
        completionNoteShareWall: true,
      }),
    ).toBe(false);
  });

  it("returns false when note is empty (even with shareWall on)", () => {
    expect(
      shouldShowNoteOnWall({
        completionNote: "",
        completionNoteShareWall: true,
      }),
    ).toBe(false);
  });

  it("returns false when note is whitespace-only (even with shareWall on)", () => {
    expect(
      shouldShowNoteOnWall({
        completionNote: "   ",
        completionNoteShareWall: true,
      }),
    ).toBe(false);
  });

  it("returns true when both conditions hold", () => {
    expect(
      shouldShowNoteOnWall({
        completionNote: "Praying for you",
        completionNoteShareWall: true,
      }),
    ).toBe(true);
  });

  it("returns true with leading/trailing whitespace around real text", () => {
    expect(
      shouldShowNoteOnWall({
        completionNote: "  Praying for you  ",
        completionNoteShareWall: true,
      }),
    ).toBe(true);
  });
});

describe("NOTE_MAX_LENGTH", () => {
  it("is exported as a numeric constant", () => {
    expect(typeof NOTE_MAX_LENGTH).toBe("number");
    expect(NOTE_MAX_LENGTH).toBe(200);
  });
});
