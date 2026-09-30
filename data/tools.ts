import type { Locale } from "@/config/site";

export type ToolKey = "rental-initial-cost" | "purchase-cost";

type ToolText = {
  title: string;
  intro: string;
  sample: string;
  inputTitle: string;
  resultTitle: string;
  total: string;
  additional: string;
  note: string;
  invalid: string;
  action: string;
  related: string;
  fields: Record<string, { label: string; hint?: string }>;
};

export const toolsCopy: Record<Locale, {
  indexTitle: string; indexIntro: string; indexNote: string; open: string; back: string; labels: Record<ToolKey, string>; tools: Record<ToolKey, ToolText>;
}> = {
  "zh-TW": {
    indexTitle: "費用估算工具", indexIntro: "輸入目前知道的金額，先整理租屋或買房可能需要準備的費用。", indexNote: "以下結果只依輸入項目加總，不是物件報價。未填的費用不會自動估入。", open: "開始估算", back: "所有估算工具", labels: { "rental-initial-cost": "租屋初期費用", "purchase-cost": "買房費用" },
    tools: {
      "rental-initial-cost": {
        title: "租屋初期費用估算", intro: "依每月租金、預付租金及已知費用，估算簽約前可能需要準備的金額。", sample: "表單已填入示例租金，其他費用預設為 0；請改成個別物件提供的數字。", inputTitle: "輸入金額", resultTitle: "費用明細", total: "估算合計（非報價）", additional: "預付租金以外費用", note: "未輸入的費用以 0 計，結果可能低於實際金額。敷金、禮金、仲介費、保證費、保險及入住時需付租金，均依物件與契約確認。本工具不是報價。", invalid: "請輸入 0 或以上的有效金額；月份不可超過 24。", action: "詢問租屋服務", related: "租屋服務", fields: {
          monthlyRent: { label: "每月租金", hint: "日圓；示例為 ¥100,000" }, upfrontMonths: { label: "需預付租金（月）", hint: "依契約輸入月數，可用 0.5" }, depositMonths: { label: "敷金（月）", hint: "日本租約中的押金；按物件資料輸入月數" }, keyMoneyMonths: { label: "禮金（月）", hint: "可能收取的簽約款項；按物件資料輸入月數" }, brokerage: { label: "仲介費（日圓）" }, guarantor: { label: "租賃保證公司費用（日圓）", hint: "如物件要求使用保證公司，輸入已確認的費用" }, insurance: { label: "保險（日圓）" }, other: { label: "其他已知費用（日圓）" }, upfrontRent: { label: "預付租金" }, deposit: { label: "敷金" }, keyMoney: { label: "禮金" },
        },
      },
      "purchase-cost": {
        title: "買房費用估算", intro: "將物件價格與已知的交易費用分開整理，初步估算總金額。", sample: "表單已填入示例物件價格，其他費用預設為 0；請依實際資料修改。", inputTitle: "輸入金額", resultTitle: "費用明細", total: "估算合計（非報價）", additional: "物件價格以外費用", note: "未輸入的費用以 0 計，結果可能低於實際金額。稅金、登記、融資、保險與仲介費依案件而異，請以相關機構及專業人士確認的金額為準。本工具不是報價、稅務或法律意見，亦不代表貸款獲批。", invalid: "請輸入 0 或以上的有效日圓金額。", action: "詢問房產買賣", related: "房產買賣", fields: {
          propertyPrice: { label: "物件價格", hint: "日圓；示例為 ¥30,000,000" }, brokerage: { label: "仲介費" }, registration: { label: "登記及相關專業費用" }, taxes: { label: "已確認稅金" }, financing: { label: "融資相關費用" }, insurance: { label: "保險" }, other: { label: "其他已知費用" },
        },
      },
    },
  },
  ja: {
    indexTitle: "費用の概算ツール", indexIntro: "分かっている金額を入力し、賃貸や購入時に必要な費用を整理できます。", indexNote: "結果は入力値の合計です。物件の見積書ではなく、未入力の費用は自動加算されません。", open: "計算する", back: "ツール一覧", labels: { "rental-initial-cost": "賃貸初期費用", "purchase-cost": "購入費用" },
    tools: {
      "rental-initial-cost": {
        title: "賃貸初期費用の概算", intro: "月額賃料、前払い賃料、分かっている費用から、契約時に用意する金額を整理します。", sample: "賃料は入力例です。その他の費用は 0 から始まるため、物件ごとの金額に変更してください。", inputTitle: "金額を入力", resultTitle: "内訳", total: "概算合計（見積りではありません）", additional: "前払い賃料以外", note: "未入力の費用は 0 として計算され、実際より低くなる場合があります。敷金、礼金、仲介手数料、保証料、保険料、賃料は物件と契約内容で確認してください。本ツールは見積書ではありません。", invalid: "0 以上の有効な数値を入力してください。月数は 24 以下です。", action: "賃貸について相談", related: "賃貸サービス", fields: {
          monthlyRent: { label: "月額賃料", hint: "円。入力例は ¥100,000" }, upfrontMonths: { label: "前払い賃料（月）", hint: "契約に応じて入力。0.5 も可" }, depositMonths: { label: "敷金（月）", hint: "物件資料に記載された月数を入力" }, keyMoneyMonths: { label: "礼金（月）", hint: "物件資料に記載された月数を入力" }, brokerage: { label: "仲介手数料（円）" }, guarantor: { label: "家賃保証会社の費用（円）", hint: "利用が必要な場合、確認済みの金額を入力" }, insurance: { label: "保険料（円）" }, other: { label: "その他の費用（円）" }, upfrontRent: { label: "前払い賃料" }, deposit: { label: "敷金" }, keyMoney: { label: "礼金" },
        },
      },
      "purchase-cost": {
        title: "購入費用の概算", intro: "物件価格と分かっている諸費用を分けて、合計を確認します。", sample: "物件価格は入力例です。その他の費用は 0 から始まるため、実際の資料に合わせて変更してください。", inputTitle: "金額を入力", resultTitle: "内訳", total: "概算合計（見積りではありません）", additional: "物件価格以外", note: "未入力の費用は 0 として計算され、実際より低くなる場合があります。税金、登記、融資、保険、仲介費用は案件ごとに確認してください。本ツールは見積書、税務・法律上の助言ではなく、融資承認を示しません。", invalid: "0 以上の有効な円金額を入力してください。", action: "売買について相談", related: "不動産売買", fields: {
          propertyPrice: { label: "物件価格", hint: "円。入力例は ¥30,000,000" }, brokerage: { label: "仲介手数料" }, registration: { label: "登記・専門家費用" }, taxes: { label: "確認済みの税金" }, financing: { label: "融資関連費用" }, insurance: { label: "保険料" }, other: { label: "その他の費用" },
        },
      },
    },
  },
  en: {
    indexTitle: "Cost estimators", indexIntro: "Enter the amounts you know to organise potential rental or purchase costs.", indexNote: "Results add only the values you enter. They are not a property quotation, and missing costs are not automatically estimated.", open: "Estimate costs", back: "All estimators", labels: { "rental-initial-cost": "Rental initial costs", "purchase-cost": "Purchase costs" },
    tools: {
      "rental-initial-cost": {
        title: "Rental initial cost estimate", intro: "Use monthly rent, upfront rent, and known fees to estimate the amount to prepare before signing.", sample: "The rent shown is an editable example. Other costs start at zero; replace them with the amounts for your property.", inputTitle: "Enter amounts", resultTitle: "Cost breakdown", total: "Estimated total (not a quote)", additional: "Costs besides upfront rent", note: "Unentered costs count as zero, so the result may be lower than the actual amount. Confirm rent, deposit, key money, agency, guarantor, and insurance costs for the property and contract. This is not a quotation.", invalid: "Enter valid amounts of zero or more. Month counts cannot exceed 24.", action: "Enquire about renting", related: "Rental service", fields: {
          monthlyRent: { label: "Monthly rent", hint: "JPY; ¥100,000 is an example" }, upfrontMonths: { label: "Rent due upfront (months)", hint: "Use the contract terms; 0.5 is allowed" }, depositMonths: { label: "Deposit (months)", hint: "Use the number of months shown for the property" }, keyMoneyMonths: { label: "Key money (months)", hint: "A possible upfront payment; use the property's listed amount" }, brokerage: { label: "Agency fee (JPY)" }, guarantor: { label: "Rent guarantor company fee (JPY)", hint: "If required, enter the fee confirmed for this property" }, insurance: { label: "Insurance (JPY)" }, other: { label: "Other known costs (JPY)" }, upfrontRent: { label: "Upfront rent" }, deposit: { label: "Deposit" }, keyMoney: { label: "Key money" },
        },
      },
      "purchase-cost": {
        title: "Purchase cost estimate", intro: "Separate the property price from known transaction costs to estimate a combined amount.", sample: "The property price shown is an editable example. Other costs start at zero; replace them with your actual figures.", inputTitle: "Enter amounts", resultTitle: "Cost breakdown", total: "Estimated total (not a quote)", additional: "Costs besides property price", note: "Unentered costs count as zero, so the result may be lower than the actual amount. Confirm tax, registration, financing, insurance, and agency fees for your case. This is not a quotation, tax or legal advice, or financing approval.", invalid: "Enter valid non-negative JPY amounts.", action: "Enquire about buying or selling", related: "Buy & Sell service", fields: {
          propertyPrice: { label: "Property price", hint: "JPY; ¥30,000,000 is an example" }, brokerage: { label: "Agency fee" }, registration: { label: "Registration and professional fees" }, taxes: { label: "Confirmed taxes" }, financing: { label: "Financing costs" }, insurance: { label: "Insurance" }, other: { label: "Other known costs" },
        },
      },
    },
  },
};
