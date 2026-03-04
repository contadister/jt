// lib/hubtel/client.ts
// Hubtel SMS — Ghana's leading SMS gateway. Used by MTN, Vodafone, AirtelTigo.
// Docs: https://developers.hubtel.com/docs/send-message
// Sign up: https://businessapp.hubtel.com
// Install: no extra package needed — uses native fetch

const HUBTEL_CLIENT_ID     = process.env.HUBTEL_CLIENT_ID!;
const HUBTEL_CLIENT_SECRET = process.env.HUBTEL_CLIENT_SECRET!;
const HUBTEL_SENDER_ID     = process.env.HUBTEL_SENDER_ID || "Josett";
const HUBTEL_BASE_URL      = "https://smsc.hubtel.com/v1/messages/send";

interface SmsOptions {
  to: string;       // Format: 233XXXXXXXXX  (no + prefix)
  message: string;
}

export async function sendSms({ to, message }: SmsOptions): Promise<boolean> {
  try {
    // Normalise number: strip +, spaces, leading 0 → 233
    const normalised = to
      .replace(/\s+/g, "")
      .replace(/^\+/, "")
      .replace(/^0/, "233");

    const params = new URLSearchParams({
      clientsecret: HUBTEL_CLIENT_SECRET,
      clientid:     HUBTEL_CLIENT_ID,
      from:         HUBTEL_SENDER_ID,
      to:           normalised,
      content:      message,
    });

    const res = await fetch(`${HUBTEL_BASE_URL}?${params.toString()}`, {
      method: "GET",
    });

    const data = await res.json();
    // Hubtel returns status 0 = success
    if (data.status !== 0) {
      console.error("Hubtel SMS error:", data);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Hubtel SMS failed:", err);
    return false;
  }
}

// ── SMS templates ─────────────────────────────────────────────

export async function sendWelcomeSms(phone: string, name: string) {
  return sendSms({
    to: phone,
    message: `Hi ${name}! Welcome to Josett 🎉 Build your website now: josett.com/dashboard`,
  });
}

export async function sendRenewalReminderSms(phone: string, siteName: string, daysLeft: number, amountGhs: number) {
  return sendSms({
    to: phone,
    message: `Josett: Your site "${siteName}" expires in ${daysLeft} day${daysLeft !== 1 ? "s" : ""}. Renew for GHS ${amountGhs} at josett.com/billing`,
  });
}

export async function sendPaymentConfirmedSms(phone: string, siteName: string, amountGhs: number) {
  return sendSms({
    to: phone,
    message: `Josett: Payment of GHS ${amountGhs} confirmed for "${siteName}". Your site is live!`,
  });
}

export async function sendNewOrderSms(phone: string, siteName: string, orderNumber: string, totalGhs: number) {
  return sendSms({
    to: phone,
    message: `Josett: New order #${orderNumber} on ${siteName} for GHS ${totalGhs}. Check your dashboard.`,
  });
}

export async function sendNewBookingSms(phone: string, clientName: string, serviceName: string, date: string) {
  return sendSms({
    to: phone,
    message: `Josett: New booking from ${clientName} for "${serviceName}" on ${date}. Check your dashboard.`,
  });
}

export async function sendSiteExpiredSms(phone: string, siteName: string) {
  return sendSms({
    to: phone,
    message: `Josett: Your site "${siteName}" is offline. Renew now at josett.com/billing to restore it.`,
  });
}
