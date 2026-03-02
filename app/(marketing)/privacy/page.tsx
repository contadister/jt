import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Josett Privacy Policy — how we collect, use, and protect your data.",
};

export default function PrivacyPolicy() {
  const lastUpdated = "January 1, 2025";

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Header */}
      <div
        className="py-20"
        style={{
          background: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-white font-bold text-xl mb-8">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-josett-500 to-purple-600 flex items-center justify-center text-white text-sm font-black">
              J
            </div>
            Josett
          </Link>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/60">Last updated: {lastUpdated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <div className="bg-josett-50 dark:bg-josett-950/20 border border-josett-200 dark:border-josett-800 rounded-xl p-6 mb-8">
            <p className="text-josett-800 dark:text-josett-300 font-medium">
              This Privacy Policy governs the collection, use, storage, and
              disclosure of personal information by Josett ("we", "us", "our")
              in connection with the use of our platform at josett.com. This
              policy complies with the Ghana Data Protection Act, 2012 (Act
              843), the European Union General Data Protection Regulation
              (GDPR), and other applicable international data protection laws.
            </p>
          </div>

          <Section title="1. Information We Collect">
            <p>We collect the following categories of personal data:</p>
            <SubList
              items={[
                "Account Information: Full name, email address, phone number, and profile photo when you register.",
                "Payment Information: Payment transactions are processed by Paystack. We store payment reference numbers, amounts, and dates — never your card details.",
                "Website Data: The content you create in the builder (text, images, settings) is stored securely in our database.",
                "Usage Data: How you interact with our platform, including pages visited, features used, and time spent.",
                "Technical Data: IP address, browser type, device type, and operating system.",
                "Communications: Any messages you send to our support team.",
              ]}
            />
          </Section>

          <Section title="2. How We Use Your Information">
            <p>We use your data to:</p>
            <SubList
              items={[
                "Create and manage your account",
                "Deploy and maintain your website(s)",
                "Process payments via Paystack",
                "Send transactional emails and SMS (renewals, deployment confirmations, payment receipts)",
                "Provide customer support",
                "Improve our platform and services",
                "Comply with legal obligations under Ghana law and international regulations",
                "Prevent fraud and ensure platform security",
              ]}
            />
          </Section>

          <Section title="3. Legal Basis for Processing (GDPR)">
            <p>For users in the European Economic Area, we process data on the following legal bases:</p>
            <SubList
              items={[
                "Contract Performance: Processing necessary to deliver our services",
                "Legitimate Interest: Platform security, fraud prevention, and service improvement",
                "Legal Obligation: Compliance with applicable laws",
                "Consent: Where you have explicitly consented (e.g., marketing emails)",
              ]}
            />
          </Section>

          <Section title="4. Data Protection (Ghana Data Protection Act, 2012)">
            <p>
              As a data controller under the Ghana Data Protection Act 2012 (Act
              843), we are registered with the Data Protection Commission of
              Ghana. Your personal data is:
            </p>
            <SubList
              items={[
                "Collected for specified, explicit, and legitimate purposes",
                "Not processed in a manner incompatible with those purposes",
                "Adequate, relevant, and not excessive for the purposes",
                "Accurate and kept up to date",
                "Not kept longer than necessary",
                "Protected with appropriate technical and organizational measures",
              ]}
            />
          </Section>

          <Section title="5. Data Sharing">
            <p>
              We do not sell your personal data. We share your data only with:
            </p>
            <SubList
              items={[
                "Paystack: For payment processing (governed by Paystack's privacy policy)",
                "Arkesel: For SMS and email delivery",
                "Vercel: For website hosting and deployment",
                "GitHub: For storing your site's source code in private repositories",
                "Supabase: Our database infrastructure provider",
                "Law Enforcement: Where required by court order or Ghanaian law",
              ]}
            />
            <p>
              All third-party providers are contractually bound to protect your
              data and use it only for the purposes we specify.
            </p>
          </Section>

          <Section title="6. Cookies">
            <p>
              We use strictly necessary cookies to operate the platform
              (authentication sessions). We also use analytics cookies (with
              your consent) to understand how users interact with josett.com.
              You can manage cookies in your browser settings.
            </p>
          </Section>

          <Section title="7. Data Security">
            <p>We protect your data using:</p>
            <SubList
              items={[
                "AES-256 encryption for sensitive data at rest",
                "TLS/HTTPS encryption for all data in transit",
                "Row-level security on our database",
                "Regular automated backups",
                "Access controls limiting who can access production data",
              ]}
            />
          </Section>

          <Section title="8. Data Retention">
            <p>
              We retain your data for as long as your account is active. Upon
              account deletion:
            </p>
            <SubList
              items={[
                "Personal account data is deleted within 30 days",
                "Expired site data is retained for 30 days then permanently deleted",
                "Payment records are retained for 7 years as required by Ghanaian financial regulations",
                "Anonymized usage data may be retained indefinitely for analytics",
              ]}
            />
          </Section>

          <Section title="9. Your Rights">
            <p>
              Under the Ghana Data Protection Act and GDPR, you have the right
              to:
            </p>
            <SubList
              items={[
                "Access: Request a copy of the personal data we hold about you",
                "Rectification: Correct inaccurate or incomplete data",
                "Erasure: Request deletion of your personal data",
                "Portability: Receive your data in a machine-readable format",
                "Restriction: Restrict how we process your data",
                "Objection: Object to processing based on legitimate interests",
                "Withdraw Consent: Where processing is based on consent",
              ]}
            />
            <p>
              To exercise these rights, email us at{" "}
              <a href="mailto:privacy@josett.com" className="text-josett-600 underline">
                privacy@josett.com
              </a>
              . We will respond within 30 days.
            </p>
          </Section>

          <Section title="10. Children's Privacy">
            <p>
              Josett is not intended for individuals under the age of 18. We do
              not knowingly collect personal data from minors. If you believe a
              minor has created an account, please contact us immediately.
            </p>
          </Section>

          <Section title="11. International Transfers">
            <p>
              Your data may be processed outside Ghana (e.g., on Vercel's
              servers in the United States or Europe). Where such transfers
              occur, we ensure appropriate safeguards are in place, including
              contractual clauses equivalent to EU Standard Contractual Clauses.
            </p>
          </Section>

          <Section title="12. Changes to This Policy">
            <p>
              We may update this policy. We will notify you of material changes
              by email and by posting a notice on josett.com. Your continued use
              of the platform after changes constitutes acceptance.
            </p>
          </Section>

          <Section title="13. Contact Us">
            <p>
              For privacy concerns or to exercise your rights, contact our Data
              Protection Officer:
            </p>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 mt-3">
              <p className="font-semibold text-slate-900 dark:text-white">Josett — Data Protection Officer</p>
              <p>Email: <a href="mailto:privacy@josett.com" className="text-josett-600">privacy@josett.com</a></p>
              <p>Accra, Ghana</p>
            </div>
          </Section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 text-sm text-slate-500">
          <Link href="/terms" className="hover:text-josett-600">Terms of Use</Link>
          <Link href="/agreement" className="hover:text-josett-600">User Agreement</Link>
          <Link href="/" className="hover:text-josett-600">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 border-b border-slate-200 dark:border-slate-800 pb-2">
        {title}
      </h2>
      <div className="space-y-3 text-slate-600 dark:text-slate-400 leading-relaxed">
        {children}
      </div>
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
