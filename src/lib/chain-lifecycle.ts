import { dateKeyInTimezone } from "./dates";
import { isProtectedChain } from "./train-protection";

/**
 * Returns true when the public UI should render a live "Day X of Y"
 * counter for a chain. Returns false when the chain has reached or
 * passed its endDate, or is no longer ACTIVE — callers then render a
 * terminal label ("Novena complete", "Cancelled") instead of a counter
 * that keeps incrementing math-wise past the chain's natural window.
 *
 * Motivated by the Priscilla novena (May 6–14, 2026): the cron's
 * closing-prompt fired correctly on endDate, and auto-close fires 7
 * days later on May 22, but in the 7-day grace window the chain
 * remains ACTIVE in the DB while the day counter on every UI surface
 * keeps showing "Day 9 of 9" (the clamp). To organizers this reads as
 * "stuck" — they see the chain frozen at its final day with no signal
 * that the prayer has actually wrapped.
 *
 * The fix is purely visual: status stays ACTIVE during the grace
 * window (the cron + auto-close pattern owns that transition); the UI
 * just stops pretending the chain is still in flight.
 */
export type ChainForDayCounter = {
  status: string;
  endDate: Date;
};

export function shouldShowLiveDayCounter(
  chain: ChainForDayCounter,
  now: Date,
  timeZone: string,
): boolean {
  if (chain.status !== "ACTIVE") return false;
  const todayKey = dateKeyInTimezone(now, timeZone);
  const endKey = dateKeyInTimezone(chain.endDate, "UTC");
  // Show counter only when today is on or before endDate. The day OF
  // endDate is still mid-flight (the final day's prayer is "today");
  // the day after endDate is the first day we should hide the counter.
  return todayKey <= endKey;
}

/**
 * Pure-function predicates that drive the chain end-of-life cron
 * passes (closing-prompt email + grace-period auto-close, plus the
 * abandonment-prompt + auto-cancel pair for chains that never
 * picked up members).
 *
 * The chain-reminders cron query already filters at the SQL level
 * (status, endDate, closingPromptSentAt), but these predicates run
 * as a final guard in the route handler so the dispatch logic is
 * unit-testable without Prisma + so a future change to the SQL
 * query can't accidentally widen what gets prompted or auto-closed.
 *
 * Everything is TZ-aware via dateKeyInTimezone (mixed reference
 * frame: stored canonical dates use UTC keys, runtime "now" uses
 * the viewer's TZ — same convention as dayNumberInTimezone). For
 * cron purposes the "viewer" is the canonical East Coast operator
 * timezone (DEFAULT_DISPLAY_TZ in dates.ts).
 */

/** Default grace period for auto-close. Used as the public constant
 *  so the cron + tests stay in sync with the documented behavior. */
export const AUTO_CLOSE_GRACE_DAYS = 7;

/** Days from createdAt before the abandonment-prompt fires for an
 *  empty chain (zero members). Mirrors the train-side constant. */
export const CHAIN_ABANDONMENT_PROMPT_DAYS = 14;

/** Days after abandonmentPromptSentAt before auto-cancel fires.
 *  Mirrors the train-side constant. */
export const CHAIN_ABANDONMENT_GRACE_DAYS = 7;

export type ChainForClosingPrompt = {
  status: string;
  endDate: Date;
  closingPromptSentAt: Date | null;
  organizer: { email: string | null } | null;
};

export type ChainForAutoClose = {
  status: string;
  endDate: Date;
};

/**
 * Returns true when the cron should send the organizer-facing
 * "your prayer is wrapping up today" email for this chain. All
 * conditions must hold:
 *   1. Chain is still ACTIVE (already-closed chains don't need a nudge)
 *   2. Today's calendar date equals the chain's endDate (in the
 *      operator timezone). One-shot fire on the final day.
 *   3. The prompt hasn't already been sent (idempotency)
 *   4. The organizer has an email on file (no email = no send)
 */
export function shouldSendClosingPrompt(
  chain: ChainForClosingPrompt,
  now: Date,
  timeZone: string,
): boolean {
  if (chain.status !== "ACTIVE") return false;
  if (chain.closingPromptSentAt !== null) return false;
  if (!chain.organizer?.email) return false;
  const todayKey = dateKeyInTimezone(now, timeZone);
  const endKey = dateKeyInTimezone(chain.endDate, "UTC");
  return todayKey === endKey;
}

/**
 * Returns true when the cron should auto-flip status to COMPLETED.
 * Conditions:
 *   1. Chain is still ACTIVE (already-closed = nothing to do)
 *   2. The chain's endDate is more than `graceDays` calendar days
 *      in the past (default 7). The grace window gives the organizer
 *      time to add a closing note via manual close before the cron
 *      sweeps it into a quiet auto-completion.
 *
 * Auto-close does NOT send any member-facing email — closing-day
 * emails are reserved for manual `closePrayerChain` so the organizer's
 * intent is preserved when emails go out.
 */
export function shouldAutoClose(
  chain: ChainForAutoClose,
  now: Date,
  timeZone: string,
  graceDays: number = AUTO_CLOSE_GRACE_DAYS,
): boolean {
  if (chain.status !== "ACTIVE") return false;
  const todayKey = dateKeyInTimezone(now, timeZone);
  const endKey = dateKeyInTimezone(chain.endDate, "UTC");
  const todayMs = Date.parse(todayKey + "T00:00:00Z");
  const endMs = Date.parse(endKey + "T00:00:00Z");
  const daysPastEnd = Math.floor((todayMs - endMs) / (1000 * 60 * 60 * 24));
  return daysPastEnd > graceDays;
}

// ─── Abandonment-cleanup predicates ─────────────────────────────
//
// Mirrors the train-side pair. Triggers off createdAt + zero
// members rather than endDate, so an empty chain gets archived
// well before its natural endDate-plus-grace would touch it.

export type ChainForAbandonmentPrompt = {
  slug: string;
  status: string;
  createdAt: Date;
  abandonmentPromptSentAt: Date | null;
  organizer: { email: string | null } | null;
};

export type ChainForAutoCancelAbandoned = {
  slug: string;
  status: string;
  abandonmentPromptSentAt: Date | null;
};

/**
 * Returns true when the cron should send the organizer the
 * abandonment-prompt email. Mirrors shouldSendAbandonmentPrompt
 * on the train side — see train-lifecycle.ts for the full rationale.
 *
 * "Empty" for chains means `memberCount === 0`. Chains have no
 * warrior-equivalent overflow primitive; membership is the only
 * engagement signal.
 */
export function shouldSendAbandonmentPrompt(
  chain: ChainForAbandonmentPrompt,
  memberCount: number,
  now: Date,
  timeZone: string,
  daysSinceCreated: number = CHAIN_ABANDONMENT_PROMPT_DAYS,
): boolean {
  if (chain.status !== "ACTIVE") return false;
  if (chain.abandonmentPromptSentAt !== null) return false;
  if (!chain.organizer?.email) return false;
  if (isProtectedChain(chain.slug)) return false;
  if (memberCount > 0) return false;
  const todayKey = dateKeyInTimezone(now, timeZone);
  const createdKey = dateKeyInTimezone(chain.createdAt, "UTC");
  const todayMs = Date.parse(todayKey + "T00:00:00Z");
  const createdMs = Date.parse(createdKey + "T00:00:00Z");
  const daysSinceCreate = Math.floor(
    (todayMs - createdMs) / (1000 * 60 * 60 * 24),
  );
  return daysSinceCreate >= daysSinceCreated;
}

/**
 * Returns true when the cron should auto-flip status to CANCELLED
 * for an abandoned chain. Mirrors shouldAutoCancelAbandoned on the
 * train side — see train-lifecycle.ts for the full rationale.
 */
export function shouldAutoCancelAbandoned(
  chain: ChainForAutoCancelAbandoned,
  memberCount: number,
  now: Date,
  timeZone: string,
  graceDays: number = CHAIN_ABANDONMENT_GRACE_DAYS,
): boolean {
  if (chain.status !== "ACTIVE") return false;
  if (chain.abandonmentPromptSentAt === null) return false;
  if (isProtectedChain(chain.slug)) return false;
  if (memberCount > 0) return false;
  const todayKey = dateKeyInTimezone(now, timeZone);
  const promptKey = dateKeyInTimezone(chain.abandonmentPromptSentAt, "UTC");
  const todayMs = Date.parse(todayKey + "T00:00:00Z");
  const promptMs = Date.parse(promptKey + "T00:00:00Z");
  const daysSincePrompt = Math.floor(
    (todayMs - promptMs) / (1000 * 60 * 60 * 24),
  );
  return daysSincePrompt >= graceDays;
}
