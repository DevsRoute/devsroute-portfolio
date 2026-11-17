import { NextResponse } from "next/server";

import { siteFacts } from "@/config/site-facts";
import { guardJsonPost, multiLine, singleLine } from "@/lib/api-guard";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
  budget?: unknown;
  timeline?: unknown;
  service?: unknown;
  page?: unknown;
  website?: unknown; // honeypot
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  const guarded = await guardJsonPost(request, {
    name: "contact",
    limit: 5,
    windowMs: 10 * 60 * 1000,
    maxBodyBytes: 16 * 1024,
  });
  if ("error" in guarded) return guarded.error;

  const body = guarded.body as ContactPayload;
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot — bots fill this; humans leave empty
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = singleLine(body.name, 121);
  const email = singleLine(body.email, 201);
  const company = singleLine(body.company, 160);
  const message = multiLine(body.message);
  const budget = singleLine(body.budget, 80);
  const timeline = singleLine(body.timeline, 80);
  const service = singleLine(body.service, 120);
  // Which form sent this — only accept simple site paths.
  const pageRaw = singleLine(body.page, 80);
  const page = /^\/[\w\-/#]*$/.test(pageRaw) ? pageRaw : "";

  if (!name || name.length > 120) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!email || !isValidEmail(email) || email.length > 200) {
    return NextResponse.json({ error: "Valid work email is required." }, { status: 400 });
  }
  // Message is optional on the short homepage/service forms; the /contact page requires it.
  if (page === "/contact" && message.length < 10) {
    return NextResponse.json(
      { error: "Please describe what you’re building (at least a short paragraph)." },
      { status: 400 },
    );
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const text = [
    `New inquiry from ${name}`,
    `Email: ${email}`,
    `Company: ${company || "—"}`,
    `Budget: ${budget || "—"}`,
    `Timeline: ${timeline || "—"}`,
    ...(service ? [`Service: ${service}`] : []),
    `Sent from: ${page || "website"}`,
    "",
    "What they're building:",
    message || "—",
  ].join("\n");

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || siteFacts.email;
  const from =
    process.env.CONTACT_FROM_EMAIL || "DevsRoute Website <onboarding@resend.dev>";

  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: email,
          subject: `Project inquiry — ${name}${service ? ` (${service})` : ""}`,
          text,
        }),
        signal: AbortSignal.timeout(10_000),
      });

      if (!res.ok) {
        // Log status only — never log the visitor's message or provider response body.
        console.error("Resend error", res.status);
        return NextResponse.json(
          { error: "Could not send message. Email us directly." },
          { status: 502 },
        );
      }
    } catch {
      console.error("Resend request failed");
      return NextResponse.json(
        { error: "Could not send message. Email us directly." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, mode: "email" });
  }

  // Fallback when email provider is not configured — client can mailto
  return NextResponse.json({
    ok: true,
    mode: "mailto",
    mailto: {
      to: siteFacts.email,
      subject: `Project inquiry — ${name}`,
      body: text,
    },
  });
}
