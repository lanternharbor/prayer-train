import { describe, expect, it } from "vitest";
import {
  organizerDisplayName,
  organizerFirstName,
  organizerFirstNameOrNull,
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

/**
 * organizerFirstNameOrNull is the variant that returns null instead
 * of "the organizer" so callers using a possessive construction can
 * drop the whole construction entirely. Pins the contract that null
 * means "drop possessive" — both the anonymous case and the unset-
 * name case need to drop it because either way the rendered output
 * would be "the organizer's Novena ..." (broken or stiff).
 */
describe("organizerFirstNameOrNull", () => {
  it("returns null when organizerAnonymous is true", () => {
    expect(
      organizerFirstNameOrNull({
        organizerAnonymous: true,
        organizer: { name: "William Keough" },
      }),
    ).toBeNull();
  });

  it("returns null when name is null and not anonymous", () => {
    // The case Jilu hit: she chose to be named (organizerAnonymous=false)
    // but her User row has name=null because magic-link sign-in didn't
    // capture a name. Possessive constructions must drop in this case
    // too — they shouldn't fall back to "the organizer's".
    expect(
      organizerFirstNameOrNull({
        organizerAnonymous: false,
        organizer: { name: null },
      }),
    ).toBeNull();
  });

  it("returns null when name is empty after trim", () => {
    expect(
      organizerFirstNameOrNull({
        organizerAnonymous: false,
        organizer: { name: "   " },
      }),
    ).toBeNull();
  });

  it("returns first name when present and not anonymous", () => {
    expect(
      organizerFirstNameOrNull({
        organizerAnonymous: false,
        organizer: { name: "William Keough" },
      }),
    ).toBe("William");
  });

  it("trims and collapses whitespace before splitting", () => {
    expect(
      organizerFirstNameOrNull({
        organizerAnonymous: false,
        organizer: { name: "  William   Keough  " },
      }),
    ).toBe("William");
  });

  it("returns the only word when there's no whitespace", () => {
    expect(
      organizerFirstNameOrNull({
        organizerAnonymous: false,
        organizer: { name: "William" },
      }),
    ).toBe("William");
  });

  it("anonymous overrides a present name (consistent with display contract)", () => {
    // Anonymity is the organizer's deliberate choice; even with a
    // name on the user row, the possessive construction must drop.
    expect(
      organizerFirstNameOrNull({
        organizerAnonymous: true,
        organizer: { name: "William Keough" },
      }),
    ).toBeNull();
  });
});
