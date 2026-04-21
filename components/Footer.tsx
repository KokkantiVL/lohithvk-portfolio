"use client";

import { motion } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import { personalInfo } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border-dim bg-bg py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Left */}
          <div>
            <p className="font-mono text-xs text-muted tracking-widest uppercase mb-2">
              {personalInfo.initials} · {personalInfo.location}
            </p>
            <p className="text-sm text-secondary">
              © {year} {personalInfo.name}.
            </p>
            <p className="text-xs text-muted font-mono mt-1">
              Built with Next.js · Tailwind · Framer Motion
            </p>
          </div>

          {/* Right: links + email */}
          <div className="flex flex-col sm:items-end gap-3">
            <div className="flex items-center gap-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-primary transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
            </div>

            {/* Email — replace with real address */}
            <a
              href="mailto:venkatalohithk.9@gmail.com"
              className="text-xs font-mono text-muted hover:text-secondary transition-colors duration-200 tracking-wide"
            >
              venkatalohithk.9@gmail.com
            </a>
          </div>
        </div>

        {/* Divider + note */}
        <div className="mt-8 pt-6 border-t border-border-dim">
          <p className="text-[11px] font-mono text-muted/50 text-center tracking-wide">
            Designed for systems-thinkers. No unnecessary motion. Every pixel earns its place.
          </p>
        </div>
      </div>
    </footer>
  );
}
