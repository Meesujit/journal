"use client";

import { useRef, useState, type ComponentRef } from "react";
import { createAvatar } from "@bible-strong/avatar-react";
import avatarJson from "@/src/content/avatar/sujit.avatar.json";
import { MessageCircle, X, Send } from "lucide-react";

const SujitAvatar = createAvatar(avatarJson);

type Message = { role: "user" | "assistant"; content: string };

const MAX_TURNS = 8;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "thinking" | "error">("idle");
  const avatarRef = useRef<ComponentRef<typeof SujitAvatar>>(null);

  async function send() {
    const text = input.trim();
    if (!text || status === "thinking") return;
    if (messages.length >= MAX_TURNS * 2) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "That's a good stopping point for this conversation — feel free to reach out directly at sujit.gda997@gmail.com for anything else." },
      ]);
      return;
    }

    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setStatus("thinking");
    avatarRef.current?.play("thinking");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await res.json().catch(() => ({ error: "bad response" }))) as {
        reply?: string;
        error?: string;
      };
      if (!res.ok || !data.reply) {
        throw new Error(data.error ?? "request failed");
      }
      setMessages((m) => [...m, { role: "assistant", content: data.reply! }]);
      setStatus("idle");
      avatarRef.current?.play("talking");
      setTimeout(() => avatarRef.current?.play("idle"), 1800);
    } catch (err) {
      const message =
        err instanceof Error && err.message === "Assistant is not configured yet."
          ? err.message
          : "Something went wrong reaching the assistant — try again in a moment.";
      setMessages((m) => [...m, { role: "assistant", content: message }]);
      setStatus("error");
      avatarRef.current?.play("idle");
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[480px] w-[320px] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <span className="text-sm font-semibold">Ask about Sujit</span>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-3">
            {messages.length === 0 && (
              <p className="text-sm text-zinc-500">
                Hi — ask me about Sujit&apos;s projects, stack, or experience.
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-blue-600 text-white"
                    : "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100"
                }`}
              >
                {m.content}
              </div>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 border-t border-zinc-200 px-3 py-2 dark:border-zinc-800"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, 500))}
              placeholder="Ask a question…"
              className="flex-1 bg-transparent text-sm outline-none"
              disabled={status === "thinking"}
            />
            <button type="submit" aria-label="Send" disabled={status === "thinking"}>
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xl ring-1 ring-zinc-200 transition-transform hover:scale-105 dark:bg-zinc-900 dark:ring-zinc-800"
      >
        {open ? (
          <MessageCircle className="h-6 w-6 text-zinc-500" />
        ) : (
          <SujitAvatar ref={avatarRef} defaultAnimation="idle" size={48} ariaLabel="Chat with Sujit's assistant" />
        )}
      </button>
    </div>
  );
}
