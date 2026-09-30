"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { ArrowIcon } from "@/components/site/Icons";
import { AmountInput } from "@/components/tools/RentalEstimator";
import type { Locale } from "@/config/site";
import { toolsCopy } from "@/data/tools";
import { calculateRentalInitialCost, formatYen, rentalExample, validYen } from "@/lib/tools/calculators";

const cards = ["rent", "buy"] as const;
type Card = (typeof cards)[number];

/**
 * Homepage preview of both estimators (Danny, 2026-09-30).
 * Renting: enter the monthly rent, see a figure from the estimator's example settings, continue with that rent.
 * Buying: the cost items only (no preset amounts), with a link to the purchase estimator.
 * Desktop shows the two cards side by side; phones swipe between them, with a 租屋／買房 switch above.
 */
export function EstimatorTeaser({ locale }: { locale: Locale }) {
  const t = toolsCopy[locale].teaser;
  const unit = toolsCopy[locale].tools["rental-initial-cost"].unitYen ?? "";
  const [rent, setRent] = useState(String(rentalExample.rent));
  const [active, setActive] = useState<Card>("rent");
  const track = useRef<HTMLDivElement>(null);

  const value = rent.trim() === "" ? Number.NaN : Number(rent);
  const valid = validYen(value);
  const result = valid ? calculateRentalInitialCost({ ...rentalExample, rent: value }) : null;
  const assumption = t.assumption
    .replace("{fee}", formatYen(rentalExample.commonFee, locale))
    .replace("{other}", formatYen(rentalExample.otherMonthly, locale));

  const show = (card: Card) => {
    const el = track.current;
    const target = el?.querySelector<HTMLElement>(`[data-card="${card}"]`);
    if (el && target) el.scrollTo({ left: target.offsetLeft - el.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft || "0"), behavior: "smooth" });
    setActive(card);
  };

  // Phones: follow the swipe so the switch shows which card is in view.
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    setActive(el.scrollLeft > el.scrollWidth / 4 ? "buy" : "rent");
  };

  return (
    <div className="fi-estimates">
      <div className="fi-estimates__switch" role="group" aria-label={t.switchLabel}>
        {cards.map((card) => (
          <button type="button" key={card} aria-pressed={active === card} aria-controls={`estimate-${card}`} onClick={() => show(card)}>
            {card === "rent" ? t.rentTag : t.buyTag}
          </button>
        ))}
      </div>

      <div className="fi-estimates__track" ref={track} onScroll={onScroll}>
        <article className="fi-estimate-card" id="estimate-rent" data-card="rent" aria-labelledby="estimate-rent-title">
          <header className="fi-estimate-card__head">
            <span className="fi-estimate-card__tag">{t.rentTag}</span>
            <h3 id="estimate-rent-title">{t.rentTitle}</h3>
          </header>
          <label className="fi-estimate-card__label" htmlFor="teaser-rent">{t.rentLabel}</label>
          <AmountInput id="teaser-rent" value={rent} unit={unit} invalid={!valid} onChange={setRent} />
          <div className="fi-estimate-card__result" aria-live="polite">
            <span>{t.resultLabel}</span>
            <strong>{result ? formatYen(result.total, locale) : "—"}</strong>
          </div>
          <p className="fi-estimate-card__note">{assumption}</p>
          <Link className="fi-button fi-estimate-card__cta" href={`/${locale}/tools/rental-initial-cost${valid ? `?rent=${value}` : ""}`}>{t.cta}<ArrowIcon /></Link>
        </article>

        <article className="fi-estimate-card" id="estimate-buy" data-card="buy" aria-labelledby="estimate-buy-title">
          <header className="fi-estimate-card__head">
            <span className="fi-estimate-card__tag">{t.buyTag}</span>
            <h3 id="estimate-buy-title">{t.buyTitle}</h3>
          </header>
          <ul className="fi-estimate-card__items">
            {t.buyItems.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <p className="fi-estimate-card__note">{t.buyNote}</p>
          <Link className="fi-button fi-button--outline fi-estimate-card__cta" href={`/${locale}/tools/purchase-cost`}>{t.buyCta}<ArrowIcon /></Link>
        </article>
      </div>
    </div>
  );
}
