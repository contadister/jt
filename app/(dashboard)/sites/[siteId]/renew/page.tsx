"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, RefreshCw, CreditCard, CheckCircle2, AlertTriangle, Loader2, Calendar } from "lucide-react";
import { format, differenceInDays, addMonths } from "date-fns";

interface SiteData {
  id: string; name: string; slug: string; status: string;
  monthlyPriceGhs: number; subscriptionEnd: string | null; adSupportedTier: boolean;
  referralCreditsGhs?: number;
}

export default function RenewPage() {
  const params = useParams();
  const router = useRouter();
  const siteId = params.siteId as string;
  const [site, setSite] = useState<SiteData | null>(null);
  const [userCredits, setUserCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [months, setMonths] = useState(1);

  useEffect(() => {
    Promise.all([
      fetch(`/api/sites/${siteId}`).then((r) => r.json()),
      fetch("/api/account").then((r) => r.json()),
    ]).then(([siteData, accountData]) => {
      setSite(siteData);
      setUserCredits(accountData.user?.referralCreditsGhs || 0);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [siteId]);

  const handleRenew = async () => {
    if (!site) return;
    setPaying(true);
    const res = await fetch("/api/payments/initialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ siteId, type: "RENEWAL", months }),
    });
    const data = await res.json();
    if (data.authorizationUrl) {
      window.location.href = data.authorizationUrl;
    } else {
      setPaying(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <Loader2 size={28} className="animate-spin text-josett-500" />
    </div>
  );

  if (!site) return <div className="p-6 text-slate-400">Site not found.</div>;

  const daysLeft = site.subscriptionEnd
    ? differenceInDays(new Date(site.subscriptionEnd), new Date())
    : null;
  const isExpired = site.status === "EXPIRED" || (daysLeft !== null && daysLeft < 0);
  const isExpiring = daysLeft !== null && daysLeft <= 7 && daysLeft >= 0;
  const total = site.monthlyPriceGhs * months;
  const appliedCredits = Math.min(userCredits, total);
  const amountDue = Math.max(0, total - appliedCredits);
  const newExpiry = addMonths(
    isExpired ? new Date() : new Date(site.subscriptionEnd || new Date()),
    months
  );

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/sites/${siteId}`} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Renew Site</h1>
          <p className="text-slate-500 text-sm">{site.name}</p>
        </div>
      </div>

      {/* Status banner */}
      {isExpired && (
        <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <AlertTriangle size={18} className="text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700 dark:text-red-400">Your site is currently <strong>offline</strong>. Renew to bring it back live immediately.</p>
        </div>
      )}
      {isExpiring && (
        <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 mb-6 flex items-center gap-3">
          <AlertTriangle size={18} className="text-amber-500 flex-shrink-0" />
          <p className="text-sm text-amber-700 dark:text-amber-400">Your site expires in <strong>{daysLeft} day{daysLeft !== 1 ? "s" : ""}</strong>. Renew now to avoid downtime.</p>
        </div>
      )}

      {/* Plan selector */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 mb-5">
        <h2 className="font-bold text-slate-900 dark:text-white mb-4">Choose duration</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { m: 1, label: "1 Month",  badge: null },
            { m: 3, label: "3 Months", badge: "Save 0%" },
            { m: 12, label: "1 Year",  badge: "Best value" },
          ].map(({ m, label, badge }) => (
            <button key={m} onClick={() => setMonths(m)}
              className={`relative p-4 rounded-xl border-2 text-center transition-all ${
                months === m
                  ? "border-josett-500 bg-josett-50 dark:bg-josett-950/30"
                  : "border-slate-200 dark:border-slate-700 hover:border-josett-300"
              }`}>
              {badge && (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs font-bold bg-josett-600 text-white px-2 py-0.5 rounded-full whitespace-nowrap">
                  {badge}
                </span>
              )}
              <p className="font-black text-slate-900 dark:text-white text-sm">{label}</p>
              <p className="text-xs text-slate-500 mt-0.5">GHS {site.monthlyPriceGhs * m}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 mb-5">
        <h2 className="font-bold text-slate-900 dark:text-white mb-4">Summary</h2>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-500">{months} month{months > 1 ? "s" : ""} × GHS {site.monthlyPriceGhs}</span>
            <span className="font-semibold text-slate-900 dark:text-white">GHS {total}</span>
          </div>
          {appliedCredits > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Referral credits applied</span>
              <span className="font-semibold text-green-600">− GHS {appliedCredits}</span>
            </div>
          )}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between">
            <span className="font-bold text-slate-900 dark:text-white">Total due</span>
            <span className="font-black text-xl text-josett-600 dark:text-josett-400">GHS {amountDue}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
            <Calendar size={12} />
            Active until {format(newExpiry, "MMMM d, yyyy")}
          </div>
        </div>
      </div>

      {userCredits > 0 && (
        <p className="text-xs text-slate-400 mb-5">
          You have <strong className="text-josett-500">GHS {userCredits}</strong> in referral credits. GHS {appliedCredits} will be applied automatically.
        </p>
      )}

      <button onClick={handleRenew} disabled={paying}
        className="w-full flex items-center justify-center gap-3 bg-josett-600 text-white font-black py-4 rounded-2xl text-base hover:bg-josett-500 transition-all disabled:opacity-50 shadow-lg shadow-josett-500/30">
        {paying ? <Loader2 size={18} className="animate-spin" /> : <CreditCard size={18} />}
        {paying ? "Redirecting to payment..." : `Pay GHS ${amountDue} via Paystack`}
      </button>
      <p className="text-center text-xs text-slate-400 mt-3">Secured by Paystack · Mobile money & cards accepted</p>
    </div>
  );
}
