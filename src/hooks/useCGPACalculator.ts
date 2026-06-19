"use client";

import { useState, useCallback } from "react";
import { generateId } from "@/lib/utils";
import { calculateCGPA, SemesterEntry, CGPAResult } from "@/lib/calculations";

const defaultSemester = (n: number): SemesterEntry => ({
  id: generateId(),
  label: `Semester ${n}`,
  gpa: 0,
  credits: 24,
});

export function useCGPACalculator() {
  const [semesters, setSemesters] = useState<SemesterEntry[]>([
    defaultSemester(1),
    defaultSemester(2),
  ]);

  const result: CGPAResult = calculateCGPA(semesters);

  const addSemester = useCallback(() => {
    setSemesters((prev) => [...prev, defaultSemester(prev.length + 1)]);
  }, []);

  const removeSemester = useCallback((id: string) => {
    setSemesters((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const updateSemester = useCallback(
    (id: string, field: keyof SemesterEntry, value: string | number) => {
      setSemesters((prev) =>
        prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
      );
    },
    []
  );

  const resetSemesters = useCallback(() => {
    setSemesters([defaultSemester(1), defaultSemester(2)]);
  }, []);

  return {
    semesters,
    result,
    addSemester,
    removeSemester,
    updateSemester,
    resetSemesters,
  };
}
