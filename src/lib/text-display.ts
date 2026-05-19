/**
 * Invisible whitespace normalization for user-supplied display text.
 *
 * Strips leading/trailing whitespace and collapses runs of 3+ blank
 * lines to 2. Does NOT touch capitalization, typos, punctuation, or
 * interior content — the user's voice is preserved character-by-
 * character. Applied at RENDER only; the database always stores
 * exactly what the organizer typed.
 *
 * Used on the public surfaces that render organizer-typed prayer
 * intentions, situation details, and personal prayer text — the
 * fields where copy/paste from a phone keyboard most often leaves
 * jarring leading newlines or quintuple line breaks.
 */
export function cleanDisplayText(s: string | null | undefined): string {
  if (!s) return "";
  return s.trim().replace(/\n{3,}/g, "\n\n");
}
