/**
 * Small helpers for slot completion notes.
 *
 * Notes live as two columns on PrayerSlot: `completionNote` (nullable
 * text) and `completionNoteShareWall` (boolean, default false). The
 * note is the optional short message a prayer warrior can leave when
 * marking a slot complete; the shareWall flag controls whether the
 * note also surfaces on the public encouragement wall in addition to
 * the spiritual bouquet.
 *
 * Pure functions only; this module is import-safe everywhere
 * (server actions, server components, client components, tests).
 */

/**
 * Trim and collapse whitespace; return null if the result is empty.
 * Keeps the DB clean of stray "   " or "\n\n" notes.
 */
export function normalizeNoteText(input: string | null | undefined): string | null {
  if (typeof input !== "string") return null;
  const trimmed = input.trim();
  return trimmed.length === 0 ? null : trimmed;
}

/**
 * Returns true when a slot's note should appear on the public
 * encouragement wall to NON-ORGANIZER viewers. Three conditions:
 *   1. There IS a note (non-null, non-empty after normalization).
 *   2. The claimer opted in via the shareWall checkbox.
 *   3. The organizer has not soft-hidden the note via moderation.
 *
 * The organizer's own view of the wall ignores condition 3 — they
 * see hidden entries with a "Hidden" tag so they can unhide. Use
 * `isNoteVisibleToOrganizer` for that view.
 *
 * The bouquet PDF uses `isNoteIncludedInBouquet` which ignores
 * shareWall (the bouquet is the comprehensive record for the
 * family) but DOES respect hidden state — bad-faith content the
 * organizer hid shouldn't end up in the memorial PDF either.
 */
export function shouldShowNoteOnWall(slot: {
  completionNote: string | null;
  completionNoteShareWall: boolean;
  completionNoteHiddenAt?: Date | null;
}): boolean {
  if (!slot.completionNoteShareWall) return false;
  if (slot.completionNoteHiddenAt) return false;
  return normalizeNoteText(slot.completionNote) !== null;
}

/**
 * Returns true when a slot's note should be visible to the train
 * organizer in their wall view. Same conditions as the public
 * predicate EXCEPT the hidden flag is ignored — the organizer sees
 * hidden entries with moderation controls to unhide.
 */
export function isNoteVisibleToOrganizer(slot: {
  completionNote: string | null;
  completionNoteShareWall: boolean;
}): boolean {
  if (!slot.completionNoteShareWall) return false;
  return normalizeNoteText(slot.completionNote) !== null;
}

/**
 * Returns true when a slot's note should be included in the
 * spiritual bouquet PDF. The bouquet is the comprehensive memorial
 * record for the recipient family, so it ignores the shareWall
 * opt-in (every note prayed during the train counts). It DOES
 * respect hidden state — content the organizer chose to suppress
 * shouldn't end up in the family's printed keepsake.
 */
export function isNoteIncludedInBouquet(slot: {
  completionNote: string | null;
  completionNoteHiddenAt?: Date | null;
}): boolean {
  if (slot.completionNoteHiddenAt) return false;
  return normalizeNoteText(slot.completionNote) !== null;
}

/** Maximum length of a completion note in characters. */
export const NOTE_MAX_LENGTH = 200;
