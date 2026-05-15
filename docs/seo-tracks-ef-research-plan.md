# Tracks E & F — research-bounded execution plan

Track E (canonical prayer translations) and Track F (cultural-anchor devotion pages) are the two tracks in the implementation plan that **cannot be drafted by Claude in a single session**. They require per-prayer + per-locale research against approved Catholic publishers — the hard guideline from [`seo-international-ops.md:130`](./seo-international-ops.md) is non-negotiable.

This doc is the working plan for executing them in a structured way over multiple sessions. It exists so that a future session (Claude or human) can pick up where the previous one left off without re-deriving the methodology.

---

## Why these tracks are different from C/D/G

Tracks C (UI shell translation), D (situation pastoral content), and G (competitive copy revision) are **pastoral and marketing copy**. They're brand voice; Claude can draft them; native reviewers polish for register. The output goes live behind the standard PR review gate.

Tracks E and F handle **canonical liturgical text** — the exact words of the Memorare, the Surrender Novena, the Koronka do Miłosierdzia Bożego. These are not creative writing surfaces. They are the prayers of the Universal Church, with received translations from approved Catholic publishers. The hard guideline:

> "NEVER machine-translate Catholic prayer content for production. Approved Catholic sources only. The DB schema's `reviewedAt` gate enforces this at read time."

Practically this means Track E + F work in this loop:

1. **Identify** the prayer to translate (e.g., Sacred Heart Novena in Spanish).
2. **Research** the canonical published translation from an approved publisher (USCCB, CNBB, CBCP, Vatican.va, Episkopat Polski, diocesan editions). The `source` field is **required** and must cite a recognized publisher.
3. **Transcribe** into the seed file (`prisma/seed/translations/<locale>.ts`).
4. **Cite** the source URL + access date in `docs/translation-source-tracker.md`.
5. Ship with `reviewedAt: null` so the field-by-field fallback keeps English at read time until William/reviewer sets `reviewedAt: Date`.

Claude's role: research + transcription + citation. Not generation.

---

## Track E — Prayer translation expansion

**Scope**: ~80 existing `PrayerType` entries × 4 non-English locales = ~320 translation rows. Currently 5 anchor prayers are translated per locale per [PR #76](https://github.com/lanternharbor/prayer-train/pull/76) and [PR #77](https://github.com/lanternharbor/prayer-train/pull/77): `novena-sacred-heart`, `novena-st-joseph`, `holy-rosary`, `chaplet-divine-mercy`, `memorare`. Remaining ~75 per locale × 4 locales = ~300 entries.

**Per-row work**: 15-30 min depending on source availability + how much of the field set has an approved translation.

**Total estimate**: 75-150 hours of careful research over the ~300 entries. Multi-week effort.

### Recommended sequencing

**Wave 1 — Universal Catholic prayers (no locale-specific patron)**: ~20 prayers per locale. Highest-volume sources available since these prayers appear in every approved Catholic Bible / catechism / prayerbook.

- The Lord's Prayer (Padre Nuestro / Pai Nosso / Ama Namin / Ojcze Nasz)
- The Hail Mary
- The Glory Be
- The Apostles' Creed
- The Nicene Creed
- The Angelus
- The Regina Caeli
- The Hail Holy Queen (Salve Regina)
- The Anima Christi
- Act of Faith / Hope / Charity / Contrition (4 entries)
- The Confiteor
- The Magnificat
- Stations of the Cross outlines
- Litany of the Saints (universal litany)
- Litany of the Sacred Heart
- Litany of Loreto (Marian)
- Te Deum
- Veni Creator Spiritus
- Veni Sancte Spiritus
- Anima Christi

Sources are abundant — USCCB.org/es, Vatican.va in all 4 languages, every diocesan website has these. Each row: ~10-15 min.

**Wave 2 — Patron-saint novenas with broad cross-locale recognition**: ~15 prayers per locale.

- Novena to St. Joseph (already shipped for the 5 anchors)
- Novena to St. Anthony
- Novena to St. Jude (lost causes)
- Novena to St. Therese of Lisieux
- Novena to St. Padre Pio
- Novena to St. Francis of Assisi
- Novena to Our Lady of Perpetual Help
- Novena to the Holy Spirit (Pentecost prep)
- Novena to the Immaculate Conception
- Novena to the Sacred Heart (already shipped)
- Novena to the Divine Mercy (Tridiuum + 9 days)
- Novena to St. Michael the Archangel
- Novena to the Holy Souls (November)
- Novena to St. Anne (parents/grandparents)
- Surrender Novena (Don Dolindo) (already shipped — Vatican-recognized devotion)

Sources: diocesan novena books, Vatican.va, approved publishers per locale. Each row: ~20-30 min (multiple days × multiple fields to transcribe accurately).

**Wave 3 — Devotional cycles**: ~20 prayers per locale.

- Rosary (already shipped); Joyful / Sorrowful / Glorious / Luminous Mysteries individually
- Divine Mercy Chaplet (already shipped)
- Chaplet of St. Michael
- Chaplet of the Holy Wounds
- Stations of the Cross (full text per locale)
- Liturgy of the Hours snippets — Morning Prayer / Evening Prayer / Night Prayer (Compline) intros

Sources: Liturgia das Horas (CNBB) for pt-BR; Liturgia de las Horas (USCCB / Conferencia Episcopal) for es; Liturgia Godzin (Episkopat) for pl; Liturgy of the Hours (Daughters of St. Paul) for fil.

**Wave 4 — Locale-specific devotions** (becomes Track F): see below.

### Track E acceptance criteria per row

- `prayerSlug` exists and matches a live `PrayerType` row.
- `source` field cites an approved Catholic publisher with URL and access date in `translation-source-tracker.md`.
- Fields populated: at minimum `name` + `description`; ideally `prayerText` + `instructions` + `dailyReflections` (for novenas).
- `reviewedAt: null` on seed.
- After native reviewer signs off, `reviewedAt: Date` lands in a separate small SQL/seed migration commit.

---

## Track F — Cultural-anchor devotion pages

**Scope**: ~10 new `PrayerType` entries that don't currently exist in the library. Each needs an English baseline + per-locale translations.

The audit's §6 keyword research identified these as the highest-search-volume devotions per locale that PrayerTrain doesn't yet host:

### pt-BR

1. **São Peregrino** (Saint Peregrine) — patron of cancer patients. **Highest priority for Brazil**: Pope Pius XII designated him in 1934, feast day May 4, massive Brazilian devotion. Hozana, Aleteia, Paulus Editora, Comunidade Coração Fiel all host versions of his novena. Sources: Paulus Editora Brazil, CNBB liturgical calendar.
2. **Nossa Senhora Aparecida** — Brazilian national patroness. October 12 is the national feast day. Aparecida's official portal (a12.com) is the authoritative source. Devotion to the Black Madonna image at the Santuário Nacional de Aparecida is the single most important Brazilian Catholic devotion.
3. **Novena Pompejana de 54 Dias** — 54-day Marian Pompeian Novena. Strong Brazilian devotion in addition to its Polish presence.

### fil

4. **Santo Niño de Cebú** — patron of Filipino devotion. Feast 3rd Sunday of January (Sinulog). Millions of devotees. The oldest Christian relic in the Philippines (gifted by Magellan to Queen Juana of Cebu, 1521). Sources: Santo Niño de Cebú Basilica (santoninodecebubasilica.org), Augustinian friars (Province of Sto. Niño).
5. **Birhen del Carmen / Our Lady of Mount Carmel (Tagalog)** — Carmelite devotion. Strong scapular tradition in the Philippines.
6. **Baclaran Wednesday Novena to Our Mother of Perpetual Help** — the largest weekly Catholic devotion in the Philippines. Baclaran Church (Manila) hosts hundreds of thousands of pilgrims every Wednesday. Sources: baclaranchurch.org, Redemptorist publications.
7. **Our Lady of Manaoag** — Marian shrine in Pangasinan. Strong healing tradition.

### pl

8. **Nowenna Pompejańska 54 dni** — 54-day Pompeian Novena (also Brazilian). Massive Polish devotion. Sources: Wojciech.bialystok.pl, Wydawnictwo M.
9. **Św. Wojciech** — St. Adalbert, patron of Poland. Feast April 23. Universal in Polish Catholic culture.
10. **Matka Boża Częstochowska** — Our Lady of Częstochowa, the Black Madonna. National Marian shrine at Jasna Góra. Feast August 26. Sources: Jasna Góra monastery website, Episkopat Polski.

(es is already covered by Wave 2 of Track E above — San Peregrino can do double-duty for es and pt-BR.)

### Per-devotion work

1. Confirm the slug doesn't already exist in the library.
2. Add the `PrayerType` row via a new prisma seed entry (English baseline).
3. Source the English baseline `prayerText` from an approved English-language Catholic publisher (USCCB, Catholic Online if approved imprint, EWTN library).
4. Source the per-locale translation from the appropriate native publisher (per the lists above).
5. Seed all rows with `reviewedAt: null`.
6. Update `translation-source-tracker.md` with full citation per entry.
7. Cross-reference from related `/situations/{topic}/content.translations.ts` entries (e.g., São Peregrino → cancer topic) so the cultural anchor surfaces in the relevant pastoral context.

---

## Why this can't be one big session

Three reasons:

1. **Approved-source verification has to happen per row**. Claude can't bulk-generate or bulk-machine-translate prayer text. Each entry needs a specific URL or citation that William (or a reviewer) can independently re-check.
2. **Source availability varies by prayer + locale**. Some prayers have widely-published translations (e.g. the Memorare is in every diocesan prayerbook). Others (e.g. the Novena to Our Lady of Manaoag) require digging through specific shrine websites or Filipino-publisher catalogs.
3. **Theological review (Fr. Palladino per [reference_people.md memory](../../.claude/projects/-Users-williamkeough-Documents-prayer-train/memory/reference_people.md)) is the eventual gate**. We don't want to bulk-add 320 rows and then have him reject the methodology. Better: ship Wave 1 (20 universal prayers × 4 locales = 80 rows), get his sign-off on the workflow, then continue.

---

## Recommended cadence

**Session N+1** (next research session):
- Wave 1 universal-prayer survey: identify approved-source URL per locale per prayer. Don't transcribe yet — just build the source table.
- Output: filled `translation-source-tracker.md` with ~80 source citations.
- Deliverable: a short report on which prayers have full source coverage vs. which need a fallback strategy.

**Session N+2 through N+5**:
- Transcribe ~25 entries per session into `prisma/seed/translations/<locale>.ts`.
- After 4 sessions, Wave 1 is done (~100 hours total over the cadence).

**Session N+6**:
- Fr. Palladino reviews Wave 1 sample (10 random rows across locales). Acceptance criteria: theological correctness, source citation, fallback behavior.

**Session N+7 onward**:
- Waves 2-4 (Track E) and Track F devotions, in priority order. Roughly 6-12 sessions to complete.

---

## Files this work touches

- `prisma/seed/translations/{es,pt-BR,fil,pl}.ts` — translation seed entries (per Track E)
- `prisma/seed/prayers/*.ts` (or wherever new PrayerType rows live) — new English baseline rows for Track F devotions
- `docs/translation-source-tracker.md` — **create this in Session N+1** with the citation schema
- `docs/translation-review-tracker.md` — flag new Wave 1 entries for review
- `src/app/[locale]/situations/[topic]/content.translations.ts` — cross-reference new Track F devotions where applicable (e.g., São Peregrino → cancer pastoral note)

---

## Changelog

- **2026-05-15**: Initial plan, drafted by Claude. Pending validation against current `prisma/seed/translations/*.ts` contents and against reviewer availability (Fr. Palladino + per-locale native reviewers per `reviewer-recruitment.md`).
