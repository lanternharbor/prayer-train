import type { Metadata } from "next";
import { EB_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getBaseUrl } from "@/lib/url";
import { organizationSchema, websiteSchema } from "@/lib/schema";

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
  description:
    "Coordinate prayer coverage for loved ones. Create a prayer train, invite your community, and ensure continuous spiritual support through organized daily prayer commitments.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${heading.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-body">
        {/* Skip link — first focusable element, visible only on focus. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-navy-700 focus:text-white focus:px-3 focus:py-2 focus:rounded"
        >
          Skip to main content
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
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
