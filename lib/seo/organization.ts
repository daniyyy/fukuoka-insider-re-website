import { siteConfig, type Locale } from "@/config/site";
import { absoluteSiteUrl } from "@/lib/content/paths";

/**
 * Company details for search engines (schema.org RealEstateAgent), built only from config/site.ts.
 * Rendered as JSON-LD on the homepage and About page.
 */
export function organizationStructuredData(locale: Locale) {
  const { contact, company } = siteConfig;
  const address = contact.postalAddress;
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": absoluteSiteUrl("/#organization"),
    name: company,
    alternateName: siteConfig.name,
    url: absoluteSiteUrl(`/${locale}`),
    logo: absoluteSiteUrl("/images/brand/logo-dark.svg"),
    image: absoluteSiteUrl("/images/office/fukuoka-insider-office.webp"),
    telephone: contact.telephoneInternational,
    faxNumber: contact.fax,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      postalCode: address.postalCode,
      addressRegion: address.region,
      addressLocality: address.locality,
      streetAddress: address.street,
      addressCountry: address.country,
    },
    openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: contact.openingHours.days, opens: contact.openingHours.opens, closes: contact.openingHours.closes }],
    hasMap: contact.map,
    areaServed: { "@type": "City", name: "Fukuoka" },
    knowsLanguage: ["yue", "cmn", "ja", "en"],
    identifier: { "@type": "PropertyValue", name: "宅地建物取引業免許", value: contact.licence },
    sameAs: [contact.instagram, contact.mainSite],
  };
}

/** JSON-LD string safe to place inside a script tag. */
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
