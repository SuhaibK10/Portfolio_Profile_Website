import { Section } from "@/components/Section";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { AnimatedReveal } from "@/components/AnimatedReveal";
import { GitHubContributionCard } from "@/components/GitHubContributionCard";
import { getGitHubContributions } from "@/lib/github";

const ACCENT = "#A78BFA";

export async function GitHub() {
  const stats = await getGitHubContributions();
  if (!stats) return null;

  return (
    <Section id="github">
      <Container>

        <AnimatedReveal>
          <SectionHeading title="Open Source Activity" align="center" />
        </AnimatedReveal>

        <AnimatedReveal className="mx-auto mt-14 max-w-3xl" threshold="-40px">
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

            <GitHubContributionCard initial={stats} />
          </div>
        </AnimatedReveal>

      </Container>
    </Section>
  );
}
