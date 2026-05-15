import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  buildAlternates,
  buildLanguageAlternates,
  localizedMetadata,
} from "./metadata";
import type { Locale } from "./config";

/**
 * Pin the metadata helper's contract. This is the single funnel every
 * page's `generateMetadata` should run through, so a regression here
 * leaks into every locale-prefixed URL at once. The audit at
 * docs/seo-audit-international-2026-05.md found two regressions on
 * detail pages that bypassed this helper (raw og:locale + /logo.png
 * fallback); these tests prove the helper itself emits the right
 * shape so future detail-page callers don't reimplement and drift.
 */

const originalNextauthUrl = process.env.NEXTAUTH_URL;

beforeEach(() => {
  process.env.NEXTAUTH_URL = "https://prayertrains.com";
});

afterEach(() => {
  if (originalNextauthUrl === undefined) {
    delete process.env.NEXTAUTH_URL;
  } else {
    process.env.NEXTAUTH_URL = originalNextauthUrl;
  }
});

describe("buildLanguageAlternates", () => {
  it("emits one alternate per supported locale plus x-default", () => {
    const alternates = buildLanguageAlternates("/prayers/surrender-novena");
    expect(Object.keys(alternates).sort()).toEqual(
      ["en", "es", "fil", "pl", "pt-BR", "x-default"].sort(),
    );
    expect(alternates.en).toBe(
      "https://prayertrains.com/en/prayers/surrender-novena",
    );
    expect(alternates["pt-BR"]).toBe(
      "https://prayertrains.com/pt-BR/prayers/surrender-novena",
    );
    expect(alternates["x-default"]).toBe(
      "https://prayertrains.com/prayers/surrender-novena",
    );
  });

  it("treats the root path specially so x-default doesn't double-slash", () => {
    const alternates = buildLanguageAlternates("/");
    expect(alternates.en).toBe("https://prayertrains.com/en");
    expect(alternates["x-default"]).toBe("https://prayertrains.com");
  });
});

describe("buildAlternates", () => {
  it("uses the self-locale URL as canonical", () => {
    const alternates = buildAlternates({ locale: "es", path: "/browse" });
    expect(alternates.canonical).toBe("https://prayertrains.com/es/browse");
    expect((alternates.languages as Record<string, string>).es).toBe(
      "https://prayertrains.com/es/browse",
    );
  });

  it("emits BCP 47 casing exactly (pt-BR not pt-br)", () => {
    const alternates = buildAlternates({
      locale: "pt-BR",
      path: "/prayers/holy-rosary",
    });
    expect(alternates.canonical).toBe(
      "https://prayertrains.com/pt-BR/prayers/holy-rosary",
    );
    const languages = alternates.languages as Record<string, string>;
    expect(languages["pt-BR"]).toContain("/pt-BR/");
    expect(Object.keys(languages)).not.toContain("pt-br");
  });
});

describe("localizedMetadata — og:locale BCP 47 underscore format", () => {
  const cases: Array<{ locale: Locale; ogLocale: string }> = [
    { locale: "en", ogLocale: "en_US" },
    { locale: "es", ogLocale: "es_ES" },
    { locale: "pt-BR", ogLocale: "pt_BR" },
    { locale: "fil", ogLocale: "fil_PH" },
    { locale: "pl", ogLocale: "pl_PL" },
  ];

  for (const { locale, ogLocale } of cases) {
    it(`${locale} emits og:locale="${ogLocale}"`, () => {
      const meta = localizedMetadata({
        locale,
        path: "/prayers/surrender-novena",
        title: "Surrender Novena",
        description: "Description",
        ogType: "article",
      });
      expect(meta.openGraph?.locale).toBe(ogLocale);
    });
  }

  it("never emits the bare locale code as og:locale", () => {
    // The audit's P0-2 finding: detail pages were emitting og:locale="es"
    // instead of "es_ES" because they constructed openGraph manually
    // and bypassed localeToOgTag(). This test pins the contract.
    for (const locale of ["en", "es", "pt-BR", "fil", "pl"] as Locale[]) {
      const meta = localizedMetadata({
        locale,
        path: "/test",
        title: "T",
        description: "D",
      });
      expect(meta.openGraph?.locale).not.toBe(locale);
    }
  });
});

describe("localizedMetadata — og:image per-locale OG card defaulting", () => {
  it("defaults to the locale's auto-generated OG share card at 1200x630", () => {
    const meta = localizedMetadata({
      locale: "es",
      path: "/situations/cancer",
      title: "T",
      description: "D",
      ogType: "article",
    });
    const image = meta.openGraph?.images as
      | Array<{ url: string; width: number; height: number; alt?: string }>
      | undefined;
    expect(image?.[0]?.url).toBe(
      "https://prayertrains.com/es/opengraph-image",
    );
    expect(image?.[0]?.width).toBe(1200);
    expect(image?.[0]?.height).toBe(630);
  });

  it("never defaults to /logo.png on a locale-prefixed page", () => {
    // The audit's P0-3 finding: detail pages defaulted to /logo.png
    // (a 1024x1024 square logo) instead of the locale's branded OG
    // card. This regression class is pinned here.
    for (const locale of ["en", "es", "pt-BR", "fil", "pl"] as Locale[]) {
      const meta = localizedMetadata({
        locale,
        path: "/prayers/surrender-novena",
        title: "T",
        description: "D",
        ogType: "article",
      });
      const image = meta.openGraph?.images as
        | Array<{ url: string }>
        | undefined;
      expect(image?.[0]?.url).not.toContain("/logo.png");
    }
  });

  it("preserves an explicit ogImage at the legacy 1024x1024 portrait ratio", () => {
    const meta = localizedMetadata({
      locale: "en",
      path: "/prayers/st-peregrine-novena",
      title: "St. Peregrine Novena",
      description: "D",
      ogImage: "https://example.com/st-peregrine.png",
      ogType: "article",
    });
    const image = meta.openGraph?.images as
      | Array<{ url: string; width: number; height: number }>
      | undefined;
    expect(image?.[0]?.url).toBe("https://example.com/st-peregrine.png");
    expect(image?.[0]?.width).toBe(1024);
    expect(image?.[0]?.height).toBe(1024);
  });
});

describe("localizedMetadata — og:type override + og:url", () => {
  // Next.js types `openGraph` as a discriminated union (Website / Article
  // / etc.) where `type` doesn't appear on the parent — but the runtime
  // shape we care about always has it. Narrow with a structural cast.
  type OgShape = { type?: string; url?: string | URL };

  it("defaults og:type to 'website'", () => {
    const meta = localizedMetadata({
      locale: "en",
      path: "/browse",
      title: "T",
      description: "D",
    });
    expect((meta.openGraph as OgShape | undefined)?.type).toBe("website");
  });

  it("honors ogType: 'article' for detail pages", () => {
    const meta = localizedMetadata({
      locale: "en",
      path: "/prayers/surrender-novena",
      title: "T",
      description: "D",
      ogType: "article",
    });
    expect((meta.openGraph as OgShape | undefined)?.type).toBe("article");
  });

  it("emits og:url with the self-locale URL", () => {
    const meta = localizedMetadata({
      locale: "pt-BR",
      path: "/situations/cancer",
      title: "T",
      description: "D",
    });
    expect((meta.openGraph as OgShape | undefined)?.url).toBe(
      "https://prayertrains.com/pt-BR/situations/cancer",
    );
  });
});

describe("localizedMetadata — canonical + alternates", () => {
  it("sets canonical to the self-locale URL", () => {
    const meta = localizedMetadata({
      locale: "fil",
      path: "/our-story",
      title: "T",
      description: "D",
    });
    expect(meta.alternates?.canonical).toBe(
      "https://prayertrains.com/fil/our-story",
    );
  });

  it("declares all 5 hreflang alternates + x-default on every page", () => {
    const meta = localizedMetadata({
      locale: "pl",
      path: "/prayers",
      title: "T",
      description: "D",
    });
    const languages = meta.alternates?.languages as
      | Record<string, string>
      | undefined;
    expect(Object.keys(languages ?? {}).sort()).toEqual(
      ["en", "es", "fil", "pl", "pt-BR", "x-default"].sort(),
    );
  });
});

describe("localizedMetadata — noindex", () => {
  it("emits robots.index=false when noindex=true", () => {
    const meta = localizedMetadata({
      locale: "en",
      path: "/signin",
      title: "Sign in",
      description: "D",
      noindex: true,
    });
    expect(meta.robots).toEqual({ index: false, follow: false });
  });

  it("omits robots when noindex=false (the default)", () => {
    const meta = localizedMetadata({
      locale: "en",
      path: "/browse",
      title: "T",
      description: "D",
    });
    expect(meta.robots).toBeUndefined();
  });
});

describe("localizedMetadata — title template", () => {
  it("returns a plain title string by default (layout appends ' | PrayerTrain')", () => {
    const meta = localizedMetadata({
      locale: "en",
      path: "/browse",
      title: "Find a PrayerTrain",
      description: "D",
    });
    expect(meta.title).toBe("Find a PrayerTrain");
  });

  it("returns an absolute title when absoluteTitle=true (homepage opt-out)", () => {
    const meta = localizedMetadata({
      locale: "en",
      path: "/",
      title: "PrayerTrain — Organized Prayer for Those in Need",
      description: "D",
      absoluteTitle: true,
    });
    expect(meta.title).toEqual({
      absolute: "PrayerTrain — Organized Prayer for Those in Need",
    });
  });
});
