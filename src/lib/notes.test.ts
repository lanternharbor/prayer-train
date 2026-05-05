import { describe, expect, it } from "vitest";
import {
  isNoteIncludedInBouquet,
  isNoteVisibleToOrganizer,
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

describe("shouldShowNoteOnWall (with hidden flag)", () => {
  it("returns false when the organizer has soft-hidden the note", () => {
    // Even with shareWall=true and a real note, a hiddenAt timestamp
    // takes the entry off the public wall. Organizer view uses
    // isNoteVisibleToOrganizer for the unmoderated list.
    expect(
      shouldShowNoteOnWall({
        completionNote: "Praying for you",
        completionNoteShareWall: true,
        completionNoteHiddenAt: new Date("2026-05-05T00:00:00Z"),
      }),
    ).toBe(false);
  });

  it("returns true when hiddenAt is explicitly null and other conditions hold", () => {
    expect(
      shouldShowNoteOnWall({
        completionNote: "Praying for you",
        completionNoteShareWall: true,
        completionNoteHiddenAt: null,
      }),
    ).toBe(true);
  });
});

describe("isNoteVisibleToOrganizer", () => {
  it("returns true even when the note is soft-hidden (organizer needs to see it to unhide)", () => {
    expect(
      isNoteVisibleToOrganizer({
        completionNote: "Hidden by the organizer",
        completionNoteShareWall: true,
      }),
    ).toBe(true);
  });

  it("returns false when shareWall is false (the author chose not to surface it)", () => {
    expect(
      isNoteVisibleToOrganizer({
        completionNote: "Praying for you",
        completionNoteShareWall: false,
      }),
    ).toBe(false);
  });

  it("returns false when note is empty (nothing to moderate)", () => {
    expect(
      isNoteVisibleToOrganizer({
        completionNote: "",
        completionNoteShareWall: true,
      }),
    ).toBe(false);
  });
});

describe("isNoteIncludedInBouquet", () => {
  it("includes notes regardless of shareWall (bouquet is the comprehensive record)", () => {
    expect(
      isNoteIncludedInBouquet({
        completionNote: "Praying for you",
        completionNoteHiddenAt: null,
      }),
    ).toBe(true);
  });

  it("excludes notes the organizer hid", () => {
    // Hiding is a moderation signal; bad-faith content shouldn't end
    // up in the family's printed memorial PDF.
    expect(
      isNoteIncludedInBouquet({
        completionNote: "Inappropriate text",
        completionNoteHiddenAt: new Date("2026-05-05T00:00:00Z"),
      }),
    ).toBe(false);
  });

  it("excludes empty notes", () => {
    expect(
      isNoteIncludedInBouquet({
        completionNote: null,
        completionNoteHiddenAt: null,
      }),
    ).toBe(false);
  });
});

describe("NOTE_MAX_LENGTH", () => {
  it("is exported as a numeric constant", () => {
    expect(typeof NOTE_MAX_LENGTH).toBe("number");
    expect(NOTE_MAX_LENGTH).toBe(200);
  });
});
