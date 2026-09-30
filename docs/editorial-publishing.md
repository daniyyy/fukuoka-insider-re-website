# Editorial publishing contract (V1 foundation)

This is a handoff contract, not a live CMS. The current public-site adapter reads typed local records from `data/guide-content.ts` (legacy seed), `data/guide-articles.ts` (Danny's articles; wording from `content/guides/zh-TW/*.md` via `pnpm import:guides`) and `data/faq-content.ts`. No CMS provider, credentials, import job, owner interface, or automated publication is connected.

## Ownership and statuses

- Finished long-form articles are written and approved outside this website project. This repository owns schema, preview/presentation, routing, metadata, validation, and eventual CMS ingestion—not article drafting.
- New or AI-modified Guide articles default to `draft`. The editorial lifecycle is `draft → ready-for-review → published → archived`. A public Guide additionally requires an explicit `editorialApprovedAt` and `publishedAt` date. `featured` and `featuredOrder` have no public effect before publication.
- Current Guide seed records are retained as `ready-for-review` or `draft`; their earlier shared publication date was not evidence of approval and has been removed. No current Guide seed is public. The Homepage and Guides landing show an honest empty state until approved content exists.
- FAQ records use a separate `published` flag. Before connecting a CMS, the provider workflow must require owner approval for new or materially revised FAQ answers as well. Existing local FAQ items are prototype content and still require final factual/legal review before public launch.

## Required Guide data

`id`, stable `canonicalKey` shared between translations, `locale` (`zh-TW` or `en` only), category, localized slug/title/excerpt, structured body, status, cover image/alt text, tags, optional SEO title/description, optional related Guide IDs and related service, publication and approval dates when published. `canonicalKey + locale` and route must be unique. A missing translation does not create a fallback article URL or hreflang.

Guide categories `buying` and `selling` remain distinct editorially, while both may link to the single `/services/buy-sell` page. There are no Japanese Guide article routes.

FAQ items require stable ID, a `key` shared by both languages, locale (`zh-TW`, `en`), category, question/answer, order, publication flag, and optional related service, service pages to appear on (`showOn`), related cost tool, or approved Guide pairing key. The adapter must resolve related Guide links only to genuinely published Guide records.

FAQ authoring (`data/faq-content.ts`, updated 2026-09-30): FAQ is published in Traditional Chinese and English only (`siteConfig.faqLocales`); one entry holds both languages, so the structure stays identical. Answers use "- " lines for bullet lists. Company facts are never typed into answers; use the tokens `{languages} {licence} {associationName} {hours} {closed} {address} {access}`, filled from `config/site.ts` by `lib/content/faq.ts`. Validation rejects unknown tokens, hard-coded licence/phone/email/address, and a question missing in any language. The Help page groups questions by category and emits FAQPage structured data; service pages show up to four questions listed in `showOn`; the homepage shows the first four `featured` questions.

`lib/content/validation.ts` checks unique routes/translation keys, core fields, image alt text, featured order, and publication gates. The same validation must run on imported CMS data before it reaches public selectors. Draft, ready-for-review, and archived Guides remain absent from public lists, article routes, related content, homepage modules, and sitemap.

## Future CMS migration boundary

Replace the `localContentSource` in `lib/content/adapter.ts` with one provider adapter implementing the same `ContentSource` shape and validation. The provider becomes the single editorial source of truth; do not keep a second published copy in Git. Map provider statuses and translation keys explicitly. Published article images move to the approved provider/CDN; fixed company/website assets remain in the repository.

Before enabling a provider: select it and obtain credentials; define owner/admin approval and least-privilege AI access; implement authenticated draft preview; test publication, update, unpublish/archive, translation pairing, featured ordering, alt text, metadata, image delivery, cache invalidation, and rollback. Do not expose a preview route without authentication. Do not set a Guide to `published` to make a layout look populated.
