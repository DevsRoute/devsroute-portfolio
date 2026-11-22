/**
 * Single source of truth for the technologies DevsRoute works with.
 * Powers the home-page marquee and the /technologies directory.
 *
 * Icons:
 *  - `si`      → Simple Icons slug, served from cdn.simpleicons.org in brand colour
 *  - `devicon` → Devicon path (for brands Simple Icons no longer ships)
 *  - neither   → a branded monogram tile is rendered instead
 * Every slug below was checked against its CDN; keep that true when adding more.
 */

export type Technology = {
  name: string;
  si?: string;
  devicon?: string;
  /** Self-hosted logo in /public (for brands Simple Icons no longer publishes, e.g. OpenAI). */
  local?: string;
};

export type TechnologyCategory = {
  id: string;
  title: string;
  description: string;
  items: Technology[];
};

const DEVICON_BASE =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons";

export function technologyIconSrc(tech: Technology): string | null {
  if (tech.local) return tech.local;
  if (tech.si) return `https://cdn.simpleicons.org/${tech.si}`;
  if (tech.devicon) return `${DEVICON_BASE}/${tech.devicon}.svg`;
  return null;
}

export const technologyCategories: TechnologyCategory[] = [
  {
    id: "ai-coding-tools",
    title: "AI coding tools",
    description:
      "The agents and editors rewriting how software gets built. Our engineers ship with them daily — with review, tests and guardrails around every change.",
    items: [
      { name: "Claude Code", si: "claude" },
      { name: "Cursor", si: "cursor" },
      { name: "GitHub Copilot", si: "githubcopilot" },
      { name: "Windsurf", si: "windsurf" },
      { name: "OpenAI Codex", local: "/brand/tech/openai.svg" },
      { name: "Gemini CLI", si: "googlegemini" },
      { name: "v0", si: "v0" },
      { name: "Bolt", si: "stackblitz" },
      { name: "Replit", si: "replit" },
      { name: "Cline", si: "cline" },
      { name: "Zed", si: "zedindustries" },
    ],
  },
  {
    id: "ai-ml",
    title: "AI & machine learning",
    description:
      "LLM features, agents, RAG pipelines and classic ML — wired into real products, not demos.",
    items: [
      { name: "OpenAI", local: "/brand/tech/openai.svg" },
      { name: "Anthropic Claude", si: "anthropic" },
      { name: "Google Gemini", si: "googlegemini" },
      { name: "Meta Llama", si: "meta" },
      { name: "Mistral AI", si: "mistralai" },
      { name: "Hugging Face", si: "huggingface" },
      { name: "LangChain", si: "langchain" },
      { name: "LangGraph", si: "langgraph" },
      { name: "Ollama", si: "ollama" },
      { name: "PyTorch", si: "pytorch" },
      { name: "TensorFlow", si: "tensorflow" },
      { name: "scikit-learn", si: "scikitlearn" },
      { name: "Qdrant", si: "qdrant" },
      { name: "Replicate", si: "replicate" },
      { name: "Weights & Biases", si: "weightsandbiases" },
      { name: "Jupyter", si: "jupyter" },
    ],
  },
  {
    id: "languages",
    title: "Programming languages",
    description:
      "From typed front-ends to high-throughput services — we choose the language that fits the problem.",
    items: [
      { name: "JavaScript", si: "javascript" },
      { name: "TypeScript", si: "typescript" },
      { name: "Python", si: "python" },
      { name: "Java", si: "openjdk" },
      { name: "C#", devicon: "csharp/csharp-original" },
      { name: "C++", si: "cplusplus" },
      { name: "C", si: "c" },
      { name: "Golang", si: "go" },
      { name: "Rust", si: "rust" },
      { name: "PHP", si: "php" },
      { name: "Ruby", si: "ruby" },
      { name: "Kotlin", si: "kotlin" },
      { name: "Swift", si: "swift" },
      { name: "Dart", si: "dart" },
      { name: "Scala", si: "scala" },
      { name: "Elixir", si: "elixir" },
      { name: "R", si: "r" },
    ],
  },
  {
    id: "frontend",
    title: "Front-end",
    description:
      "Fast, accessible interfaces with design systems that scale from MVP to enterprise.",
    items: [
      { name: "React", si: "react" },
      { name: "Next.js", si: "nextdotjs" },
      { name: "Vue.js", si: "vuedotjs" },
      { name: "Nuxt", si: "nuxt" },
      { name: "Angular", si: "angular" },
      { name: "Svelte", si: "svelte" },
      { name: "Astro", si: "astro" },
      { name: "Remix", si: "remix" },
      { name: "Tailwind CSS", si: "tailwindcss" },
      { name: "shadcn/ui", si: "shadcnui" },
      { name: "Redux", si: "redux" },
      { name: "Vite", si: "vite" },
      { name: "Three.js", si: "threedotjs" },
      { name: "HTML5", si: "html5" },
      { name: "CSS", si: "css" },
    ],
  },
  {
    id: "backend",
    title: "Back-end & APIs",
    description:
      "Reliable services, clean APIs and event-driven systems built to be maintained by your team later.",
    items: [
      { name: "Node.js", si: "nodedotjs" },
      { name: "NestJS", si: "nestjs" },
      { name: "Express", si: "express" },
      { name: "Fastify", si: "fastify" },
      { name: ".NET", si: "dotnet" },
      { name: "Spring", si: "spring" },
      { name: "Django", si: "django" },
      { name: "FastAPI", si: "fastapi" },
      { name: "Flask", si: "flask" },
      { name: "Laravel", si: "laravel" },
      { name: "Rails", si: "rubyonrails" },
      { name: "GraphQL", si: "graphql" },
      { name: "tRPC", si: "trpc" },
      { name: "Bun", si: "bun" },
      { name: "Deno", si: "deno" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    description:
      "Native and cross-platform apps that feel at home on every device and pass store review first time.",
    items: [
      { name: "iOS", si: "apple" },
      { name: "Android", si: "android" },
      { name: "React Native", si: "react" },
      { name: "Expo", si: "expo" },
      { name: "Flutter", si: "flutter" },
      { name: "Jetpack Compose", si: "jetpackcompose" },
      { name: "Ionic", si: "ionic" },
      { name: "Capacitor", si: "capacitor" },
    ],
  },
  {
    id: "data",
    title: "Databases & data",
    description:
      "Relational, document, search and vector stores — modelled for the queries your product actually runs.",
    items: [
      { name: "PostgreSQL", si: "postgresql" },
      { name: "MySQL", si: "mysql" },
      { name: "SQL Server", devicon: "microsoftsqlserver/microsoftsqlserver-original" },
      { name: "MongoDB", si: "mongodb" },
      { name: "Redis", si: "redis" },
      { name: "SQLite", si: "sqlite" },
      { name: "Supabase", si: "supabase" },
      { name: "Firebase", si: "firebase" },
      { name: "DynamoDB", devicon: "dynamodb/dynamodb-original" },
      { name: "Elasticsearch", si: "elasticsearch" },
      { name: "Cassandra", si: "apachecassandra" },
      { name: "Neo4j", si: "neo4j" },
      { name: "ClickHouse", si: "clickhouse" },
      { name: "Snowflake", si: "snowflake" },
      { name: "Prisma", si: "prisma" },
      { name: "Drizzle", si: "drizzle" },
      { name: "pandas", si: "pandas" },
      { name: "NumPy", si: "numpy" },
    ],
  },
  {
    id: "cloud-devops",
    title: "Cloud & DevOps",
    description:
      "Infrastructure as code, CI/CD and observability so releases are boring — in the best way.",
    items: [
      { name: "AWS", devicon: "amazonwebservices/amazonwebservices-original-wordmark" },
      { name: "Google Cloud", si: "googlecloud" },
      { name: "Azure", devicon: "azure/azure-original" },
      { name: "Vercel", si: "vercel" },
      { name: "Cloudflare", si: "cloudflare" },
      { name: "Netlify", si: "netlify" },
      { name: "DigitalOcean", si: "digitalocean" },
      { name: "Docker", si: "docker" },
      { name: "Kubernetes", si: "kubernetes" },
      { name: "Terraform", si: "terraform" },
      { name: "GitHub Actions", si: "githubactions" },
      { name: "GitLab CI", si: "gitlab" },
      { name: "Jenkins", si: "jenkins" },
      { name: "Ansible", si: "ansible" },
      { name: "Nginx", si: "nginx" },
      { name: "Linux", si: "linux" },
    ],
  },
  {
    id: "testing",
    title: "Testing & quality",
    description:
      "Automated tests, error tracking and API tooling that keep velocity high without breaking things.",
    items: [
      { name: "Jest", si: "jest" },
      { name: "Vitest", si: "vitest" },
      { name: "Playwright", devicon: "playwright/playwright-original" },
      { name: "Cypress", si: "cypress" },
      { name: "Testing Library", si: "testinglibrary" },
      { name: "Selenium", si: "selenium" },
      { name: "Storybook", si: "storybook" },
      { name: "ESLint", si: "eslint" },
      { name: "Sentry", si: "sentry" },
      { name: "Postman", si: "postman" },
    ],
  },
  {
    id: "platforms",
    title: "Commerce, CMS & integrations",
    description:
      "Payments, auth, content and automation platforms we plug in so you don't rebuild solved problems.",
    items: [
      { name: "Stripe", si: "stripe" },
      { name: "Shopify", si: "shopify" },
      { name: "WordPress", si: "wordpress" },
      { name: "Webflow", si: "webflow" },
      { name: "Contentful", si: "contentful" },
      { name: "Sanity", si: "sanity" },
      { name: "Strapi", si: "strapi" },
      { name: "Auth0", si: "auth0" },
      { name: "Clerk", si: "clerk" },
      { name: "Algolia", si: "algolia" },
      { name: "Mapbox", si: "mapbox" },
      { name: "Resend", si: "resend" },
      { name: "HubSpot", si: "hubspot" },
      { name: "Zapier", si: "zapier" },
      { name: "n8n", si: "n8n" },
    ],
  },
  {
    id: "product-design",
    title: "Design & product",
    description:
      "The tools we use to design, plan and measure — shared openly with your team from day one.",
    items: [
      { name: "Figma", si: "figma" },
      { name: "Framer", si: "framer" },
      { name: "Notion", si: "notion" },
      { name: "Jira", si: "jira" },
      { name: "Linear", si: "linear" },
      { name: "Miro", si: "miro" },
      { name: "PostHog", si: "posthog" },
      { name: "Mixpanel", si: "mixpanel" },
      { name: "Google Analytics", si: "googleanalytics" },
    ],
  },
];

/** Unique technology count across all categories (React Native etc. counted once). */
export const technologyCount = new Set(
  technologyCategories.flatMap((c) => c.items.map((t) => t.name)),
).size;

/** Words shown in the two home-page marquee rows. */
export const marqueeRows: string[][] = [
  [
    ".NET",
    "Python",
    "C#",
    "Rails",
    "Node.js",
    "Java",
    "React",
    "Claude Code",
    "TypeScript",
    "Next.js",
    "Cursor",
    "Kotlin",
  ],
  [
    "Vue.js",
    "C++",
    "JavaScript",
    "Swift",
    "Angular",
    "PHP",
    "Android",
    "iOS",
    "Golang",
    "GitHub Copilot",
    "Flutter",
    "React Native",
    "AWS",
  ],
];

const byName = new Map(
  technologyCategories.flatMap((c) => c.items.map((t) => [t.name, t] as const)),
);

export function findTechnology(name: string): Technology | undefined {
  return byName.get(name);
}
