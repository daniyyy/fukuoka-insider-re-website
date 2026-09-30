import Image from "next/image";
import Link from "next/link";

import { AnalyticsLink } from "@/components/analytics/AnalyticsLink";
import { CompanyFacts } from "@/components/site/CompanyFacts";
import { ConsultBand } from "@/components/site/ConsultBand";
import { ArrowIcon, CheckIcon } from "@/components/site/Icons";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { GuideIndex } from "@/components/guides/GuideCard";
import { FaqAnswer } from "@/components/help/FaqAnswer";
import { asset, hasFaq, hasGuides, siteConfig, type Locale } from "@/config/site";
import { faqUi } from "@/data/editorial-ui";
import { serviceGuideSlugs } from "@/data/service-guides";
import { getGuidesBySlugs } from "@/lib/content/adapter";
import { getServiceFaqViews } from "@/lib/content/faq";
import type { GuideLocale } from "@/lib/content/types";
import {
  serviceDetailCopy,
  serviceImages,
  serviceKeys,
  serviceOverviewCopy,
  serviceUiCopy,
  type ServiceKey,
} from "@/data/service-pages";

/**
 * One template for all four service pages (Washi Editorial design system).
 * Content lives in data/service-pages.ts; layout and styling live here and in app/services.css.
 */
export async function ServicePage({ locale, service }: { locale: Locale; service: ServiceKey }) {
  const copy = serviceDetailCopy[service][locale];
  const ui = serviceUiCopy[locale];
  const image = serviceImages[service];
  const others = serviceOverviewCopy[locale].items.filter((item) => item.key !== service);
  const guides = hasGuides(locale) ? await getGuidesBySlugs(locale as GuideLocale, serviceGuideSlugs[service]) : [];
  const faq = await getServiceFaqViews(locale, service);
  const faqCopy = hasFaq(locale) ? faqUi[locale] : null;

  return (
    <div className={`fi-page fi-service fi-service--${service}`}>
      <SiteHeader locale={locale} currentPath={`/${locale}/services/${service}`} />
      <main id="top">
        <section className="fi-service-hero" aria-labelledby="service-title">
          <div className="fi-shell fi-service-hero__grid">
            <div className="fi-service-hero__copy">
              <nav className="fi-breadcrumb" aria-label="Breadcrumb">
                <ol>
                  <li><Link href={`/${locale}/services`}>{ui.services}</Link></li>
                  <li aria-current="page">{copy.title}</li>
                </ol>
              </nav>
              <h1 className="fi-service-hero__title" id="service-title">{copy.title}</h1>
              <p className="fi-service-hero__lead">{copy.description}</p>
              <ul className="fi-service-hero__tags" aria-label={copy.title}>
                {copy.highlights.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <div className="fi-service-hero__actions">
                <AnalyticsLink className="fi-button" href={`/${locale}/contact`} event={{ name: "consultation_cta_click", locale, source: "service-page" }}>
                  {ui.consultation}
                  <ArrowIcon />
                </AnalyticsLink>
                <AnalyticsLink className="fi-button fi-button--outline" href={siteConfig.contact.line} target="_blank" rel="noreferrer" event={{ name: "contact_channel_click", locale, source: "service-page", channel: "line" }}>
                  {ui.line}
                </AnalyticsLink>
              </div>
            </div>
            <figure className="fi-service-hero__figure">
              <div className="fi-frame fi-frame--hero">
                <Image
                  src={asset(image.src)}
                  alt={image.alt[locale]}
                  width={image.width}
                  height={image.height}
                  fetchPriority="high"
                  sizes="(min-width: 1100px) 56vw, 100vw"
                />
              </div>
              {copy.imageNote ? <figcaption className="fi-meta">{copy.imageNote}</figcaption> : null}
            </figure>
          </div>
        </section>

        <section className="fi-service-audience" aria-labelledby="audience-title">
          <div className="fi-shell fi-service-audience__grid">
            <h2 className="fi-h2" id="audience-title">{copy.audienceTitle}</h2>
            <ul className="fi-service-audience__list">
              {copy.audiences.map((item) => (
                <li key={item.title}>
                  <h3 className="fi-h3">{item.title}</h3>
                  <p>{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="fi-service-help" aria-labelledby="help-title">
          <div className="fi-shell">
            <header className="fi-section-head">
              <h2 className="fi-h2" id="help-title">{copy.helpTitle}</h2>
              <p className="fi-body">{copy.helpIntro}</p>
            </header>
            <div className={`fi-service-panels fi-service-panels--${copy.panels.length}`}>
              {copy.panels.map((panel) => (
                <article className="fi-service-panel" key={panel.title}>
                  <h3 className="fi-service-panel__title">{panel.title}</h3>
                  {panel.body ? <p className="fi-service-panel__body">{panel.body}</p> : null}
                  <ul className="fi-checklist">
                    {panel.points.map((point) => (
                      <li key={point}><CheckIcon />{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            {copy.helpNote ? <p className="fi-service-help__note fi-meta">{copy.helpNote}</p> : null}
          </div>
        </section>

        <section className="fi-service-process" aria-labelledby="process-title">
          <div className="fi-shell">
            <h2 className="fi-h2" id="process-title">{copy.processTitle}</h2>
            <ol className="fi-steps">
              {copy.process.map((step, index) => (
                <li className="fi-step" key={step.title}>
                  <span className="fi-step__number" aria-hidden="true">{index + 1}</span>
                  <h3 className="fi-step__title">{step.title}</h3>
                  <p className="fi-step__body">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="fi-service-prepare" aria-labelledby="prepare-title">
          <div className="fi-shell fi-service-prepare__grid">
            <div className="fi-service-prepare__copy">
              <h2 className="fi-h2" id="prepare-title">{copy.prepareTitle}</h2>
              <p className="fi-body">{copy.prepareIntro}</p>
              {copy.tool ? (
                <Link className="fi-text-link" href={`/${locale}${copy.tool.href}`}>
                  {copy.tool.label}
                  <ArrowIcon />
                </Link>
              ) : null}
            </div>
            <div className="fi-sheet">
              <div className="fi-sheet__head">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset("/images/brand/symbol-dark.svg")} alt="" width={20} height={20} />
                <span>{ui.checklist}</span>
                <span className="fi-sheet__service">{copy.title}</span>
              </div>
              <dl className="fi-sheet__list">
                {copy.preparation.map((item) => (
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

        <section className="fi-service-limits" aria-labelledby="limits-title">
          <div className="fi-shell fi-service-limits__grid">
            <h2 className="fi-service-limits__title" id="limits-title">{copy.limitsTitle}</h2>
            <ul className="fi-service-limits__list">
              {copy.limits.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </section>

        {faq.length && faqCopy ? (
          <section className="fi-service-faq" aria-labelledby="service-faq-title">
            <div className="fi-shell fi-service-faq__grid">
              <div className="fi-service-faq__head">
                <h2 className="fi-h2" id="service-faq-title">{faqCopy.sectionTitle}</h2>
                <Link className="fi-text-link" href={`/${locale}/help`}>{faqCopy.allFaq}<ArrowIcon /></Link>
              </div>
              <div className="fi-faq-list">
                {faq.map((item) => (
                  <details className="fi-faq-item" id={item.anchor} key={item.id}>
                    <summary>
                      <span className="fi-faq-item__q">{item.question}</span>
                      <span className="fi-faq-item__icon" aria-hidden="true" />
                    </summary>
                    <FaqAnswer answer={item.answer} links={item.links} />
                  </details>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {guides.length ? (
          <section className="fi-service-guides" aria-labelledby="service-guides-title">
            <div className="fi-shell">
              <div className="fi-service-guides__head">
                <h2 className="fi-h2" id="service-guides-title">{ui.guidesTitle}</h2>
                <Link className="fi-text-link" href={`/${locale}/guides`}>{ui.allGuides}<ArrowIcon /></Link>
              </div>
              <GuideIndex guides={guides} />
            </div>
          </section>
        ) : null}

        <CompanyFacts locale={locale} />

        <nav className="fi-service-related" aria-labelledby="related-title">
          <div className="fi-shell">
            <h2 className="fi-service-related__title" id="related-title">{ui.otherServices}</h2>
            <ul className="fi-service-related__list">
              {others.map((item) => (
                <li key={item.key}>
                  <Link className="fi-related-card" href={`/${locale}${item.route}`}>
                    <span className="fi-related-card__image">
                      <Image src={asset(serviceImages[item.key].src)} alt="" width={serviceImages[item.key].width} height={serviceImages[item.key].height} loading="lazy" sizes="(min-width: 1100px) 24vw, 100vw" />
                    </span>
                    <span className="fi-related-card__text">
                      <span className="fi-related-card__title">{item.title}</span>
                      <span className="fi-related-card__desc">{item.audience}</span>
                    </span>
                    <span className="fi-related-card__arrow" aria-hidden="true"><ArrowIcon /></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <ConsultBand locale={locale} title={copy.ctaTitle} body={copy.ctaBody} source="service-page" />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}

export const isServiceKey = (value: string): value is ServiceKey => serviceKeys.includes(value as ServiceKey);
