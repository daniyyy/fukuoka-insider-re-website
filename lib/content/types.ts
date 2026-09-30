export const guideLocales = ["zh-TW", "en"] as const;
export type GuideLocale = (typeof guideLocales)[number];

export const guideCategories = [
  "renting",
  "buying",
  "selling",
  "property-management",
  "taxes-procedures",
  "living-in-fukuoka",
] as const;
export type GuideCategory = (typeof guideCategories)[number];

export type GuideStatus = "draft" | "ready-for-review" | "published" | "archived";

export type GuideBodyBlock =
  | { type: "heading"; id: string; text: string; level?: 2 | 3 }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "quote"; text: string };

export type Guide = {
  id: string;
  canonicalKey: string;
  locale: GuideLocale;
  slug: string;
  category: GuideCategory;
  title: string;
  excerpt: string;
  body: GuideBodyBlock[];
  status: GuideStatus;
  /** Recorded only after explicit editorial approval; required before public exposure. */
  editorialApprovedAt?: string;
  publishedAt?: string;
  updatedAt?: string;
  featured: boolean;
  featuredOrder?: number;
  /** Photograph for featured placements; guides without one are shown as text-led index rows. */
  coverImage?: string;
  coverAlt?: string;
  /** Social-sharing image (1200×630). */
  ogImage?: string;
  tags: string[];
  seoTitle?: string;
  seoDescription?: string;
  author?: string;
  relatedGuideIds?: string[];
  serviceContext?: "rent" | "buy-sell" | "property-management" | "living-support";
};

export type GuideSummary = Pick<
  Guide,
  "id" | "canonicalKey" | "locale" | "slug" | "category" | "title" | "excerpt" | "publishedAt" | "coverImage" | "coverAlt" | "serviceContext" | "featured"
>;

export const faqCategories = [
  "overseas-clients",
  "renting",
  "buying-selling",
  "property-management",
  "living-support",
  "fees",
  "company-contact",
] as const;
export type FaqCategory = (typeof faqCategories)[number];
export type FaqServiceKey = NonNullable<Guide["serviceContext"]>;
export type FaqToolKey = "rental-initial-cost" | "purchase-cost";

export type FaqItem = {
  id: string;
  /** Shared across languages; used as the page anchor (#q-<key>). */
  key: string;
  locale: "zh-TW" | "en";
  category: FaqCategory;
  question: string;
  /** Lines starting with "- " are list items; other lines are paragraphs. May contain company tokens. */
  answer: string;
  tags: string[];
  order: number;
  published: boolean;
  featured?: boolean;
  relatedService?: FaqServiceKey;
  /** Service pages that show this question. */
  showOn?: FaqServiceKey[];
  relatedTool?: FaqToolKey;
  relatedGuideCanonicalKey?: string;
};

export const isGuideLocale = (value: string): value is GuideLocale => guideLocales.includes(value as GuideLocale);
export const isGuideCategory = (value: string): value is GuideCategory => guideCategories.includes(value as GuideCategory);
