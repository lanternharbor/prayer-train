/**
 * Per-day reflection lookups for prayer types where each day has
 * distinct content (Surrender Novena most famously, plus Divine Mercy
 * and other multi-day novenas where the day-N meditation differs from
 * day-(N+1)). Backs the chain detail page, the chain daily reminder
 * email, and the prayer-detail-page disclosure list.
 *
 * Schema: `PrayerType.dailyReflections: String[] @default([])` — a
 * Postgres text array keyed by day index, where dailyReflections[0]
 * is day 1 and dailyReflections[N-1] is day N. The schema doesn't
 * enforce length === daysRequired (legacy rows ship empty; partial
 * fills like "5 of 9 reflections" are reasonable in-progress states).
 *
 * Helpers below own all the boundary-checking so callers can stay
 * declarative: pass in the array and the day number, get back a
 * trimmed string or null. Pure functions; no DB.
 *
 * End-user motivation: an organizer (Jilu Chengat, May 6 2026)
 * reported that the Surrender Novena's daily meditations don't show
 * up. The instructions copy promises them; the data doesn't deliver
 * them yet. This module is half the fix — the schema + render code.
 * The other half (populating the nine Don Dolindo Ruotolo meditations)
 * waits for Fr. Palladino's theology review (queue item #14).
 */

/**
 * Resolve the day-N reflection text for a prayer chain or train day.
 *
 * Returns the trimmed reflection string when:
 *   - dailyReflections is non-empty
 *   - day is in [1, dailyReflections.length]
 *   - the resolved entry is non-empty after trim
 *
 * Returns null otherwise. Render callers use null as the "fall through
 * to prayerText" signal.
 *
 * Off-by-one guards:
 *   - day=0 or day<0 → null (defensive; day numbering is 1-indexed)
 *   - day=N+1 (past the last reflection) → null
 *   - day=N (the last reflection) → reflections[N-1]
 *
 * Empty/whitespace entries return null even when within the index range
 * — partial-fill reflections (some days populated, some not) shouldn't
 * render an empty card.
 */
export function reflectionForDay(
  dailyReflections: readonly string[],
  day: number,
): string | null {
  if (!Number.isInteger(day) || day < 1) return null;
  if (day > dailyReflections.length) return null;
  const entry = dailyReflections[day - 1];
  if (typeof entry !== "string") return null;
  const trimmed = entry.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Returns true when the prayer type has a complete per-day reflection
 * set — every day from 1 to daysRequired has non-empty content. Used
 * by the prayer-detail page to decide whether to render the "Daily
 * Meditations" disclosure section. The chain page and email each
 * resolve their own day individually via reflectionForDay so they
 * can render partial fills gracefully (showing what exists, falling
 * through to prayerText for missing days).
 */
export function hasCompleteReflections(
  dailyReflections: readonly string[],
  daysRequired: number,
): boolean {
  if (daysRequired < 1) return false;
  if (dailyReflections.length < daysRequired) return false;
  for (let i = 0; i < daysRequired; i++) {
    const entry = dailyReflections[i];
    if (typeof entry !== "string" || entry.trim().length === 0) return false;
  }
  return true;
}
