"use client";

import { useState } from "react";
import { useScroll, useSpring, motion, useTransform, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home",    href: "#"        },
  { label: "About",   href: "#about"   },
  { label: "Skills",  href: "#skills"  },
  { label: "Work",    href: "#work"    },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
] as const;

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

/* ── Animated hamburger icon ──────────────────────────────────────── */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 20 20"
      fill="none" aria-hidden
      className="overflow-visible"
    >
      {/* Top bar */}
      <motion.line
        x1="3" y1="6" x2="17" y2="6"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        animate={open ? { x1: 4, y1: 4, x2: 16, y2: 16 } : { x1: 3, y1: 6, x2: 17, y2: 6 }}
        transition={{ duration: 0.28, ease: EASE }}
      />
      {/* Middle bar */}
      <motion.line
        x1="3" y1="10" x2="17" y2="10"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        animate={open ? { opacity: 0, x2: 10 } : { opacity: 1, x2: 17 }}
        transition={{ duration: 0.2, ease: EASE }}
      />
      {/* Bottom bar */}
      <motion.line
        x1="3" y1="14" x2="17" y2="14"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        animate={open ? { x1: 4, y1: 16, x2: 16, y2: 4 } : { x1: 3, y1: 14, x2: 17, y2: 14 }}
        transition={{ duration: 0.28, ease: EASE }}
      />
    </svg>
  );
}

/* ── Component ────────────────────────────────────────────────────── */
export function Navbar() {
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX  = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const opacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  return (
    <div className="fixed inset-x-0 top-5 z-40 flex justify-center pointer-events-none px-5">
      <div className="relative w-full max-w-170 pointer-events-auto">

        {/* ── Pill navbar ─────────────────────────────────────────── */}
        <header
          className="relative overflow-hidden flex h-11 w-full items-center
                     rounded-full border border-white/8
                     bg-background/85 px-4 backdrop-blur-xl
                     shadow-[0_4px_32px_rgba(0,0,0,0.4),0_0_40px_rgba(201,168,92,0.18),0_0_80px_rgba(201,168,92,0.08)]"
        >
          {/* Scroll progress bar */}
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 h-px origin-left"
            style={{
              scaleX,
              opacity,
              background: "linear-gradient(90deg, #6366F1 0%, #818CF8 40%, #A78BFA 70%, #D4AF6C 100%)",
            }}
          />

          {/* Desktop nav */}
          <nav className="hidden md:flex flex-1 items-center justify-between"
               aria-label="Main navigation">
            {NAV_LINKS.map(({ label, href }, i) => (
              <a
                key={href}
                href={href}
                style={{
                  animationName:           "nav-in",
                  animationDuration:       "0.4s",
                  animationTimingFunction: "cubic-bezier(0.21,0.47,0.32,0.98)",
                  animationDelay:          `${0.1 + i * 0.1}s`,
                  animationFillMode:       "forwards",
                }}
                className="nav-link font-body text-[0.8125rem] text-muted/55
                           transition-colors duration-200 hover:text-foreground/90"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Mobile: site name + hamburger */}
          <div className="flex md:hidden flex-1 items-center justify-between">
            <span className="font-body text-[0.8125rem] text-foreground/70 tracking-wide">
              Suhaib Khan
            </span>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-8 w-8 items-center justify-center rounded-full
                         border border-white/10 bg-white/4
                         text-foreground/70 transition-all duration-200
                         hover:border-white/20 hover:bg-white/8 hover:text-foreground"
            >
              <MenuIcon open={open} />
            </button>
          </div>
        </header>

        {/* ── Mobile dropdown ─────────────────────────────────────── */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{    opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.22, ease: EASE }}
              className="absolute inset-x-0 top-[calc(100%+8px)]
                         rounded-2xl border border-white/8
                         bg-background/95 backdrop-blur-xl
                         shadow-[0_8px_40px_rgba(0,0,0,0.5)]
                         overflow-hidden md:hidden"
            >
              <nav aria-label="Mobile navigation">
                {NAV_LINKS.map(({ label, href }, i) => (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0  }}
                    transition={{ duration: 0.2, delay: i * 0.04, ease: EASE }}
                    className="flex items-center justify-between px-5 py-3.5
                               font-body text-[0.9375rem] text-muted/60
                               border-b border-white/5 last:border-0
                               transition-colors duration-150
                               hover:bg-white/3 hover:text-foreground"
                  >
                    <span>{label}</span>
                    <span className="text-muted/25 text-xs">→</span>
                  </motion.a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
