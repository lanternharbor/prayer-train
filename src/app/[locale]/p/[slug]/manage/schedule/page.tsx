import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/locale-link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getLocale } from "@/i18n/get-locale";
import { pathForLocale } from "@/i18n/links";
import { getDictionary } from "@/i18n/dictionaries";
import { t as interpolate } from "@/i18n/format";
import { EditScheduleForm } from "./edit-schedule-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const train = await prisma.prayerTrain.findUnique({
    where: { slug },
    select: { recipientName: true },
  });
  return {
    title: train ? `Edit schedule: ${train.recipientName}` : "Edit schedule",
    robots: { index: false, follow: false },
  };
}

export default async function EditTrainSchedulePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect(pathForLocale(await getLocale(), "/signin"));

  const train = await prisma.prayerTrain.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      organizerId: true,
      recipientName: true,
      slotsPerDay: true,
      status: true,
      anchorPrayerTypeIds: true,
    },
  });
  if (!train) notFound();
  if (train.organizerId !== session.user.id) {
    redirect(`/p/${slug}`);
  }
  if (train.status !== "ACTIVE") {
    redirect(`/p/${slug}/manage`);
  }

  // Today, zeroed to local midnight, matches what
  // rebuildTrainSchedule uses to scope its slot deletion. Anything
  // dated before today stays untouched regardless of status.
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Three queries in parallel: prayer-type catalog + slot counts for
  // the rebuild banner + currently-in-use prayer-type IDs so the
  // picker can pre-fill what's already on the schedule.
  const [prayerTypes, openCount, claimedCount, currentInUse] =
    await Promise.all([
      prisma.prayerType.findMany({
        orderBy: [{ category: "asc" }, { name: "asc" }],
        select: {
          id: true,
          slug: true,
          name: true,
          category: true,
          description: true,
          duration: true,
          difficulty: true,
          daysRequired: true,
        },
      }),
      prisma.prayerSlot.count({
        where: { trainId: train.id, status: "OPEN", date: { gte: today } },
      }),
      prisma.prayerSlot.count({
        where: { trainId: train.id, status: "CLAIMED" },
      }),
      prisma.prayerSlot.findMany({
        where: { trainId: train.id },
        select: { prayerTypeId: true },
        distinct: ["prayerTypeId"],
      }),
    ]);

  const initialSelectedIds = currentInUse.map((s) => s.prayerTypeId);
  const dict = await getDictionary(locale);

  // Pick the right banner-string variant based on whether the open
  // and claimed counts are singular vs plural, so the rendered copy
  // reads grammatically in every locale without ICU plural plumbing.
  let bannerCopy: string;
  if (openCount === 0) {
    bannerCopy = dict.manageSchedule.bannerNothingToRebuild;
  } else if (openCount === 1 && claimedCount === 1) {
    bannerCopy = dict.manageSchedule.bannerOnePerOne;
  } else if (openCount === 1) {
    bannerCopy = interpolate(dict.manageSchedule.bannerOnePerMany, {
      claimed: claimedCount,
    });
  } else if (claimedCount === 1) {
    bannerCopy = interpolate(dict.manageSchedule.bannerManyPerOne, {
      open: openCount,
    });
  } else {
    bannerCopy = interpolate(dict.manageSchedule.bannerManyPerMany, {
      open: openCount,
      claimed: claimedCount,
    });
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href={`/p/${slug}/manage`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {dict.manageSchedule.backToManage}
      </Link>

      <div className="flex items-center gap-3 mb-6">
        <CalendarDays className="w-6 h-6 text-gold-500" />
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-800">
            {dict.manageSchedule.pageTitle}
          </h1>
          <p className="text-sm text-muted-foreground">
            {dict.manageSchedule.pageSubtitle}
          </p>
        </div>
      </div>

      <div className="prayer-card bg-cream-50 border-cream-300 mb-6">
        <p className="text-sm text-muted-foreground">{bannerCopy}</p>
      </div>

      <EditScheduleForm
        trainId={train.id}
        slug={train.slug}
        slotsPerDay={train.slotsPerDay}
        prayerTypes={prayerTypes}
        initialSelectedIds={initialSelectedIds}
        initialAnchorIds={train.anchorPrayerTypeIds}
        prayerCategoryLabels={dict.prayerCategoryLabels}
        pickerStrings={{
          anchorHelpText: dict.wizard.anchorHelpText,
          dailyBadge: dict.wizard.dailyBadge,
          maxAnchorsReached: dict.wizard.maxAnchorsReached,
          anchorRequiresMoreSlots: dict.wizard.anchorRequiresMoreSlots,
          setAsDailyAria: dict.wizard.setAsDailyAria,
          unsetAsDailyAria: dict.wizard.unsetAsDailyAria,
          minutesShort: dict.wizard.minutesShort,
          daysSuffix: dict.wizard.daysSuffix,
        }}
        submitStrings={{
          submitButton: dict.manageSchedule.submitButton,
          submitting: dict.manageSchedule.submitting,
          cancelLink: dict.manageSchedule.cancelLink,
        }}
      />
    </div>
  );
}
