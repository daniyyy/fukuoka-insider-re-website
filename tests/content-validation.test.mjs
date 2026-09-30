import assert from "node:assert/strict";
import test from "node:test";

import { seedGuides } from "../data/guide-content.ts";
import { seedFaqItems } from "../data/faq-content.ts";
import { contentValidationErrors } from "../lib/content/validation.ts";

const source = { guides: seedGuides, faqItems: seedFaqItems };

test("current seed data is valid and no Guide is accidentally public", () => {
  assert.deepEqual(contentValidationErrors(source), []);
  assert.equal(seedGuides.some((guide) => guide.status === "published"), false);
});

test("publication requires explicit approval and valid publication dates", () => {
  const guide = { ...seedGuides[0], status: "published", publishedAt: "2026-09-25" };
  assert.match(contentValidationErrors({ guides: [guide], faqItems: [] }).join("\n"), /editorial approval/);
  assert.deepEqual(contentValidationErrors({ guides: [{ ...guide, editorialApprovedAt: "2026-09-24" }], faqItems: [] }), []);
  assert.match(contentValidationErrors({ guides: [{ ...guide, publishedAt: "2026-02-30", editorialApprovedAt: "2026-09-24" }], faqItems: [] }).join("\n"), /publication/);
});

test("duplicate Guide paths and pairing keys are rejected", () => {
  const guide = seedGuides[0];
  const errors = contentValidationErrors({ guides: [guide, { ...guide, id: "different-id" }], faqItems: [] }).join("\n");
  assert.match(errors, /Duplicate Guide route/);
  assert.match(errors, /Duplicate Guide translation/);
});

test("FAQ answers use company tokens and exist in every language", () => {
  const item = seedFaqItems[0];
  const hardCoded = { ...item, answer: "福岡県知事（1）第021270号" };
  assert.match(contentValidationErrors({ guides: [], faqItems: [hardCoded] }).join("\n"), /hard-codes company details/);
  assert.match(contentValidationErrors({ guides: [], faqItems: [{ ...item, answer: "{unknownToken}" }] }).join("\n"), /unknown token/);
  const withoutEnglish = seedFaqItems.filter((faq) => faq.locale !== "en" || faq.key !== item.key);
  assert.match(contentValidationErrors({ guides: [], faqItems: withoutEnglish }).join("\n"), /missing in en/);
  assert.equal(seedFaqItems.some((faq) => faq.locale === "ja"), false);
});
