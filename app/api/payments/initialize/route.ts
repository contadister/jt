import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { initializePayment } from "@/lib/paystack/client";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    const supabase = createServerClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { siteId, amountGhs } = await req.json();
    if (!siteId || !amountGhs) {
      return NextResponse.json({ error: "Missing siteId or amountGhs" }, { status: 400 });
    }

    // Verify site belongs to this user
    const site = await prisma.site.findFirst({ where: { id: siteId, userId: session.user.id } });
    if (!site) return NextResponse.json({ error: "Site not found" }, { status: 404 });

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const reference = `josett_${nanoid(16)}`;
    const isRenewal = !!site.subscriptionEnd;

    // Create pending payment record
    await prisma.payment.create({
      data: {
        userId: session.user.id,
        siteId,
        paystackReference: reference,
        amountGhs,
        status: "PENDING",
        paymentType: isRenewal ? "RENEWAL" : "NEW",
      },
    });

    // Initialize with Paystack
    const result = await initializePayment({
      email: user.email,
      amount: amountGhs,
      reference,
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/verify`,
      metadata: { siteId, userId: session.user.id, siteName: site.name },
    });

    return NextResponse.json({ authorization_url: result.authorization_url, reference });
  } catch (error) {
    console.error("Payment initialize error:", error);
    return NextResponse.json({ error: "Payment initialization failed" }, { status: 500 });
  }
}
