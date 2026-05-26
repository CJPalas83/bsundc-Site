"use client";

import React from "react";
import Image from "next/image";

interface EditorialImageProps {
  src: string;
  alt: string;
  aspect?: "3/4" | "4/5" | "16/9" | "1/1" | "5/6";
  className?: string;
  priority?: boolean;
}

export default function EditorialImage({
  src,
  alt,
  aspect = "3/4",
  className = "",
  priority = false,
}: EditorialImageProps) {
  const aspectClass: Record<string, string> = {
    "3/4": "aspect-[3/4]",
    "4/5": "aspect-[4/5]",
    "16/9": "aspect-[16/9]",
    "1/1": "aspect-square",
    "5/6": "aspect-[5/6]",
  };

  return (
    <div
      className={`group relative overflow-hidden ${aspectClass[aspect]} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-105"
      />
      {/* Inner border */}
      <div
        className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] transition-shadow duration-300 group-hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]"
        aria-hidden="true"
      />
    </div>
  );
}
