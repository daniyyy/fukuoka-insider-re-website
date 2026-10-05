import type { Locale } from "@/config/site";


type AboutCopy = {
  title: string;
  metaTitle: string;
  intro: string;
  photoCaption: string;
  castleAlt: string;
  castleCaption: string;
  storyTitle: string;
  story: string[];
  peopleTitle: string;
  rickyRole: string;
  rickyBody: string;
  dannyRole: string;
  dannyBody: string;
  profileTitle: string;
  profile: {
    company: string; established: string; representative: string; address: string; access: string;
    licence: string; association: string; business: string; businessValue: string; languages: string;
    hours: string; closed: string; contact: string; instagram: string;
  };
  mapCta: string;
  ctaTitle: string;
  ctaBody: string;
};

export const aboutCopy: Record<Locale, AboutCopy> = {
  "zh-TW": {
    title: "在福岡營運的\n房地產公司",
    metaTitle: "關於我們",
    intro: "株式会社Fukuoka Insider 在福岡市中央區設有辦公室，為日本及海外客戶提供租屋、房產買賣、物業管理與生活支援。",
    photoCaption: "福岡市中央區大手門的辦公室",
    castleAlt: "福岡城跡的石垣與護城河",
    castleCaption: "辦公室所在的大手門一帶，鄰近福岡城跡（舞鶴公園）。",
    storyTitle: "在福岡，替您處理房地產事務",
    story: [
      "Fukuoka Insider 的辦公室位於福岡市中央區，處理租屋、房產買賣、物業管理及生活支援。",
      "如果您不熟悉日本的租屋或買賣程序，我們會先說明可以協助的事項、需要先提供的資料，以及哪些部分需要另向專業人士確認。",
    ],
    peopleTitle: "我們的團隊",
    rickyRole: "代表取締役",
    rickyBody: "來自香港，曾在多個國家生活和工作，最後選擇定居福岡。初到日本時，他親身經歷過簽證、找房和創業手續的種種難處，因此希望來到福岡的人都能得到可靠、實在的支援。現負責 Fukuoka Insider 的公司營運與品牌發展。",
    dannyRole: "宅地建物取引士",
    dannyBody: "香港出身、定居福岡，持有宅地建物取引士資格。負責租屋、買賣及物業管理的實務，從找房、申請到簽約和入住，都可以用中文、廣東話、日語或英語直接溝通。",
    profileTitle: "公司概要",
    profile: {
      company: "公司名稱", established: "設立", representative: "代表", address: "地址", access: "交通",
      licence: "宅地建物取引業免許", association: "所屬團體", business: "業務內容", businessValue: "租屋、房產買賣、物業管理、生活支援",
      languages: "溝通語言", hours: "營業時間", closed: "休息日", contact: "聯絡", instagram: "Instagram",
    },
    mapCta: "在 Google 地圖開啟",
    ctaTitle: "可用中文、廣東話、日語或英語聯絡",
    ctaBody: "用您習慣的語言告訴我們需要。資料尚未備齊，也可以先聯絡我們。",
  },
  ja: {
    title: "福岡を拠点とする\n不動産会社",
    metaTitle: "会社概要",
    intro: "株式会社Fukuoka Insider は福岡市中央区に事務所を構え、日本国内外のお客様に賃貸・不動産売買・物件管理・生活サポートを提供しています。",
    photoCaption: "福岡市中央区大手門の事務所",
    castleAlt: "福岡城跡の石垣と堀",
    castleCaption: "事務所のある大手門は、福岡城跡（舞鶴公園）の近くです。",
    storyTitle: "福岡で、不動産のご相談に対応しています",
    story: [
      "Fukuoka Insider の事務所は福岡市中央区にあり、賃貸、不動産売買、物件管理、生活サポートを扱っています。",
      "日本の賃貸・売買手続きに不慣れな方には、当社で対応できること、最初にご用意いただく情報、別の専門家への確認が必要な事項をご説明します。",
    ],
    peopleTitle: "私たちのチーム",
    rickyRole: "代表取締役",
    rickyBody: "香港出身。複数の国で暮らし、働いたのち、福岡に定住しました。来日当初、ビザ、住まい探し、起業手続きなど、外国人が直面する難しさを自ら経験したことから、福岡に来る方が信頼できる支援を受けられるようにしたいと考えています。現在は会社の運営とブランドづくりを担当しています。",
    dannyRole: "宅地建物取引士",
    dannyBody: "香港出身、福岡在住の宅地建物取引士。賃貸・売買・物件管理の実務を担当し、物件探しから申込、契約、入居まで、中国語・広東語・日本語・英語で直接ご対応します。",
    profileTitle: "会社概要",
    profile: {
      company: "商号", established: "設立", representative: "代表", address: "所在地", access: "アクセス",
      licence: "宅地建物取引業免許", association: "所属団体", business: "事業内容", businessValue: "賃貸、不動産売買、物件管理、生活サポート",
      languages: "対応言語", hours: "営業時間", closed: "定休日", contact: "連絡先", instagram: "Instagram",
    },
    mapCta: "Google マップで開く",
    ctaTitle: "中国語・広東語・日本語・英語でご相談いただけます",
    ctaBody: "使い慣れた言語で、ご希望をお聞かせください。資料がすべて揃っていなくても、まずはご相談ください。",
  },
  en: {
    title: "A real-estate company\nbased in Fukuoka",
    metaTitle: "About Us",
    intro: "Fukuoka Insider Co., Ltd. has an office in Chuo-ku, Fukuoka, and helps clients in Japan and overseas with rentals, buying and selling, property management, and living support.",
    photoCaption: "Our office in Ōtemon, Chuo-ku, Fukuoka",
    castleAlt: "The stone walls and moat of the Fukuoka Castle ruins",
    castleCaption: "Our office in Ōtemon is close to the Fukuoka Castle ruins (Maizuru Park).",
    storyTitle: "Handling property matters in Fukuoka for you",
    story: [
      "Fukuoka Insider has an office in Chuo-ku, Fukuoka, and handles rentals, property transactions, property management, and living support.",
      "If Japanese rental or purchase procedures are new to you, we first explain what we can handle, what information to share, and what needs to be confirmed with another professional.",
    ],
    peopleTitle: "Our team",
    rickyRole: "Representative Director",
    rickyBody: "Originally from Hong Kong, Ricky lived and worked in several countries before settling in Fukuoka. Having faced the visa, housing and business-setup hurdles that newcomers to Japan meet, he wants everyone arriving in Fukuoka to have support they can rely on. He leads the company's operations and brand development.",
    dannyRole: "Licensed Real Estate Transaction Specialist",
    dannyBody: "Born in Hong Kong and based in Fukuoka, Danny is a Licensed Real Estate Transaction Specialist. He handles rentals, sales and property management day to day, from the search and application through to signing and moving in, working directly in Mandarin, Cantonese, Japanese or English.",
    profileTitle: "Company profile",
    profile: {
      company: "Company", established: "Established", representative: "Representative", address: "Address", access: "Access",
      licence: "Real estate brokerage licence", association: "Association", business: "Services", businessValue: "Rental, buying and selling, property management, living support",
      languages: "Languages", hours: "Office hours", closed: "Closed", contact: "Contact", instagram: "Instagram",
    },
    mapCta: "Open in Google Maps",
    ctaTitle: "Talk to us in Mandarin, Cantonese, Japanese, or English",
    ctaBody: "Tell us what you need in the language you prefer. You can contact us before you have all the details ready.",
  },
};

type ContactCopy = {
  title: string;
  intro: string;
  routesTitle: string;
  form: { title: string; body: string; cta: string; note: string; recommended: string };
  line: { title: string; body: string; cta: string; whatsapp: string };
  direct: { title: string; body: string; phone: string; email: string };
  scan: string;
  prepareTitle: string;
  prepareIntro: string;
  prepare: Array<{ title: string; body: string }>;
  officeTitle: string;
  office: { address: string; access: string; hours: string; closed: string; visits: string; fax: string };
  mapCta: string;
};

export const contactCopy: Record<Locale, ContactCopy> = {
  "zh-TW": {
    title: "聯絡我們",
    intro: "可用中文、廣東話、日語或英語與我們聯絡。資料尚未備齊，也可以先聯絡我們。",
    routesTitle: "選擇聯絡方式",
    form: { title: "房地產諮詢表", body: "適合說明物業與需求詳情。我們確認可以協助的範圍後，會再聯絡您；首次諮詢不必備齊文件。", cta: "填寫免費諮詢表", note: "會在新視窗開啟諮詢表。", recommended: "建議" },
    line: { title: "LINE・WhatsApp", body: "適合簡單提問，或傳送照片與資料。", cta: "LINE 聯絡", whatsapp: "WhatsApp 聯絡" },
    direct: { title: "電話・Email", body: "直接與我們聯絡。", phone: "電話", email: "Email" },
    scan: "用手機掃描",
    prepareTitle: "聯絡時可以先告訴我們",
    prepareIntro: "提供以下資料，我們可以更快了解您的情況。",
    prepare: [
      { title: "需要的服務", body: "租屋、房產買賣、物業管理或生活支援" },
      { title: "主要條件", body: "找房／買房：希望地區、預算及時間；賣房／管理：物業地址與目前情況" },
      { title: "所在地與語言", body: "目前人在日本或海外，以及方便使用的語言" },
      { title: "已有的資料", body: "手上已有的文件；尚未備齊也可以先聯絡" },
    ],
    officeTitle: "辦公室",
    office: { address: "地址", access: "交通", hours: "營業時間", closed: "休息日", visits: "來訪", fax: "傳真" },
    mapCta: "在 Google 地圖開啟",
  },
  ja: {
    title: "お問い合わせ",
    intro: "中国語・広東語・日本語・英語でご相談いただけます。資料がすべて揃っていなくても、まずはご相談ください。",
    routesTitle: "ご連絡方法",
    form: { title: "不動産の相談フォーム", body: "物件やご希望の詳細をお伝えいただく場合に最適です。対応できる範囲を確認のうえ、改めてご連絡します。初回から書類を揃える必要はありません。", cta: "無料相談フォームへ", note: "相談フォームは新しい画面で開きます。", recommended: "おすすめ" },
    line: { title: "LINE・WhatsApp", body: "簡単なご質問や、写真・資料の送付に便利です。", cta: "LINEで相談", whatsapp: "WhatsAppで相談" },
    direct: { title: "電話・メール", body: "直接お問い合わせいただけます。", phone: "電話", email: "メール" },
    scan: "スマートフォンで読み取る",
    prepareTitle: "最初にお知らせいただきたいこと",
    prepareIntro: "次の情報があると、状況をより早く把握できます。",
    prepare: [
      { title: "ご希望のサービス", body: "賃貸、不動産売買、物件管理、生活サポート" },
      { title: "主な条件", body: "賃貸・購入：希望エリア、予算、時期／売却・管理：物件所在地と現況" },
      { title: "現在地と言語", body: "日本国内か海外か、ご希望の言語" },
      { title: "お手元の資料", body: "お持ちの書類。揃っていなくてもご相談いただけます" },
    ],
    officeTitle: "事務所",
    office: { address: "所在地", access: "アクセス", hours: "営業時間", closed: "定休日", visits: "ご来社", fax: "FAX" },
    mapCta: "Google マップで開く",
  },
  en: {
    title: "Contact Us",
    intro: "Talk to us in Mandarin, Cantonese, Japanese, or English. You can contact us before you have all the details ready.",
    routesTitle: "Choose how to reach us",
    form: { title: "Property enquiry form", body: "Best for sharing property and requirement details. We check what we can help with, then contact you. You do not need every document ready for a first consultation.", cta: "Free consultation form", note: "The form opens in a new tab.", recommended: "Recommended" },
    line: { title: "LINE or WhatsApp", body: "Good for quick questions or sending photos and documents.", cta: "Chat on LINE", whatsapp: "Chat on WhatsApp" },
    direct: { title: "Phone and email", body: "Reach us directly.", phone: "Phone", email: "Email" },
    scan: "Scan with your phone",
    prepareTitle: "What to tell us first",
    prepareIntro: "These details help us understand your situation faster.",
    prepare: [
      { title: "Service needed", body: "Rental, buy and sell, property management, or living support" },
      { title: "Key criteria", body: "Renting or buying: area, budget, and timing; selling or management: property address and current status" },
      { title: "Location and language", body: "Whether you are in Japan or overseas, and your preferred language" },
      { title: "Documents on hand", body: "Any documents you already have; you can contact us before gathering them all" },
    ],
    officeTitle: "Office",
    office: { address: "Address", access: "Access", hours: "Office hours", closed: "Closed", visits: "Visits", fax: "Fax" },
    mapCta: "Open in Google Maps",
  },
};


export { legalCopy, type LegalKey } from "@/data/legal-content";
