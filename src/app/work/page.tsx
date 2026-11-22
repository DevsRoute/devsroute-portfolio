import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/work/ProjectCard";
import { getProjects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";
import { calendlyHref, siteConfig } from "@/lib/site-config";

const workDescription =
  "Projects DevsRoute has worked on: full builds such as Permis Connect, Edge Home Builders and Tutor-Edge, and partial work for AICRO, Success.ai, Post Oak Group and Prisma Group.";

export const metadata: Metadata = pageMetadata({
  title: "Our Work",
  description: workDescription,
  path: "/work",
});

export default function WorkPage() {
  const projects = getProjects();
  const fullBuilds = projects.filter((p) => p.kind === "full");
  const partial = projects.filter((p) => p.kind === "partial");

  return (
    <main className="flex-1">
      <section className="bg-[#F4F7FC] pt-40 pb-12 sm:pt-44 sm:pb-14 lg:pt-48 lg:pb-16">
        <div className="container-site max-w-3xl">
          <p className="font-mono text-xs tracking-[0.14em] text-brand-600 uppercase">
            Our work
          </p>
          <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-ink-700 sm:text-4xl lg:text-[2.75rem]">
            Products we&apos;ve built{" "}
            <span className="text-brand-500">and parts we&apos;ve delivered.</span>
          </h1>
          <p className="mt-5 text-base leading-7 text-ink-500 sm:text-lg sm:leading-8">
            Some of these we built end to end: design, front end and back end.
            On others we delivered one part of a larger product, and we only
            describe that part.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-site">
          <div className="mb-8 max-w-2xl sm:mb-10">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-ink-700 sm:text-3xl">
              Full builds
            </h2>
            <p className="mt-2 text-sm leading-7 text-ink-500 sm:text-base">
              End to end: design, front end and back end.
            </p>
          </div>
          <ul className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fullBuilds.map((project) => (
              <li key={project.slug} className="h-full">
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>

          <div className="mt-16 mb-8 max-w-2xl sm:mt-20 sm:mb-10">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-ink-700 sm:text-3xl">
              Partial work
            </h2>
            <p className="mt-2 text-sm leading-7 text-ink-500 sm:text-base">
              One part of a larger product. Each card says which part was ours.
            </p>
          </div>
          <ul className="grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {partial.map((project) => (
              <li key={project.slug} className="h-full">
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>

          <div className="mt-14 flex flex-col gap-4 border-t border-ink-100 pt-10 sm:flex-row sm:flex-wrap sm:items-center">
            <p className="w-full text-sm text-ink-500 sm:mb-1 sm:w-full">
              Building something similar? Tell us what you need and we&apos;ll
              map a clear next step.
            </p>
            <Button href="/contact" size="lg">
              Get a free one-page scope
            </Button>
            <Button
              href={calendlyHref("/work")}
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
