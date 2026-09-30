import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowIcon } from "@/components/site/Icons";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { isLocale } from "@/config/site";
import { toolsCopy, type ToolKey } from "@/data/tools";
import { fixedPageMetadata } from "@/lib/seo/fixed-page";

type Props = { params: Promise<{ locale: string }> };
const toolKeys: ToolKey[] = ["rental-initial-cost", "purchase-cost"];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return fixedPageMetadata(locale, "/tools", toolsCopy[locale].indexTitle, toolsCopy[locale].indexIntro, "tools");
}

export default async function ToolsPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = toolsCopy[locale];
  return (
    <div className="fi-page fi-tools">
      <SiteHeader locale={locale} currentPath={`/${locale}/tools`} />
      <main id="top">
        <PageHero title={t.indexTitle} lead={t.indexIntro} id="tools-title" />
        <section className="fi-tools-list" aria-labelledby="tools-title">
          <div className="fi-shell">
            <ul className="fi-tool-rows">
              {toolKeys.map((key) => (
                <li key={key}>
                  <Link className="fi-tool-row" href={`/${locale}/tools/${key}`}>
                    <span><strong>{t.labels[key]}</strong><span>{t.tools[key].intro}</span></span>
                    <span className="fi-related-card__arrow" aria-hidden="true"><ArrowIcon /></span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="fi-tools-note fi-meta">{t.indexNote}</p>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
