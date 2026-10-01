import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";
import { recordEvent, statsPage } from "../worker/stats.ts";

// Minimal stand-in for a Cloudflare D1 database.
function fakeD1() {
  const db = new DatabaseSync(":memory:");
  const d1 = {
    exec: async (sql) => db.exec(sql),
    prepare: (sql) => {
      let args = [];
      const statement = { bind: (...values) => { args = values; return statement; }, run: async () => db.prepare(sql).run(...args), all: async () => ({ results: db.prepare(sql).all(...args) }) };
      return statement;
    },
  };
  return { db, d1 };
}
const post = (body) => new Request("https://example.com/re/api/event", { method: "POST", body: JSON.stringify(body) });

test("click statistics count known events only", async () => {
  const { db, d1 } = fakeD1();
  const env = { EVENTS_DB: d1, STATS_KEY: "secret" };
  assert.equal((await recordEvent(post({ name: "contact_channel_click", locale: "zh-TW", source: "calculator", channel: "line" }), env)).status, 204);
  await recordEvent(post({ name: "not_an_event" }), env);
  const rows = db.prepare("SELECT name, detail FROM events").all();
  assert.equal(rows.length, 1);
  assert.equal(rows[0].detail, "line");
});

test("stats page needs the key and the database", async () => {
  const { d1 } = fakeD1();
  const env = { EVENTS_DB: d1, STATS_KEY: "secret" };
  assert.equal((await statsPage(new Request("https://example.com/re/stats?key=wrong"), env)).status, 404);
  assert.equal((await statsPage(new Request("https://example.com/re/stats?key=secret"), env)).status, 200);
  assert.equal((await statsPage(new Request("https://example.com/re/stats?key=secret"), {})).status, 404);
  assert.equal((await recordEvent(post({ name: "calculator_start" }), {})).status, 204);
});
