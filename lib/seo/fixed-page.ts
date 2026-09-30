import type { Metadata } from "next";

import { siteConfig, type Locale } from "@/config/site";
import { absoluteSiteUrl } from "@/lib/content/paths";

export type OgKey = "home" | "services" | "rent" | "buy-sell" | "property-management" | "living-support" | "about" | "contact" | "help" | "tools" | "guides";

/** Absolute URL of the social-sharing image for a page (public/og/<locale>/<key>.jpg). */
export const ogImageUrl = (locale: Locale, key: OgKey = "home") => absoluteSiteUrl(`/og/${locale}/${key}.jpg`);

export function fixedPageMetadata(locale: Locale, route: string, title: string, description: string, ogKey: OgKey = "home", draftLegal = false): Metadata {
  const path = (language: Locale) => `/${language}${route}`;
  const canonical = absoluteSiteUrl(path(locale));
  const image = { url: ogImageUrl(locale, ogKey), width: 1200, height: 630, alt: title };
  return {
    title: `${title} | Fukuoka Insider`,
    description,
    alternates: { canonical, languages: Object.fromEntries(siteConfig.locales.map((language) => [language, absoluteSiteUrl(path(language))])) },
    openGraph: { title, description, url: canonical, siteName: siteConfig.name, type: "website", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
    ...(draftLegal ? { robots: { index: false, follow: false } } : {}),
  };
}
