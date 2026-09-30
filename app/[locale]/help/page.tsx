import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { FaqExplorer } from "@/components/help/FaqExplorer";
import { ConsultBand } from "@/components/site/ConsultBand";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { hasFaq, siteConfig } from "@/config/site";
import { helpUi } from "@/data/editorial-ui";
import { answerPlainText, getFaqViews } from "@/lib/content/faq";
import { absoluteSiteUrl } from "@/lib/content/paths";
import { faqCategories } from "@/lib/content/types";
import { ogImageUrl } from "@/lib/seo/fixed-page";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return siteConfig.faqLocales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasFaq(locale)) return {};
  const t = helpUi[locale];
  const canonical = absoluteSiteUrl(`/${locale}/help`);
  return { title: `${t.title} | Fukuoka Insider`, description: t.intro, alternates: { canonical, languages: { "zh-TW": absoluteSiteUrl("/zh-TW/help"), en: absoluteSiteUrl("/en/help") } }, openGraph: { title: t.title, description: t.intro, url: canonical, type: "website", images: [{ url: ogImageUrl(locale, "help"), width: 1200, height: 630, alt: t.title }] }, twitter: { card: "summary_large_image", title: t.title, description: t.intro, images: [ogImageUrl(locale, "help")] } };
}

export default async function HelpPage({ params }: PageProps) {
  const { locale: value } = await params;
  // No Japanese FAQ (Danny, 2026-09-30): /ja/help is not a page.
  if (!hasFaq(value)) notFound();
  const locale = value;
  const t = helpUi[locale];
  const items = await getFaqViews(locale);
  const categories = faqCategories.filter((category) => items.some((item) => item.category === category));
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: items.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: answerPlainText(item.answer) } })),
  };

  return (
    <div className="fi-page fi-help">
      <SiteHeader locale={locale} currentPath={`/${locale}/help`} localePaths={{ ja: "/ja/" }} />
      <main id="top">
        <PageHero title={t.title} lead={t.intro} id="help-title" />
        <section className="fi-faq" aria-label={t.searchLabel}>
          <div className="fi-shell"><FaqExplorer locale={locale} items={items} categories={categories} copy={t} /></div>
        </section>
        <ConsultBand locale={locale} title={t.contactTitle} body={t.contactBody} source="help-page" />
      </main>
      <SiteFooter locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    </div>
  );
}
