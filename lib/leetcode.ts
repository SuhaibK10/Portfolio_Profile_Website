const USERNAME = "Suhaibk911";
const ENDPOINT = "https://leetcode.com/graphql";
const REVALIDATE_SECONDS = 3600;

const QUERY = `query u($username: String!) {
  matchedUser(username: $username) {
    profile { ranking }
    submitStatsGlobal { acSubmissionNum { difficulty count } }
    userCalendar { streak totalActiveDays }
  }
  allQuestionsCount { difficulty count }
  recentAcSubmissionList(username: $username, limit: 5) { title titleSlug timestamp }
}`;

type Difficulty = "Easy" | "Medium" | "Hard";

interface DifficultyCount {
  difficulty: string;
  count: number;
}

interface GraphQLResponse {
  data?: {
    matchedUser: {
      profile: { ranking: number };
      submitStatsGlobal: { acSubmissionNum: DifficultyCount[] };
      userCalendar: { streak: number; totalActiveDays: number };
    } | null;
    allQuestionsCount: DifficultyCount[];
    recentAcSubmissionList: { title: string; titleSlug: string; timestamp: string }[] | null;
  };
}

export interface LeetCodeStats {
  profileUrl: string;
  username: string;
  ranking: number;
  solved: number;
  total: number;
  difficulties: { label: Difficulty; solved: number; total: number }[];
  activeDays: number;
  maxStreak: number;
  recent: { title: string; url: string; solvedAt: number }[];
}

const countFor = (list: DifficultyCount[], difficulty: string) =>
  list.find((d) => d.difficulty === difficulty)?.count ?? 0;

export async function getLeetCodeStats(): Promise<LeetCodeStats | null> {
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Referer: "https://leetcode.com" },
      body: JSON.stringify({ query: QUERY, variables: { username: USERNAME } }),
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;

    const { data } = (await res.json()) as GraphQLResponse;
    const user = data?.matchedUser;
    if (!data || !user) return null;

    const solvedBy = user.submitStatsGlobal.acSubmissionNum;
    const totalBy = data.allQuestionsCount;

    return {
      profileUrl: `https://leetcode.com/u/${USERNAME}/`,
      username: USERNAME,
      ranking: user.profile.ranking,
      solved: countFor(solvedBy, "All"),
      total: countFor(totalBy, "All"),
      difficulties: (["Easy", "Medium", "Hard"] as const).map((label) => ({
        label,
        solved: countFor(solvedBy, label),
        total: countFor(totalBy, label),
      })),
      activeDays: user.userCalendar.totalActiveDays,
      maxStreak: user.userCalendar.streak,
      recent: (data.recentAcSubmissionList ?? []).map((s) => ({
        title: s.title,
        url: `https://leetcode.com/problems/${s.titleSlug}/`,
        solvedAt: Number(s.timestamp) * 1000,
      })),
    };
  } catch {
    return null;
  }
}
