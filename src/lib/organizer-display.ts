/**
 * Organizer-name display helpers.
 *
 * Public train and chain pages have ~17 sites that render the organizer's
 * name. Each used to do its own variant of `train.organizer.name ||
 * "Anonymous"`, which had two problems:
 *   1. Drift — some sites fell back to "the organizer", others to
 *      "Anonymous", others to nothing.
 *   2. The fallback was a SILENT consequence of an unset User.name (no
 *      sign-in path captures it for magic-link users), not a deliberate
 *      organizer choice. People who never had a chance to enter their
 *      name showed up as "Anonymous".
 *
 * Fix: a per-train (and per-chain) `organizerAnonymous` boolean column
 * that captures the organizer's explicit choice at create time. The
 * helpers here read both the flag and the linked User.name and return
 * the correct display string. Pure functions — no DB, no I/O — so the
 * contract is unit-testable.
 *
 * Two return shapes:
 *   - organizerDisplayName: full name ("William Keough") or "Anonymous"
 *   - organizerFirstName: first word ("William") or "the organizer"
 *
 * The "the organizer" fallback for first-name keeps email and copy
 * sentences readable when no name is available ("A prayer from the
 * organizer" reads better than "A prayer from Anonymous").
 */

export type OrganizerSource = {
  organizerAnonymous: boolean;
  organizer: { name: string | null };
};

/**
 * Full display name for "Organized by …" surfaces.
 * Returns "Anonymous" when the organizer opted in OR when no name is set
 * at all (latter is a defensive safety net for legacy rows; once the
 * dashboard backfill prompt ships, names will be populated).
 */
export function organizerDisplayName(t: OrganizerSource): string {
  if (t.organizerAnonymous) return "Anonymous";
  const trimmed = t.organizer.name?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : "Anonymous";
}

/**
 * First-name shorthand for sentence contexts. Returns "the organizer"
 * (lower case, no possessive) when anonymous or unset, so callers that
 * embed it in copy don't have to special-case the noun:
 *
 *   `A prayer from ${organizerFirstName(train)}`
 *     → "A prayer from William"
 *     → "A prayer from the organizer"
 *
 * Both produce a grammatical sentence.
 */
export function organizerFirstName(t: OrganizerSource): string {
  if (t.organizerAnonymous) return "the organizer";
  const trimmed = t.organizer.name?.trim();
  if (!trimmed) return "the organizer";
  return trimmed.split(/\s+/)[0];
}
