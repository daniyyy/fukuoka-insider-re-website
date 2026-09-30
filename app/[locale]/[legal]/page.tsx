import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { isLocale } from "@/config/site";
import { legalCopy, type LegalKey } from "@/data/static-pages";
import { fixedPageMetadata } from "@/lib/seo/fixed-page";

type PageProps = { params: Promise<{ locale: string; legal: string }> };
const legalKeys: LegalKey[] = ["privacy", "disclaimer", "terms"];
const isLegalKey = (value: string): value is LegalKey => legalKeys.includes(value as LegalKey);

export function generateStaticParams() {
  return ["zh-TW", "ja", "en"].flatMap((locale) => legalKeys.map((legal) => ({ locale, legal })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, legal } = await params;
  if (!isLocale(locale) || !isLegalKey(legal)) return {};
  const copy = legalCopy[legal][locale];
  return fixedPageMetadata(locale, `/${legal}`, copy.title, copy.intro, "home");
}

export default async function LegalPage({ params }: PageProps) {
  const { locale, legal } = await params;
  if (!isLocale(locale) || !isLegalKey(legal)) notFound();
  const copy = legalCopy[legal][locale];

  return (
    <div className="fi-page fi-legal-page">
      <SiteHeader locale={locale} currentPath={`/${locale}/${legal}`} />
      <main id="top">
        <PageHero title={copy.heroTitle ?? copy.title} lead={copy.intro} id="legal-title" />
        <section className="fi-legal" aria-labelledby="legal-title">
          <div className="fi-shell fi-legal__grid">
            <nav aria-label={copy.title}>
              <ul className="fi-legal__nav">
                {legalKeys.map((key) => (
                  <li key={key}><Link href={`/${locale}/${key}`} aria-current={key === legal ? "page" : undefined}>{legalCopy[key][locale].title}</Link></li>
                ))}
              </ul>
            </nav>
            <div className="fi-legal__content">
              <p className="fi-legal__updated">{copy.updated}</p>
              <ol className="fi-legal__sections">
                {copy.sections.map((section) => (
                  <li key={section.title}>
                    <h2>{section.title}</h2>
                    {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
