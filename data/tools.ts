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
  /** Rental estimator only: unit labels and the accessible name of each tick box. */
  unitYen?: string;
  unitMonths?: string;
  includeLabel?: string;
};

export const toolsCopy: Record<Locale, {
  indexTitle: string; indexIntro: string; indexNote: string; open: string; back: string; labels: Record<ToolKey, string>; tools: Record<ToolKey, ToolText>;
}> = {
  "zh-TW": {
    indexTitle: "費用估算工具", indexIntro: "輸入目前知道的金額，先整理租屋或買房可能需要準備的費用。", indexNote: "以下結果只依輸入項目加總，不是物件報價。未填的費用不會自動估入。", open: "開始估算", back: "所有估算工具", labels: { "rental-initial-cost": "租屋初期費用", "purchase-cost": "買房費用" },
    tools: {
      "rental-initial-cost": {
        title: "租屋初期費用估算", intro: "勾選適用的項目並輸入金額，估算簽約前大約需要準備多少。", sample: "表單已填入示例金額；請改成個別物件提供的數字，不適用的項目取消勾選即可。", inputTitle: "費用項目", resultTitle: "費用明細", total: "估算合計（非報價）", additional: "租金以外費用", note: "本工具只按勾選及輸入的項目加總，不是報價。入住當月的日割租金等費用未包括在內，如有需要可在「其他」加入。實際金額以物件的費用明細為準。", invalid: "請輸入 0 或以上的有效數字；月數不可超過 24。", action: "詢問租屋服務", related: "租屋服務", unitYen: "日圓", unitMonths: "個月", includeLabel: "計入", fields: {
          rent: { label: "每月租金", hint: "計入首月租金" }, commonFee: { label: "每月共益費", hint: "大廈管理費；計入首月" }, support24h: { label: "24 小時緊急服務", hint: "多為每月 800–1,500 日圓；計入首月" }, keyMoney: { label: "禮金", hint: "付給房東的簽約款項，不會退還" }, deposit: { label: "敷金（按金）", hint: "押金；退租時一般扣除原狀回復費用後退還" }, brokerage: { label: "仲介費", hint: "預設 1.1 個月（1 個月租金＋10% 消費稅）" }, guarantor: { label: "保證公司費用", hint: "多為 0.5–1.5 個月，視乎保證公司而定；以租金＋共益費計算" }, insurance: { label: "火災保險", hint: "2 年保費；視乎房型，多為 2–3 萬日圓" }, keyExchange: { label: "換鑰匙費", hint: "視乎房型及鑰匙類型而有差異" }, aircon: { label: "空調清潔", hint: "部分物件入住時收取" }, other: { label: "其他", hint: "例如日割租金、消毒費等" },
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
        title: "賃貸初期費用の概算", intro: "該当する項目にチェックを入れて金額を入力し、契約時に必要な金額の目安を確認できます。", sample: "入力例が入っています。物件ごとの金額に変更し、該当しない項目はチェックを外してください。", inputTitle: "費用項目", resultTitle: "内訳", total: "概算合計（見積りではありません）", additional: "賃料以外", note: "チェックした項目の合計で、見積書ではありません。入居月の日割り家賃などは含まれないため、必要に応じて「その他」に入力してください。実際の金額は物件の費用明細でご確認ください。", invalid: "0 以上の有効な数値を入力してください。月数は 24 以下です。", action: "賃貸について相談", related: "賃貸サービス", unitYen: "円", unitMonths: "か月", includeLabel: "含める", fields: {
          rent: { label: "月額賃料", hint: "初月分を計上" }, commonFee: { label: "共益費（月額）", hint: "初月分を計上" }, support24h: { label: "24時間サポート（月額）", hint: "月額800〜1,500円程度が多い。初月分を計上" }, keyMoney: { label: "礼金", hint: "貸主へ支払う一時金（返還なし）" }, deposit: { label: "敷金", hint: "退去時に原状回復費用を差し引いて返還されるのが一般的" }, brokerage: { label: "仲介手数料", hint: "初期値は1.1か月（賃料1か月分＋消費税10%）" }, guarantor: { label: "保証会社の保証料", hint: "0.5〜1.5か月が多く、保証会社により異なる。賃料＋共益費で計算" }, insurance: { label: "火災保険", hint: "2年分。間取りにより2〜3万円程度が多い" }, keyExchange: { label: "鍵交換費用", hint: "間取りや鍵の種類により異なる" }, aircon: { label: "エアコンクリーニング", hint: "入居時に請求される物件もある" }, other: { label: "その他", hint: "日割り家賃、消毒費など" },
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
        title: "Rental initial cost estimate", intro: "Tick the items that apply and enter amounts to estimate what to prepare before signing.", sample: "Example amounts are filled in. Replace them with the figures for your property and untick anything that does not apply.", inputTitle: "Cost items", resultTitle: "Cost breakdown", total: "Estimated total (not a quote)", additional: "Costs besides rent", note: "The total adds only the items you tick and is not a quotation. Pro-rated rent for the move-in month and similar charges are not included; add them under 'Other' if needed. Confirm actual amounts with the property's cost breakdown.", invalid: "Enter valid numbers of zero or more. Month counts cannot exceed 24.", action: "Enquire about renting", related: "Rental service", unitYen: "JPY", unitMonths: "months", includeLabel: "Include", fields: {
          rent: { label: "Monthly rent", hint: "First month counted" }, commonFee: { label: "Common-area fee (monthly)", hint: "First month counted" }, support24h: { label: "24-hour support (monthly)", hint: "Usually ¥800–1,500 a month; first month counted" }, keyMoney: { label: "Key money (reikin)", hint: "A non-refundable payment to the landlord" }, deposit: { label: "Deposit (shikikin)", hint: "Usually returned after restoration costs are deducted when you move out" }, brokerage: { label: "Brokerage fee", hint: "Default 1.1 months (one month's rent plus 10% consumption tax)" }, guarantor: { label: "Guarantee company fee", hint: "Usually 0.5–1.5 months depending on the company; based on rent + common-area fee" }, insurance: { label: "Fire insurance", hint: "Two-year premium; usually ¥20,000–30,000 depending on the unit" }, keyExchange: { label: "Key replacement", hint: "Varies with the unit and lock type" }, aircon: { label: "Air-conditioner cleaning", hint: "Charged at move-in for some properties" }, other: { label: "Other", hint: "e.g. pro-rated rent, disinfection" },
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
