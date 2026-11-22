import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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

/** Only case studies with every TODO filled are built in production. */
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
    title: `${project.name} case study`,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="mt-3 space-y-4">
      {items.map((text) =>
        isTodo(text) ? (
          // Only reachable in `next dev`: production never builds a page with TODOs.
          <p
            key={text}
            className="rounded-lg border border-dashed border-amber-400 bg-amber-50 px-4 py-3 font-mono text-sm text-amber-800"
          >
            {text}
          </p>
        ) : (
          <p key={text} className="text-base leading-8 text-ink-500">
            {text}
          </p>
        ),
      )}
    </div>
  );
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

  const sections = [
    { title: "The client", items: project.caseStudy.client },
    { title: "The problem", items: project.caseStudy.problem },
    {
      title: project.kind === "partial" ? "Our part" : "What we did",
      items: project.caseStudy.whatWeDid,
    },
    { title: "Outcome", items: project.caseStudy.outcome },
  ];

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
            Case study · {project.label}
          </p>
          <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-ink-700 sm:text-4xl">
            {project.name}
          </h1>
          <p className="mt-4 text-base leading-7 text-ink-500 sm:text-lg">
            {project.summary}
          </p>
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
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="font-heading text-2xl font-semibold text-ink-700">
                  {section.title}
                </h2>
                <Paragraphs items={section.items} />
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
            {project.liveUrl ? (
              <Button
                href={project.liveUrl}
                size="lg"
                variant="outline"
                arrow={false}
              >
                Visit {displayDomain(project.liveUrl)}
              </Button>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
