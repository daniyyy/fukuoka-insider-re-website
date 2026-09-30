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
  /** Rental estimator only. */
  unitYen?: string;
  unitMonths?: string;
  includeLabel?: string;
  baseTitle?: string;
  reference?: string;
  readMore?: string;
  baseNote?: string;
  groupStandard?: string;
  groupStandardNote?: string;
  groupOptional?: string;
  groupOptionalNote?: string;
  explainerLead?: string;
  itemGuide?: string;
  newTab?: string;
  monthly?: string;
};

export const toolsCopy: Record<Locale, {
  indexTitle: string; indexIntro: string; indexNote: string; open: string; back: string; labels: Record<ToolKey, string>; tools: Record<ToolKey, ToolText>;
  /** Homepage block previewing both estimators (Danny, 2026-09-30): renting shows a live figure from the
      estimator's example settings ({fee}, {other} filled in); buying lists the cost items only, because purchase
      costs vary too much by property and brokerage amounts are not published. "|" separates heading phrases. */
  teaser: {
    title: string; body: string; switchLabel: string;
    rentTag: string; rentTitle: string; rentLabel: string; resultLabel: string; assumption: string; cta: string;
    buyTag: string; buyTitle: string; buyItems: string[]; buyNote: string; buyCta: string;
  };
}> = {
  "zh-TW": {
    teaser: { title: "租屋或買房，|先了解要準備多少。", body: "除了月租或物件價格，簽約時還有各種費用。租屋可以輸入月租，即時看到大約金額；買房費用視乎物件及融資條件，可用估算工具逐項整理。", switchLabel: "選擇估算類別", rentTag: "租屋", rentTitle: "簽約時的初期費用", rentLabel: "每月租金", resultLabel: "初期費用大約", assumption: "以共益費 {fee}、其他每月費用 {other} 及一般項目（預付 2 個月、禮金和敷金各 1 個月等）計算，只供參考。", cta: "逐項估算", buyTag: "買房", buyTitle: "物件價格以外的費用", buyItems: ["仲介費", "登記及專業費用", "稅金", "融資相關費用", "保險"], buyNote: "金額視乎物件及融資條件而定。可把已知的金額逐項輸入，整理出總預算。", buyCta: "估算買房費用" },
    indexTitle: "費用估算工具", indexIntro: "輸入目前知道的金額，先整理租屋或買房可能需要準備的費用。", indexNote: "以下結果只依輸入項目加總，不是物件報價。未填的費用不會自動估入。", open: "開始估算", back: "所有估算工具", labels: { "rental-initial-cost": "租屋初期費用", "purchase-cost": "買房費用" },
    tools: {
      "rental-initial-cost": {
        title: "租屋初期費用估算", intro: "先填每月費用，再勾選適用的項目，估算簽約時大約要準備多少。", sample: "已填入示例金額，請改成物件資料上的數字；不適用的項目取消勾選即可。", baseTitle: "每月費用", inputTitle: "初期費用項目", resultTitle: "費用明細", total: "估算合計", reference: "只供參考，並非報價", additional: "預付房租以外費用", note: "合計只包括已勾選的項目。實際需付的金額與付款期限，以物件提供的費用明細為準。", invalid: "請輸入 0 或以上的有效數字；月數不可超過 24。", action: "詢問租屋服務", related: "租屋服務", unitYen: "日圓", unitMonths: "個月", includeLabel: "計入", baseNote: "必填。填入物件資料上的金額，下面按月計算的項目會自動跟著變。", groupStandard: "簽約時一般需要的費用", groupStandardNote: "大部分物件都會收；物件沒有的項目，取消勾選即可。", groupOptional: "視物件而定的費用", groupOptionalNote: "不是每個物件都有；物件資料有列出才勾選。", explainerLead: "不清楚這些費用是什麼？", itemGuide: "相關文章", newTab: "（在新分頁開啟）", monthly: "每月合計", readMore: "延伸閱讀", fields: {
          rent: { label: "每月租金", hint: "物件資料上的月租（不含共益費）" },
          commonFee: { label: "每月共益費", hint: "即大廈管理費；沒有的話填 0" },
          otherMonthly: { label: "其他每月費用", hint: "例如 24 小時緊急服務（多為每月 800–1,500 日圓）；沒有的話填 0" },
          prepaidRent: { label: "預付房租", hint: "簽約時預付的租金，一般是入住當月（按日計）加下個月，約 2 個月" },
          prepaidFee: { label: "預付共益費", hint: "與預付房租相同月數" },
          prepaidOther: { label: "預付其他每月費用", hint: "與預付房租相同月數；例如 24 小時緊急服務（水電、門鎖等突發情況的支援）" },
          keyMoney: { label: "禮金", hint: "給房東的一次性謝禮，不會退還" },
          deposit: { label: "敷金（按金）", hint: "押金；退租時扣除原狀回復等費用後，餘額退還" },
          brokerage: { label: "仲介費", hint: "付給仲介公司；一般為 1 個月租金＋10% 消費稅，即 1.1 個月" },
          guarantor: { label: "保證公司費用", hint: "代替保證人的租賃保證服務；首次多為每月合計（租金＋共益費＋其他每月費用）的 0.5–1.5 個月，視乎保證公司而定" },
          insurance: { label: "火災保險", hint: "一般為 2 年保期；視乎房型，多為 2–3 萬日圓" },
          keyExchange: { label: "換鑰匙費", hint: "為新租客更換門鎖；金額視乎房型及鑰匙種類" },
          cleaning: { label: "預繳退房清潔費", hint: "部分物件會在簽約時預收退房時的清潔費" },
          aircon: { label: "空調清潔", hint: "部分物件會在入住時收取" },
          disinfection: { label: "室內消毒・除蟲費", hint: "入住前的消毒及防蟲施工；多為 1.5–2 萬日圓" },
          other: { label: "其他", hint: "例如淨水器、町內會費等其他已知費用" },
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
    teaser: { title: "賃貸でも購入でも、|まず費用の目安を。", body: "家賃や物件価格のほかに、契約時にはさまざまな費用がかかります。賃貸は月額賃料を入力するとすぐに目安が表示されます。購入費用は物件や融資条件によって異なるため、概算ツールで項目ごとに整理できます。", switchLabel: "概算の種類を選ぶ", rentTag: "賃貸", rentTitle: "契約時の初期費用", rentLabel: "月額賃料", resultLabel: "初期費用の目安", assumption: "共益費 {fee}、その他の月額費用 {other}、一般的な項目（前家賃2か月、礼金・敷金各1か月など）で計算した参考値です。", cta: "項目ごとに試算する", buyTag: "購入", buyTitle: "物件価格以外の費用", buyItems: ["仲介手数料", "登記・専門家費用", "税金", "融資関連費用", "保険料"], buyNote: "金額は物件や融資条件によって異なります。分かっている金額を項目ごとに入力し、総予算を整理できます。", buyCta: "購入費用を概算する" },
    indexTitle: "費用の概算ツール", indexIntro: "分かっている金額を入力し、賃貸や購入時に必要な費用を整理できます。", indexNote: "結果は入力値の合計です。物件の見積書ではなく、未入力の費用は自動加算されません。", open: "計算する", back: "ツール一覧", labels: { "rental-initial-cost": "賃貸初期費用", "purchase-cost": "購入費用" },
    tools: {
      "rental-initial-cost": {
        title: "賃貸初期費用の概算", intro: "毎月の費用を入力し、該当する項目にチェックを入れて、契約時に必要な金額の目安を確認できます。", sample: "入力例が入っています。物件資料の金額に変更し、該当しない項目はチェックを外してください。", baseTitle: "毎月の費用", inputTitle: "初期費用の項目", resultTitle: "内訳", total: "概算合計", reference: "参考値です（見積りではありません）", additional: "前家賃以外", note: "チェックした項目のみを合計しています。実際の金額と支払期日は、物件の初期費用明細でご確認ください。", invalid: "0 以上の有効な数値を入力してください。月数は 24 以下です。", action: "賃貸について相談", related: "賃貸サービス", unitYen: "円", unitMonths: "か月", includeLabel: "含める", baseNote: "必須項目です。物件資料の金額を入力すると、月数で計算する項目に自動で反映されます。", groupStandard: "契約時に一般的にかかる費用", groupStandardNote: "ほとんどの物件でかかります。該当しない項目はチェックを外してください。", groupOptional: "物件によってかかる費用", groupOptionalNote: "すべての物件にあるわけではありません。物件資料に記載がある場合のみチェックしてください。", explainerLead: "それぞれの費用について詳しく知りたい方へ", itemGuide: "関連記事", newTab: "（新しいタブで開きます）", monthly: "月額合計", readMore: "関連記事", fields: {
          rent: { label: "月額賃料", hint: "物件資料に記載の賃料（共益費を除く）" },
          commonFee: { label: "共益費（月額）", hint: "管理費とも呼ばれる共用部分の費用。ない場合は0" },
          otherMonthly: { label: "その他の月額費用", hint: "24時間サポート（月額800〜1,500円程度が多い）など。ない場合は0" },
          prepaidRent: { label: "前家賃", hint: "契約時に前払いする賃料。入居月の日割り分と翌月分で約2か月が一般的" },
          prepaidFee: { label: "前払い共益費", hint: "前家賃と同じ月数を入力" },
          prepaidOther: { label: "その他月額費用の前払い", hint: "前家賃と同じ月数を入力。24時間サポート（水回りや鍵などのトラブル対応）など" },
          keyMoney: { label: "礼金", hint: "貸主へのお礼として支払う一時金。返還されません" },
          deposit: { label: "敷金", hint: "預け金。退去時に原状回復費用などを差し引いて返還されます" },
          brokerage: { label: "仲介手数料", hint: "仲介会社へ支払う手数料。賃料1か月分＋消費税10%（1.1か月）が一般的" },
          guarantor: { label: "保証会社の保証料", hint: "連帯保証人の代わりとなる家賃保証。初回は月額合計（賃料＋共益費＋その他の月額費用）の0.5〜1.5か月分が多く、保証会社により異なります" },
          insurance: { label: "火災保険", hint: "通常2年契約。間取りにより2〜3万円程度が多い" },
          keyExchange: { label: "鍵交換費用", hint: "入居者の入れ替わりに合わせて鍵を交換する費用。間取りや鍵の種類により異なります" },
          cleaning: { label: "退去時クリーニング費（前払い）", hint: "契約時に退去時のクリーニング費用を前払いする物件もあります" },
          aircon: { label: "エアコンクリーニング", hint: "入居時に請求される物件もあります" },
          disinfection: { label: "室内消毒・害虫駆除費", hint: "入居前の消毒・防虫施工。1.5〜2万円程度が多い" },
          other: { label: "その他", hint: "浄水器、町内会費など、分かっているその他の費用" },
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
    teaser: { title: "Renting or buying,| know what to prepare.", body: "Beyond the rent or the purchase price, several costs are due at signing. For renting, enter a monthly rent for an instant estimate. Purchase costs depend on the property and financing, so the estimator lets you list them item by item.", switchLabel: "Choose an estimate", rentTag: "Renting", rentTitle: "Initial costs at signing", rentLabel: "Monthly rent", resultLabel: "Estimated initial cost", assumption: "Based on a {fee} common-area fee, {other} in other monthly charges and the usual items (2 months paid in advance, 1 month each of key money and deposit, and so on). For reference only.", cta: "Estimate item by item", buyTag: "Buying", buyTitle: "Costs besides the purchase price", buyItems: ["Agency fee", "Registration and professional fees", "Taxes", "Financing costs", "Insurance"], buyNote: "Amounts depend on the property and financing. Enter the figures you know, item by item, to build your total budget.", buyCta: "Estimate purchase costs" },
    indexTitle: "Cost estimators", indexIntro: "Enter the amounts you know to organise potential rental or purchase costs.", indexNote: "Results add only the values you enter. They are not a property quotation, and missing costs are not automatically estimated.", open: "Estimate costs", back: "All estimators", labels: { "rental-initial-cost": "Rental initial costs", "purchase-cost": "Purchase costs" },
    tools: {
      "rental-initial-cost": {
        title: "Rental initial cost estimate", intro: "Enter the monthly costs, then tick the items that apply to estimate what to prepare at signing.", sample: "Example amounts are filled in. Replace them with the property's figures and untick anything that does not apply.", baseTitle: "Monthly costs", inputTitle: "Initial cost items", resultTitle: "Cost breakdown", total: "Estimated total", reference: "For reference only, not a quote", additional: "Costs besides rent paid in advance", note: "Only ticked items are added. Confirm the actual amounts and payment deadline with the property's cost breakdown.", invalid: "Enter valid numbers of zero or more. Month counts cannot exceed 24.", action: "Enquire about renting", related: "Rental service", unitYen: "JPY", unitMonths: "months", includeLabel: "Include", baseNote: "Required. Enter the figures from the property details; items charged in months update automatically.", groupStandard: "Costs charged on most contracts", groupStandardNote: "Most properties charge these. Untick anything the property does not charge.", groupOptional: "Costs that depend on the property", groupOptionalNote: "Not every property charges these. Tick them only if the property details list them.", explainerLead: "Not sure what these costs are?", itemGuide: "Related guide", newTab: "(opens in a new tab)", monthly: "Monthly total", readMore: "Further reading", fields: {
          rent: { label: "Monthly rent", hint: "The rent shown for the property, excluding the common-area fee" },
          commonFee: { label: "Common-area fee (monthly)", hint: "Also called the management fee; enter 0 if there is none" },
          otherMonthly: { label: "Other monthly charges", hint: "Such as 24-hour support (usually ¥800–1,500 a month); enter 0 if there are none" },
          prepaidRent: { label: "Rent paid in advance", hint: "Paid at signing, usually the pro-rated move-in month plus the next month (about 2 months)" },
          prepaidFee: { label: "Common-area fee paid in advance", hint: "Use the same number of months as the rent paid in advance" },
          prepaidOther: { label: "Other monthly charges paid in advance", hint: "Use the same number of months as the rent paid in advance; for example 24-hour support (help with water, lock and similar emergencies)" },
          keyMoney: { label: "Key money (reikin)", hint: "A one-off thank-you payment to the landlord; not refunded" },
          deposit: { label: "Deposit (shikikin)", hint: "Held as security and refunded when you move out, after restoration and other costs are deducted" },
          brokerage: { label: "Brokerage fee", hint: "Paid to the agent; usually one month's rent plus 10% consumption tax (1.1 months)" },
          guarantor: { label: "Guarantee company fee", hint: "A rent guarantee service used instead of a personal guarantor; the first payment is usually 0.5–1.5 months of the monthly total (rent, common-area fee and other monthly charges), depending on the company" },
          insurance: { label: "Fire insurance", hint: "Usually a two-year policy; typically ¥20,000–30,000 depending on the unit" },
          keyExchange: { label: "Key replacement", hint: "The locks are changed for each new tenant; the cost depends on the unit and lock type" },
          cleaning: { label: "Move-out cleaning (paid in advance)", hint: "Some properties collect the move-out cleaning fee at signing" },
          aircon: { label: "Air-conditioner cleaning", hint: "Charged at move-in for some properties" },
          disinfection: { label: "Disinfection and pest control", hint: "Treatment before move-in to prevent insects; usually ¥15,000–20,000" },
          other: { label: "Other", hint: "Any other known costs, such as a water filter or neighbourhood association fee" },
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
