/**
 * Timezone-aware date helpers.
 *
 * The runtime situation:
 *  - Vercel runs UTC. Server components evaluating `new Date()` get a
 *    UTC-anchored Date.
 *  - Browser code gets a Date anchored to the user's local TZ.
 *  - Slot dates are stored as midnight UTC of the calendar day they
 *    represent (e.g., "May 3 slot" = `2026-05-03T00:00:00Z`).
 *
 * The bug those facts produce: at 8:12 PM EDT on May 3, UTC is already
 * 00:12 May 4, so `new Date().toISOString().split("T")[0]` returns
 * "2026-05-04". Server-side day-number math (`Date.now() - startDate`
 * divided into days) lands on the wrong calendar day for the same
 * reason.
 *
 * This module gives callers an explicit way to ask "what's today's
 * calendar key in TZ X?" and "how many calendar days have elapsed
 * between two moments, observed in TZ X?" Both answer the questions
 * users actually have, instead of leaking the runtime TZ accidentally.
 *
 * For server-side rendering the canonical TZ is DEFAULT_DISPLAY_TZ
 * (America/New_York). For client-side rendering, callers should pass
 * the browser's resolved TZ via
 * `Intl.DateTimeFormat().resolvedOptions().timeZone`.
 */

/**
 * Default display timezone for server-side date computations. East
 * Coast US since the primary audience and origin family are in MA.
 *
 * Limitation: West Coast (or other) viewers see chain "Day X" math
 * anchored to Eastern time, which can be off by a few hours from
 * what their local wall clock would suggest. Acceptable for V1; the
 * fix is either (a) a per-user TZ stored on User, (b) a cookie set
 * client-side and read by the server, or (c) moving these
 * calculations to client-only.
 */
export const DEFAULT_DISPLAY_TZ = "America/New_York";

/**
 * Return YYYY-MM-DD for the given Date as observed in the given
 * timezone. Uses Intl with the en-CA locale because en-CA's default
 * date format is exactly YYYY-MM-DD, which is the stable string-
 * comparable shape we want for date-key comparisons.
 *
 * Examples (all using America/New_York):
 *   May 3 8:12 PM EDT = May 4 00:12 UTC.
 *   dateKeyInTimezone(new Date("2026-05-04T00:12:00Z"), "America/New_York")
 *     -> "2026-05-03"  (correct: it's still May 3 in EDT)
 *   dateKeyInTimezone(new Date("2026-05-04T00:12:00Z"), "UTC")
 *     -> "2026-05-04"  (UTC has crossed into May 4)
 */
export function dateKeyInTimezone(date: Date, timeZone: string): string {
  const fmt = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return fmt.format(date);
}

/**
 * 1-indexed calendar-day count from startDate to now, observed in the
 * given timezone. "Day 1" is the start date itself.
 *
 * Mixed reference frame on purpose: startDate is the STORED canonical
 * calendar day (encoded as midnight UTC of that day in our schema, see
 * createPrayerTrain / createPrayerChain), so its key comes out of UTC.
 * "now" is a runtime moment that needs to be observed in the VIEWER's
 * timezone to land on the right calendar day. Comparing the two keys
 * gives the integer day count without partial-day artifacts.
 *
 * Always returns at least 1.
 */
export function dayNumberInTimezone(
  now: Date,
  startDate: Date,
  timeZone: string,
): number {
  // Stored canonical date — extract its UTC-encoded calendar day.
  const startKey = dateKeyInTimezone(startDate, "UTC");
  // Runtime moment — extract the calendar day the viewer is in.
  const nowKey = dateKeyInTimezone(now, timeZone);
  const nowMs = Date.parse(nowKey + "T00:00:00Z");
  const startMs = Date.parse(startKey + "T00:00:00Z");
  const days = Math.floor((nowMs - startMs) / (1000 * 60 * 60 * 24));
  return Math.max(1, days + 1);
}

/**
 * Whole calendar days remaining from now until endDate, observed in
 * the given timezone. Floored to 0; never negative. Intended for
 * "N days left" UI labels.
 *
 * Same mixed reference frame as dayNumberInTimezone: endDate is the
 * stored canonical calendar day (UTC-encoded), now is observed in
 * the viewer's timezone.
 */
export function daysLeftInTimezone(
  now: Date,
  endDate: Date,
  timeZone: string,
): number {
  const endKey = dateKeyInTimezone(endDate, "UTC");
  const nowKey = dateKeyInTimezone(now, timeZone);
  const nowMs = Date.parse(nowKey + "T00:00:00Z");
  const endMs = Date.parse(endKey + "T00:00:00Z");
  return Math.max(0, Math.ceil((endMs - nowMs) / (1000 * 60 * 60 * 24)));
}
