import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getBaseUrl } from "@/lib/url";
import {
  breadcrumbSchema,
  prayerArticleSchema,
  prayerFaqSchema,
} from "@/lib/schema";

// Static-content page (the prayer library entries change rarely;
// when they do they ship via seed/script). Revalidate every 5
// minutes so a content edit reaches users without a manual purge.
export const revalidate = 300;
import { SaintPortrait } from "@/components/saint-portrait";
import {
  formatPrayerCategory,
  formatDifficulty,
  formatSituation,
  smartTruncate,
} from "@/lib/utils";
import { hasCompleteReflections } from "@/lib/daily-reflections";
import {
  Clock,
  Star,
  CalendarDays,
  Tag,
  BookOpen,
  User,
  Users,
} from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const prayer = await prisma.prayerType.findUnique({
    where: { slug },
    select: { slug: true, name: true, description: true, imageUrl: true },
  });

  if (!prayer) return { title: "Prayer Not Found" };

  const url = `${getBaseUrl()}/prayers/${prayer.slug}`;
  const image = prayer.imageUrl || `${getBaseUrl()}/logo.png`;

  return {
    title: prayer.name,
    description: smartTruncate(prayer.description, 160),
    alternates: { canonical: url },
    openGraph: {
      title: prayer.name,
      description: smartTruncate(prayer.description, 160),
      url,
      type: "article",
      siteName: "PrayerTrain",
      images: [{ url: image, width: 1024, height: 1024, alt: prayer.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: prayer.name,
      description: smartTruncate(prayer.description, 160),
      images: [image],
    },
  };
}

export default async function PrayerDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const prayer = await prisma.prayerType.findUnique({ where: { slug } });

  if (!prayer) notFound();

  const baseUrl = getBaseUrl();
  const crumbs = breadcrumbSchema([
    { name: "Home", url: baseUrl },
    { name: "Prayer Library", url: `${baseUrl}/prayers` },
    { name: prayer.name, url: `${baseUrl}/prayers/${prayer.slug}` },
  ]);
  const article = prayerArticleSchema({
    name: prayer.name,
    description: prayer.description,
    slug: prayer.slug,
    createdAt: prayer.createdAt,
    situationTags: prayer.situationTags,
  });
  // FAQPage schema. Three Q's per prayer derived from existing fields
  // — what is this, how to pray, who's the patron saint. Earns the
  // FAQ rich-result SERP feature on prayer-detail queries. Returns
  // null when no question has a non-empty answer; we skip rendering
  // in that case rather than emitting an empty FAQ block.
  const faq = prayerFaqSchema({
    name: prayer.name,
    description: prayer.description,
    instructions: prayer.instructions,
    patronSaint: prayer.patronSaint,
  });

  // Related prayers — three other library entries that share at least
  // one situationTag with this prayer. Adds internal-linking depth
  // (which Google rewards) AND helps a reader who's looking for, say,
  // "novenas of trust" find the Sacred Heart + Surrender Novena +
  // Divine Mercy together. Excludes self; ordered by daysRequired
  // proximity then alphabetical so the row reads cohesively.
  const relatedPrayers = prayer.situationTags.length > 0
    ? await prisma.prayerType.findMany({
        where: {
          slug: { not: prayer.slug },
          situationTags: { hasSome: prayer.situationTags },
        },
        select: {
          slug: true,
          name: true,
          patronSaint: true,
          daysRequired: true,
          category: true,
        },
        take: 12,
      })
    : [];
  const relatedRanked = relatedPrayers
    .map((p) => ({
      ...p,
      daysDelta: Math.abs(p.daysRequired - prayer.daysRequired),
    }))
    .sort((a, b) =>
      a.daysDelta !== b.daysDelta
        ? a.daysDelta - b.daysDelta
        : a.name.localeCompare(b.name),
    )
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      {faq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
        />
      )}
      {/* Library link. Uses a BookOpen icon (not a back-arrow) because
          this page is reachable from many entrypoints — /browse, a
          /chain/[slug] "About this prayer" link, search, direct visit
          — and "Back to Prayer Library" was misleading on every path
          except the library itself. The icon signals "library /
          reference" without implying history. */}
      <Link
        href="/prayers"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <BookOpen className="w-4 h-4" />
        Prayer Library
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:gap-8">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-navy-100 text-navy-700">
                {formatPrayerCategory(prayer.category)}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-cream-200 text-cream-700">
                {formatDifficulty(prayer.difficulty)}
              </span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-4">
              {prayer.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {prayer.description}
            </p>
          </div>
          {/* Patron saint portrait (renders only when curated art exists). */}
          <div className="mt-6 sm:mt-1 flex justify-center sm:justify-end shrink-0">
            <SaintPortrait patronSaint={prayer.patronSaint} />
          </div>
        </div>
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="prayer-card text-center py-4">
          <Clock className="w-5 h-5 text-gold-500 mx-auto mb-1.5" />
          <p className="text-sm font-medium text-navy-700">
            {prayer.duration} min
          </p>
          <p className="text-xs text-muted-foreground">Duration</p>
        </div>
        <div className="prayer-card text-center py-4">
          <CalendarDays className="w-5 h-5 text-gold-500 mx-auto mb-1.5" />
          <p className="text-sm font-medium text-navy-700">
            {prayer.daysRequired} {prayer.daysRequired === 1 ? "day" : "days"}
          </p>
          <p className="text-xs text-muted-foreground">Commitment</p>
        </div>
        <div className="prayer-card text-center py-4">
          <Star className="w-5 h-5 text-gold-500 mx-auto mb-1.5" />
          <p className="text-sm font-medium text-navy-700">
            {formatDifficulty(prayer.difficulty)}
          </p>
          <p className="text-xs text-muted-foreground">Level</p>
        </div>
        {prayer.patronSaint && (
          <div className="prayer-card text-center py-4">
            <User className="w-5 h-5 text-gold-500 mx-auto mb-1.5" />
            <p className="text-sm font-medium text-navy-700 leading-snug">
              {prayer.patronSaint}
            </p>
            <p className="text-xs text-muted-foreground">Patron Saint</p>
          </div>
        )}
      </div>

      {/* Instructions */}
      {prayer.instructions && (
        <div className="prayer-card mb-8">
          <h2 className="font-heading text-xl font-semibold text-navy-800 mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-gold-500" />
            How to Pray
          </h2>
          <p className="text-foreground leading-relaxed whitespace-pre-line">
            {prayer.instructions}
          </p>
        </div>
      )}

      {/* Prayer Text */}
      {prayer.prayerText && (
        <div className="prayer-card bg-cream-50 border-gold-200 mb-8">
          <h2 className="font-heading text-xl font-semibold text-navy-800 mb-4">
            Prayer Text
          </h2>
          <div className="bg-white rounded-lg p-6 border border-cream-300">
            <p className="font-heading text-lg leading-relaxed text-navy-700 italic whitespace-pre-line">
              {prayer.prayerText}
            </p>
          </div>
        </div>
      )}

      {/* Daily meditations — for novenas where each day has distinct
       *  content (Surrender Novena most famously, with the day-by-day
       *  meditations from Don Dolindo Ruotolo). Renders only when
       *  the prayer has a complete reflection set (every day from 1
       *  to daysRequired populated). Partial fills don't render here
       *  to avoid showing an incomplete-looking list. The chain page
       *  and email helpers render whatever days exist; this disclosure
       *  is the library reference, so it should be all-or-nothing. */}
      {hasCompleteReflections(prayer.dailyReflections, prayer.daysRequired) && (
        <div className="prayer-card mb-8">
          <h2 className="font-heading text-xl font-semibold text-navy-800 mb-3 flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-gold-500" />
            Daily Meditations
          </h2>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Each day of this {prayer.daysRequired}-day prayer has a distinct
            meditation. Tap to expand.
          </p>
          <div className="space-y-2">
            {prayer.dailyReflections.slice(0, prayer.daysRequired).map(
              (reflection, idx) => (
                <details
                  key={idx}
                  className="rounded-lg border border-cream-300 bg-cream-50 p-4"
                >
                  <summary className="cursor-pointer font-medium text-navy-700">
                    Day {idx + 1}
                  </summary>
                  <p className="mt-3 text-base leading-relaxed text-navy-700 whitespace-pre-line">
                    {reflection}
                  </p>
                </details>
              ),
            )}
          </div>
        </div>
      )}

      {/* Situation Tags */}
      {prayer.situationTags.length > 0 && (
        <div className="mb-8">
          <h2 className="font-heading text-lg font-semibold text-navy-800 mb-3 flex items-center gap-2">
            <Tag className="w-5 h-5 text-gold-500" />
            Recommended For
          </h2>
          <div className="flex flex-wrap gap-2">
            {prayer.situationTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-sm bg-cream-200 text-cream-700"
              >
                {formatSituation(tag)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Feast Day */}
      {prayer.feastDay && (
        <div className="text-sm text-muted-foreground mb-10">
          <span className="font-medium">Feast Day:</span> {prayer.feastDay}
        </div>
      )}

      {/* Related prayers — three other library entries sharing at
          least one situationTag with this one, ordered by closest
          duration. Internal-linking depth signal for Google + reader
          affordance ("if this prayer fits your situation, here are
          three more that do too"). Renders only when at least one
          related entry exists; otherwise the block is suppressed. */}
      {relatedRanked.length > 0 && (
        <div className="mt-10">
          <h2 className="font-heading text-xl font-semibold text-navy-800 mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-gold-500" />
            Related prayers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedRanked.map((p) => (
              <Link
                key={p.slug}
                href={`/prayers/${p.slug}`}
                className="prayer-card group flex flex-col"
              >
                <h3 className="font-heading text-base font-semibold text-navy-800 group-hover:text-navy-600 transition-colors mb-1">
                  {p.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {formatPrayerCategory(p.category)}
                  {p.patronSaint ? ` · ${p.patronSaint}` : ""}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* "Pray with friends" — entry point to the pray-together format
          of PrayerTrain (the small-group, same-prayer-every-day pattern).
          Single additive CTA; doesn't change any existing behavior. */}
      <div className="prayer-card bg-cream-50 border-cream-300 mt-10 flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="flex-1">
          <h2 className="font-heading text-xl font-semibold text-navy-800 mb-2 flex items-center gap-2">
            <Users className="w-5 h-5 text-gold-500" />
            {prayer.daysRequired === 1
              ? "Pray this together"
              : `Pray a ${prayer.daysRequired}-day novena together`}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Invite a small group to pray this
            {prayer.daysRequired === 1 ? " " : " each day "}with you. Everyone
            gets the same prayer text, the same rhythm, the same intention.
          </p>
        </div>
        <Link
          href={`/chain/new?prayerType=${prayer.slug}`}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-navy-700 transition-colors shrink-0"
        >
          <Users className="w-4 h-4" />
          Pray with friends
        </Link>
      </div>
    </div>
  );
}
