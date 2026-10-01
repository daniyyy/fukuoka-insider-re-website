# Analytics and deployment readiness

## Analytics status

`lib/analytics/events.ts` is a typed event boundary. It is **not live tracking**: its default adapter sends nothing. UI events cover consultation CTA, Google Form outbound, LINE/email/phone contact actions, service navigator selection, Guide-to-service clicks, calculator start/first valid edited result, and contact-page entry. Event properties are constrained to locale, known source, service/tool key, and channel—never names, email addresses, telephone numbers, message text, property addresses, budgets, or form content.

To connect a provider later: choose a privacy-conscious provider, decide the consent and privacy-notice requirements, load it only after the applicable consent state permits collection, call `setAnalyticsAdapter` with a vetted mapping, and verify each event in a non-production environment. Do not silently install a pixel or forward events to a third party. Geographic/device/traffic attribution is not implemented by this local layer.

## Deployment gate

Since 2026-09-30 the prototype is deployed to a Cloudflare Workers test address (https://fukuoka-insider-re-website.ktp21505.workers.dev/, project `fukuoka-insider-re-website`, auto-deployed from GitHub `daniyyy/fukuoka-insider-re-website` main). It is not connected to the existing WordPress site or www.fukuokainsider.com. `app/layout.tsx` keeps `noindex, nofollow`; `app/robots.ts` disallows `/re/`; legal pages have an additional draft noindex flag and are excluded from the current sitemap. Do not enable indexing, change DNS, or claim `/re/` integration before management approval and infrastructure verification.

Configuration to confirm before deployment:

- `NEXT_PUBLIC_SITE_URL`: approved public origin, without `/re` suffix.
- `NEXT_PUBLIC_BASE_PATH`: expected `/re` path and CDN/asset behaviour.
- Cloudflare Worker account/project/environment settings, build compatibility, and secrets. The current Vite/Cloudflare configuration is a local foundation, not proof of successful deployment.
- Current Google Form, LINE, email, phone, Instagram, and main-site destinations in `config/site.ts`.
- Official company/licence facts and permission to publish office/person imagery.
- Guide and FAQ editorial approvals, image rights, translation status, and actual publication dates.
- Privacy, Disclaimer, and Terms professional legal review.
- Analytics provider, consent handling, retention, and policy notice if tracking is enabled.
- Canonical/hreflang URLs, sitemap, redirects, robots policy, and visual/function QA on the approved public host.

The purchase and rental calculators use only user-editable figures and disclose that estimates are not quotations. Their example prices are interface samples, not property offers, official rates, tax advice, or a financing assessment.

## Click statistics (built 2026-10-01, off until switched on)

What it counts: clicks on 免費諮詢, LINE / WhatsApp / phone / form, estimator start and finish, service and guide links (`lib/analytics/events.ts`). No cookies, IP addresses or personal data; one row per click with day, event, language, page area and page path.

How it works: `components/analytics/EventBeacon.tsx` sends each event to `/re/api/event`; `worker/stats.ts` stores it in a Cloudflare D1 database when one is bound as `EVENTS_DB`. The summary page is `/re/stats?key=<STATS_KEY>` (noindex). Without the database and key, events are discarded and `/re/stats` returns 404.

To switch on (at launch, with Danny's confirmation):
1. Cloudflare dashboard → Storage & Databases → D1 → Create database, name `fukuoka-insider-events`. Note its Database ID.
2. In `vite.config.ts`, add to `localBindingConfig`: `d1_databases: [{ binding: "EVENTS_DB", database_name: "fukuoka-insider-events", database_id: "<ID>" }]`. Push (auto-deploy).
3. Workers & Pages → fukuoka-insider-re-website → Settings → Variables and Secrets → add secret `STATS_KEY` (a long random word). Danny bookmarks `/re/stats?key=<that word>`.
4. Update the privacy policy (data/legal-content.ts, "本網站目前沒有使用分析工具…") to say anonymous click counts are kept, before switching on. The table is created automatically on the first click.
