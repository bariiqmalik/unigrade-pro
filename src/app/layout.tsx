import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JsonLd } from "@/components/seo/JsonLd";
import { softwareApplicationSchema } from "@/lib/schemas";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  // ── Titles ──────────────────────────────────────────────────────────────────
  title: {
    // Keyword "uni grade app" front-loaded for higher relevance scoring
    default: "Uni Grade App — GPA, CGPA & Attendance Calculator | UniGrade Pro",
    template: "%s | UniGrade Pro",
  },

  // ── Meta Description (≤ 155 chars) ──────────────────────────────────────────
  // Char count: ~154 — front-loads primary keyword, includes core features
  description:
    "Uni grade app for university students. Calculate GPA, CGPA & attendance, predict exam marks instantly. Free, fast & accurate — UniGrade Pro.",

  // ── Keywords ────────────────────────────────────────────────────────────────
  keywords: [
    "uni grade app",
    "GPA calculator",
    "CGPA calculator",
    "attendance calculator",
    "student grade calculator",
    "university grades",
    "exam score predictor",
    "required marks calculator",
  ],

  // ── Authorship ───────────────────────────────────────────────────────────────
  authors: [{ name: "UniGrade Pro" }],
  creator: "UniGrade Pro",

  // ── Canonical URL ────────────────────────────────────────────────────────────
  // Prevents duplicate-content penalties from crawler variations
  metadataBase: new URL("https://unigrade-pro.vercel.app"),
  alternates: {
    canonical: "/",
  },

  // ── Robots ───────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph ───────────────────────────────────────────────────────────────
  // Optimized for rich link previews on WhatsApp, Discord, Telegram & Slack
  openGraph: {
    type: "website",
    url: "https://unigrade-pro.vercel.app",
    siteName: "UniGrade Pro",
    locale: "en_US",
    title: "Uni Grade App — GPA, CGPA & Attendance Calculator | UniGrade Pro",
    description:
      "Free uni grade app: calculate GPA, CGPA & attendance, predict required exam marks in seconds. Built for university students.",
    images: [
      {
        url: "https://unigrade-pro.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        // Alt text doubles as a fallback caption on WhatsApp/Discord
        alt: "UniGrade Pro — GPA, CGPA & Attendance Calculator Dashboard",
        type: "image/jpeg",
      },
    ],
  },

  // ── Twitter / X Card ─────────────────────────────────────────────────────────
  // summary_large_image renders a full-width banner card on Twitter/X
  twitter: {
    card: "summary_large_image",
    title: "Uni Grade App — GPA, CGPA & Attendance Calculator | UniGrade Pro",
    description:
      "Free uni grade app: calculate GPA, CGPA & attendance, predict required exam marks in seconds.",
    images: ["https://unigrade-pro.vercel.app/og-image.jpg"],
  },

  // ── Search Engine Verification Handles ───────────────────────────────────────
  verification: {
    google: "nKJvgUZewnu5jLIakJYwPa9sJ84Dm50HuYUGYP6aWYE",
    other: {
      "msvalidate.01": ["AA2A2B12847A7CD778699015E0705ED0"],
    },
  },

  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* SoftwareApplication schema — sitewide entity signal for Google AI Mode */}
        <JsonLd schema={softwareApplicationSchema} />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <SpeedInsights /> {/* Injected real user experience tracking right here */}
            <Footer />
          </div>
        </ThemeProvider>

        {/*
          Google AdSense library — strategy="lazyOnload" guarantees:
            1. It is NOT render-blocking (FCP/LCP are unaffected).
            2. It loads only after the page is fully interactive (post-hydration).
            3. Next.js deduplicates this tag across all routes automatically.
        */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6775774159533443"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
