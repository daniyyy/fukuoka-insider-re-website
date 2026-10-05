import type { Locale } from "@/config/site";

export type ServiceKey = "rent" | "buy-sell" | "property-management" | "living-support";

export const serviceKeys: ServiceKey[] = ["rent", "buy-sell", "property-management", "living-support"];

export const serviceImages: Record<ServiceKey, { src: string; width: number; height: number; alt: Record<Locale, string> }> = {
  rent: {
    src: "/images/rent/ldk.webp",
    width: 1448,
    height: 1086,
    alt: { "zh-TW": "有開放式廚房和陽台的住宅客廳", ja: "オープンキッチンとバルコニーのある住まいのリビング", en: "A living room with an open kitchen and a balcony" },
  },
  "buy-sell": {
    src: "/images/fukuoka-hero.webp",
    width: 1672,
    height: 941,
    alt: { "zh-TW": "福岡住宅區的集合住宅與海灣景色", ja: "福岡の住宅街に建つ集合住宅と湾の眺め", en: "An apartment building in a Fukuoka neighbourhood overlooking the bay" },
  },
  "property-management": {
    src: "/images/guide-planning.webp",
    width: 1448,
    height: 1086,
    alt: { "zh-TW": "物業平面圖、鑰匙與筆記本", ja: "間取り図、鍵、ノート", en: "A floor plan, keys, and a notebook" },
  },
  "living-support": {
    src: "/images/photos/hakata-station.webp",
    width: 1600,
    height: 1200,
    alt: { "zh-TW": "JR 博多站前廣場", ja: "JR博多駅前広場", en: "The plaza in front of JR Hakata Station" },
  },
};

export type ServiceOverviewItem = {
  key: ServiceKey;
  title: string;
  audience: string;
  description: string;
  route: string;
};

export const serviceOverviewCopy: Record<Locale, {
  title: string;
  intro: string;
  suitable: string;
  jumpLabel: string;
  action: string;
  items: ServiceOverviewItem[];
}> = {
  "zh-TW": {
    title: "在福岡，\n您需要哪一項\n房地產服務？",
    intro: "四項服務都可以先免費諮詢。選擇最接近您情況的一項，看看我們可以怎樣協助。",
    suitable: "適合",
    jumpLabel: "服務一覽",
    action: "查看",
    items: [
      { key: "rent", title: "租屋服務", audience: "找住處、準備搬到福岡", description: "住宅、辦公室及商業空間租賃。人在海外也可以先開始諮詢。", route: "/services/rent" },
      { key: "buy-sell", title: "房產買賣", audience: "準備在福岡買房，或出售福岡物業", description: "買房可協助物色及確認物件；賣房可先討論物業現況與出售安排。", route: "/services/buy-sell" },
      { key: "property-management", title: "物業管理", audience: "持有出租物業或度假別墅", description: "出租物業管理，以及度假別墅等不常居住物業的定期查看。", route: "/services/property-management" },
      { key: "living-support", title: "生活支援", audience: "初次來福岡、日語不方便", description: "水電瓦斯、區役所、手機和銀行開戶等入住手續，由員工陪同辦理。", route: "/services/living-support" },
    ],
  },
  ja: {
    title: "福岡で、\nどの不動産サービスを\nお探しですか？",
    intro: "4つのサービスは、いずれも無料でご相談いただけます。状況に近いものをお選びください。",
    suitable: "対象",
    jumpLabel: "サービス一覧",
    action: "詳しく見る",
    items: [
      { key: "rent", title: "賃貸", audience: "住まい探し・福岡への転居", description: "住居、オフィス、店舗の賃貸。海外からでもご相談いただけます。", route: "/services/rent" },
      { key: "buy-sell", title: "不動産売買", audience: "福岡での購入・売却をご検討の方", description: "購入は物件探しと物件の確認をお手伝いし、売却は物件の現況と進め方からご相談いただけます。", route: "/services/buy-sell" },
      { key: "property-management", title: "物件管理", audience: "賃貸物件・別荘のオーナー様", description: "賃貸管理と、別荘など普段お住まいでない物件の定期確認。", route: "/services/property-management" },
      { key: "living-support", title: "生活サポート", audience: "福岡が初めての方、日本語に不安がある方", description: "電気・ガス・水道、区役所、携帯電話、銀行口座などの手続きに、スタッフが同行します。", route: "/services/living-support" },
    ],
  },
  en: {
    title: "Which Fukuoka\nreal-estate service\ndo you need?",
    intro: "Every service starts with a free consultation. Choose the one closest to your situation.",
    suitable: "For",
    jumpLabel: "Our services",
    action: "Learn more",
    items: [
      { key: "rent", title: "Rental", audience: "Finding a home or moving to Fukuoka", description: "Homes, offices, and commercial space. You can start from overseas.", route: "/services/rent" },
      { key: "buy-sell", title: "Buy & Sell", audience: "Buying in Fukuoka or selling a Fukuoka property", description: "For buyers, we help find and check properties; for sellers, we start by discussing the property's condition and how to sell.", route: "/services/buy-sell" },
      { key: "property-management", title: "Property Management", audience: "Owners of rental property or a holiday home", description: "Rental management, plus periodic checks for holiday homes and other second homes.", route: "/services/property-management" },
      { key: "living-support", title: "Living Support", audience: "New to Fukuoka or not comfortable in Japanese", description: "Our staff go with you to set up utilities, ward office registration, a phone and a bank account.", route: "/services/living-support" },
    ],
  },
};

type Item = { title: string; body: string };
type Panel = { title: string; body?: string; points: string[] };

/** Hero and closing copy, shared by every service page. */
export type ServiceHeroCopy = {
  title: string;
  metaTitle: string;
  description: string;
  highlights: string[];
  imageNote?: string;
  ctaTitle: string;
  ctaBody: string;
};

/** Body sections of the standard service template (Living Support has its own body: data/living-support.ts). */
export type ServiceDetailCopy = ServiceHeroCopy & {
  audienceTitle: string;
  audiences: Item[];
  helpTitle: string;
  helpIntro: string;
  panels: Panel[];
  helpNote?: string;
  processTitle: string;
  process: Item[];
  prepareTitle: string;
  prepareIntro: string;
  preparation: Item[];
  tool?: { href: string; label: string };
  limitsTitle: string;
  limits: string[];
};

export const serviceDetailCopy: { [K in ServiceKey]: Record<Locale, K extends "living-support" ? ServiceHeroCopy : ServiceDetailCopy> } = {
  rent: {
    "zh-TW": {
      title: "租屋服務",
      metaTitle: "福岡租屋服務",
      description: "在福岡找住宅、辦公室或店舖，可以中文、廣東話、日語或英語與我們溝通。人在海外，也可以先開始諮詢。",
      highlights: ["住宅", "辦公室", "商業空間"],
      imageNote: "圖片為示意圖，並非實際出租物件。",
      audienceTitle: "這項服務適合",
      audiences: [
        { title: "準備搬到福岡", body: "想按地區、通勤、租金與入住時間找房。" },
        { title: "已在日本居住", body: "因搬家或換工作地點，需要尋找新住處。" },
        { title: "人在海外", body: "想先了解申請條件、所需文件與可以怎樣安排。" },
      ],
      helpTitle: "我們可以協助的事",
      helpIntro: "我們會說明程序與申請條件，並與出租方或管理公司聯絡。",
      panels: [
        { title: "住宅", body: "公寓、獨立住宅及其他居住物件。", points: ["按地區、通勤與預算物色", "說明申請條件與所需文件"] },
        { title: "辦公室", body: "按地點、面積、人數與用途物色。", points: ["整理辦公用途與條件", "聯絡出租方或管理公司"] },
        { title: "商業空間", body: "店舖及其他商業空間。", points: ["逐一確認用途限制", "說明申請及契約文件"] },
      ],
      processTitle: "租屋流程",
      process: [
        { title: "確認條件", body: "整理地區、預算、用途、入住時間及申請人情況。" },
        { title: "搜尋物件", body: "物色合適物件，並確認各物件的申請條件。" },
        { title: "提交申請", body: "準備所需文件並提交申請。" },
        { title: "簽約與入住", body: "審查通過後，確認契約、費用及入住日期。" },
      ],
      prepareTitle: "找房前可以先準備",
      prepareIntro: "首次諮詢時，提供目前已確定的資料即可，其餘可以之後補上。",
      preparation: [
        { title: "希望條件", body: "地區、預算、入住日期與用途" },
        { title: "申請人資料", body: "入住人數、工作及在留情況" },
        { title: "特別需要", body: "寵物、停車位或必要設備" },
        { title: "目前所在地", body: "人在日本或海外" },
      ],
      tool: { href: "/tools/rental-initial-cost", label: "估算租屋初期費用" },
      limitsTitle: "事先說明",
      limits: [
        "租屋申請由出租方或管理公司審查；如需租賃保證公司，也須通過其審查。我們無法保證審查結果。",
        "可租物件、申請條件及所需文件，會因物件而不同。",
      ],
      ctaTitle: "正在福岡找房？",
      ctaBody: "告訴我們希望的地區、預算和入住時間。資料尚未備齊，也可以先聯絡我們。",
    },
    ja: {
      title: "賃貸",
      metaTitle: "福岡の賃貸サポート",
      description: "福岡で住まい・オフィス・店舗を探す方を、中国語・広東語・日本語・英語でサポートします。海外からでもご相談いただけます。",
      highlights: ["住居", "オフィス", "店舗・事業用"],
      imageNote: "画像はイメージです。実際の募集物件ではありません。",
      audienceTitle: "このような方に",
      audiences: [
        { title: "福岡へ転居予定の方", body: "エリア、通勤、賃料、入居時期から探したい方。" },
        { title: "日本国内で住み替える方", body: "引越しや勤務先の変更で、新しい住まいが必要な方。" },
        { title: "海外にお住まいの方", body: "申込条件や必要書類、進め方を先に確認したい方。" },
      ],
      helpTitle: "当社がお手伝いできること",
      helpIntro: "手続きと申込条件をご説明し、貸主・管理会社との連絡を行います。",
      panels: [
        { title: "住居", body: "マンション、戸建て、その他の居住用物件。", points: ["エリア・通勤・予算から物件探し", "申込条件と必要書類のご説明"] },
        { title: "オフィス", body: "場所、面積、人数、用途から探します。", points: ["用途と条件の整理", "貸主・管理会社との連絡"] },
        { title: "店舗・事業用", body: "店舗などの事業用物件。", points: ["用途制限を物件ごとに確認", "申込・契約書類のご説明"] },
      ],
      processTitle: "賃貸の流れ",
      process: [
        { title: "条件の確認", body: "エリア、予算、用途、入居時期、申込者の状況を整理します。" },
        { title: "物件探し", body: "物件を探し、それぞれの申込条件を確認します。" },
        { title: "お申込み", body: "必要書類を準備して申し込みます。" },
        { title: "ご契約・ご入居", body: "審査通過後、契約内容・費用・入居日を確認します。" },
      ],
      prepareTitle: "物件探しの前に",
      prepareIntro: "初回のご相談では、決まっている範囲の情報で構いません。",
      preparation: [
        { title: "希望条件", body: "エリア、予算、入居日、用途" },
        { title: "申込者情報", body: "入居人数、お勤め先、在留状況" },
        { title: "特別なご希望", body: "ペット、駐車場、必要な設備" },
        { title: "現在地", body: "日本国内か海外か" },
      ],
      tool: { href: "/tools/rental-initial-cost", label: "賃貸の初期費用を概算する" },
      limitsTitle: "事前にご確認ください",
      limits: [
        "入居審査は貸主または管理会社が行い、保証会社を利用する場合はその審査もあります。審査結果はお約束できません。",
        "募集状況、申込条件、必要書類は物件ごとに異なります。",
      ],
      ctaTitle: "福岡で賃貸物件をお探しですか？",
      ctaBody: "希望エリア、予算、入居時期をお知らせください。資料がすべて揃っていなくても、まずはご相談ください。",
    },
    en: {
      title: "Rental",
      metaTitle: "Renting in Fukuoka",
      description: "Find a home, office, or shop in Fukuoka with support in Mandarin, Cantonese, Japanese, or English. You can start from overseas.",
      highlights: ["Homes", "Offices", "Commercial space"],
      imageNote: "Illustrative image, not an actual listing.",
      audienceTitle: "Who this is for",
      audiences: [
        { title: "Moving to Fukuoka", body: "Searching by area, commute, rent, and move-in date." },
        { title: "Already living in Japan", body: "Need a new place after a move or a change of workplace." },
        { title: "Starting from overseas", body: "Want to understand application conditions, documents, and next steps first." },
      ],
      helpTitle: "How we help",
      helpIntro: "We explain the process and application conditions, and liaise with the landlord or management company.",
      panels: [
        { title: "Homes", body: "Apartments, houses, and other residential property.", points: ["Search by area, commute, and budget", "Explain conditions and documents"] },
        { title: "Offices", body: "Searched by location, floor area, team size, and use.", points: ["Clarify use and requirements", "Liaise with landlords and managers"] },
        { title: "Commercial space", body: "Shops and other business premises.", points: ["Check permitted uses for each property", "Explain application and contract documents"] },
      ],
      processTitle: "How renting works",
      process: [
        { title: "Confirm your criteria", body: "Area, budget, use, move-in date, and applicant details." },
        { title: "Search", body: "Find suitable properties and check each one's application conditions." },
        { title: "Apply", body: "Prepare the documents and submit the application." },
        { title: "Sign and move in", body: "After screening, confirm the contract, costs, and move-in date." },
      ],
      prepareTitle: "Before you start",
      prepareIntro: "For a first consultation, share whatever is already decided. The rest can follow.",
      preparation: [
        { title: "Preferences", body: "Area, budget, move-in date, and use" },
        { title: "Applicant details", body: "Occupants, employment, and residence status" },
        { title: "Specific needs", body: "Pets, parking, or essential equipment" },
        { title: "Current location", body: "In Japan or overseas" },
      ],
      tool: { href: "/tools/rental-initial-cost", label: "Estimate initial rental costs" },
      limitsTitle: "Good to know",
      limits: [
        "The landlord or management company screens each application, and a guarantee company may also need to approve it. We cannot guarantee the outcome.",
        "Availability, conditions, and required documents vary by property.",
      ],
      ctaTitle: "Looking for a place in Fukuoka?",
      ctaBody: "Tell us your preferred area, budget, and move-in timing. You can contact us before you have all the details ready.",
    },
  },
  "buy-sell": {
    "zh-TW": {
      title: "房產買賣",
      metaTitle: "福岡房產買賣",
      description: "計劃在福岡買房，或考慮出售福岡的物業，都可以從整理條件與資料開始，由宅地建物取引士提供專業支援。",
      highlights: ["買房", "賣房"],
      imageNote: "圖片為福岡住宅區情境，並非指定出售物業。",
      audienceTitle: "這項服務適合",
      audiences: [
        { title: "準備在福岡買房", body: "希望按用途、預算、地區與時間開始物色物件。" },
        { title: "考慮出售福岡物業", body: "需要先整理物業現況、權利資料與希望出售的時間。" },
        { title: "人在海外", body: "想了解文件、日文溝通及現地安排可以怎樣處理。" },
      ],
      helpTitle: "買房與賣房，兩條路徑",
      helpIntro: "買房和賣房的準備不同，我們會按您的情況分開整理。",
      panels: [
        { title: "買房", body: "確認用途、預算、希望地區及時間，再整理物件搜尋與交易準備。", points: ["整理購買條件", "物色及確認物件資料", "安排看房與交易相關溝通"] },
        { title: "賣房", body: "確認物業現況、現有文件及希望條件，再討論可行的出售安排。", points: ["整理物業資料與現況", "討論出售條件與時間", "協助交易相關溝通"] },
      ],
      processTitle: "一般流程",
      process: [
        { title: "初步確認", body: "說明是買房還是賣房，以及預算（買房）或物業資料（賣房）和預計時間。" },
        { title: "整理資料", body: "確認物業資訊、現況及需要補充的文件。" },
        { title: "協調條件", body: "進行物件搜尋、看房或出售安排，並處理相關溝通。" },
        { title: "簽約與交付", body: "條件確認後，按契約完成結算、登記及交付。" },
      ],
      prepareTitle: "諮詢前可準備的資料",
      prepareIntro: "不必一次備齊，先提供手上已有的內容即可。",
      preparation: [
        { title: "買房需要", body: "用途、整體預算、希望地區與預計時間" },
        { title: "出售物業", body: "地址、類型、目前使用狀況與希望時間" },
        { title: "現有文件", body: "身分、資金、權利或管理相關資料" },
        { title: "目前所在地", body: "人在日本或海外，以及方便的聯絡方式" },
      ],
      tool: { href: "/tools/purchase-cost", label: "估算買房費用" },
      limitsTitle: "事先說明",
      limits: [
        "貸款由金融機構審查；售價與出售時間無法預先保證。",
        "物業供應、價格及交易條件可能變動。",
        "稅務、法律及登記事項，需由相應的專業人士確認。",
      ],
      ctaTitle: "想在福岡買房或賣房？",
      ctaBody: "告訴我們您是準備買房還是賣房，以及目前已確定的條件。",
    },
    ja: {
      title: "不動産売買",
      metaTitle: "福岡の不動産売買",
      description: "福岡での購入、または福岡の物件の売却をご検討の方へ。条件と資料の整理から、宅地建物取引士がサポートします。",
      highlights: ["購入", "売却"],
      imageNote: "写真は福岡の住宅街のイメージで、特定の販売物件ではありません。",
      audienceTitle: "このような方に",
      audiences: [
        { title: "福岡で購入をご検討の方", body: "目的、予算、エリア、時期から物件を探したい方。" },
        { title: "福岡の物件の売却をご検討の方", body: "物件の状況、権利関係の資料、希望時期を整理したい方。" },
        { title: "海外から進めたい方", body: "書類、日本語でのやり取り、現地での対応を確認したい方。" },
      ],
      helpTitle: "購入と売却、それぞれの進め方",
      helpIntro: "購入と売却では準備が異なるため、状況に合わせて分けて整理します。",
      panels: [
        { title: "購入", body: "目的、予算、希望エリア、時期を確認し、物件探しと取引の準備を進めます。", points: ["購入条件の整理", "物件探しと物件情報の確認", "内見と取引に関する連絡・調整"] },
        { title: "売却", body: "物件の状況、お手元の資料、希望条件を確認し、売却の進め方をご相談します。", points: ["物件資料と現況の整理", "売却条件・時期のご相談", "取引に関する連絡・調整"] },
      ],
      processTitle: "一般的な流れ",
      process: [
        { title: "初回確認", body: "購入か売却か、予算（購入の場合）または物件情報（売却の場合）、ご希望の時期を伺います。" },
        { title: "資料の整理", body: "物件情報、現況、追加で必要な書類を確認します。" },
        { title: "条件の調整", body: "物件探し、内見、売却準備と、関係者との連絡を進めます。" },
        { title: "契約・引渡し", body: "条件確定後、契約に沿って決済、登記、引渡しを行います。" },
      ],
      prepareTitle: "ご相談前にご用意いただくもの",
      prepareIntro: "すべて揃っていなくても、お手元の情報からご相談いただけます。",
      preparation: [
        { title: "購入のご希望", body: "目的、総予算、希望エリア、時期" },
        { title: "売却物件", body: "所在地、種別、利用状況、希望時期" },
        { title: "お手元の資料", body: "本人確認、資金、権利、管理に関する資料" },
        { title: "現在地", body: "日本国内か海外か、ご都合のよい連絡方法" },
      ],
      tool: { href: "/tools/purchase-cost", label: "購入費用を概算する" },
      limitsTitle: "事前にご確認ください",
      limits: [
        "融資の可否は金融機関が審査します。売却価格や売却時期はお約束できません。",
        "物件、価格、取引条件は変わる場合があります。",
        "税務、法律、登記については、各専門家による確認が必要です。",
      ],
      ctaTitle: "福岡での購入・売却をご検討ですか？",
      ctaBody: "購入か売却か、また現時点で決まっている条件をお知らせください。",
    },
    en: {
      title: "Buy & Sell",
      metaTitle: "Buying and Selling Property in Fukuoka",
      description: "Whether you plan to buy in Fukuoka or sell a Fukuoka property, we start by organising your criteria and documents, with support from a Licensed Real Estate Transaction Specialist.",
      highlights: ["Buying", "Selling"],
      imageNote: "The photograph shows a Fukuoka neighbourhood, not a property for sale.",
      audienceTitle: "Who this is for",
      audiences: [
        { title: "Buying in Fukuoka", body: "Start a search around your purpose, budget, preferred area, and timing." },
        { title: "Selling in Fukuoka", body: "Organise the property's condition, ownership records, and preferred timing." },
        { title: "Based overseas", body: "Understand how documents, Japanese communication, and local arrangements will work." },
      ],
      helpTitle: "Two paths: buying and selling",
      helpIntro: "Buying and selling need different preparation, so we organise each separately around your situation.",
      panels: [
        { title: "Buying", body: "We confirm your purpose, budget, area, and timing, then organise the search and transaction preparation.", points: ["Clarify buying criteria", "Find properties and verify their details", "Coordinate viewings and transaction communication"] },
        { title: "Selling", body: "We review the property's condition, existing documents, and your preferred terms, then discuss how to approach the sale.", points: ["Organise property records and condition", "Discuss sale terms and timing", "Coordinate transaction communication"] },
      ],
      processTitle: "The usual process",
      process: [
        { title: "Initial review", body: "Tell us whether you are buying or selling, your budget (buying) or property details (selling), and your timing." },
        { title: "Organise information", body: "Confirm property records, current condition, and any missing documents." },
        { title: "Coordinate terms", body: "Searches, viewings, or sale preparation, plus communication with other parties." },
        { title: "Contract and handover", body: "Once terms are agreed, complete settlement, registration, and handover under the contract." },
      ],
      prepareTitle: "What to prepare",
      prepareIntro: "You don't need everything ready. Start with what you have.",
      preparation: [
        { title: "Buying criteria", body: "Purpose, total budget, preferred area, and timing" },
        { title: "Property to sell", body: "Address, type, current use, and preferred timing" },
        { title: "Documents on hand", body: "Identity, funding, ownership, or management records" },
        { title: "Current location", body: "In Japan or overseas, and how best to reach you" },
      ],
      tool: { href: "/tools/purchase-cost", label: "Estimate purchase costs" },
      limitsTitle: "Good to know",
      limits: [
        "Lenders decide on financing; sale price and timing cannot be guaranteed.",
        "Availability, price, and terms may change.",
        "Tax, legal, and registration matters must be confirmed by the relevant professionals.",
      ],
      ctaTitle: "Buying or selling in Fukuoka?",
      ctaBody: "Tell us whether you plan to buy or sell, and the conditions already decided.",
    },
  },
  "property-management": {
    "zh-TW": {
      title: "物業管理",
      metaTitle: "福岡物業管理",
      description: "您不在福岡時，由我們按約定範圍處理出租物業或度假別墅的日常事項，並定期向您回報。",
      highlights: ["出租物業管理", "第二居所管理"],
      audienceTitle: "這項服務適合",
      audiences: [
        { title: "出租物業業主", body: "需要有人處理招租、入住、收租、租客聯絡及物業問題。" },
        { title: "度假別墅業主", body: "不常在福岡，需要定期查看物業狀況。" },
        { title: "海外業主", body: "需要一個在日本、可以聯絡及處理日常事項的窗口。" },
      ],
      helpTitle: "兩類管理服務",
      helpIntro: "出租物業與不常居住的物業，需要的工作不同，會分開確認。",
      panels: [
        { title: "出租物業管理", body: "適用於已出租或準備出租的物業。", points: ["尋找租客", "申請審查與入住協調", "收取租金與租客聯絡", "維修及問題處理", "入住與退租安排"] },
        { title: "度假別墅等第二居所管理", body: "適用於度假別墅，或其他不常居住的物業。", points: ["按約定頻率定期查看物業", "處理已委託的基本事項", "擔任固定資產稅・都市計畫稅的納稅管理人：代收稅單及代為繳納（不包括報稅或稅務諮詢）"] },
      ],
      helpNote: "物業狀況、查看頻率、費用及回報方式，會在開始前與您逐項確認。",
      processTitle: "管理如何進行",
      process: [
        { title: "確認物業與委託範圍", body: "了解物業狀況，以及您希望委託的工作。" },
        { title: "建立聯絡與紀錄", body: "整理業主、租客、管理組合（大廈業主管理組織）及維修方的聯絡方式。" },
        { title: "日常處理", body: "按委託範圍處理收款、聯絡及物業問題。" },
        { title: "定期回報", body: "按約定回報管理情況，以及需要您決定的事項。" },
      ],
      prepareTitle: "評估時需要的資料",
      prepareIntro: "先告訴我們物業、目前的管理安排，以及希望交給我們處理的事項。",
      preparation: [
        { title: "物業資料", body: "地址、類型、房號及使用狀況" },
        { title: "租賃資料", body: "租約、租客及收款狀況" },
        { title: "現有聯絡方", body: "管理組合、保險、維修等" },
        { title: "希望委託範圍", body: "工作內容、頻率及回報方式" },
      ],
      limitsTitle: "事先說明",
      limits: [
        "管理內容、費用及頻率，需另行約定。",
        "大型工程、稅務、法律等專業服務，不會自動包括在管理範圍內。",
        "代付款項或額外服務，須雙方事先書面同意，並預備所需資金。",
      ],
      ctaTitle: "需要福岡物業管理？",
      ctaBody: "提供物業地址、目前使用狀況及希望委託的事項，我們會先確認可以處理的範圍。",
    },
    ja: {
      title: "物件管理",
      metaTitle: "福岡の物件管理",
      description: "オーナー様が福岡にいなくても、合意した範囲で賃貸物件や別荘の日常業務を行い、定期的にご報告します。",
      highlights: ["賃貸管理", "セカンドハウス管理"],
      audienceTitle: "このような方に",
      audiences: [
        { title: "賃貸物件のオーナー様", body: "募集、入居、賃料、入居者対応、物件トラブルへの対応が必要な方。" },
        { title: "別荘・セカンドハウスのオーナー様", body: "普段は福岡にいないため、定期的な確認が必要な方。" },
        { title: "海外在住のオーナー様", body: "日本国内で連絡・対応できる窓口が必要な方。" },
      ],
      helpTitle: "二つの管理サービス",
      helpIntro: "賃貸物件と、普段使っていない物件では必要な業務が異なるため、分けて確認します。",
      panels: [
        { title: "賃貸管理", body: "賃貸中、または賃貸予定の物件が対象です。", points: ["入居者募集", "入居審査・入居調整", "賃料回収・入居者との連絡", "修繕・トラブル対応", "入退去の対応"] },
        { title: "セカンドハウス管理", body: "別荘など、普段お住まいでない物件が対象です。", points: ["取り決めた頻度での定期確認", "ご依頼いただいた基本的な管理業務", "固定資産税・都市計画税の納税管理人：納税通知書の受領と納付の代行（税務申告・税務相談は含みません）"] },
      ],
      helpNote: "物件の状況、確認の頻度、費用、報告方法は、開始前に一つずつ確認します。",
      processTitle: "管理の進め方",
      process: [
        { title: "物件と委託内容の確認", body: "物件の状況と、ご依頼したい業務を伺います。" },
        { title: "連絡先と記録の整理", body: "オーナー様、入居者、管理組合、修繕業者などの連絡先を整理します。" },
        { title: "日常の対応", body: "委託範囲内で、賃料回収、連絡、物件のトラブルに対応します。" },
        { title: "定期報告", body: "管理の状況と、ご判断が必要な事項をご報告します。" },
      ],
      prepareTitle: "ご検討時に必要な情報",
      prepareIntro: "物件、現在の管理状況、当社にご依頼したい内容をお知らせください。",
      preparation: [
        { title: "物件情報", body: "所在地、種別、部屋番号、利用状況" },
        { title: "賃貸情報", body: "賃貸借契約、入居者、賃料の状況" },
        { title: "現在の連絡先", body: "管理組合、保険、修繕業者など" },
        { title: "ご希望の範囲", body: "業務内容、頻度、報告方法" },
      ],
      limitsTitle: "事前にご確認ください",
      limits: [
        "管理内容、費用、頻度は別途取り決めが必要です。",
        "大規模な工事や、税務・法律などの専門業務は、管理業務に自動的には含まれません。",
        "立替払いや追加業務には、事前の書面合意と必要資金のご用意が必要です。",
      ],
      ctaTitle: "福岡の物件管理をご検討ですか？",
      ctaBody: "所在地、現在の利用状況、ご依頼したい内容をお知らせください。対応できる範囲をまず確認します。",
    },
    en: {
      title: "Property Management",
      metaTitle: "Property Management in Fukuoka",
      description: "When you can't be in Fukuoka, we handle day-to-day matters for your rental property or holiday home within the agreed scope, and report back regularly.",
      highlights: ["Rental management", "Second-home management"],
      audienceTitle: "Who this is for",
      audiences: [
        { title: "Rental property owners", body: "Need help with tenant finding, move-ins, rent, tenant contact, and property issues." },
        { title: "Holiday and second-home owners", body: "Rarely in Fukuoka and need regular checks on the property." },
        { title: "Owners overseas", body: "Need a Japan-based contact for day-to-day property matters." },
      ],
      helpTitle: "Two kinds of management",
      helpIntro: "Rental property and homes that are rarely occupied need different work, so we scope them separately.",
      panels: [
        { title: "Rental property management", body: "For property that is let or about to be let.", points: ["Tenant finding", "Screening and move-in coordination", "Rent collection and tenant contact", "Repairs and issue handling", "Move-ins and move-outs"] },
        { title: "Second-home management", body: "For holiday homes and other property you don't live in regularly.", points: ["Periodic checks at the agreed frequency", "Basic tasks you have entrusted to us", "Acting as your tax agent for fixed asset tax and city planning tax: receiving the tax notices and paying on your behalf (tax filing and tax advice are not included)"] },
      ],
      helpNote: "The property's condition, check frequency, fees, and reporting are confirmed with you item by item before work begins.",
      processTitle: "How management works",
      process: [
        { title: "Confirm property and scope", body: "We review the property and the tasks you want to delegate." },
        { title: "Set up contacts and records", body: "Contacts for you, the tenant, the owners' association (the building's management body) and repair contractors." },
        { title: "Day-to-day handling", body: "Rent, communication, and property issues within the agreed scope." },
        { title: "Regular reports", body: "Status updates and any decisions we need from you." },
      ],
      prepareTitle: "For an initial review",
      prepareIntro: "Tell us about the property, the current management arrangement, and what you would like us to handle.",
      preparation: [
        { title: "Property details", body: "Address, type, unit number, and current use" },
        { title: "Rental details", body: "Lease, tenant, and rent status" },
        { title: "Existing contacts", body: "Owners' association, insurance, and repair contacts" },
        { title: "Scope you want", body: "Tasks, frequency, and reporting" },
      ],
      limitsTitle: "Good to know",
      limits: [
        "Scope, fees, and frequency are agreed separately.",
        "Major works and specialist services such as tax or legal advice are not automatically included.",
        "Payments on your behalf or extra services require prior written agreement and the necessary funds.",
      ],
      ctaTitle: "Need management support in Fukuoka?",
      ctaBody: "Share the address, current use, and tasks you want managed. We will first confirm what we can take on.",
    },
  },
  "living-support": {
    "zh-TW": {
      title: "生活支援",
      metaTitle: "福岡生活支援｜入住手續陪同辦理",
      description: "剛到福岡、日語不方便？水電瓦斯、區役所、手機和銀行開戶等入住手續，由我們的員工陪同辦理。",
      highlights: ["員工陪同辦理", "中文・廣東話溝通", "任何人都可以申請"],
      ctaTitle: "需要有人陪你辦手續？",
      ctaBody: "告訴我們需要的項目、日期和地點，我們會先提供報價。",
    },
    ja: {
      title: "生活サポート",
      metaTitle: "福岡の生活サポート｜入居手続きの同行",
      description: "福岡が初めての方、日本語に不安がある方へ。電気・ガス・水道、区役所、携帯電話、銀行口座などの手続きに、当社スタッフが同行します。",
      highlights: ["スタッフが同行", "中国語・広東語に対応", "どなたでもお申し込み可能"],
      ctaTitle: "手続きの同行が必要ですか？",
      ctaBody: "必要な項目、日程、場所をお知らせください。まずお見積もりをお出しします。",
    },
    en: {
      title: "Living Support",
      metaTitle: "Living Support in Fukuoka | Help with Move-in Procedures",
      description: "New to Fukuoka, or not comfortable in Japanese? Our staff go with you to set up utilities, ward office registration, a phone and a bank account.",
      highlights: ["Our staff go with you", "Mandarin and Cantonese spoken", "Open to anyone"],
      ctaTitle: "Need someone to go with you?",
      ctaBody: "Tell us what you need help with, when and where, and we will send you a quote first.",
    },
  },
};

export const serviceUiCopy: Record<Locale, {
  services: string;
  consultation: string;
  line: string;
  call: string;
  checklist: string;
  otherServices: string;
  view: string;
  guidesTitle: string;
  allGuides: string;
}> = {
  "zh-TW": { services: "服務", consultation: "免費諮詢", line: "LINE 聯絡", call: "致電", checklist: "諮詢前準備清單", otherServices: "其他服務", view: "查看", guidesTitle: "諮詢前可以先了解", allGuides: "查看所有指南" },
  ja: { services: "サービス", consultation: "無料相談", line: "LINEで相談", call: "電話で相談", checklist: "ご相談前チェックリスト", otherServices: "その他のサービス", view: "詳しく見る", guidesTitle: "関連ガイド", allGuides: "ガイド一覧" },
  en: { services: "Services", consultation: "Free Consultation", line: "Chat on LINE", call: "Call us", checklist: "Pre-consultation checklist", otherServices: "Other services", view: "View", guidesTitle: "Helpful guides", allGuides: "All guides" },
};
