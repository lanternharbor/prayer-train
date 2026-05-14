import { describe, expect, it } from "vitest";
import { buildTranslationUpsertData } from "./upsert-data";
import type { PrayerTranslationSeed } from "./types";

/**
 * Pin the seed-runner column-mapping contract. These tests cover
 * the pure transform from PrayerTranslationSeed → TranslationUpsertData
 * — the runner itself just feeds the result into prisma.upsert.
 *
 * Two properties matter most:
 *   1. Missing fields default to null / [] (not "undefined left out")
 *      so the upsert can be used in both create + update arms.
 *   2. Missing `source` throws — citation is a hard editorial
 *      requirement, not just a TypeScript hint.
 */

function buildRow(
  overrides: Partial<PrayerTranslationSeed> = {},
): PrayerTranslationSeed {
  return {
    prayerSlug: "novena-sacred-heart",
    source:
      "USCCB Spanish materials, usccb.org/es/test, retrieved 2026-05-14",
    ...overrides,
  };
}

describe("buildTranslationUpsertData — defaults", () => {
  it("defaults string fields to null when omitted", () => {
    const data = buildTranslationUpsertData(buildRow());
    expect(data.name).toBeNull();
    expect(data.description).toBeNull();
    expect(data.prayerText).toBeNull();
    expect(data.instructions).toBeNull();
    expect(data.patronSaint).toBeNull();
    expect(data.feastDay).toBeNull();
    expect(data.reviewerNote).toBeNull();
  });

  it("defaults dailyReflections to empty array when omitted", () => {
    const data = buildTranslationUpsertData(buildRow());
    expect(data.dailyReflections).toEqual([]);
  });

  it("defaults reviewedAt to null (unreviewed → English fallback)", () => {
    // This is the editorial gate's default state. Until a reviewer
    // sets reviewedAt to a Date, the helper falls back to English
    // at read time and the row doesn't go live.
    const data = buildTranslationUpsertData(buildRow());
    expect(data.reviewedAt).toBeNull();
  });

  it("trims surrounding whitespace from source", () => {
    const data = buildTranslationUpsertData(
      buildRow({ source: "  USCCB, url, retrieved 2026-05-14  " }),
    );
    expect(data.source).toBe("USCCB, url, retrieved 2026-05-14");
  });
});

describe("buildTranslationUpsertData — required citation", () => {
  it("throws when source is an empty string", () => {
    // Tightens the type-system check at runtime. A caller could
    // bypass TypeScript with `as PrayerTranslationSeed` on a partial
    // — the runtime guard catches it.
    expect(() =>
      buildTranslationUpsertData(buildRow({ source: "" })),
    ).toThrow(/missing a source citation/);
  });

  it("throws when source is whitespace-only", () => {
    expect(() =>
      buildTranslationUpsertData(buildRow({ source: "   " })),
    ).toThrow(/missing a source citation/);
  });

  it("includes the prayerSlug in the error so the bad row is identifiable", () => {
    expect(() =>
      buildTranslationUpsertData(
        buildRow({ prayerSlug: "novena-divine-mercy", source: "" }),
      ),
    ).toThrow(/novena-divine-mercy/);
  });
});

describe("buildTranslationUpsertData — applied fields", () => {
  it("passes through every translatable field when provided", () => {
    const data = buildTranslationUpsertData(
      buildRow({
        name: "Novena al Sagrado Corazón",
        description: "Una poderosa devoción de nueve días …",
        prayerText: "Oh, Sagradísimo Corazón de Jesús …",
        instructions: "Reza una vez al día durante nueve días.",
        dailyReflections: ["Día 1: …", "Día 2: …"],
        patronSaint: "Santa Margarita María Alacoque",
        feastDay: "Viernes después del Corpus Christi",
        reviewerNote: "Reviewed against USCCB Spanish-language materials.",
        reviewedAt: new Date("2026-06-01"),
      }),
    );
    expect(data.name).toBe("Novena al Sagrado Corazón");
    expect(data.description).toContain("nueve días");
    expect(data.prayerText).toContain("Corazón de Jesús");
    expect(data.instructions).toContain("una vez al día");
    expect(data.dailyReflections).toHaveLength(2);
    expect(data.patronSaint).toBe("Santa Margarita María Alacoque");
    expect(data.feastDay).toContain("Corpus Christi");
    expect(data.reviewerNote).toContain("USCCB");
    expect(data.reviewedAt?.toISOString().slice(0, 10)).toBe("2026-06-01");
  });

  it("preserves explicit null over the implicit-undefined default", () => {
    // A translator might explicitly null-out a field that was
    // previously populated, signaling "untranslate this." The
    // upsert must apply null on the update arm so the previously-
    // populated DB value gets cleared.
    const data = buildTranslationUpsertData(
      buildRow({ name: null, patronSaint: null }),
    );
    expect(data.name).toBeNull();
    expect(data.patronSaint).toBeNull();
  });
});
