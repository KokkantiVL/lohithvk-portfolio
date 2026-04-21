"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Terminal, Minimize2 } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Types
───────────────────────────────────────────────────────────── */
type Role = "assistant" | "user";

interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
}

/* ─────────────────────────────────────────────────────────────
   Seed messages shown on first open
───────────────────────────────────────────────────────────── */
const SEED_MESSAGES: Message[] = [
  {
    id: "seed-1",
    role: "assistant",
    content:
      "Hey — I'm Lohith's digital twin. Ask me about his work, the systems he's built, or what he's currently working on. Just please, no LeetCode Hards.",
    timestamp: new Date(),
  },
  {
    id: "seed-2",
    role: "assistant",
    content:
      "Try: \"What did you do at Accenture?\" or \"Tell me about your Redis project.\"",
    timestamp: new Date(),
  },
];

/* ─────────────────────────────────────────────────────────────
   Helpers
───────────────────────────────────────────────────────────── */
function formatTime(d: Date) {
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-1.5 h-1.5 rounded-full bg-secondary"
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -3, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isAssistant = msg.role === "assistant";
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-1 ${isAssistant ? "items-start" : "items-end"}`}
    >
      {isAssistant && (
        <span className="text-[10px] font-mono text-muted ml-1 tracking-wide">
          lk.ai
        </span>
      )}
      <div
        className={`max-w-[85%] px-3 py-2 text-sm leading-relaxed font-mono ${
          isAssistant
            ? "bg-surface-2 border border-border-dim text-secondary"
            : "bg-white/5 border border-white/10 text-primary"
        }`}
      >
        {isAssistant && (
          <span className="text-muted mr-1.5 select-none">{">"}</span>
        )}
        {msg.content}
      </div>
      <span className="text-[10px] font-mono text-muted/50 px-1">
        {formatTime(msg.timestamp)}
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────────── */
export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Scroll to bottom on new messages */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* Focus input when opened */
  useEffect(() => {
    if (open && !minimized) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, minimized]);

  const openChat = () => {
    setOpen(true);
    setMinimized(false);
    if (!hasOpened) setHasOpened(true);
  };

  /* ── Send handler — wire your backend here ── */
  const handleSend = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    /*
     * ──────────────────────────────────────────────────
     * TODO: Replace this placeholder with your RAG call
     *
     *   const res = await fetch("/api/chat", {
     *     method: "POST",
     *     body: JSON.stringify({ message: text }),
     *   });
     *   const { reply } = await res.json();
     *
     * ──────────────────────────────────────────────────
     */
    await new Promise((r) => setTimeout(r, 1400));

    const botMsg: Message = {
      id: `bot-${Date.now()}`,
      role: "assistant",
      content:
        "I'm not wired up yet — Lohith is still plugging in the backend. Check back soon, or reach out to him directly on LinkedIn.",
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, botMsg]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* ── Floating trigger button ── */}
      <AnimatePresence>
        {(!open || minimized) && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={openChat}
            className="fixed bottom-6 right-6 z-50 group w-14 h-14 bg-surface border border-border-mid flex items-center justify-center hover:bg-surface-2 hover:border-muted transition-all duration-200 shadow-2xl"
            aria-label="Open AI assistant"
          >
            <Terminal
              size={20}
              className="text-secondary group-hover:text-primary transition-colors"
            />

            {/* Pulsing ring */}
            <span className="absolute inset-0 rounded-none">
              <motion.span
                className="absolute inset-0 border border-white/10"
                animate={{ scale: [1, 1.3, 1.3], opacity: [0.4, 0, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
              />
            </span>

            {/* Unread dot */}
            {!hasOpened && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full" />
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {open && !minimized && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[360px] sm:w-[400px] flex flex-col border border-border-mid bg-[#0a0a0a] shadow-2xl"
            style={{ height: "520px" }}
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border-dim bg-surface shrink-0">
              <div className="flex items-center gap-2.5">
                {/* Online indicator */}
                <div className="relative flex">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-white opacity-10" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white/40" />
                </div>

                <div>
                  <p className="text-xs font-mono text-primary tracking-wide">
                    lk.ai
                  </p>
                  <p className="text-[10px] font-mono text-muted">
                    Lohith&apos;s digital twin · RAG-powered
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setMinimized(true)}
                  className="p-1.5 text-muted hover:text-secondary transition-colors"
                  aria-label="Minimize"
                >
                  <Minimize2 size={13} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-1.5 text-muted hover:text-secondary transition-colors"
                  aria-label="Close"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            {/* ── Scan line effect ── */}
            <div className="relative flex-1 overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none z-10 opacity-[0.02]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 4px)",
                }}
                aria-hidden="true"
              />

              {/* ── Messages ── */}
              <div className="h-full overflow-y-auto px-4 py-4 space-y-4 scrollbar-hide">
                {/* Prompt prefix header */}
                <div className="font-mono text-[10px] text-muted/50 select-none">
                  lk@portfolio:~$ ./chat --model rag-twin
                </div>

                {messages.map((msg) => (
                  <MessageBubble key={msg.id} msg={msg} />
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-start gap-1"
                  >
                    <span className="text-[10px] font-mono text-muted ml-1">
                      lk.ai
                    </span>
                    <div className="bg-surface-2 border border-border-dim">
                      <TypingIndicator />
                    </div>
                  </motion.div>
                )}

                <div ref={bottomRef} />
              </div>
            </div>

            {/* ── Input ── */}
            <div className="flex items-center gap-0 border-t border-border-dim bg-surface shrink-0">
              <span className="px-3 text-xs font-mono text-muted select-none shrink-0">
                $
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent py-3.5 pr-2 text-sm font-mono text-primary placeholder:text-muted/50 focus:outline-none"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="px-4 py-3.5 text-muted hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-150 border-l border-border-dim hover:bg-surface-2"
                aria-label="Send message"
              >
                <Send size={13} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
