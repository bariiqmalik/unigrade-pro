"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import {
  Calculator,
  BarChart3,
  Users,
  BookOpen,
  Target,
  LayoutDashboard,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

const features = [
  {
    icon: Calculator,
    title: "GPA Calculator",
    description:
      "Calculate your semester GPA with credit-weighted formulas. Add unlimited subjects with grades and credits.",
    href: "/calculator/gpa",
    color: "text-indigo-500",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
  },
  {
    icon: TrendingUp,
    title: "CGPA Calculator",
    description:
      "Track your cumulative GPA across all semesters. See academic standing and performance trends.",
    href: "/calculator/cgpa",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
  },
  {
    icon: Users,
    title: "Attendance Tracker",
    description:
      "Monitor your attendance percentage. Know exactly how many classes you can miss and still stay safe.",
    href: "/calculator/attendance",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
  },
  {
    icon: BookOpen,
    title: "Exam Score Calculator",
    description:
      "Calculate your predicted final score from internal, midterm, assignment, and final exam marks.",
    href: "/calculator/exam",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  {
    icon: Target,
    title: "Marks Predictor",
    description:
      "Find out exactly what marks you need in your final exam to achieve your desired grade.",
    href: "/calculator/predictor",
    color: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
  },
  {
    icon: LayoutDashboard,
    title: "Academic Dashboard",
    description:
      "Get a unified view of all your calculations — GPA, CGPA, attendance, and predicted grades in one place.",
    href: "/dashboard",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
  },
];


const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="features" className="py-24 bg-background">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 mb-6">
            <BarChart3 className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              All-in-one toolkit
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-4">
            Everything You Need to Track{" "}
            <span className="gradient-text">Academic Progress</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Six powerful calculators built with precision, designed to help you
            understand and improve your academic performance.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Link href={feature.href} className="group block h-full">
                <div className={`h-full rounded-2xl border ${feature.border} bg-card p-6 transition-all duration-300 group-hover:shadow-card-hover group-hover:-translate-y-1`}>
                  {/* Icon */}
                  <div className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${feature.bg} ${feature.color} mb-4`}>
                    <feature.icon className="h-5 w-5" />
                  </div>

                  {/* Content */}
                  <h3 className="text-base font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  {/* Link hint */}
                  <div className={`flex items-center gap-1.5 text-xs font-semibold ${feature.color} transition-gap duration-200 group-hover:gap-2.5`}>
                    Open Calculator
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
