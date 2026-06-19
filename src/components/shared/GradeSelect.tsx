"use client";

import { UNIVERSITY_CONFIG } from "@/config/university";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface GradeSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  id?: string;
}

export function GradeSelect({ value, onChange, className, id }: GradeSelectProps) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "input-premium appearance-none pr-8 cursor-pointer",
          className
        )}
      >
        {UNIVERSITY_CONFIG.gradeScale.map((grade) => (
          <option key={grade.letter} value={grade.letter}>
            {grade.letter} — {grade.label} ({grade.points})
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </div>
  );
}

interface CreditSelectProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
  id?: string;
}

export function CreditSelect({ value, onChange, className, id }: CreditSelectProps) {
  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          "input-premium appearance-none pr-8 cursor-pointer",
          className
        )}
      >
        {UNIVERSITY_CONFIG.creditOptions.map((credit) => (
          <option key={credit} value={credit}>
            {credit} cr
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </div>
  );
}
