import { describe, expect, it } from "vitest";
import { buildCarryForwardHref } from "./carry-forward-href";
import { ACQUISITION_SOURCES } from "./validation";
import en from "@/i18n/messages/en.json";
import es from "@/i18n/messages/es.json";
import ptBR from "@/i18n/messages/pt-BR.json";
import fil from "@/i18n/messages/fil.json";
import pl from "@/i18n/messages/pl.json";

describe("buildCarryForwardHref", () => {
  it("appends only ?from= when no prayer slug is given", () => {
    expect(buildCarryForwardHref("/create/train", "completion")).toBe(
      "/create/train?from=completion",
    );
    expect(buildCarryForwardHref("/chain/new", "completed-train")).toBe(
      "/chain/new?from=completed-train",
    );
  });

  it("composes prayerType before from when a slug is given", () => {
    expect(
      buildCarryForwardHref("/create/train", "completion", "surrender-novena"),
    ).toBe("/create/train?prayerType=surrender-novena&from=completion");
  });

  it("uses from values that the create schema will accept (round-trip)", () => {
    // Every from value the CTA emits must be a known acquisition source,
    // or it would silently clamp to "organic" and the loop would look
    // dead in the admin rollup.
    for (const source of ["completion", "completed-train", "guestbook"]) {
      const href = buildCarryForwardHref("/create/train", source);
      const from = new URL(href, "https://x").searchParams.get("from");
      expect((ACQUISITION_SOURCES as readonly string[]).includes(from!)).toBe(
        true,
      );
    }
  });
});

describe("carry-forward copy (all 5 locales)", () => {
  const locales = { en, es, "pt-BR": ptBR, fil, pl } as const;
  const ctaKeys = [
    "trainHeading",
    "trainBody",
    "trainCta",
    "chainHeading",
    "chainBody",
    "chainCta",
  ];
  const guestbookKeys = ["postedThanks", "carryForwardPrompt", "carryForwardCta"];

  for (const [name, dict] of Object.entries(locales)) {
    it(`${name}: carryForwardCta + guestbook keys present`, () => {
      const cta = (dict as Record<string, Record<string, string>>)
        .carryForwardCta;
      const guestbook = (dict as Record<string, Record<string, string>>)
        .guestbook;
      for (const k of ctaKeys) expect(cta[k]).toBeTruthy();
      for (const k of guestbookKeys) expect(guestbook[k]).toBeTruthy();
    });

    it(`${name}: new copy contains no em dashes (William's house rule)`, () => {
      const cta = (dict as Record<string, Record<string, string>>)
        .carryForwardCta;
      const guestbook = (dict as Record<string, Record<string, string>>)
        .guestbook;
      const strings = [
        ...ctaKeys.map((k) => cta[k]),
        ...guestbookKeys.map((k) => guestbook[k]),
      ];
      for (const s of strings) expect(s).not.toContain("—");
    });
  }
});
