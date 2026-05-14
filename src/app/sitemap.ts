import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { getBaseUrl } from "@/lib/url";
import { SITUATION_TOPICS } from "./[locale]/situations/[topic]/content";
import { locales } from "@/i18n/config";
import { localizedHref } from "@/i18n/links";

/**
 * Dynamic sitemap with full international support.
 *
 * For every URL we emit one entry per supported locale plus an
 * x-default entry pointing at the bare URL. Each entry includes
 * `alternates.languages` so Google understands which URL serves
 * which language (hreflang at the sitemap level matches the
 * page-level link tags emitted by `buildLanguageAlternates`).
 *
 * Sitemap protocol limits: 50,000 URLs / 50 MB per file. With our
 * current caps (5000 trains × N locales + 1000 prayers × N locales +
 * 5000 chains × N locales + situations), 2 locales fits comfortably.
 * Past ~16,000 unique URLs (8000 × 2 locales) we'd need to split into
 * multiple sitemap files via a sitemap index — defer until needed.
 *
 * Cached as a Route Handler by default. If we ever need to force
 * fresh data on each request, add `export const revalidate = 60`.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl();
  const now = new Date();

  /**
   * Build one sitemap entry per supported locale for a given path,
   * with `alternates.languages` listing every locale + x-default.
   * Returns an array because the sitemap protocol wants one URL per
   * entry (alternates.languages annotates each one with the same map).
   */
  function localizedEntries(
    path: string,
    base: Omit<MetadataRoute.Sitemap[number], "url" | "alternates">,
  ): MetadataRoute.Sitemap {
    const languages: Record<string, string> = {};
    for (const l of locales) {
      languages[l] = `${getBaseUrl()}${localizedHref(l, path)}`;
    }
    // x-default points at the bare URL — the proxy rewrites it
    // internally to the default locale at request time. Google uses
    // this for visitors whose Accept-Language doesn't match any
    // listed locale.
    languages["x-default"] =
      path === "/" ? getBaseUrl() : `${getBaseUrl()}${path}`;

    return locales.map((l) => ({
      ...base,
      url: `${getBaseUrl()}${localizedHref(l, path)}`,
      alternates: { languages },
    }));
  }

  const staticEntries: MetadataRoute.Sitemap = [
    ...localizedEntries("/", {
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    }),
    ...localizedEntries("/browse", {
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    }),
    ...localizedEntries("/prayers", {
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }),
    ...localizedEntries("/prayers/novenas", {
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }),
    ...localizedEntries("/our-story", {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }),
    // Situations cluster — six use-case landing pages mapped to
    // high-intent Catholic search clusters ("Catholic prayers for a
    // friend with cancer", etc.). Each topic gets one entry per
    // locale; Google sees the cross-locale alternates and chooses
    // the right one for each searcher.
    ...localizedEntries("/situations", {
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    }),
    ...SITUATION_TOPICS.flatMap((topic) =>
      localizedEntries(`/situations/${topic}`, {
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
      }),
    ),
    ...localizedEntries("/privacy", {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    }),
    ...localizedEntries("/terms", {
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    }),
  ];

  // Pull all public, non-completed trains. Cap at 5000 to keep the
  // sitemap under Google's 50k-URL limit even with N locales.
  let publicTrains: { slug: string; updatedAt: Date }[] = [];
  try {
    publicTrains = await prisma.prayerTrain.findMany({
      where: { isPublic: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
      take: 5000,
    });
  } catch (error) {
    // If the DB is unreachable at build time, fall back to just the
    // static entries rather than failing the whole sitemap.
    console.error("sitemap: failed to fetch public trains", error);
  }

  const dynamicEntries: MetadataRoute.Sitemap = publicTrains.flatMap((t) =>
    localizedEntries(`/p/${t.slug}`, {
      lastModified: t.updatedAt,
      changeFrequency: "daily",
      priority: 0.7,
    }),
  );

  // Pull all prayer types so prayer pages get indexed too.
  let prayerSlugs: { slug: string; createdAt: Date }[] = [];
  try {
    prayerSlugs = await prisma.prayerType.findMany({
      select: { slug: true, createdAt: true },
      take: 1000,
    });
  } catch (error) {
    console.error("sitemap: failed to fetch prayer types", error);
  }

  const prayerEntries: MetadataRoute.Sitemap = prayerSlugs.flatMap((p) =>
    localizedEntries(`/prayers/${p.slug}`, {
      lastModified: p.createdAt,
      changeFrequency: "monthly",
      priority: 0.5,
    }),
  );

  // Public, active prayer chains. Same isPublic discipline as trains.
  let publicChains: { slug: string; updatedAt: Date }[] = [];
  try {
    publicChains = await prisma.prayerChain.findMany({
      where: { isPublic: true, status: "ACTIVE" },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
      take: 5000,
    });
  } catch (error) {
    console.error("sitemap: failed to fetch public chains", error);
  }

  const chainEntries: MetadataRoute.Sitemap = publicChains.flatMap((c) =>
    localizedEntries(`/chain/${c.slug}`, {
      lastModified: c.updatedAt,
      changeFrequency: "daily",
      priority: 0.7,
    }),
  );

  // Suppress the otherwise-unused `base` local — kept for future
  // callers that don't want to call getBaseUrl() per entry.
  void base;

  return [
    ...staticEntries,
    ...dynamicEntries,
    ...prayerEntries,
    ...chainEntries,
  ];
}
