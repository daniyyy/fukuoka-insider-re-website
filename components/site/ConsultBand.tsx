import { AnalyticsLink } from "@/components/analytics/AnalyticsLink";
import { ArrowIcon } from "@/components/site/Icons";
import { siteConfig, type Locale } from "@/config/site";

const labels: Record<Locale, { cta: string; line: string; whatsapp: string; call: string }> = {
  "zh-TW": { cta: "免費諮詢", line: "LINE 聯絡", whatsapp: "WhatsApp 聯絡", call: "致電" },
  ja: { cta: "無料相談", line: "LINEで相談", whatsapp: "WhatsAppで相談", call: "電話で相談" },
  en: { cta: "Free Consultation", line: "Chat on LINE", whatsapp: "Chat on WhatsApp", call: "Call us" },
};

type Source = "homepage-final" | "service-page" | "about-page" | "help-page" | "calculator";

/** The closing conversion band shared by every page: one primary action; LINE, WhatsApp and phone as secondary routes. */
export function ConsultBand({ locale, title, body, source, id = "consultation" }: { locale: Locale; title: string; body: string; source: Source; id?: string }) {
  const t = labels[locale];
  const telephone = locale === "ja" ? siteConfig.contact.telephone : siteConfig.contact.telephoneInternational;
  const headingId = `${id}-title`;
  return (
    <section className="fi-consult fi-on-dark" id={id} aria-labelledby={headingId}>
      <div className="fi-shell fi-consult__grid">
        <div className="fi-consult__copy">
          <h2 className="fi-h2" id={headingId}>{title}</h2>
          <p className="fi-lead">{body}</p>
        </div>
        <div className="fi-consult__actions">
          <AnalyticsLink className="fi-button fi-button--light fi-consult__primary" href={`/${locale}/contact`} event={{ name: "consultation_cta_click", locale, source }}>
            {t.cta}
            <ArrowIcon />
          </AnalyticsLink>
          <AnalyticsLink className="fi-button fi-button--ghost-light" href={siteConfig.contact.line} target="_blank" rel="noreferrer" event={{ name: "contact_channel_click", locale, source, channel: "line" }}>
            {t.line}
          </AnalyticsLink>
          <AnalyticsLink className="fi-button fi-button--ghost-light" href={siteConfig.contact.whatsapp} target="_blank" rel="noreferrer" event={{ name: "contact_channel_click", locale, source, channel: "whatsapp" }}>
            {t.whatsapp}
          </AnalyticsLink>
          <a className="fi-button fi-button--ghost-light fi-consult__tel" href={siteConfig.contact.telephoneHref} aria-label={`${t.call} ${telephone}`}>
            {telephone}
          </a>
        </div>
      </div>
    </section>
  );
}
