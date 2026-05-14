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

/**
 * Each `*Schema` helper accepts an optional `locale` (BCP 47 tag) so
 * the emitted JSON-LD declares its language via the `inLanguage`
 * field. Falls back to "en" for backward compatibility with callers
 * that haven't yet been updated. See
 * docs/internationalization-roadmap.md Phase α (URL routing + SEO).
 */

export function organizationSchema(
  locale: string = "en",
): Record<string, unknown> {
  const baseUrl = getBaseUrl();
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Organization",
    name: "PrayerTrain",
    url: baseUrl,
    description: "Like a meal train, but for prayers.",
    logo: `${baseUrl}/logo.png`,
    inLanguage: locale,
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

export function websiteSchema(
  locale: string = "en",
): Record<string, unknown> {
  const baseUrl = getBaseUrl();
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebSite",
    name: "PrayerTrain",
    url: baseUrl,
    inLanguage: locale,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/prayers?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(
  items: { name: string; url: string }[],
  locale: string = "en",
): Record<string, unknown> {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "BreadcrumbList",
    inLanguage: locale,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function prayerArticleSchema(
  prayer: {
    name: string;
    description: string;
    slug: string;
    createdAt: Date;
    situationTags: string[];
  },
  locale: string = "en",
): Record<string, unknown> {
  const baseUrl = getBaseUrl();
  // Self-locale URL — Google uses inLanguage + URL to figure out
  // which locale this article belongs to. Build via raw template
  // rather than importing localizedHref so this stays a pure
  // schema helper without a circular dep on i18n/links.
  const localePrefix = locale ? `/${locale}` : "";
  const url = `${baseUrl}${localePrefix}/prayers/${prayer.slug}`;
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Article",
    headline: prayer.name,
    description: prayer.description,
    inLanguage: locale,
    datePublished: prayer.createdAt.toISOString(),
    mainEntityOfPage: url,
    url,
    about: prayer.situationTags.map((tag) => ({
      "@type": "Thing",
      name: formatSituation(tag),
    })),
  };
}

/**
 * FAQ schema for a prayer-detail page. Renders as the FAQPage rich
 * result in Google search — three questions per prayer derived from
 * existing PrayerType fields. Origin: SEO audit May 2026 flagged the
 * gap; FAQ schema is one of the easiest SERP-feature wins.
 *
 * Skips entries whose answer is empty (e.g., a prayer with no
 * patronSaint won't render the third Q). Empty `mainEntity` arrays
 * are returned as null so callers can skip rendering altogether.
 */
export function prayerFaqSchema(
  prayer: {
    name: string;
    description: string;
    instructions: string | null;
    patronSaint: string | null;
  },
  locale: string = "en",
): Record<string, unknown> | null {
  type FaqEntry = { question: string; answer: string };
  // Questions stay English for now — Phase 3 (translated prayer
  // content + Q&A) will swap these to a locale-aware template. The
  // SEO benefit of FAQ schema in non-English locales without
  // translated questions is limited, so leaving as English-only
  // entries doesn't hurt non-English search performance.
  const candidates: FaqEntry[] = [
    {
      question: `What is the ${prayer.name}?`,
      answer: prayer.description,
    },
  ];
  if (prayer.instructions) {
    candidates.push({
      question: `How do I pray the ${prayer.name}?`,
      answer: prayer.instructions,
    });
  }
  if (prayer.patronSaint) {
    candidates.push({
      question: `Who is the patron saint of the ${prayer.name}?`,
      answer: `${prayer.patronSaint} is the patron saint associated with the ${prayer.name}. The prayer is offered through their intercession.`,
    });
  }
  const entries = candidates.filter(
    (entry) => entry.answer && entry.answer.trim().length > 0,
  );
  if (entries.length === 0) return null;
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

export function prayerChainSchema(
  chain: {
    slug: string;
    prayerName: string;
    organizerName: string;
    recipientName: string | null;
    intention: string;
    startDate: Date;
    endDate: Date;
  },
  locale: string = "en",
): Record<string, unknown> {
  const baseUrl = getBaseUrl();
  const localePrefix = locale ? `/${locale}` : "";
  const url = `${baseUrl}${localePrefix}/chain/${chain.slug}`;
  // Headline stays in the active language's possessive idiom for now.
  // English uses the apostrophe-s form ("Jilu's Surrender Novena");
  // Spanish uses "Surrender Novena de Jilu". Caller resolves this
  // higher up (the chain page builds headline + passes it through),
  // so the schema helper just records whatever the caller built.
  // Note: this helper builds its own headline today — Phase 3 work
  // will move headline assembly to the caller so the schema can
  // honor the active locale's grammar properly.
  const headline = chain.recipientName
    ? `${chain.organizerName}'s ${chain.prayerName} for ${chain.recipientName}`
    : `${chain.organizerName}'s ${chain.prayerName}`;
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Event",
    name: headline,
    description: chain.intention,
    inLanguage: locale,
    startDate: chain.startDate.toISOString(),
    endDate: chain.endDate.toISOString(),
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url,
    },
    organizer: {
      "@type": "Person",
      name: chain.organizerName,
    },
    url,
  };
}
