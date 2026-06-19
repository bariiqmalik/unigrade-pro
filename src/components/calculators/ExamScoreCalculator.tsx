"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { calculateExamScore } from "@/lib/calculations";
import { UNIVERSITY_CONFIG } from "@/config/university";
import { AnimatedNumber } from "@/components/shared/AnimatedNumber";
import { cn } from "@/lib/utils";

interface ComponentSliderProps {
  label: string;
  value: number;
  max: number;
  weight: number;
  onChange: (v: number) => void;
  id: string;
  accentColor: string;
}

function ComponentSlider({ label, value, max, weight, onChange, id, accentColor }: ComponentSliderProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-semibold text-foreground">
          {label}
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            (Weight: {weight}%)
          </span>
        </label>
        <div className="flex items-center gap-2">
          <input
            id={id}
            type="number"
            min={0}
            max={max}
            value={value}
            onChange={(e) => onChange(Math.min(max, Math.max(0, parseFloat(e.target.value) || 0)))}
            className="w-16 text-center text-sm font-bold rounded-lg border border-border bg-secondary px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <span className="text-xs text-muted-foreground">/ {max}</span>
        </div>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        step={0.5}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 rounded-full cursor-pointer"
        style={{ accentColor }}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0</span>
        <span className="font-medium" style={{ color: accentColor }}>
          {((value / max) * 100).toFixed(0)}%
        </span>
        <span>{max}</span>
      </div>
    </div>
  );
}

const gradeColors: Record<string, { bg: string; text: string }> = {
  O:   { bg: "bg-emerald-500/10", text: "text-emerald-600 dark:text-emerald-400" },
  "A+": { bg: "bg-indigo-500/10", text: "text-indigo-600 dark:text-indigo-400" },
  A:   { bg: "bg-blue-500/10", text: "text-blue-600 dark:text-blue-400" },
  "B+": { bg: "bg-violet-500/10", text: "text-violet-600 dark:text-violet-400" },
  B:   { bg: "bg-purple-500/10", text: "text-purple-600 dark:text-purple-400" },
  C:   { bg: "bg-amber-500/10", text: "text-amber-600 dark:text-amber-400" },
  P:   { bg: "bg-orange-500/10", text: "text-orange-600 dark:text-orange-400" },
  F:   { bg: "bg-rose-500/10", text: "text-rose-600 dark:text-rose-400" },
};

const sliderColors = ["#4F46E5", "#7C3AED", "#F59E0B", "#10B981"];

export function ExamScoreCalculator() {
  const [scores, setScores] = useState({
    internal:   22,
    midterm:    14,
    assignment:  8,
    finalExam:  30,
  });

  const update = (key: keyof typeof scores) => (v: number) =>
    setScores((prev) => ({ ...prev, [key]: v }));

  const result = calculateExamScore({
    internal:   scores.internal,
    midterm:    scores.midterm,
    assignment: scores.assignment,
    finalExam:  scores.finalExam,
  });

  const gradeStyle = gradeColors[result.grade] ?? gradeColors["P"];

  const components = [
    {
      key: "internal" as const,
      label: UNIVERSITY_CONFIG.examComponents.internal.label,
      max: UNIVERSITY_CONFIG.examComponents.internal.maxMarks,
      weight: UNIVERSITY_CONFIG.examComponents.internal.weight,
      color: sliderColors[0],
    },
    {
      key: "midterm" as const,
      label: UNIVERSITY_CONFIG.examComponents.midterm.label,
      max: UNIVERSITY_CONFIG.examComponents.midterm.maxMarks,
      weight: UNIVERSITY_CONFIG.examComponents.midterm.weight,
      color: sliderColors[1],
    },
    {
      key: "assignment" as const,
      label: UNIVERSITY_CONFIG.examComponents.assignment.label,
      max: UNIVERSITY_CONFIG.examComponents.assignment.maxMarks,
      weight: UNIVERSITY_CONFIG.examComponents.assignment.weight,
      color: sliderColors[2],
    },
    {
      key: "finalExam" as const,
      label: UNIVERSITY_CONFIG.examComponents.finalExam.label,
      max: UNIVERSITY_CONFIG.examComponents.finalExam.maxMarks,
      weight: UNIVERSITY_CONFIG.examComponents.finalExam.weight,
      color: sliderColors[3],
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* ── Sliders ── */}
      <div className="lg:col-span-3 space-y-4">
        <h2 className="text-lg font-bold text-foreground">Score Components</h2>
        <div className="space-y-3">
          {components.map((comp) => (
            <ComponentSlider
              key={comp.key}
              id={`exam-${comp.key}`}
              label={comp.label}
              value={scores[comp.key]}
              max={comp.max}
              weight={comp.weight}
              onChange={update(comp.key)}
              accentColor={comp.color}
            />
          ))}
        </div>
      </div>

      {/* ── Result Panel ── */}
      <div className="lg:col-span-2 space-y-4">
        {/* Total Score */}
        <motion.div
          key={result.totalScore.toFixed(2)}
          initial={{ scale: 0.97 }}
          animate={{ scale: 1 }}
          className={cn(
            "card-premium p-6 text-center border",
            gradeStyle.bg,
            "border-current/20"
          )}
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Total Score
          </p>
          <div className="text-6xl font-black text-foreground mb-2">
            <AnimatedNumber value={result.totalScore} decimals={1} duration={0.5} />
          </div>
          <div className="text-sm text-muted-foreground mb-4">out of 100</div>

          <div className={cn("inline-flex items-center gap-2 rounded-full px-5 py-2", gradeStyle.bg)}>
            <span className={cn("text-2xl font-black", gradeStyle.text)}>
              {result.grade}
            </span>
            <span className="text-sm text-muted-foreground">— {result.gradeLabel}</span>
          </div>

          <div className="mt-3 text-xs text-muted-foreground">
            {result.gradePoints} grade points
          </div>
        </motion.div>

        {/* Component Breakdown */}
        <div className="card-premium p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
            Score Breakdown
          </p>
          <div className="space-y-3">
            {result.componentBreakdown.map((comp, i) => (
              <div key={comp.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground truncate pr-2">{comp.label}</span>
                  <span className="font-semibold text-foreground shrink-0">
                    {comp.score}/{comp.max}
                    <span className="text-muted-foreground ml-1">
                      ({comp.weighted.toFixed(1)} pts)
                    </span>
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${comp.percentage}%` }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: sliderColors[i] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score bar */}
        <div className="card-premium p-4">
          <div className="flex justify-between text-xs mb-2">
            <span className="font-semibold text-muted-foreground">Overall</span>
            <span className="font-bold text-foreground">{result.totalScore.toFixed(1)}%</span>
          </div>
          <div className="h-3 rounded-full bg-secondary overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${result.totalScore}%` }}
              transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
              className="h-full rounded-full bg-gradient-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
