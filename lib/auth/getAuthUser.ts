// lib/auth/getAuthUser.ts
// Single function to get authenticated user from Bearer token or cookie session.
// Returns null if not authenticated.

import { createServerClient } from "@/lib/supabase/server";
import { ensureUser } from "./ensureUser";

export type AuthUser = {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
};

export async function getAuthUser(req: Request): Promise<AuthUser | null> {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const supabase = createServerClient();

  let user: AuthUser | null = null;

  if (token) {
    const { data } = await supabase.auth.getUser(token);
    if (data.user) user = data.user as AuthUser;
  }

  if (!user) {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user) user = data.session.user as AuthUser;
  }

  if (!user) return null;

  // Sync to Prisma — wrapped in try/catch so auth errors don't crash routes
  try {
    await ensureUser(user);
  } catch (e) {
    console.error("ensureUser failed (non-fatal):", e);
  }
  return user;
}
