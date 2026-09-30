import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { AnalyticsLink } from "@/components/analytics/AnalyticsLink";
import { ContactEntryTracker } from "@/components/analytics/ContactEntryTracker";
import { ArrowIcon, ExternalIcon } from "@/components/site/Icons";
import { PageHero } from "@/components/site/PageHero";
import { QrCode } from "@/components/site/QrCode";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { asset, isLocale, siteConfig } from "@/config/site";
import { contactCopy } from "@/data/static-pages";
import { fixedPageMetadata } from "@/lib/seo/fixed-page";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return fixedPageMetadata(locale, "/contact", contactCopy[locale].title, contactCopy[locale].intro, "contact");
}

export default async function ContactPage({ params }: PageProps) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale = value;
  const t = contactCopy[locale];
  const profile = siteConfig.company_profile;
  const telephone = locale === "ja" ? siteConfig.contact.telephone : siteConfig.contact.telephoneInternational;

  return (
    <div className="fi-page fi-contact">
      <SiteHeader locale={locale} currentPath={`/${locale}/contact`} />
      <ContactEntryTracker locale={locale} />
      <main id="top">
        <PageHero title={t.title} lead={t.intro} id="contact-title" />

        <section className="fi-contact-routes" aria-labelledby="routes-title">
          <div className="fi-shell">
            <h2 className="fi-visually-hidden" id="routes-title">{t.routesTitle}</h2>
            <div className="fi-contact-routes__grid">
              <article className="fi-route fi-route--primary fi-on-dark">
                <span className="fi-route__badge">{t.form.recommended}</span>
                <h3 className="fi-route__title">{t.form.title}</h3>
                <p className="fi-route__body">{t.form.body}</p>
                <div className="fi-route__action">
                  <AnalyticsLink className="fi-button fi-button--light" href={siteConfig.contact.consultation} target="_blank" rel="noreferrer" event={{ name: "google_form_outbound", locale, source: "contact-page" }}>
                    {t.form.cta}
                    <ArrowIcon />
                  </AnalyticsLink>
                  <span className="fi-route__note">{t.form.note}</span>
                </div>
                <div className="fi-route__qr fi-route__qr--light">
                  <QrCode value={siteConfig.contact.consultation} label={`${t.form.title} QR`} />
                  <span>{t.scan}</span>
                </div>
              </article>

              <article className="fi-route">
                <h3 className="fi-route__title">{t.line.title}</h3>
                <p className="fi-route__body">{t.line.body}</p>
                <div className="fi-route__action">
                  <AnalyticsLink className="fi-button fi-button--outline" href={siteConfig.contact.line} target="_blank" rel="noreferrer" event={{ name: "contact_channel_click", locale, source: "contact-page", channel: "line" }}>
                    {t.line.cta}
                    <ArrowIcon />
                  </AnalyticsLink>
                  <AnalyticsLink className="fi-button fi-button--outline" href={siteConfig.contact.whatsapp} target="_blank" rel="noreferrer" event={{ name: "contact_channel_click", locale, source: "contact-page", channel: "whatsapp" }}>
                    {t.line.whatsapp}
                    <ArrowIcon />
                  </AnalyticsLink>
                </div>
                <div className="fi-route__qr">
                  <QrCode value={siteConfig.contact.line} label="LINE QR" />
                  <span>{t.scan}{locale === "en" ? " (LINE)" : "（LINE）"}</span>
                </div>
              </article>

              <article className="fi-route">
                <h3 className="fi-route__title">{t.direct.title}</h3>
                <p className="fi-route__body">{t.direct.body}</p>
                <dl className="fi-route__direct">
                  <div>
                    <dt>{t.direct.phone}</dt>
                    <dd><AnalyticsLink href={siteConfig.contact.telephoneHref} event={{ name: "contact_channel_click", locale, source: "contact-page", channel: "phone" }}>{telephone}</AnalyticsLink></dd>
                  </div>
                  <div>
                    <dt>{t.direct.email}</dt>
                    <dd><AnalyticsLink href={`mailto:${siteConfig.contact.email}`} event={{ name: "contact_channel_click", locale, source: "contact-page", channel: "email" }}>{siteConfig.contact.email}</AnalyticsLink></dd>
                  </div>
                </dl>
                <p className="fi-meta">{profile.hours[locale]}<br />{t.office.closed}{locale === "en" ? ": " : "："}{profile.closed[locale]}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="fi-service-prepare fi-contact-prepare" aria-labelledby="prepare-title">
          <div className="fi-shell fi-service-prepare__grid">
            <div className="fi-service-prepare__copy">
              <h2 className="fi-h2" id="prepare-title">{t.prepareTitle}</h2>
              <p className="fi-body">{t.prepareIntro}</p>
            </div>
            <div className="fi-sheet">
              <dl className="fi-sheet__list">
                {t.prepare.map((item) => (
                  <div className="fi-sheet__row" key={item.title}>
                    <span className="fi-sheet__box" aria-hidden="true" />
                    <dt>{item.title}</dt>
                    <dd>{item.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section className="fi-contact-office" aria-labelledby="office-title">
          <div className="fi-shell fi-contact-office__grid">
            <figure className="fi-contact-office__figure">
              <div className="fi-frame">
                <Image src={asset("/images/office/fukuoka-insider-office-desk.webp")} alt={locale === "zh-TW" ? "Fukuoka Insider 辦公室內的接待桌" : locale === "ja" ? "Fukuoka Insider 事務所の受付" : "The reception desk at the Fukuoka Insider office"} width={572} height={429} loading="lazy" sizes="(min-width: 1100px) 40vw, 100vw" />
              </div>
            </figure>
            <div className="fi-contact-office__copy">
              <h2 className="fi-h2" id="office-title">{t.officeTitle}</h2>
              <dl className="fi-profile fi-profile--compact">
                <div><dt>{t.office.address}</dt><dd><span lang="ja">{siteConfig.company}<br />{siteConfig.contact.address}</span></dd></div>
                <div><dt>{t.office.access}</dt><dd>{profile.access[locale]}</dd></div>
                <div><dt>{t.office.hours}</dt><dd>{profile.hours[locale]}</dd></div>
                <div><dt>{t.office.closed}</dt><dd>{profile.closed[locale]}</dd></div>
                <div><dt>{t.office.fax}</dt><dd>{siteConfig.contact.fax}</dd></div>
              </dl>
              <a className="fi-button fi-button--outline" href={siteConfig.contact.map} target="_blank" rel="noreferrer">
                {t.mapCta}
                <ExternalIcon />
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
