// app/api/payments/initialize/route.ts
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { PrismaClient } from "@prisma/client";
import { initializeTransaction, generateReference } from "@/lib/paystack/client";
import { z } from "zod";

const prisma = new PrismaClient();

const schema = z.object({
  siteId: z.string().uuid(),
  paymentType: z.enum(["new", "renewal"]).default("new"),
});

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

    const { siteId, paymentType } = parsed.data;

    // Fetch the site
    const site = await prisma.site.findFirst({
      where: { id: siteId, userId: session.user.id },
      include: { user: true },
    });

    if (!site) {
      return NextResponse.json({ error: "Site not found" }, { status: 404 });
    }

    const amount = site.discountedPriceGhs ?? site.monthlyPriceGhs;
    const reference = generateReference(siteId);

    const txn = await initializeTransaction({
      email: session.user.email!,
      amount,
      reference,
      metadata: {
        siteId,
        userId: session.user.id,
        siteName: site.name,
        paymentType,
      },
    });

    // Save pending payment
    await prisma.payment.create({
      data: {
        userId: session.user.id,
        siteId,
        paystackReference: reference,
        amountGhs: amount,
        status: "PENDING",
        paymentType: paymentType === "renewal" ? "RENEWAL" : "NEW",
      },
    });

    return NextResponse.json({ authorizationUrl: txn.authorization_url, reference });
  } catch (error) {
    console.error("Payment init error:", error);
    return NextResponse.json({ error: "Failed to initialize payment" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
