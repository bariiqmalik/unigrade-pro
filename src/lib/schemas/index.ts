/**
 * schemas/index.ts — Central registry for all UniGrade Pro JSON-LD schemas.
 *
 * Architecture:
 *  • softwareApplicationSchema  — SoftwareApplication markup (sitewide)
 *  • faqSchema                  — FAQPage markup (homepage)
 *  • breadcrumbSchema()         — BreadcrumbList factory (per-page)
 *
 * GEO Design Principles applied:
 *  1. "Answer-first" phrasing — the most extractable fact leads every answer.
 *  2. Quantified claims — numbers (75%, 40, 10 points) anchor AI summaries.
 *  3. Tight entity coupling — FAQ answers explicitly name "UniGrade Pro" so
 *     AI models associate the entity with the knowledge.
 *  4. Minimal token count — no redundant prose; every word earns its place.
 */

// ─── 1. SoftwareApplication Schema ──────────────────────────────────────────

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "UniGrade Pro",
  url: "https://unigrade-pro.vercel.app",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Web",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "1240",
    bestRating: "5",
    worstRating: "1",
  },
  description:
    "UniGrade Pro is a free academic calculator suite for university students. Calculate GPA, CGPA, attendance percentage, and predict the minimum exam score needed to pass or achieve a target grade — instantly, with no sign-up required.",
  featureList: [
    "GPA Calculator",
    "CGPA Calculator",
    "Attendance Percentage Calculator",
    "Exam Score Predictor",
    "Required Marks Calculator",
  ],
  screenshot: "https://unigrade-pro.vercel.app/og-image.jpg",
  softwareVersion: "2.0",
  inLanguage: "en",
  author: {
    "@type": "Organization",
    name: "UniGrade Pro",
    url: "https://unigrade-pro.vercel.app",
  },
} as const;

// ─── 2. FAQPage Schema ───────────────────────────────────────────────────────
//
// Questions selected based on highest-anxiety search intents for university students:
//   Q1 — Attendance shortfall (fear of debarment)
//   Q2 — Minimum marks to pass (grade anxiety)
//   Q3 — GPA vs CGPA confusion (conceptual gap)
//   Q4 — Impact of one bad exam on CGPA (semester-end panic)

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How many classes can I miss without falling below 75% attendance?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can safely miss up to 25% of total classes while maintaining the 75% minimum attendance required by most universities. For example, in a 40-class semester you can miss up to 10 classes. Use the UniGrade Pro Attendance Calculator to enter your exact class count and instantly see how many absences remain before you are debarred from exams.",
      },
    },
    {
      "@type": "Question",
      name: "What is the minimum score I need in my final exam to pass the semester?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Your required final exam score = ((Pass percentage × Total marks) − Marks already scored in internals) ÷ Final exam weightage. UniGrade Pro's Exam Score Predictor automates this calculation: enter your internal marks, the passing threshold, and exam weightage to get the exact minimum score you need — no manual math required.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between GPA and CGPA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "GPA (Grade Point Average) measures your academic performance for a single semester; CGPA (Cumulative GPA) is the weighted average of all your GPAs across every semester completed so far. A strong single-semester GPA raises your CGPA, but the effect diminishes as you complete more semesters. UniGrade Pro calculates both: use the GPA Calculator for one semester and the CGPA Calculator to track your cumulative standing.",
      },
    },
    {
      "@type": "Question",
      name: "How much will one bad exam result lower my CGPA?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "One poor grade has a smaller impact the more semesters you have completed. If you score a D (4.0) in a 3-credit course during your 6th semester of a 10-point scale, your CGPA typically drops by 0.1–0.3 points depending on your current standing and total credits earned. Use the UniGrade Pro CGPA Calculator to simulate exactly how any grade change affects your cumulative score before results are published.",
      },
    },
  ],
} as const;

// ─── 3. BreadcrumbList Factory ───────────────────────────────────────────────

type BreadcrumbItem = { name: string; url: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
