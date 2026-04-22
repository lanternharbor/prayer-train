# Lantern Harbor Umbrella — Action Items

> Companion to [lantern-harbor-integration.md](./lantern-harbor-integration.md).
> Updated: 2026-04-21 after the autonomous execution pass.

## ✅ Already done (no action needed)

- **Code-level umbrella integration** (commit `ff024f2`): footer, privacy, terms, JSON-LD, README.
- **GitHub repo transferred**: `wkeough-maker/prayer-train` → `lanternharbor/prayer-train`.
- **Local git remote updated**: `origin` now points at `https://github.com/lanternharbor/prayer-train.git`. Git push/pull works from this machine.
- **Verified project builds + deploys**: manual `vercel --prod` deploy succeeded after the transfer (`dpl_2x8F6Ligwaeb4WpCm9KHsCAiig8m`). Site is live.
- **Orphan Vercel project `umami` deleted**: leftover from the abandoned self-host experiment. Gone.

## ⚠️ One thing BEFORE the next git push (30 seconds)

**Install the Vercel GitHub App on the `lanternharbor` org.** This is the one-click fix for auto-deploys.

Why it matters: Vercel's integration currently doesn't have webhook access to the `lanternharbor` org (the org only has the Cloudflare Workers app installed). So when you push to `main`, Vercel won't auto-trigger a build. Until you fix this, every deploy requires `vercel --prod` from the CLI.

**Click this link**, pick `lanternharbor`, choose "Only select repositories" → `prayer-train`, click Install:

👉 https://github.com/apps/vercel/installations/new

After installing, the next `git push` to main will auto-deploy as before.

## 📋 Manual action items (in rough priority order)

### 1. Delete the `wkeough-maker/umami` GitHub fork (orphan, 1 min)

You forked `umami-software/umami` to attempt the self-host earlier. We abandoned that path. The fork is still there at https://github.com/wkeough-maker/umami. Deleting it costs nothing — forks don't preserve any history you'd want to keep, and the original upstream is untouched.

```bash
gh repo delete wkeough-maker/umami --yes
```

(If you think you might try a different self-host host later — Fly.io, Railway — keep the fork around; it's not harming anything.)

### 2. Clean up the Neon `umami` database (2 min)

You created an empty `umami` database in your Neon project earlier for the self-host. It's tiny and free but it's orphan.

- Neon dashboard → your project → **Databases** → find the `umami` DB → **Delete**.
- If you want to keep it for a future analytics host, leave it.

### 3. Install the Vercel GitHub App on `lanternharbor` (30 sec)

Already covered above. Do this first if you're going to push any commits.

### 4. (Optional) Install Cloudflare Pages / Workers app on `lanternharbor` for PrayerTrain

The `lanternharbor` org already has the Cloudflare Workers + Pages app installed — but that was for the `lanternharbor.co` site. If you ever want PrayerTrain to use Cloudflare Workers for any edge logic, the same app install covers it (with repo access re-selected). Skip unless you're actually using Cloudflare for something here.

### 5. Vercel project → move to a Lantern Harbor team (paid, $20/mo)

**Currently**: the `prayer-train` Vercel project is owned by `wkeough-makers-projects` (your personal Hobby account). The project works, builds, and deploys. Billing is under your personal account.

**To fully move under Lantern Harbor**, you need a Vercel **Team** (formerly Pro). Teams cost $20/user/mo with a 14-day trial. Hobby plans can't own a team project.

Steps:

1. Vercel dashboard → your avatar (top right) → **Create Team**.
2. Name: `Lantern Harbor` (or `lantern-harbor`). Pick any slug.
3. Enter billing (card under the LLC's name if you've opened a business account; personal card works for now).
4. Go to the `prayer-train` project → **Settings → General → Transfer Project** → select the new team.
5. Transfer takes ~1 min. The deployed URL stays the same (`prayertrains.com`). The environment variables come with it.
6. Old Vercel project under your personal account is auto-cleaned.
7. Re-add the Vercel GitHub App to the team (see step 3 above — the app installation is per-org/team, not global).

**If you want to defer this**: totally fine. The current personal-account project works. You can move it to a team later without code changes.

### 6. Domain transfer — Cloudflare account (15–30 min)

Both `prayertrains.com` and `ourfaithtrain.com` are at Cloudflare (whois confirmed). The question is which Cloudflare **account** they live in. `lanternharbor.co` is at GoDaddy (registered) but uses Cloudflare for DNS — likely a separate Cloudflare account from the PrayerTrain domains.

**Best state**: all Lantern Harbor domains under one Cloudflare account tied to `william@lanternharbor.co` and LH billing.

Steps (per domain):

1. Log into the Cloudflare account that currently holds the domain (the one you used when registering it).
2. Find the domain's zone page → **Overview → Move to another account** (bottom of the page, in the Advanced section).
3. Enter the destination Cloudflare account email (the LH one). If you don't have a separate LH Cloudflare account yet, create one at https://dash.cloudflare.com/sign-up using `william@lanternharbor.co`.
4. The destination account gets an email → accepts → domain moves.
5. DNS records come with it. Nothing on the deployed site changes.

Do this for `prayertrains.com` and `ourfaithtrain.com`. `lanternharbor.co` already lives under the LH setup.

**Registrar vs DNS**: `ourfaithtrain.com` and `prayertrains.com` are both registered AT Cloudflare (Cloudflare Registrar), so "Move to another account" covers both the registration and DNS simultaneously. `lanternharbor.co` is registered at GoDaddy — if you want that registration under Cloudflare too, you'd do a full registrar transfer (separate process, ~7 days due to ICANN rules, $9 transfer fee).

### 7. Trademark filing — "PrayerTrain" (DIY $250 or lawyer $1.2–1.8k)

Two paths:

**DIY via USPTO TEAS Plus** ($250 per class):

1. https://www.uspto.gov/trademarks/apply
2. File under:
   - **Applicant**: Lantern Harbor LLC, Massachusetts
   - **Class 42** (software/SaaS — "Providing online non-downloadable software for coordinating prayer commitments"). You might also consider Class 45 (personal/spiritual services) but 42 is the tighter fit for a SaaS-style tool.
   - **Specimen**: screenshot of prayertrains.com showing the mark in use
   - **Filing basis**: "Use in commerce" (since the site is live)

Downside: USPTO examiners find reasons to reject >40% of applications on first review. Expect one round of office actions.

**Via lawyer**: $1,200–1,800 all-in for a clean filing with reduced risk of office actions. If the trademark matters long-term, use a lawyer who specializes in tech/software marks. A few to look into: Cole Firm, LegalZoom (not great, but cheap), LawTrades.

Either way, wait until you have a bank account / operating agreement / EIN filed under Lantern Harbor LLC. The filing lists LH LLC as the owner.

### 8. Billing migrations (per service, ~15–30 min each)

Move each service billing from your personal card to a Lantern Harbor LLC business card or bank account. In priority order:

| Service | Current | Action |
|---|---|---|
| **Vercel** | Personal card (Hobby) | Handled as part of step 5 (team creation) |
| **Neon** | Personal email/card | Dashboard → Settings → Billing → update card |
| **Resend** | Personal email/card | Dashboard → Settings → Billing |
| **Vercel Blob** | Bundled with Vercel | Same as Vercel |
| **Upstash Redis** | Personal (free tier probably) | Dashboard → Account → Billing |
| **GoDaddy** (lanternharbor.co reg) | Personal | Likely no billing until renewal; update auto-renew card |
| **Cloudflare Registrar** (prayertrains, ourfaithtrain) | Personal account | Moved via step 6 |

Prerequisites: an LH LLC business bank account (Mercury, Relay, or a local bank) and a business debit/credit card. Mercury ($0, online-only) is the fastest if you don't have one yet — apply takes ~48 hr.

### 9. Email sender domain (optional; 15 min)

Currently your transactional email ("Your PrayerTrain magic link", "You're signed up to pray…") sends from `noreply@ourfaithtrain.com` via Resend. Consider:

- **Option A (status quo)**: keep sender as `noreply@ourfaithtrain.com`. Works; domain is LH-owned after step 6.
- **Option B (cleaner)**: add a `noreply@prayertrains.com` sender domain in Resend. Matches the public-facing site URL.
- **Option C (umbrella)**: `noreply@mail.lanternharbor.co` with a "from" display name of "PrayerTrain". Rarely used in practice; unusual for users to see sibling-project branding in transactional mail.

If you change sender:

1. Resend dashboard → **Domains → Add domain** → `prayertrains.com` (or whichever).
2. Resend gives you 3 DNS records (SPF, DKIM, DMARC). Add them in Cloudflare.
3. Wait ~5 min for DNS propagation → Resend re-verifies.
4. Update `EMAIL_FROM` env var in Vercel → Settings → Environment Variables to the new address.
5. Redeploy.

Recommendation: Option B. Users see mail from `prayertrains.com` (matches the site) and it's one fewer surprise.

## Summary — what you need to do tonight vs. later

### Tonight (5 min total)

- Click the Vercel GitHub App install link: https://github.com/apps/vercel/installations/new
- Delete the `wkeough-maker/umami` GitHub fork (optional): `gh repo delete wkeough-maker/umami --yes`
- Delete the `umami` Neon database from the dashboard (optional)

### This week

- Create a Lantern Harbor Vercel team + transfer the project (step 5)
- Move `prayertrains.com` + `ourfaithtrain.com` to the LH Cloudflare account (step 6)

### Once LH LLC has a bank account

- Migrate billing on Vercel, Neon, Resend, Upstash, GoDaddy (step 8)
- File USPTO trademark for PrayerTrain under LH LLC (step 7)
- Decide on sender domain and update Resend + env vars (step 9)

### Ongoing / separate thought

- If you spin up a second Lantern Harbor project (besides `lanternharbor.co`), that's the point where it becomes worth lifting the footer pattern + JSON-LD pattern into a shared package.
