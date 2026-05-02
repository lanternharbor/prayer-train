/**
 * Search and normalization helpers for the parish autocomplete.
 *
 * The DB-side `contains` filter doesn't handle natural Catholic search
 * patterns: "st paul" should match "St. Paul Parish", "saint paul"
 * should too, and multi-token queries like "st paul hingham" should
 * AND across name + city. This module provides a normalization helper
 * plus a multi-token matcher that runs against the full parish list
 * (currently ~100 entries; see scripts/seed-parishes.ts) at request
 * time. If the parish list grows substantially (a few thousand+),
 * revisit and push filtering back to the DB layer with a tsvector or
 * trigram index.
 */

export type SearchableParish = {
  name: string;
  city: string;
  state: string;
  diocese: string | null;
};

/**
 * Normalize a string for parish search:
 *  - lowercase
 *  - strip apostrophes (so "Mary's" matches both "marys" and "mary")
 *  - expand standalone "sts" / "sts." to "saints" and "st" / "st." to
 *    "saint" (Catholic prefix abbreviations). Word boundaries prevent
 *    false hits inside words like "first", "christ", or "stations".
 *  - replace remaining punctuation with a space
 *  - collapse whitespace
 *
 * Examples:
 *   "St. Paul Parish"        -> "saint paul parish"
 *   "st paul"                -> "saint paul"
 *   "saint paul"             -> "saint paul"
 *   "Sts. Peter and Paul"    -> "saints peter and paul"
 *   "St. Mary's Cathedral"   -> "saint marys cathedral"
 *   "First Christian Church" -> "first christian church"  (no false st-match)
 */
export function normalizeForSearch(s: string): string {
  let out = s.toLowerCase();
  // Strip apostrophes without inserting space ("Mary's" -> "marys").
  out = out.replace(/['’]/g, "");
  // Expand "sts" / "sts." (with word boundaries) to "saints". Order
  // matters: "sts" is checked before "st" so the trailing s is consumed
  // first.
  out = out.replace(/\bsts\.?(?=\s|$)/g, "saints");
  // Expand "st" / "st." (with word boundaries) to "saint". The
  // lookahead `(?=\s|$)` ensures we only match standalone "st" or
  // "st.", never the "st" inside "first", "christ", "stations", etc.
  out = out.replace(/\bst\.?(?=\s|$)/g, "saint");
  // Replace any remaining non-word, non-space character with a space.
  out = out.replace(/[^\w\s]/g, " ");
  // Collapse whitespace.
  out = out.replace(/\s+/g, " ").trim();
  return out;
}

/**
 * Split a query into tokens after normalization. Empty tokens are
 * filtered out.
 */
export function tokenize(query: string): string[] {
  const normalized = normalizeForSearch(query);
  if (!normalized) return [];
  return normalized.split(" ").filter(Boolean);
}

/**
 * Build a single normalized haystack string from a parish's searchable
 * fields. Joining the parts with a separator that gets normalized to
 * whitespace prevents tokens from accidentally bridging field
 * boundaries (e.g., a parish named "Foo" in city "Bar" must not be
 * matched by a query for "foobar").
 */
export function buildParishHaystack(parish: SearchableParish): string {
  const parts = [parish.name, parish.city, parish.state, parish.diocese ?? ""];
  return normalizeForSearch(parts.join(" | "));
}

/**
 * Returns true when every token in the query appears as a substring
 * somewhere in the parish's normalized haystack. AND semantics across
 * tokens; OR semantics across the parish's fields (because the
 * haystack concatenates them).
 *
 * The empty query matches nothing; callers should already short-circuit
 * on short queries.
 */
export function matchesParish(
  query: string,
  parish: SearchableParish,
): boolean {
  const tokens = tokenize(query);
  if (tokens.length === 0) return false;
  const haystack = buildParishHaystack(parish);
  return tokens.every((token) => haystack.includes(token));
}
