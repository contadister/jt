"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  Globe,
  Plus,
  TrendingUp,
  CreditCard,
  Clock,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  Zap,
} from "lucide-react";

interface DashboardData {
  totalSites: number;
  activeSites: number;
  expiringSoon: number;
  totalVisits: number;
  recentSites: SiteCard[];
}

interface SiteCard {
  id: string;
  name: string;
  slug: string;
  status: string;
  siteType: string;
  monthlyPriceGhs: number;
  subscriptionEnd: string | null;
  vercelDeploymentUrl: string | null;
  vercelDomain: string | null;
  totalVisits: number;
  updatedAt: string;
}

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  sub,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  sub?: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-slate-800">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          {label}
        </span>
        <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
      <div className="text-3xl font-black text-slate-900 dark:text-white mb-1">
        {value}
      </div>
      {sub && (
        <div className="text-xs text-slate-400">{sub}</div>
      )}
    </div>
  );
}

function SiteStatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    DEPLOYED: { label: "Live", className: "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400" },
    BUILDING: { label: "Building", className: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400" },
    SUSPENDED: { label: "Suspended", className: "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400" },
    EXPIRED: { label: "Expired", className: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400" },
    CANCELLED: { label: "Cancelled", className: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400" },
  };
  const s = map[status] || map.BUILDING;
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.className}`}>
      {s.label}
    </span>
  );
}

function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null;
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function DashboardPage() {
  const supabase = createClient();
  const [data, setData] = useState<DashboardData | null>(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setUserName(user.user_metadata?.full_name?.split(" ")[0] || "there");

      const res = await fetch("/api/dashboard");
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
      setLoading(false);
    }
    load();
  }, [supabase.auth]);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-64 animate-pulse" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">
            {greeting}, {userName} 👋
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Here's what's happening with your sites today.
          </p>
        </div>
        <Link
          href="/sites/new"
          className="hidden sm:flex items-center gap-2 bg-josett-600 hover:bg-josett-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-all hover:scale-[1.02] shadow-lg shadow-josett-500/25"
        >
          <Plus size={16} />
          New Site
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Sites"
          value={data?.totalSites ?? 0}
          icon={Globe}
          color="bg-josett-500"
        />
        <StatCard
          label="Live Sites"
          value={data?.activeSites ?? 0}
          icon={Zap}
          color="bg-green-500"
          sub="Deployed & active"
        />
        <StatCard
          label="Total Visits"
          value={data?.totalVisits?.toLocaleString() ?? 0}
          icon={TrendingUp}
          color="bg-purple-500"
          sub="Across all sites"
        />
        <StatCard
          label="Expiring Soon"
          value={data?.expiringSoon ?? 0}
          icon={Clock}
          color={data?.expiringSoon ? "bg-orange-500" : "bg-slate-400"}
          sub="Within 7 days"
        />
      </div>

      {/* Expiry warning */}
      {data?.expiringSoon ? (
        <div className="flex items-center gap-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-2xl px-5 py-4">
          <AlertTriangle size={20} className="text-orange-500 flex-shrink-0" />
          <div className="flex-1">
            <span className="font-semibold text-orange-800 dark:text-orange-300 text-sm">
              {data.expiringSoon} site{data.expiringSoon > 1 ? "s" : ""} expiring soon.
            </span>
            <span className="text-orange-600 dark:text-orange-400 text-sm ml-1">
              Renew now to keep them live.
            </span>
          </div>
          <Link
            href="/sites"
            className="text-sm font-bold text-orange-700 dark:text-orange-300 hover:underline whitespace-nowrap"
          >
            View sites →
          </Link>
        </div>
      ) : null}

      {/* Sites list */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Your Sites
          </h2>
          <Link
            href="/sites"
            className="text-sm text-josett-600 hover:text-josett-700 font-semibold flex items-center gap-1"
          >
            View all <ArrowRight size={14} />
          </Link>
        </div>

        {!data?.recentSites?.length ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-12 text-center">
            <div className="w-16 h-16 bg-josett-50 dark:bg-josett-950/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Globe size={28} className="text-josett-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              No sites yet
            </h3>
            <p className="text-slate-500 text-sm mb-6">
              Create your first website in minutes. Choose a template, customize it, and go live.
            </p>
            <Link
              href="/sites/new"
              className="inline-flex items-center gap-2 bg-josett-600 hover:bg-josett-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all"
            >
              <Plus size={16} />
              Create My First Site
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {data.recentSites.map((site) => {
              const days = daysUntil(site.subscriptionEnd);
              const siteUrl = site.vercelDomain
                ? `https://${site.vercelDomain}`
                : site.vercelDeploymentUrl
                ? `https://${site.vercelDeploymentUrl}`
                : null;

              return (
                <div
                  key={site.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                        {site.name}
                      </h3>
                      <div className="text-xs text-slate-400 mt-0.5">{site.slug}</div>
                    </div>
                    <SiteStatusBadge status={site.status} />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <span>{site.totalVisits.toLocaleString()} visits</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      GHS {site.monthlyPriceGhs}/mo
                    </span>
                  </div>

                  {days !== null && days <= 7 && (
                    <div className={`text-xs font-semibold mb-3 flex items-center gap-1 ${
                      days <= 1 ? "text-red-500" : days <= 3 ? "text-orange-500" : "text-amber-500"
                    }`}>
                      <Clock size={12} />
                      {days <= 0 ? "Expires today!" : `Expires in ${days} day${days > 1 ? "s" : ""}`}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Link
                      href={`/sites/${site.id}`}
                      className="flex-1 text-center text-xs font-semibold bg-slate-50 dark:bg-slate-800 hover:bg-josett-50 dark:hover:bg-josett-950/30 text-slate-700 dark:text-slate-300 hover:text-josett-700 py-2 rounded-lg transition-all"
                    >
                      Manage
                    </Link>
                    {siteUrl && (
                      <a
                        href={siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-josett-50 dark:hover:bg-josett-950/30 text-slate-500 hover:text-josett-600 rounded-lg transition-all"
                        title="Visit site"
                        aria-label="Visit site"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Add new site card */}
            <Link
              href="/sites/new"
              className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-5 flex flex-col items-center justify-center gap-2 hover:border-josett-400 hover:bg-josett-50/50 dark:hover:bg-josett-950/10 transition-all group min-h-[160px]"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-800 group-hover:bg-josett-100 dark:group-hover:bg-josett-950/30 flex items-center justify-center transition-all">
                <Plus size={20} className="text-slate-400 group-hover:text-josett-600" />
              </div>
              <span className="text-sm font-semibold text-slate-400 group-hover:text-josett-600 transition-all">
                New Site
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
