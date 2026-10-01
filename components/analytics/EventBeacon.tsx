"use client";

import { useEffect } from "react";

import { setAnalyticsAdapter } from "@/lib/analytics/events";

const endpoint = `${process.env.NEXT_PUBLIC_BASE_PATH ?? "/re"}/api/event`;

/**
 * Sends button-click events (free consultation, LINE/WhatsApp/phone, estimator use…) to the site's own
 * Worker, which counts them only when the click-statistics database is switched on (see
 * docs/analytics-and-deployment.md). No cookies, no personal data: event name, language, page area, page path.
 */
export function EventBeacon() {
  useEffect(() => {
    setAnalyticsAdapter((event) => {
      try {
        const body = JSON.stringify({ ...event, path: window.location.pathname });
        if (navigator.sendBeacon) navigator.sendBeacon(endpoint, new Blob([body], { type: "application/json" }));
      } catch {
        // Statistics must never interfere with the page.
      }
    });
  }, []);
  return null;
}
