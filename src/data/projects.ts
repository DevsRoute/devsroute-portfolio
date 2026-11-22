/**
 * Real project portfolio — the only source for /work, the home page, /about,
 * the sitemap, llms.txt and the chat assistant.
 *
 * Rules:
 * - Use only facts confirmed by the team. No invented metrics, timelines or results.
 * - For partial projects, describe ONLY our part. Never "we built X".
 * - No project-specific tech stack.
 * - Screenshots: real screenshots only, in /public/work/<slug>/ as WebP (< ~300 KB).
 *   Until one exists, leave `screenshot` undefined and a neutral placeholder is shown.
 *
 * Project pages (/work/<slug>): a heading plus short bullet sections. Facts only.
 */

export type ProjectKind = "full" | "partial";

export type ProjectScreenshot = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

/** A project page: sections of short bullets. Facts only — no placeholders. */
export type CaseStudy = {
  heading: string;
  bullets: string[];
}[];

/** Client logo from the company's own site, as a transparent WebP in /public/clients/. */
export type ProjectLogo = {
  src: string;
  width: number;
  height: number;
  /** Display height in px, tuned so every logo has a similar visual weight. */
  displayHeight: number;
};

export type Project = {
  slug: string;
  name: string;
  kind: ProjectKind;
  /** "Full build" or "Our part: …" */
  label: string;
  /** One line for cards and meta descriptions */
  summary: string;
  liveUrl?: string;
  screenshot?: ProjectScreenshot;
  logo?: ProjectLogo;
  caseStudy?: CaseStudy;
  order: number;
};

export const projects: Project[] = [
  {
    slug: "permis-connect",
    name: "Permis Connect",
    kind: "full",
    label: "Full build",
    summary:
      "A French marketplace for buying and selling building permits, built from scratch in about six weeks.",
    liveUrl: "https://permis-connect.fr",
    caseStudy: [
      {
        heading: "About the project",
        bullets: [
          "A French marketplace for buying and selling building permits.",
          "Live at permis-connect.fr.",
        ],
      },
      {
        heading: "What we did",
        bullets: [
          "Built the platform from scratch, end to end.",
          "Design (UI/UX).",
          "Front end.",
          "Back end.",
          "First version delivered in about six weeks.",
        ],
      },
    ],
    screenshot: {
      src: "/work/permis-connect/home.webp",
      width: 1600,
      height: 884,
      alt: "Permis Connect marketplace home page",
    },
    logo: { src: "/clients/permis-connect.webp", width: 334, height: 120, displayHeight: 40 },
    order: 1,
  },
  {
    slug: "edge-home-builders",
    name: "Edge Home Builders",
    kind: "full",
    label: "Full build",
    summary: "The full website build for a custom home builder in Missouri, USA.",
    liveUrl: "https://edgehomebuilders.com",
    screenshot: {
      src: "/work/edge-home-builders/home.webp",
      width: 1600,
      height: 821,
      alt: "Edge Home Builders website home page",
    },
    logo: { src: "/clients/edge-home-builders.webp", width: 181, height: 120, displayHeight: 50 },
    order: 6,
  },
  {
    slug: "tutor-edge",
    name: "Tutor-Edge",
    kind: "full",
    label: "Full build",
    summary: "A French peer-tutoring marketplace, built end to end.",
    liveUrl: "https://tutor-edge.com",
    screenshot: {
      src: "/work/tutor-edge/home.webp",
      width: 1600,
      height: 890,
      alt: "Tutor-Edge peer-tutoring marketplace home page",
    },
    logo: { src: "/clients/tutor-edge.webp", width: 330, height: 60, displayHeight: 28 },
    order: 7,
  },
  {
    slug: "aicro",
    name: "AICRO",
    kind: "partial",
    label: "Our part: Stripe payments, pricing and invoicing",
    summary:
      "We built the Stripe payment gateway, pricing and invoicing inside AICRO's AI sales platform.",
    liveUrl: "https://aicro.co",
    screenshot: {
      src: "/work/aicro/home.webp",
      width: 1600,
      height: 887,
      alt: "AICRO website home page",
    },
    logo: { src: "/clients/aicro.webp", width: 258, height: 59, displayHeight: 28 },
    order: 4,
  },
  {
    slug: "success-ai",
    name: "Success.ai",
    kind: "partial",
    label: "Our part: back-end AI (RAG, LLMs, AI pipelines)",
    summary:
      "Back-end AI work for Success.ai: retrieval-augmented generation (RAG), LLM features and AI pipelines.",
    caseStudy: [
      {
        heading: "About the project",
        bullets: ["Success.ai is an AI sales platform."],
      },
      {
        heading: "Our part",
        bullets: [
          "Back-end AI work. This page covers only our part of the product.",
          "Retrieval-augmented generation (RAG).",
          "LLM-powered features.",
          "AI pipelines behind those features.",
        ],
      },
    ],
    screenshot: {
      src: "/work/success-ai/home.webp",
      width: 1600,
      height: 890,
      alt: "Success.ai home page",
    },
    logo: { src: "/clients/success-ai.webp", width: 169, height: 37, displayHeight: 30 },
    order: 2,
  },
  {
    slug: "post-oak-group",
    name: "Post Oak Group",
    kind: "partial",
    label: "Our part: front end and UI/UX design",
    summary: "Front-end development and UI/UX design for Post Oak Group.",
    liveUrl: "https://postoakgroup.co",
    screenshot: {
      src: "/work/post-oak-group/home.webp",
      width: 1600,
      height: 888,
      alt: "Post Oak Group website home page",
    },
    logo: { src: "/clients/post-oak-group-dark.webp", width: 424, height: 96, displayHeight: 34 },
    order: 5,
  },
  {
    slug: "prisma-group",
    name: "Prisma Group",
    kind: "partial",
    label: "Our part: back-end development",
    summary: "Back-end development for Prisma Group.",
    liveUrl: "https://prisma-group.ch",
    screenshot: {
      src: "/work/prisma-group/home.webp",
      width: 1600,
      height: 894,
      alt: "Prisma Group website home page",
    },
    logo: { src: "/clients/prisma-group.webp", width: 377, height: 102, displayHeight: 34 },
    order: 3,
  },
];

/** Projects with a page at /work/<slug>. */
export function isCaseStudyPublished(project: Project): boolean {
  return Boolean(project.caseStudy && project.caseStudy.length > 0);
}

export function getProjects() {
  return [...projects].sort((a, b) => a.order - b.order);
}

export function getProjectBySlug(slug: string) {
  return getProjects().find((p) => p.slug === slug);
}

/** Projects with a published case study page at /work/<slug>. */
export function getCaseStudyProjects() {
  return getProjects().filter(isCaseStudyPublished);
}

/** Where a project card links: the case study if published, else the live site. */
export function getProjectHref(project: Project):
  | { href: string; external: boolean }
  | null {
  if (isCaseStudyPublished(project)) {
    return { href: `/work/${project.slug}`, external: false };
  }
  if (project.liveUrl) return { href: project.liveUrl, external: true };
  return null;
}

/** "permis-connect.fr" from "https://permis-connect.fr" */
export function displayDomain(url: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/** Slugs of the old portfolio pages that were removed — permanently redirected to /work. */
export const removedProjectSlugs = [
  "ai-compliance-training",
  "conversational-ai-messaging",
  "identity-verification-kyc",
  "social-recipe-app",
  "community-social-network",
  "learning-platform",
  "travel-website",
  "directory-website",
  "small-business-website",
] as const;
