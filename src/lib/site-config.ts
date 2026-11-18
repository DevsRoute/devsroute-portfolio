import { siteFacts } from "@/config/site-facts";

export const services = [
  {
    label: "AI Solutions",
    description: "Chatbots, automation, and OpenAI features for SaaS teams.",
    href: "/services/ai-solutions",
    icon: "sparkles",
  },
  {
    label: "Custom Software",
    description: "Scoped MVPs and products built with senior developers.",
    href: "/services/custom-software-development",
    icon: "code",
  },
  {
    label: "Web Applications",
    description: "Fast, scalable web apps for growing products.",
    href: "/services/web-application-development",
    icon: "globe",
  },
  {
    label: "Mobile Apps",
    description: "iOS and Android apps your users will keep.",
    href: "/services/mobile-app-development",
    icon: "smartphone",
  },
  {
    label: "UI / UX Design",
    description: "Interfaces that are clear, usable, and on-brand.",
    href: "/services/ui-ux-design",
    icon: "layers",
  },
  {
    label: "Cloud & DevOps",
    description: "Infrastructure, CI/CD, and reliable releases.",
    href: "/services/cloud-devops",
    icon: "cloud",
  },
] as const;

export type ServiceIcon = (typeof services)[number]["icon"];

/** Canonical CTA — use everywhere instead of hardcoding */
export const cta = {
  label: siteFacts.calendly.label,
  href: siteFacts.calendly.href,
} as const;

/**
 * Canonical origin for every canonical tag, sitemap entry, robots.txt line and JSON-LD URL.
 * It MUST be the host that answers 200 in production — not one that redirects.
 * If Vercel's primary domain is changed (apex vs www), change NEXT_PUBLIC_SITE_URL to match.
 */
function canonicalOrigin(raw: string | undefined): string {
  const fallback = "https://devsroute.com";
  try {
    const url = new URL(raw?.trim() || fallback);
    return `https://${url.host}`;
  } catch {
    return fallback;
  }
}

export const siteConfig = {
  name: siteFacts.companyName,
  title: "DevsRoute | SaaS MVP & AI Product Development Studio",
  description:
    "DevsRoute is a software studio building SaaS MVPs and AI products for startups and B2B founders. Clear scope, a defined end date, and direct access to the developers.",
  url: canonicalOrigin(process.env.NEXT_PUBLIC_SITE_URL),
  email: siteFacts.email,
  address: siteFacts.address,
  calendly: {
    href: cta.href,
    label: cta.label,
  },
  colors: {
    blue: "#1d81f2",
    black: "#454648",
  },
  nav: [
    { label: "Services", href: "/#services" },
    { label: "Work", href: "/work" },
    { label: "Approach", href: "/approach" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  cta,
} as const;

/**
 * Append UTM params for Calendly tracking without breaking the base URL.
 */
export function calendlyHref(pagePath = "/") {
  try {
    const url = new URL(cta.href);
    url.searchParams.set("utm_source", "website");
    url.searchParams.set("utm_content", pagePath.replace(/^\//, "") || "home");
    return url.toString();
  } catch {
    return cta.href;
  }
}
