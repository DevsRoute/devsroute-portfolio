/**
 * PRICING (paused) — this page is switched off. The `_pricing` folder is private in
 * the App Router, so no /pricing route is built. To turn it back on: rename the
 * folder to `pricing`, and uncomment every line marked "PRICING (paused)".
 */
import type { Metadata } from "next";

import { PricingTiers } from "@/components/pricing/PricingTiers";
import { Button } from "@/components/ui/button";
import { paymentTerms, pricingCtas, pricingHeadline } from "@/lib/pricing";
import { pageMetadata } from "@/lib/seo";
import { calendlyHref } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Pricing",
  description:
    "DevsRoute pricing: starter projects from $1,000, first versions (MVPs) typically $5,000–$15,000, and larger builds and AI products from $15,000. Get a free one-page scope.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main className="flex-1">
      <section className="bg-[#F4F7FC] pt-40 pb-12 sm:pt-44 sm:pb-14 lg:pt-48 lg:pb-16">
        <div className="container-site max-w-3xl">
          <p className="font-mono text-xs tracking-[0.14em] text-brand-600 uppercase">
            Pricing
          </p>
          <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-ink-700 sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            {pricingHeadline}
          </h1>
          <p className="mt-5 text-base leading-7 text-ink-500 sm:text-lg sm:leading-8">
            Every quote comes from a written scope, agreed before we start. The
            ranges below show where most projects land.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={pricingCtas.primary.href} size="lg">
              {pricingCtas.primary.label}
            </Button>
            <Button
              href={calendlyHref("/pricing")}
              size="lg"
              variant="outline"
              arrow={false}
            >
              {pricingCtas.secondary.label}
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-site">
          <PricingTiers />

          <div className="mt-14 grid gap-10 border-t border-ink-100 pt-10 md:grid-cols-2">
            <div>
              <h2 className="font-heading text-2xl font-semibold text-ink-700">
                Payment terms
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-7 text-ink-500">
                {paymentTerms.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-2xl font-semibold text-ink-700">
                How a quote works
              </h2>
              <p className="mt-4 text-base leading-7 text-ink-500">
                Tell us what you need. We send a free one-page scope with what
                is in, what is out, the timeline and an estimate. You work
                directly with the people building your product, with a demo
                every week.
              </p>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-4 rounded-2xl bg-[#F4F7FC] p-8 sm:flex-row sm:flex-wrap sm:items-center sm:p-10">
            <p className="w-full font-heading text-xl font-semibold text-ink-700">
              Not sure which tier fits?
            </p>
            <Button href={pricingCtas.primary.href} size="lg">
              {pricingCtas.primary.label}
            </Button>
            <Button
              href={calendlyHref("/pricing")}
              size="lg"
              variant="outline"
              arrow={false}
            >
              {pricingCtas.secondary.label}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
