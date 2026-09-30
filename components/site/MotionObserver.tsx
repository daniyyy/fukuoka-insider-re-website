"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll-in reveals for a small, fixed set of elements (framed photos, feature photos, the Hakata stripe).
 * Content is visible by default: the hidden starting state only applies when <html> carries `fi-motion`,
 * which the inline head script sets for visitors who have not asked for reduced motion.
 */
const SELECTOR = ".fi-frame:not(.fi-frame--hero), .fi-hakata, .fi-home-services__photo, .fi-about-story__photo, .fi-article-cover, .fi-reveal";

export function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("fi-motion")) return;
    root.classList.add("fi-motion-ready");
    const targets = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter((el) => !el.classList.contains("is-in"));
    // A plain position check (not IntersectionObserver) so fast scrolling or jumping to an anchor
    // never leaves an element that is already above the fold hidden.
    let pending = targets;
    let frame = 0;
    const check = () => {
      frame = 0;
      const limit = window.innerHeight * 0.9;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < limit) {
          el.classList.add("is-in");
          return false;
        }
        return true;
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
    // Safety net: never leave anything hidden (e.g. when printing).
    const fallback = window.setTimeout(() => pending.forEach((el) => el.classList.add("is-in")), 8000);
    return () => {
      detach();
      if (frame) window.cancelAnimationFrame(frame);
      window.clearTimeout(fallback);
    };
  }, [pathname]);

  return null;
}
