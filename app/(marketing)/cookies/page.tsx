import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
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
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">Cookie Policy</h1>
        <p className="text-slate-400 text-sm mb-10">Last updated: January 2025</p>

        <div className="space-y-8 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {[
            {
              title: "1. What Are Cookies",
              body: "Cookies are small text files placed on your device when you visit our website. They help us provide a better experience by remembering your preferences, keeping you signed in, and understanding how you use Josett.",
            },
            {
              title: "2. Cookies We Use",
              body: "We use the following types of cookies: (a) Essential cookies — required for the platform to function, including authentication sessions and security tokens. These cannot be disabled. (b) Analytics cookies — help us understand how visitors use Josett so we can improve it. (c) Preference cookies — remember your settings such as dark/light mode.",
            },
            {
              title: "3. Third-Party Cookies",
              body: "Some features may use third-party services that set their own cookies. These include Supabase (authentication), Paystack (payment processing), and Vercel (hosting and analytics). Each third party has its own cookie and privacy policy.",
            },
            {
              title: "4. Managing Cookies",
              body: "You can control and delete cookies through your browser settings. Please note that disabling essential cookies will prevent you from logging in or using the platform. Most browsers allow you to: view cookies stored on your device, delete all or specific cookies, block cookies from specific websites, and block third-party cookies.",
            },
            {
              title: "5. Cookie Retention",
              body: "Session cookies are deleted when you close your browser. Persistent cookies remain on your device until they expire or you delete them. Authentication tokens typically expire after 7 days of inactivity.",
            },
            {
              title: "6. Changes to This Policy",
              body: "We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated date. Continued use of Josett after changes constitutes acceptance of the updated policy.",
            },
            {
              title: "7. Contact Us",
              body: "If you have questions about our use of cookies, please contact us at privacy@josett.com or through our contact page.",
            },
          ].map(({ title, body }) => (
            <div key={title}>
              <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">{title}</h2>
              <p>{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex gap-4 text-sm">
          <Link href="/privacy" className="text-josett-600 dark:text-josett-400 hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="text-josett-600 dark:text-josett-400 hover:underline">Terms of Service</Link>
          <Link href="/contact" className="text-josett-600 dark:text-josett-400 hover:underline">Contact Us</Link>
        </div>
      </div>
    </main>
  );
}
