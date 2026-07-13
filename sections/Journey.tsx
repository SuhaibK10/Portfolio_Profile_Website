"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";

/* ─── Data ─────────────────────────────────────────────────────────── */

const TIMELINE = [
  {
    role:     "Product Engineer",
    company:  "Louis Polo",
    link:     "http://www.louispolo.in/",
    logo:     "/louispolo.png",
    period:   "Aug 2025 – May 2026",
    bullets: [
      "Led end-to-end engineering for Louis Polo's launch as a consumer brand, transforming a 10+ year OEM manufacturer into a modern D2C brand.",
      "Designed, developed, and deployed the company's production e-commerce platform, integrating authentication, payments, product management, media delivery, and cloud infrastructure.",
    ],
  },
  {
    role:     "ML & Research Head",
    company:  "Faast FinTech Club",
    link:     "http://www.amufaast.com/",
    logo:     "/faast.png",
    period:   "Sep 2025 – Present",
    bullets: [
      "Led the ML & Research vertical at FAAST, establishing quantitative finance and algorithmic trading as a core research pillar from the ground up.",
      "Conducted workshops on quantitative strategy development (SMA, EMA, MACD, ADX, Parabolic SAR) alongside historical backtesting, walk-forward analysis, and Monte Carlo simulation.",
    ],
  },
  {
    role:     "ML Intern",
    company:  "IIT Jammu",
    link:     null,
    logo:     "/iitjammu.png",
    period:   "Jun 2025 – Jul 2025",
    bullets: [
      "Implemented BERT-based transformer and LSTM/Seq2Seq encoder-decoder architectures across applied NLP workflows, evaluating model performance in real-world settings.",
      "Developed LLM-powered agentic workflows using CrewAI and the OpenAI Agents SDK, implementing multi-agent orchestration, tool calling, planning, and autonomous task execution.",
    ],
  },
  {
    role:     "Founder",
    company:  "Weblicate",
    link:     "http://www.weblicate.in/",
    logo:     "/weblicate.png",
    period:   "Nov 2024 – Present",
    bullets: [
      "Founded a technology consulting venture delivering end-to-end digital solutions for startups and SMBs, spanning D2C, healthcare, EdTech, and manufacturing.",
      "Delivered production-grade web platforms, AI systems, ERPs, LMS, and MVPs to clients globally.",
    ],
  },
] as const;

/* ─── Motion ────────────────────────────────────────────────────────── */

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

type TimelineEntry = (typeof TIMELINE)[number];

function TimelineItem({
  entry,
  index,
  total,
  progress,
}: {
  entry: TimelineEntry;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const isLast = index === total;

  // This entry's position along the overall scroll-linked progress (0 → 1).
  const segStart = index / total;
  const segEnd = (index + 1) / total;

  // Connector below this dot fills in as scroll passes through this segment.
  const connectorScale = useTransform(progress, [segStart, segEnd], [0, 1], {
    clamp: true,
  });

  // Dot "lights up" right as the line reaches it.
  const dotLit = useTransform(
    progress,
    [Math.max(segStart - 0.08, 0), segStart + 0.01],
    [0, 1],
    { clamp: true },
  );

  return (
    <div className="flex gap-6 md:gap-8">

      {/* ── Left: dot + connector ───────────────────────────── */}
      <div className="flex w-5 shrink-0 flex-col items-center">

        {/* Dot */}
        <motion.div
          className="relative z-10 shrink-0"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.3, delay: 0.05, ease: EASE }}
        >
          {/* Ring — always visible */}
          <div className="mt-0.5 h-2.5 w-2.5 rounded-full border border-border/50 bg-background" />

          {/* Fill — animates in once scroll progress reaches this point */}
          <motion.div
            className="absolute left-0 top-0.5 h-2.5 w-2.5 rounded-full bg-gold"
            style={{ scale: dotLit, opacity: dotLit }}
          />

          {/* Active pulse — last / current entry only */}
          {isLast && (
            <motion.div
              className="absolute left-0 top-0.5 h-2.5 w-2.5 rounded-full
                         border border-gold/30"
              animate={{ scale: [1, 1.6], opacity: [0.55, 0] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.8,
              }}
            />
          )}
        </motion.div>

        {/* Connector — grows continuously with scroll, linking dot to dot */}
        {!isLast && (
          <motion.div
            className="mt-3 w-px flex-1 origin-top bg-border/40"
          >
            <motion.div
              className="w-px h-full origin-top bg-gold/70"
              style={{ scaleY: connectorScale }}
            />
          </motion.div>
        )}
      </div>

      {/* ── Right: content ──────────────────────────────────── */}
      <motion.div
        className={isLast ? "pb-2" : "pb-12 md:pb-14"}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
      >
        {/* Company — eyebrow label with logo */}
        <div className="mb-2 flex items-center gap-2">
          <Image
            src={entry.logo}
            alt={entry.company}
            width={40}
            height={40}
            className="h-10 w-10 rounded-md object-contain"
          />
          {"link" in entry && entry.link ? (
            <a
              href={entry.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body font-medium text-[0.75rem] tracking-[0.18em]
                         text-[#E8E8E5] transition-colors hover:text-gold"
            >
              {entry.company}
            </a>
          ) : (
            <p className="font-body font-medium text-[0.75rem] tracking-[0.18em]
                           text-[#E8E8E5]">
              {entry.company}
            </p>
          )}
        </div>

        {/* Role */}
        <h3 className="font-heading text-lg font-semibold leading-snug
                       text-foreground md:text-xl">
          {entry.role}
        </h3>

        {/* Period */}
        <p className="mt-1 font-mono text-[0.6875rem] tracking-[0.12em]
                      text-muted/70">
          {entry.period}
        </p>

        {/* Bullets */}
        <ul className="mt-3 space-y-1.5">
          {entry.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className="mt-[0.4rem] h-1 w-1 shrink-0 rounded-full bg-gold/60" />
              <span className="font-body text-sm leading-relaxed text-foreground-secondary">
                {b}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>

    </div>
  );
}

/* ─── Component ─────────────────────────────────────────────────────── */

export function Journey() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.5"],
  });

  return (
    <Section id="journey">
      <Container>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <SectionHeading title="Journey so far" align="center" />
        </motion.div>

        {/* Timeline ──────────────────────────────────────────────────── */}
        <div ref={containerRef} className="mt-16 max-w-2xl mx-auto">
          {TIMELINE.map((entry, i) => (
            <TimelineItem
              key={entry.role}
              entry={entry}
              index={i}
              total={TIMELINE.length - 1}
              progress={scrollYProgress}
            />
          ))}
        </div>

      </Container>
    </Section>
  );
}
