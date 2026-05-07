import { describe, expect, it } from "vitest";
import { smartTruncate } from "./utils";

/**
 * smartTruncate is the meta-description / OG-description helper that
 * stops the SERP snippet from chopping mid-word. The audit on
 * 2026-05-06 caught a Surrender Novena snippet rendering as
 * "...abandonment to God's wil" because we were doing a hard
 * `s.slice(0, 160)`. These tests pin the word-boundary behavior so a
 * future refactor can't quietly resurrect the mid-word cut.
 */
describe("smartTruncate", () => {
  it("returns the input unchanged when it already fits the budget", () => {
    expect(smartTruncate("hello world", 20)).toBe("hello world");
  });

  it("returns the input unchanged when length === maxChars", () => {
    expect(smartTruncate("exactly20characters!", 20)).toBe(
      "exactly20characters!",
    );
  });

  it("truncates at the last whitespace before the budget", () => {
    // "the quick brown fox jumps over the lazy dog" is 43 chars.
    // Budget 20, so we have 19 chars + ellipsis. The 19-char head
    // is "the quick brown fox" — last space at index 15 ("the quick brown ").
    // Result: "the quick brown" + "…" = 16 chars.
    const r = smartTruncate("the quick brown fox jumps over the lazy dog", 20);
    expect(r).toBe("the quick brown…");
    expect(r.length).toBeLessThanOrEqual(20);
  });

  it("keeps the truncated string + ellipsis within the budget", () => {
    const long = "a".repeat(100) + " " + "b".repeat(100);
    const r = smartTruncate(long, 50);
    expect(r.length).toBeLessThanOrEqual(50);
  });

  it("appends a single ellipsis (U+2026), not three dots", () => {
    const r = smartTruncate("the quick brown fox jumps over the lazy dog", 20);
    expect(r).toMatch(/…$/);
    expect(r).not.toMatch(/\.\.\.$/);
  });

  it("strips trailing punctuation before the ellipsis", () => {
    // "Don Dolindo Ruotolo: 'O Jesus, I surrender myself."
    // At budget 30, the 29-char head is "Don Dolindo Ruotolo: 'O Jesus".
    // Last space before that is at index 21 (after "Ruotolo:"). The
    // helper strips the trailing colon + space before the ellipsis.
    const r = smartTruncate(
      "Don Dolindo Ruotolo: 'O Jesus, I surrender myself.",
      30,
    );
    expect(r).not.toMatch(/[\s,.;:]+…$/);
  });

  it("falls back to a hard cut when no whitespace is in the lookback window", () => {
    // 100-char string with no spaces. Budget 30, lookback 30. No
    // whitespace found in chars [-1, -30] → hard cut + ellipsis.
    const noSpace = "a".repeat(100);
    const r = smartTruncate(noSpace, 30);
    expect(r).toMatch(/^a+…$/);
    expect(r.length).toBeLessThanOrEqual(30);
  });

  it("respects a custom lookback window", () => {
    // "verylongword middle short" — at budget 18, the head is
    // "verylongword midd" (17 chars + 1 reserved for ellipsis).
    // Wide lookback (30) reaches the space at index 12 → courteous
    // truncation at the word boundary. Narrow lookback (4) only
    // searches [13..16] = "midd" — no space found, so the helper
    // falls back to a hard cut.
    const input = "verylongword middle short";
    const wide = smartTruncate(input, 18, 30);
    const narrow = smartTruncate(input, 18, 4);
    expect(wide).toBe("verylongword…");
    expect(narrow).toBe("verylongword midd…");
    expect(narrow).not.toBe(wide);
    expect(narrow.length).toBeLessThanOrEqual(18);
  });

  it("regression guard: the Surrender Novena description case", () => {
    // The actual seed string from prisma/seed.ts. Pre-fix this
    // produced "...abandonment to God's wil" — a mid-word cut. The
    // helper should land at the previous word boundary instead.
    const desc =
      "Based on the words of Don Dolindo Ruotolo: 'O Jesus, I surrender myself to You, take care of everything.' A novena of radical trust and abandonment to God's will.";
    const r = smartTruncate(desc, 160);
    expect(r.length).toBeLessThanOrEqual(160);
    expect(r).toMatch(/…$/);
    // No mid-word "wil" + ellipsis anymore.
    expect(r).not.toMatch(/\bwil…$/);
    // The truncation should land on a complete word.
    const beforeEllipsis = r.slice(0, -1);
    expect(beforeEllipsis).toMatch(/\w$/);
    // And the boundary word should appear in the dictionary form
    // (i.e., the truncation cut at "to" or "abandonment" or similar,
    // not mid-word).
  });

  it("handles strings with newlines as whitespace boundaries", () => {
    const r = smartTruncate(
      "first paragraph here.\nsecond paragraph that is much longer than the budget allows",
      35,
    );
    expect(r.length).toBeLessThanOrEqual(35);
    expect(r).toMatch(/…$/);
  });
});
