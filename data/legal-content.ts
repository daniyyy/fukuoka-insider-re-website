import { siteConfig, type Locale } from "@/config/site";

/**
 * Privacy Policy, Disclaimer, and Terms of Use (established 2026-09-29).
 * Written against Japan's Act on the Protection of Personal Information (個人情報保護法) and the
 * Real Estate Brokerage Act (宅地建物取引業法). The Japanese text is authoritative (see Terms).
 * Company facts come from config/site.ts.
 */
export type LegalKey = "privacy" | "disclaimer" | "terms";
export type LegalSection = { title: string; body: string[] };
export type LegalDocument = { title: string; /** Page heading when it differs from title ("|" = optional line break). */ heroTitle?: string; intro: string; updated: string; sections: LegalSection[] };

const { company } = siteConfig;
const { address, email, licence } = siteConfig.contact;
const rep = siteConfig.company_profile.representative;

export const legalCopy: Record<LegalKey, Record<Locale, LegalDocument>> = {
  privacy: {
    "zh-TW": {
      title: "隱私政策",
      intro: `${company}（以下稱「本公司」）重視您的個人資料。本政策說明本公司如何取得、使用及保管個人資料，並遵守日本《個人情報保護法》及相關法令。`,
      updated: "制定日期：2026年9月29日",
      sections: [
        { title: "事業者資料", body: [`${company}｜代表者：${rep["zh-TW"]}`, `地址：${address}`, `宅地建物取引業免許：${licence}`, `個人資料諮詢窗口：${email}`] },
        { title: "取得的個人資料", body: [
          "姓名、電話、Email、LINE／WhatsApp 等聯絡帳號。",
          "諮詢內容、希望條件、物業資料，以及與您往來的紀錄。",
          "辦理租屋、買賣或管理手續所需的資料，例如國籍、在留資格、工作、收入、同住人及緊急聯絡人。這類資料只在實際需要時，另行向您索取。",
        ] },
        { title: "取得方式", body: [
          "透過諮詢表、LINE、WhatsApp、Email、電話、面談及社群媒體，由您直接提供。",
          "本網站目前沒有使用分析工具或廣告 Cookie 收集瀏覽資料。網站主機可能為安全目的暫時記錄連線資料（例如 IP 位址）。日後如使用分析工具，會先更新本政策。",
        ] },
        { title: "使用目的", body: [
          "1. 回覆諮詢及聯絡。",
          "2. 介紹物業，提供租屋、買賣仲介、物業管理及生活支援等服務。",
          "3. 辦理重要事項說明、契約等交易手續。",
          "4. 與業主、管理公司、保證公司、金融機構等交易相關方聯絡及協調。",
          "5. 履行法令義務。",
          "6. 經您同意後，提供服務相關資訊。",
          "本公司不會在上述目的以外使用您的個人資料；如需在其他目的使用，會先取得您的同意。",
        ] },
        { title: "向第三方提供", body: [
          "除法令規定的情況外，未經您同意，本公司不會向第三方提供個人資料。",
          "由於房地產交易的性質，可能需要在必要範圍內向業主、管理公司、租賃保證公司、賣方／買方、其他房地產業者、金融機構、司法書士等提供資料。這種情況下，本公司會事先取得您的同意。",
        ] },
        { title: "使用外部服務", body: [
          "本公司使用 Google 表單、Email、LINE、WhatsApp 等外部服務與您聯絡。這些服務由各營運公司按其隱私政策處理資料，資料可能保存在日本以外的地區（例如美國）。",
        ] },
        { title: "安全管理", body: [
          "本公司會把可存取個人資料的人員限於業務上需要的負責人，管理電腦及帳戶的存取權限，並妥善保管和銷毀紙本文件。",
          "法令規定須保存的交易紀錄，會按規定期間保存；不再需要的資料會適當刪除或銷毀。",
        ] },
        { title: "查閱、更正及停止使用", body: [
          `您可要求查閱、更正、追加、刪除、停止使用或停止向第三方提供您的個人資料。請聯絡 ${email}。本公司確認本人身分後，會按法令在合理期間內處理。`,
          "如有法定保存義務或其他法令上的理由，部分要求可能無法處理，屆時會說明原因。",
        ] },
        { title: "政策修訂", body: ["本公司可能因法令或業務變更而修訂本政策，修訂後的內容在本頁公布時生效。"] },
      ],
    },
    ja: {
      title: "プライバシーポリシー",
      heroTitle: "プライバシー|ポリシー",
      intro: `${company}（以下「当社」）は、お客様の個人情報を適切に取り扱うことを重要な責務と考え、個人情報の保護に関する法律その他の関係法令を遵守し、以下のとおり取り扱います。`,
      updated: "制定日：2026年9月29日",
      sections: [
        { title: "事業者情報", body: [`${company}｜代表者：${rep.ja}`, `所在地：${address}`, `宅地建物取引業免許：${licence}`, `個人情報に関するお問い合わせ窓口：${email}`] },
        { title: "取得する個人情報", body: [
          "氏名、電話番号、メールアドレス、LINE・WhatsApp 等の連絡先アカウント。",
          "ご相談内容、ご希望条件、物件情報、お客様とのやり取りの記録。",
          "賃貸・売買・管理の手続きに必要な情報（国籍、在留資格、勤務先、収入、同居人、緊急連絡先等）。これらは必要な段階で別途ご提出をお願いします。",
        ] },
        { title: "取得方法", body: [
          "相談フォーム、LINE、WhatsApp、メール、電話、面談、SNS を通じて、お客様から直接取得します。",
          "本サイトでは現在、閲覧情報を収集するアクセス解析ツールや広告用 Cookie を使用していません。サーバーでは、セキュリティ確保のため接続情報（IPアドレス等）が一時的に記録される場合があります。解析ツールを導入する場合は、事前に本ポリシーを改定します。",
        ] },
        { title: "利用目的", body: [
          "1. お問い合わせへの回答およびご連絡のため。",
          "2. 物件のご紹介、賃貸・売買の媒介、物件管理、生活サポート等のサービス提供のため。",
          "3. 重要事項説明、契約等の取引手続きのため。",
          "4. 貸主、管理会社、保証会社、金融機関等の取引関係者との連絡・調整のため。",
          "5. 法令に基づく対応のため。",
          "6. ご同意をいただいたうえで、サービスに関するご案内をするため。",
          "上記の目的以外に利用する場合は、あらかじめご本人の同意を得ます。",
        ] },
        { title: "第三者への提供", body: [
          "法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供しません。",
          "不動産取引の性質上、貸主、管理会社、家賃保証会社、売主・買主、他の宅地建物取引業者、金融機関、司法書士等へ、取引に必要な範囲で提供することがあります。その場合は、事前にご本人の同意を得ます。",
        ] },
        { title: "外部サービスの利用", body: [
          "当社は、Google フォーム、メール、LINE、WhatsApp 等の外部サービスを利用してお客様と連絡を取ります。これらのサービスでは各提供事業者のプライバシーポリシーに基づいて情報が取り扱われ、日本国外（米国等）で保管される場合があります。",
        ] },
        { title: "安全管理措置", body: [
          "個人情報にアクセスできる者を業務上必要な担当者に限定し、パソコン・アカウントのアクセス管理、書類の適切な保管・廃棄を行います。",
          "宅地建物取引業法等により保存が義務付けられた記録は定められた期間保存し、不要となった情報は適切に削除・廃棄します。",
        ] },
        { title: "開示・訂正・利用停止等のご請求", body: [
          `ご本人から、保有個人データの開示、訂正・追加・削除、利用停止・消去、第三者提供の停止のご請求があった場合は、${email} までご連絡ください。ご本人であることを確認のうえ、法令に従い遅滞なく対応します。`,
          "法令上の保存義務等により、ご請求に応じられない場合は、その理由をご説明します。",
        ] },
        { title: "改定", body: ["法令の変更や業務内容の変更に応じて本ポリシーを改定することがあります。改定後の内容は本ページに掲載した時点から効力を生じます。"] },
      ],
    },
    en: {
      title: "Privacy Policy",
      intro: `${company} ("we") takes the protection of your personal information seriously. This policy explains how we collect, use, and keep personal information in line with Japan's Act on the Protection of Personal Information and related laws.`,
      updated: "Established: 29 September 2026",
      sections: [
        { title: "Who we are", body: [`${company} | Representative: ${rep.en}`, `Address: ${siteConfig.contact.addressEn}`, `Real estate brokerage licence: ${licence}`, `Privacy enquiries: ${email}`] },
        { title: "Information we collect", body: [
          "Your name, telephone number, email address, and messaging accounts such as LINE or WhatsApp.",
          "Your enquiry, preferred conditions, property details, and records of our communication.",
          "Information needed for rental, sale, purchase, or management procedures, such as nationality, residence status, employment, income, co-occupants, and emergency contacts. We ask for these separately and only when needed.",
        ] },
        { title: "How we collect it", body: [
          "Directly from you through our enquiry form, LINE, WhatsApp, email, telephone, meetings, and social media.",
          "This website currently uses no analytics tools or advertising cookies. Our hosting provider may briefly record connection data (such as IP addresses) for security. We will update this policy before introducing any analytics.",
        ] },
        { title: "Why we use it", body: [
          "1. To reply to your enquiries and contact you.",
          "2. To introduce properties and provide rental and sales brokerage, property management, and living support.",
          "3. To carry out transaction procedures such as the explanation of important matters and contracts.",
          "4. To communicate with landlords, management companies, guarantee companies, financial institutions, and other parties to a transaction.",
          "5. To meet our legal obligations.",
          "6. With your consent, to send you information about our services.",
          "We will ask for your consent before using your information for any other purpose.",
        ] },
        { title: "Sharing with third parties", body: [
          "Except where the law requires or permits it, we do not provide personal information to third parties without your consent.",
          "Real-estate transactions often require sharing information, to the extent necessary, with landlords, management companies, rent guarantee companies, sellers or buyers, other real-estate agents, financial institutions, and judicial scriveners. We ask for your consent before doing so.",
        ] },
        { title: "External services", body: [
          "We use external services such as Google Forms, email, LINE, and WhatsApp to communicate with you. Each provider handles information under its own privacy policy, and data may be stored outside Japan (for example, in the United States).",
        ] },
        { title: "Security", body: [
          "Access to personal information is limited to staff who need it for their work. We manage access to computers and accounts, and store and dispose of paper documents properly.",
          "Records that Japanese law requires us to keep are kept for the required period; information that is no longer needed is deleted or disposed of properly.",
        ] },
        { title: "Your requests", body: [
          `You may ask us to disclose, correct, add to, delete, stop using, or stop sharing your personal data by contacting ${email}. After confirming your identity, we will respond without undue delay as required by law.`,
          "If a legal retention duty or other legal reason prevents us from meeting a request, we will explain why.",
        ] },
        { title: "Changes", body: ["We may revise this policy when laws or our services change. Revisions take effect when published on this page."] },
      ],
    },
  },
  disclaimer: {
    "zh-TW": {
      title: "免責聲明",
      intro: "本網站提供房地產服務及福岡生活的一般資訊。使用本網站前，請先閱讀以下說明。",
      updated: "制定日期：2026年9月29日",
      sections: [
        { title: "資訊的性質", body: ["網站內容（包括指南文章）是按撰寫時可取得的資料整理的一般資訊。法令、稅制、市場及各公司的規定可能改變，請以辦理手續時的最新資料為準。"] },
        { title: "物業及交易條件", body: ["物業是否仍可租售、租金、價格、費用、設備及面積等可能變動。申請及契約前，請以正式文件確認。", "租屋審查、保證公司審查、貸款及交易條件，由業主、賣方、管理公司、保證公司、金融機構等判斷。本公司不保證審查結果或交易一定成立。"] },
        { title: "不構成專業意見", body: ["網站內容不構成稅務、法律、登記、在留資格或融資等專業意見。個別情況請向稅理士、律師、司法書士、行政書士等專業人士確認。"] },
        { title: "費用估算工具", body: ["費用估算工具按您輸入的數字及一般假設（例如現行稅率、評價額估算）計算，結果只供參考，並非報價。實際費用以個別物件的正式報價及契約為準。"] },
        { title: "多語言內容", body: ["本網站以繁體中文、日文及英文提供。各語言內容如有差異，以日文版為準。重要事項說明書及契約書以日文書面為正式文件。"] },
        { title: "外部連結及服務", body: ["本網站連結的外部網站及服務（Google 表單、LINE、WhatsApp、Instagram 等）由各營運者管理，本公司不對其內容或可用性負責。"] },
        { title: "責任範圍", body: ["除因本公司故意或重大過失造成的情況外，本公司對使用本網站資訊所引致的損失不承擔責任。", "本公司可在不事先通知的情況下更改、暫停或刪除網站內容。"] },
      ],
    },
    ja: {
      title: "免責事項",
      intro: "本サイトは、不動産サービスおよび福岡での暮らしに関する一般的な情報を提供しています。ご利用の前に以下をご確認ください。",
      updated: "制定日：2026年9月29日",
      sections: [
        { title: "情報の性質", body: ["本サイトの内容（ガイド記事を含む）は、作成時点で入手可能な情報に基づく一般的な情報です。法令、税制、市況、各社の規定は変更される場合がありますので、手続きの際は最新の情報をご確認ください。"] },
        { title: "物件・取引条件", body: ["物件の空き状況、賃料、価格、費用、設備、面積等は変更される場合があります。お申込み・ご契約の前に、正式な書面でご確認ください。", "入居審査、保証会社の審査、融資、取引条件は、貸主、売主、管理会社、保証会社、金融機関等が判断します。当社は審査結果や取引の成立を保証するものではありません。"] },
        { title: "専門的助言ではありません", body: ["本サイトの内容は、税務、法律、登記、在留資格、融資等に関する専門的な助言ではありません。個別の事情については、税理士、弁護士、司法書士、行政書士等の専門家にご確認ください。"] },
        { title: "費用の概算ツール", body: ["費用の概算ツールは、入力された数値と一般的な前提（現行の税率、評価額の概算など）に基づく概算であり、見積書ではありません。実際の費用は、個別物件の正式な見積および契約によります。"] },
        { title: "多言語での表示", body: ["本サイトは繁体字中国語、日本語、英語で提供しています。各言語の内容に相違がある場合は、日本語版を優先します。重要事項説明書および契約書は、日本語の書面を正式なものとします。"] },
        { title: "外部リンク・外部サービス", body: ["本サイトからリンクする外部サイト・サービス（Google フォーム、LINE、WhatsApp、Instagram 等）は各運営者が管理しており、当社はその内容や利用可否について責任を負いません。"] },
        { title: "責任の範囲", body: ["当社の故意または重大な過失による場合を除き、本サイトの情報の利用により生じた損害について、当社は責任を負いません。", "当社は、予告なく本サイトの内容を変更、中断、削除することがあります。"] },
      ],
    },
    en: {
      title: "Disclaimer",
      intro: "This website provides general information about our real-estate services and life in Fukuoka. Please read the following before using it.",
      updated: "Established: 29 September 2026",
      sections: [
        { title: "Nature of the information", body: ["Site content, including guide articles, is general information based on what was available when it was written. Laws, taxes, market conditions, and company rules can change, so please confirm the latest information when you proceed."] },
        { title: "Properties and transaction terms", body: ["Availability, rent, prices, fees, equipment, and floor areas may change. Please confirm them in the official documents before applying or signing.", "Tenant screening, guarantee company screening, financing, and transaction terms are decided by landlords, sellers, management companies, guarantee companies, and financial institutions. We cannot guarantee any screening result or that a transaction will be completed."] },
        { title: "Not professional advice", body: ["Nothing on this site is tax, legal, registration, residence-status, or financing advice. For your own situation, please consult a qualified professional such as a tax accountant, lawyer, judicial scrivener, or administrative scrivener."] },
        { title: "Cost Estimators", body: ["The cost estimators calculate from the figures you enter and general assumptions (such as current tax rates and estimated assessed values). Results are for reference and are not quotations. Actual costs follow the official quotation and contract for each property."] },
        { title: "Languages", body: ["This site is available in Traditional Chinese, Japanese, and English. If the versions differ, the Japanese version prevails. Explanations of important matters and contracts are official only in their Japanese written form."] },
        { title: "External links and services", body: ["External sites and services linked from this website (Google Forms, LINE, WhatsApp, Instagram, and others) are managed by their operators. We are not responsible for their content or availability."] },
        { title: "Liability", body: ["Except in cases of our wilful misconduct or gross negligence, we are not liable for loss arising from the use of information on this website.", "We may change, suspend, or remove site content without notice."] },
      ],
    },
  },
  terms: {
    "zh-TW": {
      title: "使用條款",
      intro: `本條款說明使用 ${company} 營運的本網站時的條件。使用本網站，即表示您同意本條款。`,
      updated: "制定日期：2026年9月29日",
      sections: [
        { title: "著作權", body: ["本網站的文字、照片、圖片、圖表、標誌及其他內容，其著作權及相關權利屬本公司或正當權利人所有。", "未經本公司書面許可，禁止複製、轉載、改編、再發布或作商業用途。", "在法律容許的範圍內，並符合註明出處等引用要件時，可引用本網站內容。"] },
        { title: "禁止事項", body: ["提供虛假資料或冒充他人。", "未經授權存取、對伺服器造成過大負荷，或以自動程式大量收集網站內容。", "妨礙本公司業務、侵害他人權利，或其他違反法令或公序良俗的行為。"] },
        { title: "連結到本網站", body: ["原則上可自由連結到本網站。但不得以令人誤會與本公司有合作關係的方式連結，或把本網站放在其他網站的框架內顯示。"] },
        { title: "諮詢與契約", body: ["透過本網站提出諮詢，並不代表任何契約成立。仲介、管理等契約，會在說明內容及費用後，另以書面簽訂。"] },
        { title: "條款修訂", body: ["本公司可能修訂本條款，修訂後的內容在本頁公布時生效。"] },
        { title: "準據法及管轄", body: ["本條款以日本法律為準據法。與本網站有關的爭議，以福岡地方法院為第一審專屬合意管轄法院。", "本條款各語言版本如有差異，以日文版為準。"] },
      ],
    },
    ja: {
      title: "利用規約",
      intro: `本規約は、${company}（以下「当社」）が運営する本サイトのご利用条件を定めるものです。本サイトをご利用いただいた時点で、本規約に同意したものとみなします。`,
      updated: "制定日：2026年9月29日",
      sections: [
        { title: "著作権", body: ["本サイトに掲載されている文章、写真、画像、図表、ロゴ等の著作権その他の権利は、当社または正当な権利者に帰属します。", "当社の書面による許可なく、複製、転載、改変、再配布、商業目的での利用を行うことを禁止します。無断転載・複製を禁じます。", "法令で認められる範囲で、出典の明示等、引用の要件を満たす場合は、本サイトの内容を引用することができます。"] },
        { title: "禁止事項", body: ["虚偽の情報の提供、他人へのなりすまし。", "不正アクセス、サーバーへの過度な負荷、プログラム等による本サイトの内容の大量取得。", "当社の業務の妨害、第三者の権利の侵害、その他法令または公序良俗に反する行為。"] },
        { title: "本サイトへのリンク", body: ["本サイトへのリンクは原則として自由です。ただし、当社との提携関係を誤解させる方法や、他のサイトのフレーム内に表示する方法でのリンクはお断りします。"] },
        { title: "お問い合わせと契約", body: ["本サイトからのお問い合わせにより、契約が成立するものではありません。媒介契約・管理委託契約等は、内容および費用をご説明したうえで、別途書面にて締結します。"] },
        { title: "規約の変更", body: ["当社は本規約を変更することがあります。変更後の規約は、本ページに掲載した時点から効力を生じます。"] },
        { title: "準拠法・管轄", body: ["本規約は日本法に準拠します。本サイトに関して紛争が生じた場合は、福岡地方裁判所を第一審の専属的合意管轄裁判所とします。", "本規約の各言語版に相違がある場合は、日本語版を優先します。"] },
      ],
    },
    en: {
      title: "Terms of Use",
      intro: `These terms set out the conditions for using this website, operated by ${company} ("we"). By using the website, you agree to these terms.`,
      updated: "Established: 29 September 2026",
      sections: [
        { title: "Copyright", body: ["Copyright and related rights in the text, photographs, images, charts, logos, and other content on this website belong to us or to their rightful owners.", "Reproduction, republication, adaptation, redistribution, or commercial use without our written permission is prohibited.", "You may quote site content to the extent the law allows, provided the requirements for quotation, such as citing the source, are met."] },
        { title: "Prohibited conduct", body: ["Providing false information or impersonating another person.", "Unauthorised access, placing excessive load on the server, or collecting site content in bulk with automated programs.", "Interfering with our business, infringing the rights of others, or any other conduct contrary to law or public order."] },
        { title: "Linking to this site", body: ["You may generally link to this website. Please do not link in a way that suggests a partnership with us, or display this site inside a frame on another website."] },
        { title: "Enquiries and contracts", body: ["Sending an enquiry through this website does not create a contract. Brokerage, management, and other agreements are signed separately in writing after we explain their terms and fees."] },
        { title: "Changes", body: ["We may revise these terms. Revised terms take effect when published on this page."] },
        { title: "Governing law and jurisdiction", body: ["These terms are governed by the laws of Japan. The Fukuoka District Court has exclusive jurisdiction in the first instance over any dispute relating to this website.", "If the language versions of these terms differ, the Japanese version prevails."] },
      ],
    },
  },
};
