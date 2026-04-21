"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, FileText, ArrowDown } from "lucide-react";
import { personalInfo } from "@/lib/data";
import ViewerCount from "@/components/ViewerCount";

const TITLES = [
  "Software Engineer",
  "Systems Architect",
  "ML Infrastructure",
  "Backend Craftsman",
];

function useTypewriter(words: string[], pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const speed = deleting ? 40 : 90;

    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else {
          setCharIdx((c) => c + 1);
        }
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx((w) => (w + 1) % words.length);
          setCharIdx(0);
        } else {
          setCharIdx((c) => c - 1);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, pause]);

  return display;
}

/* Animated dot-grid canvas */
function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const spacing = 36;
      const cols = Math.ceil(canvas.width / spacing) + 1;
      const rows = Math.ceil(canvas.height / spacing) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;

          const dx = x - canvas.width / 2;
          const dy = y - canvas.height / 2;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const wave = Math.sin(dist * 0.018 - t * 1.2) * 0.5 + 0.5;
          const alpha = wave * 0.22 + 0.03;

          const r = 1.2 + wave * 0.8;

          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200, 200, 200, ${alpha})`;
          ctx.fill();
        }
      }

      t += 0.015;
      animId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-60"
      aria-hidden="true"
    />
  );
}

/* Floating orbs */
function Orbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)",
        }}
      />
      <motion.div
        animate={{
          x: [0, -50, 40, 0],
          y: [0, 50, -20, 0],
          scale: [1, 0.9, 1.05, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.018) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

const scrollToAbout = () => {
  document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
};

export default function Hero() {
  const typewritten = useTypewriter(TITLES);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-bg">
      <DotGrid />
      <Orbs />

      {/* Vignette edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, #080808 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-24">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-20" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white opacity-60" />
          </span>
          <span className="text-xs font-mono text-secondary tracking-widest uppercase">
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-primary leading-none mb-3"
        >
          Venkata Lohith
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
          className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight gradient-text leading-none mb-8"
        >
          Kokkanti
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="text-xs font-mono text-muted tracking-widest">~/</span>
          <span className="text-lg sm:text-xl font-mono text-secondary min-h-[28px]">
            {typewritten}
            <span className="animate-blink text-secondary">▋</span>
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="max-w-xl text-base sm:text-lg text-secondary leading-relaxed mb-10"
        >
          {personalInfo.tagline}
        </motion.p>

        {/* CTA Links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.15 }}
          className="flex flex-wrap items-center gap-4"
        >
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-2.5 bg-surface border border-border-mid text-primary text-sm font-medium hover:bg-surface-2 hover:border-muted transition-all duration-200"
          >
            <Github size={15} />
            GitHub
            <span className="text-muted group-hover:text-secondary transition-colors ml-1">↗</span>
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-2.5 bg-surface border border-border-mid text-primary text-sm font-medium hover:bg-surface-2 hover:border-muted transition-all duration-200"
          >
            <Linkedin size={15} />
            LinkedIn
            <span className="text-muted group-hover:text-secondary transition-colors ml-1">↗</span>
          </a>

          <button
            disabled
            className="group flex items-center gap-2 px-5 py-2.5 border border-border-dim text-muted text-sm font-medium cursor-not-allowed select-none"
            title="Resume coming soon"
          >
            <FileText size={15} />
            Resume
            <span className="text-xs font-mono text-muted/60 ml-1">(soon)</span>
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-border-dim"
        >
          {[
            { value: "3+", label: "Years Industry" },
            { value: "50M+", label: "Users Served" },
            { value: "1M+", label: "Events/Day" },
            { value: "3.80", label: "M.S. GPA" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-primary tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs font-mono text-secondary tracking-widest uppercase">
                {stat.label}
              </span>
            </div>
          ))}
          <ViewerCount />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-secondary transition-colors duration-200 group"
        aria-label="Scroll down"
      >
        <span className="text-xs font-mono tracking-widest">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.button>
    </section>
  );
}
