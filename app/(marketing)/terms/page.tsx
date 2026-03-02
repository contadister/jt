import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Josett Terms of Use — the rules for using our platform.",
};

export default function TermsOfUse() {
  const lastUpdated = "January 1, 2025";

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div
        className="py-20"
        style={{
          background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-white font-bold text-xl mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-josett-500 to-purple-600 flex items-center justify-center text-sm font-black">
              J
            </div>
            Josett
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Terms of Use</h1>
          <p className="text-white/60">Last updated: {lastUpdated}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-8">
            <p className="text-amber-800 dark:text-amber-300 font-medium">
              Please read these Terms of Use carefully before using Josett. By
              registering an account or using any part of the platform, you
              agree to be bound by these terms. If you do not agree, do not use
              Josett.
            </p>
          </div>

          <Section title="1. Acceptance of Terms">
            <p>
              These Terms of Use ("Terms") constitute a legally binding agreement
              between you ("User", "you") and Josett ("Company", "we", "us")
              governing your use of the josett.com platform and all related
              services. These Terms are governed by the laws of the Republic of
              Ghana.
            </p>
          </Section>

          <Section title="2. Eligibility">
            <SubList
              items={[
                "You must be at least 18 years old to use Josett.",
                "By using Josett, you confirm that you are 18 or older and have the legal capacity to enter this agreement.",
                "Use of Josett on behalf of a business requires authorization from that business.",
                "Josett is available to individuals and businesses in Ghana and internationally.",
              ]}
            />
          </Section>

          <Section title="3. Account Registration & Security">
            <SubList
              items={[
                "You must provide accurate and complete information when registering.",
                "You are responsible for maintaining the confidentiality of your password.",
                "You are responsible for all activity that occurs under your account.",
                "You must notify us immediately at support@josett.com if you suspect unauthorized access.",
                "We reserve the right to suspend or terminate accounts that violate these Terms.",
              ]}
            />
          </Section>

          <Section title="4. Subscription & Payments">
            <SubList
              items={[
                "Josett operates on a monthly subscription model. Prices range from GHS 100 to GHS 400 per month depending on selected features.",
                "All payments are processed by Paystack. By subscribing, you agree to Paystack's terms.",
                "Subscriptions are prepaid monthly. You pay for one month at a time.",
                "There are no automatic renewals. You must manually renew your subscription.",
                "Subscriptions are non-refundable once the site has been deployed.",
                "If you have not deployed your site, you may request a refund within 24 hours of payment.",
                "Prices may change with 30 days' advance notice.",
              ]}
            />
          </Section>

          <Section title="5. Site Expiry & Suspension">
            <SubList
              items={[
                "Sites expire 30 days after payment. You will receive renewal reminders at 7, 3, and 1 days before expiry.",
                "Expired sites are taken offline automatically. Your data is preserved for 30 days.",
                "After 30 days of expiry, site data is permanently and irrecoverably deleted.",
                "We are not liable for any loss of business or data resulting from site expiry.",
              ]}
            />
          </Section>

          <Section title="6. Acceptable Use">
            <p>You agree not to use Josett to host content that:</p>
            <SubList
              items={[
                "Is illegal under Ghanaian or international law",
                "Infringes on intellectual property rights of others",
                "Contains pornographic, obscene, or sexually explicit material",
                "Promotes violence, terrorism, hate speech, or discrimination",
                "Constitutes spam, phishing, or any form of fraud",
                "Distributes malware, viruses, or harmful code",
                "Violates the privacy of individuals (e.g., doxing, non-consensual sharing of images)",
                "Misrepresents your identity or impersonates another person or business",
                "Facilitates illegal gambling, pyramid schemes, or unlicensed financial services",
                "Contains false or misleading health claims",
              ]}
            />
            <p>
              Violation of this section may result in immediate account
              termination without refund and may be reported to the appropriate
              authorities.
            </p>
          </Section>

          <Section title="7. Intellectual Property">
            <p>
              <strong>Your Content:</strong> You retain ownership of all content
              you create on Josett (text, images, products, etc.). By uploading
              content, you grant Josett a limited, non-exclusive license to
              store, display, and deliver that content as part of operating the
              platform.
            </p>
            <p>
              <strong>Josett Platform:</strong> The Josett platform, including
              its code, design, templates, and branding, is owned by Josett and
              protected by copyright and trademark laws. You may not copy,
              reverse engineer, or resell any part of the Josett platform.
            </p>
            <p>
              <strong>Templates:</strong> Template designs provided by Josett
              may be used to build your website but may not be extracted and
              resold or distributed separately.
            </p>
          </Section>

          <Section title="8. E-commerce & Payments on User Sites">
            <SubList
              items={[
                "If you enable e-commerce, you are the merchant of record. Josett is not a party to transactions between you and your customers.",
                "You are responsible for collecting and remitting applicable taxes (including Ghana VAT where applicable).",
                "You must comply with all applicable laws regarding consumer protection and e-commerce.",
                "Josett is not liable for disputes between you and your customers.",
                "You are responsible for configuring and maintaining your own Paystack account for customer payments.",
              ]}
            />
          </Section>

          <Section title="9. Ad-Supported Tier">
            <SubList
              items={[
                "By enabling the Ad-Supported Tier, you consent to Josett displaying third-party advertisements on your website.",
                "You will receive a share of ad revenue as described in your dashboard.",
                "Josett does not guarantee any specific level of ad revenue.",
                "Josett reserves the right to modify, pause, or terminate the ad program at any time.",
                "You may opt out of the Ad-Supported Tier at any time, which will restore normal pricing at your next renewal.",
              ]}
            />
          </Section>

          <Section title="10. Service Availability & Modifications">
            <SubList
              items={[
                "We aim for 99.9% uptime but do not guarantee uninterrupted service.",
                "We reserve the right to modify, suspend, or discontinue any feature with reasonable notice.",
                "Scheduled maintenance will be announced in advance where possible.",
                "We are not liable for any downtime caused by Vercel, GitHub, Supabase, or other third-party providers.",
              ]}
            />
          </Section>

          <Section title="11. Limitation of Liability">
            <p>
              To the maximum extent permitted by Ghanaian law, Josett shall not
              be liable for:
            </p>
            <SubList
              items={[
                "Loss of revenue, profit, or business opportunity",
                "Loss of data due to user error",
                "Indirect, incidental, or consequential damages",
                "Any damages exceeding the amount you paid to Josett in the 3 months preceding the claim",
              ]}
            />
          </Section>

          <Section title="12. Indemnification">
            <p>
              You agree to indemnify and hold harmless Josett, its directors,
              employees, and agents from any claims, losses, or expenses
              (including legal fees) arising from your use of the platform, your
              website content, your violation of these Terms, or your violation
              of any law or the rights of any third party.
            </p>
          </Section>

          <Section title="13. Termination">
            <p>
              Either party may terminate this agreement at any time. You may
              delete your account from your dashboard settings. We may
              terminate your account for violation of these Terms. Upon
              termination, your sites are taken offline and data is deleted
              according to our retention policy.
            </p>
          </Section>

          <Section title="14. Governing Law & Dispute Resolution">
            <SubList
              items={[
                "These Terms are governed by the laws of the Republic of Ghana.",
                "Any disputes shall first be attempted to be resolved through good-faith negotiation.",
                "Unresolved disputes shall be submitted to arbitration in Accra, Ghana under applicable rules.",
                "Nothing in this clause prevents either party from seeking urgent injunctive relief.",
              ]}
            />
          </Section>

          <Section title="15. Changes to Terms">
            <p>
              We may update these Terms. We will notify you by email 14 days
              before material changes take effect. Continued use after changes
              constitutes acceptance.
            </p>
          </Section>

          <Section title="16. Contact">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4">
              <p className="font-semibold text-slate-900 dark:text-white">Josett Legal Team</p>
              <p>Email: <a href="mailto:legal@josett.com" className="text-josett-600">legal@josett.com</a></p>
              <p>Accra, Ghana</p>
            </div>
          </Section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 text-sm text-slate-500">
          <Link href="/privacy" className="hover:text-josett-600">Privacy Policy</Link>
          <Link href="/agreement" className="hover:text-josett-600">User Agreement</Link>
          <Link href="/" className="hover:text-josett-600">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
        {title}
      </h2>
      <div className="space-y-3 text-slate-600 dark:text-slate-400 leading-relaxed">{children}</div>
    </div>
  );
}

function SubList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 ml-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2">
          <span className="text-josett-500 mt-1.5 flex-shrink-0">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
