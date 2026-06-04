/**
 * Text sanitization for the standard-font PDF renderer.
 *
 * The spiritual bouquet renders with Times-Roman, one of the 14 built-in
 * PDF fonts. Those fonts are WinAnsi-encoded (~256 Latin characters) and
 * contain no emoji glyphs, so emoji in user text — encouragement-wall
 * posts, completion notes, display names — render as mojibake like
 * "≝O<ü" instead of the intended emoji. `stripEmoji` removes emoji and
 * the joiners / selectors / modifiers that compose them while preserving
 * ordinary letters, digits, punctuation, and Latin accents (é, ñ, ü, ç,
 * …) so multilingual names and messages survive intact.
 *
 * Scope note: this does NOT rescue non-WinAnsi *letters* (e.g. Polish
 * ł, ę). Those need a Unicode-capable embedded font; stripping them
 * would corrupt real names, so they're deliberately left alone and
 * tracked as a separate font-coverage follow-up.
 *
 * Pure functions only; import-safe everywhere (routes, components, tests).
 */

// Code points that compose multi-part emoji but carry no glyph of their
// own: zero-width joiner (U+200D), the two variation selectors
// (U+FE0E/U+FE0F), and the enclosing-keycap combiner (U+20E3). Built
// from numeric literals so the source stays pure ASCII (no invisible
// characters to get mangled by editors or transports).
const EMOJI_JOINERS = String.fromCharCode(0x200d, 0xfe0e, 0xfe0f, 0x20e3);

/**
 * Emoji and pictographic symbols plus their composing code points
 * (joiners above, skin-tone modifiers, regional-indicator flag pairs).
 *
 * Intentionally built on `\p{Extended_Pictographic}` rather than
 * `\p{Emoji}` — the latter also matches ASCII digits, `#`, and `*`,
 * which must be kept. A few dingbat-class symbols that are also
 * WinAnsi-renderable (©, ®, ™) get stripped too; acceptable since
 * they're vanishingly rare in prayer notes.
 */
const EMOJI_RE = new RegExp(
  `[\\p{Extended_Pictographic}\\p{Emoji_Modifier}\\p{Regional_Indicator}${EMOJI_JOINERS}]`,
  "gu",
);

/** Remove emoji / pictographic code points; leave everything else as-is. */
export function stripEmoji(input: string): string {
  return input.replace(EMOJI_RE, "");
}

/**
 * Sanitize a free-text string for the bouquet PDF: strip emoji, collapse
 * any horizontal-whitespace runs left behind (newlines preserved), and
 * trim. Returns "" when nothing renderable remains (e.g. an emoji-only
 * message) so callers can drop empty entries instead of printing blank
 * quotation marks.
 */
export function sanitizeBouquetText(input: string): string {
  return stripEmoji(input)
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}
