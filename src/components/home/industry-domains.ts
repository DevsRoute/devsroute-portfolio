/**
 * Industry domains for the homepage carousel.
 */

export type IndustryDomain = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  /** Real project screenshot: shown as a framed browser preview instead of a full-bleed photo. */
  frame?: boolean;
  enabled: boolean;
};

/** Only industries with real project work behind them. */
const allIndustryDomains: IndustryDomain[] = [
  {
    id: "real-estate",
    title: "Real Estate & Construction",
    description:
      "Marketplaces and websites for real estate, building permits and home building.",
    href: "/work",
    image: "/work/edge-home-builders/home.webp",
    frame: true,
    imageAlt: "Edge Home Builders website home page",
    enabled: true,
  },
  {
    id: "education",
    title: "Education",
    description: "Peer-tutoring and education marketplaces.",
    href: "/work",
    image: "/work/tutor-edge/home.webp",
    frame: true,
    imageAlt: "Tutor-Edge peer-tutoring marketplace home page",
    enabled: true,
  },
  {
    id: "sales-ai",
    title: "Sales & AI Platforms",
    description:
      "Payments, back-end development and AI features (RAG, LLMs) for sales platforms.",
    href: "/services/ai-solutions",
    image: "/work/success-ai/home.webp",
    frame: true,
    imageAlt: "Success.ai home page",
    enabled: true,
  },
  {
    id: "healthcare",
    title: "Healthcare",
    description: "Software for healthcare products.",
    href: "/services/custom-software-development",
    image: "/brand/industries/healthtech-care.jpg",
    imageAlt: "Healthcare app shown across laptop, phone, and smartwatch",
    enabled: true,
  },
];

export const industryDomains = allIndustryDomains.filter((d) => d.enabled);
