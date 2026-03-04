"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Trash2, Eye, Loader2, ExternalLink } from "lucide-react";
import { format } from "date-fns";

interface FormSubmission {
  id: string; name: string; email: string; phone: string | null;
  message: string | null; data: Record<string, unknown>;
  isRead: boolean; createdAt: string; source: string | null;
}

export default function FormsPage() {
  const params = useParams();
  const siteId = params.siteId as string;
  const [submissions, setSubmissions] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<FormSubmission | null>(null);

  useEffect(() => {
    fetch(`/api/sites/${siteId}/forms`)
      .then((r) => r.json())
      .then((d) => { setSubmissions(d.submissions || []); setLoading(false); });
  }, [siteId]);

  const markRead = async (id: string) => {
    await fetch(`/api/sites/${siteId}/forms/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isRead: true }),
    });
    setSubmissions((s) => s.map((x) => x.id === id ? { ...x, isRead: true } : x));
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this submission?")) return;
    await fetch(`/api/sites/${siteId}/forms/${id}`, { method: "DELETE" });
    setSubmissions((s) => s.filter((x) => x.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const handleOpen = (sub: FormSubmission) => {
    setSelected(sub);
    if (!sub.isRead) markRead(sub.id);
  };

  const unread = submissions.filter((s) => !s.isRead).length;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/sites/${siteId}`} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Form Submissions</h1>
          <p className="text-slate-500 text-sm">{submissions.length} total{unread > 0 ? ` · ${unread} unread` : ""}</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40"><Loader2 className="animate-spin text-josett-500" /></div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <Mail size={48} className="mx-auto mb-4 opacity-20" />
          <p className="font-semibold">No submissions yet</p>
          <p className="text-sm">Contact form submissions from your live site appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* List */}
          <div className="space-y-2">
            {submissions.map((sub) => (
              <div key={sub.id} onClick={() => handleOpen(sub)}
                className={`relative p-4 rounded-2xl border cursor-pointer transition-all ${
                  selected?.id === sub.id
                    ? "border-josett-400 dark:border-josett-600 bg-josett-50 dark:bg-josett-950/20"
                    : sub.isRead
                    ? "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-200"
                    : "border-josett-100 dark:border-josett-900 bg-josett-50/50 dark:bg-josett-950/10 hover:border-josett-200"
                }`}>
                {!sub.isRead && <span className="absolute top-4 right-4 w-2 h-2 bg-josett-500 rounded-full" />}
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-josett-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {sub.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${sub.isRead ? "text-slate-600 dark:text-slate-400" : "text-slate-900 dark:text-white"}`}>
                      {sub.name}
                    </p>
                    <p className="text-xs text-slate-400 truncate">{sub.email}</p>
                  </div>
                </div>
                {sub.message && <p className="text-xs text-slate-500 truncate mt-1 ml-11">{sub.message}</p>}
                <p className="text-xs text-slate-400 mt-1 ml-11">{format(new Date(sub.createdAt), "MMM d, yyyy · h:mm a")}</p>
              </div>
            ))}
          </div>

          {/* Detail panel */}
          {selected ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 h-fit sticky top-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-josett-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                    {selected.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{selected.name}</p>
                    <p className="text-xs text-slate-400">{format(new Date(selected.createdAt), "MMM d, yyyy 'at' h:mm a")}</p>
                  </div>
                </div>
                <button onClick={() => handleDelete(selected.id)} className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Email</p>
                  <a href={`mailto:${selected.email}`} className="text-sm text-josett-600 dark:text-josett-400 flex items-center gap-1 hover:underline">
                    {selected.email} <ExternalLink size={11} />
                  </a>
                </div>
                {selected.phone && (
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Phone</p>
                    <a href={`tel:${selected.phone}`} className="text-sm text-josett-600 dark:text-josett-400 hover:underline">{selected.phone}</a>
                  </div>
                )}
                {selected.message && (
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Message</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800 rounded-xl p-3">{selected.message}</p>
                  </div>
                )}
                {/* Extra fields */}
                {Object.entries(selected.data || {})
                  .filter(([k]) => !["name","email","phone","message"].includes(k))
                  .map(([k, v]) => (
                    <div key={k}>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">{k}</p>
                      <p className="text-sm text-slate-700 dark:text-slate-300">{String(v)}</p>
                    </div>
                  ))}
              </div>

              <a href={`mailto:${selected.email}?subject=Re: Your message`}
                className="mt-5 flex items-center justify-center gap-2 w-full bg-josett-600 text-white font-bold py-2.5 rounded-xl text-sm hover:bg-josett-500 transition-all">
                <Mail size={14} /> Reply via Email
              </a>
            </div>
          ) : (
            <div className="hidden lg:flex items-center justify-center h-48 text-slate-400 text-sm">
              Select a submission to view details
            </div>
          )}
        </div>
      )}
    </div>
  );
}
