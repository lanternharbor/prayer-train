# Lantern Harbor Integration — Implementation Plan

> Status: **Planned, not yet implemented.** Draft doc. Approve and tell me to ship.
> Created: 2026-04-20

## Context

Lantern Harbor LLC is the parent holding entity for the operator's software projects. PrayerTrain becomes "a Lantern Harbor project" — same product, same domain, same brand visually, but with the parent company acknowledged in attribution and legal docs. This is a minimal umbrella move, not a rebrand.

**What changes**: footer attribution, privacy policy operator identity, terms of service operator identity + governing law, JSON-LD parent organization, README.

**What doesn't change**: domain (`prayertrains.com` / `ourfaithtrain.com`), UI/visual design, product name, contact email for users (`hello@prayertrains.com`), sign-in flow, prayer library, any user-facing flows.

## Pre-implementation checklist — confirm before I code it

Four small things I need from you before starting:

1. **LH LLC state of formation** — governs the "governing law" clause in `terms/page.tsx`. Common choices: Delaware (tax/corporate-friendly), Massachusetts (if that's where you are), or wherever you actually filed.
2. **LH LLC legal mailing address** — optional, but if you want it in the privacy policy as a "data controller" address, I need the full postal address. A PO box is fine. If you skip this, we just use the `legal@lanternharbor.co` email.
3. **Legal contact email** — two options:
   - Keep only `hello@prayertrains.com` (simplest; all mail goes there)
   - Add `legal@lanternharbor.co` for legal / DMCA / privacy notices, keep `hello@prayertrains.com` for product
4. **Footer copy preference** — pick one:
   - (a) `© {year} Lantern Harbor LLC. Built with faith and love.` — compact corporate
   - (b) `© {year} PrayerTrain, a Lantern Harbor project. Built with faith and love.` — dual identity (recommended)
   - (c) Keep current copyright, add a separate line `Part of the Lantern Harbor family` — least intrusive
5. **README "Inspiration" section** — currently credits the Keough extended family. Keep as-is (personal founding story) or generalize (remove family name)? Recommend: keep as-is — it's the authentic "why this exists" story and LH being the operator doesn't invalidate it.

## Scope — 5 files, one commit

### 1. Footer attribution

**File:** `src/components/layout/footer.tsx`

Replace the existing copyright `<p>` on line 108-111. Exact text depends on your pick above; my recommended default (option b):

```tsx
<p className="text-xs text-muted-foreground">
  © {new Date().getFullYear()} PrayerTrain, a{" "}
  <a
    href="https://lanternharbor.co"
    className="hover:text-foreground transition-colors underline-offset-2 hover:underline"
    target="_blank"
    rel="noopener noreferrer"
  >
    Lantern Harbor
  </a>{" "}
  project. Built with faith and love.
</p>
```

Everything else in the footer stays exactly as-is.

### 2. Privacy policy — operator identity

**File:** `src/app/privacy/page.tsx`

**Line 10**: update `LAST_UPDATED` to implementation date.

**Line 42-48** (currently "PrayerTrain is operated by an individual maintainer. Questions about this policy or your data can be sent to hello@prayertrains.com..."):

Replace with:

```tsx
<p>
  PrayerTrain is operated by <strong>Lantern Harbor LLC</strong>, a
  [STATE] limited liability company. Questions about this policy or
  your data can be sent to{" "}
  <a href="mailto:legal@lanternharbor.co" className="...">
    legal@lanternharbor.co
  </a>{" "}
  (for privacy or legal matters) or{" "}
  <a href="mailto:hello@prayertrains.com" className="...">
    hello@prayertrains.com
  </a>{" "}
  (for everything else). You can also reply to any email the Service
  sends you.
</p>
```

`[STATE]` gets swapped for the state from the pre-impl checklist. If you chose to keep only `hello@prayertrains.com`, drop the `legal@lanternharbor.co` reference.

**Optional, recommended**: add a new "Data controller" section after "Who runs PrayerTrain", before "Information you give us":

```tsx
<section>
  <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
    Data controller
  </h2>
  <p>
    For the purposes of the EU General Data Protection Regulation (GDPR)
    and similar laws, the data controller for PrayerTrain is{" "}
    <strong>Lantern Harbor LLC</strong>. You can contact our privacy
    point of contact at{" "}
    <a href="mailto:legal@lanternharbor.co">legal@lanternharbor.co</a>.
  </p>
</section>
```

### 3. Terms of service — legal entity + governing law

**File:** `src/app/terms/page.tsx`

**Line 10**: update `LAST_UPDATED`.

**Line 26-29** (currently "These terms...are an agreement between you and the person who operates the Service"):

Replace with:

```tsx
<p>
  Welcome to PrayerTrain (the &ldquo;Service&rdquo;). These terms
  (the &ldquo;Terms&rdquo;) are an agreement between you and{" "}
  <strong>Lantern Harbor LLC</strong>, a [STATE] limited liability
  company (&ldquo;Lantern Harbor,&rdquo; &ldquo;we,&rdquo;
  &ldquo;our&rdquo;). By using the Service you agree to them. If
  you do not agree, please do not use the Service.
</p>
```

**Line 95** (currently "laws of the jurisdiction you are in or that we operate from"): replace `we operate from` with `Lantern Harbor operates from`.

**Line 167-174** (limitation of liability, currently "the Service's operator is not liable..."): replace `the Service's operator` with `Lantern Harbor`.

**New section, after "Termination"** (around line 180):

```tsx
<section>
  <h2 className="font-heading text-2xl font-semibold text-navy-800 mt-10 mb-4">
    Governing law
  </h2>
  <p>
    These Terms are governed by the laws of the State of [STATE],
    United States, without regard to its conflict-of-laws principles.
    Any dispute arising out of or relating to these Terms or the
    Service will be resolved in the state or federal courts located
    in [STATE], and you consent to the personal jurisdiction of those
    courts.
  </p>
</section>
```

### 4. Schema.org parent organization

**File:** `src/lib/schema.ts`

Add `parentOrganization` field to `organizationSchema()`. Current function returns:

```ts
return {
  "@context": SCHEMA_CONTEXT,
  "@type": "Organization",
  name: "PrayerTrain",
  url: baseUrl,
  description: "Like a meal train, but for prayers.",
  logo: `${baseUrl}/logo.png`,
  contactPoint: { ... },
};
```

Add one field:

```ts
parentOrganization: {
  "@type": "Organization",
  name: "Lantern Harbor LLC",
  url: "https://lanternharbor.co",
},
```

This tells Google's Knowledge Graph and similar consumers that PrayerTrain is a sub-brand / project of Lantern Harbor — good for disambiguation if LH ever has other public properties.

### 5. README umbrella line

**File:** `README.md`

After line 8 (end of the intro paragraph), add:

```md
PrayerTrain is a project of [Lantern Harbor LLC](https://lanternharbor.co).
```

Keep the "Inspiration" section on line 190-198 exactly as it is — that's the founding story, not a corporate fact that changes with the LLC filing.

## Files touched

| File | Change |
|---|---|
| `src/components/layout/footer.tsx` | Copyright line updated with LH attribution + link |
| `src/app/privacy/page.tsx` | Operator = Lantern Harbor LLC; optional GDPR data-controller section; new `LAST_UPDATED` |
| `src/app/terms/page.tsx` | Legal entity = Lantern Harbor LLC; new "Governing law" section; new `LAST_UPDATED` |
| `src/lib/schema.ts` | `parentOrganization` in `organizationSchema()` |
| `README.md` | "Project of Lantern Harbor LLC" line near top |

No other files change.

## Verification (at implementation time)

1. `npm run build` — all 19 routes compile, no type errors.
2. `npx eslint src/` — 0 errors, 0 warnings (maintain the streak from the polish pass).
3. Dev server (`npm run dev`):
   - Homepage footer shows "© 2026 PrayerTrain, a Lantern Harbor project" with link to https://lanternharbor.co.
   - `/privacy` renders the Lantern Harbor LLC operator identity + correct LAST_UPDATED.
   - `/terms` renders the Lantern Harbor LLC reference + Governing law section.
   - View-source on `/`: `<script type="application/ld+json">` for Organization contains `"parentOrganization":{"name":"Lantern Harbor LLC","url":"https://lanternharbor.co"}`.
4. Paste the updated Organization JSON-LD into https://validator.schema.org — zero errors.
5. `curl -sI https://lanternharbor.co` — confirm the link destination returns 200 (or 301/302 to a valid destination) so we're not shipping a dead link. **Pre-implementation prerequisite: either the site exists or we agree to ship the link anyway with DNS pending.**

## Commit + push policy

Single commit. Recommended message:

```
Bring PrayerTrain under the Lantern Harbor LLC umbrella

Lantern Harbor LLC is the operating entity for PrayerTrain. This commit
formalizes that relationship across the attribution + legal surface:

- Footer: PrayerTrain is now attributed as "a Lantern Harbor project"
  with a link to lanternharbor.co.
- Privacy policy: Lantern Harbor LLC identified as the operator and
  data controller. New legal contact at legal@lanternharbor.co.
- Terms of service: Lantern Harbor LLC is the contracting party.
  New Governing law section names the LLC's state of formation.
- JSON-LD: PrayerTrain's Organization schema now declares
  parentOrganization = Lantern Harbor LLC.
- README: project credited to Lantern Harbor near the top.

No user-facing product changes; same domain, same brand.
```

Push to `main` as before. Vercel auto-deploys.

## Out of scope for this plan (separate tracks)

These are real and adjacent, but not code changes for this PR:

- **GitHub org migration** — move `wkeough-maker/prayer-train` → `lantern-harbor/prayer-train` (or whatever org handle). Repo transfer preserves stars/issues/PRs and old URLs 301 automatically. GitHub admin action, not a code change.
- **Vercel project ownership** — transfer the prayer-train Vercel project to an LH team account so billing and access match the legal entity.
- **Domain ownership** — `prayertrains.com` and `ourfaithtrain.com` registration should be transferred to LH's registrar account for clarity.
- **Trademark** — if you're going to file on "PrayerTrain" (or "Lantern Harbor"), file under LH LLC's name now that it's the owner.
- **Bank accounts / Stripe / Resend / Neon / Vercel** — migrate billing to LH's accounts. Infra, not code.
- **Sibling Lantern Harbor projects** — not touched. When/if more projects come under LH, we can lift the footer pattern + schema pattern into shared components.
- **Updated email "From" address** — do you want transactional email (claim confirmations, daily reminders) to come from a Lantern-Harbor-adjacent address, or stay at the current PrayerTrain sender? Separate decision, affects Resend config + DKIM.

## Rollback

Single commit, so `git revert <hash>` reverts everything cleanly if the LLC filing stalls or we want to un-ship. No database migrations, no infra state, no external calls mutate — this is pure view-layer copy + a JSON-LD tweak.

## Why this is small

Deliberately. An LLC umbrella shouldn't be a visible product event. Users shouldn't notice except by reading the privacy/terms. The minimal change keeps the signal-to-noise high: when LH later gets sibling projects and a real marketing presence, we lift this attribution pattern into a shared layout component across sites.
