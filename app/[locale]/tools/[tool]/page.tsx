import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CostEstimator } from "@/components/tools/CostEstimator";
import { isLocale } from "@/config/site";
import { toolsCopy, type ToolKey } from "@/data/tools";
import { fixedPageMetadata } from "@/lib/seo/fixed-page";

type Props = { params: Promise<{ locale: string; tool: string }> };
const isToolKey = (value: string): value is ToolKey => value === "rental-initial-cost" || value === "purchase-cost";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, tool } = await params;
  if (!isLocale(locale) || !isToolKey(tool)) return {};
  const t = toolsCopy[locale].tools[tool];
  return fixedPageMetadata(locale, `/tools/${tool}`, t.title, t.intro, "tools");
}

export default async function CostToolPage({ params }: Props) {
  const { locale, tool } = await params;
  if (!isLocale(locale) || !isToolKey(tool)) notFound();
  const t = toolsCopy[locale].tools[tool];
  return (
    <div className="fi-page fi-tools">
      <SiteHeader locale={locale} currentPath={`/${locale}/tools/${tool}`} />
      <main id="top">
        <PageHero title={t.title} lead={t.intro} id="tool-title" crumbs={[{ href: `/${locale}/tools`, label: toolsCopy[locale].back }, { label: t.title }]} />
        <CostEstimator locale={locale} tool={tool} />
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
