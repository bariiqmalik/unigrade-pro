"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-xl border border-border bg-card animate-pulse" />
    );
  }

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;

  return (
    <button
      onClick={cycleTheme}
      aria-label={`Switch theme (current: ${theme})`}
      className="flex items-center justify-center h-9 w-9 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200 hover:-translate-y-0.5"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
          transition={{ duration: 0.2 }}
        >
          <Icon className="h-4 w-4" />
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
