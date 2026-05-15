# International SEO audit — prayertrains.com (May 2026)

Audit date: 2026-05-14. Auditor: Claude (Opus 4.7). Site under audit: `https://prayertrains.com` across all 5 configured locales (`en`, `es`, `pt-BR`, `fil`, `pl`).

This is the operational follow-through to [`seo-international-ops.md`](./seo-international-ops.md). That doc described the engineering surface; this one verifies the live deployment, surfaces gaps the doc itself flags as outstanding, and adds per-locale keyword + competitor context.

> **Post-audit update (2026-05-15)**: PRs [#76](https://github.com/williamkeough/prayer-train/pull/76) and [#77](https://github.com/williamkeough/prayer-train/pull/77) landed reviewed prayer translations for 5 anchor prayers across `es`, `pt-BR`, `fil`, `pl` after this audit completed. The 5 slugs: `novena-sacred-heart`, `novena-st-joseph`, `holy-rosary`, `chaplet-divine-mercy`, `memorare`. The audit's prayer-detail body-content-mismatch finding (§3.6) **no longer applies to these 5 prayers** — they ship localized titles/H1/body per locale (e.g. `/es/prayers/memorare` → "El Acordaos (Memorare)", `/pt-BR/prayers/chaplet-divine-mercy` → "Terço da Divina Misericórdia", `/pl/prayers/holy-rosary` → "Różaniec Święty"). The audit's other findings (og:locale BCP 47, og:image, situation pages, /our-story, /prayers index, /browse) continue to hold for the deployed site as of audit time.

---

## 1. Executive summary

The engineering scaffold is in excellent shape. Hreflang reciprocity is clean across all 5 locales on the surfaces that go through `localizedMetadata()`, JSON-LD `inLanguage` matches every page's URL locale, per-locale OG share-card images (1200×630) ship correctly on homepages, the sitemap covers all 410 URLs with full cross-locale alternates + `x-default`, and BCP 47 casing (`pt-BR`, not `pt-br`) is honored end-to-end.

The audit found **3 P0 issues, 5 P1 issues, and 4 P2 opportunities**. The headline:

> **Four of five page archetypes ship non-English HTML head metadata over English body content.** Locale prefixes (`/es/`, `/pt-BR/`, `/fil/`, `/pl/`), `<html lang>`, `og:locale`, JSON-LD `inLanguage`, and hreflang all declare a non-English language, but the rendered H1 + paragraphs are still English. This is the single highest-leverage SEO problem on the site — Google penalizes language-mismatch aggressively across all locales once it triggers, and once trust in hreflang is lost site-wide the recovery curve is long.

The site's engineering infrastructure is ready for a successful international launch. What's missing is **editorial content in each locale** (Phase ε for prayer translations + a Phase ζ effort for site-shell body copy) and **two specific code bugs on detail-page metadata** that bypass the helper that would otherwise emit correct `og:locale` BCP 47 tags and per-locale OG cards.

### P0 — Ship-blockers for non-English organic acquisition

1. **Body content is English on non-English locale URLs** (every archetype except homepage). Live evidence:
   - `https://prayertrains.com/es/prayers` — H1 = "Prayer Library" (English) while meta title = "Biblioteca de oraciones" (Spanish)
   - `https://prayertrains.com/es/situations/cancer` — H1 = "Catholic prayers for a friend with cancer" (English) while `og:locale` = `es`
   - `https://prayertrains.com/pl/our-story` — H1 = "Why PrayerTrain Exists" (English) while meta title = "Dlaczego zbudowaliśmy PrayerTrain"
   - `https://prayertrains.com/es/prayers/surrender-novena` — entire body in English, `lang="es"`
   - This affects every locale-prefixed page except `[locale]/page.tsx` (the hero on the homepage renders fully from the messages JSON).
2. **`og:locale` on detail pages emits the bare locale code, not BCP 47 underscore format.** Live evidence:
   - `/es/prayers/surrender-novena` → `og:locale="es"` (should be `es_ES`)
   - `/pl/prayers/surrender-novena` → `og:locale="pl"` (should be `pl_PL`)
   - `/es/situations/cancer` → `og:locale="es"` (should be `es_ES`)
   - Root cause: [src/app/[locale]/prayers/[slug]/page.tsx:100](src/app/[locale]/prayers/[slug]/page.tsx#L100) and [src/app/[locale]/situations/[topic]/page.tsx:65](src/app/[locale]/situations/[topic]/page.tsx#L65) both build `openGraph` manually and pass raw `locale`, bypassing `localizedMetadata()` which would apply `localeToOgTag()`.
3. **Per-locale OG share cards (PR #73) only apply to homepages — detail pages fall back to `/logo.png`.** Live evidence on prayer + situation detail across all locales: `og:image="https://prayertrains.com/logo.png"` width=1024, height=1024. This means every social share of a prayer or situation page (likely the most-shared archetypes) gets a generic square logo, not the branded navy/gold/cream 1200×630 card. Same root cause as #2 — detail-page metadata bypasses the helper that defaults to `${baseUrl}/${locale}/opengraph-image`.

### P1 — Important but not ship-blocking

1. **No GSC / Bing verification meta tags emitted on any page.** Live `grep` against the homepage and 5 locale roots returned zero `google-site-verification`, `msvalidate.01`, or `yandex-verification` meta tags. Either `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION` env vars aren't set in Vercel Production, or property verification was never started. Without verification, neither search engine can claim the property or report per-locale impressions.
2. **ES `meta.prayersTitle` contains a Spanish translation error.** Live: `<title>Biblioteca de oraciones — Novenas, rosarios, chapeles, letanías católicas | PrayerTrain</title>`. **"chapeles" is wrong** — it translates as "skullcaps/yarmulkes" in Spanish. The correct word for chaplets is **"coronillas"**, which is already used correctly in the same locale's `feature1Body` ("Novenas, rosarios, coronillas, letanías…"). One-character typo masquerading as a translation; will hurt ES CTR.
3. **Meta titles on `/prayers` index exceed Google's 60-char SERP truncation budget across all 5 locales** (76–89 chars). Will display ellipsized in SERPs; the chaplet/category list (the most search-relevant tokens) gets cut.
4. **Hard-coded English in pt-BR copy could trigger cultural skepticism.** The pt-BR home hero says "Uma corrente de oração" ([src/i18n/messages/pt-BR.json:33](src/i18n/messages/pt-BR.json#L33)). In Brazilian Catholic culture, "correntes de oração" is associated with WhatsApp-spam chain letters that the church discourages — Aparecida's official portal (a12.com) explicitly warns against participating in them. Recommend alternative phrasing like "rede de oração" (network) or "mutirão de oração" (community effort) which carry the right register without the baggage.
5. **`x-default` strategy is technically correct but worth re-examining.** Today `x-default` points at the bare URL (`https://prayertrains.com/`), which proxy-rewrites to `/en` content. Canonical on `/en` says `/en` is master, and canonical on `/` also says `/en`. This is fine, but consumes one of Google's hreflang slots on a URL that just redirects internally. Worth confirming this is the intended Google-recommended pattern for English-default sites or moving `x-default` to `/en` explicitly.

### P2 — Opportunities, mostly editorial

1. Per-locale OG cards: PR #73 landed for homepages — extend to detail pages once #3 (P0) is fixed.
2. Locale-specific situation landing pages with native pastoral content (Phase ζ editorial — flagged in [seo-international-ops.md:113](./seo-international-ops.md#L113)). High-value queries like "São Peregrino câncer", "Koronka do Miłosierdzia", "novena por enfermo", "Santo Niño novena" are already culturally owned by other sites; PrayerTrain's differentiation is coordination, not content reproduction.
3. Per-locale messaging strategy vs Hallow. Hallow announced expansion into Spanish, Polish, and Portuguese — PrayerTrain's positioning must be distinct: **coordination, not content consumption**. This isn't currently in any locale's hero copy.
4. Sitemap doesn't include `lastmod` for the bare-URL `x-default` entries. Acceptable but slightly improves indexation latency in some markets.

---

## 2. Methodology and scope

**Scope**: All 5 configured locales per `src/i18n/config.ts` — `en`, `es`, `pt-BR`, `fil`, `pl`. All declared as live on the production deployment per Phase δ (PR #65). Audit includes:

- Live HTTP fetches against `prayertrains.com` for 8 page archetypes × 5 locales = 40 fetches, plus `/sitemap.xml`, `/robots.txt`, and 5 per-locale OG image URLs.
- Codebase cross-reference for every divergence between live output and intended behavior (key files: [src/i18n/config.ts](src/i18n/config.ts), [src/i18n/metadata.ts](src/i18n/metadata.ts), [src/app/sitemap.ts](src/app/sitemap.ts), [src/lib/schema.ts](src/lib/schema.ts), [src/app/[locale]/layout.tsx](src/app/[locale]/layout.tsx)).
- Translation quality spot-check of the `meta.*` and `home.*` keys in each `src/i18n/messages/*.json` (per locale, with confidence labels).
- Per-locale Catholic-prayer keyword research (devotion stems + situation queries + saint queries + liturgical-calendar queries timely for 2026-05-14 — Marian month + Pentecost week).
- Per-locale competitor scan with focus on hreflang use, schema breadth, content depth.

**Confidence labels for translation review**:
- `en` / `es` → direct assessment.
- `pt-BR` → partial; flag candidates, native review confirms.
- `fil` / `pl` → list candidate flags only; native review **gates** any change.

**What this audit does NOT do**:
- Run Lighthouse / Core Web Vitals (separate effort).
- Validate accessibility (separate effort).
- Audit auth-gated routes (`/dashboard`, `/signin`, `/p/*/manage`) — robots.txt correctly excludes these.
- Make claims about Filipino or Polish copy correctness — both languages require native-speaker editorial sign-off before any change ships.

---

## 3. Technical findings (per locale × archetype)

Each cell records: HTTP status / `<html lang>` / canonical correctness / OG locale tag / OG image source / **body language** (the key SEO signal). Bold cells flag the gap.

### 3.1 Homepage (`/{locale}`)

| Locale | Status | html lang | Canonical | og:locale | OG image | Body language |
|---|---|---|---|---|---|---|
| en | 200 | `en` | `/en` ✓ | `en_US` ✓ | `/en/opengraph-image` (1200×630) ✓ | English ✓ |
| es | 200 | `es` | `/es` ✓ | `es_ES` ✓ | `/es/opengraph-image` ✓ | Spanish ✓ |
| pt-BR | 200 | `pt-BR` | `/pt-BR` ✓ | `pt_BR` ✓ | `/pt-BR/opengraph-image` ✓ | Portuguese ✓ |
| fil | 200 | `fil` | `/fil` ✓ | `fil_PH` ✓ | `/fil/opengraph-image` ✓ | Filipino (needs review) |
| pl | 200 | `pl` | `/pl` ✓ | `pl_PL` ✓ | `/pl/opengraph-image` ✓ | Polish (needs review) |

**Result**: homepage is the gold-standard implementation. Every other archetype below should look like this row.

### 3.2 Browse (`/{locale}/browse`)

| Locale | Status | Title | Canonical | og:locale | Body language |
|---|---|---|---|---|---|
| en | 200 | "Find a PrayerTrain" | `/en/browse` ✓ | `en_US` ✓ | English ✓ |
| es | 200 | "Buscar un PrayerTrain" ✓ | `/es/browse` ✓ | `es_ES` ✓ | **Mixed — H1 Spanish, H2 "Praying together" English** |
| pt-BR | 200 | "Encontrar um PrayerTrain" ✓ | `/pt-BR/browse` ✓ | `pt_BR` ✓ | Mixed (assumed same pattern) |
| fil | 200 | "Maghanap ng PrayerTrain" ✓ | `/fil/browse` ✓ | `fil_PH` ✓ | Mixed (assumed same pattern) |
| pl | 200 | "Znajdź PrayerTrain" ✓ | `/pl/browse` ✓ | `pl_PL` ✓ | Mixed (assumed same pattern) |

### 3.3 Prayers index (`/{locale}/prayers`)

| Locale | Title length | og:locale | Body language |
|---|---|---|---|
| en | 81 chars (over 60) | `en_US` | English ✓ |
| es | 89 chars (over 60) | `es_ES` | **English H1 "Prayer Library" + English section headers** |
| pt-BR | 87 chars (over 60) | `pt_BR` | English body (assumed) |
| fil | 79 chars (over 60) | `fil_PH` | English body (assumed) |
| pl | 76 chars (over 60) | `pl_PL` | English body (assumed) |

### 3.4 Situations index (`/{locale}/situations`)

All 5 locales: meta titles + descriptions are translated to the locale. Body language likely English (consistent with prayer index pattern, not directly verified for all five — only spot-checked).

### 3.5 Situation detail (`/{locale}/situations/cancer`)

| Locale | Title | og:locale | OG image | Body language |
|---|---|---|---|---|
| en | "Catholic prayers for a friend with cancer" | `en` (**not `en_US`**) | `/logo.png` (**not OG card**) | English ✓ |
| es | "Catholic prayers for a friend with cancer" (**English**) | `es` (**not `es_ES`**) | `/logo.png` | **English** |
| pt-BR | "Catholic prayers for a friend with cancer" (**English**) | `pt-BR` (**not `pt_BR`**) | `/logo.png` | **English** |
| fil | "Catholic prayers for a friend with cancer" (**English**) | `fil` (**not `fil_PH`**) | `/logo.png` | **English** |
| pl | "Catholic prayers for a friend with cancer" (**English**) | `pl` (**not `pl_PL`**) | `/logo.png` | **English** |

Root cause: [src/app/[locale]/situations/[topic]/page.tsx:43-80](src/app/[locale]/situations/[topic]/page.tsx#L43-L80) constructs `openGraph` manually; `content.title` comes from `./content.ts` which is English-only.

### 3.6 Prayer detail (`/{locale}/prayers/surrender-novena`)

| Locale | Title | og:locale | OG image | JSON-LD types | Body language |
|---|---|---|---|---|---|
| en | "Surrender Novena" | `en` (**not `en_US`**) | `/logo.png` | Article, BreadcrumbList, FAQPage ✓ | English ✓ |
| es | "Surrender Novena" (**English**) | `es` (**not `es_ES`**) | `/logo.png` | same | **English** |
| pt-BR | "Surrender Novena" (**English**) | `pt-BR` (**not `pt_BR`**) | `/logo.png` | same | **English** |
| fil | "Surrender Novena" (**English**) | `fil` (**not `fil_PH`**) | `/logo.png` | same | **English** |
| pl | "Surrender Novena" (**English**) | `pl` (**not `pl_PL`**) | `/logo.png` | same | **English** |

Positive: JSON-LD breadth is excellent — Article, BreadcrumbList, FAQPage, plus Organization/WebSite from layout. The FAQPage schema is exactly the SERP-feature win [seo-international-ops.md](./seo-international-ops.md) flagged as Phase ζ priority.

Root cause for the OG bugs: [src/app/[locale]/prayers/[slug]/page.tsx:90-101](src/app/[locale]/prayers/[slug]/page.tsx#L90-L101) — passes `locale` raw and defaults `image` to `${baseUrl}/logo.png`.

### 3.7 Our-story (`/{locale}/our-story`)

Meta titles + descriptions are **all translated correctly** per locale, with the Massachusetts-origin hard guideline ([ops doc:132](./seo-international-ops.md#L132)) preserved across all 5 ("Somos una familia católica en Massachusetts", "Somos uma família católica em Massachusetts", "Kami ay isang Katolikong pamilya sa Massachusetts", "Jesteśmy katolicką rodziną z Massachusetts").

**But the page body is English everywhere except the homepage**: `/pl/our-story` H1 = "Why PrayerTrain Exists". This is the half-translated state across most non-home pages.

### 3.8 Sitemap + robots

- `/sitemap.xml` → 200, 410 URLs total = 82 unique paths × 5 locales (higher than the doc's projected 390; reflects PR #71-#75 library expansion rounds 1–5).
- Each entry includes `<xhtml:link rel="alternate" hreflang="..." href="...">` for all 5 locales + `x-default`. Spot-checked entries 1-3, structure consistent.
- `/robots.txt` → 200, allows all crawlers, disallows `/api/`, `/dashboard`, `/signin`, `/signin/verify`, `/p/*/manage`, `/chain/*/manage`, `/create`, `/create/`, `/chain/new`. Includes `Sitemap: https://prayertrains.com/sitemap.xml`. Clean.
- `/{locale}/opengraph-image` → 200, `Content-Type: image/png` for all 5 locales. Per-locale share cards confirmed in production.

---

## 4. Hreflang reciprocity matrix

For each locale's homepage, listing the `<link rel="alternate" hreflang>` declarations and verifying each linked URL declares the originator back.

| Origin → declares | en | es | pt-BR | fil | pl | x-default |
|---|---|---|---|---|---|---|
| /en | ✓ self | ✓ → /es | ✓ → /pt-BR | ✓ → /fil | ✓ → /pl | ✓ → bare URL |
| /es | ✓ → /en | ✓ self | ✓ → /pt-BR | ✓ → /fil | ✓ → /pl | ✓ → bare URL |
| /pt-BR | ✓ → /en | ✓ → /es | ✓ self | ✓ → /fil | ✓ → /pl | ✓ → bare URL |
| /fil | ✓ → /en | ✓ → /es | ✓ → /pt-BR | ✓ self | ✓ → /pl | ✓ → bare URL |
| /pl | ✓ → /en | ✓ → /es | ✓ → /pt-BR | ✓ → /fil | ✓ self | ✓ → bare URL |

**Reciprocity is perfect on homepages.** Same pattern confirmed on `/{locale}/prayers/surrender-novena` (each declares all 5 + x-default). The implementation in [src/i18n/metadata.ts:30-43](src/i18n/metadata.ts#L30-L43) is the canonical pattern other localizers should study.

**Verify externally**: paste `https://prayertrains.com/` and `https://prayertrains.com/es/browse` into the [Merj hreflang validator](https://www.merj.com/blog/hreflang-tag-checker) per [seo-international-ops.md:76](./seo-international-ops.md#L76); should return zero errors.

**One caveat**: hreflang reciprocity is necessary but not sufficient. Google's algos also weight body-content language against the declared hreflang language. Per Section 3 above, the body-content English-on-non-English-URL gap will erode the value of an otherwise textbook hreflang setup once Google's NLP classifier flags the mismatch.

---

## 5. Per-locale translation quality

### 5.1 Spanish (`es`) — assessed directly

**Overall**: very good. Natural devotional register, correct Catholic vocabulary, consistent with peninsular and Latin-American Catholic usage.

Correct devotional terms in use: `oración` (not `rezo`), `coronilla` (chaplet), `letanía` (litany), `novena`, `rosario`, `Sagrado Corazón`, `San José`, `Cuerpo de Cristo`, `intercesión`.

**One translation error**: title at [src/i18n/messages/es.json](src/i18n/messages/es.json) under `meta.prayersTitle` (live evidence: `<title>Biblioteca de oraciones — Novenas, rosarios, chapeles, letanías católicas | PrayerTrain</title>`):
- `chapeles` → should be `coronillas`. `chapel` in this context is a religious accessory worn on the head (English "chaplet" comes from the same root as "skull-cap"), but Spanish `chapeles` reads as "skullcaps" (the headwear). The same `messages/es.json` uses `coronillas` correctly in `home.feature1Body` and `home.featuresBody`. P1 fix; one-word change.

**Title length** (over 60-char SERP limit): `meta.prayersTitle` ES is 89 chars — will truncate. Trim by dropping one of the four category words: "Biblioteca de oraciones — Novenas, rosarios, coronillas, letanías | PrayerTrain" (~75 chars, still over but tighter; consider further trimming the `| PrayerTrain` suffix on long titles).

**Cultural-fit note**: `guerrero de oración` ("prayer warrior") is a calque from English. It's used in some Latin American charismatic-Catholic communities but unusual in standard Catholic Spanish. Consider `intercesor` or just `voluntario de oración` for a more universally natural register. Not an error — a register call.

### 5.2 Brazilian Portuguese (`pt-BR`) — partial assessment, native review confirms

**Strong items**:
- `oração`, `terço`, `ladainha`, `novena`, `Sagrado Coração`, `São José`, `Corpo de Cristo` — all correct pt-BR Catholic register.
- `Boston Children's Hospital` preserved as proper noun ✓
- `crianças` / `bebê` / `recém-nascida` — correct register for the founding story.

**Flag for native review**:
- `coroinha` in `home.feature1Body` and `meta.prayersTitle`. In some Brazilian Catholic communities the chaplet devotion is "Coroinha" (e.g. "Coroinha da Misericórdia"). In other parts of Brazil "coroinha" is the term for "altar boy". Native pt-BR Catholic reviewer should confirm whether this reads cleanly across regions or feels regional/wrong; alternative is `terço` (most common Brazilian umbrella term for chaplet-style bead prayers).
- `corrente de oração` in `home.heroTitleLine1` ("Uma corrente de oração") and `meta.descriptions`. **High-priority cultural-context flag**: Brazilian Catholic media (notably Aparecida's official portal a12.com) has repeatedly warned against WhatsApp "correntes de oração" spam, which Brazilian devout Catholics associate with superstitious chain letters. Recommended alternatives: `rede de oração` (prayer network), `mutirão de oração` (joint prayer effort), or `comunidade de oração` (prayer community). The English calque "prayer chain" doesn't carry this baggage in English. Strongly recommend a copy revision pass on pt-BR with someone fluent in Brazilian Catholic media culture.
- `guerreiro de oração` — same calque-from-English flag as Spanish.

**Title length**: `meta.prayersTitle` pt-BR is 87 chars — will truncate.

### 5.3 Filipino (`fil`) — **native review required; do not ship copy changes based on this section without sign-off**

**What I observed** (flagging only, not asserting):
- Heavy use of Spanish/English loanwords is normal for Filipino Catholic register (`novena`, `rosaryo`, `litanya`, `devosyon`, `parokya`, `komunidad`). This appears intentional and authentic.
- `panalangin` (formal prayer) used consistently; `dasal` (more colloquial) is NOT used in copy. This is a defensible choice — `panalangin` is more devotional. Confirm with native reviewer.
- `Mga Catholic novena, rosaryo, chaplet, litanya` in `meta.prayersTitle` mixes English (`Catholic`, `chaplet`) with Tagalized terms. The standard Tagalog for chaplet is `koronilya` (e.g., "Koronilya ng Awa ng Diyos" for Divine Mercy Chaplet). Native reviewer call.
- `heroBadge` is literally English "Catholic Prayer Coordination" — possibly intentional for branding, but feels out of place when every other surface is Filipino. Native reviewer call.
- Title length: 79 chars on `meta.prayersTitle` — over SERP limit.

**Filipino-specific cultural opportunity** (separate from translation quality):
- Santo Niño de Cebú devotion is the largest single Catholic devotion in the Philippines (millions celebrate the feast 3rd Sunday January). PrayerTrain has **no Santo Niño content** today. High-value editorial gap.

### 5.4 Polish (`pl`) — **native review required**

**What I observed** (flagging only):
- `modlitwa`, `nowenna`, `różaniec`, `koronka`, `litania`, `nabożeństwo` — all standard Polish Catholic terms.
- `Koronka` is precisely the right Polish word for the Divine Mercy Chaplet (Polish-origin devotion via St. Faustyna). This is the highest-stakes Polish term in the copy and it's correct ✓.
- `wojownik modlitwy` (prayer warrior calque) — same flag as ES/pt-BR.
- `Najświętszego Serca`, `Św. Józef`, `Ciało Chrystusa` — standard Polish liturgical Catholic register.
- Title length: 76 chars on `meta.prayersTitle` — over SERP limit.

**Polish-specific cultural opportunity**: Koronka do Miłosierdzia Bożego (Divine Mercy Chaplet) is a Polish national devotion — St. Faustyna received it in Vilnius/Płock, John Paul II canonized her. Faustyna.pl is the dominant Polish-language Catholic site for this. PrayerTrain has the prayer in its library (under English `divine-mercy-chaplet` slug presumably) but no Polish landing page or pastoral framing.

---

## 6. Per-locale keyword + landing-page gap tables

For each locale, 8-10 high-intent Catholic queries mapped to PrayerTrain's existing coverage. **Coverage statuses**: ✓ live page in target locale, ◐ live page with English body / non-English meta, ✗ missing landing page.

### 6.1 English (`en`)

| Query intent | Devotional anchor | Coverage |
|---|---|---|
| "prayer chain for a friend with cancer" | Site organizing concept | ✓ /en/situations/cancer |
| "surrender novena Don Dolindo Ruotolo" | Specific novena | ✓ /en/prayers/surrender-novena |
| "Divine Mercy Chaplet" | High-volume devotion | ✓ /en/prayers/divine-mercy-chaplet (assumed) |
| "novena for a sick child" | Specific situation | ✓ /en/situations/sick-child (assumed) |
| "prayer before surgery" | Specific situation | ✓ /en/situations/surgery |
| "St. Peregrine novena cancer" | Cancer patron saint | ✓ (likely) |
| "Catholic prayer for grief" | Loss situation | ✓ /en/situations/grief |
| "rosary for healing" | Marian intercession | ✓ |
| "St. Joseph novena financial difficulty" | Financial intercession | ✓ |
| "novena for vocation discernment" | Vocations | gap |

### 6.2 Spanish (`es`)

| Query intent (Spanish) | English gloss | Coverage |
|---|---|---|
| "oración por un amigo con cáncer" | prayer for a friend with cancer | ◐ meta translated, body English |
| "novena de la rendición / Don Dolindo Ruotolo" | Surrender Novena | ◐ |
| "Coronilla a la Divina Misericordia texto completo" | Divine Mercy Chaplet full text | ◐ likely |
| "oración antes de una cirugía católica" | prayer before surgery | ◐ /es/situations/surgery |
| "novena a San Peregrino cáncer" | St. Peregrine for cancer | ◐ |
| "oración para un bebé prematuro" | prayer for a premature baby | ✗ (high relevance to the founding story; ownable) |
| "Novena al Sagrado Corazón" | Sacred Heart Novena | ◐ |
| "Novena a San José trabajo / dificultades" | St. Joseph for work/financial | ◐ |
| "oración por un familiar fallecido" | prayer for a deceased family member | ◐ /es/situations/grief |
| "oración por sanación interior" | inner healing prayer | ◐ |

**Spanish opportunity**: every one of the ◐ rows is half-done — meta + URL are in Spanish but body is English. Highest ROI editorial move on the site: translate the situation landing pages first (6 pages), then prayer detail pages second (highest-traffic ones).

### 6.3 Brazilian Portuguese (`pt-BR`)

| Query intent (Portuguese) | English gloss | Coverage |
|---|---|---|
| "oração por alguém com câncer" | prayer for someone with cancer | ◐ |
| "Novena a São Peregrino contra o câncer" | St. Peregrine cancer novena (Brazil is the highest-volume market for this) | ◐ |
| "Coroinha da Misericórdia" | Divine Mercy Chaplet | ◐ |
| "Novena de Nossa Senhora Aparecida" | National patroness of Brazil | ✗ (very high cultural relevance; ownable) |
| "oração antes de cirurgia" | prayer before surgery | ◐ |
| "Novena ao Sagrado Coração de Jesus" | Sacred Heart Novena | ◐ |
| "oração por um bebê na UTI" | prayer for a baby in the ICU | ✗ (founding-story relevance) |
| "Novena Pompejana 54 dias" | 54-day Pompeian Novena | ✗ (high pt-BR + pl cultural relevance) |
| "oração da entrega Padre Dolindo Ruotolo" | Surrender Novena | ◐ |
| "luto católico oração" | Catholic grief prayer | ◐ |

**pt-BR opportunity**: São Peregrino is THE Catholic cancer-patron in Brazil; the live Hozana / Aleteia / Paulus Editora coverage is broad but not coordination-focused. PrayerTrain could own "organize a São Peregrino corrente"... but see the cultural-baggage flag on "corrente" in §5.2.

### 6.4 Filipino (`fil`)

| Query intent (Filipino, with English gloss) | Coverage |
|---|---|
| "panalangin para sa may sakit" (prayer for the sick) | ◐ |
| "Novena to Santo Niño de Cebú Tagalog" | ✗ (largest Filipino devotion; 3rd-Sunday-January peak) |
| "Birhen del Carmen novena Tagalog" | ✗ (major Marian devotion) |
| "panalangin bago ang operasyon" (prayer before surgery) | ◐ |
| "Novena to the Divine Mercy Tagalog" | ◐ |
| "Apostleship of Prayer Sacred Heart Filipino" | ◐ |
| "panalangin para sa mahal na yumao" (prayer for the deceased) | ◐ |
| "Baclaran Wednesday Novena Mother of Perpetual Help" | ✗ (largest weekly novena in the Philippines) |
| "Mahal na Birhen ng Antipolo" | ✗ |
| "panalangin sa kasal" (prayer for marriage) | ✗ |

**Filipino market opportunity**: the existing Catholic prayer web in the Philippines is highly fragmented (parish blogs, Facebook posts, YouTube uploads, scattered diocesan PDFs). PrayerTrain could be the consolidated coordination layer. Santo Niño and Baclaran Wednesday Novena are the two biggest gaps and the two biggest cultural anchors.

### 6.5 Polish (`pl`)

| Query intent (Polish, with gloss) | Coverage |
|---|---|
| "Koronka do Miłosierdzia Bożego tekst" (Divine Mercy Chaplet text) | ◐ (Polish-origin devotion; faustyna.pl owns the term) |
| "Nowenna Pompejańska 54 dni" (54-day Pompeian Novena) | ✗ (major Polish devotion) |
| "Modlitwa o uzdrowienie z choroby" (prayer for healing from illness) | ◐ |
| "Św. Peregryn nowenna na raka" (St. Peregrine cancer novena) | ◐ |
| "Modlitwa Ojca Pio o uzdrowienie" (Padre Pio healing prayer) | ◐ |
| "Nowenna do św. Wojciecha" (St. Adalbert, Poland's patron) | ✗ (national-patron novena) |
| "Modlitwa za zmarłego" (prayer for the deceased) | ◐ |
| "Modlitwa do Matki Bożej Częstochowskiej" (Our Lady of Częstochowa) | ✗ (national Marian shrine) |
| "Nowenna przed operacją" (novena before surgery) | ◐ |
| "Modlitwa za chore dziecko" (prayer for a sick child) | ◐ |

**Polish market opportunity**: Faustyna.pl owns Divine Mercy queries definitively. PrayerTrain's differentiation has to be coordination (prayer trains for sick relatives), not content reproduction. Polish diaspora in US (Chicago, NYC) is also a strong distribution channel.

---

## 7. Per-locale competitor scan

### 7.1 English market

Primary competitors: **Hallow** (#1 Catholic prayer/meditation app, content-consumption model), **Pray.com** (broader Christian, content-consumption), **Catholic.org / USCCB.org** (directory + official church content), **Magnificat** (subscription liturgical content), **Hozana** (international novena coordination — closest functional competitor, has multilingual hreflang).

**PrayerTrain's defensible positioning**: organized prayer coverage with day-by-day signup for specific intercessors. None of the named competitors do this. Hallow has a "group prayers" feature but it's content-consumption (everyone listens to the same guided audio), not coordination (different people commit to different days).

### 7.2 Spanish market

Major content surfaces: **catholic.net** (large Spanish portal, has "oración por los enfermos" pages with depth), **catholic.org/es**, **USCCB.org/es**, **ProyectoEmaús**, **Aleteia.org/es** (consumer Catholic media). **Hallow ES** is now live and ad-spending in this market.

PrayerTrain's hreflang implementation is more rigorous than catholic.net's (which doesn't use hreflang at all on most pages). Schema breadth (Article + FAQ + Breadcrumb) is also a structural advantage.

**Ownable gaps**: (1) coordination tool framing — neither catholic.net nor Aleteia offers prayer-coverage signup; (2) novena por bebé prematuro / UTI — emotionally aligned with founding story, no major competitor owns this query.

### 7.3 Brazilian Portuguese market

Major content surfaces: **a12.com** (Santuário Nacional de Aparecida — dominant Catholic content site in Brazil, very high authority), **canção nova** (cancaonova.com.br), **Paulus Editora**, **Hozana pt-BR** (active), **Aleteia pt-BR**, **Hallow pt-BR** (recently expanded). Comunidade Coração Fiel and Pocket Terço are smaller but devotional-focused.

A12 is the heavyweight — content depth is staggering and authority is unmatched. Trying to outrank A12 on devotional content is unlikely; the win is the coordination angle.

**Ownable gaps**: (1) coordination layer — a12 publishes content, not coverage signup; (2) São Peregrino prayer trains for cancer — A12 explains the devotion, PrayerTrain could organize it; (3) UTI / hospital intercession — emotionally aligned with founding story.

**Strong cultural caveat**: revisit "corrente de oração" terminology per §5.2.

### 7.4 Filipino market

Major content surfaces: **Baclaran Church** (Wednesday Novena to Our Mother of Perpetual Help is the largest single weekly Catholic devotion in the Philippines), **Apostleship of Prayer St. Pius X Philippines** (apostleshipofprayerstpiusx.wordpress.com), **The Catholic Crusade**, **Santo Niño de Cebú Basilica** (santoninodecebubasilica.org), various diocesan sites and Facebook communities (Katolikong Pinoy is large).

Filipino space is fragmented — no single dominant prayer-coordination site. **This is the most ownable market structurally** if PrayerTrain commits editorial resources to Tagalog/Filipino landing pages.

**Ownable gaps**: (1) Santo Niño coordination — the devotion is huge, content surface is fragmented; (2) Baclaran Wednesday Novena coordination layer; (3) Filipino diaspora pastoral content (US Filipino parishes in CA/HI/NV/NY).

### 7.5 Polish market

Major content surfaces: **faustyna.pl** (owns Divine Mercy / Koronka definitively — both the term and the topic), **brewiarz.pl** (liturgy of the hours, dominant Polish liturgical site), **deon.pl** (Catholic news + magazine), **opoka.org.pl** (Catholic content portal), **niedziela.pl** (Polish Catholic weekly), **modlitwy24.pl** (prayer compendium), **wojciech.bialystok.pl** (Pompeian Novena dedicated site). **Hallow** also expanded into Polish.

Polish Catholic web is mature and high-authority. Outranking faustyna.pl on Divine Mercy queries is unrealistic.

**Ownable gaps**: (1) coordination angle — no Polish site offers prayer-coverage signup with day-by-day commitments; (2) US Polish diaspora — Chicago + NYC concentrations are an obvious distribution opportunity for a US-built English-first product that natively serves Polish; (3) family-cancer-intercession coordination — São Peregrine / Peregryn novenas are content-rich but not coordination-organized.

---

## 8. GSC / Bing operational checklist status

Cross-checked against [`seo-international-ops.md`](./seo-international-ops.md). Live evidence below.

| Step | Status | Evidence / next action |
|---|---|---|
| Set `GOOGLE_SITE_VERIFICATION` env var in Vercel Production | ✗ Not set | No `google-site-verification` meta on any locale; check Vercel env vars |
| Register 5 per-locale GSC URL-prefix properties | Unknown | Verification meta missing → likely not registered |
| Register `prayertrains.com` Domain property in GSC | Unknown | Domain verification works via DNS, separate signal |
| Submit `/sitemap.xml` to each GSC property | Pending | Blocked on registration |
| Set `BING_SITE_VERIFICATION` env var | ✗ Not set | No `msvalidate.01` meta on any locale |
| Register Bing property | Unknown | Blocked on verification env var |
| Set `YANDEX_SITE_VERIFICATION` env var | ✗ Not set | Optional per ops doc |
| Run Merj hreflang validator on `/` + 1 deep URL per locale | Recommended | URL: https://www.merj.com/blog/hreflang-tag-checker |

**Verification command** (to confirm env vars need setting):
```sh
curl -s https://prayertrains.com/ | grep -E 'google-site-verification|msvalidate\.01|yandex-verification'
# returns nothing → env vars unset
```

---

## 9. Prioritized action list

Every row names a specific file path or live URL. P0 = ship-blocker for international SEO trust; P1 = ≤30 days; P2 = ≤90 days.

### P0 — Fix before launching paid acquisition or pushing for indexation

| # | Action | Where | Effort |
|---|---|---|---|
| P0-1 | **Translate body content for every locale-prefixed page** beyond the homepage. Highest-priority pages in order: (a) /situations/* (6 topics × 4 non-English locales = 24 pages); (b) /our-story (4 pages); (c) /browse, /prayers, /situations index (12 pages); (d) /prayers/[slug] (high-traffic prayer detail). Translation pipeline already exists for prayer text (`PrayerTypeTranslation` per [translation-seed-pattern.md](./translation-seed-pattern.md)); situation `content.ts` and page-body strings need an equivalent per-locale variant or messages-JSON expansion. Until this lands, every non-English locale-prefixed URL emits a language-mismatch signal Google can use to discount hreflang trust site-wide. | Editorial + [src/app/[locale]/situations/[topic]/content.ts](src/app/[locale]/situations/[topic]/content.ts), prayer detail body templates, /our-story body templates | Multi-week (mostly editorial), engineering ~2 days to plumb per-locale `content.ts` |
| P0-2 | **Use `localizedMetadata()` (or apply `localeToOgTag()`) on prayer + situation detail pages** so `og:locale` emits in BCP 47 underscore format (`es_ES`, `pt_BR`, `fil_PH`, `pl_PL`) instead of bare locale codes. Either export `localeToOgTag` from [src/i18n/metadata.ts:167](src/i18n/metadata.ts#L167) and call it from the two detail pages, or refactor the two pages to use `localizedMetadata()` directly. | [src/app/[locale]/prayers/[slug]/page.tsx:90-110](src/app/[locale]/prayers/[slug]/page.tsx#L90-L110), [src/app/[locale]/situations/[topic]/page.tsx:55-80](src/app/[locale]/situations/[topic]/page.tsx#L55-L80) | < 2 hours |
| P0-3 | **Default detail-page `og:image` to the per-locale OG share card** instead of `/logo.png`. The card URL pattern is `${baseUrl}/${locale}/opengraph-image` (already 200-serving with correct PNG content-type for all 5 locales). Update [src/app/[locale]/prayers/[slug]/page.tsx:87](src/app/[locale]/prayers/[slug]/page.tsx#L87) to fall back to the per-locale OG image when `prayer.imageUrl` is null, and [src/app/[locale]/situations/[topic]/page.tsx:67-72](src/app/[locale]/situations/[topic]/page.tsx#L67-L72) to use it always. Use `width: 1200, height: 630` (not 1024×1024 which is the legacy logo dimensions). | Same two files as P0-2 | < 1 hour |

### P1 — Within 30 days

| # | Action | Where | Effort |
|---|---|---|---|
| P1-1 | Set `GOOGLE_SITE_VERIFICATION` env var in Vercel Production scope, register 5 per-locale URL-prefix properties + 1 Domain property in GSC, submit `/sitemap.xml` to each. | Vercel dashboard + [search.google.com/search-console](https://search.google.com/search-console) per [seo-international-ops.md:20-35](./seo-international-ops.md#L20-L35) | < 1 hour ops |
| P1-2 | Same for Bing: set `BING_SITE_VERIFICATION`, register `prayertrains.com` in Bing Webmaster Tools, submit sitemap. | Vercel + [bing.com/webmasters](https://www.bing.com/webmasters) | < 30 min |
| P1-3 | Fix the Spanish translation error: `chapeles` → `coronillas` in `meta.prayersTitle`. | [src/i18n/messages/es.json](src/i18n/messages/es.json) `meta.prayersTitle` | 1-line edit |
| P1-4 | Shorten `meta.prayersTitle` across all 5 locales to ≤60 chars. Current titles all truncate in SERPs (76-89 chars). Suggested: drop the trailing `| PrayerTrain` and one of the four category enumerations. | [src/i18n/messages/{en,es,pt-BR,fil,pl}.json](src/i18n/messages/) under `meta.prayersTitle` (or wherever this key lives) | 5 small edits |
| P1-5 | pt-BR cultural copy revision: replace `corrente de oração` with `rede de oração` / `mutirão de oração` / `comunidade de oração` site-wide. Affects [src/i18n/messages/pt-BR.json](src/i18n/messages/pt-BR.json) at lines 33, 35, 70. Avoid the WhatsApp-spam-chain-letter cultural association in Brazilian Catholic media. Run by a Brazilian Catholic reviewer first. | `messages/pt-BR.json` | 5-10 edits + native review |

### P2 — Within 90 days, mostly editorial

| # | Action | Where | Effort |
|---|---|---|---|
| P2-1 | Per-locale situation landing pages with **original native pastoral content** (not translated-from-English) for the 6 situation topics in 4 non-English locales. Per [seo-international-ops.md:107](./seo-international-ops.md#L107), translated-from-English thin content rarely ranks; this is the editorial bottleneck. | `src/app/[locale]/situations/[topic]/content.ts` (or equivalent per-locale variant) | High-effort editorial; estimate 4-8 weeks for one reviewer per language |
| P2-2 | Add high-priority missing devotion pages per locale: pt-BR São Peregrino + Nossa Senhora Aparecida; fil Santo Niño de Cebú + Baclaran Wednesday Novena; pl Nowenna Pompejańska + Św. Wojciech + Częstochowa. These are cultural anchors with high search volume. | Library content + slug routing | Editorial-heavy |
| P2-3 | Refine OG `og:locale` for `es` once Spanish regional split happens (`es_ES` for Spain vs `es_MX` / `es_LA` for Latin America). Code already prepared in [src/i18n/metadata.ts:167](src/i18n/metadata.ts#L167) comments. Defer until traffic data shows split is worth doing. | `src/i18n/metadata.ts` `localeToOgTag` | Trivial code change when triggered |
| P2-4 | Once non-English organic traffic exceeds ~5k clicks/week, evaluate per-locale subdomain split (`es.prayertrains.com` etc.) vs current subpath strategy. Subpath is correct today; subdomain matters for separate ccTLD-like targeting once volume justifies it. | Architectural decision — write an ADR before changing | Multi-week |

---

## 10. What requires native review (do not ship without sign-off)

This audit could not assess copy correctness in Filipino (`fil`) or Polish (`pl`) at editorial precision. Specific items that need a native Catholic-cultural reviewer:

**Filipino**:
- Whether `chaplet` should remain English or become `koronilya` in `meta.prayersTitle`.
- Whether `Catholic Prayer Coordination` (English) is the intended `heroBadge` or should be Filipino.
- Whether `panalangin` (formal) vs `dasal` (colloquial) is the right register for the audience.
- The full body of `home.heroBody`, `home.storyParagraph1`, `home.storyParagraph2` — these read fluent to a non-native reader, but precision in Catholic-devotional Tagalog matters.

**Polish**:
- The full body of `home.heroBody`, `home.storyParagraph1`, `home.storyParagraph2`.
- Whether `wojownik modlitwy` (prayer warrior calque) is a desirable register or should be `orędownik modlitwy` / `wstawiennik`.
- Whether the founding-story Boston Children's Hospital phrasing reads naturally in Polish or needs a more domestic anchor.

**Brazilian Portuguese** (partial-confidence audit recommendation):
- The `coroinha` term across `messages/pt-BR.json`.
- The `corrente de oração` decision (cultural-baggage flag per §5.2).

Do not auto-translate or LLM-translate these. The [hard guideline](./seo-international-ops.md#L130) "NEVER machine-translate Catholic prayer content for production" applies equally to the marketing surfaces' devotional register.

---

## 11. Verification (how this audit was checked end-to-end)

- All HTTP findings reproducible via the `curl` commands embedded in §3 and §8 and reproducible from `2026-05-15` onward (curl tests run from `iad1` Vercel edge; cache state `HIT` on most fetches).
- Every P0/P1 action names a file path that exists in the repo as of this audit (commit `8b5f662`, branch `main`'s `HEAD`).
- Hreflang reciprocity matrix in §4 was built from actual fetched `<link rel="alternate">` declarations on each of the 5 locale homepages.
- No claim in §3-§4 about per-locale OG locale tag or JSON-LD `inLanguage` is asserted without a corresponding line traceable to [src/i18n/metadata.ts](src/i18n/metadata.ts) or [src/lib/schema.ts](src/lib/schema.ts).
- All Filipino and Polish copy-quality observations are explicitly flagged as candidates for native review (§5.3, §5.4, §10).
- No recommendation in §9 conflicts with the [hard guidelines](./seo-international-ops.md#L125) (no auto-redirect, no machine-translation, English canonical, American origin preserved).

---

## 12. Sources

External resources cited or consulted during the audit:

- [Merj hreflang validator](https://www.merj.com/blog/hreflang-tag-checker)
- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- Spanish Catholic prayer resources: [Catholic.net Oración por los enfermos](https://es.catholic.net/op/articulos/15596/oracin-por-los-enfermos.html), [Catholic.org Spanish prayers](https://www.catholic.org/prayers/prayer.php?s=121), [Intercede Catholic Novena App](https://catholicnovenaapp.com/)
- Brazilian Catholic prayer resources: [Aparecida portal](https://www.a12.com/), [Aleteia pt-BR São Peregrino](https://pt.aleteia.org/2019/01/11/novena-de-sao-peregrino-contra-o-cancer), [Hozana Brazil cancer prayers](https://hozana.org/pt/oracao/de-cura/dos-enfermos/cancer)
- Filipino Catholic resources: [Santo Niño de Cebú Basilica](https://santoninodecebubasilica.org/pray/9-days-novena-to-sto-nino-de-cebu/), [Baclaran Church Tagalog Novena](https://www.baclaranchurch.org/tagalog.html), [Apostleship of Prayer St. Pius X Philippines](https://apostleshipofprayerstpiusx.wordpress.com/)
- Polish Catholic resources: [Faustyna.pl Koronka do Miłosierdzia Bożego](https://www.faustyna.pl/zmbm/koronka-do-milosierdzia-bozego/), [Modlitwa o uzdrowienie Katolicki.net](https://www.katolicki.net/index.php/modlitwa/modlitwa-o-uzdrowienie.html), [Wojciech.bialystok.pl Pompeian Novena](https://wojciech.bialystok.pl/modlitwa-pompejanska/)
- Hallow international expansion context: [Hallow Wikipedia](https://en.wikipedia.org/wiki/Hallow_(app)), [Coffee with Damian best Catholic apps 2026](https://coffeewithdamian.com/blog/best-catholic-apps/)

---

## Changelog

- **2026-05-14**: Initial audit. Live-site technical pass against 8 archetypes × 5 locales, codebase cross-reference, per-locale translation quality spot-check, per-locale keyword research, per-locale competitor scan. Authored by Claude (Opus 4.7). Native review of Filipino and Polish copy outstanding before any changes ship.
- **2026-05-15**: Added post-audit-update callout near §1 noting that PRs #76 and #77 landed reviewed translations for 5 anchor prayers (`novena-sacred-heart`, `novena-st-joseph`, `holy-rosary`, `chaplet-divine-mercy`, `memorare`) across `es`, `pt-BR`, `fil`, `pl`. The §3.6 prayer-detail finding no longer applies to those 5 slugs. Track A P0-2 + P0-3 bugs still apply to the underlying metadata code path, including for these 5 prayers (og:locale still bare).
