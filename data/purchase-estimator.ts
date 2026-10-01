import type { Locale } from "@/config/site";
import type { BuiltPeriod, BuyerType, PropertyType, PurchaseLineKey } from "@/lib/tools/purchase";

/** Copy for the purchase cost estimator (Danny, 2026-10-01). zh-TW is the source; ja/en are provisional until the final translation pass. */
export type PurchaseCopy = {
  sample: string;
  sections: { property: string; propertyNote: string; values: string; valuesNote: string; payment: string; adjust: string; adjustNote: string };
  fields: {
    price: string; type: string; buyer: string; area: string; areaHint: string; built: string; builtHint: string;
    landValue: string; buildingValue: string; valueHint: string; newValueHint: string;
    payment: string; loanAmount: string; handover: string; handoverHint: string;
    brokerage: string; brokerageHint: string; brokerageReset: string; includeBrokerage: string; newCondoBrokerage: string;
    scrivener: string; scrivenerHint: string; insurance: string; insuranceHint: string; monthlyFees: string; monthlyFeesHint: string;
  };
  types: Record<PropertyType, string>;
  buyers: Record<BuyerType, string>;
  buyerHint: Record<BuyerType, string>;
  built: Record<BuiltPeriod, string>;
  payments: { cash: string; loan: string };
  month: (month: number) => string;
  units: { yen: string; sqm: string };
  lines: Record<PurchaseLineKey, string>;
  result: {
    title: string; atPurchase: string; later: string; laterNote: string; costsTotal: string; percent: (value: number, low: number, high: number) => string;
    grandTotal: string; yearly: string; yearlyTotal: string; perMonth: string; housingOn: string; housingOff: string; reference: string; note: string; invalid: string;
  };
  overseas: { title: string; items: string[] };
  method: { title: string; items: string[]; sources: string };
  /** First line of the LINE / WhatsApp message (button labels come from the rental estimator copy). */
  sendGreeting: string;
  cta: string;
  related: string;
};

export const purchaseCopy: Record<Locale, PurchaseCopy> = {
  "zh-TW": {
    sample: "已填入示例數字（二手公寓、投資／海外業主、現金購買）。請按物件資料修改；評價額可向我們索取。",
    sections: {
      property: "物件資料",
      propertyNote: "物件類型與買家類型會影響適用的稅率及減免。",
      values: "固定資產稅評價額",
      valuesNote: "登錄免許稅、不動產取得稅及每年的固定資產稅，都以評價額計算，而不是以成交價計算。",
      payment: "付款與交屋",
      adjust: "可調整的費用",
      adjustNote: "以下為一般金額，可按實際報價修改。",
    },
    fields: {
      price: "物件價格",
      type: "物件類型",
      buyer: "買家類型",
      area: "專有面積",
      areaHint: "登記面積；50㎡ 以上才適用部分住宅減免",
      built: "建築年份",
      builtHint: "自住買家的減免按建築年份而定",
      landValue: "土地評價額",
      buildingValue: "建物評價額",
      valueHint: "見物件資料或「固定資產評價證明書」；示例數字，請改為實際金額",
      newValueHint: "新建物件尚未有評價額，可向發展商查詢預計金額",
      payment: "付款方式",
      loanAmount: "貸款金額",
      handover: "交屋月份",
      handoverHint: "用於計算固定資產稅精算（福岡習慣以 4 月 1 日起算）",
      brokerage: "仲介費",
      brokerageHint: "預設為法定上限：價格 × 3% ＋ 6 萬日圓，另加消費稅（低價物件另有規定）。實際以仲介契約為準",
      brokerageReset: "按法定上限重新計算",
      includeBrokerage: "計入仲介費",
      newCondoBrokerage: "向發展商直接購買新建公寓，一般不收仲介費",
      scrivener: "司法書士費用",
      scrivenerHint: "辦理登記的專業費用，不含登錄免許稅；現金購買約 6–10 萬日圓，有貸款約 10–15 萬日圓。海外買家所需文件或另有費用",
      insurance: "火災保險",
      insuranceHint: "示例金額（5 年）；地震保險另計",
      monthlyFees: "每月管理費＋修繕積立金",
      monthlyFeesHint: "見物件資料；全國平均每月約 2.5 萬日圓",
    },
    types: { usedCondo: "二手公寓", newCondo: "新建公寓", house: "獨立屋" },
    buyers: { investor: "投資／海外業主", owner: "自住" },
    buyerHint: {
      investor: "出租、度假屋或人在海外，一般不適用住宅減免",
      owner: "本人入住並遷入住民票，面積 50㎡ 以上，二手屋須 1982 年以後建成",
    },
    built: { "1997": "1997 年 4 月以後", "1989": "1989 年 7 月–1997 年 3 月", "1985": "1985 年 7 月–1989 年 6 月", "1982": "1982 年 1 月–1985 年 6 月", older: "1981 年或以前" },
    payments: { cash: "現金", loan: "貸款" },
    month: (month) => `${month} 月`,
    units: { yen: "日圓", sqm: "㎡" },
    lines: {
      brokerage: "仲介費",
      stampSale: "印花稅（買賣契約）",
      regLand: "登錄免許稅（土地）",
      regBuilding: "登錄免許稅（建物）",
      scrivener: "司法書士費用",
      taxSettlement: "固定資產稅精算",
      insurance: "火災保險",
      loanFee: "貸款手續費（2.2%）",
      stampLoan: "印花稅（貸款契約）",
      regMortgage: "登錄免許稅（抵押權）",
      acqLand: "不動產取得稅（土地）",
      acqBuilding: "不動產取得稅（建物）",
      annualTax: "固定資產稅＋都市計畫稅",
      annualFees: "管理費＋修繕積立金",
    },
    result: {
      title: "費用明細",
      atPurchase: "簽約至交屋時",
      later: "交屋後約 6–12 個月",
      laterNote: "福岡縣寄出稅單後繳付",
      costsTotal: "物件價格以外的費用",
      percent: (value, low, high) => `約為物件價格的 ${value}%（一般約 ${low}–${high}%）`,
      grandTotal: "連同物件價格合計",
      yearly: "每年持有成本",
      yearlyTotal: "每年合計",
      perMonth: "平均每月",
      housingOn: "已套用自住住宅減免",
      housingOff: "未套用住宅減免",
      reference: "只供參考，並非報價",
      note: "稅額按 2026 年 10 月的稅制及您輸入的評價額估算。印花稅、部分登記及取得稅的減免期限至 2027 年 3 月 31 日。實際金額以司法書士、稅務機關及各契約為準。",
      invalid: "請輸入有效數字：價格須大於 0，面積須大於 0。",
    },
    overseas: {
      title: "海外買家須知",
      items: [
        "外為法報告：住在海外的買家購入投資物件或度假屋，須在取得後 20 日內經日本銀行向財務大臣報告（自住等情況可豁免）。",
        "納稅管理人：住在海外的業主，須指定在日本的納稅管理人，處理固定資產稅等稅務文件。",
        "登記時申報國籍：2026 年 10 月 5 日起，辦理所有權登記時須申報國籍，一般由司法書士協助。",
        "匯款：銀行會查問資金用途及來源，請預留匯款時間，並計入匯率差價及手續費。",
      ],
    },
    method: {
      title: "計算方法",
      items: [
        "仲介費：價格 × 3% ＋ 6 萬日圓，另加 10% 消費稅（法定上限；價格 400 萬日圓以下另有計法）。",
        "印花稅：按契約金額的減輕稅率表（例如 1,000 萬–5,000 萬日圓為 1 萬日圓）。",
        "登錄免許稅：土地評價額 × 1.5%；建物評價額 × 2%（自住符合條件 0.3%）；新建物件保存登記 0.4%（自住 0.15%）；抵押權為貸款額 × 0.4%（自住 0.1%）。",
        "不動產取得稅：土地評價額 × 1/2 × 3%；建物評價額 × 3%，新建住宅可扣除 1,200 萬日圓，自住二手屋按建築年份扣除。",
        "固定資產稅＋都市計畫稅（福岡市）：土地評價額 × 1/6 × 1.4% ＋ 土地評價額 × 1/3 × 0.3%，建物評價額 × 1.7%；新建公寓首 5 年建物部分減半。",
        "固定資產稅精算：由交屋日至翌年 3 月 31 日，按日數分擔（福岡習慣以 4 月 1 日起算）。",
      ],
      sources: "依據：國稅廳、法務局、國土交通省、福岡縣及福岡市公開資料（2026 年 10 月確認）。",
    },
    sendGreeting: "您好，我在網站估算了買房費用：",
    cta: "免費諮詢",
    related: "房產買賣",
  },
  ja: {
    sample: "入力例（中古マンション・投資／海外在住・現金購入）が入っています。物件資料に合わせて変更してください。評価額はお問い合わせください。",
    sections: {
      property: "物件情報",
      propertyNote: "物件の種類と購入者の区分で、税率や軽減措置が変わります。",
      values: "固定資産税評価額",
      valuesNote: "登録免許税、不動産取得税、毎年の固定資産税は、売買価格ではなく評価額をもとに計算します。",
      payment: "支払いと引渡し",
      adjust: "調整できる費用",
      adjustNote: "一般的な金額です。実際の見積りに合わせて変更できます。",
    },
    fields: {
      price: "物件価格", type: "物件の種類", buyer: "購入者の区分", area: "専有面積", areaHint: "登記面積。50㎡以上で一部の住宅軽減が適用", built: "築年", builtHint: "自己居住の軽減は築年で異なります",
      landValue: "土地の評価額", buildingValue: "建物の評価額", valueHint: "物件資料または固定資産評価証明書をご確認ください。入力例の数字です", newValueHint: "新築は評価額が未決定のため、売主に見込額をご確認ください",
      payment: "支払方法", loanAmount: "借入額", handover: "引渡し月", handoverHint: "固定資産税の精算に使用（福岡では4月1日起算が一般的）",
      brokerage: "仲介手数料", brokerageHint: "法定上限（価格×3%＋6万円＋消費税、低廉物件は別規定）を初期値としています。実際は媒介契約によります", brokerageReset: "法定上限で再計算", includeBrokerage: "仲介手数料を含める", newCondoBrokerage: "売主から直接購入する新築マンションは、通常仲介手数料はかかりません",
      scrivener: "司法書士報酬", scrivenerHint: "登録免許税を除く。現金購入で約6〜10万円、ローン利用で約10〜15万円。海外在住の方は書類により別途費用の場合あり", insurance: "火災保険", insuranceHint: "入力例（5年）。地震保険は別途", monthlyFees: "管理費＋修繕積立金（月額）", monthlyFeesHint: "物件資料をご確認ください。全国平均は月約2.5万円",
    },
    types: { usedCondo: "中古マンション", newCondo: "新築マンション", house: "戸建て" },
    buyers: { investor: "投資／海外在住", owner: "自己居住" },
    buyerHint: { investor: "賃貸・別荘・海外在住の場合、住宅の軽減は通常適用されません", owner: "本人が住民票を移して居住、50㎡以上、中古は1982年以降の建築" },
    built: { "1997": "1997年4月以降", "1989": "1989年7月〜1997年3月", "1985": "1985年7月〜1989年6月", "1982": "1982年1月〜1985年6月", older: "1981年以前" },
    payments: { cash: "現金", loan: "ローン" },
    month: (month) => `${month}月`,
    units: { yen: "円", sqm: "㎡" },
    lines: {
      brokerage: "仲介手数料", stampSale: "印紙税（売買契約）", regLand: "登録免許税（土地）", regBuilding: "登録免許税（建物）", scrivener: "司法書士報酬", taxSettlement: "固定資産税の精算", insurance: "火災保険",
      loanFee: "ローン事務手数料（2.2%）", stampLoan: "印紙税（金銭消費貸借契約）", regMortgage: "登録免許税（抵当権）", acqLand: "不動産取得税（土地）", acqBuilding: "不動産取得税（建物）", annualTax: "固定資産税＋都市計画税", annualFees: "管理費＋修繕積立金",
    },
    result: {
      title: "内訳", atPurchase: "契約から引渡しまで", later: "引渡し後 約6〜12か月", laterNote: "福岡県から届く納税通知書で納付", costsTotal: "物件価格以外の費用",
      percent: (value, low, high) => `物件価格の約${value}%（一般的には約${low}〜${high}%）`, grandTotal: "物件価格を含む合計", yearly: "毎年の保有コスト", yearlyTotal: "年間合計", perMonth: "月平均",
      housingOn: "住宅の軽減を適用", housingOff: "住宅の軽減は未適用", reference: "参考値です（見積りではありません）",
      note: "2026年10月時点の税制と入力された評価額による概算です。印紙税・一部の登録免許税・不動産取得税の軽減は2027年3月31日までです。実際の金額は司法書士・税務当局・各契約でご確認ください。",
      invalid: "有効な数値を入力してください（価格・面積は0より大きい値）。",
    },
    overseas: {
      title: "海外在住の購入者の方へ",
      items: [
        "外為法の報告：非居住者が投資用・別荘用の不動産を取得した場合、取得後20日以内に日本銀行経由で財務大臣へ報告が必要です（自己居住用などは対象外）。",
        "納税管理人：海外在住の所有者は、固定資産税などのために日本国内の納税管理人を定める必要があります。",
        "国籍等の申出：2026年10月5日から、所有権の登記の際に国籍等の申出が必要です（通常は司法書士が対応）。",
        "送金：銀行から資金の目的や出所を確認されるため、余裕をもって送金し、為替差・手数料も見込んでください。",
      ],
    },
    method: {
      title: "計算方法",
      items: [
        "仲介手数料：価格×3%＋6万円＋消費税10%（法定上限。400万円以下は別の計算）。",
        "印紙税：軽減税率表による（1,000万円超5,000万円以下は1万円など）。",
        "登録免許税：土地評価額×1.5%、建物評価額×2%（自己居住で要件を満たす場合0.3%）、新築の保存登記0.4%（同0.15%）、抵当権は借入額×0.4%（同0.1%）。",
        "不動産取得税：土地評価額×1/2×3%、建物評価額×3%（新築住宅は1,200万円控除、自己居住の中古住宅は築年により控除）。",
        "固定資産税＋都市計画税（福岡市）：土地評価額×1/6×1.4%＋土地評価額×1/3×0.3%、建物評価額×1.7%（新築マンションは5年間建物分を減額）。",
        "固定資産税の精算：引渡し日から翌年3月31日までを日割り（福岡では4月1日起算が一般的）。",
      ],
      sources: "根拠：国税庁、法務局、国土交通省、福岡県、福岡市の公開資料（2026年10月確認）。",
    },
    sendGreeting: "こんにちは。サイトで購入費用を概算しました。",
    cta: "無料相談",
    related: "不動産売買",
  },
  en: {
    sample: "Example figures are filled in (used condo, investor / overseas owner, cash). Change them to the property's figures; ask us for the assessed values.",
    sections: {
      property: "Property",
      propertyNote: "The property type and buyer type decide which tax rates and reductions apply.",
      values: "Assessed value (固定資産税評価額)",
      valuesNote: "Registration tax, acquisition tax and the yearly fixed asset tax are calculated on the assessed value, not the sale price.",
      payment: "Payment and handover",
      adjust: "Costs you can adjust",
      adjustNote: "Typical amounts; change them to the actual quotes.",
    },
    fields: {
      price: "Property price", type: "Property type", buyer: "Buyer type", area: "Floor area", areaHint: "Registered area; some housing reductions need 50㎡ or more", built: "Year built", builtHint: "Owner-occupier reductions depend on the year built",
      landValue: "Land assessed value", buildingValue: "Building assessed value", valueHint: "See the property details or the assessment certificate; these are example figures", newValueHint: "New buildings have no assessed value yet; ask the developer for an estimate",
      payment: "Payment", loanAmount: "Loan amount", handover: "Handover month", handoverHint: "Used for the fixed asset tax settlement (Fukuoka usually counts from 1 April)",
      brokerage: "Brokerage fee", brokerageHint: "Starts at the legal maximum: price × 3% + ¥60,000, plus consumption tax (different rules for low-priced properties). The brokerage contract decides the actual fee", brokerageReset: "Recalculate at the legal maximum", includeBrokerage: "Include brokerage fee", newCondoBrokerage: "New condos bought directly from the developer usually have no brokerage fee",
      scrivener: "Judicial scrivener fee", scrivenerHint: "Excludes registration tax; about ¥60,000–100,000 for cash, ¥100,000–150,000 with a loan. Overseas buyers may need extra documents", insurance: "Fire insurance", insuranceHint: "Example amount (5 years); earthquake cover extra", monthlyFees: "Management + repair reserve (monthly)", monthlyFeesHint: "See the property details; the national average is about ¥25,000 a month",
    },
    types: { usedCondo: "Used condo", newCondo: "New condo", house: "House" },
    buyers: { investor: "Investor / overseas owner", owner: "Owner-occupier" },
    buyerHint: { investor: "Rentals, holiday homes and overseas owners usually do not get housing reductions", owner: "You live there and register your address, 50㎡ or more, used homes built 1982 or later" },
    built: { "1997": "April 1997 or later", "1989": "Jul 1989 – Mar 1997", "1985": "Jul 1985 – Jun 1989", "1982": "Jan 1982 – Jun 1985", older: "1981 or earlier" },
    payments: { cash: "Cash", loan: "Loan" },
    month: (month) => ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][month - 1] ?? String(month),
    units: { yen: "JPY", sqm: "㎡" },
    lines: {
      brokerage: "Brokerage fee", stampSale: "Stamp tax (sale contract)", regLand: "Registration tax (land)", regBuilding: "Registration tax (building)", scrivener: "Judicial scrivener fee", taxSettlement: "Fixed asset tax settlement", insurance: "Fire insurance",
      loanFee: "Loan fee (2.2%)", stampLoan: "Stamp tax (loan contract)", regMortgage: "Registration tax (mortgage)", acqLand: "Acquisition tax (land)", acqBuilding: "Acquisition tax (building)", annualTax: "Fixed asset + city planning tax", annualFees: "Management + repair reserve",
    },
    result: {
      title: "Cost breakdown", atPurchase: "From contract to handover", later: "About 6–12 months after handover", laterNote: "Paid when Fukuoka Prefecture sends the tax notice", costsTotal: "Costs besides the price",
      percent: (value, low, high) => `About ${value}% of the price (typically ${low}–${high}%)`, grandTotal: "Total including the price", yearly: "Yearly holding costs", yearlyTotal: "Per year", perMonth: "Per month on average",
      housingOn: "Housing reductions applied", housingOff: "No housing reductions", reference: "For reference only, not a quote",
      note: "Estimated with the tax rules as of October 2026 and the assessed values you entered. Stamp tax and some registration and acquisition tax reductions run until 31 March 2027. Confirm actual amounts with the judicial scrivener, the tax offices and each contract.",
      invalid: "Enter valid numbers: the price and floor area must be above zero.",
    },
    overseas: {
      title: "For buyers living overseas",
      items: [
        "Foreign exchange report: non-residents buying investment property or a holiday home must report to the Minister of Finance through the Bank of Japan within 20 days (homes for their own use are exempt).",
        "Tax agent: owners living overseas must appoint a tax agent in Japan for fixed asset tax and other tax documents.",
        "Nationality at registration: from 5 October 2026, buyers declare their nationality when registering ownership; the judicial scrivener usually handles it.",
        "Remittance: banks ask about the purpose and source of funds, so allow time for the transfer and budget for exchange spreads and fees.",
      ],
    },
    method: {
      title: "How it is calculated",
      items: [
        "Brokerage: price × 3% + ¥60,000, plus 10% consumption tax (legal maximum; different for prices up to ¥4 million).",
        "Stamp tax: reduced table by contract amount (¥10,000 for ¥10–50 million).",
        "Registration tax: land value × 1.5%; building value × 2% (0.3% for qualifying owner-occupiers); new-building registration 0.4% (0.15%); mortgage loan × 0.4% (0.1%).",
        "Acquisition tax: land value × 1/2 × 3%; building value × 3%, with a ¥12 million deduction for new homes and a year-based deduction for used owner-occupied homes.",
        "Fixed asset + city planning tax (Fukuoka City): land value × 1/6 × 1.4% + land value × 1/3 × 0.3%; building value × 1.7%, halved for new condos in the first 5 years.",
        "Tax settlement: shared by days from handover to the next 31 March (Fukuoka usually counts from 1 April).",
      ],
      sources: "Based on public information from the National Tax Agency, Legal Affairs Bureau, MLIT, Fukuoka Prefecture and Fukuoka City (checked October 2026).",
    },
    sendGreeting: "Hello, I estimated purchase costs on your website:",
    cta: "Free Consultation",
    related: "Buy & Sell service",
  },
};
