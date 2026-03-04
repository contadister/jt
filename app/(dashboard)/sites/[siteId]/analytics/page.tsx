"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Eye, Users, MousePointer, Globe, Smartphone, Monitor, Loader2 } from "lucide-react";
import { format, subDays } from "date-fns";

interface AnalyticsData {
  totalVisits: number;
  uniqueSessions: number;
  pageViews: { path: string; views: number }[];
  dailyVisits: { date: string; visits: number }[];
  referrers: { source: string; visits: number }[];
  devices: { device: string; count: number }[];
  countries: { country: string; visits: number }[];
}

function MiniBar({ value, max, color = "bg-josett-500" }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-full h-2">
        <div className={`${color} h-2 rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-slate-500 w-8 text-right">{value}</span>
    </div>
  );
}

function SimpleLineChart({ data }: { data: { date: string; visits: number }[] }) {
  if (!data.length) return null;
  const max = Math.max(...data.map((d) => d.visits), 1);
  const width = 600;
  const height = 120;
  const pad = 16;

  const points = data.map((d, i) => ({
    x: pad + (i / (data.length - 1)) * (width - pad * 2),
    y: height - pad - ((d.visits / max) * (height - pad * 2)),
    visits: d.visits,
    date: d.date,
  }));

  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - pad} L ${points[0].x} ${height - pad} Z`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-32">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6272f1" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#6272f1" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill="url(#areaGrad)" />
      <path d={pathD} fill="none" stroke="#6272f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill="#6272f1" />
      ))}
    </svg>
  );
}

export default function AnalyticsPage() {
  const params = useParams();
  const siteId = params.siteId as string;
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState(30);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/sites/${siteId}/analytics?days=${range}`)
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, [siteId, range]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/sites/${siteId}`} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Analytics</h1>
          <p className="text-slate-500 text-sm">Visitor traffic and engagement</p>
        </div>
        <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
          {[7, 30, 90].map((d) => (
            <button key={d} onClick={() => setRange(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                range === d ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}>
              {d}d
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 size={32} className="animate-spin text-josett-500" />
        </div>
      ) : !data ? (
        <div className="text-center text-slate-400 py-20">No analytics data yet.</div>
      ) : (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Visits", value: data.totalVisits.toLocaleString(), icon: Eye, color: "text-josett-500 bg-josett-50 dark:bg-josett-950/30" },
              { label: "Unique Sessions", value: data.uniqueSessions.toLocaleString(), icon: Users, color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30" },
              { label: "Top Page Views", value: data.pageViews[0]?.views.toLocaleString() || "0", icon: MousePointer, color: "text-green-500 bg-green-50 dark:bg-green-950/30" },
              { label: "Countries", value: data.countries.length, icon: Globe, color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${color}`}>
                  <Icon size={16} />
                </div>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{value}</p>
                <p className="text-xs text-slate-500 mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-slate-900 dark:text-white">Visits over time</h2>
              <span className="text-xs text-slate-400">Last {range} days</span>
            </div>
            <SimpleLineChart data={data.dailyVisits} />
            {data.dailyVisits.length > 0 && (
              <div className="flex justify-between mt-2">
                <span className="text-xs text-slate-400">{data.dailyVisits[0]?.date}</span>
                <span className="text-xs text-slate-400">{data.dailyVisits[data.dailyVisits.length - 1]?.date}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Pages */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
              <h2 className="font-bold text-slate-900 dark:text-white mb-4">Top Pages</h2>
              {data.pageViews.length === 0 ? (
                <p className="text-slate-400 text-sm">No data yet</p>
              ) : (
                <div className="space-y-3">
                  {data.pageViews.slice(0, 8).map((p) => (
                    <div key={p.path}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-700 dark:text-slate-300 truncate max-w-[140px]">{p.path || "/"}</span>
                        <span className="text-xs font-semibold text-slate-900 dark:text-white">{p.views}</span>
                      </div>
                      <MiniBar value={p.views} max={data.pageViews[0]?.views || 1} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Referrers */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
              <h2 className="font-bold text-slate-900 dark:text-white mb-4">Traffic Sources</h2>
              {data.referrers.length === 0 ? (
                <p className="text-slate-400 text-sm">No referrer data yet</p>
              ) : (
                <div className="space-y-3">
                  {data.referrers.slice(0, 8).map((r) => (
                    <div key={r.source}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-700 dark:text-slate-300 truncate max-w-[140px]">{r.source || "Direct"}</span>
                        <span className="text-xs font-semibold text-slate-900 dark:text-white">{r.visits}</span>
                      </div>
                      <MiniBar value={r.visits} max={data.referrers[0]?.visits || 1} color="bg-blue-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Devices + Countries */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
                <h2 className="font-bold text-slate-900 dark:text-white mb-4">Devices</h2>
                <div className="space-y-3">
                  {data.devices.length === 0 ? (
                    <p className="text-slate-400 text-sm">No data yet</p>
                  ) : data.devices.map((d) => (
                    <div key={d.device} className="flex items-center gap-3">
                      {d.device === "mobile" ? <Smartphone size={14} className="text-slate-400" /> : <Monitor size={14} className="text-slate-400" />}
                      <span className="text-xs text-slate-700 dark:text-slate-300 capitalize flex-1">{d.device || "Unknown"}</span>
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">{d.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
                <h2 className="font-bold text-slate-900 dark:text-white mb-4">Countries</h2>
                <div className="space-y-2">
                  {data.countries.slice(0, 5).map((c) => (
                    <div key={c.country} className="flex items-center justify-between">
                      <span className="text-xs text-slate-700 dark:text-slate-300">{c.country || "Unknown"}</span>
                      <span className="text-xs font-semibold text-slate-900 dark:text-white">{c.visits}</span>
                    </div>
                  ))}
                  {data.countries.length === 0 && <p className="text-slate-400 text-sm">No data yet</p>}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
