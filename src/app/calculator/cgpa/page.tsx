import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";
import { CGPACalculator } from "@/components/calculators/CGPACalculator";

export const metadata: Metadata = {
  title: "CGPA Calculator",
  description:
    "Calculate your Cumulative GPA across all semesters with credit-weighted formula. Track academic standing and performance trends.",
};

export default function CGPAPage() {
  return (
    <div className="section-container py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
            <TrendingUp className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">CGPA Calculator</h1>
            <p className="text-sm text-muted-foreground">Cumulative Grade Point Average</p>
          </div>
        </div>
        <p className="text-muted-foreground max-w-xl">
          Enter your semester GPA and credits for each semester. Your overall CGPA
          is computed using the credit-weighted average formula.
        </p>
      </div>

      <CGPACalculator />
    </div>
  );
}
