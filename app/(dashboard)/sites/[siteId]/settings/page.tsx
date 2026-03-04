"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Globe, Search, Trash2, AlertTriangle, CheckCircle2, Clock, Loader2, ExternalLink, Save } from "lucide-react";

interface SiteData {
  id: string; name: string; slug: string; customDomain: string | null;
  customDomainVerified: boolean; seoTitle: string | null; seoDescription: string | null;
  seoKeywords: string | null; seoOgImage: string | null;
  primaryColor: string; secondaryColor: string; fontFamily: string;
}

export default function SiteSettingsPage() {
  const params = useParams();
  const router = useRouter();
  const siteId = params.siteId as string;

  const [site, setSite] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Domain state
  const [domainInput, setDomainInput] = useState("");
  const [domainLoading, setDomainLoading] = useState(false);
  const [dnsInstructions, setDnsInstructions] = useState<{type: string; name: string; value: string; ttl: number} | null>(null);
  const [domainError, setDomainError] = useState("");

  // Delete confirm
  const [deleteConfirm, setDeleteConfirm] = useState("");

  // Form state
  const [form, setForm] = useState({
    seoTitle: "", seoDescription: "", seoKeywords: "", seoOgImage: "",
    primaryColor: "#6272f1", secondaryColor: "#8b5cf6",
  });

  useEffect(() => {
    fetch(`/api/sites/${siteId}`)
      .then((r) => r.json())
      .then((data) => {
        setSite(data);
        setForm({
          seoTitle: data.seoTitle || "",
          seoDescription: data.seoDescription || "",
          seoKeywords: data.seoKeywords || "",
          seoOgImage: data.seoOgImage || "",
          primaryColor: data.primaryColor || "#6272f1",
          secondaryColor: data.secondaryColor || "#8b5cf6",
        });
        setLoading(false);
      });
  }, [siteId]);

  const handleSave = async () => {
    setSaving(true);
    await fetch(`/api/sites/${siteId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleConnectDomain = async () => {
    if (!domainInput.trim()) return;
    setDomainLoading(true);
    setDomainError("");
    try {
      const res = await fetch(`/api/sites/${siteId}/domain`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: domainInput.trim(), action: "connect" }),
      });
      const data = await res.json();
      if (data.requiresPayment) {
        // Redirect to payment
        const payRes = await fetch(`/api/sites/${siteId}/domain`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ domain: domainInput.trim(), action: "initiate-payment" }),
        });
        const payData = await payRes.json();
        if (payData.paymentUrl) window.location.href = payData.paymentUrl;
      } else if (data.dnsInstructions) {
        setDnsInstructions(data.dnsInstructions);
        setSite((s) => s ? { ...s, customDomain: domainInput.trim(), customDomainVerified: false } : s);
      } else {
        setDomainError(data.error || "Failed to connect domain");
      }
    } catch {
      setDomainError("Connection failed");
    } finally {
      setDomainLoading(false);
    }
  };

  const handleDisconnectDomain = async () => {
    await fetch(`/api/sites/${siteId}/domain`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "disconnect" }),
    });
    setSite((s) => s ? { ...s, customDomain: null, customDomainVerified: false } : s);
    setDnsInstructions(null);
  };

  const handleDelete = async () => {
    if (deleteConfirm !== site?.name) return;
    await fetch(`/api/sites/${siteId}`, { method: "DELETE" });
    router.push("/sites");
  };

  if (loading) return <div className="flex items-center justify-center h-96"><Loader2 className="animate-spin text-josett-500" /></div>;
  if (!site) return <div className="p-6 text-slate-400">Site not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/sites/${siteId}`} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Settings</h1>
          <p className="text-slate-500 text-sm">{site.name}</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="ml-auto flex items-center gap-2 bg-josett-600 text-white font-bold px-4 py-2 rounded-xl text-sm hover:bg-josett-500 transition-all disabled:opacity-50">
          {saving ? <Loader2 size={14} className="animate-spin" /> : saved ? <CheckCircle2 size={14} /> : <Save size={14} />}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* SEO */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <Search size={16} className="text-josett-500" />
          <h2 className="font-bold text-slate-900 dark:text-white">SEO Settings</h2>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Page Title</label>
            <input value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })}
              placeholder={`${site.name} — Your Tagline`}
              className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-josett-500 focus:outline-none" />
            <p className="text-xs text-slate-400 mt-1">{form.seoTitle.length}/60 chars</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Meta Description</label>
            <textarea value={form.seoDescription} onChange={(e) => setForm({ ...form, seoDescription: e.target.value })}
              rows={3} placeholder="Describe your site in 1-2 sentences..."
              className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-josett-500 focus:outline-none resize-none" />
            <p className="text-xs text-slate-400 mt-1">{form.seoDescription.length}/160 chars</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Keywords</label>
            <input value={form.seoKeywords} onChange={(e) => setForm({ ...form, seoKeywords: e.target.value })}
              placeholder="business, ghana, services..."
              className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-josett-500 focus:outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">OG Image URL <span className="text-slate-400 font-normal">(social share image)</span></label>
            <input value={form.seoOgImage} onChange={(e) => setForm({ ...form, seoOgImage: e.target.value })}
              placeholder="https://..."
              className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-josett-500 focus:outline-none" />
          </div>
        </div>
      </div>

      {/* Custom Domain */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 mb-6">
        <div className="flex items-center gap-2 mb-5">
          <Globe size={16} className="text-josett-500" />
          <h2 className="font-bold text-slate-900 dark:text-white">Custom Domain</h2>
          <span className="ml-auto text-xs bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-bold px-2 py-0.5 rounded-full">GHS 200 one-time</span>
        </div>

        {site.customDomain ? (
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="font-medium text-slate-900 dark:text-white">{site.customDomain}</span>
                {site.customDomainVerified
                  ? <span className="flex items-center gap-1 text-green-600 text-xs font-medium"><CheckCircle2 size={12} /> Active</span>
                  : <span className="flex items-center gap-1 text-amber-500 text-xs font-medium"><Clock size={12} /> Pending DNS</span>}
              </div>
              <button onClick={handleDisconnectDomain} className="text-xs text-red-500 hover:underline">Disconnect</button>
            </div>

            {!site.customDomainVerified && dnsInstructions && (
              <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                <p className="text-sm font-bold text-amber-800 dark:text-amber-300 mb-2">Add this DNS record to your domain registrar:</p>
                <div className="grid grid-cols-4 gap-2 text-xs font-mono">
                  <div className="bg-white dark:bg-slate-900 rounded px-2 py-1"><span className="text-slate-400 block">Type</span>{dnsInstructions.type}</div>
                  <div className="bg-white dark:bg-slate-900 rounded px-2 py-1"><span className="text-slate-400 block">Name</span>{dnsInstructions.name}</div>
                  <div className="bg-white dark:bg-slate-900 rounded px-2 py-1 col-span-2"><span className="text-slate-400 block">Value</span>{dnsInstructions.value}</div>
                </div>
                <p className="text-xs text-amber-700 dark:text-amber-400 mt-2">DNS propagation can take up to 48 hours. We check every 2 hours automatically.</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <p className="text-sm text-slate-500 mb-4">Connect your own domain (e.g. mybusiness.com). One-time fee of GHS 200 covers setup + SSL certificate.</p>
            <div className="flex gap-2">
              <input
                value={domainInput}
                onChange={(e) => setDomainInput(e.target.value)}
                placeholder="mybusiness.com"
                className="flex-1 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-josett-500 focus:outline-none"
              />
              <button onClick={handleConnectDomain} disabled={domainLoading || !domainInput.trim()}
                className="flex items-center gap-2 bg-josett-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-josett-500 transition-all disabled:opacity-50">
                {domainLoading ? <Loader2 size={14} className="animate-spin" /> : <ExternalLink size={14} />}
                Connect
              </button>
            </div>
            {domainError && <p className="text-red-500 text-xs mt-2">{domainError}</p>}
            <p className="text-xs text-slate-400 mt-2">You need to purchase and own the domain from a registrar (Godaddy, Namecheap, etc.) before connecting it here. Domain registration costs ~GHS 200/year from registrars.</p>
          </div>
        )}
      </div>

      {/* Danger Zone */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-red-200 dark:border-red-900/50 p-6">
        <div className="flex items-center gap-2 mb-5">
          <AlertTriangle size={16} className="text-red-500" />
          <h2 className="font-bold text-red-600 dark:text-red-400">Danger Zone</h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
          Permanently delete this site and all its data. This cannot be undone. Type <strong>{site.name}</strong> to confirm.
        </p>
        <input
          value={deleteConfirm}
          onChange={(e) => setDeleteConfirm(e.target.value)}
          placeholder={`Type "${site.name}" to confirm`}
          className="w-full border border-red-200 dark:border-red-900 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-red-500 focus:outline-none mb-3"
        />
        <button
          onClick={handleDelete}
          disabled={deleteConfirm !== site.name}
          className="flex items-center gap-2 bg-red-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-red-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Trash2 size={14} /> Delete Site Permanently
        </button>
      </div>
    </div>
  );
}
