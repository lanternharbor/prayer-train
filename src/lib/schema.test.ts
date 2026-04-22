import { beforeAll, describe, expect, it } from "vitest";
import {
  breadcrumbSchema,
  organizationSchema,
  prayerArticleSchema,
  websiteSchema,
} from "./schema";

// Pin NEXTAUTH_URL so getBaseUrl() returns a predictable origin across
// test runs and CI environments. Has to be set before the schema module
// is used because getBaseUrl() is called lazily inside each builder.
beforeAll(() => {
  process.env.NEXTAUTH_URL = "https://test.example.com";
});

const CONTEXT = "https://schema.org";

describe("organizationSchema", () => {
  it("declares the Organization type with the standard context", () => {
    const s = organizationSchema();
    expect(s["@context"]).toBe(CONTEXT);
    expect(s["@type"]).toBe("Organization");
  });

  it("sets name to PrayerTrain and url from getBaseUrl()", () => {
    const s = organizationSchema();
    expect(s.name).toBe("PrayerTrain");
    expect(s.url).toBe("https://test.example.com");
  });

  it("includes a ContactPoint with the support email", () => {
    const s = organizationSchema() as {
      contactPoint: { "@type": string; email: string };
    };
    expect(s.contactPoint["@type"]).toBe("ContactPoint");
    expect(s.contactPoint.email).toBe("hello@prayertrains.com");
  });

  it("declares Lantern Harbor LLC as the parent organization", () => {
    const s = organizationSchema() as {
      parentOrganization: { "@type": string; name: string; url: string };
    };
    expect(s.parentOrganization["@type"]).toBe("Organization");
    expect(s.parentOrganization.name).toBe("Lantern Harbor LLC");
    expect(s.parentOrganization.url).toBe("https://lanternharbor.co");
  });
});

describe("websiteSchema", () => {
  it("declares the WebSite type with a SearchAction", () => {
    const s = websiteSchema() as {
      "@type": string;
      potentialAction: { "@type": string; target: string };
    };
    expect(s["@type"]).toBe("WebSite");
    expect(s.potentialAction["@type"]).toBe("SearchAction");
    expect(s.potentialAction.target).toBe(
      "https://test.example.com/prayers?q={search_term_string}",
    );
  });
});

describe("breadcrumbSchema", () => {
  it("renders a BreadcrumbList with 1-indexed positions", () => {
    const s = breadcrumbSchema([
      { name: "Home", url: "https://test.example.com" },
      { name: "Library", url: "https://test.example.com/prayers" },
      { name: "A Novena", url: "https://test.example.com/prayers/a-novena" },
    ]) as {
      "@type": string;
      itemListElement: {
        "@type": string;
        position: number;
        name: string;
        item: string;
      }[];
    };
    expect(s["@type"]).toBe("BreadcrumbList");
    expect(s.itemListElement).toHaveLength(3);
    expect(s.itemListElement[0].position).toBe(1);
    expect(s.itemListElement[0].name).toBe("Home");
    expect(s.itemListElement[2].position).toBe(3);
    expect(s.itemListElement[2].item).toBe(
      "https://test.example.com/prayers/a-novena",
    );
  });

  it("handles an empty crumb list without throwing", () => {
    const s = breadcrumbSchema([]) as {
      itemListElement: unknown[];
    };
    expect(s.itemListElement).toEqual([]);
  });
});

describe("prayerArticleSchema", () => {
  const fixture = {
    name: "Novena to Saint Joseph",
    description: "A nine-day devotion for fathers and families.",
    slug: "novena-to-saint-joseph",
    createdAt: new Date("2026-04-01T12:00:00.000Z"),
    situationTags: ["FAMILY", "FINANCIAL", "CAREER"],
  };

  it("declares the Article type with the right headline and URL", () => {
    const s = prayerArticleSchema(fixture);
    expect(s["@type"]).toBe("Article");
    expect(s.headline).toBe(fixture.name);
    expect(s.url).toBe(
      "https://test.example.com/prayers/novena-to-saint-joseph",
    );
    expect(s.mainEntityOfPage).toBe(
      "https://test.example.com/prayers/novena-to-saint-joseph",
    );
  });

  it("emits datePublished as an ISO string derived from createdAt", () => {
    const s = prayerArticleSchema(fixture);
    expect(s.datePublished).toBe("2026-04-01T12:00:00.000Z");
  });

  it("maps situationTags through formatSituation into `about` Things", () => {
    const s = prayerArticleSchema(fixture) as {
      about: { "@type": string; name: string }[];
    };
    expect(s.about).toHaveLength(3);
    // Each tag is a Thing
    expect(s.about.every((t) => t["@type"] === "Thing")).toBe(true);
    // Values should be the human-readable form, not the raw enum
    const names = s.about.map((t) => t.name);
    expect(names).toContain("Family");
    expect(names).toContain("Financial Hardship");
    expect(names).toContain("Career & Work");
    expect(names).not.toContain("FAMILY");
  });

  it("handles empty situationTags", () => {
    const s = prayerArticleSchema({ ...fixture, situationTags: [] }) as {
      about: unknown[];
    };
    expect(s.about).toEqual([]);
  });
});
