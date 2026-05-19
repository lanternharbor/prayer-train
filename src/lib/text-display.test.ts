import { describe, expect, it } from "vitest";
import { cleanDisplayText } from "./text-display";

describe("cleanDisplayText", () => {
  it("returns empty string for null", () => {
    expect(cleanDisplayText(null)).toBe("");
  });

  it("returns empty string for undefined", () => {
    expect(cleanDisplayText(undefined)).toBe("");
  });

  it("returns empty string for empty input", () => {
    expect(cleanDisplayText("")).toBe("");
  });

  it("returns empty string for whitespace-only input", () => {
    expect(cleanDisplayText("   \n\n  ")).toBe("");
  });

  it("trims leading whitespace", () => {
    expect(cleanDisplayText("  hello")).toBe("hello");
  });

  it("trims trailing whitespace", () => {
    expect(cleanDisplayText("hello  ")).toBe("hello");
  });

  it("trims leading and trailing newlines", () => {
    expect(cleanDisplayText("\n\nhello\n\n")).toBe("hello");
  });

  it("collapses 3 blank lines to 2", () => {
    expect(cleanDisplayText("a\n\n\nb")).toBe("a\n\nb");
  });

  it("collapses 5 blank lines to 2", () => {
    expect(cleanDisplayText("a\n\n\n\n\nb")).toBe("a\n\nb");
  });

  it("preserves single paragraph break (2 newlines)", () => {
    expect(cleanDisplayText("a\n\nb")).toBe("a\n\nb");
  });

  it("preserves single line break (1 newline)", () => {
    expect(cleanDisplayText("a\nb")).toBe("a\nb");
  });

  it("preserves regular paragraph text unchanged", () => {
    const prayer = "Lord, we ask for healing.\n\nGrant us your peace.";
    expect(cleanDisplayText(prayer)).toBe(prayer);
  });

  it("preserves typos, capitalization, and punctuation verbatim", () => {
    // The helper must NEVER touch interior content. Lowercased starts,
    // missing apostrophes, mid-sentence typos all stay as the organizer
    // typed them.
    const typoLaced =
      "please pray for our familly. its been a hard yr but were greatful";
    expect(cleanDisplayText(typoLaced)).toBe(typoLaced);
  });

  it("handles mixed whitespace and content", () => {
    // Only outer trim + 3+ blank-line collapse. Interior end-of-line
    // whitespace is preserved (it's content, not surrounding noise).
    expect(
      cleanDisplayText("\n  Lord,\n  hear us.  \n\n\n\nAmen.  "),
    ).toBe("Lord,\n  hear us.  \n\nAmen.");
  });

  it("preserves interior single-space indentation", () => {
    // Internal indentation in the body of the text is preserved; only
    // the leading/trailing edges and 3+ blank-line runs are touched.
    expect(cleanDisplayText("a\n  indented\nback")).toBe("a\n  indented\nback");
  });
});
