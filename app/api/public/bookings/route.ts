// Public API — no auth required
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { sendNewBookingEmail } from "@/lib/nalo/client";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const siteSlug = url.searchParams.get("siteSlug");
  const siteId   = url.searchParams.get("siteId");

  const site = await prisma.site.findFirst({
    where: siteSlug ? { slug: siteSlug } : { id: siteId! },
    select: { id: true, name: true, primaryColor: true },
  });
  if (!site) return NextResponse.json({ error: "Site not found" }, { status: 404 });

  const services = await prisma.service.findMany({
    where: { siteId: site.id, isActive: true },
    orderBy: { createdAt: "asc" },
    select: { id: true, name: true, description: true, durationMinutes: true, priceGhs: true },
  });

  return NextResponse.json({ site, services });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      siteSlug, siteId, serviceId, serviceName,
      bookingDate, bookingTime, durationMinutes, priceGhs,
      clientName, clientEmail, clientPhone, notes,
    } = body;

    const site = await prisma.site.findFirst({
      where: siteSlug ? { slug: siteSlug } : { id: siteId },
      include: { user: { select: { email: true, fullName: true } } },
    });
    if (!site) return NextResponse.json({ error: "Site not found" }, { status: 404 });

    const booking = await prisma.booking.create({
      data: {
        siteId: site.id,
        serviceId: serviceId || null,
        serviceName: serviceName || "Appointment",
        bookingDate: new Date(bookingDate),
        bookingTime,
        durationMinutes: durationMinutes || 60,
        priceGhs: priceGhs ?? null,
        clientName,
        clientEmail,
        clientPhone: clientPhone || null,
        notes: notes || null,
        status: "PENDING",
      },
    });

    const dashUrl = `${process.env.NEXT_PUBLIC_APP_URL}/sites/${site.id}/bookings`;
    sendNewBookingEmail(
      site.user.email, site.user.fullName, site.name,
      clientName, serviceName || "Appointment", bookingDate, bookingTime, dashUrl
    ).catch(() => undefined);

    await prisma.notification.create({
      data: {
        userId: site.userId, siteId: site.id, type: "NEW_BOOKING",
        title: `New booking on ${site.name}`,
        message: `${clientName} booked "${serviceName || "Appointment"}" for ${bookingDate} at ${bookingTime}`,
        actionUrl: `/sites/${site.id}/bookings`,
      },
    });

    return NextResponse.json({ success: true, bookingId: booking.id });
  } catch (err) {
    console.error("Public booking error:", err);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
