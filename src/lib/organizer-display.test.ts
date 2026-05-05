import { describe, expect, it } from "vitest";
import {
  organizerDisplayName,
  organizerFirstName,
} from "./organizer-display";

/**
 * The display helpers are the single boundary that decides whether to
 * render the organizer's name or "Anonymous." Pinning the contract here
 * prevents a regression where a future render site reaches into
 * `train.organizer.name` directly and reintroduces the silent-Anonymous
 * fallback the per-train flag was created to eliminate.
 */

describe("organizerDisplayName", () => {
  it("returns Anonymous when organizerAnonymous is true (regardless of name)", () => {
    expect(
      organizerDisplayName({
        organizerAnonymous: true,
        organizer: { name: "William Keough" },
      }),
    ).toBe("Anonymous");
  });

  it("returns Anonymous when name is null and not anonymous (legacy safety net)", () => {
    // Once the dashboard backfill ships, this path becomes rare.
    // Until then, organizers who created trains via magic-link sign-in
    // still have name=null in the DB and need a graceful fallback.
    expect(
      organizerDisplayName({
        organizerAnonymous: false,
        organizer: { name: null },
      }),
    ).toBe("Anonymous");
  });

  it("returns Anonymous when name is whitespace-only and not anonymous", () => {
    expect(
      organizerDisplayName({
        organizerAnonymous: false,
        organizer: { name: "   " },
      }),
    ).toBe("Anonymous");
  });

  it("returns the trimmed name when present and not anonymous", () => {
    expect(
      organizerDisplayName({
        organizerAnonymous: false,
        organizer: { name: "  William Keough  " },
      }),
    ).toBe("William Keough");
  });
});

describe("organizerFirstName", () => {
  it("returns 'the organizer' when anonymous", () => {
    expect(
      organizerFirstName({
        organizerAnonymous: true,
        organizer: { name: "William Keough" },
      }),
    ).toBe("the organizer");
  });

  it("returns 'the organizer' when name is null", () => {
    expect(
      organizerFirstName({
        organizerAnonymous: false,
        organizer: { name: null },
      }),
    ).toBe("the organizer");
  });

  it("returns 'the organizer' when name is whitespace-only", () => {
    expect(
      organizerFirstName({
        organizerAnonymous: false,
        organizer: { name: "\t  " },
      }),
    ).toBe("the organizer");
  });

  it("returns the first whitespace-delimited word of the name", () => {
    expect(
      organizerFirstName({
        organizerAnonymous: false,
        organizer: { name: "William Keough" },
      }),
    ).toBe("William");
  });

  it("collapses multiple spaces between names", () => {
    expect(
      organizerFirstName({
        organizerAnonymous: false,
        organizer: { name: "  William   Keough  " },
      }),
    ).toBe("William");
  });

  it("returns the only word when there's no whitespace", () => {
    expect(
      organizerFirstName({
        organizerAnonymous: false,
        organizer: { name: "William" },
      }),
    ).toBe("William");
  });
});
