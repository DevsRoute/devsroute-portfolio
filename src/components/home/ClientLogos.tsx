import Image from "next/image";

import { getProjects } from "@/data/projects";

/**
 * Logo strip under the hero. Logos come from each company's own site and are shown
 * in one neutral tone (CSS silhouette) so mixed brand colours — including white
 * logos — sit evenly on the page. Each logo keeps its own height for visual balance.
 */
export function ClientLogos() {
  const clients = getProjects().filter((p) => p.logo);
  if (clients.length === 0) return null;

  return (
    <section
      aria-labelledby="client-logos-heading"
      className="border-y border-ink-100 bg-white py-10 sm:py-12"
    >
      <div className="container-site">
        <h2
          id="client-logos-heading"
          className="text-center text-xs font-semibold tracking-[0.16em] text-ink-400 uppercase sm:text-[0.7rem]"
        >
          Companies we&apos;ve worked with
        </h2>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 sm:gap-x-14 lg:flex-nowrap lg:justify-between lg:gap-x-6">
          {clients.map(({ slug, name, logo }) => {
            if (!logo) return null;
            const width = Math.round((logo.width / logo.height) * logo.displayHeight);
            return (
              <li key={slug} className="flex items-center justify-center">
                <Image
                  src={logo.src}
                  alt={`${name} logo`}
                  width={width}
                  height={logo.displayHeight}
                  sizes={`${width}px`}
                  className="h-auto max-w-full opacity-55 brightness-0 transition-opacity duration-300 hover:opacity-90"
                  style={{ height: logo.displayHeight, width: "auto" }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
