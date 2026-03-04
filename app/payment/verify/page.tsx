"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

function VerifyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reference = searchParams.get("reference") || searchParams.get("trxref");

  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [siteId, setSiteId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!reference) {
      setStatus("failed");
      setError("No payment reference found.");
      return;
    }
    fetch("/api/payments/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setStatus("success");
          setSiteId(data.siteId);
          setTimeout(() => { router.push(data.siteId ? `/sites/${data.siteId}` : "/sites"); }, 3000);
        } else {
          setStatus("failed");
          setError(data.error || "Payment was not successful.");
        }
      })
      .catch(() => { setStatus("failed"); setError("Could not verify payment. Please contact support."); });
  }, [reference, router]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-10 max-w-md w-full text-center shadow-xl">
      {status === "loading" && (
        <>
          <Loader2 size={48} className="text-josett-500 animate-spin mx-auto mb-6" />
          <h2 className="text-xl font-black text-slate-900 dark:text-white mb-2">Verifying payment...</h2>
          <p className="text-slate-500 text-sm">Please wait while we confirm your payment with Paystack.</p>
        </>
      )}
      {status === "success" && (
        <>
          <div className="w-20 h-20 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={44} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Payment Successful!</h2>
          <p className="text-slate-500 mb-2">Your site is being deployed to Vercel.</p>
          <p className="text-sm text-slate-400 mb-6">You will receive an email when it goes live. Redirecting you now...</p>
          {siteId && (
            <Link href={`/sites/${siteId}`} className="inline-flex items-center gap-2 bg-josett-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-josett-700 transition-all">
              Go to My Site
            </Link>
          )}
        </>
      )}
      {status === "failed" && (
        <>
          <div className="w-20 h-20 bg-red-100 dark:bg-red-950/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle size={44} className="text-red-500" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Payment Failed</h2>
          <p className="text-red-500 text-sm mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <Link href="/sites/new" className="bg-josett-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-josett-700 transition-all text-sm">Try Again</Link>
            <Link href="/dashboard" className="border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm">Dashboard</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default function PaymentVerifyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <Suspense fallback={
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-10 max-w-md w-full text-center shadow-xl">
          <Loader2 size={48} className="text-josett-500 animate-spin mx-auto mb-6" />
          <h2 className="text-xl font-black text-slate-900 dark:text-white">Loading...</h2>
        </div>
      }>
        <VerifyContent />
      </Suspense>
    </div>
  );
}
