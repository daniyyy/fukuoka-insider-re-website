/** All amounts are JPY. Editable inputs are examples, not official rates or quotations. */
export type RentalInputs = {
  monthlyRent: number;
  upfrontMonths: number;
  depositMonths: number;
  keyMoneyMonths: number;
  brokerage: number;
  guarantor: number;
  insurance: number;
  other: number;
};

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

export function calculateRentalInitialCost(input: RentalInputs): CostResult | null {
  if (!amountKeys(input) || input.upfrontMonths > 24 || input.depositMonths > 24 || input.keyMoneyMonths > 24) return null;
  const lines: CostLine[] = [
    { key: "upfrontRent", amount: Math.round(input.monthlyRent * input.upfrontMonths) },
    { key: "deposit", amount: Math.round(input.monthlyRent * input.depositMonths) },
    { key: "keyMoney", amount: Math.round(input.monthlyRent * input.keyMoneyMonths) },
    { key: "brokerage", amount: input.brokerage },
    { key: "guarantor", amount: input.guarantor },
    { key: "insurance", amount: input.insurance },
    { key: "other", amount: input.other },
  ];
  return totalOf(lines, "upfrontRent");
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
