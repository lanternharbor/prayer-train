import { ImageResponse } from "next/og";
import { isLocale, defaultLocale, locales, type Locale } from "@/i18n/config";

/**
 * Per-locale OG share card for the /parish-kit landing.
 *
 * Variant of the locale-level brand card with pastor-oriented copy:
 * eyebrow ("FOR PASTORS"), specific heading ("Bring PrayerTrain to
 * your parish"), and a free/no-signup subtitle. Reuses the navy/gold/
 * cream brand palette so the social preview reads as part of the
 * same product family.
 *
 * URL: /<locale>/parish-kit/opengraph-image
 * Override threaded explicitly via `localizedMetadata`'s `ogImage`
 * (the helper otherwise defaults every page to the locale-level
 * brand card).
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "PrayerTrain Parish Kit — bring PrayerTrain to your parish";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Copy = { eyebrow: string; heading: string; subtitle: string };

const COPY: Record<Locale, Copy> = {
  en: {
    eyebrow: "FOR PASTORS & PARISH STAFF",
    heading: "Bring PrayerTrain to your parish.",
    subtitle: "Free Catholic prayer coordination. No signup. No cost.",
  },
  es: {
    eyebrow: "PARA PÁRROCOS Y PERSONAL PARROQUIAL",
    heading: "Comparte PrayerTrain con tu parroquia.",
    subtitle: "Coordinación católica de oración gratuita. Sin registro. Sin costo.",
  },
  "pt-BR": {
    eyebrow: "PARA PÁROCOS E EQUIPE PAROQUIAL",
    heading: "Leve o PrayerTrain à sua paróquia.",
    subtitle: "Coordenação católica de oração gratuita. Sem cadastro. Sem custo.",
  },
  fil: {
    eyebrow: "PARA SA MGA PARI AT PARISH STAFF",
    heading: "Dalhin ang PrayerTrain sa iyong parokya.",
    subtitle: "Libreng Katolikong pag-coordinate ng panalangin. Walang sign-up. Walang bayad.",
  },
  pl: {
    eyebrow: "DLA PROBOSZCZÓW I PERSONELU PARAFIALNEGO",
    heading: "Przynieś PrayerTrain do swojej parafii.",
    subtitle: "Bezpłatna katolicka koordynacja modlitwy. Bez rejestracji. Bez kosztów.",
  },
};

export default async function ParishKitOgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = COPY[locale];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#0e2541",
          padding: "80px",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "8px",
            backgroundColor: "#d4af37",
          }}
        />

        <div
          style={{
            fontSize: 28,
            color: "#d4af37",
            letterSpacing: "0.12em",
            marginBottom: 32,
            display: "flex",
          }}
        >
          {t.eyebrow}
        </div>

        <div
          style={{
            fontSize: 76,
            color: "#f5e6c8",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: 32,
            maxWidth: 980,
            display: "flex",
          }}
        >
          {t.heading}
        </div>

        <div
          style={{
            fontSize: 36,
            color: "#f5e6c8",
            opacity: 0.85,
            lineHeight: 1.35,
            maxWidth: 940,
            display: "flex",
          }}
        >
          {t.subtitle}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 50,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 26,
              color: "#f5e6c8",
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
          >
            PrayerTrain
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#f5e6c8",
              opacity: 0.7,
              letterSpacing: "0.04em",
            }}
          >
            prayertrains.com/parish-kit
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
