"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { UNIVERSITY_CONFIG } from "@/config/university";
import { cn } from "@/lib/utils";

const gradeColors: Record<string, string> = {
  O:   "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-emerald-500/20",
  "A+": "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ring-indigo-500/20",
  A:   "bg-blue-500/10 text-blue-600 dark:text-blue-400 ring-blue-500/20",
  "B+": "bg-violet-500/10 text-violet-600 dark:text-violet-400 ring-violet-500/20",
  B:   "bg-purple-500/10 text-purple-600 dark:text-purple-400 ring-purple-500/20",
  C:   "bg-amber-500/10 text-amber-600 dark:text-amber-400 ring-amber-500/20",
  P:   "bg-orange-500/10 text-orange-600 dark:text-orange-400 ring-orange-500/20",
  F:   "bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-rose-500/20",
};

export function GradeTableSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="grade-system" className="py-24 bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-4">
            University{" "}
            <span className="gradient-text">Grading System</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            All calculators use this grade-point scale configured for{" "}
            {UNIVERSITY_CONFIG.name}.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-3xl mx-auto"
        >
          <div className="card-premium overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Grade
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Description
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Grade Points
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Min Marks
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {UNIVERSITY_CONFIG.gradeScale.map((grade, i) => (
                    <motion.tr
                      key={grade.letter}
                      initial={{ opacity: 0, x: -12 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                      className="hover:bg-secondary/40 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className={cn(
                          "badge-grade text-sm font-bold ring-1",
                          gradeColors[grade.letter] ?? "bg-muted text-muted-foreground ring-border"
                        )}>
                          {grade.letter}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-foreground font-medium">
                        {grade.label}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-base font-black text-foreground">
                          {grade.points}
                        </span>
                        <span className="text-muted-foreground text-xs ml-0.5">/{UNIVERSITY_CONFIG.maxGPA}</span>
                      </td>
                      <td className="px-6 py-4 text-center text-muted-foreground">
                        {grade.minMarks > 0 ? `≥ ${grade.minMarks}%` : "< 40%"}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Academic Standing */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {UNIVERSITY_CONFIG.academicStanding.filter(s => s.label !== "Fail").map((standing) => (
              <div
                key={standing.label}
                className="card-premium p-4 text-center border-border"
              >
                <div className="text-sm font-bold text-foreground mb-1">{standing.label}</div>
                <div className="text-xs text-muted-foreground">
                  CGPA ≥ {standing.minCGPA.toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
