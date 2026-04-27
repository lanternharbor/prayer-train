/**
 * Spina-train smoke test.
 *
 * Hits the live "Prayers for THE SPINA Family" prayer train on prayertrains.com
 * and asserts the page still renders the elements that 36 prayer warriors
 * rely on. Run as `npm run smoke` before/after every deploy that touches
 * shared code paths.
 *
 * Exits 0 on success, non-zero on any failure. Prints a one-line summary
 * either way. Does not require any environment variables.
 *
 * Override target URL with PRAYER_TRAIN_URL to test against a Vercel
 * preview deploy:
 *
 *   PRAYER_TRAIN_URL=https://prayer-train-feature-chains-xxx.vercel.app \
 *     npm run smoke
 */

const SPINA_SLUG = "the-spina-family-dlmm";
const DEFAULT_BASE = "https://prayertrains.com";

type Check = { name: string; ok: boolean; detail?: string };

async function run(): Promise<void> {
  const base = process.env.PRAYER_TRAIN_URL ?? DEFAULT_BASE;
  const url = `${base}/p/${SPINA_SLUG}`;
  const checks: Check[] = [];

  console.log(`\n  Smoke test: ${url}\n`);

  // Fetch the page
  let res: Response;
  try {
    res = await fetch(url, { cache: "no-store" });
  } catch (err) {
    console.error("  ✗ Request failed:", err);
    process.exit(1);
  }

  checks.push({
    name: "HTTP 200",
    ok: res.status === 200,
    detail: `status=${res.status}`,
  });

  if (res.status !== 200) {
    summarize(checks);
    process.exit(1);
  }

  const html = await res.text();

  // Title / recipient name. The train was created with capitalized "THE SPINA"
  // so we check both forms in case the organizer ever fixes the typo.
  checks.push({
    name: "Recipient name renders",
    ok: /SPINA Family/i.test(html) || /Spina/i.test(html),
  });

  // ACTIVE status badge (the train should remain active until ~May 24)
  checks.push({
    name: "Train status badge present",
    ok: /ACTIVE|COMPLETED/.test(html),
  });

  // Grief & Loss situation tag visible
  checks.push({
    name: "Situation tag visible",
    ok: /Grief|GRIEF/i.test(html),
  });

  // Prayer coverage section — the progress bar that shows the % covered
  checks.push({
    name: "Prayer coverage section renders",
    ok: /Prayer Coverage/i.test(html) && /covered/i.test(html),
  });

  // Slot cards — the calendar grid should render at least 30+ slot cells
  // (30-day train with multiple slots per day). Loose count via a marker
  // class or the "Sign up to pray" / "Mark complete" button text.
  const slotMarkerCount =
    (html.match(/Sign up to pray/g) ?? []).length +
    (html.match(/slot-claimed/g) ?? []).length +
    (html.match(/slot-completed/g) ?? []).length;
  checks.push({
    name: "At least 50 slot cells present",
    ok: slotMarkerCount >= 50,
    detail: `found ${slotMarkerCount} slot markers`,
  });

  // JSON-LD schema present (sanity check that Vercel didn't strip metadata)
  checks.push({
    name: "JSON-LD Organization schema in <head>",
    ok: /"@type":"Organization"/.test(html),
  });

  // Header chrome
  checks.push({
    name: "Header navigation renders",
    ok: /aria-label="Primary navigation"/.test(html),
  });

  // Footer chrome (LH attribution)
  checks.push({
    name: "Footer Lantern Harbor attribution",
    ok: /Lantern Harbor/.test(html),
  });

  summarize(checks);
  const allOk = checks.every((c) => c.ok);
  process.exit(allOk ? 0 : 1);
}

function summarize(checks: Check[]): void {
  for (const c of checks) {
    const symbol = c.ok ? "✓" : "✗";
    const detail = c.detail ? ` (${c.detail})` : "";
    console.log(`  ${symbol} ${c.name}${detail}`);
  }
  const passed = checks.filter((c) => c.ok).length;
  const total = checks.length;
  const verdict = passed === total ? "OK" : "FAIL";
  console.log(`\n  ${verdict} — ${passed}/${total} checks passed.\n`);
}

run();
