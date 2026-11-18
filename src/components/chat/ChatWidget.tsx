"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChatContext } from "./ChatContext";
import { renderMarkdown } from "./renderMarkdown";

const NUDGE_KEY = "dr-chat-nudge-dismissed";

export function ChatWidget() {
  const { messages, loading, send } = useChatContext();
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [showNudge, setShowNudge] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 80);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Label + arrow beside the launcher, until the visitor hides it or opens chat.
  useEffect(() => {
    if (!visible || open) return;
    let dismissed = false;
    try {
      dismissed = localStorage.getItem(NUDGE_KEY) === "1";
    } catch {}
    if (dismissed) return;
    const t = window.setTimeout(() => setShowNudge(true), 900);
    return () => window.clearTimeout(t);
  }, [visible, open]);

  function dismissNudge() {
    setShowNudge(false);
    try {
      localStorage.setItem(NUDGE_KEY, "1");
    } catch {}
  }

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function handleSend() {
    await send(input);
    setInput("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[480px] w-[340px] flex-col overflow-hidden rounded-2xl border border-[var(--ink-100)] bg-white shadow-2xl sm:w-[380px]">
          {/* Header */}
          <div className="flex items-center justify-between bg-[var(--brand-500)] px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-full bg-white/20">
                <MessageCircle className="size-4 text-white" strokeWidth={2} />
              </span>
              <div>
                <p className="text-[0.8rem] font-semibold leading-none text-white">
                  DevsRoute
                </p>
                <p className="mt-0.5 text-[0.68rem] leading-none text-white/70">
                  Usually replies instantly
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1 text-white/70 transition hover:bg-white/20 hover:text-white"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  m.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                <div
                  className={cn(
                    "max-w-[82%] rounded-2xl px-3.5 py-2.5 leading-relaxed",
                    m.role === "user"
                      ? "bg-[var(--brand-500)] text-white"
                      : "bg-[var(--ink-50)] text-[var(--ink-700)]",
                  )}
                >
                  {m.role === "assistant" ? renderMarkdown(m.content) : m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl bg-[var(--ink-50)] px-3.5 py-2.5">
                  <Loader2 className="size-3.5 animate-spin text-[var(--ink-400)]" />
                  <span className="text-xs text-[var(--ink-400)]">Typing…</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-[var(--ink-100)] bg-white px-3 py-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything…"
                rows={1}
                className="flex-1 resize-none rounded-xl border border-[var(--ink-200)] bg-[var(--ink-50)] px-3 py-2 text-sm text-[var(--ink-700)] placeholder:text-[var(--ink-400)] outline-none focus:border-[var(--brand-400)] focus:bg-white transition"
                style={{ maxHeight: "80px" }}
                disabled={loading}
              />
              <button
                onClick={() => void handleSend()}
                disabled={!input.trim() || loading}
                aria-label="Send message"
                className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-500)] text-white transition hover:bg-[var(--brand-600)] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="size-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[0.65rem] text-[var(--ink-400)]">
              Powered by AI · Answers may not be 100% accurate
            </p>
          </div>
        </div>
      )}

      {/* Toggle button */}
      {open ? (
        <button
          onClick={() => setOpen(false)}
          aria-label="Close chat"
          className="flex size-14 items-center justify-center rounded-full bg-[var(--brand-500)] text-white shadow-lg transition hover:scale-105 hover:bg-[var(--brand-600)] active:scale-95"
        >
          <X className="size-6" />
        </button>
      ) : (
        <div className="relative">
          {showNudge && (
            <div className="chat-nudge-in absolute right-[4.25rem] bottom-[4.75rem] flex items-end">
              <div className="relative flex items-center gap-3 rounded-2xl border border-[var(--ink-100)] bg-white py-2.5 pr-9 pl-3 shadow-[0_16px_36px_-14px_rgb(9_39_73/0.3)]">
                <button
                  onClick={() => {
                    dismissNudge();
                    setOpen(true);
                  }}
                  className="flex items-center gap-3 text-left focus-visible:outline-none"
                  tabIndex={-1}
                  aria-hidden
                >
                  <span className="relative flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-50)]">
                    <Sparkles className="size-4 text-[var(--brand-500)]" />
                    <span className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white bg-emerald-500" />
                  </span>
                  <span className="whitespace-nowrap">
                    <span className="block text-sm leading-5 font-semibold text-[var(--ink-700)]">
                      Ask our AI
                    </span>
                    <span className="block text-xs leading-4 text-[var(--ink-500)]">
                      Replies in seconds
                    </span>
                  </span>
                </button>
                <button
                  onClick={dismissNudge}
                  aria-label="Hide chat label"
                  className="absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-full text-[var(--ink-300)] transition-colors hover:bg-[var(--ink-50)] hover:text-[var(--ink-700)]"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </div>
          )}

          {showNudge && (
            /* hand-drawn arrow from the label into the button */
            <svg
              aria-hidden
              viewBox="0 0 48 44"
              fill="none"
              className="pointer-events-none absolute right-[2.9rem] bottom-[2.6rem] h-12 w-14 text-[var(--brand-500)] [filter:drop-shadow(0_0_2px_rgb(255_255_255/0.95))]"
            >
              <path
                className="chat-arrow-draw"
                d="M6 3 C 6 22, 18 34, 38 37"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                className="chat-arrow-draw [animation-delay:600ms]"
                d="M31 30 L 39 37 L 30 42"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}

          <button
            onClick={() => {
              dismissNudge();
              setOpen(true);
            }}
            aria-label="Open chat — ask our AI"
            className="group relative flex size-14 items-center justify-center rounded-full bg-[var(--brand-500)] text-white shadow-[0_12px_28px_-8px_rgb(29_129_242/0.6)] ring-4 ring-white transition hover:scale-105 hover:bg-[var(--brand-600)] focus-visible:outline-none focus-visible:ring-[var(--brand-200)] active:scale-95"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-[var(--brand-500)] opacity-20 [animation-duration:2.4s] motion-reduce:hidden" />
            <MessageCircle className="relative size-6" strokeWidth={2} />
          </button>
        </div>
      )}
    </div>
  );
}
