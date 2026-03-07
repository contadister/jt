// lib/auth/ensureUser.ts
// Returns the Prisma user ID for the given Supabase auth user.
// Looks up by email first (not by Supabase UUID) so existing rows are always found.
// Only creates a new row if the email genuinely doesn't exist yet.

import { prisma } from "@/lib/prisma/client";

export async function ensureUser(supabaseUser: {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
}): Promise<string> {
  const email = supabaseUser.email ?? `user-${supabaseUser.id}@unknown.local`;
  const fullName = String(
    supabaseUser.user_metadata?.full_name ||
    supabaseUser.user_metadata?.name ||
    email.split("@")[0]
  );

  // Look up by email — works regardless of what ID is stored
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return existing.id; // Return the actual Prisma ID (may be cuid or UUID)
  }

  // Brand new user — create with Supabase UUID as ID
  const created = await prisma.user.create({
    data: { id: supabaseUser.id, email, fullName, emailVerified: true },
  });
  return created.id;
}
