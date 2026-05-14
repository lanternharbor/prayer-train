import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/locale-link";
import {
  Heart,
  Users,
  CalendarDays,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
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
    path: "/create",
    title: dict.meta.createTitle,
    description: dict.meta.createDescription,
  });
}

export const revalidate = 300;

export default async function CreateChooserPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = dict.create;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
          {t.chooseHeading}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {t.chooseBody}
        </p>
      </div>

      {/* Two cards — both formats are PrayerTrain. The first card describes
          the calendar/coverage pattern; the second describes the synchronized
          "everyone prays the same prayer together" pattern. */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Calendar format — current Train primitive */}
        <div className="prayer-card flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-navy-100 flex items-center justify-center">
              <CalendarDays className="w-6 h-6 text-navy-700" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-navy-800">
              {t.calendarTitle}
            </h2>
          </div>

          <p className="text-sm font-medium text-gold-700 mb-3">
            {t.calendarBadge}
          </p>

          <p className="text-foreground leading-relaxed mb-5">
            {t.calendarBody}
          </p>

          <div className="space-y-2 mb-6">
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">
                {t.calendarBullet1}
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">
                {t.calendarBullet2}
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">
                {t.calendarBullet3}
              </span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground italic mb-6">
            {t.calendarExample}
          </p>

          <Link
            href="/create/train"
            className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-navy-700 transition-colors"
          >
            <Heart className="w-4 h-4" />
            {t.calendarCTA}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Pray-together format — current Chain primitive */}
        <div className="prayer-card flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gold-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-gold-700" />
            </div>
            <h2 className="font-heading text-2xl font-bold text-navy-800">
              {t.novenaTitle}
            </h2>
          </div>

          <p className="text-sm font-medium text-gold-700 mb-3">
            {t.novenaBadge}
          </p>

          <p className="text-foreground leading-relaxed mb-5">
            {t.novenaBody}
          </p>

          <div className="space-y-2 mb-6">
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">
                {t.novenaBullet1}
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">
                {t.novenaBullet2}
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
              <span className="text-muted-foreground">
                {t.novenaBullet3}
              </span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground italic mb-6">
            {t.novenaExample}
          </p>

          <Link
            href="/prayers/novenas"
            className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 bg-gold-400 text-navy-900 font-semibold rounded-lg hover:bg-gold-300 transition-colors"
          >
            <Users className="w-4 h-4" />
            {t.novenaCTA}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Subtle help text */}
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-sm text-muted-foreground">
          {t.notSure}{" "}
          <Link
            href="/our-story"
            className="text-gold-700 hover:text-gold-800 underline-offset-2 hover:underline"
          >
            {t.notSureRead}
          </Link>
          ,{" "}
          <Link
            href="/browse"
            className="text-gold-700 hover:text-gold-800 underline-offset-2 hover:underline"
          >
            {t.notSureBrowse}
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
