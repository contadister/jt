// app/api/admin/bootstrap/route.ts
// One-time endpoint to promote a user to ADMIN role.
// Protected by BOOTSTRAP_SECRET env var — set this in Vercel env vars.

export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export async function POST(req: Request) {
  try {
    const { email, secret } = await req.json();

    if (!process.env.BOOTSTRAP_SECRET || secret !== process.env.BOOTSTRAP_SECRET) {
      return NextResponse.json({ error: "Invalid secret" }, { status: 403 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return NextResponse.json({ error: `No user found with email: ${email}` }, { status: 404 });

    await prisma.user.update({ where: { email }, data: { role: "ADMIN" } });
    return NextResponse.json({ ok: true, message: `${email} is now ADMIN` });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
