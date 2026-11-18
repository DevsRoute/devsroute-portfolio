/*
 * Photography: Unsplash (free under the Unsplash License, no attribution required).
 *  ai-assistants.jpg  — BaljkanN4         unsplash.com/photos/wnpf3Q5pkXA
 *  ai-agents.jpg      — Annie Spratt      unsplash.com/photos/dWYU3i-mqEo
 *  ai-knowledge.jpg   — SumUp             unsplash.com/photos/YDe0nOZyLHI
 *  ai-documents.jpg   — Kelly Sikkema     unsplash.com/photos/0oZpRxG5Hkk
 *  ai-engineering.jpg — Compagnons        unsplash.com/photos/Im_cQ6hQo10
 */

export type AiCapabilityId = "assistants" | "agents" | "rag" | "automation";

export type AiCapability = {
  id: AiCapabilityId;
  title: string;
  summary: string;
  points: string[];
  image: string;
  imageAlt: string;
  /** Object position for the photo crop. */
  focus?: string;
};

export const aiCapabilities: AiCapability[] = [
  {
    id: "assistants",
    title: "AI assistants & copilots",
    summary:
      "In-app assistants that answer from your product data and take actions for the user, so support tickets drop instead of piling up.",
    points: ["Grounded in your data", "Calls your APIs", "Hands off to a human"],
    image: "/brand/ai/ai-assistants.jpg",
    imageAlt: "Support specialist with a headset smiling at her desk",
    focus: "70% 40%",
  },
  {
    id: "agents",
    title: "AI agents & workflows",
    summary:
      "Multi-step agents that handle support, ops and back-office tasks, with a person approving anything risky.",
    points: ["Tool use & planning", "Human approval steps", "Full audit trail"],
    image: "/brand/ai/ai-agents.jpg",
    imageAlt: "Operations team working on laptops around a shared table",
    focus: "50% 45%",
  },
  {
    id: "rag",
    title: "RAG & knowledge search",
    summary:
      "Answers from your docs, tickets and databases, with citations your users can check in one click.",
    points: ["Hybrid search", "Source citations", "Permission-aware"],
    image: "/brand/ai/ai-knowledge.jpg",
    imageAlt: "Person comparing paper documents with a web app on a laptop",
    focus: "55% 50%",
  },
  {
    id: "automation",
    title: "Document & data automation",
    summary:
      "Classify, extract and summarise invoices, forms and emails, so your team stops copy-pasting between tools.",
    points: ["Structured extraction", "Confidence scores", "Fits existing tools"],
    image: "/brand/ai/ai-documents.jpg",
    imageAlt: "Hands reviewing a tax form next to a calculator and coffee",
    focus: "55% 50%",
  },
];

export const aiPrinciples = [
  {
    title: "Model-agnostic",
    body: "Claude, GPT, Gemini or open-source Llama, chosen per feature on quality, cost and latency.",
  },
  {
    title: "Evals before launch",
    body: "We test against real examples from your product, so quality is measured, not guessed.",
  },
  {
    title: "Your data stays yours",
    body: "PII redaction, no-training provider settings, and your own cloud when compliance needs it.",
  },
  {
    title: "Fixed scope, real end date",
    body: "One shippable AI feature, an agreed scope and a defined end date, then a clean handover.",
  },
] as const;
