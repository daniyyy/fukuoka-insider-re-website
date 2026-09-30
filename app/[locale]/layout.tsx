import { isLocale } from "@/config/site";

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const language = isLocale(locale) ? (locale === "zh-TW" ? "zh-Hant" : locale) : "zh-Hant";
  return <div lang={language}>{children}</div>;
}
