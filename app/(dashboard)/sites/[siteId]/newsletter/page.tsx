"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Newspaper, Download, Trash2, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface Subscriber {
  id: string; email: string; name: string | null; isActive: boolean; createdAt: string;
}

export default function NewsletterPage() {
  const params = useParams();
  const siteId = params.siteId as string;
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/sites/${siteId}/newsletter`)
      .then((r) => r.json())
      .then((d) => { setSubscribers(d.subscribers || []); setLoading(false); });
  }, [siteId]);

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this subscriber?")) return;
    await fetch(`/api/sites/${siteId}/newsletter/${id}`, { method: "DELETE" });
    setSubscribers((s) => s.filter((x) => x.id !== id));
  };

  const handleExportCSV = () => {
    const rows = [["Email", "Name", "Subscribed"]];
    subscribers.forEach((s) => rows.push([s.email, s.name || "", format(new Date(s.createdAt), "yyyy-MM-dd")]));
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "subscribers.csv"; a.click();
  };

  const active = subscribers.filter((s) => s.isActive).length;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/sites/${siteId}`} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Newsletter</h1>
          <p className="text-slate-500 text-sm">{active} active subscriber{active !== 1 ? "s" : ""}</p>
        </div>
        {subscribers.length > 0 && (
          <button onClick={handleExportCSV}
            className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-semibold px-4 py-2 rounded-xl text-sm hover:border-josett-400 hover:text-josett-500 transition-all">
            <Download size={14} /> Export CSV
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40"><Loader2 className="animate-spin text-josett-500" /></div>
      ) : subscribers.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <Newspaper size={48} className="mx-auto mb-4 opacity-20" />
          <p className="font-semibold">No subscribers yet</p>
          <p className="text-sm">People who subscribe via your site's newsletter form appear here.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>{["Email", "Name", "Status", "Subscribed", ""].map((h) => (
                <th key={h} className="text-left text-xs font-semibold text-slate-500 px-4 py-3">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {subscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                  <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">{sub.email}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{sub.name || "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${sub.isActive ? "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400" : "bg-slate-100 text-slate-500 dark:bg-slate-800"}`}>
                      {sub.isActive ? "Active" : "Unsubscribed"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-400">{format(new Date(sub.createdAt), "MMM d, yyyy")}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(sub.id)} className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
