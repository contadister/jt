"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, ArrowLeft, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.trim().toLowerCase(),
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="text-center">
        <div className="w-20 h-20 bg-josett-100 dark:bg-josett-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail size={36} className="text-josett-600" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
          Check your email
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          We sent a password reset link to{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {email}
          </span>
          . The link expires in 1 hour.
        </p>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-josett-600 font-semibold hover:text-josett-700"
        >
          <ArrowLeft size={16} />
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/login"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 text-sm mb-8 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Sign In
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2">
          Reset your password
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Enter your email and we will send you a reset link.
        </p>
      </div>

      {error && (
        <div className="mb-5 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-josett-500 transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-josett-600 to-purple-600 text-white font-bold py-3.5 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-josett-500/25"
        >
          {loading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>
    </div>
  );
}
