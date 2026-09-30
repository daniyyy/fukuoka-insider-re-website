import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { GuideFeature, GuideRow } from "@/components/guides/GuideCard";
import { GuideIndexPreview } from "@/components/guides/GuideIndexPreview";
import { GuideTopics } from "@/components/guides/GuideTopics";
import { HakataPanel } from "@/components/site/HakataPanel";
import { ConsultBand } from "@/components/site/ConsultBand";
import { ArrowIcon } from "@/components/site/Icons";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { isLocale } from "@/config/site";
import { guidesUi } from "@/data/editorial-ui";
import { getFeaturedGuides, getGuides } from "@/lib/content/adapter";
import { absoluteSiteUrl } from "@/lib/content/paths";
import { isGuideLocale } from "@/lib/content/types";
import { ogImageUrl } from "@/lib/seo/fixed-page";

type PageProps = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return ["zh-TW", "en"].map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isGuideLocale(locale)) return {};
  const t = guidesUi[locale];
  const canonical = absoluteSiteUrl(`/${locale}/guides`);
  const published = await getGuides(locale);
  return {
    title: `${t.title} | Fukuoka Insider`,
    description: t.intro,
    alternates: { canonical, languages: { "zh-TW": absoluteSiteUrl("/zh-TW/guides"), en: absoluteSiteUrl("/en/guides") } },
    openGraph: { title: t.title, description: t.intro, url: canonical, siteName: "Fukuoka Insider Real Estate", type: "website", images: [{ url: ogImageUrl(locale, "guides"), width: 1200, height: 630, alt: t.title }] },
    ...(published.length ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function GuidesPage({ params }: PageProps) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  if (!isGuideLocale(value)) redirect(`/${value}/`);
  const locale = value;
  const t = guidesUi[locale];
  const [featured, allGuides] = await Promise.all([getFeaturedGuides(locale, 3), getGuides(locale)]);

  return (
    <div className="fi-page fi-guides">
      <SiteHeader locale={locale} currentPath={`/${locale}/guides`} localePaths={{ "zh-TW": "/zh-TW/guides", en: "/en/guides", ja: "/ja/" }} />
      <main id="top">
        <PageHero title={t.heroTitle} lead={t.intro} id="guides-title" className="fi-page-hero--hakata" aside={<HakataPanel className="fi-hakata--hero" />} />

        {featured.length ? (
          <section className="fi-guides-feature" aria-labelledby="featured-title">
            <div className="fi-shell">
              <h2 className="fi-h2" id="featured-title">{t.featured}</h2>
              <GuideFeature guides={featured} variant="even" />
            </div>
          </section>
        ) : null}

        {allGuides.length ? (
          <section className="fi-guides-list" id="index" aria-labelledby="index-title">
            <div className="fi-shell">
              <div className="fi-guides-list__head">
                <h2 className="fi-h2" id="index-title">{t.allGuides}</h2>
                <GuideTopics locale={locale} guides={allGuides} allLabel={t.all} label={t.categories} />
              </div>
              <GuideIndexPreview rows={allGuides.map((guide) => <GuideRow guide={guide} key={guide.id} />)} moreLabel={t.showAll} />
            </div>
          </section>
        ) : (
          <section className="fi-guides-empty" aria-labelledby="empty-title">
            <div className="fi-shell">
              <div className="fi-guides-empty__box">
                <h2 id="empty-title">{t.noArticlesAll}</h2>
                <div className="fi-guides-empty__links">
                  <Link className="fi-text-link" href={`/${locale}/help`}>{t.browseHelp}<ArrowIcon /></Link>
                  <Link className="fi-text-link" href={`/${locale}/services`}>{t.browseServices}<ArrowIcon /></Link>
                </div>
              </div>
            </div>
          </section>
        )}

        <ConsultBand locale={locale} title={t.consultation} body={t.consultationBody} source="service-page" id="guides-consultation" />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
