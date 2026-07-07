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
    default: "Uni Grade App — GPA, CGPA & Attendance Calculator | UniGrade Pro",
    template: "%s | UniGrade Pro",
  },
  description:
    "Uni grade app for university students. Calculate GPA, CGPA & attendance, predict exam marks instantly. Free, fast & accurate — UniGrade Pro.",
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
  authors: [{ name: "UniGrade Pro" }],
  creator: "UniGrade Pro",
  metadataBase: new URL("https://unigrade-pro.vercel.app"),
  alternates: {
    canonical: "/",
  },
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
        alt: "UniGrade Pro — GPA, CGPA & Attendance Calculator Dashboard",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Uni Grade App — GPA, CGPA & Attendance Calculator | UniGrade Pro",
    description:
      "Free uni grade app: calculate GPA, CGPA & attendance, predict required exam marks in seconds.",
    images: ["https://unigrade-pro.vercel.app/og-image.jpg"],
  },
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
            <SpeedInsights /> 
            <Footer />
          </div>
        </ThemeProvider>
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
