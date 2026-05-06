import { dateKeyInTimezone } from "./dates";

/**
 * Pure-function predicates that drive the chain end-of-life cron
 * passes (closing-prompt email + grace-period auto-close).
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
