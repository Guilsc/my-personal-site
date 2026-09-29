import { createClient } from "@supabase/supabase-js";

export const curatiaSupabase = createClient(
  "https://jzceajrfqtrdemptlfbp.supabase.co",
  "sb_publishable_tublhoJa1W1NDqxzwCds4A_jRXJHM3r",
  { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } }
);
