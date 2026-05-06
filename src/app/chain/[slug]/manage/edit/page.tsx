import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { EditChainForm } from "./edit-chain-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chain = await prisma.prayerChain.findUnique({
    where: { slug },
    select: { recipientName: true },
  });
  return {
    title: chain?.recipientName ? `Edit: ${chain.recipientName}` : "Edit",
    robots: { index: false, follow: false },
  };
}

export default async function EditChainPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/signin");

  const chain = await prisma.prayerChain.findUnique({
    where: { slug },
    include: { organizer: { select: { name: true } } },
  });
  if (!chain) notFound();
  if (chain.organizerId !== session.user.id) {
    redirect(`/chain/${slug}`);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href={`/chain/${slug}/manage`}
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
            Fix typos, update copy, replace the photo. The schedule and the
            prayer itself aren&apos;t editable here.
          </p>
        </div>
      </div>

      <EditChainForm
        chainId={chain.id}
        slug={chain.slug}
        initial={{
          recipientName: chain.recipientName,
          intention: chain.intention,
          customPrayerText: chain.customPrayerText,
          recipientImageUrl: chain.recipientImageUrl,
          organizerName: chain.organizer.name,
          organizerAnonymous: chain.organizerAnonymous,
        }}
      />
    </div>
  );
}
