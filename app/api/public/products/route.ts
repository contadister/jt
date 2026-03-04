// Public API — no auth required. Called from deployed user sites.
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const siteId = url.searchParams.get("siteId");
  const category = url.searchParams.get("category");
  const search = url.searchParams.get("search");

  if (!siteId) return NextResponse.json({ error: "siteId required" }, { status: 400 });

  const products = await prisma.product.findMany({
    where: {
      siteId,
      isAvailable: true,
      ...(category ? { category } : {}),
      ...(search ? { name: { contains: search, mode: "insensitive" as const } } : {}),
    },
    select: {
      id: true, name: true, description: true, priceGhs: true, comparePriceGhs: true,
      images: true, category: true, stockQuantity: true, tags: true, slug: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ products });
}

// Create order from public site
export async function POST(req: Request) {
  try {
    const { siteId, items, customerName, customerEmail, customerPhone, shippingAddress } = await req.json();
    if (!siteId || !items?.length || !customerEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const site = await prisma.site.findUnique({
      where: { id: siteId },
      include: { user: { select: { email: true, fullName: true } } },
    });
    if (!site) return NextResponse.json({ error: "Site not found" }, { status: 404 });

    // Fetch product prices server-side (never trust client prices)
    const productIds = items.map((i: { productId: string }) => i.productId);
    const products = await prisma.product.findMany({ where: { id: { in: productIds }, siteId } });
    const productMap = Object.fromEntries(products.map((p) => [p.id, p]));

    let totalGhs = 0;
    const orderItems = items.map((item: { productId: string; quantity: number }) => {
      const product = productMap[item.productId];
      if (!product) throw new Error(`Product ${item.productId} not found`);
      const lineTotal = product.priceGhs * item.quantity;
      totalGhs += lineTotal;
      return { productId: product.id, name: product.name, quantity: item.quantity, priceGhs: product.priceGhs, totalGhs: lineTotal };
    });

    const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`;
    const order = await prisma.order.create({
      data: {
        siteId,
        orderNumber,
        customerName: customerName || customerEmail,
        customerEmail,
        customerPhone: customerPhone || null,
        shippingAddress: shippingAddress || null,
        totalGhs,
        status: "PENDING",
        orderItems: { create: orderItems },
      },
      include: { orderItems: true },
    });

    // Notify owner
    const dashUrl = `${process.env.NEXT_PUBLIC_APP_URL}/sites/${siteId}/store`;
    const { sendNewOrderEmail } = await import("@/lib/nalo/client");
    sendNewOrderEmail(site.user.email, site.user.fullName, site.name, order.orderNumber, customerName || customerEmail, totalGhs, dashUrl).catch(() => undefined);

    await prisma.notification.create({
      data: {
        userId: site.userId, siteId, type: "NEW_ORDER",
        title: `New order on ${site.name}`,
        message: `Order #${orderNumber} from ${customerName || customerEmail} — GHS ${totalGhs}`,
        actionUrl: `/sites/${siteId}/store`,
      },
    });

    return NextResponse.json({ success: true, orderId: order.id, orderNumber });
  } catch (err) {
    console.error("Public order error:", err);
    return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
  }
}
