# Fukuoka Insider Real Estate — Confirmed Decisions

> 此文件是已確認決策的紀錄，供未來 Website Project、AI session 與維護使用。若需推翻任何項目，先說明影響並取得確認；不可默默改變方向。

## 1. 品牌與定位

| 決策 | 已確認內容 | 原因／影響 |
|---|---|---|
| 對外名稱 | Fukuoka Insider Real Estate | 清楚表達服務，同時保留 Fukuoka Insider 的品牌連續性。 |
| Logo | 原 Fukuoka Insider Logo 為 master asset；REAL ESTATE 只作次級文字 | 不建立割裂新品牌，也不修改 Logo 圖形。2026-09-28 Danny 批准：Logo 圖形不變，改為透明底向量檔（`public/images/brand/logo-dark.svg` 用於淺色背景、`logo-light.svg` 用於深色背景／照片），不再使用黑色方塊底。頁頭用「橫排」組合（Logo＋細線＋REAL ESTATE），頁尾用「上下排」組合（REAL ESTATE 與 Logo 同寬）。網站小圖示用「[ I」符號（`favicon.svg`）。只用「[ I」符號取代完整 Logo 的方案 3 未獲批准。 |
| 品牌比例 | 公司約 80%，人物約 20% | 網站是公司 lead-generation site，不是個人仲介網站。 |
| 人物使用 | Ricky：Founder / President；Danny：宅建士、香港背景、定居福岡 | 只在 About 作輕量 profile，Hero 不放人像。 |
| 設計方向 | 現代日式 editorial × 國際房地產 × 福岡生活感 | 避免傳統日本房仲 portal、黑金豪宅與觀光拼貼。 |

## 2. Sitemap 與服務

| 決策 | 已確認內容 |
|---|---|
| V1 services | 四個服務頁：租屋服務、房產買賣、物業管理、生活支援。日文使用賃貸、不動産売買、物件管理、生活サポート；英文使用 Rental、Buy & Sell、Property Management、Living Support。 |
| Buy / Sell | Production V1 合併為 canonical `/services/buy-sell`。頁內以兩條清楚路徑區分買房與賣房，但保持一個精簡的 lead-generation page；舊 `/services/buy`、`/services/sell` 永久轉址至新 route。Buying 與 Selling 仍是分開的 Guide categories。 |
| Rent | 維持一個廣泛服務頁；不拆住宅、商業、學生等子頁。 |
| Service-page content policy | 四個服務頁是 lead-generation pages：保持精簡、易掃讀、易理解，並維持大致相近的內容密度與閱讀量。頁面不必使用相同 layout 或完全相同字數；只保留服務適用性、可協助事項、一般流程、準備資料、重要限制與聯絡入口。詳細法律、稅務、程序和特殊案例留給 Guides、FAQ 或日後專門資源。 |
| Service-page visual grammar（2026-09-28 取代） | 四個服務頁改用同一個「和紙編集」服務頁模板（`components/service-pages/ServicePage.tsx`）：首圖、適合誰、可以協助的事、一般流程、查詢前準備、事先說明、公司資料、其他服務、諮詢區。服務總覽改為四項服務同時可見並有結尾諮詢區；不再使用切換式導覽與水彩 plaque。以下兩行為舊紀錄，僅供參考。 |
| Service-page visual grammar（舊） | Phase 2A 已確認以 photography-led contextual service navigator 作為服務頁家族的設計基線：dark ink navigation field、一次一個 active subject、contextual photography、warm editorial information plane，以及可因頁面目的改變的 editorial service navigation。這是可重用的設計語法，不是每頁必須複製的固定 template。 |
| Active-title plaque（舊，已停用） | 合適的服務導覽可讓 active service title 跨越 ink 與 photography 的 shared edge，搭配已確認的 warm ivory / parchment watercolor-vellum plaque。Plaque 為 broad horizontal、受控制的 organic silhouette，有薄白色 hairline、輕微透明與柔和深度；不是 card、glassmorphism、triangle 或 random blob。服務名稱必須保持 real accessible HTML text，不可烙進圖片。 |
| Plaque asset strategy（舊，已停用） | Production 使用 `public/images/services/service-title-plaque.png`；批准來源保留於 `design-mockups/approved/service-navigator-v1/assets/service-title-plaque-approved.png` 作 design provenance。Asset 以不變形方式重用；不要以 CSS/SVG 重畫或重新生成 plaque。 |
| Buy/Sell 文案 | 房產買賣共用一個服務入口；用專業但保守的內容，兩條需求路徑不擴張成兩套完整頁面。詳細流程未確認前，不虛構 step-by-step expertise。 |
| Property Management | 同頁明確分 Rental Property Management / 賃貸管理 與 Second Home Management / セカンドハウス管理。 |
| 賃貸管理內容 | 尋找租客、審查／入住協調、租金收取／日常聯絡、維修／問題處理、入退去處理。 |
| Second Home內容 | 定期巡查、第二居所／度假屋管理；其他服務確認後才加入。 |
| Living Support | 明確分公司直接支援與 partner/referral；不假稱轉介服務由公司直接交付。 |
| Sitemap 原則 | 小而完整；不為 SEO 或視覺規模建薄弱頁面。 |
| Terms of Use | 必須清楚寫明網站內容的著作權與使用規則：禁止未經授權複製、轉載、再發布、散布及改編（包括文章、圖片、圖表及其他內容），但保留適用法律允許的合法引用等例外。 |
| Legal routes | V1 包含 `/privacy`、`/disclaimer`、`/terms`；目前為 launch draft，公開上線前需由適當法律專業人士審閱。 |
| Tools | 2026-09-25 V1 completion sprint 明確提前納入 Purchase Cost Estimator 與 Rental Initial Cost Estimator。工具須可運作、揭露假設、不虛構官方費率；仍不放 Header／首頁，也不建 Coming Soon。 |

## 3. 語言與內容規則

| 項目 | 決策 |
|---|---|
| 固定頁 | 繁中、日文、英文；繁中為 canonical/source。 |
| 固定頁更新 | 任何改動，包括小文案，都在同一 task 同步三語，並檢查 section 結構。 |
| 繁中稱呼（2026-09-28） | 固定頁繁中一律用「您」稱呼讀者（香港、台灣商務語氣）。 |
| 路由 | /re/zh-TW/、/re/ja/、/re/en/；/re/ 可導向繁中首頁。 |
| Guides | 只做繁中與英文；不做日文 Guide 或日文 Guide hreflang。 |
| FAQ | 提供繁中、日文與英文。 |
| 日文 fallback | 在 Guide 切日文時回 /re/ja/；日文 Header 連英文 Guides 及日文 Help，Help 可提示 Guide 只有繁中與英文。 |
| 固定內容儲存 | 使用 Git-managed localized content；目前 V1 為 typed locale data modules。每頁三語維持相同 content fields 與 section 結構，日後可在不改 ownership boundary 的前提下轉為 Markdown。 |
| Content 邊界 | 只放內容、SEO metadata、last updated；不放 layout、顏色、grid、動畫或互動規則。 |
| Website Project 邊界 | 不進行文章寫作；只接收完成內容，匯入 CMS、preview、在明確指示後發布。 |

## 4. CMS 與資料權責

| 決策 | 已確認內容 |
|---|---|
| CMS | 最終 provider 尚未鎖定；前端只經簡潔的 provider-agnostic content adapter 取用資料。Phase 3 使用 typed local seed data。 |
| Content types | Guide、FAQ、Category、Tag。 |
| 編輯方式 | 現階段為 structured body blocks；日後 provider 應支援 Rich Text，並便於從完成 Markdown 轉換／匯入。 |
| Guide fields | locale、canonical pairing key、狀態、分類、tags、文章圖、首頁 featured/order、日期、localized title/slug/summary/content/SEO、manual related guides。 |
| FAQ fields | locale、狀態、分類、keywords、related service、featured/priority、繁中／日文／英文 question/answer。 |
| Workflow | Draft → Ready for Review → Published → Archived。 |
| AI 發布規則 | AI 建立／修改內容預設 Draft；只有明確收到 Publish／發布才可發佈。重大已發布內容修改亦需 review。 |
| CMS UI | Owner-friendly、minimal、structured、previewable；技術欄位盡量隱藏或放 Advanced。 |
| 權限 V1 | Danny 為 Owner/Admin；AI/integration 只給必要 API 權限、可處理 Draft、不可暗中發布；暫不設 Editor。 |
| Source of truth | GitHub：code、架構、固定內容、config、docs/tests；Phase 3 typed local seed 暫作 Guides／FAQ scaffolding。選定 CMS 後，已發布 editorial content 及最終文章圖片移交該 provider 管理，不得重複管理。 |

## 5. Contact 與 conversion

| 決策 | 已確認內容 |
|---|---|
| 主 CTA | 全站統一為 Free Consultation／對應語言版本。 |
| V1 enquiry | 使用現成 Google Form；前台文案不直接稱 Google Form。 |
| Native form | 不做。 |
| CRM / Sheet automation | 不做；Google Form 的既有 email 通知已足夠。 |
| Contact routes | Google Form（主要）、LINE、Email、TEL；WhatsApp 未設定時隱藏。 |
| Contact page | 顯示上述真實聯絡入口，不建立或模仿未實作的 native full enquiry form。 |
| 輔助行動（2026-09-28） | 首頁最後諮詢區及手機選單，除主 CTA「免費諮詢」外加入 LINE 與電話兩個輔助按鈕；繁中／英文頁顯示國際格式電話（+81 92-753-5662），日文頁顯示 092-753-5662。 |
| Footer 公司資料（2026-09-28） | 頁尾顯示公司名、宅地建物取引業免許號碼及地址（資料來自 `config/site.ts`）。 |
| Desktop / mobile | Desktop 可加 QR code；mobile 直接開 Form。 |
| Floating UI | 不做大型、侵入式 WhatsApp/LINE 浮動按鈕。 |
| Fax | 放 Company Information/正式資料，非主轉換 CTA。 |

## 6. 首頁與 UX

| 區塊 | 決策 |
|---|---|
| Hero | Build Your Life in Fukuoka. + 清楚描述 rent/buy/sell/manage 的 multilingual support；有輕量 trust line；不用人像。 |
| Services & Support | 首頁唯一的服務 overview／navigation section；簡潔呈現租屋服務、房產買賣、物業管理、生活支援，讓訪客快速找到適合的服務。不另設 Quick Routes 或第二個 detailed Services section；詳細內容留給 Phase 2 service pages。 |
| Trust | 只需簡潔證明公司在福岡營運、公司持有宅地建物取引業免許（福岡県知事 (1) 021270号）且由宅地建物取引士提供支援，以及可使用繁體中文／日文／英文溝通。公司免許與個人資格必須明確區分；不用未證實排名、獎項或數字。 |
| Guides cards | Image + Category + Title + Summary；Tags 保留在 CMS，不在首頁卡片顯示。 |
| Featured / Latest | Featured 為人工選 1–3 篇；Latest 自動顯示少量最新已發布內容。 |
| Phase 3 Guides 資料 | Homepage、Guides landing、category、article 共用同一 content adapter；Featured 為人工排序，Latest 依發布日期；draft 不得出現在公開 route、列表或 sitemap。 |
| Life in Fukuoka | 作品牌與在地生活橋接，可連主 Fukuoka Insider；不變成旅遊內容頁。 |
| Footer | 可放 Instagram、fukuokainsider.com、聯絡、legal、language；不放 fukuoka.cc。 |

Homepage architecture：`Hero → Services & Support → Trust → Featured Guides → Latest Guides → Life in Fukuoka → About → Final CTA → Footer`。

## 7. Hosting、prototype 與 /re/

| 決策 | 已確認內容 |
|---|---|
| 現有網站 | www.fukuokainsider.com 是現有 WordPress，由其他人管理；目前未知 DNS/hosting/Cloudflare 資訊。 |
| Prototype | 獨立建置及部署，完全不修改或依賴 WordPress。 |
| Stack | Next.js + TypeScript + Tailwind + provider-agnostic content adapter + GitHub + Cloudflare Workers（OpenNext/相容部署）；最終 CMS provider 尚未鎖定。 |
| Prototype URL | 臨時 Cloudflare URL 或 equivalent；不需為 Demo 買新 domain。 |
| Base path | 從第一天起支援可設定的 /re，避免未來 asset、link、i18n、canonical 問題。 |
| Search visibility | Prototype 必須 noindex, nofollow；正式遷移後才開索引。 |
| 正式目標 | https://www.fukuokainsider.com/re/。 |
| 接入時機 | Ricky/公司批准 prototype 後，才和既有網站管理者確認 routing、DNS、Cloudflare/reverse proxy 等可行方案。 |
| Portability | 儘量減少 hosting-specific coupling；Cloudflare 是首選 prototype hosting，不應鎖死整個 app。 |

## 8. SEO、Analytics 與圖片

| 項目 | V1 決策 |
|---|---|
| SEO | title/meta、heading、canonical、正確 hreflang、sitemap、robots、OG、Article/Organization/Breadcrumb schema、clean URL、alt text、internal links、mobile performance、404/redirect basics。 |
| Japanese editorial SEO | Guides 沒有日文版本，不造假 ja hreflang；FAQ 的 ja hreflang 只指向真實日文 FAQ。 |
| 不做的 SEO | AI scoring、programmatic SEO、keyword dashboard、薄弱地區頁、複雜 GEO 系統。 |
| Analytics | 可替換、privacy-conscious 的輕量方案；追蹤流量、landing page、source、device、country/region、language 和核心 CTA clicks。 |
| 事件 | Free Consultation、Google Form、LINE、Email；WhatsApp 啟用後才追蹤。 |
| 固定網站圖片 | Logo、人物、Hero/服務/About/UI 圖片放 repository/static assets。 |
| 文章圖片 | Phase 3 seed 暫用安全的 repository assets；最終文章圖片由日後獲批准的 editorial provider／CDN 管理。 |

## 9. Roadmap 與現階段不做事項

| 階段 | 內容 |
|---|---|
| Phase 1 | Scaffold、architecture、design system、responsive shell、Header、Footer、Homepage prototype。 |
| Phase 2 | Services、About、Contact、Legal。 |
| Phase 3 | Provider-agnostic content foundation、Guides、FAQ。 |
| Phase 4 | SEO、analytics、mobile QA。 |
| Phase 5 | Cloudflare demo deployment → 給 Ricky/管理層確認。 |
| Approval 後 | 研究並執行既有網站 /re/ 接入。 |
| V1 completion sprint（2026-09-25 範圍調整） | Purchase Cost Estimator、Rental Initial Cost Estimator 提前納入可審核的 V1 framework；不代表已核准部署或正式上線。 |

暫不處理：新 domain 購買、WordPress 接入細節、原生表單/CRM、一次上載全部文章、property listing portal、全站搜尋、帳戶系統及大型行銷 automation。

## 10. 開工守則

第一個 build task 只完成 Phase 1。不可把 external CMS、文章 migration、FAQ、calculators、production integration 或正式 production launch 混進同一個第一版任務。每次變更後，先在 preview 驗證；任何重大決策改動應同步更新本文件。

## 2026-09-29 追加

| 項目 | 決定 |
|---|---|
| 配色（Danny 2026-09-29 確認） | 由米白＋黑改為「石垣と濠」（福岡城石垣石色＋大濠公園濠綠＋博多織金線）。只改 design-system.css 色彩代號，可一步還原。 |
| 招牌紋樣 | 博多織・獻上柄條紋，只用於指南與首頁福岡生活區。 |
| 指南呈現 | 精選 3 篇用照片；其餘文章用文字目錄（完整標題＋摘要），不用重複照片或文字封面。首頁只顯示 3 篇精選。 || 維護者 | 2026-09-29 起只由 Claude 維護；Codex 專用檔案已移除，指示檔改為 `CLAUDE.md`。 |
| WhatsApp | 已設定（+81 80-2042-2394），取代 01_MASTER_BUILD_PROMPT「WhatsApp: not configured / 隱藏」的舊設定。 |
| 首頁指南 | Danny 指示首頁只顯示 3 篇精選指南，取代原 brief 的「Latest Guides」區。 |
| 資料庫 | 不使用；移除範本附帶的 D1／Drizzle 設定。日後 CMS 仍按 docs/editorial-publishing.md 的 adapter 邊界接入。 |
| 指南語言（Danny 2026-09-29） | 指南只做繁中（主力客群香港、台灣）；英文待定；日文確定不做。由 config/site.ts 的 guideLocales 控制選單。取代「Guides 有繁中及英文、日文選單連到英文 Guides」的舊設定。 |
| 服務頁相關指南 | 服務頁加入 3 篇相關指南（data/service-guides.ts）。 |
| 法律頁（2026-09-29） | 三語定稿，日文版為準；Danny 無法安排專業審閱，由 Claude 按日本法令常見要求撰寫。 |
| 文章發布節奏 | 第一批 10 篇於 2026-09-29 發布；其餘由 Danny 定期指示發布。 |
| 常見問題（2026-09-30） | Danny 指示把整個初型做完（包括 Q&A）。常見問題由每語 8 條擴充為 36 條、7 個分類（人在海外、租屋、買房與賣房、物業管理、生活支援、費用、公司與聯絡），三語同一結構；公司資料以代號從 config/site.ts 帶入。常見問題頁改為「分類索引＋分組問答＋搜尋」；每個服務頁加入最多 4 條相關問答；首頁在最後諮詢區前加入 4 條常見問題（三語皆有），取代日文／英文首頁原本放在指南位置的問答。 |
| 常見問題語言（Danny 2026-09-30） | 常見問題只做繁中及英文，日文不做（沒有日本客人）。由 config/site.ts 的 faqLocales 控制；日文頁面不顯示常見問題連結及問答區，/ja/help 不存在。取代「FAQ 提供繁中、日文與英文」。租屋及買賣仲介費不在網站詳寫（兩題已刪除）。日文版其他頁面（首頁、服務、關於我們、聯絡等）保留。 |
| 首頁主標題（Danny 2026-09-30） | 繁中首頁主標題「福岡生活，由在地人帶路。」；日文、英文維持「Build Your Life in Fukuoka.」。 |
| 租屋示意圖（Danny 2026-09-30） | 租屋相關圖片使用 Danny 提供的 AI 生成示意圖，並標明「示意圖，並非實際出租物件」；不使用客人已入住的照片。 |
| 上線方式（Danny 2026-09-30） | 網址用 www.fukuokainsider.com/re（與現有 WordPress 同網域，WordPress 其餘部分不變）；主機用 Cloudflare（Danny 開帳號）；後台於部署時設定並附中文維護手冊；正式公開時解除 noindex、提交 Google Search Console、使用 Cloudflare Web Analytics（不用 cookie）。改 DNS 前仍須 Danny 最後確認。 |
| 租屋初期費用估算（Danny 2026-09-30） | 分三組：01 每月費用（月租、共益費、其他每月費用，必填）；02 簽約時一般需要的費用（預設勾選）；03 視物件而定的費用（預設不勾）。仲介費預設 1.1 個月；保證公司費用按「每月合計（租金＋共益費＋其他每月費用）」計算。結果標明「只供參考，並非報價」。 |
| 估算工具的入口（Danny 2026-09-30） | 頁頂選單維持 4 項（服務、指南、常見問題、關於我們），不加入費用估算。改為：首頁「服務與支援」之後加入「租屋或買房，先了解要準備多少」區塊：租屋卡輸入月租即見金額（按鈕帶月租進入完整估算）；買房卡只列出費用項目，不顯示金額（Danny 決定，因買房費用因案件而異，且網站不公開仲介費金額），附買房估算連結。電腦及平板兩卡並排，手機左右滑動並有「租屋／買房」切換。商業物件（店舖、辦公室）不做估算，卡片下方一句引導直接查詢；租屋類指南文章側欄加「初期費用估算」方框；手機版選單加估算連結；頁尾及租屋／買賣服務頁保留連結。 |
| 文案與翻譯次序（Danny 2026-10-01） | 改版期間文案只修改繁中；日文及英文到最終版本時一次過翻譯，段落結構與繁中一致。取代「每次修改三語同步」的做法。 |
| 用詞統一（Danny 2026-10-01） | 主要按鈕「免費諮詢」；其他聯絡按鈕「LINE 聯絡／WhatsApp 聯絡／致電」；內文用「諮詢／聯絡」，不用「查詢」（台灣讀者會理解為搜尋）；「視乎」改「依…而定」；統一用「換鎖費」。保證公司費用寫「50%–100%（即 0.5–1 個月）」，估算示例預設 0.5 個月。首頁開頭維持三項服務，保持簡短。 |
| 買房費用估算（Danny 2026-10-01） | 重做為按時間排列：簽約至交屋時、交屋後 6–12 個月（不動產取得稅）、每年持有成本；另列海外買家須知及計算方法。仲介費預設按法定上限計算並註明公式「價格 × 3% ＋ 6 萬日圓，另加消費稅（低價物件另有規定）」，客人可修改（Danny 批准公開此公式，僅限估算工具）。預設買家類型為「投資／海外業主」（不套用住宅減免），可切換自住。固定資產稅精算以 4 月 1 日起算（福岡習慣）。稅率按 2026 年 10 月稅制，2027 年 3 月 31 日前須按稅制改正複查。 |
| 日文及英文版（Danny 2026-10-01） | 繁中定稿後，日文及英文已按繁中內容與段落結構一次過更新。日文用「無料相談」「LINEで相談／WhatsAppで相談／電話で相談」；英文用 "Free Consultation"、"Chat on LINE / Chat on WhatsApp / Call us"；英文免許統一為 "Real estate brokerage licence"，保證公司為 "guarantee company"，共益費為 "common-area fee"，英式拼法。之後再改文案時，三語同步修改。 |
| 買房估算物件類型（Danny 2026-10-01） | 物件類型分兩組選擇：公寓／獨立屋 × 二手／新建。新建獨立屋按保存登記稅率及新建住宅扣除計算，仲介費預設計入；只有新建公寓預設不計仲介費。公寓的土地評價額按整幅土地評價額 × 土地持分（敷地權割合）。 |
