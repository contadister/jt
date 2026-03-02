import { NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";
import { prisma } from "@/lib/prisma/client";
import { addDays } from "date-fns";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get("x-paystack-signature") || "";

    // Verify signature
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
      .update(body)
      .digest("hex");

    if (hash !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(body);

    if (event.event === "charge.success") {
      const reference = event.data.reference as string;

      const payment = await prisma.payment.findUnique({
        where: { paystackReference: reference },
      });

      // Only process if not already handled by the verify endpoint
      if (payment && payment.status === "PENDING") {
        const now = new Date();
        const periodEnd = addDays(now, 30);

        await prisma.$transaction([
          prisma.payment.update({
            where: { id: payment.id },
            data: {
              status: "SUCCESS",
              paystackTransactionId: String(event.data.id),
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
              reminderSent7d: false,
              reminderSent3d: false,
              reminderSent1d: false,
              reminderSentExp: false,
            },
          }),
        ]);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
