"use client";

import { useEffect } from "react";
import { LocaleLink as Link } from "@/components/locale-link";
import { CrossIcon } from "@/components/ui/catholic-icons";
import { RefreshCw, Home } from "lucide-react";
import { useLocale } from "@/i18n/locale-context";
import type { Locale } from "@/i18n/config";

const COPY: Record<Locale, {
  heading: string;
  body: string;
  retry: string;
  home: string;
  reference: string;
}> = {
  en: {
    heading: "Something went wrong",
    body: "We hit an unexpected error rendering this page. The team has been notified and your work is safe.",
    retry: "Try again",
    home: "Back to home",
    reference: "Reference",
  },
  es: {
    heading: "Algo salió mal",
    body: "Encontramos un error inesperado al cargar esta página. El equipo ha sido notificado y tu trabajo está a salvo.",
    retry: "Intentar de nuevo",
    home: "Volver al inicio",
    reference: "Referencia",
  },
  "pt-BR": {
    heading: "Algo deu errado",
    body: "Encontramos um erro inesperado ao carregar esta página. A equipe foi notificada e seu trabalho está seguro.",
    retry: "Tentar novamente",
    home: "Voltar ao início",
    reference: "Referência",
  },
  fil: {
    heading: "May nangyaring mali",
    body: "May hindi inaasahang error sa pag-load ng pahinang ito. Naabisuhan na ang team at ligtas ang iyong gawain.",
    retry: "Subukang muli",
    home: "Bumalik sa home",
    reference: "Sanggunian",
  },
  pl: {
    heading: "Coś poszło nie tak",
    body: "Wystąpił nieoczekiwany błąd podczas renderowania tej strony. Zespół został powiadomiony, a twoja praca jest bezpieczna.",
    retry: "Spróbuj ponownie",
    home: "Wróć do strony głównej",
    reference: "Numer referencyjny",
  },
};

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  const locale = useLocale();
  const t = COPY[locale] ?? COPY.en;

  useEffect(() => {
    // TODO: wire to Sentry / error reporting once configured
    console.error("Route segment error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-navy-100 flex items-center justify-center mx-auto mb-6">
          <CrossIcon className="w-8 h-8 text-gold-500" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-navy-800 mb-3">
          {t.heading}
        </h1>
        <p className="text-muted-foreground mb-2">
          {t.body}
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground mb-6 font-mono">
            {t.reference}: {error.digest}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => unstable_retry()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-navy-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            {t.retry}
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-border rounded-lg text-foreground font-medium hover:bg-muted transition-colors"
          >
            <Home className="w-4 h-4" />
            {t.home}
          </Link>
        </div>
      </div>
    </div>
  );
}
