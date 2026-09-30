import { seedFaqItems } from "@/data/faq-content";
import { importedGuides } from "@/data/guide-articles";
import { guideCategoryCopy, seedGuides } from "@/data/guide-content";
import type { Locale } from "@/config/site";
import type { FaqItem, Guide, GuideCategory, GuideLocale, GuideSummary } from "@/lib/content/types";
import { validateContentSource } from "@/lib/content/validation";

export type ContentSource = {
  guides: readonly Guide[];
  faqItems: readonly FaqItem[];
};

// Swap this object for a CMS-backed adapter without changing page components.
const localContentSource: ContentSource = {
  guides: [...seedGuides, ...importedGuides],
  faqItems: seedFaqItems,
};

validateContentSource(localContentSource);

const toSummary = (guide: Guide): GuideSummary => ({
  id: guide.id,
  canonicalKey: guide.canonicalKey,
  locale: guide.locale,
  slug: guide.slug,
  category: guide.category,
  title: guide.title,
  excerpt: guide.excerpt,
  publishedAt: guide.publishedAt,
  coverImage: guide.coverImage,
  coverAlt: guide.coverAlt,
  featured: guide.featured,
  serviceContext: guide.serviceContext,
});

const byPublishedDate = (left: Guide, right: Guide) => {
  const dateOrder = (right.publishedAt ?? "").localeCompare(left.publishedAt ?? "");
  return dateOrder || left.id.localeCompare(right.id);
};

// Local preview only (`pnpm dev`): also show "ready-for-review" Guides so Danny can read them before saying 發布.
// Production builds never include unpublished Guides.
const previewDrafts = (import.meta as { env?: { DEV?: boolean } }).env?.DEV === true;

const publishedGuides = (source: ContentSource) =>
  source.guides.filter((guide) =>
    (guide.status === "published" && guide.publishedAt && guide.editorialApprovedAt) || (previewDrafts && guide.status === "ready-for-review"),
  );

export async function getGuides(locale: GuideLocale, source: ContentSource = localContentSource): Promise<GuideSummary[]> {
  return publishedGuides(source).filter((guide) => guide.locale === locale).sort(byPublishedDate).map(toSummary);
}

export async function getFeaturedGuides(locale: GuideLocale, limit = 3, source: ContentSource = localContentSource): Promise<GuideSummary[]> {
  return publishedGuides(source)
    .filter((guide) => guide.locale === locale && guide.featured)
    .sort((left, right) => (left.featuredOrder ?? Number.MAX_SAFE_INTEGER) - (right.featuredOrder ?? Number.MAX_SAFE_INTEGER))
    .slice(0, limit)
    .map(toSummary);
}

export async function getLatestGuides(locale: GuideLocale, limit = 5, excludeIds: readonly string[] = [], source: ContentSource = localContentSource): Promise<GuideSummary[]> {
  const excluded = new Set(excludeIds);
  return publishedGuides(source)
    .filter((guide) => guide.locale === locale && !excluded.has(guide.id))
    .sort(byPublishedDate)
    .slice(0, limit)
    .map(toSummary);
}

export async function getGuidesByCategory(locale: GuideLocale, category: GuideCategory, source: ContentSource = localContentSource): Promise<GuideSummary[]> {
  return publishedGuides(source)
    .filter((guide) => guide.locale === locale && guide.category === category)
    .sort(byPublishedDate)
    .map(toSummary);
}

export async function getGuideBySlug(locale: GuideLocale, category: GuideCategory, slug: string, source: ContentSource = localContentSource): Promise<Guide | null> {
  return publishedGuides(source).find((guide) => guide.locale === locale && guide.category === category && guide.slug === slug) ?? null;
}

export async function getGuidesBySlugs(locale: GuideLocale, slugs: readonly string[], source: ContentSource = localContentSource): Promise<GuideSummary[]> {
  const available = publishedGuides(source).filter((guide) => guide.locale === locale);
  return slugs.flatMap((slug) => available.filter((guide) => guide.slug === slug)).map(toSummary);
}

export async function getGuideTranslation(guide: Guide, locale: GuideLocale, source: ContentSource = localContentSource): Promise<Guide | null> {
  return publishedGuides(source).find((candidate) => candidate.canonicalKey === guide.canonicalKey && candidate.locale === locale) ?? null;
}

export async function getRelatedGuides(guide: Guide, limit = 3, source: ContentSource = localContentSource): Promise<GuideSummary[]> {
  const available = publishedGuides(source).filter((candidate) => candidate.locale === guide.locale && candidate.id !== guide.id);
  const byId = new Map(available.map((candidate) => [candidate.id, candidate]));
  const selected: Guide[] = [];

  for (const id of guide.relatedGuideIds ?? []) {
    const candidate = byId.get(id);
    if (candidate && !selected.some((item) => item.id === candidate.id)) selected.push(candidate);
  }

  const scored = available
    .filter((candidate) => !selected.some((item) => item.id === candidate.id))
    .map((candidate) => ({
      candidate,
      score: Number(candidate.category === guide.category) * 3 + candidate.tags.filter((tag) => guide.tags.includes(tag)).length,
    }))
    .sort((left, right) => right.score - left.score || byPublishedDate(left.candidate, right.candidate));

  for (const { candidate } of scored) {
    if (selected.length >= limit) break;
    selected.push(candidate);
  }

  return selected.slice(0, limit).map(toSummary);
}

export async function getPopulatedGuideCategories(locale: GuideLocale, source: ContentSource = localContentSource) {
  const populated = new Set(publishedGuides(source).filter((guide) => guide.locale === locale).map((guide) => guide.category));
  return Object.entries(guideCategoryCopy[locale])
    .filter(([category]) => populated.has(category as GuideCategory))
    .map(([category, copy]) => ({ category: category as GuideCategory, ...copy }));
}

export async function getFaqItems(locale: Locale, source: ContentSource = localContentSource): Promise<FaqItem[]> {
  return source.faqItems.filter((item) => item.locale === locale && item.published).sort((left, right) => left.order - right.order);
}

export async function getAllPublishedGuideRecords(source: ContentSource = localContentSource): Promise<Guide[]> {
  return publishedGuides(source).sort(byPublishedDate);
}
