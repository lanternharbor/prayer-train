import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/locale-link";
import { ArrowRight, Heart } from "lucide-react";
import { SITUATIONS, SITUATION_TOPICS } from "./[topic]/content";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedMetadata } from "@/i18n/metadata";
import { isLocale, defaultLocale } from "@/i18n/config";

/**
 * /situations — index page that lists every situation page.
 *
 * Light page. Single H1, short lead, six cards linking to the leaf
 * pages. Exists primarily to give /situations/[topic] breadcrumbs a
 * real parent URL and to surface the cluster from the homepage / nav
 * if William wires that link in later.
 *
 * Phase 1a note: the chrome (heading, lead, CTA) localizes via the
 * dictionary. The per-topic cards (title + lede + prayer
 * recommendations) stay English for now — translating them properly
 * needs a localized version of `./[topic]/content.ts` keyed by
 * locale. Tracked in docs/internationalization-roadmap.md Phase 6
 * (SEO and growth) since these are the highest-value SEO surfaces.
 */

// Phase α: locale flows from `params.locale` (URL segment) so each
// locale's variant prerenders statically via the layout's
// generateStaticParams. ISR window preserved.
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);
  return localizedMetadata({
    locale,
    path: "/situations",
    title: dict.situations.indexTitle,
    description: dict.situations.indexDescription,
  });
}

export default async function SituationsIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = dict.situations;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 leading-tight mb-5 gold-accent">
          {t.indexTitle}
        </h1>
        <p className="text-lg text-foreground leading-relaxed">
          {t.indexLead}
        </p>
      </header>

      <div className="space-y-4 mb-12">
        {SITUATION_TOPICS.map((topic) => {
          const content = SITUATIONS[topic];
          return (
            <Link
              key={topic}
              href={`/situations/${topic}`}
              className="prayer-card group block"
            >
              <h2 className="font-heading text-xl font-semibold text-navy-800 group-hover:text-navy-600 transition-colors mb-2">
                {content.h1}
              </h2>
              <p className="text-sm text-foreground leading-relaxed line-clamp-3">
                {content.lead}
              </p>
              <div className="flex items-center gap-1.5 mt-3 text-sm font-medium text-gold-700 group-hover:text-gold-800">
                {t.readMore}
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Light CTA back to /create */}
      <div className="prayer-card bg-cream-50 border-cream-300 flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="flex-1">
          <h2 className="font-heading text-lg font-semibold text-navy-800 mb-1">
            {t.ctaHeading}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t.ctaBody}
          </p>
        </div>
        <Link
          href="/create"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-navy-700 transition-colors shrink-0"
        >
          <Heart className="w-4 h-4" />
          {dict.nav.createTrain}
        </Link>
      </div>
    </div>
  );
}
