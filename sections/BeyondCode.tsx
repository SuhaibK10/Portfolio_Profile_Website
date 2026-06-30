"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  TrendingUp,
  BarChart3,
  Microscope,
  Rocket,
  PenLine,
  Coffee,
} from "lucide-react";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Card } from "@/components/Card";

/* ─── Data ─────────────────────────────────────────────────────────── */

interface Interest {
  title:       string;
  description: string;
  icon:        ReactNode;
  color:       string;
}

const ICON_PROPS = { size: 18, strokeWidth: 1.75 } as const;

const INTERESTS: Interest[] = [
  {
    title: "AI",
    description: "Intelligence and its implications.",
    icon: <BrainCircuit {...ICON_PROPS} />,
    color: "#818CF8",
  },
  {
    title: "Investing",
    description: "Value, patience and compounding.",
    icon: <TrendingUp {...ICON_PROPS} />,
    color: "#34D399",
  },
  {
    title: "Markets",
    description: "Price discovery and incentives.",
    icon: <BarChart3 {...ICON_PROPS} />,
    color: "#60A5FA",
  },
  {
    title: "Research",
    description: "Rigor and curiosity.",
    icon: <Microscope {...ICON_PROPS} />,
    color: "#A78BFA",
  },
  {
    title: "Startups",
    description: "Building and betting.",
    icon: <Rocket {...ICON_PROPS} />,
    color: "#FB923C",
  },
  {
    title: "Writing",
    description: "Clarity and leverage.",
    icon: <PenLine {...ICON_PROPS} />,
    color: "#C9A85C",
  },
  {
    title: "Coffee",
    description: "The ritual of focus.",
    icon: <Coffee {...ICON_PROPS} />,
    color: "#D4926A",
  },
];

/* ─── Motion ────────────────────────────────────────────────────────── */

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

/* ─── Component ─────────────────────────────────────────────────────── */

export function BeyondCode() {
  return (
    <Section id="beyond">
      <Container>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <SectionHeading title="Beyond Code" />
        </motion.div>

        {/* Card grid */}
        <motion.ul
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid list-none gap-3 p-0
                     sm:grid-cols-2 lg:grid-cols-4"
        >
          {INTERESTS.map((item) => (
            <motion.li key={item.title} variants={cardVariants} className="flex">
              <Card
                padding="none"
                className="group relative flex w-full flex-col
                           gap-2.5 overflow-hidden p-4"
              >
                {/* Ambient gradient wash, brightens on hover */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-40
                             transition-opacity duration-500 group-hover:opacity-90"
                  style={{
                    background: `radial-gradient(circle at 12% -10%, ${item.color}26, transparent 60%)`,
                  }}
                />

                {/* Icon badge */}
                <span
                  className="relative z-10 flex h-8 w-8 shrink-0 items-center
                             justify-center rounded-lg transition-transform
                             duration-300 group-hover:scale-105"
                  style={{ backgroundColor: `${item.color}1F`, color: item.color }}
                >
                  {item.icon}
                </span>

                {/* Title + descriptor */}
                <div className="relative z-10">
                  <h3
                    className="font-heading text-[0.9375rem] font-semibold
                               leading-snug text-foreground"
                  >
                    {item.title}
                  </h3>
                  <p
                    className="mt-1 font-body text-xs leading-relaxed
                               text-muted/70 transition-colors duration-300
                               group-hover:text-muted/85"
                  >
                    {item.description}
                  </p>
                </div>

              </Card>
            </motion.li>
          ))}
        </motion.ul>

      </Container>
    </Section>
  );
}
