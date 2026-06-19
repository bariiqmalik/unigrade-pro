"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  GraduationCap,
  Calculator,
  BarChart3,
  Menu,
  X,
  ChevronDown,
  BookOpen,
  TrendingUp,
  Users,
  Clock,
  Target,
  LayoutDashboard,
} from "lucide-react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { UNIVERSITY_CONFIG } from "@/config/university";
import { cn } from "@/lib/utils";

const calculators = [
  { href: "/calculator/gpa", label: "GPA Calculator", icon: Calculator, desc: "Semester grade point average" },
  { href: "/calculator/cgpa", label: "CGPA Calculator", icon: TrendingUp, desc: "Cumulative GPA across semesters" },
  { href: "/calculator/attendance", label: "Attendance", icon: Users, desc: "Track your attendance percentage" },
  { href: "/calculator/exam", label: "Exam Score", icon: BookOpen, desc: "Calculate exam score & grade" },
  { href: "/calculator/predictor", label: "Marks Predictor", icon: Target, desc: "Predict required final exam marks" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [calcDropdown, setCalcDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCalcDropdown(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500",
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="section-container">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-primary shadow-sm group-hover:shadow-glow-primary transition-shadow duration-300">
                <GraduationCap className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-base tracking-tight text-foreground">
                UniGrade <span className="text-primary">Pro</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {/* Calculators Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setCalcDropdown(true)}
                onMouseLeave={() => setCalcDropdown(false)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <Calculator className="h-4 w-4" />
                  Calculators
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      calcDropdown && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence>
                  {calcDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-2 w-72 rounded-2xl border border-border bg-card shadow-card-hover p-2"
                    >
                      {calculators.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-150",
                            "hover:bg-secondary group",
                            pathname === item.href && "bg-primary/5 text-primary"
                          )}
                        >
                          <div className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg",
                            pathname === item.href
                              ? "bg-primary text-primary-foreground"
                              : "bg-secondary text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                          )}>
                            <item.icon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-foreground">{item.label}</div>
                            <div className="text-xs text-muted-foreground">{item.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/dashboard"
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  pathname === "/dashboard"
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link
                href="/calculator/gpa"
                className="hidden md:inline-flex btn-primary text-xs px-4 py-2 gap-1.5"
              >
                <Calculator className="h-3.5 w-3.5" />
                Calculate Now
              </Link>
              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden flex items-center justify-center h-9 w-9 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-card border-b border-border shadow-xl md:hidden"
          >
            <div className="section-container py-4 space-y-1">
              <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Calculators
              </p>
              {calculators.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-3 transition-colors",
                    pathname === item.href
                      ? "bg-primary/8 text-primary"
                      : "text-foreground hover:bg-secondary"
                  )}
                >
                  <item.icon className="h-4 w-4 shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
              <div className="pt-2 border-t border-border">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-foreground hover:bg-secondary transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="text-sm font-medium">Dashboard</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}
