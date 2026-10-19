"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Eases a displayed number towards its new value (about 0.6s) so totals count up or down
 * instead of jumping. Visitors who ask for reduced motion see the new value at once.
 * Use for display only; keep the exact value in an aria-live / visually hidden element.
 */
export function useTweenedNumber(target: number | null, duration = 600) {
  const [shown, setShown] = useState(target);
  const shownRef = useRef(target);

  useEffect(() => {
    const from = shownRef.current;
    const instant = target === null || from === null || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (from === target) return;
    const start = performance.now();
    let frame = 0;
    const step = (now: number) => {
      const t = instant ? 1 : Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      const value = instant || target === null || from === null ? target : Math.round(from + (target - from) * eased);
      shownRef.current = value;
      setShown(value);
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return shown;
}

/** A number that counts to its new value; the exact value stays available to screen readers. */
export function TweenedValue({ value, format }: { value: number; format: (value: number) => string }) {
  const shown = useTweenedNumber(value);
  return (
    <>
      <span aria-hidden="true">{format(shown ?? value)}</span>
      <span className="fi-visually-hidden">{format(value)}</span>
    </>
  );
}
