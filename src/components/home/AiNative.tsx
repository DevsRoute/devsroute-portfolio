"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, FileText, Sparkles } from "lucide-react";

import {
  aiCapabilities,
  aiPrinciples,
  type AiCapabilityId,
} from "@/components/home/ai-native-data";
import { Button } from "@/components/ui/button";
import { calendlyHref, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const ROTATE_MS = 7000;

/* Sample UI per photo — decorative, always labelled "Example" so it never reads as client data. */
function FloatingCard({ id }: { id: AiCapabilityId }) {
  return (
    <div className="relative">
      <SampleCard id={id} />
      <span className="absolute -top-2.5 left-3.5 rounded-full bg-ink-700 px-2 py-0.5 text-[10px] font-semibold tracking-[0.08em] text-white uppercase shadow-sm">
        Example
      </span>
    </div>
  );
}

function SampleCard({ id }: { id: AiCapabilityId }) {
  const shell =
    "w-[17.5rem] rounded-2xl border border-white/70 bg-white/95 p-3.5 shadow-[0_24px_48px_-16px_rgb(9_39_73/0.35)] backdrop-blur-md sm:w-[19rem] sm:p-4";

  if (id === "assistants") {
    return (
      <div className={shell}>
        <p className="ml-auto w-fit rounded-xl rounded-br-sm bg-brand-500 px-3 py-1.5 text-[13px] text-white">
          Why did my invoice go up?
        </p>
        <div className="mt-2.5 flex gap-2">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-50">
            <Sparkles className="size-3 text-brand-500" />
          </span>
          <p className="text-[13px] leading-5 text-ink-600">
            You added 3 seats on Mar 4, so March was prorated.{" "}
            <span className="font-medium text-brand-600">Remove unused seats?</span>
          </p>
        </div>
      </div>
    );
  }

  if (id === "agents") {
    return (
      <div className={shell}>
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold text-ink-700">Refund agent</p>
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-700">
            Needs approval
          </span>
        </div>
        <ul className="mt-2.5 space-y-1.5">
          {["Read ticket #4821", "Checked order & policy", "Drafted $38.40 refund"].map(
            (s) => (
              <li key={s} className="flex items-center gap-2 text-[13px] text-ink-500">
                <Check className="size-3.5 text-emerald-500" />
                {s}
              </li>
            ),
          )}
        </ul>
        <div className="mt-3 flex gap-2">
          <span className="rounded-lg bg-ink-700 px-3 py-1 text-[12px] font-medium text-white">
            Approve
          </span>
          <span className="rounded-lg border border-ink-100 px-3 py-1 text-[12px] text-ink-500">
            Edit
          </span>
        </div>
      </div>
    );
  }

  if (id === "rag") {
    return (
      <div className={shell}>
        <p className="text-[13px] leading-5 text-ink-600">
          EU customer data is kept for <b className="text-ink-700">24 months</b>{" "}
          after contract end, then deleted.
        </p>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-[#F5F7FA] px-2.5 py-1.5">
          <FileText className="size-3.5 text-brand-500" />
          <span className="truncate text-[12px] text-ink-600">
            Data Processing Agreement.pdf
          </span>
          <span className="ml-auto text-[11px] text-ink-400">p. 7</span>
        </div>
      </div>
    );
  }

  return (
    <div className={shell}>
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold text-ink-700">Form 1040 · extracted</p>
        <span className="text-[11px] font-medium text-emerald-600">97% conf.</span>
      </div>
      <dl className="mt-2.5 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[12px]">
        {[
          ["Filer", "Jane Doe"],
          ["Tax year", "2025"],
          ["Income", "$50,000"],
          ["Status", "Joint"],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="text-ink-400">{k}</dt>
            <dd className="font-medium text-ink-700">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function AiNative() {
  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [hovered, setHovered] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!autoplay || hovered) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(
      () => setActive((i) => (i + 1) % aiCapabilities.length),
      ROTATE_MS,
    );
    return () => window.clearTimeout(t);
  }, [active, autoplay, hovered]);

  function select(i: number) {
    setAutoplay(false);
    setActive(i);
  }

  function onTabKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const n = aiCapabilities.length;
    const map: Record<string, number> = {
      ArrowDown: (i + 1) % n,
      ArrowRight: (i + 1) % n,
      ArrowUp: (i - 1 + n) % n,
      ArrowLeft: (i - 1 + n) % n,
      Home: 0,
      End: n - 1,
    };
    const next = map[e.key];
    if (next === undefined) return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  }

  const current = aiCapabilities[active];

  return (
    <section
      id="ai"
      aria-labelledby="ai-native-heading"
      className="scroll-mt-28 bg-white py-20 sm:py-24 lg:py-28"
    >
      <div className="container-site">
        {/* Header — answer-first copy */}
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="font-mono text-xs tracking-[0.14em] text-brand-500 uppercase sm:text-[0.8rem]">
              AI-native development
            </p>
            <h2
              id="ai-native-heading"
              className="mt-4 font-heading text-3xl font-semibold tracking-tight text-ink-700 sm:text-4xl lg:text-[3rem] lg:leading-[1.08]"
            >
              Build AI into the core of your product.{" "}
              <span className="whitespace-nowrap text-brand-500">Not bolted on.</span>
            </h2>
          </div>
          <p className="text-base leading-7 text-ink-500 sm:text-[1.05rem] sm:leading-8">
            <strong className="font-semibold text-ink-700">AI-native development</strong>{" "}
            means designing a feature around language models from day one: data,
            UX, guardrails and evaluation built together, not a chat widget added
            later. We build AI features grounded in your data, with a human
            review step where it matters and a clear log of what the AI did.
          </p>
        </div>

        {/* Capabilities — editorial list + photo */}
        <div
          className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="AI capabilities"
            className="flex flex-col border-t border-ink-100 lg:order-none"
          >
            {aiCapabilities.map((cap, i) => {
              const selected = i === active;
              return (
                <button
                  key={cap.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`ai-tab-${cap.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="ai-tabpanel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onTabKey(e, i)}
                  className="group relative border-b border-ink-100 py-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 sm:py-6"
                >
                  <span className="flex items-baseline gap-4">
                    <span
                      className={cn(
                        "w-6 shrink-0 font-mono text-xs transition-colors",
                        selected ? "text-brand-500" : "text-ink-300",
                      )}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className={cn(
                        "font-heading text-xl font-semibold tracking-tight transition-colors sm:text-2xl",
                        selected ? "text-ink-700" : "text-ink-400 group-hover:text-ink-600",
                      )}
                    >
                      {cap.title}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
                      selected ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <span className="overflow-hidden pl-10">
                      <span className="block pt-3 text-[0.95rem] leading-7 text-ink-500">
                        {cap.summary}
                      </span>
                      <span className="flex flex-wrap gap-2 pt-4">
                        {cap.points.map((p) => (
                          <span
                            key={p}
                            className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
                          >
                            {p}
                          </span>
                        ))}
                      </span>
                    </span>
                  </span>
                  {/* progress line */}
                  <span aria-hidden className="absolute -bottom-px left-0 h-px w-full">
                    {selected ? (
                      <span
                        key={`${cap.id}-${autoplay}`}
                        className={cn(
                          "block h-full bg-brand-500",
                          autoplay ? "ai-tab-progress" : "w-full",
                        )}
                        style={
                          autoplay
                            ? {
                                animationDuration: `${ROTATE_MS}ms`,
                                animationPlayState: hovered ? "paused" : "running",
                              }
                            : undefined
                        }
                      />
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="ai-tabpanel"
            role="tabpanel"
            aria-labelledby={`ai-tab-${current.id}`}
            className="relative order-first lg:order-none"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-ink-100 lg:aspect-auto lg:h-full lg:min-h-[32rem]">
              {aiCapabilities.map((cap, i) => (
                <Image
                  key={cap.id}
                  src={cap.image}
                  alt={cap.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 640px"
                  priority={i === 0}
                  aria-hidden={i !== active}
                  style={{ objectPosition: cap.focus }}
                  className={cn(
                    "object-cover transition-[opacity,transform] duration-700 ease-out",
                    i === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
                  )}
                />
              ))}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-brand-950/45 via-transparent to-transparent"
              />
              <div
                key={current.id}
                aria-hidden
                className="ai-card-in absolute bottom-4 left-4 sm:bottom-6 sm:left-6"
              >
                <FloatingCard id={current.id} />
              </div>
            </div>
          </div>
        </div>

        {/* How we ship — photo + principles */}
        <div className="mt-20 grid gap-10 rounded-[1.75rem] bg-[#F5F7FA] p-4 sm:p-6 lg:mt-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14 lg:p-6">
          <div className="relative aspect-[16/11] overflow-hidden rounded-[1.25rem] lg:aspect-auto lg:min-h-full">
            <Image
              src="/brand/ai/ai-engineering.jpg"
              alt="Two engineers writing code side by side in a bright office"
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover object-[72%_center]"
            />
          </div>
          <div className="px-2 pb-4 sm:px-4 lg:py-8 lg:pr-8 lg:pl-0">
            <h3 className="font-heading text-2xl font-semibold tracking-tight text-ink-700 sm:text-[2rem] sm:leading-tight">
              How we ship AI that holds up in production
            </h3>
            <dl className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
              {aiPrinciples.map((p, i) => (
                <div key={p.title} className="border-t border-ink-200/70 pt-4">
                  <dt className="flex items-baseline gap-3 font-heading text-base font-semibold text-ink-700">
                    <span className="font-mono text-xs text-brand-500">0{i + 1}</span>
                    {p.title}
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-ink-500">{p.body}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Button href={calendlyHref("/")} size="lg" data-analytics="calendly">
                {siteConfig.cta.label}
              </Button>
              <Link
                href="/services/ai-solutions"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-ink-200 bg-white px-6 text-base font-medium text-ink-700 transition-colors hover:border-brand-300 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              >
                Explore AI solutions
                <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
