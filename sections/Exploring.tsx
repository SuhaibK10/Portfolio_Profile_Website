"use client";

import {
  Brain, Workflow, Users, TrendingUp, Activity, Network,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";

/* ─── Data ─────────────────────────────────────────────────────────── */

interface ExploreCard {
  icon:        LucideIcon;
  title:       string;
  description: string;
  accent:      string;   // hex — drives border, icon bg, tags
  tags:        string[];
}

const CARDS: ExploreCard[] = [
  {
    icon:        Brain,
    title:       "AI & LLMs",
    description: "Exploring intelligent systems, reasoning models, and human-AI collaboration at scale.",
    accent:      "#818CF8",
    tags:        ["Agents", "RAG", "Fine-tuning"],
  },
  {
    icon:        Workflow,
    title:       "Future of Software",
    description: "Understanding how AI is reshaping engineering workflows and what the developer looks like next.",
    accent:      "#A78BFA",
    tags:        ["AI DevTools", "Automation", "Vibe Coding"],
  },
  {
    icon:        Users,
    title:       "Labor Transformation",
    description: "How AI changes knowledge work, leverage, and the nature of value creation.",
    accent:      "#2DD4BF",
    tags:        ["Knowledge Work", "Leverage", "Future of Work"],
  },
  {
    icon:        TrendingUp,
    title:       "Venture & Startups",
    description: "Studying how enduring businesses are identified early and compounded over time.",
    accent:      "#F59E0B",
    tags:        ["Founders", "Capital Allocation", "0→1"],
  },
  {
    icon:        Activity,
    title:       "Markets",
    description: "Equity markets, price discovery, incentive structures, and compounding capital.",
    accent:      "#34D399",
    tags:        ["Equities", "Compounding", "Incentives"],
  },
  {
    icon:        Network,
    title:       "Systems Thinking",
    description: "How feedback loops, emergence, and interconnection drive complex outcomes.",
    accent:      "#38BDF8",
    tags:        ["Mental Models", "Feedback Loops", "Emergence"],
  },
];

/* ─── Motion ────────────────────────────────────────────────────────── */

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const gridVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};

/* ─── Component ─────────────────────────────────────────────────────── */

export function Exploring() {
  return (
    <Section id="exploring">
      <Container>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <SectionHeading eyebrow="Currently" title="Things I'm Exploring" />
        </motion.div>

        <motion.ul
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid list-none gap-4 p-0
                     sm:grid-cols-2 lg:grid-cols-3"
        >
          {CARDS.map((card) => {
            const Icon = card.icon;
            return (
              <motion.li
                key={card.title}
                variants={cardVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="flex"
              >
                <div
                  className="group relative flex w-full flex-col overflow-hidden
                             rounded-xl border border-white/8
                             bg-card p-5 transition-all duration-300
                             hover:border-white/16 hover:shadow-lg"
                >
                  {/* Top accent bar */}
                  <div
                    className="absolute inset-x-0 top-0 h-0.5 rounded-t-xl
                               opacity-40 transition-opacity duration-300 group-hover:opacity-60"
                    style={{ background: `color-mix(in srgb, ${card.accent} 55%, #8992A3)` }}
                  />

                  {/* Icon */}
                  <div
                    className="mb-5 flex h-11 w-11 shrink-0 items-center
                               justify-center rounded-xl transition-transform
                               duration-300 group-hover:scale-105"
                    style={{
                      background: `color-mix(in srgb, ${card.accent} 8%, transparent)`,
                    }}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.5}
                      style={{ color: `color-mix(in srgb, ${card.accent} 65%, #9AA5B1)` }}
                      aria-hidden
                    />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-[0.9375rem] font-semibold
                                 leading-snug text-foreground">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 font-body text-sm leading-relaxed
                                text-foreground-secondary flex-1">
                    {card.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md px-2 py-0.5 font-mono
                                   text-[0.625rem] tracking-wide"
                        style={{
                          background: `color-mix(in srgb, ${card.accent} 10%, transparent)`,
                          color:      card.accent,
                          border:     `1px solid color-mix(in srgb, ${card.accent} 25%, transparent)`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>
              </motion.li>
            );
          })}
        </motion.ul>

      </Container>
    </Section>
  );
}
