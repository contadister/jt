// app/api/payments/checkout/route.ts
// Initialises a Paystack payment for a customer buying from a user's store.
// The site owner's Paystack key is used so funds go directly to their account (Paystack split or subaccount).
// For now: initialises standard Paystack payment, site owner receives funds.
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export async function POST(req: Request) {
  try {
    const { orderId, callbackUrl } = await req.json();
    if (!orderId) return NextResponse.json({ error: "orderId required" }, { status: 400 });

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { site: { include: { user: true } } },
    });
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    if (order.status !== "PENDING") return NextResponse.json({ error: "Order already processed" }, { status: 400 });

    // Use site owner's Paystack key if configured, else platform key
    const secretKey = order.site.userPaystackSecretKeyEncrypted || process.env.PAYSTACK_SECRET_KEY!;

    const paystackRef = `order-${order.orderNumber}-${Date.now()}`;
    const amountKobo = Math.round(order.totalGhs * 100); // Paystack uses pesewas for GHS

    const res = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email:     order.customerEmail,
        amount:    amountKobo,
        currency:  "GHS",
        reference: paystackRef,
        callback_url: callbackUrl || `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/checkout/verify`,
        metadata: {
          order_id:    order.id,
          order_number: order.orderNumber,
          site_id:     order.siteId,
          customer_name: order.customerName,
        },
      }),
    });

    const data = await res.json();
    if (!data.status) {
      console.error("Paystack checkout error:", data);
      return NextResponse.json({ error: "Payment initialization failed" }, { status: 500 });
    }

    // Store reference on order
    await prisma.order.update({
      where: { id: order.id },
      data: { paystackReference: paystackRef },
    });

    return NextResponse.json({
      authorizationUrl: data.data.authorization_url,
      reference: paystackRef,
    });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
