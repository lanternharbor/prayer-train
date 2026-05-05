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
 * encouragement wall. Both conditions must hold:
 *   1. There IS a note (non-null, non-empty after normalization).
 *   2. The claimer opted in via the shareWall checkbox.
 *
 * Used by the wall-assembly query so the predicate stays in one
 * place. The bouquet PDF deliberately ignores shareWall — it
 * includes every note as the comprehensive record for the family.
 */
export function shouldShowNoteOnWall(slot: {
  completionNote: string | null;
  completionNoteShareWall: boolean;
}): boolean {
  if (!slot.completionNoteShareWall) return false;
  return normalizeNoteText(slot.completionNote) !== null;
}

/** Maximum length of a completion note in characters. */
export const NOTE_MAX_LENGTH = 200;
