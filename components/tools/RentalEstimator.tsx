"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { AnalyticsLink } from "@/components/analytics/AnalyticsLink";
import { ArrowIcon } from "@/components/site/Icons";
import type { Locale } from "@/config/site";
import { toolsCopy } from "@/data/tools";
import { trackEvent } from "@/lib/analytics/events";
import {
  calculateRentalInitialCost,
  formatYen,
  rentalExample,
  rentalItemAmount,
  rentalItems,
  type RentalInputs,
  type RentalItemKey,
} from "@/lib/tools/calculators";

type Values = Record<RentalItemKey, string>;
type Included = Record<RentalItemKey, boolean>;

const toInputs = (values: Values, included: Included): RentalInputs => ({
  values: Object.fromEntries(rentalItems.map(({ key }) => [key, values[key].trim() === "" ? Number.NaN : Number(values[key])])) as Record<RentalItemKey, number>,
  included,
});

/**
 * Rental initial cost estimator: one row per cost item, each with a tick box.
 * Unticked items stay editable but are left out of the total.
 */
export function RentalEstimator({ locale }: { locale: Locale }) {
  const t = toolsCopy[locale].tools["rental-initial-cost"];
  const [values, setValues] = useState<Values>(() => Object.fromEntries(rentalItems.map(({ key }) => [key, String(rentalExample.values[key])])) as Values);
  const [included, setIncluded] = useState<Included>(() => ({ ...rentalExample.included }));
  const started = useRef(false);
  const completed = useRef(false);
  const inputs = toInputs(values, included);
  const result = calculateRentalInitialCost(inputs);

  const track = (nextValues: Values, nextIncluded: Included) => {
    if (!started.current) { trackEvent({ name: "calculator_start", locale, source: "calculator", tool: "rental-initial-cost" }); started.current = true; }
    if (!completed.current && calculateRentalInitialCost(toInputs(nextValues, nextIncluded))) {
      trackEvent({ name: "calculator_complete", locale, source: "calculator", tool: "rental-initial-cost" });
      completed.current = true;
    }
  };

  return (
    <section className="fi-estimator" aria-label={t.title}>
      <div className="fi-shell fi-estimator__grid">
        <div className="fi-estimator__form">
          <h2>{t.inputTitle}</h2>
          <p className="fi-estimator__sample">{t.sample}</p>
          <ul className="fi-cost-items">
            {rentalItems.map((spec) => {
              const { key, unit } = spec;
              const raw = values[key];
              const on = included[key];
              const amount = rentalItemAmount(spec, inputs);
              const invalid = amount === null && (unit === "yen" || raw.trim() === "" || Number.isNaN(Number(raw)) || Number(raw) < 0 || Number(raw) > 24);
              const field = t.fields[key];
              return (
                <li className={`fi-cost-item${on ? "" : " is-off"}`} key={key}>
                  <input
                    className="fi-cost-item__check"
                    type="checkbox"
                    id={`include-${key}`}
                    checked={on}
                    onChange={(event) => {
                      const next = { ...included, [key]: event.target.checked };
                      setIncluded(next);
                      track(values, next);
                    }}
                    aria-label={`${t.includeLabel ?? ""} ${field.label}`.trim()}
                  />
                  <div className="fi-cost-item__text">
                    <label htmlFor={`cost-${key}`}>{field.label}</label>
                    {field.hint ? <small id={`cost-hint-${key}`}>{field.hint}</small> : null}
                  </div>
                  <div className="fi-cost-item__value">
                    <div className="fi-cost-item__input">
                      <input
                        id={`cost-${key}`}
                        type="number"
                        inputMode={unit === "months" ? "decimal" : "numeric"}
                        min="0"
                        max={unit === "months" ? "24" : "1000000000000"}
                        step={unit === "months" ? "0.1" : "1"}
                        value={raw}
                        aria-invalid={invalid || undefined}
                        aria-describedby={field.hint ? `cost-hint-${key}` : undefined}
                        onChange={(event) => {
                          const next = { ...values, [key]: event.target.value };
                          setValues(next);
                          track(next, included);
                        }}
                      />
                      <span className="fi-cost-item__unit">{unit === "months" ? t.unitMonths : t.unitYen}</span>
                    </div>
                    {unit === "months" ? (
                      <output className="fi-cost-item__amount" htmlFor={`cost-${key} cost-rent`}>{amount === null ? "—" : `= ${formatYen(amount, locale)}`}</output>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
          {result ? (
            <div className="fi-estimator__sticky" aria-hidden="true">
              <span>{t.total}</span>
              <strong>{formatYen(result.total, locale)}</strong>
            </div>
          ) : null}
        </div>
        <section className="fi-estimator__result" aria-labelledby="cost-result-title">
          <h2 id="cost-result-title">{t.resultTitle}</h2>
          {result ? (
            <>
              <dl className="fi-estimator__rows">
                {result.lines.map((line) => (
                  <div key={line.key}><dt>{t.fields[line.key].label}</dt><dd>{formatYen(line.amount, locale)}</dd></div>
                ))}
              </dl>
              <div className="fi-estimator__total" aria-live="polite"><span>{t.total}</span><strong>{formatYen(result.total, locale)}</strong></div>
            </>
          ) : <p className="fi-estimator__note" role="alert">{t.invalid}</p>}
          <p className="fi-estimator__note">{t.note}</p>
          <div className="fi-estimator__actions">
            <AnalyticsLink className="fi-button" href={`/${locale}/contact`} event={{ name: "consultation_cta_click", locale, source: "calculator" }}>{locale === "zh-TW" ? "免費諮詢" : locale === "ja" ? "無料相談" : "Free Consultation"}<ArrowIcon /></AnalyticsLink>
            <Link className="fi-text-link" href={`/${locale}/services/rent`}>{t.related}<ArrowIcon /></Link>
          </div>
        </section>
      </div>
    </section>
  );
}
