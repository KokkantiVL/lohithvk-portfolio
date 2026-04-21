"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Minimize2, Sparkles } from "lucide-react";

type Role = "assistant" | "user";

interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: Date;
}

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
      'Try: "What did you do at Accenture?" or "Tell me about your Redis project."',
    timestamp: new Date(),
  },
];

function formatTime(d: Date) {
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-3 py-2.5">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block w-2 h-2 rounded-full bg-gray-300"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isAssistant = msg.role === "assistant";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col gap-1 ${isAssistant ? "items-start" : "items-end"}`}
    >
      {isAssistant && (
        <span className="text-[10px] font-mono text-gray-400 ml-1 tracking-wide">
          lk.ai
        </span>
      )}
      <div
        className={`max-w-[85%] px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl ${
          isAssistant
            ? "bg-gray-100 text-gray-800 rounded-tl-sm"
            : "bg-gray-900 text-white rounded-tr-sm"
        }`}
      >
        {msg.content}
      </div>
      <span className="text-[10px] text-gray-400 px-1">
        {formatTime(msg.timestamp)}
      </span>
    </motion.div>
  );
}

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

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

    const botId = `bot-${Date.now()}`;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok || !res.body) throw new Error("API error");

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: botId, role: "assistant", content: "", timestamp: new Date() },
      ]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) =>
            m.id === botId ? { ...m, content: m.content + chunk } : m
          )
        );
      }
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: botId,
          role: "assistant",
          content:
            "Something went wrong on my end. Reach out to Lohith directly at venkatalohithk.9@gmail.com.",
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* ── FAB ── */}
      <AnimatePresence>
        {(!open || minimized) && (
          <motion.button
            key="fab"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            onClick={openChat}
            className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex flex-col items-center gap-1.5 group"
            aria-label="Open AI assistant"
          >
            {/* Button */}
            <div className="relative w-14 h-14 bg-white rounded-2xl shadow-2xl flex items-center justify-center group-hover:shadow-white/20 transition-shadow duration-300">
              <Sparkles size={22} className="text-gray-800" />

              {/* Pulse ring */}
              <motion.span
                className="absolute inset-0 rounded-2xl border-2 border-white"
                animate={{ scale: [1, 1.25, 1.25], opacity: [0.6, 0, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
              />

              {/* Unread dot */}
              {!hasOpened && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-bg" />
              )}
            </div>

            {/* Label */}
            <span className="text-[10px] font-mono text-secondary tracking-widest bg-bg/80 px-2 py-0.5">
              Ask me
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Chat window ── */}
      <AnimatePresence>
        {open && !minimized && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-50 flex flex-col bg-white shadow-2xl rounded-2xl overflow-hidden
                       bottom-20 left-4 right-4 max-h-[70vh]
                       sm:left-auto sm:right-6 sm:w-[400px] sm:max-h-[540px] sm:bottom-24"
          >

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative flex shrink-0">
                  <span className="animate-ping absolute inline-flex h-2.5 w-2.5 rounded-full bg-green-400 opacity-50" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-none">
                    lk.ai
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    Lohith&apos;s digital twin · RAG-powered
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-0.5">
                <button
                  onClick={() => setMinimized(true)}
                  className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Minimize"
                >
                  <Minimize2 size={14} />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* ── Messages ── */}
            <div
              ref={scrollAreaRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-4 overscroll-contain"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-start gap-1"
                >
                  <span className="text-[10px] text-gray-400 ml-1">lk.ai</span>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm">
                    <TypingIndicator />
                  </div>
                </motion.div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* ── Input ── */}
            <div className="flex items-center gap-2 px-3 py-3 border-t border-gray-100 bg-white shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 bg-gray-50 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="w-9 h-9 flex items-center justify-center bg-gray-900 text-white rounded-xl hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150 shrink-0"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
