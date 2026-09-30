import Link from "next/link";

import { guideCategoryCopy } from "@/data/guide-content";
import { guideCategoryPath } from "@/lib/content/paths";
import type { GuideCategory, GuideLocale, GuideSummary } from "@/lib/content/types";

/** Topic switcher above the guide index; only topics with published guides are shown. */
export function GuideTopics({ locale, guides, current, allLabel, label }: { locale: GuideLocale; guides: GuideSummary[]; current?: GuideCategory; allLabel: string; label: string }) {
  const counts = new Map<GuideCategory, number>();
  for (const guide of guides) counts.set(guide.category, (counts.get(guide.category) ?? 0) + 1);
  const topics = (Object.keys(guideCategoryCopy[locale]) as GuideCategory[]).filter((category) => counts.has(category));
  if (topics.length < 2) return null;
  return (
    <nav className="fi-guide-topics" aria-label={label}>
      <Link href={`/${locale}/guides#index`} aria-current={current ? undefined : "page"}>
        {allLabel}<span>{guides.length}</span>
      </Link>
      {topics.map((category) => (
        <Link href={`${guideCategoryPath(locale, category)}#index`} aria-current={current === category ? "page" : undefined} key={category}>
          {guideCategoryCopy[locale][category].label}<span>{counts.get(category)}</span>
        </Link>
      ))}
    </nav>
  );
}
