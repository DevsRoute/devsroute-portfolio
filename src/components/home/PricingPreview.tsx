import { PricingTiers } from "@/components/pricing/PricingTiers";
import { Button } from "@/components/ui/button";
import { pricingCtas, pricingHeadline } from "@/lib/pricing";

export function PricingPreview() {
  return (
    <section id="pricing" className="bg-[#F4F7FC] py-20 sm:py-24 lg:py-28">
      <div className="container-site">
        <div className="mb-10 max-w-2xl sm:mb-12">
          <p className="text-xs font-semibold tracking-[0.16em] text-brand-600 uppercase sm:text-[0.7rem]">
            Pricing
          </p>
          <h2 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-ink-700 sm:text-4xl lg:leading-[1.15]">
            {pricingHeadline}
          </h2>
        </div>

        <PricingTiers headingLevel="h3" compact />

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/pricing" size="lg">
            See pricing
          </Button>
          <Button
            href={pricingCtas.primary.href}
            size="lg"
            variant="outline"
            arrow={false}
          >
            {pricingCtas.primary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
