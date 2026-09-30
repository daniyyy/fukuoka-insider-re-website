import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { GuideIndex } from "@/components/guides/GuideCard";
import { GuideTopics } from "@/components/guides/GuideTopics";
import { HakataPanel } from "@/components/site/HakataPanel";
import { ConsultBand } from "@/components/site/ConsultBand";
import { ArrowIcon } from "@/components/site/Icons";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { isLocale } from "@/config/site";
import { guideCategoryCopy } from "@/data/guide-content";
import { guidesUi } from "@/data/editorial-ui";
import { getGuides, getGuidesByCategory } from "@/lib/content/adapter";
import { absoluteSiteUrl, guideCategoryPath } from "@/lib/content/paths";
import { guideCategories, isGuideCategory, isGuideLocale } from "@/lib/content/types";

type PageProps = { params: Promise<{ locale: string; category: string }> };

export function generateStaticParams() {
  return ["zh-TW", "en"].flatMap((locale) => guideCategories.map((category) => ({ locale, category })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, category } = await params;
  if (!isGuideLocale(locale) || !isGuideCategory(category)) return {};
  const copy = guideCategoryCopy[locale][category];
  const canonical = absoluteSiteUrl(guideCategoryPath(locale, category));
  const published = await getGuidesByCategory(locale, category);
  return {
    title: `${copy.label} | ${guidesUi[locale].title} | Fukuoka Insider`, description: copy.description,
    alternates: { canonical, languages: { "zh-TW": absoluteSiteUrl(guideCategoryPath("zh-TW", category)), en: absoluteSiteUrl(guideCategoryPath("en", category)) } },
    openGraph: { title: copy.label, description: copy.description, url: canonical, type: "website", alternateLocale: [locale === "zh-TW" ? "en" : "zh-TW"] },
    ...(published.length ? {} : { robots: { index: false, follow: true } }),
  };
}

export default async function GuideCategoryPage({ params }: PageProps) {
  const { locale: value, category: categoryValue } = await params;
  if (!isLocale(value)) notFound();
  if (!isGuideLocale(value)) redirect(`/${value}/`);
  if (!isGuideCategory(categoryValue)) notFound();
  const locale = value;
  const category = categoryValue;
  const guides = await getGuidesByCategory(locale, category);
  const t = guidesUi[locale];
  const categoryCopy = guideCategoryCopy[locale][category];
  const alternateLocale = locale === "zh-TW" ? "en" : "zh-TW";
  const alternateGuides = await getGuidesByCategory(alternateLocale, category);
  const allGuides = await getGuides(locale);

  return (
    <div className="fi-page fi-guides">
      <SiteHeader locale={locale} currentPath={guideCategoryPath(locale, category)} localePaths={{ [locale]: guideCategoryPath(locale, category), [alternateLocale]: alternateGuides.length ? guideCategoryPath(alternateLocale, category) : `/${alternateLocale}/guides`, ja: "/ja/" }} />
      <main id="top">
        <PageHero title={categoryCopy.label} lead={categoryCopy.description} id="category-title" className="fi-page-hero--hakata" aside={<HakataPanel className="fi-hakata--hero" />} crumbs={[{ href: `/${locale}/guides`, label: t.allGuides }, { label: categoryCopy.label }]} />
        {guides.length ? (
          <section className="fi-guides-list fi-guides-list--category" id="index" aria-labelledby="category-title">
            <div className="fi-shell">
              <div className="fi-guides-list__head">
                <GuideTopics locale={locale} guides={allGuides} current={category} allLabel={t.all} label={t.categories} />
              </div>
              <GuideIndex guides={guides} headingLevel={2} />
            </div>
          </section>
        ) : (
          <section className="fi-guides-empty" aria-labelledby="category-empty-title">
            <div className="fi-shell">
              <div className="fi-guides-empty__box">
                <h2 id="category-empty-title">{t.noArticles}</h2>
                <div className="fi-guides-empty__links">
                  <Link className="fi-text-link" href={`/${locale}/guides`}>{t.allGuides}<ArrowIcon /></Link>
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
