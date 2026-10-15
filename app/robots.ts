import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

// Public since launch (Danny 2026-10-15).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/stats"] },
    sitemap: `${siteConfig.siteUrl}${siteConfig.basePath}/sitemap.xml`,
  };
}
