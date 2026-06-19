"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Calculator, Download, RefreshCw } from "lucide-react";
import { useGPACalculator } from "@/hooks/useGPACalculator";
import { GradeSelect, CreditSelect } from "@/components/shared/GradeSelect";
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

export function GPACalculator() {
  const { subjects, result, addSubject, removeSubject, updateSubject, resetSubjects } =
    useGPACalculator();
  const [, saveGPA] = useLocalStorage("unigrade_gpa_result", null as null | typeof result);

  // Persist result
  useEffect(() => {
    if (result.totalCredits > 0) saveGPA(result);
  }, [result, saveGPA]);

  const gpaPercent = (result.gpa / UNIVERSITY_CONFIG.maxGPA) * 100;
  const ringColor = standingColors[result.standing] ?? "#4F46E5";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* ── Subjects Table ── */}
      <div className="lg:col-span-3 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Subjects</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={resetSubjects}
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg border border-border hover:bg-secondary transition-all"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Reset
            </button>
            <button
              onClick={addSubject}
              className="btn-primary text-xs px-4 py-2 gap-1.5"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Subject
            </button>
          </div>
        </div>

        {/* Column Headers */}
        <div className="grid grid-cols-12 gap-3 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <div className="col-span-5">Subject Name</div>
          <div className="col-span-3">Credits</div>
          <div className="col-span-3">Grade</div>
          <div className="col-span-1" />
        </div>

        {/* Subject Rows */}
        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {subjects.map((subject, i) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                exit={{ opacity: 0, x: 20, height: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <div className="grid grid-cols-12 gap-3 items-center p-3 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors group">
                  {/* Subject Name */}
                  <div className="col-span-5">
                    <input
                      type="text"
                      placeholder={`Subject ${i + 1}`}
                      value={subject.name}
                      onChange={(e) => updateSubject(subject.id, "name", e.target.value)}
                      className="input-premium text-xs py-2"
                      id={`subject-name-${subject.id}`}
                    />
                  </div>

                  {/* Credits */}
                  <div className="col-span-3">
                    <CreditSelect
                      value={subject.credits}
                      onChange={(v) => updateSubject(subject.id, "credits", v)}
                      className="text-xs py-2"
                      id={`subject-credits-${subject.id}`}
                    />
                  </div>

                  {/* Grade */}
                  <div className="col-span-3">
                    <GradeSelect
                      value={subject.grade}
                      onChange={(v) => updateSubject(subject.id, "grade", v)}
                      className="text-xs py-2"
                      id={`subject-grade-${subject.id}`}
                    />
                  </div>

                  {/* Delete */}
                  <div className="col-span-1 flex justify-center">
                    <button
                      onClick={() => removeSubject(subject.id)}
                      disabled={subjects.length <= 1}
                      className="flex items-center justify-center h-8 w-8 rounded-lg text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Remove subject"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Add subject hint */}
        {subjects.length < 3 && (
          <button
            onClick={addSubject}
            className="w-full rounded-xl border-2 border-dashed border-border py-3 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/4 transition-all duration-200"
          >
            <Plus className="h-4 w-4 inline mr-1.5" />
            Add another subject
          </button>
        )}
      </div>

      {/* ── Result Panel ── */}
      <div className="lg:col-span-2 space-y-4">
        {/* GPA Gauge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-premium p-6 flex flex-col items-center text-center border-primary/20 bg-primary/4"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Semester GPA
          </p>
          <ProgressRing
            value={gpaPercent}
            size={160}
            strokeWidth={14}
            color={ringColor}
            label={result.gpa.toFixed(2)}
            sublabel={`out of ${UNIVERSITY_CONFIG.maxGPA}`}
          />
          <div className="mt-4 text-sm font-semibold text-foreground">
            {result.standing}
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
            <p className="text-xs text-muted-foreground mb-1">Grade Points</p>
            <p className="text-2xl font-black text-foreground">
              <AnimatedNumber value={result.totalGradePoints} decimals={0} />
            </p>
          </div>
        </div>

        {/* Grade Distribution */}
        {Object.keys(result.gradeDistribution).length > 0 && (
          <div className="card-premium p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
              Grade Distribution
            </p>
            <div className="space-y-2">
              {Object.entries(result.gradeDistribution).map(([grade, count]) => (
                <div key={grade} className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-foreground">{grade}</span>
                  <span className="text-muted-foreground">{count} subject{count !== 1 ? "s" : ""}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Performance label */}
        <div className={cn(
          "rounded-xl border p-4 text-center",
          result.gpa >= 9
            ? "border-emerald-500/20 bg-emerald-500/8"
            : result.gpa >= 7.5
            ? "border-indigo-500/20 bg-indigo-500/8"
            : result.gpa >= 6
            ? "border-amber-500/20 bg-amber-500/8"
            : result.gpa >= 4
            ? "border-orange-500/20 bg-orange-500/8"
            : "border-rose-500/20 bg-rose-500/8"
        )}>
          <div className="text-sm font-bold text-foreground">
            {result.gpa >= 9 ? "🏆 Outstanding performance!" :
             result.gpa >= 7.5 ? "🎓 First Class — Well done!" :
             result.gpa >= 6 ? "📚 Good work, keep it up!" :
             result.gpa >= 4 ? "💪 Pass — Room to improve." :
             result.totalCredits === 0 ? "Enter subjects above" :
             "⚠️ Below passing — Review urgently."}
          </div>
        </div>
      </div>
    </div>
  );
}
