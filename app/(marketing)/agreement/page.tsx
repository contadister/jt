import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Partner Agreement" };

export default function AgreementPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <nav className="border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="flex items-center gap-2 font-black text-xl text-slate-900 dark:text-white">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-josett-500 to-purple-600 flex items-center justify-center text-white text-sm font-black">J</div>
          Josett
        </Link>
        <Link href="/register" className="bg-josett-600 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-josett-500 transition-all">Get Started</Link>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Partner & Reseller Agreement</h1>
        <p className="text-slate-400 text-sm mb-10">Last updated: January 2025</p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
          {[
            {
              title: "1. Agreement Overview",
              body: "This Partner Agreement ('Agreement') governs the relationship between Josett ('Company') and individuals or businesses ('Partner') who resell or promote Josett services. By participating in the Josett Partner Program, you agree to the terms outlined herein.",
            },
            {
              title: "2. Partner Obligations",
              body: "Partners agree to: (a) accurately represent Josett services to potential customers; (b) not make false claims about features, pricing, or capabilities; (c) direct customers to official Josett documentation for technical support; (d) comply with all applicable Ghanaian laws and regulations.",
            },
            {
              title: "3. Referral Commissions",
              body: "Partners earn GHS 20 in platform credits for each new customer who registers using their unique referral link and completes their first payment. Credits are non-transferable, do not expire, and can only be used against Josett subscription fees. There is no cash payout.",
            },
            {
              title: "4. Prohibited Activities",
              body: "Partners must not: spam potential customers via unsolicited messages; use Josett trademarks in domain names or business names without written permission; create misleading advertising materials; offer discounts or pricing not authorised by Josett; engage in cookie stuffing or other fraudulent referral tactics.",
            },
            {
              title: "5. Intellectual Property",
              body: "Josett grants Partners a limited, non-exclusive licence to use Josett branding materials solely for the purpose of promoting Josett services. All trademarks, logos, and brand assets remain the property of Josett. Partners must not alter, distort, or misrepresent Josett branding.",
            },
            {
              title: "6. Termination",
              body: "Either party may terminate this agreement with 30 days written notice. Josett may terminate immediately for breach of these terms. Upon termination, accrued credits remain valid but no new credits will be earned.",
            },
            {
              title: "7. Limitation of Liability",
              body: "Josett's liability to any Partner is limited to the total credits earned in the 12 months preceding any claim. Josett is not liable for indirect, incidental, or consequential damages arising from the Partner relationship.",
            },
            {
              title: "8. Governing Law",
              body: "This Agreement is governed by the laws of the Republic of Ghana. Any disputes shall be resolved through arbitration in Accra, Ghana.",
            },
          ].map(({ title, body }) => (
            <div key={title}>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">{title}</h2>
              <p>{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Questions about this agreement? Reach out to our team.
          </p>
          <Link href="/contact" className="inline-block text-sm font-semibold text-josett-600 dark:text-josett-400 hover:underline">
            Contact Us →
          </Link>
        </div>
      </div>
    </main>
  );
}
