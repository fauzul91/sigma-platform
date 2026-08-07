import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl) {
  console.warn(
    "[Supabase Admin] Missing NEXT_PUBLIC_SUPABASE_URL. Admin login cannot reach Supabase without it.",
  );
}

if (!supabaseServiceRoleKey) {
  console.warn(
    "[Supabase Admin] Missing SUPABASE_SERVICE_ROLE_KEY. Admin login is disabled until it is set.",
  );
}

export const supabaseAdmin =
  supabaseUrl && supabaseServiceRoleKey
    ? createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      })
    : null;