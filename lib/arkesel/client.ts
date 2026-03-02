// lib/arkesel/client.ts
// Arkesel API client for SMS and Email in Ghana

const ARKESEL_API_KEY = process.env.ARKESEL_API_KEY!;
const ARKESEL_SENDER_ID = process.env.ARKESEL_SENDER_ID || "Josett";
const ARKESEL_BASE_URL = "https://sms.arkesel.com/api/v2";
const ARKESEL_EMAIL_URL = "https://email.arkesel.com/api/v1";

interface SmsOptions {
  to: string | string[];
  message: string;
}

export async function sendSms({ to, message }: SmsOptions): Promise<boolean> {
  try {
    const recipients = Array.isArray(to) ? to.join(",") : to;
    const res = await fetch(`${ARKESEL_BASE_URL}/sms/send`, {
      method: "POST",
      headers: {
        "api-key": ARKESEL_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sender: ARKESEL_SENDER_ID, message, recipients }),
    });
    const data = await res.json();
    return data.status === "success";
  } catch (error) {
    console.error("Arkesel SMS error:", error);
    return false;
  }
}

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  fromName?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  fromName = "Josett",
}: EmailOptions): Promise<boolean> {
  try {
    const res = await fetch(`${ARKESEL_EMAIL_URL}/email/send`, {
      method: "POST",
      headers: {
        "api-key": ARKESEL_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: { email: "noreply@josett.com", name: fromName },
        to: [{ email: to }],
        subject,
        html,
        text: html.replace(/<[^>]*>/g, ""),
      }),
    });
    return res.ok;
  } catch (error) {
    console.error("Arkesel Email error:", error);
    return false;
  }
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://josett.com";

function emailWrapper(content: string): string {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><style>
  *{margin:0;padding:0;box-sizing:border-box}body{font-family:Inter,sans-serif;background:#f8fafc;color:#1e293b}
  .c{max-width:600px;margin:40px auto;background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
  .h{background:linear-gradient(135deg,#6272f1,#8b5cf6);padding:40px 32px;text-align:center}
  .h h1{color:white;font-size:28px;font-weight:700}.h p{color:rgba(255,255,255,.85);margin-top:6px}
  .b{padding:40px 32px}.b p{line-height:1.7;color:#475569;font-size:15px;margin-bottom:16px}
  .btn{display:inline-block;background:linear-gradient(135deg,#6272f1,#8b5cf6);color:white;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:15px;margin:8px 0}
  .box{background:#f0f4ff;border-left:4px solid #6272f1;padding:16px 20px;border-radius:0 8px 8px 0;margin:20px 0}
  .f{padding:24px 32px;background:#f8fafc;text-align:center;font-size:13px;color:#94a3b8}
  </style></head><body><div class="c">
  <div class="h"><h1>Josett</h1><p>Your Website Builder Platform</p></div>
  <div class="b">${content}</div>
  <div class="f"><p>&copy; ${new Date().getFullYear()} Josett. All rights reserved.</p></div>
  </div></body></html>`;
}

export async function sendWelcomeEmail(email: string, name: string) {
  return sendEmail({
    to: email,
    subject: "Welcome to Josett!",
    html: emailWrapper(`<p>Hi <strong>${name}</strong>,</p>
    <p>Welcome to <strong>Josett</strong> — Ghana's most powerful website builder!</p>
    <a href="${APP_URL}/dashboard" class="btn">Start Building Now</a>`),
  });
}

export async function sendSiteDeployedEmail(
  email: string,
  name: string,
  siteName: string,
  siteUrl: string
) {
  return sendEmail({
    to: email,
    subject: `Your site "${siteName}" is live!`,
    html: emailWrapper(`<p>Hi <strong>${name}</strong>,</p>
    <p>Your website is now live!</p>
    <div class="box"><p><strong>URL:</strong> ${siteUrl}</p></div>
    <a href="${siteUrl}" class="btn">Visit Your Site</a>`),
  });
}

export async function sendRenewalReminderEmail(
  email: string,
  name: string,
  siteName: string,
  daysLeft: number,
  amountGhs: number,
  renewUrl: string
) {
  return sendEmail({
    to: email,
    subject: `Your site "${siteName}" expires in ${daysLeft} day${daysLeft > 1 ? "s" : ""}`,
    html: emailWrapper(`<p>Hi <strong>${name}</strong>,</p>
    <p>Your website <strong>${siteName}</strong> expires in <strong>${daysLeft} day${daysLeft > 1 ? "s" : ""}</strong>.</p>
    <div class="box"><p><strong>Renewal:</strong> GHS ${amountGhs}/month</p></div>
    <a href="${renewUrl}" class="btn">Renew Now</a>`),
  });
}

export async function sendPaymentConfirmationEmail(
  email: string,
  name: string,
  siteName: string,
  amountGhs: number,
  periodEnd: Date
) {
  return sendEmail({
    to: email,
    subject: `Payment confirmed for "${siteName}"`,
    html: emailWrapper(`<p>Hi <strong>${name}</strong>,</p>
    <p>Payment received!</p>
    <div class="box">
      <p><strong>Site:</strong> ${siteName}</p>
      <p><strong>Amount:</strong> GHS ${amountGhs}</p>
      <p><strong>Active Until:</strong> ${periodEnd.toLocaleDateString("en-GH")}</p>
    </div>
    <a href="${APP_URL}/dashboard" class="btn">Go to Dashboard</a>`),
  });
}

export async function sendSiteExpiredEmail(
  email: string,
  name: string,
  siteName: string,
  renewUrl: string
) {
  return sendEmail({
    to: email,
    subject: `Your site "${siteName}" is now offline`,
    html: emailWrapper(`<p>Hi <strong>${name}</strong>,</p>
    <p>Your site <strong>${siteName}</strong> has expired and is offline. Data preserved for 30 days.</p>
    <a href="${renewUrl}" class="btn">Restore My Site</a>`),
  });
}

export async function sendNewOrderNotification(
  email: string,
  ownerName: string,
  siteName: string,
  orderNumber: string,
  customerName: string,
  totalGhs: number,
  dashboardUrl: string
) {
  return sendEmail({
    to: email,
    subject: `New order #${orderNumber} on ${siteName}`,
    html: emailWrapper(`<p>Hi <strong>${ownerName}</strong>, you have a new order!</p>
    <div class="box">
      <p><strong>Order:</strong> #${orderNumber}</p>
      <p><strong>Customer:</strong> ${customerName}</p>
      <p><strong>Total:</strong> GHS ${totalGhs}</p>
    </div>
    <a href="${dashboardUrl}" class="btn">View Order</a>`),
  });
}

export async function sendNewBookingNotification(
  email: string,
  ownerName: string,
  siteName: string,
  clientName: string,
  serviceName: string,
  bookingDate: string,
  bookingTime: string,
  dashboardUrl: string
) {
  return sendEmail({
    to: email,
    subject: `New booking on ${siteName}`,
    html: emailWrapper(`<p>Hi <strong>${ownerName}</strong>, you have a new booking!</p>
    <div class="box">
      <p><strong>Client:</strong> ${clientName}</p>
      <p><strong>Service:</strong> ${serviceName}</p>
      <p><strong>Date:</strong> ${bookingDate} at ${bookingTime}</p>
    </div>
    <a href="${dashboardUrl}" class="btn">View Booking</a>`),
  });
}
