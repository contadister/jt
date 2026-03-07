"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import SessionKeepAlive from "@/components/auth/SessionKeepAlive";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  Globe,
  Layout,
  Plus,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  CreditCard,
  Shield,
  User,
  Sparkles,
  ExternalLink,
  Moon,
} from "lucide-react";

const navItems = [
  { label: "Dashboard",  href: "/dashboard",  icon: LayoutDashboard },
  { label: "My Sites",   href: "/sites",       icon: Globe },
  { label: "Templates",  href: "/templates",   icon: Layout },
  { label: "Billing",    href: "/billing",     icon: CreditCard },
  { label: "Account",    href: "/account",     icon: User },
];

function NavLink({
  href,
  icon: Icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive =
    href === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(href);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
        isActive
          ? "bg-josett-600 text-white shadow-lg shadow-josett-500/30"
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
      }`}
    >
      <Icon size={18} />
      {label}
    </Link>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const supabase = createClient();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) {
        router.push("/login");
        return;
      }
      setUserEmail(user.email || "");
      setUserName(
        user.user_metadata?.full_name || user.email?.split("@")[0] || "User"
      );
      // Check admin role
      fetch("/api/admin/stats").then((r) => { if (r.ok) setIsAdmin(true); }).catch(() => {});
      // Fetch unread notification count
      fetch("/api/notifications?unread=true&limit=1")
        .then((r) => r.json())
        .then((d) => { if (d.unreadCount !== undefined) setUnreadCount(d.unreadCount); })
        .catch(() => {});
    });
  }, [supabase.auth, router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  const Sidebar = ({ onClose }: { onClose?: () => void }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-4 py-5 border-b border-slate-100 dark:border-slate-800">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-bold text-lg"
          onClick={onClose}
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-josett-500 to-purple-600 flex items-center justify-center text-white text-sm font-black">
            J
          </div>
          <span className="text-slate-900 dark:text-white">Josett</span>
        </Link>
      </div>

      {/* New Site CTA */}
      <div className="p-4">
        <Link
          href="/sites/new"
          onClick={onClose}
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-josett-600 to-purple-600 hover:from-josett-700 hover:to-purple-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-all hover:scale-[1.02] shadow-lg shadow-josett-500/25"
        >
          <Plus size={16} />
          New Site
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink key={item.href} {...item} onClick={onClose} />
        ))}
        {isAdmin && (
          <NavLink href="/admin" icon={Shield} label="Admin" onClick={onClose} />
        )}
      </nav>

      {/* User section */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
        <Link
          href="/notifications"
          onClick={onClose}
          className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all"
        >
          <div className="flex items-center gap-3">
            <Bell size={18} />
            Notifications
          </div>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Link>

        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex w-full items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-all"
          >
            <span className="flex items-center gap-3"><Moon size={16} /> Dark Mode</span>
            <span className={`w-9 h-5 rounded-full transition-colors relative flex-shrink-0 ${theme === "dark" ? "bg-josett-600" : "bg-slate-200"}`}>
              <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${theme === "dark" ? "translate-x-4" : "translate-x-0.5"}`} />
            </span>
          </button>
        )}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-josett-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-slate-800 dark:text-white truncate">
              {userName}
            </div>
            <div className="text-xs text-slate-500 truncate">{userEmail}</div>
          </div>
          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
            title="Sign out"
            aria-label="Sign out"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-100 dark:border-slate-800 flex-shrink-0">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative w-72 bg-white dark:bg-slate-900 h-full shadow-2xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
            <Sidebar onClose={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center justify-between px-4 h-14 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex-shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <Link href="/" className="flex items-center gap-2 font-bold">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-josett-500 to-purple-600 flex items-center justify-center text-white text-xs font-black">
              J
            </div>
            <span className="text-slate-900 dark:text-white text-sm">
              Josett
            </span>
          </Link>
          <Link
            href="/notifications"
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <SessionKeepAlive />
          {children}
        </main>
      </div>
    </div>
  );
}
