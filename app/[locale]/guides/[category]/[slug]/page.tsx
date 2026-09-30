import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { ArticleBody } from "@/components/guides/ArticleBody";
import { AnalyticsLink } from "@/components/analytics/AnalyticsLink";
import { GuideIndex } from "@/components/guides/GuideCard";
import { HakataPanel } from "@/components/site/HakataPanel";
import { ConsultBand } from "@/components/site/ConsultBand";
import { ArrowIcon } from "@/components/site/Icons";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { asset, isLocale, siteConfig } from "@/config/site";
import { guideCategoryCopy } from "@/data/guide-content";
import { guidesUi } from "@/data/editorial-ui";
import { serviceOverviewCopy } from "@/data/service-pages";
import { getAllPublishedGuideRecords, getGuideBySlug, getGuideTranslation, getRelatedGuides } from "@/lib/content/adapter";
import { absoluteSiteUrl, formatEditorialDate, guideCategoryPath, guidePath } from "@/lib/content/paths";
import { isGuideCategory, isGuideLocale, type Guide, type GuideLocale } from "@/lib/content/types";
import { ogImageUrl } from "@/lib/seo/fixed-page";

type PageProps = { params: Promise<{ locale: string; category: string; slug: string }> };

export async function generateStaticParams() {
  return (await getAllPublishedGuideRecords()).map((guide) => ({ locale: guide.locale, category: guide.category, slug: guide.slug }));
}

const shareImage = (guide: Guide, locale: GuideLocale) =>
  guide.ogImage ? absoluteSiteUrl(guide.ogImage) : guide.coverImage ? absoluteSiteUrl(guide.coverImage) : ogImageUrl(locale, "guides");

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, category, slug } = await params;
  if (!isGuideLocale(locale) || !isGuideCategory(category)) return {};
  const guide = await getGuideBySlug(locale, category, slug);
  if (!guide) return {};
  const canonical = absoluteSiteUrl(guidePath(locale, category, slug));
  const otherLocale = locale === "zh-TW" ? "en" : "zh-TW";
  const translation = await getGuideTranslation(guide, otherLocale);
  const languages: Record<string, string> = { [locale]: canonical };
  if (translation) languages[otherLocale] = absoluteSiteUrl(guidePath(otherLocale, translation.category, translation.slug));
  return {
    title: `${guide.seoTitle ?? guide.title} | Fukuoka Insider`, description: guide.seoDescription ?? guide.excerpt,
    alternates: { canonical, languages },
    openGraph: { title: guide.seoTitle ?? guide.title, description: guide.seoDescription ?? guide.excerpt, url: canonical, type: "article", publishedTime: guide.publishedAt, modifiedTime: guide.updatedAt, images: [{ url: shareImage(guide, locale), width: 1200, height: 630, alt: guide.title }] },
  };
}

export default async function GuideArticlePage({ params }: PageProps) {
  const { locale: value, category: categoryValue, slug } = await params;
  if (!isLocale(value)) notFound();
  if (!isGuideLocale(value)) redirect(`/${value}/`);
  if (!isGuideCategory(categoryValue)) notFound();
  const locale = value;
  const guide = await getGuideBySlug(locale, categoryValue, slug);
  if (!guide) notFound();
  const t = guidesUi[locale];
  const otherLocale = locale === "zh-TW" ? "en" : "zh-TW";
  const [translation, related] = await Promise.all([getGuideTranslation(guide, otherLocale), getRelatedGuides(guide, 3)]);
  const localePaths = {
    [locale]: guidePath(locale, guide.category, guide.slug),
    [otherLocale]: translation ? guidePath(otherLocale, translation.category, translation.slug) : `/${otherLocale}/guides`,
    ja: "/ja/",
  };
  const serviceHref = guide.serviceContext ? `/${locale}/services/${guide.serviceContext}` : `/${locale}/services`;
  const serviceName = guide.serviceContext
    ? serviceOverviewCopy[locale].items.find((service) => service.key === guide.serviceContext)?.title
    : undefined;
  const categoryLabel = guideCategoryCopy[locale][guide.category].label;
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Article", headline: guide.title, description: guide.excerpt,
    image: [shareImage(guide, locale)], datePublished: guide.publishedAt, dateModified: guide.updatedAt ?? guide.publishedAt,
    author: { "@type": "Organization", name: guide.author ?? siteConfig.name }, publisher: { "@type": "Organization", name: siteConfig.company },
    inLanguage: locale, mainEntityOfPage: absoluteSiteUrl(guidePath(locale, guide.category, guide.slug)),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: t.allGuides, item: absoluteSiteUrl(`/${locale}/guides`) },
      { "@type": "ListItem", position: 2, name: categoryLabel, item: absoluteSiteUrl(guideCategoryPath(locale, guide.category)) },
      { "@type": "ListItem", position: 3, name: guide.title, item: absoluteSiteUrl(guidePath(locale, guide.category, guide.slug)) },
    ],
  };

  return (
    <div className="fi-page fi-article">
      <SiteHeader locale={locale} currentPath={guidePath(locale, guide.category, guide.slug)} localePaths={localePaths} />
      <main id="top">
        <article>
          <header className="fi-article-hero">
            <div className="fi-shell fi-article-hero__grid">
            <div className="fi-article-hero__inner">
              <nav className="fi-breadcrumb" aria-label="Breadcrumb">
                <ol>
                  <li><Link href={`/${locale}/guides`}>{t.allGuides}</Link></li>
                  <li><Link href={guideCategoryPath(locale, guide.category)}>{categoryLabel}</Link></li>
                </ol>
              </nav>
              <h1 className="fi-article-hero__title"><span className="fi-line"><span>{guide.title}</span></span></h1>
              <p className="fi-article-hero__excerpt">{guide.excerpt}</p>
              <p className="fi-article-meta">
                {guide.publishedAt ? <span>{t.published} {formatEditorialDate(guide.publishedAt, locale)}</span> : <span className="fi-draft-flag">{t.draftPreview}</span>}
                {guide.updatedAt && guide.updatedAt !== guide.publishedAt ? <span>{t.updated} {formatEditorialDate(guide.updatedAt, locale)}</span> : null}
                <span>{guide.author ?? t.companyAuthor}</span>
              </p>
            </div>
            <HakataPanel className="fi-hakata--article" />
            </div>
          </header>
          {guide.coverImage ? (
            <figure className="fi-shell fi-article-cover">
              <Image src={asset(guide.coverImage)} alt={guide.coverAlt ?? ""} width={1448} height={1086} fetchPriority="high" sizes="(min-width: 1280px) 1280px, 100vw" />
            </figure>
          ) : null}
          <div className="fi-article-body">
            <div className="fi-shell fi-article-body__grid">
              <ArticleBody blocks={guide.body} />
              <aside className="fi-article-aside">
                <div className="fi-article-aside__box">
                  <h2>{t.service}</h2>
                  <p>{serviceName ?? categoryLabel}</p>
                  <AnalyticsLink className="fi-text-link" href={serviceHref} event={{ name: "guide_to_service_click", locale, source: "guide-article", service: guide.serviceContext }}>{t.serviceCta}<ArrowIcon /></AnalyticsLink>
                </div>
                {guide.category === "renting" ? (
                  <div className="fi-article-aside__box fi-article-aside__box--tool">
                    <h2>{t.toolTitle}</h2>
                    <p>{t.toolBody}</p>
                    <Link className="fi-text-link" href={`/${locale}/tools/rental-initial-cost`}>{t.toolCta}<ArrowIcon /></Link>
                  </div>
                ) : null}
              </aside>
            </div>
          </div>
        </article>

        {related.length ? (
          <section className="fi-guides-list fi-guides-list--related" aria-labelledby="related-guides-title">
            <div className="fi-shell">
              <h2 className="fi-h2" id="related-guides-title">{t.related}</h2>
              <GuideIndex guides={related} />
            </div>
          </section>
        ) : null}
        <ConsultBand locale={locale} title={t.consultation} body={t.consultationBody} source="service-page" id="guides-consultation" />
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <SiteFooter locale={locale} />
    </div>
  );
}
