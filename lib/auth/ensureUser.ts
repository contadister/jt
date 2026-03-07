// lib/auth/ensureUser.ts
// Syncs a Supabase auth user into the Prisma users table.
// Uses raw SQL to handle the cuid-vs-UUID mismatch without Prisma upsert constraints.

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
  const id = supabaseUser.id;

  // Step 1: If a row with this email exists but a DIFFERENT id, update the id via raw SQL
  // (Prisma won't let you update @id, but raw SQL can, and FK constraints cascade)
  await prisma.$executeRaw`
    UPDATE users
    SET id = ${id}, full_name = ${fullName}
    WHERE email = ${email} AND id != ${id}
  `;

  // Step 2: Insert the row if it still doesn't exist (brand new user)
  // ON CONFLICT (id) means: if it already exists with this id, just update name
  await prisma.$executeRaw`
    INSERT INTO users (id, email, full_name, email_verified, role, referral_credits_ghs, created_at, updated_at)
    VALUES (${id}, ${email}, ${fullName}, true, 'USER', 0, NOW(), NOW())
    ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, full_name = EXCLUDED.full_name, updated_at = NOW()
  `;

  return id;
}
