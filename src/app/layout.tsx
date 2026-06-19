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
  title: {
    default: "UniGrade Pro — Student Grade Calculator",
    template: "%s | UniGrade Pro",
  },
  description:
    "Calculate your GPA, CGPA, attendance percentage, exam scores, and predict required marks. Built for university students with accurate grading formulas.",
  keywords: [
    "GPA calculator",
    "CGPA calculator",
    "attendance calculator",
    "student grade calculator",
    "university grades",
    "exam score predictor",
  ],
  authors: [{ name: "UniGrade Pro" }],
  creator: "UniGrade Pro",
  
  // Complete Open Graph Setup
  openGraph: {
    type: "website",
    title: "UniGrade Pro — Student Grade Calculator",
    description:
      "Calculate your GPA, CGPA, attendance percentage, exam scores, and predict required marks instantly.",
    siteName: "UniGrade Pro",
    url: "https://unigrade-pro.vercel.app",
    locale: "en_US",
    images: [
      {
        url: "https://unigrade-pro.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "UniGrade Pro Academic Dashboard Preview",
      },
    ],
  },
  
  // Clean Twitter Card Data
  twitter: {
    card: "summary_large_image",
    title: "UniGrade Pro — Student Grade Calculator",
    description:
      "Calculate your GPA, CGPA, attendance and exam scores instantly.",
    images: ["https://unigrade-pro.vercel.app/og-image.jpg"],
  },
  
  // Search Engine Verification Handles
  verification: {
    google: "nKJvgUZewnu5jLIakJYwPa9sJ84Dm50HuYUGYP6aWYE",
    other: {
      "msvalidate.01": ["AA2A2B12847A7CD778699015E0705ED0"], // Fixed syntax wrapper for Bing
    },
  },
  
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
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
