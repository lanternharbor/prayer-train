import { describe, expect, it } from "vitest";
import {
  defaultLocale,
  findLocaleCaseInsensitive,
  isLocale,
  locales,
  LOCALE_LABELS,
} from "./config";

/**
 * Pin the locale config contract. These guards are cheap and they
 * catch the kinds of typos that would otherwise silently degrade
 * a locale's UX (e.g., dictionary key drift between the URL prefix
 * and the email loader, or a missing LOCALE_LABELS entry that
 * renders the switcher with `undefined`).
 */
describe("locales", () => {
  it("includes en, es, pt-BR (priority order)", () => {
    expect(locales).toEqual(["en", "es", "pt-BR"]);
  });

  it("defaults to English (the brand's primary audience)", () => {
    expect(defaultLocale).toBe("en");
  });

  it("declares a label in the locale's own language for every locale", () => {
    // Forces the human-readable label to be authored when a new
    // locale lands. "Português" not "Portuguese" — the switcher
    // shows the locale's own name so non-English speakers can find
    // their language without translation chrome.
    for (const l of locales) {
      expect(LOCALE_LABELS[l]).toBeTruthy();
    }
    expect(LOCALE_LABELS.en).toBe("English");
    expect(LOCALE_LABELS.es).toBe("Español");
    expect(LOCALE_LABELS["pt-BR"]).toBe("Português");
  });
});

describe("isLocale", () => {
  it("returns true for supported locales (exact case)", () => {
    expect(isLocale("en")).toBe(true);
    expect(isLocale("es")).toBe(true);
    expect(isLocale("pt-BR")).toBe(true);
  });

  it("returns false on case mismatch (URL routing is strict)", () => {
    // The proxy uses isLocale to decide whether to rewrite. URL
    // casing is canonical BCP 47 — internal links always emit
    // "/pt-BR/..." so the lowercase form lands on the rewrite-to-
    // English-default path. Manually-typed "/pt-br/" would 404;
    // acceptable trade-off, documented in config.ts.
    expect(isLocale("pt-br")).toBe(false);
    expect(isLocale("PT-BR")).toBe(false);
    expect(isLocale("EN")).toBe(false);
  });

  it("returns false for unsupported / nullish input", () => {
    expect(isLocale("klingon")).toBe(false);
    expect(isLocale(undefined)).toBe(false);
    expect(isLocale(null)).toBe(false);
    expect(isLocale("")).toBe(false);
  });
});

describe("findLocaleCaseInsensitive", () => {
  it("returns the canonical-case locale for exact matches", () => {
    expect(findLocaleCaseInsensitive("en")).toBe("en");
    expect(findLocaleCaseInsensitive("es")).toBe("es");
    expect(findLocaleCaseInsensitive("pt-BR")).toBe("pt-BR");
  });

  it("normalizes case differences to the canonical form", () => {
    // The Accept-Language negotiator + the cookie reader both use
    // this helper so a "pt-br" / "PT-BR" tag still resolves to the
    // canonical "pt-BR" key the dictionary loader expects.
    expect(findLocaleCaseInsensitive("pt-br")).toBe("pt-BR");
    expect(findLocaleCaseInsensitive("PT-BR")).toBe("pt-BR");
    expect(findLocaleCaseInsensitive("Pt-Br")).toBe("pt-BR");
    expect(findLocaleCaseInsensitive("EN")).toBe("en");
    expect(findLocaleCaseInsensitive("ES")).toBe("es");
  });

  it("returns null for non-matching input", () => {
    // Macro-tag matching ("pt" → "pt-BR") is NOT this helper's job;
    // that's the Accept-Language negotiator's fallback step. Keep
    // this helper a pure case-insensitive exact lookup so callers
    // can reason about it independently.
    expect(findLocaleCaseInsensitive("pt")).toBe(null);
    expect(findLocaleCaseInsensitive("es-MX")).toBe(null);
    expect(findLocaleCaseInsensitive("klingon")).toBe(null);
    expect(findLocaleCaseInsensitive("")).toBe(null);
    expect(findLocaleCaseInsensitive(null)).toBe(null);
    expect(findLocaleCaseInsensitive(undefined)).toBe(null);
  });
});
