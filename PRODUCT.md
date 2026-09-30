# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Fukuoka Insider Real Estate primarily serves overseas clients, especially people from Hong Kong and Taiwan, who are considering renting, buying, selling, or managing property in Fukuoka, or who need related relocation support. Japanese and broader international visitors are also supported.

## Product Purpose

The website helps visitors understand available real-estate services, verify that the company is locally established and appropriately licensed, read useful Fukuoka property and life information, and begin a free consultation through a real contact route.

## V1 Service Architecture

The four service routes are Rental, Buy & Sell, Property Management, and Living Support. Buy & Sell is one concise lead-generation service page with separate purchase and sale paths. Buying and Selling remain separate Guide categories and both relate back to the shared Buy & Sell service route.

## Positioning

Fukuoka Insider combines practical Fukuoka real-estate support, multilingual communication, and locally grounded editorial guidance. It is a lead-generation and information site, not a property-listing portal or a personal-agent brand.

## Operating Context

Visitors may be in Japan or overseas and may be unfamiliar with Japanese real-estate procedures. They need concise service explanations, factual limitations, readable guides, quick FAQ answers, and clear paths to the existing enquiry form, LINE, email, or telephone.

## Capabilities and Constraints

- Stable corporate and service pages are available in Traditional Chinese, Japanese, and English.
- Guides are published in Traditional Chinese only (Danny, 2026-09-29); English is undecided and Japanese Guides are not planned. Navigation shows Guides only for locales listed in `siteConfig.guideLocales`. Japanese editorial URLs must not be fabricated.
- Help / FAQ is available in Traditional Chinese and English only (Danny, 2026-09-30: no Japanese clients for this material). `siteConfig.faqLocales` controls where FAQ appears; Japanese pages have no FAQ link or FAQ blocks.
- Editorial content is accessed through a small provider-agnostic content adapter. The initial production scaffold uses typed local seed data; the final CMS provider remains replaceable.
- Draft editorial content is never exposed through public lists, routes, related content, or sitemap output.
- The primary conversion route is the existing detailed property enquiry form. The 2026-09-25 V1 completion sprint adds two editable-input cost estimators. The site does not implement a native full enquiry form, CRM, accounts, listings, global search, or deployment in the current phase.
- The prototype runs beneath a configurable `/re` base path and remains `noindex, nofollow` until an approved production migration.

## Brand Commitments

- Public name: Fukuoka Insider Real Estate; master brand: Fukuoka Insider.
- Use the existing Fukuoka Insider logo without alteration. `REAL ESTATE` remains supporting typography.
- Company first, people second. The website is not a personal-agent site.
- Voice is factual, calm, direct, warm, and professional. Avoid luxury-property clichés, aggressive sales language, and unsupported claims.

## Evidence on Hand

- Real company and contact information in `config/site.ts`.
- Real Fukuoka office and licence evidence photography in `public/images/office/`.
- Existing Fukuoka, residential, planning, and waterfront images in `public/images/` suitable as temporary editorial seed imagery.
- Danny's own Fukuoka photographs (Ohori Park, Hakata Station, Fukuoka Castle moat) and licensed stock, logged in `docs/photo-sources.md`. No property availability, transaction results, testimonials, rankings, or investment-return evidence is available and none may be fabricated.

## Visitor state of mind

A Hong Kong or Taiwanese visitor is often planning a move or an investment from abroad: excited but uncertain, reading in their own language about an unfamiliar Japanese process, and worried about being misled or overcharged. They need to feel, within seconds, that a real local team in Fukuoka will explain things plainly in Cantonese or Mandarin.

## Core experience (design thesis)

**「在地引路」— a trusted insider opens the gate to Fukuoka.** The office stands at Ōtemon, the main gate of Fukuoka Castle. The site should feel like being met at the gate by someone who knows the city from inside: calm, precise, never pushy.

Real-world references carried into the design:
- Fukuoka Castle stone walls and the Ohori moat → the "石垣と濠" palette (stone neutrals, moat green).
- Hakata-ori (献上柄) → the single signature stripe, used only for editorial content.
- The logo's bracket marks → a camera finding focus: framed photographs, and the homepage hero that pulls Fukuoka into focus.

Mask test: remove the logo and the page should still read as Fukuoka Insider (Ohori Park, Ōtemon, Hakata-ori, Cantonese/Mandarin) and not as a generic agency.

Design work follows `docs/design-guidelines-no-ai-look.md`.

## Product Principles

1. Make the relevant service or answer easy to identify before adding detail.
2. Build trust through factual local evidence, clear limitations, and working contact paths.
3. Keep service pages concise and use Guides / Help for deeper explanation.
4. Preserve language truth: publish only real translations and never infer a missing locale route.
5. Keep content ownership replaceable and layout protected in code.

## Accessibility & Inclusion

Use semantic structure, keyboard-operable controls, visible focus, readable CJK typography, sufficient contrast, meaningful image alternatives, touch targets of at least 44px, reduced-motion support, and responsive recomposition at desktop, tablet, and mobile widths.
