import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { calendlyHref, siteConfig } from "@/lib/site-config";

export function AiNative() {
  return (
    <section
      id="ai"
      aria-labelledby="ai-native-heading"
      className="scroll-mt-28 bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="container-site">
        <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-[#020a2b] text-white shadow-[0_30px_80px_-30px_rgba(2,10,43,0.55)] sm:rounded-[2rem]">
          <Image
            src="/brand/ai/ai-native-robot.png"
            alt="Humanoid AI figure surrounded by floating chat, code, analytics and neural-network panels"
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="-z-10 object-cover object-[75%_center] opacity-45 sm:opacity-70 lg:object-right lg:opacity-100"
          />
          {/* Readability overlays */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-r from-[#020a2b] via-[#020a2b]/85 to-[#020a2b]/20 lg:via-[#020a2b]/60 lg:to-transparent"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-gradient-to-t from-[#020a2b]/70 via-transparent to-transparent lg:hidden"
          />

          <div className="flex min-h-[30rem] flex-col justify-center p-7 sm:min-h-[34rem] sm:p-10 lg:min-h-[36rem] lg:p-14 xl:p-16">
            <div className="flex max-w-xl flex-col gap-6 lg:max-w-[36rem] lg:gap-7">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 font-mono text-[0.7rem] tracking-[0.12em] text-[#7FE7FF] uppercase backdrop-blur-sm sm:text-xs">
                <Sparkles className="size-3.5" aria-hidden />
                AI-native development
              </span>

              <h2
                id="ai-native-heading"
                className="font-heading text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[3rem] lg:leading-[1.08] xl:text-[3.4rem]"
              >
                Build AI into the core of your product.{" "}
                <span className="bg-gradient-to-r from-[#7FE7FF] to-[#56a0f5] bg-clip-text text-transparent">
                  Not bolted on.
                </span>
              </h2>

              <p className="max-w-lg text-base leading-7 text-white/85 sm:text-lg sm:leading-8">
                Your customers expect AI. Your team is already full. We design
                and ship production-ready AI features — assistants, agents and
                smart automation — so your core roadmap keeps moving.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button
                  href={calendlyHref("/")}
                  size="lg"
                  variant="light"
                  data-analytics="calendly"
                >
                  {siteConfig.cta.label}
                </Button>
                <Link
                  href="/services/ai-solutions"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-white/25 px-6 text-base font-medium text-white backdrop-blur-sm transition-colors hover:border-white/50 hover:bg-white/10"
                >
                  Explore AI solutions
                  <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
