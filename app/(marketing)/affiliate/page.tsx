import Link from "next/link";
import type { Metadata } from "next";
import { Gift, TrendingUp, Users, CreditCard, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = { title: "Affiliate Program" };

export default function AffiliatePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <nav className="border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="flex items-center gap-2 font-black text-xl text-slate-900 dark:text-white">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-josett-500 to-purple-600 flex items-center justify-center text-white text-sm font-black">J</div>
          Josett
        </Link>
        <div className="flex gap-3">
          <Link href="/login" className="border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold px-4 py-2 rounded-xl text-sm hover:border-josett-400 transition-all">Sign In</Link>
          <Link href="/register" className="bg-josett-600 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-josett-500 transition-all">Get Started</Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="text-center py-20 px-6">
        <div className="inline-flex items-center gap-2 bg-josett-50 dark:bg-josett-950/40 text-josett-600 dark:text-josett-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
          <Gift size={14} /> Refer & Earn
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight mb-5">
          Earn GHS 20 for<br />every referral
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-8">
          Share Josett with your network. Every time someone signs up and pays using your link, you earn GHS 20 in credits — forever.
        </p>
        <Link href="/register" className="inline-flex items-center gap-2 bg-josett-600 text-white font-bold px-8 py-4 rounded-2xl text-lg hover:bg-josett-500 transition-all">
          Start Earning <ArrowRight size={18} />
        </Link>
        <p className="text-sm text-slate-400 mt-4">Free to join. No minimum payout. Credits never expire.</p>
      </div>

      {/* How it works */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-black text-center text-slate-900 dark:text-white mb-10">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { step: "1", icon: Users, title: "Share your link", desc: "Sign up and get your unique referral link. Share it anywhere — WhatsApp, social media, your website." },
            { step: "2", icon: TrendingUp, title: "They sign up & pay", desc: "When someone uses your link and makes their first payment, your reward is automatically credited." },
            { step: "3", icon: CreditCard, title: "Earn GHS 20 credit", desc: "Credits are added to your account instantly. Use them to pay for your own Josett subscription." },
          ].map(({ step, icon: Icon, title, desc }) => (
            <div key={step} className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-7 border border-slate-100 dark:border-slate-800 text-center relative">
              <div className="w-12 h-12 bg-josett-600 text-white rounded-2xl flex items-center justify-center text-lg font-black mx-auto mb-4">{step}</div>
              <Icon size={24} className="text-josett-500 mx-auto mb-3" />
              <h3 className="font-black text-slate-900 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-br from-josett-600 to-purple-600 rounded-3xl p-10 text-white mb-16">
          <h2 className="text-2xl font-black text-center mb-8">Why join?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "No cap on earnings — refer as many people as you like",
              "Credits never expire and stack up over time",
              "Use credits towards any Josett subscription",
              "Real-time tracking in your dashboard",
              "Dedicated referral link that's easy to share",
              "Open to all Josett users — free to join",
            ].map((benefit) => (
              <div key={benefit} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-white opacity-80 flex-shrink-0 mt-0.5" />
                <p className="text-sm opacity-90">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <h2 className="text-2xl font-black text-center text-slate-900 dark:text-white mb-8">FAQ</h2>
        <div className="space-y-4 mb-16">
          {[
            { q: "Who can join the affiliate program?", a: "Any Josett user can join automatically. Just sign up, go to your account page, and copy your referral link." },
            { q: "When do I receive my credits?", a: "Credits are added instantly when your referral makes their first successful payment." },
            { q: "Can I use credits to pay my own subscription?", a: "Yes! Credits are applied automatically to your next renewal or new site payment." },
            { q: "Is there a limit to how much I can earn?", a: "No limit at all. Refer 100 people, earn GHS 2,000 in credits." },
          ].map(({ q, a }) => (
            <div key={q} className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 border border-slate-100 dark:border-slate-800">
              <p className="font-bold text-slate-900 dark:text-white mb-2 text-sm">{q}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{a}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Ready to start earning?</h2>
          <Link href="/register" className="inline-flex items-center gap-2 bg-josett-600 text-white font-bold px-8 py-3.5 rounded-2xl text-base hover:bg-josett-500 transition-all">
            Create Free Account <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
