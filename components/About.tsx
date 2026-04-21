"use client";

import { motion } from "framer-motion";
import { aboutParagraphs, skills, personalInfo } from "@/lib/data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const viewport = { once: true, margin: "-60px" };

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="font-mono text-xs text-muted tracking-[0.2em] uppercase">
        {children}
      </span>
      <div className="flex-1 h-px bg-border-dim" />
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative py-28 border-t border-border-dim bg-bg"
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionLabel>01 — About</SectionLabel>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left: Bio text */}
          <div className="lg:col-span-3 space-y-6">
            {aboutParagraphs.map((para, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                transition={{
                  duration: 0.65,
                  delay: 0.08 * i,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-secondary leading-relaxed text-base"
              >
                {para}
              </motion.p>
            ))}

            {/* Education card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 p-5 border border-border-dim bg-surface group hover:border-border-mid transition-colors duration-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-mono text-muted tracking-widest uppercase mb-2">
                    Education
                  </p>
                  <p className="text-primary font-semibold text-sm">
                    {personalInfo.education.degree}
                  </p>
                  <p className="text-secondary text-sm mt-0.5">
                    {personalInfo.education.school}
                  </p>
                  <p className="text-muted text-xs font-mono mt-1">
                    {personalInfo.education.period}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-mono text-muted tracking-widest uppercase mb-1">
                    GPA
                  </p>
                  <p className="text-primary font-bold text-xl">
                    {personalInfo.education.gpa}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Skills */}
          <motion.div
            className="lg:col-span-2"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs font-mono text-muted tracking-[0.2em] uppercase mb-6">
              Tech Stack
            </p>
            <div className="space-y-5">
              {Object.entries(skills).map(([category, items], ci) => (
                <motion.div
                  key={category}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  transition={{
                    duration: 0.5,
                    delay: ci * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <p className="text-xs text-muted font-mono mb-2.5 tracking-wide">
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map((item) => (
                      <span key={item} className="tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
