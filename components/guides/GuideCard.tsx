import Image from "next/image";
import Link from "next/link";

import { ArrowIcon } from "@/components/site/Icons";
import { asset } from "@/config/site";
import { guideCategoryCopy } from "@/data/guide-content";
import { guidePath } from "@/lib/content/paths";
import type { GuideLocale, GuideSummary } from "@/lib/content/types";
import { Phrases } from "@/components/site/Phrases";

/** Photo card for featured guides: photograph, category, full title, summary. */
export function GuideCard({ guide, lead = false, headingLevel = 3, priority = false }: { guide: GuideSummary; lead?: boolean; headingLevel?: 2 | 3; priority?: boolean }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const locale = guide.locale as GuideLocale;
  return (
    <article className={lead ? "fi-guide-card fi-guide-card--lead" : "fi-guide-card"}>
      <Link className="fi-guide-card__link" href={guidePath(locale, guide.category, guide.slug)}>
        {guide.coverImage ? (
          <span className="fi-guide-card__image">
            <Image
              src={asset(guide.coverImage)}
              alt={guide.coverAlt ?? ""}
              width={1448}
              height={1086}
              {...(priority ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
              sizes={lead ? "(min-width: 1100px) 55vw, 100vw" : "(min-width: 1100px) 30vw, (min-width: 720px) 50vw, 100vw"}
            />
          </span>
        ) : null}
        <span className="fi-guide-card__category">{guideCategoryCopy[locale][guide.category].label}</span>
        <Heading className="fi-guide-card__title"><Phrases text={guide.title} /></Heading>
        <p className="fi-guide-card__summary">{guide.excerpt}</p>
      </Link>
    </article>
  );
}

/** Three featured guides: one lead card beside two smaller ones on wide screens. */
export function GuideFeature({ guides, variant = "lead" }: { guides: GuideSummary[]; variant?: "lead" | "even" }) {
  return (
    <ul className={`fi-guide-feature-grid fi-guide-feature-grid--${variant}`}>
      {guides.map((guide, index) => (
        <li key={guide.id}><GuideCard guide={guide} lead={variant === "lead" && index === 0} priority={variant === "lead" && index === 0} /></li>
      ))}
    </ul>
  );
}

/** Text-led index row: category, full title, summary. */
export function GuideRow({ guide, headingLevel = 3 }: { guide: GuideSummary; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const locale = guide.locale as GuideLocale;
  return (
    <li className="fi-guide-row">
      <Link className="fi-guide-row__link" href={guidePath(locale, guide.category, guide.slug)}>
        <span className="fi-guide-row__category">{guideCategoryCopy[locale][guide.category].label}</span>
        <span className="fi-guide-row__text">
          <Heading className="fi-guide-row__title"><Phrases text={guide.title} /></Heading>
          <span className="fi-guide-row__summary">{guide.excerpt}</span>
        </span>
        <span className="fi-guide-row__arrow" aria-hidden="true"><ArrowIcon /></span>
      </Link>
    </li>
  );
}

export function GuideIndex({ guides, headingLevel = 3 }: { guides: GuideSummary[]; headingLevel?: 2 | 3 }) {
  return <ul className="fi-guide-index">{guides.map((guide) => <GuideRow guide={guide} key={guide.id} headingLevel={headingLevel} />)}</ul>;
}

/** Kept for existing callers: related guides now use the text-led index. */
export function GuideGrid({ guides }: { guides: GuideSummary[] }) {
  return <GuideIndex guides={guides} />;
}
