"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Compass } from "lucide-react";

import {
  industryDomains,
  type IndustryDomain,
} from "@/components/home/industry-domains";
import { cn } from "@/lib/utils";

/** Abstract background for the "Your industry?" card — brand gradient, route lines and a neutral icon. */
function CtaGraphic() {
  return (
    <div aria-hidden className="absolute inset-0 bg-[linear-gradient(160deg,#10347e_0%,#0755e9_100%)]">
      <svg
        viewBox="0 0 320 480"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full text-white"
        fill="none"
      >
        <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="250" cy="380" r="70" opacity="0.18" />
          <circle cx="250" cy="380" r="120" opacity="0.12" />
          <circle cx="250" cy="380" r="175" opacity="0.08" />
          <path d="M-10 455 H70 V395 H150 V335 H230 V250" opacity="0.35" />
          <path d="M-10 430 H46 V370 H126 V310 H206 V250" opacity="0.2" strokeDasharray="3 7" />
        </g>
        <circle cx="230" cy="250" r="5" fill="#7FE7FF" />
      </svg>
      <span className="absolute right-6 bottom-6 flex size-16 items-center justify-center rounded-2xl bg-white/12 ring-1 ring-white/25 backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-1 sm:size-[4.5rem]">
        <Compass className="size-8 text-white sm:size-9" strokeWidth={1.5} />
      </span>
    </div>
  );
}

function IndustryCard({ domain }: { domain: IndustryDomain }) {
  return (
    <article className="group relative flex h-[28rem] w-[calc((100%-0.75rem)/1.3)] shrink-0 snap-start flex-col overflow-hidden rounded-[10px] sm:h-[30rem] sm:w-[calc((100%-1.5rem)/2.3)] lg:w-[calc((100%-2.25rem)/3.3)] xl:w-[calc((100%-3rem)/4.3)]">
      {domain.variant === "cta" || !domain.image ? (
        <CtaGraphic />
      ) : (
        <>
          <Image
            src={domain.image}
            alt={domain.imageAlt ?? ""}
            fill
            draggable={false}
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 25vw"
            className="object-cover object-[center_28%] transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-ink-950/75 via-ink-950/25 via-50% to-ink-950/10 transition-opacity duration-500 group-hover:opacity-90"
          />
        </>
      )}

      <div className="relative z-10 flex h-full flex-col p-4">
        <h3 className="font-heading text-2xl font-semibold tracking-tight text-white">
          {domain.title}
        </h3>
        <p className="mt-1.5 line-clamp-4 max-w-[17rem] text-[0.8125rem] leading-5 text-white/90">
          {domain.description}
        </p>
        <Link
          href={domain.href}
          className="mt-3 inline-flex w-fit items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink-900"
        >
          {domain.linkLabel ?? "Learn more"}
          <ArrowUpRight className="size-3" aria-hidden />
        </Link>
      </div>
    </article>
  );
}

export function IndustryDomains() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncNav = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    syncNav();
    el.addEventListener("scroll", syncNav, { passive: true });
    window.addEventListener("resize", syncNav);

    return () => {
      el.removeEventListener("scroll", syncNav);
      window.removeEventListener("resize", syncNav);
    };
  }, [syncNav]);

  function scrollByDir(dir: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const amount = card
      ? card.getBoundingClientRect().width + 20
      : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  return (
    <section
      id="industries"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="container-site relative">
        <div className="relative mb-10 flex flex-col gap-6 sm:mb-12 lg:mb-12 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="max-w-xl shrink-0 lg:max-w-md">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink-700 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
              Engineers across
              <span className="block text-brand-500">industries</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-ink-500 sm:text-base sm:leading-8 lg:absolute lg:left-1/2 lg:max-w-[18rem] lg:-translate-x-1/2 lg:text-center">
            Real estate and construction, education, sales and AI platforms,
            healthcare, and more.
          </p>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              aria-label="Previous industries"
              disabled={atStart}
              onClick={() => scrollByDir(-1)}
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full bg-brand-600 text-white transition-colors",
                "hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:bg-ink-200 disabled:text-ink-400",
              )}
            >
              <ArrowLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next industries"
              disabled={atEnd}
              onClick={() => scrollByDir(1)}
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-full bg-brand-600 text-white transition-colors",
                "hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
                "disabled:cursor-not-allowed disabled:bg-ink-200 disabled:text-ink-400",
              )}
            >
              <ArrowRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          tabIndex={0}
          role="region"
          aria-label="Industry domains"
          className={cn(
            "flex gap-3 overflow-x-auto overscroll-x-contain scroll-smooth pb-1",
            "snap-x snap-mandatory",
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            "cursor-default outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2",
          )}
        >
          {industryDomains.map((domain) => (
            <IndustryCard key={domain.id} domain={domain} />
          ))}
        </div>
      </div>
    </section>
  );
}
