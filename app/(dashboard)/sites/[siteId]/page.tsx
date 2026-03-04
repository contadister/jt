"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { format, differenceInDays } from "date-fns";
import {
  Globe, Edit3, Settings, ExternalLink, Rocket, Eye,
  Clock, AlertTriangle, CheckCircle2, Loader2, BarChart2,
  RefreshCw, Calendar, CreditCard, ArrowLeft,
  ShoppingCart, BookOpen, CalendarDays, Mail, Newspaper,
} from "lucide-react";

interface SiteData {
  id: string; name: string; slug: string; status: string; siteType: string;
  vercelDomain: string | null; customDomain: string | null; customDomainVerified: boolean;
  totalVisits: number; monthlyPriceGhs: number; subscriptionEnd: string | null;
  lastDeployedAt: string | null; createdAt: string; adSupportedTier: boolean;
}

export default function SiteDashboardPage() {
  const params = useParams();
  const router = useRouter();
  const siteId = params.siteId as string;
  const [site, setSite] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [deploying, setDeploying] = useState(false);

  useEffect(() => {
    fetch(`/api/sites/${siteId}`)
      .then((r) => r.json())
      .then((data) => { setSite(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [siteId]);

  const handleDeploy = async () => {
    setDeploying(true);
    await fetch(`/api/sites/${siteId}/deploy`, { method: "POST" });
    setDeploying(false);
    setSite((s) => s ? { ...s, status: "DEPLOYED" } : s);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 size={32} className="animate-spin text-josett-500" />
      </div>
    );
  }

  if (!site) {
    return <div className="p-6 text-slate-400">Site not found.</div>;
  }

  const liveUrl = site.customDomain && site.customDomainVerified
    ? `https://${site.customDomain}`
    : site.vercelDomain ? `https://${site.vercelDomain}` : null;

  const daysUntilExpiry = site.subscriptionEnd
    ? differenceInDays(new Date(site.subscriptionEnd), new Date())
    : null;

  const statusColor = {
    DEPLOYED: "text-green-500 bg-green-500/10",
    BUILDING: "text-amber-500 bg-amber-500/10",
    SUSPENDED: "text-red-500 bg-red-500/10",
    EXPIRED: "text-red-500 bg-red-500/10",
  }[site.status] || "text-slate-500 bg-slate-500/10";

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.push("/sites")} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">{site.name}</h1>
          <p className="text-slate-500 text-sm">{site.slug}.josett.com</p>
        </div>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusColor}`}>{site.status}</span>
        <div className="flex items-center gap-2">
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              <ExternalLink size={14} /> Visit
            </a>
          )}
          <Link href={`/sites/${siteId}/builder`}
            className="flex items-center gap-2 text-sm font-bold bg-josett-600 text-white px-4 py-2 rounded-xl hover:bg-josett-500 transition-all">
            <Edit3 size={14} /> Edit Site
          </Link>
        </div>
      </div>

      {/* Expiry warning */}
      {daysUntilExpiry !== null && daysUntilExpiry <= 7 && (
        <div className={`mb-6 flex items-center gap-3 px-4 py-3 rounded-xl border ${
          daysUntilExpiry <= 1
            ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800 text-red-700 dark:text-red-400"
            : "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-400"
        }`}>
          <AlertTriangle size={16} />
          <p className="text-sm font-medium">
            {daysUntilExpiry <= 0
              ? "Your subscription has expired. Renew now to keep your site live."
              : `Your subscription expires in ${daysUntilExpiry} day${daysUntilExpiry === 1 ? "" : "s"}. Renew to avoid downtime.`}
          </p>
          <Link href={`/sites/${siteId}/renew`} className="ml-auto text-xs font-bold underline">Renew →</Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Visits", value: site.totalVisits.toLocaleString(), icon: Eye, color: "text-blue-500" },
          { label: "Monthly Price", value: `GHS ${site.monthlyPriceGhs}`, icon: CreditCard, color: "text-green-500" },
          { label: "Expires", value: site.subscriptionEnd ? format(new Date(site.subscriptionEnd), "MMM d, yyyy") : "—", icon: Calendar, color: daysUntilExpiry !== null && daysUntilExpiry <= 7 ? "text-amber-500" : "text-slate-500" },
          { label: "Last Deployed", value: site.lastDeployedAt ? format(new Date(site.lastDeployedAt), "MMM d") : "Never", icon: Rocket, color: "text-josett-500" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-500 text-xs font-medium">{label}</p>
              <Icon size={16} className={color} />
            </div>
            <p className="text-xl font-black text-slate-900 dark:text-white">{value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
          <h2 className="font-bold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Edit Site",   desc: "Open visual builder",      href: `/sites/${siteId}/builder`,    icon: Edit3,         color: "bg-josett-50 dark:bg-josett-950/30 text-josett-600 dark:text-josett-400" },
              { label: "Analytics",   desc: "Visit stats & traffic",    href: `/sites/${siteId}/analytics`,  icon: BarChart2,     color: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400" },
              { label: "Store",       desc: "Products & orders",        href: `/sites/${siteId}/store`,      icon: ShoppingCart,  color: "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400" },
              { label: "Blog",        desc: "Posts & content",          href: `/sites/${siteId}/blog`,       icon: BookOpen,      color: "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400" },
              { label: "Bookings",    desc: "Appointments",             href: `/sites/${siteId}/bookings`,   icon: CalendarDays,  color: "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400" },
              { label: "Forms",       desc: "Contact submissions",      href: `/sites/${siteId}/forms`,      icon: Mail,          color: "bg-pink-50 dark:bg-pink-950/30 text-pink-600 dark:text-pink-400" },
              { label: "Newsletter",  desc: "Subscribers",              href: `/sites/${siteId}/newsletter`, icon: Newspaper,     color: "bg-cyan-50 dark:bg-cyan-950/30 text-cyan-600 dark:text-cyan-400" },
              { label: "Settings",    desc: "Domain, SEO, danger zone", href: `/sites/${siteId}/settings`,   icon: Settings,      color: "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400" },
              { label: "Renew",       desc: `GHS ${site.monthlyPriceGhs}/month`, href: `/sites/${siteId}/renew`, icon: RefreshCw, color: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400" },
            ].map(({ label, desc, href, icon: Icon, color }) => (
              <Link key={label} href={href}
                className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-josett-200 dark:hover:border-josett-800 transition-all group">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">{label}</p>
                  <p className="text-xs text-slate-500">{desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Site Info */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
          <h2 className="font-bold text-slate-900 dark:text-white mb-4">Site Info</h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-slate-500 mb-1">Live URL</p>
              {liveUrl ? (
                <a href={liveUrl} target="_blank" rel="noreferrer" className="text-josett-600 dark:text-josett-400 text-sm font-medium flex items-center gap-1 hover:underline">
                  {liveUrl.replace("https://", "")} <ExternalLink size={11} />
                </a>
              ) : <p className="text-slate-400 text-sm">Not deployed yet</p>}
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Custom Domain</p>
              {site.customDomain ? (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-900 dark:text-white">{site.customDomain}</span>
                  {site.customDomainVerified
                    ? <CheckCircle2 size={13} className="text-green-500" />
                    : <Clock size={13} className="text-amber-500" />}
                </div>
              ) : (
                <Link href={`/sites/${siteId}/settings`} className="text-josett-600 dark:text-josett-400 text-sm hover:underline">
                  + Connect domain
                </Link>
              )}
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Type</p>
              <p className="text-sm text-slate-900 dark:text-white capitalize">{site.siteType.toLowerCase()}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1">Created</p>
              <p className="text-sm text-slate-900 dark:text-white">{format(new Date(site.createdAt), "MMM d, yyyy")}</p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={handleDeploy}
              disabled={deploying}
              className="w-full flex items-center justify-center gap-2 bg-josett-600 hover:bg-josett-500 text-white font-bold py-2.5 rounded-xl text-sm transition-all disabled:opacity-50"
            >
              {deploying ? <Loader2 size={14} className="animate-spin" /> : <Rocket size={14} />}
              {deploying ? "Deploying..." : "Redeploy Site"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
