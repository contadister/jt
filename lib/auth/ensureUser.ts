// lib/auth/ensureUser.ts — thin wrapper, logic now lives in requireUser.ts
import { prisma } from "@/lib/prisma/client";

export async function ensureUser(supabaseUser: {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
}): Promise<string> {
  const email = supabaseUser.email ?? `user-${supabaseUser.id}@unknown.local`;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return existing.id;

  const fullName = String(
    supabaseUser.user_metadata?.full_name ||
    supabaseUser.user_metadata?.name ||
    email.split("@")[0]
  );
  const created = await prisma.user.create({
    data: { id: supabaseUser.id, email, fullName, emailVerified: true },
  });
  return created.id;
}
