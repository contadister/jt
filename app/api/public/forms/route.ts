// Public API — no auth required. Called from deployed user sites.
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client";
import { sendNewFormSubmissionEmail } from "@/lib/nalo/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { siteId, name, email, phone, message, source, ...extra } = body;

    if (!siteId || !email) {
      return NextResponse.json({ error: "siteId and email are required" }, { status: 400 });
    }

    const site = await prisma.site.findUnique({
      where: { id: siteId },
      include: { user: { select: { email: true, fullName: true, phone: true } } },
    });
    if (!site) return NextResponse.json({ error: "Site not found" }, { status: 404 });

    // Store submission
    const submission = await prisma.formSubmission.create({
      data: {
        siteId,
        name: name || email,
        email,
        phone: phone || null,
        message: message || null,
        source: source || null,
        data: { name, email, phone, message, ...extra },
        isRead: false,
      },
    });

    // Notify site owner via email
    const dashUrl = `${process.env.NEXT_PUBLIC_APP_URL}/sites/${siteId}/forms`;
    sendNewFormSubmissionEmail(
      site.user.email,
      site.user.fullName,
      site.name,
      source || "Contact Form",
      { name, email, phone, message, ...extra },
      dashUrl
    ).catch(() => undefined);

    // In-app notification for site owner
    await prisma.notification.create({
      data: {
        userId: site.userId,
        siteId,
        type: "NEW_FORM",
        title: `New form submission on ${site.name}`,
        message: `${name || email} submitted your contact form.`,
        actionUrl: `/sites/${siteId}/forms`,
      },
    });

    return NextResponse.json({ success: true, id: submission.id });
  } catch (err) {
    console.error("Public form submit error:", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
