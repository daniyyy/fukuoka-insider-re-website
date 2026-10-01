"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { AnalyticsLink } from "@/components/analytics/AnalyticsLink";
import { ArrowIcon } from "@/components/site/Icons";
import { AmountInput } from "@/components/tools/RentalEstimator";
import { siteConfig, type Locale } from "@/config/site";
import { purchaseCopy } from "@/data/purchase-estimator";
import { toolsCopy } from "@/data/tools";
import { trackEvent } from "@/lib/analytics/events";
import { formatYen } from "@/lib/tools/calculators";
import {
  brokerageCap,
  builtPeriodFromYear,
  calculatePurchase,
  estimateAssessedValues,
  isCondoProperty,
  isNewProperty,
  purchaseExample,
  validBuiltYear,
  type BuyerType,
  type PropertyType,
  type PurchaseInputs,
  type PurchaseLine,
} from "@/lib/tools/purchase";

type ValueMode = "estimate" | "exact";
const valueModes: ValueMode[] = ["estimate", "exact"];
type Text = { price: string; builtYear: string; landValue: string; buildingValue: string; floorArea: string; loanAmount: string; brokerage: string; scrivener: string; insurance: string; monthlyFees: string };
type State = {
  text: Text;
  type: PropertyType;
  valueMode: ValueMode;
  buyer: BuyerType;
  handoverMonth: number;
  loan: boolean;
  includeBrokerage: boolean;
  autoBrokerage: boolean;
  autoScrivener: boolean;
};

const num = (raw: string) => (raw.replace(/,/g, "").trim() === "" ? Number.NaN : Number(raw.replace(/,/g, "")));
type Kind = "condo" | "house";
type Age = "used" | "new";
const kinds: Kind[] = ["condo", "house"];
const ages: Age[] = ["used", "new"];
const toType = (kind: Kind, age: Age): PropertyType => (kind === "condo" ? (age === "new" ? "newCondo" : "usedCondo") : age === "new" ? "newHouse" : "usedHouse");
const buyers: BuyerType[] = ["investor", "owner"];

const initialState = (): State => ({
  text: {
    price: String(purchaseExample.price),
    builtYear: "2006",
    landValue: "",
    buildingValue: "",
    floorArea: String(purchaseExample.floorArea),
    loanAmount: "20000000",
    brokerage: String(brokerageCap(purchaseExample.price)),
    scrivener: "120000",
    insurance: String(purchaseExample.insurance),
    monthlyFees: String(purchaseExample.monthlyFees),
  },
  type: purchaseExample.type,
  valueMode: "estimate",
  buyer: purchaseExample.buyer,
  handoverMonth: purchaseExample.handoverMonth,
  loan: false,
  includeBrokerage: true,
  autoBrokerage: true,
  autoScrivener: true,
});

const toInputs = (s: State): PurchaseInputs => {
  const price = num(s.text.price);
  const floorArea = num(s.text.floorArea);
  const builtYear = num(s.text.builtYear);
  // Most overseas buyers do not have the assessment certificate, so by default the assessed values are estimated.
  const values = s.valueMode === "estimate" ? estimateAssessedValues({ price, type: s.type, floorArea, builtYear }) : { landValue: num(s.text.landValue), buildingValue: num(s.text.buildingValue) };
  const usedYearInvalid = !isNewProperty(s.type) && !validBuiltYear(builtYear);
  return {
    price: usedYearInvalid ? Number.NaN : price,
    type: s.type,
    buyer: s.buyer,
    landValue: values.landValue,
    buildingValue: values.buildingValue,
    floorArea,
    built: builtPeriodFromYear(builtYear),
    handoverMonth: s.handoverMonth,
    loanAmount: s.loan ? num(s.text.loanAmount) : 0,
    brokerage: s.autoBrokerage ? null : num(s.text.brokerage),
    scrivener: s.autoScrivener ? null : num(s.text.scrivener),
    includeBrokerage: s.includeBrokerage,
    insurance: num(s.text.insurance),
    monthlyFees: isCondoProperty(s.type) ? num(s.text.monthlyFees) : 0,
  };
};

function Segment<T extends string>({ label, value, options, labels, onChange }: { label: string; value: T; options: T[]; labels: Record<T, string>; onChange: (value: T) => void }) {
  return (
    <div className="fi-segment" role="group" aria-label={label}>
      {options.map((option) => (
        <button type="button" key={option} aria-pressed={value === option} onClick={() => onChange(option)}>{labels[option]}</button>
      ))}
    </div>
  );
}

/**
 * Purchase cost estimator (Danny, 2026-10-01): property, assessed values, payment and handover, adjustable costs.
 * Results follow the order clients pay: contract to handover, acquisition tax months later, then every year.
 */
export function PurchaseEstimator({ locale }: { locale: Locale }) {
  const t = purchaseCopy[locale];
  const send = toolsCopy[locale].tools["rental-initial-cost"].send;
  const [state, setState] = useState<State>(initialState);
  const [copied, setCopied] = useState(false);
  const started = useRef(false);
  const completed = useRef(false);
  const inputs = toInputs(state);
  const result = calculatePurchase(inputs);
  const { text } = state;

  const update = (next: State) => {
    // While automatic, the brokerage and scrivener fields follow the calculation.
    const price = num(next.text.price);
    const withAuto: State = {
      ...next,
      text: {
        ...next.text,
        brokerage: next.autoBrokerage && Number.isFinite(price) && price > 0 ? String(brokerageCap(price)) : next.text.brokerage,
        scrivener: next.autoScrivener ? (next.loan ? "170000" : "120000") : next.text.scrivener,
      },
    };
    setState(withAuto);
    if (!started.current) { trackEvent({ name: "calculator_start", locale, source: "calculator", tool: "purchase-cost" }); started.current = true; }
    if (!completed.current && calculatePurchase(toInputs(withAuto))) { trackEvent({ name: "calculator_complete", locale, source: "calculator", tool: "purchase-cost" }); completed.current = true; }
  };
  const setText = (key: keyof Text, value: string, extra: Partial<State> = {}) => update({ ...state, ...extra, text: { ...text, [key]: value } });

  const amountField = (key: keyof Text, label: string, hint?: string, unit = t.units.yen, extra: Partial<State> = {}) => (
    <div className="fi-cost-base__field">
      <label htmlFor={`buy-${key}`}>{label}</label>
      <AmountInput id={`buy-${key}`} value={text[key]} unit={unit} months={key === "floorArea"} invalid={!(num(text[key]) >= 0)} describedBy={hint ? `buy-${key}-hint` : undefined} onChange={(value) => setText(key, value, extra)} />
      {hint ? <small id={`buy-${key}-hint`}>{hint}</small> : null}
    </div>
  );

  const rows = (lines: PurchaseLine[]) => lines.map((line) => (
    <div key={line.key}><dt>{t.lines[line.key]}</dt><dd>{formatYen(line.amount, locale)}</dd></div>
  ));

  // Brackets and separators follow the language (full-width for Chinese and Japanese).
  const [open, close, dot] = locale === "en" ? [" (", ")", ", "] : ["（", "）", "・"];
  const message = result && send
    ? [
        t.sendGreeting,
        `${t.fields.price} ${formatYen(inputs.price, locale)}${open}${t.types[state.type]}${dot}${t.buyers[state.buyer]}${state.loan ? `${dot}${t.payments.loan} ${formatYen(inputs.loanAmount, locale)}` : ""}${close}`,
        `${t.result.costsTotal} ${formatYen(result.costsTotal, locale)}${open}${result.costsPercent}%${close}`,
        `${t.result.yearly} ${formatYen(result.yearlyTotal, locale)}`,
        send.closing,
      ].join("\n")
    : "";
  const copyMessage = async () => {
    try { await navigator.clipboard.writeText(message); setCopied(true); window.setTimeout(() => setCopied(false), 2000); } catch { setCopied(false); }
  };

  const isNew = isNewProperty(state.type);
  const isCondo = isCondoProperty(state.type);
  const kind: Kind = isCondo ? "condo" : "house";
  const age: Age = isNew ? "new" : "used";
  // A new condo bought straight from the developer usually has no brokerage fee; other types usually do.
  const setType = (type: PropertyType) => update({ ...state, type, includeBrokerage: type !== "newCondo" });
  const estimate = estimateAssessedValues({ price: num(text.price), type: state.type, floorArea: num(text.floorArea), builtYear: num(text.builtYear) });
  // Switching to actual values starts from the current estimate, so the result does not jump.
  const setValueMode = (valueMode: ValueMode) => update({
    ...state,
    valueMode,
    text: valueMode === "exact" && Number.isFinite(estimate.landValue) ? { ...text, landValue: String(estimate.landValue), buildingValue: String(estimate.buildingValue) } : text,
  });

  return (
    <section className="fi-estimator fi-estimator--purchase" aria-label={toolsCopy[locale].tools["purchase-cost"].title}>
      <div className="fi-shell fi-estimator__grid">
        <div className="fi-estimator__form">
          <p className="fi-estimator__sample">{t.sample}</p>

          <section className="fi-cost-group" aria-labelledby="buy-group-property">
            <header className="fi-cost-group__head">
              <span className="fi-cost-group__no" aria-hidden="true">01</span>
              <h2 id="buy-group-property">{t.sections.property}</h2>
              <p>{t.sections.propertyNote}</p>
            </header>
            <div className="fi-cost-base fi-cost-base--stack">
              {amountField("price", t.fields.price)}
              <div className="fi-cost-base__field">
                <span className="fi-cost-base__label">{t.fields.type}</span>
                <div className="fi-segment-pair">
                  <Segment label={t.fields.type} value={kind} options={kinds} labels={t.kinds} onChange={(next) => setType(toType(next, age))} />
                  <Segment label={t.fields.age} value={age} options={ages} labels={t.ages} onChange={(next) => setType(toType(kind, next))} />
                </div>
                {state.type === "newCondo" ? <small>{t.fields.newCondoBrokerage}</small> : null}
              </div>
              <div className="fi-cost-base__field">
                <span className="fi-cost-base__label">{t.fields.buyer}</span>
                <Segment label={t.fields.buyer} value={state.buyer} options={buyers} labels={t.buyers} onChange={(buyer) => update({ ...state, buyer })} />
                <small>{t.buyerHint[state.buyer]}</small>
              </div>
              <div className="fi-purchase-pair">
                {amountField("floorArea", isCondo ? t.fields.area : t.fields.houseArea, t.fields.areaHint, t.units.sqm)}
                {!isNew ? (
                  <div className="fi-cost-base__field">
                    <label htmlFor="buy-builtYear">{t.fields.built}</label>
                    <input
                      id="buy-builtYear" className="fi-year" type="text" inputMode="numeric" autoComplete="off" maxLength={4} placeholder="2006"
                      value={text.builtYear} aria-invalid={!validBuiltYear(num(text.builtYear))} aria-describedby="buy-builtYear-hint"
                      onChange={(event) => setText("builtYear", event.target.value.replace(/[０-９]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0xfee0)).replace(/\D/g, ""))}
                    />
                    <small id="buy-builtYear-hint">{t.fields.builtHint}</small>
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          <section className="fi-cost-group" aria-labelledby="buy-group-values">
            <header className="fi-cost-group__head">
              <span className="fi-cost-group__no" aria-hidden="true">02</span>
              <h2 id="buy-group-values">{t.sections.values}</h2>
              <p>{t.sections.valuesNote}</p>
            </header>
            <Segment label={t.fields.valueMode} value={state.valueMode} options={valueModes} labels={t.valueModes} onChange={setValueMode} />
            {state.valueMode === "estimate" ? (
              <>
                <dl className="fi-value-estimate" aria-live="polite">
                  <div><dt>{t.fields.landValue}{t.fields.estimated}</dt><dd>{Number.isFinite(estimate.landValue) ? formatYen(estimate.landValue, locale) : "—"}</dd></div>
                  <div><dt>{t.fields.buildingValue}{t.fields.estimated}</dt><dd>{Number.isFinite(estimate.buildingValue) ? formatYen(estimate.buildingValue, locale) : "—"}</dd></div>
                </dl>
                {Number.isFinite(estimate.landValue) ? <p className="fi-purchase-hint">{t.fields.estimateNote(estimate.percent)}</p> : null}
              </>
            ) : (
              <>
                <div className="fi-purchase-pair fi-purchase-pair--plain">
                  {amountField("landValue", t.fields.landValue)}
                  {amountField("buildingValue", t.fields.buildingValue)}
                </div>
                <p className="fi-purchase-hint">{isNew ? t.fields.newValueHint : t.fields.valueHint}</p>
                {isCondo ? <p className="fi-purchase-hint">{t.fields.condoLandHint}</p> : null}
              </>
            )}
          </section>

          <section className="fi-cost-group" aria-labelledby="buy-group-payment">
            <header className="fi-cost-group__head">
              <span className="fi-cost-group__no" aria-hidden="true">03</span>
              <h2 id="buy-group-payment">{t.sections.payment}</h2>
            </header>
            <div className="fi-purchase-pair fi-purchase-pair--plain">
              <div className="fi-cost-base__field">
                <span className="fi-cost-base__label">{t.fields.payment}</span>
                <Segment label={t.fields.payment} value={state.loan ? "loan" : "cash"} options={["cash", "loan"]} labels={t.payments} onChange={(value) => update({ ...state, loan: value === "loan" })} />
              </div>
              <div className="fi-cost-base__field">
                <label htmlFor="buy-handover">{t.fields.handover}</label>
                <select id="buy-handover" className="fi-select" value={state.handoverMonth} onChange={(event) => update({ ...state, handoverMonth: Number(event.target.value) })}>
                  {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => <option key={month} value={month}>{t.month(month)}</option>)}
                </select>
                <small>{t.fields.handoverHint}</small>
              </div>
              {state.loan ? amountField("loanAmount", t.fields.loanAmount) : null}
            </div>
          </section>

          <section className="fi-cost-group" aria-labelledby="buy-group-adjust">
            <header className="fi-cost-group__head">
              <span className="fi-cost-group__no" aria-hidden="true">04</span>
              <h2 id="buy-group-adjust">{t.sections.adjust}</h2>
              <p>{t.sections.adjustNote}</p>
            </header>
            <ul className="fi-cost-items">
              <li className={`fi-cost-item${state.includeBrokerage ? "" : " is-off"}`}>
                <input className="fi-check" type="checkbox" id="buy-include-brokerage" checked={state.includeBrokerage} onChange={(event) => update({ ...state, includeBrokerage: event.target.checked })} aria-label={t.fields.includeBrokerage} />
                <div className="fi-cost-item__text">
                  <label htmlFor="buy-brokerage">{t.fields.brokerage}</label>
                  <small id="buy-brokerage-hint">{t.fields.brokerageHint}</small>
                  {!state.autoBrokerage ? <button type="button" className="fi-cost-reset" onClick={() => update({ ...state, autoBrokerage: true })}>{t.fields.brokerageReset}</button> : null}
                </div>
                <div className="fi-cost-item__value">
                  <AmountInput id="buy-brokerage" value={text.brokerage} unit={t.units.yen} invalid={!(num(text.brokerage) >= 0)} describedBy="buy-brokerage-hint" onChange={(value) => setText("brokerage", value, { autoBrokerage: false })} />
                </div>
              </li>
              {([
                ["scrivener", t.fields.scrivener, t.fields.scrivenerHint, { autoScrivener: false }],
                ["insurance", t.fields.insurance, t.fields.insuranceHint, {}],
                ...(isCondo ? [["monthlyFees", t.fields.monthlyFees, t.fields.monthlyFeesHint, {}]] : []),
              ] as [keyof Text, string, string, Partial<State>][]).map(([key, label, hint, extra]) => (
                <li className="fi-cost-item fi-cost-item--plain" key={key}>
                  <div className="fi-cost-item__text">
                    <label htmlFor={`buy-${key}`}>{label}</label>
                    <small id={`buy-${key}-hint`}>{hint}</small>
                  </div>
                  <div className="fi-cost-item__value">
                    <AmountInput id={`buy-${key}`} value={text[key]} unit={t.units.yen} invalid={!(num(text[key]) >= 0)} describedBy={`buy-${key}-hint`} onChange={(value) => setText(key, value, extra)} />
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <aside className="fi-purchase-notes" aria-labelledby="buy-overseas">
            <h2 id="buy-overseas">{t.overseas.title}</h2>
            <ul>{t.overseas.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </aside>

          <details className="fi-purchase-method">
            <summary>{t.method.title}</summary>
            <ul>{t.method.items.map((item) => <li key={item}>{item}</li>)}</ul>
            <p>{t.method.sources}</p>
          </details>

          {result ? (
            <div className="fi-estimator__sticky" aria-hidden="true">
              <span>{t.result.costsTotal}<small>{t.result.reference}</small></span>
              <strong>{formatYen(result.costsTotal, locale)}</strong>
            </div>
          ) : null}
        </div>

        <section className="fi-estimator__result" aria-labelledby="buy-result-title">
          <h2 id="buy-result-title">{t.result.title}</h2>
          {result ? (
            <>
              <p className="fi-estimator__monthly"><span>{t.fields.price}</span><span>{formatYen(inputs.price, locale)}</span></p>
              <h3 className="fi-estimator__group">{t.result.atPurchase}</h3>
              <dl className="fi-estimator__rows">{rows(result.atPurchase)}</dl>
              <h3 className="fi-estimator__group">{t.result.later}<small>{t.result.laterNote}</small></h3>
              <dl className="fi-estimator__rows">{rows(result.later)}</dl>
              <div className="fi-estimator__total" aria-live="polite">
                <span>{t.result.costsTotal}</span>
                <strong>{formatYen(result.costsTotal, locale)}</strong>
              </div>
              <p className="fi-estimator__reference">{t.result.percent(result.costsPercent, result.typicalPercent[0], result.typicalPercent[1])}</p>
              <p className="fi-estimator__monthly"><span>{t.result.grandTotal}</span><span>{formatYen(result.grandTotal, locale)}</span></p>
              <h3 className="fi-estimator__group">{t.result.yearly}</h3>
              <dl className="fi-estimator__rows">
                {rows(result.yearly)}
                <div className="fi-estimator__subtotal"><dt>{t.result.yearlyTotal}</dt><dd>{formatYen(result.yearlyTotal, locale)}</dd></div>
                <div><dt>{t.result.perMonth}</dt><dd>{formatYen(Math.round(result.yearlyTotal / 12), locale)}</dd></div>
              </dl>
              <p className="fi-estimator__flag">{result.housingReductions ? t.result.housingOn : t.result.housingOff}・{t.result.reference}</p>
            </>
          ) : <p className="fi-estimator__note" role="alert">{t.result.invalid}</p>}
          <p className="fi-estimator__note">{t.result.note}</p>
          <div className="fi-estimator__actions">
            <AnalyticsLink className="fi-button fi-button--light" href={`/${locale}/contact`} event={{ name: "consultation_cta_click", locale, source: "calculator" }}>{t.cta}<ArrowIcon /></AnalyticsLink>
            <Link className="fi-text-link" href={`/${locale}/services/buy-sell`}>{t.related}<ArrowIcon /></Link>
          </div>
          {result && send ? (
            <div className="fi-estimator__send">
              <p>{send.title}</p>
              <div className="fi-estimator__send-buttons">
                <AnalyticsLink className="fi-button fi-button--ghost-light" href={`https://line.me/R/oaMessage/${encodeURIComponent(siteConfig.contact.lineId)}/?${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" event={{ name: "contact_channel_click", locale, source: "calculator", channel: "line" }}>{send.line}</AnalyticsLink>
                <AnalyticsLink className="fi-button fi-button--ghost-light" href={`${siteConfig.contact.whatsapp}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer" event={{ name: "contact_channel_click", locale, source: "calculator", channel: "whatsapp" }}>{send.whatsapp}</AnalyticsLink>
              </div>
              <button type="button" className="fi-estimator__copy" onClick={copyMessage}>{copied ? send.copied : send.copy}</button>
            </div>
          ) : null}
        </section>
      </div>
    </section>
  );
}
