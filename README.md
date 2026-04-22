# PrayerTrain

A small Catholic prayer coordination app — like a meal train, but for
prayers. Organizers create a "prayer train" for someone in need, choose
prayers (novenas, rosaries, chaplets, scripture, etc.), and invite their
parish, friends, and family to commit to specific prayers on specific
days. Volunteers receive a confirmation email when they sign up and a
daily reminder on the day(s) of their commitment.

PrayerTrain is a project of [Lantern Harbor LLC](https://lanternharbor.co).

Live at:

- https://prayertrains.com (canonical)
- https://www.ourfaithtrain.com

## Stack

- **Next.js 16** (App Router, Turbopack) on **Vercel**
- **React 19**
- **Auth.js v5** (formerly NextAuth) — magic-link email sign-in via Resend
- **Prisma 7** + **Neon Postgres** (serverless driver)
- **Tailwind CSS v4**
- **Resend** for transactional email
- **Vercel Blob** for recipient photos
- **Vercel Cron** for daily reminder emails
- **Upstash Redis** (optional) for rate limiting

> **⚠ Heads up:** this project tracks the bleeding edge of Next.js. APIs
> and conventions may differ from what is documented elsewhere. Read the
> in-repo Next.js docs at `node_modules/next/dist/docs/` before relying
> on patterns from older Next versions. The middleware file is named
> `proxy.ts`, not `middleware.ts`, for example.

## Local development setup

### 1. Clone and install

```bash
git clone https://github.com/wkeough-maker/prayer-train.git
cd prayer-train
npm install
```

### 2. Provision the third-party accounts you need

You'll need free-tier accounts for:

- **Neon** (https://neon.tech) — Postgres database. Create one project
  named `prayer-train`. Copy the pooled connection string.
- **Resend** (https://resend.com) — transactional email. Verify the
  sending domain you plan to use (e.g. `ourfaithtrain.com`). Generate
  an API key.
- **Vercel Blob** (https://vercel.com/dashboard) — Storage → Create
  Blob store. Generate a read/write token.
- **Upstash Redis** (optional, https://upstash.com) — for rate limiting.
  Create a database and copy the REST URL and REST token.

### 3. Create your `.env`

Copy `.env.example` and fill in the values:

```bash
cp .env.example .env
```

At minimum you must set:

```
DATABASE_URL=...           # Neon pooled connection string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=...        # openssl rand -base64 32
RESEND_API_KEY=...
BLOB_READ_WRITE_TOKEN=...
CRON_SECRET=...            # openssl rand -hex 32
```

`UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are optional —
when unset, the rate limiter is a no-op and the app works fine for
local dev.

### 4. Push the schema and seed prayers

```bash
npm run db:push   # creates tables
npm run db:seed   # populates the prayer library and parish list
```

### 5. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000.

## Production deployment

The project deploys to Vercel automatically on every push to `main`,
once the GitHub integration is connected.

### Required production env vars (set in Vercel → Settings → Environment Variables)

| Variable                    | What it is                                                  |
| --------------------------- | ----------------------------------------------------------- |
| `DATABASE_URL`              | Neon pooled connection string                               |
| `NEXTAUTH_URL`              | Public origin, e.g. `https://prayertrains.com` (NO newline) |
| `NEXTAUTH_SECRET`           | `openssl rand -base64 32`                                   |
| `RESEND_API_KEY`            | Resend API key                                              |
| `BLOB_READ_WRITE_TOKEN`     | Vercel Blob read/write token                                |
| `CRON_SECRET`               | `openssl rand -hex 32` — used by Vercel Cron auth           |

### Optional production env vars

| Variable                       | What it enables                       |
| ------------------------------ | ------------------------------------- |
| `UPSTASH_REDIS_REST_URL`       | Rate limiting                         |
| `UPSTASH_REDIS_REST_TOKEN`     | Rate limiting                         |
| `GOOGLE_CLIENT_ID` / `_SECRET` | "Continue with Google" sign-in        |
| `APPLE_ID` / `APPLE_SECRET`    | "Continue with Apple" sign-in         |
| `EMAIL_FROM`                   | Override the default From: address    |

### Manual deploy from CLI (when the webhook is being uncooperative)

```bash
npx vercel --prod
```

## Project layout

```
src/
├── app/                          # Next.js App Router
│   ├── (routes)/                 # Pages: /, /browse, /create, /dashboard, /p/[slug], etc.
│   ├── api/
│   │   ├── auth/[...nextauth]/   # Auth.js route handler
│   │   ├── cron/daily-reminders/ # Vercel Cron target
│   │   ├── stats/                # Public counters
│   │   └── ...
│   ├── error.tsx                 # Route segment error boundary
│   ├── global-error.tsx          # Root layout error boundary
│   ├── not-found.tsx             # 404
│   ├── robots.ts                 # Generated robots.txt
│   ├── sitemap.ts                # Generated sitemap.xml
│   └── layout.tsx
├── components/                   # Shared UI
├── generated/prisma/             # Generated Prisma client (gitignored)
├── lib/
│   ├── actions.ts                # Server actions (mutations)
│   ├── auth.ts                   # Auth.js config
│   ├── db.ts                     # Prisma client singleton
│   ├── email.ts                  # Resend wrappers
│   ├── rate-limit.ts             # Upstash rate limiter wrapper
│   ├── request.ts                # Request helpers (client IP, rate-limit ID)
│   ├── url.ts                    # getBaseUrl() — env-aware origin resolver
│   ├── utils.ts
│   └── validation.ts             # Zod schemas for server-action input
└── proxy.ts                      # Edge proxy: auth gate + rate limiting
prisma/
├── schema.prisma
└── seed.ts                       # Prayer library + parishes seed
```

## Useful scripts

```bash
npm run dev          # next dev
npm run build        # prisma generate && next build
npm run start        # next start (production server)
npm run lint         # eslint
npm run db:generate  # prisma generate
npm run db:push      # prisma db push (schema → db, no migration files)
npm run db:migrate   # prisma migrate dev (creates migration files)
npm run db:seed      # tsx prisma/seed.ts
```

## Notes for contributors

- **Server actions** in `src/lib/actions.ts` always validate FormData
  with a Zod schema from `src/lib/validation.ts`. Don't add new
  actions without doing the same.
- **All public mutations** should be rate-limited via
  `enforceRateLimit(...)`. The limiter no-ops without Upstash, so it's
  safe to wire up everywhere.
- **Email** is sent via the helpers in `src/lib/email.ts`. Both
  helpers swallow + log their own errors so a Resend hiccup never
  fails a request.
- **Public train pages** under `/p/[slug]` set per-page Open Graph and
  Twitter card metadata via `generateMetadata`. Private trains are
  marked `noindex,nofollow`.

## Inspiration

PrayerTrain was built after three children in the Keough extended
family experienced life-threatening medical crises in late 2025 and
early 2026 — a NICU stay, a newborn open-heart surgery, and a severe
respiratory crisis requiring intubation. All three came through. The
prayers of an organized community were the thing that held the
parents up. PrayerTrain exists so the next family in crisis has the
same kind of organized spiritual support, ready to go.
