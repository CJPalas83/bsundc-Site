"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

/**
 * In-page section compass for the Tap-to-Shower page.
 *
 * Passive default: collapsed pill that shows the section currently in the
 * viewport's middle band. Label auto-updates via IntersectionObserver as
 * the user scrolls.
 *
 * Active (on click): pill expands into a vertical drawer of all sections.
 * Click an item to smooth-scroll there. Outside-click or Escape closes.
 *
 * Hidden until the user scrolls past the hero — keeps the hero clean and
 * the widget out of the way until it has something useful to track.
 */

interface SectionDef {
  id: string;
  label: string;
}

const sections: SectionDef[] = [
  { id: "problem", label: "The Challenge" },
  { id: "what-is-tts", label: "The Concept" },
  { id: "more-than-heater", label: "The Difference" },
  { id: "how-it-works", label: "How It Works" },
  { id: "who-its-for", label: "Who It's For" },
  { id: "features", label: "What to Know" },
  { id: "faq", label: "FAQ" },
  { id: "inquiry", label: "Enquiry" },
];

// Navbar + small buffer (58px navbar at md, plus ~22px breathing).
const SCROLL_OFFSET = 80;

export default function TapToShowerNav() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const widgetRef = useRef<HTMLElement>(null);

  // Track which section sits in the middle band of the viewport.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        // Pick the entry with the highest intersection ratio — most visible.
        const top = visible.reduce((best, e) =>
          e.intersectionRatio > best.intersectionRatio ? e : best,
        );
        setActiveId(top.target.id);
      },
      {
        // Active when a section crosses the middle 20% of the viewport.
        // Negative rootMargin trims the active zone away from the edges.
        rootMargin: "-40% 0% -40% 0%",
        threshold: [0, 0.1, 0.5, 1],
      },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Escape closes drawer.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  // Outside click closes drawer.
  useEffect(() => {
    if (!isOpen) return;
    const onMouseDown = (e: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [isOpen]);

  const handleSelect = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const isVisible = activeId !== null;
  const activeIndex = sections.findIndex((s) => s.id === activeId);
  const activeLabel = activeIndex >= 0 ? sections[activeIndex].label : "";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          ref={widgetRef}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          aria-label="Tap-to-Shower section navigation"
          className="fixed z-20 left-4 bottom-6 md:left-8 md:bottom-8"
        >
          <AnimatePresence mode="wait" initial={false}>
            {!isOpen ? (
              <motion.button
                key="pill"
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label={`Currently viewing: ${activeLabel}. Tap to open section menu.`}
                aria-expanded={false}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="group flex items-center gap-2.5 px-4 py-2.5 bg-bg-main/90 backdrop-blur-sm border border-text-main/10 shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-accent shrink-0"
                  aria-hidden="true"
                />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeId}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="font-body text-[11px] font-medium uppercase tracking-[0.18em] text-text-main whitespace-nowrap"
                  >
                    {activeLabel}
                  </motion.span>
                </AnimatePresence>
                <ChevronUp
                  className="w-3 h-3 text-text-body/60 group-hover:text-accent transition-colors duration-300 shrink-0"
                  aria-hidden="true"
                />
              </motion.button>
            ) : (
              <motion.div
                key="drawer"
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                role="menu"
                aria-label="Page sections"
                className="w-56 bg-bg-main/95 backdrop-blur-md border border-text-main/10 shadow-lg"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-text-main/5">
                  <span className="font-body text-[10px] uppercase tracking-[0.2em] text-text-body/60">
                    On This Page
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close section menu"
                    className="text-text-body/60 hover:text-text-main transition-colors duration-200 cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <ul className="py-1">
                  {sections.map((s) => {
                    const isActive = s.id === activeId;
                    return (
                      <li key={s.id}>
                        <button
                          type="button"
                          onClick={() => handleSelect(s.id)}
                          role="menuitem"
                          className={`w-full text-left flex items-center gap-3 px-4 py-2.5 font-body text-xs transition-colors duration-200 cursor-pointer ${
                            isActive
                              ? "text-accent"
                              : "text-text-main/80 hover:text-accent hover:bg-accent/[0.03]"
                          }`}
                        >
                          <span
                            className={`w-1 h-1 rounded-full shrink-0 transition-colors duration-200 ${
                              isActive ? "bg-accent" : "bg-text-main/20"
                            }`}
                            aria-hidden="true"
                          />
                          {s.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
