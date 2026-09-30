"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnalyticsLink } from "@/components/analytics/AnalyticsLink";
import { BrandLockup } from "@/components/BrandLockup";
import { hasFaq, hasGuides, type Locale, siteConfig } from "@/config/site";

const labels = {
  "zh-TW": {
    services: "服務",
    guides: "指南",
    help: "常見問題",
    about: "關於我們",
    cta: "免費諮詢",
    ctaShort: "諮詢",
    line: "LINE",
    call: "致電",
    menuOpen: "開啟選單",
    menuClose: "關閉選單",
    navigation: "主要導覽",
    language: "語言",
  },
  ja: {
    services: "サービス",
    guides: "ガイド",
    help: "よくある質問",
    about: "会社概要",
    cta: "無料相談",
    ctaShort: "相談",
    line: "LINE",
    call: "電話",
    menuOpen: "メニューを開く",
    menuClose: "メニューを閉じる",
    navigation: "メインナビゲーション",
    language: "言語",
  },
  en: {
    services: "Services",
    guides: "Guides",
    help: "FAQ",
    about: "About",
    cta: "Free Consultation",
    ctaShort: "Contact",
    line: "LINE",
    call: "Call",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    navigation: "Main navigation",
    language: "Language",
  },
} as const;

const locales: Locale[] = ["zh-TW", "ja", "en"];
const localeNames: Record<Locale, string> = { "zh-TW": "繁中", ja: "日本語", en: "EN" };

type SiteHeaderProps = {
  locale: Locale;
  currentPath?: string;
  localePaths?: Partial<Record<Locale, string>>;
  /** "overlay" sits on a full-bleed photograph (white logo); "solid" sits on paper. */
  tone?: "overlay" | "solid";
};

export function SiteHeader({ locale, currentPath, localePaths, tone = "solid" }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const menuId = "site-mobile-menu";
  const copy = labels[locale];
  const links: [string, string][] = [
    [`/${locale}/services`, copy.services],
    ...(hasGuides(locale) ? ([[`/${locale}/guides`, copy.guides]] as [string, string][]) : []),
    ...(hasFaq(locale) ? ([[`/${locale}/help`, copy.help]] as [string, string][]) : []),
    [`/${locale}/about`, copy.about],
  ];
  const consultationHref = `/${locale}/contact`;
  const telephone = locale === "ja" ? siteConfig.contact.telephone : siteConfig.contact.telephoneInternational;

  useEffect(() => {
    const threshold = tone === "overlay" ? 140 : 8;
    const update = () => setStuck(window.scrollY > threshold);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [tone]);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);

  const onPhoto = tone === "overlay" && !stuck && !open;
  const classes = ["fi-header", `fi-header--${tone}`, stuck ? "is-stuck" : "", open ? "is-open" : ""].filter(Boolean).join(" ");

  return (
    <header className={classes}>
      <div className="fi-shell fi-header__bar">
        <Link className="fi-header__brand" href={`/${locale}/`} aria-label="Fukuoka Insider Real Estate">
          <BrandLockup tone={onPhoto || open ? "light" : "dark"} />
        </Link>
        <nav className="fi-header__nav" aria-label={copy.navigation}>
          {links.map(([href, text]) => (
            <Link className="fi-header__link" href={href} key={text}>{text}</Link>
          ))}
          <LanguageLinks currentPath={currentPath} locale={locale} localePaths={localePaths} label={copy.language} />
          <AnalyticsLink
            className="fi-button fi-button--small fi-header__cta"
            href={consultationHref}
            event={{ name: "consultation_cta_click", locale, source: "header" }}
          >
            {copy.cta}
          </AnalyticsLink>
        </nav>
        <div className="fi-header__compact">
          <AnalyticsLink
            className="fi-button fi-button--small fi-header__cta-short"
            href={consultationHref}
            event={{ name: "consultation_cta_click", locale, source: "header-compact" }}
          >
            {copy.ctaShort}
          </AnalyticsLink>
          <button
            className="fi-header__toggle"
            type="button"
            aria-label={open ? copy.menuClose : copy.menuOpen}
            aria-controls={menuId}
            aria-expanded={open}
            onClick={() => setOpen((current) => !current)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 9h16M4 15h16" />}
            </svg>
          </button>
        </div>
      </div>
      {open ? (
        <div className="fi-menu" id={menuId}>
          <nav className="fi-shell fi-menu__inner" aria-label={copy.navigation}>
            {links.map(([href, text]) => (
              <Link className="fi-menu__link" href={href} key={text} onClick={() => setOpen(false)}>{text}</Link>
            ))}
            <LanguageLinks currentPath={currentPath} locale={locale} localePaths={localePaths} label={copy.language} />
            <AnalyticsLink
              className="fi-button fi-button--light fi-menu__cta"
              href={consultationHref}
              event={{ name: "consultation_cta_click", locale, source: "mobile-menu" }}
              onClick={() => setOpen(false)}
            >
              {copy.cta}
            </AnalyticsLink>
            <div className="fi-menu__secondary">
              <AnalyticsLink
                className="fi-button fi-button--ghost-light"
                href={siteConfig.contact.line}
                target="_blank"
                rel="noreferrer"
                event={{ name: "contact_channel_click", locale, source: "mobile-menu", channel: "line" }}
              >
                {copy.line}
              </AnalyticsLink>
              <AnalyticsLink
                className="fi-button fi-button--ghost-light"
                href={siteConfig.contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                event={{ name: "contact_channel_click", locale, source: "mobile-menu", channel: "whatsapp" }}
              >
                WhatsApp
              </AnalyticsLink>
              <a className="fi-button fi-button--ghost-light" href={siteConfig.contact.telephoneHref} aria-label={`${copy.call} ${telephone}`}>
                {copy.call}
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function LanguageLinks({
  locale,
  label,
  currentPath,
  localePaths,
}: {
  locale: Locale;
  label: string;
  currentPath?: string;
  localePaths?: Partial<Record<Locale, string>>;
}) {
  return (
    <span className="fi-locale" role="group" aria-label={label}>
      {locales.map((item) => (
        <Link
          href={localePaths?.[item] ?? (currentPath ? currentPath.replace(`/${locale}`, `/${item}`) : `/${item}/`)}
          aria-current={locale === item ? "page" : undefined}
          lang={item === "zh-TW" ? "zh-Hant" : item}
          key={item}
        >
          {localeNames[item]}
        </Link>
      ))}
    </span>
  );
}
