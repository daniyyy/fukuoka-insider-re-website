import { hasFaq, hasGuides, siteConfig, type FaqLocale, type Locale } from "@/config/site";
import { faqUi } from "@/data/editorial-ui";
import { serviceOverviewCopy } from "@/data/service-pages";
import { toolsCopy } from "@/data/tools";
import { getAllPublishedGuideRecords, getFaqItems } from "@/lib/content/adapter";
import { guidePath } from "@/lib/content/paths";
import type { FaqItem, FaqServiceKey } from "@/lib/content/types";

export type FaqLink = { href: string; label: string; kind: "guide" | "tool" | "service" };
/** A FAQ item ready to render: company tokens filled in, related links resolved. */
export type FaqEntryView = { id: string; anchor: string; key: string; category: FaqItem["category"]; question: string; answer: string; tags: string[]; featured: boolean; links: FaqLink[] };

const tokenValues = (locale: FaqLocale): Record<string, string> => {
  const profile = siteConfig.company_profile;
  return {
    languages: profile.languages[locale],
    licence: siteConfig.contact.licence,
    associationName: profile.associationName[locale],
    hours: profile.hours[locale],
    closed: profile.closed[locale],
    address: siteConfig.contact.address,
    access: profile.access[locale],
  };
};

export const faqAnchor = (key: string) => `q-${key}`;

export function fillFaqTokens(text: string, locale: FaqLocale) {
  const values = tokenValues(locale);
  return text.replace(/\{(\w+)\}/g, (match, name: string) => values[name] ?? match);
}

async function toViews(items: FaqItem[], locale: FaqLocale, options: { omitService?: FaqServiceKey } = {}): Promise<FaqEntryView[]> {
  const guides = hasGuides(locale) ? await getAllPublishedGuideRecords() : [];
  const ui = faqUi[locale];
  return items.map((item) => {
    const links: FaqLink[] = [];
    const guide = item.relatedGuideCanonicalKey ? guides.find((candidate) => candidate.canonicalKey === item.relatedGuideCanonicalKey && candidate.locale === locale) : undefined;
    if (guide) links.push({ kind: "guide", href: guidePath(guide.locale, guide.category, guide.slug), label: ui.guideLink });
    if (item.relatedTool) links.push({ kind: "tool", href: `/${locale}/tools/${item.relatedTool}`, label: toolsCopy[locale].tools[item.relatedTool].title });
    if (item.relatedService && item.relatedService !== options.omitService) {
      const name = serviceOverviewCopy[locale].items.find((service) => service.key === item.relatedService)?.title ?? "";
      links.push({ kind: "service", href: `/${locale}/services/${item.relatedService}`, label: ui.serviceLink(name) });
    }
    return {
      id: item.id,
      anchor: faqAnchor(item.key),
      key: item.key,
      category: item.category,
      question: fillFaqTokens(item.question, locale),
      answer: fillFaqTokens(item.answer, locale),
      tags: item.tags,
      featured: Boolean(item.featured),
      links,
    };
  });
}

// FAQ exists only for siteConfig.faqLocales; other languages get an empty list (no FAQ blocks rendered).
export async function getFaqViews(locale: Locale) {
  if (!hasFaq(locale)) return [];
  return toViews(await getFaqItems(locale), locale);
}

export async function getFeaturedFaqViews(locale: Locale, limit = 4) {
  if (!hasFaq(locale)) return [];
  return toViews((await getFaqItems(locale)).filter((item) => item.featured).slice(0, limit), locale);
}

export async function getServiceFaqViews(locale: Locale, service: FaqServiceKey, limit = 4) {
  if (!hasFaq(locale)) return [];
  const items = (await getFaqItems(locale)).filter((item) => item.showOn?.includes(service)).slice(0, limit);
  return toViews(items, locale, { omitService: service });
}

export { answerBlocks, answerPlainText, type AnswerBlock } from "@/lib/content/faq-format";
