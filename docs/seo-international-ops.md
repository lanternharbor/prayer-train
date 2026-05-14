# International SEO operations

Operational playbook for Phase ζ — getting each locale's URL subdirectory indexed, monitored, and improving in SERP performance. Engineering for international SEO (URL routing, hreflang, JSON-LD `inLanguage`, sitemap × locale cross-product) is already live; this doc is the operational follow-through.

## Where each locale stands

After PR #65 merge (Phase δ):

- **5 locales**: en, es, pt-BR, fil, pl
- **URL pattern**: subdirectory per locale (`/es/`, `/pt-BR/`, `/fil/`, `/pl/`); bare URL is canonical English
- **Sitemap**: 390 URLs total — 78 unique paths × 5 locales, full cross-locale alternates per entry
- **Every page** emits `<link rel="alternate" hreflang>` for all 5 locales + `x-default`
- **Every page** emits JSON-LD `inLanguage` matching the URL's locale
- **No live translations yet** — every locale renders English fallback at read time until Phase ε editorial work lands reviewed entries

## Search Console + Bing Webmaster Tools setup

### Google Search Console

Two ways to register PrayerTrain with GSC; we use the **per-locale property** model for clearer analytics:

1. Sign in to https://search.google.com/search-console with the verified owner account
2. Add a property of type **URL prefix** for each locale subdirectory:
   - `https://prayertrains.com/` (English/default)
   - `https://prayertrains.com/es/`
   - `https://prayertrains.com/pt-BR/`
   - `https://prayertrains.com/fil/`
   - `https://prayertrains.com/pl/`
3. Verify ownership. The easiest path is the **HTML tag** method:
   - GSC gives you a value like `1A2B3C4D5E6F...`
   - Set the env var `GOOGLE_SITE_VERIFICATION=<value>` in Vercel (Production scope)
   - Redeploy → the verification meta tag emits on every page
   - Hit "Verify" in GSC
4. **Submit each locale's sitemap section** in the property's Sitemaps panel. We have a single `/sitemap.xml` covering all locales; GSC understands the per-property scoping automatically when you submit it under each property.
5. Add the brand domain itself (`prayertrains.com`) as a **Domain property** as well — it captures cross-locale aggregate traffic and is useful for "international targeting" overview.

### Bing Webmaster Tools

Single property covers the whole site (Bing doesn't split per-subdirectory the way GSC does for analytics):

1. Sign in to https://www.bing.com/webmasters
2. Add `https://prayertrains.com/`
3. Verify via the **Meta tag** method:
   - Bing gives you a value
   - Set `BING_SITE_VERIFICATION=<value>` in Vercel (Production scope)
   - Redeploy → the meta tag emits (uses `msvalidate.01` name per Bing's spec)
4. Submit `https://prayertrains.com/sitemap.xml`

Bing is significant in some target markets — Brazil + the Philippines have meaningful Bing market share. Polish desktop usage tracks closer to Google share but Bing is still worth claiming.

### (Optional) Yandex

If we ever target Polish-Catholic diaspora in Eastern Europe or otherwise need Russian-language search visibility:

- `YANDEX_SITE_VERIFICATION=<value>` env var
- Yandex Webmaster: https://webmaster.yandex.com/

The meta tag emits via the same mechanism in `src/app/[locale]/layout.tsx`.

## Verification meta-tag mechanism

`src/app/[locale]/layout.tsx` reads three env vars and emits the corresponding meta tags only when the var is set:

| Env var | Output |
|---|---|
| `GOOGLE_SITE_VERIFICATION` | `<meta name="google-site-verification" content="...">` |
| `BING_SITE_VERIFICATION` | `<meta name="msvalidate.01" content="...">` |
| `YANDEX_SITE_VERIFICATION` | `<meta name="yandex-verification" content="...">` |

If no vars are set, no verification meta tags are emitted (clean for dev / preview deploys). Setting them only in Production scope on Vercel keeps preview deploys from accidentally claiming the property.

## Hreflang validation

After any merge that adds/removes a locale or changes the URL routing, validate the hreflang annotations end-to-end:

1. **Merj's free validator**: https://www.merj.com/blog/hreflang-tag-checker
   - Paste in `https://prayertrains.com/` and `https://prayertrains.com/es/browse` (one root URL + one deep URL per locale)
   - Confirms reciprocal hreflang (every locale lists every other locale)
   - Catches missing `x-default`
2. **GSC International Targeting** report (under "Legacy tools and reports → International Targeting" or the Coverage panel):
   - Shows hreflang errors Google detects across the crawl
   - Lag time: ~24h after sitemap submission for the first signals; 1-2 weeks for steady state
3. **Manual spot-check** — curl any page and verify:
   ```sh
   curl -s https://prayertrains.com/pt-BR/browse | grep -oiE '<link[^>]*hreflang[^>]*>'
   ```
   Should return 6 lines: en, es, pt-BR, fil, pl, x-default.

## Per-locale operational signals to watch

GSC shows per-locale impressions + clicks broken out by property. Useful rhythms:

- **Week 1-2 post-deploy**: confirm pages are getting **indexed** (Coverage report → "Valid")
- **Week 2-4**: first **impressions** start to register for English (en-baseline). Non-English locales lag because crawler frequency is lower for newer URLs
- **Week 4-8**: per-locale impressions appear for es, pt-BR, fil, pl. Click-through rate is low (< 0.5%) initially because the translated UI alone doesn't change English-speaker intent; non-English searchers find pages via situation-specific queries
- **Week 8-12**: first **clicks** from non-English searchers. The hreflang + JSON-LD `inLanguage` signals are doing their job — a Spanish searcher's SERP shows `/es/...` URLs, not `/en/...`
- **Quarter 1 retrospective**: which locale is gaining? Where's the editorial-content opportunity (translated landing pages — see below)?

## What ranks vs what doesn't

Per the Phase ζ playbook:

| Pattern | Ranks |
|---|---|
| **Original Catholic-content pastoral writing** (600-1200 words) authored in the target language by a bilingual reviewer | Yes |
| **Translated-from-English thin content** (200-300 words of literal translation) | Rarely — Google deprioritizes "low-uniqueness" multilingual surfaces |
| **Pure UI chrome translation** (LocaleSwitcher, button labels) on otherwise-English content | No SEO benefit; visitors-already-on-site only |
| **Translated prayer text from approved Catholic sources** (USCCB, CNBB, etc.) | Yes — pairs with original pastoral content; tier-up signal |

This is why Phase ε (per-prayer translated content) and the upcoming **per-locale situation landing pages** matter more than UI shell translation alone. The Spanish library entry for `/es/prayers/novena-sacred-heart` needs Spanish pastoral framing, Spanish historical context, and the canonical Spanish prayer text (when reviewed translations land) — not just a Spanish translation of the English description.

## What's NOT yet engineering-blocked

These are editorial efforts the engineering scaffold already supports:

- **Locale-specific situation landing pages** (`/es/situations/cancer` with 600-800 words of ORIGINAL Spanish pastoral content). Today `content.ts` is English-only; per-locale `content.ts` variants are a future PR. The scaffold (per-locale routing, hreflang, generateMetadata) is ready.
- **Translated prayer-content seed entries** — see `docs/translation-seed-pattern.md`. Add entries to `prisma/seed/translations/<locale>.ts`, reviewer signs off, run `npm run db:seed:translations` against prod.
- **Per-locale OG share-card images** — currently every locale uses `/logo.png` for OG/Twitter cards. Per-locale variants (with text in the locale's language) would lift social-share click-through. Engineering work: add `<locale>-og.png` assets to `public/` and thread per-locale into `localizedMetadata`.

## What IS engineering-blocked

- **Translated prayer-content search**. `/prayers?q=oración` currently matches the English `name` column; it can't find prayers via their Spanish translation. Phase ζ.5 work: full-text search across the `PrayerTypeTranslation.name + description + prayerText` columns. Adds a Postgres GIN index. Mechanical but not yet scoped.
- **A `/sitemap-news.xml` for prayer-train update feed** — if PrayerTrain ever publishes Catholic-content articles (Phase ζ+), a news sitemap would surface them. Not on the immediate roadmap.

## Hard guidelines (from the international plan)

These constraints stay live across every Phase ζ effort:

1. **NEVER auto-redirect based on cookie/Accept-Language**. Google guidelines treat that as cloaking-adjacent. Render the language the URL specifies; offer the switcher; let the user choose.
2. **NEVER machine-translate Catholic prayer content for production**. Approved Catholic sources only. The DB schema's `reviewedAt` gate enforces this at read time.
3. **English is canonical**. The bare URL (`prayertrains.com/`) renders English; the `x-default` hreflang points at it. No locale degrades the English experience or its SEO surface.
4. **American origin preserved across locales**. "Built in Massachusetts" translates faithfully — it doesn't disappear in non-English locales. The three-children Massachusetts founding story stays in `our-story` for every locale.

## Changelog

- **2026-05-14**: Initial version. Documents GSC + Bing Webmaster Tools setup, hreflang validator URL, per-locale operational signals to watch, verification meta-tag env-var mechanism, and Phase ζ priorities.
