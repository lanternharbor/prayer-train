import { dateKeyInTimezone } from "./dates";
import { isProtectedTrain } from "./train-protection";

/**
 * Pure-function predicates for the train end-of-life cron passes
 * (closing-prompt email + grace-period auto-close, plus the parallel
 * abandonment-prompt + auto-cancel pair for trains that never picked
 * up signups). Mirrors the shape of src/lib/chain-lifecycle.ts — same
 * pattern, different primitive.
 *
 * Intentionally separate file (and separate predicates) from the
 * chain version so a future change to one doesn't accidentally
 * shift the other. Trains have an extra status (PAUSED) that
 * needs deliberate handling: PAUSED is the organizer's choice to
 * stop accepting sign-ups, NOT the same as "ended" — auto-close
 * doesn't fire on PAUSED, only on ACTIVE-past-grace.
 */

/** Default grace period for train auto-close. Same as chains (7
 *  days) for consistency unless we discover trains need more
 *  breathing room. */
export const TRAIN_AUTO_CLOSE_GRACE_DAYS = 7;

/** Days from createdAt before the abandonment-prompt fires for an
 *  empty train (zero claimed slots + zero warriors). 14 days gives
 *  organizers two weeks to share the link and build momentum before
 *  the system nudges them. */
export const TRAIN_ABANDONMENT_PROMPT_DAYS = 14;

/** Days after abandonmentPromptSentAt before the cron flips an
 *  empty train to CANCELLED. Matches TRAIN_AUTO_CLOSE_GRACE_DAYS so
 *  ops behavior stays consistent across both grace windows. */
export const TRAIN_ABANDONMENT_GRACE_DAYS = 7;

export type TrainForClosingPrompt = {
  status: string;
  endDate: Date;
  closingPromptSentAt: Date | null;
  organizer: { email: string | null } | null;
};

export type TrainForAutoClose = {
  status: string;
  endDate: Date;
};

/**
 * Returns true when the cron should send the organizer-facing
 * "your prayer train is wrapping up today" email for this train.
 * All conditions must hold:
 *   1. Train is still ACTIVE (already-completed/cancelled trains
 *      don't need a nudge; PAUSED is also skipped — the organizer
 *      explicitly stopped sign-ups, so a "wrapping up" prompt
 *      conflates intent)
 *   2. Today's calendar date equals the train's endDate (in the
 *      operator timezone). One-shot fire on the final day.
 *   3. The prompt hasn't already been sent (idempotency)
 *   4. The organizer has an email on file (no email = no send)
 */
export function shouldSendClosingPrompt(
  train: TrainForClosingPrompt,
  now: Date,
  timeZone: string,
): boolean {
  if (train.status !== "ACTIVE") return false;
  if (train.closingPromptSentAt !== null) return false;
  if (!train.organizer?.email) return false;
  const todayKey = dateKeyInTimezone(now, timeZone);
  const endKey = dateKeyInTimezone(train.endDate, "UTC");
  return todayKey === endKey;
}

/**
 * Returns true when the cron should auto-flip status to COMPLETED.
 * Conditions:
 *   1. Train is still ACTIVE. PAUSED, COMPLETED, CANCELLED stay as
 *      they are — auto-close ONLY moves ACTIVE forward. PAUSED
 *      especially: the organizer chose to stop accepting sign-ups
 *      indefinitely; the cron shouldn't override that.
 *   2. The train's endDate is more than `graceDays` calendar days
 *      in the past (default 7). Grace window gives the organizer
 *      time to fire warrior closing emails via the manual
 *      "Mark Completed" path before the cron sweeps quietly.
 *
 * Auto-close does NOT fire warrior closing emails — those are
 * reserved for the manual updateTrainStatus(COMPLETED) path so the
 * organizer's intent is preserved when emails go out to the prayer
 * warriors.
 */
export function shouldAutoClose(
  train: TrainForAutoClose,
  now: Date,
  timeZone: string,
  graceDays: number = TRAIN_AUTO_CLOSE_GRACE_DAYS,
): boolean {
  if (train.status !== "ACTIVE") return false;
  const todayKey = dateKeyInTimezone(now, timeZone);
  const endKey = dateKeyInTimezone(train.endDate, "UTC");
  const todayMs = Date.parse(todayKey + "T00:00:00Z");
  const endMs = Date.parse(endKey + "T00:00:00Z");
  const daysPastEnd = Math.floor((todayMs - endMs) / (1000 * 60 * 60 * 24));
  return daysPastEnd > graceDays;
}

// ─── Abandonment-cleanup predicates ─────────────────────────────
//
// Two-stage cleanup for trains that never picked up engagement. The
// existing closing-prompt + auto-close above only fires once a train
// reaches its endDate, so a 30-day train with zero signups would sit
// ACTIVE for 30 + 7 days before any cleanup. The abandonment passes
// catch the empty case earlier:
//
//   1. After 14 days from createdAt with zero engagement → send a
//      gentle organizer-facing prompt offering options (share, edit,
//      close) and announce a 7-day archive timer.
//
//   2. After 7 more days still empty → flip status to CANCELLED
//      (NOT COMPLETED — these trains never completed anything).
//
// Protected slugs (Spina, Denis Wilson) are explicitly bypassed:
// even though they'll get signups in practice, defense-in-depth
// keeps abandonment cleanup from ever touching them if the SQL
// query somehow lets one through.

export type TrainForAbandonmentPrompt = {
  slug: string;
  status: string;
  createdAt: Date;
  abandonmentPromptSentAt: Date | null;
  organizer: { email: string | null } | null;
};

export type TrainForAutoCancelAbandoned = {
  slug: string;
  status: string;
  abandonmentPromptSentAt: Date | null;
};

/**
 * Returns true when the cron should send the organizer the "your
 * prayer train hasn't picked up momentum yet" abandonment-prompt
 * email. All conditions must hold:
 *
 *   1. Train is still ACTIVE. PAUSED is skipped (the organizer
 *      deliberately stopped sign-ups; an abandonment prompt would
 *      conflate intent). COMPLETED/CANCELLED also skipped.
 *   2. Created at least `daysSinceCreated` calendar days ago in the
 *      operator timezone (default 14). Gives organizers two weeks
 *      to share the link before the system nudges them.
 *   3. The prompt hasn't already been sent (idempotency via
 *      abandonmentPromptSentAt).
 *   4. The organizer has an email on file (no email = no send).
 *   5. The slug is not in PROTECTED_SLUGS.
 *   6. The train has zero engagement: `signupCount === 0 &&
 *      warriorCount === 0`. A single claim or warrior pledge means
 *      someone is praying for this person — that's not abandonment
 *      regardless of how empty the calendar looks.
 *
 * Caller supplies signupCount + warriorCount because the cron's SQL
 * query already filters to empty trains via `slots: { none: {...} }`
 * and `warriors: { none: {} }`; this predicate is the final guard.
 */
export function shouldSendAbandonmentPrompt(
  train: TrainForAbandonmentPrompt,
  signupCount: number,
  warriorCount: number,
  now: Date,
  timeZone: string,
  daysSinceCreated: number = TRAIN_ABANDONMENT_PROMPT_DAYS,
): boolean {
  if (train.status !== "ACTIVE") return false;
  if (train.abandonmentPromptSentAt !== null) return false;
  if (!train.organizer?.email) return false;
  if (isProtectedTrain(train.slug)) return false;
  if (signupCount > 0 || warriorCount > 0) return false;
  const todayKey = dateKeyInTimezone(now, timeZone);
  const createdKey = dateKeyInTimezone(train.createdAt, "UTC");
  const todayMs = Date.parse(todayKey + "T00:00:00Z");
  const createdMs = Date.parse(createdKey + "T00:00:00Z");
  const daysSinceCreate = Math.floor(
    (todayMs - createdMs) / (1000 * 60 * 60 * 24),
  );
  return daysSinceCreate >= daysSinceCreated;
}

/**
 * Returns true when the cron should auto-flip status to CANCELLED
 * for an abandoned train. Conditions:
 *
 *   1. Train is still ACTIVE.
 *   2. abandonmentPromptSentAt is set (the prompt fired earlier).
 *   3. `graceDays` calendar days have passed since the prompt
 *      (default 7). Mirrors the closing-prompt grace window.
 *   4. The slug is not in PROTECTED_SLUGS.
 *   5. The train is still empty: `signupCount === 0 &&
 *      warriorCount === 0`. If anyone signed up between the prompt
 *      and the grace window, the train is no longer abandoned —
 *      it should continue toward its natural endDate.
 *
 * Auto-cancel terminal state is CANCELLED, not COMPLETED — these
 * trains never completed anything, so a "bouquet ready" email would
 * be wrong. The caller sends a brief archived-notification instead.
 */
export function shouldAutoCancelAbandoned(
  train: TrainForAutoCancelAbandoned,
  signupCount: number,
  warriorCount: number,
  now: Date,
  timeZone: string,
  graceDays: number = TRAIN_ABANDONMENT_GRACE_DAYS,
): boolean {
  if (train.status !== "ACTIVE") return false;
  if (train.abandonmentPromptSentAt === null) return false;
  if (isProtectedTrain(train.slug)) return false;
  if (signupCount > 0 || warriorCount > 0) return false;
  const todayKey = dateKeyInTimezone(now, timeZone);
  const promptKey = dateKeyInTimezone(train.abandonmentPromptSentAt, "UTC");
  const todayMs = Date.parse(todayKey + "T00:00:00Z");
  const promptMs = Date.parse(promptKey + "T00:00:00Z");
  const daysSincePrompt = Math.floor(
    (todayMs - promptMs) / (1000 * 60 * 60 * 24),
  );
  return daysSincePrompt >= graceDays;
}
