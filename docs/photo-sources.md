# Photo sources and usage (2026-09-29)

Originals are in the Danny's folder `照片/` (not in git). Web versions are exported to `public/images/photos/` (WebP, max 2000px, EXIF/GPS removed, light unified grade: saturation −10%, contrast +4%, slightly warm).

## In use
| Web file | Source file | Source / licence | Used on |
| --- | --- | --- | --- |
| `photos/ohori-park.webp` | IMG_2205.HEIC | Danny's own photo | Homepage hero; share image (home) |
| `photos/nakasu-river.webp` | syuichi-shiina-pRjdQWWxMus-unsplash.jpg | Unsplash (Syuichi Shiina), Unsplash License | Homepage "服務與支援"; share image (services) |
| `photos/hakata-station.webp` | IMG_2298.HEIC | Danny's own photo | Living Support service page |
| `photos/fukuoka-castle-moat.webp` | 20220327_171849.jpg | Danny's own photo | About page |

## Reviewed, not used (and why)
- Unknown source — do not use until the source/licence is confirmed: `1.png`, `5.png`, `9.png`, `10.png`, `11.png`, `12.png`, `13.png`, `culture.png`, `hotel.png`, `ohori.jpg`, `sakura.jpg`, `福岡市.jpg`, `藝人表演.webp`, `WecomSave_….JPG`.
- `ritz.jpeg`: hotel's own marketing photo (trademark/copyright).
- `IMG_6235.HEIC`: consumer-loan shop sign in frame.
- `small-photo0000-*.jpg`: too small (300px).
- `*_m.jpg` (photoAC, commercial use allowed): mostly tourism/landmark scenes (shrines, beaches, night views, Mojiko). Kept as candidates for future guide articles.
- Office photos `IMG_7081–7083`, `IMG_7091`: same scenes as the existing office images already on the site.

## 2026-09-30 — Ricky／Danny 人物照修圖
- 原圖右下角有兩個半透明白色方塊（原檔自帶）。Danny 暫時沒有無方塊的原圖，請 Claude 修圖。
- 做法：用方塊邊緣內外的像素算出疊加的透明度，把方塊內的顏色還原（不是用 AI 生成或補畫），再修順邊緣接縫。
- 修圖後：`assets/source/people/ricky-retouched.jpg`、`danny-retouched.jpg`；網站使用 `public/images/ricky.webp`、`danny.webp`。原圖保留在同一資料夾。

## 2026-09-30 — 租屋室內示意圖（Danny 提供，AI 生成）
- Danny 用 ChatGPT 生成 4 張日本公寓室內圖（客廳 LDK、1K 單間、和室、睡房）。客人已入住的實際照片涉及私隱，不使用。
- 使用：`public/images/rent/ldk.webp`（租屋服務首圖、服務總覽、首頁服務區）、`public/images/rent/studio-1k.webp`（指南「初期費用」精選照片）。已輕微降低飽和度，配合網站色調。
- 租屋頁圖片說明改為「圖片為示意圖，並非實際出租物件」（三語）。
- 和室、睡房兩張暫未使用；原圖在 `assets/source/photos/rent/`。

## 2026-09-30 — Ricky 新照片
- Danny 提供 Ricky 新照片（戴眼鏡、雙手交叉；螢幕截圖 575×597），較原本拿咪高峰那張正式。裁成網站人物照的 4:5 比例（478×597），用於首頁及關於我們。
- 原檔：`assets/source/people/ricky-2-original.png`。舊照片（已修圖）保留為 `ricky-retouched.jpg`。
- 解析度剛好夠用；日後如有更大的原檔可再替換。
