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
 *
 * NOTE: this fallback is fine in "A prayer from X" position, but it
 * breaks when callers want a possessive — `${orgFirst}'s Novena ...`
 * yields "the organizer's Novena ..." which reads stiff at best and
 * is a bug when the organizer didn't choose anonymity (their User.name
 * just happens to be null). For possessive constructions, prefer
 * organizerFirstNameOrNull below and branch on null.
 */
export function organizerFirstName(t: OrganizerSource): string {
  if (t.organizerAnonymous) return "the organizer";
  const trimmed = t.organizer.name?.trim();
  if (!trimmed) return "the organizer";
  return trimmed.split(/\s+/)[0];
}

/**
 * First-name shorthand that returns null instead of "the organizer"
 * when no real name is available. Use when copy needs to drop a
 * construction entirely if there's no name, rather than substituting
 * a fallback noun.
 *
 * Two cases return null:
 *   1. organizerAnonymous === true (organizer's deliberate choice)
 *   2. User.name is null/empty (unset on a magic-link user; the
 *      dashboard set-name-card from PR #28 surfaces a one-time
 *      backfill prompt, but until they fill it we have nothing
 *      to display)
 *
 * Counterpart of firstNameOrNull in email.ts, which takes a raw
 * string. This one takes the same OrganizerSource shape as the
 * existing organizerFirstName/organizerDisplayName helpers so
 * callers that already have a chain/train include don't need to
 * reshape the argument.
 *
 * Originally introduced to fix the chain page metadata title bug
 * (PR #36 fixed cron emails for the same bug class; this one's the
 * page-title surface, where `${orgFirst}'s ${prayerName}` rendered
 * "the organizer's Surrender Novena" in `<title>` and OG metadata).
 */
export function organizerFirstNameOrNull(t: OrganizerSource): string | null {
  if (t.organizerAnonymous) return null;
  const trimmed = t.organizer.name?.trim();
  if (!trimmed) return null;
  return trimmed.split(/\s+/)[0];
}
