import { getSupabase } from "@/lib/supabase";
import { VisitorCounterBadge } from "@/components/VisitorCounterBadge";

async function getHitCount() {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { count, error } = await supabase
    .from("portfolio_hits")
    .select("*", { count: "exact", head: true });

  return error ? null : count;
}

export async function VisitorCounter() {
  const total = await getHitCount();
  if (total === null) return null;

  return <VisitorCounterBadge total={total} />;
}
