import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// auth-helpers-nextjs handles persistSession and autoRefreshToken automatically
export const createClient = () => createClientComponentClient();
