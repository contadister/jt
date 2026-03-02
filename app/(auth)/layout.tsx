import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    default: "Sign In",
    template: "%s | Josett",
  },
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left panel - decorative */}
      <div
        className="hidden lg:flex lg:w-1/2 xl:w-2/5 relative flex-col items-center justify-center p-12"
        style={{
          background:
            "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
        }}
      >
        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-josett-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
        </div>

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(98,114,241,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(98,114,241,0.4) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative z-10 text-center">
          <Link href="/" className="inline-flex items-center gap-3 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-josett-500 to-purple-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-josett-500/30">
              J
            </div>
            <span className="text-white text-2xl font-black">Josett</span>
          </Link>

          <h2 className="text-4xl font-black text-white mb-6 leading-tight">
            Build. Launch.{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #a5bbfc, #f472b6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Grow.
            </span>
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-12 max-w-sm mx-auto">
            Ghana&apos;s most powerful website builder. Create stunning websites
            from GHS 100/month.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: "1,200+", label: "Sites Built" },
              { value: "GHS 100", label: "Starting Price" },
              { value: "< 60s", label: "To Go Live" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10"
              >
                <div className="text-2xl font-black text-white">
                  {stat.value}
                </div>
                <div className="text-white/60 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel - form */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 bg-white dark:bg-slate-950">
        {/* Mobile logo */}
        <div className="lg:hidden mb-10">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-josett-500 to-purple-600 flex items-center justify-center text-white font-black">
              J
            </div>
            <span className="text-slate-900 dark:text-white font-black text-xl">
              Josett
            </span>
          </Link>
        </div>

        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
