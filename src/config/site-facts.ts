/**
 * Single source of truth for claims, flags, and placeholders.
 * Replace any `TODO_CONFIRM` value with a real one before enabling the related UI.
 * Never render `TODO_CONFIRM` text on the page — helpers below gate sections.
 */

export const TODO_CONFIRM = "TODO_CONFIRM" as const;

export type TodoConfirm = typeof TODO_CONFIRM;

export function isConfirmed<T>(
  value: T | TodoConfirm | null | undefined,
): value is T {
  return value !== TODO_CONFIRM && value != null && value !== "";
}

export type Testimonial = {
  id: string;
  quote: string;
  /** Full name or "First L." */
  name: string;
  role: string;
  /** Company name or "Upwork client" */
  company: string;
  permission: boolean;
};

export const siteFacts = {
  companyName: "DevsRoute",
  email: "contact@devsroute.com",
  address: "",
  locationLabel: "Remote",

  /** Primary CTA — keep label + URL in sync site-wide via site-config */
  calendly: {
    label: "Book a 20-min call",
    href: "https://calendly.com/devsroute/technical-read",
  },

  /** Scope and end date are agreed on the first call. */
  mvpTimeline: "Scope",

  /** Safe claims — toggle individually */
  claims: {
    seniorDevelopersOnly: true,
    directDeveloperAccess: true,
    mvpTimeline: true,
  },

  /**
   * Numeric impact stats. Leave as TODO_CONFIRM until verified.
   * TrustProof renders only confirmed items; hides the section if < 3 confirmed.
   */
  stats: {
    onTimeDeliveryPercent: TODO_CONFIRM as number | TodoConfirm,
    productsShipped: TODO_CONFIRM as number | TodoConfirm,
    clientsServed: TODO_CONFIRM as number | TodoConfirm,
    yearsBuilding: TODO_CONFIRM as number | TodoConfirm,
  },

  /** Industry card visibility */
  industries: {
    showOnDemand: false,
    showHealthTech: false,
    showLogistics: false,
  },


  /**
   * Real testimonials with permission. Empty = hide ClientStories entirely.
   */
  testimonials: [] as Testimonial[],

  /** Set to a real Upwork profile URL to show the reviews button */
  upworkUrl: TODO_CONFIRM as string | TodoConfirm,

  /** US working-hours overlap — replace when confirmed */
  usTimeOverlap:
    TODO_CONFIRM as string | TodoConfirm /* e.g. "9am–1pm ET overlap, Mon–Fri" */,

  /** Do not claim these unless true */
  certifications: {
    hipaa: false,
    soc2: false,
    pci: false,
  },

  social: {
    linkedin: "https://www.linkedin.com/company/devsroute/",
    upwork: TODO_CONFIRM as string | TodoConfirm,
    clutch: TODO_CONFIRM as string | TodoConfirm,
  },
} as const;

export type SiteFacts = typeof siteFacts;

/** Confirmed testimonials with permission granted */
export function getPublishableTestimonials(): Testimonial[] {
  return siteFacts.testimonials.filter((t) => t.permission && t.quote && t.name);
}

/** Confirmed numeric stats for the impact section */
export function getConfirmedStats(): { id: string; value: string; label: string }[] {
  const items: { id: string; value: string; label: string }[] = [];
  const { stats } = siteFacts;

  if (isConfirmed(stats.onTimeDeliveryPercent)) {
    items.push({
      id: "on-time",
      value: `${stats.onTimeDeliveryPercent}%`,
      label: "on-time delivery",
    });
  }
  if (isConfirmed(stats.productsShipped)) {
    items.push({
      id: "products",
      value: `${stats.productsShipped}+`,
      label: "products shipped",
    });
  }
  if (isConfirmed(stats.clientsServed)) {
    items.push({
      id: "clients",
      value: `${stats.clientsServed}+`,
      label: "clients served",
    });
  }
  if (isConfirmed(stats.yearsBuilding)) {
    items.push({
      id: "years",
      value: `${stats.yearsBuilding}+`,
      label: "years building",
    });
  }

  return items;
}

/** Always-true soft claims for impact when numeric stats are incomplete */
export function getSafeImpactClaims(): { id: string; value: string; label: string }[] {
  const items: { id: string; value: string; label: string }[] = [];
  if (siteFacts.claims.mvpTimeline) {
    items.push({
      id: "mvp-timeline",
      value: siteFacts.mvpTimeline,
      label: "and a defined end date, agreed up front",
    });
  }
  if (siteFacts.claims.seniorDevelopersOnly) {
    items.push({
      id: "senior",
      value: "Senior",
      label: "developers only — no junior handoff",
    });
  }
  if (siteFacts.claims.directDeveloperAccess) {
    items.push({
      id: "direct",
      value: "Direct",
      label: "access to the people building your product",
    });
  }
  return items;
}

/** Organization JSON-LD `sameAs`. The company LinkedIn page is always included. */
export function getOrganizationSameAs(): string[] {
  return [
    "https://www.linkedin.com/company/devsroute/",
    siteFacts.social.upwork,
    siteFacts.social.clutch,
  ].filter(isConfirmed);
}
