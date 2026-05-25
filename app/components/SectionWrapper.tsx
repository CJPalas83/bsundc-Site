"use client";

import React from "react";
import { motion } from "framer-motion";

type Rhythm = "hero" | "primary" | "secondary";

interface SectionWrapperProps {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
  id?: string;
  noPadding?: boolean;
  pt?: string;
  pb?: string;
  /** Deliberate section rhythm per the design north star. Overrides pt/pb when set. */
  rhythm?: Rhythm;
}

// Desktop-tightened rhythm (2026-05-25 recalibration). Mobile floors kept ample.
const rhythmClasses: Record<Rhythm, { pt: string; pb: string }> = {
  hero: { pt: "pt-14 md:pt-20", pb: "pb-12 md:pb-16" },
  primary: { pt: "pt-12 md:pt-18", pb: "pb-12 md:pb-18" },
  secondary: { pt: "pt-10 md:pt-14", pb: "pb-10 md:pb-14" },
};

export default function SectionWrapper({
  children,
  dark = false,
  className = "",
  id,
  noPadding = false,
  pt,
  pb,
  rhythm,
}: SectionWrapperProps) {
  const rhythmPt = rhythm ? rhythmClasses[rhythm].pt : pt || "pt-14 md:pt-20";
  const rhythmPb = rhythm ? rhythmClasses[rhythm].pb : pb || "pb-14 md:pb-20";
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`
        ${dark ? "bg-text-main text-bg-main" : "bg-bg-main text-text-main"}
        ${noPadding ? "" : `px-6 md:px-16 ${rhythmPt} ${rhythmPb}`}
        ${className}
      `}
    >
      <div className="mx-auto max-w-[1600px]">{children}</div>
    </motion.section>
  );
}
