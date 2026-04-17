import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatDifficulty, formatSituation } from "@/lib/utils";
import { Clock, Star, CalendarDays, ArrowLeft, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Novenas",
  description:
    "Browse our collection of Catholic novenas — nine-day prayer devotions for powerful intercession.",
  alternates: { canonical: "/prayers/novenas" },
};

export default async function NovenasPage() {
  const novenas = await prisma.prayerType.findMany({
    where: { category: "NOVENA" },
    orderBy: { name: "asc" },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/prayers"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        All Prayers
      </Link>

      <div className="mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-3 gold-accent">
          Novenas
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Nine-day prayer devotions for powerful intercession. Novenas are among
          the most effective forms of intercessory prayer in the Catholic
          tradition.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {novenas.map((novena) => (
          <Link
            key={novena.id}
            href={`/prayers/${novena.slug}`}
            className="prayer-card group"
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="font-heading text-xl font-semibold text-navy-800 group-hover:text-navy-600 transition-colors leading-snug pr-2">
                {novena.name}
              </h2>
              <BookOpen className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              {novena.description}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {novena.duration} min/day
              </span>
              <span className="flex items-center gap-1">
                <CalendarDays className="w-3.5 h-3.5" />
                {novena.daysRequired} days
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5" />
                {formatDifficulty(novena.difficulty)}
              </span>
            </div>
            {novena.patronSaint && (
              <p className="text-xs text-gold-600 mb-2">
                {novena.patronSaint}
              </p>
            )}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {novena.situationTags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full text-xs bg-cream-200 text-cream-600"
                >
                  {formatSituation(tag)}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
