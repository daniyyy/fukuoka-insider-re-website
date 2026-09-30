"use client";

import { useEffect } from "react";
import type { Locale } from "@/config/site";
import { trackEvent } from "@/lib/analytics/events";

export function ContactEntryTracker({ locale }: { locale: Locale }) {
  useEffect(() => { trackEvent({ name: "contact_entry", locale, source: "contact-page" }); }, [locale]);
  return null;
}
