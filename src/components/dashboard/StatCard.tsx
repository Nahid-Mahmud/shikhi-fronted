"use strict";

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  color?: string;
}

const colorMap: Record<string, { bg: string; text: string; bgSoft: string }> = {
  primary: { bg: "bg-primary", text: "text-primary", bgSoft: "bg-primary/10" },
  blue: { bg: "bg-blue-500", text: "text-blue-500", bgSoft: "bg-blue-500/10" },
  green: { bg: "bg-emerald-500", text: "text-emerald-500", bgSoft: "bg-emerald-500/10" },
  purple: { bg: "bg-purple-500", text: "text-purple-500", bgSoft: "bg-purple-500/10" },
  orange: { bg: "bg-orange-500", text: "text-orange-500", bgSoft: "bg-orange-500/10" },
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  className,
  color = "primary",
}) => {
  const colors = colorMap[color] || colorMap.primary;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        className,
      )}
    >
      {/* Background Decor */}
      <div
        className={cn(
          "absolute -right-4 -top-4 h-24 w-24 rounded-full transition-transform duration-500 group-hover:scale-125",
          colors.bgSoft,
        )}
      />

      <div className="flex items-center justify-between">
        <div className="z-10">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="mt-1 flex items-baseline gap-2">
            <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
          </div>

          {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}

          {trend && (
            <div
              className={cn(
                "mt-2 flex items-center gap-1 text-xs font-semibold",
                trend.isPositive ? "text-emerald-500" : "text-rose-500",
              )}
            >
              <span>
                {trend.isPositive ? "+" : "-"}
                {trend.value}%
              </span>
              <span className="text-muted-foreground font-normal ml-1">vs last month</span>
            </div>
          )}
        </div>

        <div
          className={cn(
            "z-10 flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-300",
            colors.bgSoft,
            colors.text,
          )}
        >
          <Icon className="h-7 w-7" />
        </div>
      </div>
    </div>
  );
};
