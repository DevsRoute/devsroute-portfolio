import { pricingTiers } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export function PricingTiers({
  headingLevel: Heading = "h2",
  compact = false,
}: {
  headingLevel?: "h2" | "h3";
  compact?: boolean;
}) {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {pricingTiers.map((tier) => (
        <li
          key={tier.id}
          className={cn(
            "flex h-full flex-col rounded-2xl border bg-white",
            compact ? "p-6" : "p-7 sm:p-8",
            tier.id === "mvp"
              ? "border-brand-500 shadow-[0_16px_40px_rgb(29_129_242/0.12)]"
              : "border-ink-100",
          )}
        >
          <Heading className="font-heading text-lg font-semibold text-ink-700">
            {tier.name}
          </Heading>
          <p className="mt-3 font-heading text-3xl font-semibold tracking-tight text-ink-700">
            {tier.price}
          </p>
          <p className="mt-1 font-mono text-xs tracking-wide text-brand-600 uppercase">
            {tier.timeline}
          </p>
          <p className="mt-4 text-sm leading-6 text-ink-500">{tier.forWhat}</p>
          {tier.note ? (
            <p className="mt-3 text-xs leading-5 text-ink-400">{tier.note}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
