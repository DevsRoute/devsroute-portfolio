import { siteFacts } from "@/config/site-facts";
import { getProjects } from "@/data/projects";
import { paymentTerms, pricingHeadline, pricingTiers } from "@/lib/pricing";
import { getServicePage, getServicePageSlugs } from "@/lib/services/service-pages-data";
import { siteConfig } from "@/lib/site-config";

export function GET() {
  const origin = siteConfig.url;
  const services = getServicePageSlugs()
    .map((slug) => {
      const page = getServicePage(slug);
      if (!page) return null;
      return `- [${page.hero.eyebrow}](${origin}/services/${slug}): ${page.meta.description}`;
    })
    .filter(Boolean)
    .join("\n");

  const work = getProjects()
    .map((project) => {
      const link = project.liveUrl ? ` (${project.liveUrl})` : "";
      return `- ${project.name}${link} — ${project.label}. ${project.summary}`;
    })
    .join("\n");

  const pricing = pricingTiers
    .map((t) => `- ${t.name}: ${t.price}, ${t.timeline}. ${t.forWhat}`)
    .join("\n");

  const body = `# ${siteFacts.companyName}

> ${siteFacts.companyName} is a senior remote software studio. We help startups and B2B founders build SaaS MVPs and AI-native products. Every project starts with a clear scope and a defined end date. You talk directly to the people building the product.

This file describes public pages for answer engines and generative search tools. It is not a ranking signal, an indexing guarantee, or a claim that any AI product will cite the site.

## Identity
- Name: ${siteFacts.companyName}
- Website: ${origin}
- Email: ${siteFacts.email}
- Location: Remote. No public street address.
- LinkedIn: ${siteFacts.social.linkedin}
- Book a call: ${siteFacts.calendly.href}

## What we do
- SaaS MVP development for startups and B2B founders
- AI product development: chat assistants, automation, and AI features in new or existing products
- Custom software, web applications, mobile apps, UI/UX design, and cloud/DevOps
- Technologies: the MERN stack (MongoDB, Express, React, Node.js), Python, RAG and LLMs

## What we do not claim
- No published client names unless a project page names the client
- No invented metrics, ratings, or testimonials
- Partial projects describe only the part we delivered
- The exact end date and price are agreed in a written scope, with a demo every week

## Pages
- [Home](${origin}/): SaaS MVP development and AI product development
- [For founders](${origin}/founders): SaaS MVP development with a clear scope and a defined end date
- [AI features](${origin}/ai-features): Add AI to an existing product without stalling the roadmap
- [About](${origin}/about): Remote studio for startups and B2B founders
- [Approach](${origin}/approach): Discover, design, build, and launch
- [Work](${origin}/work): Full builds and partial work, with our part stated for each
- [Pricing](${origin}/pricing): ${pricingHeadline}
- [Contact](${origin}/contact): ${siteFacts.email}

## Services
${services}

## Pricing
${pricingHeadline}
${pricing}
${paymentTerms.map((t) => `- ${t}`).join("\n")}

## Work
${work}

## Optional
- [Privacy](${origin}/privacy)
- [Terms](${origin}/terms)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
