// lib/auth/requireUser.ts
// THE single auth helper for all API routes.
// Supports both Bearer token (used by client-side fetch) and cookie session.
// Always returns the PRISMA ID — never the Supabase UUID.

import { createServerClient } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma/client";

export type ReqUser = {
  prismaId: string;
  supabaseId: string;
  email: string;
};

function adminSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function getPrismaId(supabaseId: string, email: string, name?: string): Promise<string> {
  // Look up by email — this works regardless of what ID format is stored
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return existing.id;

  // New user — create with Supabase UUID
  const fullName = name || email.split("@")[0];
  const created = await prisma.user.create({
    data: { id: supabaseId, email, fullName, emailVerified: true },
  });
  return created.id;
}

export async function requireUser(req: Request): Promise<ReqUser | null> {
  try {
    const authHeader = req.headers.get("authorization") ?? "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (token) {
      // Verify token with Supabase (getUser contacts the auth server — secure)
      const supabase = adminSupabase();
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (error || !user || !user.email) return null;

      const prismaId = await getPrismaId(
        user.id,
        user.email,
        String(user.user_metadata?.full_name || user.user_metadata?.name || "")
      );
      return { prismaId, supabaseId: user.id, email: user.email };
    }

    // Fall back to cookie session
    const supabase = createServerClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user?.email) return null;

    const { user } = session;
    const prismaId = await getPrismaId(
      user.id,
      user.email!,
      String(user.user_metadata?.full_name || "")
    );
    return { prismaId, supabaseId: user.id, email: user.email! };
  } catch (e) {
    console.error("[requireUser] error:", e);
    return null;
  }
}

// Convenience: returns 401 JSON if not authed, otherwise user
export async function requireUserOrUnauthorized(req: Request) {
  const user = await requireUser(req);
  return user;
}
