"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FormFieldProps {
  label: string;
  id?: string;
  name?: string;
  type?: "text" | "email" | "tel" | "select" | "textarea";
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  options?: { value: string; label: string }[];
  rows?: number;
  disabled?: boolean;
  error?: string;
  className?: string;
  selectPlaceholder?: string;
}

export default function FormField({
  label,
  id,
  name,
  type = "text",
  placeholder,
  required = false,
  defaultValue,
  value,
  onChange,
  options = [],
  rows = 5,
  disabled = false,
  error,
  className,
  selectPlaceholder = "Select an option",
}: FormFieldProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
  
  const commonClasses = cn(
    "w-full bg-surface-alt border border-line px-5 py-4 font-body text-sm text-ink focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all",
    error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
    disabled && "opacity-50 cursor-not-allowed"
  );

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <label
        htmlFor={inputId}
        className="block font-body text-xs font-medium uppercase tracking-[0.15em] text-ink"
      >
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          id={inputId}
          name={name}
          rows={rows}
          required={required}
          className={cn(commonClasses, "resize-y")}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange as any}
          disabled={disabled}
        />
      ) : type === "select" ? (
        <select
          id={inputId}
          name={name}
          required={required}
          className={cn(commonClasses, "appearance-none bg-no-repeat bg-[right_1.25rem_center] pr-10 hover:cursor-pointer")}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%232F2F2F' stroke-width='1.5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5'/%3E%3C/svg%3E")`,
            backgroundSize: "1rem"
          }}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange as any}
          disabled={disabled}
        >
          {selectPlaceholder && (
            <option value="" disabled>
              {selectPlaceholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={inputId}
          name={name}
          type={type}
          required={required}
          className={commonClasses}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange as any}
          disabled={disabled}
        />
      )}

      {error && (
        <span className="font-body text-xs text-red-600 mt-1">
          {error}
        </span>
      )}
    </div>
  );
}
