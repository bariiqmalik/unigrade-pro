"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, RefreshCw, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useCGPACalculator } from "@/hooks/useCGPACalculator";
import { AnimatedNumber } from "@/components/shared/AnimatedNumber";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { UNIVERSITY_CONFIG } from "@/config/university";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useEffect } from "react";

const standingColors: Record<string, string> = {
  "Distinction": "#10B981",
  "First Class": "#4F46E5",
  "Second Class": "#F59E0B",
  "Pass":        "#F97316",
  "Fail":        "#F43F5E",
  "—":           "#94A3B8",
};

const trendIcons = {
  improving: { Icon: TrendingUp, color: "text-emerald-500 bg-emerald-500/10", label: "Improving" },
  declining: { Icon: TrendingDown, color: "text-rose-500 bg-rose-500/10", label: "Declining" },
  stable:    { Icon: Minus, color: "text-muted-foreground bg-secondary", label: "Stable" },
};

export function CGPACalculator() {
  const { semesters, result, addSemester, removeSemester, updateSemester, resetSemesters } =
    useCGPACalculator();
  const [, saveCGPA] = useLocalStorage("unigrade_cgpa_result", null as null | typeof result);

  useEffect(() => {
    if (result.totalCredits > 0) saveCGPA(result);
  }, [result, saveCGPA]);

  const cgpaPercent = (result.cgpa / UNIVERSITY_CONFIG.maxGPA) * 100;
  const ringColor = standingColors[result.standing] ?? "#4F46E5";

  const { Icon: TrendIcon, color: trendColor, label: trendLabel } =
    trendIcons[result.trend];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* ── Semesters Table ── */}
      <div className="lg:col-span-3 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Semesters</h2>
          <div className="flex gap-2">
            <button
              onClick={resetSemesters}
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg border border-border hover:bg-secondary transition-all"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Reset
            </button>
            <button onClick={addSemester} className="btn-primary text-xs px-4 py-2 gap-1.5">
              <Plus className="h-3.5 w-3.5" /> Add Semester
            </button>
          </div>
        </div>

        {/* Column Headers */}
        <div className="grid grid-cols-12 gap-3 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <div className="col-span-4">Semester</div>
          <div className="col-span-4">GPA (0–{UNIVERSITY_CONFIG.maxGPA})</div>
          <div className="col-span-3">Credits</div>
          <div className="col-span-1" />
        </div>

        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {semesters.map((sem, i) => (
              <motion.div
                key={sem.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="grid grid-cols-12 gap-3 items-center p-3 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors">
                  {/* Label */}
                  <div className="col-span-4">
                    <input
                      type="text"
                      value={sem.label}
                      onChange={(e) => updateSemester(sem.id, "label", e.target.value)}
                      className="input-premium text-xs py-2"
                      id={`sem-label-${sem.id}`}
                    />
                  </div>
                  {/* GPA */}
                  <div className="col-span-4">
                    <input
                      type="number"
                      min={0}
                      max={UNIVERSITY_CONFIG.maxGPA}
                      step={0.01}
                      value={sem.gpa || ""}
                      placeholder="0.00"
                      onChange={(e) => updateSemester(sem.id, "gpa", parseFloat(e.target.value) || 0)}
                      className="input-premium text-xs py-2"
                      id={`sem-gpa-${sem.id}`}
                    />
                  </div>
                  {/* Credits */}
                  <div className="col-span-3">
                    <input
                      type="number"
                      min={1}
                      max={100}
                      step={1}
                      value={sem.credits || ""}
                      placeholder="24"
                      onChange={(e) => updateSemester(sem.id, "credits", parseInt(e.target.value) || 0)}
                      className="input-premium text-xs py-2"
                      id={`sem-credits-${sem.id}`}
                    />
                  </div>
                  {/* Delete */}
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => removeSemester(sem.id)}
                      disabled={semesters.length <= 1}
                      className="flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-colors disabled:opacity-30"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {semesters.length < 3 && (
          <button
            onClick={addSemester}
            className="w-full rounded-xl border-2 border-dashed border-border py-3 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/4 transition-all"
          >
            <Plus className="h-4 w-4 inline mr-1.5" />
            Add another semester
          </button>
        )}

        {/* Semester GPA mini bars */}
        {semesters.some(s => s.gpa > 0) && (
          <div className="card-premium p-4 mt-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              GPA Progress
            </p>
            <div className="space-y-2.5">
              {semesters.map((sem) => (
                <div key={sem.id} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-20 shrink-0 truncate">{sem.label}</span>
                  <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(sem.gpa / UNIVERSITY_CONFIG.maxGPA) * 100}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-primary"
                    />
                  </div>
                  <span className="text-xs font-semibold text-foreground w-10 text-right">
                    {sem.gpa.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Result Panel ── */}
      <div className="lg:col-span-2 space-y-4">
        {/* CGPA Gauge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-premium p-6 flex flex-col items-center text-center border-primary/20 bg-primary/4"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Overall CGPA
          </p>
          <ProgressRing
            value={cgpaPercent}
            size={168}
            strokeWidth={14}
            color={ringColor}
            label={result.cgpa.toFixed(2)}
            sublabel={`out of ${UNIVERSITY_CONFIG.maxGPA}`}
          />
          <div className="mt-3 text-sm font-semibold text-foreground">{result.standing}</div>

          {/* Trend badge */}
          <div className={cn("mt-2 flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full", trendColor)}>
            <TrendIcon className="h-3.5 w-3.5" />
            {trendLabel}
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="card-premium p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Credits</p>
            <p className="text-2xl font-black text-foreground">
              <AnimatedNumber value={result.totalCredits} decimals={0} />
            </p>
          </div>
          <div className="card-premium p-4">
            <p className="text-xs text-muted-foreground mb-1">Semesters</p>
            <p className="text-2xl font-black text-foreground">
              <AnimatedNumber value={semesters.length} decimals={0} />
            </p>
          </div>
        </div>

        {/* Academic standing table */}
        <div className="card-premium p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Academic Standing
          </p>
          <div className="space-y-2">
            {UNIVERSITY_CONFIG.academicStanding.map((s) => (
              <div
                key={s.label}
                className={cn(
                  "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                  result.standing === s.label
                    ? "bg-primary/10 border border-primary/20 font-semibold text-primary"
                    : "text-muted-foreground"
                )}
              >
                <span>{s.label}</span>
                <span className="text-xs">≥ {s.minCGPA.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
