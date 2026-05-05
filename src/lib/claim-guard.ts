/**
 * Pure-function preconditions for the slot-claim flow.
 *
 * The race-correctness in claimPrayerSlot lives in the SQL CAS
 * (conditional `updateMany` on `status: "OPEN"`) inside a Postgres
 * transaction. That part isn't unit-testable without spinning up the
 * database. The PRECONDITIONS, though, are pure functions on the
 * shape of a fetched slot or train: this module extracts those so
 * they can be exercised in vitest without Prisma.
 *
 * Each function throws a plain Error with a user-facing message on
 * precondition failure. The server action catches that Error in its
 * transaction body and the surrounding modal surfaces it inline (see
 * src/app/p/[slug]/claim-modal.tsx).
 *
 * Adding a new precondition? Add a function here, add tests, then
 * call it from src/lib/actions.ts inside claimPrayerSlot's
 * transaction. Don't inline new check logic in actions.ts — it
 * silently bypasses the test boundary.
 */

export type ClaimableSlot = { status: string };
export type ClaimableTrain = { status: string };

// User-facing message strings, exported so callers and tests share one
// source of truth. The slot/race-loser case reuses the same message
// because both produce the same volunteer-facing experience: the slot
// they tried to claim is no longer available, regardless of why.
export const ERR_SLOT_NOT_AVAILABLE = "This slot is no longer available.";
export const ERR_TRAIN_CANCELLED =
  "This prayer train has been cancelled by the organizer.";
export const ERR_TRAIN_PAUSED =
  "This prayer train is paused. New sign-ups will resume when the organizer reactivates it.";
export const ERR_NOVENA_NOT_AVAILABLE =
  "This novena is no longer fully available.";

/**
 * Throws if the slot is null (race lost the row) or if its status
 * isn't OPEN (already claimed/completed by someone else). Uses
 * the TypeScript `asserts` syntax to narrow the slot type to
 * non-null in the caller's scope after a successful check.
 */
export function checkSlotClaimable<T extends ClaimableSlot>(
  slot: T | null,
): asserts slot is T {
  if (!slot) throw new Error(ERR_SLOT_NOT_AVAILABLE);
  if (slot.status !== "OPEN") throw new Error(ERR_SLOT_NOT_AVAILABLE);
}

/**
 * Throws if the parent train isn't accepting new sign-ups.
 *  - CANCELLED: organizer permanently stopped the train.
 *  - PAUSED: organizer temporarily disabled new sign-ups (the manage
 *    page UI says "No new sign-ups while paused"). Previously a
 *    server-side enforcement gap — anyone hitting the page directly
 *    could still claim — now hard-rejected here so the UI promise
 *    holds even when an existing tab raced past the pause.
 *  - COMPLETED isn't checked here: it's reached only after the cron
 *    rolls a date past endDate, so by definition no future slots
 *    are OPEN; the slot-level guard catches that case.
 */
export function checkTrainAcceptingClaims(train: ClaimableTrain): void {
  if (train.status === "CANCELLED") throw new Error(ERR_TRAIN_CANCELLED);
  if (train.status === "PAUSED") throw new Error(ERR_TRAIN_PAUSED);
}

/**
 * Throws if a novena window doesn't have all required days still
 * OPEN. Called BEFORE the conditional updateMany so we can produce
 * the more specific "novena no longer fully available" message
 * instead of the generic slot-unavailable one.
 */
export function checkNovenaFullyAvailable(
  daysOpen: number,
  daysRequired: number,
): void {
  if (daysOpen < daysRequired) {
    throw new Error(ERR_NOVENA_NOT_AVAILABLE);
  }
}

/**
 * Throws if the SQL CAS returned a different number of updated rows
 * than expected. This is the race-loser detection: a concurrent
 * claimer flipped one of our target slots between the read and the
 * conditional updateMany, so our update count fell short. Wrapped in
 * the transaction's outer try/catch which rolls back the whole flow.
 */
export function checkUpdateCountMatches(
  updated: number,
  expected: number,
): void {
  if (updated !== expected) throw new Error(ERR_SLOT_NOT_AVAILABLE);
}
