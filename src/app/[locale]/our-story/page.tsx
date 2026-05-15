import type { Metadata } from "next";
import Image from "next/image";
import { LocaleLink as Link } from "@/components/locale-link";
import { ArrowRight } from "lucide-react";
import {
  CrossIcon,
  CrossDivider,
  SacredHeartIcon,
  CandleIcon,
} from "@/components/ui/catholic-icons";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedMetadata } from "@/i18n/metadata";
import { isLocale, defaultLocale } from "@/i18n/config";

// Static page; revalidate every 5 minutes so a copy edit ships
// without a deploy. Translates to Vercel CDN s-maxage=300.
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
    path: "/our-story",
    title: dict.meta.ourStoryTitle,
    description: dict.meta.ourStoryDescription,
  });
}

export default async function OurStoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary(locale);
  const t = dict.ourStory;
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      {/* Header */}
      <div className="text-center mb-12">
        <Image
          src="/logo.png"
          alt={t.logoAlt}
          width={200}
          height={200}
          className="w-32 h-auto mx-auto mb-8"
        />
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
          {t.heading}
        </h1>
        <p className="text-lg text-muted-foreground italic">
          {t.subheading}
        </p>
      </div>

      <CrossDivider />

      {/* The Story */}
      <article className="prose-custom space-y-6 text-foreground leading-relaxed">
        <p className="text-lg">{t.openingParagraph}</p>

        <div className="prayer-card border-l-4 border-l-gold-400">
          <div className="flex items-start gap-3">
            <CandleIcon className="w-5 h-5 text-gold-500 shrink-0 mt-1" />
            <div>
              <p className="font-heading font-semibold text-navy-800 mb-1">
                {t.crisis1Title}
              </p>
              <p className="text-muted-foreground text-sm">{t.crisis1Body}</p>
            </div>
          </div>
        </div>

        <div className="prayer-card border-l-4 border-l-gold-400">
          <div className="flex items-start gap-3">
            <SacredHeartIcon className="w-5 h-5 text-gold-500 shrink-0 mt-1" />
            <div>
              <p className="font-heading font-semibold text-navy-800 mb-1">
                {t.crisis2Title}
              </p>
              <p className="text-muted-foreground text-sm">{t.crisis2Body}</p>
            </div>
          </div>
        </div>

        <div className="prayer-card border-l-4 border-l-gold-400">
          <div className="flex items-start gap-3">
            <CrossIcon className="w-5 h-5 text-gold-500 shrink-0 mt-1" />
            <div>
              <p className="font-heading font-semibold text-navy-800 mb-1">
                {t.crisis3Title}
              </p>
              <p className="text-muted-foreground text-sm">{t.crisis3Body}</p>
            </div>
          </div>
        </div>

        <CrossDivider />

        <p className="text-lg">
          <strong>{t.graceLead}</strong>
          {t.graceBody}
        </p>

        <p>{t.lossParagraph}</p>

        <p>{t.villageParagraph}</p>

        <p>{t.coordinationParagraph}</p>

        <p className="text-lg font-heading font-semibold text-navy-800">
          {t.midTagline}
        </p>

        <p>{t.visionParagraph}</p>

        <div className="text-center py-8">
          <p className="font-heading text-xl text-navy-700 italic mb-2">
            &ldquo;{t.scriptureLine1}
            <br />
            {t.scriptureLine2}&rdquo;
          </p>
          <p className="text-sm text-muted-foreground">
            &mdash; {t.scriptureCitation}
          </p>
        </div>

        <CrossDivider />

        <div className="text-center">
          <p className="text-muted-foreground mb-6">{t.ctaLead}</p>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-navy-700 transition-colors text-lg"
          >
            {t.ctaButton}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </article>
    </div>
  );
}
