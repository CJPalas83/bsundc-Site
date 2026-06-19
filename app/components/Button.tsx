"use client";

import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { trackEvent } from "../../lib/analytics";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ButtonVariant = "primary" | "secondary" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Use on dark backgrounds (charcoal, image overlays) to flip border/text to white */
  onDark?: boolean;
  /** @deprecated Use `onDark` instead */
  inverse?: boolean;
  /** Append an arrow icon after children */
  withArrow?: boolean;
  /** Analytics tracking event payload */
  trackingEvent?: { name: string; properties?: Record<string, string | number | boolean | null> };
  children: React.ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-6 text-[10px]",
  md: "h-12 px-8 text-xs",
  lg: "h-14 px-10 text-xs",
};

export default function Button({
  variant = "primary",
  size = "md",
  onDark = false,
  inverse = false,
  withArrow = false,
  trackingEvent,
  children,
  className = "",
  ...props
}: ButtonProps) {
  // Consolidate: onDark takes precedence, inverse is legacy alias
  const dark = onDark || inverse;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (trackingEvent) {
      trackEvent(trackingEvent.name, trackingEvent.properties);
    }
    if (props.onClick) {
      props.onClick(e);
    }
  };

  const baseClasses =
    "relative inline-flex items-center justify-center font-body font-medium uppercase tracking-[0.2em] transition-all duration-200 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text-main disabled:opacity-50 disabled:pointer-events-none";

  const arrowIcon = withArrow ? (
    <svg
      className="w-4 h-4 ml-3 transition-transform duration-200 group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  ) : null;

  if (variant === "link") {
    return (
      <button
        className={cn(
          "font-body text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-200 cursor-pointer focus-visible:outline-none",
          dark ? "text-bg-main hover:text-accent" : "text-text-main hover:text-accent",
          className
        )}
        {...props}
        onClick={handleClick}
      >
        {children}
        {arrowIcon}
      </button>
    );
  }

  if (variant === "secondary") {
    return (
      <button
        className={cn(
          baseClasses,
          sizeClasses[size],
          dark
            ? "border border-bg-main bg-transparent text-bg-main hover:bg-bg-main hover:text-text-main"
            : "border border-text-main bg-transparent text-text-main hover:bg-text-main hover:text-bg-main",
          className
        )}
        {...props}
        onClick={handleClick}
      >
        {children}
        {arrowIcon}
      </button>
    );
  }

  // Primary — with accent slide animation
  return (
    <button
      className={cn(
        "group overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.25)] bg-accent text-bg-main",
        dark && "hover:text-text-main",
        baseClasses,
        sizeClasses[size],
        className
      )}
      {...props}
      onClick={handleClick}
    >
      {/* Accent overlay slides from left */}
      <span
        className={cn(
          "absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]",
          dark ? "bg-bg-main" : "bg-text-main"
        )}
        aria-hidden="true"
      />
      <span className="relative z-10 inline-flex items-center">
        {children}
        {arrowIcon}
      </span>
    </button>
  );
}
