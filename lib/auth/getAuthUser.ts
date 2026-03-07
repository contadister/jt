// lib/auth/getAuthUser.ts
// Returns the authenticated user's PRISMA ID (not Supabase UUID).
// This is the ID to use for all prisma.user.findUnique / site.create / etc.

import { createServerClient } from "@/lib/supabase/server";
import { ensureUser } from "./ensureUser";

export type AuthUser = {
  prismaId: string;       // Use this for all Prisma queries
  supabaseId: string;     // The Supabase auth UUID
  email?: string;
};

export async function getAuthUser(req: Request): Promise<AuthUser | null> {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const supabase = createServerClient();

  let supabaseUser: { id: string; email?: string; user_metadata?: Record<string, unknown> } | null = null;

  if (token) {
    const { data } = await supabase.auth.getUser(token);
    if (data.user) supabaseUser = data.user;
  }

  if (!supabaseUser) {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user) supabaseUser = data.session.user;
  }

  if (!supabaseUser) return null;

  try {
    const prismaId = await ensureUser(supabaseUser);
    return { prismaId, supabaseId: supabaseUser.id, email: supabaseUser.email };
  } catch (e) {
    console.error("[getAuthUser] ensureUser failed:", e);
    return null;
  }
}
