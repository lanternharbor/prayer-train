import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { getBaseUrl } from "@/lib/url";
import {
  formatPrayerCategory,
  formatDifficulty,
  formatSituation,
} from "@/lib/utils";
import {
  ArrowLeft,
  Clock,
  Star,
  CalendarDays,
  Tag,
  BookOpen,
  User,
  ExternalLink,
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
    description: prayer.description.slice(0, 200),
    alternates: { canonical: url },
    openGraph: {
      title: prayer.name,
      description: prayer.description.slice(0, 200),
      url,
      type: "article",
      siteName: "PrayerTrain",
      images: [{ url: image, width: 1024, height: 1024, alt: prayer.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: prayer.name,
      description: prayer.description.slice(0, 200),
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <Link
        href="/prayers"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Prayer Library
      </Link>

      {/* Header */}
      <div className="mb-8">
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
        <div className="text-sm text-muted-foreground">
          <span className="font-medium">Feast Day:</span> {prayer.feastDay}
        </div>
      )}
    </div>
  );
}
