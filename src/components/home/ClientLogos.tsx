import Image from "next/image";

import { getProjects, type Project } from "@/data/projects";

/** How many times the list repeats inside each half of the track, so one half is always wider than the screen. */
const REPEAT = 2;

function LogoItem({ project, copy }: { project: Project; copy: number }) {
  const hidden = copy > 0;
  const { logo, name } = project;
  if (!logo) return null;
  const width = Math.round((logo.width / logo.height) * logo.displayHeight);
  return (
    <li
      data-copy={copy}
      className="flex shrink-0 items-center px-8 sm:px-11"
      aria-hidden={hidden || undefined}
    >
      <Image
        src={logo.src}
        alt={hidden ? "" : `${name} logo`}
        width={width}
        height={logo.displayHeight}
        sizes={`${width}px`}
        className="max-w-none transition-transform duration-300 hover:scale-105"
        style={{ height: logo.displayHeight, width: "auto" }}
      />
    </li>
  );
}

/**
 * Full-colour client logos in an endless marquee under the hero.
 * The track holds two identical halves and slides by -50%, so the loop is seamless.
 * Only the first copy is exposed to screen readers. Pauses on hover; with reduced
 * motion it becomes a static, centred, wrapping row.
 */
export function ClientLogos() {
  const clients = getProjects().filter((p) => p.logo);
  if (clients.length === 0) return null;

  const copies = Array.from({ length: REPEAT * 2 }, (_, i) => i);

  return (
    <section
      aria-labelledby="client-logos-heading"
      className="border-y border-ink-100 bg-white py-10 sm:py-12"
    >
      <h2
        id="client-logos-heading"
        className="container-site text-center text-xs font-semibold tracking-[0.16em] text-ink-400 uppercase sm:text-[0.7rem]"
      >
        Companies we&apos;ve worked with
      </h2>

      <div className="client-marquee mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="client-marquee-track flex items-center">
          {copies.map((copy) =>
            clients.map((project) => (
              <LogoItem
                key={`${copy}-${project.slug}`}
                project={project}
                copy={copy}
              />
            )),
          )}
        </ul>
      </div>
    </section>
  );
}
