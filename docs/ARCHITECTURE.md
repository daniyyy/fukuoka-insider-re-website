# Architecture (updated 2026-09-29)

A modular monolith: Vinext (Next.js App Router–compatible, Vite-based) + TypeScript, deployed later as a Cloudflare Worker. Base path `/re` (`NEXT_PUBLIC_BASE_PATH`), site origin `NEXT_PUBLIC_SITE_URL`.

## Folders
| Path | Owns |
| --- | --- |
| `app/` | Routes, page composition, metadata. `app/[locale]/…` for zh-TW / ja / en; Guides and FAQ routes exist for their allowed locales only. |
| `app/*.css` | `globals.css` (reset + Tailwind preflight), `design-system.css` (tokens, buttons, header, footer, shared pieces), `home.css`, `services.css`, `pages.css` (interior pages, Guides, FAQ, tools, legal). |
| `components/` | `SiteHeader`, `SiteFooter`, `BrandLockup`; `site/` shared blocks (PageHero, ConsultBand, CompanyFacts, HakataPanel, QrCode, Icons); `guides/`, `help/`, `service-pages/`, `tools/`, `analytics/`. |
| `config/site.ts` | Single source for company facts, contact channels, hours, locales, base path. |
| `data/` | Typed page copy (`static-pages.ts`, `service-pages.ts`, `editorial-ui.ts`, `tools.ts`), FAQ (`faq-content.ts`), Guides (`guide-content.ts` legacy seed + `guide-articles.ts` metadata for Danny's articles; `guide-articles.generated.ts` is generated). |
| `content/guides/zh-TW/` | Danny's finished articles in Markdown (source of truth for their wording). |
| `lib/content/` | Provider-agnostic content adapter, types, paths, validation. A future CMS replaces `localContentSource` in `adapter.ts` only. |
| `lib/seo/`, `lib/analytics/`, `lib/tools/` | Metadata helpers, typed analytics events (no provider connected), cost calculators. |
| `public/` | Fixed images (`images/`, `images/brand/` incl. `hakata.svg`), share images (`og/`), favicon, apple-touch-icon. |
| `assets/source/` | Original source files (logo, portraits) — not served. |
| `scripts/` | `import-guides.mjs` (Markdown → typed Guide bodies). |
| `worker/index.ts`, `vite.config.ts` | Cloudflare Worker entry and build config. |
| `tests/` | Node tests for content validation, calculators, analytics. |
| `docs/` | Progress log, editorial contract, deployment readiness, owner-confirmation list; `docs/archive/` holds superseded Codex-era notes. |

## Not built (by decision)
No CMS provider, database, native contact form, CRM, analytics provider, or deployment yet. See `03_DECISIONS.md`.
