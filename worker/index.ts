/** Cloudflare Worker entry point (vinext app router + image optimisation). */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

import { recordEvent, statsPage, type D1Database } from "./stats";

interface Env {
  /** Click statistics (optional, see worker/stats.ts). */
  EVENTS_DB?: D1Database;
  STATS_KEY?: string;
  ASSETS: { fetch(request: Request): Promise<Response> };
  CF_VERSION_METADATA?: { id: string };
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

/** The public domain (Danny 2026-10-15). */
const PUBLIC_HOST = "fukuoka.house";

/**
 * Page cache (Danny 2026-10-17, staying on Workers Free): rendering a page costs more CPU than the free plan's
 * per-request limit allows under bursts, so finished pages are kept in Cloudflare's edge cache and reused.
 * Only plain GET page requests are cached: full HTML pages without a query string, and RSC payloads (client
 * navigation and link prefetch) keyed by their `_rsc` parameter, which vinext derives from every header that changes
 * the payload (prefetch mode, router state, URL) precisely so CDNs can cache by URL. The key includes the
 * deployment version, so a new deploy never serves pages from the previous one. Browsers keep the page's own
 * Cache-Control header; the long lifetime applies only inside the edge cache.
 */
const EDGE_TTL_SECONDS = 7 * 24 * 60 * 60;

function pageCacheKey(request: Request, url: URL, env: Env): Request | null {
  const version = env.CF_VERSION_METADATA?.id;
  if (!version || request.method !== "GET") return null;
  if (url.pathname.startsWith("/api/") || url.pathname === "/stats" || url.pathname.startsWith("/_")) return null;
  const isRsc = request.headers.get("RSC") === "1" || url.pathname.endsWith(".rsc");
  const params = [...url.searchParams.keys()];
  if (isRsc ? !url.searchParams.has("_rsc") || params.some((key) => key !== "_rsc") : params.length > 0) return null;
  const key = new URL(url.toString());
  key.searchParams.set("__v", version);
  if (isRsc) key.searchParams.set("__rsc", "1");
  return new Request(key.toString(), { method: "GET" });
}

function edgeCache(): Cache | undefined {
  return (globalThis as unknown as { caches?: { default?: Cache } }).caches?.default;
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // One public address: www.fukuoka.house and the old test address (*.workers.dev) move to https://fukuoka.house,
    // and old /re/... links (the prototype path) drop the prefix.
    const path = url.pathname === "/re" ? "/" : url.pathname.startsWith("/re/") ? url.pathname.slice(3) : url.pathname;
    const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    if (!local && url.protocol === "http:") {
      url.protocol = "https:";
      return Response.redirect(url.toString(), 301);
    }
    if (!local && (url.hostname === "www.fukuoka.house" || url.hostname.endsWith(".workers.dev")) || path !== url.pathname) {
      const target = local ? new URL(url) : new URL(`https://${PUBLIC_HOST}`);
      target.pathname = path;
      target.search = url.search;
      return Response.redirect(target.toString(), 301);
    }

    if (url.pathname === "/") return Response.redirect(new URL("/zh-TW", url).toString(), 302);

    if (url.pathname === "/api/event") return recordEvent(request, env);
    if (url.pathname === "/stats") return statsPage(request, env);

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    const cache = edgeCache();
    const key = cache ? pageCacheKey(request, url, env) : null;
    if (cache && key) {
      const hit = await cache.match(key);
      if (hit) {
        const response = new Response(hit.body, hit);
        const browserCacheControl = response.headers.get("X-FI-Cache-Control");
        if (browserCacheControl) response.headers.set("Cache-Control", browserCacheControl);
        else response.headers.delete("Cache-Control");
        response.headers.delete("X-FI-Cache-Control");
        response.headers.set("X-FI-Cache", "HIT");
        return response;
      }
    }

    const response = await handler.fetch(request, env, ctx);
    const type = response.headers.get("Content-Type") ?? "";
    if (cache && key && response.status === 200 && !response.headers.has("Set-Cookie") && (type.includes("text/html") || type.includes("text/x-component"))) {
      const copy = new Response(response.clone().body, response);
      const browserCacheControl = response.headers.get("Cache-Control");
      if (browserCacheControl) copy.headers.set("X-FI-Cache-Control", browserCacheControl);
      copy.headers.set("Cache-Control", `public, max-age=${EDGE_TTL_SECONDS}`);
      copy.headers.delete("Vary");
      ctx.waitUntil(cache.put(key, copy));
    }
    return response;
  },
};

export default worker;
