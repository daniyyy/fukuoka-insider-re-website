import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

// Keep the prototype out of search results until the public launch is approved.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: `${siteConfig.basePath}/` },
  };
}
