"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { projects, type ProjectType } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const viewport = { once: true, margin: "-60px" };

function ProjectCard({
  project,
  index,
}: {
  project: ProjectType;
  index: number;
}) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{
        duration: 0.65,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col border border-border-dim bg-surface hover:bg-surface-2 hover:border-border-mid transition-all duration-300 overflow-hidden"
    >
      {/* Animated top-border reveal on hover */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="p-6 flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <p className="text-xs font-mono text-muted tracking-widest uppercase mb-2">
              Project
            </p>
            <h3 className="text-primary font-bold text-lg leading-tight">
              {project.name}
            </h3>
            <p className="text-secondary text-xs font-mono mt-1">
              {project.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 mt-1">
            {project.github && project.github !== "#" ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-muted hover:text-primary border border-border-dim hover:border-border-mid transition-all duration-200"
                aria-label={`GitHub: ${project.name}`}
              >
                <Github size={14} />
              </a>
            ) : (
              <span
                className="p-1.5 text-muted/30 border border-border-dim/30 cursor-not-allowed"
                title="Private repository"
              >
                <Github size={14} />
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-secondary text-sm leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        {/* Highlights */}
        <div className="space-y-1.5 mb-5">
          {project.highlights.map((h, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-muted shrink-0" />
              <span className="text-xs text-muted font-mono">{h}</span>
            </div>
          ))}
        </div>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border-dim">
          {project.tech.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function GithubCTA() {
  return (
    <motion.a
      href="https://github.com/KokkantiVL"
      target="_blank"
      rel="noopener noreferrer"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col items-center justify-center border border-dashed border-border-mid bg-transparent hover:bg-surface hover:border-muted transition-all duration-300 min-h-[280px] p-6"
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Github
          size={28}
          className="text-muted group-hover:text-secondary transition-colors mb-3"
        />
      </motion.div>
      <p className="text-secondary text-sm font-medium group-hover:text-primary transition-colors">
        More on GitHub
      </p>
      <p className="text-muted text-xs font-mono mt-1">
        github.com/KokkantiVL
        <span className="ml-1 group-hover:translate-x-0.5 inline-block transition-transform">
          ↗
        </span>
      </p>
    </motion.a>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
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
            03 — Projects
          </span>
          <div className="flex-1 h-px bg-border-dim" />
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
          <GithubCTA />
        </div>
      </div>
    </section>
  );
}
