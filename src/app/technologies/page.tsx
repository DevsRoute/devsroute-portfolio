import type { Metadata } from "next";

import { TechIcon } from "@/components/technologies/TechIcon";
import { TechnologyDirectory } from "@/components/technologies/TechnologyDirectory";
import { Button } from "@/components/ui/button";
import { jsonLdScript } from "@/lib/json-ld";
import { organizationId, pageMetadata } from "@/lib/seo";
import { calendlyHref, siteConfig } from "@/lib/site-config";
import {
  findTechnology,
  technologyCategories,
  technologyCount,
} from "@/lib/technologies-data";

const description =
  "The languages, frameworks, cloud platforms and AI coding tools DevsRoute engineers build with — from React and Python to Claude Code and Cursor.";

export const metadata: Metadata = pageMetadata({
  title: "Technologies We Work With",
  description,
  path: "/technologies",
});

const heroIcons = [
  "React",
  "Python",
  "Claude Code",
  "Node.js",
  "AWS",
  "Flutter",
  "TypeScript",
  "Cursor",
  "PostgreSQL",
  "Kubernetes",
  "Swift",
  "Next.js",
];

function TechnologiesJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Technologies DevsRoute works with",
    url: `${siteConfig.url}/technologies`,
    description,
    about: { "@id": organizationId },
    hasPart: technologyCategories.map((c) => ({
      "@type": "ItemList",
      name: c.title,
      itemListElement: c.items.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t.name,
      })),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }}
    />
  );
}

export default function TechnologiesPage() {
  const stats = [
    { value: `${technologyCount}`, label: "Technologies in production use" },
    { value: `${technologyCategories.length}`, label: "Engineering disciplines" },
    { value: "AI-native", label: "Delivery with modern coding agents" },
  ];

  return (
    <main className="flex-1">
      <TechnologiesJsonLd />

      <section className="relative overflow-hidden bg-[#F4F7FC] pt-40 pb-14 sm:pt-44 sm:pb-16 lg:pt-48 lg:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_85%_10%,rgb(29_129_242/0.12),transparent_60%)]"
        />
        <div className="container-site relative grid items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <p className="font-mono text-xs tracking-[0.14em] text-brand-600 uppercase">
              Our full repertoire
            </p>
            <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-ink-700 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.05]">
              Every stack you rely on,{" "}
              <span className="text-brand-500">one senior team.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-ink-500 sm:text-lg sm:leading-8">
              Languages, frameworks, cloud platforms and the AI coding tools
              rewriting how software gets built. We pick what fits your product
              — then hand over code your team can own.
            </p>

            <dl className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-ink-200/70 pt-6 sm:gap-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-heading text-2xl font-semibold text-ink-700 sm:text-3xl">
                    {s.value}
                  </dd>
                  <dd className="mt-1 text-xs leading-5 text-ink-500 sm:text-sm">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <ul
            aria-hidden
            className="grid grid-cols-4 gap-3 sm:gap-4 lg:justify-self-end"
          >
            {heroIcons.map((name, i) => {
              const tech = findTechnology(name);
              if (!tech) return null;
              return (
                <li
                  key={name}
                  className={
                    i % 4 === 1 || i % 4 === 3
                      ? "translate-y-4 sm:translate-y-6"
                      : undefined
                  }
                >
                  <span className="flex aspect-square w-full items-center justify-center rounded-2xl border border-white bg-white/80 shadow-[0_10px_30px_-14px_rgb(9_39_73/0.25)] backdrop-blur-sm sm:size-24 lg:size-[6.5rem]">
                    <TechIcon tech={tech} className="size-8 sm:size-10" />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <TechnologyDirectory />

      <section className="bg-white pb-20 sm:pb-24">
        <div className="container-site">
          <div className="relative overflow-hidden rounded-3xl bg-[radial-gradient(103%_95%_at_10%_0%,#10347e_0%,#0755e9_100%)] px-6 py-12 text-center sm:px-12 sm:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(#ffffff12_1px,transparent_1px),linear-gradient(90deg,#ffffff12_1px,transparent_1px)] bg-[length:40px_40px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Don&apos;t see your stack?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
                This is what we use most — not the limit of what we know. Tell
                us about your codebase and we&apos;ll be straight about fit.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  href={calendlyHref("/technologies")}
                  size="lg"
                  variant="light"
                  data-analytics="calendly"
                >
                  {siteConfig.cta.label}
                </Button>
                <Button
                  href="/contact"
                  size="lg"
                  variant="ghost"
                  arrow={false}
                  className="text-white hover:bg-white/10 hover:text-white"
                >
                  Send us your stack
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
