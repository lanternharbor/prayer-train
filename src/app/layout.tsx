import type { Metadata } from "next";
import { EB_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

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
  title: {
    default: "OurFaithTrain — Organized Prayer for Those in Need",
    template: "%s | OurFaithTrain",
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
    title: "OurFaithTrain — Organized Prayer for Those in Need",
    description:
      "Like a meal train, but for prayers. Create a prayer train for someone in need and invite your community to sign up for specific prayers on specific days.",
    type: "website",
    images: [{ url: "/logo.png", width: 512, height: 512 }],
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
