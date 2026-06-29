import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { differenceInCalendarDays } from "date-fns";
import { Download } from "lucide-react";
import { prisma } from "@/lib/db";
import { getDictionary } from "@/i18n/dictionaries";
import { t as interpolate } from "@/i18n/format";
import { formatDateLocale } from "@/lib/utils";
import { isGuestbookEntryIncludedInBouquet } from "@/lib/notes";
import { RecipientAvatar, CrossDivider } from "@/components/ui/catholic-icons";
import { CarryForwardCta } from "@/components/carry-forward-cta";

/**
 * HTML landing page for a completed train's spiritual bouquet.
 *
 * The closing/bouquet emails send every participant here (instead of
 * straight to the PDF, which is a dead end on mobile and carries no
 * call to action). This renders the bouquet warmly in-browser, offers a
 * prominent "Download (PDF)" button to the unchanged /api/bouquet route,
 * and hosts the carry-forward CTA — turning the completion peak into the
 * next organizer.
 *
 * Same access model as the PDF route: no auth, gated on COMPLETED.
 */
export const metadata: Metadata = {
  // Root layout appends "| PrayerTrain" via its title template.
  title: "Spiritual Bouquet",
  robots: { index: false, follow: false },
};

export default async function TrainBouquetPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const train = await prisma.prayerTrain.findUnique({
    where: { slug },
    select: {
      slug: true,
      recipientName: true,
      recipientImageUrl: true,
      organizerAnonymous: true,
      startDate: true,
      endDate: true,
      status: true,
      organizer: { select: { name: true } },
      slots: { select: { status: true, claimerEmail: true } },
      guestbook: {
        select: {
          authorName: true,
          message: true,
          createdAt: true,
          hiddenAt: true,
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });
  if (!train) notFound();
  // Only a COMPLETED train has a bouquet — mirror the PDF route's gate.
  if (train.status !== "COMPLETED") redirect(`/p/${slug}`);

  const dict = await getDictionary(locale);
  const t = dict.bouquetPage;

  const prayedSlots = train.slots.filter(
    (s) => s.status === "CLAIMED" || s.status === "COMPLETED",
  );
  const prayersOffered = prayedSlots.length;
  const people = new Set(
    prayedSlots
      .map((s) => s.claimerEmail?.toLowerCase())
      .filter((e): e is string => Boolean(e)),
  ).size;
  const days = differenceInCalendarDays(train.endDate, train.startDate) + 1;

  const organizerName = train.organizerAnonymous
    ? null
    : train.organizer?.name?.trim() || null;

  // Same comprehensive-record rule as the PDF: every wall post except
  // those the organizer soft-hid.
  const messages = train.guestbook.filter(isGuestbookEntryIncludedInBouquet);

  const dateRange = `${formatDateLocale(
    train.startDate,
    { month: "long", day: "numeric" },
    locale,
  )} – ${formatDateLocale(
    train.endDate,
    { month: "long", day: "numeric", year: "numeric" },
    locale,
  )}`;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <RecipientAvatar
            imageUrl={train.recipientImageUrl}
            name={train.recipientName}
            size="lg"
          />
        </div>
        <p className="text-xs uppercase tracking-widest text-gold-700 mb-2">
          {t.heading}
        </p>
        <h1 className="font-heading text-3xl font-bold text-navy-800 mb-2">
          {train.recipientName}
        </h1>
        <p className="text-muted-foreground">
          {interpolate(t.intro, { name: train.recipientName })}
        </p>
        <p className="text-sm text-muted-foreground mt-1">{dateRange}</p>
        {organizerName && (
          <p className="text-sm text-muted-foreground mt-1">
            {interpolate(t.gatheredBy, { name: organizerName })}
          </p>
        )}
      </div>

      {/* Stats */}
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

      {/* Download */}
      <div className="text-center mb-10">
        <a
          href={`/api/bouquet/${train.slug}`}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-navy-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          {t.download}
        </a>
      </div>

      {/* Encouragement wall posts */}
      {messages.length > 0 && (
        <div className="mb-10">
          <h2 className="font-heading text-xl font-semibold text-navy-800 mb-4 text-center">
            {t.encouragementHeading}
          </h2>
          <div className="space-y-3">
            {messages.map((m, i) => (
              <div key={i} className="prayer-card py-3 px-4">
                <p className="text-sm text-foreground leading-relaxed italic">
                  {m.message}
                </p>
                <p className="text-xs text-gold-700 mt-2">{m.authorName}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <CrossDivider />

      {/* Carry-this-forward CTA — the whole reason this page exists as a
          landing rather than a raw PDF: a warm next step at the peak. */}
      <CarryForwardCta from="bouquet" t={dict.carryForwardCta} className="mt-8" />
    </div>
  );
}
