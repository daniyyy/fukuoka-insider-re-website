import Link from "next/link";

import { BrandLockup } from "@/components/BrandLockup";
import { ArrowIcon } from "@/components/site/Icons";

const messages = [
  { lang: "zh-Hant", locale: "zh-TW", text: "找不到這個頁面。", home: "返回首頁", services: "服務", contact: "免費諮詢" },
  { lang: "ja", locale: "ja", text: "ページが見つかりません。", home: "トップページ", services: "サービス", contact: "無料相談" },
  { lang: "en", locale: "en", text: "We couldn't find this page.", home: "Home", services: "Services", contact: "Free Consultation" },
] as const;

export default function NotFound() {
  return (
    <div className="fi-notfound">
      <header className="fi-notfound__top">
        <div className="fi-shell">
          <Link href="/zh-TW/" aria-label="Fukuoka Insider Real Estate"><BrandLockup /></Link>
        </div>
      </header>
      <main className="fi-notfound__main">
        <div className="fi-shell">
          <p className="fi-notfound__code" aria-hidden="true">404</p>
          <h1 className="fi-visually-hidden">Page not found</h1>
          <ul className="fi-notfound__list">
            {messages.map((message) => (
              <li key={message.locale} lang={message.lang}>
                <p>{message.text}</p>
                <span className="fi-notfound__links">
                  <Link className="fi-text-link" href={`/${message.locale}/`}>{message.home}<ArrowIcon /></Link>
                  <Link className="fi-text-link" href={`/${message.locale}/services`}>{message.services}<ArrowIcon /></Link>
                  <Link className="fi-text-link" href={`/${message.locale}/contact`}>{message.contact}<ArrowIcon /></Link>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
