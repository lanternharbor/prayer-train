import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/locale-link";
import Image from "next/image";
import {
  CalendarDays,
  ArrowRight,
  Search,
} from "lucide-react";
import {
  CrossIcon,
  SacredHeartIcon,
  PrayingHandsIcon,
  CandleIcon,
  DoveIcon,
  RosaryIcon,
  CrossDivider,
} from "@/components/ui/catholic-icons";
import { PrayerCounter } from "@/components/prayer-counter";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedMetadata } from "@/i18n/metadata";
import { isLocale, defaultLocale } from "@/i18n/config";

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
    path: "/",
    title: dict.home.metadataTitle,
    description: dict.home.metadataDescription,
    // Absolute title bypasses the layout's "%s | PrayerTrain" template
    // so the homepage doesn't render as "PrayerTrain — Organized
    // Prayer for Those in Need | PrayerTrain".
    absoluteTitle: true,
  });
}

// ISR restored: now that the locale comes from `params.locale` (the
// URL segment, build-time known via generateStaticParams in the
// layout) and not from a per-request cookie, every locale's homepage
// is statically renderable again. The 5-minute revalidate window
// stays so future content updates ship without a manual purge.
export const revalidate = 300;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = dict.home;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-navy-600 via-navy-700 to-navy-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gold-400 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gold-300 rounded-full blur-[140px]" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-gold-200 mb-8">
                <CrossIcon className="w-4 h-4" />
                <span>{t.heroBadge}</span>
              </div>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {t.heroTitleLine1}
                <br />
                <span className="text-gold-300">{t.heroTitleLine2}</span>
              </h1>
              <p className="text-lg sm:text-xl text-navy-100 leading-relaxed mb-10 max-w-xl">
                {t.heroBody}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/create"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gold-400 text-navy-900 font-semibold rounded-lg hover:bg-gold-300 transition-colors text-lg"
                >
                  {t.heroPrimaryCTA}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/browse"
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-lg"
                >
                  <Search className="w-5 h-5" />
                  {t.heroSecondaryCTA}
                </Link>
              </div>
            </div>

            {/* Right: Logo illustration */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gold-400/20 rounded-full blur-[80px] scale-75" />
                <Image
                  src="/logo.png"
                  alt={t.heroLogoAlt}
                  width={480}
                  height={480}
                  className="relative w-64 sm:w-80 lg:w-[420px] h-auto drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Counter */}
      <PrayerCounter />

      {/* How It Works */}
      <section id="how-it-works" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              {t.howItWorksHeading}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t.howItWorksBody}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <StepCard
              step={1}
              icon={<SacredHeartIcon className="w-7 h-7" />}
              title={t.step1Title}
              description={t.step1Body}
            />
            <StepCard
              step={2}
              icon={<PrayingHandsIcon className="w-7 h-7" />}
              title={t.step2Title}
              description={t.step2Body}
            />
            <StepCard
              step={3}
              icon={<CandleIcon className="w-7 h-7" />}
              title={t.step3Title}
              description={t.step3Body}
            />
          </div>
          <div className="text-center mt-12">
            <Link
              href="/how-to-start-a-prayer-train"
              className="inline-flex items-center gap-2 text-navy-700 hover:text-navy-900 font-medium underline-offset-4 hover:underline transition-colors"
            >
              {t.howItWorksReadFullGuide}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <CrossDivider className="max-w-6xl mx-auto px-4" />

      {/* Features */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              {t.featuresHeading}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t.featuresBody}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<RosaryIcon className="w-5 h-5 text-gold-500" />}
              title={t.feature1Title}
              description={t.feature1Body}
            />
            <FeatureCard
              icon={<CalendarDays className="w-5 h-5 text-gold-500" />}
              title={t.feature2Title}
              description={t.feature2Body}
            />
            <FeatureCard
              icon={<DoveIcon className="w-5 h-5 text-gold-500" />}
              title={t.feature3Title}
              description={t.feature3Body}
            />
            <FeatureCard
              icon={<PrayingHandsIcon className="w-5 h-5 text-gold-500" />}
              title={t.feature4Title}
              description={t.feature4Body}
            />
            <FeatureCard
              icon={<CandleIcon className="w-5 h-5 text-gold-500" />}
              title={t.feature5Title}
              description={t.feature5Body}
            />
            <FeatureCard
              icon={<SacredHeartIcon className="w-5 h-5 text-gold-500" />}
              title={t.feature6Title}
              description={t.feature6Body}
            />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-20 bg-navy-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 items-start">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/logo.png"
                alt="PrayerTrain"
                width={180}
                height={180}
                className="w-36 h-auto opacity-90"
              />
            </div>
            <div>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-4 text-center md:text-left">
                {t.storyHeading}
              </h2>
              <p className="text-navy-100 leading-relaxed mb-4">
                {t.storyParagraph1}
              </p>
              <p className="text-navy-100 leading-relaxed mb-6">
                {t.storyParagraph2}
              </p>
              <Link
                href="/our-story"
                className="inline-flex items-center gap-2 text-gold-300 hover:text-gold-200 font-medium transition-colors"
              >
                {t.storyReadMore}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CrossDivider className="max-w-6xl mx-auto px-4" />

      {/* CTA with logo */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <Image
                src="/logo.png"
                alt="PrayerTrain"
                width={320}
                height={320}
                className="w-56 sm:w-72 h-auto opacity-90"
              />
            </div>
            <div className="text-center md:text-left">
              <CrossIcon className="w-7 h-7 text-gold-400 mb-4 mx-auto md:mx-0" />
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
                {t.finalCTAHeading}
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {t.finalCTABody}
              </p>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-navy-700 transition-colors text-lg"
              >
                {t.finalCTAButton}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StepCard({
  step,
  icon,
  title,
  description,
}: {
  step: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="relative w-16 h-16 rounded-2xl bg-navy-600 flex items-center justify-center mx-auto mb-5 text-gold-300">
        {icon}
        <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-gold-400 text-navy-900 text-xs font-bold flex items-center justify-center">
          {step}
        </span>
      </div>
      <h3 className="font-heading text-xl font-semibold text-navy-800 mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="prayer-card">
      <div className="w-10 h-10 rounded-lg bg-gold-50 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-heading text-lg font-semibold text-navy-800 mb-2">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

