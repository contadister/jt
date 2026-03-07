// lib/auth/ensureUser.ts
// Ensures a Supabase auth user exists in the Prisma users table.
// Call on any authenticated API route before accessing Prisma user data.

import { prisma } from "@/lib/prisma/client";

export async function ensureUser(supabaseUser: {
  id: string;
  email?: string;
  user_metadata?: { full_name?: string; name?: string; avatar_url?: string };
}): Promise<string> {
  const email = supabaseUser.email ?? `user-${supabaseUser.id}@unknown.local`;
  const fullName =
    supabaseUser.user_metadata?.full_name ||
    supabaseUser.user_metadata?.name ||
    email.split("@")[0];

  await prisma.user.upsert({
    where: { id: supabaseUser.id },
    update: { email, fullName },
    create: {
      id: supabaseUser.id,
      email,
      fullName,
      emailVerified: true,
    },
  });

  return supabaseUser.id;
}
