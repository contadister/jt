"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, Check, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function VerifyEmailPage() {
  const router = useRouter();
  const supabase = createClient();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        setStatus("success");
        setTimeout(() => router.push("/dashboard"), 2500);
      } else if (event === "SIGNED_OUT" || !session) {
        // Try to get session from URL hash (email confirmation)
        const { data, error } = await supabase.auth.getSession();
        if (error || !data.session) {
          setStatus("error");
        } else {
          setStatus("success");
          setTimeout(() => router.push("/dashboard"), 2500);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [router, supabase.auth]);

  return (
    <div className="text-center">
      {status === "loading" && (
        <>
          <div className="w-20 h-20 bg-josett-100 dark:bg-josett-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Loader2 size={36} className="text-josett-600 animate-spin" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
            Verifying your email...
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Please wait while we confirm your account.
          </p>
        </>
      )}

      {status === "success" && (
        <>
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={36} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
            Email verified!
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-2">
            Your account is now active. Taking you to your dashboard...
          </p>
          <div className="flex justify-center mt-4">
            <div className="w-8 h-8 border-4 border-josett-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </>
      )}

      {status === "error" && (
        <>
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <X size={36} className="text-red-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
            Verification failed
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            This link may have expired or already been used. Request a new
            verification email from the sign-in page.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-josett-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-josett-700 transition-colors"
          >
            Back to Sign In
          </Link>
        </>
      )}
    </div>
  );
}
