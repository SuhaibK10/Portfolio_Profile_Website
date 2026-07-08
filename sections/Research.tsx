"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowUpRight } from "lucide-react";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";

/* ─── Data ─────────────────────────────────────────────────────────── */

const PAPERS = [
  {
    title:  "Quantum Kernel Methods for Portfolio Optimization",
    venue:  "Indo Quantum Summit 2026",
    bullets: [
      "Abstract selected for presentation at Indo Quantum Summit 2026, aligned with India's ₹6,003 Crore National Quantum Mission.",
      "Benchmarked QSVMs (ZZ/Pauli feature maps) against XGBoost, SVM, and Random Forest on NSE blue-chip portfolio data — achieved Sharpe ratio 1.48 vs. 1.20–1.42 for classical models, with 95% recall on 4 qubits at circuit depth 1, confirming NISQ-era feasibility.",
    ],
    links: [
      { label: "Abstract", href: "https://drive.google.com/file/d/1m_o9y58FxbDeAqkL1OvoUmzD3a9qK7kO/view?usp=share_link" },
      { label: "Certificate", href: "https://drive.google.com/file/d/1AP1dgjaQXMvhWshFlO1Guw3gzMiJGRFi/view?usp=share_link" },
    ],
  },
  {
    title:  "Autonomous AI Agent for Analyzing Air Pollution Data",
    venue:  null,
    bullets: [
      "Designed an autonomous agentic AI pipeline orchestrating data ingestion, preprocessing, forecasting, clustering, and classification to automate end-to-end air quality analysis.",
      "Integrated multiple ML models (Random Forest, XGBoost, K-Means, Prophet) into a unified decision workflow, enabling model selection based on analytical objectives and dataset characteristics.",
    ],
    links: [
      { label: "Abstract", href: "https://drive.google.com/file/d/19VyBkFHjAZGDBdTHlb0qUJGiTnn7C3Gp/view?usp=share_link" },
      { label: "Certificate", href: "https://drive.google.com/file/d/1yxaQmJk6MN-m5bvV6Cg-UXtLRbVAbUHJ/view?usp=share_link" },
    ],
  },
] as const;

/* ─── Motion ────────────────────────────────────────────────────────── */

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const ACCENT = "#A78BFA";

/* ─── Component ─────────────────────────────────────────────────────── */

export function Research() {
  return (
    <Section id="research">
      <Container>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <SectionHeading title="Research Papers" />
        </motion.div>

        {/* Cards */}
        <div className="mt-14 max-w-2xl space-y-6">
          {PAPERS.map((paper, i) => (
            <motion.div
              key={paper.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: EASE }}
              className="group relative overflow-hidden rounded-xl border
                         border-white/8 bg-card/60 px-6 py-5 backdrop-blur-sm
                         transition-colors duration-300 hover:border-white/16"
            >
              {/* Ambient gradient wash, brightens on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-50
                           transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle at 92% -8%, ${ACCENT}22, transparent 60%)`,
                }}
              />

              {/* Icon + title */}
              <div className="relative z-10 mb-3 flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center
                             justify-center rounded-lg"
                  style={{ backgroundColor: `${ACCENT}1A` }}
                >
                  <BookOpen size={15} style={{ color: ACCENT }} strokeWidth={1.8} />
                </span>
                <div>
                  <h3 className="font-heading text-base font-semibold
                                 leading-snug text-foreground md:text-lg">
                    {paper.title}
                  </h3>
                  {paper.venue && (
                    <p
                      className="mt-1 font-mono text-[0.6875rem] tracking-[0.12em]
                                 uppercase"
                      style={{ color: `${ACCENT}B3` }}
                    >
                      {paper.venue}
                    </p>
                  )}
                </div>
              </div>

              {/* Bullets */}
              <ul className="relative z-10 mb-4 space-y-1.5">
                {paper.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span
                      className="mt-[0.35rem] h-1 w-1 shrink-0 rounded-full"
                      style={{ backgroundColor: `${ACCENT}80` }}
                    />
                    <span className="font-body text-sm leading-relaxed
                                     text-foreground-secondary">
                      {b}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Links */}
              <div className="relative z-10 flex flex-wrap gap-3">
                {paper.links.map((link) => (
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

            </motion.div>
          ))}
        </div>

      </Container>
    </Section>
  );
}
