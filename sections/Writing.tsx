"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { ARTICLES } from "@/lib/articles";

/* ─── Motion ────────────────────────────────────────────────────────── */

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
};

/* ─── Component ─────────────────────────────────────────────────────── */

export function Writing() {
  return (
    <Section id="writing">
      <Container>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <SectionHeading eyebrow="From the desk" title="Writing" align="center" />
        </motion.div>

        {/* Article list */}
        <motion.ul
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 list-none p-0"
        >
          {ARTICLES.map((article, i) => (
            <motion.li key={article.slug} variants={itemVariants}>

              {/* Divider above each entry (skip for first) */}
              {i > 0 && (
                <div className="h-px w-full bg-border/30" />
              )}

              {/* Article row */}
              <Link
                href={`/writing/${article.slug}`}
                className="group flex flex-col items-center gap-1.5
                           py-8 text-center md:py-9"
              >
                <h3
                  className="inline-flex items-center gap-1.5 font-heading text-lg
                             font-semibold leading-snug text-foreground
                             transition-colors duration-200
                             group-hover:text-foreground md:text-xl"
                >
                  {/* Underline slides in on hover */}
                  <span
                    className="bg-gradient-to-r from-foreground to-foreground
                               bg-[length:0%_1px] bg-left-bottom bg-no-repeat
                               pb-px transition-[background-size] duration-300
                               group-hover:bg-[length:100%_1px]"
                  >
                    {article.title}
                  </span>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.5}
                    className="shrink-0 opacity-0 transition-all duration-300
                               group-hover:translate-x-0.5 group-hover:opacity-40"
                  />
                </h3>
                <p
                  className="mt-1 max-w-xl font-body text-sm leading-[1.75]
                             text-foreground-secondary md:text-[0.9375rem]"
                >
                  {article.excerpt}
                </p>
                <p className="mt-3 font-body text-xs text-muted/65">
                  {article.readingTime}&ensp;·&ensp;{article.publishedAt}
                </p>
              </Link>

            </motion.li>
          ))}
        </motion.ul>

      </Container>
    </Section>
  );
}
