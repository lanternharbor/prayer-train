import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { CreateWizard } from "./create-wizard";
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
    path: "/create/train",
    title: dict.meta.createTrainTitle,
    description: dict.meta.createTrainDescription,
  });
}

export default async function CreatePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ prayerType?: string }>;
}) {
  const { locale } = await params;
  const { prayerType: prefilledSlug } = await searchParams;
  // Redirect to signin if not authenticated. The edge proxy also gates
  // this route, but it only checks cookie existence — a stale cookie
  // (e.g. session deleted from DB) passes the proxy but fails here.
  const session = await auth();
  if (!session?.user?.id) {
    // Preserve the ?prayerType=... param across the sign-in round-trip
    // so the wizard pre-fill survives auth.
    const callbackUrl = prefilledSlug
      ? `/${locale}/create/train?prayerType=${encodeURIComponent(prefilledSlug)}`
      : `/${locale}/create/train`;
    redirect(`/${locale}/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  }
  const dict = await getDictionary(locale);
  const t = dict.wizard;

  const prayerTypes = await prisma.prayerType.findMany({
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
      patronSaint: true,
      situationTags: true,
    },
  });

  // Resolve ?prayerType=<slug> to a PrayerType.id so the wizard's
  // initial selectedPrayerIds is populated. Unknown slug = silently
  // ignored (the wizard renders the full list with nothing selected).
  const initialSelectedPrayerIds = prefilledSlug
    ? prayerTypes
        .filter((p) => p.slug === prefilledSlug)
        .map((p) => p.id)
    : [];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-3 gold-accent">
          {t.pageTitle}
        </h1>
        <p className="text-muted-foreground text-lg">
          {t.pageSubtitle}
        </p>
      </div>

      <CreateWizard
        prayerTypes={prayerTypes}
        currentUserName={session.user.name ?? ""}
        t={t}
        situationLabels={dict.situationLabels}
        prayerCategoryLabels={dict.prayerCategoryLabels}
        initialSelectedPrayerIds={initialSelectedPrayerIds}
      />
    </div>
  );
}
