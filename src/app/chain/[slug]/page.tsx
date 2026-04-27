import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getBaseUrl } from "@/lib/url";
import { SaintPortrait } from "@/components/saint-portrait";
import { RecipientAvatar } from "@/components/ui/catholic-icons";
import { JoinChainButton } from "./join-button";
import { ChainShareButton } from "./share-button";
import { ArrowLeft, CalendarDays, Settings, Users } from "lucide-react";

function firstName(fullName: string | null | undefined): string {
  if (!fullName) return "the organizer";
  return fullName.trim().split(/\s+/)[0] || fullName;
}

function recipientPhrase(
  recipientName: string | null,
  intention: string,
): string {
  if (recipientName?.trim()) return `for ${recipientName.trim()}`;
  const words = intention.trim().split(/\s+/).slice(0, 8).join(" ");
  return `for ${words}${intention.trim().split(/\s+/).length > 8 ? "…" : ""}`;
}

function dayNumberFor(startDate: Date): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);
  const ms = now.getTime() - start.getTime();
  return Math.max(1, Math.floor(ms / (1000 * 60 * 60 * 24)) + 1);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const chain = await prisma.prayerChain.findUnique({
    where: { slug },
    include: {
      organizer: { select: { name: true } },
      prayerType: { select: { name: true, imageUrl: true } },
    },
  });
  if (!chain) return { title: "PrayerChain Not Found" };

  const orgFirst = firstName(chain.organizer?.name);
  const phrase = recipientPhrase(chain.recipientName, chain.intention);
  const day = dayNumberFor(chain.startDate);
  const url = `${getBaseUrl()}/chain/${chain.slug}`;
  // Prefer the recipient's uploaded photo for the share preview — it
  // makes iMessage / link-unfurl cards feel personal. Falls back to the
  // prayer's own image, then the brand logo.
  const image =
    chain.recipientImageUrl ||
    chain.prayerType.imageUrl ||
    `${getBaseUrl()}/logo.png`;

  const title = `${orgFirst}'s ${chain.prayerType.name} ${phrase}`;
  const description = `Day ${day} of ${chain.durationDays}. Pray along.`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: chain.isPublic ? undefined : { index: false, follow: false },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      siteName: "PrayerTrain",
      images: [{ url: image, width: 1024, height: 1024, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ChainDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();

  const chain = await prisma.prayerChain.findUnique({
    where: { slug },
    include: {
      organizer: { select: { name: true } },
      prayerType: {
        select: {
          name: true,
          slug: true,
          patronSaint: true,
          prayerText: true,
          instructions: true,
          duration: true,
        },
      },
      members: {
        where: { unsubscribedAt: null },
        orderBy: { joinedAt: "asc" },
        select: { id: true, name: true, email: true, joinedAt: true },
      },
    },
  });

  if (!chain) notFound();

  const orgFirst = firstName(chain.organizer?.name);
  const phrase = recipientPhrase(chain.recipientName, chain.intention);
  const day = dayNumberFor(chain.startDate);
  const isOrganizer = session?.user?.id === chain.organizerId;
  const isMember = !!chain.members.find(
    (m) => session?.user && m.email === session.user.email,
  );
  const progressPct = Math.min(
    100,
    Math.round((day / chain.durationDays) * 100),
  );

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Top nav */}
      <div className="flex items-center justify-between mb-8">
        <Link
          href={`/prayers/${chain.prayerType.slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          About this prayer
        </Link>
        {isOrganizer && (
          <Link
            href={`/chain/${chain.slug}/manage`}
            className="inline-flex items-center gap-1.5 text-sm text-gold-700 hover:text-gold-800 transition-colors"
          >
            <Settings className="w-4 h-4" />
            Manage
          </Link>
        )}
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6">
          <div className="flex-1 min-w-0">
            <p className="text-xs uppercase tracking-widest text-gold-700 mb-2">
              Day {day} of {chain.durationDays}
              {chain.status === "COMPLETED" ? " · Complete" : ""}
            </p>
            <div className="flex items-start gap-4 mb-3">
              {/* Recipient photo (if uploaded). Sits next to the title to
                  emotionally tie the prayer to a specific person. */}
              {chain.recipientName && (
                <div className="shrink-0">
                  <RecipientAvatar
                    imageUrl={chain.recipientImageUrl}
                    name={chain.recipientName}
                    size="md"
                  />
                </div>
              )}
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 leading-tight">
                {orgFirst}&apos;s {chain.prayerType.name}{" "}
                {chain.recipientName ? (
                  <span className="text-navy-700">
                    for {chain.recipientName}
                  </span>
                ) : null}
              </h1>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {chain.intention}
            </p>
          </div>
          <div className="mt-6 sm:mt-1 flex justify-center sm:justify-end shrink-0">
            <SaintPortrait patronSaint={chain.prayerType.patronSaint} />
          </div>
        </div>

        {/* Progress bar */}
        {chain.status === "ACTIVE" && (
          <div className="mt-6">
            <div className="w-full h-2 bg-cream-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold-400 rounded-full transition-all"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Today's prayer */}
      {chain.status === "ACTIVE" && (
        <div className="prayer-card mb-8">
          <h2 className="font-heading text-xl font-semibold text-navy-800 mb-3 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-gold-500" />
            Today&apos;s prayer
          </h2>
          {chain.prayerType.instructions && (
            <div className="text-sm text-muted-foreground mb-4 leading-relaxed whitespace-pre-line">
              {chain.prayerType.instructions}
            </div>
          )}
          {chain.prayerType.prayerText ? (
            <div className="bg-cream-50 border border-cream-300 rounded-lg p-5">
              <p className="font-heading text-lg leading-relaxed text-navy-700 italic whitespace-pre-line">
                {chain.prayerType.prayerText}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              See{" "}
              <Link
                href={`/prayers/${chain.prayerType.slug}`}
                className="text-gold-700 hover:underline underline-offset-2"
              >
                the prayer&apos;s page
              </Link>{" "}
              for the full text and instructions.
            </p>
          )}
        </div>
      )}

      {/* Closing note (when COMPLETED) */}
      {chain.status === "COMPLETED" && chain.closingNote && (
        <div className="prayer-card mb-8 bg-cream-50 border-cream-300">
          <p className="text-xs uppercase tracking-widest text-gold-700 mb-2">
            A note from {orgFirst}
          </p>
          <p className="text-navy-700 leading-relaxed italic whitespace-pre-line">
            {chain.closingNote}
          </p>
        </div>
      )}

      {/* Pray-along CTA — only when active and viewer hasn't joined */}
      {chain.status === "ACTIVE" && !isMember && !isOrganizer && (
        <div className="text-center mb-8">
          <JoinChainButton
            chainId={chain.id}
            organizerFirstName={orgFirst}
            recipientPhrase={phrase}
            durationDays={chain.durationDays}
          />
        </div>
      )}

      {/* Share affordance — copy / native share / QR. Mirrors the train
          share button so the sharing UX is identical across primitives. */}
      {chain.status === "ACTIVE" && (
        <ChainShareButton
          slug={chain.slug}
          organizerFirstName={orgFirst}
          recipientPhrase={phrase}
        />
      )}

      {/* Member roster */}
      <div className="mb-8">
        <h2 className="font-heading text-xl font-semibold text-navy-800 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-gold-500" />
          Praying with {orgFirst} ({chain.members.length})
        </h2>
        <div className="prayer-card">
          <div className="flex flex-wrap gap-2">
            {chain.members.map((member) => (
              <span
                key={member.id}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-100 text-navy-700 text-sm border border-cream-300"
              >
                {member.name}
                {member.id ===
                  chain.members.find((m) => m.email)?.id /* placeholder */ &&
                  ""}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
