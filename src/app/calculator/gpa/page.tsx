import type { Metadata } from "next";
import { Calculator } from "lucide-react";
import { GPACalculator } from "@/components/calculators/GPACalculator";

export const metadata: Metadata = {
  title: "GPA Calculator",
  description:
    "Calculate your semester GPA with credit-weighted formula. Add subjects, select grades and get instant results.",
};

export default function GPAPage() {
  return (
    <div className="section-container py-12">
      {/* Page Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-glow-primary">
            <Calculator className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">GPA Calculator</h1>
            <p className="text-sm text-muted-foreground">Semester Grade Point Average</p>
          </div>
        </div>
        <p className="text-muted-foreground max-w-xl">
          Add your subjects with their credits and grades. Your semester GPA is calculated
          in real-time using the credit-weighted formula.
        </p>
      </div>

      <GPACalculator />
    </div>
  );
}
