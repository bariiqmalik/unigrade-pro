"use client";

import Link from "next/link";
import { GraduationCap, Github, Twitter, Heart } from "lucide-react";
import { UNIVERSITY_CONFIG } from "@/config/university";

const footerLinks = {
  Calculators: [
    { href: "/calculator/gpa", label: "GPA Calculator" },
    { href: "/calculator/cgpa", label: "CGPA Calculator" },
    { href: "/calculator/attendance", label: "Attendance Tracker" },
    { href: "/calculator/exam", label: "Exam Score" },
    { href: "/calculator/predictor", label: "Marks Predictor" },
  ],
  Resources: [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/#grade-system", label: "Grade System" },
    { href: "/#features", label: "Features" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-primary shadow-sm">
                <GraduationCap className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-base">
                UniGrade <span className="text-primary">Pro</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              A professional-grade academic calculator built for university students.
              Calculate GPA, CGPA, attendance, and predict exam scores with precision.
            </p>
            <p className="mt-4 text-xs text-muted-foreground/60">
              Configured for {UNIVERSITY_CONFIG.name} · 10-point grading scale
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} UniGrade Pro. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            Made with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> for students
          </p>
        </div>
      </div>
    </footer>
  );
}
