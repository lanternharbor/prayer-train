/**
 * Build the create-flow href for a "carry this forward" CTA, composing
 * the optional prayer pre-fill with the first-party `?from=` attribution
 * param (see ACQUISITION_SOURCES in src/lib/validation.ts).
 *
 * Returns a BARE path — LocaleLink prepends the locale at render time.
 * Pure + shared by the CarryForwardCta component so the param
 * composition (which feeds the whole growth-loop measurement) is
 * unit-tested rather than buried in JSX.
 */
export function buildCarryForwardHref(
  base: "/create/train" | "/chain/new",
  from: string,
  prayerSlug?: string,
): string {
  const params = new URLSearchParams();
  if (prayerSlug) params.set("prayerType", prayerSlug);
  params.set("from", from);
  return `${base}?${params.toString()}`;
}
