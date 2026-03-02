"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Globe, Plus, Search, ExternalLink, Clock, Filter } from "lucide-react";

interface Site {
  id: string;
  name: string;
  slug: string;
  status: string;
  siteType: string;
  monthlyPriceGhs: number;
  subscriptionEnd: string | null;
  vercelDomain: string | null;
  vercelDeploymentUrl: string | null;
  totalVisits: number;
  createdAt: string;
}

const STATUS_FILTERS = ["All", "Live", "Building", "Suspended", "Expired"];
const TYPE_LABELS: Record<string, string> = {
  BUSINESS: "Business",
  PORTFOLIO: "Portfolio",
  ECOMMERCE: "E-commerce",
  BLOG: "Blog",
  RESTAURANT: "Restaurant",
  NGO: "NGO",
  PERSONAL: "Personal",
  LANDING: "Landing Page",
  LINK_IN_BIO: "Link in Bio",
  EVENT: "Event",
};

function daysUntil(dateStr: string | null) {
  if (!dateStr) return null;
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
}

function SiteStatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; className: string }> = {
    DEPLOYED: { label: "Live", className: "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400" },
    BUILDING: { label: "Building", className: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400" },
    SUSPENDED: { label: "Suspended", className: "bg-orange-100 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400" },
    EXPIRED: { label: "Expired", className: "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400" },
    CANCELLED: { label: "Cancelled", className: "bg-slate-100 text-slate-500" },
  };
  const s = map[status] || map.BUILDING;
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.className}`}>
      {s.label}
    </span>
  );
}

export default function SitesPage() {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetch("/api/sites")
      .then((r) => r.json())
      .then((d) => { setSites(d.sites || []); setLoading(false); });
  }, []);

  const filtered = sites.filter((s) => {
    const matchSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.slug.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "All" ||
      (statusFilter === "Live" && s.status === "DEPLOYED") ||
      (statusFilter === "Building" && s.status === "BUILDING") ||
      (statusFilter === "Suspended" && s.status === "SUSPENDED") ||
      (statusFilter === "Expired" && s.status === "EXPIRED");
    return matchSearch && matchStatus;
  });

  return (
    <div className="p-6 space-y-6 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">My Sites</h1>
          <p className="text-slate-500 text-sm mt-1">
            {sites.length} site{sites.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          href="/sites/new"
          className="flex items-center gap-2 bg-josett-600 hover:bg-josett-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-all hover:scale-[1.02] shadow-lg shadow-josett-500/25"
        >
          <Plus size={16} />
          New Site
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search sites..."
            className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-josett-500"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                statusFilter === f
                  ? "bg-josett-600 text-white"
                  : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-josett-300"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Sites grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-12 text-center">
          <Globe size={32} className="text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">
            {search || statusFilter !== "All"
              ? "No sites match your filters"
              : "No sites yet — create your first one!"}
          </p>
          {!search && statusFilter === "All" && (
            <Link
              href="/sites/new"
              className="mt-4 inline-flex items-center gap-2 bg-josett-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-josett-700 transition-all"
            >
              <Plus size={15} />
              Create Site
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((site) => {
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
                  <div className="min-w-0 flex-1 mr-2">
                    <h3 className="font-bold text-slate-900 dark:text-white truncate">{site.name}</h3>
                    <div className="text-xs text-slate-400 mt-0.5 truncate">{site.slug}</div>
                  </div>
                  <SiteStatusBadge status={site.status} />
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md font-medium">
                    {TYPE_LABELS[site.siteType] || site.siteType}
                  </span>
                  <span>{site.totalVisits.toLocaleString()} visits</span>
                  <span className="ml-auto font-bold text-slate-700 dark:text-slate-300">
                    GHS {site.monthlyPriceGhs}/mo
                  </span>
                </div>

                {days !== null && (
                  <div className={`text-xs font-semibold mb-3 flex items-center gap-1 ${
                    days <= 0 ? "text-red-500" : days <= 3 ? "text-orange-500" : days <= 7 ? "text-amber-500" : "text-slate-400"
                  }`}>
                    <Clock size={11} />
                    {days <= 0
                      ? "Expired"
                      : days === 1
                      ? "Expires tomorrow"
                      : `Expires in ${days} days`}
                  </div>
                )}

                <div className="flex gap-2">
                  <Link
                    href={`/sites/${site.id}`}
                    className="flex-1 text-center text-xs font-semibold bg-slate-50 dark:bg-slate-800 hover:bg-josett-50 dark:hover:bg-josett-950/30 text-slate-700 dark:text-slate-300 hover:text-josett-700 py-2 rounded-lg transition-all"
                  >
                    Manage
                  </Link>
                  <Link
                    href={`/sites/${site.id}/builder`}
                    className="flex-1 text-center text-xs font-semibold bg-josett-50 dark:bg-josett-950/30 hover:bg-josett-100 text-josett-700 dark:text-josett-400 py-2 rounded-lg transition-all"
                  >
                    Edit
                  </Link>
                  {siteUrl && (
                    <a
                      href={siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-50 dark:bg-slate-800 hover:bg-josett-50 dark:hover:bg-josett-950/30 text-slate-400 hover:text-josett-600 rounded-lg transition-all"
                      title="Visit live site"
                    >
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            );
          })}

          <Link
            href="/sites/new"
            className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 p-5 flex flex-col items-center justify-center gap-2 hover:border-josett-400 hover:bg-josett-50/50 dark:hover:bg-josett-950/10 transition-all group min-h-[180px]"
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
  );
}
