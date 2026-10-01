/**
 * Click statistics (Danny, 2026-10-01): counts button clicks sent by components/analytics/EventBeacon.tsx.
 *
 * Off until switched on in Cloudflare (see docs/analytics-and-deployment.md):
 * - D1 database bound as EVENTS_DB → clicks are counted (one row per click: day, event, language, area, detail).
 * - Secret STATS_KEY → the summary page /re/stats?key=<STATS_KEY> is available.
 * Without them, the event endpoint accepts and discards events, and /re/stats returns 404.
 * No cookies, IP addresses or personal data are stored.
 */

type D1Result<T> = { results: T[] };
type D1Statement = { bind(...values: unknown[]): D1Statement; run(): Promise<unknown>; all<T>(): Promise<D1Result<T>> };
export type D1Database = { prepare(sql: string): D1Statement; exec(sql: string): Promise<unknown> };
export type StatsEnv = { EVENTS_DB?: D1Database; STATS_KEY?: string };

const EVENT_NAMES = new Set([
  "consultation_cta_click",
  "google_form_outbound",
  "contact_channel_click",
  "service_navigator_select",
  "guide_to_service_click",
  "calculator_start",
  "calculator_complete",
  "contact_entry",
]);

const LABELS: Record<string, string> = {
  consultation_cta_click: "按「免費諮詢」",
  google_form_outbound: "開啟諮詢表",
  contact_channel_click: "按聯絡方式（LINE／WhatsApp／電話等）",
  service_navigator_select: "服務導覽選擇",
  guide_to_service_click: "由指南前往服務頁",
  calculator_start: "開始使用估算工具",
  calculator_complete: "完成估算",
  contact_entry: "進入聯絡頁",
};

const PLACES: Record<string, string> = {
  header: "頁頂", "header-compact": "頁頂（捲動後）", "mobile-menu": "手機選單", "homepage-hero": "首頁頂部", "homepage-final": "首頁底部",
  "service-page": "服務頁", "service-navigator": "服務導覽", "guide-article": "指南文章", "about-page": "關於我們", "help-page": "常見問題",
  "contact-page": "聯絡頁", calculator: "估算工具", footer: "頁尾",
};
const DETAILS: Record<string, string> = {
  line: "LINE", whatsapp: "WhatsApp", phone: "電話", email: "Email", form: "諮詢表",
  "rental-initial-cost": "租屋估算", "purchase-cost": "買房估算",
  rent: "租屋", "buy-sell": "房產買賣", "property-management": "物業管理", "living-support": "生活支援",
};

const SCHEMA = "CREATE TABLE IF NOT EXISTS events (day TEXT NOT NULL, name TEXT NOT NULL, locale TEXT, source TEXT, detail TEXT, path TEXT)";

const clean = (value: unknown, max = 60) => (typeof value === "string" ? value.slice(0, max) : "");

export async function recordEvent(request: Request, env: StatsEnv): Promise<Response> {
  const done = new Response(null, { status: 204 });
  if (request.method !== "POST" || !env.EVENTS_DB) return done;
  let data: Record<string, unknown>;
  try {
    const text = await request.text();
    if (text.length > 2000) return done;
    data = JSON.parse(text);
  } catch {
    return done;
  }
  const name = clean(data.name);
  if (!EVENT_NAMES.has(name)) return done;
  const detail = clean(data.tool) || clean(data.channel) || clean(data.service);
  const day = new Date().toISOString().slice(0, 10);
  try {
    await env.EVENTS_DB.exec(SCHEMA);
    await env.EVENTS_DB.prepare("INSERT INTO events (day, name, locale, source, detail, path) VALUES (?, ?, ?, ?, ?, ?)")
      .bind(day, name, clean(data.locale, 10), clean(data.source), detail, clean(data.path, 200))
      .run();
  } catch {
    // Never fail the visitor's click because of statistics.
  }
  return done;
}

const escape = (value: unknown) => String(value ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c);

type Row = { name: string; source: string; detail: string; locale: string; count: number };

export async function statsPage(request: Request, env: StatsEnv): Promise<Response> {
  const key = new URL(request.url).searchParams.get("key");
  if (!env.EVENTS_DB || !env.STATS_KEY || key !== env.STATS_KEY) return new Response("Not found", { status: 404 });
  await env.EVENTS_DB.exec(SCHEMA);
  const since = (days: number) => new Date(Date.now() - days * 86_400_000).toISOString().slice(0, 10);
  const query = (days: number) => env.EVENTS_DB!.prepare(
    "SELECT name, source, detail, locale, COUNT(*) AS count FROM events WHERE day >= ? GROUP BY name, source, detail, locale ORDER BY count DESC",
  ).bind(since(days)).all<Row>();
  const [week, month] = await Promise.all([query(7), query(30)]);
  const table = (rows: Row[]) => rows.length
    ? `<table><thead><tr><th>動作</th><th>頁面位置</th><th>細項</th><th>語言</th><th>次數</th></tr></thead><tbody>${rows.map((r) => `<tr><td>${escape(LABELS[r.name] ?? r.name)}</td><td>${escape(PLACES[r.source] ?? r.source)}</td><td>${escape(DETAILS[r.detail] ?? r.detail)}</td><td>${escape(r.locale)}</td><td>${r.count}</td></tr>`).join("")}</tbody></table>`
    : "<p>暫時沒有紀錄。</p>";
  const html = `<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>網站點擊統計</title>
<style>body{font-family:system-ui,sans-serif;margin:24px;color:#1b2926;background:#f2f1ec}h1{font-size:22px}h2{font-size:17px;margin-top:28px}table{border-collapse:collapse;width:100%;max-width:900px;background:#fff}th,td{padding:8px 10px;border-bottom:1px solid #d9d5cb;text-align:left;font-size:14px}td:last-child,th:last-child{text-align:right}p{color:#56615d}</style></head>
<body><h1>網站點擊統計</h1><p>只計算按鈕點擊次數，不記錄個人資料。</p><h2>最近 7 日</h2>${table(week.results)}<h2>最近 30 日</h2>${table(month.results)}</body></html>`;
  return new Response(html, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex" } });
}
