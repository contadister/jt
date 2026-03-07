// lib/auth/ensureUser.ts
// Syncs a Supabase auth user into the Prisma users table.
// All operations are wrapped in try/catch - never throws, never blocks auth.

import { prisma } from "@/lib/prisma/client";

export async function ensureUser(supabaseUser: {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
}): Promise<string> {
  const email = supabaseUser.email ?? `user-${supabaseUser.id}@unknown.local`;
  const rawName = (supabaseUser.user_metadata?.full_name ||
    supabaseUser.user_metadata?.name ||
    email.split("@")[0]) as string;
  const fullName = String(rawName);
  const id = supabaseUser.id;

  try {
    // Step 1: If a row with this email exists with a DIFFERENT id (cuid vs UUID),
    // migrate it to the Supabase UUID via raw SQL (cascades FK refs automatically)
    await prisma.$executeRaw`
      UPDATE users
      SET id = ${id}, full_name = ${fullName}, updated_at = NOW()
      WHERE email = ${email} AND id != ${id}
    `;
  } catch (e) {
    console.error("[ensureUser] UPDATE id failed:", e);
  }

  try {
    // Step 2: Insert if new, update if exists (by id)
    await prisma.$executeRaw`
      INSERT INTO users (id, email, full_name, email_verified, role, referral_credits_ghs, created_at, updated_at)
      VALUES (${id}, ${email}, ${fullName}, true, 'USER', 0, NOW(), NOW())
      ON CONFLICT (id) DO UPDATE
        SET email = EXCLUDED.email,
            full_name = EXCLUDED.full_name,
            updated_at = NOW()
    `;
  } catch (e) {
    console.error("[ensureUser] INSERT/upsert failed:", e);
  }

  return id;
}
