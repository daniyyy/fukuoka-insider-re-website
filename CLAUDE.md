# Fukuoka Insider Real Estate — Claude instructions

This folder is the Fukuoka Insider Real Estate website (株式会社Fukuoka Insider). From 2026-09-29 it is maintained by Claude only (Codex is no longer used).
Reply to Danny in Traditional Chinese, concise, with few technical terms. Use English for code and file names.

## Read first
1. `03_DECISIONS.md` — confirmed business and design decisions (constraints). Newest entries at the bottom override older ones.
2. `docs/redesign-progress.md` — what was done last, what is next, open questions for Danny.
3. `DESIGN.md` — design system and page rules. `PRODUCT.md`, `02_PROJECT_BRIEF.md`, `01_MASTER_BUILD_PROMPT.md` — original product brief (background; where they conflict with `03_DECISIONS.md`, the decisions file wins).
4. `docs/editorial-publishing.md` — Guide/FAQ data model, statuses, and the future CMS boundary.
5. Before any design or front-end change: `PRODUCT.md` (visitor, core experience) and `docs/design-guidelines-no-ai-look.md` (Danny's design rules: four principles, mask test, craft floor, two-layer review).

## Hard rules
- Company facts, contact links, hours, licence: only in `config/site.ts`. Never hard-code them in pages.
- Do not invent facts: no made-up transactions, reviews, figures, rankings.
- Guides stay unpublished until Danny explicitly says「發布」/ "Publish". Then add `published: "YYYY-MM-DD"` to that article in `data/guide-articles.ts`.
- Do not edit article wording unless Danny asks for a specific change. Article sources are `content/guides/zh-TW/*.md`; after changing a source run `pnpm import:guides`.
- Copy changes: until the final version, change zh-TW only; ja and en are translated in one pass at the end, keeping the same structure (Danny, 2026-10-01). Guides are zh-TW only; FAQ is zh-TW and en only (`siteConfig.guideLocales`, `siteConfig.faqLocales`).
- Do not publish brokerage fee amounts or legal fee caps on the site unless Danny asks.
- Prototype only: keep noindex; do not deploy, change DNS, or touch the WordPress site www.fukuokainsider.com.
- Ask Danny before changing page architecture, language policy, or anything in `03_DECISIONS.md`.
- Work on a git branch, commit per stage, and update `docs/redesign-progress.md` at the end of each session.

## Deployment
- GitHub `daniyyy/fukuoka-insider-re-website` (main) → Cloudflare Workers `fukuoka-insider-re-website` builds and deploys automatically on every push.
- Test address: https://fukuoka-insider-re-website.ktp21505.workers.dev/ (noindex). Do not add a custom domain or route, or change DNS, without Danny's final confirmation.
- Keep Danny's local folder (D:\☆Claude Workspace\danny-obs\Fukuoka Insider_Website) in sync with the same files and commit there too.
- `vite.config.ts` must keep `assets: { binding: "ASSETS" }`; without it images and fonts are empty on Cloudflare.

## Commands
- `pnpm install` — after dependency changes
- `pnpm dev` → http://localhost:5173/re/zh-TW/
- `pnpm lint`, `pnpm test`, `pnpm build` — run all three before committing
- `pnpm import:guides` — rebuild `data/guide-articles.generated.ts` from the Markdown articles

## Where things live
See `docs/ARCHITECTURE.md`.
