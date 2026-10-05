import type { Locale } from "@/config/site";

/**
 * Living Support page sections (Danny, 2026-10-05).
 * Six items are handled directly by our own staff; schools, clinics, visa (gyoseishoshi) and job search are
 * partner introductions and must stay labelled as such (03_DECISIONS: never present referrals as direct service).
 * Fees: quoted per item, no amounts on the site; state it plainly only in the FAQ「生活支援怎樣收費？」and hint elsewhere
 * ("we send a quote first") so the page does not repeat it (Danny, 2026-10-05). Anyone can apply.
 * zh-TW is the source; ja/en keep the same structure.
 */
export type LivingIcon = "utilities" | "furniture" | "ward-office" | "phone" | "bank" | "shopping";

type Item = { title: string; body: string };

export type LivingSupportCopy = {
  audienceTitle: string;
  audiences: Item[];
  servicesTitle: string;
  servicesIntro: string;
  /** Rough order of a move: each phase lists the direct services that usually happen then. */
  phases: { label: string; items: (Item & { icon: LivingIcon })[] }[];
  othersTitle: string;
  othersIntro: string;
  othersLink: string;
  partnerLabel: string;
  partners: Item[];
  partnerNote: string;
  processTitle: string;
  process: Item[];
};

export const livingSupportCopy: Record<Locale, LivingSupportCopy> = {
  "zh-TW": {
    audienceTitle: "這項服務適合",
    audiences: [
      { title: "初次來福岡", body: "不熟悉日本的手續，也不知道該從哪裡開始。" },
      { title: "日語溝通不方便", body: "看不懂日文表格，或者不習慣用日語打電話和面對面溝通。" },
      { title: "想省時省力", body: "工作忙碌，希望交給熟悉流程的人代為處理。" },
    ],
    servicesTitle: "服務項目",
    servicesIntro: "以下 6 項由我們的員工直接陪同或處理，按入住前後的次序排列，可以按需要選擇。",
    phases: [
      {
        label: "入住前",
        items: [
          { icon: "utilities", title: "水、電、瓦斯開通", body: "代為聯絡電力、自來水和瓦斯公司，預約瓦斯公司上門開通，並說明帳單的付款方式。" },
          { icon: "furniture", title: "租借家具、家電", body: "按入住日期安排租借家具和家電，搬進去當天就可以開始生活。" },
        ],
      },
      {
        label: "入住後 14 日內",
        items: [
          { icon: "ward-office", title: "區役所手續同行・翻譯", body: "陪同到區役所辦理住民登錄、國民健康保險等手續，並即場翻譯。" },
        ],
      },
      {
        label: "住民登錄後",
        items: [
          { icon: "phone", title: "手機合約", body: "協助比較方案、準備所需文件，並陪同辦理手機合約。" },
          { icon: "bank", title: "銀行開戶同行", body: "陪同到銀行開戶，協助填寫申請表和回答職員的提問。" },
        ],
      },
      {
        label: "入住後隨時",
        items: [
          { icon: "shopping", title: "生活用品購物同行", body: "陪同購買日用品和家居用品，並介紹附近合適的店舖。" },
        ],
      },
    ],
    othersTitle: "其他需要，也可以個別諮詢",
    othersIntro: "以下事項，可以為您介紹合作夥伴。除此以外的需要，也歡迎先聯絡我們，個別商量。",
    othersLink: "個別諮詢",
    partnerLabel: "介紹合作夥伴",
    partners: [
      { title: "學校介紹", body: "子女升學或語言學習，按需要介紹學校。" },
      { title: "診所介紹", body: "介紹可以用英語看診的診所。" },
      { title: "簽證申請・續期", body: "介紹行政書士，協助簽證申請、變更及續期。" },
      { title: "找工作", body: "介紹人才中介（獵頭）。" },
    ],
    partnerNote: "合作夥伴的服務由對方直接提供，費用及條件由對方與您確認。",
    processTitle: "如何申請",
    process: [
      { title: "告訴我們需要的項目", body: "列出需要協助的事項、日期和地點。" },
      { title: "先提供報價", body: "確認內容後提供報價，您同意後才安排。" },
      { title: "安排日期，員工陪同", body: "安排日期後，由我們的員工陪同辦理。" },
    ],
  },
  ja: {
    audienceTitle: "このような方に",
    audiences: [
      { title: "福岡が初めての方", body: "日本の手続きに慣れておらず、何から始めればよいか分からない方。" },
      { title: "日本語に不安がある方", body: "日本語の書類や、電話・窓口でのやり取りが難しい方。" },
      { title: "手間を省きたい方", body: "忙しく、手続きに慣れた人に任せたい方。" },
    ],
    servicesTitle: "サービス内容",
    servicesIntro: "以下の6項目は、当社スタッフが直接同行・対応します。入居前後の順に並べています。必要な項目だけお選びいただけます。",
    phases: [
      {
        label: "入居前",
        items: [
          { icon: "utilities", title: "電気・ガス・水道の開通", body: "電力会社・水道局・ガス会社への連絡やガス開栓の予約を代行し、料金の支払い方法もご説明します。" },
          { icon: "furniture", title: "レンタル家具・家電の手配", body: "入居日に合わせて家具・家電のレンタルを手配し、入居したその日から生活を始められます。" },
        ],
      },
      {
        label: "入居後14日以内",
        items: [
          { icon: "ward-office", title: "区役所の手続き同行・通訳", body: "住民登録や国民健康保険などの手続きに同行し、その場で通訳します。" },
        ],
      },
      {
        label: "住民登録の後",
        items: [
          { icon: "phone", title: "携帯電話の契約サポート", body: "プランの比較や必要書類の準備をお手伝いし、契約に同行します。" },
          { icon: "bank", title: "銀行口座の開設同行", body: "銀行での口座開設に同行し、申込書の記入や窓口でのやり取りをサポートします。" },
        ],
      },
      {
        label: "入居後いつでも",
        items: [
          { icon: "shopping", title: "生活用品の買い物同行", body: "日用品や家庭用品の買い物に同行し、近くの便利なお店もご案内します。" },
        ],
      },
    ],
    othersTitle: "そのほかのご要望も、個別にご相談ください",
    othersIntro: "以下については、提携パートナーをご紹介します。そのほかのご要望も、まずはお気軽にご相談ください。",
    othersLink: "個別に相談する",
    partnerLabel: "パートナーのご紹介",
    partners: [
      { title: "学校のご紹介", body: "お子さまの進学や語学学習に合わせて、学校をご紹介します。" },
      { title: "クリニックのご紹介", body: "英語で受診できるクリニックをご紹介します。" },
      { title: "ビザの申請・更新", body: "行政書士をご紹介し、ビザの申請・変更・更新をサポートします。" },
      { title: "お仕事探し", body: "人材紹介会社をご紹介します。" },
    ],
    partnerNote: "パートナーのサービスは各社が直接提供し、料金や条件は各社からご案内します。",
    processTitle: "お申し込みの流れ",
    process: [
      { title: "必要な項目をお知らせください", body: "サポートが必要な事項、日程、場所をお知らせください。" },
      { title: "まずお見積もり", body: "内容を確認してお見積もりをお出しし、ご同意いただいてから手配します。" },
      { title: "日程を決めて、スタッフが同行", body: "日程を調整し、当社スタッフが同行します。" },
    ],
  },
  en: {
    audienceTitle: "Who this is for",
    audiences: [
      { title: "New to Fukuoka", body: "You don't know Japanese procedures yet, or where to start." },
      { title: "Not comfortable in Japanese", body: "Japanese forms, phone calls or conversations at the counter are hard for you." },
      { title: "Short on time", body: "You are busy and would rather leave it to someone who knows the process." },
    ],
    servicesTitle: "What we help with",
    servicesIntro: "Our own staff handle these six items directly, listed in the order you will usually need them. Choose only what you need.",
    phases: [
      {
        label: "Before moving in",
        items: [
          { icon: "utilities", title: "Electricity, gas and water", body: "We contact the power, water and gas companies for you, book the gas turn-on and explain how the bills are paid." },
          { icon: "furniture", title: "Rental furniture and appliances", body: "We arrange rental furniture and appliances for your move-in date, so you can settle in from day one." },
        ],
      },
      {
        label: "Within 14 days of moving in",
        items: [
          { icon: "ward-office", title: "Ward office procedures and interpreting", body: "We go with you to the ward office for resident registration, National Health Insurance and similar procedures, and interpret on the spot." },
        ],
      },
      {
        label: "After resident registration",
        items: [
          { icon: "phone", title: "Mobile phone contract", body: "We help you compare plans and prepare the documents, and go with you to sign up." },
          { icon: "bank", title: "Opening a bank account", body: "We go with you to the bank and help with the application form and the staff's questions." },
        ],
      },
      {
        label: "Any time after moving in",
        items: [
          { icon: "shopping", title: "Shopping for everyday items", body: "We go shopping with you for daily necessities and household items, and show you good shops nearby." },
        ],
      },
    ],
    othersTitle: "Need something else? Just ask",
    othersIntro: "For the needs below, we can introduce partners. For anything else, contact us and we will talk it through with you.",
    othersLink: "Ask about something else",
    partnerLabel: "Partner introductions",
    partners: [
      { title: "Schools", body: "We introduce schools for your children or for language study." },
      { title: "Clinics", body: "We introduce clinics where you can see a doctor in English." },
      { title: "Visa applications and renewals", body: "We introduce an administrative scrivener (gyoseishoshi) for visa applications, changes and renewals." },
      { title: "Finding work", body: "We introduce recruitment agencies." },
    ],
    partnerNote: "Partners provide their own services and confirm their fees and terms with you directly.",
    processTitle: "How to arrange support",
    process: [
      { title: "Tell us what you need", body: "List the tasks you need help with, the dates and the places." },
      { title: "We send a quote first", body: "We check the details and send a quote, and only arrange anything once you agree." },
      { title: "We set a date and go with you", body: "We schedule the date, and our staff go with you." },
    ],
  },
};
