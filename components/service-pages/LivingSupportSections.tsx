import type { CSSProperties } from "react";

import { AnalyticsLink } from "@/components/analytics/AnalyticsLink";
import { ArrowIcon } from "@/components/site/Icons";
import type { Locale } from "@/config/site";
import { livingSupportCopy, type LivingIcon } from "@/data/living-support";

/** Line icons for the six direct services: they help visitors who read little Japanese or Chinese recognise each item. */
const iconPaths: Record<LivingIcon, string[]> = {
  utilities: ["M9 18h6", "M10 21h4", "M12 3a6 6 0 0 0-3.6 10.8c.7.5 1.1 1.3 1.1 2.1v.1h5v-.1c0-.8.4-1.6 1.1-2.1A6 6 0 0 0 12 3z", "M12 7l-1.5 3h3L12 13"],
  furniture: ["M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3", "M3 12.5a1.5 1.5 0 0 1 3 0V15h12v-2.5a1.5 1.5 0 0 1 3 0V18H3z", "M5 18v2", "M19 18v2"],
  "ward-office": ["M3 21h18", "M12 3l9 5H3z", "M4 10h16", "M6 10v8", "M10 10v8", "M14 10v8", "M18 10v8", "M4 18h16"],
  phone: ["M8 3h8a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z", "M11 18h2"],
  bank: ["M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18z", "M9 7l3 4 3-4", "M12 11v6", "M9 12.5h6", "M9 15h6"],
  shopping: ["M5 8h14l-1 12H6z", "M9 10V7a3 3 0 0 1 6 0v3"],
};

function LivingIconSvg({ icon }: { icon: LivingIcon }) {
  return (
    <svg className="fi-living-item__icon" viewBox="0 0 24 24" aria-hidden="true">
      {iconPaths[icon].map((d) => <path d={d} key={d} />)}
    </svg>
  );
}

/**
 * Living Support page body (Danny, 2026-10-05): who it is for, the six direct services laid out along the
 * order of a move, partner introductions plus "ask us about anything else", and how to arrange support.
 */
export function LivingSupportSections({ locale }: { locale: Locale }) {
  const copy = livingSupportCopy[locale];
  // Running numbers 01–06 across phases.
  const offsets = copy.phases.map((_, index) => copy.phases.slice(0, index).reduce((sum, phase) => sum + phase.items.length, 0));

  return (
    <>
      <section className="fi-service-audience" aria-labelledby="audience-title">
        <div className="fi-shell fi-service-audience__grid">
          <h2 className="fi-h2" id="audience-title">{copy.audienceTitle}</h2>
          <ul className="fi-service-audience__list">
            {copy.audiences.map((item) => (
              <li key={item.title}>
                <h3 className="fi-h3">{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="fi-living-services" aria-labelledby="living-services-title">
        <div className="fi-shell">
          <header className="fi-section-head">
            <h2 className="fi-h2" id="living-services-title">{copy.servicesTitle}</h2>
            <p className="fi-body">{copy.servicesIntro}</p>
          </header>
          <ol className="fi-living-timeline">
            {copy.phases.map((phase, phaseIndex) => (
              <li className="fi-living-phase" key={phase.label} style={{ "--span": phase.items.length } as CSSProperties}>
                <p className="fi-living-phase__label">{phase.label}</p>
                <ul className="fi-living-phase__items">
                  {phase.items.map((item, itemIndex) => {
                    const number = offsets[phaseIndex] + itemIndex + 1;
                    return (
                      <li className="fi-living-item" key={item.title}>
                        <div className="fi-living-item__head">
                          <LivingIconSvg icon={item.icon} />
                          <span className="fi-living-item__no" aria-hidden="true">{String(number).padStart(2, "0")}</span>
                        </div>
                        <h3 className="fi-living-item__title">{item.title}</h3>
                        <p className="fi-living-item__body">{item.body}</p>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="fi-living-others" aria-labelledby="living-others-title">
        <div className="fi-shell fi-living-others__grid">
          <div className="fi-living-others__copy">
            <h2 className="fi-h2" id="living-others-title">{copy.othersTitle}</h2>
            <p className="fi-body">{copy.othersIntro}</p>
            <AnalyticsLink className="fi-text-link" href={`/${locale}/contact`} event={{ name: "consultation_cta_click", locale, source: "service-page" }}>
              {copy.othersLink}
              <ArrowIcon />
            </AnalyticsLink>
          </div>
          <div className="fi-living-partners">
            <p className="fi-living-partners__label">{copy.partnerLabel}</p>
            <dl className="fi-living-partners__list">
              {copy.partners.map((item) => (
                <div className="fi-living-partners__row" key={item.title}>
                  <dt>{item.title}</dt>
                  <dd>{item.body}</dd>
                </div>
              ))}
            </dl>
            <p className="fi-living-partners__note fi-meta">{copy.partnerNote}</p>
          </div>
        </div>
      </section>

      <section className="fi-service-process" aria-labelledby="process-title">
        <div className="fi-shell">
          <h2 className="fi-h2" id="process-title">{copy.processTitle}</h2>
          <ol className="fi-steps fi-steps--3">
            {copy.process.map((step, index) => (
              <li className="fi-step" key={step.title}>
                <span className="fi-step__number" aria-hidden="true">{index + 1}</span>
                <h3 className="fi-step__title">{step.title}</h3>
                <p className="fi-step__body">{step.body}</p>
              </li>
            ))}
          </ol>
          <dl className="fi-living-fee">
            <dt>{copy.feeLabel}</dt>
            <dd>{copy.feeNote}</dd>
          </dl>
        </div>
      </section>
    </>
  );
}
