"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, ArrowUpRight } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/BrandIcons";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

/* ─── Content ─────────────────────────────────────────────────────── */

const WORDS = ["Think", "Research", "Write", "Code", "Deploy", "Document"] as const;

const MANIFESTO = [
  "I Think.", "I Research.","I Write.",  "I Engineer.", "I Code.", "I Deploy.", 
  "I Document.",
] as const;

/* ─── Motion ──────────────────────────────────────────────────────── */

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

function fadeUp(delay: number, distance = 16, duration = 0.72) {
  return {
    initial:    { opacity: 0, y: distance },
    animate:    { opacity: 1, y: 0 },
    transition: { duration, delay, ease: EASE },
  } as const;
}

/* ─── Component ───────────────────────────────────────────────────── */

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % WORDS.length),
      2000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-screen flex-col"
    >

      {/* ── Centered block ─────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col items-center justify-center
                      px-6 py-24 text-center">
        <Container size="lg">

          {/* Avatar */}
          <motion.div
            {...fadeUp(0.0, 12, 0.7)}
            className="mx-auto mb-8 h-24 w-24 overflow-hidden rounded-full
                       ring-1 ring-border/30"
          >
            <Image
              src="/avatar.jpg"
              alt="Suhaib Khan"
              width={96}
              height={96}
              className="h-full w-full object-cover"
              priority
            />
          </motion.div>

          {/* Greeting */}
          <motion.p
            {...fadeUp(0.1)}
            className="font-body text-sm text-muted/60"
          >
            Hi, I'm Suhaib
          </motion.p>

          {/* Tagline */}
          <motion.p
            {...fadeUp(0.22)}
            className="mt-3 font-mono text-[0.75rem] uppercase tracking-[0.22em]"
            style={{ color: "#a8b8cc" }}
          >
            Engineer. Researcher. Builder.
          </motion.p>

          {/* Headline */}
          <motion.h1
            {...fadeUp(0.38, 20, 0.85)}
            className="mt-7 font-heading font-bold tracking-tight leading-[1.1]
                       text-foreground
                       text-[1.75rem] sm:text-[2.5rem] lg:text-[3rem]"
          >
            Building Intelligent Systems<br className="hidden sm:block" /> that Compound
          </motion.h1>

          {/* Rotating text */}
          <motion.div
            {...fadeUp(0.52)}
            className="mt-6 flex items-baseline justify-center gap-2"
          >
            {/* Static "I" — Playfair Display */}
            <span
              className="leading-none text-muted/60 text-[1.25rem] sm:text-[1.75rem] lg:text-[2.25rem]"
              style={{
                fontFamily: "var(--font-playfair)",
                fontWeight: 700,
                lineHeight: 1,
              }}
            >
              I
            </span>

            {/* Slot — font-size set here so height: 1em resolves correctly */}
            <span
              className="relative inline-block overflow-hidden
                         text-[1.25rem] sm:text-[1.75rem] lg:text-[2.25rem]"
              style={{ height: "1em", lineHeight: 1 }}
            >
              {/* Ghost: holds width of longest word */}
              <span
                aria-hidden
                className="invisible font-heading font-bold tracking-tight
                           leading-none whitespace-nowrap"
              >
                document
              </span>

              <AnimatePresence initial={false}>
                <motion.span
                  key={WORDS[wordIndex]}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="absolute inset-0 flex items-center justify-start
                             font-heading font-bold tracking-tight leading-none
                             text-muted/60 whitespace-nowrap"
                >
                  {WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          {/* Subtext */}
          <motion.p
            {...fadeUp(0.54)}
            className="mt-5 font-body text-sm leading-relaxed text-muted/60
                       mx-auto max-w-xs sm:max-w-sm"
          >
            Building products, exploring ideas, documenting the journey.
          </motion.p>

          {/* Rule */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.55, delay: 0.68, ease: EASE }}
            aria-hidden
            className="mx-auto mt-10 h-px w-8 origin-center bg-border/60"
          />

          {/* Buttons */}
          <motion.div
            {...fadeUp(0.82)}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Button
              variant="ghost"
              size="md"
              aria-label="View resume"
            >
              <FileText size={14} strokeWidth={1.75} />
              Resume
              <ArrowUpRight size={11} className="opacity-35" />
            </Button>

            <Button
              variant="ghost"
              size="md"
              aria-label="GitHub profile (opens in new tab)"
            >
              <GitHubIcon size={14} />
              GitHub
              <ArrowUpRight size={11} className="opacity-35" />
            </Button>

            <Button
              variant="ghost"
              size="md"
              aria-label="LinkedIn profile (opens in new tab)"
            >
              <LinkedInIcon size={14} />
              LinkedIn
              <ArrowUpRight size={11} className="opacity-35" />
            </Button>
          </motion.div>

        </Container>
      </div>

      {/* ── Manifesto strip ────────────────────────────────────────── */}
      <div className="px-6 pb-14" aria-hidden>
        <Container size="lg">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="mb-7 h-px w-full bg-border/20"
          />
          <div className="flex flex-wrap items-center justify-center
                          gap-x-5 gap-y-2">
            {MANIFESTO.map((word, i) => (
              <motion.span
                key={word}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, delay: 1.22 + i * 0.06, ease: EASE }}
                className="font-mono text-[0.625rem] tracking-widest text-muted/55"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </Container>
      </div>

    </section>
  );
}
