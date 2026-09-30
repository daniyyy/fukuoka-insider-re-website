import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { GuideIndex } from "@/components/guides/GuideCard";
import { ArrowIcon } from "@/components/site/Icons";
import { PageHero } from "@/components/site/PageHero";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CostEstimator } from "@/components/tools/CostEstimator";
import { hasGuides, isLocale } from "@/config/site";
import { guidesUi } from "@/data/editorial-ui";
import type { GuideLocale } from "@/lib/content/types";
import { getGuidesBySlugs } from "@/lib/content/adapter";
import { guidePath } from "@/lib/content/paths";
import type { RentalItemKey } from "@/lib/tools/calculators";
import type { RentalGuideLink, RentalGuideLinks } from "@/components/tools/RentalEstimator";
import { toolsCopy, type ToolKey } from "@/data/tools";
import { fixedPageMetadata } from "@/lib/seo/fixed-page";

/** Guides linked from the rental estimator (only published ones appear). */
const rentalGuideSlugs = ["rental-initial-costs-reikin-shikikin", "key-exchange-and-24-hour-support-fees", "shikibiki-deposit-deduction", "guarantor-company-and-joint-guarantor"] as const;
/** The overview guide sits above the cost list; the others are linked next to the item they explain. */
const rentalExplainerSlug = "rental-initial-costs-reikin-shikikin";
const rentalItemGuideSlugs: Partial<Record<RentalItemKey, string>> = {
  deposit: "shikibiki-deposit-deduction",
  guarantor: "guarantor-company-and-joint-guarantor",
  support24h: "key-exchange-and-24-hour-support-fees",
  keyExchange: "key-exchange-and-24-hour-support-fees",
};

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
  const guides = tool === "rental-initial-cost" && hasGuides(locale) ? await getGuidesBySlugs(locale as GuideLocale, rentalGuideSlugs) : [];
  const linkFor = (slug: string): RentalGuideLink | undefined => {
    const guide = guides.find((candidate) => candidate.slug === slug);
    return guide ? { href: guidePath(guide.locale, guide.category, guide.slug), title: guide.title } : undefined;
  };
  const rentalGuides: RentalGuideLinks = {
    explainer: linkFor(rentalExplainerSlug),
    items: Object.fromEntries(Object.entries(rentalItemGuideSlugs).map(([key, slug]) => [key, linkFor(slug as string)]).filter(([, link]) => link)),
  };
  return (
    <div className="fi-page fi-tools">
      <SiteHeader locale={locale} currentPath={`/${locale}/tools/${tool}`} />
      <main id="top">
        <PageHero title={t.title} lead={t.intro} id="tool-title" crumbs={[{ href: `/${locale}/tools`, label: toolsCopy[locale].back }, { label: t.title }]} />
        <CostEstimator locale={locale} tool={tool} rentalGuides={rentalGuides} />
        {guides.length ? (
          <section className="fi-service-guides" aria-labelledby="tool-guides-title">
            <div className="fi-shell">
              <div className="fi-service-guides__head">
                <h2 className="fi-h2" id="tool-guides-title">{t.readMore}</h2>
                <Link className="fi-text-link" href={`/${locale}/guides`}>{guidesUi[locale as GuideLocale].allGuides}<ArrowIcon /></Link>
              </div>
              <GuideIndex guides={guides} />
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
