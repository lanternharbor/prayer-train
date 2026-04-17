import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { formatPrayerCategory, formatDifficulty } from "@/lib/utils";
import {
  BookOpen,
  Clock,
  Star,
  CalendarDays,
} from "lucide-react";
import { PrayerCategory } from "@/generated/prisma/client";

export const metadata: Metadata = {
  title: "Prayer Library",
  description:
    "Browse our curated library of Catholic prayers — novenas, rosaries, chaplets, litanies, and more.",
  alternates: { canonical: "/prayers" },
};

export default async function PrayersPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  const where = category
    ? { category: category as PrayerCategory }
    : {};

  const prayers = await prisma.prayerType.findMany({
    where,
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  // Group by category
  const grouped = prayers.reduce(
    (acc, prayer) => {
      const cat = prayer.category;
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(prayer);
      return acc;
    },
    {} as Record<string, typeof prayers>
  );

  const categories = Object.values(PrayerCategory);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-3 gold-accent">
          Prayer Library
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Browse our curated collection of Catholic prayers. Each includes full
          instructions so anyone can pray with confidence.
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        <Link
          href="/prayers"
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !category
              ? "bg-navy-600 text-white"
              : "bg-cream-200 text-muted-foreground hover:bg-cream-300"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={`/prayers?category=${cat}`}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              category === cat
                ? "bg-navy-600 text-white"
                : "bg-cream-200 text-muted-foreground hover:bg-cream-300"
            }`}
          >
            {formatPrayerCategory(cat)}
          </Link>
        ))}
      </div>

      {/* Prayer Grid */}
      {Object.entries(grouped).map(([cat, catPrayers]) => (
        <div key={cat} className="mb-12">
          <h2 className="font-heading text-2xl font-semibold text-navy-700 mb-6">
            {formatPrayerCategory(cat)}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {catPrayers.map((prayer) => (
              <Link
                key={prayer.id}
                href={`/prayers/${prayer.slug}`}
                className="prayer-card group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-heading text-lg font-semibold text-navy-800 group-hover:text-navy-600 transition-colors leading-snug pr-2">
                    {prayer.name}
                  </h3>
                  <BookOpen className="w-4 h-4 text-gold-400 shrink-0 mt-1" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {prayer.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {prayer.duration} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5" />
                    {formatDifficulty(prayer.difficulty)}
                  </span>
                  {prayer.daysRequired > 1 && (
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {prayer.daysRequired} days
                    </span>
                  )}
                </div>
                {prayer.patronSaint && (
                  <p className="text-xs text-gold-600 mt-3">
                    {prayer.patronSaint}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}

      {prayers.length === 0 && (
        <div className="text-center py-20">
          <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <h2 className="font-heading text-xl font-semibold text-navy-700 mb-2">
            No prayers found
          </h2>
          <p className="text-muted-foreground">
            {category
              ? "No prayers in this category yet."
              : "The prayer library hasn't been seeded yet."}
          </p>
        </div>
      )}
    </div>
  );
}
