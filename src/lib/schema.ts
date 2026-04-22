/**
 * JSON-LD schema.org builders for PrayerTrain pages.
 *
 * Each function returns a plain JS object suitable for JSON.stringify into
 * a <script type="application/ld+json"> tag. All URLs are resolved through
 * getBaseUrl() so dev/preview/prod all emit correct absolute URLs.
 */

import { getBaseUrl } from "@/lib/url";
import { formatSituation } from "@/lib/utils";

const SCHEMA_CONTEXT = "https://schema.org";

export function organizationSchema(): Record<string, unknown> {
  const baseUrl = getBaseUrl();
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Organization",
    name: "PrayerTrain",
    url: baseUrl,
    description: "Like a meal train, but for prayers.",
    logo: `${baseUrl}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@prayertrains.com",
      contactType: "customer support",
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Lantern Harbor LLC",
      url: "https://lanternharbor.co",
    },
  };
}

export function websiteSchema(): Record<string, unknown> {
  const baseUrl = getBaseUrl();
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebSite",
    name: "PrayerTrain",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/prayers?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
): Record<string, unknown> {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function prayerArticleSchema(prayer: {
  name: string;
  description: string;
  slug: string;
  createdAt: Date;
  situationTags: string[];
}): Record<string, unknown> {
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/prayers/${prayer.slug}`;
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Article",
    headline: prayer.name,
    description: prayer.description,
    datePublished: prayer.createdAt.toISOString(),
    mainEntityOfPage: url,
    url,
    about: prayer.situationTags.map((tag) => ({
      "@type": "Thing",
      name: formatSituation(tag),
    })),
  };
}
