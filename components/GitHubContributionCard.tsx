"use client";

import { useState, useTransition } from "react";
import { ArrowUpRight } from "lucide-react";
import { GitHubIcon } from "@/components/icons/BrandIcons";
import { type ContributionLevel, type GitHubContributions } from "@/lib/github";

const LEVEL_COLOR: Record<ContributionLevel, string> = {
  0: "#161b22",
  1: "#0e4429",
  2: "#006d32",
  3: "#26a641",
  4: "#39d353",
};

const CELL = 10;
const GAP = 3;
const STEP = CELL + GAP;

export function GitHubContributionCard({ initial }: { initial: GitHubContributions }) {
  const [stats, setStats] = useState(initial);
  const [isPending, startTransition] = useTransition();

  function selectYear(year: number) {
    if (year === stats.year || isPending) return;
    startTransition(async () => {
      const res = await fetch(`/api/github-contributions?year=${year}`);
      if (!res.ok) return;
      const data = (await res.json()) as GitHubContributions | null;
      if (data) setStats(data);
    });
  }

  const weekCount = stats.weeks.length;
  const isCurrentYear = stats.year === stats.availableYears[0];

  const overview = [
    { label: "Current streak", value: `${stats.currentStreak}d` },
    { label: "Longest streak", value: `${stats.longestStreak}d` },
  ];

  return (
    <div className="relative z-10">

      <p className="font-heading text-lg font-semibold text-foreground">
        {stats.total.toLocaleString()} contributions in{" "}
        {isCurrentYear ? "the last year" : stats.year}
      </p>

      {/* Header */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          >
            <GitHubIcon size={16} className="text-white" />
          </span>
          <div>
            <h3 className="font-heading text-base font-semibold leading-snug text-foreground">
              GitHub
            </h3>
            <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-muted/70">
              @{stats.username}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {stats.availableYears.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => selectYear(y)}
                className="rounded-md px-2 py-1 font-mono text-[0.6875rem] tracking-[0.04em]
                           transition-colors disabled:cursor-default"
                style={{
                  backgroundColor: y === stats.year ? "#39d35326" : "transparent",
                  color: y === stats.year ? "#39d353" : "rgba(174,187,206,0.6)",
                }}
              >
                {y}
              </button>
            ))}
          </div>
          <a
            href={stats.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-[0.6875rem]
                       tracking-[0.12em] uppercase text-muted/60
                       transition-colors hover:text-foreground"
          >
            View profile
            <ArrowUpRight size={11} className="opacity-50" />
          </a>
        </div>
      </div>

      {/* Heatmap */}
      <div
        className="mt-7 overflow-x-auto pb-1 transition-opacity duration-200"
        style={{ opacity: isPending ? 0.5 : 1 }}
      >
        <div style={{ width: weekCount * STEP, minWidth: weekCount * STEP }}>
          <div className="relative mb-1.5" style={{ height: 14 }}>
            {stats.months.map((m) => (
              <span
                key={`${m.label}-${m.weekIndex}`}
                className="absolute font-mono text-[0.625rem] text-muted/50"
                style={{ left: m.weekIndex * STEP }}
              >
                {m.label}
              </span>
            ))}
          </div>

          <div
            className="grid"
            style={{
              gridTemplateRows: `repeat(7, ${CELL}px)`,
              gridTemplateColumns: `repeat(${weekCount}, ${CELL}px)`,
              gap: GAP,
            }}
          >
            {stats.weeks.flatMap((week, wi) =>
              week.map((day) => (
                <span
                  key={day.date}
                  title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                  className="rounded-[2px]"
                  style={{
                    gridColumn: wi + 1,
                    gridRow: day.weekday + 1,
                    backgroundColor: LEVEL_COLOR[day.level],
                    width: CELL,
                    height: CELL,
                  }}
                />
              )),
            )}
          </div>
        </div>
      </div>

      {/* Overview stats */}
      <dl className="mt-7 grid grid-cols-2 gap-3 border-t border-white/8 pt-5 text-center">
        {overview.map((s) => (
          <div key={s.label}>
            <dt className="font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted/60">
              {s.label}
            </dt>
            <dd className="mt-1 font-heading text-lg font-semibold text-foreground">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>

    </div>
  );
}
