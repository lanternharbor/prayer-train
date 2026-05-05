/**
 * Hard guardrails for destructive train operations (delete, cancel).
 *
 * Two pure-function checks the server actions in src/lib/actions.ts must
 * pass before mutating the PrayerTrain table:
 *
 * 1. Slug protection: a small set of trains cannot be deleted or cancelled
 *    under any circumstance, regardless of organizer auth. The Spina
 *    family train is the canonical example — it's a live, real-world
 *    prayer train holding 90+ slots of prayer offered for a grieving
 *    family, and corrupting that data is not a recoverable mistake.
 *
 * 2. Confirmation match: destructive actions require the organizer to
 *    type the recipient's name as a literal-phrase confirmation. Mirrors
 *    the `yes delete benji` pattern from one-off destructive scripts:
 *    ambiguous "yes" or "go for it" should never trigger irreversible
 *    operations.
 *
 * Extracted as a pure-function module so the safety boundary is unit-
 * testable without spinning up Prisma. The server actions import
 * isProtectedTrain + confirmationMatches and apply them inside the
 * existing auth flow.
 */

/**
 * Train slugs that can NEVER be deleted or cancelled by any code path.
 * Add to this set sparingly. Each entry should have a one-line comment
 * explaining why it's protected.
 */
export const PROTECTED_SLUGS: ReadonlySet<string> = new Set([
  // Live train organized by Kathleen Lubowski for the Spina family
  // (lost their son Matthew, late April 2026). 90 slots, 38 unique
  // prayer warriors, real prayer offered for real grief. Bouquet
  // delivers May 23, 2026. Cannot be deleted under any circumstance.
  "the-spina-family-dlmm",
  // Live train "Prayers for Denis Wilson" — long-running train (ends
  // August 2, 2026) organized for Denis's complete healing and for
  // his family Jolly + Ella. Live data, real prayer offered; same
  // protection as Spina at William's explicit request on May 4, 2026.
  "denis-wilson-hn9g",
]);

/**
 * Chain slugs that can NEVER be deleted or cancelled. Currently empty;
 * the function and Set exist for symmetry with the train side and to
 * keep adding a protected chain in the future a one-line change.
 */
export const PROTECTED_CHAIN_SLUGS: ReadonlySet<string> = new Set([]);

/**
 * Returns true if the given slug is in the protected train list.
 *
 * Case-sensitive and exact: PROTECTED_SLUGS holds the canonical lowercase
 * slug as stored in the database. The slug column has no case-fold
 * index, so a comparison shortcut on case is unnecessary.
 */
export function isProtectedTrain(slug: string): boolean {
  return PROTECTED_SLUGS.has(slug);
}

/**
 * Returns true if the given slug is in the protected chain list.
 * Mirrors isProtectedTrain. Currently always returns false because
 * no chains are protected, but server actions should still call it
 * so adding a protected chain later is just a Set addition.
 */
export function isProtectedChain(slug: string): boolean {
  return PROTECTED_CHAIN_SLUGS.has(slug);
}

/**
 * Returns true if the user-typed confirmation matches the recipient
 * name closely enough to count as deliberate. Trim-tolerant and
 * case-insensitive — a user typing "kathleen lubowski" or "  KATHLEEN
 * LUBOWSKI  " should both match a recipient name stored as
 * "Kathleen Lubowski". Empty or whitespace-only inputs always return
 * false (no accidental "yes" via a stray Enter key).
 */
export function confirmationMatches(
  typed: string,
  recipientName: string,
): boolean {
  const a = typed.trim().toLowerCase();
  const b = recipientName.trim().toLowerCase();
  if (!a || !b) return false;
  return a === b;
}
