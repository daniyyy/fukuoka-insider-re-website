import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ConsultBand } from "@/components/site/ConsultBand";
import { ExternalIcon } from "@/components/site/Icons";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { asset, isLocale, siteConfig } from "@/config/site";
import { aboutCopy } from "@/data/static-pages";
import { fixedPageMetadata } from "@/lib/seo/fixed-page";
import { jsonLd, organizationStructuredData } from "@/lib/seo/organization";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return fixedPageMetadata(locale, "/about", aboutCopy[locale].metaTitle, aboutCopy[locale].intro, "about");
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale = value;
  const t = aboutCopy[locale];
  const p = t.profile;
  const profile = siteConfig.company_profile;
  const telephone = locale === "ja" ? siteConfig.contact.telephone : siteConfig.contact.telephoneInternational;

  return (
    <div className="fi-page fi-about">
      <SiteHeader locale={locale} currentPath={`/${locale}/about`} />
      <main id="top">
        <PageHero
          title={t.title}
          lead={t.intro}
          id="about-title"
          className="fi-page-hero--media"
          aside={
            <figure className="fi-about-hero__figure">
              <div className="fi-frame fi-frame--hero">
                <Image
                  src={asset("/images/office/fukuoka-insider-office.webp")}
                  alt={locale === "zh-TW" ? "株式会社Fukuoka Insider 辦公室的公司標誌與宅地建物取引業免許" : locale === "ja" ? "株式会社Fukuoka Insider 事務所のロゴと宅地建物取引業免許" : "The Fukuoka Insider office with the company sign and real estate brokerage licence"}
                  width={900}
                  height={676}
                  fetchPriority="high"
                  sizes="(min-width: 1100px) 50vw, 100vw"
                />
              </div>
              <figcaption className="fi-meta">{t.photoCaption}</figcaption>
            </figure>
          }
        />

        <section className="fi-about-story" aria-labelledby="story-title">
          <div className="fi-shell fi-about-story__grid">
            <h2 className="fi-h2" id="story-title">{t.storyTitle}</h2>
            <div className="fi-about-story__body">
              {t.story.map((paragraph) => <p className="fi-lead" key={paragraph}>{paragraph}</p>)}
            </div>
          </div>
          <figure className="fi-shell fi-about-story__photo">
            <Image src={asset("/images/photos/fukuoka-castle-moat.webp")} alt={t.castleAlt} width={1600} height={922} loading="lazy" sizes="(min-width: 1280px) 1280px, 100vw" />
            <figcaption className="fi-meta">{t.castleCaption}</figcaption>
          </figure>
        </section>

        <section className="fi-about-people" aria-labelledby="people-title">
          <div className="fi-shell">
            <h2 className="fi-h2" id="people-title">{t.peopleTitle}</h2>
            <div className="fi-about-people__grid">
              <article className="fi-person">
                <Image src={asset("/images/ricky.webp")} alt={`Ricky, ${t.rickyRole}`} width={478} height={597} loading="lazy" sizes="(min-width: 1100px) 30vw, 50vw" />
                <div className="fi-person__text">
                  <h3 className="fi-person__name">Ricky</h3>
                  <p className="fi-person__role">{t.rickyRole}</p>
                  <p className="fi-person__body">{t.rickyBody}</p>
                </div>
              </article>
              <article className="fi-person">
                <Image src={asset("/images/danny.webp")} alt={`Danny, ${t.dannyRole}`} width={721} height={901} loading="lazy" sizes="(min-width: 1100px) 30vw, 50vw" />
                <div className="fi-person__text">
                  <h3 className="fi-person__name">Danny</h3>
                  <p className="fi-person__role">{t.dannyRole}</p>
                  <p className="fi-person__body">{t.dannyBody}</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="fi-about-profile" aria-labelledby="profile-title">
          <div className="fi-shell fi-about-profile__grid">
            <div className="fi-about-profile__head">
              <h2 className="fi-h2" id="profile-title">{t.profileTitle}</h2>
            </div>
            <dl className="fi-profile">
              <div><dt>{p.company}</dt><dd>{siteConfig.company}</dd></div>
              <div><dt>{p.established}</dt><dd>{profile.established[locale]}</dd></div>
              <div><dt>{p.representative}</dt><dd>{profile.representative[locale]}</dd></div>
              <div>
                <dt>{p.address}</dt>
                <dd>
                  {locale === "en" ? <span>{siteConfig.contact.addressEn}</span> : null}
                  <span lang="ja">{siteConfig.contact.address}</span>
                  <a className="fi-text-link" href={siteConfig.contact.map} target="_blank" rel="noreferrer">{t.mapCta}<ExternalIcon /></a>
                </dd>
              </div>
              <div><dt>{p.access}</dt><dd>{profile.access[locale]}</dd></div>
              <div><dt>{p.licence}</dt><dd lang="ja">{siteConfig.contact.licence}</dd></div>
              <div><dt>{p.association}</dt><dd>{profile.association[locale]}</dd></div>
              <div><dt>{p.business}</dt><dd>{p.businessValue}</dd></div>
              <div><dt>{p.languages}</dt><dd>{profile.languages[locale]}</dd></div>
              <div><dt>{p.hours}</dt><dd>{profile.hours[locale]}</dd></div>
              <div><dt>{p.closed}</dt><dd>{profile.closed[locale]}</dd></div>
              <div>
                <dt>{p.contact}</dt>
                <dd>
                  <a href={siteConfig.contact.telephoneHref}>{telephone}</a>
                  <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
                </dd>
              </div>
              <div>
                <dt>{p.instagram}</dt>
                <dd><a href={siteConfig.contact.instagram} target="_blank" rel="noreferrer">{siteConfig.contact.instagramHandle}</a><span className="fi-meta">{profile.instagramFollowers[locale]}</span></dd>
              </div>
            </dl>
          </div>
        </section>

        <ConsultBand locale={locale} title={t.ctaTitle} body={t.ctaBody} source="about-page" />
      </main>
      <SiteFooter locale={locale} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organizationStructuredData(locale)) }} />
    </div>
  );
}
