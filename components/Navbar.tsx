"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { AmbientPlayer } from "@/components/AmbientPlayer";

const NAV_LINKS = [
  { label: "About",   href: "#about"   },
  { label: "Work",    href: "#work"    },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
] as const;

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export function Navbar() {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastYRef = useRef(0);

  /* ── Auto-hide on scroll down, reveal on scroll up ── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setNavVisible(y < 80 || y < lastYRef.current);
      lastYRef.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) setNavVisible(true);
  }, [menuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [menuOpen]);

  return (
    <>
      {/* ─── Fixed centering wrapper (invisible) ────────────────────────── */}
      {/* pointer-events-none so the transparent area around the pill is
          click-through; restored on the pill itself */}
      <div className="fixed inset-x-0 top-5 z-40 flex justify-center
                      pointer-events-none px-5">

        {/* ─── Floating pill ────────────────────────────────────────────── */}
        <motion.header
          animate={{ y: navVisible ? 0 : -72, opacity: navVisible ? 1 : 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="pointer-events-auto flex h-11 w-full max-w-[680px]
                     items-center justify-between
                     rounded-full border border-white/[0.08]
                     bg-[#0D1117]/85 px-3 backdrop-blur-xl
                     shadow-[0_4px_32px_rgba(0,0,0,0.35)]"
        >

          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Back to top"
            className="flex-shrink-0 rounded-full px-2 py-1
                       font-mono text-sm font-semibold tracking-wider
                       text-foreground/75 transition-colors duration-200
                       hover:text-foreground"
          >
            SK.
          </a>

          {/* Desktop nav links */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="font-body text-[0.8125rem] text-muted/55
                           transition-colors duration-200 hover:text-foreground/90"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex flex-shrink-0 items-center gap-0.5">
            <AmbientPlayer className="relative" />

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="md:hidden flex h-8 w-8 items-center justify-center
                         rounded-full text-muted/55 transition-colors duration-200
                         hover:text-foreground focus-visible:outline-none
                         focus-visible:ring-2 focus-visible:ring-gold/40"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{    rotate: 90,  opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center justify-center"
                  >
                    <X size={16} strokeWidth={1.4} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90,  opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{    rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center justify-center"
                  >
                    <Menu size={16} strokeWidth={1.4} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>

        </motion.header>
      </div>

      {/* ─── Mobile menu overlay ─────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{    opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 flex flex-col md:hidden"
            style={{ background: "rgba(13,17,23,0.97)", backdropFilter: "blur(8px)" }}
          >
            <nav className="flex flex-1 flex-col items-center justify-center gap-1">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0  }}
                  exit={{    opacity: 0, y: 16  }}
                  transition={{ duration: 0.38, delay: i * 0.07, ease: EASE }}
                  className="group flex items-baseline gap-4 px-6 py-3.5
                             font-heading text-[2.125rem] font-semibold
                             tracking-tight text-foreground/35
                             transition-colors duration-200 hover:text-foreground"
                >
                  <span className="font-mono text-[0.5625rem] tracking-[0.22em]
                                   text-gold/30 transition-colors duration-200
                                   group-hover:text-gold/60">
                    0{i + 1}
                  </span>
                  {label}
                </motion.a>
              ))}
            </nav>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{    opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="pb-12 text-center font-mono text-[0.5rem]
                         tracking-[0.32em] text-muted/18"
            >
              SUHAIB KHAN
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
