// lib/resend/client.ts
// Resend - modern transactional email. Free: 3,000 emails/month.
// Docs: https://resend.com/docs
// Install: npm install resend

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "Josett <noreply@josett.com>";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://josett.com";

// ── Email templates ───────────────────────────────────────────

function emailBase(content: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f1f5f9;color:#1e293b}
.wrap{max-width:600px;margin:40px auto;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,.08)}
.head{background:linear-gradient(135deg,#6272f1 0%,#8b5cf6 100%);padding:40px 36px;text-align:center}
.head h1{color:#fff;font-size:26px;font-weight:800;letter-spacing:-0.5px}
.head p{color:rgba(255,255,255,.75);font-size:14px;margin-top:6px}
.body{padding:40px 36px}
.body p{font-size:15px;line-height:1.7;color:#475569;margin-bottom:16px}
.body strong{color:#1e293b}
.btn{display:inline-block;background:linear-gradient(135deg,#6272f1,#8b5cf6);color:#fff!important;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;margin:8px 0}
.card{background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:20px 24px;margin:20px 0}
.card p{margin-bottom:8px;font-size:14px}
.card p:last-child{margin-bottom:0}
.card strong{color:#6272f1}
.foot{padding:24px 36px;background:#f8fafc;text-align:center;border-top:1px solid #f1f5f9}
.foot p{font-size:12px;color:#94a3b8}
</style></head><body>
<div class="wrap">
<div class="head"><h1>Josett</h1><p>Build · Launch · Grow</p></div>
<div class="body">${content}</div>
<div class="foot"><p>&copy; ${new Date().getFullYear()} Josett. All rights reserved.</p><p style="margin-top:4px"><a href="${APP_URL}" style="color:#6272f1;text-decoration:none">josett.com</a></p></div>
</div></body></html>`;
}

// ── Send helpers ──────────────────────────────────────────────

interface SendOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: SendOptions): Promise<boolean> {
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    if (error) { console.error("Resend error:", error); return false; }
    return true;
  } catch (err) {
    console.error("Resend send failed:", err);
    return false;
  }
}

// ── Transactional emails ──────────────────────────────────────

export async function sendWelcomeEmail(email: string, name: string) {
  return sendEmail({
    to: email,
    subject: "Welcome to Josett 🎉",
    html: emailBase(`
      <p>Hi <strong>${name}</strong>,</p>
      <p>Welcome to <strong>Josett</strong> — Ghana's most powerful website builder! Your account is ready.</p>
      <p>Create your first website in minutes — no coding required. Choose a template, customise it, and go live today.</p>
      <p style="text-align:center;margin-top:28px"><a href="${APP_URL}/sites/new" class="btn">Create My First Site →</a></p>
    `),
  });
}

export async function sendEmailVerification(email: string, name: string, token: string) {
  const url = `${APP_URL}/verify-email?token=${token}`;
  return sendEmail({
    to: email,
    subject: "Verify your Josett email",
    html: emailBase(`
      <p>Hi <strong>${name}</strong>,</p>
      <p>Please verify your email address to activate your account.</p>
      <p style="text-align:center;margin-top:28px"><a href="${url}" class="btn">Verify Email</a></p>
      <p style="font-size:13px;color:#94a3b8;margin-top:20px">This link expires in 24 hours. If you didn't create a Josett account, you can safely ignore this email.</p>
    `),
  });
}

export async function sendPasswordReset(email: string, name: string, resetUrl: string) {
  return sendEmail({
    to: email,
    subject: "Reset your Josett password",
    html: emailBase(`
      <p>Hi <strong>${name}</strong>,</p>
      <p>We received a request to reset your password. Click the button below to choose a new one.</p>
      <p style="text-align:center;margin-top:28px"><a href="${resetUrl}" class="btn">Reset Password</a></p>
      <p style="font-size:13px;color:#94a3b8;margin-top:20px">This link expires in 1 hour. If you didn't request this, no action is needed.</p>
    `),
  });
}

export async function sendSiteDeployedEmail(email: string, name: string, siteName: string, siteUrl: string) {
  return sendEmail({
    to: email,
    subject: `🚀 "${siteName}" is live!`,
    html: emailBase(`
      <p>Hi <strong>${name}</strong>,</p>
      <p>Your website is now live and accessible to the world!</p>
      <div class="card"><p><strong>Site:</strong> ${siteName}</p><p><strong>URL:</strong> <a href="${siteUrl}" style="color:#6272f1">${siteUrl}</a></p></div>
      <p style="text-align:center;margin-top:28px"><a href="${siteUrl}" class="btn">Visit Your Site →</a></p>
    `),
  });
}

export async function sendRenewalReminderEmail(email: string, name: string, siteName: string, daysLeft: number, amountGhs: number, renewUrl: string) {
  const urgency = daysLeft <= 1 ? "⚠️ URGENT: " : daysLeft <= 3 ? "⚠️ " : "";
  return sendEmail({
    to: email,
    subject: `${urgency}"${siteName}" expires in ${daysLeft} day${daysLeft !== 1 ? "s" : ""}`,
    html: emailBase(`
      <p>Hi <strong>${name}</strong>,</p>
      <p>Your website <strong>${siteName}</strong> will expire in <strong>${daysLeft} day${daysLeft !== 1 ? "s" : ""}</strong>. Renew now to keep it live.</p>
      <div class="card">
        <p><strong>Site:</strong> ${siteName}</p>
        <p><strong>Renewal amount:</strong> GHS ${amountGhs}/month</p>
      </div>
      <p style="text-align:center;margin-top:28px"><a href="${renewUrl}" class="btn">Renew Now →</a></p>
    `),
  });
}

export async function sendPaymentConfirmationEmail(email: string, name: string, siteName: string, amountGhs: number, periodEnd: Date) {
  return sendEmail({
    to: email,
    subject: `✅ Payment confirmed for "${siteName}"`,
    html: emailBase(`
      <p>Hi <strong>${name}</strong>,</p>
      <p>Your payment has been received. Your site is active and running!</p>
      <div class="card">
        <p><strong>Site:</strong> ${siteName}</p>
        <p><strong>Amount paid:</strong> GHS ${amountGhs}</p>
        <p><strong>Active until:</strong> ${periodEnd.toLocaleDateString("en-GH", { day: "numeric", month: "long", year: "numeric" })}</p>
      </div>
      <p style="text-align:center;margin-top:28px"><a href="${APP_URL}/dashboard" class="btn">Go to Dashboard →</a></p>
    `),
  });
}

export async function sendSiteExpiredEmail(email: string, name: string, siteName: string, renewUrl: string) {
  return sendEmail({
    to: email,
    subject: `🔴 "${siteName}" is now offline`,
    html: emailBase(`
      <p>Hi <strong>${name}</strong>,</p>
      <p>Your site <strong>${siteName}</strong> has expired and is currently offline. Your data is safely preserved for 30 days.</p>
      <p>Renew now to bring it back online immediately.</p>
      <p style="text-align:center;margin-top:28px"><a href="${renewUrl}" class="btn">Restore My Site →</a></p>
    `),
  });
}

export async function sendNewOrderEmail(email: string, ownerName: string, siteName: string, orderNumber: string, customerName: string, totalGhs: number, dashUrl: string) {
  return sendEmail({
    to: email,
    subject: `🛒 New order #${orderNumber} on ${siteName}`,
    html: emailBase(`
      <p>Hi <strong>${ownerName}</strong>, you have a new order!</p>
      <div class="card">
        <p><strong>Order #:</strong> ${orderNumber}</p>
        <p><strong>Customer:</strong> ${customerName}</p>
        <p><strong>Total:</strong> GHS ${totalGhs}</p>
      </div>
      <p style="text-align:center;margin-top:28px"><a href="${dashUrl}" class="btn">View Order →</a></p>
    `),
  });
}

export async function sendNewBookingEmail(email: string, ownerName: string, siteName: string, clientName: string, serviceName: string, date: string, time: string, dashUrl: string) {
  return sendEmail({
    to: email,
    subject: `📅 New booking on ${siteName}`,
    html: emailBase(`
      <p>Hi <strong>${ownerName}</strong>, you have a new booking!</p>
      <div class="card">
        <p><strong>Client:</strong> ${clientName}</p>
        <p><strong>Service:</strong> ${serviceName}</p>
        <p><strong>Date:</strong> ${date} at ${time}</p>
      </div>
      <p style="text-align:center;margin-top:28px"><a href="${dashUrl}" class="btn">View Booking →</a></p>
    `),
  });
}

export async function sendNewFormSubmissionEmail(email: string, ownerName: string, siteName: string, formName: string, data: Record<string, unknown>, dashUrl: string) {
  const fields = Object.entries(data).map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`).join("");
  return sendEmail({
    to: email,
    subject: `📝 New form submission on ${siteName}`,
    html: emailBase(`
      <p>Hi <strong>${ownerName}</strong>, someone submitted your <strong>${formName}</strong> form.</p>
      <div class="card">${fields}</div>
      <p style="text-align:center;margin-top:28px"><a href="${dashUrl}" class="btn">View Submissions →</a></p>
    `),
  });
}

export async function sendContactFormReply(to: string, name: string, message: string, replyEmail: string) {
  return sendEmail({
    to,
    subject: "We received your message",
    replyTo: replyEmail,
    html: emailBase(`
      <p>Hi <strong>${name}</strong>,</p>
      <p>Thanks for reaching out. We've received your message and will get back to you shortly.</p>
      <div class="card"><p style="font-style:italic;color:#64748b">"${message}"</p></div>
    `),
  });
}
