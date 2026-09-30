# V1 completion sprint — working checkpoint

This note records the current implementation pass. It is not a new product or design authority. Existing uncommitted Phase 3 and four-service work must remain intact; no commit or deployment is authorised by this note.

## Baseline (2026-09-25)

- Four service routes and legacy Buy/Sell redirects exist. The approved Homepage and service navigator, including the separate plaque asset, are present.
- Guides and FAQ have a local typed adapter; no external CMS is connected. Some seed Guides are currently flagged `published` with one shared date, but there is no evidence of editorial approval. This must be corrected before calling them public content.
- Existing contact destinations are centralised in `config/site.ts`; the site uses the external detailed enquiry form and does not have a native submission backend.
- Calculators and an analytics event layer do not yet exist. Prototype `noindex, nofollow` is configured.
- The checked-in `tests/rendered-html.test.mjs` still describes the original starter skeleton, not this website. Baseline `pnpm lint` and `pnpm build` pass; this test suite is not a valid V1 quality signal.

## Highest-impact issues to address

1. Unreviewed seed articles appear as published content with an unverified publication date.
2. Guide category routes with no published articles return a bare 404 instead of a useful empty state.
3. Homepage Featured and Latest can repeat the same articles.
4. Two requested calculators are missing entirely.
5. No calculation unit tests or assumption disclosures exist.
6. The local editorial adapter lacks publication validation and a documented CMS migration contract.
7. No typed, privacy-conscious analytics event boundary exists.
8. The existing automated test file targets a deleted starter experience.
9. The root document language is fixed to Traditional Chinese even on Japanese and English routes.
10. Contact copy exposes implementation details instead of focusing on how visitors can enquire.
11. The four service pages need a side-by-side reading-effort and CTA consistency check.
12. Fixed interior pages need a consistent metadata/canonical audit.
13. The actual external contact destinations need verification before claiming them as usable.
14. Responsive, keyboard, reduced-motion, and link checks need a cross-page browser pass.

## Sprint scope and gates

Work through service/customer-journey polish, Guides/FAQ safety, calculators, CMS contract, analytics foundation, SEO/i18n, and browser QA. The user's new brief explicitly moves the two calculators into this sprint even though earlier roadmap documents place them in V1.1; do not silently alter unrelated architecture. Do not invent financial rates, article approvals, legal sign-off, CMS credentials, analytics collection, or launch readiness. Recheck this note after each major milestone.

## Implemented in this pass

- Kept the approved Homepage, contextual service navigator and plaque asset. Retained four canonical service routes; old Buy/Sell routes redirect to Buy–Sell. Compared page length and CTA paths; reduced a large dead interval in Rent's process layout without copying a universal service template.
- Replaced unapproved seed Guide publication flags with `ready-for-review`, removed their invented shared publication date, and gated public selection on status, actual publication date and editorial approval. Empty Guides/category states remain useful; unapproved article URLs return 404. Added local source validation and an editorial/CMS migration contract.
- Added rental-initial-cost and purchase-cost estimators in all three locales. Inputs are editable, calculations are pure and tested, and no official rates or financing outcomes are invented. The examples are interface samples only.
- Added typed analytics events behind a no-op adapter. No visitor data is transmitted until a provider, consent policy and privacy notice are separately approved.
- Added fixed-page canonical/hreflang metadata, an approval-aware sitemap, draft legal/empty Guides noindex, and a conservative `/re/robots.txt` disallow rule. The site remains globally noindex/nofollow and is not deployed.
- Improved contact-page wording, repaired interior Header/Footer gutters and the visible mobile menu icon, and reviewed FAQ, calculators, navigation, focus and reduced-motion behaviour in the browser.

## Browser and automated QA

- At 1440, 834 and 390 px: Homepage, Services, Rent, Buy–Sell, Property Management, Living Support, About, Contact, Guides, FAQ and both tools returned 200 with no horizontal overflow or page errors in the tested Traditional Chinese routes.
- At 390 px: the same 11 interior routes loaded in Traditional Chinese, Japanese and English (33 checks), with no horizontal overflow, broken loaded images or page errors.
- Full-page scrolling at 1440, 834 and 390 px loaded every image on eight representative pages, including the Homepage portraits and real office photography; no broken or pending image remained after scrolling.
- Service selection, mobile menu navigation, FAQ search/empty state/expansion, calculator recalculation/invalid input/recovery, legacy Buy/Sell redirects and draft Guide 404 were exercised in Chrome. Reduced-motion mode removed reveal animation and retained visible content; keyboard focus was visible.
- A crawl of 33 source pages across three languages found 47 unique internal links; every tested destination resolved without a 4xx response. Canonical and hreflang tags were spot-checked in all three languages. `/re/robots.txt` serves a disallow rule while the prototype remains unapproved for indexing.
- Unit tests cover calculation logic, editorial validation and the no-op analytics boundary. Final lint, build, test and diff-check results are recorded in the handoff rather than presumed here.

## Not yet live or approved

- There is no external CMS provider, editorial sign-off, published Guide article, live analytics provider, consent flow, native contact form backend, legal sign-off or production deployment. These are explicit release gates, not hidden implementation claims.
- The root document still has a fixed `zh-Hant` HTML language. Localized page content has its own correct `lang` wrapper and localized metadata, but a true server-rendered root language will require a layout/routing decision before launch.
- The starter Cloudflare Worker/D1 ambient types are not present in the current TypeScript environment. `tsc --noEmit` reports those template-level types even though the app lint and build pass; do not claim a clean standalone typecheck without resolving the Cloudflare type generation/dependency strategy.
