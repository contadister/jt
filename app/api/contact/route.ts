import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/nalo/client";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const supportEmail = process.env.SUPPORT_EMAIL || "hello@josett.com";

    // Notify team
    await sendEmail({
      to: supportEmail,
      subject: `Contact form: ${subject || "No subject"} from ${name}`,
      html: `<p><strong>From:</strong> ${name} (${email})</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, "<br/>")}</p>`,
      replyTo: email,
    });

    // Auto-reply to sender
    await sendEmail({
      to: email,
      subject: "We received your message — Josett",
      html: `<p>Hi ${name},</p><p>Thanks for reaching out! We've received your message and will reply within 24 hours.</p><p style="color:#64748b;font-style:italic">"${message}"</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
