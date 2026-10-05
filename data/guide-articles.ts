import { importedArticles } from "@/data/guide-articles.generated";
import type { Guide, GuideCategory, GuideLocale } from "@/lib/content/types";

/**
 * Danny's finalized Traditional Chinese articles (source: content/guides/zh-TW/*.md).
 * Wording comes from the Markdown files unchanged; only listing metadata is set here.
 * Every article stays "ready-for-review" until Danny explicitly says 發布 —
 * then add `published: "YYYY-MM-DD"` to its entry below.
 * First batch (10 articles) published on Danny's instruction, 2026-09-29. Display dates set by Danny (2026-10-05):
 * five in early August, then about one a week (at most two).
 * Remaining five published on Danny's instruction, 2026-10-05 (dates continue the weekly pattern).
 *
 * English translations (content/guides/en/*.md, Danny 2026-10-05: "translate the guides, in sync with the Chinese"):
 * an English article appears only when its Markdown exists, and it follows the Chinese publication date.
 */
const photos = {
  planning: { src: "/images/guide-planning.webp", alt: { "zh-TW": "桌上的平面圖、鑰匙與筆記本", en: "A floor plan, keys and a notebook on a desk" } },
  apartment: { src: "/images/rent/studio-1k.webp", alt: { "zh-TW": "附小廚房的單間公寓", en: "A studio flat with a small kitchen" } },
  street: { src: "/images/guides/fukuoka-street.webp", alt: { "zh-TW": "福岡住宅區的街道與遠處的博多灣", en: "A residential street in Fukuoka with Hakata Bay in the distance" } },
} as const;

type ArticleMeta = {
  slug: string;
  category: GuideCategory;
  excerpt: string;
  /** Featured articles carry a photograph; the rest are listed as text-led index rows. */
  photo?: keyof typeof photos;
  tags: string[];
  serviceContext: Guide["serviceContext"];
  featuredOrder?: number;
  /** Set only after Danny says「發布」. Adds publishedAt and editorialApprovedAt. */
  published?: string;
  /** Listing text for the English translation. */
  en: { excerpt: string; tags: string[] };
};


const articles: ArticleMeta[] = [
  { slug: "guarantor-company-and-joint-guarantor", published: "2026-08-03", category: "renting", serviceContext: "rent", featuredOrder: 1, photo: "planning", tags: ["租屋", "保證公司", "申請"],
    excerpt: "連帶保證人和保證公司有什麼分別？為什麼預繳租金也不能代替保證公司審查？",
    en: { excerpt: "What is the difference between a joint guarantor and a guarantee company, and why can't paying rent in advance replace a guarantee company's screening?", tags: ["renting", "guarantee company", "application"] } },
  { slug: "rental-initial-costs-reikin-shikikin", published: "2026-08-03", category: "renting", serviceContext: "rent", featuredOrder: 2, photo: "apartment", tags: ["租屋", "初期費用"],
    excerpt: "月租 6 萬日圓，初期費用卻接近 30 萬？逐項拆解敷金、禮金與報價單上的其他費用。",
    en: { excerpt: "A monthly rent of ¥60,000 but initial costs of nearly ¥300,000? A line-by-line breakdown of the deposit, key money and the other costs on your quote.", tags: ["renting", "initial costs"] } },
  { slug: "fukuoka-late-night-garbage-collection", published: "2026-08-03", category: "living-in-fukuoka", serviceContext: "living-support", featuredOrder: 3, photo: "street", tags: ["福岡生活", "垃圾", "選房"],
    excerpt: "福岡在深夜收垃圾。租屋前看清楚大樓的垃圾場類型，入住後會方便很多。",
    en: { excerpt: "Fukuoka collects rubbish late at night. Check what kind of rubbish area a building has before you rent, and life after moving in will be much easier.", tags: ["living in Fukuoka", "rubbish", "choosing a home"] } },
  { slug: "city-gas-vs-lp-gas", published: "2026-08-05", category: "living-in-fukuoka", serviceContext: "living-support", tags: ["福岡生活", "瓦斯", "選房"],
    excerpt: "同樣是瓦斯，都市瓦斯與 LP 瓦斯的費用可以差很多。租屋前如何分辨、該怎麼選。",
    en: { excerpt: "City gas and LP gas can differ a lot in cost. How to tell which a property uses before you rent, and how to choose.", tags: ["living in Fukuoka", "gas", "choosing a home"] } },
  { slug: "floor-plan-abbreviations-1k-1ldk", published: "2026-08-05", category: "renting", serviceContext: "rent", tags: ["租屋", "房型"],
    excerpt: "1K、1R、1LDK、2DK 代表什麼？經常煮中菜的話，選房型要注意哪些地方。",
    en: { excerpt: "What do 1K, 1R, 1LDK and 2DK mean, and what should you look out for when choosing a layout if you often cook Chinese food?", tags: ["renting", "floor plans"] } },
  { slug: "unfurnished-rentals-and-appliances", published: "2026-08-12", category: "renting", serviceContext: "rent", tags: ["租屋", "家具家電"],
    excerpt: "日本租屋多數不附家具。了解「設備」與「贈與設備」的分別，以及剛到福岡去哪買家電。",
    en: { excerpt: "Most rentals in Japan come unfurnished. The difference between equipment and items left for the next tenant, and where to buy appliances when you first arrive in Fukuoka.", tags: ["renting", "furniture & appliances"] } },
  { slug: "why-south-facing-homes-matter", published: "2026-09-10", category: "living-in-fukuoka", serviceContext: "rent", tags: ["福岡生活", "選房", "朝向"],
    excerpt: "日本人選房為什麼那麼重視「南向」？從晾衣、濕氣到資產價值，看看背後的實際原因。",
    en: { excerpt: "Why do Japanese people care so much about south-facing homes? From drying laundry and damp to asset value, here are the practical reasons behind it.", tags: ["living in Fukuoka", "choosing a home", "orientation"] } },
  { slug: "key-exchange-and-24-hour-support-fees", published: "2026-08-20", category: "renting", serviceContext: "rent", tags: ["租屋", "初期費用"],
    excerpt: "報價單上的換鎖費和 24 小時安心支援費，哪一項可以商量、哪一項幾乎無法避免。",
    en: { excerpt: "The lock replacement fee and 24-hour support fee on your quote: which one is open to discussion, and which is almost impossible to avoid.", tags: ["renting", "initial costs"] } },
  { slug: "shikibiki-deposit-deduction", published: "2026-08-26", category: "renting", serviceContext: "rent", tags: ["租屋", "敷引", "初期費用"],
    excerpt: "西日本常見的「敷引」是什麼？它和押金有什麼不同，遇到這類物件要留意什麼。",
    en: { excerpt: "What is shikibiki, common in western Japan? How it differs from a deposit, and what to watch out for with these properties.", tags: ["renting", "shikibiki", "initial costs"] } },
  { slug: "guarantor-company-screening-call", published: "2026-09-01", category: "renting", serviceContext: "rent", tags: ["租屋", "保證公司", "申請"],
    excerpt: "遞交申請後，保證公司通常會打電話確認。外國人常被問的問題，以及事前可以準備什麼。",
    en: { excerpt: "After you apply, the guarantee company usually calls to check your details. The questions foreigners are often asked, and what you can prepare in advance.", tags: ["renting", "guarantee company", "application"] } },
  { slug: "pet-friendly-rentals-hidden-costs", published: "2026-09-04", category: "renting", serviceContext: "rent", tags: ["租屋", "寵物"],
    excerpt: "標明「可養寵物」不等於什麼都能養。帶毛孩在福岡租屋，要預留的費用與時間。",
    en: { excerpt: "\"Pets allowed\" doesn't mean any pet is allowed. The extra costs and time to plan for when renting in Fukuoka with your pet.", tags: ["renting", "pets"] } },
  { slug: "restoration-costs-when-moving-out", published: "2026-09-16", category: "renting", serviceContext: "rent", tags: ["租屋", "退租", "原狀回復"],
    excerpt: "退租時的「原狀回復」怎樣計算？哪些費用本來不用付，哪些幾乎一定要負責。",
    en: { excerpt: "How are restoration costs worked out when you move out? Which charges you never had to pay, and which you are almost certainly responsible for.", tags: ["renting", "moving out", "restoration"] } },
  { slug: "parking-and-garage-certificates", published: "2026-09-24", category: "living-in-fukuoka", serviceContext: "living-support", tags: ["福岡生活", "停車場", "選房"],
    excerpt: "平面、機械式與自走式停車場的分別、車庫證明的規定，以及福岡各區的車位月租參考。",
    en: { excerpt: "Surface, mechanical and self-park car parks compared, the parking certificate rules, and typical monthly parking rates across Fukuoka's wards.", tags: ["living in Fukuoka", "parking", "choosing a home"] } },
  { slug: "balcony-rules-in-japanese-apartments", published: "2026-09-30", category: "renting", serviceContext: "rent", tags: ["租屋", "陽台", "大樓規約"],
    excerpt: "日本公寓的陽台屬於共用部分。可以自己裝鐵窗、放洗衣機或擺桌椅嗎？",
    en: { excerpt: "Balconies in Japanese apartments are common areas. Can you fit your own security grilles, keep a washing machine there or set out a table and chairs?", tags: ["renting", "balcony", "building rules"] } },
  { slug: "delivery-boxes-in-fukuoka", published: "2026-10-05", category: "living-in-fukuoka", serviceContext: "living-support", tags: ["福岡生活", "宅配", "選房"],
    excerpt: "經常網購的話，大樓有沒有宅配盒子差很多。沒有的話，還有什麼辦法。",
    en: { excerpt: "If you shop online often, whether your building has delivery lockers makes a big difference. If it doesn't, here are your other options.", tags: ["living in Fukuoka", "home delivery", "choosing a home"] } },
];

const toGuide = (meta: ArticleMeta, locale: GuideLocale): Guide | null => {
  const article = importedArticles[`${locale}/${meta.slug}`];
  if (!article) {
    if (locale === "zh-TW") throw new Error(`Missing imported article: ${meta.slug}`);
    return null;
  }
  const en = locale === "en";
  return {
    id: `article-${meta.slug}-${en ? "en" : "zh"}`,
    canonicalKey: `article-${meta.slug}`,
    locale,
    slug: meta.slug,
    category: meta.category,
    title: article.title,
    excerpt: en ? meta.en.excerpt : meta.excerpt,
    body: article.body,
    status: meta.published ? "published" : "ready-for-review",
    publishedAt: meta.published,
    editorialApprovedAt: meta.published,
    featured: meta.featuredOrder !== undefined,
    featuredOrder: meta.featuredOrder === undefined ? undefined : meta.featuredOrder + 10,
    coverImage: meta.photo ? photos[meta.photo].src : undefined,
    coverAlt: meta.photo ? photos[meta.photo].alt[locale] : undefined,
    // The per-article share images carry the Chinese title; English articles use the photo or the English Guides image.
    ogImage: en ? undefined : `/og/guides/${meta.slug}.jpg`,
    tags: en ? meta.en.tags : meta.tags,
    author: "Fukuoka Insider Real Estate",
    serviceContext: meta.serviceContext,
  };
};

export const importedGuides: Guide[] = articles.flatMap((meta) =>
  (["zh-TW", "en"] as const).map((locale) => toGuide(meta, locale)).filter((guide): guide is Guide => guide !== null),
);
