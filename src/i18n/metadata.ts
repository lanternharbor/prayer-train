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
  ogImageWidth,
  ogImageHeight,
  ogType = "website",
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
  /** Absolute URL to the page's OG image. Defaults to the per-locale
   *  auto-generated OG share card. */
  ogImage?: string;
  /** Pixel dimensions of `ogImage`. When omitted, defaults to the
   *  legacy 1024x1024 saint-portrait ratio. Pages that ship a
   *  1200x630 page-local opengraph-image.tsx should set both. */
  ogImageWidth?: number;
  ogImageHeight?: number;
  /** Open Graph type. "website" for marketing pages, "article" for
   *  prayer-detail and situation-detail pages so Facebook/Twitter
   *  scrapers treat them as content surfaces. */
  ogType?: "website" | "article";
  /** Auth-gated pages (signin, dashboard) should set this true. */
  noindex?: boolean;
}): Metadata {
  // Per-locale Open Graph share-card image. When the caller doesn't
  // pass an explicit `ogImage`, default to the auto-generated image
  // produced by `src/app/[locale]/opengraph-image.tsx` (navy-cream-
  // gold brand palette, locale-aware tagline). The file convention
  // auto-attaches only to the immediate-parent segment (the
  // [locale]/page.tsx homepage); for deeper routes (/browse,
  // /prayers, /situations, prayer detail, situation detail, etc.)
  // we explicitly point at the same generated URL so every locale-
  // prefixed page gets a branded share card. Pages that DO pass
  // `ogImage` (prayer detail with saint portrait, train + chain
  // detail with recipient photo) override.
  //
  // Dimensions are 1200x630, matching `opengraph-image.tsx`'s
  // `size` export and the canonical OG/Twitter aspect ratio. When
  // a caller supplies its own image we assume the legacy saint-
  // portrait 1024x1024 ratio — the only sources of `ogImage` today.
  const baseUrl = getBaseUrl();
  const defaultImage = `${baseUrl}/${locale}/opengraph-image`;
  const image = ogImage ?? defaultImage;
  const imageWidth = ogImage ? (ogImageWidth ?? 1024) : 1200;
  const imageHeight = ogImage ? (ogImageHeight ?? 1024) : 630;
  const selfUrl = `${baseUrl}${localizedHref(locale, path)}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: buildAlternates({ locale, path }),
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title,
      description,
      url: selfUrl,
      type: ogType,
      siteName: "PrayerTrain",
      locale: localeToOgTag(locale),
      images: [{ url: image, width: imageWidth, height: imageHeight, alt: title }],
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
      // Spanish ships under a macro-tag for now; "es_ES" is a defensible
      // default for OG (Open Graph examples cite es_ES + es_LA). Once we
      // split into es-MX/es-ES specifically, this becomes 1:1.
      return "es_ES";
    case "pt-BR":
      return "pt_BR";
    case "fil":
      // OG locale uses BCP 47 with underscore. "fil_PH" pins the Filipino
      // macrolanguage to the Philippines — the natural mapping for our
      // launch market. Facebook/Twitter share-card previews honor this
      // for layout (RTL detection, font selection on some platforms).
      return "fil_PH";
    case "pl":
      // Polish ships under a macro-tag; OG locale convention pads to
      // "pl_PL" (Poland). Chicago/NYC diaspora visitors still see this
      // — there's no widely-used "pl_US" tag, and the language is the
      // same anyway.
      return "pl_PL";
    default:
      return locale;
  }
}
