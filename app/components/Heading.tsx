"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type HeadingLevel = "h1" | "h2" | "h3" | "h4";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: HeadingLevel;
  as?: HeadingLevel | "p";
  children: React.ReactNode;
}

export default function Heading({
  level = "h2",
  as,
  children,
  className,
  ...props
}: HeadingProps) {
  const Component = as || level;

  const levelClasses: Record<HeadingLevel, string> = {
    h1: "type-h1 font-heading font-medium tracking-tight text-ink",
    h2: "type-h2 font-heading font-medium tracking-tight text-ink",
    h3: "type-h3 font-heading font-medium tracking-tight text-ink",
    h4: "font-heading font-medium text-base uppercase tracking-wider text-ink",
  };

  return (
    <Component
      className={cn(levelClasses[level], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
