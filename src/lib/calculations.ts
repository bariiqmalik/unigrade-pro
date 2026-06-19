import {
  UNIVERSITY_CONFIG,
  getGradePoints,
  getLetterFromMarks,
  getAcademicStanding,
} from "@/config/university";

// ─── GPA Calculation ─────────────────────────────────────────

export interface SubjectEntry {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

export interface GPAResult {
  gpa: number;
  totalCredits: number;
  totalGradePoints: number;
  gradeDistribution: Record<string, number>;
  standing: string;
  standingColor: string;
}

export function calculateGPA(subjects: SubjectEntry[]): GPAResult {
  const valid = subjects.filter((s) => s.credits > 0 && s.grade);

  if (valid.length === 0) {
    return {
      gpa: 0,
      totalCredits: 0,
      totalGradePoints: 0,
      gradeDistribution: {},
      standing: "—",
      standingColor: "slate",
    };
  }

  let totalCredits = 0;
  let totalGradePoints = 0;
  const gradeDistribution: Record<string, number> = {};

  for (const subject of valid) {
    const points = getGradePoints(subject.grade);
    totalCredits += subject.credits;
    totalGradePoints += points * subject.credits;
    gradeDistribution[subject.grade] = (gradeDistribution[subject.grade] ?? 0) + 1;
  }

  const gpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
  const standing = getAcademicStanding(gpa);

  return {
    gpa,
    totalCredits,
    totalGradePoints,
    gradeDistribution,
    standing: standing.label,
    standingColor: standing.color,
  };
}

// ─── CGPA Calculation ─────────────────────────────────────────

export interface SemesterEntry {
  id: string;
  label: string;
  gpa: number;
  credits: number;
}

export interface CGPAResult {
  cgpa: number;
  totalCredits: number;
  totalGradePoints: number;
  standing: string;
  standingColor: string;
  trend: "improving" | "declining" | "stable";
}

export function calculateCGPA(semesters: SemesterEntry[]): CGPAResult {
  const valid = semesters.filter(
    (s) => s.credits > 0 && s.gpa >= 0 && s.gpa <= UNIVERSITY_CONFIG.maxGPA
  );

  if (valid.length === 0) {
    return {
      cgpa: 0,
      totalCredits: 0,
      totalGradePoints: 0,
      standing: "—",
      standingColor: "slate",
      trend: "stable",
    };
  }

  let totalCredits = 0;
  let totalGradePoints = 0;

  for (const sem of valid) {
    totalCredits += sem.credits;
    totalGradePoints += sem.gpa * sem.credits;
  }

  const cgpa = totalCredits > 0 ? totalGradePoints / totalCredits : 0;
  const standing = getAcademicStanding(cgpa);

  // Trend: compare last two semesters
  let trend: CGPAResult["trend"] = "stable";
  if (valid.length >= 2) {
    const last = valid[valid.length - 1].gpa;
    const prev = valid[valid.length - 2].gpa;
    if (last > prev + 0.1) trend = "improving";
    else if (last < prev - 0.1) trend = "declining";
  }

  return {
    cgpa,
    totalCredits,
    totalGradePoints,
    standing: standing.label,
    standingColor: standing.color,
    trend,
  };
}

// ─── Attendance Calculation ───────────────────────────────────

export interface AttendanceResult {
  percentage: number;
  status: "safe" | "warning" | "danger" | "critical";
  statusLabel: string;
  statusColor: string;
  classesNeededFor75: number;
  maxMissable: number;
  canReach75: boolean;
}

export function calculateAttendance(
  attended: number,
  total: number
): AttendanceResult {
  if (total === 0) {
    return {
      percentage: 0,
      status: "critical",
      statusLabel: "No classes",
      statusColor: "slate",
      classesNeededFor75: 0,
      maxMissable: 0,
      canReach75: false,
    };
  }

  const percentage = (attended / total) * 100;
  const { minRequired, warningThreshold } = UNIVERSITY_CONFIG.attendance;

  let status: AttendanceResult["status"];
  let statusLabel: string;
  let statusColor: string;

  if (percentage >= warningThreshold) {
    status = "safe";
    statusLabel = "Safe";
    statusColor = "emerald";
  } else if (percentage >= minRequired) {
    status = "warning";
    statusLabel = "Warning";
    statusColor = "yellow";
  } else if (percentage >= UNIVERSITY_CONFIG.attendance.condonationLimit) {
    status = "danger";
    statusLabel = "Danger";
    statusColor = "orange";
  } else {
    status = "critical";
    statusLabel = "Critical";
    statusColor = "red";
  }

  // Classes needed to reach 75%: solve (attended + x) / (total + x) = 0.75
  // => attended + x = 0.75 * total + 0.75x => x(1 - 0.75) = 0.75*total - attended
  // => x = (0.75*total - attended) / 0.25
  const target = minRequired / 100;
  const numerator = target * total - attended;
  const classesNeededFor75 =
    percentage >= minRequired
      ? 0
      : Math.ceil(numerator / (1 - target));

  // Max missable: solve (attended) / (total + x) = 0.75 => total+x = attended/0.75 => x = attended/0.75 - total
  const maxFutureTotal = attended / target;
  const maxMissable = Math.max(0, Math.floor(maxFutureTotal - total));

  return {
    percentage,
    status,
    statusLabel,
    statusColor,
    classesNeededFor75: Math.max(0, classesNeededFor75),
    maxMissable,
    canReach75: classesNeededFor75 <= 1000, // arbitrary large cap
  };
}

// ─── Exam Score Calculation ───────────────────────────────────

export interface ExamScoreInput {
  internal: number;
  midterm: number;
  assignment: number;
  finalExam: number;
  internalMax?: number;
  midtermMax?: number;
  assignmentMax?: number;
  finalExamMax?: number;
}

export interface ExamScoreResult {
  totalScore: number;
  percentage: number;
  grade: string;
  gradePoints: number;
  gradeLabel: string;
  componentBreakdown: {
    label: string;
    score: number;
    max: number;
    percentage: number;
    weight: number;
    weighted: number;
  }[];
}

export function calculateExamScore(input: ExamScoreInput): ExamScoreResult {
  const { examComponents } = UNIVERSITY_CONFIG;

  const components = [
    {
      key: "internal" as const,
      label: examComponents.internal.label,
      score: input.internal,
      max: input.internalMax ?? examComponents.internal.maxMarks,
      weight: examComponents.internal.weight,
    },
    {
      key: "midterm" as const,
      label: examComponents.midterm.label,
      score: input.midterm,
      max: input.midtermMax ?? examComponents.midterm.maxMarks,
      weight: examComponents.midterm.weight,
    },
    {
      key: "assignment" as const,
      label: examComponents.assignment.label,
      score: input.assignment,
      max: input.assignmentMax ?? examComponents.assignment.maxMarks,
      weight: examComponents.assignment.weight,
    },
    {
      key: "finalExam" as const,
      label: examComponents.finalExam.label,
      score: input.finalExam,
      max: input.finalExamMax ?? examComponents.finalExam.maxMarks,
      weight: examComponents.finalExam.weight,
    },
  ];

  let totalWeighted = 0;
  const breakdown = components.map((c) => {
    const pct = c.max > 0 ? (c.score / c.max) * 100 : 0;
    const weighted = (pct * c.weight) / 100;
    totalWeighted += weighted;
    return {
      label: c.label,
      score: c.score,
      max: c.max,
      percentage: pct,
      weight: c.weight,
      weighted,
    };
  });

  const gradeEntry = getLetterFromMarks(totalWeighted);

  return {
    totalScore: totalWeighted,
    percentage: totalWeighted,
    grade: gradeEntry.letter,
    gradePoints: gradeEntry.points,
    gradeLabel: gradeEntry.label,
    componentBreakdown: breakdown,
  };
}

// ─── Required Marks Predictor ─────────────────────────────────

export interface RequiredMarksResult {
  requiredMarks: number;
  requiredPercentage: number;
  isAchievable: boolean;
  currentScore: number;
  targetGrade: string;
  targetPoints: number;
  finalExamWeight: number;
  message: string;
}

export function calculateRequiredMarks(
  currentScore: number,          // score achieved so far (out of 100 - finalExamWeight)
  targetGradeLetter: string,     // desired grade letter
  finalExamWeight: number        // weight of final exam (e.g., 40 for 40%)
): RequiredMarksResult {
  const gradeEntry = UNIVERSITY_CONFIG.gradeScale.find(
    (g) => g.letter === targetGradeLetter
  ) ?? UNIVERSITY_CONFIG.gradeScale[UNIVERSITY_CONFIG.gradeScale.length - 2];

  const targetMarks = gradeEntry.minMarks;
  const internalWeight = 100 - finalExamWeight;

  // currentScore is assumed to be out of 100 but only covers (internalWeight) portion
  // Actual contribution: currentScore * (internalWeight/100)
  const currentContribution = currentScore * (internalWeight / 100);

  // Need: currentContribution + finalScore * (finalWeight/100) >= targetMarks
  // finalScore * (finalWeight/100) >= targetMarks - currentContribution
  // finalScore >= (targetMarks - currentContribution) / (finalWeight/100)

  const needed = (targetMarks - currentContribution) / (finalExamWeight / 100);
  const requiredMarks = Math.ceil(needed);
  const isAchievable = requiredMarks <= 100;

  let message: string;
  if (requiredMarks <= 0) {
    message = "You've already secured this grade! 🎉";
  } else if (isAchievable) {
    message = `Score at least ${requiredMarks}/100 in your final exam.`;
  } else {
    message = "This grade is not achievable with your current internal score.";
  }

  return {
    requiredMarks: Math.max(0, requiredMarks),
    requiredPercentage: Math.max(0, (requiredMarks / 100) * 100),
    isAchievable,
    currentScore,
    targetGrade: gradeEntry.letter,
    targetPoints: gradeEntry.points,
    finalExamWeight,
    message,
  };
}
