
import React from "react";
import { cn } from "@/lib/utils";

interface ProgressIndicatorProps {
  value: number;
  max: number;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  indicatorClassName?: string;
}

export const ProgressIndicator = ({
  value,
  max,
  showValue = true,
  size = "md",
  className,
  indicatorClassName,
}: ProgressIndicatorProps) => {
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className={cn(
        "relative overflow-hidden rounded-full bg-secondary",
        size === "sm" && "h-1",
        size === "md" && "h-2",
        size === "lg" && "h-3",
        "flex-1"
      )}>
        <div
          className={cn(
            "h-full rounded-full bg-primary transition-all duration-300 ease-bounce-ease",
            indicatorClassName
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showValue && (
        <span className="text-xs font-medium tabular-nums">
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  );
};
