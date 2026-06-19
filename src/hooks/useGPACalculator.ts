"use client";

import { useState, useCallback } from "react";
import { generateId } from "@/lib/utils";
import {
  calculateGPA,
  SubjectEntry,
  GPAResult,
} from "@/lib/calculations";
import { UNIVERSITY_CONFIG } from "@/config/university";

const defaultSubject = (): SubjectEntry => ({
  id: generateId(),
  name: "",
  credits: UNIVERSITY_CONFIG.defaultCredits,
  grade: "A",
});

export function useGPACalculator(initialSubjects?: SubjectEntry[]) {
  const [subjects, setSubjects] = useState<SubjectEntry[]>(
    initialSubjects ?? [defaultSubject(), defaultSubject(), defaultSubject()]
  );

  const result: GPAResult = calculateGPA(subjects);

  const addSubject = useCallback(() => {
    setSubjects((prev) => [...prev, defaultSubject()]);
  }, []);

  const removeSubject = useCallback((id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const updateSubject = useCallback(
    (id: string, field: keyof SubjectEntry, value: string | number) => {
      setSubjects((prev) =>
        prev.map((s) => (s.id === id ? { ...s, [field]: value } : s))
      );
    },
    []
  );

  const resetSubjects = useCallback(() => {
    setSubjects([defaultSubject(), defaultSubject(), defaultSubject()]);
  }, []);

  return {
    subjects,
    result,
    addSubject,
    removeSubject,
    updateSubject,
    resetSubjects,
  };
}
