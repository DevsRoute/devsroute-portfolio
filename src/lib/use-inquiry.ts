"use client";

import { useState } from "react";

import { trackContactSubmit } from "@/lib/analytics/track";

export type InquiryPayload = {
  name: string;
  email: string;
  message?: string;
  company?: string;
  budget?: string;
  timeline?: string;
  service?: string;
  /** Honeypot — must stay empty for real visitors. */
  website?: string;
};

type Status = "idle" | "loading" | "success" | "error";

/**
 * Sends a form to /api/contact. When the server has no email provider configured
 * it returns a mailto fallback, which opens the visitor's email app instead.
 */
export function useInquiry(page: string) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function submit(payload: InquiryPayload): Promise<boolean> {
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, page }),
      });
      const data = (await res.json()) as {
        error?: string;
        mode?: string;
        mailto?: { to: string; subject: string; body: string };
      };

      if (!res.ok) {
        setStatus("error");
        setError(data.error ?? "Something went wrong. Please email us directly.");
        return false;
      }

      trackContactSubmit(page);

      if (data.mode === "mailto" && data.mailto) {
        window.location.href = `mailto:${data.mailto.to}?subject=${encodeURIComponent(
          data.mailto.subject,
        )}&body=${encodeURIComponent(data.mailto.body)}`;
      }

      setStatus("success");
      return true;
    } catch {
      setStatus("error");
      setError("Network error. Please email us directly.");
      return false;
    }
  }

  return { status, error, submit };
}
