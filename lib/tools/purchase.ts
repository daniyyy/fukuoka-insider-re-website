/**
 * Purchase cost estimator (Danny, 2026-10-01). All amounts JPY. Rules checked 2026-10-01; review every April
 * (tax reform) and before 2027-03-31, when several reductions expire unless extended.
 *
 * Sources:
 * - Brokerage legal cap: MLIT https://www.mlit.go.jp/totikensangyo/const/1_6_bf_000013.html
 *   (Danny approved showing the cap formula in the estimator, 2026-10-01.)
 * - Stamp tax: NTA https://www.nta.go.jp/taxes/shiraberu/taxanswer/inshi/7108.htm (sale contracts: reduced rates to 2027-03-31)
 * - Registration tax: MLIT tax-reform summary https://www.mlit.go.jp/page/content/001975596.pdf
 *   (land transfer 1.5% to 2029-03-31; housing rates 0.3% / 0.15% / 0.1% to 2027-03-31)
 * - Acquisition tax: Fukuoka Prefecture https://www.pref.fukuoka.lg.jp/contents/fudousan.html (3% and 1/2 land base to 2027-03-31)
 * - Fixed asset / city planning tax: Fukuoka City https://www.city.fukuoka.lg.jp/zaisei/zeisei/life/koteisisanzei/001.html
 * - Pro-rata settlement starts 1 April in Fukuoka (Danny, 2026-10-01).
 * - Condo fees (national averages, MLIT マンション総合調査 R5): 管理費 ¥11,503 + 修繕積立金 ¥13,054 per month.
 * - Total costs rule of thumb (LIFULL HOME'S): new condo 3–6%, others 6–9% of price.
 */

export type PropertyType = "usedCondo" | "newCondo" | "usedHouse" | "newHouse";
export const isNewProperty = (type: PropertyType) => type === "newCondo" || type === "newHouse";
export const isCondoProperty = (type: PropertyType) => type === "usedCondo" || type === "newCondo";
export type BuyerType = "investor" | "owner";
/** Construction period of a used home (decides owner-occupier reductions). */
export type BuiltPeriod = "1997" | "1989" | "1985" | "1982" | "older";

export type PurchaseInputs = {
  price: number;
  type: PropertyType;
  buyer: BuyerType;
  /** 固定資産税評価額 of the land (for a condo, the unit's land share). */
  landValue: number;
  /** 固定資産税評価額 of the building (for a new condo, use the expected value). */
  buildingValue: number;
  /** Floor area in ㎡ (registered area). */
  floorArea: number;
  built: BuiltPeriod;
  /** Month of handover (1–12), for the fixed asset tax settlement. */
  handoverMonth: number;
  /** 0 = cash purchase. */
  loanAmount: number;
  /** Overrides; null = calculated. */
  brokerage: number | null;
  scrivener: number | null;
  includeBrokerage: boolean;
  /** Fire (and earthquake) insurance paid at purchase. */
  insurance: number;
  /** 管理費 + 修繕積立金 per month (condos). */
  monthlyFees: number;
  /** 修繕積立基金: one-off payment at handover, new condos only (usually ¥200,000–800,000). */
  repairFund: number;
};

export type PurchaseLineKey =
  | "brokerage" | "stampSale" | "regLand" | "regBuilding" | "scrivener" | "taxSettlement" | "insurance" | "repairFund"
  | "loanFee" | "stampLoan" | "regMortgage"
  | "acqLand" | "acqBuilding"
  | "annualTax" | "annualFees";

export type PurchaseLine = { key: PurchaseLineKey; amount: number };

export type PurchaseResult = {
  atPurchase: PurchaseLine[];
  later: PurchaseLine[];
  yearly: PurchaseLine[];
  atPurchaseTotal: number;
  laterTotal: number;
  /** Everything besides the price: at purchase + acquisition tax. */
  costsTotal: number;
  /** Price + costs. */
  grandTotal: number;
  yearlyTotal: number;
  costsPercent: number;
  /** Typical range of costs as % of price for this property type. */
  typicalPercent: [number, number];
  /** Whether owner-occupier housing reductions were applied. */
  housingReductions: boolean;
};

/**
 * Rough assessed values for visitors who do not have the assessment certificate
 * (Danny, 2026-10-01: overseas buyers rarely know 評価額; keep it simple and clearly approximate).
 * - Land: the price is split into land and building by type (condo 30%, new house 60% from Danny's ¥62M case,
 *   second-hand house 70%). Land assessed values are about 70% of the official land price, and Fukuoka City
 *   market prices are close to the official price (about +2% in 2025), so land value ≈ land part × 70%.
 * - Building: floor area × Fukuoka Legal Affairs Bureau unit price for new buildings (FY2024 table, valid to
 *   2027-03-31: wooden house ¥105,000/㎡, reinforced concrete ¥119,000/㎡) × the age rate in the same table.
 *   Houses are assumed wooden; condos add about 25% for the unit's share of common areas.
 *   https://houmukyoku.moj.go.jp/fukuoka/page000001_00278.pdf
 */
export const RULES_YEAR = 2026;
export const landShareByType: Record<PropertyType, number> = { usedCondo: 0.3, newCondo: 0.3, usedHouse: 0.7, newHouse: 0.6 };
const LAND_RATE = 0.7;
const unitPrice = { house: 105_000, condo: 119_000 * 1.25 };
// Age rates (years since built → rate), linear between the table rows.
const ageRates = {
  wood: [[1, 0.8], [5, 0.64], [10, 0.5], [15, 0.37], [20, 0.25], [25, 0.21], [27, 0.2]],
  concrete: [[1, 0.9579], [5, 0.8569], [10, 0.7397], [15, 0.6225], [20, 0.5054], [25, 0.3992], [30, 0.3059], [35, 0.2345], [40, 0.2089], [45, 0.2]],
} as const;

export function ageRate(age: number, wood: boolean) {
  const rows = wood ? ageRates.wood : ageRates.concrete;
  if (age <= rows[0][0]) return rows[0][1];
  for (let i = 1; i < rows.length; i += 1) {
    const [a1, r1] = rows[i];
    const [a0, r0] = rows[i - 1];
    if (age <= a1) return r0 + ((r1 - r0) * (age - a0)) / (a1 - a0);
  }
  return rows[rows.length - 1][1];
}

/** Built year → period used for the owner-occupier deductions (by calendar year; the exact cut-off months are approximated). */
export function builtPeriodFromYear(year: number): BuiltPeriod {
  if (year >= 1997) return "1997";
  if (year >= 1989) return "1989";
  if (year >= 1985) return "1985";
  if (year >= 1982) return "1982";
  return "older";
}

export const validBuiltYear = (year: number) => Number.isInteger(year) && year >= 1900 && year <= RULES_YEAR;

export function estimateAssessedValues({ price, type, floorArea, builtYear }: { price: number; type: PropertyType; floorArea: number; builtYear: number }) {
  const isNew = isNewProperty(type);
  if (!(price > 0) || !(floorArea > 0) || (!isNew && !validBuiltYear(builtYear))) return { landValue: Number.NaN, buildingValue: Number.NaN, percent: 0 };
  const condo = isCondoProperty(type);
  const landShare = landShareByType[type];
  const landValue = floorTo(price * landShare * LAND_RATE, 1_000);
  const rate = isNew ? 1 : ageRate(RULES_YEAR - builtYear, !condo);
  const building = floorArea * (condo ? unitPrice.condo : unitPrice.house) * rate;
  // Never more than the building part of the price.
  const buildingValue = floorTo(Math.min(building, price * (1 - landShare)), 1_000);
  return { landValue, buildingValue, percent: Math.round(((landValue + buildingValue) / price) * 100) };
}

export const purchaseExample: PurchaseInputs = {
  price: 30_000_000,
  type: "usedCondo",
  buyer: "investor",
  landValue: 3_000_000,
  buildingValue: 7_000_000,
  floorArea: 60,
  built: "1997",
  handoverMonth: 12,
  loanAmount: 0,
  brokerage: null,
  scrivener: null,
  includeBrokerage: true,
  insurance: 30_000,
  repairFund: 400_000,
  monthlyFees: 25_000,
};

const MAX_YEN = 100_000_000_000;
const validYen = (value: number) => Number.isInteger(value) && value >= 0 && value <= MAX_YEN;
const floorTo = (value: number, unit: number) => Math.floor(value / unit) * unit;

/** Brokerage legal cap including 10% consumption tax: 5% to ¥2M, 4% to ¥4M, 3% above (= price × 3% + ¥60,000). */
export function brokerageCap(price: number) {
  const base = price <= 2_000_000 ? price * 0.05 : price <= 4_000_000 ? price * 0.04 + 20_000 : price * 0.03 + 60_000;
  return Math.floor(base * 1.1);
}

/** Stamp tax on the sale contract (reduced rates, contracts made by 2027-03-31). */
export function stampTaxSale(price: number) {
  const table: [number, number][] = [[100_000, 0], [500_000, 200], [1_000_000, 500], [5_000_000, 1_000], [10_000_000, 5_000], [50_000_000, 10_000], [100_000_000, 30_000], [500_000_000, 60_000], [1_000_000_000, 160_000], [5_000_000_000, 320_000]];
  if (price < 10_000) return 0;
  return table.find(([limit]) => price <= limit)?.[1] ?? 480_000;
}

/** Stamp tax on a paper loan contract (no reduction; electronic contracts need none). */
export function stampTaxLoan(amount: number) {
  if (amount <= 0) return 0;
  const table: [number, number][] = [[100_000, 200], [500_000, 400], [1_000_000, 1_000], [5_000_000, 2_000], [10_000_000, 10_000], [50_000_000, 20_000], [100_000_000, 60_000], [500_000_000, 100_000], [1_000_000_000, 200_000], [5_000_000_000, 400_000]];
  return table.find(([limit]) => amount <= limit)?.[1] ?? 600_000;
}

/** 登録免許税: base rounded down to ¥1,000, tax rounded down to ¥100, minimum ¥1,000 when there is a base. */
const registrationTax = (base: number, rate: number) => (base <= 0 ? 0 : Math.max(1_000, floorTo(floorTo(base, 1_000) * rate, 100)));

/** Used-home building deduction for 不動産取得税 (owner-occupied, 50–240㎡). */
const usedDeduction: Record<BuiltPeriod, number> = { "1997": 12_000_000, "1989": 10_000_000, "1985": 4_500_000, "1982": 4_200_000, older: 0 };

/** Days from the 15th of the handover month to the next 31 March (inclusive), over 365. Fukuoka starts the tax year on 1 April. */
export function settlementShare(month: number) {
  const year = month >= 4 ? 2026 : 2027;
  const start = Date.UTC(year, month - 1, 15);
  const end = Date.UTC(month >= 4 ? 2027 : 2027, 2, 31);
  return Math.min(1, Math.max(0, (end - start) / 86_400_000 + 1) / 365);
}

export function validPurchase(input: PurchaseInputs) {
  const yen = [input.price, input.landValue, input.buildingValue, input.loanAmount, input.insurance, input.monthlyFees, input.repairFund];
  if (!yen.every(validYen) || input.price <= 0) return false;
  if (input.brokerage !== null && !validYen(input.brokerage)) return false;
  if (input.scrivener !== null && !validYen(input.scrivener)) return false;
  if (!Number.isFinite(input.floorArea) || input.floorArea <= 0 || input.floorArea > 2_000) return false;
  return Number.isInteger(input.handoverMonth) && input.handoverMonth >= 1 && input.handoverMonth <= 12;
}

export function calculatePurchase(input: PurchaseInputs): PurchaseResult | null {
  if (!validPurchase(input)) return null;
  const { price, type, landValue: land, buildingValue: building, floorArea: area, loanAmount: loan } = input;
  const isNew = isNewProperty(type);
  const isCondo = isCondoProperty(type);
  // Owner-occupier housing reductions: lives there (住民票), 50㎡+, used homes built 1982 or later (or with a certificate).
  const housing = input.buyer === "owner" && area >= 50 && (isNew || input.built !== "older");

  const atPurchase: PurchaseLine[] = [];
  if (input.includeBrokerage) atPurchase.push({ key: "brokerage", amount: input.brokerage ?? brokerageCap(price) });
  atPurchase.push({ key: "stampSale", amount: stampTaxSale(price) });
  atPurchase.push({ key: "regLand", amount: registrationTax(land, 0.015) });
  atPurchase.push({ key: "regBuilding", amount: registrationTax(building, isNew ? (housing ? 0.0015 : 0.004) : housing ? 0.003 : 0.02) });
  atPurchase.push({ key: "scrivener", amount: input.scrivener ?? (loan > 0 ? 170_000 : 120_000) });

  // Annual fixed asset tax (1.4%) + city planning tax (0.3%); residential land ≤200㎡ per unit: 1/6 and 1/3 of the land value.
  // New homes: building fixed asset tax halved on up to 120㎡ (condos 5 years, houses 3 years); shown as the first years' cost.
  const newBuildingFactor = isNew && area >= 40 ? (area <= 120 ? 0.5 : 1 - (0.5 * 120) / area) : 1;
  const landTax = land * (1 / 6) * 0.014 + land * (1 / 3) * 0.003;
  const buildingTax = building * 0.014 * newBuildingFactor + building * 0.003;
  const annualTax = Math.round(landTax + buildingTax);
  // A new building is not yet assessed at handover, so only the land share is settled.
  atPurchase.push({ key: "taxSettlement", amount: Math.round((isNew ? landTax : landTax + buildingTax) * settlementShare(input.handoverMonth)) });
  atPurchase.push({ key: "insurance", amount: input.insurance });
  if (input.type === "newCondo" && input.repairFund > 0) atPurchase.push({ key: "repairFund", amount: input.repairFund });
  if (loan > 0) {
    atPurchase.push({ key: "loanFee", amount: Math.floor(loan * 0.022) });
    atPurchase.push({ key: "stampLoan", amount: stampTaxLoan(loan) });
    atPurchase.push({ key: "regMortgage", amount: registrationTax(loan, housing ? 0.001 : 0.004) });
  }

  // 不動産取得税 (Fukuoka Prefecture), billed about 6–12 months after registration.
  const deduction = isNew ? (area >= 40 && area <= 240 ? 12_000_000 : 0) : housing && area <= 240 ? usedDeduction[input.built] : 0;
  const buildingThreshold = isNew ? 660_000 : 340_000;
  const acqBuilding = building < buildingThreshold ? 0 : floorTo(floorTo(Math.max(0, building - deduction), 1_000) * 0.03, 100);
  const landReduction = (isNew && area >= 40) || (housing && area <= 240) ? 45_000 : 0;
  const acqLand = land < 160_000 ? 0 : Math.max(0, floorTo(floorTo(land / 2, 1_000) * 0.03, 100) - landReduction);
  const later: PurchaseLine[] = [{ key: "acqLand", amount: acqLand }, { key: "acqBuilding", amount: acqBuilding }];

  const yearly: PurchaseLine[] = [{ key: "annualTax", amount: annualTax }];
  if (isCondo) yearly.push({ key: "annualFees", amount: input.monthlyFees * 12 });

  const sum = (lines: PurchaseLine[]) => lines.reduce((total, line) => total + line.amount, 0);
  const atPurchaseTotal = sum(atPurchase);
  const laterTotal = sum(later);
  const costsTotal = atPurchaseTotal + laterTotal;
  return {
    atPurchase, later, yearly, atPurchaseTotal, laterTotal, costsTotal,
    grandTotal: price + costsTotal,
    yearlyTotal: sum(yearly),
    costsPercent: Math.round((costsTotal / price) * 1000) / 10,
    typicalPercent: type === "newCondo" ? [3, 6] : [6, 9],
    housingReductions: housing,
  };
}
