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
  validYen,
  type RentalBaseKey,
  type RentalInputs,
  type RentalItemKey,
} from "@/lib/tools/calculators";

type Values = Record<RentalItemKey, string>;
type Included = Record<RentalItemKey, boolean>;
type Base = Record<RentalBaseKey, string>;
type State = { base: Base; values: Values; included: Included };

const num = (raw: string) => (raw.trim() === "" ? Number.NaN : Number(raw));
const baseKeys: RentalBaseKey[] = ["rent", "commonFee"];

const toInputs = ({ base, values, included }: State): RentalInputs => ({
  rent: num(base.rent),
  commonFee: num(base.commonFee),
  values: Object.fromEntries(rentalItems.map(({ key }) => [key, num(values[key])])) as Record<RentalItemKey, number>,
  included,
});

/**
 * Rental initial cost estimator.
 * Monthly rent and common-area fee come first and are always required (no tick box).
 * Each cost item below has a tick box; unticked items stay editable but are left out of the total.
 */
export function RentalEstimator({ locale }: { locale: Locale }) {
  const t = toolsCopy[locale].tools["rental-initial-cost"];
  const [state, setState] = useState<State>(() => ({
    base: { rent: String(rentalExample.rent), commonFee: String(rentalExample.commonFee) },
    values: Object.fromEntries(rentalItems.map(({ key }) => [key, String(rentalExample.values[key])])) as Values,
    included: { ...rentalExample.included },
  }));
  const { base, values, included } = state;
  const started = useRef(false);
  const completed = useRef(false);
  const inputs = toInputs(state);
  const result = calculateRentalInitialCost(inputs);

  const update = (next: State) => {
    setState(next);
    if (!started.current) { trackEvent({ name: "calculator_start", locale, source: "calculator", tool: "rental-initial-cost" }); started.current = true; }
    if (!completed.current && calculateRentalInitialCost(toInputs(next))) {
      trackEvent({ name: "calculator_complete", locale, source: "calculator", tool: "rental-initial-cost" });
      completed.current = true;
    }
  };

  return (
    <section className="fi-estimator" aria-label={t.title}>
      <div className="fi-shell fi-estimator__grid">
        <div className="fi-estimator__form">
          <p className="fi-estimator__sample">{t.sample}</p>
          <h2>{t.baseTitle}</h2>
          <div className="fi-cost-base">
            {baseKeys.map((key) => {
              const raw = base[key];
              const field = t.fields[key];
              const invalid = !validYen(num(raw));
              return (
                <div className="fi-cost-base__field" key={key}>
                  <label htmlFor={`cost-${key}`}>{field.label}</label>
                  <div className="fi-cost-item__input">
                    <input
                      id={`cost-${key}`}
                      type="number"
                      inputMode="numeric"
                      min="0"
                      step="1"
                      required
                      value={raw}
                      aria-invalid={invalid || undefined}
                      aria-describedby={`cost-hint-${key}`}
                      onChange={(event) => update({ ...state, base: { ...base, [key]: event.target.value } })}
                    />
                    <span className="fi-cost-item__unit">{t.unitYen}</span>
                  </div>
                  {field.hint ? <small id={`cost-hint-${key}`}>{field.hint}</small> : null}
                </div>
              );
            })}
          </div>
          <h2>{t.inputTitle}</h2>
          <ul className="fi-cost-items">
            {rentalItems.map((spec) => {
              const { key, unit } = spec;
              const raw = values[key];
              const on = included[key];
              const amount = rentalItemAmount(spec, inputs);
              const value = num(raw);
              const invalid = unit === "yen" ? amount === null : !(Number.isFinite(value) && value >= 0 && value <= 24);
              const field = t.fields[key];
              return (
                <li className={`fi-cost-item${on ? "" : " is-off"}`} key={key}>
                  <input
                    className="fi-cost-item__check"
                    type="checkbox"
                    id={`include-${key}`}
                    checked={on}
                    onChange={(event) => update({ ...state, included: { ...included, [key]: event.target.checked } })}
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
                        onChange={(event) => update({ ...state, values: { ...values, [key]: event.target.value } })}
                      />
                      <span className="fi-cost-item__unit">{unit === "months" ? t.unitMonths : t.unitYen}</span>
                    </div>
                    {unit === "months" ? (
                      <output className="fi-cost-item__amount" htmlFor={`cost-${key} ${spec.base === "fee" ? "cost-commonFee" : spec.base === "rentAndFee" ? "cost-rent cost-commonFee" : "cost-rent"}`}>{amount === null ? "—" : `= ${formatYen(amount, locale)}`}</output>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
          {result ? (
            <div className="fi-estimator__sticky" aria-hidden="true">
              <span>{t.total}<small>{t.reference}</small></span>
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
              <p className="fi-estimator__reference">{t.reference}</p>
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
