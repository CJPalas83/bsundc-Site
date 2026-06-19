import React from "react";

interface OverlineProps {
  children: React.ReactNode;
  withLine?: boolean;
  className?: string;
  dark?: boolean;
}

export default function Overline({
  children,
  withLine = false,
  className = "",
  dark = false,
}: OverlineProps) {
  return (
    <div
      className={`flex items-center gap-4 ${className}`}
    >
      {withLine && (
        <div
          className={`h-px w-8 md:w-12 ${
            dark ? "bg-bg-main/40" : "bg-text-main/30"
          }`}
          aria-hidden="true"
        />
      )}
      <span
        className={`font-body text-[11px] md:text-[12px] font-medium uppercase tracking-[0.10em] ${
          dark ? "text-bg-main/60" : "text-text-body/70"
        }`}
      >
        {children}
      </span>

    </div>
  );
}
