/**
 * Public pricing — single source for /pricing, the home pricing block,
 * llms.txt and the chat assistant. Never suggest a full MVP fits the Starter tier.
 */

export const pricingHeadline =
  "Projects start from $1,000. First versions typically from $5,000.";

export const pricingTiers = [
  {
    id: "starter",
    name: "Starter project",
    price: "$1,000–$3,000",
    timeline: "1–4 weeks",
    forWhat: "A focused feature, fix, integration or internal tool.",
    note: "Not a full product. First versions start from $5,000.",
  },
  {
    id: "mvp",
    name: "First version (MVP)",
    price: "$5,000–$15,000",
    timeline: "4–8 weeks",
    forWhat: "A first working version of a new product.",
    note: null,
  },
  {
    id: "larger",
    name: "Larger builds and AI products",
    price: "$15,000–$50,000+",
    timeline: "Scoped per project",
    forWhat: "Bigger platforms, AI products and ongoing work.",
    note: null,
  },
] as const;

export const paymentTerms = [
  "Projects under $5,000: 50% upfront and 50% on delivery.",
  "Larger projects: milestone payments.",
] as const;

export const pricingCtas = {
  primary: { label: "Get a free one-page scope", href: "/contact" },
  secondary: {
    label: "Book a 20-min call",
    href: "https://calendly.com/devsroute/technical-read",
  },
} as const;
