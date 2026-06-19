"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProgressRingProps {
  value: number;      // 0-100
  size?: number;      // SVG size in px
  strokeWidth?: number;
  color?: string;     // CSS color
  trackColor?: string;
  label?: string;
  sublabel?: string;
  animate?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function ProgressRing({
  value,
  size = 160,
  strokeWidth = 12,
  color = "#4F46E5",
  trackColor,
  label,
  sublabel,
  animate = true,
  className,
  children,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(100, Math.max(0, value));
  const offset = circumference - (clampedValue / 100) * circumference;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="progress-ring-svg"
        aria-label={`Progress: ${clampedValue.toFixed(1)}%`}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={trackColor ?? "hsl(var(--border))"}
          fill="none"
          strokeLinecap="round"
        />
        {/* Progress */}
        {animate ? (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={color}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: [0.34, 1.56, 0.64, 1] }}
          />
        ) : (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            stroke={color}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        )}
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children ?? (
          <>
            {label && (
              <span className="text-2xl font-bold text-foreground">{label}</span>
            )}
            {sublabel && (
              <span className="text-xs text-muted-foreground mt-0.5">{sublabel}</span>
            )}
          </>
        )}
      </div>
    </div>
  );
}
