import { describe, expect, it } from "vitest";
import { localizePrayer } from "./prayer-localization";
import type {
  PrayerType,
  PrayerTypeTranslation,
} from "@/generated/prisma/client";

/**
 * Pin the field-by-field fallback contract for the prayer-content
 * localization helper. The DB-touching variants (getLocalizedPrayerBySlug,
 * getLocalizedPrayersMany) are not unit-tested here — they're thin
 * wrappers over Prisma queries; their behavior is the localizePrayer
 * merge applied to the query result.
 *
 * Critical properties pinned:
 *   1. English locale always returns base (no DB lookup)
 *   2. Unreviewed translation (reviewedAt: null) is ignored
 *   3. Reviewed translation overrides field-by-field; nulls fall back
 *   4. dailyReflections falls back when length === 0
 *   5. _translationLocale marker is set correctly
 *
 * These properties are the editorial gate. If they break, an
 * unreviewed prayer text could reach real users.
 */

// ─── Test fixtures ──────────────────────────────────────────────

const baseSacredHeart: PrayerType = {
  id: "pt_sacred_heart",
  slug: "novena-sacred-heart",
  name: "Novena to the Sacred Heart",
  category: "NOVENA",
  description:
    "A nine-day novena honoring the Sacred Heart of Jesus, offered for healing and trust.",
  instructions: "Pray once daily for nine days.",
  prayerText: "O most holy heart of Jesus, fountain of every blessing…",
  dailyReflections: [],
  duration: 5,
  difficulty: "BEGINNER",
  daysRequired: 9,
  patronSaint: "Sacred Heart of Jesus",
  feastDay: "Friday after the Second Sunday after Pentecost",
  situationTags: ["ILLNESS", "GRIEF"],
  imageUrl: null,
  sourceUrl: null,
  createdAt: new Date("2026-04-01"),
};

const baseSurrender: PrayerType = {
  ...baseSacredHeart,
  id: "pt_surrender",
  slug: "surrender-novena",
  name: "Surrender Novena",
  description:
    "Nine days of trust in Christ, written by Servant of God Don Dolindo Ruotolo.",
  dailyReflections: [
    "Day 1: Why do you confuse yourselves by worrying?",
    "Day 2: How many things I do for those who surrender to Me…",
    "Day 3: …",
    "Day 4: …",
    "Day 5: …",
    "Day 6: …",
    "Day 7: …",
    "Day 8: …",
    "Day 9: …",
  ],
  patronSaint: "Don Dolindo Ruotolo",
};

function buildTranslation(
  overrides: Partial<PrayerTypeTranslation>,
): PrayerTypeTranslation {
  return {
    id: "ptt_test",
    prayerTypeId: baseSacredHeart.id,
    locale: "es",
    name: null,
    description: null,
    prayerText: null,
    instructions: null,
    dailyReflections: [],
    patronSaint: null,
    feastDay: null,
    source: null,
    reviewerNote: null,
    reviewedAt: null,
    createdAt: new Date("2026-05-14"),
    updatedAt: new Date("2026-05-14"),
    ...overrides,
  };
}

// ─── Tests ──────────────────────────────────────────────────────

describe("localizePrayer — English path", () => {
  it("returns base unchanged when locale === 'en'", () => {
    const out = localizePrayer(baseSacredHeart, [], "en");
    expect(out.name).toBe(baseSacredHeart.name);
    expect(out.description).toBe(baseSacredHeart.description);
    expect(out._translationLocale).toBeNull();
  });

  it("returns base unchanged when locale is empty string", () => {
    const out = localizePrayer(baseSacredHeart, [], "");
    expect(out.name).toBe(baseSacredHeart.name);
    expect(out._translationLocale).toBeNull();
  });

  it("ignores translations on the English path (no lookup)", () => {
    // Even if a Spanish reviewed translation is passed in, the helper
    // doesn't apply it when locale === 'en'. Defensive: prevents an
    // upstream caller bug from leaking Spanish content into the
    // English path.
    const t = buildTranslation({
      locale: "es",
      name: "Novena al Sagrado Corazón",
      reviewedAt: new Date("2026-05-14"),
    });
    const out = localizePrayer(baseSacredHeart, [t], "en");
    expect(out.name).toBe(baseSacredHeart.name);
    expect(out._translationLocale).toBeNull();
  });
});

describe("localizePrayer — review gate", () => {
  it("ignores translations with reviewedAt === null", () => {
    // The editorial gate: unreviewed translations sit safely in the
    // DB but DO NOT go live. This is the single most important
    // invariant — if it breaks, unreviewed prayer text could reach
    // real users.
    const t = buildTranslation({
      locale: "es",
      name: "Novena al Sagrado Corazón",
      description: "Spanish description text that hasn't been reviewed yet.",
      prayerText: "Spanish prayer text that hasn't been reviewed yet.",
      reviewedAt: null,
    });
    const out = localizePrayer(baseSacredHeart, [t], "es");
    expect(out.name).toBe(baseSacredHeart.name);
    expect(out.description).toBe(baseSacredHeart.description);
    expect(out.prayerText).toBe(baseSacredHeart.prayerText);
    expect(out._translationLocale).toBeNull();
  });

  it("ignores translations whose locale doesn't match the request", () => {
    // A reviewed pt-BR translation should not surface for an "es"
    // request. Prisma's where clause filters this upstream, but the
    // pure helper also guards (defensive: prevents an upstream caller
    // bug from showing Portuguese content to Spanish visitors).
    const t = buildTranslation({
      locale: "pt-BR",
      name: "Novena ao Sagrado Coração",
      reviewedAt: new Date("2026-05-14"),
    });
    const out = localizePrayer(baseSacredHeart, [t], "es");
    expect(out.name).toBe(baseSacredHeart.name);
    expect(out._translationLocale).toBeNull();
  });

  it("ignores translations from other locales when both are present", () => {
    const reviewed_es = buildTranslation({
      locale: "es",
      name: "Novena al Sagrado Corazón",
      reviewedAt: new Date("2026-05-14"),
    });
    const reviewed_ptBR = buildTranslation({
      locale: "pt-BR",
      name: "Novena ao Sagrado Coração",
      reviewedAt: new Date("2026-05-14"),
    });
    const outES = localizePrayer(
      baseSacredHeart,
      [reviewed_es, reviewed_ptBR],
      "es",
    );
    expect(outES.name).toBe("Novena al Sagrado Corazón");
    expect(outES._translationLocale).toBe("es");

    const outPT = localizePrayer(
      baseSacredHeart,
      [reviewed_es, reviewed_ptBR],
      "pt-BR",
    );
    expect(outPT.name).toBe("Novena ao Sagrado Coração");
    expect(outPT._translationLocale).toBe("pt-BR");
  });
});

describe("localizePrayer — field-by-field fallback", () => {
  it("applies all non-null translation fields", () => {
    const t = buildTranslation({
      locale: "es",
      name: "Novena al Sagrado Corazón",
      description: "Una novena de nueve días al Sagrado Corazón de Jesús.",
      prayerText: "Oh, Sagrado Corazón de Jesús, fuente de toda bendición…",
      instructions: "Reza una vez al día durante nueve días.",
      patronSaint: "Sagrado Corazón de Jesús",
      feastDay: "Viernes después del segundo domingo después de Pentecostés",
      reviewedAt: new Date("2026-05-14"),
    });
    const out = localizePrayer(baseSacredHeart, [t], "es");
    expect(out.name).toBe("Novena al Sagrado Corazón");
    expect(out.description).toContain("nueve días");
    expect(out.prayerText).toContain("Oh, Sagrado Corazón");
    expect(out.instructions).toContain("Reza una vez al día");
    expect(out.patronSaint).toBe("Sagrado Corazón de Jesús");
    expect(out.feastDay).toContain("Pentecostés");
    expect(out._translationLocale).toBe("es");
  });

  it("falls back per field when a field is null in the translation", () => {
    // Permissive partial-translation contract: a translator can ship
    // name + description first; prayerText falls back to English
    // until that's also translated and reviewed.
    const t = buildTranslation({
      locale: "es",
      name: "Novena al Sagrado Corazón",
      description: "Una novena de nueve días.",
      // prayerText / instructions / patronSaint / feastDay all left null
      reviewedAt: new Date("2026-05-14"),
    });
    const out = localizePrayer(baseSacredHeart, [t], "es");
    expect(out.name).toBe("Novena al Sagrado Corazón");
    expect(out.description).toBe("Una novena de nueve días.");
    // English fallback for the un-translated fields:
    expect(out.prayerText).toBe(baseSacredHeart.prayerText);
    expect(out.instructions).toBe(baseSacredHeart.instructions);
    expect(out.patronSaint).toBe(baseSacredHeart.patronSaint);
    expect(out.feastDay).toBe(baseSacredHeart.feastDay);
    // Marker still set — partial translation IS a translation.
    expect(out._translationLocale).toBe("es");
  });

  it("preserves non-translatable base fields (slug, category, duration, etc.)", () => {
    // slug, category, duration, difficulty, daysRequired, situationTags,
    // imageUrl, sourceUrl, createdAt, id — none of these can be
    // overridden by a translation (they're intrinsic to the prayer).
    const t = buildTranslation({
      locale: "es",
      name: "Novena al Sagrado Corazón",
      reviewedAt: new Date("2026-05-14"),
    });
    const out = localizePrayer(baseSacredHeart, [t], "es");
    expect(out.slug).toBe(baseSacredHeart.slug);
    expect(out.category).toBe(baseSacredHeart.category);
    expect(out.duration).toBe(baseSacredHeart.duration);
    expect(out.difficulty).toBe(baseSacredHeart.difficulty);
    expect(out.daysRequired).toBe(baseSacredHeart.daysRequired);
    expect(out.situationTags).toEqual(baseSacredHeart.situationTags);
    expect(out.id).toBe(baseSacredHeart.id);
    expect(out.createdAt).toEqual(baseSacredHeart.createdAt);
  });
});

describe("localizePrayer — dailyReflections", () => {
  it("overrides when translation.dailyReflections is non-empty", () => {
    const reflectionsEs = [
      "Día 1: ¿Por qué se confunden preocupándose?",
      "Día 2: ¡Cuántas cosas hago por aquellos que se abandonan a Mí…",
      "Día 3: …",
      "Día 4: …",
      "Día 5: …",
      "Día 6: …",
      "Día 7: …",
      "Día 8: …",
      "Día 9: …",
    ];
    const t = buildTranslation({
      locale: "es",
      name: "Novena del Abandono",
      dailyReflections: reflectionsEs,
      reviewedAt: new Date("2026-05-14"),
    });
    const out = localizePrayer(baseSurrender, [t], "es");
    expect(out.dailyReflections).toEqual(reflectionsEs);
    expect(out.dailyReflections[0]).toContain("¿Por qué");
  });

  it("falls back to base when translation.dailyReflections is empty", () => {
    // Length-zero is the "not translated" signal — same convention
    // PrayerType.dailyReflections uses. Forces a translator to
    // either ship all 9 reflections or fall back to the English
    // refrain; partial reflection translations don't render.
    const t = buildTranslation({
      locale: "es",
      name: "Novena del Abandono",
      // dailyReflections: [] (default in buildTranslation)
      reviewedAt: new Date("2026-05-14"),
    });
    const out = localizePrayer(baseSurrender, [t], "es");
    expect(out.dailyReflections).toEqual(baseSurrender.dailyReflections);
    expect(out._translationLocale).toBe("es");
  });

  it("preserves base empty array when both are empty", () => {
    // A single-day prayer (Hail Mary, Memorare) has empty
    // dailyReflections by default. The base empty array passes
    // through unchanged on translation.
    const t = buildTranslation({
      locale: "es",
      name: "Ave María",
      reviewedAt: new Date("2026-05-14"),
    });
    const out = localizePrayer(baseSacredHeart, [t], "es");
    expect(out.dailyReflections).toEqual([]);
  });
});

describe("localizePrayer — does not mutate inputs", () => {
  it("returns a new object; mutating output doesn't change base", () => {
    const t = buildTranslation({
      locale: "es",
      name: "Novena al Sagrado Corazón",
      reviewedAt: new Date("2026-05-14"),
    });
    const out = localizePrayer(baseSacredHeart, [t], "es");
    out.name = "MUTATED";
    expect(baseSacredHeart.name).toBe("Novena to the Sacred Heart");
  });
});
