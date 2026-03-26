"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Loader2, Tag, ToggleLeft, ToggleRight, AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface Coupon {
  id: string; code: string; discountType: string; discountValue: number;
  minOrderGhs: number | null; maxUsageCount: number | null; usageCount: number;
  expiresAt: string | null; isActive: boolean; createdAt: string;
}

const INPUT = "w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-josett-500 focus:outline-none";

export default function CouponsPage() {
  const params = useParams();
  const siteId = params.siteId as string;

  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    code: "", discountType: "PERCENT", discountValue: "",
    minOrderGhs: "", maxUsageCount: "", expiresAt: "",
  });

  useEffect(() => {
    fetch(`/api/sites/${siteId}/coupons`)
      .then((r) => r.json())
      .then((d) => { setCoupons(d.coupons || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [siteId]);

  const handleCreate = async () => {
    if (!form.code || !form.discountValue) { setError("Code and discount value are required"); return; }
    setCreating(true); setError("");
    const res = await fetch(`/api/sites/${siteId}/coupons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: form.code,
        discountType: form.discountType,
        discountValue: Number(form.discountValue),
        minOrderGhs: form.minOrderGhs ? Number(form.minOrderGhs) : null,
        maxUsageCount: form.maxUsageCount ? Number(form.maxUsageCount) : null,
        expiresAt: form.expiresAt || null,
      }),
    });
    const data = await res.json();
    if (data.error) { setError(data.error); setCreating(false); return; }
    setCoupons((c) => [data.coupon, ...c]);
    setForm({ code: "", discountType: "PERCENT", discountValue: "", minOrderGhs: "", maxUsageCount: "", expiresAt: "" });
    setShowForm(false);
    setCreating(false);
  };

  const handleToggle = async (id: string, current: boolean) => {
    setCoupons((c) => c.map((x) => x.id === id ? { ...x, isActive: !current } : x));
    await fetch(`/api/sites/${siteId}/coupons`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isActive: !current }),
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this coupon?")) return;
    setCoupons((c) => c.filter((x) => x.id !== id));
    await fetch(`/api/sites/${siteId}/coupons?id=${id}`, { method: "DELETE" });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/sites/${siteId}`} className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Discount Coupons</h1>
          <p className="text-slate-500 text-sm">Create coupon codes your customers can use at checkout</p>
        </div>
        <button onClick={() => setShowForm((s) => !s)}
          className="flex items-center gap-2 bg-josett-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-josett-500 transition-all">
          <Plus size={16} /> New Coupon
        </button>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 mb-6">
          <h2 className="font-bold text-slate-900 dark:text-white mb-5">Create Coupon</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Coupon Code *</label>
              <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                placeholder="SAVE20" className={INPUT} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Discount Type *</label>
              <select value={form.discountType} onChange={(e) => setForm({ ...form, discountType: e.target.value })}
                className={INPUT}>
                <option value="PERCENT">Percentage (%)</option>
                <option value="FIXED">Fixed Amount (GHS)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                {form.discountType === "PERCENT" ? "Discount %" : "Discount (GHS)"} *
              </label>
              <input type="number" value={form.discountValue} onChange={(e) => setForm({ ...form, discountValue: e.target.value })}
                placeholder={form.discountType === "PERCENT" ? "20" : "50"} min="1" className={INPUT} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Min Order (GHS)</label>
              <input type="number" value={form.minOrderGhs} onChange={(e) => setForm({ ...form, minOrderGhs: e.target.value })}
                placeholder="Optional" min="0" className={INPUT} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Max Uses</label>
              <input type="number" value={form.maxUsageCount} onChange={(e) => setForm({ ...form, maxUsageCount: e.target.value })}
                placeholder="Unlimited" min="1" className={INPUT} />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Expires At</label>
              <input type="date" value={form.expiresAt} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
                className={INPUT} />
            </div>
          </div>
          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm mb-4">
              <AlertCircle size={14} /> {error}
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={handleCreate} disabled={creating}
              className="flex items-center gap-2 bg-josett-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-josett-500 transition-all disabled:opacity-50">
              {creating ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
              Create Coupon
            </button>
            <button onClick={() => { setShowForm(false); setError(""); }}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Coupons List */}
      {loading ? (
        <div className="flex items-center justify-center h-40"><Loader2 className="animate-spin text-josett-500" /></div>
      ) : coupons.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-12 text-center">
          <Tag size={40} className="mx-auto mb-3 text-slate-300" />
          <p className="font-semibold text-slate-700 dark:text-slate-300 mb-1">No coupons yet</p>
          <p className="text-sm text-slate-500">Create your first discount code to boost sales.</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800/50">
              <tr>
                {["Code", "Discount", "Usage", "Expires", "Status", ""].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {coupons.map((c) => {
                const expired = c.expiresAt && new Date(c.expiresAt) < new Date();
                const exhausted = c.maxUsageCount !== null && c.usageCount >= c.maxUsageCount;
                return (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="px-4 py-3">
                      <span className="font-mono font-bold text-sm text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{c.code}</span>
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-slate-900 dark:text-white">
                      {c.discountType === "PERCENT" ? `${c.discountValue}% off` : `GHS ${c.discountValue} off`}
                      {c.minOrderGhs && <span className="text-xs text-slate-400 ml-1 font-normal">min GHS {c.minOrderGhs}</span>}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">
                      {c.usageCount}{c.maxUsageCount ? `/${c.maxUsageCount}` : ""}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">
                      {c.expiresAt ? format(new Date(c.expiresAt), "MMM d, yyyy") : "Never"}
                    </td>
                    <td className="px-4 py-3">
                      {expired ? (
                        <span className="text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-950/30 px-2 py-1 rounded-full">Expired</span>
                      ) : exhausted ? (
                        <span className="text-xs font-semibold text-orange-500 bg-orange-50 dark:bg-orange-950/30 px-2 py-1 rounded-full">Exhausted</span>
                      ) : c.isActive ? (
                        <span className="text-xs font-semibold text-green-600 bg-green-50 dark:bg-green-950/30 px-2 py-1 rounded-full">Active</span>
                      ) : (
                        <span className="text-xs font-semibold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">Paused</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleToggle(c.id, c.isActive)} title={c.isActive ? "Pause" : "Activate"}
                          className="text-slate-400 hover:text-josett-500 transition-colors">
                          {c.isActive ? <ToggleRight size={20} className="text-josett-500" /> : <ToggleLeft size={20} />}
                        </button>
                        <button onClick={() => handleDelete(c.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
