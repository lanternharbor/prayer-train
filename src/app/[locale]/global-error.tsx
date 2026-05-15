"use client";

// global-error replaces the root layout when active, so it must include
// its own <html> and <body> tags. Per Next 16 docs, metadata exports are
// not supported here — use React's <title> instead.
//
// Locale-aware strings: because global-error replaces the root layout,
// it has no LocaleProvider parent — useLocale() can't be used. Instead
// we parse the locale prefix from window.location.pathname client-side.
// First-segment match against the supported set; falls back to English
// for unknown / missing locale paths.

import { useEffect, useState } from "react";

type SupportedLocale = "en" | "es" | "pt-BR" | "fil" | "pl";

const COPY: Record<SupportedLocale, {
  htmlLang: string;
  title: string;
  heading: string;
  body: string;
  retry: string;
  reference: string;
}> = {
  en: {
    htmlLang: "en",
    title: "Something went wrong | PrayerTrain",
    heading: "Something went very wrong",
    body: "We hit a critical error rendering the page. Please try again, and if the problem persists let us know.",
    retry: "Try again",
    reference: "Reference",
  },
  es: {
    htmlLang: "es",
    title: "Algo salió mal | PrayerTrain",
    heading: "Algo salió muy mal",
    body: "Encontramos un error crítico al cargar la página. Inténtalo de nuevo, y si el problema persiste, avísanos.",
    retry: "Intentar de nuevo",
    reference: "Referencia",
  },
  "pt-BR": {
    htmlLang: "pt-BR",
    title: "Algo deu errado | PrayerTrain",
    heading: "Algo deu muito errado",
    body: "Encontramos um erro crítico ao carregar a página. Tente novamente, e se o problema persistir avise-nos.",
    retry: "Tentar novamente",
    reference: "Referência",
  },
  fil: {
    htmlLang: "fil",
    title: "May nangyaring mali | PrayerTrain",
    heading: "May malubhang nangyaring mali",
    body: "May kritikal na error sa pag-load ng pahina. Pakisubukang muli, at kung magpapatuloy ang problema, ipaalam mo sa amin.",
    retry: "Subukang muli",
    reference: "Sanggunian",
  },
  pl: {
    htmlLang: "pl",
    title: "Coś poszło nie tak | PrayerTrain",
    heading: "Coś poszło bardzo źle",
    body: "Wystąpił krytyczny błąd podczas renderowania strony. Spróbuj ponownie, a jeśli problem będzie się powtarzał, daj nam znać.",
    retry: "Spróbuj ponownie",
    reference: "Numer referencyjny",
  },
};

const SUPPORTED: readonly SupportedLocale[] = ["en", "es", "pt-BR", "fil", "pl"];

function detectLocale(): SupportedLocale {
  if (typeof window === "undefined") return "en";
  const first = window.location.pathname.split("/").filter(Boolean)[0];
  if (!first) return "en";
  // Direct match (case-sensitive — pt-BR is BCP 47 canonical)
  if ((SUPPORTED as readonly string[]).includes(first)) {
    return first as SupportedLocale;
  }
  // Tolerant case-mismatch (e.g. "pt-br" from a manual URL)
  const lower = first.toLowerCase();
  const match = SUPPORTED.find((l) => l.toLowerCase() === lower);
  return match ?? "en";
}

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  // SSR pass renders English; client hydrate swaps to the matched locale.
  // global-error is client-only by nature ("use client" + interactivity),
  // so the hydration mismatch on the first paint is acceptable for this
  // recovery surface.
  const [locale, setLocale] = useState<SupportedLocale>("en");
  useEffect(() => {
    setLocale(detectLocale());
  }, []);
  const t = COPY[locale];

  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang={t.htmlLang}>
      <body
        style={{
          fontFamily:
            "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          background: "#faf8f5",
          color: "#11152c",
        }}
      >
        <title>{t.title}</title>
        <div style={{ maxWidth: 480, textAlign: "center" }}>
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: 700,
              marginBottom: "0.75rem",
            }}
          >
            {t.heading}
          </h1>
          <p style={{ color: "#6e6150", marginBottom: "1.5rem" }}>
            {t.body}
          </p>
          {error.digest && (
            <p
              style={{
                fontSize: "0.75rem",
                color: "#6e6150",
                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                marginBottom: "1.5rem",
              }}
            >
              {t.reference}: {error.digest}
            </p>
          )}
          <button
            onClick={() => unstable_retry()}
            style={{
              padding: "0.625rem 1.25rem",
              background: "#242e58",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            {t.retry}
          </button>
        </div>
      </body>
    </html>
  );
}
