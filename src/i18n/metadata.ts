import type { Metadata } from "next";
import { locales, type Locale } from "./config";
import { localizedHref } from "./links";
import { getBaseUrl } from "@/lib/url";

/**
 * Build the `alternates.languages` map for hreflang annotations.
 *
 * For each supported locale, emits an absolute URL to the same logical
 * page in that locale. Plus an `x-default` pointing at the bare-URL
 * (English) version — that's the canonical fallback Google uses for
 * unspecified locales.
 *
 * @example
 *   buildLanguageAlternates("/prayers/novena-sacred-heart")
 *   // {
 *   //   "en": "https://prayertrains.com/en/prayers/novena-sacred-heart",
 *   //   "es": "https://prayertrains.com/es/prayers/novena-sacred-heart",
 *   //   "x-default": "https://prayertrains.com/prayers/novena-sacred-heart"
 *   // }
 *
 * @example
 *   buildLanguageAlternates("/")
 *   // {
 *   //   "en": "https://prayertrains.com/en",
 *   //   "es": "https://prayertrains.com/es",
 *   //   "x-default": "https://prayertrains.com/"
 *   // }
 */
export function buildLanguageAlternates(
  path: string,
): Record<string, string> {
  const baseUrl = getBaseUrl();
  const out: Record<string, string> = {};
  for (const l of locales) {
    out[l] = `${baseUrl}${localizedHref(l, path)}`;
  }
  // x-default: the bare URL, which the proxy rewrites internally to
  // the default locale. Google uses this for visitors whose
  // Accept-Language doesn't match any of our listed locales.
  out["x-default"] = path === "/" ? baseUrl : `${baseUrl}${path}`;
  return out;
}

/**
 * Build a complete `alternates` block for a `Metadata` object.
 *
 * Includes:
 *  - `canonical`: the self-locale URL (where THIS page lives in the
 *    current locale). Tells Google "this URL is the master for this
 *    locale's version of the content."
 *  - `languages`: hreflang alternates (see `buildLanguageAlternates`)
 *
 * @example
 *   buildAlternates({ locale: "es", path: "/browse" })
 *   // {
 *   //   canonical: "https://prayertrains.com/es/browse",
 *   //   languages: { en, es, "x-default" }
 *   // }
 */
export function buildAlternates({
  locale,
  path,
}: {
  locale: Locale;
  path: string;
}): NonNullable<Metadata["alternates"]> {
  const baseUrl = getBaseUrl();
  return {
    canonical: `${baseUrl}${localizedHref(locale, path)}`,
    languages: buildLanguageAlternates(path),
  };
}

/**
 * Convenience: build a complete locale-aware Metadata object for the
 * common case of a page with a title, description, canonical path,
 * and optional OG image. Plug-and-play in `generateMetadata`.
 *
 * Callers that need more (e.g., article-type OG, FAQ schema, custom
 * Twitter card) should compose `buildAlternates` themselves rather
 * than extending this helper.
 *
 * @example
 *   return localizedMetadata({
 *     locale,
 *     path: "/browse",
 *     title: t.metadataTitle,
 *     description: t.metadataDescription,
 *     absoluteTitle: false,
 *   });
 */
export function localizedMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
  ogImage,
  noindex = false,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  /** When true, opts out of the layout's "%s | PrayerTrain" template.
   *  Used by the homepage so the title doesn't render as
   *  "PrayerTrain — Organized Prayer for Those in Need | PrayerTrain". */
  absoluteTitle?: boolean;
  /** Absolute URL to the page's OG image. Defaults to /logo.png. */
  ogImage?: string;
  /** Auth-gated pages (signin, dashboard) should set this true. */
  noindex?: boolean;
}): Metadata {
  const baseUrl = getBaseUrl();
  const image = ogImage ?? `${baseUrl}/logo.png`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: buildAlternates({ locale, path }),
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "PrayerTrain",
      locale: localeToOgTag(locale),
      images: [{ url: image, width: 1024, height: 1024, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/**
 * Convert our internal locale code to the OG `locale` property's
 * preferred BCP 47-with-underscore format. Open Graph examples use
 * "en_US", "es_ES", "pt_BR", etc.
 *
 * For macro-tag locales (just "en" or "es") we pad with a default
 * regional suffix that's common on the open web. Refinement to
 * region-specific dictionaries (Phase 3 of the i18n roadmap) will
 * let us emit the exact regional variant when we ship es-MX vs
 * es-ES, pt-BR vs pt-PT, etc.
 */
function localeToOgTag(locale: Locale): string {
  switch (locale) {
    case "en":
      return "en_US";
    case "es":
      return "es_ES";
    default:
      return locale;
  }
}
