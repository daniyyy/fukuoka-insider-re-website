"use client";

import Link from "next/link";
import { useState } from "react";

import { ArrowIcon } from "@/components/site/Icons";
import { AmountInput } from "@/components/tools/RentalEstimator";
import type { Locale } from "@/config/site";
import { toolsCopy } from "@/data/tools";
import { calculateRentalInitialCost, formatYen, rentalExample, validYen } from "@/lib/tools/calculators";

/**
 * Homepage preview of the rental estimator: enter the monthly rent, see an initial-cost figure
 * calculated with the estimator's example settings, then continue to the full estimator with that rent.
 */
export function EstimatorTeaser({ locale }: { locale: Locale }) {
  const t = toolsCopy[locale].teaser;
  const unit = toolsCopy[locale].tools["rental-initial-cost"].unitYen ?? "";
  const [rent, setRent] = useState(String(rentalExample.rent));
  const value = rent.trim() === "" ? Number.NaN : Number(rent);
  const valid = validYen(value);
  const result = valid ? calculateRentalInitialCost({ ...rentalExample, rent: value }) : null;
  const assumption = t.assumption
    .replace("{fee}", formatYen(rentalExample.commonFee, locale))
    .replace("{other}", formatYen(rentalExample.otherMonthly, locale));
  const href = `/${locale}/tools/rental-initial-cost${valid ? `?rent=${value}` : ""}`;

  return (
    <div className="fi-teaser-card">
      <label className="fi-teaser-card__label" htmlFor="teaser-rent">{t.rentLabel}</label>
      <AmountInput id="teaser-rent" value={rent} unit={unit} invalid={!valid} onChange={setRent} />
      <div className="fi-teaser-card__result" aria-live="polite">
        <span>{t.resultLabel}</span>
        <strong>{result ? formatYen(result.total, locale) : "—"}</strong>
      </div>
      <p className="fi-teaser-card__note">{assumption}</p>
      <Link className="fi-button fi-teaser-card__cta" href={href}>{t.cta}<ArrowIcon /></Link>
    </div>
  );
}
