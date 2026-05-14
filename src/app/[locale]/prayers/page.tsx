import type { Metadata } from "next";
import { LocaleLink as Link } from "@/components/locale-link";
import { getLocalizedPrayersMany } from "@/lib/prayer-localization";
import { formatPrayerCategory, formatDifficulty } from "@/lib/utils";
import {
  BookOpen,
  Clock,
  Star,
  CalendarDays,
  Search,
} from "lucide-react";
import { PrayerCategory, type Prisma } from "@/generated/prisma/client";
import { getDictionary } from "@/i18n/dictionaries";
import { localizedMetadata } from "@/i18n/metadata";
import { isLocale, defaultLocale } from "@/i18n/config";

// Static prayer list; revalidate every 5 minutes so seed updates ship
// without a deploy. Vercel translates to s-maxage=300 SWR header.
export const revalidate = 300;

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
    path: "/prayers",
    title: dict.meta.prayersTitle,
    description: dict.meta.prayersDescription,
  });
}

export default async function PrayersPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const { category, q: rawQuery } = await searchParams;
  // Trim and cap the query string to defend against absurd inputs and
  // strip the surrounding whitespace users sometimes paste in.
  const query = (rawQuery ?? "").trim().slice(0, 100);

  // Compose the Prisma where: category filter (if present) AND an OR
  // across the human-facing fields when a query is given. Case-
  // insensitive `contains` on Postgres maps to ILIKE, which is fine
  // for a library of ~50 entries with no per-search index.
  //
  // Search is intentionally against the ENGLISH base columns even on
  // non-English locales. Reasons: (1) the user's query is in their
  // browser-input locale but our search index isn't multi-locale yet,
  // (2) English remains the canonical source of truth for prayer
  // identity. Phase ζ may revisit if a translated-prayer-search query
  // pattern emerges in analytics.
  const where: Prisma.PrayerTypeWhereInput = {
    ...(category ? { category: category as PrayerCategory } : {}),
    ...(query
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
            { patronSaint: { contains: query, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const prayers = await getLocalizedPrayersMany(
    {
      where,
      orderBy: [{ category: "asc" }, { name: "asc" }],
    },
    locale,
  );

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
      <div className="mb-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold text-navy-800 mb-3 gold-accent">
          Prayer Library
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Browse our curated collection of Catholic prayers. Each includes full
          instructions so anyone can pray with confidence.
        </p>
      </div>

      {/* Search — plain GET form so the URL stays canonical and shareable.
          Preserves the active category filter across searches via a hidden
          field. Submits to /prayers?q=...&category=... */}
      <form
        action="/prayers"
        method="get"
        role="search"
        aria-label="Search the prayer library"
        className="mb-6 max-w-xl"
      >
        {category && (
          <input type="hidden" name="category" value={category} />
        )}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            name="q"
            defaultValue={query}
            placeholder="Search prayers — e.g. St. Blaise, grief, surgery, rosary"
            maxLength={100}
            className="w-full pl-9 pr-4 py-2.5 border border-border rounded-lg bg-cream-50 focus:outline-none focus:ring-2 focus:ring-gold-400/50 focus:border-gold-400 transition"
          />
        </div>
      </form>

      {/* Category Filters — preserve any active query so a category click
          narrows the search results instead of resetting the search. */}
      <div className="flex flex-wrap gap-2 mb-10">
        <Link
          href={query ? `/prayers?q=${encodeURIComponent(query)}` : "/prayers"}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !category
              ? "bg-navy-600 text-white"
              : "bg-cream-200 text-muted-foreground hover:bg-cream-300"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => {
          const params = new URLSearchParams();
          params.set("category", cat);
          if (query) params.set("q", query);
          return (
            <Link
              key={cat}
              href={`/prayers?${params.toString()}`}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                category === cat
                  ? "bg-navy-600 text-white"
                  : "bg-cream-200 text-muted-foreground hover:bg-cream-300"
              }`}
            >
              {formatPrayerCategory(cat)}
            </Link>
          );
        })}
      </div>

      {/* Search summary — shown only when a query is active, helps the
          visitor confirm what they searched for and see how many hits. */}
      {query && (
        <p className="text-sm text-muted-foreground mb-6">
          {prayers.length === 0 ? (
            <>
              No prayers match <strong>&ldquo;{query}&rdquo;</strong>
              {category && <> in {formatPrayerCategory(category)}</>}.
            </>
          ) : (
            <>
              Found <strong>{prayers.length}</strong>{" "}
              prayer{prayers.length === 1 ? "" : "s"} matching{" "}
              <strong>&ldquo;{query}&rdquo;</strong>
              {category && <> in {formatPrayerCategory(category)}</>}.
            </>
          )}
        </p>
      )}

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
                  <p className="text-xs text-gold-700 mt-3">
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
          <p className="text-muted-foreground mb-4">
            {query
              ? "Try a different search term, or clear filters to see the whole library."
              : category
                ? "No prayers in this category yet."
                : "The prayer library hasn't been seeded yet."}
          </p>
          {(query || category) && (
            <Link
              href="/prayers"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold-700 hover:text-gold-800"
            >
              Clear filters
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
