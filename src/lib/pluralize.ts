/**
 * Return the correct singular or plural form of a word based on a count.
 * Defaults the plural form to `singular + "s"`. Pass an explicit `plural`
 * argument for irregular cases (e.g. "goose" / "geese").
 */
export function pluralize(
  count: number,
  singular: string,
  plural?: string,
): string {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}
