import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CompanyFacts } from "@/components/site/CompanyFacts";
import { ConsultBand } from "@/components/site/ConsultBand";
import { ArrowIcon } from "@/components/site/Icons";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { asset, isLocale, type Locale } from "@/config/site";
import { serviceImages, serviceOverviewCopy } from "@/data/service-pages";
import { fixedPageMetadata } from "@/lib/seo/fixed-page";

type PageProps = { params: Promise<{ locale: string }> };

const pageCopy: Record<Locale, { metaTitle: string; ctaTitle: string; ctaBody: string }> = {
  "zh-TW": { metaTitle: "福岡房地產服務", ctaTitle: "不確定需要哪一項服務？", ctaBody: "直接告訴我們您的情況，我們會為您整理下一步。資料尚未備齊，也可以先聯絡我們。" },
  ja: { metaTitle: "福岡の不動産サービス", ctaTitle: "どのサービスが合うか迷ったら", ctaBody: "ご状況をそのままお聞かせください。次に何をすればよいかを一緒に整理します。" },
  en: { metaTitle: "Fukuoka Real Estate Services", ctaTitle: "Not sure which service fits?", ctaBody: "Tell us about your situation and we will help you work out the next step. You can enquire before everything is decided." },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return fixedPageMetadata(locale, "/services", pageCopy[locale].metaTitle, serviceOverviewCopy[locale].intro, "services");
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale = value;
  const copy = serviceOverviewCopy[locale];
  const extra = pageCopy[locale];

  return (
    <div className="fi-page fi-overview">
      <SiteHeader locale={locale} currentPath={`/${locale}/services`} />
      <main id="top">
        <section className="fi-overview-hero" aria-labelledby="overview-title">
          <div className="fi-shell fi-overview-hero__grid">
            <h1 className="fi-overview-hero__title" id="overview-title">
              {copy.title.split("\n").map((line) => <span key={line}>{line}</span>)}
            </h1>
            <div className="fi-overview-hero__aside">
              <p className="fi-lead">{copy.intro}</p>
              <nav aria-label={copy.jumpLabel}>
                <ul className="fi-overview-index">
                  {copy.items.map((item) => (
                    <li key={item.key}>
                      <a href={`#${item.key}`}>
                        <span>{item.title}</span>
                        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v13M6 12l6 6 6-6" /></svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </section>

        <div className="fi-overview-list">
          {copy.items.map((item, index) => {
            const image = serviceImages[item.key];
            return (
              <section className={index % 2 ? "fi-overview-item fi-overview-item--reverse" : "fi-overview-item"} id={item.key} aria-labelledby={`${item.key}-title`} key={item.key}>
                <div className="fi-shell fi-overview-item__grid">
                  <Link className="fi-overview-item__media" href={`/${locale}${item.route}`} tabIndex={-1} aria-hidden="true">
                    <Image src={asset(image.src)} alt="" width={image.width} height={image.height} loading={index === 0 ? undefined : "lazy"} sizes="(min-width: 1100px) 58vw, 100vw" />
                  </Link>
                  <div className="fi-overview-item__copy">
                    <p className="fi-overview-item__audience"><span>{copy.suitable}</span>{item.audience}</p>
                    <h2 className="fi-overview-item__title" id={`${item.key}-title`}>{item.title}</h2>
                    <p className="fi-body">{item.description}</p>
                    <Link className="fi-button fi-button--outline" href={`/${locale}${item.route}`}>
                      {locale === "zh-TW" ? `${copy.action}${item.title}` : <>{copy.action}<span className="fi-visually-hidden">{`: ${item.title}`}</span></>}
                      <ArrowIcon />
                    </Link>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <CompanyFacts locale={locale} />
        <ConsultBand locale={locale} title={extra.ctaTitle} body={extra.ctaBody} source="service-page" />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
