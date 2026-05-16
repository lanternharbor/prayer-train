import { ImageResponse } from "next/og";
import { isLocale, defaultLocale, locales, type Locale } from "@/i18n/config";

/**
 * Per-locale OG share card for /how-to-start-a-prayer-train.
 *
 * Consumer-facing variant of the locale-level brand card. Eyebrow
 * ("FREE GUIDE"), the page heading, and a one-line consumer-tone
 * promise. Same navy/gold/cream palette as the other share cards so
 * a feed visitor sees coherent branding when the link circulates.
 *
 * URL: /<locale>/how-to-start-a-prayer-train/opengraph-image
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "How to start a prayer train — PrayerTrain";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Copy = { eyebrow: string; heading: string; subtitle: string };

const COPY: Record<Locale, Copy> = {
  en: {
    eyebrow: "FREE GUIDE",
    heading: "How to start a prayer train for someone you love.",
    subtitle: "Coordinate sustained prayer when it matters most.",
  },
  es: {
    eyebrow: "GUÍA GRATUITA",
    heading: "Cómo comenzar una cadena de oración por alguien que amas.",
    subtitle: "Coordina oración sostenida cuando más importa.",
  },
  "pt-BR": {
    eyebrow: "GUIA GRATUITO",
    heading: "Como iniciar uma corrente de oração por alguém que você ama.",
    subtitle: "Coordene oração sustentada quando mais importa.",
  },
  fil: {
    eyebrow: "LIBRENG GABAY",
    heading: "Paano magsimula ng prayer train para sa minamahal mo.",
    subtitle: "I-coordinate ang patuloy na panalangin kapag pinakamahalaga.",
  },
  pl: {
    eyebrow: "BEZPŁATNY PRZEWODNIK",
    heading: "Jak rozpocząć prayer train za kogoś, kogo kochasz.",
    subtitle: "Koordynuj trwałą modlitwę, gdy najbardziej się liczy.",
  },
};

export default async function HowToStartOgImage({
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
            fontSize: 70,
            color: "#f5e6c8",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: 32,
            maxWidth: 1020,
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
            prayertrains.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
