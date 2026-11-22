import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProjectMedia } from "@/components/work/ProjectCard";
import {
  displayDomain,
  getCaseStudyProjects,
  getProjectBySlug,
  isCaseStudyPublished,
  isTodo,
} from "@/data/projects";
import { jsonLdScript } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/seo";
import { calendlyHref, siteConfig } from "@/lib/site-config";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return getCaseStudyProjects().map((p) => ({ slug: p.slug }));
}

function getPublishedProject(slug: string) {
  const project = getProjectBySlug(slug);
  if (!project || !project.caseStudy || !isCaseStudyPublished(project)) return null;
  return { ...project, caseStudy: project.caseStudy };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getPublishedProject(slug);
  if (!project) return { title: "Project" };

  return pageMetadata({
    title: project.name,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const project = getPublishedProject(slug);
  if (!project) notFound();

  const pageUrl = `${siteConfig.url}/work/${project.slug}`;
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Work", item: `${siteConfig.url}/work` },
      { "@type": "ListItem", position: 3, name: project.name, item: pageUrl },
    ],
  };

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumb) }}
      />
      <section className="bg-[#F4F7FC] pt-40 pb-12 sm:pt-44 lg:pt-48">
        <div className="container-site max-w-3xl">
          <Link
            href="/work"
            className="text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            ← All work
          </Link>
          <p className="mt-6 font-mono text-xs tracking-[0.14em] text-brand-600 uppercase">
            {project.label}
          </p>
          <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-ink-700 sm:text-4xl">
            {project.name}
          </h1>
          <p className="mt-4 text-base leading-7 text-ink-500 sm:text-lg">
            {project.summary}
          </p>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white py-1.5 pr-3 pl-1.5 text-sm font-semibold text-brand-600 shadow-[0_4px_14px_rgb(29_129_242/0.08)] transition-colors hover:border-brand-400 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <span className="inline-flex size-6 items-center justify-center rounded-full bg-brand-50">
                <Globe className="size-3.5" aria-hidden />
              </span>
              {displayDomain(project.liveUrl)}
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
              <span className="sr-only">(opens the live site in a new tab)</span>
            </a>
          ) : null}
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="container-site max-w-4xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-ink-100">
            <ProjectMedia
              project={project}
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
          </div>

          <div className="mx-auto mt-12 max-w-3xl space-y-10">
            {project.caseStudy.map((section) => (
              <section key={section.heading}>
                <h2 className="font-heading text-2xl font-semibold text-ink-700">
                  {section.heading}
                </h2>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-ink-500 marker:text-brand-500">
                  {section.bullets.map((bullet) =>
                    isTodo(bullet) ? (
                      // Draft-only: production never builds a page that has a TODO.
                      <li
                        key={bullet}
                        className="list-none rounded-md border border-dashed border-amber-300 bg-amber-50/60 px-3 py-2 text-sm text-amber-800 marker:content-none"
                      >
                        {bullet}
                      </li>
                    ) : (
                      <li key={bullet}>{bullet}</li>
                    ),
                  )}
                </ul>
              </section>
            ))}
          </div>

          <div className="mx-auto mt-14 flex max-w-3xl flex-wrap gap-4 border-t border-ink-100 pt-10">
            <Button href="/contact" size="lg">
              Get a free one-page scope
            </Button>
            <Button
              href={calendlyHref(`/work/${project.slug}`)}
              size="lg"
              variant="outline"
              arrow={false}
            >
              {siteConfig.cta.label}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
