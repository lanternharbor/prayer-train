# Internationalization Roadmap

**Status**: groundwork laid May 12, 2026. Full implementation deferred —
this doc captures the plan so the next pass starts on stable footing.

**Why this matters**: PrayerTrain today assumes English-speaking,
US-based, post-Vatican-II Catholic users. That's a small slice of the
worldwide Church. Spanish-speaking parishes in the US alone already
exceed our current English audience; Latin American, Filipino, African,
Polish, and Vietnamese Catholic communities are larger still. The
pastoral mission of "organize prayer for someone you love" should be
available in the language people actually pray in.

This is not a translation polish task. It's a structural product
decision about who PrayerTrain is for.

---

## What's already in place (May 12, 2026)

- `src/lib/utils.ts` exports `DEFAULT_LOCALE` and a `formatDateLocale`
  helper. All previously hardcoded `toLocaleDateString("en-US", ...)`
  callsites in core user-facing flows now route through these helpers
  so a future request-scoped locale can drop in without churning every
  callsite. Remaining `"en-US"` literal: `src/lib/bouquet-pdf.tsx`
  (PDF keepsake — should follow the train's language field once it
  exists; intentionally not migrated yet).
- `src/lib/dates.ts` already centralizes timezone handling around
  `DEFAULT_DISPLAY_TZ` (canonical East Coast); the same pattern
  generalizes naturally to train-level timezones.
- Public train + chain pages now default to **private (link-only)**
  rather than publicly indexed. This matters for international rollout
  because GDPR-style consent expectations make implicit public
  indexing of medical/grief content legally and pastorally indefensible.

---

## Recommended rollout order

### Phase 1 — UI shell translation (estimate: 1-2 weeks)

Add `next-intl` (the Next.js App Router-native i18n library — better
fit than `react-i18next` for our route-segment architecture):

1. Add a `locale` route segment: `app/[locale]/...`. URLs become
   `/es/prayers/...`, `/pt/situations/...`, etc. Default English stays
   at the bare path (`/prayers`) via `defaultLocale: "en"` and no
   forced prefix.
2. Extract all hardcoded user-facing English strings into
   `src/i18n/messages/{en,es,...}.json`. Start with: site header/footer,
   homepage hero + sections, browse, create-train wizard, create-chain
   form, public train page (`/p/[slug]`), public chain page
   (`/chain/[slug]`), prayer library list, sign-in flow.
3. Add a language switcher to the site header (next to Sign In). Stores
   the choice in a `NEXT_LOCALE` cookie so future visits respect it.
4. Keep validation errors and server-action error messages **English
   for now**. Translating those requires plumbing the locale through
   to server actions; out of scope for phase 1.

Acceptance: a Spanish speaker can navigate the marketing surfaces,
create a private train, claim a slot, and see the calendar in Spanish.
Emails and prayer texts still in English.

### Phase 2 — Transactional emails (estimate: 1 week)

Add a `language` column to `PrayerTrain` and `PrayerChain`. Default
`"en"`. Capture from the organizer's UI locale at creation time, but
let them override it.

Update the four email templates (`sendDailyReminder`,
`sendChainDailyReminder`, `sendChainCompletion`, `sendBouquetEmail`)
to look up strings from `src/i18n/email/{en,es,...}.ts` keyed by the
train's language. The English strings move out of the template files
into the en file unchanged.

Footer unsubscribe links and "Sent via PrayerTrain" footers also
localize. Subject lines too.

Acceptance: an organizer in Mexico creates a chain in Spanish; her
members receive Spanish daily reminders.

### Phase 3 — Prayer content translations (estimate: 4-8 weeks per
language, mostly review work)

**This is the hard one — DO NOT machine-translate Catholic prayers as
final production copy.**

Many traditional Catholic prayers (Hail Mary, Our Father, Memorare,
Novena to the Sacred Heart, Surrender Novena, etc.) have established,
approved translations in major languages. The "right" Spanish Hail
Mary is the one Spanish-speaking Catholics already pray. Machine
translation will produce something doctrinally and devotionally off,
and a Spanish-speaking organizer will recognize it immediately as
"made-up Catholic Spanish." That kills trust pastorally.

Schema model (recommended):

```prisma
model PrayerTypeTranslation {
  id                 String   @id @default(cuid())
  prayerTypeId       String
  prayerType         PrayerType @relation(fields: [prayerTypeId], references: [id], onDelete: Cascade)
  locale             String   // "es-MX", "es-ES", "pt-BR", "la", etc.
  name               String
  description        String   @db.Text
  prayerText         String   @db.Text
  instructions       String?  @db.Text
  dailyReflections   Json     // array of strings, parallel to en
  // Editorial provenance
  source             String?  // "USCCB", "Vatican.va", "Catholic Book Publishing 1962", etc.
  reviewedAt         DateTime?
  reviewedBy         String?
  reviewerNote       String?  @db.Text

  @@unique([prayerTypeId, locale])
}
```

Rollout per language:
- **Country variants matter**: store as `es-MX` / `es-ES` / `pt-BR` /
  `pt-PT`. Default to the macro-language (`es`, `pt`) when the
  specific variant is missing.
- Seed each translation from a reputable source (USCCB Spanish daily
  readings, Vatican.va, an approved national bishops' conference). Do
  not paste from random Catholic blogs.
- Track who reviewed each translation. The Spina/Wilson moment of
  trust came from "Fr. Palladino reviewed the theology" — Spanish
  rollout needs the same. A bilingual priest or competent religious
  reviews before activation.
- **Latin**: belongs as devotional CONTENT (Latin Mass devotees, Latin
  Memorare for those who want it), not as a UI language. Add Latin as
  an alternate prayer text option, not a locale.

### Phase 4 — Country / parish / location (estimate: 1 week)

Currently the create wizard captures `parish`, `location`, and (in some
spots) US state assumptions. International rollout:

- Add `country` (ISO 3166-1 alpha-2, e.g. "MX", "BR", "PH") to
  `PrayerTrain` and `PrayerChain`. Default to `"US"` for existing rows;
  capture from the organizer at create time going forward.
- Replace any US-state dropdowns with free-text location fields
  (parishes everywhere already write addresses in their own format).
- Future: parish lookup by country. Today the parish field is
  free-text — keep it that way. A real parish directory (something
  like a curated Google Sheet by diocese) is a multi-quarter project,
  not a v1 i18n move.

### Phase 5 — Timezones (estimate: 1 week, careful)

Today the codebase pins everything to `DEFAULT_DISPLAY_TZ` (East
Coast) via `src/lib/dates.ts`. That's wrong for trains organized from
Mexico City, São Paulo, Manila, etc.

Plan:
- Add `timezone` (IANA, e.g. `America/Mexico_City`) to `PrayerTrain`
  and `PrayerChain`. Capture at create time from the browser
  (`Intl.DateTimeFormat().resolvedOptions().timeZone`); let organizer
  override.
- All cron timing (`/api/cron/daily-reminders`,
  `/api/cron/chain-reminders`) currently fires at one Vercel-cron
  schedule. Easiest move: bucket trains by timezone, fire each bucket
  at the right local time. Vercel Cron supports multiple cron
  expressions in `vercel.json`.
- "Today" displays (day-N counter in chain, day-of calendar
  highlighting in train) pivot off the train's timezone, not the
  viewer's.
- **Safety**: do not flip timezone handling for existing trains
  without an explicit opt-in. A train silently jumping from
  America/New_York to America/Los_Angeles mid-flight would break
  member expectations. Existing trains stay on the canonical TZ;
  new trains get the new behavior.

### Phase 6 — SEO and growth (estimate: 1-2 weeks)

Only after Phase 1 (UI shell) is solid:

- Add `hreflang` link tags on every public page mapping the route to
  its translated siblings (`<link rel="alternate" hreflang="es"
  href="/es/situations/illness" />`).
- Translated `sitemap.xml` entries.
- Localized OG/Twitter metadata.
- Localized `/situations/[topic]` content. **These are the highest-
  value SEO surfaces today** ("oración por un enfermo de cáncer", "oração
  por um pai doente" — high-intent, low-competition Catholic queries
  not covered by USCCB or Vatican.va).
- **Don't create thin translated pages**. A `/es/situations/illness`
  with a one-paragraph translated lede and English prayer text below
  will rank for nothing and will look like spam. Each localized
  situation page needs at least 600-800 words of original Spanish
  pastoral content + properly translated prayer text.

---

## What to avoid

- **Giant i18n rewrite in one branch.** Phase-by-phase. Each phase
  ships and works on its own.
- **Machine-translated Catholic prayers as production copy.** Use
  approved translations. If none exists, leave the slot empty and
  fall back to the English text rather than ship something
  doctrinally wrong.
- **Implicit public visibility in new locales.** The May 12 audit
  flipped public visibility to opt-in for exactly this reason —
  GDPR-style consent expectations are stricter than US norms. A new
  locale shouldn't quietly start indexing medical content.
- **Country-specific legal compliance as a code feature.** GDPR, LGPD,
  ePrivacy, etc. are policy + UX decisions, not just feature flags.
  Loop in someone qualified before launching in EU/UK/Brazil.
- **Translating the homepage hero before the create-flow works in the
  same language.** A Spanish marketing surface that funnels into an
  English wizard is worse than not translating at all — the visitor
  experiences a broken promise on the form.

---

## First-language priority

1. **Spanish (`es-MX` first, `es-ES` second)**. Largest Catholic
   population worldwide; large US Hispanic Catholic population already
   underserved by English-only parish tools; many Latin American
   parishes already use Catholic apps.
2. **Portuguese (`pt-BR`)**. Brazil alone is the world's largest
   Catholic country.
3. **Filipino / Tagalog (`fil`)**. Highly engaged Catholic
   population, strong English literacy makes phase 1 (UI) cheap, but
   Tagalog prayer content (especially the Rosary, the Santo Niño
   devotions, Simbang Gabi context) has deep local tradition worth
   capturing.

Subsequent: Polish, French, Italian, Vietnamese, Korean. Each requires
its own pastoral review.

---

## Open questions to resolve before phase 1 ships

- **Whose locale wins?** Train language vs. organizer locale vs.
  volunteer browser locale. Initial proposal: train language wins for
  emails (the organizer chose Spanish for the family, so reminders go
  in Spanish even if the volunteer's browser is English). UI follows
  viewer's browser locale + cookie override.
- **Anonymity / consent copy in non-English locales.** Current
  privacy + terms pages are English. A Spanish-language create flow
  that links to English terms is a regression. Phase 1 should include
  translated privacy + terms (or a banner that the policies are
  available in English only and link out).
- **Email "from" address localization.** Resend allows per-locale
  sender displays. Worth using.
- **Dates in emails.** Currently use the bouquet-PDF generator's
  hardcoded en-US. Phase 2 routes these through the same train-
  language lookup.

---

## Not in scope for this doc

- A full global parish directory.
- Liturgical-calendar awareness (feast days vary by country).
- Indigenous-language support (Mayan, Quechua, Tagalog dialects).
  Worth thinking about eventually; not phase 1.
- Right-to-left support (Arabic for Lebanese Maronite Catholics, etc.).
  Tailwind has RTL primitives; adding it later is a layout pass, not
  a structural blocker.
