# GSC + Bing launch checklist

A literal step-by-step execution checklist for claiming the search-engine properties so per-locale impressions start flowing into Search Console and Bing Webmaster Tools. Follow in order; each step has a verification command.

Background: the [international SEO audit](./seo-audit-international-2026-05.md#L364) found zero verification meta tags on the live site. This is Track B of the implementation plan ([../.claude/plans/can-you-do-an-ethereal-cocke.md](https://example.invalid)) — the operational follow-through to [seo-international-ops.md](./seo-international-ops.md).

Total time: ~45 minutes if you have GSC + Bing accounts already.

---

## Step 1 — Set Vercel env vars (Production scope)

1. Open the PrayerTrain project in the Vercel dashboard.
2. Settings → Environment Variables.
3. Add two variables, scoped to **Production only** (not Preview, not Development):

   | Name | Value | Source |
   |---|---|---|
   | `GOOGLE_SITE_VERIFICATION` | obtained in Step 3 below | Google Search Console verification token |
   | `BING_SITE_VERIFICATION` | obtained in Step 6 below | Bing Webmaster Tools verification token |

   You will get the actual values in Steps 3 + 6. For now you can set placeholder strings or skip this step until then — either order works, but the meta tag won't emit until both the env var is set AND a production deploy has happened after setting it.

4. After both values are set, trigger a Production redeploy (Deployments → latest production deploy → Redeploy).

---

## Step 2 — Verify meta tags emit

After the redeploy completes:

```sh
curl -s https://prayertrains.com/ | grep -E 'google-site-verification|msvalidate\.01'
```

Should return two lines, one for each meta tag. If empty: confirm the env vars are set in Production scope (not Preview) and that the latest deploy is post-env-var-set.

---

## Step 3 — Google Search Console: per-locale properties

PrayerTrain uses the **per-locale URL-prefix property** model (per [seo-international-ops.md:20](./seo-international-ops.md)) for clean per-locale analytics + impression reporting.

1. Sign in to [search.google.com/search-console](https://search.google.com/search-console) with the verified owner Google account.
2. Click "Add property" (top-left dropdown).
3. Select **URL prefix** type. Add each of the 5 URL prefixes one at a time:
   - `https://prayertrains.com/`
   - `https://prayertrains.com/es/`
   - `https://prayertrains.com/pt-BR/`
   - `https://prayertrains.com/fil/`
   - `https://prayertrains.com/pl/`

   Per Google's behavior, the first property you add will prompt for verification. **Use the HTML tag method**:
   - GSC gives you a value like `1A2B3C4D5E6F7G8H9I0J...` (typically 43-44 chars).
   - **Copy this value** — this is what goes into the `GOOGLE_SITE_VERIFICATION` env var from Step 1.
   - Set the env var in Vercel (or update if you set a placeholder), redeploy, verify with the `curl` from Step 2.
   - In GSC, click "Verify".
4. **For the other 4 properties** (es, pt-BR, fil, pl), once the first one is verified, Google will offer to verify them automatically since they're under the same verified domain. Accept that.

---

## Step 4 — Google Search Console: Domain property

Adding the Domain property in addition to URL-prefix gives a cross-locale aggregate + access to the GSC International Targeting report.

1. In GSC, "Add property" → **Domain** type.
2. Enter `prayertrains.com`.
3. Verification: TXT record at the DNS provider. The TXT record value will be `google-site-verification=<token>`. Add it at your DNS provider (Vercel handles DNS for prayertrains.com — check the Vercel Domains panel).
4. Wait ~10 minutes for DNS propagation. Hit Verify.

---

## Step 5 — Submit sitemap to each GSC property

For each of the 5 URL-prefix properties + 1 Domain property = 6 sitemap submissions:

1. Open the property in GSC.
2. Sidebar → Sitemaps.
3. Add a new sitemap: `sitemap.xml` (relative path; GSC prefixes with the property URL automatically).
4. Hit Submit.

Per the audit, the sitemap has 410 URLs (82 unique paths × 5 locales). GSC will start processing — initial coverage report appears within ~24h.

---

## Step 6 — Bing Webmaster Tools

Bing uses a single property for the whole site (no per-subdirectory split like GSC).

1. Sign in to [bing.com/webmasters](https://www.bing.com/webmasters).
2. Add Site → enter `https://prayertrains.com/`.
3. Verification: **Meta tag** method.
   - Bing gives you a meta tag value (different from Google's).
   - Copy the value — this is `BING_SITE_VERIFICATION` from Step 1.
   - Set the env var in Vercel, redeploy, verify with Step 2 curl.
   - Click Verify in Bing.
4. Sitemaps → Submit a sitemap → `https://prayertrains.com/sitemap.xml`.

Bing market share is meaningful in Brazil + Philippines specifically — worth doing even though it lags Google in absolute volume.

---

## Step 7 — Run Merj hreflang validator

1. Open [merj.com/blog/hreflang-tag-checker](https://www.merj.com/blog/hreflang-tag-checker).
2. Paste in `https://prayertrains.com/` → run.
3. Paste in `https://prayertrains.com/es/browse` → run.
4. Both should return **zero errors**. Specifically check:
   - Each locale is declared as an alternate
   - Each declared alternate URL itself declares the origin back (reciprocity)
   - `x-default` is present
5. If errors appear, screenshot + paste into a tracking issue.

---

## Step 8 — Set up monitoring rhythm

Per the [ops doc:89-97](./seo-international-ops.md) cadence:

| When | What to check |
|---|---|
| Week 1-2 post-launch | GSC Coverage report → "Valid" count should grow daily |
| Week 2-4 | GSC Performance → English (`/en/*`) impressions registering |
| Week 4-8 | First non-English impressions (es, pt-BR, fil, pl) |
| Week 8-12 | First non-English clicks; hreflang trust established |
| Quarter 1 | Per-locale comparison + editorial-content opportunity write-up |

A simple way to systematize: schedule a recurring 30-min Friday slot for "GSC review" — open each per-locale property in turn, jot impressions/clicks delta in a tracking doc, note any anomalies.

---

## Optional: Yandex

Skip unless targeting Polish-Catholic diaspora in Eastern Europe.

1. Env var: `YANDEX_SITE_VERIFICATION=<token>`.
2. [webmaster.yandex.com](https://webmaster.yandex.com/).
3. Same meta-tag verification flow.

---

## What this checklist does NOT cover

- Schema.org markup audit in GSC's **Enhancements** panel — these populate ~2 weeks after indexation; revisit then.
- Manual indexing requests via GSC's URL Inspection tool — wait at least 7 days post-launch before doing this; if a page isn't indexed by then, request it.
- Bing IndexNow integration — Next.js 16's instrumentation supports this if/when needed.
- Per-locale Google Analytics setup — separate effort.

---

## Verification: what "done" looks like

- `curl https://prayertrains.com/ | grep -E 'google-site-verification|msvalidate\.01'` returns 2 lines.
- All 5 GSC URL-prefix properties show "Verified" + sitemap submitted + 0 errors in Sitemaps panel.
- GSC Domain property `prayertrains.com` shows "Verified".
- Bing Webmaster Tools shows `prayertrains.com` as verified, sitemap submitted.
- Merj hreflang validator returns 0 errors on `/` and `/es/browse`.
- A tracking doc exists with first checkpoints scheduled for week 2, week 4, week 8.
