import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { TechIcon } from "@/components/technologies/TechIcon";
import {
  findTechnology,
  marqueeRows,
  technologyCount,
} from "@/lib/technologies-data";

function MarqueeWord({ name }: { name: string }) {
  const tech = findTechnology(name);

  return (
    <li className="group/word flex shrink-0 items-center pr-8 sm:pr-12 lg:pr-16">
      {tech ? (
        <TechIcon
          tech={tech}
          className="size-0 opacity-0 grayscale transition-all duration-300 group-hover/word:mr-2.5 group-hover/word:size-7 sm:group-hover/word:mr-3 group-hover/word:opacity-100 group-hover/word:grayscale-0 sm:group-hover/word:size-9 lg:group-hover/word:size-10"
        />
      ) : null}
      <span className="font-heading text-[2rem] leading-none font-semibold tracking-tight whitespace-nowrap text-ink-200 transition-colors duration-300 group-hover/word:text-ink-700 sm:text-5xl lg:text-[3.25rem]">
        {name}
      </span>
    </li>
  );
}

function MarqueeRow({
  words,
  reverse = false,
}: {
  words: string[];
  reverse?: boolean;
}) {
  return (
    <div className="flex overflow-hidden py-2 sm:py-3">
      <div
        className="tech-marquee-track flex"
        data-direction={reverse ? "reverse" : undefined}
      >
        <ul className="flex">
          {words.map((word) => (
            <MarqueeWord key={word} name={word} />
          ))}
        </ul>
        {/* Duplicate set for a seamless loop — hidden from assistive tech. */}
        <ul className="flex" aria-hidden>
          {words.map((word) => (
            <MarqueeWord key={word} name={word} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export function TechMarquee() {
  return (
    <section
      id="technologies"
      aria-labelledby="tech-marquee-heading"
      className="relative overflow-hidden bg-[#F5F7FA] py-20 sm:py-24 lg:py-28"
    >
      <div className="container-site text-center">
        <p className="font-mono text-xs tracking-[0.14em] text-brand-500 uppercase sm:text-[0.8rem]">
          Technologies
        </p>
        <h2
          id="tech-marquee-heading"
          className="mx-auto mt-4 max-w-4xl font-heading text-3xl font-semibold tracking-tight text-ink-700 sm:text-4xl lg:text-[3.25rem] lg:leading-[1.1]"
        >
          Yes, we cover the tech stack and AI coding tools you rely on
          <span className="text-brand-500">.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-ink-500 sm:text-lg sm:leading-8">
          Our team has expertise in {Math.floor(technologyCount / 10) * 10}+
          technologies and programming languages, including the AI coding
          tools rewriting how software gets built.
        </p>
      </div>

      <div className="tech-marquee mt-12 flex flex-col [mask-image:linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)] sm:mt-14">
        <MarqueeRow words={marqueeRows[0]} />
        <MarqueeRow words={marqueeRows[1]} reverse />
      </div>

      <div className="mt-12 flex justify-center sm:mt-14">
        <Link
          href="/technologies"
          className="group relative inline-flex items-center gap-3 pr-10 pb-3 text-base font-semibold text-ink-700 transition-colors hover:text-brand-600 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-4 focus-visible:ring-offset-[#F5F7FA]"
        >
          Our full repertoire
          <ArrowRight
            aria-hidden
            className="size-5 transition-transform duration-300 group-hover:translate-x-1"
          />
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 h-0.5 bg-ink-700"
          />
          <span
            aria-hidden
            className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-500 transition-all duration-500 group-hover:w-full group-focus-visible:w-full"
          />
        </Link>
      </div>
    </section>
  );
}
