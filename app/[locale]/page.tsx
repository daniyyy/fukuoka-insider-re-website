import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { AnalyticsLink } from "@/components/analytics/AnalyticsLink";
import { GuideFeature } from "@/components/guides/GuideCard";
import { ServiceStage } from "@/components/site/ServiceStage";
import { serviceImages } from "@/data/service-pages";
import { HakataPanel } from "@/components/site/HakataPanel";
import { ConsultBand } from "@/components/site/ConsultBand";
import { EstimatorTeaser } from "@/components/tools/EstimatorTeaser";
import { toolsCopy } from "@/data/tools";
import { ArrowIcon as Arrow, ExternalIcon as External } from "@/components/site/Icons";
import { asset, hasGuides, isLocale, type Locale, siteConfig } from "@/config/site";
import { getFeaturedGuides } from "@/lib/content/adapter";
import { getFeaturedFaqViews } from "@/lib/content/faq";
import type { GuideLocale, GuideSummary } from "@/lib/content/types";
import { fixedPageMetadata } from "@/lib/seo/fixed-page";

type ServiceOverview = {
  title: string;
  description: string;
};

type TrustCopy = {
  heading: string;
  body: string;
  location: string;
  companyLabel: string;
  companyProof: string;
  association: string;
  professionalLabel: string;
  professionalProof: string;
  languagesLabel: string;
  languages: string;
};

type HomepageCopy = {
  /** Hero heading, one entry per line. zh-TW uses Chinese (Danny, 2026-09-30); ja/en keep the English line. */
  heroLines: string[];
  intro: string;
  cta: string;
  servicesHeading: string;
  services: ServiceOverview[];
  trust: TrustCopy;
  featured: string;
  guideIntro: string;
  faqHeading: string;
  faqBody: string;
  faqCta: string;
  allGuides: string;
  life: string;
  lifeBody: string;
  lifeCta: string;
  instagramLead: string;
  instagramCta: string;
  about: string;
  aboutBody: string;
  aboutCta: string;
  consult: string;
  consultBody: string;
  heroProof: string[];
  servicesLink: string;
};

const copy: Record<Locale, HomepageCopy> = {
  "zh-TW": {
    heroLines: ["福岡生活，", "由在地人帶路。"],
    intro: "我們在福岡為日本及海外客戶提供租屋、房產買賣與物業管理服務，可以廣東話、普通話、日語或英語與我們溝通。",
    cta: "免費諮詢",
    servicesHeading: "服務與支援",
    services: [
      { title: "租屋服務", description: "住宅、辦公室及商業空間租賃" },
      { title: "房產買賣", description: "福岡房產購買與出售諮詢" },
      { title: "物業管理", description: "出租物業與度假別墅等不常居住的物業管理" },
      { title: "生活支援", description: "入住相關生活支援及合作夥伴轉介" },
    ],
    trust: {
      heading: "我們就在福岡。",
      body: "Fukuoka Insider 在福岡設有辦公室，提供房地產服務及相關支援。",
      location: "福岡市中央區大手門",
      companyLabel: "公司宅建業免許",
      companyProof: "持有日本宅地建物取引業免許",
      association: "公益社団法人 福岡県宅地建物取引業協会 会員",
      professionalLabel: "專業支援",
      professionalProof: "由宅地建物取引士提供專業協助",
      languagesLabel: "溝通語言",
      languages: "廣東話・普通話・日語・英語",
    },
    featured: "精選指南",
    guideIntro: "福岡租屋、房產與生活相關的實用資訊。",
    faqHeading: "常見問題",
    faqBody: "查詢之前，您可能想先知道的事。",
    faqCta: "查看全部常見問題",
    allGuides: "查看全部指南",
    life: "福岡生活資訊",
    lifeBody: "想了解福岡的街區、交通和日常生活，可到 Fukuoka Insider 閱讀相關內容。",
    lifeCta: "前往 Fukuoka Insider",
    instagramLead: "我們也在 Instagram 分享福岡生活與房地產資訊。",
    instagramCta: "在 Instagram 追蹤",
    about: "一家位於福岡、服務海外客戶的房地產公司。",
    aboutBody: "Ricky 為代表取締役；Danny 定居福岡，並持有宅地建物取引士資格。",
    aboutCta: "了解公司與團隊",
    consult: "有福岡房地產需求？",
    consultBody: "想租屋、買賣房產、委託管理，或詢問入住相關支援，都可以先聯絡我們。資料尚未備齊也可以查詢。",
    heroProof: ["福岡設有辦公室", "持有日本宅建業免許", "廣東話・普通話・日語・英語"],
    servicesLink: "查看服務內容",
  },
  ja: {
    heroLines: ["Build Your Life", "in Fukuoka."],
    intro: "福岡で、国内外のお客様の賃貸・不動産売買・物件管理に対応しています。広東語・中国語（普通話）・日本語・英語でご相談いただけます。",
    cta: "無料相談",
    servicesHeading: "サービスとサポート",
    services: [
      { title: "賃貸", description: "住居・オフィス・店舗の賃貸" },
      { title: "不動産売買", description: "福岡の不動産購入・売却に関するご相談" },
      { title: "物件管理", description: "賃貸物件・別荘やセカンドハウスの管理" },
      { title: "生活サポート", description: "入居に伴う生活サポート・提携先のご紹介" },
    ],
    trust: {
      heading: "私たちは福岡にいます。",
      body: "Fukuoka Insider は福岡に事務所を構え、不動産サービスと関連サポートを提供しています。",
      location: "福岡市中央区大手門",
      companyLabel: "宅地建物取引業免許",
      companyProof: "日本の宅地建物取引業免許を取得",
      association: "公益社団法人 福岡県宅地建物取引業協会 会員",
      professionalLabel: "専門サポート",
      professionalProof: "宅地建物取引士が専門的にサポート",
      languagesLabel: "対応言語",
      languages: "広東語・中国語（普通話）・日本語・英語",
    },
    featured: "注目のガイド",
    guideIntro: "ガイド記事は繁体字中国語と英語でご覧いただけます。",
    faqHeading: "よくあるご質問",
    faqBody: "ご相談の前に、確認しておきたいことをまとめました。",
    faqCta: "よくある質問をすべて見る",
    allGuides: "すべてのガイド（英語）",
    life: "福岡の暮らしと街の情報",
    lifeBody: "福岡の街、交通、日々の暮らしに関する情報は Fukuoka Insider でご覧いただけます。",
    lifeCta: "Fukuoka Insider へ",
    instagramLead: "Instagram でも、福岡の暮らしと不動産の情報を発信しています。",
    instagramCta: "Instagram をフォロー",
    about: "福岡を拠点に、海外のお客様をサポートする不動産会社です。",
    aboutBody: "Ricky は代表取締役。Danny は福岡在住の宅地建物取引士です。",
    aboutCta: "会社とチームについて",
    consult: "福岡の不動産について相談する",
    consultBody: "賃貸、売買、物件管理、入居に関するご相談は、資料がすべて揃う前でもお問い合わせいただけます。",
    heroProof: ["福岡に事務所", "宅地建物取引業免許", "広東語・中国語・日本語・英語"],
    servicesLink: "サービスを見る",
  },
  en: {
    heroLines: ["Build Your Life", "in Fukuoka."],
    intro: "We help clients in Japan and overseas with rentals, property transactions, and management in Fukuoka. Talk to us in Cantonese, Mandarin, Japanese, or English.",
    cta: "Free Consultation",
    servicesHeading: "Services & Support",
    services: [
      { title: "Rental", description: "Homes, offices, and commercial spaces" },
      { title: "Buy & Sell", description: "Consultation for buying and selling property in Fukuoka" },
      { title: "Property Management", description: "Management for rental properties, holiday homes, and other second homes" },
      { title: "Living Support", description: "Move-in support and referrals to external partners" },
    ],
    trust: {
      heading: "We are based in Fukuoka.",
      body: "Fukuoka Insider has an office in Fukuoka and provides real-estate services and related support.",
      location: "Ōtemon, Chuo-ku, Fukuoka",
      companyLabel: "Company licence",
      companyProof: "Licensed as a real-estate business in Japan",
      association: "Member of the Fukuoka Real Estate Transaction Association",
      professionalLabel: "Professional support",
      professionalProof: "Support from a Licensed Real Estate Transaction Specialist",
      languagesLabel: "Languages",
      languages: "Cantonese, Mandarin, Japanese, and English",
    },
    featured: "Featured Guides",
    guideIntro: "Useful information about homes, property, and daily life in Fukuoka.",
    faqHeading: "Common questions",
    faqBody: "A few things you may want to know before getting in touch.",
    faqCta: "See all questions",
    allGuides: "View all guides",
    life: "Life in Fukuoka",
    lifeBody: "Visit Fukuoka Insider for practical information about neighbourhoods, transport, and everyday life in the city.",
    lifeCta: "Visit Fukuoka Insider",
    instagramLead: "We also share Fukuoka life and property updates on Instagram.",
    instagramCta: "Follow on Instagram",
    about: "A Fukuoka-based real-estate company serving clients from overseas.",
    aboutBody: "Ricky is the Representative Director. Danny lives in Fukuoka and is a Licensed Real Estate Transaction Specialist.",
    aboutCta: "About the company and team",
    consult: "Need help with property in Fukuoka?",
    consultBody: "Enquire about renting, buying, selling, management, or move-in support. You can contact us before gathering every document.",
    heroProof: ["Office in Fukuoka", "Licensed in Japan", "Cantonese, Mandarin, Japanese, English"],
    servicesLink: "View services",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = locale === "zh-TW" ? "福岡房地產服務" : locale === "ja" ? "福岡の不動産サービス" : "Real Estate Services in Fukuoka";
  return fixedPageMetadata(locale, "", title, copy[locale].intro);
}

const serviceRoutes = ["rent", "buy-sell", "property-management", "living-support"] as const;

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();

  const locale = value;
  const t = copy[locale];
  const guideLocale = hasGuides(locale) ? (locale as GuideLocale) : null;
  const featuredGuides = guideLocale ? await getFeaturedGuides(guideLocale, 3) : [];
  const faq = await getFeaturedFaqViews(locale, 4);
  const alt = (zh: string, ja: string, en: string) => (locale === "zh-TW" ? zh : locale === "ja" ? ja : en);

  return (
    <div className={`fi-home fi-home--${locale}`}>
      <SiteHeader locale={locale} tone="overlay" />
      <main id="top">
        <section className="fi-hero fi-on-dark" aria-labelledby="hero-title">
          <div className="fi-hero__media">
            <Image
              src={asset("/images/photos/ohori-park.webp")}
              alt={alt("大濠公園與周邊住宅區", "大濠公園と周辺の住宅街", "Ohori Park and the surrounding residential neighbourhood")}
              width={2000}
              height={1190}
              fetchPriority="high"
              sizes="100vw"
            />
          </div>
          <div className="fi-shell fi-hero__inner">
            <div className="fi-hero__content">
              <h1 className={locale === "zh-TW" ? "fi-hero__title fi-hero__title--cjk" : "fi-display fi-hero__title"} id="hero-title" lang={locale === "zh-TW" ? undefined : "en"}>
                {t.heroLines.map((line) => <span className="fi-line" key={line}><span>{line}</span></span>)}
              </h1>
              <p className="fi-hero__intro">{t.intro}</p>
              <div className="fi-hero__actions">
                <AnalyticsLink className="fi-button fi-button--light" href={`/${locale}/contact`} event={{ name: "consultation_cta_click", locale, source: "homepage-hero" }}>
                  {t.cta}
                  <Arrow />
                </AnalyticsLink>
                <a className="fi-text-link fi-hero__secondary" href="#services">{t.servicesLink}</a>
              </div>
            </div>
            <ul className="fi-hero__proof">
              {t.heroProof.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>

        <section className="fi-home-services" id="services" aria-labelledby="services-title">
          <div className="fi-shell">
            <h2 className="fi-h2" id="services-title">{t.servicesHeading}</h2>
          </div>
          <ServiceStage
            fallback={{ src: asset("/images/photos/nakasu-river.webp"), width: 1600, height: 952, alt: alt("傍晚的中洲那珂川河畔", "夕暮れの中洲・那珂川沿い", "The Naka River at Nakasu in the evening") }}
            items={t.services.map((item, index) => {
              const image = serviceImages[serviceRoutes[index]];
              return {
                title: item.title,
                description: item.description,
                href: `/${locale}/services/${serviceRoutes[index]}`,
                image: { src: asset(image.src), width: image.width, height: image.height, alt: image.alt[locale] },
              };
            })}
          />
        </section>

        {/* Estimator preview for renting and buying, right after Services (Danny, 2026-09-30). */}
        <section className="fi-home-estimate" aria-labelledby="estimate-title">
          <div className="fi-shell">
            <header className="fi-home-estimate__head">
              <h2 className="fi-h2" id="estimate-title">{toolsCopy[locale].teaser.title.split("|").map((phrase) => <span className="fi-phrase" key={phrase}>{phrase}</span>)}</h2>
              <p className="fi-body">{toolsCopy[locale].teaser.body}</p>
            </header>
            <EstimatorTeaser locale={locale} />
          </div>
        </section>

        <section className="fi-home-trust" aria-labelledby="trust-title">
          <div className="fi-shell fi-home-trust__grid">
            <figure className="fi-home-trust__photo">
              <div className="fi-frame">
              <Image
                src={asset("/images/office/fukuoka-insider-office.webp")}
                alt={alt("株式会社Fukuoka Insider 福岡辦公室的公司標誌與宅地建物取引業免許", "株式会社Fukuoka Insider 福岡事務所のロゴと宅地建物取引業免許", "Fukuoka Insider office, company logo, and real-estate business licence in Fukuoka")}
                width={900}
                height={676}
                loading="lazy"
                sizes="(min-width: 1100px) 55vw, 100vw"
              />
              </div>
              <figcaption className="fi-meta">{t.trust.location}</figcaption>
            </figure>
            <div className="fi-home-trust__copy">
              <h2 className="fi-h2" id="trust-title">{t.trust.heading}</h2>
              <p className="fi-lead">{t.trust.body}</p>
              <dl className="fi-facts">
                <div className="fi-facts__row">
                  <dt>{t.trust.companyLabel}</dt>
                  <dd>
                    <span className="fi-facts__value">{t.trust.companyProof}</span>
                    <span className="fi-meta" lang="ja">{siteConfig.contact.licence}</span>
                    <span className="fi-meta">{t.trust.association}</span>
                  </dd>
                </div>
                <div className="fi-facts__row">
                  <dt>{t.trust.professionalLabel}</dt>
                  <dd><span className="fi-facts__value">{t.trust.professionalProof}</span></dd>
                </div>
                <div className="fi-facts__row">
                  <dt>{t.trust.languagesLabel}</dt>
                  <dd><span className="fi-facts__value">{t.trust.languages}</span></dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {featuredGuides.length ? (
          <FeaturedGuides title={t.featured} intro={t.guideIntro} guides={featuredGuides} allHref={`/${locale}/guides`} allLabel={t.allGuides} />
        ) : null}

        <section className="fi-home-life" aria-labelledby="life-title">
          <div className="fi-shell">
            <div className="fi-home-life__panel">
              <HakataPanel className="fi-home-life__hakata" />
              <div className="fi-home-life__copy">
                <h2 className="fi-h2" id="life-title">{t.life}</h2>
                <p className="fi-body">{t.lifeBody}</p>
                <a className="fi-button fi-button--outline" href={siteConfig.contact.mainSite} target="_blank" rel="noreferrer">
                  {t.lifeCta}
                  <External />
                </a>
                <div className="fi-home-life__social">
                  <p className="fi-body">{t.instagramLead}</p>
                  <p className="fi-home-life__handle">
                    <a href={siteConfig.contact.instagram} target="_blank" rel="noreferrer">{siteConfig.contact.instagramHandle}</a>
                    <span>{siteConfig.company_profile.instagramFollowers[locale]}</span>
                  </p>
                  <a className="fi-text-link" href={siteConfig.contact.instagram} target="_blank" rel="noreferrer">{t.instagramCta}<External /></a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="fi-home-about" id="about" aria-labelledby="about-title">
          <div className="fi-shell fi-home-about__grid">
            <div className="fi-home-about__copy">
              <h2 className="fi-h2" id="about-title"><Phrases text={t.about} /></h2>
              <p className="fi-body">{t.aboutBody}</p>
              <Link className="fi-text-link" href={`/${locale}/about`}>{t.aboutCta}<Arrow /></Link>
            </div>
            <div className="fi-home-about__people">
              <Portrait person="ricky" alt={alt("Ricky，代表取締役", "Ricky（代表取締役）", "Ricky, Representative Director")} name="Ricky" position={locale === "en" ? "Representative Director" : "代表取締役"} />
              <Portrait person="danny" alt={alt("Danny，宅地建物取引士", "Danny（宅地建物取引士）", "Danny, Licensed Real Estate Transaction Specialist")} name="Danny" position={locale === "en" ? "Licensed Real Estate Transaction Specialist" : "宅地建物取引士"} />
            </div>
          </div>
        </section>

        {faq.length ? (
          <section className="fi-home-faqs" id="faq" aria-labelledby="faq-title">
            <div className="fi-shell fi-home-faqs__grid">
              <div className="fi-home-faqs__head">
                <h2 className="fi-h2" id="faq-title">{t.faqHeading}</h2>
                <p className="fi-body">{t.faqBody}</p>
                <Link className="fi-text-link" href={`/${locale}/help`}>{t.faqCta}<Arrow /></Link>
              </div>
              <ul className="fi-home-faq">
                {faq.map((item) => (
                  <li key={item.id}>
                    <Link href={`/${locale}/help#${item.anchor}`}>
                      <span className="fi-home-faq__q">{item.question}</span>
                      <span className="fi-home-faq__arrow" aria-hidden="true"><Arrow /></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <ConsultBand locale={locale} title={t.consult} body={t.consultBody} source="homepage-final" />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}

/** Keeps each phrase of a CJK heading together so lines break at 、 instead of mid-word. */
function Phrases({ text }: { text: string }) {
  const parts = text.split(/(?<=[、，,])\s*/);
  return (
    <>
      {parts.map((part, index) => (
        <span className="fi-phrase" key={index}>{part}</span>
      ))}
    </>
  );
}



function FeaturedGuides({ title, intro, guides, allHref, allLabel }: { title: string; intro: string; guides: GuideSummary[]; allHref: string; allLabel: string }) {
  if (!guides.length) return null;

  return (
    <section className="fi-home-guides" id="guides" aria-labelledby="guides-title">
      <div className="fi-shell">
        <header className="fi-home-guides__head">
          <h2 className="fi-h2" id="guides-title">{title}</h2>
          <p className="fi-body">{intro}</p>
          <Link className="fi-text-link fi-home-guides__all" href={allHref}>{allLabel}<Arrow /></Link>
        </header>
        <GuideFeature guides={guides.slice(0, 3)} variant="even" />
      </div>
    </section>
  );
}

function Portrait({ person, alt, name, position }: { person: "ricky" | "danny"; alt: string; name: string; position: string }) {
  const dimensions = person === "ricky" ? { width: 478, height: 597 } : { width: 721, height: 901 };
  return (
    <figure className="fi-portrait">
      <Image src={asset(`/images/${person}.webp`)} alt={alt} width={dimensions.width} height={dimensions.height} loading="lazy" sizes="(min-width: 1100px) 22vw, 50vw" />
      <figcaption>
        <span className="fi-portrait__name">{name}</span>
        <span className="fi-meta">{position}</span>
      </figcaption>
    </figure>
  );
}
