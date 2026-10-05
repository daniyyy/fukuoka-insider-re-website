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
      "zh-TW": "人還在香港或台灣，可以先開始諮詢嗎？",
      en: "Can I start while I'm still overseas?",
    },
    a: {
      "zh-TW": "可以。透過 LINE、WhatsApp、Email 或諮詢表，告訴我們希望的地區、預算、時間和目前所在地即可。我們會先說明哪些步驟可以在海外進行，哪些要到福岡後才能處理。",
      en: "Yes. Send us your preferred area, budget, timing and where you are now by LINE, WhatsApp, email or the enquiry form. We will explain which steps can be done from overseas and which have to wait until you are in Fukuoka.",
    },
    tags: { "zh-TW": ["海外", "香港", "台灣", "諮詢"], en: ["overseas", "Hong Kong", "Taiwan", "enquiry"] },
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
  {
    key: "when-to-start-search", category: "overseas-clients", service: "rent",
    q: {
      "zh-TW": "人在海外，應該提前多久開始找房？",
      en: "How far ahead should I start looking from overseas?",
    },
    a: {
      "zh-TW": "日本的出租物件，一般在申請後短時間內就要開始計租，很少可以為租客保留太久。建議先諮詢，了解地區、預算和所需文件；確定來日本的日期後，再正式看房和申請。",
      en: "Rental properties in Japan usually start charging rent soon after you apply and are rarely held for long. Start by asking us about areas, budget and the documents you will need, then view and apply once your arrival date is fixed.",
    },
    tags: { "zh-TW": ["海外", "時間", "找房", "申請"], en: ["overseas", "timing", "searching"] },
  },
  {
    key: "no-japanese", category: "overseas-clients", service: "rent", guide: "guarantor-company-screening-call",
    q: {
      "zh-TW": "不會日語，可以在福岡租屋嗎？",
      en: "Can I rent in Fukuoka without speaking Japanese?",
    },
    a: {
      "zh-TW": "可以，但保證公司的審查電話多以日語進行，審查員也會留意申請人能否溝通。回答時針對問題直接回答即可；沒聽懂的話，請禮貌地請對方說慢一點，不要隨便回答「はい」。\n申請前，我們會說明電話可能問的內容。入住後，部分物件的 24 小時支援服務亦提供外語對應。",
      en: "Yes, but the guarantee company's screening call is usually in Japanese, and the screener will note whether you can communicate. Answer each question directly; if you don't understand, politely ask them to speak more slowly rather than just saying \"hai\".\nBefore you apply, we explain what the call may cover. After you move in, the 24-hour support service at some properties also offers help in other languages.",
    },
    tags: { "zh-TW": ["日語", "語言", "審查電話"], en: ["Japanese", "language", "screening call"] },
  },
  {
    key: "visa-types", category: "overseas-clients", service: "rent", guide: "guarantor-company-and-joint-guarantor",
    q: {
      "zh-TW": "工作假期簽證或留學生，可以租屋嗎？",
      en: "Can I rent on a working holiday visa or as a student?",
    },
    a: {
      "zh-TW": "可以申請。保證公司主要看兩點：在留資格和期限是否穩定，以及能否穩定支付租金。在留期間較短，或者在日本還沒有收入時，審查會較嚴格，部分物件可能要求補充資料，或不接受申請。\n留學生一般需要提供學校的入學或在學證明。",
      en: "You can apply. Guarantee companies look mainly at two things: whether your residence status and period of stay are stable, and whether you can pay the rent reliably. With a short period of stay or no income in Japan yet, screening is stricter, and some properties may ask for more documents or not accept the application.\nStudents usually need a certificate of admission or enrolment from their school.",
    },
    tags: { "zh-TW": ["工作假期", "留學生", "簽證", "審查"], en: ["working holiday", "student", "visa", "screening"] },
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
      en: "Commonly requested documents include:\n- Your passport, plus your residence card if you already live in Japan\n- Proof of employment or income (such as an employment certificate or payslips); students provide proof of admission or enrolment\n- Details of everyone moving in, and an emergency contact\nThe exact list is set by the property, the management company and the guarantee company, and we go through it for each property.",
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
      "zh-TW": "可以，但選擇會比較少。現在幾乎所有物件都要求使用「租賃保證公司」，部分物件會同時要求提供保證人；沒有日本的保證人，就只能選擇不需要保證人的物件。\n保證公司會另外審查，並收取保證費：首次多為月租（通常連共益費計）的五成至一個月左右，之後一般每年另付續約費，亦有按月收費的方案。\n另外，緊急聯絡人是必須的。",
      en: "Yes, but you will have fewer options. Almost all properties now require a rent guarantee company, and some also ask for a personal guarantor. Without a guarantor in Japan, you can only choose properties that do not require one.\nThe guarantee company runs its own screening and charges a fee, typically 50–100% of one month's rent (usually including the common-area fee) at the start, followed by a yearly renewal fee, though some companies charge monthly instead.\nAn emergency contact is also required.",
    },
    tags: { "zh-TW": ["保證人", "保證公司", "緊急聯絡人", "租屋"], en: ["guarantor", "guarantee company", "emergency contact"] },
  },
  {
    key: "emergency-contact", category: "renting", service: "rent", guide: "guarantor-company-screening-call",
    q: {
      "zh-TW": "緊急聯絡人是什麼？需要負責什麼？",
      en: "What is an emergency contact, and what are they responsible for?",
    },
    a: {
      "zh-TW": "緊急聯絡人是管理公司或保證公司聯絡不上租客時會聯絡的人，例如發生緊急事故，或長時間聯絡不到租客的時候。與保證人不同，緊急聯絡人不需要代付租金或賠償。\n申請租屋時必須填寫緊急聯絡人。不少物件要求是住在日本、能以日語溝通的親友或同事，條件按物件和保證公司而定。審查期間，保證公司可能會致電確認，請事先通知對方，以免被當成詐騙電話掛斷。",
      en: "An emergency contact is the person the management company or guarantee company calls when they cannot reach the tenant, for example in an emergency or when the tenant cannot be reached for a long time. Unlike a guarantor, an emergency contact does not have to pay rent or damages on your behalf.\nA rental application must include an emergency contact. Many properties ask for a relative, friend or colleague who lives in Japan and can communicate in Japanese, though the conditions depend on the property and the guarantee company. The guarantee company may call them during screening, so let them know in advance so they do not hang up thinking it is a scam call.",
    },
    tags: { "zh-TW": ["緊急聯絡人", "保證人", "申請", "租屋"], en: ["emergency contact", "guarantor", "application"] },
  },
  {
    key: "rental-initial-costs", category: "renting", service: "rent", showOn: ["rent"], guide: "rental-initial-costs-reikin-shikikin", tool: "rental-initial-cost",
    q: {
      "zh-TW": "租屋的初期費用大約要多少？",
      en: "How much are the move-in costs for a rental?",
    },
    a: {
      "zh-TW": "一般約為月租的 4 至 6 個月，包括敷金、禮金、仲介手續費、預付房租（一般約 2 個月）、保證公司費用、火災保險及換鎖費等，實際金額按物件而定。\n可以先用「租屋初期費用估算」，整理手上已知的數字。",
      en: "As a rough guide, four to six months' rent, covering the deposit (shikikin), key money (reikin), brokerage fee, rent paid in advance (usually about 2 months), guarantee company fee, fire insurance and lock replacement. The actual amount depends on the property.\nYou can use the rental move-in cost estimator to organise the figures you already have.",
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
  {
    key: "reikin-shikikin", category: "renting", service: "rent", guide: "rental-initial-costs-reikin-shikikin", tool: "rental-initial-cost",
    q: {
      "zh-TW": "敷金和禮金有什麼分別？",
      en: "What is the difference between shikikin and reikin?",
    },
    a: {
      "zh-TW": "敷金即押金，福岡較常見為 1 個月租金；退租時扣除原狀回復等費用後，餘額會退還。禮金是給房東的謝禮，不會退還。\n現在零禮金的物件越來越多，但家庭型的大房型、新建或剛翻新的物件，以及熱門地段的高級公寓，仍常見 1 至 2 個月禮金。",
      en: "Shikikin is a deposit, commonly one month's rent in Fukuoka; when you move out, restoration and similar costs are deducted and the rest is returned. Reikin (key money) is a thank-you payment to the landlord and is not returned.\nMore and more properties now ask for no key money, but one to two months is still common for larger family homes, new or newly renovated buildings, and upmarket apartments in popular areas.",
    },
    tags: { "zh-TW": ["敷金", "禮金", "押金", "初期費用"], en: ["deposit", "key money", "shikikin", "reikin"] },
  },
  {
    key: "shikibiki", category: "renting", service: "rent", guide: "shikibiki-deposit-deduction",
    q: {
      "zh-TW": "報價單上的「敷引」是什麼？",
      en: "What is shikibiki on a quote?",
    },
    a: {
      "zh-TW": "敷引是簽約時已約定、退租時不會退還的押金部分。例如押金 3 個月、敷引 2 個月，即使退租時屋況良好，那 2 個月也會直接扣除。\n敷引一般已包括基本清潔及自然損耗的翻新；但如果人為損壞的維修費超過敷引金額，仍可能另外收費。簽約前，建議確認敷引是否已包括退租時的基本清掃費。",
      en: "Shikibiki is the part of the deposit agreed at signing as non-refundable. For example, with a three-month deposit and two months' shikibiki, those two months are kept when you leave, however well you have looked after the home.\nShikibiki usually covers basic cleaning and normal wear, but if damage you caused costs more than the shikibiki to repair, you can still be charged. Before signing, ask whether the shikibiki already includes the basic cleaning when you move out.",
    },
    tags: { "zh-TW": ["敷引", "押金", "退租"], en: ["shikibiki", "deposit", "moving out"] },
  },
  {
    key: "move-out-restoration", category: "renting", service: "rent", guide: "restoration-costs-when-moving-out",
    q: {
      "zh-TW": "退租時的「原狀回復」要付多少？",
      en: "What will I pay for restoration when I move out?",
    },
    a: {
      "zh-TW": "按國土交通省的指引，租客只需負責因自己故意或過失造成的損傷。日曬褪色、冰箱背後牆壁變黑、輕微磨損等「通常損耗」，原則上由房東負責。\n抽菸、寵物造成的氣味或損傷、大型釘孔或螺絲孔，一般由租客負責；費用超過敷金時，管理公司可以另外請款。\n建議拿到鑰匙當天，把每面牆、地板、廚房、浴室和已有的損傷拍照，並存到雲端。",
      en: "Under the Ministry of Land, Infrastructure, Transport and Tourism guidelines, tenants are responsible only for damage caused deliberately or through their own negligence. Normal wear, such as sun fading, the wall darkening behind the fridge and light scuffs, is in principle the landlord's cost.\nSmoking, smells or damage from pets, and large nail or screw holes are usually the tenant's responsibility, and if the cost exceeds your deposit, the management company can bill you for the rest.\nOn the day you receive the keys, photograph every wall, the floors, kitchen, bathroom and any existing damage, and save the photos to the cloud.",
    },
    tags: { "zh-TW": ["退租", "原狀回復", "敷金"], en: ["moving out", "restoration", "deposit"] },
  },
  {
    key: "floor-plans", category: "renting", service: "rent", guide: "floor-plan-abbreviations-1k-1ldk",
    q: {
      "zh-TW": "1K、1LDK 這些房型代號是什麼意思？",
      en: "What do floor plan codes like 1K and 1LDK mean?",
    },
    a: {
      "zh-TW": "數字是房間數目，L 是客廳、D 是餐廳、K 是廚房。1R 的廚房和睡覺的空間沒有間隔；1K 則有牆和門分開。S 是採光或通風未達居室標準的房間，多用作儲物或書房。\n經常在家煮中菜的話，建議至少選 1K，減少油煙和氣味飄到睡房。",
      en: "The number is the count of rooms; L is a living room, D a dining area and K a kitchen. In a 1R the kitchen and sleeping area are one open space, while a 1K has a wall and door between them. S is a room that does not meet the light or ventilation standard for a habitable room, often used for storage or as a study.\nIf you often cook Chinese food at home, choose at least a 1K so less smoke and smell reaches where you sleep.",
    },
    tags: { "zh-TW": ["房型", "1K", "1LDK", "格局"], en: ["floor plan", "1K", "1LDK", "layout"] },
  },
  {
    key: "furniture", category: "renting", service: "rent", guide: "unfurnished-rentals-and-appliances",
    q: {
      "zh-TW": "日本租屋會附家具和家電嗎？",
      en: "Do Japanese rentals come furnished?",
    },
    a: {
      "zh-TW": "大多數不附，只有少數標明「家具付」的物件例外。冷氣、廚房、熱水器等在合約列為「設備」的項目，正常使用下故障由房東負責維修。\n前租客留下、沒有列為設備的家電（サービス設置），房東一般不負責維修。看房時，可以確認屋內的家電屬於哪一類。",
      en: "Most are unfurnished, apart from a few listed as furnished (kagu-tsuki). Items listed as equipment in the contract, such as the air conditioner, kitchen and water heater, are repaired by the landlord if they break through normal use.\nAppliances left by a previous tenant and not listed as equipment (service-setchi) are usually not repaired by the landlord. When viewing, check which category any appliances in the home fall into.",
    },
    tags: { "zh-TW": ["家具", "家電", "設備"], en: ["furniture", "appliances", "equipment"] },
  },

  // ── Buying & selling ───────────────────────────────────────────
  {
    key: "foreigners-buying", category: "buying-selling", featured: true, service: "buy-sell", showOn: ["buy-sell"],
    q: {
      "zh-TW": "外國人可以在日本買房嗎？",
      en: "Can foreigners buy property in Japan?",
    },
    a: {
      "zh-TW": "可以。日本一般不限制外國人購買房地產，也可以用外國人名義登記。不過，貸款、稅務，以及部分地區或較大面積土地的申報要求，會因買家身分和物業用途而不同。非居住者購買後，除自住等例外情況外，須在取得後 20 日內經日本銀行向財務大臣提交外匯法報告；度假別墅或第二居所不屬於自住。\n我們會在交易前說明需要處理的事項。",
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
      en: "Typical costs include:\n- Brokerage fee\n- Registration costs (registration tax, judicial scrivener's fee)\n- Stamp tax on the contract\n- Real estate acquisition tax (in Fukuoka Prefecture the tax notice usually arrives six months to a year after registration)\n- Pro-rated settlement of fixed asset tax, management fees and similar charges\n- Fire insurance and any loan-related fees\nYou can use the purchase cost estimator to organise the amounts you already know.",
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
  {
    key: "buying-process", category: "buying-selling", service: "buy-sell", tool: "purchase-cost",
    q: {
      "zh-TW": "在日本買房的流程是怎樣？",
      en: "What are the steps to buying property in Japan?",
    },
    a: {
      "zh-TW": "一般流程如下：\n- 確定預算、地區和條件，開始看房\n- 遞交購買申請（買付證明書），與賣方商談價格和條件\n- 聽取重要事項說明後簽訂買賣契約，支付訂金（手付金）\n- 交付餘款，由司法書士辦理所有權登記，然後交樓\n由簽約到交樓的時間按物件和付款方式而定，交易前我們會說明每一步的時間和費用。",
      en: "The usual steps are:\n- Settle your budget, area and requirements, and start viewing\n- Submit a purchase application (kaitsuke shomeisho) and negotiate the price and terms with the seller\n- Receive the Explanation of Important Matters, sign the sale contract and pay a deposit (tetsukekin)\n- Pay the balance; a judicial scrivener registers the ownership, and the property is handed over\nThe time from contract to handover depends on the property and how you pay; we explain the timing and costs of each step before the transaction.",
    },
    tags: { "zh-TW": ["買房", "流程", "手付金", "登記"], en: ["buying", "process", "deposit", "registration"] },
  },
  {
    key: "buying-and-visa", category: "buying-selling", service: "buy-sell",
    q: {
      "zh-TW": "在日本買了房子，就可以住在日本嗎？",
      en: "If I buy a home in Japan, can I live there?",
    },
    a: {
      "zh-TW": "買房不會因此獲得簽證或在留資格。沒有在留資格的話，只可以按入境規定短期停留，例如持香港或台灣護照免簽入境，每次最長 90 日。\n想長期在日本居住，需要另外申請合適的簽證。",
      en: "Buying property does not give you a visa or residence status. Without residence status you can only stay short-term under the entry rules; for example, Hong Kong and Taiwan passport holders can enter visa-free for up to 90 days at a time.\nTo live in Japan long-term, you need to apply for a suitable visa separately.",
    },
    tags: { "zh-TW": ["簽證", "在留資格", "買房", "移居"], en: ["visa", "residence status", "buying"] },
  },
  {
    key: "management-repair-fees", category: "buying-selling", service: "buy-sell", tool: "purchase-cost",
    q: {
      "zh-TW": "公寓的管理費和修繕積立金是什麼？",
      en: "What are an apartment's management fee and repair reserve fund?",
    },
    a: {
      "zh-TW": "兩者都是每月付給大樓管理組合的費用：管理費用於日常管理、清潔和公共部分的水電；修繕積立金則儲起來，用作將來外牆、屋頂、電梯等大型維修。全國平均兩者合計每月約 2.5 萬日圓，按大樓而有很大差異。\n購買新建公寓時，一般另需在交樓時一次性支付「修繕積立基金」。",
      en: "Both are paid monthly to the building's owners' association: the management fee covers day-to-day management, cleaning and utilities for the common areas, while the repair reserve fund is saved for future major work such as the exterior walls, roof and lifts. The national average for the two together is about ¥25,000 a month, and it varies widely between buildings.\nWhen you buy a new apartment, you usually also pay a one-off initial repair fund at handover.",
    },
    tags: { "zh-TW": ["管理費", "修繕積立金", "公寓", "買房"], en: ["management fee", "repair reserve fund", "apartment"] },
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
      "zh-TW": "可以先諮詢。轉換前，需要確認現有管理契約的解約條件和通知期，以及租客、保證公司和管理組合的聯絡安排。請提供現有契約及物業資料，我們會先確認可以接手的範圍。",
      en: "You can start by asking us. Before switching, we need to check the notice period and termination terms of your current management contract, and how tenants, the guarantee company and the owners' association are contacted. Send us the current contract and property details, and we will confirm what we can take over.",
    },
    tags: { "zh-TW": ["轉換", "管理公司", "管理契約"], en: ["switching", "management contract"] },
  },
  {
    key: "rental-income-tax", category: "property-management", service: "property-management",
    q: {
      "zh-TW": "住在海外，收到的日本租金需要報稅嗎？",
      en: "Do I pay tax in Japan on rent if I live overseas?",
    },
    a: {
      "zh-TW": "需要。非居住者在日本出租物業的租金收入，一般需要在日本申報所得稅。如果租客是公司等情況，租金可能先被預扣 20.42% 稅款，之後在報稅時結算。\n報稅請向稅理士確認；我們的納稅管理人服務只包括固定資產稅・都市計畫稅。",
      en: "Yes. A non-resident's rental income from property in Japan generally has to be declared on a Japanese income tax return. Where the tenant is a company, for example, 20.42% of the rent may be withheld first and settled when you file.\nPlease confirm tax returns with a tax accountant; our tax agent service covers fixed asset tax and city planning tax only.",
    },
    tags: { "zh-TW": ["租金收入", "報稅", "海外業主", "預扣"], en: ["rental income", "tax return", "overseas owner", "withholding"] },
  },
  {
    key: "minpaku", category: "property-management", service: "property-management",
    q: {
      "zh-TW": "買來的公寓可以做民宿（例如 Airbnb）嗎？",
      en: "Can I run my apartment as a short-term rental, such as Airbnb?",
    },
    a: {
      "zh-TW": "要先確認兩點：一是大樓的管理規約有沒有禁止民宿，很多公寓都禁止；二是要按《住宅宿泊事業法》申報，或取得旅館業許可。按住宅宿泊事業法經營的話，每年最多只可營業 180 日，地區亦可能另有限制。\n購買前，建議先確認這些條件，再決定用途。",
      en: "Check two things first: whether the building's rules ban short-term rentals, as many apartment buildings do, and whether you can register under the Private Lodging Business Act or obtain an inn licence. Under the Private Lodging Business Act you can operate for at most 180 days a year, and local rules may add further limits.\nIt is best to check these conditions before you buy, then decide how to use the property.",
    },
    tags: { "zh-TW": ["民宿", "Airbnb", "管理規約", "出租"], en: ["short-term rental", "Airbnb", "building rules"] },
  },
  {
    key: "tenant-move-out", category: "property-management", service: "property-management", guide: "restoration-costs-when-moving-out",
    q: {
      "zh-TW": "租客退租時，清潔和維修費用由誰負責？",
      en: "When a tenant leaves, who pays for cleaning and repairs?",
    },
    a: {
      "zh-TW": "按國土交通省的原狀回復指引區分：租客故意或過失造成的損傷，由租客負責；日曬褪色、輕微磨損等通常損耗，以及設備的自然老化，一般由業主負責。\n委託我們管理時，退租檢查、維修報價和重新招租會按約定處理，費用事前向您說明。",
      en: "It follows the Ministry of Land, Infrastructure, Transport and Tourism guidelines on restoration: damage the tenant caused deliberately or through negligence is the tenant's cost, while normal wear, such as sun fading and light scuffs, and the natural ageing of equipment are usually the owner's.\nIf we manage the property, the move-out inspection, repair quotes and re-letting are handled as agreed, and we explain the costs to you in advance.",
    },
    tags: { "zh-TW": ["退租", "原狀回復", "維修", "業主"], en: ["move-out", "restoration", "repairs", "owner"] },
  },

  // ── Living support ─────────────────────────────────────────────
  {
    key: "living-support-scope", category: "living-support", service: "living-support",
    q: {
      "zh-TW": "生活支援包括什麼？",
      en: "What does living support include?",
    },
    a: {
      "zh-TW": "以下 6 項由我們的員工直接陪同或處理：水、電、瓦斯開通，租借家具家電，區役所手續同行及翻譯，手機合約，銀行開戶，以及生活用品購物同行。\n學校、可以用英語看診的診所、簽證申請及續期（行政書士），以及找工作（人才中介），可以介紹合作夥伴；其他需要也可以個別諮詢。",
      en: "Our own staff handle six items directly: setting up electricity, gas and water, rental furniture and appliances, ward office procedures with interpreting, a mobile phone contract, opening a bank account, and shopping for everyday items.\nFor schools, clinics where you can see a doctor in English, visa applications and renewals (an administrative scrivener) and finding work (recruitment agencies), we can introduce partners. For anything else, just ask.",
    },
    tags: { "zh-TW": ["生活支援", "入住", "陪同", "合作夥伴"], en: ["living support", "moving in", "partners"] },
  },
  {
    key: "living-support-anyone", category: "living-support", service: "living-support", showOn: ["living-support"],
    q: {
      "zh-TW": "沒有透過你們租屋或買房，也可以申請生活支援嗎？",
      en: "Can I use Living Support if I didn't rent or buy through you?",
    },
    a: {
      "zh-TW": "可以，任何人都可以申請。告訴我們需要的項目、日期和地點即可。",
      en: "Yes, anyone can apply. Just tell us what you need, when and where.",
    },
    tags: { "zh-TW": ["生活支援", "申請", "陪同"], en: ["living support", "eligibility"] },
  },
  {
    key: "resident-registration", category: "living-support", service: "living-support", showOn: ["living-support"],
    q: {
      "zh-TW": "可以幫忙辦住民登錄、銀行開戶或手機嗎？",
      en: "Can you help with resident registration, a bank account or a phone?",
    },
    a: {
      "zh-TW": "可以。住民登錄須在搬入後 14 天內到區役所辦理，我們的員工可以陪同並即場翻譯；手機合約和銀行開戶，也可以陪同辦理。這些手續需要本人到場申請。",
      en: "Yes. Resident registration must be done at the ward office within 14 days of moving in, and our staff can go with you and interpret on the spot. We can also go with you to sign a phone contract and open a bank account. You need to be there in person for these procedures.",
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
      "zh-TW": "一般由入住人聯絡各公司申請：電力和自來水可以在線上或以電話申請；瓦斯則需要預約人員上門開栓，開栓時須由本人或代理人在場。建議在入住日前一至兩星期安排。\n日語不方便的話，也可以委託我們代為聯絡和預約。",
      en: "You usually apply to each company yourself: electricity and water can be arranged online or by phone, while gas needs an appointment for a technician to turn it on, with you or someone acting for you present. It is best to arrange this one to two weeks before moving in.\nIf Japanese is difficult for you, we can also contact the companies and book the appointments for you.",
    },
    tags: { "zh-TW": ["水電", "瓦斯", "開栓", "入住"], en: ["utilities", "gas", "electricity", "water"] },
  },
  {
    key: "movers", category: "living-support", service: "living-support",
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
  {
    key: "city-vs-lp-gas", category: "living-support", service: "living-support", guide: "city-gas-vs-lp-gas",
    q: {
      "zh-TW": "都市瓦斯和 LP 瓦斯有什麼分別？",
      en: "What is the difference between city gas and LP gas?",
    },
    a: {
      "zh-TW": "都市瓦斯經地下管道供應，價格較穩定；LP 瓦斯由瓦斯公司運送瓦斯桶到大樓，費率由各公司自訂，同樣用量一般貴五成以上。瓦斯桶集中放在大樓外面，不會放在屋內。\n福岡的租屋物件大多使用 LP 瓦斯。經常在家煮食或家庭人數較多的話，可以優先考慮使用都市瓦斯的物件。",
      en: "City gas is piped underground and its price is fairly stable. LP gas is delivered to the building in cylinders, and each gas company sets its own rates; for the same use it is usually at least 50% more expensive. The cylinders are kept together outside the building, not in your home.\nMost rentals in Fukuoka use LP gas. If you cook at home a lot or have a larger household, consider prioritising properties with city gas.",
    },
    tags: { "zh-TW": ["瓦斯", "LP瓦斯", "都市瓦斯", "生活費"], en: ["gas", "LP gas", "city gas"] },
  },
  {
    key: "garbage", category: "living-support", service: "living-support", guide: "fukuoka-late-night-garbage-collection",
    q: {
      "zh-TW": "福岡倒垃圾有什麼要注意？",
      en: "What should I know about rubbish in Fukuoka?",
    },
    a: {
      "zh-TW": "福岡市在深夜收垃圾。大樓設有專屬垃圾房的話，丟棄時間通常比較有彈性；沒有的話，要拿到街上的指定收集點，並在收集日當天日落後至凌晨 12 點前拿出。\n垃圾須按規定分類。實際規定請在入住後查看大樓公告，或向管理公司確認。",
      en: "Fukuoka City collects rubbish at night. If the building has its own bin room, you can usually put rubbish out more flexibly; if not, you take it to a designated collection point on the street between sunset and midnight on collection day.\nRubbish has to be sorted according to the rules. After you move in, check the building notices or ask the management company for the exact rules.",
    },
    tags: { "zh-TW": ["垃圾", "分類", "福岡生活"], en: ["rubbish", "sorting", "living in Fukuoka"] },
  },
  {
    key: "parcels", category: "living-support", service: "living-support", guide: "delivery-boxes-in-fukuoka",
    q: {
      "zh-TW": "不在家時，網購包裹怎樣收？",
      en: "How do I receive parcels when I'm not at home?",
    },
    a: {
      "zh-TW": "日本的快遞一般不會交給鄰居代收，也不會放在門口；不在家時會留下「不在票」，需要掃描 QR code 或致電預約重新派送，期限一般約一星期。\n設有宅配盒子的公寓最方便，新建公寓大多設有，舊式木造公寓多半沒有。也可以指定在便利店或配送公司的取件站取貨。",
      en: "Couriers in Japan usually won't leave parcels with neighbours or at the door. If you are out, they leave a missed-delivery slip, and you rebook delivery by QR code or phone, usually within about a week.\nA building with delivery lockers (takuhai box) is the most convenient; most new buildings have them, while older wooden apartment buildings mostly do not. You can also choose collection at a convenience store or a courier pickup point.",
    },
    tags: { "zh-TW": ["宅配", "網購", "宅配盒子"], en: ["parcels", "delivery lockers", "online shopping"] },
  },
  {
    key: "parking", category: "living-support", service: "living-support", guide: "parking-and-garage-certificates",
    q: {
      "zh-TW": "在福岡開車，租屋時停車位要注意什麼？",
      en: "I plan to drive in Fukuoka. What should I check about parking?",
    },
    a: {
      "zh-TW": "在日本買車登記前，需要申請「車庫證明」，停車位須在住所 2 公里以內；公寓附設的車位，也要確認可以用來申請。\n福岡市內的中高層公寓多為機械式停車場，對車輛的長、闊、高有限制，SUV 或 MPV 要先確認尺寸。月租方面，中央區、博多區一帶約 1.5 至 2 萬日圓，郊區約 5,000 至 12,000 日圓。",
      en: "Before registering a car in Japan you need a parking certificate (shako shomeisho), and the space must be within 2 km of your home; if the home comes with a space, check that it can be used for the certificate.\nMid- and high-rise buildings in Fukuoka City mostly have mechanical parking with limits on length, width and height, so check the size if you drive an SUV or MPV. Monthly rents are about ¥15,000–20,000 around Chuo and Hakata wards, and about ¥5,000–12,000 in the suburbs.",
    },
    tags: { "zh-TW": ["停車場", "車庫證明", "開車"], en: ["parking", "garage certificate", "car"] },
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
  {
    key: "living-support-fees", category: "fees", service: "living-support", showOn: ["living-support"],
    q: {
      "zh-TW": "生活支援怎樣收費？",
      en: "How much does Living Support cost?",
    },
    a: {
      "zh-TW": "按項目報價。請告訴我們需要協助的項目、日期和地點，確認內容後提供報價，經您同意才安排。",
      en: "Fees are quoted per item. Tell us the tasks, dates and places, and we will confirm the details and send a quote; we only arrange anything once you agree.",
    },
    tags: { "zh-TW": ["生活支援", "費用", "報價"], en: ["living support", "fees", "quote"] },
  },
  {
    key: "lock-and-support-fees", category: "fees", service: "rent", guide: "key-exchange-and-24-hour-support-fees", tool: "rental-initial-cost",
    q: {
      "zh-TW": "換鎖費和 24 小時支援費可以不付嗎？",
      en: "Can I skip the lock replacement and 24-hour support fees?",
    },
    a: {
      "zh-TW": "換鎖費幾乎無法免除：為了確保只有新租客持有鑰匙，日本租屋一般都會更換門鎖。福岡的一般門鎖約 1.5 至 2.5 萬日圓，高級公寓的電子鎖或感應鑰匙可達 5 至 10 萬日圓。\n24 小時支援費多為每月 800 至 1,500 日圓，現在大多數管理公司都列為必須加入，提供深夜或假日的漏水、鑰匙遺失等緊急支援。",
      en: "The lock replacement fee is almost never waived: locks are changed so that only the new tenant holds the keys. In Fukuoka a standard lock costs about ¥15,000–25,000, while electronic or card-key locks in upmarket buildings can cost ¥50,000–100,000.\nThe 24-hour support fee is usually ¥800–1,500 a month, and most management companies now make it compulsory. It covers emergencies at night or on holidays, such as leaks or lost keys.",
    },
    tags: { "zh-TW": ["換鎖費", "24小時支援", "初期費用"], en: ["lock replacement", "24-hour support", "move-in costs"] },
  },
  {
    key: "fire-insurance", category: "fees", service: "rent", guide: "rental-initial-costs-reikin-shikikin",
    q: {
      "zh-TW": "租屋一定要買火災保險嗎？",
      en: "Do I have to buy fire insurance to rent?",
    },
    a: {
      "zh-TW": "一般是租約的條件之一。費用按房型大小而定，兩年約 2 萬日圓左右，合約期內需要保持投保。",
      en: "It is usually a condition of the lease. The cost depends on the size of the home, at around ¥20,000 for two years, and the cover must be kept up for the whole lease.",
    },
    tags: { "zh-TW": ["火災保險", "初期費用", "租屋"], en: ["fire insurance", "move-in costs", "renting"] },
  },
  {
    key: "negotiable-items", category: "fees", service: "rent", guide: "rental-initial-costs-reikin-shikikin", tool: "rental-initial-cost",
    q: {
      "zh-TW": "初期費用裡，有哪些項目可以商量？",
      en: "Which move-in costs can be negotiated?",
    },
    a: {
      "zh-TW": "管理公司預設加入的自選服務，多數可以商量，例如室內消毒費（約 1.5 至 2 萬日圓）、空調清洗費、淨水器（每月約 1,000 日圓），以及防盜鎖、滅火器等。\n預付房租、仲介手續費、保證公司費用、火災保險和換鎖費等，則幾乎無法避免。",
      en: "Optional services the management company adds by default can often be negotiated, such as interior disinfection (about ¥15,000–20,000), air-conditioner cleaning, a water filter (about ¥1,000 a month), and extra locks or fire extinguishers.\nRent paid in advance, the brokerage fee, the guarantee company fee, fire insurance and lock replacement are almost always required.",
    },
    tags: { "zh-TW": ["初期費用", "商量", "消毒費"], en: ["move-in costs", "negotiation", "disinfection"] },
  },

  // ── Company & contact ──────────────────────────────────────────
  {
    key: "languages", category: "company-contact", featured: true,
    q: {
      "zh-TW": "可以用中文或廣東話溝通嗎？",
      en: "Which languages can I use?",
    },
    a: {
      "zh-TW": "可以。我們可以用{languages}溝通，文字資料可以使用中文、日文或英文。",
      en: "We work in {languages}. Written material can be in Chinese, Japanese or English.",
    },
    tags: { "zh-TW": ["中文", "廣東話", "國語", "普通話", "語言"], en: ["language", "Cantonese", "Mandarin", "English"] },
  },
  {
    key: "licence", category: "company-contact",
    q: {
      "zh-TW": "Fukuoka Insider 持有宅地建物取引業免許嗎？",
      en: "Does Fukuoka Insider hold a real estate brokerage licence?",
    },
    a: {
      "zh-TW": "有。株式会社Fukuoka Insider 持有宅地建物取引業免許（{licence}），亦是{associationName} 會員，並由宅地建物取引士（日本房地產交易的國家資格）提供專業支援。",
      en: "Yes. Fukuoka Insider Co., Ltd. holds a real estate brokerage licence ({licence}) and is a member of the {associationName}. Support is provided by a Licensed Real Estate Transaction Specialist (takken-shi, Japan's national qualification for real estate transactions).",
    },
    tags: { "zh-TW": ["免許", "宅建士", "公司"], en: ["licence", "company", "takken-shi"] },
  },
  {
    key: "how-to-start", category: "company-contact",
    q: {
      "zh-TW": "如何開始諮詢？",
      en: "How do I start a consultation?",
    },
    a: {
      "zh-TW": "可以使用房地產諮詢表、LINE、WhatsApp、Email 或電話聯絡。首次聯絡只需提供目前已確定的需要與條件；想詳細說明物業或需求的話，建議使用諮詢表。",
      en: "Use the property enquiry form, LINE, WhatsApp, email or phone. For a first contact, just share the needs and conditions you have already decided; the enquiry form works best if you want to describe the property or your needs in detail.",
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
