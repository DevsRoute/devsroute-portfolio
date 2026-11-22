"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Search, X } from "lucide-react";

import { TechIcon } from "@/components/technologies/TechIcon";
import {
  technologyCategories,
  type TechnologyCategory,
} from "@/lib/technologies-data";
import { cn } from "@/lib/utils";

const ALL = "all";

function CategoryBlock({ category }: { category: TechnologyCategory }) {
  return (
    <section
      id={category.id}
      aria-labelledby={`${category.id}-title`}
      className="scroll-mt-52 grid lg:scroll-mt-44 gap-6 border-t border-ink-100 py-12 first-of-type:border-t-0 first-of-type:pt-4 sm:py-14 lg:grid-cols-[18rem_1fr] lg:gap-12 xl:grid-cols-[20rem_1fr]"
    >
      <div className="lg:sticky lg:top-44 lg:self-start">
        <div className="flex items-baseline gap-3">
          <h2
            id={`${category.id}-title`}
            className="font-heading text-2xl font-semibold tracking-tight text-ink-700 sm:text-[1.75rem]"
          >
            {category.title}
          </h2>
          <span className="rounded-full bg-brand-50 px-2 py-0.5 font-mono text-[11px] font-medium text-brand-600">
            {category.items.length}
          </span>
        </div>
        <p className="mt-3 max-w-md text-sm leading-6 text-ink-500 sm:text-[0.95rem] sm:leading-7">
          {category.description}
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {category.items.map((tech) => (
          <li key={tech.name}>
            <div className="group flex h-full items-center gap-3.5 rounded-2xl border border-ink-100 bg-white p-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_12px_32px_-12px_rgb(29_129_242/0.28)] sm:p-4">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#F5F7FA] transition-colors duration-300 group-hover:bg-brand-50 sm:size-12">
                <TechIcon tech={tech} className="size-6 sm:size-7" />
              </span>
              <span className="min-w-0 text-sm leading-5 font-semibold text-ink-700 sm:text-[0.95rem]">
                {tech.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function TechnologyDirectory() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string>(ALL);
  const deferredQuery = useDeferredValue(query);

  const visible = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return technologyCategories
      .filter((c) => active === ALL || c.id === active)
      .map((c) => ({
        ...c,
        items: q
          ? c.items.filter((t) => t.name.toLowerCase().includes(q))
          : c.items,
      }))
      .filter((c) => c.items.length > 0);
  }, [deferredQuery, active]);


  return (
    <>
      <div className="sticky top-[4.75rem] z-20 sm:top-[5.25rem] border-y border-ink-100 bg-white/85 backdrop-blur-md">
        <div className="container-site flex flex-col gap-3 py-3.5 lg:flex-row lg:items-center lg:gap-6">
          <label className="relative flex w-full shrink-0 items-center lg:w-72">
            <span className="sr-only">Search technologies</span>
            <Search
              aria-hidden
              className="pointer-events-none absolute left-4 size-4 text-ink-400"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search technologies…"
              className="h-11 w-full rounded-full border border-ink-200 bg-white pr-10 pl-10 text-sm text-ink-700 placeholder:text-ink-400 transition-colors outline-none focus:border-brand-500 focus:ring-3 focus:ring-brand-500/15 [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 flex size-6 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-ink-50 hover:text-ink-700"
              >
                <X className="size-3.5" aria-hidden />
              </button>
            ) : null}
          </label>

          <div
            role="tablist"
            aria-label="Filter by category"
            className="-mx-6 flex min-w-0 gap-2 overflow-x-auto px-6 pb-0.5 [scrollbar-width:none] sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-1 lg:px-0 lg:[mask-image:linear-gradient(to_right,#000_92%,transparent)] lg:pr-10 [&::-webkit-scrollbar]:hidden"
          >
            {[{ id: ALL, title: "All" }, ...technologyCategories].map((c) => {
              const selected = active === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActive(c.id)}
                  className={cn(
                    "h-9 shrink-0 rounded-full border px-4 text-[0.8rem] font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
                    selected
                      ? "border-brand-500 bg-brand-500 text-white"
                      : "border-ink-200 bg-white text-ink-600 hover:border-brand-300 hover:text-brand-600",
                  )}
                >
                  {c.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container-site py-10 sm:py-14">

        {visible.length > 0 ? (
          visible.map((category) => (
            <CategoryBlock key={category.id} category={category} />
          ))
        ) : (
          <div className="mx-auto flex max-w-md flex-col items-center py-20 text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
              <Search className="size-6" aria-hidden />
            </span>
            <h2 className="mt-5 font-heading text-xl font-semibold text-ink-700">
              No match for “{deferredQuery}”
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink-500">
              It&apos;s likely still something we work with — our list only
              covers what we use most. Ask us about it directly.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActive(ALL);
              }}
              className="mt-5 text-sm font-semibold text-brand-600 underline-offset-4 hover:underline"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </>
  );
}
