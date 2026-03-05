"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, Clock, CheckCircle2, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, getDay } from "date-fns";

interface Service {
  id: string; name: string; description: string | null;
  durationMinutes: number; priceGhs: number | null;
}

interface SiteInfo { name: string; primaryColor: string | null }

const TIME_SLOTS = [
  "08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30",
  "12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30",
  "16:00","16:30","17:00","17:30",
];

export default function PublicBookingPage() {
  const params = useParams();
  const siteSlug = params.slug as string;

  const [site, setSite] = useState<SiteInfo | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [step, setStep] = useState<"service" | "date" | "time" | "details" | "done">("service");

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [calMonth, setCalMonth] = useState(new Date());

  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/public/bookings?siteSlug=${siteSlug}`)
      .then((r) => r.json())
      .then((d) => { setSite(d.site); setServices(d.services || []); });
  }, [siteSlug]);

  const handleBook = async () => {
    if (!selectedService || !selectedDate || !selectedTime || !form.name || !form.email) {
      setError("Please fill in all required fields."); return;
    }
    setSubmitting(true); setError("");
    const res = await fetch("/api/public/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        siteSlug,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        bookingDate: format(selectedDate, "yyyy-MM-dd"),
        bookingTime: selectedTime,
        durationMinutes: selectedService.durationMinutes,
        priceGhs: selectedService.priceGhs,
        clientName: form.name,
        clientEmail: form.email,
        clientPhone: form.phone || null,
        notes: form.notes || null,
      }),
    });
    if (res.ok) { setStep("done"); }
    else { setError("Booking failed. Please try again."); }
    setSubmitting(false);
  };

  // Calendar helpers
  const monthStart = startOfMonth(calMonth);
  const monthEnd = endOfMonth(calMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPad = getDay(monthStart); // 0=Sun
  const today = new Date(); today.setHours(0,0,0,0);

  if (!site) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="animate-spin text-slate-400" size={28} />
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-100 px-6 py-5">
        <div className="max-w-2xl mx-auto">
          <Link href={`/s/${siteSlug}`} className="font-black text-xl text-slate-900">{site.name}</Link>
          <p className="text-slate-400 text-sm mt-0.5">Book an appointment</p>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Steps indicator */}
        {step !== "done" && (
          <div className="flex items-center gap-2 mb-8 text-xs font-semibold">
            {(["service","date","time","details"] as const).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  step === s ? "bg-blue-600 text-white" :
                  ["service","date","time","details"].indexOf(step) > i ? "bg-green-500 text-white" : "bg-slate-200 text-slate-500"
                }`}>{i + 1}</span>
                <span className={step === s ? "text-slate-900" : "text-slate-400"}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </span>
                {i < 3 && <div className="w-8 h-px bg-slate-200" />}
              </div>
            ))}
          </div>
        )}

        {/* Step: Choose service */}
        {step === "service" && (
          <div>
            <h2 className="text-xl font-black text-slate-900 mb-6">Choose a service</h2>
            {services.length === 0 ? (
              <p className="text-slate-400 text-center py-16">No services available yet.</p>
            ) : (
              <div className="space-y-3">
                {services.map((svc) => (
                  <button key={svc.id} onClick={() => { setSelectedService(svc); setStep("date"); }}
                    className="w-full text-left bg-white rounded-2xl border border-slate-200 p-5 hover:border-blue-400 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-slate-900">{svc.name}</p>
                        {svc.description && <p className="text-sm text-slate-500 mt-1">{svc.description}</p>}
                        <p className="text-sm text-slate-400 mt-2 flex items-center gap-2">
                          <Clock size={13} /> {svc.durationMinutes} min
                        </p>
                      </div>
                      {svc.priceGhs != null && (
                        <span className="font-black text-blue-600 text-lg">GHS {svc.priceGhs}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step: Choose date */}
        {step === "date" && (
          <div>
            <button onClick={() => setStep("service")} className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-700 mb-6">
              <ChevronLeft size={14} /> Back
            </button>
            <h2 className="text-xl font-black text-slate-900 mb-6">Choose a date</h2>
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              {/* Month nav */}
              <div className="flex items-center justify-between mb-4">
                <button onClick={() => setCalMonth(addDays(monthStart, -1))} className="p-2 hover:bg-slate-100 rounded-lg"><ChevronLeft size={16} /></button>
                <p className="font-bold text-slate-900">{format(calMonth, "MMMM yyyy")}</p>
                <button onClick={() => setCalMonth(addDays(monthEnd, 1))} className="p-2 hover:bg-slate-100 rounded-lg"><ChevronRight size={16} /></button>
              </div>
              {/* Day headers */}
              <div className="grid grid-cols-7 mb-2">
                {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => (
                  <p key={d} className="text-center text-xs font-semibold text-slate-400 py-1">{d}</p>
                ))}
              </div>
              {/* Days */}
              <div className="grid grid-cols-7 gap-1">
                {Array(startPad).fill(null).map((_, i) => <div key={`pad-${i}`} />)}
                {days.map((day) => {
                  const isPast = day < today;
                  const isSelected = selectedDate && isSameDay(day, selectedDate);
                  const isToday = isSameDay(day, today);
                  return (
                    <button key={day.toISOString()} disabled={isPast}
                      onClick={() => { setSelectedDate(day); setStep("time"); }}
                      className={`aspect-square flex items-center justify-center rounded-xl text-sm font-medium transition-all ${
                        isSelected ? "bg-blue-600 text-white" :
                        isToday ? "border-2 border-blue-400 text-blue-600" :
                        isPast ? "text-slate-300 cursor-not-allowed" :
                        "hover:bg-blue-50 text-slate-700"
                      }`}>
                      {format(day, "d")}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step: Choose time */}
        {step === "time" && selectedDate && (
          <div>
            <button onClick={() => setStep("date")} className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-700 mb-6">
              <ChevronLeft size={14} /> Back
            </button>
            <h2 className="text-xl font-black text-slate-900 mb-2">Choose a time</h2>
            <p className="text-slate-400 text-sm mb-6">{format(selectedDate, "EEEE, MMMM d, yyyy")}</p>
            <div className="grid grid-cols-4 gap-2">
              {TIME_SLOTS.map((t) => (
                <button key={t} onClick={() => { setSelectedTime(t); setStep("details"); }}
                  className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                    selectedTime === t
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white border-slate-200 text-slate-700 hover:border-blue-400"
                  }`}>{t}</button>
              ))}
            </div>
          </div>
        )}

        {/* Step: Your details */}
        {step === "details" && (
          <div>
            <button onClick={() => setStep("time")} className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-700 mb-6">
              <ChevronLeft size={14} /> Back
            </button>
            <h2 className="text-xl font-black text-slate-900 mb-2">Your details</h2>
            {selectedService && selectedDate && (
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-6 text-sm">
                <p className="font-bold text-blue-900">{selectedService.name}</p>
                <p className="text-blue-600 mt-1">{format(selectedDate, "EEEE, MMM d")} · {selectedTime} · {selectedService.durationMinutes} min</p>
                {selectedService.priceGhs != null && <p className="text-blue-600">GHS {selectedService.priceGhs}</p>}
              </div>
            )}
            <div className="space-y-4">
              {[
                { label: "Full Name *", key: "name", type: "text" },
                { label: "Email *", key: "email", type: "email" },
                { label: "Phone", key: "phone", type: "tel" },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">{label}</label>
                  <input type={type} value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full border border-slate-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Notes (optional)</label>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3}
                  className="w-full border border-slate-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none resize-none" />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            <button onClick={handleBook} disabled={submitting}
              className="mt-6 w-full bg-blue-600 text-white font-black py-3.5 rounded-2xl hover:bg-blue-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {submitting ? <Loader2 size={18} className="animate-spin" /> : <Calendar size={18} />}
              {submitting ? "Booking..." : "Confirm Booking"}
            </button>
          </div>
        )}

        {/* Done */}
        {step === "done" && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-green-500" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-3">Booking confirmed!</h2>
            <p className="text-slate-500 mb-2">
              {selectedService?.name} on {selectedDate && format(selectedDate, "EEEE, MMMM d")} at {selectedTime}
            </p>
            <p className="text-slate-400 text-sm">You'll receive a confirmation shortly.</p>
            <Link href={`/s/${siteSlug}`}
              className="inline-block mt-8 text-sm font-semibold text-blue-600 hover:underline">
              ← Back to {site.name}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
