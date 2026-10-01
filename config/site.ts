export const siteConfig = {
  name: "Fukuoka Insider Real Estate",
  company: "株式会社Fukuoka Insider",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.fukuokainsider.com",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "/re",
  contact: {
    address: "〒810-0074 福岡県福岡市中央区大手門1-5-2 九州外語ビル1階1号",
    telephone: "092-753-5662",
    telephoneInternational: "+81 92-753-5662",
    telephoneHref: "tel:+81927535662",
    fax: "092-753-5663",
    licence: "福岡県知事（1）第021270号",
    email: "danny@fukuokainsider.jp",
    line: "https://lin.ee/vyx5daI",
    /** LINE Official Account basic ID (from the lin.ee link); used to open a chat with a prefilled message. */
    lineId: "@089vsqyn",
    whatsapp: "https://wa.me/818020422394",
    whatsappNumber: "+81 80-2042-2394",
    instagram: "https://www.instagram.com/fukuoka_insider/",
    consultation: "https://forms.gle/HPd8JW1RTgzNTWfK9",
    mainSite: "https://www.fukuokainsider.com/",
    instagramHandle: "@fukuoka_insider",
    // Google Maps link to the office (Danny, 2026-09-30).
    map: "https://maps.app.goo.gl/PfbChaCKEf8jidcW7",
    /** Structured form of the address and hours, for search engines (lib/seo/organization.ts). */
    postalAddress: { postalCode: "810-0074", region: "福岡県", locality: "福岡市中央区", street: "大手門1-5-2 九州外語ビル1階1号", country: "JP" },
    openingHours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "18:00" },
  },
  company_profile: {
    established: { "zh-TW": "2024年2月", ja: "2024年2月", en: "February 2024" },
    representative: { "zh-TW": "Ricky（代表取締役）", ja: "Ricky（代表取締役）", en: "Ricky (Representative Director)" },
    association: { "zh-TW": "公益社団法人 福岡県宅地建物取引業協会 會員", ja: "公益社団法人 福岡県宅地建物取引業協会 会員", en: "Member, Fukuoka Real Estate Transaction Association" },
    associationName: { "zh-TW": "公益社団法人 福岡県宅地建物取引業協会", ja: "公益社団法人 福岡県宅地建物取引業協会", en: "Fukuoka Real Estate Transaction Association" },
    access: { "zh-TW": "福岡市地下鐵空港線「大濠公園」站，步行約 5 分鐘", ja: "福岡市地下鉄空港線「大濠公園」駅から徒歩約5分", en: "About 5 minutes' walk from Ohorikoen Station (Fukuoka City Subway Airport Line)" },
    hours: { "zh-TW": "星期一至五 10:00–18:00（日本時間）", ja: "平日 10:00〜18:00", en: "Weekdays 10:00–18:00 (Japan time)" },
    /** Office visits need an appointment (Danny, 2026-09-30). */
    visits: { "zh-TW": "來訪請先預約", ja: "ご来社は事前予約制です", en: "Visits by appointment only" },
    closed: { "zh-TW": "星期六、日及日本國定假日", ja: "土・日・祝日", en: "Saturdays, Sundays, and Japanese public holidays" },
    languages: { "zh-TW": "廣東話、普通話、日語、英語", ja: "広東語・中国語（普通話）・日本語・英語", en: "Cantonese, Mandarin, Japanese, and English" },
    languagesShort: { "zh-TW": "廣東話・普通話・日語・英語", ja: "広東語・中国語・日本語・英語", en: "Cantonese, Mandarin, Japanese, English" },
    instagramFollowers: { "zh-TW": "約 8 萬人追蹤", ja: "フォロワー約8万人", en: "About 80,000 followers" },
  },
  locales: ["zh-TW", "ja", "en"] as const,
  /**
   * Languages whose navigation links to Guides. Guides are written for Hong Kong / Taiwan readers (zh-TW).
   * Japanese Guides are not planned; add "en" here once English articles are published.
   */
  guideLocales: ["zh-TW"] as const,
  /** Languages with an FAQ (Help page, FAQ blocks on home and service pages). Danny, 2026-09-30: no Japanese FAQ. */
  faqLocales: ["zh-TW", "en"] as const,
} as const;

export type Locale = (typeof siteConfig.locales)[number];
export const isLocale = (value: string): value is Locale => siteConfig.locales.includes(value as Locale);
export const hasGuides = (locale: string) => (siteConfig.guideLocales as readonly string[]).includes(locale);
export type FaqLocale = (typeof siteConfig.faqLocales)[number];
export const hasFaq = (locale: string): locale is FaqLocale => (siteConfig.faqLocales as readonly string[]).includes(locale);
export const asset = (path: string) => `${siteConfig.basePath}${path}`;
