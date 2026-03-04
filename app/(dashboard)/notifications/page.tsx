"use client";

import { useEffect, useState } from "react";
import { Bell, CheckCheck, Loader2, ExternalLink } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface Notification {
  id: string; type: string; title: string; message: string;
  isRead: boolean; actionUrl: string | null; createdAt: string;
}

const TYPE_ICONS: Record<string, string> = {
  RENEWAL_WARNING: "⚠️",
  SITE_EXPIRED:    "🔴",
  SITE_DEPLOYED:   "🚀",
  PAYMENT_SUCCESS: "✅",
  PAYMENT_FAILED:  "❌",
  DOMAIN_VERIFIED: "🌐",
  NEW_ORDER:       "🛒",
  NEW_BOOKING:     "📅",
  NEW_FORM:        "📝",
  SYSTEM:          "📣",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingAll, setMarkingAll] = useState(false);

  useEffect(() => {
    fetch("/api/notifications")
      .then((r) => r.json())
      .then((d) => { setNotifications(d.notifications || []); setLoading(false); });
  }, []);

  const markRead = async (id: string) => {
    setNotifications((n) => n.map((x) => x.id === id ? { ...x, isRead: true } : x));
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: [id] }),
    });
  };

  const markAllRead = async () => {
    setMarkingAll(true);
    await fetch("/api/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ markAll: true }),
    });
    setNotifications((n) => n.map((x) => ({ ...x, isRead: true })));
    setMarkingAll(false);
  };

  const unread = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Notifications</h1>
          <p className="text-slate-500 text-sm">
            {unread > 0 ? `${unread} unread` : "All caught up"}
          </p>
        </div>
        {unread > 0 && (
          <button
            onClick={markAllRead}
            disabled={markingAll}
            className="flex items-center gap-2 text-sm font-semibold text-josett-600 dark:text-josett-400 hover:underline disabled:opacity-50"
          >
            {markingAll ? <Loader2 size={13} className="animate-spin" /> : <CheckCheck size={14} />}
            Mark all read
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 size={28} className="animate-spin text-josett-500" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <Bell size={48} className="mx-auto mb-4 opacity-20" />
          <p className="font-semibold">No notifications yet</p>
          <p className="text-sm">You'll be notified about site activity, payments, and renewals here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => !n.isRead && markRead(n.id)}
              className={`relative flex items-start gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${
                n.isRead
                  ? "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 opacity-70"
                  : "bg-josett-50 dark:bg-josett-950/20 border-josett-100 dark:border-josett-900/50 hover:bg-josett-100 dark:hover:bg-josett-950/30"
              }`}
            >
              {!n.isRead && (
                <span className="absolute top-4 right-4 w-2 h-2 bg-josett-500 rounded-full" />
              )}
              <span className="text-xl flex-shrink-0 mt-0.5">
                {TYPE_ICONS[n.type] || "📣"}
              </span>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${n.isRead ? "text-slate-600 dark:text-slate-400" : "text-slate-900 dark:text-white"}`}>
                  {n.title}
                </p>
                <p className="text-sm text-slate-500 mt-0.5">{n.message}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-xs text-slate-400">
                    {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                  </span>
                  {n.actionUrl && (
                    <Link
                      href={n.actionUrl}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-xs text-josett-600 dark:text-josett-400 font-medium hover:underline"
                    >
                      View <ExternalLink size={10} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
