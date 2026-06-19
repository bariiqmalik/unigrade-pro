"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calculator,
  TrendingUp,
  Users,
  Target,
  BookOpen,
  LayoutDashboard,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { AnimatedNumber } from "@/components/shared/AnimatedNumber";
import { UNIVERSITY_CONFIG, getAcademicStanding } from "@/config/university";
import { cn } from "@/lib/utils";
import type { GPAResult, CGPAResult, AttendanceResult } from "@/lib/calculations";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function DashboardPage() {
  const [gpaResult] = useLocalStorage<GPAResult | null>("unigrade_gpa_result", null);
  const [cgpaResult] = useLocalStorage<CGPAResult | null>("unigrade_cgpa_result", null);
  const [attendanceResult] = useLocalStorage<AttendanceResult | null>("unigrade_attendance", null);

  const hasData = gpaResult || cgpaResult || attendanceResult;

  const cgpaStanding = cgpaResult ? getAcademicStanding(cgpaResult.cgpa) : null;

  const attendanceColor =
    attendanceResult?.status === "safe"    ? "#10B981" :
    attendanceResult?.status === "warning" ? "#F59E0B" :
    attendanceResult?.status === "danger"  ? "#F97316" : "#F43F5E";

  return (
    <div className="section-container py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-glow-primary">
            <LayoutDashboard className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">Academic Dashboard</h1>
            <p className="text-sm text-muted-foreground">Your saved calculations at a glance</p>
          </div>
        </div>
      </div>

      {!hasData ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary mb-6">
            <LayoutDashboard className="h-10 w-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">No Calculations Yet</h2>
          <p className="text-muted-foreground max-w-sm mb-8">
            Use the calculators to compute your GPA, CGPA, and attendance.
            Your results will appear here automatically.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/calculator/gpa" className="btn-primary text-sm gap-2">
              <Calculator className="h-4 w-4" />
              Start with GPA
            </Link>
            <Link href="/calculator/cgpa" className="btn-secondary text-sm gap-2">
              <TrendingUp className="h-4 w-4" />
              CGPA Calculator
            </Link>
          </div>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* Top metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* GPA Card */}
            <motion.div variants={item}>
              <div className="card-premium p-5 border-primary/20 bg-primary/4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15">
                    <Calculator className="h-4.5 w-4.5 text-primary" />
                  </div>
                  <Link href="/calculator/gpa">
                    <ArrowRight className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                  </Link>
                </div>
                <div className="text-3xl font-black text-foreground mb-1">
                  {gpaResult ? (
                    <AnimatedNumber value={gpaResult.gpa} decimals={2} />
                  ) : "—"}
                </div>
                <div className="text-sm text-muted-foreground">Semester GPA</div>
                {gpaResult && (
                  <div className="mt-2 text-xs font-semibold text-primary">
                    {gpaResult.standing}
                  </div>
                )}
              </div>
            </motion.div>

            {/* CGPA Card */}
            <motion.div variants={item}>
              <div className="card-premium p-5 border-violet-500/20 bg-violet-500/4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/15">
                    <TrendingUp className="h-4.5 w-4.5 text-violet-500" />
                  </div>
                  <Link href="/calculator/cgpa">
                    <ArrowRight className="h-4 w-4 text-muted-foreground hover:text-violet-500 transition-colors" />
                  </Link>
                </div>
                <div className="text-3xl font-black text-foreground mb-1">
                  {cgpaResult ? (
                    <AnimatedNumber value={cgpaResult.cgpa} decimals={2} />
                  ) : "—"}
                </div>
                <div className="text-sm text-muted-foreground">Overall CGPA</div>
                {cgpaResult && (
                  <div className="mt-2 text-xs font-semibold text-violet-500">
                    {cgpaResult.standing}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Attendance Card */}
            <motion.div variants={item}>
              <div className="card-premium p-5 border-emerald-500/20 bg-emerald-500/4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15">
                    <Users className="h-4.5 w-4.5 text-emerald-500" />
                  </div>
                  <Link href="/calculator/attendance">
                    <ArrowRight className="h-4 w-4 text-muted-foreground hover:text-emerald-500 transition-colors" />
                  </Link>
                </div>
                <div className="text-3xl font-black text-foreground mb-1">
                  {attendanceResult ? (
                    <><AnimatedNumber value={attendanceResult.percentage} decimals={1} />%</>
                  ) : "—"}
                </div>
                <div className="text-sm text-muted-foreground">Attendance</div>
                {attendanceResult && (
                  <div className={cn("mt-2 text-xs font-semibold", `text-${attendanceResult.statusColor}-500`)}>
                    {attendanceResult.statusLabel}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Credits Card */}
            <motion.div variants={item}>
              <div className="card-premium p-5 border-amber-500/20 bg-amber-500/4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15">
                    <BookOpen className="h-4.5 w-4.5 text-amber-500" />
                  </div>
                </div>
                <div className="text-3xl font-black text-foreground mb-1">
                  {cgpaResult ? (
                    <AnimatedNumber value={cgpaResult.totalCredits} decimals={0} />
                  ) : gpaResult ? (
                    <AnimatedNumber value={gpaResult.totalCredits} decimals={0} />
                  ) : "—"}
                </div>
                <div className="text-sm text-muted-foreground">Total Credits</div>
                <div className="mt-2 text-xs text-muted-foreground">Earned so far</div>
              </div>
            </motion.div>
          </div>

          {/* Visual panels row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CGPA Gauge */}
            {cgpaResult && (
              <motion.div variants={item} className="card-premium p-6 flex flex-col items-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  CGPA Progress
                </p>
                <ProgressRing
                  value={(cgpaResult.cgpa / UNIVERSITY_CONFIG.maxGPA) * 100}
                  size={160}
                  strokeWidth={14}
                  color={cgpaStanding ? `#4F46E5` : "#94A3B8"}
                  label={cgpaResult.cgpa.toFixed(2)}
                  sublabel={`/ ${UNIVERSITY_CONFIG.maxGPA}`}
                />
                <div className="mt-4 text-sm font-bold text-foreground">{cgpaResult.standing}</div>
                <div className="text-xs text-muted-foreground">{cgpaResult.totalCredits} total credits</div>
              </motion.div>
            )}

            {/* Attendance Ring */}
            {attendanceResult && (
              <motion.div variants={item} className="card-premium p-6 flex flex-col items-center">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                  Attendance
                </p>
                <ProgressRing
                  value={attendanceResult.percentage}
                  size={160}
                  strokeWidth={14}
                  color={attendanceColor}
                  label={`${attendanceResult.percentage.toFixed(1)}%`}
                  sublabel={attendanceResult.statusLabel}
                />
                <div className="mt-4 text-sm font-bold text-foreground">
                  {attendanceResult.classesNeededFor75 > 0
                    ? `${attendanceResult.classesNeededFor75} classes to reach 75%`
                    : `Can miss ${attendanceResult.maxMissable} more`}
                </div>
              </motion.div>
            )}

            {/* Quick links */}
            <motion.div variants={item} className="card-premium p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Quick Actions
              </p>
              <div className="space-y-2">
                {[
                  { href: "/calculator/gpa", Icon: Calculator, label: "Recalculate GPA", color: "text-primary" },
                  { href: "/calculator/cgpa", Icon: TrendingUp, label: "Update CGPA", color: "text-violet-500" },
                  { href: "/calculator/attendance", Icon: Users, label: "Check Attendance", color: "text-emerald-500" },
                  { href: "/calculator/predictor", Icon: Target, label: "Predict Final Marks", color: "text-rose-500" },
                ].map(({ href, Icon, label, color }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors group"
                  >
                    <Icon className={cn("h-4 w-4 shrink-0", color)} />
                    {label}
                    <ArrowRight className="h-3.5 w-3.5 ml-auto text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Academic Standing Info */}
          {cgpaResult && (
            <motion.div variants={item} className="card-premium p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-bold text-foreground">Academic Standing Progress</p>
                <span className="text-xs text-muted-foreground">Current: {cgpaResult.cgpa.toFixed(2)}</span>
              </div>
              <div className="space-y-3">
                {UNIVERSITY_CONFIG.academicStanding.filter(s => s.label !== "Fail").map((standing) => {
                  const progress = Math.min(100, (cgpaResult.cgpa / standing.minCGPA) * 100);
                  const isAchieved = cgpaResult.cgpa >= standing.minCGPA;
                  return (
                    <div key={standing.label} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className={cn("font-semibold", isAchieved ? "text-foreground" : "text-muted-foreground")}>
                          {isAchieved && "✓ "}{standing.label}
                        </span>
                        <span className="text-muted-foreground">≥ {standing.minCGPA.toFixed(1)}</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                          className="h-full rounded-full bg-gradient-primary"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
