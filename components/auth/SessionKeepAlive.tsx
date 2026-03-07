"use client";
// Silently refreshes the Supabase session every 10 minutes so it never expires
// during an active session. Mount this in the dashboard layout.

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function SessionKeepAlive() {
  useEffect(() => {
    const supabase = createClient();

    // Refresh immediately on mount
    supabase.auth.getSession();

    // Then every 10 minutes
    const interval = setInterval(() => {
      supabase.auth.getSession();
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return null;
}
