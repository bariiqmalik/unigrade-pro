"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { UNIVERSITY_CONFIG } from "@/config/university";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ResultCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: string;
  badgeColor?: string;
  trend?: "improving" | "declining" | "stable";
  accent?: "primary" | "emerald" | "amber" | "rose";
  large?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const accentMap = {
  primary: {
    bg: "bg-primary/8",
    border: "border-primary/20",
    text: "text-primary",
    glow: "shadow-glow-primary",
  },
  emerald: {
    bg: "bg-emerald-500/8",
    border: "border-emerald-500/20",
    text: "text-emerald-500",
    glow: "shadow-glow-emerald",
  },
  amber: {
    bg: "bg-amber-500/8",
    border: "border-amber-500/20",
    text: "text-amber-500",
    glow: "",
  },
  rose: {
    bg: "bg-rose-500/8",
    border: "border-rose-500/20",
    text: "text-rose-500",
    glow: "",
  },
};

const trendIcons = {
  improving: { Icon: TrendingUp, color: "text-emerald-500", label: "Improving" },
  declining: { Icon: TrendingDown, color: "text-rose-500", label: "Declining" },
  stable: { Icon: Minus, color: "text-muted-foreground", label: "Stable" },
};

export function ResultCard({
  title,
  value,
  subtitle,
  badge,
  badgeColor = "primary",
  trend,
  accent = "primary",
  large = false,
  className,
  children,
}: ResultCardProps) {
  const accentStyle = accentMap[accent];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "card-premium p-6",
        accentStyle.bg,
        accentStyle.border,
        "border",
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {trend && (
          <div className={cn("flex items-center gap-1 text-xs font-medium", trendIcons[trend].color)}>
            {(() => { const { Icon, label } = trendIcons[trend]; return <><Icon className="h-3.5 w-3.5" />{label}</>; })()}
          </div>
        )}
      </div>

      <div className={cn("font-black tracking-tight text-foreground", large ? "text-5xl" : "text-3xl")}>
        {value}
      </div>

      {subtitle && (
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      )}

      {badge && (
        <div className="mt-3">
          <span className={cn(
            "badge-grade",
            `ring-${badgeColor}-500/20 bg-${badgeColor}-500/10 text-${badgeColor}-600 dark:text-${badgeColor}-400`
          )}>
            {badge}
          </span>
        </div>
      )}

      {children && <div className="mt-4">{children}</div>}
    </motion.div>
  );
}
