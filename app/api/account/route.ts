export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma/client";

// Use plain supabase-js to verify the Bearer token — avoids the cookie-refresh
// issue with createRouteHandlerClient in Next.js App Router Route Handlers.
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

async function getUser(req: Request): Promise<{ supabaseId: string; prismaId: string; email: string } | null> {
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;
  if (!token) return null;
  const supabase = getSupabase();
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user || !user.email) return null;

  // Look up Prisma user by email (not by Supabase UUID — IDs may differ)
  let prismaUser = await prisma.user.findUnique({ where: { email: user.email } });
  if (!prismaUser) {
    // First-ever login: create the Prisma row with the Supabase UUID
    const fullName = String(
      user.user_metadata?.full_name || user.user_metadata?.name || user.email.split("@")[0]
    );
    prismaUser = await prisma.user.create({
      data: { id: user.id, email: user.email, fullName, emailVerified: true },
    });
  }
  return { supabaseId: user.id, prismaId: prismaUser.id, email: user.email };
}

export async function GET(req: Request) {
  try {
    const authUser = await getUser(req);
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const [user, paymentHistory] = await Promise.all([
      prisma.user.findUnique({
        where: { id: authUser.prismaId },
        select: {
          id: true, email: true, fullName: true, avatarUrl: true, phone: true,
          role: true, referralCode: true, referralCreditsGhs: true,
          emailVerified: true, createdAt: true,
          _count: { select: { referrals: true } },
        },
      }),
      prisma.payment.findMany({
        where: { userId: authUser.prismaId, status: "SUCCESS" },
        include: { site: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
        take: 20,
      }),
    ]);

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });
    return NextResponse.json({ user, paymentHistory });
  } catch (err) {
    console.error("[GET /api/account]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const authUser = await getUser(req);
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const data: Record<string, unknown> = {};
    if (body.fullName !== undefined) data.fullName = body.fullName || null;
    if (body.phone !== undefined) data.phone = body.phone || null;
    if (body.avatarUrl !== undefined) data.avatarUrl = body.avatarUrl || null;

    await prisma.user.update({ where: { id: authUser.prismaId }, data });

    if (body.fullName) {
      const supabase = getSupabase();
      const auth = req.headers.get("authorization") ?? "";
      const token = auth.slice(7);
      await supabase.auth.setSession({ access_token: token, refresh_token: "" });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[PATCH /api/account]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const authUser = await getUser(req);
    if (!authUser) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { password } = await req.json();
    if (!password || password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    // Password change requires the service role key to update on behalf of user
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { error } = await supabaseAdmin.auth.admin.updateUserById(authUser.supabaseId, { password });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[POST /api/account]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
