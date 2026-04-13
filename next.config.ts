import type { NextConfig } from "next";

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
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
            "font-src 'self' https://fonts.gstatic.com",
            "img-src 'self' data: blob: https://*.public.blob.vercel-storage.com https://appleid.apple.com",
            "connect-src 'self' https://appleid.apple.com https://*.upstash.io",
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
