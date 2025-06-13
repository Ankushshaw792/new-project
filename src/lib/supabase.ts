import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/supabase";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Validate that we have proper Supabase credentials
if (!supabaseUrl || supabaseUrl === "YOUR_SUPABASE_PROJECT_URL" || !supabaseUrl.startsWith("https://")) {
  throw new Error(
    "Missing or invalid VITE_SUPABASE_URL. Please set a valid Supabase project URL in your .env file."
  );
}

if (!supabaseAnonKey || supabaseAnonKey === "YOUR_SUPABASE_ANON_KEY") {
  throw new Error(
    "Missing or invalid VITE_SUPABASE_ANON_KEY. Please set a valid Supabase anonymous key in your .env file."
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);