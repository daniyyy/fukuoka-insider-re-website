"use client";

import Link from "next/link";
import { AnalyticsLink } from "@/components/analytics/AnalyticsLink";
import { ArrowIcon } from "@/components/site/Icons";
import { useRef, useState } from "react";

import type { Locale } from "@/config/site";
import { toolsCopy, type ToolKey } from "@/data/tools";
import { RentalEstimator, type RentalGuideLinks } from "@/components/tools/RentalEstimator";
import { calculatePurchaseCost, formatYen, type PurchaseInputs } from "@/lib/tools/calculators";
import { trackEvent } from "@/lib/analytics/events";

const purchaseFields = ["propertyPrice", "brokerage", "registration", "taxes", "financing", "insurance", "other"] as const;
const purchaseExample: PurchaseInputs = { propertyPrice: 30_000_000, brokerage: 0, registration: 0, taxes: 0, financing: 0, insurance: 0, other: 0 };

const stringify = (values: PurchaseInputs): Record<string, string> =>
  Object.fromEntries(Object.entries(values).map(([key, value]) => [key, String(value)]));

export function CostEstimator({ locale, tool, rentalGuides }: { locale: Locale; tool: ToolKey; rentalGuides?: RentalGuideLinks }) {
  if (tool === "rental-initial-cost") return <RentalEstimator locale={locale} guides={rentalGuides} />;
  return <PurchaseEstimator locale={locale} />;
}

function PurchaseEstimator({ locale }: { locale: Locale }) {
  const tool: ToolKey = "purchase-cost";
  const t = toolsCopy[locale].tools[tool];
  const fields = purchaseFields;
  const [values, setValues] = useState<Record<string, string>>(() => stringify(purchaseExample));
  const started = useRef(false);
  const completed = useRef(false);
  const numbers = Object.fromEntries(fields.map((key) => [key, values[key]?.trim() === "" ? Number.NaN : Number(values[key])])) as Record<string, number>;
  const result = calculatePurchaseCost(numbers as PurchaseInputs);
  const servicePath = "buy-sell";

  return (
    <section className="fi-estimator" aria-label={t.title}>
      <div className="fi-shell fi-estimator__grid">
        <div className="fi-estimator__form">
          <h2>{t.inputTitle}</h2>
          <p className="fi-estimator__sample">{t.sample}</p>
          <div className="fi-estimator__fields">
            {fields.map((key) => {
              const raw = values[key] ?? "";
              const invalid = raw.trim() === "" || Number.isNaN(Number(raw)) || Number(raw) < 0;
              return (
                <div className="fi-field" key={key}>
                  <label htmlFor={`cost-${key}`}>{t.fields[key].label}</label>
                  <input
                    id={`cost-${key}`}
                    type="number"
                    inputMode={key.endsWith("Months") ? "decimal" : "numeric"}
                    min="0"
                    max={key.endsWith("Months") ? "24" : "1000000000000"}
                    step={key.endsWith("Months") ? "any" : "1"}
                    value={raw}
                    aria-invalid={invalid || undefined}
                    onChange={(event) => {
                      const next = { ...values, [key]: event.target.value };
                      setValues(next);
                      if (!started.current) { trackEvent({ name: "calculator_start", locale, source: "calculator", tool }); started.current = true; }
                      const parsed = Object.fromEntries(fields.map((field) => [field, next[field]?.trim() === "" ? Number.NaN : Number(next[field])])) as Record<string, number>;
                      const valid = calculatePurchaseCost(parsed as PurchaseInputs);
                      if (valid && !completed.current) { trackEvent({ name: "calculator_complete", locale, source: "calculator", tool }); completed.current = true; }
                    }}
                    aria-describedby={t.fields[key].hint ? `cost-hint-${key}` : undefined}
                  />
                  {t.fields[key].hint ? <small id={`cost-hint-${key}`}>{t.fields[key].hint}</small> : null}
                </div>
              );
            })}
          </div>
        </div>
        <section className="fi-estimator__result" aria-labelledby="cost-result-title">
          <h2 id="cost-result-title">{t.resultTitle}</h2>
          {result ? (
            <>
              <dl className="fi-estimator__rows">
                {result.lines.map((line) => (
                  <div key={line.key}><dt>{t.fields[line.key].label}</dt><dd>{formatYen(line.amount, locale)}</dd></div>
                ))}
                <div><dt>{t.additional}</dt><dd>{formatYen(result.additionalCosts, locale)}</dd></div>
              </dl>
              <div className="fi-estimator__total" aria-live="polite"><span>{t.total}</span><strong>{formatYen(result.total, locale)}</strong></div>
            </>
          ) : <p className="fi-estimator__note" role="alert">{t.invalid}</p>}
          <p className="fi-estimator__note">{t.note}</p>
          <div className="fi-estimator__actions">
            <AnalyticsLink className="fi-button fi-button--light" href={`/${locale}/contact`} event={{ name: "consultation_cta_click", locale, source: "calculator" }}>{locale === "zh-TW" ? "免費諮詢" : locale === "ja" ? "無料相談" : "Free Consultation"}<ArrowIcon /></AnalyticsLink>
            <Link className="fi-text-link" href={`/${locale}/services/${servicePath}`}>{t.related}<ArrowIcon /></Link>
          </div>
        </section>
      </div>
    </section>
  );
}
