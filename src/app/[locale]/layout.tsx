import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EB_Garamond, DM_Sans } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/providers";
import { getBaseUrl } from "@/lib/url";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { getDictionary } from "@/i18n/dictionaries";
import { LocaleProvider } from "@/i18n/locale-context";
import { isLocale, locales, defaultLocale } from "@/i18n/config";

const heading = EB_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

// Pre-render every supported locale's static surface at build time.
// This is what restores per-locale SSG: Next 16 expands each entry
// into a separate prerendered branch of the route tree, so /en/...
// and /es/... pages are static again (no more cookie-driven dynamic
// rendering from Phase 1a).
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  // Resolves all relative image URLs in OG/Twitter metadata against the
  // real public origin instead of falling back to localhost:3000.
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "PrayerTrain — Organized Prayer for Those in Need",
    template: "%s | PrayerTrain",
  },
  // 158 chars — under the ~160-char SERP truncation cap. The previous
  // version was 191 chars and got cut mid-sentence in Google snippets.
  description:
    "Coordinate prayer coverage for someone in need. Create a PrayerTrain, choose Catholic novenas and devotions, and invite your community to pray.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "PrayerTrain — Organized Prayer for Those in Need",
    description:
      "Like a meal train, but for prayers. Create a prayer train for someone in need and invite your community to sign up for specific prayers on specific days.",
    type: "website",
    images: [{ url: "/logo.png", width: 1024, height: 1024 }],
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Locale comes from the route segment, not the cookie. This is the
  // SEO-critical change from Phase 1a: the URL is canonical. `/es/...`
  // ALWAYS renders Spanish regardless of the cookie. The cookie's only
  // job is to remember the user's choice for INTERNAL navigation (the
  // LocaleSwitcher writes it; LocalizedLink reads it via context).
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) {
    // Unsupported locale code in the URL — bail. The proxy normally
    // doesn't let this happen (it only rewrites bare paths or passes
    // through already-prefixed locales we support), but defensive
    // against direct URL typing or future locale removals.
    notFound();
  }
  const locale = rawLocale;
  const dict = await getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-body">
        {/* Skip link — first focusable element, visible only on focus. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-navy-700 focus:text-white focus:px-3 focus:py-2 focus:rounded"
        >
          {dict.common.skipToMain}
        </a>
        {/* JSON-LD structured data for search engines. Server-rendered.
            inLanguage is locale-aware so each locale's pages declare
            their language to Google. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema(locale)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema(locale)),
          }}
        />
        {/* SessionProvider context wraps the whole app so the
            client-side `<Header>` can read auth via useSession. The
            LocaleProvider lets any descendant client component read
            the active locale via `useLocale()` — used by the
            LocalizedLink wrapper to prefix internal hrefs.
            See providers.tsx + locale-context.tsx for the full setup. */}
        <Providers>
          <LocaleProvider value={locale}>
            <Header locale={locale} nav={dict.nav} common={dict.common} />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer footer={dict.footer} prayers={dict.nav} common={dict.common} />
          </LocaleProvider>
        </Providers>
      </body>
    </html>
  );
}

// Re-export defaultLocale so callers that import this module have a
// canonical fallback even if a future refactor changes the source of
// truth. Currently src/i18n/config.ts is canonical.
void defaultLocale;
