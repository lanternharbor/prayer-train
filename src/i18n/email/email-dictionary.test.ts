import { describe, expect, it } from "vitest";
import { getEmailDictionary } from "./index";
import { en } from "./en";
import { es } from "./es";

/**
 * Pin the dictionary loader's contract. The cron + scripts read
 * `PrayerTrain.language` / `PrayerChain.language` directly off the
 * DB, so a stale or invalid value mustn't crash anything — the
 * fallback to English is the safety net.
 */
describe("getEmailDictionary", () => {
  it("returns the English dictionary for language='en'", () => {
    expect(getEmailDictionary("en")).toBe(en);
  });

  it("returns the Spanish dictionary for language='es'", () => {
    expect(getEmailDictionary("es")).toBe(es);
  });

  it("falls back to English for an unsupported locale", () => {
    // A future language code (or a typo on a manual DB update) must
    // not crash the cron. The DB row stays unchanged; only the
    // rendered email degrades to English.
    expect(getEmailDictionary("klingon")).toBe(en);
    expect(getEmailDictionary("")).toBe(en);
  });

  it("Spanish dictionary covers every key the English one declares", () => {
    // Belt-and-suspenders: TypeScript already enforces this via the
    // EnglishEmailDictionary structural type, but pinning at runtime
    // catches the case where a future contributor adds an optional
    // field and forgets to translate it.
    const enKeys = Object.keys(en) as Array<keyof typeof en>;
    for (const k of enKeys) {
      expect(es[k]).toBeDefined();
    }
    // Nested check on trainDaily + chainDaily.
    const trainKeys = Object.keys(en.trainDaily) as Array<
      keyof typeof en.trainDaily
    >;
    for (const k of trainKeys) {
      expect(es.trainDaily[k]).toBeDefined();
    }
    const chainKeys = Object.keys(en.chainDaily) as Array<
      keyof typeof en.chainDaily
    >;
    for (const k of chainKeys) {
      expect(es.chainDaily[k]).toBeDefined();
    }
  });

  it("Spanish dictionary uses the locale-aware recipient phrase prefix", () => {
    // "por" reads more naturally than "para" in Catholic prayer
    // contexts: "rezar POR alguien" / "una novena POR la salud de X".
    expect(es.recipientPhrasePrefix).toBe("por");
    expect(en.recipientPhrasePrefix).toBe("for");
  });
});
