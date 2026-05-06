import { describe, expect, it } from "vitest";
import { hasCompleteReflections, reflectionForDay } from "./daily-reflections";

/**
 * The pure lookup helpers in daily-reflections.ts back chain pages,
 * chain daily reminder emails, and the prayer-detail page's per-day
 * disclosure list. Boundary handling has to be airtight — these
 * tests pin off-by-one, partial-fill, and trimming semantics so a
 * future change can't quietly resurrect "Day 0 reflection" or "Day
 * 10 of 9" rendering bugs.
 */

const surrenderNovenaNine = [
  "Day 1 — Why do you confuse yourselves...",
  "Day 2 — More than the disciple...",
  "Day 3 — How many times have I told you...",
  "Day 4 — When you see your affairs in disorder...",
  "Day 5 — But how can I work for you...",
  "Day 6 — When all is given over to me...",
  "Day 7 — Close your eyes and let yourself be carried...",
  "Day 8 — You see the evil getting worse...",
  "Day 9 — Pray always with this attitude of surrender...",
];

describe("reflectionForDay", () => {
  it("returns the day-1 entry from index 0 of a complete novena", () => {
    expect(reflectionForDay(surrenderNovenaNine, 1)).toBe(
      "Day 1 — Why do you confuse yourselves...",
    );
  });

  it("returns the last entry from index N-1 on a 9-day novena", () => {
    expect(reflectionForDay(surrenderNovenaNine, 9)).toBe(
      "Day 9 — Pray always with this attitude of surrender...",
    );
  });

  it("returns the middle entry from a 9-day novena", () => {
    expect(reflectionForDay(surrenderNovenaNine, 5)).toBe(
      "Day 5 — But how can I work for you...",
    );
  });

  it("returns null when dailyReflections is empty (legacy row)", () => {
    // The default state for every existing PrayerType row before any
    // seeding happens. Render callers gate on this null and fall
    // through to prayerText.
    expect(reflectionForDay([], 1)).toBeNull();
    expect(reflectionForDay([], 9)).toBeNull();
  });

  it("returns null for day=0 (off-by-one guard against 0-indexing bugs)", () => {
    expect(reflectionForDay(surrenderNovenaNine, 0)).toBeNull();
  });

  it("returns null for negative day numbers", () => {
    expect(reflectionForDay(surrenderNovenaNine, -1)).toBeNull();
    expect(reflectionForDay(surrenderNovenaNine, -100)).toBeNull();
  });

  it("returns null for non-integer day numbers (e.g., 1.5)", () => {
    expect(reflectionForDay(surrenderNovenaNine, 1.5)).toBeNull();
    expect(reflectionForDay(surrenderNovenaNine, NaN)).toBeNull();
  });

  it("returns null when day exceeds the populated array length", () => {
    // The chain page's day counter clamps at durationDays via the
    // clamp introduced in PR #33. But if a chain ran past its
    // endDate before the clamp landed, day could exceed length.
    // Render still has to be safe.
    expect(reflectionForDay(surrenderNovenaNine, 10)).toBeNull();
    expect(reflectionForDay(surrenderNovenaNine, 100)).toBeNull();
  });

  it("returns null when the entry at the resolved index is empty", () => {
    // Partial fills are a real in-progress state — say someone has
    // populated 5 of 9 and is still drafting. Empty/whitespace
    // entries should fall through rather than render a blank card.
    const partial = ["Day 1 text", "", "   ", "Day 4 text", "Day 5 text"];
    expect(reflectionForDay(partial, 2)).toBeNull();
    expect(reflectionForDay(partial, 3)).toBeNull();
    expect(reflectionForDay(partial, 1)).toBe("Day 1 text");
    expect(reflectionForDay(partial, 4)).toBe("Day 4 text");
  });

  it("trims surrounding whitespace from the returned string", () => {
    const padded = ["  hello world  ", "\n\nday two\n"];
    expect(reflectionForDay(padded, 1)).toBe("hello world");
    expect(reflectionForDay(padded, 2)).toBe("day two");
  });

  it("preserves internal newlines (caller renders white-space: pre-line)", () => {
    const multiline = ["Line one.\nLine two.\n\nLine four."];
    expect(reflectionForDay(multiline, 1)).toBe(
      "Line one.\nLine two.\n\nLine four.",
    );
  });
});

describe("hasCompleteReflections", () => {
  it("returns true when length === daysRequired and every entry is non-empty", () => {
    expect(hasCompleteReflections(surrenderNovenaNine, 9)).toBe(true);
  });

  it("returns false when daysRequired exceeds populated length", () => {
    expect(hasCompleteReflections(surrenderNovenaNine, 10)).toBe(false);
  });

  it("returns false on a fully empty array", () => {
    expect(hasCompleteReflections([], 9)).toBe(false);
    expect(hasCompleteReflections([], 1)).toBe(false);
  });

  it("returns false when daysRequired < 1", () => {
    // Defensive: daysRequired is a positive integer in the schema,
    // but the helper shouldn't blow up on bad input.
    expect(hasCompleteReflections(surrenderNovenaNine, 0)).toBe(false);
    expect(hasCompleteReflections(surrenderNovenaNine, -1)).toBe(false);
  });

  it("returns false on partial fills (some days empty)", () => {
    const partial = ["Day 1", "", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9"];
    expect(hasCompleteReflections(partial, 9)).toBe(false);
  });

  it("returns false when an entry is whitespace-only", () => {
    const partial = ["Day 1", "   ", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9"];
    expect(hasCompleteReflections(partial, 9)).toBe(false);
  });

  it("tolerates over-fills (length > daysRequired)", () => {
    // Hypothetical: an admin fills 10 entries for a 9-day prayer.
    // The helper only checks the first daysRequired entries; the
    // rest are ignored by render code anyway.
    const overfilled = [...surrenderNovenaNine, "Day 10 — bonus"];
    expect(hasCompleteReflections(overfilled, 9)).toBe(true);
  });
});
