"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Globe, TrendingUp, DollarSign, Search, Shield, Ban, CheckCircle2, Loader2, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface Stats {
  users: { total: number; new30d: number };
  sites: { total: number; active: number; expired: number };
  revenue: { total: number; last30d: number; totalPayments: number };
}

interface User {
  id: string; email: string; fullName: string; role: string;
  emailVerified: boolean; createdAt: string; referralCreditsGhs: number;
  _count: { sites: number; payments: number };
}

interface Site {
  id: string; name: string; slug: string; status: string; siteType: string;
  monthlyPriceGhs: number; createdAt: string;
  user: { email: string; fullName: string };
}

const STATUS_COLORS: Record<string, string> = {
  DEPLOYED:  "bg-green-100 text-green-700",
  BUILDING:  "bg-blue-100 text-blue-700",
  SUSPENDED: "bg-orange-100 text-orange-700",
  EXPIRED:   "bg-red-100 text-red-700",
  CANCELLED: "bg-slate-100 text-slate-500",
};

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab]       = useState<"overview" | "users" | "sites">("overview");
  const [stats, setStats]   = useState<Stats | null>(null);
  const [users, setUsers]   = useState<User[]>([]);
  const [sites, setSites]   = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage]     = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");

  // Guard: only admins
  useEffect(() => {
    const r = router;
    fetch("/api/admin/stats")
      .then((res) => { if (res.status === 403) r.push("/dashboard"); return res.json(); })
      .then((d) => { setStats(d); setLoading(false); })
      .catch(() => r.push("/dashboard"));
  }, [router]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const loadUsers = async () => {
      const p = new URLSearchParams({ page: String(page), search });
      const res = await fetch(`/api/admin/users?${p}`);
      const d = await res.json();
      setUsers(d.users || []);
      setTotalPages(d.pages || 1);
    };
    const loadSites = async () => {
      const p = new URLSearchParams({ page: String(page), search, status: statusFilter });
      const res = await fetch(`/api/admin/sites?${p}`);
      const d = await res.json();
      setSites(d.sites || []);
      setTotalPages(d.pages || 1);
    };
    if (tab === "users") loadUsers();
    if (tab === "sites") loadSites();
  }, [tab, page, search, statusFilter]);

  const handleRoleChange = async (userId: string, role: string) => {
    await fetch("/api/admin/users", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId, role }) });
    setUsers((u) => u.map((x) => x.id === userId ? { ...x, role } : x));
  };

  const handleSiteStatus = async (siteId: string, status: string) => {
    await fetch("/api/admin/sites", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ siteId, status }) });
    setSites((s) => s.map((x) => x.id === siteId ? { ...x, status } : x));
  };

  const TABS = [
    { id: "overview", label: "Overview", icon: TrendingUp },
    { id: "users",    label: "Users",    icon: Users },
    { id: "sites",    label: "Sites",    icon: Globe },
  ] as const;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-red-100 dark:bg-red-950/40 rounded-xl flex items-center justify-center">
          <Shield size={20} className="text-red-600 dark:text-red-400" />
        </div>
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Admin Panel</h1>
          <p className="text-slate-500 text-sm">Platform management</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 mb-8 w-fit">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => { setTab(id); setPage(1); setSearch(""); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              tab === id ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}>
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48"><Loader2 className="animate-spin text-josett-500" size={28} /></div>
      ) : (
        <>
          {/* Overview */}
          {tab === "overview" && stats && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total Users",    value: stats.users.total.toLocaleString(),     sub: `+${stats.users.new30d} this month`,  icon: Users,       color: "text-blue-500 bg-blue-50" },
                  { label: "Total Sites",    value: stats.sites.total.toLocaleString(),     sub: `${stats.sites.active} active`,        icon: Globe,       color: "text-green-500 bg-green-50" },
                  { label: "Total Revenue",  value: `GHS ${stats.revenue.total.toLocaleString()}`, sub: `GHS ${stats.revenue.last30d.toLocaleString()} last 30d`, icon: DollarSign, color: "text-josett-500 bg-josett-50" },
                  { label: "Expired Sites",  value: stats.sites.expired.toLocaleString(),   sub: "need attention",                     icon: RefreshCw,   color: "text-red-500 bg-red-50" },
                ].map(({ label, value, sub, icon: Icon, color }) => (
                  <div key={label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color} dark:bg-opacity-20`}><Icon size={16} /></div>
                    <p className="text-2xl font-black text-slate-900 dark:text-white">{value}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{label}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">Total Payments</h3>
                  <p className="text-4xl font-black text-josett-600 dark:text-josett-400">{stats.revenue.totalPayments.toLocaleString()}</p>
                  <p className="text-sm text-slate-400 mt-1">Successful transactions</p>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-4">ARPU (30d)</h3>
                  <p className="text-4xl font-black text-josett-600 dark:text-josett-400">
                    GHS {stats.users.new30d > 0 ? Math.round(stats.revenue.last30d / stats.users.new30d) : 0}
                  </p>
                  <p className="text-sm text-slate-400 mt-1">Avg revenue per new user</p>
                </div>
              </div>
            </>
          )}

          {/* Users */}
          {tab === "users" && (
            <>
              <div className="relative mb-4">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  placeholder="Search by name or email..."
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl focus:border-josett-500 focus:outline-none" />
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr>{["User", "Role", "Sites", "Payments", "Joined", ""].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold text-slate-500 px-4 py-3">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                        <td className="px-4 py-3">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{u.fullName}</p>
                          <p className="text-xs text-slate-400">{u.email}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${u.role === "ADMIN" ? "bg-red-100 text-red-600 dark:bg-red-950/40 dark:text-red-400" : "bg-slate-100 text-slate-600 dark:bg-slate-800"}`}>{u.role}</span>
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{u._count.sites}</td>
                        <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-400">{u._count.payments}</td>
                        <td className="px-4 py-3 text-xs text-slate-400">{format(new Date(u.createdAt), "MMM d, yyyy")}</td>
                        <td className="px-4 py-3">
                          <select value={u.role} onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            className="text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-2 py-1 focus:outline-none">
                            <option value="USER">USER</option>
                            <option value="ADMIN">ADMIN</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Sites */}
          {tab === "sites" && (
            <>
              <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    placeholder="Search sites..."
                    className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl focus:border-josett-500 focus:outline-none" />
                </div>
                <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                  className="text-sm border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl px-3 py-2 focus:outline-none">
                  <option value="">All Statuses</option>
                  {["DEPLOYED", "BUILDING", "SUSPENDED", "EXPIRED", "CANCELLED"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-50 dark:bg-slate-800/50">
                    <tr>{["Site", "Owner", "Status", "Price", "Created", ""].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold text-slate-500 px-4 py-3">{h}</th>
                    ))}</tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {sites.map((site) => (
                      <tr key={site.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                        <td className="px-4 py-3">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">{site.name}</p>
                          <p className="text-xs text-slate-400">{site.slug}</p>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-xs text-slate-700 dark:text-slate-300">{site.user.fullName}</p>
                          <p className="text-xs text-slate-400">{site.user.email}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${STATUS_COLORS[site.status] || ""}`}>{site.status}</span>
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white">GHS {site.monthlyPriceGhs}</td>
                        <td className="px-4 py-3 text-xs text-slate-400">{format(new Date(site.createdAt), "MMM d, yyyy")}</td>
                        <td className="px-4 py-3">
                          <select value={site.status} onChange={(e) => handleSiteStatus(site.id, e.target.value)}
                            className="text-xs border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-lg px-2 py-1 focus:outline-none">
                            {["DEPLOYED", "BUILDING", "SUSPENDED", "EXPIRED", "CANCELLED"].map((s) => (
                              <option key={s} value={s}>{s}</option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* Pagination */}
          {(tab === "users" || tab === "sites") && totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-slate-400">Page {page} of {totalPages}</p>
              <div className="flex gap-2">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 disabled:opacity-30">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-900 disabled:opacity-30">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
