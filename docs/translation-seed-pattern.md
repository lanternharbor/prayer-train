# Prayer translation seed pattern

How to add per-locale translations for `PrayerType` content. Authored by the engineering scaffold (Phase ε); pace is set by Editorial.

## Layout

```
prisma/
  seed/
    translations/
      types.ts          — PrayerTranslationSeed interface
      upsert-data.ts    — pure transform to Prisma upsert shape
      upsert-data.test.ts
      es.ts             — Spanish entries (empty template)
      pt-BR.ts          — Brazilian Portuguese entries
      fil.ts            — Filipino / Tagalog entries
      pl.ts             — Polish entries
  seed-translations.ts  — idempotent runner
```

## Adding a translation entry

1. Open the per-locale file (e.g., `prisma/seed/translations/es.ts`).
2. Append a `PrayerTranslationSeed` entry. The shape:

   ```ts
   {
     prayerSlug: "novena-sacred-heart",       // base PrayerType.slug
     name: "Novena al Sagrado Corazón",       // optional
     description: "…",                         // optional
     prayerText: "…",                          // optional
     instructions: "…",                        // optional
     dailyReflections: ["Día 1: …", "Día 2: …"], // optional, length should match daysRequired
     patronSaint: "Santa Margarita María Alacoque", // optional
     feastDay: "Viernes después del Corpus Christi", // optional
     source: "USCCB Spanish materials, https://…, retrieved 2026-05-14", // REQUIRED
     reviewerNote: "Cross-checked against …", // optional
     reviewedAt: null,                         // leave null until reviewer signs off
   }
   ```

3. Run the seed locally to lint your entry:

   ```bash
   npm run db:seed:translations
   ```

   - Missing `source` → loud error, names the bad slug.
   - Missing `prayerSlug` → skipped with a warning (typo on slug, or
     a new prayer hasn't been seeded yet).
   - All other fields optional; defaults to `null` / `[]`.

4. Commit. PR for review.

## What `reviewedAt: null` means

This is the editorial gate. While `reviewedAt` is null:

- The row exists in the DB
- The read sites and crons fall back to English when they look up
  this prayer for this locale
- No real visitor sees the translation

When the bilingual Catholic reviewer signs off:

- The reviewer changes `reviewedAt: null` to `reviewedAt: new Date("2026-06-01")`
  (or whatever ISO date matches the day of review)
- Commit + PR with the reviewer's name in the commit message body
  for attribution
- After merge, run `npm run db:seed:translations` against prod
- The translation is now live for visitors with that locale

## Partial translations are supported

A translator can ship `name + description` first and the prayer text
falls back to English until that's also translated. The helper in
`src/lib/prayer-localization.ts` does field-by-field fallback.

Common partial-translation patterns:

- **Name + description only**: minimum-viable for the prayer index
  (`/prayers`) to show a meaningful card; everything else falls back
- **Skip dailyReflections**: ship the prayer text but leave
  per-day reflections empty (`dailyReflections: []`). For Surrender
  Novena / Divine Mercy / similar, the chain page renders the
  English reflections until pt-BR / es / fil / pl reflections
  are also reviewed
- **No patronSaint/feastDay**: these display in metadata + on the
  prayer detail page; falling back to English is fine

## Source-tier guidance per locale

| Locale | Primary | Secondary | Publishers |
|---|---|---|---|
| es | USCCB Spanish (`usccb.org/es`) | Vatican.va Spanish | Editorial Verbo Divino, Ediciones Paulinas, Editorial Católica |
| pt-BR | CNBB (Conferência Nacional dos Bispos do Brasil) | Vatican.va Portuguese | Paulus, Canção Nova, Aparecida |
| fil | CBCP (Catholic Bishops' Conference of the Philippines) | Vatican.va Tagalog | Pauline Books & Media, SVD, Salesians |
| pl | KEP (Konferencja Episkopatu Polski) | Vatican.va Polish | Wydawnictwo M, Salwator, Pallottinum |

**Cite the source verbatim** in the `source` field. URL + retrieval
date make audit trivial. If you can't cite an approved source, don't
add the entry — the gate isn't "good translation," it's "translation
from a Catholic source that survives editorial scrutiny."

## Re-running the seed

The runner is idempotent. Re-running it:

- Inserts new entries
- Updates existing entries (by `(prayerTypeId, locale)` unique key)
- Sets previously-populated fields back to null if the seed entry
  drops them — **the seed file is the source of truth**, not the DB

This means: to remove a translation, delete it from the seed file
and re-run. To preserve a translation but back off the `reviewedAt`
flag (e.g., a reviewer revokes signoff pending re-review), set
`reviewedAt: null` and re-run.

## Operational protocol (running against prod)

Same shape as the standard `prisma db push` protocol:

1. `npm run smoke` (must pass 9/9)
2. `DATABASE_URL=<prod> npm run db:seed:translations`
3. `npm run smoke` again
4. (Optional) Spot-check a translated page in each affected locale

Running the seed is **non-destructive** with respect to existing
PrayerType rows — it only touches PrayerTypeTranslation. The Spina
train + Denis Wilson train are unaffected; existing trains/chains
that captured a locale at create time pick up any newly-reviewed
translation on the next cron tick.
