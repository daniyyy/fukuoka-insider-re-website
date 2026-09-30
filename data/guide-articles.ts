import { importedArticles } from "@/data/guide-articles.generated";
import type { Guide, GuideCategory } from "@/lib/content/types";

/**
 * Danny's finalized Traditional Chinese articles (source: content/guides/zh-TW/*.md).
 * Wording comes from the Markdown files unchanged; only listing metadata is set here.
 * Every article stays "ready-for-review" until Danny explicitly says 發布 —
 * then add `published: "YYYY-MM-DD"` to its entry below.
 * First batch (10 articles) published on Danny's instruction, 2026-09-29.
 */
const photos = {
  planning: { src: "/images/guide-planning.webp", alt: "桌上的平面圖、鑰匙與筆記本" },
  apartment: { src: "/images/rent/studio-1k.webp", alt: "附小廚房的單間公寓" },
  street: { src: "/images/guides/fukuoka-street.webp", alt: "福岡住宅區的街道與遠處的博多灣" },
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
};


const articles: ArticleMeta[] = [
  { slug: "guarantor-company-and-joint-guarantor", published: "2026-09-29", category: "renting", serviceContext: "rent", featuredOrder: 1, photo: "planning", tags: ["租屋", "保證公司", "申請"],
    excerpt: "連帶保證人和保證公司有什麼分別？為什麼預繳租金也不能代替保證公司審查？" },
  { slug: "rental-initial-costs-reikin-shikikin", published: "2026-09-29", category: "renting", serviceContext: "rent", featuredOrder: 2, photo: "apartment", tags: ["租屋", "初期費用"],
    excerpt: "月租 6 萬日圓，初期費用卻接近 30 萬？逐項拆解敷金、禮金與報價單上的其他費用。" },
  { slug: "fukuoka-late-night-garbage-collection", published: "2026-09-29", category: "living-in-fukuoka", serviceContext: "living-support", featuredOrder: 3, photo: "street", tags: ["福岡生活", "垃圾", "選房"],
    excerpt: "福岡在深夜收垃圾。租屋前看清楚大樓的垃圾場類型，入住後會方便很多。" },
  { slug: "city-gas-vs-lp-gas", published: "2026-09-29", category: "living-in-fukuoka", serviceContext: "living-support", tags: ["福岡生活", "瓦斯", "選房"],
    excerpt: "同樣是瓦斯，都市瓦斯與 LP 瓦斯的費用可以差很多。租屋前如何分辨、該怎麼選。" },
  { slug: "floor-plan-abbreviations-1k-1ldk", published: "2026-09-29", category: "renting", serviceContext: "rent", tags: ["租屋", "房型"],
    excerpt: "1K、1R、1LDK、2DK 代表什麼？經常煮中菜的話，選房型要注意哪些地方。" },
  { slug: "unfurnished-rentals-and-appliances", published: "2026-09-29", category: "renting", serviceContext: "rent", tags: ["租屋", "家具家電"],
    excerpt: "日本租屋多數不附家具。了解「設備」與「贈與設備」的分別，以及剛到福岡去哪買家電。" },
  { slug: "why-south-facing-homes-matter", category: "living-in-fukuoka", serviceContext: "rent", tags: ["福岡生活", "選房", "朝向"],
    excerpt: "日本人選房為什麼那麼重視「南向」？從晾衣、濕氣到資產價值，看看背後的實際原因。" },
  { slug: "key-exchange-and-24-hour-support-fees", published: "2026-09-29", category: "renting", serviceContext: "rent", tags: ["租屋", "初期費用"],
    excerpt: "報價單上的換鎖費和 24 小時安心支援費，哪一項可以商量、哪一項幾乎無法避免。" },
  { slug: "shikibiki-deposit-deduction", published: "2026-09-29", category: "renting", serviceContext: "rent", tags: ["租屋", "敷引", "初期費用"],
    excerpt: "西日本常見的「敷引」是什麼？它和押金有什麼不同，遇到這類物件要留意什麼。" },
  { slug: "guarantor-company-screening-call", published: "2026-09-29", category: "renting", serviceContext: "rent", tags: ["租屋", "保證公司", "申請"],
    excerpt: "遞交申請後，保證公司通常會打電話確認。外國人常被問的問題，以及事前可以準備什麼。" },
  { slug: "pet-friendly-rentals-hidden-costs", published: "2026-09-29", category: "renting", serviceContext: "rent", tags: ["租屋", "寵物"],
    excerpt: "標明「可養寵物」不等於什麼都能養。帶毛孩在福岡租屋，要預留的費用與時間。" },
  { slug: "restoration-costs-when-moving-out", category: "renting", serviceContext: "rent", tags: ["租屋", "退租", "原狀回復"],
    excerpt: "退租時的「原狀回復」怎樣計算？哪些費用本來不用付，哪些幾乎一定要負責。" },
  { slug: "parking-and-garage-certificates", category: "living-in-fukuoka", serviceContext: "living-support", tags: ["福岡生活", "停車場", "選房"],
    excerpt: "平面、機械式與自走式停車場的分別、車庫證明的規定，以及福岡各區的車位月租參考。" },
  { slug: "balcony-rules-in-japanese-apartments", category: "renting", serviceContext: "rent", tags: ["租屋", "陽台", "大樓規約"],
    excerpt: "日本公寓的陽台屬於共用部分。可以自己裝鐵窗、放洗衣機或擺桌椅嗎？" },
  { slug: "delivery-boxes-in-fukuoka", category: "living-in-fukuoka", serviceContext: "living-support", tags: ["福岡生活", "宅配", "選房"],
    excerpt: "經常網購的話，大樓有沒有宅配盒子差很遠。沒有的話，還有什麼辦法。" },
];

export const importedGuides: Guide[] = articles.map((meta) => {
  const article = importedArticles[`zh-TW/${meta.slug}`];
  if (!article) throw new Error(`Missing imported article: ${meta.slug}`);
  return {
    id: `article-${meta.slug}-zh`,
    canonicalKey: `article-${meta.slug}`,
    locale: "zh-TW",
    slug: meta.slug,
    category: meta.category,
    title: article.title,
    excerpt: meta.excerpt,
    body: article.body,
    status: meta.published ? "published" : "ready-for-review",
    publishedAt: meta.published,
    editorialApprovedAt: meta.published,
    featured: meta.featuredOrder !== undefined,
    featuredOrder: meta.featuredOrder === undefined ? undefined : meta.featuredOrder + 10,
    coverImage: meta.photo ? photos[meta.photo].src : undefined,
    coverAlt: meta.photo ? photos[meta.photo].alt : undefined,
    ogImage: `/og/guides/${meta.slug}.jpg`,
    tags: meta.tags,
    author: "Fukuoka Insider Real Estate",
    serviceContext: meta.serviceContext,
  };
});
