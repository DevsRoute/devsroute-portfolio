import { Button } from "@/components/ui/button";
import { calendlyHref, siteConfig } from "@/lib/site-config";

/** Sits where the pricing block will go once /pricing is ready. */
export const scopeLine =
  "Every project is scoped and priced up front. Start with a free one-page scope.";

export function ScopeNote() {
  return (
    <section className="bg-[#F4F7FC] py-16 sm:py-20">
      <div className="container-site flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
        <h2 className="max-w-2xl font-heading text-2xl font-semibold tracking-tight text-ink-700 sm:text-3xl lg:leading-[1.2]">
          {scopeLine}
        </h2>
        <div className="flex shrink-0 flex-wrap gap-3">
          <Button href="/contact" size="lg">
            Get a free one-page scope
          </Button>
          <Button
            href={calendlyHref("/")}
            size="lg"
            variant="outline"
            arrow={false}
          >
            {siteConfig.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
