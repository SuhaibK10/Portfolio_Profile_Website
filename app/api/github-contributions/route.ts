import { NextRequest, NextResponse } from "next/server";
import { getGitHubContributions } from "@/lib/github";

export async function GET(req: NextRequest) {
  const yearParam = req.nextUrl.searchParams.get("year");
  const year = yearParam ? parseInt(yearParam, 10) : undefined;

  const stats = await getGitHubContributions(year);
  if (!stats) return NextResponse.json(null, { status: 502 });

  return NextResponse.json(stats);
}
