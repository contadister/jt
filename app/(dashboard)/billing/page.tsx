"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CreditCard, RefreshCw, AlertTriangle, CheckCircle2, Clock, Loader2, ExternalLink } from "lucide-react";
import { format, differenceInDays } from "date-fns";

interface Site {
  id: string; name: string; slug: string; status: string;
  monthlyPriceGhs: number; subscriptionEnd: string | null; adSupportedTier: boolean;
}

export default function BillingPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sites")
      .then((r) => r.json())
      .then((d) => { setSites(d.sites || []); setLoading(false); });
  }, []);

  const totalMonthly = sites.filter((s) => s.status !== "EXPIRED" && s.status !== "CANCELLED" && !s.adSupportedTier)
    .reduce((sum, s) => sum + s.monthlyPriceGhs, 0);

  const expiringSoon = sites.filter((s) => {
    if (!s.subscriptionEnd) return false;
    return differenceInDays(new Date(s.subscriptionEnd), new Date()) <= 7;
  });

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-xl font-black text-slate-900 dark:text-white">Billing</h1>
        <p className="text-slate-500 text-sm">Manage your site subscriptions</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Active Sites", value: sites.filter((s) => s.status === "DEPLOYED").length, icon: CheckCircle2, color: "text-green-500 bg-green-50 dark:bg-green-950/30" },
          { label: "Monthly Total", value: `GHS ${totalMonthly}`, icon: CreditCard, color: "text-josett-500 bg-josett-50 dark:bg-josett-950/30" },
          { label: "Expiring Soon", value: expiringSoon.length, icon: AlertTriangle, color: expiringSoon.length > 0 ? "text-amber-500 bg-amber-50 dark:bg-amber-950/30" : "text-slate-400 bg-slate-50 dark:bg-slate-800" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color}`}><Icon size={16} /></div>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{value}</p>
            <p className="text-xs text-slate-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {expiringSoon.length > 0 && (
        <div className="mb-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-amber-500" />
            <p className="font-bold text-amber-800 dark:text-amber-300 text-sm">Action needed</p>
          </div>
          <p className="text-sm text-amber-700 dark:text-amber-400">
            {expiringSoon.length} site{expiringSoon.length > 1 ? "s are" : " is"} expiring within 7 days.
            Renew now to avoid downtime.
          </p>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-40"><Loader2 className="animate-spin text-josett-500" /></div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="font-bold text-slate-900 dark:text-white">All Subscriptions</h2>
          </div>
          {sites.length === 0 ? (
            <div className="text-center py-12 text-slate-400">No sites yet.</div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {sites.map((site) => {
                const days = site.subscriptionEnd ? differenceInDays(new Date(site.subscriptionEnd), new Date()) : null;
                const isExpiring = days !== null && days <= 7;
                const isExpired = site.status === "EXPIRED" || (days !== null && days < 0);

                return (
                  <div key={site.id} className="flex items-center gap-4 px-5 py-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="font-semibold text-slate-900 dark:text-white text-sm truncate">{site.name}</p>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                          isExpired ? "bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400"
                          : isExpiring ? "bg-amber-100 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400"
                          : site.status === "DEPLOYED" ? "bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                        }`}>
                          {isExpired ? "Expired" : isExpiring ? `${days}d left` : site.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        {site.adSupportedTier ? "Free (Ad-supported)" : `GHS ${site.monthlyPriceGhs}/month`}
                        {site.subscriptionEnd && !isExpired && ` · renews ${format(new Date(site.subscriptionEnd), "MMM d, yyyy")}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link href={`/sites/${site.id}`}
                        className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        <ExternalLink size={14} />
                      </Link>
                      {!site.adSupportedTier && (
                        <Link href={`/api/payments/initialize?siteId=${site.id}&type=renewal`}
                          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${
                            isExpired || isExpiring
                              ? "bg-josett-600 text-white hover:bg-josett-500"
                              : "border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-josett-400 hover:text-josett-500"
                          }`}>
                          <RefreshCw size={12} /> {isExpired ? "Reactivate" : "Renew"}
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
