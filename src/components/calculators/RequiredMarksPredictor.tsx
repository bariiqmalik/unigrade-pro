"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { calculateRequiredMarks } from "@/lib/calculations";
import { UNIVERSITY_CONFIG } from "@/config/university";
import { GradeSelect } from "@/components/shared/GradeSelect";
import { AnimatedNumber } from "@/components/shared/AnimatedNumber";
import { ProgressRing } from "@/components/shared/ProgressRing";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Target, Info } from "lucide-react";

export function RequiredMarksPredictor() {
  const [currentScore, setCurrentScore] = useState(55);
  const [targetGrade, setTargetGrade] = useState("A");
  const [finalWeight, setFinalWeight] = useState(40);

  const result = calculateRequiredMarks(currentScore, targetGrade, finalWeight);

  const ringColor = result.requiredMarks <= 0
    ? "#10B981"
    : result.isAchievable
    ? "#4F46E5"
    : "#F43F5E";

  const ringValue = result.requiredMarks <= 0
    ? 100
    : result.isAchievable
    ? result.requiredMarks
    : 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* ── Inputs ── */}
      <div className="lg:col-span-3 space-y-6">
        <h2 className="text-lg font-bold text-foreground">Predictor Inputs</h2>

        {/* Current Score */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <label htmlFor="current-score" className="block text-sm font-semibold text-foreground">
            Current Score (out of {100 - finalWeight})
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              Your marks before the final exam
            </span>
          </label>
          <div className="flex items-center gap-4">
            <input
              id="current-score"
              type="number"
              min={0}
              max={100 - finalWeight}
              value={currentScore}
              onChange={(e) => setCurrentScore(Math.min(100 - finalWeight, Math.max(0, parseFloat(e.target.value) || 0)))}
              className="input-premium text-2xl font-bold h-14 text-center w-32"
            />
            <span className="text-muted-foreground text-sm">out of {100 - finalWeight}</span>
          </div>
          <input
            type="range"
            min={0}
            max={100 - finalWeight}
            value={currentScore}
            onChange={(e) => setCurrentScore(parseFloat(e.target.value))}
            className="w-full accent-primary h-2 rounded-full cursor-pointer"
          />
        </div>

        {/* Target Grade */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <label className="block text-sm font-semibold text-foreground">
            Target Grade
          </label>
          <GradeSelect
            value={targetGrade}
            onChange={setTargetGrade}
            className="h-12 text-base font-semibold"
            id="target-grade"
          />
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            {UNIVERSITY_CONFIG.gradeScale.filter(g => g.letter !== "F").map(g => (
              <button
                key={g.letter}
                onClick={() => setTargetGrade(g.letter)}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs font-semibold border transition-all",
                  targetGrade === g.letter
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary text-muted-foreground border-border hover:border-primary/30"
                )}
              >
                {g.letter}
              </button>
            ))}
          </div>
        </div>

        {/* Final Exam Weight */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-3">
          <label className="block text-sm font-semibold text-foreground">
            Final Exam Weight
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              How much % does the final exam contribute?
            </span>
          </label>
          <div className="flex items-center gap-4">
            <input
              id="final-weight"
              type="number"
              min={5}
              max={100}
              step={5}
              value={finalWeight}
              onChange={(e) => setFinalWeight(Math.min(100, Math.max(5, parseInt(e.target.value) || 40)))}
              className="input-premium text-2xl font-bold h-14 text-center w-32"
            />
            <span className="text-muted-foreground text-sm">%</span>
          </div>
          <input
            type="range"
            min={5}
            max={80}
            step={5}
            value={finalWeight}
            onChange={(e) => setFinalWeight(parseInt(e.target.value))}
            className="w-full accent-primary h-2 rounded-full cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Internal: {100 - finalWeight}%</span>
            <span>Final: {finalWeight}%</span>
          </div>
        </div>
      </div>

      {/* ── Result Panel ── */}
      <div className="lg:col-span-2 space-y-5">
        {/* Main result card */}
        <motion.div
          key={`${result.requiredMarks}-${result.isAchievable}`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "card-premium p-6 flex flex-col items-center text-center border",
            result.requiredMarks <= 0
              ? "border-emerald-500/30 bg-emerald-500/8"
              : result.isAchievable
              ? "border-primary/30 bg-primary/8"
              : "border-rose-500/30 bg-rose-500/8"
          )}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
            Required Final Exam Score
          </p>

          <ProgressRing
            value={ringValue}
            size={180}
            strokeWidth={16}
            color={ringColor}
          >
            {result.requiredMarks <= 0 ? (
              <div className="text-center">
                <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto mb-1" />
                <div className="text-xs font-semibold text-emerald-500">Already Secured!</div>
              </div>
            ) : (
              <div className="text-center">
                <div className={cn("text-4xl font-black", result.isAchievable ? "text-foreground" : "text-rose-500")}>
                  <AnimatedNumber value={result.isAchievable ? result.requiredMarks : 0} decimals={0} />
                  {!result.isAchievable && "—"}
                </div>
                <div className="text-xs text-muted-foreground">out of 100</div>
              </div>
            )}
          </ProgressRing>

          <div className={cn(
            "mt-4 flex items-center gap-2 text-sm font-semibold",
            result.requiredMarks <= 0 ? "text-emerald-500" :
            result.isAchievable ? "text-primary" : "text-rose-500"
          )}>
            {result.requiredMarks <= 0 ? (
              <><CheckCircle2 className="h-4 w-4" /> Grade Secured!</>
            ) : result.isAchievable ? (
              <><Target className="h-4 w-4" /> Achievable!</>
            ) : (
              <><XCircle className="h-4 w-4" /> Not Achievable</>
            )}
          </div>

          <p className="mt-2 text-xs text-muted-foreground">{result.message}</p>
        </motion.div>

        {/* Target details */}
        <div className="card-premium p-4 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Target Details
          </p>
          <div className="space-y-2.5 text-sm">
            {[
              { label: "Target Grade", value: `${result.targetGrade} (${result.targetPoints} pts)` },
              { label: "Min Required Marks", value: `${UNIVERSITY_CONFIG.gradeScale.find(g => g.letter === targetGrade)?.minMarks ?? 0}%` },
              { label: "Final Exam Weight", value: `${finalWeight}%` },
              { label: "Internal Portion", value: `${100 - finalWeight}%` },
              { label: "Your Internal Score", value: `${currentScore}/${100 - finalWeight}` },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-semibold text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* All grades required */}
        <div className="card-premium p-4">
          <div className="flex items-center gap-2 mb-3">
            <Info className="h-3.5 w-3.5 text-muted-foreground" />
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Marks Needed Per Grade
            </p>
          </div>
          <div className="space-y-1.5">
            {UNIVERSITY_CONFIG.gradeScale.filter(g => g.letter !== "F").map((g) => {
              const r = calculateRequiredMarks(currentScore, g.letter, finalWeight);
              return (
                <div key={g.letter} className={cn(
                  "flex justify-between rounded-lg px-3 py-1.5 text-sm transition-colors",
                  targetGrade === g.letter ? "bg-primary/10 font-semibold text-primary" : "text-muted-foreground"
                )}>
                  <span>{g.letter} ({g.label})</span>
                  <span className={cn("font-semibold", !r.isAchievable ? "text-rose-500" : r.requiredMarks <= 0 ? "text-emerald-500" : "text-foreground")}>
                    {r.requiredMarks <= 0 ? "Secured ✓" : r.isAchievable ? `${r.requiredMarks}/100` : "Not possible"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
