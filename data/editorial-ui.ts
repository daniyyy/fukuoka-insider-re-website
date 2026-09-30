import type { FaqLocale } from "@/config/site";
import type { FaqCategory, GuideLocale } from "@/lib/content/types";

export const guidesUi = {
  "zh-TW": {
    title: "福岡房地產與生活指南", heroTitle: "福岡房地產\n與生活指南", intro: "以實際需要整理租屋、買房、物業管理及福岡生活資訊。", featured: "精選指南", categories: "依主題瀏覽", latest: "最新指南", allGuides: "所有指南", all: "全部", showAll: "顯示全部 {n} 篇", draftPreview: "未發布（只在本機預覽顯示）", read: "閱讀指南", categoryBack: "所有指南", related: "相關指南", service: "相關房地產服務", serviceCta: "查看服務", published: "發布", updated: "更新", companyAuthor: "Fukuoka Insider Real Estate", consultation: "需要個別協助？", consultationBody: "指南提供一般資訊；實際物件、申請及交易條件需要按個別情況確認。", consultationCta: "免費諮詢", noArticles: "這個主題暫時沒有已發布的指南。", noArticlesAll: "指南文章正在準備中。", browseServices: "查看房地產服務", browseHelp: "查看常見問題",
  },
  en: {
    title: "Fukuoka Property & Living Guides", heroTitle: "Fukuoka property\n& living guides", intro: "Practical information about renting, buying, property management, and everyday life in Fukuoka.", featured: "Featured Guides", categories: "Browse by topic", latest: "Latest Guides", allGuides: "All Guides", all: "All", showAll: "Show all {n} guides", draftPreview: "Unpublished (local preview only)", read: "Read guide", categoryBack: "All Guides", related: "Related Guides", service: "Relevant real-estate service", serviceCta: "View service", published: "Published", updated: "Updated", companyAuthor: "Fukuoka Insider Real Estate", consultation: "Need help with your own situation?", consultationBody: "Guides provide general information. Property, application, and transaction terms require case-specific confirmation.", consultationCta: "Free Consultation", noArticles: "There are no published guides in this topic yet.", noArticlesAll: "Our first guides are being prepared.", browseServices: "View real-estate services", browseHelp: "View frequently asked questions",
  },
} satisfies Record<GuideLocale, Record<string, string>>;

export const faqCategoryLabels: Record<FaqLocale, Record<FaqCategory, string>> = {
  "zh-TW": { "overseas-clients": "人在海外", renting: "租屋", "buying-selling": "買房與賣房", "property-management": "物業管理", "living-support": "生活支援", fees: "費用", "company-contact": "公司與聯絡" },
  en: { "overseas-clients": "From overseas", renting: "Renting", "buying-selling": "Buying & selling", "property-management": "Property management", "living-support": "Living support", fees: "Fees", "company-contact": "Company & contact" },
};

/** Labels shared by the Help page, service-page FAQ and homepage FAQ. */
export const faqUi: Record<FaqLocale, {
  sectionTitle: string; allFaq: string; guideLink: string; serviceLink: (name: string) => string; homeIntro: string;
}> = {
  "zh-TW": { sectionTitle: "常見問題", allFaq: "查看全部常見問題", guideLink: "閱讀相關指南", serviceLink: (name) => `查看${name}`, homeIntro: "香港、台灣客戶最常問的問題。" },
  en: { sectionTitle: "Common questions", allFaq: "See all questions", guideLink: "Read the related guide", serviceLink: (name) => `View ${name}`, homeIntro: "What clients most often ask before getting in touch." },
};

export const helpUi: Record<FaqLocale, {
  title: string; intro: string; searchLabel: string; searchPlaceholder: string; categoriesLabel: string;
  resultCount: string; noResults: string; noResultsHelp: string; clear: string;
  contactTitle: string; contactBody: string; contactCta: string; languageNote?: string;
}> = {
  "zh-TW": { title: "常見問題", intro: "租屋、買賣、物業管理，以及人在海外時最常遇到的問題。找不到答案的話，可以直接問我們。", searchLabel: "搜尋常見問題", searchPlaceholder: "例如：保證人、初期費用、納稅管理人", categoriesLabel: "分類", resultCount: "找到 {n} 個相關問題", noResults: "找不到相符的問題", noResultsHelp: "可以換一個較短的關鍵字，或直接聯絡我們說明情況。", clear: "清除", contactTitle: "找不到您的問題？", contactBody: "直接告訴我們您的情況，我們會回覆可以怎樣協助。資料未齊，也可以先查詢。", contactCta: "免費諮詢" },
  en: { title: "Frequently asked questions", intro: "Renting, buying and selling, property management, and what to expect when you start from overseas. If your question is not here, just ask us.", searchLabel: "Search the questions", searchPlaceholder: "e.g. guarantor, move-in costs, tax agent", categoriesLabel: "Topics", resultCount: "Matching questions: {n}", noResults: "No matching questions", noResultsHelp: "Try a shorter keyword, or contact us and describe your situation.", clear: "Clear", contactTitle: "Can't find your question?", contactBody: "Tell us about your situation and we will explain how we can help. You can enquire before everything is decided.", contactCta: "Free Consultation" },
};
