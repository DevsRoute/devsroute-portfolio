import { technologyIconSrc, type Technology } from "@/lib/technologies-data";
import { cn } from "@/lib/utils";

function monogram(name: string) {
  const letters = name.replace(/[^A-Za-z0-9+#]/g, " ").trim().split(/\s+/);
  return (letters.length > 1 ? letters[0][0] + letters[1][0] : name.slice(0, 2)).toUpperCase();
}

/** Brand logo for a technology, with a monogram tile when no logo is published. */
export function TechIcon({
  tech,
  className,
}: {
  tech: Technology;
  className?: string;
}) {
  const src = technologyIconSrc(tech);

  if (!src) {
    return (
      <span
        aria-hidden
        className={cn(
          "inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 font-heading text-[0.7em] font-bold text-white",
          className,
        )}
      >
        {monogram(tech.name)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- brand logos from Simple Icons / Devicon CDNs
    <img
      src={src}
      alt=""
      aria-hidden
      width={40}
      height={40}
      loading="lazy"
      decoding="async"
      draggable={false}
      className={cn("object-contain", className)}
    />
  );
}
