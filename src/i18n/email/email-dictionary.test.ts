import { describe, expect, it } from "vitest";
import { getEmailDictionary } from "./index";
import { en } from "./en";
import { es } from "./es";
import { ptBR } from "./pt-BR";
import { fil } from "./fil";
import { pl } from "./pl";

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

  it("returns the Brazilian Portuguese dictionary for language='pt-BR'", () => {
    expect(getEmailDictionary("pt-BR")).toBe(ptBR);
  });

  it("returns the Filipino dictionary for language='fil'", () => {
    expect(getEmailDictionary("fil")).toBe(fil);
  });

  it("returns the Polish dictionary for language='pl'", () => {
    expect(getEmailDictionary("pl")).toBe(pl);
  });

  it("falls back to English for an unsupported locale", () => {
    // A future language code (or a typo on a manual DB update) must
    // not crash the cron. The DB row stays unchanged; only the
    // rendered email degrades to English.
    expect(getEmailDictionary("klingon")).toBe(en);
    expect(getEmailDictionary("")).toBe(en);
  });

  it("falls back to English on case-mismatch ('pt-br' vs canonical 'pt-BR')", () => {
    // The dictionary key is the exact BCP 47 string written by the
    // create flow ("pt-BR"). A lowercase variant from a hand-typed
    // DB row or a stale cookie shouldn't crash; English is the safe
    // fallback. The Accept-Language negotiator handles case
    // normalization upstream so this path is hit rarely in practice.
    expect(getEmailDictionary("pt-br")).toBe(en);
  });

  it("non-English dictionaries cover every key the English one declares", () => {
    // Belt-and-suspenders: TypeScript already enforces this via the
    // EnglishEmailDictionary structural type, but pinning at runtime
    // catches the case where a future contributor adds an optional
    // field and forgets to translate it.
    const enKeys = Object.keys(en) as Array<keyof typeof en>;
    for (const k of enKeys) {
      expect(es[k]).toBeDefined();
      expect(ptBR[k]).toBeDefined();
      expect(fil[k]).toBeDefined();
      expect(pl[k]).toBeDefined();
    }
    // Nested check on trainDaily + chainDaily.
    const trainKeys = Object.keys(en.trainDaily) as Array<
      keyof typeof en.trainDaily
    >;
    for (const k of trainKeys) {
      expect(es.trainDaily[k]).toBeDefined();
      expect(ptBR.trainDaily[k]).toBeDefined();
      expect(fil.trainDaily[k]).toBeDefined();
      expect(pl.trainDaily[k]).toBeDefined();
    }
    const chainKeys = Object.keys(en.chainDaily) as Array<
      keyof typeof en.chainDaily
    >;
    for (const k of chainKeys) {
      expect(es.chainDaily[k]).toBeDefined();
      expect(ptBR.chainDaily[k]).toBeDefined();
      expect(fil.chainDaily[k]).toBeDefined();
      expect(pl.chainDaily[k]).toBeDefined();
    }
  });

  it("uses Catholic devotional register for recipient phrase prefix", () => {
    // Convergent editorial choice across non-English locales:
    //   - es: "por" — "rezar POR alguien"
    //   - pt-BR: "por" — "rezar POR alguém"
    //   - fil: "para kay" — "ipanalangin para kay [name]"
    //   - pl: "za" — "módlmy się ZA N" (devotional preposition;
    //          "dla" would sound transactional / for-the-benefit-of)
    // All read as devotional prayer; the literal "for" / "para" /
    // "dla" forms would feel transactional in each register.
    expect(es.recipientPhrasePrefix).toBe("por");
    expect(ptBR.recipientPhrasePrefix).toBe("por");
    expect(fil.recipientPhrasePrefix).toBe("para kay");
    expect(pl.recipientPhrasePrefix).toBe("za");
    expect(en.recipientPhrasePrefix).toBe("for");
  });
});
