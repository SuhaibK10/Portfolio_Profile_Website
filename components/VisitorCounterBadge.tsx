"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Users } from "lucide-react";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;
const REVEAL_DELAY = 1600; // ms — long enough to notice, short enough not to feel laggy
const PLUS_ONE_DURATION = 1400; // ms the "+1" stays visible before fading

export function VisitorCounterBadge({ total }: { total: number }) {
  const [showPlusOne, setShowPlusOne] = useState(false);

  useEffect(() => {
    const revealTimer = setTimeout(() => setShowPlusOne(true), REVEAL_DELAY);
    return () => clearTimeout(revealTimer);
  }, []);

  useEffect(() => {
    if (!showPlusOne) return;
    const hideTimer = setTimeout(() => setShowPlusOne(false), PLUS_ONE_DURATION);
    return () => clearTimeout(hideTimer);
  }, [showPlusOne]);

  return (
    <div className="fixed bottom-5 left-5 z-50">
      <div
        className="relative flex h-11 items-center gap-2 rounded-full border
                   border-border/70 bg-card/90 px-4 backdrop-blur-sm
                   text-foreground-secondary"
        title={`${total.toLocaleString()} visits`}
      >
        <Users size={15} strokeWidth={1.8} className="shrink-0 text-muted/60" />

        <span className="font-mono text-[0.8125rem] tabular-nums">
          {total.toLocaleString()}
        </span>
        <span className="font-mono text-[0.8125rem]">
          Visits
        </span>

        {/* "+1" flourish — signals this visit just got counted */}
        <AnimatePresence>
          {showPlusOne && (
            <motion.span
              key="plus-one"
              initial={{ opacity: 0, y: 4, scale: 0.9 }}
              animate={{ opacity: 1, y: -16, scale: 1 }}
              exit={{ opacity: 0, y: -26 }}
              transition={{ duration: 0.6, ease: EASE }}
              className="pointer-events-none absolute -top-1 left-7
                         font-mono text-[0.75rem] font-medium text-gold"
            >
              +1
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
