import assert from "node:assert/strict";
import test from "node:test";
import { calculatePurchaseCost, calculateRentalInitialCost, formatYen } from "../lib/tools/calculators.ts";

const rental = { monthlyRent: 100_000, upfrontMonths: 1, depositMonths: 0, keyMoneyMonths: 0, brokerage: 0, guarantor: 0, insurance: 0, other: 0 };
const purchase = { propertyPrice: 30_000_000, brokerage: 0, registration: 0, taxes: 0, financing: 0, insurance: 0, other: 0 };

test("rental estimate adds only supplied costs", () => {
  assert.deepEqual(calculateRentalInitialCost(rental), {
    lines: [
      { key: "upfrontRent", amount: 100_000 }, { key: "deposit", amount: 0 }, { key: "keyMoney", amount: 0 },
      { key: "brokerage", amount: 0 }, { key: "guarantor", amount: 0 }, { key: "insurance", amount: 0 }, { key: "other", amount: 0 },
    ], additionalCosts: 0, total: 100_000,
  });
  assert.equal(calculateRentalInitialCost({ ...rental, monthlyRent: 0 }).total, 0);
  assert.equal(calculateRentalInitialCost({ ...rental, upfrontMonths: 1.5, depositMonths: .5, brokerage: 55_000 }).total, 255_000);
  assert.equal(calculateRentalInitialCost({ ...rental, monthlyRent: 1, depositMonths: .5 }).total, 2);
});

test("rental estimate rejects invalid and unsafe values", () => {
  for (const value of [-1, Number.NaN, Number.POSITIVE_INFINITY, 1.25, 1_000_000_000_001]) {
    assert.equal(calculateRentalInitialCost({ ...rental, monthlyRent: value }), null);
  }
  assert.equal(calculateRentalInitialCost({ ...rental, depositMonths: 25 }), null);
  assert.equal(calculateRentalInitialCost({ ...rental, other: -1 }), null);
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
