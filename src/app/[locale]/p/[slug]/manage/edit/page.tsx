import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/locale-link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getLocale } from "@/i18n/get-locale";
import { pathForLocale } from "@/i18n/links";
import { EditTrainForm } from "./edit-train-form";

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
    title: train ? `Edit: ${train.recipientName}` : "Edit",
    robots: { index: false, follow: false },
  };
}

export default async function EditTrainPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect(pathForLocale(await getLocale(), "/signin"));

  const train = await prisma.prayerTrain.findUnique({
    where: { slug },
    include: { organizer: { select: { name: true } } },
  });
  if (!train) notFound();
  if (train.organizerId !== session.user.id) {
    redirect(`/p/${slug}`);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href={`/p/${slug}/manage`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to manage
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <Pencil className="w-6 h-6 text-gold-500" />
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy-800">
            Edit details
          </h1>
          <p className="text-sm text-muted-foreground">
            Fix typos, update copy, replace the photo. Schedule and prayer
            assignments aren&apos;t editable here.
          </p>
        </div>
      </div>

      <EditTrainForm
        trainId={train.id}
        slug={train.slug}
        initial={{
          recipientName: train.recipientName,
          recipientRelation: train.recipientRelation,
          parish: train.parish,
          parishId: train.parishId,
          location: train.location,
          intention: train.intention,
          situation: train.situation,
          situationDetail: train.situationDetail,
          customPrayerText: train.customPrayerText,
          recipientImageUrl: train.recipientImageUrl,
          organizerName: train.organizer.name,
          organizerAnonymous: train.organizerAnonymous,
        }}
      />
    </div>
  );
}
