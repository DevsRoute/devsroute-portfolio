import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import {
  displayDomain,
  getProjectHref,
  type Project,
} from "@/data/projects";
import { cn } from "@/lib/utils";

/** Neutral placeholder until a real screenshot is supplied. No stock photos or mockups. */
export function ProjectPlaceholder({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-2 bg-[linear-gradient(135deg,#eef3fb_0%,#dfe8f6_100%)] px-6 text-center",
        className,
      )}
    >
      <span className="font-heading text-2xl font-semibold tracking-tight text-ink-600 sm:text-3xl">
        {project.name}
      </span>
      {project.liveUrl ? (
        <span className="font-mono text-xs tracking-wide text-ink-400">
          {displayDomain(project.liveUrl)}
        </span>
      ) : null}
    </div>
  );
}

export function ProjectMedia({
  project,
  sizes,
  priority = false,
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
}) {
  if (!project.screenshot) return <ProjectPlaceholder project={project} />;
  const { src, width, height, alt } = project.screenshot;
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      className="h-full w-full object-cover object-top"
    />
  );
}

type ProjectCardProps = {
  project: Project;
  className?: string;
  headingLevel?: "h2" | "h3";
};

export function ProjectCard({
  project,
  className,
  headingLevel: Heading = "h3",
}: ProjectCardProps) {
  const link = getProjectHref(project);

  const body = (
    <>
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-ink-100">
        <ProjectMedia
          project={project}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
        <span
          className={cn(
            "w-fit rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide",
            project.kind === "full"
              ? "bg-brand-50 text-brand-700"
              : "bg-ink-50 text-ink-600",
          )}
        >
          {project.label}
        </span>
        <Heading className="font-heading text-xl font-semibold leading-7 tracking-tight text-ink-700">
          {project.name}
        </Heading>
        <p className="text-sm leading-6 text-ink-500">{project.summary}</p>
        {link ? (
          <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-semibold text-brand-600">
            {link.external
              ? `Visit ${displayDomain(link.href)}`
              : "Read the case study"}
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
        ) : null}
      </div>
    </>
  );

  const base = cn(
    "group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white",
    className,
  );

  if (!link) return <article className={base}>{body}</article>;

  const interactive = cn(
    base,
    "transition-shadow hover:shadow-[0_16px_40px_rgb(16_52_126/0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
  );

  return link.external ? (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={interactive}
    >
      {body}
    </a>
  ) : (
    <Link href={link.href} className={interactive}>
      {body}
    </Link>
  );
}
