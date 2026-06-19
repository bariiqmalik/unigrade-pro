"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calculator,
  ArrowRight,
  GraduationCap,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Star,
} from "lucide-react";
import { UNIVERSITY_CONFIG } from "@/config/university";

// Floating card data
const floatingCards = [
  {
    id: "gpa",
    icon: "🎓",
    label: "Semester GPA",
    value: "8.76",
    sub: "Top 15%",
    color: "from-indigo-500/10 to-violet-500/10",
    border: "border-indigo-500/20",
    style: { top: "15%", right: "8%" },
    animation: "animate-float",
  },
  {
    id: "cgpa",
    icon: "📊",
    label: "CGPA",
    value: "8.24",
    sub: "First Class",
    color: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-500/20",
    style: { top: "48%", right: "2%" },
    animation: "animate-float-delayed",
  },
  {
    id: "attend",
    icon: "✅",
    label: "Attendance",
    value: "87.5%",
    sub: "Safe ✓",
    color: "from-violet-500/10 to-purple-500/10",
    border: "border-violet-500/20",
    style: { top: "72%", right: "12%" },
    animation: "animate-float",
  },
];

const stats = [
  { value: "10K+", label: "Students helped" },
  { value: "5",    label: "Calculators" },
  { value: "99%",  label: "Accuracy" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden hero-bg grid-pattern min-h-[calc(100vh-4rem)] flex items-center">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-primary/6 blur-3xl animate-float-slow" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-violet-500/5 blur-3xl animate-float-delayed" />
      </div>

      <div className="section-container relative z-10 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            {/* Pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 mb-8"
            >
              <Star className="h-3.5 w-3.5 text-primary fill-primary" />
              <span className="text-xs font-semibold text-primary">
                Free Academic Calculator
              </span>
              <span className="h-3 w-px bg-primary/20" />
              <span className="text-xs text-muted-foreground">
                {UNIVERSITY_CONFIG.maxGPA}-point scale
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-foreground mb-6"
            >
              Calculate Your{" "}
              <span className="shimmer-text">GPA, CGPA</span>
              {" "}&{" "}
              <span className="shimmer-text">Attendance</span>{" "}
              Instantly
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg"
            >
              Built specifically for{" "}
              <span className="text-foreground font-semibold">
                {UNIVERSITY_CONFIG.name}
              </span>{" "}
              students with accurate grading formulas, real-time calculations,
              and beautiful results.
            </motion.p>

            {/* Feature bullets */}
            <motion.ul
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {[
                "GPA & CGPA Calculator",
                "Attendance Tracker",
                "Exam Score Predictor",
                "PDF Export",
              ].map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  {f}
                </li>
              ))}
            </motion.ul>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/calculator/gpa" className="btn-primary gap-2 text-sm px-6 py-3">
                <Calculator className="h-4 w-4" />
                Calculate GPA
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/#grade-system" className="btn-secondary gap-2 text-sm px-6 py-3">
                <BarChart3 className="h-4 w-4" />
                View Grade System
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex gap-8 mt-12 pt-8 border-t border-border"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl font-black text-foreground">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Floating Cards */}
          <div className="relative hidden lg:block h-[480px]">
            {/* Central glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />

            {/* Center illustration card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56"
            >
              <div className="card-premium p-6 text-center border-primary/20 shadow-glow-primary">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow-primary">
                  <GraduationCap className="h-7 w-7 text-white" />
                </div>
                <div className="text-3xl font-black text-foreground mb-1">8.76</div>
                <div className="text-xs font-semibold text-primary uppercase tracking-wider">Semester GPA</div>
                <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-emerald-500 font-medium">+0.24</span>
                  from last semester
                </div>
              </div>
            </motion.div>

            {/* Floating stat cards */}
            {floatingCards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, x: 40, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute ${card.animation}`}
                style={card.style}
              >
                <div className={`rounded-2xl border ${card.border} bg-gradient-to-br ${card.color} backdrop-blur-sm p-4 min-w-[130px] shadow-sm`}>
                  <div className="text-xl mb-1">{card.icon}</div>
                  <div className="text-xs font-medium text-muted-foreground">{card.label}</div>
                  <div className="text-lg font-black text-foreground">{card.value}</div>
                  <div className="text-xs text-muted-foreground">{card.sub}</div>
                </div>
              </motion.div>
            ))}

            {/* Decorative rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 rounded-full border border-primary/5 animate-spin-slow pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full border border-primary/3 animate-spin-slow pointer-events-none" style={{ animationDirection: "reverse", animationDuration: "30s" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
