import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";

import { isServiceKey, ServicePage } from "@/components/service-pages/ServicePage";
import { isLocale } from "@/config/site";
import { serviceDetailCopy, serviceKeys } from "@/data/service-pages";
import { fixedPageMetadata } from "@/lib/seo/fixed-page";

type PageProps = { params: Promise<{ locale: string; service: string }> };

const legacyKeys = ["buy", "sell"] as const;
const isLegacyKey = (value: string): value is (typeof legacyKeys)[number] => legacyKeys.includes(value as (typeof legacyKeys)[number]);

export function generateStaticParams() {
  return ["zh-TW", "ja", "en"].flatMap((locale) => [...serviceKeys, ...legacyKeys].map((service) => ({ locale, service })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, service } = await params;
  if (!isLocale(locale) || !isServiceKey(service)) return {};
  const copy = serviceDetailCopy[service][locale];
  return fixedPageMetadata(locale, `/services/${service}`, copy.metaTitle, copy.description, service);
}

export default async function ServiceRoute({ params }: PageProps) {
  const { locale, service } = await params;
  if (!isLocale(locale)) notFound();
  if (isLegacyKey(service)) permanentRedirect(`/${locale}/services/buy-sell`);
  if (!isServiceKey(service)) notFound();
  return <ServicePage locale={locale} service={service} />;
}
