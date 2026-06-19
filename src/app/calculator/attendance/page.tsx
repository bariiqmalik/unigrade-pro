import type { Metadata } from "next";
import { Users } from "lucide-react";
import { AttendanceCalculator } from "@/components/calculators/AttendanceCalculator";

export const metadata: Metadata = {
  title: "Attendance Calculator",
  description:
    "Track your attendance percentage. Know how many classes you can miss and still be safe. Get real-time attendance status.",
};

export default function AttendancePage() {
  return (
    <div className="section-container py-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg">
            <Users className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-foreground">Attendance Calculator</h1>
            <p className="text-sm text-muted-foreground">Track Your Attendance Percentage</p>
          </div>
        </div>
        <p className="text-muted-foreground max-w-xl">
          Enter the number of classes attended and total classes conducted. 
          See your attendance status, how many more you can miss, and what it takes to reach 75%.
        </p>
      </div>

      <AttendanceCalculator />
    </div>
  );
}
