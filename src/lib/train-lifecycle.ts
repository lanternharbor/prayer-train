import { dateKeyInTimezone } from "./dates";

/**
 * Pure-function predicates for the train end-of-life cron passes
 * (closing-prompt email + grace-period auto-close). Mirrors the
 * shape of src/lib/chain-lifecycle.ts — same pattern, different
 * primitive.
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
