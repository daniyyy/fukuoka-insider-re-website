import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ConsultBand } from "@/components/site/ConsultBand";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { EstimatorTeaser } from "@/components/tools/EstimatorTeaser";
import { isLocale } from "@/config/site";
import { toolsCopy } from "@/data/tools";
import { fixedPageMetadata } from "@/lib/seo/fixed-page";

type Props = { params: Promise<{ locale: string }> };

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
            {/* Same two cards as the homepage: a live rental estimate and the purchase cost items. */}
            <EstimatorTeaser locale={locale} />
            <p className="fi-tools-note fi-meta">{t.indexNote}</p>
          </div>
        </section>
        <ConsultBand locale={locale} title={t.consultTitle} body={t.consultBody} source="calculator" />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
