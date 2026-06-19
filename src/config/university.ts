/**
 * ============================================================
 * UniGrade Pro — University Configuration
 * ============================================================
 * Edit this file to match your university's grading system.
 * All calculators will automatically use these settings.
 * ============================================================
 */

export const UNIVERSITY_CONFIG = {
  // ─── University Identity ────────────────────────────────────
  name: "Your University",
  shortName: "UniGrade Pro",
  tagline: "Built specifically for students with accurate grading formulas.",
  logoText: "UG",

  // ─── Grade Scale (Letter → Grade Points) ────────────────────
  gradeScale: [
    { letter: "O",  label: "Outstanding", points: 10, minMarks: 90 },
    { letter: "A+", label: "Excellent",   points: 9,  minMarks: 80 },
    { letter: "A",  label: "Very Good",   points: 8,  minMarks: 70 },
    { letter: "B+", label: "Good",        points: 7,  minMarks: 60 },
    { letter: "B",  label: "Average",     points: 6,  minMarks: 50 },
    { letter: "C",  label: "Satisfactory",points: 5,  minMarks: 45 },
    { letter: "P",  label: "Pass",        points: 4,  minMarks: 40 },
    { letter: "F",  label: "Fail",        points: 0,  minMarks: 0  },
  ],

  // ─── Credit Options ─────────────────────────────────────────
  creditOptions: [1, 2, 3, 4, 5, 6],
  defaultCredits: 3,

  // ─── Academic Standing Thresholds ───────────────────────────
  academicStanding: [
    { label: "Distinction",  minCGPA: 9.0,  color: "emerald"  },
    { label: "First Class",  minCGPA: 7.5,  color: "blue"     },
    { label: "Second Class", minCGPA: 6.0,  color: "yellow"   },
    { label: "Pass",         minCGPA: 4.0,  color: "orange"   },
    { label: "Fail",         minCGPA: 0,    color: "red"       },
  ],

  // ─── Attendance Rules ────────────────────────────────────────
  attendance: {
    minRequired: 75,       // Minimum required attendance %
    warningThreshold: 80,  // Show warning below this %
    condonationLimit: 65,  // Minimum for condonation (medical etc.)
  },

  // ─── Passing Criteria ────────────────────────────────────────
  passingGrade: "P",       // Letter grade required to pass
  passingPoints: 4,        // Minimum grade points to pass a subject
  minPassingMarks: 40,     // Minimum marks required (out of 100)

  // ─── Exam Score Weightage (must total 100) ───────────────────
  examComponents: {
    internal:    { label: "Internal Assessment", maxMarks: 30, weight: 30 },
    midterm:     { label: "Mid-Term Exam",        maxMarks: 20, weight: 20 },
    assignment:  { label: "Assignments / Lab",    maxMarks: 10, weight: 10 },
    finalExam:   { label: "Final Exam",           maxMarks: 40, weight: 40 },
  },

  // ─── GPA Scale (for display) ─────────────────────────────────
  maxGPA: 10,
} as const;

// ─── Derived Types ────────────────────────────────────────────
export type GradeLetter = typeof UNIVERSITY_CONFIG.gradeScale[number]["letter"];
export type GradeEntry = typeof UNIVERSITY_CONFIG.gradeScale[number];

// ─── Helper: get grade points from letter ─────────────────────
export function getGradePoints(letter: string): number {
  const grade = UNIVERSITY_CONFIG.gradeScale.find((g) => g.letter === letter);
  return grade?.points ?? 0;
}

// ─── Helper: get letter grade from marks ─────────────────────
export function getLetterFromMarks(marks: number): GradeEntry {
  for (const grade of UNIVERSITY_CONFIG.gradeScale) {
    if (marks >= grade.minMarks) return grade;
  }
  return UNIVERSITY_CONFIG.gradeScale[UNIVERSITY_CONFIG.gradeScale.length - 1];
}

// ─── Helper: get academic standing from CGPA ─────────────────
export function getAcademicStanding(cgpa: number) {
  for (const standing of UNIVERSITY_CONFIG.academicStanding) {
    if (cgpa >= standing.minCGPA) return standing;
  }
  return UNIVERSITY_CONFIG.academicStanding[UNIVERSITY_CONFIG.academicStanding.length - 1];
}
