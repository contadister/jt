// Public API — no auth required. Called from deployed user sites.
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rate-limit";
import { prisma } from "@/lib/prisma/client";
import { sendNewFormSubmissionEmail } from "@/lib/nalo/client";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rl = rateLimit(ip, { limit: 10, windowMs: 60_000 });
    if (!rl.ok) return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });

    const body = await req.json();
    const { siteId, formId, formName, ...fields } = body;

    if (!siteId) {
      return NextResponse.json({ error: "siteId is required" }, { status: 400 });
    }

    const site = await prisma.site.findUnique({
      where: { id: siteId },
      include: { user: { select: { email: true, fullName: true } } },
    });
    if (!site) return NextResponse.json({ error: "Site not found" }, { status: 404 });

    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      null;

    const submission = await prisma.formSubmission.create({
      data: {
        siteId,
        formId:   formId   || "contact",
        formName: formName || "Contact Form",
        data:     fields,
        ipAddress,
        isRead:   false,
      },
    });

    // Notify site owner via email (fire-and-forget)
    const dashUrl = `${process.env.NEXT_PUBLIC_APP_URL}/sites/${siteId}/forms`;
    sendNewFormSubmissionEmail(
      site.user.email,
      site.user.fullName,
      site.name,
      formName || "Contact Form",
      fields,
      dashUrl
    ).catch(() => undefined);

    // In-app notification
    const senderName = (fields.name as string) || (fields.email as string) || "Someone";
    await prisma.notification.create({
      data: {
        userId:    site.userId,
        siteId,
        type:      "NEW_FORM",
        title:     `New form submission on ${site.name}`,
        message:   `${senderName} submitted your ${formName || "contact"} form.`,
        actionUrl: `/sites/${siteId}/forms`,
      },
    });

    return NextResponse.json({ success: true, id: submission.id });
  } catch (err) {
    console.error("Public form submit error:", err);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
