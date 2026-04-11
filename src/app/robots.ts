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
          "/dashboard",
          "/signin",
          "/signin/verify",
          "/p/*/manage",
          "/create",
        ],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
