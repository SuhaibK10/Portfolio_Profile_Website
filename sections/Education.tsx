"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";

/* ─── Data ─────────────────────────────────────────────────────────── */

const EDUCATION = [
  {
    degree:     "Bachelor's in Computer Science",
    school:     "Aligarh Muslim University",
    period:     "2022 – 2026",
    coursework: [
      "Parallel Computing",
      "Data Science",
      "Machine Learning",
      "Data Structures",
      "Web Engineering",
      "Digital System Design",
      "Object Oriented Programming using Java",
      "Computer Architecture",
      "Database Management System",
      "Operating System and Shell Programming",
      "Software Engineering",
      "Deep Learning",
    ],
  },
] as const;

/* ─── Motion ────────────────────────────────────────────────────────── */

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/* ─── Component ─────────────────────────────────────────────────────── */

export function Education() {
  return (
    <Section id="education">
      <Container>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <SectionHeading title="Education" />
        </motion.div>

        {/* Cards */}
        <div className="mt-14 max-w-2xl space-y-6">
          {EDUCATION.map((item, i) => (
            <motion.div
              key={item.degree}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: EASE }}
              className="rounded-xl border border-white/8 bg-card/60
                         px-6 py-5 backdrop-blur-sm"
            >
              {/* Icon + degree/school row */}
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center
                                   justify-center rounded-lg bg-gold/10">
                    <GraduationCap size={16} className="text-gold" strokeWidth={1.8} />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold
                                   leading-snug text-foreground md:text-lg">
                      {item.degree}
                    </h3>
                    <p className="mt-1 font-mono text-[0.6875rem] tracking-[0.12em]
                                  uppercase text-gold/70">
                      {item.school}
                    </p>
                  </div>
                </div>
                <p className="shrink-0 font-mono text-[0.6875rem] tracking-[0.12em]
                              text-muted/70">
                  {item.period}
                </p>
              </div>

              {/* Coursework */}
              <div className="mt-4 flex flex-wrap gap-2">
                {item.coursework.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-border/40 px-2.5 py-0.5
                               font-mono text-[0.625rem] tracking-wide text-muted/70"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </Container>
    </Section>
  );
}
