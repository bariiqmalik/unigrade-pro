"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { AnimatedNumber } from "@/components/shared/AnimatedNumber";
import { calculateAttendance } from "@/lib/calculations";
import { UNIVERSITY_CONFIG } from "@/config/university";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AlertTriangle, CheckCircle2, XCircle, Info } from "lucide-react";

const statusConfig = {
  safe: {
    color: "#10B981",
    ringColor: "#10B981",
    Icon: CheckCircle2,
    iconColor: "text-emerald-500",
    bg: "bg-emerald-500/8 border-emerald-500/20",
    label: "You're Safe! 🎉",
  },
  warning: {
    color: "#F59E0B",
    ringColor: "#F59E0B",
    Icon: AlertTriangle,
    iconColor: "text-amber-500",
    bg: "bg-amber-500/8 border-amber-500/20",
    label: "Warning — Getting Close!",
  },
  danger: {
    color: "#F97316",
    ringColor: "#F97316",
    Icon: AlertTriangle,
    iconColor: "text-orange-500",
    bg: "bg-orange-500/8 border-orange-500/20",
    label: "Danger Zone!",
  },
  critical: {
    color: "#F43F5E",
    ringColor: "#F43F5E",
    Icon: XCircle,
    iconColor: "text-rose-500",
    bg: "bg-rose-500/8 border-rose-500/20",
    label: "Critical — Below Minimum!",
  },
};

export function AttendanceCalculator() {
  const [attended, setAttended] = useState(45);
  const [total, setTotal] = useState(60);
  const [, saveAttendance] = useLocalStorage("unigrade_attendance", null as null | ReturnType<typeof calculateAttendance>);

  const result = calculateAttendance(attended, total);
  const config = statusConfig[result.status];

  useEffect(() => {
    saveAttendance(result);
  }, [result]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* ── Input Panel ── */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-foreground">Enter Attendance</h2>

        {/* Attended */}
        <div className="space-y-3">
          <label htmlFor="attended-input" className="block text-sm font-semibold text-foreground">
            Classes Attended
          </label>
          <input
            id="attended-input"
            type="number"
            min={0}
            max={total}
            value={attended}
            onChange={(e) => {
              const v = parseInt(e.target.value) || 0;
              setAttended(Math.max(0, Math.min(v, total)));
            }}
            className="input-premium text-2xl font-bold h-14 text-center"
          />
          <input
            type="range"
            min={0}
            max={total}
            value={attended}
            onChange={(e) => setAttended(parseInt(e.target.value))}
            className="w-full accent-primary h-2 rounded-full cursor-pointer"
          />
        </div>

        {/* Total */}
        <div className="space-y-3">
          <label htmlFor="total-input" className="block text-sm font-semibold text-foreground">
            Total Classes Conducted
          </label>
          <input
            id="total-input"
            type="number"
            min={1}
            value={total}
            onChange={(e) => {
              const v = parseInt(e.target.value) || 1;
              setTotal(Math.max(1, v));
              setAttended(Math.min(attended, v));
            }}
            className="input-premium text-2xl font-bold h-14 text-center"
          />
          <input
            type="range"
            min={1}
            max={200}
            value={total}
            onChange={(e) => {
              const v = parseInt(e.target.value);
              setTotal(v);
              setAttended(Math.min(attended, v));
            }}
            className="w-full accent-primary h-2 rounded-full cursor-pointer"
          />
        </div>

        {/* Status card */}
        <div className={cn("rounded-xl border p-4 flex items-center gap-3", config.bg)}>
          <config.Icon className={cn("h-5 w-5 shrink-0", config.iconColor)} />
          <div>
            <div className="text-sm font-bold text-foreground">{config.label}</div>
            <div className="text-xs text-muted-foreground mt-0.5">
              Minimum required: {UNIVERSITY_CONFIG.attendance.minRequired}%
            </div>
          </div>
        </div>

        {/* Rules info */}
        <div className="rounded-xl border border-border bg-secondary/50 p-4 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <Info className="h-3.5 w-3.5" />
            Attendance Rules
          </div>
          <div className="space-y-1.5 text-sm text-muted-foreground">
            <div className="flex justify-between">
              <span>Minimum Required</span>
              <span className="font-semibold text-foreground">{UNIVERSITY_CONFIG.attendance.minRequired}%</span>
            </div>
            <div className="flex justify-between">
              <span>Warning Below</span>
              <span className="font-semibold text-amber-500">{UNIVERSITY_CONFIG.attendance.warningThreshold}%</span>
            </div>
            <div className="flex justify-between">
              <span>Condonation Limit</span>
              <span className="font-semibold text-orange-500">{UNIVERSITY_CONFIG.attendance.condonationLimit}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Result Panel ── */}
      <div className="space-y-5">
        {/* Big Gauge */}
        <div className="card-premium p-6 flex flex-col items-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-5">
            Attendance Percentage
          </p>
          <ProgressRing
            value={result.percentage}
            size={200}
            strokeWidth={16}
            color={config.ringColor}
            label={`${result.percentage.toFixed(1)}%`}
            sublabel={`${attended} / ${total} classes`}
          />

          {/* Scale markers */}
          <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
              <span>Critical &lt;65%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
              <span>Warn &lt;75%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              <span>Safe ≥80%</span>
            </div>
          </div>
        </div>

        {/* Action cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card-premium p-4">
            <p className="text-xs text-muted-foreground mb-1">Classes to Reach 75%</p>
            <p className={cn(
              "text-2xl font-black",
              result.classesNeededFor75 === 0 ? "text-emerald-500" : "text-rose-500"
            )}>
              <AnimatedNumber value={result.classesNeededFor75} decimals={0} duration={0.8} />
            </p>
            <p className="text-xs text-muted-foreground mt-1">consecutive classes</p>
          </div>
          <div className="card-premium p-4">
            <p className="text-xs text-muted-foreground mb-1">Max Missable</p>
            <p className="text-2xl font-black text-foreground">
              <AnimatedNumber value={result.maxMissable} decimals={0} duration={0.8} />
            </p>
            <p className="text-xs text-muted-foreground mt-1">from current total</p>
          </div>
        </div>

        {/* Health meter */}
        <div className="card-premium p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Attendance Health
            </p>
            <span className="text-xs font-semibold text-foreground">
              {result.percentage.toFixed(1)}%
            </span>
          </div>
          <div className="h-3 rounded-full bg-secondary overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, result.percentage)}%` }}
              transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
              className="h-full rounded-full"
              style={{ backgroundColor: config.color }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>0%</span>
            <span className="text-amber-500 font-medium">75%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
