"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/Card";

/* ─── Data ─────────────────────────────────────────────────────────── */

const PROJECTS = [
  {
    index:       "01",
    title:       "VentureScope: Multi-Agent Startup Evaluator",
    description: "CrewAI agents simulating a VC (Problem Validator → Market Researcher → Strategist → Moat Analyst → Memo Writer) with a weighted scoring engine across 5 dimensions and live Plotly radar + PDF export.",
    tag:         "Multi-Agent AI",
    gradient:    "rgba(99,102,241,0.12)",
    links: [
      { label: "Live",   href: "https://startupideaevaluator.streamlit.app/" },
      { label: "GitHub", href: "https://github.com/SuhaibK10/Startup-Idea-Evaluator-using-CrewAI" },
      { label: "Demo",   href: "https://www.linkedin.com/posts/suhaibkhan10_crewai-multiagents-iitjammu-activity-7366056769044795392-_7se" },
    ],
  },
  {
    index:       "02",
    title:       "RBIH Mule Account Detection",
    description: "LightGBM pipeline over 7.4M banking transactions with 31 behavioral features, covering all 12 RBI-defined AML patterns: 0.8572 AUC-ROC and 33× PR-AUC lift on a 99:1 imbalanced dataset.",
    tag:         "Explainable ML",
    gradient:    "rgba(167,139,250,0.10)",
    links: [
      { label: "Live",   href: "https://muleaccountdetector.streamlit.app/" },
      { label: "GitHub", href: "https://github.com/SuhaibK10/Mule-Account-Detector" },
    ],
  },
  {
    index:       "03",
    title:       "BioTrack Clinical Pathology",
    description: "5-stage inference pipeline (OCR → biomarker normalization → XGBoost risk scoring → SHAP → LLM advisory) with longitudinal trend tracking across 200+ biomarkers and 8+ organ systems.",
    tag:         "Health-Tech ML",
    gradient:    "rgba(34,197,94,0.10)",
    links: [
      { label: "Live",   href: "https://bio-track-smart-pathology.vercel.app/" },
      { label: "GitHub", href: "https://github.com/SuhaibK10/BioTrack-Smart-Pathology" },
    ],
  },
  {
    index:       "04",
    title:       "Addictive Learning",
    description: "Real-time competitive quiz game where two players race to answer AI-generated questions, best of 7 wins.",
    tag:         "Full-Stack AI",
    gradient:    "rgba(236,72,153,0.10)",
    links: [
      { label: "GitHub", href: "https://github.com/SuhaibK10/Addictive-Learning-" },
    ],
  },
] as const;

/* ─── Motion ────────────────────────────────────────────────────────── */

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const gridVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* ─── Component ─────────────────────────────────────────────────────── */

export function FeaturedWork() {
  return (
    <Section id="work">
      <Container>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <SectionHeading title="Projects" align="center" />
        </motion.div>

        <motion.ul
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid list-none gap-4 p-0 sm:grid-cols-2"
        >
          {PROJECTS.map((p) => (
            <motion.li key={p.title} variants={cardVariants} className="flex">
              <Card
                padding="none"
                className="group relative flex min-h-70 w-full flex-col
                           overflow-hidden md:min-h-80"
              >
                {/* Ambient gradient */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-60
                             transition-opacity duration-700 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 90% -5%, ${p.gradient}, transparent 65%)`,
                  }}
                />

                <div className="relative z-10 flex flex-1 flex-col p-7 md:p-8">

                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.625rem] tracking-widest
                                     text-muted/60">
                      {p.index}
                    </span>
                    <span className="rounded-full border border-border/40
                                     px-2.5 py-0.5 font-mono text-[0.625rem]
                                     tracking-wide text-muted/70">
                      {p.tag}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="mt-auto pt-10">
                    <h3 className="font-heading text-xl font-semibold
                                   leading-snug text-foreground">
                      {p.title}
                    </h3>
                    <p className="mt-3 font-body text-sm leading-[1.75]
                                  text-foreground-secondary">
                      {p.description}
                    </p>
                  </div>

                  {/* Links, or a decorative arrow hint when there are none */}
                  {p.links.length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
                      {p.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 font-mono text-[0.6875rem]
                                     tracking-[0.12em] uppercase text-muted/60
                                     hover:text-foreground transition-colors"
                        >
                          {link.label}
                          <ArrowUpRight size={11} className="opacity-50" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div
                      aria-hidden
                      className="mt-5 self-end opacity-0 transition-opacity
                                 duration-300 group-hover:opacity-20"
                    >
                      <ArrowUpRight size={16} strokeWidth={1.5} />
                    </div>
                  )}

                </div>
              </Card>
            </motion.li>
          ))}
        </motion.ul>

      </Container>
    </Section>
  );
}
