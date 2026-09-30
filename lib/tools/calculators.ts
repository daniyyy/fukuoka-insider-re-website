/** All amounts are JPY. Editable inputs are examples, not official rates or quotations. */

/**
 * Rental initial costs (Danny, 2026-09-30).
 * - Monthly rent, common-area fee and other monthly charges are required base figures (no tick box).
 * - Every cost item has a tick box; unticked items are left out of the total.
 * - "yen" items are entered as an amount; "months" items are a number of months times a base:
 *   rent, common-area fee, other monthly charges, or the monthly total (guarantee company, Danny 2026-09-30).
 */
export const rentalItemKeys = ["prepaidRent", "prepaidFee", "prepaidOther", "keyMoney", "deposit", "brokerage", "guarantor", "insurance", "keyExchange", "cleaning", "aircon", "disinfection", "other"] as const;
export type RentalItemKey = (typeof rentalItemKeys)[number];
export type RentalBaseKey = "rent" | "commonFee" | "otherMonthly";
/** "standard": charged on almost every contract. "optional": only when the property lists it. */
export type RentalItemGroup = "standard" | "optional";
export type RentalItemSpec = { key: RentalItemKey; unit: "yen" | "months"; base?: "rent" | "fee" | "other" | "monthlyTotal"; group: RentalItemGroup };

export const rentalItems: RentalItemSpec[] = [
  { key: "prepaidRent", unit: "months", base: "rent", group: "standard" },
  { key: "prepaidFee", unit: "months", base: "fee", group: "standard" },
  { key: "prepaidOther", unit: "months", base: "other", group: "standard" },
  { key: "keyMoney", unit: "months", base: "rent", group: "standard" },
  { key: "deposit", unit: "months", base: "rent", group: "standard" },
  { key: "brokerage", unit: "months", base: "rent", group: "standard" },
  { key: "guarantor", unit: "months", base: "monthlyTotal", group: "standard" },
  { key: "insurance", unit: "yen", group: "standard" },
  { key: "keyExchange", unit: "yen", group: "standard" },
  { key: "cleaning", unit: "yen", group: "optional" },
  { key: "aircon", unit: "yen", group: "optional" },
  { key: "disinfection", unit: "yen", group: "optional" },
  { key: "other", unit: "yen", group: "optional" },
];

export type RentalInputs = {
  rent: number;
  commonFee: number;
  /** Other fixed monthly charges, e.g. 24-hour support. */
  otherMonthly: number;
  values: Record<RentalItemKey, number>;
  included: Record<RentalItemKey, boolean>;
};

/** Example figures shown when the page opens (Danny's defaults, 2026-09-30). */
export const rentalExample: RentalInputs = {
  rent: 100_000,
  commonFee: 5_000,
  otherMonthly: 1_100,
  values: { prepaidRent: 2, prepaidFee: 2, prepaidOther: 2, keyMoney: 1, deposit: 1, brokerage: 1.1, guarantor: 1, insurance: 20_000, keyExchange: 20_000, cleaning: 0, aircon: 0, disinfection: 0, other: 0 },
  included: { prepaidRent: true, prepaidFee: true, prepaidOther: true, keyMoney: true, deposit: true, brokerage: true, guarantor: true, insurance: true, keyExchange: true, cleaning: false, aircon: false, disinfection: false, other: false },
};

const MAX_YEN = 1_000_000_000_000;
export const validYen = (value: number) => Number.isInteger(value) && value >= 0 && value <= MAX_YEN;
export const validMonths = (value: number) => Number.isFinite(value) && value >= 0 && value <= 24;

const validBase = (input: RentalInputs) => validYen(input.rent) && validYen(input.commonFee) && validYen(input.otherMonthly);

/** Rent + common-area fee + other monthly charges: what the tenant pays each month (guarantee fees are based on this). */
export const rentalMonthlyTotal = (input: RentalInputs) => input.rent + input.commonFee + input.otherMonthly;

/** Amount of one item (before its tick box is applied); null if its input or the base figures are invalid. */
export function rentalItemAmount(spec: RentalItemSpec, input: RentalInputs): number | null {
  const value = input.values[spec.key];
  if (spec.unit === "yen") return validYen(value) ? value : null;
  if (!validMonths(value) || !validBase(input)) return null;
  const base = spec.base === "fee" ? input.commonFee : spec.base === "other" ? input.otherMonthly : spec.base === "monthlyTotal" ? rentalMonthlyTotal(input) : input.rent;
  return Math.round(base * value);
}

export function calculateRentalInitialCost(input: RentalInputs): CostResult | null {
  if (!validBase(input)) return null;
  const lines: CostLine[] = [];
  for (const spec of rentalItems) {
    if (!input.included[spec.key]) continue;
    const amount = rentalItemAmount(spec, input);
    if (amount === null) return null;
    lines.push({ key: spec.key, amount });
  }
  const total = lines.reduce((sum, line) => sum + line.amount, 0);
  if (!Number.isSafeInteger(total)) return null;
  return { lines, total, additionalCosts: total - (lines.find((line) => line.key === "prepaidRent")?.amount ?? 0) };
}

export type PurchaseInputs = {
  propertyPrice: number;
  brokerage: number;
  registration: number;
  taxes: number;
  financing: number;
  insurance: number;
  other: number;
};

export type CostLine = { key: string; amount: number };
export type CostResult = { lines: CostLine[]; additionalCosts: number; total: number };

const amountKeys = (value: Record<string, number>) => Object.entries(value).every(([key, number]) =>
  Number.isFinite(number) && number >= 0 && number <= 1_000_000_000_000 &&
  (key.endsWith("Months") || Number.isInteger(number)),
);

function totalOf(lines: CostLine[], baseKey: string): CostResult | null {
  const total = lines.reduce((sum, line) => sum + line.amount, 0);
  if (!Number.isSafeInteger(total)) return null;
  return { lines, total, additionalCosts: total - (lines.find((line) => line.key === baseKey)?.amount ?? 0) };
}

export function calculatePurchaseCost(input: PurchaseInputs): CostResult | null {
  if (!amountKeys(input)) return null;
  const lines: CostLine[] = [
    { key: "propertyPrice", amount: input.propertyPrice },
    { key: "brokerage", amount: input.brokerage },
    { key: "registration", amount: input.registration },
    { key: "taxes", amount: input.taxes },
    { key: "financing", amount: input.financing },
    { key: "insurance", amount: input.insurance },
    { key: "other", amount: input.other },
  ];
  return totalOf(lines, "propertyPrice");
}

export function formatYen(amount: number, locale: "zh-TW" | "ja" | "en") {
  const intlLocale = locale === "ja" ? "ja-JP" : locale === "en" ? "en-US" : "zh-TW";
  return new Intl.NumberFormat(intlLocale, { style: "currency", currency: "JPY", maximumFractionDigits: 0 }).format(amount);
}
