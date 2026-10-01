"use client";

import { PurchaseEstimator } from "@/components/tools/PurchaseEstimator";
import { RentalEstimator, type RentalGuideLinks } from "@/components/tools/RentalEstimator";
import type { Locale } from "@/config/site";
import type { ToolKey } from "@/data/tools";

export function CostEstimator({ locale, tool, rentalGuides }: { locale: Locale; tool: ToolKey; rentalGuides?: RentalGuideLinks }) {
  if (tool === "rental-initial-cost") return <RentalEstimator locale={locale} guides={rentalGuides} />;
  return <PurchaseEstimator locale={locale} />;
}
