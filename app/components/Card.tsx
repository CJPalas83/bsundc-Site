"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "default" | "alt" | "accent";
  hoverable?: boolean;
  noBorder?: boolean;
}

export default function Card({
  children,
  variant = "default",
  hoverable = true,
  noBorder = false,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "p-6 transition-all duration-200 ease-out",
        // Background variant
        variant === "default" && "bg-surface",
        variant === "alt" && "bg-surface-alt",
        variant === "accent" && "bg-bg-feature",
        // Border
        !noBorder && "border border-line",
        // Hover effects
        hoverable && "hover:border-line-hover hover:-translate-y-0.5 hover:shadow-card-hover",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
