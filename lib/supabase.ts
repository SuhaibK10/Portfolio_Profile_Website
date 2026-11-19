import { createClient } from "@supabase/supabase-js";

interface Database {
  public: {
    Tables: {
      portfolio_hits: {
        Row: { id: string; hit_id: string; first_seen: string };
        Insert: { hit_id: string };
        Update: { hit_id?: string };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}

let client: ReturnType<typeof createClient<Database>> | null = null;

/** Server-only Supabase client, scoped by RLS to the anon role's policies. */
export function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  if (!client) {
    client = createClient<Database>(url, key, {
      auth: { persistSession: false },
    });
  }
  return client;
}
