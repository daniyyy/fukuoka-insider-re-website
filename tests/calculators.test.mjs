import assert from "node:assert/strict";
import test from "node:test";
import { calculatePurchaseCost, calculateRentalInitialCost, formatYen, rentalExample } from "../lib/tools/calculators.ts";

const purchase = { propertyPrice: 30_000_000, brokerage: 0, registration: 0, taxes: 0, financing: 0, insurance: 0, other: 0 };

const withValues = (values, included = {}, base = {}) => ({
  rent: base.rent ?? rentalExample.rent,
  commonFee: base.commonFee ?? rentalExample.commonFee,
  values: { ...rentalExample.values, ...values },
  included: { ...rentalExample.included, ...included },
});

test("rental example uses Danny's defaults and adds ticked items only", () => {
  const result = calculateRentalInitialCost(rentalExample);
  const byKey = Object.fromEntries(result.lines.map((line) => [line.key, line.amount]));
  assert.equal(byKey.prepaidRent, 200_000); // 2 months of rent
  assert.equal(byKey.prepaidFee, 10_000); // 2 months of common-area fee
  assert.equal(byKey.brokerage, 110_000); // 1.1 months of rent (rent + 10% tax)
  assert.equal(byKey.guarantor, 105_000); // 1 month of rent + common-area fee
  assert.equal(byKey.insurance, 20_000);
  assert.equal(byKey.keyExchange, 20_000);
  assert.equal("cleaning" in byKey, false);
  assert.equal("aircon" in byKey, false);
  assert.equal(result.total, 666_100);
  assert.equal(result.additionalCosts, 466_100);
});

test("unticking an item removes it from the total", () => {
  const base = calculateRentalInitialCost(rentalExample).total;
  assert.equal(calculateRentalInitialCost(withValues({}, { keyMoney: false })).total, base - 100_000);
  assert.equal(calculateRentalInitialCost(withValues({ cleaning: 33_000 }, { cleaning: true })).total, base + 33_000);
  const none = Object.fromEntries(Object.keys(rentalExample.included).map((key) => [key, false]));
  assert.equal(calculateRentalInitialCost(withValues({}, none)).total, 0);
});

test("month-based items follow rent, common-area fee and fractional months", () => {
  const result = calculateRentalInitialCost(withValues({ guarantor: 0.5, deposit: 0, prepaidFee: 1.5 }, {}, { rent: 80_000, commonFee: 3_000 }));
  const byKey = Object.fromEntries(result.lines.map((line) => [line.key, line.amount]));
  assert.equal(byKey.guarantor, 41_500);
  assert.equal(byKey.deposit, 0);
  assert.equal(byKey.brokerage, 88_000);
  assert.equal(byKey.prepaidRent, 160_000);
  assert.equal(byKey.prepaidFee, 4_500);
});

test("rent and common-area fee are always required", () => {
  for (const value of [-1, Number.NaN, Number.POSITIVE_INFINITY, 1.25, 1_000_000_000_001]) {
    assert.equal(calculateRentalInitialCost(withValues({}, {}, { rent: value })), null);
    assert.equal(calculateRentalInitialCost(withValues({}, {}, { commonFee: value })), null);
  }
  assert.notEqual(calculateRentalInitialCost(withValues({}, {}, { commonFee: 0 })), null);
});

test("rental estimate rejects invalid values of ticked items only", () => {
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
