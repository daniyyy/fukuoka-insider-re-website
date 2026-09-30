/** All amounts are JPY. Editable inputs are examples, not official rates or quotations. */

/**
 * Rental initial costs (Danny, 2026-09-30): each item can be ticked on or off.
 * - "yen" items are entered as an amount (monthly items count one month).
 * - "months" items are entered as a number of months and multiplied by a base:
 *   rent only (key money, deposit, brokerage) or rent + common-area fee (guarantee company).
 */
export const rentalItemKeys = ["rent", "commonFee", "support24h", "keyMoney", "deposit", "brokerage", "guarantor", "insurance", "keyExchange", "aircon", "other"] as const;
export type RentalItemKey = (typeof rentalItemKeys)[number];
export type RentalItemSpec = { key: RentalItemKey; unit: "yen" | "months"; base?: "rent" | "rentAndFee" };

export const rentalItems: RentalItemSpec[] = [
  { key: "rent", unit: "yen" },
  { key: "commonFee", unit: "yen" },
  { key: "support24h", unit: "yen" },
  { key: "keyMoney", unit: "months", base: "rent" },
  { key: "deposit", unit: "months", base: "rent" },
  { key: "brokerage", unit: "months", base: "rent" },
  { key: "guarantor", unit: "months", base: "rentAndFee" },
  { key: "insurance", unit: "yen" },
  { key: "keyExchange", unit: "yen" },
  { key: "aircon", unit: "yen" },
  { key: "other", unit: "yen" },
];

export type RentalInputs = { values: Record<RentalItemKey, number>; included: Record<RentalItemKey, boolean> };

/** Example figures shown when the page opens (Danny's defaults, 2026-09-30). */
export const rentalExample: RentalInputs = {
  values: { rent: 100_000, commonFee: 5_000, support24h: 1_100, keyMoney: 1, deposit: 1, brokerage: 1.1, guarantor: 1, insurance: 20_000, keyExchange: 20_000, aircon: 0, other: 0 },
  included: { rent: true, commonFee: true, support24h: true, keyMoney: true, deposit: true, brokerage: true, guarantor: true, insurance: true, keyExchange: true, aircon: false, other: false },
};

const MAX_YEN = 1_000_000_000_000;
const validYen = (value: number) => Number.isInteger(value) && value >= 0 && value <= MAX_YEN;
const validMonths = (value: number) => Number.isFinite(value) && value >= 0 && value <= 24;

/** Amount of one item (before the tick box is applied); null if its input is invalid. */
export function rentalItemAmount(spec: RentalItemSpec, input: RentalInputs): number | null {
  const value = input.values[spec.key];
  if (spec.unit === "yen") return validYen(value) ? value : null;
  if (!validMonths(value)) return null;
  const rent = input.values.rent;
  const fee = input.values.commonFee;
  if (!validYen(rent) || (spec.base === "rentAndFee" && !validYen(fee))) return null;
  const base = spec.base === "rentAndFee" ? rent + fee : rent;
  return Math.round(base * value);
}

export function calculateRentalInitialCost(input: RentalInputs): CostResult | null {
  const lines: CostLine[] = [];
  for (const spec of rentalItems) {
    if (!input.included[spec.key]) continue;
    const amount = rentalItemAmount(spec, input);
    if (amount === null) return null;
    lines.push({ key: spec.key, amount });
  }
  const total = lines.reduce((sum, line) => sum + line.amount, 0);
  if (!Number.isSafeInteger(total)) return null;
  return { lines, total, additionalCosts: total - (lines.find((line) => line.key === "rent")?.amount ?? 0) };
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
