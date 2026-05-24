import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/url";

export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Don't crawl auth flows, dashboards, individual train management
        // pages, or API routes — none of those are useful in search results.
        disallow: [
          "/api/",
          "/admin",
          "/dashboard",
          "/signin",
          "/signin/verify",
          "/p/*/manage",
          "/chain/*/manage",
          // Trailing slash + wildcard catches /create itself plus the
          // sub-flows /create/train and /chain/new isn't under /create
          // so it's listed separately above. Plain "/create" without
          // the slash matched only the bare path on some crawlers.
          "/create",
          "/create/",
          "/chain/new",
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
