# PrayerTrain — Vision Roadmap

Living tracker for the long-term vision. Updated each session.

## The vision (1-line)

PrayerTrain is the trusted coordination layer for Catholic prayer life — small, intimate, human. Three primitives, polished obsessively, with depth in audio, theology, art, and physical artifact. Never a platform. Always a chapel.

## Three product primitives

| Primitive | What it is | Status |
|---|---|---|
| **Trains** | Distributed coverage — many people each pray something on a specific day. The "meal train" metaphor. | **Shipped** — refining via polish passes. |
| **Circles** | Synchronized solidarity — same prayer, same days, group of people. The "novena with friends" use case. | **Spec written** (`docs/circles-spec.md`) — execution next session. |
| **Single intentions** | Ambient "please pray for…" board, no schedule. The parish prayer-list equivalent. | **Queued** — design after Circles ships. |

## The five vision pillars

### 1. Audio — real Catholic voices

The unlimited-resources version: every daily reminder includes a 3-minute audio recording of today's prayer, voiced by a real person — sister, monk, seminarian, parishioner, in multiple languages and accents. Authentic, reverent, *the actual Church* in audio form.

| Stage | Status |
|---|---|
| $0 version: organizer-recorded prayers via in-app upload | **Queued** — needs schema field on PrayerType + audio storage on Vercel Blob |
| Curated free-tier: a handful of public-domain or freely-licensed Catholic recordings (older Vatican Radio archives, etc.) | **Queued** — sourcing and licensing review |
| Recording sessions: family + Fr. Palladino if willing, then friends in religious communities | **Future** — small budget, big impact |
| Paid tier: travel + record in religious houses globally | **Future, dream-state** |

### 2. Theology in the building

The unlimited-resources version: a theologian on retainer who reviews every prayer text, every email, every UI affordance.

| Stage | Status |
|---|---|
| Review log + queue + pre-loaded items | **Shipped** (`docs/theology-review.md`) |
| Friendship engagement with Fr. W. Chris Palladino | **Foundation laid; awaiting his bandwidth** |
| Periodic batches of items reviewed by Fr. Palladino | **Future** |
| Formal arrangement / honorarium when budget permits | **Future** |

### 3. Visual identity — illustrated by hand

The unlimited-resources version: a Catholic artist commissioned to do a unified illustration system — saint portraits, prayer iconography, decorative elements drawing from manuscript tradition.

| Stage | Status |
|---|---|
| Brand: navy + gold + cream palette, EB Garamond + DM Sans | **Shipped** (vision pass 1 + earlier polish) |
| New logo (icon mark + painterly hero) | **Shipped** (commit `a8fa6f6`) |
| Patron-saint portraits from public-domain sources (Wikimedia Commons) | **Shipped** (vision pass 1) |
| Custom-illustrated saint portraits replacing public-domain set | **Future** — $500–$2k commission, when LH has budget |
| Custom prayer-category and situation iconography | **Future** |
| Decorative elements (illuminated capitals, etc.) | **Future, dream-state** |

### 4. Physical artifact at completion

The unlimited-resources version: a mailed letterpress card at the end of every train — names, dates, prayers, signed by everyone. Like a Mass card but personal and persistent.

| Stage | Status |
|---|---|
| Software MVP: PDF spiritual bouquet, downloadable on completion | **Shipped** (vision pass 1, `src/lib/bouquet-pdf.tsx`) |
| Print-at-home enhancements: better PDF design, photos embedded, blessing reviewed | **Queued** |
| Print-on-demand partnership for mailed cards (Moo, Sticker Mule, custom Catholic printer) | **Future** — operational complexity, revenue conversation |
| Audio compilation as a digital artifact (voicemails from everyone who prayed) | **Future** — depends on audio pillar |

### 5. Time and slowness

The unlimited-resources version: years polishing the same primitives instead of sprinting to ship more features.

| Stage | Status |
|---|---|
| Discipline of small, careful releases | **Ongoing** — current pattern |
| Each new shipped feature gets a "sit with it" period (no immediate next-feature pressure) | **Codified principle** — applied via plan-mode passes |

This isn't a feature; it's a value. Tracked here as a reminder, not a deliverable.

## Adjacent items (not in original five, vision-aligned)

| Item | Description | Status |
|---|---|---|
| **Spanish localization** | Catholic-Hispanic audience is large; PrayerTrain doesn't serve them today. | **Queued** — needs i18n setup + Catholic-Spanish translator |
| **Parish integration** | Parishes get their own branded view, can run trains/circles for parishioners. | **Queued** — depends on Circles + Trains both shipping cleanly first |
| **Diocesan / multi-parish view** | Diocese-level rollups for centralized analytics and bulletin coordination. | **Future** — way after parish integration proves out |
| **Mobile app (PWA installability)** | Manifest is in place; full PWA polish (offline, install prompt, push) not yet. | **Queued** — small scope |
| **Calendar-driven communal novenas** | The praymorenovenas pattern — global novena waves on a shared calendar. Different from personal Circles. | **Future** — only if Circles needs an extension |

## Things explicitly NOT in the vision

To preserve the soul of the product, these are deliberate non-goals (as discussed in conversation):

- Streaks, badges, leaderboards, gamification of any kind
- Push notifications beyond the necessary daily reminder
- Social feed / following / follower graph
- AI-generated prayer text or AI prayer-companion chat
- Sacramental gating (no withholding features based on user's sacramental status)
- Surveillance-style analytics on individual prayer behavior
- SEO content farming
- Premium tier with feature gates (donations / parish sponsorship only)
- Generalization to "all faiths" — stay specifically Catholic

## Funding the vision

Per the earlier conversation, the lowest-ick paths to covering costs:

1. **Reality-check actual cost first** — most months may run $0–5
2. **Service-provider non-profit credits** — Neon OSS, Vercel OSS, Resend nonprofit
3. **One institutional patron** — your home parish, one $250–500/year stewardship line item, no user-facing fundraising
4. **GitHub Sponsors on the public repo** — opt-in by developers, never users

User-facing donation asks were considered and shelved (felt icky given the audience and context). Revisit only if the institutional path fails and self-funding becomes unsustainable.

## Changelog

- **2026-04-22 — Vision Pass 1**: theology review log, patron saint portraits, spiritual bouquet PDF MVP, Circles spec.
- **2026-04-22 — Logo refresh**: replaced original logo with painterly hero + flat icon mark; favicons readable at 32px for the first time.
- **2026-04-22 — Lantern Harbor umbrella**: PrayerTrain attributed as a Lantern Harbor LLC project across footer, privacy, terms, JSON-LD, README. GitHub repo transferred to lanternharbor org.
- **2026-04-22 — Overnight polish 2**: loading skeletons, prefers-reduced-motion, primary-nav aria-label, Vitest setup + 20 tests, humans.txt + security.txt.
- **2026-04-22 — Polish pass 1**: SEO canonicals on 10 routes, dynamic manage-page title, completed combobox ARIA, modal Escape handlers, dropped unused utils + clsx.
- **2026-04-22 — Website pass 1**: stat strip thresholds + pluralize, /about etc redirects, JSON-LD schema, accessibility (skip link + focus-visible + main id).
