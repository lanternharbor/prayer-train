import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Download } from "lucide-react";
import { prisma } from "@/lib/db";
import { getDictionary } from "@/i18n/dictionaries";
import { t as interpolate } from "@/i18n/format";
import { formatDateLocale } from "@/lib/utils";
import { RecipientAvatar, CrossDivider } from "@/components/ui/catholic-icons";
import { CarryForwardCta } from "@/components/carry-forward-cta";

/**
 * HTML landing page for a completed chain's spiritual bouquet. Sibling
 * of /p/[slug]/bouquet — see that file for the rationale. Chains have no
 * encouragement wall, so this omits the messages section; stats come
 * from the member roster instead of slots.
 */
export const metadata: Metadata = {
  // Root layout appends "| PrayerTrain" via its title template.
  title: "Spiritual Bouquet",
  robots: { index: false, follow: false },
};

export default async function ChainBouquetPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const chain = await prisma.prayerChain.findUnique({
    where: { slug },
    select: {
      slug: true,
      recipientName: true,
      recipientImageUrl: true,
      organizerAnonymous: true,
      startDate: true,
      endDate: true,
      durationDays: true,
      status: true,
      organizer: { select: { name: true } },
      prayerType: { select: { name: true, slug: true } },
      members: { select: { name: true, lastDayCompleted: true } },
    },
  });
  if (!chain) notFound();
  if (chain.status !== "COMPLETED") redirect(`/chain/${slug}`);

  const dict = await getDictionary(locale);
  const t = dict.bouquetPage;

  // Each member who marked at least one day prayed at least once; a
  // member who joined but never tapped is counted as 1 (joining is a
  // commitment to pray). Mirrors the chain bouquet PDF's tally.
  const prayersOffered = chain.members.reduce(
    (sum, m) => sum + Math.max(1, m.lastDayCompleted ?? 1),
    0,
  );
  const people = chain.members.length;
  const days = chain.durationDays;

  const organizerName = chain.organizerAnonymous
    ? null
    : chain.organizer?.name?.trim() || null;
  const displayName = chain.recipientName?.trim() || chain.prayerType.name;

  const dateRange = `${formatDateLocale(
    chain.startDate,
    { month: "long", day: "numeric" },
    locale,
  )} – ${formatDateLocale(
    chain.endDate,
    { month: "long", day: "numeric", year: "numeric" },
    locale,
  )}`;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <RecipientAvatar
            imageUrl={chain.recipientImageUrl}
            name={displayName}
            size="lg"
          />
        </div>
        <p className="text-xs uppercase tracking-widest text-gold-700 mb-2">
          {t.heading}
        </p>
        <h1 className="font-heading text-3xl font-bold text-navy-800 mb-2">
          {displayName}
        </h1>
        <p className="text-muted-foreground">
          {interpolate(t.intro, { name: displayName })}
        </p>
        <p className="text-sm text-muted-foreground mt-1">{dateRange}</p>
        {organizerName && (
          <p className="text-sm text-muted-foreground mt-1">
            {interpolate(t.gatheredBy, { name: organizerName })}
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { value: prayersOffered, label: t.statPrayers },
          { value: people, label: t.statPeople },
          { value: days, label: t.statDays },
        ].map((stat) => (
          <div
            key={stat.label}
            className="prayer-card text-center py-5 bg-cream-50 border-cream-300"
          >
            <div className="font-heading text-3xl font-bold text-navy-800 tabular-nums">
              {stat.value}
            </div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mb-10">
        <a
          href={`/api/bouquet/chain/${chain.slug}`}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-navy-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          {t.download}
        </a>
      </div>

      <CrossDivider />

      <CarryForwardCta
        from="bouquet"
        prayerSlug={chain.prayerType.slug}
        t={dict.carryForwardCta}
        className="mt-8"
      />
    </div>
  );
}
