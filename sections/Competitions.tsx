"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";

/* ─── Data ─────────────────────────────────────────────────────────── */

const COMPETITIONS = [
  {
    title:        "Winner — AMU Hackathon",
    description:
      "Developed a full-stack Digital Fuel Management System for the campus fuel station.",
    highlights: [
      "Slot booking with real-time queue status",
      "UPI payment integration",
      "QR-code pass generation",
      "Live stock analytics dashboard",
    ],
  },
  {
    title:        "4th Place — Footprints on Mars, Tryst'23, IIT Delhi",
    description:
      "Proposed a Digital Twin simulation framework for Mars habitat management.",
    highlights: [
      "Virtual modeling of life-support, energy, and resource systems",
      "Risk-free failure scenario testing for habitat operations",
    ],
  },
] as const;

/* ─── Motion ────────────────────────────────────────────────────────── */

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/* ─── Component ─────────────────────────────────────────────────────── */

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
          <SectionHeading title="Competitions & Hackathons" />
        </motion.div>

        {/* Cards */}
        <div className="mt-14 max-w-2xl space-y-6">
          {COMPETITIONS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: EASE }}
              className="rounded-xl border border-white/8 bg-card/60
                         px-6 py-5 backdrop-blur-sm"
            >
              {/* Trophy + title row */}
              <div className="mb-3 flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center
                                 justify-center rounded-lg bg-gold/10">
                  <Trophy size={16} className="text-gold" strokeWidth={1.8} />
                </span>
                <h3 className="font-heading text-base font-semibold
                               leading-snug text-foreground md:text-lg">
                  {item.title}
                </h3>
              </div>

              {/* Description */}
              <p className="mb-4 font-body text-sm leading-relaxed
                            text-foreground-secondary">
                {item.description}
              </p>

              {/* Highlights */}
              <ul className="space-y-1.5">
                {item.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <span className="mt-[0.35rem] h-1 w-1 shrink-0 rounded-full bg-gold/50" />
                    <span className="font-body text-sm leading-relaxed
                                     text-foreground-secondary">
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </Container>
    </Section>
  );
}
