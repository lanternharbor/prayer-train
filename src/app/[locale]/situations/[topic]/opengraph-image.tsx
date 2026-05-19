import { ImageResponse } from "next/og";
import { isLocale, defaultLocale, locales, type Locale } from "@/i18n/config";
import { SITUATION_TOPICS } from "./content";
import { getSituationContent } from "./content.translations";

/**
 * Per-locale, per-topic OG share card for /situations/<topic>.
 *
 * Topic heading is pulled from getSituationContent so each topic's
 * card carries its own h1 (Catholic prayers for surgery / for grief
 * / etc.). Eyebrow + subtitle are shared per-locale to keep the
 * brand band consistent.
 *
 * 6 topics × 5 locales = 30 static variants pre-generated at build.
 * URL: /<locale>/situations/<topic>/opengraph-image
 */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "PrayerTrain — Catholic prayers for hard moments";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    SITUATION_TOPICS.map((topic) => ({ locale, topic })),
  );
}

type Copy = { eyebrow: string; subtitle: string };

const COPY: Record<Locale, Copy> = {
  en: {
    eyebrow: "CATHOLIC PRAYERS",
    subtitle: "Standing with someone you love, in front of God.",
  },
  es: {
    eyebrow: "ORACIONES CATÓLICAS",
    subtitle: "Acompañando a alguien que amas, ante Dios.",
  },
  "pt-BR": {
    eyebrow: "ORAÇÕES CATÓLICAS",
    subtitle: "Acompanhando alguém que você ama, diante de Deus.",
  },
  fil: {
    eyebrow: "MGA KATOLIKONG PANALANGIN",
    subtitle: "Sumasama sa minamahal mo, sa harap ng Diyos.",
  },
  pl: {
    eyebrow: "MODLITWY KATOLICKIE",
    subtitle: "Stojąc obok kogoś, kogo kochasz, przed Bogiem.",
  },
};

export default async function SituationOgImage({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}) {
  const { locale: rawLocale, topic } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const t = COPY[locale];
  const content = getSituationContent(locale, topic);
  // Fall back gracefully when the topic param doesn't match any
  // registered topic — render the locale-level eyebrow/subtitle with
  // a generic heading so the route never 404s the image.
  const heading = content?.h1 ?? "PrayerTrain";

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
            fontSize: 64,
            color: "#f5e6c8",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: 32,
            maxWidth: 1020,
            display: "flex",
          }}
        >
          {heading}
        </div>

        <div
          style={{
            fontSize: 34,
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
            {`prayertrains.com/situations/${topic}`}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
