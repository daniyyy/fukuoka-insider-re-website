import assert from "node:assert/strict";
import test from "node:test";
import { calculatePurchaseCost, calculateRentalInitialCost, formatYen, rentalExample } from "../lib/tools/calculators.ts";

const purchase = { propertyPrice: 30_000_000, brokerage: 0, registration: 0, taxes: 0, financing: 0, insurance: 0, other: 0 };

const withValues = (values, included = {}) => ({
  values: { ...rentalExample.values, ...values },
  included: { ...rentalExample.included, ...included },
});

test("rental example uses Danny's defaults and adds ticked items only", () => {
  const result = calculateRentalInitialCost(rentalExample);
  const byKey = Object.fromEntries(result.lines.map((line) => [line.key, line.amount]));
  assert.equal(byKey.rent, 100_000);
  assert.equal(byKey.commonFee, 5_000);
  assert.equal(byKey.brokerage, 110_000); // 1.1 months of rent (rent + 10% tax)
  assert.equal(byKey.guarantor, 105_000); // 1 month of rent + common-area fee
  assert.equal(byKey.insurance, 20_000);
  assert.equal(byKey.keyExchange, 20_000);
  assert.equal("aircon" in byKey, false);
  assert.equal(result.total, 100_000 + 5_000 + 1_100 + 100_000 + 100_000 + 110_000 + 105_000 + 20_000 + 20_000);
});

test("unticking an item removes it from the total", () => {
  const base = calculateRentalInitialCost(rentalExample).total;
  assert.equal(calculateRentalInitialCost(withValues({}, { keyMoney: false })).total, base - 100_000);
  assert.equal(calculateRentalInitialCost(withValues({ aircon: 13_200 }, { aircon: true })).total, base + 13_200);
  const none = Object.fromEntries(Object.keys(rentalExample.included).map((key) => [key, false]));
  assert.equal(calculateRentalInitialCost(withValues({}, none)).total, 0);
});

test("month-based items follow rent and fractional months", () => {
  const result = calculateRentalInitialCost(withValues({ rent: 80_000, commonFee: 3_000, guarantor: 0.5, deposit: 0 }));
  const byKey = Object.fromEntries(result.lines.map((line) => [line.key, line.amount]));
  assert.equal(byKey.guarantor, 41_500);
  assert.equal(byKey.deposit, 0);
  assert.equal(byKey.brokerage, 88_000);
});

test("rental estimate rejects invalid values of ticked items only", () => {
  for (const value of [-1, Number.NaN, Number.POSITIVE_INFINITY, 1.25, 1_000_000_000_001]) {
    assert.equal(calculateRentalInitialCost(withValues({ rent: value })), null);
  }
  assert.equal(calculateRentalInitialCost(withValues({ deposit: 25 })), null);
  assert.equal(calculateRentalInitialCost(withValues({ other: -1 }, { other: true })), null);
  assert.notEqual(calculateRentalInitialCost(withValues({ other: -1 }, { other: false })), null);
});

test("purchase estimate separates property price and additional costs", () => {
  const result = calculatePurchaseCost({ ...purchase, brokerage: 500_000, registration: 200_000, taxes: 120_000 });
  assert.equal(result.additionalCosts, 820_000);
  assert.equal(result.total, 30_820_000);
  assert.equal(calculatePurchaseCost({ ...purchase, propertyPrice: 0 }).total, 0);
  assert.equal(calculatePurchaseCost({ ...purchase, propertyPrice: -1 }), null);
  assert.equal(calculatePurchaseCost({ ...purchase, taxes: 0.5 }), null);
});

test("currency is formatted as yen without fractional digits", () => {
  assert.match(formatYen(123456, "ja"), /123,456/);
  assert.match(formatYen(123456, "zh-TW"), /123,456/);
  assert.match(formatYen(123456, "en"), /123,456/);
});
