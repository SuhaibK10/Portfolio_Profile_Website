"use client";

import Link from "next/link";
import { useScroll, useSpring, motion, useTransform } from "framer-motion";

const NAV_LINKS = [
  { label: "Home",    href: "/"         },
  { label: "About",   href: "/#about"   },
  { label: "Skills",  href: "/#skills"  },
  { label: "Work",    href: "/#work"    },
  { label: "Writing", href: "/#writing" },
  { label: "Contact", href: "/#contact" },
] as const;

export function Navbar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const opacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);

  return (
    <div className="fixed inset-x-0 top-5 z-40 flex justify-center pointer-events-none px-5">
      <header
        className="relative overflow-hidden pointer-events-auto flex h-11 w-full max-w-170
                   items-center
                   rounded-full border border-white/8
                   bg-background/85 px-4 backdrop-blur-xl
                   shadow-[0_4px_32px_rgba(0,0,0,0.4),0_0_40px_rgba(201,168,92,0.18),0_0_80px_rgba(201,168,92,0.08)]"
      >
        {/* Scroll progress — clipped to navbar pill */}
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-px origin-left"
          style={{
            scaleX,
            opacity,
            background: "linear-gradient(90deg, #6366F1 0%, #818CF8 40%, #A78BFA 70%, #D4AF6C 100%)",
          }}
        />
        <nav className="flex flex-1 items-center justify-between" aria-label="Main navigation">
          {NAV_LINKS.map(({ label, href }, i) => (
            <Link
              key={href}
              href={href}
              style={{
                animationName:           "nav-in",
                animationDuration:       "0.4s",
                animationTimingFunction: "cubic-bezier(0.21,0.47,0.32,0.98)",
                animationDelay:          `${0.1 + i * 0.1}s`,
                animationFillMode:       "forwards",
              }}
              className="nav-link font-body text-[0.6875rem] md:text-[0.8125rem] text-muted/55
                         transition-colors duration-200 hover:text-foreground/90"
            >
              {label}
            </Link>
          ))}
        </nav>
      </header>
    </div>
  );
}
