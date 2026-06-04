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
  // @react-pdf/renderer ships native modules and prebuilt binaries that don't
  // play well with the bundler — externalize so Vercel runs it from
  // node_modules at runtime instead of trying to inline it into the lambda.
  serverExternalPackages: ["@react-pdf/renderer"],
  // The spiritual-bouquet PDF embeds EB Garamond (public/fonts/*.ttf) so it
  // can render Polish and other Latin-Extended names; react-pdf reads each
  // face from disk at render time via fontkit.open(<path>). That path is
  // computed at runtime (process.cwd()/public/fonts/...), so Next's static
  // tracer can't see it and won't bundle the .ttf files into the serverless
  // function — without this, the two /api/bouquet routes would 500 in
  // production with a missing-font error. Force the fonts into the trace.
  // The global "/*" key (rather than the bracketed bouquet route paths, which
  // are easy to mis-escape for picomatch) is the documented can't-miss option;
  // the files are tiny and only actually loaded by the bouquet routes.
  outputFileTracingIncludes: {
    "/*": ["./public/fonts/*.ttf"],
  },
  redirects: async () => [
    {
      source: "/:path*",
      has: [{ type: "host", value: "www.prayertrains.com" }],
      destination: "https://prayertrains.com/:path*",
      permanent: true,
    },
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
