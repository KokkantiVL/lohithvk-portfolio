"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experiences, type ExperienceType } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const viewport = { once: true, margin: "-60px" };

const BADGE_STYLES: Record<string, string> = {
  Industry: "border-white/20 text-white/60",
  Research: "border-white/10 text-white/40",
};

function ExperienceCard({
  exp,
  index,
}: {
  exp: ExperienceType;
  index: number;
}) {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group border border-border-dim hover:border-border-mid bg-surface hover:bg-surface-2 transition-all duration-300"
    >
      {/* Header */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full text-left p-6 flex items-start justify-between gap-4"
        aria-expanded={expanded}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span
              className={`text-[10px] font-mono tracking-widest uppercase border px-2 py-0.5 ${
                BADGE_STYLES[exp.badge] ?? "border-white/10 text-white/40"
              }`}
            >
              {exp.badge}
            </span>
            <span className="text-xs font-mono text-muted">{exp.period}</span>
          </div>

          <h3 className="text-primary font-semibold text-base sm:text-lg leading-snug">
            {exp.role}
          </h3>

          <div className="flex flex-wrap items-center gap-1.5 mt-1">
            <span className="text-secondary text-sm">{exp.company}</span>
            {exp.client && (
              <>
                <span className="text-muted text-xs font-mono">·</span>
                <span className="text-xs font-mono text-muted">{exp.client}</span>
              </>
            )}
            <span className="text-muted text-xs font-mono">·</span>
            <span className="text-xs text-muted">{exp.location}</span>
          </div>
        </div>

        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 mt-1 text-muted group-hover:text-secondary transition-colors"
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-border-dim pt-5">
              <ul className="space-y-3 mb-5">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-muted font-mono text-sm mt-0.5 shrink-0">→</span>
                    <span className="text-secondary text-sm leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border-dim">
                {exp.tech.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative py-28 border-t border-border-dim bg-bg"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="font-mono text-xs text-muted tracking-[0.2em] uppercase">
            02 — Experience
          </span>
          <div className="flex-1 h-px bg-border-dim" />
        </motion.div>

        {/* Timeline line + cards */}
        <div className="flex gap-8">
          {/* Vertical timeline */}
          <div className="hidden sm:block relative w-px shrink-0 ml-3">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={viewport}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="absolute top-0 left-0 w-full bg-border-mid origin-top"
              style={{ height: "100%" }}
            />
          </div>

          {/* Cards */}
          <div className="flex-1 space-y-3">
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
