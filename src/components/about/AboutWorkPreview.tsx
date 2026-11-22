import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { AboutSectionHeading } from "@/components/about/AboutSectionHeading";
import { ProjectCard } from "@/components/work/ProjectCard";
import { getProjects } from "@/data/projects";

const previewProjects = getProjects().slice(0, 3);

export function AboutWorkPreview() {
  if (previewProjects.length === 0) return null;

  return (
    <section className="bg-white py-24 sm:py-28 lg:py-32">
      <div className="container-site">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <AboutSectionHeading
            eyebrow="Our Work"
            title={
              <>
                A Few Things We&apos;ve{" "}
                <span className="text-[#1d81f2]">Helped Ship.</span>
              </>
            }
            className="max-w-xl"
          />

          <Link
            href="/work"
            className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-ink-700 transition-colors hover:text-[#1d81f2]"
          >
            View All Projects
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-10 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {previewProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
