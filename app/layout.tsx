import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Josett — Build Your Website. Rent It Monthly.",
    template: "%s | Josett",
  },
  description:
    "Ghana's most powerful website builder. Create a stunning website with drag & drop, pay monthly from GHS 100, and go live today. No code needed.",
  keywords: [
    "website builder Ghana",
    "create website Ghana",
    "website rental Ghana",
    "drag and drop website",
    "Josett",
    "online store Ghana",
  ],
  authors: [{ name: "Josett" }],
  creator: "Josett",
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "https://josett.com",
    siteName: "Josett",
    title: "Josett — Build Your Website. Rent It Monthly.",
    description:
      "Ghana's most powerful website builder. Create, launch, and manage your website for as little as GHS 100/month.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Josett — Build Your Website. Rent It Monthly.",
    description: "Ghana's most powerful website builder.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
