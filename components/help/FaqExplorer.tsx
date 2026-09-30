"use client";

import { useDeferredValue, useEffect, useMemo, useState } from "react";

import { FaqAnswer } from "@/components/help/FaqAnswer";
import type { FaqLocale } from "@/config/site";
import { faqCategoryLabels } from "@/data/editorial-ui";
import type { FaqEntryView } from "@/lib/content/faq";
import type { FaqCategory } from "@/lib/content/types";

type Copy = {
  searchLabel: string; searchPlaceholder: string; categoriesLabel: string;
  resultCount: string; noResults: string; noResultsHelp: string; clear: string;
};

const sectionId = (category: FaqCategory) => `topic-${category}`;

/** Open and scroll to the question named in the URL hash (e.g. /help#q-guarantor). */
function openFromHash() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  if (!id) return;
  const target = document.getElementById(id);
  if (target instanceof HTMLDetailsElement) {
    target.open = true;
    window.requestAnimationFrame(() => target.scrollIntoView({ block: "start" }));
  }
}

export function FaqExplorer({ locale, items, categories, copy }: { locale: FaqLocale; items: FaqEntryView[]; categories: readonly FaqCategory[]; copy: Copy }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<FaqCategory | null>(null);
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase(locale));

  const filtered = useMemo(() => {
    if (!deferredQuery) return items;
    const terms = deferredQuery.split(/\s+/).filter(Boolean);
    return items.filter((item) => {
      const haystack = [item.question, item.answer, ...item.tags].join(" ").toLocaleLowerCase(locale);
      return terms.every((term) => haystack.includes(term));
    });
  }, [deferredQuery, items, locale]);

  const groups = useMemo(
    () => categories.map((category) => ({ category, items: filtered.filter((item) => item.category === category) })).filter((group) => group.items.length),
    [categories, filtered],
  );

  useEffect(() => {
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  // Highlight the topic currently in view.
  useEffect(() => {
    const sections = groups.map((group) => document.getElementById(sectionId(group.category))).filter((node): node is HTMLElement => Boolean(node));
    if (!sections.length || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) setActive(visible.target.id.replace("topic-", "") as FaqCategory);
    }, { rootMargin: "-20% 0px -65% 0px" });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [groups]);

  const searching = deferredQuery.length > 0;

  return (
    <div className="fi-faq__grid">
      <nav className="fi-faq-topics" aria-label={copy.categoriesLabel}>
        <p className="fi-faq-topics__label">{copy.categoriesLabel}</p>
        <ul>
          {categories.map((category) => {
            const count = filtered.filter((item) => item.category === category).length;
            return (
              <li key={category}>
                <a
                  href={`#${sectionId(category)}`}
                  aria-current={active === category ? "true" : undefined}
                  aria-disabled={count === 0 ? "true" : undefined}
                  tabIndex={count === 0 ? -1 : undefined}
                >
                  <span>{faqCategoryLabels[locale][category]}</span>
                  <span className="fi-faq-topics__count">{count}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="fi-faq__main">
        <div className="fi-faq-search">
          <label htmlFor="faq-query" className="fi-visually-hidden">{copy.searchLabel}</label>
          <div className="fi-faq-search__field">
            <svg aria-hidden="true" viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg>
            <input id="faq-query" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={copy.searchPlaceholder} autoComplete="off" enterKeyHint="search" />
            {query ? <button type="button" onClick={() => setQuery("")}>{copy.clear}</button> : null}
          </div>
          <p className="fi-faq-search__status" aria-live="polite">{searching && filtered.length ? copy.resultCount.replace("{n}", String(filtered.length)) : ""}</p>
        </div>

        {groups.length ? (
          groups.map((group) => (
            <section className="fi-faq-group" id={sectionId(group.category)} aria-labelledby={`${sectionId(group.category)}-title`} key={group.category}>
              <h2 className="fi-faq-group__title" id={`${sectionId(group.category)}-title`}>{faqCategoryLabels[locale][group.category]}</h2>
              <div className="fi-faq-list">
                {group.items.map((item) => (
                  <details className="fi-faq-item" id={item.anchor} key={item.id} open={searching && filtered.length <= 2 ? true : undefined}>
                    <summary>
                      <span className="fi-faq-item__q">{item.question}</span>
                      <span className="fi-faq-item__icon" aria-hidden="true" />
                    </summary>
                    <FaqAnswer answer={item.answer} links={item.links} />
                  </details>
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="fi-faq-empty" role="status"><strong>{copy.noResults}</strong><p>{copy.noResultsHelp}</p></div>
        )}
      </div>
    </div>
  );
}
