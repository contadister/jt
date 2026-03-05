export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma/client";
import { addDomainToProject, getDomainStatus } from "@/lib/vercel/client";
import { initializePaystackTransaction } from "@/lib/paystack/client";
import { nanoid } from "nanoid";

const DOMAIN_REGISTRATION_FEE_GHS = 200;

// GET - check domain verification status
export async function GET(
  _req: Request,
  { params }: { params: { siteId: string } }
) {
  try {
    const supabase = createServerClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const site = await prisma.site.findFirst({
      where: { id: params.siteId, userId: session.user.id },
      select: { customDomain: true, customDomainVerified: true, vercelProjectId: true },
    });
    if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (!site.customDomain) return NextResponse.json({ connected: false });

    let verified = site.customDomainVerified;

    // Re-check with Vercel if not yet verified
    if (!verified && site.vercelProjectId) {
      try {
        const status = await getDomainStatus(site.vercelProjectId, site.customDomain);
        verified = status.verified;
        if (verified) {
          await prisma.site.update({
            where: { id: params.siteId },
            data: { customDomainVerified: true },
          });
        }
      } catch { /* DNS not propagated yet */ }
    }

    return NextResponse.json({ connected: true, domain: site.customDomain, verified });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// POST - initiate domain connection (requires GHS 200 payment if not paid)
export async function POST(
  req: Request,
  { params }: { params: { siteId: string } }
) {
  try {
    const supabase = createServerClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { domain, action } = await req.json();

    const site = await prisma.site.findFirst({
      where: { id: params.siteId, userId: session.user.id },
      include: { user: true },
    });
    if (!site) return NextResponse.json({ error: "Not found" }, { status: 404 });

    if (action === "initiate-payment") {
      // Create Paystack payment for domain registration fee
      const reference = `josett_domain_${nanoid(16)}`;
      await prisma.payment.create({
        data: {
          userId: session.user.id,
          siteId: site.id,
          paystackReference: reference,
          amountGhs: DOMAIN_REGISTRATION_FEE_GHS,
          status: "PENDING",
          paymentType: "DOMAIN",
        },
      });

      const result = await initializePaystackTransaction({
        email: site.user.email,
        amount: DOMAIN_REGISTRATION_FEE_GHS,  // initializePaystackTransaction multiplies ×100 internally
        reference,
        metadata: { siteId: site.id, domain, type: "domain_registration" },
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/verify?type=domain&siteId=${site.id}`,
      });

      return NextResponse.json({ paymentUrl: result.authorization_url, reference });
    }

    if (action === "connect") {
      // Verify domain fee was paid
      const domainPayment = await prisma.payment.findFirst({
        where: { siteId: site.id, paymentType: "DOMAIN", status: "SUCCESS" },
      });
      if (!domainPayment) {
        return NextResponse.json({ error: "Domain registration fee not paid", requiresPayment: true }, { status: 402 });
      }

      // Save domain to site
      await prisma.site.update({
        where: { id: site.id },
        data: { customDomain: domain, customDomainVerified: false },
      });

      // Add to Vercel project
      if (site.vercelProjectId) {
        try {
          await addDomainToProject(site.vercelProjectId, domain);
        } catch (e) {
          console.error("Vercel domain add failed", e);
        }
      }

      // Return DNS instructions
      return NextResponse.json({
        success: true,
        domain,
        dnsInstructions: {
          type: "CNAME",
          name: domain.startsWith("www.") ? "www" : "@",
          value: "cname.vercel-dns.com",
          ttl: 3600,
        },
      });
    }

    if (action === "disconnect") {
      await prisma.site.update({
        where: { id: site.id },
        data: { customDomain: null, customDomainVerified: false },
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
