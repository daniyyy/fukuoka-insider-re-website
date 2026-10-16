/** Cloudflare Worker entry point (vinext app router + image optimisation). */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

import { recordEvent, statsPage, type D1Database } from "./stats";

interface Env {
  /** Click statistics (optional, see worker/stats.ts). */
  EVENTS_DB?: D1Database;
  STATS_KEY?: string;
  ASSETS: { fetch(request: Request): Promise<Response> };
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

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // One public address: www.fukuoka.house and the old test address (*.workers.dev) move to https://fukuoka.house,
    // and old /re/... links (the prototype path) drop the prefix.
    const path = url.pathname === "/re" ? "/" : url.pathname.startsWith("/re/") ? url.pathname.slice(3) : url.pathname;
    const local = url.hostname === "localhost" || url.hostname === "127.0.0.1";
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

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
