import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { LeetCodeIcon } from "@/components/icons/BrandIcons";
import { getLeetCodeStats } from "@/lib/leetcode";

const ACCENT = "#A78BFA";

const DIFFICULTY_COLOR = {
  Easy:   "#2DD4BF",
  Medium: "#FBBF24",
  Hard:   "#FB7185",
} as const;

const RING_RADIUS = 48;
const RING_STROKE = 8;
const RING_GAP = 6;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

function timeAgo(timestamp: number) {
  const days = Math.floor((Date.now() - timestamp) / 86_400_000);
  if (days < 1) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  return months === 1 ? "1 month ago" : `${months} months ago`;
}

export async function LeetCode() {
  const stats = await getLeetCodeStats();
  if (!stats) return null;

  const active = stats.difficulties.filter((d) => d.solved > 0);
  const single = active.length === 1;
  let consumed = 0;
  const arcs = active.map((d) => {
    const span = (d.solved / stats.solved) * RING_CIRCUMFERENCE;
    const arc = {
      label: d.label,
      single,
      dash: single ? RING_CIRCUMFERENCE : Math.max(span - RING_GAP - RING_STROKE, 0.1),
      start: single ? 0 : consumed + (RING_GAP + RING_STROKE) / 2,
    };
    consumed += span;
    return arc;
  });

  const overview = [
    { label: "Global rank", value: stats.ranking.toLocaleString("en-IN") },
    { label: "Active days", value: String(stats.activeDays) },
    { label: "Max streak",  value: String(stats.maxStreak) },
  ];

  return (
    <Section id="leetcode">
      <Container>

        <AnimatedReveal>
          <SectionHeading title="Problem Solving" align="center" />
        </AnimatedReveal>

        <AnimatedReveal className="mx-auto mt-14 max-w-2xl" threshold="-40px">
          <div className="group relative overflow-hidden rounded-xl border border-white/8
                          bg-card/60 px-6 py-6 backdrop-blur-sm transition-colors
                          duration-300 hover:border-white/16 md:px-8">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-50
                         transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background: `radial-gradient(circle at 92% -8%, ${ACCENT}22, transparent 60%)`,
              }}
            />

            <div className="relative z-10">

              {/* Header */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "#FFA1161A" }}
                  >
                    <LeetCodeIcon size={16} className="text-[#FFA116]" />
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-semibold leading-snug text-foreground">
                      LeetCode
                    </h3>
                    <p className="font-mono text-[0.6875rem] tracking-[0.12em] text-muted/70">
                      @{stats.username}
                    </p>
                  </div>
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

              {/* Solved + difficulty breakdown */}
              <div className="mt-7 flex flex-col items-center gap-7 sm:flex-row sm:justify-center sm:gap-12">
                <div className="relative h-36 w-36 shrink-0">
                  <svg
                    viewBox="0 0 120 120"
                    className="h-full w-full"
                    role="img"
                    aria-label={`${stats.solved} of ${stats.total} problems solved`}
                  >
                    <circle
                      cx="60" cy="60" r={RING_RADIUS}
                      fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={RING_STROKE}
                    />
                    {arcs.map((a) => (
                      <circle
                        key={a.label}
                        cx="60" cy="60" r={RING_RADIUS}
                        fill="none"
                        stroke={DIFFICULTY_COLOR[a.label]}
                        strokeWidth={RING_STROKE}
                        strokeLinecap={a.single ? "butt" : "round"}
                        strokeDasharray={`${a.dash} ${RING_CIRCUMFERENCE}`}
                        strokeDashoffset={-a.start}
                        transform="rotate(-90 60 60)"
                        style={{ filter: `drop-shadow(0 0 5px ${DIFFICULTY_COLOR[a.label]}66)` }}
                      />
                    ))}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-heading text-3xl font-semibold leading-none text-foreground">
                      {stats.solved}
                    </span>
                    <span className="mt-1.5 font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted/60">
                      of {stats.total}
                    </span>
                  </div>
                </div>

                <ul className="w-full max-w-52 space-y-2.5">
                  {stats.difficulties.map((d) => (
                    <li
                      key={d.label}
                      className="flex items-center justify-between rounded-lg bg-white/4 px-3.5 py-2"
                    >
                      <span className="flex items-center gap-2.5 font-body text-sm text-foreground-secondary">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{
                            backgroundColor: DIFFICULTY_COLOR[d.label],
                            boxShadow: `0 0 8px ${DIFFICULTY_COLOR[d.label]}88`,
                          }}
                        />
                        {d.label}
                      </span>
                      <span className="font-heading text-sm font-semibold text-foreground">
                        {d.solved}
                        <span className="font-body text-xs font-normal text-muted/60"> / {d.total}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Overview stats */}
              <dl className="mt-7 grid grid-cols-3 gap-3 border-t border-white/8 pt-5 text-center">
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

              {/* Recent solves */}
              {stats.recent.length > 0 && (
                <div className="mt-6 border-t border-white/8 pt-5">
                  <p className="mb-3 font-mono text-[0.625rem] tracking-[0.12em] uppercase text-muted/60">
                    Recently solved
                  </p>
                  <ul className="space-y-2">
                    {stats.recent.map((s) => (
                      <li key={`${s.url}-${s.solvedAt}`} className="flex items-baseline justify-between gap-4">
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-body text-sm text-foreground-secondary
                                     transition-colors hover:text-gold"
                        >
                          {s.title}
                        </a>
                        <span className="shrink-0 font-mono text-[0.6875rem] text-muted/60">
                          {timeAgo(s.solvedAt)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          </div>
        </AnimatedReveal>

      </Container>
    </Section>
  );
}
