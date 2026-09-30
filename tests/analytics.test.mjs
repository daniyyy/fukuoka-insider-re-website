import assert from "node:assert/strict";
import test from "node:test";
import { setAnalyticsAdapter, trackEvent } from "../lib/analytics/events.ts";

test("analytics boundary is no-op until a provider is installed", () => {
  assert.doesNotThrow(() => trackEvent({ name: "consultation_cta_click", locale: "zh-TW", source: "header" }));
});

test("analytics adapter receives only the explicitly supplied event", () => {
  const received = [];
  setAnalyticsAdapter((event) => received.push(event));
  const event = { name: "calculator_complete", locale: "en", source: "calculator", tool: "purchase-cost" };
  trackEvent(event);
  assert.deepEqual(received, [event]);
  setAnalyticsAdapter(() => {});
});
