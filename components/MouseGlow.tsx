"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Neutral white spotlight that trails the cursor with spring damping.
 * Kept intentionally dim (2.8 % white) so it reads as ambient light,
 * not an effect — hovering over text should reveal, not distract.
 */
export function MouseGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 70, damping: 25, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 70, damping: 25, mass: 0.5 });

  const background = useTransform(
    [springX, springY],
    ([x, y]: number[]) =>
      `radial-gradient(180px at ${x}px ${y}px, rgb(255 255 255 / 0.016), transparent 70%)`,
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-20 hidden md:block"
      style={{ background }}
    />
  );
}
