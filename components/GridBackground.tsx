import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  className?: string;
  /** Grid cell size in px */
  cellSize?: number;
  opacity?: number;
}

export function GridBackground({
  className,
  cellSize = 80,
  opacity = 0.03,
}: GridBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div
        className="absolute inset-0"
        style={{
          opacity,
          backgroundImage: [
            `linear-gradient(to right, #CBD5E1 1px, transparent 1px)`,
            `linear-gradient(to bottom, #CBD5E1 1px, transparent 1px)`,
          ].join(", "),
          backgroundSize: `${cellSize}px ${cellSize}px`,
        }}
      />
      {/* Radial fade so grid vanishes toward the edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, #141a24 100%)",
        }}
      />
    </div>
  );
}
