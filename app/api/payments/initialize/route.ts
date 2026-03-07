export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/requireUser";
import { initializePayment } from "@/lib/paystack/client";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    const user = await requireUser(req);
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { siteId, amountGhs } = await req.json();
    if (!siteId || !amountGhs) {
      return NextResponse.json({ error: "Missing siteId or amountGhs" }, { status: 400 });
    }

    // Verify site belongs to this user (using prismaId — correct DB id)
    const site = await prisma.site.findFirst({
      where: { id: siteId, userId: user.prismaId },
    });
    if (!site) return NextResponse.json({ error: "Site not found" }, { status: 404 });

    const reference = `josett_${nanoid(16)}`;
    const isRenewal = !!site.subscriptionEnd;

    await prisma.payment.create({
      data: {
        userId: user.prismaId,
        siteId,
        paystackReference: reference,
        amountGhs,
        status: "PENDING",
        paymentType: isRenewal ? "RENEWAL" : "NEW",
      },
    });

    const result = await initializePayment({
      email: user.email,
      amount: amountGhs,
      reference,
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/payment/verify`,
      metadata: { siteId, userId: user.prismaId, siteName: site.name },
    });

    return NextResponse.json({ authorization_url: result.authorization_url, reference });
  } catch (error) {
    console.error("Payment initialize error:", error);
    return NextResponse.json({ error: "Payment initialization failed" }, { status: 500 });
  }
}
