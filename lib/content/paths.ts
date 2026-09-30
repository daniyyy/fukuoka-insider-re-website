import { siteConfig } from "@/config/site";
import type { GuideCategory, GuideLocale } from "@/lib/content/types";

export const guidePath = (locale: GuideLocale, category: GuideCategory, slug: string) => `/${locale}/guides/${category}/${slug}`;
export const guideCategoryPath = (locale: GuideLocale, category: GuideCategory) => `/${locale}/guides/${category}`;

export function absoluteSiteUrl(pathname: string) {
  const base = siteConfig.basePath === "/" ? "" : siteConfig.basePath.replace(/\/$/, "");
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteConfig.siteUrl}${base}${path}`;
}

export function formatEditorialDate(value: string, locale: GuideLocale) {
  return new Intl.DateTimeFormat(locale === "zh-TW" ? "zh-TW" : "en-GB", {
    year: "numeric",
    month: locale === "zh-TW" ? "numeric" : "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(new Date(`${value}T00:00:00+09:00`));
}
