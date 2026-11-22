/**
 * Industry domains for the homepage carousel.
 *
 * Photography: Unsplash (free under the Unsplash License, no attribution required).
 *  real-estate-construction.webp — Troy Mortier     unsplash.com/photos/dUYELbt-H-E
 *  education-peer-tutoring.webp  — Chidera Okeke    unsplash.com/photos/2FDdgn0-W_o
 *  sales-ai-platforms.webp       — Vitaly Gariev    unsplash.com/photos/UikYLDQj9_I
 */

export type IndustryDomain = {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
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
    image: "/brand/industries/real-estate-construction.webp",
    imageAlt: "Timber frame of a new house under construction",
    enabled: true,
  },
  {
    id: "education",
    title: "Education",
    description: "Peer-tutoring and education marketplaces.",
    href: "/work",
    image: "/brand/industries/education-peer-tutoring.webp",
    imageAlt: "Two students studying together at a laptop",
    enabled: true,
  },
  {
    id: "sales-ai",
    title: "Sales & AI Platforms",
    description:
      "Payments, back-end development and AI features (RAG, LLMs) for sales platforms.",
    href: "/services/ai-solutions",
    image: "/brand/industries/sales-ai-platforms.webp",
    imageAlt: "Team reviewing a dashboard together on a laptop",
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
