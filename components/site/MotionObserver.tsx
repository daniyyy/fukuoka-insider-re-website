"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Scroll-in motion, two kinds:
 * 1. Media reveals (framed photos, feature photos, the Hakata stripe): the image rises out of a mask.
 * 2. Content reveals (section headings, steps, cards, list rows): a short fade-and-rise, staggered among siblings.
 *
 * Content is visible by default. Media hiding only applies under html.fi-motion (set before paint for visitors
 * who have not asked for reduced motion). Content hiding needs html.fi-reveal-on, which is added here only after
 * everything already on screen has been marked visible, so nothing that was painted ever disappears.
 */
const MEDIA = ".fi-frame:not(.fi-frame--hero), .fi-hakata, .fi-home-services__photo, .fi-about-story__photo, .fi-article-cover, .fi-reveal";

const CONTENT = [
  "main .fi-h2",
  ".fi-section-head",
  ".fi-service-audience__title",
  ".fi-service-audience__list > li",
  ".fi-service-panel",
  ".fi-step",
  ".fi-sheet",
  ".fi-service-limits",
  ".fi-guide-card",
  ".fi-guide-row",
  ".fi-home-faq > li",
  ".fi-faq-item",
  ".fi-related-card",
  ".fi-route",
  ".fi-estimate-card",
  ".fi-living-phase",
  ".fi-living-partners__row",
  ".fi-profile > div",
  ".fi-facts__row",
  ".fi-person",
  ".fi-portrait",
  ".fi-overview-item__copy",
  ".fi-consult__copy",
  ".fi-consult__actions",
  ".fi-company-facts__inner",
  ".fi-home-life__panel",
  ".fi-legal__sections > li",
].join(", ");

/** Siblings in one group enter one after another, but never more than this many steps apart. */
const MAX_STAGGER = 5;

export function MotionObserver() {
  const pathname = usePathname();
  const firstRun = useRef(true);

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("fi-motion")) return;
    root.classList.add("fi-motion-ready");

    // A soft arrival for pages reached by in-site navigation (the first load has its own entrance).
    if (!firstRun.current && !window.location.hash) {
      document.querySelector("main")?.animate(
        [{ opacity: 0, transform: "translateY(0.75rem)" }, { opacity: 1, transform: "none" }],
        { duration: 560, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
      );
    }
    firstRun.current = false;

    const limit = () => window.innerHeight * 0.88;
    const onScreen = (el: Element) => el.getBoundingClientRect().top < limit();

    // Content: skip elements nested inside another content target, number siblings for the stagger.
    const all = Array.from(document.querySelectorAll<HTMLElement>(CONTENT));
    const set = new Set(all);
    const content = all.filter((el) => {
      for (let parent = el.parentElement; parent; parent = parent.parentElement) {
        if (set.has(parent)) return false;
      }
      return !el.hasAttribute("data-fi-reveal");
    });
    const counters = new Map<Element, number>();
    content.forEach((el) => {
      if (onScreen(el)) el.classList.add("is-in");
      const parent = el.parentElement;
      if (parent) {
        const index = counters.get(parent) ?? 0;
        counters.set(parent, index + 1);
        el.style.setProperty("--fi-i", String(Math.min(index, MAX_STAGGER)));
      }
      el.setAttribute("data-fi-reveal", "");
    });
    root.classList.add("fi-reveal-on");

    const media = Array.from(document.querySelectorAll<HTMLElement>(MEDIA)).filter((el) => !el.classList.contains("is-in"));
    // A plain position check (not IntersectionObserver) so fast scrolling or jumping to an anchor
    // never leaves an element that is already above the fold hidden.
    let pending: HTMLElement[] = [...media, ...content.filter((el) => !el.classList.contains("is-in"))];
    let frame = 0;
    const check = () => {
      frame = 0;
      const edge = limit();
      const entering: HTMLElement[] = [];
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < edge) {
          entering.push(el);
          return false;
        }
        return true;
      });
      // Siblings that arrive together keep their stagger; a lone late arrival starts at once.
      entering.forEach((el) => {
        if (entering.length === 1) el.style.setProperty("--fi-i", "0");
        el.classList.add("is-in");
      });
      if (!pending.length) detach();
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(check);
    };
    const detach = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();
    // Printing shows everything (see motion.css); there is no timed fallback, so a slow reader still sees each entrance.
    return () => {
      detach();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
