"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, MessageSquare, Phone, Send, CheckCircle2, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) { setError("Please fill in all required fields."); return; }
    setSending(true); setError("");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) { setSent(true); } else { setError("Something went wrong. Please try again."); }
    setSending(false);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <nav className="border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
        <Link href="/" className="flex items-center gap-2 font-black text-xl text-slate-900 dark:text-white">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-josett-500 to-purple-600 flex items-center justify-center text-white text-sm font-black">J</div>
          Josett
        </Link>
        <Link href="/register" className="bg-josett-600 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-josett-500 transition-all">Get Started</Link>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4">Get in Touch</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg">We'd love to hear from you. Our team is here to help.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact info */}
          <div className="space-y-5">
            {[
              { icon: Mail,           label: "Email",   value: "hello@josett.com",  href: "mailto:hello@josett.com" },
              { icon: MessageSquare,  label: "WhatsApp",value: "+233 XX XXX XXXX",  href: "https://wa.me/233XXXXXXXXX" },
              { icon: Phone,          label: "Phone",   value: "+233 XX XXX XXXX",  href: "tel:+233XXXXXXXXX" },
            ].map(({ icon: Icon, label, value, href }) => (
              <a key={label} href={href}
                className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-josett-300 dark:hover:border-josett-700 transition-all">
                <div className="w-10 h-10 bg-josett-100 dark:bg-josett-950/40 rounded-xl flex items-center justify-center">
                  <Icon size={18} className="text-josett-600 dark:text-josett-400" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">{label}</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{value}</p>
                </div>
              </a>
            ))}

            <div className="bg-josett-50 dark:bg-josett-950/20 rounded-2xl p-5 border border-josett-100 dark:border-josett-900">
              <p className="text-sm font-bold text-josett-800 dark:text-josett-300 mb-1">Support hours</p>
              <p className="text-sm text-josett-600 dark:text-josett-400">Monday – Friday<br />8am – 6pm GMT</p>
            </div>
          </div>

          {/* Form */}
          {sent ? (
            <div className="lg:col-span-2 flex flex-col items-center justify-center text-center p-12 bg-green-50 dark:bg-green-950/20 rounded-3xl border border-green-100 dark:border-green-900">
              <CheckCircle2 size={48} className="text-green-500 mb-4" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Message sent!</h3>
              <p className="text-slate-500 dark:text-slate-400">We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Name *</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-josett-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-josett-500 focus:outline-none" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Subject</label>
                <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="How can we help?"
                  className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-josett-500 focus:outline-none" />
              </div>
              <div className="mb-5">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">Message *</label>
                <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5}
                  className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-josett-500 focus:outline-none resize-none" />
              </div>
              {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
              <button onClick={handleSubmit} disabled={sending}
                className="flex items-center gap-2 bg-josett-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-josett-500 transition-all disabled:opacity-50">
                {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {sending ? "Sending..." : "Send Message"}
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
