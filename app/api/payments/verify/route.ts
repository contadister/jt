// app/api/payments/verify/route.ts
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { PrismaClient } from "@prisma/client";
import { verifyTransaction } from "@/lib/paystack/client";
import { sendPaymentConfirmationEmail } from "@/lib/arkesel/client";
import { z } from "zod";
import { format, addMonths } from "date-fns";

const prisma = new PrismaClient();

const schema = z.object({ reference: z.string().min(1) });

export async function POST(req: Request) {
  try {
    const supabase = createServerClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json() as unknown;
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { reference } = parsed.data;

    // Check if already verified
    const existing = await prisma.payment.findUnique({
      where: { paystackReference: reference },
    });

    if (!existing) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    if (existing.status === "SUCCESS") {
      return NextResponse.json({ success: true, alreadyVerified: true });
    }

    // Verify with Paystack
    const txn = await verifyTransaction(reference);

    if (txn.status !== "success") {
      await prisma.payment.update({
        where: { paystackReference: reference },
        data: { status: "FAILED" },
      });
      return NextResponse.json({ success: false, error: "Payment was not successful" }, { status: 400 });
    }

    const now = new Date();
    const periodStart = now;
    const periodEnd = addMonths(now, 1);

    // Update payment
    await prisma.payment.update({
      where: { paystackReference: reference },
      data: {
        status: "SUCCESS",
        paystackTransactionId: txn.id.toString(),
        periodStart,
        periodEnd,
        metadata: txn as unknown as Record<string, unknown>,
      },
    });

    // Activate/renew site
    await prisma.site.update({
      where: { id: existing.siteId },
      data: {
        subscriptionStart: periodStart,
        subscriptionEnd: periodEnd,
        lastPaymentAt: now,
        renewalReminderSent7d: false,
        renewalReminderSent3d: false,
        renewalReminderSent1d: false,
        renewalReminderSentExpired: false,
        status: existing.paymentType === "RENEWAL" ? "DEPLOYED" : "BUILDING",
      },
    });

    // Send confirmation email
    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    const site = await prisma.site.findUnique({ where: { id: existing.siteId } });

    if (user && site) {
      await sendPaymentConfirmationEmail(
        user.email,
        user.fullName,
        site.name,
        existing.amountGhs,
        reference,
        format(periodEnd, "dd MMM yyyy")
      );
    }

    // Create in-app notification
    await prisma.notification.create({
      data: {
        userId: existing.userId,
        siteId: existing.siteId,
        type: "SYSTEM",
        title: "Payment confirmed",
        message: `GHS ${existing.amountGhs} received for "${site?.name}". Your subscription is active until ${format(periodEnd, "dd MMM yyyy")}.`,
        actionUrl: `/dashboard/sites/${existing.siteId}`,
      },
    });

    return NextResponse.json({
      success: true,
      siteId: existing.siteId,
      paymentType: existing.paymentType,
    });
  } catch (error) {
    console.error("Payment verify error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
