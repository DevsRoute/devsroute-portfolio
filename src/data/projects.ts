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
 * Case studies: any paragraph starting with "TODO:" blocks the page from being
 * published. In production, a case study page only exists once every TODO is filled.
 * In `next dev` the page renders with the TODOs highlighted, for review.
 */

export type ProjectKind = "full" | "partial";

export type ProjectScreenshot = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type CaseStudy = {
  client: string[];
  problem: string[];
  whatWeDid: string[];
  outcome: string[];
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
  caseStudy?: CaseStudy;
  order: number;
};

export const TODO_PREFIX = "TODO:";

export const projects: Project[] = [
  {
    slug: "permis-connect",
    name: "Permis Connect",
    kind: "full",
    label: "Full build",
    summary:
      "A French marketplace for buying and selling building permits, built from scratch in about six weeks.",
    liveUrl: "https://permis-connect.fr",
    // screenshot: { src: "/work/permis-connect/home.webp", width: 1600, height: 1000, alt: "Permis Connect marketplace home page" },
    caseStudy: {
      client: [
        "Permis Connect is a French marketplace where people buy and sell building permits.",
      ],
      problem: [
        "TODO: ask Saboor — what problem did Permis Connect need solved, ideally in the client's own words?",
      ],
      whatWeDid: [
        "We built Permis Connect from scratch, end to end: the design, the front end and the back end.",
        "The first version took about six weeks.",
      ],
      outcome: [
        "The marketplace is live at permis-connect.fr.",
        "TODO: ask Saboor — any results we are allowed to share (for example usage, listings or client feedback)?",
      ],
    },
    order: 1,
  },
  {
    slug: "edge-home-builders",
    name: "Edge Home Builders",
    kind: "full",
    label: "Full build",
    summary: "The full website build for a custom home builder in Missouri, USA.",
    liveUrl: "https://edgehomebuilders.com",
    order: 2,
  },
  {
    slug: "tutor-edge",
    name: "Tutor-Edge",
    kind: "full",
    label: "Full build",
    summary: "A French peer-tutoring marketplace, built end to end.",
    liveUrl: "https://tutor-edge.com",
    order: 3,
  },
  {
    slug: "aicro",
    name: "AICRO",
    kind: "partial",
    label: "Our part: Stripe payments, pricing and invoicing",
    summary:
      "We built the Stripe payment gateway, pricing and invoicing inside AICRO's AI sales platform.",
    liveUrl: "https://aicro.co",
    order: 4,
  },
  {
    slug: "success-ai",
    name: "Success.ai",
    kind: "partial",
    label: "Our part: back-end AI (RAG, LLMs, AI pipelines)",
    summary:
      "Back-end AI work for Success.ai: retrieval-augmented generation (RAG), LLM features and AI pipelines.",
    caseStudy: {
      client: [
        "TODO: ask Saboor — how should we describe Success.ai and its product in one or two sentences?",
      ],
      problem: [
        "TODO: ask Saboor — what did Success.ai need from the back-end AI work, ideally in their own words?",
      ],
      whatWeDid: [
        "Our part was back-end AI work. This page covers only that part of the product.",
        "We worked on retrieval-augmented generation (RAG), LLM-powered features and the AI pipelines behind them.",
        "TODO: ask Saboor — which RAG, LLM and pipeline pieces can we describe in more detail?",
      ],
      outcome: [
        "TODO: ask Saboor — any results we are allowed to share?",
      ],
    },
    order: 5,
  },
  {
    slug: "post-oak-group",
    name: "Post Oak Group",
    kind: "partial",
    label: "Our part: front end and UI/UX design",
    summary: "Front-end development and UI/UX design for Post Oak Group.",
    liveUrl: "https://postoakgroup.co",
    order: 6,
  },
  {
    slug: "prisma-group",
    name: "Prisma Group",
    kind: "partial",
    label: "Our part: back-end development",
    summary: "Back-end development for Prisma Group.",
    liveUrl: "https://prisma-group.ch",
    order: 7,
  },
];

export function isTodo(text: string) {
  return text.trim().startsWith(TODO_PREFIX);
}

/** True when every section of the case study has real text and no TODO. */
export function isCaseStudyReady(caseStudy: CaseStudy | undefined): boolean {
  if (!caseStudy) return false;
  return Object.values(caseStudy).every(
    (paragraphs: string[]) =>
      paragraphs.length > 0 && paragraphs.every((p) => p.trim() && !isTodo(p)),
  );
}

/** Case study pages are always previewable in dev; in production only when ready. */
export function isCaseStudyPublished(project: Project): boolean {
  if (!project.caseStudy) return false;
  if (process.env.NODE_ENV !== "production") return true;
  return isCaseStudyReady(project.caseStudy);
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
