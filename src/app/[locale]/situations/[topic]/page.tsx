import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/locale-link";
import { notFound } from "next/navigation";
import { getLocalizedPrayersMany } from "@/lib/prayer-localization";
import { getBaseUrl } from "@/lib/url";
import { breadcrumbSchema } from "@/lib/schema";
import { smartTruncate } from "@/lib/utils";
import { Heart, Users, BookOpen, ArrowRight } from "lucide-react";
import { SITUATION_TOPICS } from "./content";
import type { SituationContent } from "./content";
import { getSituationContent } from "./content.translations";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedMetadata } from "@/i18n/metadata";
import { localizedHref } from "@/i18n/links";
import { isLocale, defaultLocale, locales } from "@/i18n/config";

/**
 * /situations/[topic]
 *
 * The use-case cluster from the SEO investment plan. Each topic
 * (cancer, sick-child, surgery, grief, addiction, infertility) is a
 * 600–1000 word landing page mapped to a high-intent Catholic search
 * cluster ("Catholic prayers for a friend with cancer," etc.).
 *
 * Page content lives in ./content.ts; this file is the renderer +
 * route plumbing. Edit copy there, not here.
 *
 * Static prerender via generateStaticParams below. The pages are
 * ISR-enabled (revalidate = 300) so a copy edit ships within five
 * minutes of merge without a manual purge.
 */

export const revalidate = 300;

export async function generateStaticParams() {
  // Cross-product of every supported locale × every topic. With 2
  // locales × 6 topics = 12 prerendered pages today; scales linearly
  // as more locales come online. Topic content stays English (no
  // per-locale variant of content.ts yet — Phase ζ work).
  return locales.flatMap((locale) =>
    SITUATION_TOPICS.map((topic) => ({ locale, topic })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, topic } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const content = getSituationContent(locale, topic);
  if (!content) return { title: "Not Found" };
  // Per-topic OG share card. Topic heading is rendered in
  // src/app/[locale]/situations/[topic]/opengraph-image.tsx so each
  // shared link surfaces its own h1 (Catholic prayers for surgery /
  // for grief / etc.) rather than the generic locale brand card.
  const baseUrl = getBaseUrl();
  return localizedMetadata({
    locale,
    path: `/situations/${content.topic}`,
    title: content.title,
    description: smartTruncate(content.description, 160),
    ogType: "article",
    ogImage: `${baseUrl}/${locale}/situations/${content.topic}/opengraph-image`,
    ogImageWidth: 1200,
    ogImageHeight: 630,
  });
}

/**
 * FAQPage schema for the situation page. Same shape as the prayer-
 * detail FAQ helper but built per-page from the registry. Skips
 * rendering when there are no FAQ entries for the topic.
 */
function situationFaqSchema(content: SituationContent) {
  if (content.faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

export default async function SituationPage({
  params,
}: {
  params: Promise<{ locale: string; topic: string }>;
}) {
  const { locale: rawLocale, topic } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const content = getSituationContent(locale, topic);
  if (!content) notFound();

  const dict = await getDictionary(locale);
  const t = dict.situationTopic;

  // Pull live data for the recommended prayers so a renamed prayer in
  // the library doesn't strand its recommendation here. Only fetch
  // the slugs the page actually references; preserve order.
  //
  // Localized fetch: prayer names + patron saints render in the
  // active locale when a reviewed translation exists; English
  // fallback otherwise. Topic-page content.ts copy remains English
  // for now — translating the pastoral lead paragraph is Phase ζ
  // editorial work, not Phase ε.
  const slugs = content.prayers.map((p) => p.slug);
  const livePrayers = await getLocalizedPrayersMany(
    { where: { slug: { in: slugs } } },
    locale,
  );
  const liveBySlug = new Map(livePrayers.map((p) => [p.slug, p]));

  const baseUrl = getBaseUrl();
  const breadcrumbs = breadcrumbSchema(
    [
      { name: "Home", url: `${baseUrl}${localizedHref(locale, "/")}` },
      {
        name: "Situations",
        url: `${baseUrl}${localizedHref(locale, "/situations")}`,
      },
      {
        name: content.title,
        url: `${baseUrl}${localizedHref(locale, `/situations/${content.topic}`)}`,
      },
    ],
    locale,
  );
  const faq = situationFaqSchema(content);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      {faq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
        />
      )}

      {/* Header */}
      <header className="mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 leading-tight mb-5 gold-accent">
          {content.h1}
        </h1>
        <p className="text-lg text-foreground leading-relaxed">
          {content.lead}
        </p>
      </header>

      {/* Recommended prayers */}
      <section className="mb-12">
        <h2 className="font-heading text-2xl font-semibold text-navy-800 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-gold-500" />
          What people pray when they don&apos;t know what to pray
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          From the PrayerTrain Catholic prayer library. Tap any prayer
          to see its full text and instructions.
        </p>
        <div className="space-y-4">
          {content.prayers.map((rec) => {
            const live = liveBySlug.get(rec.slug);
            const displayName = live?.name ?? rec.slug;
            return (
              <Link
                key={rec.slug}
                href={`/prayers/${rec.slug}`}
                className="prayer-card group block"
              >
                <h3 className="font-heading text-lg font-semibold text-navy-800 group-hover:text-navy-600 transition-colors mb-2">
                  {displayName}
                </h3>
                {live?.patronSaint && (
                  <p className="text-xs text-muted-foreground mb-2">
                    {live.patronSaint}
                    {live.daysRequired > 1
                      ? ` · ${live.daysRequired} days`
                      : ""}
                  </p>
                )}
                <p className="text-sm text-foreground leading-relaxed">
                  {rec.why}
                </p>
                <div className="flex items-center gap-1.5 mt-3 text-sm font-medium text-gold-700 group-hover:text-gold-800">
                  Read the full prayer
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Pastoral note */}
      <section className="mb-12">
        <div className="prayer-card bg-cream-50 border-cream-300">
          <h2 className="font-heading text-xl font-semibold text-navy-800 mb-3">
            What prayer is for
          </h2>
          <p className="text-foreground leading-relaxed mb-4">
            {content.pastoralNote}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            More on this on{" "}
            <Link
              href="/our-story"
              className="text-gold-700 hover:underline underline-offset-2"
            >
              our story
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Pray together CTA */}
      <section className="mb-12">
        <div className="prayer-card bg-navy-50 border-navy-200 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="flex-1">
            <h2 className="font-heading text-xl font-semibold text-navy-800 mb-2 flex items-center gap-2">
              <Users className="w-5 h-5 text-gold-500" />
              {t.prayTogetherHeading}
            </h2>
            <p className="text-sm text-foreground leading-relaxed">
              {content.prayTogetherLead}
            </p>
            <div className="mt-3">
              <Link
                href="/how-to-start-a-prayer-train"
                className="inline-flex items-center gap-1 text-sm text-navy-700 hover:text-navy-900 underline-offset-4 hover:underline transition-colors"
              >
                {t.readFullGuide}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          <Link
            href="/create/train"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-navy-700 transition-colors shrink-0"
          >
            <Heart className="w-4 h-4" />
            {t.startPrayerTrainCTA}
          </Link>
        </div>
      </section>

      {/* FAQ */}
      {content.faqs.length > 0 && (
        <section className="mb-12">
          <h2 className="font-heading text-2xl font-semibold text-navy-800 mb-6">
            {t.faqsHeading}
          </h2>
          <div className="space-y-6">
            {content.faqs.map((entry) => (
              <div key={entry.question}>
                <h3 className="font-heading text-lg font-semibold text-navy-700 mb-2">
                  {entry.question}
                </h3>
                <p className="text-foreground leading-relaxed">
                  {entry.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Cross-link to other situations — small, end-of-page */}
      <section className="border-t border-border pt-8">
        <h2 className="font-heading text-base font-semibold text-navy-700 mb-4">
          Praying through another situation?
        </h2>
        <div className="flex flex-wrap gap-2">
          {SITUATION_TOPICS.filter((t) => t !== content.topic).map((t) => {
            const other = getSituationContent(locale, t);
            if (!other) return null;
            return (
              <Link
                key={t}
                href={`/situations/${t}`}
                className="px-3 py-1.5 rounded-full bg-cream-100 text-navy-700 text-sm border border-cream-300 hover:bg-cream-200 transition-colors"
              >
                {other.h1.replace(/^Catholic prayers /, "").replace(/^/, "")}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
