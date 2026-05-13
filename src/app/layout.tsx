import type { Metadata } from "next";
import { EB_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Providers } from "@/components/providers";
import { getBaseUrl } from "@/lib/url";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import { getLocale } from "@/i18n/get-locale";
import { getDictionary } from "@/i18n/dictionaries";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Resolve the active locale once per request. The dictionary is
  // passed down to Header and Footer (which need translated strings);
  // page-level translations are fetched per-page so each route can
  // tree-shake the parts of the dictionary it doesn't use. The locale
  // itself flows down so client components can render in the right
  // language without a useEffect/re-render cycle. See
  // docs/internationalization-roadmap.md Phase 1a.
  const locale = await getLocale();
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
        {/* JSON-LD structured data for search engines. Server-rendered. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema()),
          }}
        />
        {/* SessionProvider context wraps the whole app so the
            client-side `<Header>` can read auth via useSession. The
            layout itself stays a server component (Providers is the
            only client boundary; children render through unchanged).
            Moving auth off the server-side render path is what lets
            public pages opt back into Vercel's CDN cache via
            `export const revalidate = 300`. See providers.tsx + the
            header.tsx comment for the full rationale. */}
        <Providers>
          <Header locale={locale} nav={dict.nav} common={dict.common} />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer footer={dict.footer} prayers={dict.nav} common={dict.common} />
        </Providers>
      </body>
    </html>
  );
}
