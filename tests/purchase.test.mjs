import assert from "node:assert/strict";
import test from "node:test";
import { brokerageCap, calculatePurchase, purchaseExample, settlementShare, stampTaxSale } from "../lib/tools/purchase.ts";

const byKey = (lines) => Object.fromEntries(lines.map((line) => [line.key, line.amount]));

test("brokerage cap follows the legal tiers including 10% tax", () => {
  assert.equal(brokerageCap(30_000_000), 1_056_000); // (3% + ¥60,000) × 1.1
  assert.equal(brokerageCap(4_000_000), 198_000); // (4% + ¥20,000) × 1.1
  assert.equal(brokerageCap(2_000_000), 110_000); // 5% × 1.1
});

test("stamp tax uses the reduced sale-contract table", () => {
  assert.equal(stampTaxSale(30_000_000), 10_000);
  assert.equal(stampTaxSale(50_000_000), 10_000);
  assert.equal(stampTaxSale(50_000_001), 30_000);
  assert.equal(stampTaxSale(8_000_000), 5_000);
});

test("settlement runs from handover to 31 March (Fukuoka starts on 1 April)", () => {
  assert.equal(Math.round(settlementShare(12) * 365), 107); // 15 Dec – 31 Mar
  assert.equal(Math.round(settlementShare(4) * 365), 351); // 15 Apr – 31 Mar
});

test("investor buying a used condo in cash (example)", () => {
  const result = calculatePurchase(purchaseExample);
  const now = byKey(result.atPurchase);
  assert.equal(now.brokerage, 1_056_000);
  assert.equal(now.stampSale, 10_000);
  assert.equal(now.regLand, 45_000); // land 1.5%
  assert.equal(now.regBuilding, 140_000); // building 2% (no housing reduction)
  assert.equal(now.scrivener, 120_000);
  assert.equal(now.taxSettlement, 37_816); // ¥129,000 a year × 107/365
  assert.equal("loanFee" in now, false);
  const later = byKey(result.later);
  assert.equal(later.acqBuilding, 210_000); // 3%, no deduction
  assert.equal(later.acqLand, 45_000); // 1/2 base × 3%
  assert.equal(result.costsTotal, 1_693_816);
  assert.equal(result.grandTotal, 31_693_816);
  assert.deepEqual(byKey(result.yearly), { annualTax: 129_000, annualFees: 300_000 });
  assert.equal(result.housingReductions, false);
});

test("owner-occupier gets housing reductions", () => {
  const result = calculatePurchase({ ...purchaseExample, buyer: "owner" });
  const now = byKey(result.atPurchase);
  assert.equal(now.regBuilding, 21_000); // 0.3%
  const later = byKey(result.later);
  assert.equal(later.acqBuilding, 0); // ¥12M deduction (built 1997+)
  assert.equal(later.acqLand, 0); // ¥45,000 reduction
  assert.equal(result.housingReductions, true);
  // Under 50㎡ or built before 1982: no reduction.
  assert.equal(calculatePurchase({ ...purchaseExample, buyer: "owner", floorArea: 45 }).housingReductions, false);
  assert.equal(calculatePurchase({ ...purchaseExample, buyer: "owner", built: "older" }).housingReductions, false);
});

test("loan adds fee, loan stamp tax and mortgage registration", () => {
  const now = byKey(calculatePurchase({ ...purchaseExample, loanAmount: 20_000_000 }).atPurchase);
  assert.equal(now.loanFee, 440_000); // 2.2%
  assert.equal(now.stampLoan, 20_000);
  assert.equal(now.regMortgage, 80_000); // 0.4%
  assert.equal(now.scrivener, 170_000);
});

test("new condo: no brokerage by default handled by the page, new-home deduction for rentals too", () => {
  const result = calculatePurchase({ ...purchaseExample, type: "newCondo", includeBrokerage: false });
  const now = byKey(result.atPurchase);
  assert.equal("brokerage" in now, false);
  assert.equal(now.regBuilding, 28_000); // 保存登記 0.4%
  assert.equal(byKey(result.later).acqBuilding, 0); // ¥12M deduction applies to rentals
  assert.deepEqual(result.typicalPercent, [3, 6]);
  assert.equal(byKey(result.yearly).annualTax, Math.round(3_000_000 / 6 * 0.014 + 3_000_000 / 3 * 0.003 + 7_000_000 * 0.014 * 0.5 + 7_000_000 * 0.003));
});

test("invalid inputs return null; brokerage override is used", () => {
  assert.equal(calculatePurchase({ ...purchaseExample, price: 0 }), null);
  assert.equal(calculatePurchase({ ...purchaseExample, landValue: -1 }), null);
  assert.equal(byKey(calculatePurchase({ ...purchaseExample, brokerage: 500_000 }).atPurchase).brokerage, 500_000);
});
