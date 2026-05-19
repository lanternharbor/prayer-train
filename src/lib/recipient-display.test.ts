import { describe, expect, it } from "vitest";
import { displayRecipientName } from "./recipient-display";

describe("displayRecipientName", () => {
  it("returns full name when showNames is true", () => {
    expect(
      displayRecipientName({ recipientName: "Mary Smith", showNames: true }),
    ).toBe("Mary Smith");
  });

  it("returns first name when showNames is false", () => {
    expect(
      displayRecipientName({ recipientName: "Mary Smith", showNames: false }),
    ).toBe("Mary");
  });

  it("handles single-token names", () => {
    expect(
      displayRecipientName({ recipientName: "Mary", showNames: false }),
    ).toBe("Mary");
  });

  it("handles multi-part names (returns just the first token)", () => {
    expect(
      displayRecipientName({
        recipientName: "Maria del Carmen García López",
        showNames: false,
      }),
    ).toBe("Maria");
  });

  it("preserves the case of the first token", () => {
    expect(
      displayRecipientName({ recipientName: "mary smith", showNames: false }),
    ).toBe("mary");
  });

  it("trims surrounding whitespace before splitting", () => {
    expect(
      displayRecipientName({
        recipientName: "  Mary Smith  ",
        showNames: false,
      }),
    ).toBe("Mary");
  });

  it("collapses multiple internal spaces correctly", () => {
    expect(
      displayRecipientName({
        recipientName: "Mary   Smith",
        showNames: false,
      }),
    ).toBe("Mary");
  });

  it("falls back to the full name when first token would be empty", () => {
    // Defensive: schema validation should prevent this, but if it
    // somehow happens, return the full name rather than an empty string.
    expect(
      displayRecipientName({ recipientName: "   ", showNames: false }),
    ).toBe("   ");
  });

  it("returns full name with family-style framing intact", () => {
    expect(
      displayRecipientName({
        recipientName: "The Spina Family",
        showNames: true,
      }),
    ).toBe("The Spina Family");
  });

  it("returns 'The' for 'The Spina Family' when showNames false (intended limitation)", () => {
    // The current 2-mode toggle is a starter implementation. A future
    // T3a-v2 may introduce a third 'Family of [LastName]' mode, but
    // for now the helper just returns the first whitespace token.
    expect(
      displayRecipientName({
        recipientName: "The Spina Family",
        showNames: false,
      }),
    ).toBe("The");
  });
});
