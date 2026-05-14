import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/locale-link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { createPrayerChain } from "@/lib/actions";
import { Users, Heart } from "lucide-react";
import { SaintPortrait } from "@/components/saint-portrait";
import { PhotoUploadField } from "@/components/photo-upload-field";
import { getDictionary } from "@/i18n/dictionaries";
import { t as interpolate } from "@/i18n/format";

export const metadata: Metadata = {
  title: "Pray Together",
  description:
    "Invite a small group of people to pray the same prayer together — every day, in solidarity, for someone you love.",
  alternates: { canonical: "/chain/new" },
  robots: { index: false, follow: false },
};

export default async function NewChainPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ prayerType?: string }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const t = dict.chainNew;
  // Require sign-in to create a chain. Mirrors /create gating.
  const session = await auth();
  if (!session?.user?.id) {
    // Rename to `sp` to avoid shadowing the route `params` we
    // destructured for the locale above.
    const sp = await searchParams;
    const cb = sp.prayerType
      ? `/${locale}/chain/new?prayerType=${encodeURIComponent(sp.prayerType)}`
      : `/${locale}/chain/new`;
    redirect(`/${locale}/signin?callbackUrl=${encodeURIComponent(cb)}`);
  }

  const { prayerType: prayerTypeSlug } = await searchParams;

  // Pre-fill the prayer if the user came from /prayers/[slug].
  const prayerType = prayerTypeSlug
    ? await prisma.prayerType.findUnique({
        where: { slug: prayerTypeSlug },
        select: {
          id: true,
          slug: true,
          name: true,
          description: true,
          daysRequired: true,
          patronSaint: true,
        },
      })
    : null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <Users className="w-10 h-10 text-gold-500 mx-auto mb-3" />
        <h1 className="font-heading text-3xl font-bold text-navy-800 mb-2">
          {prayerType
            ? interpolate(t.headingWithPrayer, { prayerName: prayerType.name })
            : t.headingNoPrayer}
        </h1>
        <p className="text-muted-foreground">
          {prayerType
            ? interpolate(t.subheadingWithPrayer, {
                days: prayerType.daysRequired,
                plural: prayerType.daysRequired === 1 ? "" : "s",
              })
            : t.subheadingNoPrayer}
        </p>
      </div>

      {prayerType && (
        <div className="prayer-card mb-6 flex items-start gap-4">
          <div className="shrink-0">
            <SaintPortrait patronSaint={prayerType.patronSaint} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-navy-700 mb-1">
              {prayerType.name}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {prayerType.description}
            </p>
          </div>
        </div>
      )}

      {!prayerType && (
        <div className="prayer-card mb-6 bg-cream-50 border-cream-300">
          <p className="text-sm text-muted-foreground">
            {t.chooseFirstTitle}{" "}
            <Link
              href="/prayers"
              className="text-gold-700 hover:underline underline-offset-2"
            >
              {t.chooseFirstBrowse}
            </Link>{" "}
            {t.chooseFirstSuffix} <strong>{t.chooseFirstCTAName}</strong>{" "}
            {t.chooseFirstSuffix2}
          </p>
        </div>
      )}

      {prayerType && (
        <form action={createPrayerChain} className="prayer-card space-y-5">
          <input type="hidden" name="prayerTypeId" value={prayerType.id} />

          {/* Organizer self-identification. Pre-filled with whatever name
              is on the User row (Google sign-in fills it; magic-link
              users start blank and fill it here). Server-side refinement
              in createChainSchema enforces "name OR anonymous"; the
              required attribute is omitted because the no-JS path needs
              to allow empty-name + anonymous checked. */}
          <div className="rounded-lg bg-cream-50 border border-cream-300 p-4 space-y-3">
            <div>
              <label
                htmlFor="organizerName"
                className="block text-sm font-medium text-navy-700 mb-1.5"
              >
                {t.yourNameLabel}
              </label>
              <input
                id="organizerName"
                name="organizerName"
                type="text"
                maxLength={80}
                defaultValue={session.user.name ?? ""}
                placeholder={t.yourNamePlaceholder}
                className="w-full px-4 py-2.5 border border-border rounded-lg bg-white focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                {t.yourNameHelp}
              </p>
            </div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                name="organizerAnonymous"
                type="checkbox"
                value="true"
                className="mt-0.5"
              />
              <span className="text-sm text-navy-700">
                {t.anonymousLabel}
              </span>
            </label>
          </div>

          <div>
            <label
              htmlFor="recipientName"
              className="block text-sm font-medium text-navy-700 mb-1.5"
            >
              {t.recipientLabel}{" "}
              <span className="text-xs text-muted-foreground font-normal">
                {dict.wizard.optional}
              </span>
            </label>
            <input
              id="recipientName"
              name="recipientName"
              type="text"
              maxLength={80}
              placeholder={t.recipientPlaceholder}
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              {t.recipientHelp}
            </p>
          </div>

          <div>
            <label
              htmlFor="intention"
              className="block text-sm font-medium text-navy-700 mb-1.5"
            >
              {t.intentionLabel}{" "}
              <span className="text-red-400">*</span>
            </label>
            <textarea
              id="intention"
              name="intention"
              required
              maxLength={2000}
              rows={3}
              placeholder={t.intentionPlaceholder}
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition resize-none"
            />
          </div>

          <PhotoUploadField name="recipientPhoto" />

          {/* Optional custom prayer — same shape as PrayerTrain's custom
              prayer field. For organizers who have a specific prayer they
              want everyone to pray alongside the prayer-type text from
              the library. */}
          <div>
            <label
              htmlFor="customPrayerText"
              className="block text-sm font-medium text-navy-700 mb-1.5"
            >
              {t.customPrayerLabel}{" "}
              <span className="text-xs text-muted-foreground font-normal">
                {dict.wizard.optional}
              </span>
            </label>
            <p className="text-xs text-muted-foreground mb-2">
              {interpolate(t.customPrayerHelp, { prayerName: prayerType.name })}
            </p>
            <textarea
              id="customPrayerText"
              name="customPrayerText"
              maxLength={4000}
              rows={4}
              placeholder={t.customPrayerPlaceholder}
              className="w-full px-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition resize-none"
            />
          </div>

          {/* Visibility opt-in. Default is PRIVATE (link-only) per the
              May 2026 audit. Going public is an explicit informed
              choice that lists this prayer on the public directory and
              exposes the intention to search-engine indexing. */}
          <label className="flex items-start gap-3 cursor-pointer p-3 rounded-lg bg-cream-50 border border-cream-300">
            <input
              name="isPublic"
              type="checkbox"
              value="true"
              className="mt-0.5"
            />
            <div>
              <p className="text-sm font-medium text-navy-700">
                {t.visibilityToggleTitle}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t.visibilityHelp}
              </p>
            </div>
          </label>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-navy-700 transition-colors"
          >
            <Heart className="w-4 h-4" />
            {t.submit}
          </button>
        </form>
      )}
    </div>
  );
}
