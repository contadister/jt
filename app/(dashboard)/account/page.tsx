"use client";

import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  User, Lock, Gift, Clock, Save, Loader2, CheckCircle2,
  Camera, Copy, Check, AlertCircle,
} from "lucide-react";
import { format } from "date-fns";

interface UserData {
  id: string; email: string; fullName: string; avatarUrl: string | null;
  phone: string | null; referralCode: string | null; referralCreditsGhs: number;
  emailVerified: boolean; createdAt: string;
  _count: { referrals: number };
}

interface Payment {
  id: string; amountGhs: number; paymentType: string; status: string;
  createdAt: string; site: { name: string } | null;
}

export default function AccountPage() {
  const [user, setUser] = useState<UserData | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"profile" | "security" | "referrals" | "billing">("profile");

  const [profileForm, setProfileForm] = useState({ fullName: "", phone: "" });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  const [pwForm, setPwForm] = useState({ newPassword: "", confirmPassword: "" });
  const [savingPw, setSavingPw] = useState(false);
  const [pwError, setPwError] = useState("");
  const [pwSaved, setPwSaved] = useState(false);

  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    let cancelled = false;

    // Wait for auth to be confirmed before fetching — avoids the race where
    // getSession() returns null on initial load and the API responds 401.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (cancelled) return;
        const token = session?.access_token;

        if (!token) {
          setError("You must be logged in to view this page.");
          setLoading(false);
          return;
        }

        try {
          const res = await fetch("/api/account", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const d = await res.json();
          if (cancelled) return;
          if (!d.user) { setError("Could not load account data."); setLoading(false); return; }
          setUser(d.user);
          setPayments(d.paymentHistory || []);
          setProfileForm({ fullName: d.user.fullName || "", phone: d.user.phone || "" });
        } catch (e) {
          if (!cancelled) setError("Failed to load account. Please refresh.");
          console.error(e);
        } finally {
          if (!cancelled) setLoading(false);
        }

        // Only need the first event
        subscription.unsubscribe();
      }
    );

    // Fallback: if onAuthStateChange never fires within 8 s, stop spinning
    const fallback = setTimeout(() => {
      if (!cancelled && loading) {
        setError("Session timed out. Please refresh.");
        setLoading(false);
      }
    }, 8000);

    return () => {
      cancelled = true;
      subscription.unsubscribe();
      clearTimeout(fallback);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authedFetch = async (url: string, opts: RequestInit = {}) => {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token ?? "";
    return fetch(url, {
      ...opts,
      headers: {
        ...(opts.headers as Record<string, string> ?? {}),
        Authorization: `Bearer ${token}`,
        ...(opts.body ? { "Content-Type": "application/json" } : {}),
      },
    });
  };

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    await authedFetch("/api/account", { method: "PATCH", body: JSON.stringify(profileForm) });
    setUser((u) => u ? { ...u, ...profileForm } : u);
    setSavingProfile(false); setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleChangePassword = async () => {
    setPwError("");
    if (pwForm.newPassword !== pwForm.confirmPassword) { setPwError("Passwords don't match"); return; }
    if (pwForm.newPassword.length < 8) { setPwError("Must be at least 8 characters"); return; }
    setSavingPw(true);
    const res = await authedFetch("/api/account", { method: "POST", body: JSON.stringify({ password: pwForm.newPassword }) });
    const data = await res.json();
    if (data.error) { setPwError(data.error); } else { setPwSaved(true); setPwForm({ newPassword: "", confirmPassword: "" }); setTimeout(() => setPwSaved(false), 3000); }
    setSavingPw(false);
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    setUploadingAvatar(true);
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    const fd = new FormData();
    fd.append("file", file);
    fd.append("bucket", "avatars");
    fd.append("path", `${user.id}/avatar.${file.name.split(".").pop()}`);
    const res = await fetch("/api/upload", { method: "POST", body: fd, headers: { Authorization: `Bearer ${session?.access_token ?? ""}` } });
    const data = await res.json();
    if (data.url) {
      await authedFetch("/api/account", { method: "PATCH", body: JSON.stringify({ avatarUrl: data.url }) });
      setUser((u) => u ? { ...u, avatarUrl: data.url } : u);
    }
    setUploadingAvatar(false);
  };

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(`${window.location.origin}/register?ref=${user?.referralCode}`);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const TABS = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "referrals", label: "Referrals", icon: Gift },
    { id: "billing", label: "Billing", icon: Clock },
  ] as const;

  if (loading) return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center">
        <Loader2 size={28} className="animate-spin text-josett-500 mx-auto mb-3" />
        <p className="text-slate-500 text-sm">Loading account…</p>
      </div>
    </div>
  );

  if (error || !user) return (
    <div className="flex items-center justify-center h-96">
      <div className="text-center max-w-sm">
        <AlertCircle size={36} className="text-red-400 mx-auto mb-3" />
        <p className="text-slate-700 dark:text-slate-300 font-semibold mb-1">Couldn&apos;t load account</p>
        <p className="text-slate-500 text-sm mb-4">{error || "Unknown error"}</p>
        <button onClick={() => window.location.reload()} className="bg-josett-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-josett-500 transition-all">Refresh</button>
      </div>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-xl font-black text-slate-900 dark:text-white">Account</h1>
        <p className="text-slate-500 text-sm">Manage your profile and settings</p>
      </div>

      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 mb-8 overflow-x-auto">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button key={id} onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${tab === id ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}>
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      {/* Profile */}
      {tab === "profile" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
          <div className="flex items-center gap-5 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-josett-400 to-purple-500 flex items-center justify-center text-white text-2xl font-black overflow-hidden">
                {user.avatarUrl ? <img src={user.avatarUrl} className="w-full h-full object-cover" alt="Avatar" /> : user.fullName.charAt(0).toUpperCase()}
              </div>
              <button onClick={() => avatarRef.current?.click()} className="absolute -bottom-1 -right-1 w-7 h-7 bg-josett-600 rounded-lg flex items-center justify-center text-white hover:bg-josett-500 transition-colors shadow-md">
                {uploadingAvatar ? <Loader2 size={12} className="animate-spin" /> : <Camera size={12} />}
              </button>
              <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">{user.fullName}</p>
              <p className="text-sm text-slate-500">{user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                {user.emailVerified
                  ? <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400"><CheckCircle2 size={11} /> Verified</span>
                  : <span className="text-xs text-amber-500">Email not verified</span>}
                <span className="text-xs text-slate-400">· Member since {format(new Date(user.createdAt), "MMM yyyy")}</span>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
              <input value={profileForm.fullName} onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-josett-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
              <input value={user.email} disabled className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 rounded-xl px-4 py-2.5 text-sm text-slate-400 cursor-not-allowed" />
              <p className="text-xs text-slate-400 mt-1">Email cannot be changed</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
              <input value={profileForm.phone} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                placeholder="+233 XX XXX XXXX"
                className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-josett-500 focus:outline-none" />
            </div>
          </div>
          <button onClick={handleSaveProfile} disabled={savingProfile}
            className="mt-6 flex items-center gap-2 bg-josett-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-josett-500 transition-all disabled:opacity-50">
            {savingProfile ? <Loader2 size={14} className="animate-spin" /> : profileSaved ? <CheckCircle2 size={14} /> : <Save size={14} />}
            {profileSaved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      )}

      {/* Security */}
      {tab === "security" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
          <h2 className="font-bold text-slate-900 dark:text-white mb-5">Change Password</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">New Password</label>
              <input type="password" value={pwForm.newPassword} onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
                placeholder="At least 8 characters"
                className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-josett-500 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Confirm New Password</label>
              <input type="password" value={pwForm.confirmPassword} onChange={(e) => setPwForm({ ...pwForm, confirmPassword: e.target.value })}
                className="w-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 rounded-xl px-4 py-2.5 text-sm focus:border-josett-500 focus:outline-none" />
            </div>
            {pwError && <p className="text-sm text-red-500 flex items-center gap-1"><AlertCircle size={14} />{pwError}</p>}
            {pwSaved && <p className="text-sm text-green-600 flex items-center gap-1"><CheckCircle2 size={14} />Password updated!</p>}
          </div>
          <button onClick={handleChangePassword} disabled={savingPw || !pwForm.newPassword}
            className="mt-6 flex items-center gap-2 bg-josett-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-josett-500 transition-all disabled:opacity-50">
            {savingPw ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />} Update Password
          </button>
        </div>
      )}

      {/* Referrals */}
      {tab === "referrals" && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-josett-600 to-purple-600 rounded-2xl p-6 text-white">
            <p className="text-sm font-medium opacity-80 mb-1">Referral Credits</p>
            <p className="text-4xl font-black">GHS {user.referralCreditsGhs}</p>
            <p className="text-sm opacity-70 mt-1">{user._count.referrals} referral{user._count.referrals !== 1 ? "s" : ""} made</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-2">Your Referral Link</h3>
            <p className="text-sm text-slate-500 mb-4">Share this link. When someone signs up and pays, you earn GHS 50 credit.</p>
            <div className="flex gap-2">
              <div className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-600 dark:text-slate-400 truncate font-mono">
                {typeof window !== "undefined" ? `${window.location.origin}/register?ref=${user.referralCode}` : `josett.com/register?ref=${user.referralCode}`}
              </div>
              <button onClick={handleCopyReferral} className="flex items-center gap-2 bg-josett-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-josett-500 transition-all">
                {copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">How It Works</h3>
            <div className="space-y-3">
              {[
                "Share your unique referral link with friends and colleagues",
                "They sign up using your link and create a site",
                "When they make their first payment, you earn GHS 50 credit",
                "Credits are automatically applied to your next renewal",
              ].map((text, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-josett-100 dark:bg-josett-950/40 text-josett-600 dark:text-josett-400 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Billing */}
      {tab === "billing" && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
          {payments.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Clock size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No payment history yet</p>
              <p className="text-sm mt-1">Your payments will appear here once you subscribe.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800/50">
                <tr>{["Site", "Type", "Amount", "Date"].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-slate-500 px-4 py-3">{h}</th>
                ))}</tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {payments.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="px-4 py-3 text-sm text-slate-900 dark:text-white font-medium">{p.site?.name || "—"}</td>
                    <td className="px-4 py-3"><span className="text-xs font-semibold px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 capitalize">{p.paymentType.toLowerCase()}</span></td>
                    <td className="px-4 py-3 text-sm font-bold text-slate-900 dark:text-white">GHS {p.amountGhs}</td>
                    <td className="px-4 py-3 text-sm text-slate-500">{format(new Date(p.createdAt), "MMM d, yyyy")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
