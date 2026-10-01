# Redesign progress（美術升級＋文案修訂）

分支：`claude/redesign`（從 `main` 開出）。Codex 暫停期間，此資料夾只由 Claude 修改。

## 2026-09-28 — 第 1 階段：首頁美化方向

### 已完成
- 讀取 PRODUCT.md、02_PROJECT_BRIEF.md、03_DECISIONS.md、DESIGN.md、AGENTS.md。
- 建立分支 `claude/redesign`，commit `chore: snapshot before Claude redesign`（保存改版前狀態，包括之前未 commit 的 design-mockups 與辦公室照片）。
- repo 設定 `core.autocrlf=true`：之前 git 顯示 30 個「已修改」檔案其實只是 Windows 換行符號差異，內容沒有變。
- `.gitignore` 加入 `/tmp/` 與 `desktop.ini`。
- 截取原版首頁 1440px／390px 作為基準。
- 在設計畫布「Fukuoka Insider 首頁設計方向」新增頁面「第1階段：原版美化 3 方向」：
  - 方向 1 · 和紙編集（桌面＋手機）
  - 方向 2 · 玄界灘（桌面＋手機）
  - 方向 3 · 石と光（桌面＋手機）
  三個方向都保留原版首頁的區塊順序與繁中文案，只改質感；頁頭用 Logo 方案 1（橫排）、頁尾用方案 2（上下排）作示範。

### 下一步
1. Danny 選定方向（或指定混合）。
2. 建立統一設計系統（色彩、字體、間距、按鈕、卡片、頁頭、頁尾）→ 套用首頁 → 截圖 1440／834／390。
3. 修正首頁信任區塊 MotionReveal 不顯示的 bug（在套用首頁時一併處理）。

### 待 Danny 決定
- 選哪個方向（1／2／3 或混合）。
- Logo 組合：頁頭方案 1、頁尾方案 2 是否確定？方案 3（只用「[ I」符號）是否取得老闆同意？
- 03_DECISIONS.md 寫明「Logo 不可修改」。去掉黑色方塊底、做透明深色／白色版，屬於改 Logo 檔案的底色處理（圖形不變），需要 Danny 確認後更新該決策紀錄。
- 最後 CTA 區加入「LINE 查詢」「電話」兩個輔助按鈕（原版只有免費諮詢）——符合「每頁有清楚下一步」的目標，請確認。
- 頁尾加入公司免許號碼與地址（資料來自 config/site.ts），請確認。

## 2026-09-28 — 第 2 階段：設計系統（進行中）

### 已決定
- Danny 選定 **方向 1 · 和紙編集**。目標：全站質感提升到「10 萬美元」級，並以香港／台灣客戶角度吸客。

### 已完成
- 設計畫布新增頁面「第2階段：設計系統（方向 1）」：色彩、字體（Cormorant Garamond／Noto Serif TC・JP／Noto Sans TC・JP）、字級、間距與格線、按鈕、元件（服務列、事實資料列、指南卡片、人物）、頁頭（照片上／捲動後／手機）、頁尾、動態原則。
- 發現：網站目前沒有正式載入任何網頁字體（只靠訪客電腦內建字體），這是質感不足的主因之一；設計系統會正式載入。

### 待 Danny 決定（香港／台灣客戶角度的建議，均需確認屬實才寫）
1. 寫明「可用廣東話、普通話溝通」（目前只寫「繁體中文」，那是文字不是口語）。
2. WhatsApp：香港客常用；目前未設定所以全站隱藏。是否開 WhatsApp Business 號碼？
3. 回覆時間／營業時間（日本比香港、台灣快 1 小時）。
4. 海外客「人不在日本」時可以做到哪些步驟（看房視訊、簽約、匯款、交樓）？只寫做得到的。
5. 納稅管理人服務是否放入物業管理頁（海外業主常需要）。
6. Instagram 追蹤人數可否作為信任資料顯示。
7. 首頁信任區是否加入「負責人 Danny：香港出身、定居福岡、宅地建物取引士」一行（業務決定目前只准人物放 About 頁）。
8. 用字：「私隱」是香港用法、「隱私」是台灣用法，文案修訂時會選兩地都自然的寫法。
- 另外仍待回覆：Logo 透明化是否更新決策紀錄、頁頭方案 1／頁尾方案 2、CTA 加 LINE／電話、頁尾加免許及地址。

### 下一步
- 確認設計系統 → 寫入程式（config 與全站 CSS tokens、字體載入、頁頭、頁尾）→ 首頁套用＋修 MotionReveal bug → 截圖 1440／834／390。

## 2026-09-28 — 首頁套用設計系統（已完成，待 Danny 看截圖確認）

### Danny 已批准
- Logo 透明化並更新決策紀錄；頁頭 Logo 方案 1、頁尾方案 2；CTA 加 LINE／電話；頁尾加免許號碼與地址。（已寫入 03_DECISIONS.md、DESIGN.md）

### 已完成
- `app/design-system.css`：全站設計 tokens 與共用元件（按鈕、文字連結、事實資料列、Logo 組合、頁頭、頁尾）。
- 字體改為網站自帶（@fontsource），不再依賴訪客電腦字體或 Google Fonts。
- Logo：由原檔向量化成透明底 SVG（深色／白色），另做「[ I」符號與 favicon。
- 新頁頭：照片上用白色 Logo，捲動後固定並轉為米白底；手機版常駐「諮詢」按鈕，選單內有 LINE／電話。
- 新頁尾：Logo 上下排、四欄連結、公司名＋免許＋地址。
- 首頁全面重做（`app/home.css`，舊 `homepage-phase1.css` 已刪除），結構和文案不變；只保留一個首屏進場動畫。
- 修好「我們就在福岡」不顯示：首頁內容區不再在動畫前隱藏；`MotionReveal`（租屋頁、指南頁仍在用）改為任何部分進入畫面即顯示，並有 2.4 秒保底。
- 已檢查：繁中／日文／英文，1440／834／390；lint、測試、正式建置通過。
- 其他頁面仍是舊樣式（會逐頁重做），但新頁頭頁尾已套用全站，未見版面破損（已檢查關於我們頁）。

### 注意
- **Danny 在自己電腦需要先執行一次 `pnpm install`**（新增了字體套件），再 `pnpm dev`。
- 自帶 CJK 字體會令建置輸出約 97MB／約 2,800 個字體切片檔；訪客只下載用到的字，Cloudflare 上限內，正式部署前再評估是否精簡。

### 下一步
- Danny 確認首頁 → 服務總覽＋4 個服務頁（每頁先列「問題＋建議改法」再改）。
- 香港／台灣客角度的 8 項建議仍待 Danny 回覆（見上一節）。

## 2026-09-28 — 服務總覽＋4 個服務頁：問題與建議（待 Danny 確認）

已截圖檢查繁中 1440／390，並讀三語文案（data/service-pages.ts、data/rent-page.ts）。

### 美術
1. 租屋頁是另一套設計（3D 插圖、波浪線、圓圈裝飾、英文大寫標籤），與其他 3 頁不一致 → 4 頁改用同一個服務頁模板，刪除插圖、波浪線與圓圈。
2. 標題斷行難看（「福岡租／屋服務」「正在找福／岡租屋？」「我們可／以協助」）→ 改用詞組斷行、標題縮小。
3. 服務頁用深藍綠漸層、灰藍底，不在設計系統內 → 改用墨色＋和紙＋石色。
4. 每頁都有一大塊辦公室照片＋免許深色框（首頁已有）→ 服務頁改為一行精簡公司資料＋最後諮詢區。
5. 物業管理頁首圖是辦公室照片，和下方信任區重複 → 改用平面圖＋鑰匙照片（guide-planning.png）。
6. 最後 CTA 只有「免費諮詢」→ 加 LINE、電話（與首頁一致）。
7. 服務總覽頁：一次只顯示一項服務（切換式導覽）＋水彩色塊（plaque），頁面沒有結尾 CTA → 建議改為 4 項服務同時可見＋結尾 CTA。⚠️ plaque 與切換式導覽是 03_DECISIONS 記錄的已確認設計，需 Danny 批准才改。

### 文案
8. 生活支援頁標題寫成「入住與生活支援」，全站其他地方都是「生活支援」→ 統一為「生活支援」（三語同步）。
9. 物業管理：業務決定是兩組（出租物業管理／度假別墅等第二居所管理），頁面卻列 3 項（第 3 項「個別委託項目」不是服務）→ 改回兩組，第 3 項併入說明。
10. 「可以協助的事」與「服務範圍」內容重複 → 合併成一節。
11. 「按個案確認」「實際程序依情況調整」等保留字眼每頁出現 4–6 次，讀起來防衛、不溫暖 → 集中到「事先說明」一節，其他地方刪除。
12. 稱呼：繁中目前用「你」→ 建議改「您」（香港、台灣商務語氣較常用），全站統一。
13. 內頁 H1：租屋頁叫「福岡租屋服務」，其他頁只寫服務名 → 統一用服務名作 H1。

### 建議統一模板（業務決定要求的內容全部保留）
首圖（服務名＋一句說明＋免費諮詢／LINE）→ 適合誰 → 可以協助的事 → 一般流程（4 步，真正的步驟才用編號）→ 查詢前可準備（連到費用估算）→ 事先說明 → 精簡公司資料＋諮詢區。
預計每頁由約 6,000px 縮短到約 4,000px（電腦版）。

## 2026-09-28 — 服務頁完成＋全站檢查

### 已完成
- 服務總覽＋4 個服務頁改用統一模板（commit 1b9e672），三語文案重寫，繁中改用「您」。
- 品牌標誌性細節：照片「括號框」（取自 Logo 的三個角），用在服務頁首圖和首頁信任區照片。
- 共用元件：ConsultBand（最後諮詢區，免費諮詢＋LINE＋電話）、CompanyFacts（公司資料列）。
- 小修正：固定頁「你」→「您」；免責聲明「保証公司」→「保證公司」；英文首頁 "trusted partners" → "external partners"（避免無法證實的形容）；首頁信任區照片說明與括號框重疊。

### 全站檢查結果（2026-09-28，繁中 1440／390 截圖＋三語文案）
已完成新設計：首頁、服務總覽、4 個服務頁。
仍是舊設計：關於我們、聯絡、常見問題、指南、費用估算（總覽＋2 工具）、3 個法律頁、404。

優先度高
1. 指南：8 篇文章全部是「待審核」，公開頁只顯示「指南文章尚未發布」，但主選單和頁尾都有「指南」→ 訪客看到空頁。建議 Danny 審閱後指示「發布」首批 3 篇（首頁精選指南也會隨之出現）；或暫時把「指南」從選單移除。⚠️ 須 Danny 明確說「發布」。
2. 404 頁：是系統預設英文頁、沒有頁頭頁尾 → 做品牌化三語 404，附回首頁／服務／聯絡連結。
3. 社交分享預覽圖（OG image）：未設定。香港／台灣客常在 WhatsApp、LINE、Facebook 轉發連結，沒有預覽圖會顯得不專業 → 為首頁及主要頁面製作分享圖。另加 iPhone 桌面圖示（apple-touch-icon）。
4. 關於我們、聯絡、常見問題、指南、工具、法律頁：仍是深藍／藍綠漸層、標題斷行難看（例：「在福岡營／運的房地／產公司」）、CTA 區只有一個按鈕 → 逐頁套用設計系統。

優先度中
5. 聯絡頁：電話顯示 092 格式（海外客打不通）→ 繁中／英文改國際格式；「即時通訊」改為「LINE」；桌面版加 LINE 與諮詢表 QR code（業務決定已容許）。
6. 關於我們：人物照片互相重疊、文字卡壓在照片上，手機版擁擠 → 改為清楚的人物＋公司概要表。
7. 日文選單「私たちについて」→ 建議改「会社概要」（日本公司網站慣用）。
8. 法律頁繁中標題「私隱政策」是香港用語，台灣用「隱私」→ 建議「隱私政策」（兩地都看得懂）。法律頁仍為草稿，上線前須專業審閱（已知）。

需要 Danny 提供的事實（寫上去之前必須確認）
- 可用廣東話、普通話溝通？ WhatsApp 號碼？ 營業時間／回覆時間？
- 公司概要：設立年月、代表者姓名、營業時間、定休日、最近車站與步行時間。
- 海外客「人不在日本」可以做到哪些步驟？ 納稅管理人服務是否放入物業管理？ Instagram 追蹤人數可否顯示？

### 下一步（待 Danny 確認）
關於我們 → 聯絡 → 常見問題 → 指南 → 費用估算 → 法律頁 → 404（每頁先列問題＋建議，再改）。

## 2026-09-28（續）— 所有內頁完成

### 已完成
- 關於我們：首圖＋辦公室照片（括號框）、公司故事、負責人（Ricky／Danny）、公司概要表（設立 2024年2月、代表 Ricky、所屬團體、交通、定休日、語言、Instagram 約7萬人追蹤）、Google 地圖連結。不顯示免許取得日期。
- 聯絡：三個聯絡方式（諮詢表為主、LINE、電話／Email，繁中／英文用國際電話格式）；電腦版附 QR code；「聯絡時可以先告訴我們」清單；辦公室資料＋Google 地圖。
- 常見問題：搜尋＋分類篩選＋摺疊問答＋熱門問題；語言答案改為廣東話・普通話・日語・英語。
- 指南：總覽（精選、主題、最新）、分類頁、文章頁（首圖、內文排版、側欄服務連結、相關指南）。未發布時顯示「指南文章正在準備中」。
- 費用估算（總覽＋2 工具）、法律頁（側欄＋編號段落，繁中「隱私政策」）、品牌化三語 404。
- 全站語言寫法統一為「廣東話・普通話・日語・英語」；日文選單「会社概要」。
- 社交分享預覽圖：public/og/{zh-TW,ja,en}/*.jpg（11 頁 × 3 語）；iPhone 桌面圖示 apple-touch-icon.png。
- 已檢查 1440／834／390 截圖（繁中＋日文／英文抽查）；lint、test、build 通過。

### 待 Danny 決定／提供
1. 營業時間或回覆時間（例：平日 10:00–18:00）。
2. WhatsApp 號碼（如有，將加入聯絡頁及諮詢區）。
3. 代表者顯示方式：目前「Ricky（Founder / President）」，是否用日文全名＋職稱（代表取締役）？
4. 約 20 篇文章放在哪裡？會先匯入為草稿，Danny 說「發布」才公開。
5. 納稅管理人：建議在度假別墅管理加一句「固定資產稅・都市計畫稅的納稅管理人（代收稅單及代為繳納）。不包括報稅或稅務諮詢。」—— 未加入，待確認。
6. Instagram「約7萬人追蹤」是否正確。
7. 是否有 Google 商家檔案連結（可取代地圖搜尋連結）。

### 下一步
- 等上述回覆後補入文案；匯入文章。
- 全站最終檢查（三語全頁截圖、連結、無障礙對比）。
- 提醒：新增套件後需在本機執行 pnpm install。

## 2026-09-29 — 公司資料補齊＋匯入 15 篇文章（未公開）

### 已完成
- 營業時間：星期一至五 10:00–18:00（日本時間）；休息日 土日祝。顯示於關於我們、聯絡頁。
- WhatsApp（+81 80-2042-2394，wa.me 連結）：加入聯絡頁、每頁最後諮詢區、手機選單、頁尾、FAQ「如何開始查詢」。
- 代表者：Ricky（代表取締役）／英文 Representative Director（首頁、關於我們）。
- Instagram：約 8 萬人追蹤。
- 物業管理 → 度假別墅等第二居所管理：加入納稅管理人一項（固定資產稅・都市計畫稅；代收稅單及代為繳納；不包括報稅或稅務諮詢），三語。
- 地圖：沒有 Google 商家檔案，維持地址搜尋連結。
- 文章：從「房地產\CC文章」匯入 15 篇繁中文章（原文照搬，只轉換格式）。
  - 原稿存放：content/guides/zh-TW/NN-slug.md；修改原稿後執行 `pnpm import:guides` 重新產生 data/guide-articles.generated.ts。
  - 分類、摘要、封面在 data/guide-articles.ts。全部狀態為「待審核」，公開頁仍顯示「正在準備中」。
  - 發布方法：Danny 說「發布」後，把該篇 status 改為 "published"，並填 publishedAt 和 editorialApprovedAt。
  - 封面：每篇用和紙風格的文字封面（編號＋關鍵詞＋日文用語），存於 public/images/guides/。避免同 4 張照片重複出現。
  - 指南卡片圖片比例統一為 16:9。
  - 文章排版新增：小標題分兩級、編號清單、引用框、粗體重點。

### 待 Danny 確認
1. 發布哪些文章（可全部，或先發首批）。來源檔案中第 20、23 篇標示為「草稿」。
2. 文章中需要 Danny 自行確認的地方（我沒有改原文）：
   - 第 1 篇「95% 以上的情況下」：無出處的數字，建議改為「絕大多數情況下」。
   - 第 21 篇「平置き駐車場の月租」混入日文「の」；「租車族」應是「開車族」？
   - 第 9 篇原稿格式有錯位（小標題黏在段落、清單前有「>」），網站上已自動修正排版，原稿可順手修正。
   - 文章用「你」，網站其他頁用「您」。專欄語氣用「你」較親切，建議保留。
3. 找到 15 篇（編號 1–23，缺 6、10、12、13、15、17–19）。如有其他文章請提供。

## 2026-09-29（續）— 質感升級：色彩、博多織紋樣、指南版面

### 已完成
- 全站配色由「米白＋黑」改為「石垣と濠」：福岡城石垣的石色（#F2F1EC／#E7E4DC）、大濠公園的濠綠（#2F5249，深色區 #14201D）、博多織金線（#A8843F，只用在紋樣）。原因：米白＋黑是近年最常見的模板配色，辨識度低；新配色取自辦公室所在的大手門（福岡城）與大濠公園，是公司獨有的故事。只改色彩代號（app/design-system.css），版面與字體不變。
- 招牌紋樣「博多織・獻上柄」條紋（public/images/brand/hakata.svg，CSS class .fi-hakata）：只用在指南（總覽、分類、文章）與首頁「福岡生活資訊」區，不到處使用。
- 指南版面重做：
  - 精選 3 篇用照片（保證公司→平面圖照片、初期費用→室內照片、深夜收垃圾→福岡街道照片 public/images/guides/fukuoka-street.jpg）。
  - 其餘文章用「文字目錄」：分類＋完整長標題＋摘要，不再用重複的圖片或色塊封面（已刪除 15 張文字封面）。
  - 主題切換按鈕（全部／租屋／福岡生活，附篇數）。
  - 文章頁：標題旁放博多織紋樣；有照片的文章才顯示大圖；相關指南改為文字目錄。
  - 手機版：精選第 2、3 篇改為小圖橫排，縮短頁面長度。
- 首頁：精選指南只顯示 3 篇（移除「最新指南」列表），加「查看全部指南」連結；「福岡生活資訊」區改用博多織紋樣，避免與精選指南重複同一張室內照片。
- 每篇文章的分享預覽圖（public/og/guides/<slug>.jpg，含完整標題）；全站分享預覽圖、favicon、iPhone 圖示改用新配色。
- 資料：Guide 的 coverImage 改為選填（精選文章必須有照片，驗證會檢查）；新增 ogImage。

### 待 Danny 決定／提供
1. 新配色是否接受？（如不喜歡，可一步還原為舊配色。）
2. 照片：網站只有 4 張情境照，重複使用是「普通網站感」的主因。請提供 15–30 張你 Instagram 上自己拍的福岡照片（街景、公寓外觀／室內、辦公室、帶客看房等），我會統一調色後用在指南、服務頁和首頁。
3. Ricky 和 Danny 的照片右下角有半透明方塊（原檔就有），請提供沒有方塊的原圖。

## 2026-09-29（續）— 資料夾整理（改由 Claude 維護）

### 已完成
- 刪除 Codex／OpenAI 專用檔案：`.codex/`、`.agents/`（Codex 技能）、`.impeccable/`、`.openai/`、`app/chatgpt-auth.ts`、vite 設定中的 OpenAI sites 外掛。
- 刪除範本殘留：`db/`、`drizzle/`、`drizzle.config.ts`、`examples/`（網站沒有用資料庫）及相關套件。
- 刪除舊設計檔：`design-mockups/`、`assets/source/real-estate/`（舊插圖）、三個已不用的舊 CSS（v1-pages／editorial-pages／tools-pages，約 57KB）、`components/MotionReveal.tsx`、舊的 `docs/DESIGN_SYSTEM.md`。以上都仍保存在 git 歷史，需要時可取回。
- 刪除可重建的暫存：`.next/`、`dist/`、`.vinext/`、`.wrangler/`、`tmp/`、空資料夾。
- 整理：`AGENTS.md`（Codex 指示）改為 `CLAUDE.md`；重寫 `README.md`、`docs/ARCHITECTURE.md`；Codex 時期的進度紀錄移到 `docs/archive/`；根目錄的 Logo 與人物原圖移到 `assets/source/`。
- 修正 git 內的 desktop.ini 造成的警告。
- 驗證：lint、test、build 通過，頁面外觀不變。

## 2026-09-29（續）— 指南列表縮短＋本機預覽

- 指南總覽「所有指南」先顯示 6 篇，按「顯示全部 15 篇」展開（Danny：先簡單，之後再改）。
- 本機預覽（pnpm dev）會顯示「待審核」文章，文章頁標示「未發布（只在本機預覽顯示）」；正式建置不會出現（已檢查建置結果）。
- 新增 `預覽網站.bat`：Danny 按兩下即可在自己電腦開網站（自動安裝、啟動、打開瀏覽器）。
- 線上測試網址（Cloudflare 臨時網址，noindex）：待 Danny 決定是否開 Cloudflare 帳號並批准部署。

## 2026-09-29（續）— 指南語言、服務頁連結文章、速度、全站檢查

- 決定（Danny）：指南只做繁中；英文待定；日文確定不做。`config/site.ts` 的 `guideLocales` 控制哪些語言的選單顯示「指南」（目前只有 zh-TW；日後有英文文章時加入 "en"）。
- 日文／英文：選單、頁尾不再顯示指南；首頁指南區改為「よくあるご質問／Questions clients often ask」（3 條熱門 FAQ）。繁中在文章未發布時也顯示同一區塊。
- 服務頁新增「查詢前可以先了解」：租屋（初期費用、保證公司、審查電話）、生活支援（深夜收垃圾、瓦斯、宅配盒子）。對應表在 `data/service-guides.ts`；只顯示已發布文章。買賣、物業管理暫無合適文章。
- 繁中 FAQ 連到真實文章（保證公司、審查電話）。
- 速度：情境照與人物照改為 WebP（每張約 2.3MB → 約 150KB），原檔移到 `assets/source/photos/`。
- 手機版頁尾：聯絡方式改兩欄，縮短長度。
- 全站檢查：64 頁（三語）無失效連結、無錯誤；390／1440 截圖檢查完成。

## 2026-09-29（續）— 第一批文章發布、法律頁定稿

- 文章修正（Danny 指示）：第 1 篇「95% 以上的情況下…強制性的」→「絕大多數情況下…通常是必須的」；第 21 篇「租車族」→「開車族」、「平置き駐車場の月租幾乎必定」→「平置き駐車場的月租通常」。只改網站內的副本（content/guides/zh-TW），Danny 電腦上「房地產\CC文章」原稿未改。
- 第一批發布 10 篇（Danny 指示「第1批先上線10篇」，2026-09-29）：保證公司與連帶保證人、初期費用、深夜收垃圾、都市瓦斯與 LP 瓦斯、房型縮寫、不附家具、換鎖費與24小時支援費、敷引、保證公司審查電話、寵物友善物件。
- 未發布（之後定期發布）：南向、自走式停車場、陽台、原狀回復（原稿為草稿）、宅配盒子（原稿為草稿）。發布方法：在 data/guide-articles.ts 該篇加 `published: "日期"`。
- 法律頁（隱私政策、免責聲明、使用條款）三語重寫：依日本個人情報保護法、宅建業法常見要求；日文版為準；福岡地方法院管轄；公司資料取自 config/site.ts；移除「草案」標示與 noindex 設定（整站仍為 noindex）。Danny 表示無法找專業人士審閱，已告知風險。

## 2026-09-29（續）— 換上實拍照片

- Danny 提供 73 張照片（`照片/`）。挑選 4 張，統一調色並轉成 WebP：首頁主圖（大濠公園，Danny 自拍）、首頁服務區（中洲那珂川，Unsplash）、生活支援頁（JR 博多站，Danny 自拍）、關於我們新增福岡城跡石垣與護城河照片（Danny 自拍，配合「石垣と濠」配色）。
- 詳細來源、授權與未採用原因：docs/photo-sources.md。來源不明的圖片暫不使用。
- 首頁、服務總覽、生活支援的分享預覽圖已改用新照片。
- `照片/` 原檔加入 .gitignore（太大，不放進 git）。
- 仍需：沒有半透明方塊的 Ricky／Danny 原圖；自己拍的租屋室內照（目前租屋頁仍用示意圖）。

## 2026-09-30 — 高級感調整＋動態效果

- 參考 Danny 分享的影片（主題是 impeccable 設計技能）：直接閱讀 impeccable 的公開規則（github.com/pbakaus/impeccable），套用適合本站的原則：只做一個「主角」動態；內容預設可見；尊重「減少動態」設定；瀏覽器細節（選取文字顏色、捲軸、游標）配合品牌色；不加裝飾性標籤。
- 首頁開場（唯一的主角動態）：大濠公園照片由模糊「對焦」變清晰並輕微放大收回，接著標題逐行從遮罩中升起，再出現說明、按鈕和底線。
- 全站頁面標題：逐行遮罩升起（與首頁一致的簽名動作）。
- 捲動出現（只限少數元素，不是每一區都動）：括號框照片由上而下展開、括號角由內向外張開；大照片展開；博多織紋樣像布料展開。
- 首頁「服務與支援」：滑鼠移到／鍵盤選到某項服務，左邊照片換成該服務的照片（手機維持原照片）。
- 細節：選取文字、捲軸、游標用品牌色；文字連結 hover 變濠綠；首頁主圖上方加深，選單文字更清楚；首頁精選指南標題區對齊修正；福岡生活區紋樣收窄。
- 技術：`app/layout.tsx` 在畫面出現前加 `fi-motion`（使用者要求減少動態則不加）；`components/site/MotionObserver.tsx` 負責捲動出現；腳本失敗時 4 秒後自動取消動態，內容不會被藏起。

## 2026-09-30 — 依「無 AI 味網站設計指引」審查

- Danny 提供指引，存為 `docs/design-guidelines-no-ai-look.md`；`CLAUDE.md` 規定每次改設計前必讀（連同 PRODUCT.md）。
- PRODUCT.md 新增：訪客心理狀態、核心體驗「在地引路」（大手門＝福岡城正門）、現實隱喻（石垣與濠、博多織、Logo 括號＝對焦）、遮名測試；指南語言政策更新。
- 第一層（四原則）＋第二層（避坑清單）審查後修正：
  - 「聯絡時可以先告訴我們／查詢前準備清單」的空白方框看起來像可勾選的核取方塊，其實不能點 → 改為短橫線（原則①符合預期）。
  - 服務頁「我們可以協助的事」三張等大卡片 → 改為編輯式分欄（上方一條細線，無卡片底色）。
  - 聯絡頁「建議」外框小標籤（像可點的 pill）→ 改為純文字。
  - 細邊框＋大陰影並用（準備清單、費用估算結果）→ 只保留陰影。
  - 首頁辦公室照片下重複的公司名小字 → 刪除，只留地點。
  - 聯絡頁清單上方與段落標題重複的標頭 → 刪除。
  - 指南分類頁標題層級由 h1 直跳 h3 → 修正為 h2。全站 3 語共 37 頁已自動檢查標題層級。

## 2026-09-30 — 全站重新審視＋常見問題（Q&A）完成

### 已完成
- 全站（繁中 18 頁，1440／390）重新截圖審視；三語 67 頁自動檢查：無失效連結、無錯誤、手機無橫向捲動。
- 常見問題：由每語 8 條擴充為 **36 條、7 個分類**（人在海外、租屋、買房與賣房、物業管理、生活支援、費用、公司與聯絡），繁中／日文／英文同一結構。
  - 頁面改為「左側分類索引（電腦）／分類按鈕列（手機）＋分組問答＋搜尋」，刪除重複的「常見查詢」側欄。
  - 答案可有條列，並附相關連結（指南、費用估算、服務頁）。`/help#q-…` 可直接打開某一題。
  - 公司資料（免許、營業時間、地址、語言、協會）以代號從 `config/site.ts` 帶入，不寫死；驗證會阻擋寫死的資料或缺少某語言的問題。
  - 加入 FAQPage 結構化資料（日後上線有助搜尋結果顯示）。
  - 法律與稅務相關內容已由獨立檢查按官方資料核對並修正（外匯法報告、10.21% 源泉徵收、簽名證明、仲介手續費上限、不動產取得稅時間、瓦斯開栓等）。
- 每個服務頁加入「常見問題」（最多 4 條相關問答＋查看全部）。
- 首頁在最後諮詢區前加入 4 條常見問題（三語皆有）；日文／英文首頁原本放在指南位置的問答移到這裡。
- 關於我們：刪除公司概要旁純裝飾的「[ I」符號。
- 日文隱私政策標題在手機會撐出畫面 → 改為「プライバシー／ポリシー」兩行。

### 待 Danny 確認（常見問題中涉及公司做法的句子）
1. 能否安排「線上視訊看房」或「由我們到現場拍攝」物件（目前寫：要視乎物件及管理公司同意，逐一確認）。
2. 出租管理：租金由我們或保證公司收取，扣除約定費用後匯給業主（包括匯到海外帳戶）。
3. 營業時間外的訊息「會在營業時間內依次回覆」。
4. 到辦公室面談「請先預約」。
5. 文字資料可用繁體中文、日文、英文。
6. 租屋仲介手續費：已按法律寫明「向租客收取原則上半個月，事先同意時最多一個月」。請確認與公司實際做法一致。

### 仍待 Danny 提供／決定（之前已列）
- 首頁主標題英文「Build Your Life in Fukuoka.」是否改為中文。
- 沒有半透明方塊的 Ricky／Danny 原圖；自己拍的租屋室內照。
- 其餘 5 篇指南何時「發布」。

### 下一步
- 按 Danny 對上述 6 點的回覆調整常見問題。
- 照片到位後，替換租屋／買賣頁的示意圖。

## 2026-09-30（續）— 常見問題按 Danny 回覆定稿

- 看房：可以安排線上視訊看房（要視乎是否空室及管理公司是否同意）；刪除未確認的「由我們到現場拍攝」。
- 出租管理收租：匯到海外帳戶有國際匯款手續費，按個案商量。
- 營業時間外依次回覆、面談請先預約、文字資料可用繁中／日文／英文：Danny 確認。
- 租屋仲介費：寫明「福岡一般由租客支付一個月租金＋消費稅」，並按法律說明需事先取得租客同意（申請前說明）。

## 2026-09-30（續）— 常見問題只保留繁中＋英文

- Danny 指示：常見問題只做繁中及英文（沒有日本客人）。日文版常見問題頁（/ja/help）、日文選單與頁尾的「よくある質問」、日文首頁及服務頁的問答區已移除；由 `config/site.ts` 的 `faqLocales` 控制。
- 文字資料改寫為「可以使用中文、日文或英文」（不特別寫繁體）。
- 刪除「租屋的仲介手續費是多少？」一題（Danny：不在網站詳寫）。常見問題現為 35 條。
- 已更新 03_DECISIONS.md、PRODUCT.md、CLAUDE.md、docs/editorial-publishing.md。

### Danny 回覆（同日）
- 「買賣的仲介手續費是多少？」一題刪除。常見問題現為 34 條。
- 日文版其他頁面（首頁、服務、關於我們、聯絡等）保留。

## 2026-09-30（續）— 人物照修圖、首頁主標題方案

- Ricky／Danny 人物照：已去除右下角半透明方塊（按像素還原，不是 AI 生成），網站首頁與關於我們已換上。
- 首頁主標題：做了 3 個方案給 Danny 比較（A 英文原版／B「在福岡安家，從這裡開始。」／C「福岡生活，由在地人帶路。」），待決定。
- 租屋室內照：這裡無法生成照片；建議用看房時拍的空室照片（管理公司同意），或 Danny 下載的免費授權圖庫照片。目前租屋頁仍用示意圖並已標明「並非指定出租物件」。
- 後台：目前沒有後台（原計劃的 CMS 未選定）。暫時由 Danny 告訴 Claude「發布第X篇」；正式上線部署時再加簡易後台並寫維護手冊。

## 2026-09-30（續）— 中文主標題、租屋示意圖

- 首頁繁中主標題改為「福岡生活，由在地人帶路。」（Danny 選方案 C）；日文、英文首頁維持「Build Your Life in Fukuoka.」。
- 租屋示意圖：換上 Danny 提供的 AI 生成室內圖（見 docs/photo-sources.md）；說明文字改為「示意圖，並非實際出租物件」。

## 2026-09-30（續）— 負責人介紹

- Ricky 介紹按 Danny 提供的 Ricky 個人簡介（Fukuoka Connections Center 網站截圖）改寫：香港出身、曾在多國生活工作、定居福岡、親身經歷簽證／找房／創業手續的難處；負責公司營運與品牌發展。按原決定不提 fukuoka.cc／Fukuoka Connections Center，名字維持「Ricky」。
- Danny 介紹同步加長，兩人篇幅平衡（三語）。
- 待 Danny：是否顯示中文全名「魏俊杰」；如有截圖中那張 Ricky 照片（戴眼鏡、交叉手）的原檔，可換上（截圖解析度不足）。
- Ricky 照片換成 Danny 提供的新照片（戴眼鏡、雙手交叉）。兩人都不加中文全名（Danny 確認）。
- 照片收件資料夾：`照片/Danny 新放入的照片/`（Danny 放入 → Claude 處理後移走）。
- 關於我們「負責的人」：取消一高一低，改為兩人同大小並排、頂部對齊（Danny 選方案 A）。Danny 照片改用完整高度的 4:5 裁切（721×901），頭部大小與 Ricky 相若（原圖頭頂空間較少，所以頭位置略高）。

## 2026-09-30 — 進度總覽（給 Danny）

網站本身：約九成完成。上線準備：未開始（等 Danny 決定）。

已完成：首頁、服務總覽＋4 個服務頁、關於我們、聯絡、常見問題（繁中／英文 34 條）、指南（繁中，已發布 10 篇）、2 個費用估算工具、3 個法律頁、404；設計系統、Logo、網站小圖示、分享預覽圖、動態效果、實拍照片與示意圖；三語（指南只繁中、常見問題只繁中＋英文）；手機／平板／電腦檢查。

上線前要做（需 Danny 決定或提供）：
1. 網址：放在 fukuokainsider.com/re（與現有 WordPress 同網域，需技術整合）或獨立子網域（例如 re.fukuokainsider.com，較簡單）。
2. Cloudflare 帳號（免費方案即可）→ 先部署測試網址給 Danny 用手機試。
3. 後台：部署時一併設定，寫中文維護手冊。
4. 正式上線：移除 noindex、提交 Google Search Console、網站流量統計（建議 Cloudflare Web Analytics，不用 cookie）。
5. 可稍後：其餘 5 篇指南、買賣／物業管理相關文章、更多實拍照片。

## 2026-09-30（續）— 上線方式確定

- Danny 決定：網址 www.fukuokainsider.com/re；Cloudflare 帳號 OK；後台＋中文手冊 OK；正式公開時解除 noindex、Search Console、Cloudflare Web Analytics OK。
- 建議流程：GitHub（私人倉庫，存放網站）→ Cloudflare Workers 連接 GitHub 自動部署 → 先用測試網址（*.workers.dev）給 Danny 試 → 設定後台 → 最後把 fukuokainsider.com 的 DNS 交給 Cloudflare 管理，/re 由新網站負責，其餘仍由 WordPress 負責。
- 待 Danny：開 GitHub 及 Cloudflare 帳號、在 Claude 設定連接 GitHub；告訴 Claude 網域及 WordPress 主機在哪家公司。
- 本機預覽（預覽網站.bat）Danny 開不到，待看錯誤畫面。

## 2026-09-30（續）— 測試網址上線

- GitHub 私人倉庫：`daniyyy/fukuoka-insider-re-website`（main 分支 = 網站現況）。Claude GitHub App 已授權此倉庫。
- Cloudflare Workers 專案：`fukuoka-insider-re-website`（Danny 的 Cloudflare 帳號），已連接 GitHub；每次推送 main 會自動建置及部署（pnpm run build → npx wrangler deploy）。
- 測試網址：https://fukuoka-insider-re-website.ktp21505.workers.dev/ （自動轉到 /re/zh-TW）。仍為 noindex；未發布文章不會出現。
- 修正：Cloudflare 上圖片／字體原本是空檔案（缺少 ASSETS 綁定），已在 vite.config.ts 加入 `assets: { binding: "ASSETS" }`。
- 已檢查：三語主要頁面 25 頁正常、圖片／字體／圖示正常、未發布文章 404、/ja/help 404。
- 工作方式：Claude 在 GitHub 倉庫修改並推送（自動上線到測試網址），同時把相同檔案同步到 Danny 電腦的網站資料夾並 commit（本機資料夾保留完整舊歷史，GitHub 從 2026-09-30 快照開始）。
- 下一步：Danny 把測試網址給 Ricky 看；等 Ricky 查清 fukuokainsider.com 網域資料後，接上 www.fukuokainsider.com/re；部署後加後台＋中文維護手冊。
- 修正（同日）：測試網址上所有連結按了沒反應。原因是網站框架 vinext 1.0.0-beta.2 的正式版建置有錯誤（本機預覽模式沒有這問題），已升級到 vinext 1.0.0。已用正式版建置測試：選單、服務連結、語言切換、常見問題展開／深層連結、指南「顯示全部」、費用估算、手機選單全部正常。
- 以後檢查：除了打開頁面，也要用正式版建置（`pnpm build` 後 `npx wrangler dev`）實際點擊測試。

## 2026-09-30（續）— 租屋初期費用估算改版（Danny 指定項目）

- 每項加勾選框（取消勾選＝不計入合計，數字保留可再勾回）。項目與預設：每月租金 ¥100,000、每月共益費 ¥5,000、24 小時緊急服務 ¥1,100（說明：多為每月 800–1,500 日圓）、禮金 1 個月、敷金（按金）1 個月、仲介費 1.1 個月（1 個月＋10% 稅）、保證公司 1 個月（說明：多為 0.5–1.5 個月；以租金＋共益費計算）、火災保險 ¥20,000（2 年；多為 2–3 萬）、換鑰匙費 ¥20,000、空調清潔（預設不勾）、其他（預設不勾）。
- 月數項目旁即時顯示換算金額；手機版底部固定顯示估算合計。三語同步。
- 取消原本的「需預付租金（月）」欄；日割租金請填在「其他」。
- 待 Danny 確認：共益費示例 ¥5,000、24 小時服務示例 ¥1,100、禮金／敷金預設 1 個月、保證公司以租金＋共益費計算。

## 2026-09-30 — Rental estimator, round 2 (Danny's feedback)
- Monthly rent and common-area fee moved to the top as required fields (no tick box).
- New items: rent paid in advance and common-area fee paid in advance (default 2 months each), plus move-out cleaning paid in advance (tickable, off by default).
- Guarantee company fee is based on rent + common-area fee. Default example total is ¥666,100.
- Clearer hints for every item in 3 languages; a "reference only, not a quote" line under the total (desktop and mobile sticky bar).
- zh-TW tool page ends with "延伸閱讀": 4 published initial-cost guides + link to all guides.
- Open for Danny: confirm the sample values (共益費 ¥5,000, 24h ¥1,100, 禮金/敷金 1 month each).

## 2026-09-30 — Rental estimator, round 3 (grouping, guide links, visual pass)
- Three numbered groups (Danny): 01 monthly rent + common-area fee (required, stone panel); 02 costs charged on most contracts (ticked by default); 03 costs that depend on the property (unticked: move-out cleaning, air-con cleaning, new "disinfection and pest control", other).
- Guides reachable while filling in (zh-TW only): the overview guide sits at the top of group 02; "相關文章" links under deposit (敷引), guarantor, 24-hour support and key replacement. They open in a new tab so entries are kept. The "延伸閱讀" list stays at the bottom.
- Visual: numbered group heads (Cormorant numerals in moat green), brand-coloured tick boxes, unticked rows recede (dashed field, struck-through amount), amounts show thousands separators while typing (caret kept; full-width digits accepted), dark result card with a "monthly rent + fee" line; the purchase estimator shares the dark card.
- Desktop result card is pinned by its bottom edge, so the total and consult button stay visible on 720–900px-tall screens.

## 2026-09-30 — Rental estimator, round 4 (guarantor base)
- Danny: the guarantee company fee is based on the monthly total (rent + common-area fee + other monthly charges such as 24-hour support), not rent + fee only.
- Section 01 "每月費用" now has three required fields (rent, common-area fee, other monthly charges, default ¥1,100) and shows the monthly total. The one-off "24-hour support" item became "預付其他每月費用" (2 months × other monthly charges).
- Guarantor = months × monthly total. Default example total is now ¥668,300.
- Open for Danny: whether to add 費用估算 to the header menu (recommendation in chat: keep the header at 4 items; link the estimator from the homepage, rent/buy pages, renting guides and the mobile menu).

## 2026-09-30 — Estimator entry points (Danny: keep the header at 4 items)
- Homepage: new "先算一算" block after Services (3 languages). One rent field → estimated total using the estimator's example settings (assumptions stated), button opens the full estimator with that rent prefilled (?rent=).
- Renting guide articles (zh-TW): dark "初期費用估算" box under the service box in the sidebar (article end on mobile).
- Mobile menu: "租屋初期費用估算" row under the four main links.
- Decisions recorded in 03_DECISIONS.md.
- Follow-up (Danny: right after Services it read as if we only do renting): the homepage estimate block moved to after "About", just before FAQ, as the "before you contact us" step. Added a purchase-cost estimator link under the text (no live figure for buying: costs vary too much by case to preset).
- Follow-up 2 (Danny): the block moved back to right after Services and now covers both: "租屋或買房，先了解要準備多少。" with a Renting card (live figure) and a Buying card (cost items only, no amounts, per Danny; link to the purchase estimator). Desktop: side by side; phones and tablets: swipe with a 租屋／買房 switch that follows the swipe.
- Review pass on the two cards (client + designer view): buying card items now carry a one-line explanation instead of "¥ —" (looked like missing data); renting card shows a live breakdown (prepaid rent, key money, deposit, brokerage, guarantor, other) that adds up to the total; tablets now show both cards side by side (swipe only on phones); intro no longer says all costs are due "at signing" (acquisition tax comes later); a line under the cards points shops/offices to consultation instead of estimating commercial properties.

## 2026-10-01 — Full zh-TW review (copy, layout, type, UI)
- Reviewed all 28 zh-TW pages at 1440 and 390 (no errors, no horizontal overflow; images that looked blank in full-page captures load normally in view — lazy loading / reveal, not a bug).
- New rule (Danny): copy changes zh-TW only until the final version; ja/en translated at the end. Recorded in 03_DECISIONS.md and CLAUDE.md.
- Fixed now (zh-TW): guide titles break at punctuation (shared `components/site/Phrases.tsx`; article title slightly smaller on phones); licence wording unified to 宅地建物取引業免許 (hero, trust, footer, FAQ); homepage association line now from config (會員); FAQ prepaid rent (約 2 個月), 共益費 in guarantor answer, 度假別墅, 搬家; privacy 隱私／安全／社群媒體, 金融機構; property-management 業主 wording and 管理組合 gloss; buy/sell step 1 rewritten; About 「我們的團隊」; 資料尚未備齊 everywhere.
- Waiting for Danny: see the review report in chat (regional wording 查詢/視乎, guarantor 0.5–1.5 vs 0.5–1 months, 換鎖費 vs 換鑰匙費, estimator example vs "4–6 months", appointment note on Contact, CTA gaps on /tools and Contact, guides intro wording) and the feature ideas.

## 2026-10-01 — Review follow-up (Danny's decisions) and new features
- Wording (zh-TW): 查詢 replaced site-wide (buttons LINE 聯絡／WhatsApp 聯絡／致電; body 諮詢／聯絡; property search 物色); 視乎 → 依…而定; 換鎖費; guarantor 50%–100% (0.5–1 month), example default 0.5 month (example total now ¥615,250); Contact shows 來訪請先預約 (config `visits`) and the form button reads 免費諮詢（填寫諮詢表）; /tools has a consult band; guides intro 「福岡租屋與生活的實用資訊。」 and Living category description match the published articles. Homepage hero keeps three services (Danny).
- Estimator: "或把估算直接傳給我們" — LINE (prefilled message to @089vsqyn; does not work in LINE for PC), WhatsApp (prefilled), and 複製明細.
- Google: RealEstateAgent structured data on home and About (`lib/seo/organization.ts`, from config).
- Click statistics: built, off until a D1 database and STATS_KEY are set at launch (steps in docs/analytics-and-deployment.md). Privacy text must be updated before switching on.
- For Danny: add "你從哪裡知道我們？" to the Google Form (he edits the form himself); optional property-management guides (管理組合, 納稅管理人) when he has time.

## 2026-10-01 — Purchase cost estimator rebuilt
- New `lib/tools/purchase.ts` (rules with sources and expiry dates; tests in `tests/purchase.test.mjs`), `components/tools/PurchaseEstimator.tsx`, copy in `data/purchase-estimator.ts` (zh-TW source; ja/en provisional).
- Inputs: price, type (used condo / new condo / house), buyer (investor-overseas default / owner-occupier), floor area, year built, land and building assessed values, cash or loan, handover month, brokerage (legal cap by default, editable), scrivener, insurance, monthly condo fees.
- Results: contract-to-handover costs, acquisition tax 6–12 months later, total vs typical %, total incl. price, yearly holding costs; overseas-buyer notes (外為法 report, tax agent, nationality declaration from 2026-10-05, remittance); calculation method; LINE/WhatsApp send.
- To review before 2027-03-31: stamp tax reduction, housing registration rates, acquisition tax 3% and 1/2 land base (令和9 tax reform). Example assessed values (land ¥3M, building ¥7M for a ¥30M used condo) are placeholders for Danny to confirm.
