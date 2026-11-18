import type { Metadata } from "next";
import Image from "next/image";
import {
  Bell,
  CalendarClock,
  CreditCard,
  LayoutDashboard,
  MapPin,
  Navigation,
  Smartphone,
  Star,
  Truck,
  Zap,
} from "lucide-react";

import { TechIcon } from "@/components/technologies/TechIcon";
import { Button } from "@/components/ui/button";
import { jsonLdScript } from "@/lib/json-ld";
import { organizationId, pageMetadata } from "@/lib/seo";
import { calendlyHref, siteConfig } from "@/lib/site-config";
import { findTechnology } from "@/lib/technologies-data";

/*
 * Photography: Unsplash (free under the Unsplash License, no attribution required).
 *  ordering-app.jpg     — Rodrigo Rodrigues  unsplash.com/photos/UL37FlWpyus
 *  rider-night.jpg      — Rowan Freeman      unsplash.com/photos/clYlmCaQbzY
 *  delivery-scooter.jpg — Lucian Alexe       unsplash.com/photos/afDu-GuxjjM
 *  home-cleaning.jpg    — Giorgio Trovato    unsplash.com/photos/5TXz228u4eo
 *  handyman.jpg         — Annie Gray         unsplash.com/photos/WEWTGkPUVT0
 *  courier-parcel.jpg   — Fotos              unsplash.com/photos/ryO6LhG5BrA
 */

const path = "/industries/on-demand";
const description =
  "On-demand app development for startups: customer app, provider app and admin dashboard with real-time matching, live tracking and in-app payments.";

export const metadata: Metadata = pageMetadata({
  title: "On-Demand App Development",
  description,
  path,
});

const apps = [
  {
    icon: Smartphone,
    title: "Customer app",
    body: "Browse, book and pay in a few taps, then follow every step live.",
    points: ["Search & instant booking", "Live tracking & ETA", "Saved cards & wallets", "Ratings & reorders"],
  },
  {
    icon: Truck,
    title: "Provider app",
    body: "Everything couriers, cleaners or pros need to accept work and get paid.",
    points: ["Accept or decline jobs", "Turn-by-turn navigation", "Availability & shifts", "Earnings & payouts"],
  },
  {
    icon: LayoutDashboard,
    title: "Admin dashboard",
    body: "One place for your ops team to run the marketplace day to day.",
    points: ["Live map of orders", "Pricing & commission rules", "Provider onboarding", "Refunds & disputes"],
  },
];

const useCases = [
  { title: "Food & grocery delivery", image: "/brand/industries/on-demand/delivery-scooter.jpg", alt: "Courier riding a delivery scooter past a stone wall" },
  { title: "Home services", image: "/brand/industries/on-demand/home-cleaning.jpg", alt: "Cleaner in gloves vacuuming a grey ottoman" },
  { title: "Repairs & trades", image: "/brand/industries/on-demand/handyman.jpg", alt: "Handyman working with a miter saw in a bright room" },
  { title: "Courier & parcels", image: "/brand/industries/on-demand/courier-parcel.jpg", alt: "Courier holding a parcel while checking a phone" },
];

const features = [
  { icon: Zap, title: "Real-time matching", body: "Assign the nearest available provider automatically, with manual override." },
  { icon: Navigation, title: "Live tracking & ETAs", body: "GPS updates on a map for customers, providers and your ops team." },
  { icon: CreditCard, title: "Payments & payouts", body: "Card and wallet checkout, split payments and scheduled provider payouts." },
  { icon: CalendarClock, title: "Scheduling", body: "Book now or later, with time slots, availability and surge windows." },
  { icon: Bell, title: "Notifications & chat", body: "Push, SMS and in-app chat so nobody has to call to ask “where is it?”." },
  { icon: Star, title: "Ratings & trust", body: "Two-way reviews, ID checks and support tooling that keep quality high." },
];

const stack = ["React Native", "Flutter", "Node.js", "PostgreSQL", "Redis", "Mapbox", "Stripe", "Firebase"];

const faqs = [
  {
    q: "What does an on-demand app MVP include?",
    a: "Usually three parts: a customer app, a provider app and a web admin dashboard, sharing one backend. For an MVP we keep each to the core flow (book, accept, track, pay, rate) and add the rest once real orders come in.",
  },
  {
    q: "Native or cross-platform?",
    a: "Most on-demand MVPs ship faster on React Native or Flutter: one codebase for iOS and Android, with native maps, push and background location. We go fully native only when a feature really needs it.",
  },
  {
    q: "How do payments and payouts work?",
    a: "We typically use Stripe Connect (or a regional equivalent) so customers pay in-app, your platform keeps its commission, and providers are paid out automatically on a schedule you choose.",
  },
  {
    q: "Can you add on-demand features to an app we already have?",
    a: "Yes. We often add live tracking, dispatch or provider payouts to an existing product without a rewrite. We start by reviewing your codebase and agree a clear scope and end date.",
  },
];

function OnDemandJsonLd() {
  const url = `${siteConfig.url}${path}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "On-demand app development",
        serviceType: "On-demand marketplace app development",
        description,
        url,
        provider: { "@id": organizationId },
        areaServed: "Worldwide",
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "On-demand app development", item: url },
        ],
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLdScript(data) }}
    />
  );
}

export default function OnDemandPage() {
  return (
    <main className="flex-1">
      <OnDemandJsonLd />

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#F4F7FC] pt-36 pb-16 sm:pt-40 lg:pt-44 lg:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_90%_20%,rgb(29_129_242/0.12),transparent_65%)]"
        />
        <div className="container-site relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="font-mono text-xs tracking-[0.14em] text-brand-600 uppercase">
              Industries · On-demand
            </p>
            <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-ink-700 sm:text-5xl lg:text-[3.4rem] lg:leading-[1.06]">
              On-demand apps that connect customers and providers{" "}
              <span className="text-brand-500">in real time.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-ink-500 sm:text-lg sm:leading-8">
              We design and build the customer app, provider app and admin
              dashboard behind delivery, home-service and booking marketplaces —
              with live tracking, payments and dispatch that hold up on day one.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={calendlyHref(path)} size="lg" data-analytics="calendly">
                {siteConfig.cta.label}
              </Button>
              <Button href="/contact" size="lg" variant="outline" arrow={false}>
                Get a free one-page scope
              </Button>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-500">
              {["iOS, Android & web", "One shared backend", "Clear scope & end date"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-brand-500" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] shadow-[0_40px_80px_-30px_rgb(9_39_73/0.45)]">
              <Image
                src="/brand/industries/on-demand/ordering-app.jpg"
                alt="Hand holding a smartphone with a food ordering app open"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-cover object-[50%_40%]"
              />
            </div>
            {/* Illustrative live-order card */}
            <div
              aria-hidden
              className="absolute -bottom-6 -left-4 w-[16.5rem] rounded-2xl border border-white bg-white/95 p-4 shadow-[0_24px_48px_-16px_rgb(9_39_73/0.35)] backdrop-blur-md sm:-left-10"
            >
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold text-ink-700">Order #2481</p>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                  <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
                  On the way
                </span>
              </div>
              <div className="mt-3 flex items-center gap-2.5">
                <span className="flex size-8 items-center justify-center rounded-full bg-brand-50">
                  <MapPin className="size-4 text-brand-500" />
                </span>
                <div>
                  <p className="text-[13px] text-ink-700">Rider is 4 min away</p>
                  <p className="text-[11px] text-ink-400">1.2 km · arriving 12:44</p>
                </div>
              </div>
              <div className="mt-3 flex gap-1">
                {[1, 1, 1, 0].map((on, i) => (
                  <span
                    key={i}
                    className={on ? "h-1 flex-1 rounded-full bg-brand-500" : "h-1 flex-1 rounded-full bg-ink-100"}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three apps */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-site">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink-700 sm:text-4xl">
              Three apps, <span className="text-brand-500">one platform.</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-500 sm:text-lg">
              Every on-demand business runs on the same three surfaces. We build
              them together on one backend, so data, pricing and status stay in
              sync everywhere.
            </p>
          </div>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {apps.map(({ icon: Icon, title, body, points }, i) => (
              <li
                key={title}
                className="group relative flex flex-col rounded-3xl border border-ink-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_24px_48px_-24px_rgb(29_129_242/0.35)]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-500 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="font-mono text-xs text-ink-300">0{i + 1}</span>
                </div>
                <h3 className="mt-6 font-heading text-xl font-semibold text-ink-700">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-500">{body}</p>
                <ul className="mt-5 space-y-2.5 border-t border-ink-100 pt-5">
                  {points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-ink-600">
                      <span className="size-1.5 shrink-0 rounded-full bg-brand-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-[#F5F7FA] py-20 sm:py-24">
        <div className="container-site">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-xl font-heading text-3xl font-semibold tracking-tight text-ink-700 sm:text-4xl">
              Built for every kind of <span className="whitespace-nowrap text-brand-500">on-demand.</span>
            </h2>
            <p className="max-w-md text-base leading-7 text-ink-500">
              The marketplace pattern is the same; the details are not. We shape
              matching, pricing and scheduling around how your service actually runs.
            </p>
          </div>
          <ul className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {useCases.map((u) => (
              <li
                key={u.title}
                className="group relative aspect-[3/4] overflow-hidden rounded-2xl bg-ink-100"
              >
                <Image
                  src={u.image}
                  alt={u.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-ink-950/10 via-45% to-transparent"
                />
                <h3 className="absolute inset-x-4 bottom-4 font-heading text-base font-semibold text-white sm:text-lg">
                  {u.title}
                </h3>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features + stack */}
      <section className="bg-white py-20 sm:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink-700 sm:text-4xl">
              The features that make <span className="whitespace-nowrap text-brand-500">on-demand work.</span>
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-500">
              Real-time is hard to get right. These are the pieces we build and
              test properly from the first release.
            </p>
            <p className="mt-10 font-mono text-[11px] tracking-[0.14em] text-ink-400 uppercase">
              Typical stack
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {stack.map((name) => {
                const tech = findTechnology(name);
                return (
                  <li
                    key={name}
                    className="flex items-center gap-2 rounded-full border border-ink-100 bg-white py-1.5 pr-3.5 pl-2 text-sm text-ink-600"
                  >
                    {tech ? <TechIcon tech={tech} className="size-4" /> : null}
                    {name}
                  </li>
                );
              })}
            </ul>
          </div>
          <dl className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, body }) => (
              <div key={title} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                  <Icon className="size-[1.1rem]" aria-hidden />
                </span>
                <div>
                  <dt className="font-heading text-base font-semibold text-ink-700">{title}</dt>
                  <dd className="mt-1.5 text-sm leading-6 text-ink-500">{body}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FAQ + CTA */}
      <section className="bg-white pb-20 sm:pb-24">
        <div className="container-site">
          <div className="grid gap-10 border-t border-ink-100 pt-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-ink-700 sm:text-4xl">
              On-demand app <span className="text-brand-500">questions.</span>
            </h2>
            <div className="divide-y divide-ink-100 border-y border-ink-100">
              {faqs.map((f, i) => (
                <details key={f.q} className="group py-5" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-heading text-lg font-semibold text-ink-700 [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-ink-200 text-ink-500 transition-transform duration-300 group-open:rotate-45 group-open:border-brand-500 group-open:bg-brand-500 group-open:text-white">
                      <span aria-hidden className="text-lg leading-none">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl pr-12 text-[0.95rem] leading-7 text-ink-500">{f.a}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="relative mt-20 overflow-hidden rounded-3xl">
            <Image
              src="/brand/industries/on-demand/rider-night.jpg"
              alt=""
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-cover object-[60%_center]"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-900/80 to-brand-800/30" />
            <div className="relative px-6 py-14 sm:px-12 sm:py-16 lg:max-w-2xl lg:px-14">
              <h2 className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Launching an on-demand service?
              </h2>
              <p className="mt-4 text-base leading-7 text-white/80 sm:text-lg">
                Tell us the city, the service and who does the work. We&apos;ll map
                the MVP across all three apps with a clear scope and end date.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={calendlyHref(path)} size="lg" variant="light" data-analytics="calendly">
                  {siteConfig.cta.label}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
