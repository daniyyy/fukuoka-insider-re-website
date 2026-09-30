import type { MetadataRoute } from "next";

import { hasFaq } from "@/config/site";

import { getAllPublishedGuideRecords, getPopulatedGuideCategories } from "@/lib/content/adapter";
import { absoluteSiteUrl, guideCategoryPath, guidePath } from "@/lib/content/paths";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fixedLocales = ["zh-TW", "ja", "en"] as const;
  const fixedRoutes = ["", "/services", "/services/rent", "/services/buy-sell", "/services/property-management", "/services/living-support", "/about", "/contact", "/help", "/tools", "/tools/rental-initial-cost", "/tools/purchase-cost"];
  const fixed = fixedLocales.flatMap((locale) => fixedRoutes.filter((route) => route !== "/help" || hasFaq(locale)).map((route) => ({ url: absoluteSiteUrl(`/${locale}${route}`), changeFrequency: "monthly" as const })));
  const guides = await getAllPublishedGuideRecords();
  const categories = (await Promise.all(["zh-TW", "en"].map(async (locale) => {
    const populated = await getPopulatedGuideCategories(locale as "zh-TW" | "en");
    return populated.map((item) => ({ url: absoluteSiteUrl(guideCategoryPath(locale as "zh-TW" | "en", item.category)), changeFrequency: "weekly" as const }));
  }))).flat();
  const editorialLanding = ["zh-TW", "en"].filter((locale) => guides.some((guide) => guide.locale === locale)).map((locale) => ({ url: absoluteSiteUrl(`/${locale}/guides`), changeFrequency: "weekly" as const }));
  const articles = guides.map((guide) => ({ url: absoluteSiteUrl(guidePath(guide.locale, guide.category, guide.slug)), lastModified: guide.updatedAt ?? guide.publishedAt, changeFrequency: "monthly" as const }));
  return [...fixed, ...editorialLanding, ...categories, ...articles].map((entry) => ({ ...entry, priority: entry.url === absoluteSiteUrl("/zh-TW") ? 1 : .7 }));
}
