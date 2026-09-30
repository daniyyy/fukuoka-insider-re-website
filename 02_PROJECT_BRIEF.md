# Fukuoka Insider Real Estate — Project Brief

## 專案定位

**Fukuoka Insider Real Estate** 是由 **株式会社Fukuoka Insider** 營運、面向海外客戶的福岡房地產服務網站。主要服務香港與台灣客戶，同時自然地支援日本及其他國際客戶。

這不是大型物件刊登平台。它是一個多語言 lead-generation website：讓訪客快速理解服務、信任公司、閱讀有用資訊，並開始免費諮詢。

核心感受：

> 清楚、簡潔、專業、可信、現代、國際化、具福岡在地感。

## 品牌與人物

- 主品牌：**Fukuoka Insider**
- 對外網站名稱：**Fukuoka Insider Real Estate**
- 沿用原有 Fukuoka Insider Logo；不可重新設計或把 REAL ESTATE 寫入原始 Logo 檔案。
- REAL ESTATE 只作為排版上的次級描述。
- 品牌比例：公司約 80%，人物約 20%。
- Ricky（Founder / President）與 Danny（宅地建物取引士、香港背景、定居福岡）只在 About 頁作輕量信任介紹；兩人不放 Hero，網站不是個人仲介網站。

視覺方向：Modern Japanese editorial × international real estate × Fukuoka lifestyle。

- 主色：黑／炭灰、暖白、石灰。
- Accent：一種低飽和深藍／slate blue。
- 避免：黑金豪宅、密集房仲入口網站、觀光拼貼、過量卡片及動畫。
- 可用影像：福岡城市、住宅、建築、咖啡店、海邊、日常生活與在地街景。

## 正式公司與聯絡資料

    公司：株式会社Fukuoka Insider
    地址：〒810-0074 福岡県福岡市中央区大手門1-5-2 九州外語ビル1階1号
    TEL：092-753-5662
    FAX：092-753-5663
    宅地建物取引業免許：福岡県知事 (1) 021270号
    Email：danny@fukuokainsider.jp
    LINE：https://lin.ee/vyx5daI
    Instagram：https://www.instagram.com/fukuoka_insider/
    詳細不動產查詢表：https://forms.gle/HPd8JW1RTgzNTWfK9
    WhatsApp：未設定；未提供正式連結前全站隱藏

所有資料須集中於 site config；不得在元件、頁面或內容檔案重複寫死。

## 用戶與 conversion

主要用戶是考慮在福岡租屋、買樓、賣樓、管理物業，或需要相關生活支援的海外客戶。

全站主 CTA 統一為「免費諮詢 / Free Consultation / 無料相談」。V1 主要入口是既有 Google Form：手機直接開啟，桌面可附 QR code。LINE、Email、TEL 是輔助路徑。V1 不做原生表單、CRM、Google Sheet automation 或 WhatsApp UI。

Contact 頁直接呈現既有 Google Form、LINE、Email 與電話入口，不建立或模仿尚未存在的原生完整查詢表單。

## 語言與網址

固定頁提供繁中、日文、英文；繁中是 source language。每次修改固定頁，都必須同步更新三語並維持相同 section 結構。

    /re/zh-TW/
    /re/ja/
    /re/en/

Guides 只提供繁中及英文；FAQ 提供繁中、日文及英文。不可建立假的日文 Guide 或日文 Guide hreflang；從 Guide 切換日文時回到日文首頁。日文 Header 連至英文 Guides 及日文 FAQ，FAQ 可提示 Guide 目前只有繁中與英文。

## V1 Sitemap

    Home
    Services overview
    ├─ Rent
    ├─ Buy & Sell
    ├─ Property Management
    └─ Living Support
    Guides
    Help Center / FAQ
    About
    Contact / Free Consultation
    Privacy / Disclaimer / Terms

不要為了看似完整新增薄弱子頁。Production V1 的 Buy 與 Sell 合併為 `/services/buy-sell`，在同一服務頁內清楚區分買房與賣房兩條需求路徑；Rent 不細拆；Property Management 分為「賃貸管理」和「セカンドハウス管理」兩組；Living Support 必須區分直接服務與合作夥伴轉介。

四個服務頁以 lead generation 為主要任務：租屋服務、房產買賣、物業管理、生活支援。各頁保持精簡、容易掃讀、容易理解，並維持大致相近的閱讀量。頁面不需要使用完全相同的 section 結構或字數，只保留判斷服務是否合適、可提供的支援、一般流程、需要準備的資料、重要限制及聯絡方式所需的內容。詳細法律、稅務、程序及特殊案例留給 Guides、FAQ 或日後專門資源。

Terms of Use 必須清楚說明網站內容的著作權與使用規則：禁止未經授權複製、轉載、再發布、散布及改編，並適用於文章、圖片、圖表及其他網站內容；同時不得限制適用法律所允許的合法引用等例外。

Privacy、Disclaimer 與 Terms 是 V1 draft legal pages；公開上線前必須完成專業法律審閱。

## 首頁結構

    Hero
    Services & Support
    Trust
    Featured Guides
    Latest Guides
    Life in Fukuoka
    About
    Final CTA
    Footer

Hero 主題是 **Build Your Life in Fukuoka.**，並清楚說明租、買、賣、物業管理的多語言支援。Hero 使用福岡／住宅／建築／日常生活影像，不放人物照。

`Services & Support` 是首頁唯一的服務 overview／navigation section，簡潔呈現租屋服務、房產買賣、物業管理與生活支援。首頁不再另設 Quick Routes 或第二個 detailed Services section；詳細內容留在 Phase 2 service pages。

`Trust` 只需簡潔建立三項事實信任：公司真正在福岡營運、公司持有宅地建物取引業免許且由宅地建物取引士提供支援，以及可使用繁體中文、日文與英文溝通。公司免許與個人資格不得混為模糊的 marketing claim。

首頁文章卡只顯示 Image、Category、Title、Summary。Tags 留在 CMS，不在首頁卡片顯示。

Phase 1 的 Featured Guides 與 Latest Guides 曾使用少量 local mock data。Phase 3 已改由 provider-agnostic content adapter 提供；目前 typed local seed data 只作 production scaffolding，最終 CMS provider 尚未鎖定。

## 技術與資料分工

    Next.js + TypeScript + Tailwind CSS
    Provider-agnostic editorial content adapter（最終 CMS provider 尚未鎖定）
    GitHub
    Cloudflare Workers prototype + OpenNext/相容部署

    固定公司／服務／法律頁：Git-managed localized content（V1 為 typed locale data modules）
    Guides、FAQ、文章 metadata：經 content adapter 讀取；Phase 3 為 typed local seed data
    最終文章圖片：日後由獲批准的 editorial provider／CDN 管理
    Layout、樣式、互動、功能：程式碼
    公司資料、連結、語言、base path、feature flags：config

Content model 只涵蓋 Guide、FAQ、Category、Tag，並保持簡潔、可 preview。AI 建立或修改內容一律預設 Draft；只有收到明確「發布 / Publish」指示才可發佈。日後更換 provider 不應改變前端 route 或 page composition。

本 Website Project 不處理文章寫作。它只接收已完成內容，負責 CMS import、metadata、preview 及經明確批准後的發布。

## Prototype 與正式部署

先獨立建置 prototype，完全不碰既有 www.fukuokainsider.com WordPress。

    GitHub → Next.js + content adapter → 臨時 Cloudflare URL

Prototype 從一開始支援可設定的 /re base path，並設定 noindex, nofollow。Demo 不需另買 domain。

老闆批准後，才和現有 WordPress 管理者確認 DNS、hosting、Cloudflare/reverse proxy 等條件，研究接入：

    https://www.fukuokainsider.com/re/

現有基建未知，故 /re/ 接入不是 prototype 的 blocker。正式遷移後才啟用正常索引與 SEO。

## V1、V1.1 與第一個任務

V1：品牌與首頁、四個服務頁、About、Contact、Legal、content-adapter-backed Guides/FAQ、基本 SEO、基本 analytics、手機 QA、獨立 Demo。Buying 與 Selling 保持不同 Guide categories，但共同連到房產買賣服務頁。既有文章只挑成熟的一小批首發；不以全數移轉作為上線條件。

2026-09-25 V1 completion sprint 已明確將 Purchase Cost Estimator 與 Rental Initial Cost Estimator 提前納入可審核的 V1 framework；不得虛構官方費率或將結果說成報價。工具不放 Header、首頁區塊或 Coming Soon 頁。此範圍調整不代表已獲部署批准。

新 Project 的第一個任務只做：

> Project scaffold、architecture、design system、responsive shell、Header、Footer、完整 Homepage prototype。

第一個 Phase 1 task 不同時實作 external CMS、文章匯入、FAQ、calculators、production integration 或正式部署。
