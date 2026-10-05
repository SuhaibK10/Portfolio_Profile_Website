"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";

/* ─── Data ─────────────────────────────────────────────────────────── */

const COMPETITIONS = [
  {
    title:        "Winner, AMU Hackathon",
    description:
      "Developed a full-stack Digital Fuel Management System for the campus fuel station.",
    highlights: [
      "Slot booking with real-time queue status",
      "UPI payment integration",
      "QR-code pass generation",
      "Live stock analytics dashboard",
    ],
    links: [
      { label: "Certificate", href: "https://drive.google.com/file/d/1KFeN1iYdZYU_b86eJXMpsNrkLff4-sCD/view?usp=share_link" },
    ],
  },
  {
    title:        "4th Place, Footprints on Mars, Tryst'23, IIT Delhi",
    description:
      "Proposed a Digital Twin simulation framework for Mars habitat management.",
    highlights: [
      "Virtual modeling of life-support, energy, and resource systems",
      "Risk-free failure scenario testing for habitat operations",
    ],
    links: [
      { label: "Certificate", href: "https://drive.google.com/file/d/1ocCrUCZuGm7vPX2EjqEsop8PEVkD__AZ/view?usp=share_link" },
    ],
  },
] as const;

/* ─── Motion ────────────────────────────────────────────────────────── */

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const ACCENT = "#A78BFA";
const GOLD = "#FBBF24";

/* ─── Component ─────────────────────────────────────────────────────── */

function GoldTrophy({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <defs>
        <linearGradient id="trophy-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FDE68A" />
          <stop offset="0.5" stopColor={GOLD} />
          <stop offset="1" stopColor="#B45309" />
        </linearGradient>
      </defs>
      <path d="M7 3.5h10v5.5a5 5 0 0 1-10 0z" fill="url(#trophy-gold)" />
      <path
        d="M7 5H4.2v1.4a3.3 3.3 0 0 0 3 3.3M17 5h2.8v1.4a3.3 3.3 0 0 1-3 3.3"
        fill="none"
        stroke="url(#trophy-gold)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect x="10.8" y="14" width="2.4" height="3" fill="url(#trophy-gold)" />
      <rect x="7.5" y="17" width="9" height="3" rx="1" fill="url(#trophy-gold)" />
    </svg>
  );
}

export function Competitions() {
  return (
    <Section id="competitions">
      <Container>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <SectionHeading title="Competitions & Hackathons" align="center" />
        </motion.div>

        {/* Cards */}
        <div className="mx-auto mt-14 max-w-2xl space-y-6">
          {COMPETITIONS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: EASE }}
              className="group relative overflow-hidden rounded-xl border
                         border-white/8 bg-card/60 px-6 py-5 text-center backdrop-blur-sm
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

              {/* Trophy + title row */}
              <div className="relative z-10 mb-3 flex flex-col items-center gap-3">
                <span
                  className="flex h-8 w-8 shrink-0 items-center
                             justify-center rounded-lg"
                  style={{ backgroundColor: `${GOLD}1A` }}
                >
                  <GoldTrophy />
                </span>
                <h3 className="font-heading text-base font-semibold
                               leading-snug text-foreground md:text-lg">
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <p className="relative z-10 mb-4 font-body text-sm leading-relaxed
                            text-foreground-secondary">
                {item.description}
              </p>

              {/* Highlights */}
              <ul className="relative z-10 mb-4 space-y-2">
                {item.highlights.map((h) => (
                  <li key={h}>
                    <span className="font-body text-sm leading-relaxed
                                     text-foreground-secondary">
                      {h}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Links */}
              <div className="relative z-10 flex flex-wrap justify-center gap-3">
                {item.links.map((link) => (
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
