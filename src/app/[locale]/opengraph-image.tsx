import { ImageResponse } from "next/og";
import { getDictionary } from "@/i18n/dictionaries";
import { isLocale, defaultLocale, locales } from "@/i18n/config";

/**
 * Per-locale Open Graph share-card image.
 *
 * Auto-generated at build time via Next's file convention. One PNG per
 * locale segment (5 total: en, es, pt-BR, fil, pl). Cached statically
 * — no per-request overhead.
 *
 * Replaces the previous default `<image url="/logo.png">` fallback in
 * `src/i18n/metadata.ts` for the marketing surfaces (homepage, /browse,
 * /prayers, /situations, /our-story, etc.). Train + chain detail pages
 * still override with the recipient's uploaded photo when present —
 * those pages pass an explicit `ogImage` to `localizedMetadata` which
 * wins over this file-convention image.
 *
 * Visual design: navy background (brand color), cream-gold title +
 * locale-aware tagline + URL. System font fallback for now — custom
 * EB Garamond/DM Sans webfonts would need to be fetched at build time
 * and bundled, which adds complexity. The simpler typography reads
 * cleanly enough on the share-card surface and matches the brand's
 * navy/gold/cream palette.
 *
 * Brand colors (matches src/app/globals.css + tailwind theme):
 *   navy-900: #0e2541    background
 *   cream-100: #f5e6c8   title
 *   gold-400: #d4af37    tagline
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "PrayerTrain — Organized prayer for those in need";

/**
 * Pre-generate the OG image for every supported locale at build time.
 * Mirrors the page-level `generateStaticParams` in the layout —
 * without this, Next.js can't know the full set of locales to render
 * the file-convention image for.
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);
  const tagline = dict.common.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0e2541", // navy
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Subtle decorative band along the top edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            backgroundColor: "#d4af37", // gold-400
          }}
        />

        <div
          style={{
            fontSize: 108,
            color: "#f5e6c8", // cream-100
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 28,
            display: "flex",
          }}
        >
          PrayerTrain
        </div>

        <div
          style={{
            fontSize: 42,
            color: "#d4af37", // gold-400
            textAlign: "center",
            maxWidth: 940,
            lineHeight: 1.3,
            display: "flex",
            justifyContent: "center",
          }}
        >
          {tagline}
        </div>

        {/* Footer band: domain + locale subtle */}
        <div
          style={{
            position: "absolute",
            bottom: 50,
            display: "flex",
            alignItems: "center",
            gap: 16,
            opacity: 0.7,
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: "#f5e6c8",
              letterSpacing: "0.04em",
            }}
          >
            prayertrains.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
