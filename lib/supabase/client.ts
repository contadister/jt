import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const createClient = () =>
  createClientComponentClient({
    options: {
      auth: {
        // Persist session in localStorage across tabs/windows
        persistSession: true,
        // Auto-refresh the token before it expires (keeps session alive)
        autoRefreshToken: true,
        // Detect session from URL on OAuth callbacks
        detectSessionInUrl: true,
      },
    },
  });
