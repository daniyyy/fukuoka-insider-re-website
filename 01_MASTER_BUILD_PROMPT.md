# Master Website Build Prompt — Fukuoka Insider Real Estate

## Operating instructions

Read this file with `02_PROJECT_BRIEF.md` and `03_DECISIONS.md` before proposing work. Treat confirmed decisions as constraints. If a request conflicts with one, explain the impact and ask before changing direction.

Build and maintain the website only. Do not turn this project into an article-writing workflow: it receives finalized content only for structured CMS import, preview, and explicit publication.

## 1. Objective

Build a production-quality multilingual lead-generation website for **Fukuoka Insider Real Estate**, operated by **株式会社Fukuoka Insider**.

The primary audience is overseas clients, especially people from Hong Kong and Taiwan, who need support with Fukuoka real estate. It must also work naturally for Japanese and broader international visitors.

The site should feel clear, simple, professional, trustworthy, modern, international, and local to Fukuoka. It is **not** a dense property-listing portal. Avoid banner-heavy pages, tiny text, aggressive sales language, excessive listings, huge floating chat buttons, and luxury-real-estate clichés.

Use these product and engineering principles:

> Explicit over clever. Readable over short. Consistency over novelty. Modular monolith over microservices. Content is editable; layout and logic are protected.

## 2. Brand, visual direction, and people

- Public website name: **Fukuoka Insider Real Estate**.
- Master brand: **Fukuoka Insider**.
- Use the existing Fukuoka Insider logo as-is. Never redesign, distort, or bake “REAL ESTATE” into the logo file.
- Treat `REAL ESTATE` as restrained supporting typography beside or below the logo.
- Keep the hierarchy company first, people second: approximately 80% company and 20% people.
- Do not use personal portraits in the Hero.
- About may show supplied portraits lightly:
  - Ricky — Founder / President.
  - Danny — licensed real-estate professional / 宅地建物取引士; Hong Kong background; based in Fukuoka.
- Use concise profile cards (photo, role, 2–3 sentences); do not create a personal-agent site or lengthy biographies.

Visual direction:

> Modern Japanese editorial × international real estate × Fukuoka lifestyle

Use black/charcoal, warm white, warm grey/stone, and one restrained muted deep-blue/slate-blue accent. Use strong typography, generous whitespace, editorial composition, authentic photography, subtle depth, and restrained motion.

Avoid gold luxury styling, dense card grids, excessive borders, generic corporate stock photography, tourism collages, flags everywhere, and over-animation. Appropriate imagery includes Fukuoka streets, homes, architecture, cafés, waterfront, Ohori Park, Tenjin, Hakata, and everyday life. The emotional idea is: **real estate is part of building a life in Fukuoka.**

## 3. Company and contact configuration

Create one typed site-config source of truth. Do not duplicate these values in components or content:

```text
Company: 株式会社Fukuoka Insider
Address: 〒810-0074 福岡県福岡市中央区大手門1-5-2 九州外語ビル1階1号
Telephone: 092-753-5662
Fax: 092-753-5663
Real-estate licence: 福岡県知事 (1) 021270号
Email: danny@fukuokainsider.jp
LINE: https://lin.ee/vyx5daI
Instagram: https://www.instagram.com/fukuoka_insider/
Detailed property enquiry: https://forms.gle/HPd8JW1RTgzNTWfK9
WhatsApp: not configured
```

Use the existing Google Form as the primary V1 enquiry route. Visitor-facing CTA labels should say **Free Consultation** (or local-language equivalent), optionally “Fill in the Property Enquiry Form,” not “Google Form.”

- Do not build a native form, CRM, Google Sheet automation, or embedded Google Form in V1.
- On mobile, link directly to the form; on desktop, an optional QR code may accompany the direct button.
- LINE, email, telephone, and a future WhatsApp link are supplementary routes.
- Hide WhatsApp everywhere until a valid value exists.
- Show fax only in formal company information, not as a primary conversion route.

## 4. Deployment strategy

Initially develop and deploy an independent prototype. Do not modify, depend on, or assume access to the current `www.fukuokainsider.com` WordPress site.

The intended future production location is:

```text
https://www.fukuokainsider.com/re/
```

Its existing DNS, hosting, WordPress, and Cloudflare state are unknown. Integration is a **post-approval deployment task** with the existing site administrator; do not assume a Cloudflare route is available.

Prototype flow:

```text
GitHub → Next.js application + content adapter → independent Cloudflare-compatible deployment → temporary URL
```

- A temporary `workers.dev` URL or equivalent is sufficient; do not buy a domain for the demo.
- Centralize `SITE_URL` and `BASE_PATH`; never scatter domain literals.
- Support and test a configurable `/re` base path from day one, including assets, locale switching, canonical URLs, internal links, and sitemaps.
- Prototype must be `noindex, nofollow`.
- Enable normal indexing only after approved production migration.
- Keep hosting-specific code minimal and the application portable.

The intended end state is conceptually:

```text
www.fukuokainsider.com/       → existing WordPress
www.fukuokainsider.com/re/*   → new Next.js application
```

## 5. Technology and ownership boundaries

Preferred stack:

```text
Frontend: Next.js (App Router)
Language: TypeScript
Styling: Tailwind CSS
Editorial content: provider-agnostic adapter; final CMS provider not yet locked
Repository: GitHub
Prototype hosting: Cloudflare Workers
Deployment: OpenNext or Cloudflare-compatible deployment
```

Optimise V1 for sensible free-tier use where practical. Prefer static generation and caching for this information-heavy website. Do not introduce unnecessary per-request server work.

Ownership boundaries:

```text
Stable corporate/service/legal pages → Git-managed localized content
Guides, FAQ, editorial metadata/images → replaceable content provider through the site adapter; Phase 3 uses typed local seed data
Layout, components, styling, interaction → code
Company constants, links, language/base-path settings → central config
```

Do not create duplicate sources of truth or turn a future content provider into a visual page builder. Keep useful repository documentation: README plus AI guide, architecture, structure, design system, CMS, i18n, SEO, features, deployment, decisions, changelog, and concise website-specific brand summary.

## 6. Languages and routes

Traditional Chinese is the canonical/source language for stable pages. Stable corporate, service, contact, and legal pages are available in:

```text
zh-TW
ja
en
```

Use explicit locale routes beneath the base path:

```text
/re/zh-TW/
/re/ja/
/re/en/
```

`/re/` may redirect to the Traditional Chinese homepage. Persist a user-selected language where suitable, but do not force disruptive browser-language redirects.

Stable page rules:

- Keep one explicit localized content entry per page and language. The current V1 implementation uses typed locale data modules in Git; a later Markdown layer may replace that storage without moving layout or interaction into content.
- Each language version shares page ID, content fields, section order, and information architecture.
- Japanese and English should be natural translations, not literal ones.
- Every stable-page edit, including a small copy change, updates all three languages in the same task; check structural parity and preview/build afterward.
- Git-managed content contains copy, headings, SEO metadata, and last-updated data only—never layout, colour, grid, animation, or component instructions.

Guides are available only in Traditional Chinese and English. FAQ is available in Traditional Chinese, Japanese, and English. Do not create fake Japanese Guide pages or hreflang entries.

- Switch between existing zh-TW/en editorial equivalents when present.
- Switching a Guide to Japanese sends the visitor to `/re/ja/`.
- Japanese navigation links to English Guides and the Japanese Help page; Help may note that Guide articles are currently available in English and Traditional Chinese.

## 7. Sitemap and navigation

Keep V1 intentionally compact:

```text
Home                         /{locale}/
Services overview            /{locale}/services/
Rent                         /{locale}/services/rent/
Buy & Sell                   /{locale}/services/buy-sell/
Property Management          /{locale}/services/property-management/
Living Support               /{locale}/services/living-support/
Guides                       /{editorial-locale}/guides/
Help Center / FAQ            /{editorial-locale}/help/
About                        /{locale}/about/
Contact / Free Consultation  /{locale}/contact/
Privacy / Disclaimer / Terms /{locale}/...
```

Desktop header:

```text
Logo · Services · Guides · FAQ · About · [Free Consultation] · language switcher
```

Use a clean mobile hamburger menu with a visible consultation CTA. Do not launch Tools navigation or “coming soon” tool pages.

Keep the footer compact: brand, key services, Guides/FAQ/About, contact/consultation, legal, language, Instagram and `fukuokainsider.com`, copyright, and `無断転載・複製を禁じます。` Do not include `fukuoka.cc`.

The Terms of Use page must clearly state the site's copyright and content-use rules: site content is protected; unauthorized reproduction, republication, redistribution, and adaptation are prohibited; and the rule applies to text, images, charts, and other site materials. It must not restrict uses permitted by applicable law, including lawful quotation.

The V1 Privacy, Disclaimer, and Terms pages are launch drafts. Their routes and readable content belong in V1, but they require professional legal review before public launch.

## 8. Homepage

Build the homepage in this order:

1. **Hero** — “Build Your Life in Fukuoka.” plus clear rental/buy-and-sell/management multilingual support; one Free Consultation CTA; only light trust signals: local, licensed, multilingual.
2. **Services & Support** — the Homepage's only service overview and navigation section. Present Rental, Buy & Sell, Property Management, and Living Support concisely so visitors can identify the appropriate service quickly. Do not add a separate Quick Routes section or a second detailed Services section; detailed service content belongs on the Phase 2 service pages.
3. **Trust** — concise factual proof that the company operates in Fukuoka, holds the real-estate business licence `福岡県知事 (1) 021270号`, provides support through a `宅地建物取引士`, and can communicate in Traditional Chinese, Japanese, and English. Keep the company licence and individual qualification distinct; do not claim unverified rankings, awards, or figures.
4. **Featured Guides** — 1–3 manually selected CMS articles.
5. **Latest Guides** — a small automatic set of published Guides.
6. **Life in Fukuoka** — a lifestyle bridge to the main Fukuoka Insider website; enriches brand context without becoming tourism content.
7. **About** — company-led introduction, then light people reference; CTA to About.
8. **Final CTA** — the Free Consultation conversion section leading to Contact/the existing form.
9. **Footer** — compact brand, navigation, contact, legal, language, and social information.

Guide cards use image, category, title, and short summary. Do not show tags on homepage cards; retain them in CMS for related-content logic and future needs.

During Phase 1, a small local mock-data set was used for Featured Guides and Latest Guides solely to complete the homepage design. Phase 3 replaces it with the shared content adapter and typed production seed. Do not create a duplicate editorial source.

## 9. Services

Use a common flexible pattern:

```text
Hero → who it is for → what we can help with → process/what to expect
→ important points → related Guides/FAQ → Free Consultation
```

Do not over-segment service pages in V1.

- **Rent:** one broad page, not separate residential/commercial pages. It may contain the most practical detail and include rental expectations and initial costs.
- **Buy & Sell:** one concise service page with two clear paths inside one shared transaction context. Cover purchase purpose/search and sale property/preparation without concatenating two full pages. Use conservative wording; do not imply financing approval, availability, investment return, sale price, timing, or acceptance of particular terms.
- **Property Management:** keep two distinct sections:
  - Rental Property Management / 賃貸管理: tenant finding; screening and move-in coordination; rent collection/tenant communication; maintenance/issues; move-in/out handling.
  - Second Home Management / セカンドハウス管理: periodic inspection; second-home/vacation-home management.
- **Living Support:** remain a light supporting service. Clearly separate directly delivered support from partner/referral support; never imply partner services are supplied directly.

Service pages are primarily lead-generation pages. Keep the five pages concise, easy to scan, and broadly similar in content density and total reading effort without forcing identical layouts or exact text lengths. Each page should answer only what a visitor needs to decide whether the service is relevant, what support is available, the general process, what to prepare, an important limitation, and how to enquire. Detailed legal, tax, procedural, and special-case information belongs in Guides, FAQ, or future specialist resources.

## 10. Content adapter, Guides, and FAQ

The site must consume editorial content through a small provider-agnostic adapter. Phase 3 uses typed local seed data; choosing and integrating the final CMS is a separate approved task. A future CMS must be owner-friendly, minimal, structured, previewable, and AI/API-friendly.

Primary content types: Guide, FAQ, Category, Tag.

Guide fields must cover locale, canonical pairing key, status, category, tags, image, homepage feature/order, publish/update dates, localized title/slug/summary/content/SEO title/description, and manual related guides.

FAQ fields must cover locale, status, category, keywords, related service, featured/priority, and localized question and answer for Traditional Chinese, Japanese, and English.

The local seed uses structured body blocks. A future provider may use Rich Text and practical Markdown import/conversion for finalized content, but must not create a second source of truth for published guides.

Workflow:

```text
Draft → Ready for Review → Published → Archived
```

AI-created or AI-modified content always defaults to Draft. Publish only when the user explicitly says “Publish” or “發布.” Major edits to existing published content need review before replacing production.

V1 roles: Danny is Owner/Admin; AI/integration receives only the permissions required to create/edit drafts; no complex editor roles yet.

Guides page: intro → featured → category filter → all/latest → consultation CTA. Default is All; show only populated categories. Do not launch tag filters, global/full-text search, or complex sorting.

Help Center: intro → search → 5–8 popular FAQ → category filter → all FAQ → consultation CTA. Search question, answer, and keywords only. Suggested categories: Renting, Buying & Selling, Property Management, Living Support, Taxes & Procedures, General. Hide empty categories.

Related Guides: manual choices first, then category/tag logic to fill gaps. Never recommend the current guide or show duplicates.

## 11. SEO, analytics, and images

Fixed site assets (logo, portraits, hero/service/about/UI images) belong in repository/static assets. Phase 3 seed Guides reuse safe repository images; a future editorial provider may own final article images through its CDN. Use responsive images, lazy loading where appropriate, modern formats, and strong mobile performance.

SEO V1:

```text
unique titles and meta descriptions
correct H1/H2 hierarchy
canonical URLs and accurate hreflang
sitemap.xml and robots.txt
Open Graph metadata
Guide Article schema
Organization/appropriate business schema
Breadcrumb schema
clean URLs, useful alt text, internal links
mobile performance, 404 handling, basic redirects
```

Use Git-managed stable-page metadata for stable-page SEO and content-model fields for Guide SEO. No fake Japanese Guide hreflang. Prototype remains noindex; production indexing only begins after approved migration.

Do not build AI SEO scoring, mass programmatic SEO, keyword dashboards, thin location pages, or complex GEO systems.

Use a lightweight, privacy-conscious, replaceable analytics layer. Track traffic, landing/popular pages, source, device, country/region, language, and these key interactions: Free Consultation, Google Form, LINE, Email, and WhatsApp once enabled. Do not build a complex marketing dashboard.

## 12. Scope and sequencing

Work in phases:

```text
Phase 1: scaffold, architecture, design system, responsive shell, header, footer, homepage prototype
Phase 2: services, About, Contact, legal
Phase 3: provider-agnostic content foundation, Guides, FAQ
Phase 4: SEO, analytics, mobile QA
Phase 5: independent Cloudflare demo deployment and review by Ricky/management
After approval: assess and perform the real /re/ integration
```

The first task must complete **Phase 1 only**. Do not bundle external CMS integration, content migration, FAQ content, calculators, or production integration into it.

V1 is the complete stable-page site, four service pages, About, Contact, legal, functional Guides/FAQ through the content adapter, basic SEO/analytics, mobile QA, and a curated small amount of finished content. Existing articles are not a launch gate. Buying and Selling remain separate Guide categories even though they route to the same Buy & Sell service page.

The 2026-09-25 V1 completion sprint explicitly brings Purchase Cost Estimator and Rental Initial Cost Estimator forward into the reviewable V1 framework. Both must calculate from editable inputs, disclose assumptions, and avoid unverified official rates. Do not display Tools in the Header or homepage; this scope change does not authorise deployment.

Explicitly out of scope now: domain purchase, WordPress changes, native contact form, CRM, full migration of all articles, editorial article drafting, property-listing portal, global search, accounts, and marketing automation.

When completing any task, give a concise summary of changes, verification performed, and the next safe in-scope step.
