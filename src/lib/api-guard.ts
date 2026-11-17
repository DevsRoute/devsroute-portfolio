import "server-only";

import { NextResponse } from "next/server";

import { siteConfig } from "@/lib/site-config";

/**
 * Shared protections for public POST endpoints:
 *  - same-origin check (blocks cross-site form/fetch abuse of the API)
 *  - JSON content-type + body size cap
 *  - best-effort per-IP fixed-window rate limit (in-memory; per server instance).
 *    For multi-instance/serverless production, swap the store for Redis/Upstash.
 */

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 10_000;

function clientIp(request: Request) {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function rateLimited(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    if (buckets.size >= MAX_BUCKETS) {
      for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
      if (buckets.size >= MAX_BUCKETS) buckets.clear();
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }
  bucket.count += 1;
  if (bucket.count > limit) return Math.ceil((bucket.resetAt - now) / 1000);
  return null;
}

function allowedOrigins(request: Request) {
  const origins = new Set<string>();
  try {
    origins.add(new URL(siteConfig.url).origin);
  } catch {
    /* ignore */
  }
  // Same host the request was served from (preview deployments, localhost).
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (host) {
    const proto =
      request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ||
      new URL(request.url).protocol.replace(":", "");
    origins.add(`${proto}://${host}`);
  }
  return origins;
}

export type GuardOptions = {
  name: string;
  limit: number;
  windowMs: number;
  maxBodyBytes: number;
};

/**
 * Validates the request and returns the parsed JSON body, or a NextResponse error.
 */
export async function guardJsonPost(
  request: Request,
  opts: GuardOptions,
): Promise<{ body: unknown } | { error: NextResponse }> {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (
    (origin && !allowedOrigins(request).has(origin)) ||
    (fetchSite && fetchSite !== "same-origin" && fetchSite !== "none")
  ) {
    return { error: NextResponse.json({ error: "Forbidden." }, { status: 403 }) };
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) {
    return {
      error: NextResponse.json({ error: "Unsupported content type." }, { status: 415 }),
    };
  }

  const retryAfter = rateLimited(
    `${opts.name}:${clientIp(request)}`,
    opts.limit,
    opts.windowMs,
  );
  if (retryAfter !== null) {
    return {
      error: NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429, headers: { "Retry-After": String(retryAfter) } },
      ),
    };
  }

  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > opts.maxBodyBytes) {
    return { error: NextResponse.json({ error: "Request too large." }, { status: 413 }) };
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return { error: NextResponse.json({ error: "Invalid request." }, { status: 400 }) };
  }
  if (new TextEncoder().encode(raw).length > opts.maxBodyBytes) {
    return { error: NextResponse.json({ error: "Request too large." }, { status: 413 }) };
  }

  try {
    return { body: JSON.parse(raw) as unknown };
  } catch {
    return { error: NextResponse.json({ error: "Invalid JSON." }, { status: 400 }) };
  }
}

/** Strip control characters (incl. CR/LF) from single-line fields like names/subjects. */
export function singleLine(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, max);
}

/** Strip control characters except newlines/tabs from multi-line text. */
export function multiLine(value: unknown) {
  if (typeof value !== "string") return "";
  return value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").trim();
}
