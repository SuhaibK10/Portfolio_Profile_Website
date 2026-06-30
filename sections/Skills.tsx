"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { Terminal, Lock, Cpu } from "lucide-react";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";

/* ─── Brand SVG Icons (Simple Icons paths) ──────────────────────── */

function PythonIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path fill="#3776AB" d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.79 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.867s-.11-3.403 3.347-3.403h5.772s3.239.052 3.239-3.13V3.248S18.28 0 11.914 0zM8.708 1.87a1.04 1.04 0 110 2.08 1.04 1.04 0 010-2.08z"/>
      <path fill="#FFD43B" d="M12.087 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.12S24 18.21 24 12.031c0-6.18-3.403-5.96-3.403-5.96h-2.03v2.867s.11 3.403-3.348 3.403H9.448S6.21 12.29 6.21 15.47v5.282S5.72 24 12.087 24zm3.206-1.87a1.04 1.04 0 110-2.08 1.04 1.04 0 010 2.08z"/>
    </svg>
  );
}

function JavaScriptIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <rect width="24" height="24" fill="#F7DF1E"/>
      <path fill="#000" d="M6.5 17.5c.55.88 1.3 1.5 2.6 1.5 1.1 0 1.8-.55 1.8-1.3 0-.9-.72-1.22-1.93-1.75l-.66-.28C6.58 15 5.4 14.08 5.4 12.1c0-1.84 1.4-3.24 3.59-3.24 1.56 0 2.68.54 3.49 1.96l-1.91 1.23c-.42-.75-.87-1.05-1.58-1.05-.72 0-1.18.46-1.18 1.05 0 .73.46 1.03 1.52 1.5l.66.28c2.13.92 3.3 1.86 3.3 3.96 0 2.27-1.78 3.41-4.17 3.41-2.34 0-3.85-1.12-4.59-2.58l1.97-1.13zm9.07-.22c.4.72.76 1.33 1.62 1.33.83 0 1.35-.33 1.35-1.6V9.3h2.27v7.73c0 2.64-1.55 3.84-3.8 3.84-2.04 0-3.22-1.05-3.82-2.32l2.38-1.27z"/>
    </svg>
  );
}

function JavaIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path fill="#ED8B00" d="M8.85 17.63s-.96.56.68.75c1.98.23 3 .2 5.18-.22 0 0 .57.36 1.37.67-4.88 2.09-11.05-.12-7.23-1.2zM8.3 15.1s-1.08.8.57.97c2.13.22 3.81.24 6.72-.32 0 0 .4.4 1.02.62-5.95 1.74-12.57.14-8.31-1.27z"/>
      <path fill="#ED8B00" d="M13.58 10.57c1.21 1.4-.32 2.65-.32 2.65s3.07-1.58 1.66-3.56c-1.32-1.84-2.33-2.76 3.14-5.92 0 0-8.59 2.15-4.48 6.83z"/>
      <path fill="#ED8B00" d="M19.93 19.32s.71.59-.78.04c-2.83-1.22-11.82-1.58-14.3-.05 0 0-.9-.56 1.07-.74 4.3-.48 10.82-.27 14.01.75zM9.25 12.68s-4.4 1.05-1.56 1.43c1.2.16 3.6.12 5.83-.06 1.83-.15 3.67-.47 3.67-.47s-.64.28-1.11.6c-4.47 1.18-13.11.63-10.62-.58 2.1-1.03 3.79-.92 3.79-.92zM17.5 16.42c4.55-2.36 2.44-4.63.97-4.33-.36.07-.52.14-.52.14s.13-.21.38-.3c2.84-1 5.03 2.95-.93 4.51 0 0 .07-.06.1-.02z"/>
      <path fill="#ED8B00" d="M14.6 0s2.52 2.52-2.38 6.38c-3.93 3.1-.9 4.87 0 6.88-2.29-2.07-3.97-3.89-2.84-5.58C11 5.42 15.6 4.27 14.6 0z"/>
      <path fill="#ED8B00" d="M9.8 22c4.36.28 11.06-.15 11.22-2.18 0 0-.31.78-3.6 1.4-3.73.7-8.33.61-11.05.17 0 0 .56.46 3.43.61z"/>
    </svg>
  );
}

function ReactIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="2.05" fill="#61DAFB"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="10" ry="3.8" stroke="#61DAFB" strokeWidth="1.2" transform="rotate(120 12 12)"/>
    </svg>
  );
}

function NextJsIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <circle cx="12" cy="12" r="11" fill="#fff"/>
      <path d="M17.5 19L9 8H7v8.5h1.5v-6.5L16.2 20c.5-.3.9-.6 1.3-1z" fill="#000"/>
      <rect x="14.5" y="8" width="1.5" height="8.5" fill="#000"/>
    </svg>
  );
}

function TailwindIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
      <path fill="#06B6D4" d="M12 6C9.6 6 8.1 7.2 7.5 9.6c.9-1.2 1.95-1.65 3.15-1.35.685.172 1.174.67 1.716 1.22C13.26 10.46 14.28 11.5 16.5 11.5c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.172-1.174-.67-1.716-1.22C15.24 7.04 14.22 6 12 6zm-4.5 6C5.1 12 3.6 13.2 3 15.6c.9-1.2 1.95-1.65 3.15-1.35.685.172 1.174.67 1.716 1.22C8.76 16.46 9.78 17.5 12 17.5c2.4 0 3.9-1.2 4.5-3.6-.9 1.2-1.95 1.65-3.15 1.35-.685-.172-1.174-.67-1.716-1.22C10.74 13.04 9.72 12 7.5 12z"/>
    </svg>
  );
}

function PyTorchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path fill="#EE4C2C" d="M12.005 0L4.952 7.053a9.865 9.865 0 000 14.022 9.93 9.93 0 0014.107 0 9.865 9.865 0 000-14.022L17.4 9.707a5.948 5.948 0 010 8.414 5.984 5.984 0 01-8.474 0 5.948 5.948 0 010-8.414l3.08-3.073z"/>
      <circle cx="16.056" cy="5.658" r="1.607" fill="#EE4C2C"/>
    </svg>
  );
}

function ScikitlearnIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path fill="#F7931E" d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 2a8 8 0 110 16A8 8 0 0112 4z"/>
      <path fill="#3499CD" d="M12 6a6 6 0 100 12A6 6 0 0012 6zm0 2a4 4 0 110 8 4 4 0 010-8z"/>
      <circle cx="12" cy="12" r="2" fill="#F7931E"/>
    </svg>
  );
}

function HuggingFaceIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#FFD21E"/>
      <path stroke="#333" strokeWidth="1.4" fill="none" strokeLinecap="round" d="M8 14.5c.6 1.8 2 2.8 4 2.8s3.4-1 4-2.8"/>
      <circle cx="9" cy="10.5" r="1.3" fill="#333"/>
      <circle cx="15" cy="10.5" r="1.3" fill="#333"/>
      <path stroke="#555" strokeWidth="1" fill="none" strokeLinecap="round" d="M7.5 8.5C8 6.5 10 6 10 6M16.5 8.5C16 6.5 14 6 14 6"/>
    </svg>
  );
}

function MySQLIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path fill="#4479A1" d="M16.5 3C14.8 3 12 3.8 12 6s2.8 3 4.5 3c1.8 0 4.5-.8 4.5-3S18.3 3 16.5 3z"/>
      <path fill="#4479A1" d="M3 6h7v1.5H3z"/>
      <path fill="#4479A1" d="M3 9h5v1.5H3z"/>
      <path fill="#4479A1" d="M3 12h4v1.5H3z"/>
      <path fill="#00758F" d="M17 9c-3.2 0-5 1.6-5 3.5V18c0 1.7 1.5 3 5 3s5-1.3 5-3v-5.5C22 10.6 20.2 9 17 9z"/>
      <path fill="#fff" fillOpacity=".3" d="M17 10.5c-2.2 0-3.5.9-3.5 2s1.3 2 3.5 2 3.5-.9 3.5-2-1.3-2-3.5-2z"/>
    </svg>
  );
}

function PostgreSQLIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path fill="#336791" d="M17.1 2.5c-1-.3-2.1-.4-3.1-.2-1.5.3-2.7 1.2-3.5 2.4-.4.6-.6 1.3-.7 2-.1.7 0 1.5.2 2.2.3.9.8 1.7 1.4 2.4.2.2.3.5.3.7v5c0 .8.3 1.6.8 2.2.5.6 1.2 1 2 1.1.8.1 1.6-.1 2.2-.6.6-.5 1-1.2 1.1-2l.2-2.3c.4-.1.8-.3 1.1-.6.5-.4.8-1 .9-1.7.1-1-.2-2-.9-2.8-.2-.2-.4-.4-.7-.5.2-.7.3-1.4.3-2.1 0-1.1-.3-2.2-.9-3.1-.4-.7-1-.5-1.7-.1z"/>
      <path fill="#fff" fillOpacity=".9" d="M13.5 9c0 .8.6 1.5 1.5 1.5S16.5 9.8 16.5 9 15.9 7.5 15 7.5 13.5 8.2 13.5 9z"/>
      <path fill="#336791" d="M8 5C5.8 5 4 7.2 4 10c0 2 .9 3.7 2.2 4.6-.2.6-.3 1.3-.3 1.9 0 1.8.8 3.5 2.1 3.5 1.3 0 2.1-1.7 2.1-3.5V10c0-2.8-1.3-5-3.1-5h1z"/>
      <circle cx="8" cy="9" r="1.5" fill="#fff" fillOpacity=".9"/>
    </svg>
  );
}

function MongoDBIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
      <path fill="#47A248" d="M12 2C9.2 2 7 5.8 7 10.2c0 4.8 3.5 7.5 4.5 11.3.1.3.4.5.5.5s.4-.2.5-.5C13.5 17.7 17 15 17 10.2 17 5.8 14.8 2 12 2z"/>
      <rect x="11.3" y="17" width="1.4" height="5" rx=".7" fill="#47A248"/>
    </svg>
  );
}

function SupabaseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path fill="#3ECF8E" d="M11.9 3.5L3.5 14.5h7.2L9.5 21 20.5 9.5h-7.3l1.7-6z"/>
    </svg>
  );
}

function DockerIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path fill="#2496ED" d="M13.5 7h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2h-2zm3-3h2v2h-2zm3 0h2v2h-2zm3 3h2v2h-2zM3 10h2v2H3z"/>
      <path fill="#2496ED" d="M21.9 10.5c-.4-.3-1.3-.4-2-.3-.1-.8-.6-1.5-1.4-1.9l-.5-.3-.3.5c-.3.5-.4 1.3-.3 1.9-.5-.3-1.5-.4-1.7-.4H2.4c-.3 1.5.2 3.5 1.3 4.7 1.2 1.3 3 2 5.3 2 5 0 8.7-2.3 10.4-6.5.7 0 2.2 0 3-1.4l.1-.2-.3-.1z"/>
    </svg>
  );
}

function GitIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path fill="#F05032" d="M23.5 11.5l-11-11c-.7-.7-1.8-.7-2.5 0l-2.5 2.5 3.1 3.1c.7-.2 1.5 0 2.1.6.6.6.8 1.4.6 2.1l3 3c.7-.2 1.5 0 2.1.6.9.9.9 2.3 0 3.2-.9.9-2.3.9-3.2 0-.6-.6-.8-1.5-.6-2.3L12.5 11v7.8c.1 0 .3.1.4.2.9.9.9 2.3 0 3.2-.9.9-2.3.9-3.2 0-.9-.9-.9-2.3 0-3.2.1-.1.3-.2.5-.3V11c-.2-.1-.4-.2-.5-.3C9 10 8.8 9 9 8.3L6 5.3 0.5 10.8c-.7.7-.7 1.8 0 2.5l11 11c.7.7 1.8.7 2.5 0l9.5-9.5c.7-.7.7-1.8 0-2.3z"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path fill="white" d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.8 2.7 1.3 3.3.9.1-.7.4-1.2.7-1.5-2.5-.3-5.2-1.3-5.2-5.7 0-1.3.5-2.3 1.1-3.1-.1-.3-.5-1.5.1-3 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.5.2 2.7.1 3 .7.8 1.1 1.9 1.1 3.1 0 4.4-2.7 5.4-5.2 5.7.4.3.8 1 .8 2.1v3.1c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/>
    </svg>
  );
}

function VercelIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path fill="white" d="M12 2L2 21h20L12 2z"/>
    </svg>
  );
}

function CrewAIIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.5" stroke="#7C3AED" strokeWidth="1.5"/>
      <circle cx="6" cy="16" r="2.5" stroke="#7C3AED" strokeWidth="1.5"/>
      <circle cx="18" cy="16" r="2.5" stroke="#7C3AED" strokeWidth="1.5"/>
      <path stroke="#7C3AED" strokeWidth="1.2" d="M9 11l-2.5 3M15 11l2.5 3"/>
    </svg>
  );
}

function N8NIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden>
      <circle cx="5" cy="12" r="3" fill="#EA4B71"/>
      <circle cx="19" cy="12" r="3" fill="#EA4B71"/>
      <circle cx="12" cy="12" r="3" stroke="#EA4B71" strokeWidth="1.5" fill="none"/>
      <path stroke="#EA4B71" strokeWidth="1.5" d="M8 12h1M15 12h1"/>
    </svg>
  );
}

function PostmanIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#FF6C37"/>
      <path fill="white" d="M16.5 7.5l-7 4 7 4V7.5z"/>
      <rect x="8" y="11.2" width="5.5" height="1.6" rx=".8" fill="white"/>
    </svg>
  );
}

/* ─── Skill data ────────────────────────────────────────────────── */

interface Skill  { name: string; icon: ReactNode; color: string }
interface Category { label: string; skills: Skill[] }

const L = (Icon: React.ElementType, color: string) => (
  <Icon size={18} color={color} strokeWidth={1.6} aria-hidden />
);

const CATEGORIES: Category[] = [
  {
    label: "Languages",
    skills: [
      { name: "Python",     icon: <PythonIcon />,            color: "#3776AB" },
      { name: "JavaScript", icon: <JavaScriptIcon />,        color: "#F7DF1E" },
      { name: "Java",       icon: <JavaIcon />,              color: "#ED8B00" },
      { name: "C",          icon: L(Cpu, "#A8B9CC"),         color: "#A8B9CC" },
      { name: "Shell",      icon: L(Terminal, "#89E051"),    color: "#89E051" },
    ],
  },
  {
    label: "Frameworks & Libraries",
    skills: [
      { name: "React",        icon: <ReactIcon />,           color: "#61DAFB" },
      { name: "Next.js",      icon: <NextJsIcon />,          color: "#ffffff" },
      { name: "Tailwind CSS", icon: <TailwindIcon />,        color: "#06B6D4" },
      { name: "PyTorch",      icon: <PyTorchIcon />,         color: "#EE4C2C" },
      { name: "Scikit-learn", icon: <ScikitlearnIcon />,     color: "#F7931E" },
      { name: "Hugging Face", icon: <HuggingFaceIcon />,     color: "#FFD21E" },
    ],
  },
  {
    label: "Databases",
    skills: [
      { name: "MySQL",      icon: <MySQLIcon />,             color: "#4479A1" },
      { name: "PostgreSQL", icon: <PostgreSQLIcon />,        color: "#336791" },
      { name: "MongoDB",    icon: <MongoDBIcon />,           color: "#47A248" },
      { name: "Supabase",   icon: <SupabaseIcon />,          color: "#3ECF8E" },
    ],
  },
  {
    label: "AI & Automation",
    skills: [
      { name: "CrewAI", icon: <CrewAIIcon />, color: "#7C3AED" },
      { name: "n8n",    icon: <N8NIcon />,    color: "#EA4B71" },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "Docker",   icon: <DockerIcon />,                        color: "#2496ED" },
      { name: "Git",      icon: <GitIcon />,                           color: "#F05032" },
      { name: "GitHub",   icon: <GitHubIcon />,                        color: "#ffffff" },
      { name: "Postman",  icon: <PostmanIcon />,                       color: "#FF6C37" },
      { name: "Vercel",   icon: <VercelIcon />,                        color: "#ffffff" },
      { name: "Clerk",    icon: L(Lock, "#6C47FF"),                    color: "#6C47FF" },
    ],
  },
  {
    label: "Others",
    skills: [
      { name: "MPI",                        icon: L(Cpu, "#94A3B8"), color: "#94A3B8" },
      { name: "OpenMP",                     icon: L(Cpu, "#94A3B8"), color: "#94A3B8" },
      { name: "High Performance Computing", icon: L(Cpu, "#94A3B8"), color: "#94A3B8" },
      { name: "Parallel Computing",         icon: L(Cpu, "#94A3B8"), color: "#94A3B8" },
    ],
  },
];

/* ─── Motion ────────────────────────────────────────────────────── */

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
};

const chipVariants = {
  hidden:  { opacity: 0, scale: 0.9, y: 8 },
  visible: { opacity: 1, scale: 1,   y: 0, transition: { duration: 0.4, ease: EASE } },
};

/* ─── Component ─────────────────────────────────────────────────── */

export function Skills() {
  return (
    <Section id="skills">
      <Container>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <SectionHeading
            eyebrow="Stack"
            title="Skills & Technologies"
            description="Technologies I work with across languages, frameworks, databases, and infrastructure."
          />
        </motion.div>

        <div className="mt-14 space-y-10">
          {CATEGORIES.map((cat) => (
            <div key={cat.label}>

              <p className="mb-4 font-mono text-[0.625rem] tracking-[0.22em]
                            uppercase text-muted/60">
                {cat.label}
              </p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="flex flex-wrap gap-2.5"
              >
                {cat.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={chipVariants}
                    className="group flex items-center gap-2.5 rounded-lg
                               border border-white/6 bg-card/60
                               px-4 py-2.5 backdrop-blur-sm
                               transition-all duration-200
                               hover:border-white/14 hover:bg-card"
                  >
                    <span className="flex shrink-0 items-center justify-center
                                     h-4.5 w-4.5">
                      {skill.icon}
                    </span>
                    <span className="font-body text-[0.8125rem] leading-none
                                     text-foreground-secondary
                                     transition-colors duration-200
                                     group-hover:text-foreground">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

            </div>
          ))}
        </div>

      </Container>
    </Section>
  );
}
