import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      {/* Nav */}
      <nav className="border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="flex items-center gap-2 font-black text-xl text-slate-900 dark:text-white">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-josett-500 to-purple-600 flex items-center justify-center text-white text-sm font-black">J</div>
          Josett
        </Link>
        <Link href="/register" className="bg-josett-600 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-josett-500 transition-all">
          Get Started
        </Link>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <span className="inline-block bg-josett-50 dark:bg-josett-950/40 text-josett-600 dark:text-josett-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">Our Story</span>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-5">
            Built for Ghana.<br />Built for Africa.
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
            We believe every Ghanaian business deserves a professional online presence — without the complexity or cost of traditional web development.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-gradient-to-br from-josett-600 to-purple-600 rounded-3xl p-10 text-white text-center mb-16">
          <h2 className="text-2xl font-black mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed opacity-90 max-w-xl mx-auto">
            To make powerful, professional websites accessible to every entrepreneur, trader, and creator in Ghana — starting from just GHS 100 a month.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { emoji: "🇬🇭", title: "Ghana First", desc: "Built with Ghanaian businesses in mind. Paystack payments, local pricing, local support." },
            { emoji: "⚡", title: "Simple by Design", desc: "If your grandmother can't use it, we've failed. No code. No confusion. Just results." },
            { emoji: "💰", title: "Fair Pricing", desc: "Pay monthly, cancel anytime. No lock-in, no hidden fees, no nasty surprises." },
          ].map(({ emoji, title, desc }) => (
            <div key={title} className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
              <div className="text-3xl mb-3">{emoji}</div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-16 text-center">
          {[
            { value: "10k+", label: "Websites Built" },
            { value: "GHS 100", label: "Starting Price" },
            { value: "24/7", label: "Uptime Monitoring" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl font-black text-josett-600 dark:text-josett-400">{value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Ready to build your website?</h2>
          <Link href="/register" className="inline-block bg-josett-600 text-white font-bold px-8 py-3.5 rounded-2xl text-base hover:bg-josett-500 transition-all">
            Start for Free Today →
          </Link>
          <p className="text-sm text-slate-400 mt-3">No credit card required to sign up</p>
        </div>
      </div>
    </main>
  );
}
