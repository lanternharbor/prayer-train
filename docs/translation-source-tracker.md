# Translation source tracker — Track E Wave 1

Research deliverable for the canonical-prayer-translation work scoped in [`seo-tracks-ef-research-plan.md`](./seo-tracks-ef-research-plan.md). This file tracks **approved-publisher source URLs** for the Wave 1 universal prayers across `es`, `pt-BR`, `fil`, `pl`. It is **not** prayer text; it is the working notebook a future researcher (Claude or human) reads to know **where to transcribe from** when populating `prisma/seed/translations/<locale>.ts`.

This separation matters: the hard guideline in [`seo-international-ops.md:130`](./seo-international-ops.md#L130) prohibits machine-translated prayer content. By citing sources first and transcribing second, we keep the editorial chain visible and the `source` field on every `PrayerTypeTranslation` row defensible.

---

## How to use this file

For each prayer × locale cell:

1. Open the cited URL. Confirm the source is what it says (Vatican News in the right language, the right diocesan/bishop-conference site, not a third-party blog).
2. Transcribe the prayer text into a `prisma/seed/translations/<locale>.ts` entry:
   ```ts
   {
     prayerSlug: "<slug>",
     name: "<localized name>",        // optional but recommended
     description: "<1-2 sentence summary in target language>",
     prayerText: "<full prayer text as printed on the cited source>",
     source: "<URL>",                  // REQUIRED — exact URL from this table
     reviewedAt: null,                  // gate — null means English fallback at read time
     reviewerNote: "Transcribed YYYY-MM-DD from <publisher>",
   }
   ```
3. Commit with the source URL in the commit body.
4. Reviewer (or William) spot-checks the transcription against the source URL, then sets `reviewedAt: Date` in a follow-up.

**Do not** populate `prayerText` from a source not in this table. **Do not** machine-translate. If a cell below is empty / TBD, leave the field blank (`reviewedAt: null` keeps the English fallback live).

---

## Source hierarchy per locale

Primary publisher = the bishops' conference of the target market. Secondary = Vatican News in that language. Tertiary = recognized Catholic publisher or diocesan resource.

### Spanish (`es`)

- **Primary**: USCCB Spanish (https://www.usccb.org/es) — covers liturgical Spanish for US Catholics. Conferencia Episcopal Española (https://www.conferenciaepiscopal.es), Conferencia del Episcopado Mexicano (https://www.cem.org.mx) for additional canonical regional usage.
- **Secondary**: Vatican News Spanish (https://www.vaticannews.va/es/oraciones.html), Pope Francis prayers on vatican.va (https://www.vatican.va/content/francesco/es/prayers.html), Catechism Spanish (https://www.vatican.va/archive/catechism_sp/).
- **Tertiary**: OpusDei (https://opusdei.org/es/prayers/), Aciprensa.

### Brazilian Portuguese (`pt-BR`)

- **Primary**: CNBB (Conferência Nacional dos Bispos do Brasil, https://www.cnbb.org.br), Paulus Editora (https://www.paulus.com.br), Edições Loyola (https://loyola.com.br).
- **Secondary**: Vatican News Portuguese (https://www.vaticannews.va/pt/oracoes.html), Catechism Portuguese (https://www.vatican.va/archive/cathechism_po/index_new/), Pope Francis prayers (https://www.vatican.va/content/francesco/pt/prayers.html).
- **Tertiary**: A12 (Santuário Nacional de Aparecida, https://www.a12.com), Canção Nova (https://noticias.cancaonova.com).

### Filipino (`fil`)

- **Primary**: CBCP (Catholic Bishops' Conference of the Philippines, https://cbcponline.net), Episcopal Commission on Liturgy (under CBCP).
- **Secondary**: Daughters of St. Paul Philippines (publishing arm with Tagalog/Filipino prayer books, https://www.paulines.ph), Vatican News English (used by the Filipino Catholic Church for cross-reference).
- **Tertiary**: Baclaran Church (https://www.baclaranchurch.org), Sto. Niño de Cebú Basilica (https://santoninodecebubasilica.org), Apostleship of Prayer St. Pius X Philippines.

Note: many Filipino Catholic surfaces use code-switching (English/Spanish loanwords inside Tagalog grammar). The existing `messages/fil.json` register honors this — `panalangin` (formal) over `dasal` (colloquial), Spanish-loanword `novena` + `rosaryo`, English loanword `chaplet` retained. Track E transcriptions should match.

### Polish (`pl`)

- **Primary**: Konferencja Episkopatu Polski (https://episkopat.pl), specifically the 2017 unification of prayer texts (Plenary Assembly, Jasna Góra). Also Wydawnictwo Pallottinum and Wydawnictwo M.
- **Secondary**: Vatican News Polish (https://www.vaticannews.va/pl/modlitwa.html), Catechism Polish (https://opoka.org.pl/biblioteka/W/WP/_dokumenty/kkk/), brewiarz.pl (Liturgy of the Hours, comprehensive).
- **Tertiary**: Faustyna.pl (Divine Mercy — definitive Polish source), Niedziela.pl, Deon.pl.

Note: per the 2017 Episkopat unification, the canonical phrasing is `Zdrowaś Maryjo` (not `…Mario`) and `błogosławionaś Ty między niewiastami` (not `błogosławiona jesteś`). Spotted variants in older texts are pre-2017.

---

## Wave 1 universal prayers — source citations

Twenty highest-leverage prayers per `seo-tracks-ef-research-plan.md`. Each row: `slug` (matches `PrayerType.slug` if exists) + per-locale source URL or `TBD`.

| # | Prayer (English) | Slug candidate | es source | pt-BR source | fil source | pl source |
|---|---|---|---|---|---|---|
| 1 | Lord's Prayer / Our Father | `lords-prayer` or `our-father` | https://www.vaticannews.va/es/oraciones/padre-nuestro.html (verify URL) | https://www.vaticannews.va/pt/oracoes/pai-nosso.html | CBCP — TBD specific URL (see paulines.ph catechism) | https://episkopat.pl (post-2017 unified text — confirm canonical URL) |
| 2 | Hail Mary | `hail-mary` | https://www.vaticannews.va/es/oraciones/avemaria.html (verify) | https://www.vaticannews.va/pt/oracoes/ave-maria.html | CBCP — TBD | https://episkopat.pl (post-2017 `Zdrowaś Maryjo`) |
| 3 | Glory Be | `glory-be` or `doxology` | Vatican News es | Vatican News pt | CBCP — TBD | episkopat.pl |
| 4 | Apostles' Creed | `apostles-creed` | USCCB.org/es (verify URL) or Conferencia Episcopal Española | CNBB liturgical | CBCP | episkopat.pl |
| 5 | Nicene Creed | `nicene-creed` | USCCB.org/es | CNBB | CBCP | episkopat.pl |
| 6 | Angelus | `angelus` | https://opusdei.org/es/prayers/angelus/ | A12 or vaticannews.va/pt | CBCP — TBD | brewiarz.pl |
| 7 | Regina Caeli | `regina-caeli` | vaticannews.va/es | vaticannews.va/pt | CBCP — TBD | brewiarz.pl |
| 8 | Hail Holy Queen / Salve Regina | `salve-regina` or `hail-holy-queen` | vaticannews.va/es | vaticannews.va/pt | CBCP — TBD | brewiarz.pl |
| 9 | Anima Christi | `anima-christi` | https://opusdei.org/es/prayers/anima-christi/ (verify) | A12 or cancaonova | CBCP — TBD | episkopat.pl or brewiarz.pl |
| 10 | Act of Faith | `act-of-faith` | USCCB.org/es | CNBB | CBCP — TBD | episkopat.pl |
| 11 | Act of Hope | `act-of-hope` | USCCB.org/es | CNBB | CBCP — TBD | episkopat.pl |
| 12 | Act of Charity | `act-of-charity` | USCCB.org/es | CNBB | CBCP — TBD | episkopat.pl |
| 13 | Act of Contrition | `act-of-contrition` | USCCB.org/es | CNBB | CBCP — TBD | episkopat.pl |
| 14 | Confiteor | `confiteor` | Liturgy missal — TBD | Liturgia da CNBB | CBCP — TBD | Liturgia Godzin (brewiarz.pl) |
| 15 | Magnificat | `magnificat` | Liturgia de las Horas — USCCB.org/es | Liturgia das Horas — CNBB | CBCP — TBD | Liturgia Godzin |
| 16 | Litany of the Sacred Heart | `litany-sacred-heart` | vaticannews.va/es | vaticannews.va/pt | CBCP — TBD | episkopat.pl or brewiarz.pl |
| 17 | Litany of Loreto (Marian) | `litany-loreto` | vaticannews.va/es | vaticannews.va/pt | CBCP — TBD | brewiarz.pl |
| 18 | Te Deum | `te-deum` | vaticannews.va/es | vaticannews.va/pt | CBCP — TBD | Liturgia Godzin |
| 19 | Veni Creator Spiritus | `veni-creator` | vaticannews.va/es | vaticannews.va/pt | CBCP — TBD | Liturgia Godzin |
| 20 | Veni Sancte Spiritus (Pentecost Sequence) | `veni-sancte-spiritus` | vaticannews.va/es | vaticannews.va/pt | CBCP — TBD | Liturgia Godzin |

**URL verification status**: Most `vaticannews.va` URLs follow the pattern `https://www.vaticannews.va/{locale}/oraciones-or-oracoes-or-prayers/{prayer-slug}.html`. The Portuguese URL for Pai Nosso (`https://www.vaticannews.va/pt/oracoes/pai-nosso.html`) was returned in search; other URLs follow the same pattern but **must be verified by clicking through before transcription**. `CBCP — TBD` markers mean the researcher needs to find the specific CBCP/Filipino canonical URL — search via google `site:cbcponline.net "<prayer name in Filipino>"`.

---

## Slugs that already exist in the DB vs. would need to be created

Check `prisma/seed/prayers.ts` (or wherever the PrayerType library lives) before transcribing. Some Wave 1 slugs likely already exist (`hail-mary`, `lords-prayer`, `glory-be`, `apostles-creed`, `nicene-creed` are core). Others (`magnificat`, `te-deum`, `litany-sacred-heart`) may need to be created as new PrayerType rows first — that's Track F territory, not Track E.

Recommended order:
1. **First**: confirm which of the 20 slugs above already have English baseline rows.
2. **Then**: for slugs that exist, populate the per-locale `PrayerTypeTranslation` via the seed pattern (Track E proper).
3. **For missing slugs**: open a separate Track F PR per devotion to create the English baseline row first, then loop back to Track E for translations.

---

## Field-coverage expectations per source

Different publishers cover different fields. Approximate guidance:

| Source | name | description | prayerText | instructions | dailyReflections |
|---|---|---|---|---|---|
| Vatican News | ✓ | partial | ✓ | rare | ✗ |
| USCCB.org/es | ✓ | ✓ | ✓ | sometimes | ✗ |
| CNBB | ✓ | ✓ | ✓ | sometimes | ✗ |
| CBCP | ✓ | ✓ | ✓ | rare | ✗ |
| Episkopat Polski | ✓ | ✓ | ✓ | sometimes | ✗ |
| OpusDei / Paulines / Loyola | ✓ | ✓ | ✓ | ✓ | rare |
| Faustyna.pl | ✓ | ✓ | ✓ | ✓ | for the Divine Mercy Chaplet specifically |
| Vatican.va (Compendium Catechism) | ✓ | ✓ | ✓ | ✗ | ✗ |

`dailyReflections` for multi-day novenas (Surrender Novena, St. Joseph Novena, etc.) are typically *only* available in publisher books (Wydawnictwo M, Paulus Editora, Daughters of St. Paul) — not free websites. For those, expect the researcher to need access to the published novena booklet OR to skip `dailyReflections` and ship only `name + description + prayerText` per day.

---

## Next-action checklist for whoever picks this up

1. Read [`seo-tracks-ef-research-plan.md`](./seo-tracks-ef-research-plan.md) for the full waves plan.
2. Open `prisma/seed/translations/es.ts` (or `pt-BR.ts` / `fil.ts` / `pl.ts`). Note the existing 5 anchor prayers from PRs #76 / #77 (`novena-sacred-heart`, `novena-st-joseph`, `holy-rosary`, `chaplet-divine-mercy`, `memorare`) so the pattern is in your head.
3. Verify each cited URL in this file actually loads + contains the prayer it claims.
4. Pick **one locale** to focus on (recommend `es` first — high US-traffic, source coverage densest).
5. Transcribe Wave 1 prayer 1 → row in the seed file. Repeat for prayers 2-20.
6. Run `npm run db:seed:translations` against a local dev DB to confirm the seed parses.
7. Open a PR with the seed-file additions. The reviewer (William or future native reviewer) sets `reviewedAt: Date` on a per-prayer basis to flip the locale rendering.

---

## Changelog

- **2026-05-15**: Initial source tracker. Vatican News confirmed accessible for `pt` ([pai-nosso.html](https://www.vaticannews.va/pt/oracoes/pai-nosso.html) verified live); other locales follow same URL pattern (verify per cell). Polish Episkopat 2017 unification noted. CBCP-specific URLs marked TBD — research dependency.
