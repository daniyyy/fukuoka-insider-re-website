import type { FaqCategory, FaqItem, FaqServiceKey, FaqToolKey } from "@/lib/content/types";

/**
 * FAQ (Help page, service pages, homepage).
 *
 * One entry = one question in Traditional Chinese and English, so the structure stays identical.
 * FAQ is published in zh-TW and en only (Danny, 2026-09-30: no Japanese FAQ; see siteConfig.faqLocales).
 * - Answers: lines starting with "- " render as a bullet list; other lines are paragraphs.
 * - Company facts are written as tokens and filled from config/site.ts by the content adapter:
 *   {languages} {licence} {associationName} {hours} {closed} {address} {access}
 * - `guide` is a zh-TW Guide slug; the link appears only while that Guide is published.
 * - `showOn` lists the service pages that show this question (in array order, max 4 per page).
 * - Do not state figures, results or company capabilities that Danny has not confirmed.
 */
type L<T = string> = { "zh-TW": T; en: T };

type FaqEntry = {
  key: string;
  category: FaqCategory;
  /** Shown on the homepage (first four). */
  featured?: boolean;
  service?: FaqServiceKey;
  showOn?: FaqServiceKey[];
  guide?: string;
  tool?: FaqToolKey;
  q: L;
  a: L;
  tags: L<string[]>;
};

const entries: FaqEntry[] = [
  // ── From overseas ──────────────────────────────────────────────
  {
    key: "start-from-overseas", category: "overseas-clients", featured: true, service: "rent",
    q: {
      "zh-TW": "人還在香港或台灣，可以先開始查詢嗎？",
      en: "Can I start while I'm still overseas?",
    },
    a: {
      "zh-TW": "可以。透過 LINE、WhatsApp、Email 或諮詢表，告訴我們希望的地區、預算、時間和目前所在地即可。我們會先說明哪些步驟可以在海外進行，哪些要到福岡後才能處理。",
      en: "Yes. Send us your preferred area, budget, timing and where you are now by LINE, WhatsApp, email or the enquiry form. We will explain which steps can be done from overseas and which have to wait until you are in Fukuoka.",
    },
    tags: { "zh-TW": ["海外", "香港", "台灣", "查詢"], en: ["overseas", "Hong Kong", "Taiwan", "enquiry"] },
  },
  {
    key: "remote-viewing", category: "overseas-clients", service: "rent", showOn: ["rent"],
    q: {
      "zh-TW": "不能親身來看房，可以怎樣確認物件？",
      en: "I can't view the property in person. How can I check it?",
    },
    a: {
      "zh-TW": "可以安排線上視訊看房，由我們在現場帶您看物件。不過要看物件是否已空出，以及管理公司是否同意，我們會逐一確認。未能安排時，可以先透過物件資料、平面圖及照片比較。\n決定前，也建議盡量了解周邊環境、日照和交通。",
      en: "We can arrange a video viewing, with our staff showing you the property live on a video call. It depends on the unit being vacant and the management company agreeing, so we check each property. Where a video viewing isn't possible, you can compare the listing details, floor plan and photos.\nBefore deciding, it also helps to learn as much as you can about the surroundings, sunlight and transport.",
    },
    tags: { "zh-TW": ["看房", "視像", "視訊", "照片", "海外"], en: ["viewing", "video viewing", "video call"] },
  },
  {
    key: "remote-contract", category: "overseas-clients", service: "rent", showOn: ["buy-sell"],
    q: {
      "zh-TW": "簽約一定要本人在日本嗎？",
      en: "Do I have to be in Japan to sign the contract?",
    },
    a: {
      "zh-TW": "不一定。日本法律容許以線上視訊進行「重要事項說明」，經您同意後，契約文件亦可以電子方式交付。不過，是否可以這樣做，取決於出租方或賣方、管理公司及個別交易的安排；買房的登記手續，亦可能需要在海外另外準備證明文件。\n我們會在申請前，說明該物件的具體做法。",
      en: "Not necessarily. Japanese law allows the Explanation of Important Matters to be given online by video and, with your consent, contract documents to be delivered electronically. Whether this can be used depends on the landlord or seller, the management company and the transaction. For a purchase, registration may also need certificates prepared overseas.\nWe explain how it works for the specific property before you apply.",
    },
    tags: { "zh-TW": ["簽約", "重要事項說明", "電子契約", "海外"], en: ["contract", "online", "signing"] },
  },
  {
    key: "overseas-payment", category: "overseas-clients", showOn: ["buy-sell"],
    q: {
      "zh-TW": "從海外匯款付費用，要注意什麼？",
      en: "What should I watch for when paying from overseas?",
    },
    a: {
      "zh-TW": "- 按契約或請款單指定的帳戶、金額及期限付款\n- 預留國際匯款手續費及匯率差額，避免到帳金額不足\n- 買房等大額匯款，銀行可能要求說明資金用途或來源\n付款前如對收款帳戶有任何疑問，請先與我們確認。",
      en: "- Pay to the account, in the amount and by the date shown on the contract or invoice\n- Allow for international transfer fees and exchange-rate differences so the amount received is not short\n- For large transfers such as a purchase price, banks may ask about the purpose or source of funds\nIf anything about the receiving account is unclear, check with us before you send the money.",
    },
    tags: { "zh-TW": ["匯款", "付款", "海外", "匯率"], en: ["payment", "transfer", "exchange rate"] },
  },

  // ── Renting ────────────────────────────────────────────────────
  {
    key: "rental-documents", category: "renting", featured: true, service: "rent", showOn: ["rent"], guide: "guarantor-company-screening-call",
    q: {
      "zh-TW": "外國人在福岡租屋，一般需要什麼資料？",
      en: "What documents do foreign nationals usually need to rent in Fukuoka?",
    },
    a: {
      "zh-TW": "常見的資料包括：\n- 護照；已在日本居住的話，還有在留卡\n- 工作或收入證明（例如在職證明、薪資單）；學生則為入學或在學證明\n- 入住人資料及緊急聯絡人\n實際需要的文件由物件、管理公司及保證公司決定，我們會按物件逐項說明。",
      en: "Commonly requested documents include:\n- Your passport, plus your residence card if you already live in Japan\n- Proof of employment or income (such as an employment certificate or payslips); students provide proof of admission or enrolment\n- Details of everyone moving in, and an emergency contact\nThe exact list is set by the property, the management company and the guarantor company, and we go through it for each property.",
    },
    tags: { "zh-TW": ["文件", "租屋", "在留卡", "申請"], en: ["documents", "renting", "residence card", "application"] },
  },
  {
    key: "no-residence-card", category: "renting", service: "rent",
    q: {
      "zh-TW": "還沒有在留卡，可以申請租屋嗎？",
      en: "Can I apply before I have a residence card?",
    },
    a: {
      "zh-TW": "有些物件可以用護照、簽證或在留資格認定證明書，加上在職或入學證明先行申請；但也有不少物件要求提供在留卡。能否申請、可以用什麼文件代替，需要逐一向管理公司確認。",
      en: "Some properties accept a passport, visa or Certificate of Eligibility together with proof of employment or enrolment, but many require a residence card. Whether you can apply, and which documents can be used instead, has to be checked with each management company.",
    },
    tags: { "zh-TW": ["在留卡", "簽證", "申請", "租屋"], en: ["residence card", "visa", "application"] },
  },
  {
    key: "guarantor", category: "renting", service: "rent", showOn: ["rent"], guide: "guarantor-company-and-joint-guarantor",
    q: {
      "zh-TW": "沒有日本的保證人，可以租屋嗎？",
      en: "Can I rent without a guarantor in Japan?",
    },
    a: {
      "zh-TW": "可以。現在大部分物件要求使用「租賃保證公司」，而不是個人保證人。保證公司會另外審查，並收取保證費：首次多為月租（通常連管理費計）的五成至一個月左右，之後一般每年另付續約費，亦有按月收費的方案。\n部分物件亦要求提供緊急聯絡人，有時需要是住在日本的人。",
      en: "Yes. Most properties now require a rent guarantee company rather than a personal guarantor. The guarantee company runs its own screening and charges a fee, typically 50–100% of one month's rent (usually including the management fee) at the start, followed by a yearly renewal fee, though some companies charge monthly instead.\nSome properties also ask for an emergency contact, sometimes someone living in Japan.",
    },
    tags: { "zh-TW": ["保證人", "保證公司", "緊急聯絡人", "租屋"], en: ["guarantor", "guarantee company", "emergency contact"] },
  },
  {
    key: "rental-initial-costs", category: "renting", service: "rent", showOn: ["rent"], guide: "rental-initial-costs-reikin-shikikin", tool: "rental-initial-cost",
    q: {
      "zh-TW": "租屋的初期費用大約要多少？",
      en: "How much are the move-in costs for a rental?",
    },
    a: {
      "zh-TW": "一般約為月租的 4 至 6 個月，包括敷金、禮金、仲介手續費、首月租金、保證公司費用、火災保險及換鎖費等，實際金額按物件而定。\n可以先用「租屋初期費用估算」，整理手上已知的數字。",
      en: "As a rough guide, four to six months' rent, covering the deposit (shikikin), key money (reikin), brokerage fee, first month's rent, guarantee company fee, fire insurance and key replacement. The actual amount depends on the property.\nYou can use the rental move-in cost estimator to organise the figures you already have.",
    },
    tags: { "zh-TW": ["初期費用", "敷金", "禮金", "費用"], en: ["move-in costs", "deposit", "key money"] },
  },
  {
    key: "rental-timeline", category: "renting", service: "rent",
    q: {
      "zh-TW": "從開始找房到入住，大概需要多久？",
      en: "How long does it take from searching to moving in?",
    },
    a: {
      "zh-TW": "取決於時期與物件。找到物件並提交申請後，審查一般需要數天至一星期左右；通過後簽約及付款，再按約定日期交鑰匙。\n1 月至 3 月是日本的搬遷旺季，合適的物件較快租出，建議提早開始。",
      en: "It depends on the season and the property. After you apply, screening usually takes from a few days to about a week; once approved, you sign and pay, and keys are handed over on the agreed date.\nJanuary to March is Japan's peak moving season, when good properties go quickly, so it helps to start early.",
    },
    tags: { "zh-TW": ["時間", "審查", "入住", "旺季"], en: ["timeline", "screening", "moving in"] },
  },
  {
    key: "office-shop", category: "renting", service: "rent",
    q: {
      "zh-TW": "可以租辦公室或店舖嗎？",
      en: "Can you help me rent an office or a shop?",
    },
    a: {
      "zh-TW": "可以。辦公室和店舖需要先確認用途限制（例如能否經營餐飲）、面積與內裝條件，以及退租時需要回復原狀的範圍。商業物件的保證金一般比住宅高，簽約前會逐項說明。",
      en: "Yes. For offices and shops we first check use restrictions (for example whether food service is allowed), floor area and fit-out conditions, and what must be restored when you leave. Deposits for commercial space are usually higher than for homes, and we go through each item before you sign.",
    },
    tags: { "zh-TW": ["辦公室", "店舖", "商業", "保證金"], en: ["office", "shop", "commercial"] },
  },
  {
    key: "pets", category: "renting", service: "rent", guide: "pet-friendly-rentals-hidden-costs",
    q: {
      "zh-TW": "可以帶寵物租屋嗎？",
      en: "Can I rent with a pet?",
    },
    a: {
      "zh-TW": "需要選擇標明「可養寵物」的物件，並確認可以飼養的種類、大小和數量。部分物件會加收敷金或清潔費用，退租時的修繕費用亦可能較高。",
      en: "You need a property marked as pet-friendly, and to confirm which kinds of animal, what size and how many are allowed. Some properties charge an extra deposit or cleaning fee, and repair costs when you move out can be higher.",
    },
    tags: { "zh-TW": ["寵物", "貓", "狗", "租屋"], en: ["pets", "dog", "cat"] },
  },
  {
    key: "screening-call", category: "renting", service: "rent", guide: "guarantor-company-screening-call",
    q: {
      "zh-TW": "保證公司打電話來審查，會問什麼？",
      en: "What will the guarantee company ask when it calls?",
    },
    a: {
      "zh-TW": "保證公司通常會致電申請人，確認姓名、出生日期、工作或收入、入住人數等申請內容，有時以日語進行。事先準備好與申請書一致的資料，會比較順利。",
      en: "The guarantee company usually phones the applicant to confirm details on the application, such as name, date of birth, employment or income, and the number of occupants. The call may be in Japanese. Having the same details as your application ready makes it go smoothly.",
    },
    tags: { "zh-TW": ["審查", "電話", "保證公司"], en: ["screening", "phone call", "guarantee company"] },
  },

  // ── Buying & selling ───────────────────────────────────────────
  {
    key: "foreigners-buying", category: "buying-selling", featured: true, service: "buy-sell", showOn: ["buy-sell"],
    q: {
      "zh-TW": "外國人可以在日本買房嗎？",
      en: "Can foreigners buy property in Japan?",
    },
    a: {
      "zh-TW": "可以。日本一般不限制外國人購買房地產，也可以用外國人名義登記。不過，貸款、稅務，以及部分地區或較大面積土地的申報要求，會因買家身分和物業用途而不同。非居住者購買後，除自住等例外情況外，須在取得後 20 日內經日本銀行向財務大臣提交外匯法報告；度假屋或第二居所不屬於自住。\n我們會在交易前說明需要處理的事項。",
      en: "Yes. Japan generally does not restrict foreigners from buying real estate, and the property can be registered in your own name. Loans, tax, and the notification rules that apply in certain areas or to larger land plots vary with the buyer's situation and intended use. A non-resident buyer must also report the purchase to the Minister of Finance, via the Bank of Japan, within 20 days under the Foreign Exchange Act, unless an exemption applies, such as a home you will live in yourself (holiday homes and second homes do not count).\nWe explain what applies to you before the transaction.",
    },
    tags: { "zh-TW": ["買房", "外國人", "登記", "外匯法"], en: ["buying", "foreigners", "registration"] },
  },
  {
    key: "overseas-mortgage", category: "buying-selling", service: "buy-sell", showOn: ["buy-sell"],
    q: {
      "zh-TW": "住在海外，可以在日本申請房貸嗎？",
      en: "Can I get a Japanese mortgage while living overseas?",
    },
    a: {
      "zh-TW": "選擇有限。日本的金融機構一般要求借款人在日本有住所及穩定收入；海外居住者可申請的貸款較少，自付比例、利率和年期的條件亦較嚴格。能否貸款由金融機構審查決定，計劃時建議先以自有資金為前提，再確認貸款是否可行。",
      en: "Options are limited. Japanese lenders usually require an address and steady income in Japan; fewer loans are open to overseas residents, and down-payment, interest and term conditions are stricter. Approval is the lender's decision, so it is safer to plan on your own funds first and then check whether a loan is possible.",
    },
    tags: { "zh-TW": ["房貸", "貸款", "海外", "買房"], en: ["mortgage", "loan", "overseas"] },
  },
  {
    key: "purchase-costs", category: "buying-selling", service: "buy-sell", showOn: ["buy-sell"], tool: "purchase-cost",
    q: {
      "zh-TW": "買房除了房價，還要準備哪些費用？",
      en: "Besides the price, what costs come with buying?",
    },
    a: {
      "zh-TW": "常見的費用包括：\n- 仲介手續費\n- 登記費用（登錄免許稅、司法書士報酬）\n- 契約書的印花稅\n- 不動產取得稅（福岡縣一般在登記後約半年至一年寄出繳稅通知書）\n- 固定資產稅、管理費等按日數分攤的清算金\n- 火災保險，以及貸款相關費用\n可以先用「買房費用估算」整理已知的金額。",
      en: "Typical costs include:\n- Brokerage fee\n- Registration costs (registration and licence tax, judicial scrivener's fee)\n- Stamp duty on the contract\n- Real estate acquisition tax (in Fukuoka Prefecture the tax notice usually arrives six months to a year after registration)\n- Pro-rated settlement of property tax and management fees\n- Fire insurance and any loan-related fees\nYou can use the purchase cost estimator to organise the amounts you already know.",
    },
    tags: { "zh-TW": ["買房", "費用", "登記", "稅"], en: ["buying", "costs", "tax", "registration"] },
  },
  {
    key: "ownership-costs", category: "buying-selling", service: "property-management", showOn: ["property-management"],
    q: {
      "zh-TW": "買房之後，每年有什麼費用？",
      en: "What are the yearly costs after buying?",
    },
    a: {
      "zh-TW": "主要是每年的固定資產稅及都市計畫稅；公寓另有每月的管理費與修繕積立金，以及火災保險續保。如果出租，亦需要就租金收入報稅。\n人在海外的業主，一般需要指定「納稅管理人」代收稅單及繳稅。我們可以擔任固定資產稅・都市計畫稅的納稅管理人。",
      en: "Mainly the annual fixed asset tax and city planning tax; apartments also have monthly management and repair-reserve fees, plus fire insurance renewal. If you rent the property out, the rental income must be declared for tax.\nOwners living overseas generally need to appoint a tax agent (nozei kanrinin) to receive tax notices and pay. We can act as tax agent for fixed asset tax and city planning tax.",
    },
    tags: { "zh-TW": ["固定資產稅", "管理費", "修繕積立金", "納稅管理人"], en: ["property tax", "management fee", "tax agent"] },
  },
  {
    key: "selling-first-contact", category: "buying-selling", service: "buy-sell", showOn: ["buy-sell"],
    q: {
      "zh-TW": "考慮賣房時，第一次聯絡要提供什麼？",
      en: "What should I share when I first ask about selling?",
    },
    a: {
      "zh-TW": "可以先提供物業地址、類型（公寓、獨棟住宅或土地）、目前使用狀況（自住、出租或空置）、希望出售的時間，以及手上已有的權利證書或管理資料。售價與出售時間無法預先保證，我們會先說明可行的方式。",
      en: "Share the address, the type of property (apartment, house or land), how it is used now (owner-occupied, rented or vacant), when you would like to sell, and any title or management documents you have. Sale price and timing cannot be guaranteed, and we will explain the options first.",
    },
    tags: { "zh-TW": ["賣房", "出售", "物業資料"], en: ["selling", "property documents"] },
  },
  {
    key: "selling-from-overseas", category: "buying-selling", service: "buy-sell",
    q: {
      "zh-TW": "人在海外，可以出售日本的物業嗎？",
      en: "Can I sell a Japanese property while living overseas?",
    },
    a: {
      "zh-TW": "可以，但需要的文件與日本居住者不同。例如沒有日本的印鑑證明，外籍人士一般在所在地的公證人處辦理簽名證明，登記手續由司法書士處理。\n另外，非居住者出售物業時，買方一般須從價款中預扣 10.21% 稅款（個人買家購入作自住或供親屬居住、且價格在 1 億日圓以下者除外），之後由賣方在日本報稅結算。具體安排按個案說明，稅務部分請向稅理士確認。",
      en: "Yes, but the documents differ from those for residents of Japan. Without a Japanese seal certificate, foreign sellers usually obtain a signature certificate from a notary where they live, and a judicial scrivener handles the registration.\nWhen a non-resident sells, the buyer generally has to withhold 10.21% of the price as tax (except where an individual buys it as a home for themselves or a relative for ¥100 million or less), which the seller later settles by filing a Japanese tax return. We explain the arrangements case by case; please confirm tax matters with a tax accountant.",
    },
    tags: { "zh-TW": ["賣房", "海外", "簽名證明", "源泉徵收"], en: ["selling", "overseas", "withholding tax"] },
  },

  // ── Property management ────────────────────────────────────────
  {
    key: "management-scope", category: "property-management", service: "property-management",
    q: {
      "zh-TW": "物業管理包括哪些內容？",
      en: "What does property management cover?",
    },
    a: {
      "zh-TW": "分為兩類：\n- 出租物業：尋找租客、申請審查與入住協調、收取租金、租客聯絡、維修及退租安排\n- 度假別墅等第二居所：按約定頻率查看物業、處理已委託的基本事項，以及擔任納稅管理人\n實際範圍、頻率、費用及回報方式，會在開始前逐項確認。",
      en: "There are two types:\n- Rental property: finding tenants, screening and move-in coordination, rent collection, tenant communication, repairs and move-outs\n- Holiday homes and other second homes: checks at an agreed frequency, basic tasks you have entrusted to us, and acting as tax agent\nScope, frequency, fees and reporting are agreed item by item before we start.",
    },
    tags: { "zh-TW": ["物業管理", "出租", "度假別墅"], en: ["property management", "rental", "holiday home"] },
  },
  {
    key: "rent-to-overseas-owner", category: "property-management", service: "property-management", showOn: ["property-management"],
    q: {
      "zh-TW": "我住在海外，租金怎樣交到我手上？",
      en: "I live overseas. How does the rent reach me?",
    },
    a: {
      "zh-TW": "按委託內容，由我們或保證公司收取租金，扣除已約定的費用後，按約定方式匯給您。收款帳戶和匯款時間會在簽訂管理契約前確認。匯到海外帳戶會產生國際匯款手續費，處理方式按個案商量。",
      en: "Depending on the agreement, we or the guarantee company collect the rent, deduct the agreed fees and send the balance to you in the agreed way. The receiving account and payment timing are confirmed before the management contract is signed. Transfers to an overseas account incur international transfer fees, so how these are handled is agreed case by case.",
    },
    tags: { "zh-TW": ["收租", "匯款", "海外業主"], en: ["rent collection", "remittance", "overseas owner"] },
  },
  {
    key: "tax-agent", category: "property-management", service: "property-management", showOn: ["property-management"],
    q: {
      "zh-TW": "什麼是「納稅管理人」？我需要嗎？",
      en: "What is a tax agent (nozei kanrinin), and do I need one?",
    },
    a: {
      "zh-TW": "在日本沒有住所的業主，一般需要指定一位在日本的「納稅管理人」，代為接收稅單及繳納稅款，並向物業所在地的市區町村申報。\n我們可以擔任固定資產稅・都市計畫稅的納稅管理人，代收稅單及代為繳納；報稅及稅務諮詢不包括在內。",
      en: "An owner with no address in Japan generally has to appoint a tax agent in Japan to receive tax notices and pay on their behalf, and register the agent with the municipality where the property is.\nWe can act as tax agent for fixed asset tax and city planning tax, receiving the notices and paying on your behalf. Tax returns and tax advice are not included.",
    },
    tags: { "zh-TW": ["納稅管理人", "固定資產稅", "海外業主"], en: ["tax agent", "property tax", "overseas owner"] },
  },
  {
    key: "holiday-home-checks", category: "property-management", service: "property-management", showOn: ["property-management"],
    q: {
      "zh-TW": "度假別墅不常住，可以委託定期查看嗎？",
      en: "My holiday home is often empty. Can you check it regularly?",
    },
    a: {
      "zh-TW": "可以。我們會按約定的頻率到物業查看，處理已委託的基本事項，並向您回報。查看頻率、內容及費用，在開始前確認。",
      en: "Yes. We visit at the agreed frequency, handle the basic tasks you have entrusted to us and report back to you. Frequency, tasks and fees are agreed before we start.",
    },
    tags: { "zh-TW": ["度假別墅", "定期查看", "第二居所"], en: ["holiday home", "checks", "second home"] },
  },
  {
    key: "switch-manager", category: "property-management", service: "property-management",
    q: {
      "zh-TW": "物業現在由其他公司管理，可以轉過來嗎？",
      en: "Another company manages my property now. Can I switch?",
    },
    a: {
      "zh-TW": "可以先查詢。轉換前，需要確認現有管理契約的解約條件和通知期，以及租客、保證公司和管理組合的聯絡安排。請提供現有契約及物業資料，我們會先確認可以接手的範圍。",
      en: "You can start by asking us. Before switching, we need to check the notice period and termination terms of your current management contract, and how tenants, the guarantee company and the owners' association are contacted. Send us the current contract and property details, and we will confirm what we can take over.",
    },
    tags: { "zh-TW": ["轉換", "管理公司", "管理契約"], en: ["switching", "management contract"] },
  },

  // ── Living support ─────────────────────────────────────────────
  {
    key: "living-support-scope", category: "living-support", service: "living-support",
    q: {
      "zh-TW": "生活支援包括什麼？",
      en: "What does living support include?",
    },
    a: {
      "zh-TW": "與租屋、買房或物業交付直接相關的說明、聯絡和入住時間協調，由我們直接處理。搬運、生活手續等其他服務，可以按需要介紹外部合作夥伴，費用與條件由對方直接與您確認。",
      en: "We handle explanations, communication and move-in scheduling directly tied to your rental, purchase or handover. For other services such as moving or everyday paperwork, we can introduce external partners, who confirm their own fees and terms with you.",
    },
    tags: { "zh-TW": ["生活支援", "入住", "合作夥伴"], en: ["living support", "moving in", "partners"] },
  },
  {
    key: "resident-registration", category: "living-support", service: "living-support", showOn: ["living-support"],
    q: {
      "zh-TW": "可以幫忙辦住民登錄、銀行開戶或手機嗎？",
      en: "Can you help with resident registration, a bank account or a phone?",
    },
    a: {
      "zh-TW": "住民登錄須在搬入後 14 天內，由本人或受委託人到區役所辦理；銀行開戶和手機合約亦需要本人申請。這些手續不屬於我們的直接服務，但我們會說明入住前後的先後次序，並可按需要介紹外部合作夥伴。",
      en: "Resident registration must be done at the ward office within 14 days of moving in, by you or someone you authorise, and bank accounts and phone contracts also need your own application. These are not services we provide directly, but we explain the order of steps around your move and can introduce external partners where needed.",
    },
    tags: { "zh-TW": ["住民登錄", "區役所", "銀行", "手機"], en: ["resident registration", "ward office", "bank", "phone"] },
  },
  {
    key: "utilities", category: "living-support", service: "living-support", showOn: ["living-support"], guide: "city-gas-vs-lp-gas",
    q: {
      "zh-TW": "入住時，水、電和瓦斯要怎樣開通？",
      en: "How do I set up electricity, water and gas when I move in?",
    },
    a: {
      "zh-TW": "一般由入住人自行聯絡各公司申請：電力和自來水可以在線上或以電話申請；瓦斯則需要預約人員上門開栓，開栓時須由本人或代理人在場。建議在入住日前一至兩星期安排，對應的公司可以在簽約時確認。",
      en: "You usually apply to each company yourself: electricity and water can be arranged online or by phone, while gas needs an appointment for a technician to turn it on, with you or someone acting for you present. It is best to arrange this one to two weeks before moving in; the providers for the property can be confirmed when you sign.",
    },
    tags: { "zh-TW": ["水電", "瓦斯", "開栓", "入住"], en: ["utilities", "gas", "electricity", "water"] },
  },
  {
    key: "movers", category: "living-support", service: "living-support", showOn: ["living-support"],
    q: {
      "zh-TW": "可以介紹搬家公司嗎？",
      en: "Can you recommend a moving company?",
    },
    a: {
      "zh-TW": "可以按情況介紹外部合作夥伴。費用、日期及責任，由搬家公司與您直接確認；我們無法保證對方一定可以接受委託。",
      en: "We can introduce an external partner depending on your situation. The moving company confirms fees, dates and responsibilities with you directly, and we cannot guarantee that they will be able to take the job.",
    },
    tags: { "zh-TW": ["搬家", "搬運", "合作夥伴"], en: ["movers", "moving", "partners"] },
  },

  // ── Fees ───────────────────────────────────────────────────────
  {
    key: "consultation-free", category: "fees", featured: true,
    q: {
      "zh-TW": "諮詢要收費嗎？",
      en: "Is there a charge for a consultation?",
    },
    a: {
      "zh-TW": "諮詢免費。正式委託前，我們會先說明需要的費用，例如仲介手續費或管理費用，經您確認後才開始。",
      en: "Consultations are free. Before you formally engage us, we explain any fees involved, such as brokerage or management fees, and only proceed once you have agreed.",
    },
    tags: { "zh-TW": ["免費", "諮詢", "費用"], en: ["free", "consultation", "fees"] },
  },
  {
    key: "management-fees", category: "fees", service: "property-management", showOn: ["property-management"],
    q: {
      "zh-TW": "物業管理費用怎樣計算？",
      en: "How are property management fees set?",
    },
    a: {
      "zh-TW": "按物業類型、委託範圍、查看頻率及回報方式報價。請提供物業資料和希望委託的事項，我們會先確認範圍，再提供報價。",
      en: "We quote based on the type of property, the scope of work, how often we check it and how you want to receive reports. Send us the property details and what you would like us to handle, and we will confirm the scope before quoting.",
    },
    tags: { "zh-TW": ["管理費", "報價", "物業管理"], en: ["management fee", "quote"] },
  },

  // ── Company & contact ──────────────────────────────────────────
  {
    key: "languages", category: "company-contact", featured: true,
    q: {
      "zh-TW": "可以用廣東話或普通話溝通嗎？",
      en: "Which languages can I use?",
    },
    a: {
      "zh-TW": "可以。我們可以用{languages}溝通，文字資料可以使用中文、日文或英文。",
      en: "We work in {languages}. Written material can be in Chinese, Japanese or English.",
    },
    tags: { "zh-TW": ["廣東話", "普通話", "中文", "語言"], en: ["language", "Cantonese", "Mandarin", "English"] },
  },
  {
    key: "licence", category: "company-contact",
    q: {
      "zh-TW": "Fukuoka Insider 持有日本房地產業免許嗎？",
      en: "Is Fukuoka Insider a licensed real-estate company?",
    },
    a: {
      "zh-TW": "有。株式会社Fukuoka Insider 持有宅地建物取引業免許（{licence}），亦是{associationName}會員，並由宅地建物取引士（日本房地產交易的國家資格）提供專業支援。",
      en: "Yes. Fukuoka Insider Co., Ltd. holds a real-estate brokerage licence ({licence}) and is a member of the {associationName}. Support is provided by a Licensed Real Estate Transaction Specialist (takken-shi).",
    },
    tags: { "zh-TW": ["免許", "宅建士", "公司"], en: ["licence", "company", "takken-shi"] },
  },
  {
    key: "how-to-start", category: "company-contact",
    q: {
      "zh-TW": "如何開始查詢？",
      en: "How do I start an enquiry?",
    },
    a: {
      "zh-TW": "可以使用房地產諮詢表、LINE、WhatsApp、Email 或電話聯絡。首次聯絡只需提供目前已確定的需要與條件；想詳細說明物業或需求的話，建議使用諮詢表。",
      en: "Use the enquiry form, LINE, WhatsApp, email or phone. For a first contact, just share the needs and conditions you have already decided; the enquiry form works best if you want to describe the property or your needs in detail.",
    },
    tags: { "zh-TW": ["聯絡", "諮詢表", "LINE", "WhatsApp"], en: ["contact", "enquiry form", "LINE", "WhatsApp"] },
  },
  {
    key: "hours", category: "company-contact",
    q: {
      "zh-TW": "你們的營業時間是？",
      en: "What are your office hours?",
    },
    a: {
      "zh-TW": "{hours}；{closed}休息。日本時間比香港和台灣快 1 小時。營業時間以外收到的訊息，會在營業時間內依次回覆。",
      en: "{hours}; closed on {closed}. Japan is one hour ahead of Hong Kong and Taiwan. Messages received outside office hours are answered in turn during office hours.",
    },
    tags: { "zh-TW": ["營業時間", "時差", "回覆"], en: ["hours", "time difference", "reply"] },
  },
  {
    key: "office-visit", category: "company-contact",
    q: {
      "zh-TW": "可以到辦公室面談嗎？",
      en: "Can I meet you at your office?",
    },
    a: {
      "zh-TW": "可以。辦公室位於{address}（{access}）。為了安排負責人，請先透過 LINE、WhatsApp 或電話預約。",
      en: "Yes. Our office address is {address}. {access}. Please book ahead by LINE, WhatsApp or phone so we can make sure the right person is available.",
    },
    tags: { "zh-TW": ["辦公室", "面談", "地址", "預約"], en: ["office", "visit", "address"] },
  },
];

const locales = ["zh-TW", "en"] as const;

export const seedFaqItems: FaqItem[] = locales.flatMap((locale) =>
  entries.map((entry, index) => ({
    id: `faq-${entry.key}-${locale}`,
    key: entry.key,
    locale,
    category: entry.category,
    question: entry.q[locale],
    answer: entry.a[locale],
    tags: entry.tags[locale],
    order: index + 1,
    published: true,
    featured: entry.featured,
    relatedService: entry.service,
    showOn: entry.showOn,
    relatedTool: entry.tool,
    // Guides exist in Traditional Chinese only (siteConfig.guideLocales).
    relatedGuideCanonicalKey: entry.guide && locale === "zh-TW" ? `article-${entry.guide}` : undefined,
  })),
);
