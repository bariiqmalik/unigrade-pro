import type { Metadata } from "next";
import { Target } from "lucide-react";
import { RequiredMarksPredictor } from "@/components/calculators/RequiredMarksPredictor";

export const metadata: Metadata = {
  title: "Required Marks Predictor",
  description:
    "Find out exactly what marks you need in your final exam to achieve your desired grade. Instant predictions based on your current score.",
};

export default function PredictorPage() {
  return (
    <div className="section-container py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 shadow-lg">
            <Target className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">Required Marks Predictor</h1>
            <p className="text-sm text-muted-foreground">What Do You Need in the Final Exam?</p>
          </div>
        </div>
        <p className="text-muted-foreground max-w-xl">
          Enter your current internal score, your desired target grade, and the final exam
          weightage. Get instant predictions on what you need to score.
        </p>
      </div>

      <RequiredMarksPredictor />
    </div>
  );
}
