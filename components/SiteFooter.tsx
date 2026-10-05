import Link from "next/link";
import type { Locale } from "@/config/site";
import { AnalyticsLink } from "@/components/analytics/AnalyticsLink";
import { BrandLockup } from "@/components/BrandLockup";
import { hasFaq, hasGuides, siteConfig } from "@/config/site";

const copy = {
  "zh-TW": {
    tagline: "福岡房地產服務｜",
    navigation: "網站導覽",
    contact: "聯絡方式",
    legal: "法律資訊",
    services: "服務",
    rent: "租屋服務",
    buySell: "房產買賣",
    management: "物業管理",
    living: "生活支援",
    guides: "指南",
    help: "常見問題",
    tools: "費用估算",
    about: "關於我們",
    privacy: "隱私政策",
    disclaimer: "免責聲明",
    terms: "使用條款",
    consultation: "免費諮詢",
    copyright: "網站內容版權所有。",
    licence: "宅地建物取引業免許",
    telephone: "電話",
  },
  ja: {
    tagline: "福岡の不動産サービス｜",
    navigation: "サイト案内",
    contact: "お問い合わせ",
    legal: "法的情報",
    services: "サービス",
    rent: "賃貸",
    buySell: "不動産売買",
    management: "物件管理",
    living: "生活サポート",
    guides: "ガイド",
    help: "よくある質問",
    tools: "費用の概算",
    about: "会社概要",
    privacy: "プライバシーポリシー",
    disclaimer: "免責事項",
    terms: "利用規約",
    consultation: "無料相談",
    copyright: "無断転載・複製を禁じます。",
    licence: "宅地建物取引業免許",
    telephone: "電話",
  },
  en: {
    tagline: "Fukuoka real estate services in ",
    navigation: "Explore",
    contact: "Contact",
    legal: "Legal",
    services: "Services",
    rent: "Rental",
    buySell: "Buy & Sell",
    management: "Property Management",
    living: "Living Support",
    guides: "Guides",
    help: "FAQ",
    tools: "Cost Estimators",
    about: "About",
    privacy: "Privacy",
    disclaimer: "Disclaimer",
    terms: "Terms",
    consultation: "Free Consultation",
    copyright: "All rights reserved. Unauthorised reproduction is prohibited.",
    licence: "Real estate brokerage licence",
    telephone: "Telephone",
  },
} as const;

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const telephone = locale === "ja" ? siteConfig.contact.telephone : siteConfig.contact.telephoneInternational;

  return (
    <footer className="fi-footer">
      <div className="fi-shell">
        <div className="fi-footer__grid">
          <div className="fi-footer__brand">
            <BrandLockup layout="stacked" tone="light" />
            <p>{t.tagline}{locale === "en" ? siteConfig.company_profile.languages.en : siteConfig.company_profile.languagesShort[locale]}</p>
          </div>
          <nav className="fi-footer__links" aria-label={t.navigation}>
            <div>
              <h2>{t.navigation}</h2>
              <ul>
                <li><Link href={`/${locale}/services`}>{t.services}</Link></li>
                {hasGuides(locale) ? <li><Link href={`/${locale}/guides`}>{t.guides}</Link></li> : null}
                {locale === "ja" ? <li><Link href="/en/guides">ガイド記事（中国語・英語）</Link></li> : null}
                {hasFaq(locale) ? <li><Link href={`/${locale}/help`}>{t.help}</Link></li> : null}
                <li><Link href={`/${locale}/tools`}>{t.tools}</Link></li>
                <li><Link href={`/${locale}/about`}>{t.about}</Link></li>
              </ul>
            </div>
            <div>
              <h2>{t.services}</h2>
              <ul>
                <li><Link href={`/${locale}/services/rent`}>{t.rent}</Link></li>
                <li><Link href={`/${locale}/services/buy-sell`}>{t.buySell}</Link></li>
                <li><Link href={`/${locale}/services/property-management`}>{t.management}</Link></li>
                <li><Link href={`/${locale}/services/living-support`}>{t.living}</Link></li>
              </ul>
            </div>
            <div>
              <h2>{t.contact}</h2>
              <ul>
                <li><Link href={`/${locale}/contact`}>{t.consultation}</Link></li>
                <li><AnalyticsLink href={siteConfig.contact.line} target="_blank" rel="noreferrer" event={{ name: "contact_channel_click", locale, source: "footer", channel: "line" }}>LINE</AnalyticsLink></li>
                <li><AnalyticsLink href={siteConfig.contact.whatsapp} target="_blank" rel="noreferrer" event={{ name: "contact_channel_click", locale, source: "footer", channel: "whatsapp" }}>WhatsApp</AnalyticsLink></li>
                <li><a href={siteConfig.contact.telephoneHref} aria-label={`${t.telephone} ${telephone}`}>{telephone}</a></li>
                <li><AnalyticsLink href={`mailto:${siteConfig.contact.email}`} event={{ name: "contact_channel_click", locale, source: "footer", channel: "email" }}>{siteConfig.contact.email}</AnalyticsLink></li>
                <li><a href={siteConfig.contact.instagram} target="_blank" rel="noreferrer">Instagram</a></li>
              </ul>
            </div>
            <div>
              <h2>{t.legal}</h2>
              <ul>
                <li><Link href={`/${locale}/privacy`}>{t.privacy}</Link></li>
                <li><Link href={`/${locale}/disclaimer`}>{t.disclaimer}</Link></li>
                <li><Link href={`/${locale}/terms`}>{t.terms}</Link></li>
                <li><a href={siteConfig.contact.mainSite} target="_blank" rel="noreferrer">fukuokainsider.com</a></li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="fi-footer__bottom">
          <p>
            <span>{siteConfig.company}</span>
            <span>{t.licence} {siteConfig.contact.licence}</span>
            <span>{locale === "en" ? siteConfig.contact.addressEn : siteConfig.contact.address}</span>
          </p>
          <p className="fi-footer__copyright"><span>© {new Date().getFullYear()} {siteConfig.company}</span> <span>{t.copyright}</span></p>
        </div>
      </div>
    </footer>
  );
}
