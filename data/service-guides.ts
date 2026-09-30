import type { ServiceKey } from "@/data/service-pages";

/**
 * Guides shown on each service page, in order (published ones only; unpublished slugs are skipped).
 * Services without suitable articles show no Guides section.
 */
export const serviceGuideSlugs: Record<ServiceKey, string[]> = {
  rent: ["rental-initial-costs-reikin-shikikin", "guarantor-company-and-joint-guarantor", "guarantor-company-screening-call"],
  "buy-sell": [],
  "property-management": [],
  "living-support": ["fukuoka-late-night-garbage-collection", "city-gas-vs-lp-gas", "delivery-boxes-in-fukuoka"],
};
