import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";
import { getBaseUrl } from "@/lib/url";

/**
 * Dynamic sitemap. Includes the static marketing pages plus every public
 * prayer train. Private trains are excluded so they stay unlisted.
 *
 * Cached as a Route Handler by default. If we ever need to force fresh
 * data on each request, add `export const revalidate = 60` (or use a
 * Request-time API in this file).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/browse`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${base}/prayers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/prayers/novenas`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}/our-story`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${base}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Pull all public, non-completed trains. Cap at 5000 to keep the sitemap
  // under the 50k-URL / 50MB limit Google enforces.
  let publicTrains: { slug: string; updatedAt: Date }[] = [];
  try {
    publicTrains = await prisma.prayerTrain.findMany({
      where: { isPublic: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
      take: 5000,
    });
  } catch (error) {
    // If the DB is unreachable at build time, fall back to just the static
    // entries rather than failing the whole sitemap.
    console.error("sitemap: failed to fetch public trains", error);
  }

  const dynamicEntries: MetadataRoute.Sitemap = publicTrains.map((t) => ({
    url: `${base}/p/${t.slug}`,
    lastModified: t.updatedAt,
    changeFrequency: "daily",
    priority: 0.7,
  }));

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

  const prayerEntries: MetadataRoute.Sitemap = prayerSlugs.map((p) => ({
    url: `${base}/prayers/${p.slug}`,
    lastModified: p.createdAt,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticEntries, ...dynamicEntries, ...prayerEntries];
}
