import type { NextConfig } from "next";

import { removedProjectSlugs } from "./src/data/projects";

const isDev = process.env.NODE_ENV !== "production";

/**
 * Content-Security-Policy — allow-list only the origins this site actually uses:
 *  - plausible.io / Google Tag Manager + GA (optional analytics, see Analytics.tsx)
 *  - cdn.simpleicons.org + cdn.jsdelivr.net/gh/devicons (tech-stack logos)
 * Fonts are self-hosted by next/font, so no external font origins are needed.
 * 'unsafe-inline' for scripts is required by Next.js inline hydration scripts on
 * statically rendered pages (a nonce-based CSP would force every page dynamic).
 * 'unsafe-eval' is only added in development (React Refresh needs it).
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://plausible.io https://www.googletagmanager.com`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.simpleicons.org https://cdn.jsdelivr.net https://www.googletagmanager.com https://*.google-analytics.com",
  "font-src 'self' data:",
  "connect-src 'self' https://plausible.io https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Only local images are optimised; no remote hosts are allowed.
    remotePatterns: [],
    dangerouslyAllowSVG: false,
  },
  /** Old portfolio pages that were not our work: permanently (308) redirect to /work. */
  async redirects() {
    return removedProjectSlugs.map((slug) => ({
      source: `/work/${slug}`,
      destination: "/work",
      permanent: true,
    }));
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/api/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default nextConfig;
