"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import type { Locale } from "@/config/site";

/**
 * Small, dismissible note at the bottom of the screen when the browser prefers Japanese or English
 * but the visitor is reading another language (Danny, 2026-10-05). It never redirects: many Hong Kong
 * and Taiwan visitors use an English phone, so anyone whose browser lists Chinese, or a Hong Kong / Taiwan / Macau
 * region, gets no suggestion.
 * Dismissal is remembered per browser when storage is available.
 */
const STORAGE_KEY = "fi-language-suggest-dismissed";

const copy: Record<Exclude<Locale, "zh-TW">, { text: string; cta: string; close: string }> = {
  ja: { text: "このサイトは日本語でもご覧いただけます。", cta: "日本語で見る", close: "閉じる" },
  en: { text: "This site is also available in English.", cta: "View in English", close: "Close" },
};

function preferredLocale(): Exclude<Locale, "zh-TW"> | null {
  const list = (navigator.languages?.length ? navigator.languages : [navigator.language]).map((item) => item.toLowerCase());
  // Chinese anywhere in the list, or a Hong Kong / Taiwan / Macau English setting (e.g. en-HK): treat as a Chinese reader.
  if (list.some((item) => item.startsWith("zh") || /-(hk|tw|mo)\b/.test(item))) return null;
  const first = list[0] ?? "";
  if (first.startsWith("ja")) return "ja";
  if (first.startsWith("en")) return "en";
  return null;
}

export function LanguageSuggest({ locale }: { locale: Locale }) {
  const [target, setTarget] = useState<Exclude<Locale, "zh-TW"> | null>(null);

  useEffect(() => {
    let dismissed = false;
    try { dismissed = window.localStorage.getItem(STORAGE_KEY) === "1"; } catch { dismissed = false; }
    const preferred = preferredLocale();
    // Reading browser settings is only possible after mounting, so the note appears on the client.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!dismissed && preferred && preferred !== locale) setTarget(preferred);
  }, [locale]);

  if (!target) return null;
  const t = copy[target];
  const dismiss = () => {
    try { window.localStorage.setItem(STORAGE_KEY, "1"); } catch { /* storage unavailable: hide for this page only */ }
    setTarget(null);
  };

  return (
    <aside className="fi-lang-suggest" lang={target} aria-label={t.text}>
      <p>{t.text}</p>
      <Link className="fi-lang-suggest__cta" href={`/${target}/`} onClick={dismiss}>{t.cta}</Link>
      <button type="button" className="fi-lang-suggest__close" aria-label={t.close} onClick={dismiss}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>
    </aside>
  );
}
