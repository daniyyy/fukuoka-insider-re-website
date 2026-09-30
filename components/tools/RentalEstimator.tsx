"use client";

import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";

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
  type RentalItemGroup,
  type RentalItemKey,
  type RentalItemSpec,
} from "@/lib/tools/calculators";

type Values = Record<RentalItemKey, string>;
type Included = Record<RentalItemKey, boolean>;
type Base = Record<RentalBaseKey, string>;
type State = { base: Base; values: Values; included: Included };

/** Published guides linked from the estimator (zh-TW only; empty for other languages). */
export type RentalGuideLink = { href: string; title: string };
export type RentalGuideLinks = { explainer?: RentalGuideLink; items: Partial<Record<RentalItemKey, RentalGuideLink>> };

const num = (raw: string) => (raw.replace(/,/g, "").trim() === "" ? Number.NaN : Number(raw.replace(/,/g, "")));
const baseKeys: RentalBaseKey[] = ["rent", "commonFee"];
const groups: RentalItemGroup[] = ["standard", "optional"];

const toInputs = ({ base, values, included }: State): RentalInputs => ({
  rent: num(base.rent),
  commonFee: num(base.commonFee),
  values: Object.fromEntries(rentalItems.map(({ key }) => [key, num(values[key])])) as Record<RentalItemKey, number>,
  included,
});

/** 100000 → "100,000" (whole yen only); anything else is shown as typed. */
const withCommas = (raw: string) => (/^\d+$/.test(raw) ? Number(raw).toLocaleString("en-US") : raw);

/**
 * Number field that always shows thousands separators for yen (100,000).
 * The caret is kept after the same digit when separators are added or removed while typing.
 */
function AmountInput({ id, value, unit, months, invalid, describedBy, required, onChange }: {
  id: string; value: string; unit: string; months?: boolean; invalid?: boolean; describedBy?: string; required?: boolean; onChange: (value: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const caretDigits = useRef<number | null>(null);
  const shown = months ? value : withCommas(value);

  useLayoutEffect(() => {
    const input = ref.current;
    if (!input || caretDigits.current === null || document.activeElement !== input) return;
    let digits = caretDigits.current;
    let position = 0;
    while (position < shown.length && digits > 0) {
      if (shown[position] !== ",") digits -= 1;
      position += 1;
    }
    input.setSelectionRange(position, position);
    caretDigits.current = null;
  }, [shown]);

  return (
    <div className="fi-amount">
      <input
        ref={ref}
        id={id}
        type="text"
        inputMode={months ? "decimal" : "numeric"}
        autoComplete="off"
        spellCheck={false}
        required={required}
        value={shown}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onChange={(event) => {
          const typed = event.target.value;
          const caret = event.target.selectionStart ?? typed.length;
          caretDigits.current = typed.slice(0, caret).replace(/[,\s，]/g, "").length;
          onChange(typed.replace(/[,\s，]/g, "").replace(/[０-９．]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0)));
        }}
      />
      <span className="fi-amount__unit" aria-hidden="true">{unit}</span>
    </div>
  );
}

function GuideLink({ link, label, newTab }: { link: RentalGuideLink; label: string; newTab: string }) {
  return (
    <a className="fi-cost-guide" href={link.href} target="_blank" rel="noopener noreferrer" title={link.title}>
      {label}
      <span className="fi-visually-hidden">：{link.title}{newTab}</span>
      <svg aria-hidden="true" viewBox="0 0 16 16"><path d="M6 3.5h6.5V10M12.5 3.5 4 12" /></svg>
    </a>
  );
}

/**
 * Rental initial cost estimator (Danny, 2026-09-30).
 * 01 Monthly rent and common-area fee: required, no tick box.
 * 02 Costs charged on most contracts: ticked by default.
 * 03 Costs that depend on the property: unticked by default.
 * Unticked items stay editable but are left out of the total.
 */
export function RentalEstimator({ locale, guides = { items: {} } }: { locale: Locale; guides?: RentalGuideLinks }) {
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
  const monthly = validYen(inputs.rent) && validYen(inputs.commonFee) ? inputs.rent + inputs.commonFee : null;
  const newTab = t.newTab ?? "";

  const update = (next: State) => {
    setState(next);
    if (!started.current) { trackEvent({ name: "calculator_start", locale, source: "calculator", tool: "rental-initial-cost" }); started.current = true; }
    if (!completed.current && calculateRentalInitialCost(toInputs(next))) {
      trackEvent({ name: "calculator_complete", locale, source: "calculator", tool: "rental-initial-cost" });
      completed.current = true;
    }
  };

  const renderItem = (spec: RentalItemSpec) => {
    const { key, unit } = spec;
    const raw = values[key];
    const on = included[key];
    const amount = rentalItemAmount(spec, inputs);
    const value = num(raw);
    const invalid = unit === "yen" ? amount === null : !(Number.isFinite(value) && value >= 0 && value <= 24);
    const field = t.fields[key];
    const guide = guides.items[key];
    return (
      <li className={`fi-cost-item${on ? "" : " is-off"}`} key={key}>
        <input
          className="fi-check"
          type="checkbox"
          id={`include-${key}`}
          checked={on}
          onChange={(event) => update({ ...state, included: { ...included, [key]: event.target.checked } })}
          aria-label={`${t.includeLabel ?? ""} ${field.label}`.trim()}
        />
        <div className="fi-cost-item__text">
          <label htmlFor={`cost-${key}`}>{field.label}</label>
          {field.hint ? <small id={`cost-hint-${key}`}>{field.hint}</small> : null}
          {guide ? <GuideLink link={guide} label={t.itemGuide ?? ""} newTab={newTab} /> : null}
        </div>
        <div className="fi-cost-item__value">
          <AmountInput
            id={`cost-${key}`}
            value={raw}
            unit={unit === "months" ? t.unitMonths ?? "" : t.unitYen ?? ""}
            months={unit === "months"}
            invalid={invalid}
            describedBy={field.hint ? `cost-hint-${key}` : undefined}
            onChange={(next) => update({ ...state, values: { ...values, [key]: next } })}
          />
          {unit === "months" ? (
            <output className="fi-cost-item__amount" htmlFor={`cost-${key} ${spec.base === "fee" ? "cost-commonFee" : spec.base === "rentAndFee" ? "cost-rent cost-commonFee" : "cost-rent"}`}>
              {amount === null ? "—" : `= ${formatYen(amount, locale)}`}
            </output>
          ) : null}
        </div>
      </li>
    );
  };

  const groupCopy = {
    standard: { title: t.groupStandard, note: t.groupStandardNote },
    optional: { title: t.groupOptional, note: t.groupOptionalNote },
  } as const;

  return (
    <section className="fi-estimator" aria-label={t.title}>
      <div className="fi-shell fi-estimator__grid">
        <div className="fi-estimator__form">
          <p className="fi-estimator__sample">{t.sample}</p>

          <section className="fi-cost-group fi-cost-group--base" aria-labelledby="cost-group-base">
            <header className="fi-cost-group__head">
              <span className="fi-cost-group__no" aria-hidden="true">01</span>
              <h2 id="cost-group-base">{t.baseTitle}</h2>
              <p>{t.baseNote}</p>
            </header>
            <div className="fi-cost-base">
              {baseKeys.map((key) => {
                const field = t.fields[key];
                return (
                  <div className="fi-cost-base__field" key={key}>
                    <label htmlFor={`cost-${key}`}>{field.label}</label>
                    <AmountInput
                      id={`cost-${key}`}
                      value={base[key]}
                      unit={t.unitYen ?? ""}
                      required
                      invalid={!validYen(num(base[key]))}
                      describedBy={`cost-hint-${key}`}
                      onChange={(next) => update({ ...state, base: { ...base, [key]: next } })}
                    />
                    {field.hint ? <small id={`cost-hint-${key}`}>{field.hint}</small> : null}
                  </div>
                );
              })}
            </div>
          </section>

          {groups.map((group, index) => (
            <section className={`fi-cost-group fi-cost-group--${group}`} aria-labelledby={`cost-group-${group}`} key={group}>
              <header className="fi-cost-group__head">
                <span className="fi-cost-group__no" aria-hidden="true">{`0${index + 2}`}</span>
                <h2 id={`cost-group-${group}`}>{groupCopy[group].title}</h2>
                <p>{groupCopy[group].note}</p>
              </header>
              {group === "standard" && guides.explainer ? (
                <a className="fi-cost-explainer" href={guides.explainer.href} target="_blank" rel="noopener noreferrer">
                  <span className="fi-cost-explainer__lead">{t.explainerLead}</span>
                  <span className="fi-cost-explainer__title">{guides.explainer.title}</span>
                  <span className="fi-visually-hidden">{newTab}</span>
                  <svg aria-hidden="true" viewBox="0 0 16 16"><path d="M6 3.5h6.5V10M12.5 3.5 4 12" /></svg>
                </a>
              ) : null}
              <ul className="fi-cost-items">{rentalItems.filter((spec) => spec.group === group).map(renderItem)}</ul>
            </section>
          ))}

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
              {monthly !== null ? (
                <p className="fi-estimator__monthly"><span>{t.monthly}</span><span>{formatYen(monthly, locale)}</span></p>
              ) : null}
              <dl className="fi-estimator__rows">
                {result.lines.map((line) => (
                  <div key={line.key}><dt>{t.fields[line.key].label}</dt><dd>{formatYen(line.amount, locale)}</dd></div>
                ))}
              </dl>
              <div className="fi-estimator__total" aria-live="polite">
                <span>{t.total}</span>
                <strong>{formatYen(result.total, locale)}</strong>
              </div>
              <p className="fi-estimator__reference">{t.reference}</p>
            </>
          ) : <p className="fi-estimator__note" role="alert">{t.invalid}</p>}
          <p className="fi-estimator__note">{t.note}</p>
          <div className="fi-estimator__actions">
            <AnalyticsLink className="fi-button fi-button--light" href={`/${locale}/contact`} event={{ name: "consultation_cta_click", locale, source: "calculator" }}>{locale === "zh-TW" ? "免費諮詢" : locale === "ja" ? "無料相談" : "Free Consultation"}<ArrowIcon /></AnalyticsLink>
            <Link className="fi-text-link" href={`/${locale}/services/rent`}>{t.related}<ArrowIcon /></Link>
          </div>
        </section>
      </div>
    </section>
  );
}
