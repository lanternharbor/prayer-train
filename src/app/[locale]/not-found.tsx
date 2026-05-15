"use client";

import { LocaleLink as Link } from "@/components/locale-link";
import { CrossIcon } from "@/components/ui/catholic-icons";
import { Home, Search } from "lucide-react";
import { useLocale } from "@/i18n/locale-context";
import type { Locale } from "@/i18n/config";

const COPY: Record<Locale, {
  heading: string;
  body: string;
  home: string;
  browse: string;
}> = {
  en: {
    heading: "Page not found",
    body: "We couldn't find the page you were looking for. It may have been removed, or the link may be incorrect.",
    home: "Back to home",
    browse: "Find a PrayerTrain",
  },
  es: {
    heading: "Página no encontrada",
    body: "No pudimos encontrar la página que buscabas. Es posible que haya sido eliminada, o que el enlace sea incorrecto.",
    home: "Volver al inicio",
    browse: "Buscar un PrayerTrain",
  },
  "pt-BR": {
    heading: "Página não encontrada",
    body: "Não conseguimos encontrar a página que você procurava. Ela pode ter sido removida, ou o link pode estar incorreto.",
    home: "Voltar ao início",
    browse: "Buscar um PrayerTrain",
  },
  fil: {
    heading: "Hindi nakita ang pahina",
    body: "Hindi namin nahanap ang pahinang iyong hinahanap. Maaaring naalis na ito, o maaaring mali ang link.",
    home: "Bumalik sa home",
    browse: "Maghanap ng PrayerTrain",
  },
  pl: {
    heading: "Nie znaleziono strony",
    body: "Nie udało nam się znaleźć strony, której szukałeś. Mogła zostać usunięta lub link może być nieprawidłowy.",
    home: "Wróć do strony głównej",
    browse: "Znajdź PrayerTrain",
  },
};

export default function NotFound() {
  const locale = useLocale();
  const t = COPY[locale] ?? COPY.en;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-2xl bg-navy-100 flex items-center justify-center mx-auto mb-6">
          <CrossIcon className="w-8 h-8 text-gold-500" />
        </div>
        <h1 className="font-heading text-3xl font-bold text-navy-800 mb-3">
          {t.heading}
        </h1>
        <p className="text-muted-foreground mb-8">{t.body}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-navy-700 transition-colors"
          >
            <Home className="w-4 h-4" />
            {t.home}
          </Link>
          <Link
            href="/browse"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-border rounded-lg text-foreground font-medium hover:bg-muted transition-colors"
          >
            <Search className="w-4 h-4" />
            {t.browse}
          </Link>
        </div>
      </div>
    </div>
  );
}
