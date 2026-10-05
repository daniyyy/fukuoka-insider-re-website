import { asset, siteConfig, type Locale } from "@/config/site";

const labels: Record<Locale, { heading: string; company: string; licence: string; professional: string; professionalValue: string; languages: string }> = {
  "zh-TW": { heading: "公司資料", company: "公司", licence: "宅地建物取引業免許", professional: "專業支援", professionalValue: "由宅地建物取引士提供", languages: "溝通語言" },
  ja: { heading: "会社情報", company: "会社", licence: "宅地建物取引業免許", professional: "専門サポート", professionalValue: "宅地建物取引士が対応", languages: "対応言語" },
  en: { heading: "Company details", company: "Company", licence: "Real estate brokerage licence", professional: "Professional support", professionalValue: "Licensed Real Estate Transaction Specialist", languages: "Languages" },
};

/** A quiet, factual strip: who the visitor is dealing with. Data comes from config/site.ts. */
export function CompanyFacts({ locale }: { locale: Locale }) {
  const t = labels[locale];
  return (
    <section className="fi-company-facts" aria-label={t.heading}>
      <div className="fi-shell fi-company-facts__inner">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="fi-company-facts__mark" src={asset("/images/brand/symbol-dark.svg")} alt="" width={40} height={41} />
        <dl className="fi-company-facts__list">
          <div><dt>{t.company}</dt><dd>{siteConfig.company}</dd></div>
          <div><dt>{t.licence}</dt><dd lang="ja">{siteConfig.contact.licence}</dd></div>
          <div><dt>{t.professional}</dt><dd>{t.professionalValue}</dd></div>
          <div><dt>{t.languages}</dt><dd>{siteConfig.company_profile.languagesShort[locale]}</dd></div>
        </dl>
      </div>
    </section>
  );
}
