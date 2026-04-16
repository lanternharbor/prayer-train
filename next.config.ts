import type { NextConfig } from "next";

// Derive the Umami script origin at config-build time so it can be added to
// the CSP allow-list. Empty string if NEXT_PUBLIC_UMAMI_SRC isn't set, in
// which case the Umami <Script> tag also won't render.
const umamiOrigin = process.env.NEXT_PUBLIC_UMAMI_SRC
  ? (() => {
      try {
        return new URL(process.env.NEXT_PUBLIC_UMAMI_SRC).origin;
      } catch {
        return "";
      }
    })()
  : "";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  redirects: async () => [
    // Common URLs that people type or link to. All 308 (permanent).
    { source: "/about", destination: "/our-story", permanent: true },
    { source: "/start", destination: "/create", permanent: true },
    { source: "/library", destination: "/prayers", permanent: true },
    { source: "/how-it-works", destination: "/#how-it-works", permanent: true },
  ],
  headers: async () => [
    {
      // Apply security headers to all routes.
      source: "/(.*)",
      headers: [
        // Force HTTPS for 2 years and include in browser preload lists,
        // eliminating the unprotected HTTP hop on first visit to any network.
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        // Prevent the site from being embedded in iframes on other domains
        // (protects against clickjacking).
        { key: "X-Frame-Options", value: "DENY" },
        // Stop browsers from MIME-sniffing the content type (reduces drive-by
        // download risk).
        { key: "X-Content-Type-Options", value: "nosniff" },
        // Only send the origin (not the full path) as the Referer to
        // third-party sites. Keeps prayer train URLs / slugs private.
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        // Disable browser features we don't use. The empty-string values
        // mean "disallow this feature entirely."
        {
          key: "Permissions-Policy",
          value:
            "camera=(), microphone=(), geolocation=(), accelerometer=(), gyroscope=(), magnetometer=(), payment=()",
        },
        // Basic Content-Security-Policy: allow resources from self, Vercel
        // Blob (recipient photos), Google Fonts, Resend tracking pixel,
        // and inline styles (Tailwind needs them). Block everything else.
        // If NEXT_PUBLIC_UMAMI_SRC is set, also allow that origin for script
        // + connect so the self-hosted Umami tracker can load and post events.
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            `script-src 'self' 'unsafe-inline' 'unsafe-eval'${umamiOrigin ? ` ${umamiOrigin}` : ""}`,
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: blob: https://*.public.blob.vercel-storage.com https://appleid.apple.com",
            `connect-src 'self' https://appleid.apple.com https://*.upstash.io${umamiOrigin ? ` ${umamiOrigin}` : ""}`,
            "frame-ancestors 'none'",
            "base-uri 'self'",
            "form-action 'self' https://appleid.apple.com",
          ].join("; "),
        },
      ],
    },
  ],
};

export default nextConfig;
