# Fukuoka Insider Real Estate — Active Art Direction

## 1. Purpose & authority

This file is the active visual-design authority for **Fukuoka Insider Real Estate**. It defines the brand's visual point of view, page rhythm, design vocabulary, responsive intent, and the criteria used to judge new interface work.

It is not a record of past explorations and does not prescribe one permanent Homepage layout. Historical audits and superseded solutions belong in `docs/design/archive/`.

This document works within the confirmed product constraints in:

- `01_MASTER_BUILD_PROMPT.md`
- `02_PROJECT_BRIEF.md`
- `03_DECISIONS.md`

Those files remain authoritative for business scope, architecture, language strategy, CMS ownership, routing, deployment, and roadmap. `DESIGN.md` governs how confirmed content and product structure are expressed visually. If a design proposal would change a confirmed product decision, stop and request approval instead of solving the conflict through styling.

## 2. Brand thesis

> **Modern Japanese sensibility × international real-estate professionalism × Fukuoka lifestyle**

Fukuoka Insider Real Estate is a real company in Fukuoka helping overseas clients understand and act on local real-estate needs. The website should feel informed by the city and by the practical work of property service—not by a generic idea of Japan, luxury, or international business.

The desired character is:

- trustworthy without looking institutional;
- professional without becoming corporate or distant;
- approachable without becoming casual;
- editorial without behaving like a magazine;
- local to Fukuoka without becoming tourism content;
- international without relying on flags or global-business clichés.

The company brand comes first. People support trust but do not turn the site into a personal-agent brand. Use the supplied Fukuoka Insider logo as the master asset; `REAL ESTATE` remains restrained supporting typography and is never baked into or substituted for the logo. Since 2026-09-28 the logo artwork is used as transparent vector files (`public/images/brand/`), dark on light backgrounds and white on dark backgrounds or photography; see `03_DECISIONS.md`.

> **Active design system (2026-09-28):** 方向 1「和紙編集 / Washi Editorial」. Tokens and shared components live in `app/design-system.css` (colour, type, spacing, buttons, fact lists, brand lockup, header, footer). New and redesigned pages compose from these tokens instead of page-specific palettes. Fonts are self-hosted via `@fontsource` (Noto Sans/Serif TC & JP, Cormorant Garamond for the English hero line, Archivo for the REAL ESTATE lockup only).

> **Palette refinement (2026-09-29) — 「石垣と濠」:** colour tokens moved from cream + near-black to Fukuoka Castle stone neutrals (paper `#f2f1ec`, stone `#e7e4dc`), moat green accent (`#2f5249`), deep moat for dark bands (`#14201d`), ink `#1b2926`, and a single Hakata-ori gold thread (`#a8843f`) used only inside the signature stripe. The stripe (`public/images/brand/hakata.svg`, `.fi-hakata`, 献上柄-inspired) is the one signature motif and appears only in Guides and the homepage Fukuoka-life block. Guides: featured articles use photographs; all other articles are listed as a text-led index (category, full title, summary) — no generated or repeated covers.

> **Motion (2026-09-30):** One authored moment only — the homepage hero "focus pull" (photo sharpens from blur while settling, then title lines rise from a mask, then intro/actions/proof). All page titles share the line-rise. Scroll reveals are limited to bracket-framed photos (image unveils top→bottom, corner marks open outward), large feature photos, and the Hakata stripe (unrolls). Homepage services: hovering/focusing a service swaps the stage photo. Everything is visible by default; starting states apply only under `html.fi-motion`, set before paint unless `prefers-reduced-motion: reduce`, and removed after 4s if the page script never starts. Easing `--fi-ease-out: cubic-bezier(0.16, 1, 0.3, 1)`. Browser surfaces (selection, scrollbar, caret, accent) use brand tokens.

Traditional Chinese is the primary/source language for stable pages. Japanese and English must feel natural in their own language while preserving the same information structure and visual hierarchy. CJK readability is a first-order design requirement, not a late-stage adjustment.

## 3. Visual point of view

### Context over convention

Visual decisions must arise from the content, Fukuoka, real-estate service, trust evidence, or user needs—not from generic UI trends. Before using a visual device, identify the job it performs.

### Grid is a scaffold, not a cage

Grid creates order and alignment. Real content hierarchy may intentionally span, offset, overlap, or cross it when the reading order remains clear and the move has a content reason.

### Contrast creates rhythm

Use differences in scale, density, tone, image ratio, alignment, and whitespace to create scroll rhythm. Contrast should reveal priority; uniform restraint across every section produces visual blandness just as easily as uniform decoration produces noise.

### One authored gesture per section cluster

A section or closely related section cluster may carry one memorable visual gesture. Nearby content should be quieter so that the gesture has meaning. A gesture can be photographic, typographic, spatial, tonal, or interactive; it does not need to be decorative.

### Photography is spatial material

Real photography may define scale, crop, boundaries, depth, and transitions. It is not limited to thumbnails or cards. Images should communicate place, proof, emotion, or context.

### Proof before decoration

Trust is built by authentic evidence, precise language, visible service clarity, and real contact paths. Design may elevate evidence but must never imitate official credential styling or compensate for missing proof.

### Motion is punctuation

Motion should explain entry, transition, relationship, or state. Use a few purposeful moments rather than one reveal treatment applied to every section.

### Visual devices are conditional tools

Cards, icons, shadows, radius, gradients, large typography, layering, and overlap are available tools. Use them when they improve hierarchy, meaning, or brand expression; avoid repetitive, automatic, context-free use.

### Mobile recomposes

Mobile is redesigned around priority and touch behaviour. It is not a desktop grid collapsed into a single stack.

### Restraint means editing, not absence

Restraint means selecting a few strong devices, executing them precisely, and removing weaker ones. It does not mean reducing every page to text, hairlines, whitespace, and rectangular grids.

## 4. Page rhythm & visual amplitude

Design the page as a sequence of visual amplitudes:

- **Primary peak:** the page's clearest emotional or brand-defining moment. On the Homepage, Hero remains an important primary peak.
- **Secondary peaks:** one or two authored moments that renew attention through photography, typography, tone, spatial composition, or interaction.
- **Functional valleys:** calm, direct areas for navigation, facts, service explanation, comparison, or conversion.

A Homepage may contain approximately two to three memorable visual moments, but this is a judgment guide rather than a quota. Hero is not the only section allowed to have visual character. The test is whether peaks and valleys create a purposeful sequence rather than whether every section looks different.

Whitespace must have a job: establish priority, separate ideas, improve reading, reveal an image, or reset the page rhythm. On wide screens, increase compositional scale and relationships rather than simply narrowing content inside a large empty viewport. Text line lengths must remain readable even when images, surfaces, or section fields use more width.

## 5. Visual vocabulary

### 5.1 Typography

Use typographic roles instead of locking expression to named sections:

- **Display:** a scarce, high-contrast voice for an emotional or brand-defining statement.
- **Editorial:** expressive but readable typography for a lead story, image-led narrative, or significant transition.
- **Functional:** the CJK-first system for navigation, service names, explanations, controls, and body copy.
- **Proof / metadata:** compact, precise typography for licence information, categories, dates, language labels, and factual notes.

A section may use an expressive role when its content deserves it. Do not give every heading display treatment, and do not reserve all typographic character exclusively for Hero or Guides.

Maintain a deliberate hierarchy through family, weight, scale, tracking, line height, measure, and alignment. For Traditional Chinese and Japanese:

- body copy must remain comfortably readable at normal device sizes;
- line height must accommodate dense CJK forms;
- Latin capitals, Japanese, and Traditional Chinese should share a coherent visual weight;
- letter spacing must not be used to force CJK text into a Western luxury aesthetic;
- secondary text must remain visibly readable and meet contrast requirements.

Prefer the existing font system when it can express these roles. Add a new font dependency only when it materially improves the brand across languages and its performance cost is justified.

### 5.2 Photography

Prefer authentic photographs of Fukuoka, real homes and architecture, neighbourhood details, daily life, and genuine company evidence. A photograph must serve at least one role:

- **Place:** establish Fukuoka or a specific lived environment.
- **Proof:** verify company presence, people, work, or a real condition.
- **Emotion:** support the human meaning of living or owning property in Fukuoka.
- **Context:** help a visitor understand a service or editorial subject.

When justified, photography may be full-width, full-bleed, portrait, landscape, tightly cropped, masked, off-grid, sticky, layered, or used as a tonal transition. Do not predetermine fixed image/text percentages.

Cropping must preserve the factual meaning of proof photography. Do not reuse the same image across nearby sections, fill gaps with generic stock, or use AI-like lifestyle imagery that could represent any city. If no suitable image exists, a strong text-led composition is preferable to an irrelevant photograph.

### 5.3 Colour & tonal rhythm

The core palette remains coherent and restrained:

- warm white and stone for warmth and clarity;
- charcoal / primary ink for authority and readability;
- readable slate tones for secondary information;
- one muted deep-blue / slate-blue family for emphasis and tonal contrast.

Do not force every section onto warm white or stone. When the content benefits, use a darker tonal field, full-bleed photography, a stronger whitespace reset, a soft colour shift, or an image-led transition. Tonal changes must support the page rhythm and remain distinct from conversion surfaces.

Never achieve sophistication by lowering text contrast. Primary copy, secondary copy, proof lines, controls, and focus states must remain readable under WCAG contrast expectations.

### 5.4 Grid & controlled asymmetry

Use the grid to establish coherence across pages and break it only to express genuine hierarchy. Controlled asymmetry is encouraged when it clarifies content.

Suitable moves include:

- unequal column proportions;
- an off-grid caption tied to a real image;
- an image extending beyond its text column;
- a section-boundary crossing element;
- content-led overlap;
- portrait and landscape contrast;
- a wider visual field containing a narrower readable text measure.

Asymmetry must preserve a clear reading order, a clean mobile recomposition, and a content-based rationale. Avoid asymmetry whose only purpose is to make a common section appear designed.

### 5.5 Layering, surfaces & depth

Layering may express physical space, evidence, or editorial relationships. Overlap, borders, shadows, surfaces, and radius are allowed when they make hierarchy easier to perceive.

Depth should feel material and intentional rather than like default dashboard elevation. A surface should group content that belongs together; it should not wrap every item automatically. Use borders to clarify structure, not as a universal decoration system. Radius should follow the material language of the composition, not serve as an automatic signal of friendliness.

### 5.6 Icons, effects & expressive devices

Icons are useful when they improve recognition, reduce language burden, or clarify an action. They should be specific, consistent, and subordinate to real content. Avoid decorative icon walls and generic house, key, globe, or handshake symbols used as substitutes for hierarchy.

Gradients, masks, texture, large type, and other effects may support image readability, tonal transition, or a signature moment. They should be deliberate and scarce. The anti-AI test is not whether an effect exists, but whether it is repeated by default or disconnected from the subject.

### 5.7 Motion

Homepage motion may include approximately two to three purposeful moments, such as an image-mask reveal, restrained horizontal translation, sticky contextual image, crossfade, staggered reveal, or contextual image preview. Do not use all of them, and do not apply a universal reveal system to every section.

Motion must:

- communicate entry, transition, relationship, or state;
- avoid layout shift and preserve document flow;
- remain quick and restrained during hover, focus, and active states;
- play once when repeated playback would become distracting;
- support `prefers-reduced-motion` with an immediate, fully usable final state;
- remain optional to comprehension and navigation.

## 6. Responsive composition

Design and review at minimum for 1920px wide desktop, 1440px desktop, 834px tablet, and 390px mobile when relevant to the task.

### Wide desktop

Use width through image scale, compositional fields, controlled offsets, and relationships between elements. Do not create long text measures or leave large areas empty without a visual or functional role. A local wide shell may be appropriate when the section needs it; it is not a reason to widen all content globally.

### Tablet

Tablet is an independent composition state. Reconsider column count, image placement, reading order, and interaction instead of merely shrinking desktop. Horizontal overflow is never acceptable.

### Mobile

Recompose around the most important message and next action. Simplify overlaps, sticky behaviour, and secondary imagery when they do not translate well. Do not rely on hover. Preserve clear touch targets, visible focus, readable CJK type, concise proof content, and intentional image crops.

Responsive changes may alter visual order only when semantic and keyboard reading order remains coherent.

## 7. Interaction, accessibility & performance

Interactive elements must look and behave interactive. Use consistent hover, focus-visible, active, and visited states appropriate to their context. A whole row or visual group may be clickable when it represents one destination; do not create ambiguous empty clickable areas.

Phase 1 must not imply routes that do not exist. Mock Guide content and service overviews remain non-links until their real routes are implemented in the confirmed phase. When routes exist, restore clear clickable affordance rather than preserving a temporary static treatment.

Accessibility and performance are part of the art direction:

- semantic heading and reading order;
- keyboard-operable navigation and visible focus;
- readable contrast and useful alt text;
- `prefers-reduced-motion` support;
- responsive, appropriately sized images;
- intrinsic image dimensions or stable aspect-ratio containers;
- no visual effect that creates layout shift;
- restrained client-side work and no unnecessary animation dependency.

## 8. Homepage section contracts

The current Phase 1 Homepage sequence is:

```text
Hero → Services & Support → Why Fukuoka Insider → Featured Guides
→ Latest Guides → Life in Fukuoka → About → Free Consultation → Footer
```

The Homepage is an overview, trust, navigation, and conversion surface. Detailed processes, full service scope, and complete company information belong on the confirmed subpages in later phases.

### Header

- **Job:** identify the company, expose primary navigation, language choice, and Free Consultation.
- **Required:** master logo treatment, concise navigation, visible consultation path, usable mobile menu.
- **Success:** calm and immediately understandable; does not compete with the page's primary peak.
- **Responsive intent:** preserve brand recognition and the consultation action without crowding the mobile header.

### Hero

- **Job:** establish the emotional proposition of building a life in Fukuoka and make the company's real-estate relevance clear.
- **Required:** `Build Your Life in Fukuoka.`, concise service context, multilingual support, one primary Free Consultation CTA, light factual trust cues, no personal portraits.
- **Hierarchy:** emotional thesis first, practical explanation second, action third.
- **Success:** feels specific to Fukuoka and the company rather than like a luxury-property campaign.
- **Responsive intent:** retain the thesis and action while adapting crop, type scale, and copy measure for mobile.
- **Suitable strategies:** photography-led field, controlled layering, a single entrance sequence, or another justified primary-peak treatment.

### Services & Support

- **Job:** let a first-time visitor understand the four service areas within three to five seconds and identify the appropriate next destination.
- **Required:** Rental, Buy & Sell, Property Management, and Living Support; concise descriptions; primary services and secondary Living Support remain honestly represented. The four Traditional Chinese labels are exactly 租屋服務、房產買賣、物業管理、生活支援.
- **Hierarchy:** service recognition and navigation first; supporting description second. Do not expand into detailed processes on the Homepage.
- **Success:** clearly functions as overview/navigation, is visually distinct from Trust and Guides, and does not resemble a thin directory or a generic feature-card grid.
- **Responsive intent:** mobile prioritises linear scanning and touch clarity. Desktop may use broader spatial or contextual relationships without lengthening the copy.
- **Suitable strategies:** Contextual Service Field, structured index, single contextual visual, shared surface, or another composition that makes all four services immediately legible.

### Why Fukuoka Insider / Trust

- **Job:** establish enough factual credibility for a visitor to continue or enquire.
- **Required proof:**
  - the company operates in Fukuoka and can provide local support;
  - 株式会社Fukuoka Insider holds a Japanese real-estate business licence: `福岡県知事 (1) 021270号`;
  - a `宅地建物取引士` provides professional support; Danny's individual qualification must not be conflated with the company's licence;
  - communication is available in Traditional Chinese, Japanese, and English.
- **Hierarchy:** authentic evidence and professional qualification first; concise local and multilingual facts second.
- **Success:** communicates all three reasons within a few seconds, remains concise enough for a Homepage, and never resembles a credential report or an imitation government certificate.
- **Responsive intent:** show the strongest proof first and keep secondary facts brief on mobile.
- **Suitable strategies:** Evidence Rail, real office proof photography, a concise evidence band, typographic proof line, or another compact composition grounded in authentic evidence.

### Featured Guides

- **Job:** present a curated editorial point of view and connect real-estate service with useful Fukuoka knowledge.
- **Required:** one to three manually selected Guides; each uses image, category, title, and summary; tags remain hidden on the Homepage.
- **Hierarchy:** one lead story; zero to two companions adapt to the available content rather than leaving empty slots.
- **Success:** content and photography lead; it feels editorially selected rather than like another service grid.
- **Responsive intent:** mobile preserves one clear lead and simplified companion stories; no desktop carousel and no required mobile carousel.
- **Suitable strategies:** cover story, strong image/text contrast, content-led asymmetry, or a justified editorial transition.

### Latest Guides

- **Job:** provide a fast, scannable path to the newest available content without competing with Featured Guides.
- **Required:** a small set of three to five latest Guides when CMS data is available; image, category, title, and summary remain the content model.
- **Hierarchy:** titles and recency first; metadata and supporting image second.
- **Success:** is clearly distinct from Featured, remains easy to scan, and scales to future CMS data.
- **Responsive intent:** maintain a vertical list on mobile rather than converting to a carousel.
- **Suitable strategies:** cardless journal list, concise contents rows, optional contextual preview on capable desktop devices.

### Life in Fukuoka

- **Job:** bridge to the master Fukuoka Insider brand and its useful city/lifestyle context without becoming tourism content.
- **Required:** natural explanation and a clear path to Fukuoka Insider.
- **Success:** adds place identity and a tonal reset without repeating Hero or inventing a second slogan.
- **Responsive intent:** remain concise; use photography only when a genuine, non-repeated image has a clear role.

### About

- **Job:** introduce the company first and provide a light path to the fuller About page.
- **Required:** company-led summary; people remain supporting trust at approximately the confirmed 80/20 brand balance.
- **Success:** increases approachability without turning the Homepage into a biography or personal-agent site.
- **Responsive intent:** preserve company-first reading order and keep profiles concise.

### Free Consultation

- **Job:** convert interest into one clear next step.
- **Required:** the approved Free Consultation language and the existing enquiry route; supplementary channels remain subordinate.
- **Success:** visually clear and confident without aggressive sales language or fake urgency.
- **Responsive intent:** mobile opens the enquiry route directly; touch target and explanatory copy remain clear.

### Footer

- **Job:** provide compact navigation, contact, legal, language, social, and brand closure.
- **Required:** only confirmed destinations and company information; do not include `fukuoka.cc`.
- **Success:** useful and complete without becoming a second sitemap page.

## 9. Conditional visual devices

### Preferred brand-native strategies

These are optional strategies, not mandatory components or recurring templates. Future designers may invent other strategies when they satisfy the same principles more effectively.

#### Fukuoka Window

A real Fukuoka photograph becomes a spatial opening in the page: full-bleed, off-grid, masked, or crossing a section boundary. It should establish place or lived context and may carry one restrained reveal. Use it only when the photograph is strong enough to lead the composition.

#### Evidence Rail

Authentic company or licence evidence is paired with precise factual copy in one compact reading path. Photography, proof typography, a hairline, subtle layering, or shallow depth may create hierarchy; never imitate a seal, badge, award, or government certificate.

#### Contextual Service Field

The four services share one coherent visual field rather than four default cards. Hierarchy may come from scale, position, one contextual image, focus-driven change, or a structured reading path. Desktop may support sticky or crossfading context when real destinations and suitable assets exist; mobile returns to a clear linear sequence.

#### Service pages — Washi Editorial template (active from 2026-09-28)

The four service pages share one template (`components/service-pages/ServicePage.tsx`, styles in `app/services.css`): hero (service name, one-sentence lead, Free Consultation + LINE, framed photograph), who it is for, how we help (paths/types as panels with task lists), process (real four-step sequence), pre-enquiry checklist (with cost-estimator link where relevant), limitations, company facts, other services, and the shared consultation band. The services overview shows all four services at once and ends with the consultation band. The **bracket frame** — three L-shaped corner marks taken from the logo — is the signature photographic device; use it for at most one or two key photographs per page.

#### Contextual Service Navigator — superseded (kept for history)

> Superseded on 2026-09-28 by the Washi Editorial service template. The plaque asset and navigator are no longer used.

The approved service-page family starts from a **photography-led contextual navigator**. It is a reusable visual grammar, not a fixed page template or a requirement to reproduce one desktop composition on every service page.

- **Contextual photography:** photography is a spatial field that explains the active subject. It should show believable Fukuoka residential, urban, daily-life, operational, or evidence context, not generic global stock or glossy luxury interiors.
- **Active subject:** one service or page subject is clearly active at a time. Its name, relevant audience, factual support summary, image context, and available route must read as one connected decision path.
- **Editorial navigation:** a dark ink navigation field can carry an asymmetric but legible service index. Active state is expressed through scale, weight, position, contrast, and a meaningful line relationship—not decorative numbering or a component-library card pattern.
- **Boundary-crossing title:** on suitable wide compositions, the active subject may cross the shared edge between ink navigation and photography. This is a content-led spatial gesture, not a banner or an isolated floating panel.
- **Warm information plane:** a quieter warm-paper field can carry the active audience, concise factual explanation, and route action. It is an editorial continuation of the image/navigation relationship, not a dashboard table.
- **Tonal relationship:** deep ink establishes orientation and authority; natural photography supplies place and context; warm paper provides explanation and decision space. These fields should feel like one sequence rather than three independently styled rectangles.
- **Interaction:** service selection may update contextual photography and summary with restrained state transition. Keyboard focus, direct tap behaviour, visible affordance, and `prefers-reduced-motion` are required; motion only explains a state change.
- **Mobile recomposition:** preserve a clear tap-first service index, then image context and the active summary in reading order. Simplify overlap and keep the active title readable; do not merely stack desktop columns.

**Bespoke active-title plaque.** Where the boundary-crossing title needs a material field, use the approved warm ivory / parchment plaque as an authored visual asset. It is mostly opaque with slight translucency, subtle watercolor / vellum tonal variation, a thin warm-white hairline rim, gentle broad shadow, and a controlled broad horizontal organic silhouette. It must never become a rounded UI card, glassmorphism, a triangular wedge, or a random blob. The service title remains real, accessible HTML text and the underline remains code-rendered; neither is baked into the image.

The production asset is `public/images/services/service-title-plaque.png`. Its approved source remains at `design-mockups/approved/service-navigator-v1/assets/service-title-plaque-approved.png` as design provenance. Do not regenerate or redraw this plaque as CSS/SVG. Reuse the asset at an undistorted aspect ratio, with service-specific HTML text layered above it.

**Service-page content balance.** The four service pages are Persuade / lead-generation surfaces, not exhaustive educational guides. Keep them concise, easy to scan, and broadly similar in information density and total reading effort without forcing identical section anatomy or exact text length. Each page should make six decisions easy: whether the service is relevant, what Fukuoka Insider can help with, the general process, what to prepare, one important limitation, and how to enquire. Move detailed legal, tax, procedural, and special-case explanations to Guides, FAQ, or future specialist resources.

**Reuse without repetition.** The shared grammar should change emphasis according to the page's job:

- Services uses contextual service selection and route orientation.
- Rent combines rental context with process, preparation, and practical expectations.
- Buy & Sell uses one shared property and transaction context, with purchase and sale expressed as two clear paths rather than two pasted-together pages.
- Property Management uses operational and evidence context.
- Living Support uses relocation and daily-life context.
- About uses people, place, and factual evidence.
- Guides use editorial photography and an index.

No later page should mechanically duplicate the current left-navigation / right-photography arrangement, plaque placement, or information-plane proportions. Reuse the relationship between active subject, contextual image, editorial index, tonal field, and restrained interaction when it helps the visitor understand the page.

### Device decision test

Before adding a card, icon, shadow, radius, gradient, large heading, overlap, sticky element, or animation, answer:

1. What information, relationship, or brand idea does it express?
2. Is it the strongest device for this content, or merely a familiar default?
3. Is the same device already carrying another nearby section?
4. Does it remain clear and coherent in Traditional Chinese, Japanese, and English?
5. How does it recompose on tablet and mobile?
6. Does it preserve accessibility, performance, and factual accuracy?

If the answers are weak, remove or replace the device. If they are strong, the device is allowed even when it is visually expressive.

## 10. Hard guardrails

The following are true restrictions:

- no fake awards, rankings, statistics, testimonials, service claims, or credentials;
- no wording or decoration that conflates the company licence with an individual's `宅地建物取引士` qualification;
- no fake luxury positioning, black-and-gold property clichés, or unsupported exclusivity;
- no fake links, broken service routes, or controls that imply unavailable functionality;
- no dense legacy Japanese real-estate portal aesthetic, banner walls, tiny text, or excessive listing density;
- no generic stock or AI-generated imagery presented as real Fukuoka, property, office, or company evidence;
- no autoplay carousel, scroll hijacking, mouse-follow interaction, or excessive 3D effects;
- no inaccessible text contrast, hidden keyboard focus, hover-only essential information, or motion without a reduced-motion fallback;
- no decorative seal, badge, icon, or document treatment that misrepresents credentials;
- no modification or distortion of the master logo;
- no design change that silently expands scope, alters language/CMS ownership, introduces Phase 2+ functionality, or changes deployment architecture.

Cards, icons, shadows, radius, gradients, asymmetry, full-bleed imagery, large typography, and overlap are not hard restrictions. Their use is governed by context, hierarchy, repetition, accessibility, and brand fit.

## 11. Implementation notes

- Use existing design tokens and `docs/DESIGN_SYSTEM.md` as the implementation source for current colour, typography, spacing, and motion values. When the active visual system changes, update tokens centrally rather than scattering values across components.
- Keep `DESIGN.md` at the level of art direction and success criteria. Exact percentages, column recipes, breakpoints, durations, and component anatomy belong in the design system or implementation task when approved.
- Stable-page content remains Git-managed; the current V1 implementation uses typed locale data modules, while layout and visual behaviour remain in code. Guides and FAQ are consumed through a provider-agnostic adapter; Phase 3 uses typed local seed data and the final CMS provider is not yet locked. A future provider or Markdown import layer may change storage format without changing these ownership boundaries and must not become a visual page builder.
- Homepage Featured and Latest Guides consume the same Phase 3 adapter as Guide pages. The local seed validates the production content model but must not become a duplicate editorial source after a CMS provider is approved.
- Use real intrinsic image dimensions and stable aspect-ratio containers. Treat office proof images as factual assets: optimisation may change delivery format or size, but must not alter the represented evidence.
- Validate meaningful UI work against 1920px, 1440px, 834px, and 390px as appropriate, including horizontal overflow, reading order, CJK legibility, focus, touch interaction, reduced motion, and layout shift.
- Follow the Phase 1 workflow: inspect the current localhost state, analyse before broad changes, implement only after approval, perform visual QA after implementation, run relevant checks, show the result, and do not commit without confirmation.
- This document does not authorise a Homepage redesign, a new mockup, Phase 2 work, CMS integration, or deployment. Each remains subject to the approved project phase and user gate.

## Design acceptance question

Before approving a direction, ask:

> Does this feel like a real Fukuoka company helping overseas clients understand property and life here—with clear evidence, useful navigation, and a visual point of view that belongs to this subject?

If the same composition could be transferred unchanged to an unrelated consultancy, luxury development, or generic AI landing page, it is not yet specific enough.

## FAQ pattern (2026-09-30)

- Help page: sticky topic index on desktop (label, count, current topic marked with a short slate rule, no side-tab border); on phones the topics become a horizontal row of tappable chips. Search sits above the questions and filters within the topic groups; a search with one or two results opens them.
- Each topic is an `h2` with a 1px ink rule, then `<details>` rows: serif question, round +/− control, answer max 44rem with slate dash bullets, and related links (guide, cost tool, service) as text links.
- Deep links: `/help#q-<key>` opens and scrolls to that question (used by the homepage FAQ list).
- The same row style is reused on service pages (left: heading + "see all"; right: up to four questions) and the homepage FAQ list (links into the Help page).
