import type { MetadataRoute } from "next";

import { getApprovedCaseStudyProjects } from "@/data/projects";
import { getServicePageSlugs } from "@/lib/services/service-pages-data";
import { siteConfig } from "@/lib/site-config";

/**
 * Last real content change per page. Update the date when a page's content changes —
 * do not use the build time, or every deploy would claim every page changed.
 */
const SITE_UPDATED = new Date("2026-11-22");
const LEGAL_UPDATED = new Date("2026-11-17");

type Entry = MetadataRoute.Sitemap[number];

function page(
  path: string,
  priority: number,
  changeFrequency: Entry["changeFrequency"],
  lastModified: Date = SITE_UPDATED,
): Entry {
  return {
    // Same canonical form as <link rel="canonical">: https, no www, no trailing slash.
    url: path === "/" ? siteConfig.url : `${siteConfig.url}${path}`,
    lastModified,
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    page("/", 1, "weekly"),
    page("/founders", 0.9, "monthly"),
    page("/ai-features", 0.9, "monthly"),
    // PRICING (paused): page("/pricing", 0.9, "monthly"),
    page("/work", 0.85, "monthly"),
    page("/about", 0.8, "monthly"),
    page("/industries/on-demand", 0.8, "monthly"),
    page("/technologies", 0.75, "monthly"),
    page("/approach", 0.7, "monthly"),
    page("/contact", 0.7, "yearly"),
    page("/privacy", 0.2, "yearly", LEGAL_UPDATED),
    page("/terms", 0.2, "yearly", LEGAL_UPDATED),
    ...getServicePageSlugs().map((slug) => page(`/services/${slug}`, 0.9, "monthly")),
    ...getApprovedCaseStudyProjects().map((p) => page(`/work/${p.slug}`, 0.7, "monthly")),
  ];
}
