// middleware.ts — runs on every matched request
// Handles: auth protection, admin lock, security headers, session refresh

import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED = ["/sites", "/account", "/billing", "/notifications", "/admin", "/dashboard"];

// The ONLY email that can access /admin — set ADMIN_EMAIL in Vercel env vars
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "";

function addSecurityHeaders(res: NextResponse): NextResponse {
  // Prevent clickjacking
  res.headers.set("X-Frame-Options", "DENY");
  // Prevent MIME sniffing
  res.headers.set("X-Content-Type-Options", "nosniff");
  // Enable XSS protection
  res.headers.set("X-XSS-Protection", "1; mode=block");
  // Only send referrer on same origin
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  // Don't allow embedding in iframes
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  // HSTS — force HTTPS for 1 year
  res.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  // CSP — tightened for production
  res.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.paystack.co https://www.googletagmanager.com https://pagead2.googlesyndication.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.paystack.co",
      "frame-src https://js.paystack.co",
      "object-src 'none'",
      "base-uri 'self'",
    ].join("; ")
  );
  return res;
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  addSecurityHeaders(res);

  const supabase = createMiddlewareClient({ req, res });
  
  // Refresh the session — this extends it and keeps the cookie fresh
  const { data: { session } } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED.some((p) => pathname === p || pathname.startsWith(p + "/"));
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  // Not logged in → redirect to login
  if (isProtected && !session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin route — must be logged in AND be the designated admin email
  if (isAdmin && session) {
    if (!ADMIN_EMAIL || session.user.email !== ADMIN_EMAIL) {
      // Silently redirect to dashboard — don't reveal admin exists
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  // Logged in users don't need auth pages
  if (session && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
