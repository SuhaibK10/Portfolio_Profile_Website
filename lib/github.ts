const USERNAME = "SuhaibK10";
const ENDPOINT = "https://api.github.com/graphql";
const REVALIDATE_SECONDS = 3600;

const QUERY = `query($login: String!, $from: DateTime, $to: DateTime) {
  user(login: $login) {
    createdAt
    contributionsCollection(from: $from, to: $to) {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays { date contributionCount weekday }
        }
      }
    }
  }
}`;

interface ContributionDay {
  date: string;
  contributionCount: number;
  weekday: number;
}

interface GraphQLResponse {
  data?: {
    user: {
      createdAt: string;
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          weeks: { contributionDays: ContributionDay[] }[];
        };
      };
    } | null;
  };
  errors?: { message: string }[];
}

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface GitHubContributions {
  profileUrl: string;
  username: string;
  year: number;
  availableYears: number[];
  total: number;
  weeks: { date: string; count: number; weekday: number; level: ContributionLevel }[][];
  months: { label: string; weekIndex: number }[];
  currentStreak: number;
  longestStreak: number;
}

function levelFor(count: number, max: number): ContributionLevel {
  if (count === 0) return 0;
  const ratio = count / max;
  if (ratio > 0.75) return 4;
  if (ratio > 0.5) return 3;
  if (ratio > 0.25) return 2;
  return 1;
}

export async function getGitHubContributions(year?: number): Promise<GitHubContributions | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  const now = new Date();
  const targetYear = year ?? now.getUTCFullYear();
  const from = `${targetYear}-01-01T00:00:00Z`;
  const to =
    targetYear === now.getUTCFullYear()
      ? now.toISOString()
      : `${targetYear}-12-31T23:59:59Z`;

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({ query: QUERY, variables: { login: USERNAME, from, to } }),
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;

    const { data, errors } = (await res.json()) as GraphQLResponse;
    if (errors?.length || !data?.user) return null;

    const calendar = data.user.contributionsCollection.contributionCalendar;
    const allDays = calendar.weeks.flatMap((w) => w.contributionDays);
    const max = Math.max(...allDays.map((d) => d.contributionCount), 1);

    const weeks = calendar.weeks.map((w) =>
      w.contributionDays.map((d) => ({
        date: d.date,
        count: d.contributionCount,
        weekday: d.weekday,
        level: levelFor(d.contributionCount, max),
      })),
    );

    const months: { label: string; weekIndex: number }[] = [];
    let lastMonth = -1;
    calendar.weeks.forEach((w, i) => {
      const firstDay = w.contributionDays[0];
      if (!firstDay) return;
      const month = new Date(firstDay.date).getUTCMonth();
      if (month !== lastMonth) {
        months.push({
          label: new Date(firstDay.date).toLocaleString("en-US", { month: "short", timeZone: "UTC" }),
          weekIndex: i,
        });
        lastMonth = month;
      }
    });

    let longestStreak = 0;
    let running = 0;
    for (const day of allDays) {
      if (day.contributionCount > 0) {
        running++;
        longestStreak = Math.max(longestStreak, running);
      } else {
        running = 0;
      }
    }

    const todayStr = now.toISOString().slice(0, 10);
    let currentStreak = 0;
    let i = allDays.length - 1;
    if (allDays[i]?.date === todayStr && allDays[i]?.contributionCount === 0) i--;
    for (; i >= 0; i--) {
      if (allDays[i].contributionCount > 0) currentStreak++;
      else break;
    }

    const startYear = new Date(data.user.createdAt).getUTCFullYear();
    const availableYears = Array.from(
      { length: now.getUTCFullYear() - startYear + 1 },
      (_, idx) => now.getUTCFullYear() - idx,
    );

    return {
      profileUrl: `https://github.com/${USERNAME}`,
      username: USERNAME,
      year: targetYear,
      availableYears,
      total: calendar.totalContributions,
      weeks,
      months,
      currentStreak,
      longestStreak,
    };
  } catch {
    return null;
  }
}
