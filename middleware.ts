import { NextResponse, type NextRequest } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function middleware(_req: NextRequest) {
  const supabase = getSupabase();
  if (supabase) {
    // Fire-and-forget: a dropped insert just means one missed count, never worth blocking the page on.
    supabase.from("portfolio_hits").insert({ hit_id: crypto.randomUUID() }).then(
      () => {},
      () => {},
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|api/|favicon|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)"],
};
