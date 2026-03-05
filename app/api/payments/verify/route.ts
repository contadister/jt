import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { verifyPayment } from "@/lib/paystack/client";
import { sendPaymentConfirmationEmail, sendSiteDeployedEmail } from "@/lib/nalo/client";
import { addDays } from "date-fns";

export async function POST(req: Request) {
  try {
    const { reference } = await req.json();
    if (!reference) return NextResponse.json({ error: "Missing reference" }, { status: 400 });

    const payment = await prisma.payment.findUnique({
      where: { paystackReference: reference },
      include: { user: true, site: true },
    });

    if (!payment) return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    if (payment.status === "SUCCESS") return NextResponse.json({ success: true, alreadyVerified: true });

    // Verify with Paystack
    const paystackData = await verifyPayment(reference);

    if (paystackData.status !== "success") {
      await prisma.payment.update({ where: { id: payment.id }, data: { status: "FAILED" } });
      return NextResponse.json({ success: false, error: "Payment not successful" }, { status: 402 });
    }

    const now = new Date();
    const periodEnd = addDays(now, 30);

    // Update payment + site in a transaction
    await prisma.$transaction([
      prisma.payment.update({
        where: { id: payment.id },
        data: {
          status: "SUCCESS",
          paystackTransactionId: String(paystackData.id),
          periodStart: now,
          periodEnd,
        },
      }),
      prisma.site.update({
        where: { id: payment.siteId },
        data: {
          subscriptionStart: now,
          subscriptionEnd: periodEnd,
          lastPaymentAt: now,
          status: "BUILDING", // will be updated to DEPLOYED after deploy
          // Reset reminder flags for renewals
          reminderSent7d: false,
          reminderSent3d: false,
          reminderSent1d: false,
          reminderSentExp: false,
        },
      }),
    ]);

    // Send confirmation email
    sendPaymentConfirmationEmail(
      payment.user.email,
      payment.user.fullName,
      payment.site.name,
      payment.amountGhs,
      periodEnd
    ).catch(console.error);

    // Trigger deployment (async — don't await)
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sites/${payment.siteId}/deploy`, {
      method: "POST",
      headers: { "x-internal-secret": process.env.CRON_SECRET || "" },
    }).catch(console.error);

    return NextResponse.json({ success: true, siteId: payment.siteId });
  } catch (error) {
    console.error("Payment verify error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}
