import type { Locale } from "@/config/site";

export type AnalyticsSource = "header" | "header-compact" | "mobile-menu" | "homepage-hero" | "homepage-final" | "service-page" | "service-navigator" | "guide-article" | "about-page" | "help-page" | "contact-page" | "calculator" | "footer";
export type AnalyticsService = "rent" | "buy-sell" | "property-management" | "living-support";
export type AnalyticsTool = "rental-initial-cost" | "purchase-cost";
export type ContactChannel = "form" | "line" | "whatsapp" | "email" | "phone";

export type AnalyticsEvent =
  | { name: "consultation_cta_click"; locale: Locale; source: AnalyticsSource }
  | { name: "google_form_outbound"; locale: Locale; source: "contact-page" }
  | { name: "contact_channel_click"; locale: Locale; source: "contact-page" | "footer" | "mobile-menu" | "homepage-final" | "service-page" | "about-page" | "help-page" | "calculator"; channel: ContactChannel }
  | { name: "service_navigator_select"; locale: Locale; source: "service-navigator"; service: AnalyticsService }
  | { name: "guide_to_service_click"; locale: "zh-TW" | "en"; source: "guide-article"; service?: AnalyticsService }
  | { name: "calculator_start" | "calculator_complete"; locale: Locale; source: "calculator"; tool: AnalyticsTool }
  | { name: "contact_entry"; locale: Locale; source: "contact-page" };

export type AnalyticsAdapter = (event: Readonly<AnalyticsEvent>) => void;

// No provider is configured. No event data leaves the browser until one is explicitly connected.
let adapter: AnalyticsAdapter = () => {};

export function setAnalyticsAdapter(next: AnalyticsAdapter): void { adapter = next; }
export function trackEvent(event: AnalyticsEvent): void { adapter(event); }
