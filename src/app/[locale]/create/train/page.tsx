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
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Redirect to signin if not authenticated. The edge proxy also gates
  // this route, but it only checks cookie existence — a stale cookie
  // (e.g. session deleted from DB) passes the proxy but fails here.
  const session = await auth();
  if (!session?.user?.id) {
    redirect(`/${locale}/signin?callbackUrl=/${locale}/create/train`);
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
      />
    </div>
  );
}
