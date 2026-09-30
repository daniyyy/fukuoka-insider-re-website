import type { FaqItem, Guide } from "./types";

type EditorialSource = { guides: readonly Guide[]; faqItems: readonly FaqItem[] };

const validDate = (value: string | undefined) => {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
};
export const faqTokens = ["languages", "licence", "associationName", "hours", "closed", "address", "access"];
const hasText = (value: string | undefined) => Boolean(value?.trim());

export function contentValidationErrors(source: EditorialSource): string[] {
  const errors: string[] = [];
  const guideIds = new Set<string>();
  const localSlugs = new Set<string>();
  const pairing = new Set<string>();
  const featuredPositions = new Set<string>();

  for (const guide of source.guides) {
    if (guideIds.has(guide.id)) errors.push(`Duplicate Guide id: ${guide.id}`);
    guideIds.add(guide.id);
    const route = `${guide.locale}/${guide.category}/${guide.slug}`;
    if (localSlugs.has(route)) errors.push(`Duplicate Guide route: ${route}`);
    localSlugs.add(route);
    const translationKey = `${guide.canonicalKey}/${guide.locale}`;
    if (pairing.has(translationKey)) errors.push(`Duplicate Guide translation: ${translationKey}`);
    pairing.add(translationKey);
    if (!hasText(guide.title) || !hasText(guide.excerpt) || !guide.body.length) errors.push(`Guide ${guide.id} needs title, summary, and body`);
    if (guide.coverImage !== undefined && (!guide.coverImage.startsWith("/images/") || !hasText(guide.coverAlt))) errors.push(`Guide ${guide.id} has an unsupported image path or missing image alt text`);
    if (guide.featured && !guide.coverImage) errors.push(`Featured Guide ${guide.id} needs a photograph`);
    if (guide.status === "published") {
      if (!validDate(guide.publishedAt) || !validDate(guide.editorialApprovedAt)) errors.push(`Published Guide ${guide.id} needs publication and editorial approval dates`);
    } else if (guide.publishedAt) {
      errors.push(`Unpublished Guide ${guide.id} must not carry a public publication date`);
    }
    if (guide.featured && guide.featuredOrder !== undefined) {
      if (!Number.isInteger(guide.featuredOrder) || guide.featuredOrder < 1) errors.push(`Guide ${guide.id} has invalid featured order`);
      const position = `${guide.locale}/${guide.featuredOrder}`;
      if (featuredPositions.has(position)) errors.push(`Duplicate featured order: ${position}`);
      featuredPositions.add(position);
    }
  }

  const faqIds = new Set<string>();
  for (const item of source.faqItems) {
    if (faqIds.has(item.id)) errors.push(`Duplicate FAQ id: ${item.id}`);
    faqIds.add(item.id);
    if (!hasText(item.question) || !hasText(item.answer)) errors.push(`FAQ ${item.id} needs question and answer`);
    for (const token of item.answer.match(/\{[^}]*\}/g) ?? []) {
      if (!faqTokens.includes(token.slice(1, -1))) errors.push(`FAQ ${item.id} uses unknown token ${token}`);
    }
    // Company facts belong in config/site.ts; FAQ answers reference them through tokens.
    if (/021270|753-5662|2042-2394|@fukuokainsider|大手門1-5-2/.test(item.answer)) errors.push(`FAQ ${item.id} hard-codes company details; use a token`);
  }
  const published = source.faqItems.filter((item) => item.published);
  const keysByLocale = new Map<string, Set<string>>();
  for (const item of published) {
    if (!keysByLocale.has(item.locale)) keysByLocale.set(item.locale, new Set());
    keysByLocale.get(item.locale)!.add(item.key);
  }
  const allKeys = new Set(published.map((item) => item.key));
  for (const [locale, keys] of keysByLocale) {
    for (const key of allKeys) if (!keys.has(key)) errors.push(`FAQ ${key} is missing in ${locale}`);
  }
  return errors;
}

export function validateContentSource(source: EditorialSource): void {
  const errors = contentValidationErrors(source);
  if (errors.length) throw new Error(`Editorial content validation failed:\n${errors.join("\n")}`);
}
