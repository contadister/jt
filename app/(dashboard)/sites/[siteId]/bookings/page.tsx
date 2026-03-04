"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, CheckCircle2, XCircle, Loader2, Phone, Mail } from "lucide-react";
import { format } from "date-fns";

interface Booking {
  id: string; serviceName: string; clientName: string; clientEmail: string;
  clientPhone: string | null; bookingDate: string; bookingTime: string;
  durationMinutes: number; status: string; notes: string | null; priceGhs: number | null;
}

const STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  PENDING:   { label: "Pending",   color: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400" },
  CONFIRMED: { label: "Confirmed", color: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400" },
  COMPLETED: { label: "Completed", color: "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400" },
  CANCELLED: { label: "Cancelled", color: "bg-slate-100 text-slate-500 dark:bg-slate-800" },
};

export default function BookingsPage() {
  const params = useParams();
  const siteId = params.siteId as string;
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetch(`/api/sites/${siteId}/bookings`)
      .then((r) => r.json())
      .then((d) => { setBookings(d.bookings || []); setLoading(false); });
  }, [siteId]);

  const handleStatus = async (id: string, status: string) => {
    await fetch(`/api/sites/${siteId}/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBookings((b) => b.map((x) => x.id === id ? { ...x, status } : x));
  };

  const filtered = filter === "ALL" ? bookings : bookings.filter((b) => b.status === filter);

  const counts = bookings.reduce((acc, b) => {
    acc[b.status] = (acc[b.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-8">
        <Link href={`/sites/${siteId}`} className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1">
          <h1 className="text-xl font-black text-slate-900 dark:text-white">Bookings</h1>
          <p className="text-slate-500 text-sm">{bookings.length} total · {counts.PENDING || 0} pending</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 mb-6 w-fit">
        {["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === s ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            }`}>
            {s === "ALL" ? "All" : STATUS_CONFIG[s].label}
            {s !== "ALL" && counts[s] ? ` (${counts[s]})` : ""}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40"><Loader2 className="animate-spin text-josett-500" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <Calendar size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No bookings {filter !== "ALL" ? `with status ${filter.toLowerCase()}` : "yet"}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((booking) => {
            const cfg = STATUS_CONFIG[booking.status] || { label: booking.status, color: "" };
            return (
              <div key={booking.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-bold text-slate-900 dark:text-white">{booking.clientName}</p>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.color}`}>{cfg.label}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">{booking.serviceName}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Calendar size={11} /> {format(new Date(booking.bookingDate), "MMM d, yyyy")}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock size={11} /> {booking.bookingTime} ({booking.durationMinutes}min)
                      </span>
                      {booking.priceGhs && (
                        <span className="text-xs font-semibold text-josett-600 dark:text-josett-400">GHS {booking.priceGhs}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1 text-xs text-slate-400"><Mail size={11} /> {booking.clientEmail}</span>
                      {booking.clientPhone && <span className="flex items-center gap-1 text-xs text-slate-400"><Phone size={11} /> {booking.clientPhone}</span>}
                    </div>
                    {booking.notes && <p className="text-xs text-slate-500 italic mt-1">"{booking.notes}"</p>}
                  </div>
                </div>

                {booking.status === "PENDING" && (
                  <div className="flex gap-2">
                    <button onClick={() => handleStatus(booking.id, "CONFIRMED")}
                      className="flex items-center gap-1.5 text-xs font-bold bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-500 transition-colors">
                      <CheckCircle2 size={12} /> Confirm
                    </button>
                    <button onClick={() => handleStatus(booking.id, "CANCELLED")}
                      className="flex items-center gap-1.5 text-xs font-semibold border border-red-200 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 dark:border-red-800 dark:text-red-400 transition-colors">
                      <XCircle size={12} /> Cancel
                    </button>
                  </div>
                )}
                {booking.status === "CONFIRMED" && (
                  <button onClick={() => handleStatus(booking.id, "COMPLETED")}
                    className="flex items-center gap-1.5 text-xs font-bold bg-josett-600 text-white px-3 py-1.5 rounded-lg hover:bg-josett-500 transition-colors">
                    <CheckCircle2 size={12} /> Mark Completed
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
