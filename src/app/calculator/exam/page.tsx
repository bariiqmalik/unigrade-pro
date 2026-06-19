import type { Metadata } from "next";
import { BookOpen } from "lucide-react";
import { ExamScoreCalculator } from "@/components/calculators/ExamScoreCalculator";

export const metadata: Metadata = {
  title: "Exam Score Calculator",
  description:
    "Calculate your predicted final exam score from internal marks, mid-term, assignments, and final exam marks.",
};

export default function ExamPage() {
  return (
    <div className="section-container py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">Exam Score Calculator</h1>
            <p className="text-sm text-muted-foreground">Calculate Predicted Final Score</p>
          </div>
        </div>
        <p className="text-muted-foreground max-w-xl">
          Enter your marks for each assessment component using the sliders.
          See your weighted total score and predicted letter grade instantly.
        </p>
      </div>

      <ExamScoreCalculator />
    </div>
  );
}
