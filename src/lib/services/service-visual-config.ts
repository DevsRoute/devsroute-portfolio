import type { ServiceVisualType } from "@/components/services/ServiceMockups";

export type ServiceBuildItem = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type ServiceIndustryBlock = {
  name: string;
  description: string;
  image: string;
  imageAlt: string;
};

/** Only industries with real project work behind them — shared by every service page. */
const realIndustryBlocks: ServiceIndustryBlock[] = [
      {
        name: "Real Estate & Construction",
        description: "Marketplaces and websites for real estate, building permits and home building.",
        image: "/work/edge-home-builders/home.webp",
        imageAlt: "Edge Home Builders website home page",
      },
      {
        name: "Education",
        description: "Peer-tutoring and education marketplaces.",
        image: "/work/tutor-edge/home.webp",
        imageAlt: "Tutor-Edge peer-tutoring marketplace home page",
      },
      {
        name: "Sales & AI Platforms",
        description: "Payments, back-end development and AI features (RAG, LLMs) for sales platforms.",
        image: "/work/success-ai/home.webp",
        imageAlt: "Success.ai home page",
      },
      {
        name: "Healthcare",
        description: "Software for healthcare products.",
        image: "/brand/industries/healthtech-care.jpg",
        imageAlt: "Healthcare app shown across laptop, phone, and smartwatch",
      },
    ];

export type ServiceVisualConfig = {
  visualType: ServiceVisualType;
  heroTone: "tint" | "white";
  intro: {
    image: string;
    imageAlt: string;
    reverse?: boolean;
  };
  visualBreak: {
    image: string;
    imageAlt: string;
    caption?: string;
  };
  buildItems: ServiceBuildItem[];
  industryBlocks: ServiceIndustryBlock[];
  projectIds: string[];
  showAiFlow?: boolean;
};

export const serviceVisualConfig: Record<string, ServiceVisualConfig> = {
  "custom-software-development": {
    visualType: "custom-software",
    heroTone: "tint",
    intro: {
      image: "/brand/services/custom-software-v2.jpg",
      imageAlt: "Custom software workspace for a business product",
    },
    visualBreak: {
      image: "/brand/projects/fleetcore.jpg",
      imageAlt: "Operations dashboard for custom business software platform",
      caption: "Custom platforms built around real operational workflows.",
    },
    buildItems: [
      {
        title: "Business Dashboards",
        description: "Operational visibility with KPIs, reporting, and role-based views.",
        image: "/brand/projects/flowdesk.jpg",
        imageAlt: "Business dashboard interface preview",
      },
      {
        title: "Internal Tools",
        description: "Workflow systems that help teams manage work more efficiently.",
        image: "/brand/projects/fleetcore.jpg",
        imageAlt: "Internal operations tool interface preview",
      },
      {
        title: "Customer Portals",
        description: "Self-service experiences for clients, partners, and end users.",
        image: "/brand/projects/havenhome.jpg",
        imageAlt: "Customer portal interface preview",
      },
      {
        title: "SaaS Platforms",
        description: "Subscription products designed to scale with your business.",
        image: "/brand/projects/northpeak.jpg",
        imageAlt: "SaaS platform dashboard preview",
      },
    ],
    industryBlocks: realIndustryBlocks,
    projectIds: ["flowdesk", "fleetcore", "northpeak"],
  },
  "web-application-development": {
    visualType: "web-applications",
    heroTone: "tint",
    intro: {
      image: "/brand/services/web-applications-v2.jpg",
      imageAlt: "Web application development workspace",
      reverse: true,
    },
    visualBreak: {
      image: "/brand/services/web-applications.jpg",
      imageAlt: "Web application interface on a laptop screen",
      caption: "Web applications designed for performance, clarity, and scale.",
    },
    buildItems: [
      {
        title: "SaaS Applications",
        description: "Subscription products with dashboards, billing, and user management.",
        image: "/brand/industries/saas-mvp.jpg",
        imageAlt: "SaaS application visual",
      },
      {
        title: "Customer Portals",
        description: "Secure web experiences for clients and account management.",
        image: "/brand/projects/havenhome.jpg",
        imageAlt: "Customer portal interface preview",
      },
      {
        title: "Marketplaces",
        description: "Platforms that connect buyers, sellers, and service providers.",
        image: "/brand/industries/ecommerce-shop.jpg",
        imageAlt: "Marketplace platform visual",
      },
      {
        title: "Business Platforms",
        description: "Operational web apps for teams, workflows, and reporting.",
        image: "/brand/projects/flowdesk.jpg",
        imageAlt: "Business platform dashboard preview",
      },
    ],
    industryBlocks: realIndustryBlocks,
    projectIds: ["flowdesk", "marketly", "northpeak"],
  },
  "mobile-app-development": {
    visualType: "mobile-apps",
    heroTone: "tint",
    intro: {
      image: "/brand/services/mobile-apps.jpg",
      imageAlt: "Mobile app development workspace",
    },
    visualBreak: {
      image: "/brand/projects/caresync.jpg",
      imageAlt: "Healthcare mobile application interface showcase",
      caption: "Mobile products designed for clarity, speed, and repeat usage.",
    },
    buildItems: [
      {
        title: "Customer Apps",
        description: "Consumer-facing mobile experiences with polished onboarding and UX.",
        image: "/brand/industries/on-demand.jpg",
        imageAlt: "Customer mobile app preview",
      },
      {
        title: "Business Apps",
        description: "Mobile tools for your team's internal workflows.",
        image: "/brand/projects/fleetcore.jpg",
        imageAlt: "Business mobile app preview",
      },
      {
        title: "Marketplace Apps",
        description: "Mobile apps that connect buyers, sellers and service providers.",
        image: "/brand/projects/havenhome.jpg",
        imageAlt: "Marketplace mobile app preview",
      },
      {
        title: "SaaS Mobile Apps",
        description: "Companion apps that extend web products into mobile workflows.",
        image: "/brand/projects/caresync.jpg",
        imageAlt: "SaaS mobile app preview",
      },
    ],
    industryBlocks: realIndustryBlocks,
    projectIds: ["caresync", "marketly", "fleetcore"],
  },
  "ai-solutions": {
    visualType: "ai-solutions",
    heroTone: "tint",
    intro: {
      image: "/brand/industries/ai-powered-products.png",
      imageAlt: "AI-native product dashboard with chatbots and automation features",
      reverse: true,
    },
    visualBreak: {
      image: "/brand/services/ai-solutions-v2.jpg",
      imageAlt: "AI solutions development visual",
      caption: "Practical AI features integrated into real product workflows.",
    },
    buildItems: [
      {
        title: "AI Assistants",
        description: "In-product assistants that help users complete tasks faster.",
        image: "/brand/ai/ai-assistants.jpg",
        imageAlt: "AI assistant visual",
      },
      {
        title: "Intelligent Search",
        description: "Search across documents, data, and product content.",
        image: "/brand/ai/ai-knowledge.jpg",
        imageAlt: "AI knowledge search visual",
      },
      {
        title: "Workflow Automation",
        description: "Automated routing, classification, and repetitive task handling.",
        image: "/brand/projects/flowdesk.jpg",
        imageAlt: "Operations dashboard for routing and workflow automation",
      },
      {
        title: "Document Processing",
        description: "Extract, summarize, and organize business documents at scale.",
        image: "/brand/ai/ai-documents.jpg",
        imageAlt: "AI document processing visual",
      },
    ],
    industryBlocks: realIndustryBlocks,
    projectIds: ["flowdesk", "northpeak", "caresync"],
    showAiFlow: true,
  },
  "ui-ux-design": {
    visualType: "ui-ux-design",
    heroTone: "tint",
    intro: {
      image: "/brand/services/ui-ux-design-v2.jpg",
      imageAlt: "Product design workspace with interface screens and components",
    },
    visualBreak: {
      image: "/brand/projects/havenhome.jpg",
      imageAlt: "Polished property platform interface design showcase",
      caption: "Design systems and interfaces that feel clear from the first screen.",
    },
    buildItems: [
      {
        title: "SaaS Product Design",
        description: "Dashboards and flows designed for clarity and adoption.",
        image: "/brand/projects/flowdesk.jpg",
        imageAlt: "SaaS product design preview",
      },
      {
        title: "Web App UI",
        description: "Responsive interfaces for complex business applications.",
        image: "/brand/projects/northpeak.jpg",
        imageAlt: "Web application UI design preview",
      },
      {
        title: "Mobile App Design",
        description: "Native-feeling mobile experiences with strong hierarchy.",
        image: "/brand/projects/caresync.jpg",
        imageAlt: "Mobile app UI design preview",
      },
      {
        title: "Design Systems",
        description: "Reusable components and patterns for scalable product teams.",
        image: "/brand/projects/havenhome.jpg",
        imageAlt: "Product screens composed from a shared design system",
      },
    ],
    industryBlocks: realIndustryBlocks,
    projectIds: ["havenhome", "flowdesk", "marketly"],
  },
  "cloud-devops": {
    visualType: "cloud-devops",
    heroTone: "tint",
    intro: {
      image: "/brand/services/cloud-devops-v2.jpg",
      imageAlt: "Cloud infrastructure and deployment engineering visual",
      reverse: true,
    },
    visualBreak: {
      image: "/brand/projects/fleetcore.jpg",
      imageAlt: "Operations monitoring dashboard for cloud-hosted applications",
      caption: "Infrastructure and delivery workflows built for reliability at scale.",
    },
    buildItems: [
      {
        title: "Cloud Infrastructure",
        description: "Scalable environments designed for production workloads.",
        image: "/brand/industries/logistics-shipping.jpg",
        imageAlt: "Operations environment for a cloud-hosted product",
      },
      {
        title: "CI/CD Pipelines",
        description: "Automated build, test, and deployment workflows.",
        image: "/brand/projects/flowdesk.jpg",
        imageAlt: "CI/CD pipeline dashboard preview",
      },
      {
        title: "Monitoring",
        description: "Visibility into uptime, performance, and production health.",
        image: "/brand/projects/fleetcore.jpg",
        imageAlt: "Application monitoring dashboard preview",
      },
      {
        title: "Cloud Migration",
        description: "Move applications to modern infrastructure with less risk.",
        image: "/brand/projects/northpeak.jpg",
        imageAlt: "Cloud migration platform preview",
      },
    ],
    industryBlocks: realIndustryBlocks,
    projectIds: ["fleetcore", "flowdesk", "northpeak"],
  },
};

export function getServiceVisualConfig(slug: string) {
  return serviceVisualConfig[slug];
}
