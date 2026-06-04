import { describe, expect, it } from "vitest";
import { sanitizeBouquetText, stripEmoji } from "./pdf-text";

describe("stripEmoji", () => {
  it("removes a trailing emoji but keeps the words", () => {
    expect(stripEmoji("Praying for you 🙏")).toBe("Praying for you ");
  });

  it("removes an emoji that carries a variation selector", () => {
    expect(stripEmoji("❤️")).toBe("");
  });

  it("removes flags (regional indicator pairs) and skin-tone modifiers", () => {
    expect(stripEmoji("🇵🇱")).toBe("");
    expect(stripEmoji("👍🏽")).toBe("");
  });

  it("preserves Latin accents and Polish letters (now rendered via embedded EB Garamond)", () => {
    // Critical: a naive non-ASCII strip would corrupt these real names.
    // EB Garamond covers Latin Extended-A, so these must survive intact.
    expect(stripEmoji("María Ángeles")).toBe("María Ángeles");
    expect(stripEmoji("João Łukasz")).toBe("João Łukasz");
  });

  it("preserves digits and punctuation that \\p{Emoji} would wrongly match", () => {
    expect(stripEmoji("Psalm 23 #4 *")).toBe("Psalm 23 #4 *");
  });
});

describe("sanitizeBouquetText", () => {
  it("collapses the gap left by a mid-sentence emoji", () => {
    expect(sanitizeBouquetText("love 🙏 you")).toBe("love you");
  });

  it("trims surrounding whitespace after stripping", () => {
    expect(sanitizeBouquetText("  We love you ❤️  ")).toBe("We love you");
  });

  it("returns empty string for emoji-only input (caller can drop it)", () => {
    expect(sanitizeBouquetText("🙏🙏")).toBe("");
    expect(sanitizeBouquetText("❤️")).toBe("");
  });

  it("is a no-op for ordinary multilingual text", () => {
    expect(sanitizeBouquetText("Sister María Ángeles")).toBe(
      "Sister María Ángeles",
    );
  });

  it("preserves intentional line breaks", () => {
    expect(sanitizeBouquetText("line one\nline two")).toBe("line one\nline two");
  });
});
