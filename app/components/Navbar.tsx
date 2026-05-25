"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const navLinks = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "For Your Project",
    href: "/for-your-project/retailers",
    items: [
      { label: "Retailers & Distributors", href: "/for-your-project/retailers" },
      { label: "Developers & Builders", href: "/for-your-project/developers" },
      { label: "Architects & Specifiers", href: "/for-your-project/architects" },
      { label: "End Consumers / Homeowners", href: "/for-your-project/consumers" },
    ],
  },
  {
    label: "Product Range",
    href: "/collections",
    items: [
      { label: "Tap-to-Shower™", href: "/tap-to-shower" },
      { label: "S2 Collection", href: "/collections/s2" },
      { label: "SUS Collection", href: "/collections/sus" },
      { label: "LINE Collection", href: "/collections/line" },
      { label: "Shower Collection", href: "/collections/shower" },
      { label: "Kitchen Collection", href: "/collections/kitchen" },
      { label: "Self Closing Taps", href: "/collections/self-closing" },
      { label: "Sensor Collection", href: "/collections/sensor" },
      { label: "Bathroom Collection", href: "/collections/bathroom" },
      { label: "Furniture Collection", href: "/collections/furniture" },
      { label: "Bidet Spray Collection", href: "/collections/bidet-spray" },
      { label: "Fittings Collection", href: "/collections/fittings" },
    ],
  },
  {
    label: "About BS&C",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-700 ${
        scrolled
          ? "bg-bg-main/95 backdrop-blur-sm border-b border-text-main/10"
          : "bg-bg-main/40 backdrop-blur-md border-b border-text-main/5"
      }`}
    >
      <div className="mx-auto max-w-400 flex items-center justify-between px-6 md:px-16 h-14 md:h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center"
        >
          <img
            src="/images/bsc-logo.png"
            alt="BSC"
            className="h-8 md:h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative py-4"
              onMouseEnter={() => link.items && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {link.items ? (
                <span className="flex items-center gap-1.5 font-body text-[12px] font-medium uppercase tracking-[0.18em] text-text-main hover:text-accent transition-colors duration-500 cursor-default select-none">
                  {link.label}
                  <ChevronDown
                    className={`w-3 h-3 transition-transform duration-500 ${activeDropdown === link.label ? "rotate-180" : ""}`}
                  />
                </span>
              ) : (
                <a
                  href={link.href}
                  className="flex items-center gap-1.5 font-body text-[12px] font-medium uppercase tracking-[0.18em] text-text-main hover:text-accent transition-colors duration-500"
                >
                  {link.label}
                </a>
              )}

              {/* Dropdown Menu */}
              <AnimatePresence>
                {link.items && activeDropdown === link.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-bg-main/95 backdrop-blur-md border border-text-main/5 shadow-2xl overflow-hidden py-2"
                  >
                    {link.items.map((item, idx) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 + 0.1 }}
                        className="block px-6 py-3 font-body text-[10px] font-medium uppercase tracking-[0.15em] text-text-main/70 hover:text-accent hover:bg-accent/5 transition-all duration-300"
                      >
                        {item.label}
                      </motion.a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] items-end cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block h-px bg-text-main transition-all duration-500 ${
              menuOpen ? "w-5 rotate-45 translate-y-[3px]" : "w-5"
            }`}
          />
          <span
            className={`block h-px bg-text-main transition-all duration-500 ${
              menuOpen ? "w-5 -rotate-45 -translate-y-[3px]" : "w-4"
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{
          height: menuOpen ? "auto" : 0,
          opacity: menuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="md:hidden overflow-hidden bg-bg-main border-b border-text-main/10"
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <div key={link.label} className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                {link.items ? (
                  <button
                    onClick={() =>
                      setMobileExpanded(
                        mobileExpanded === link.label ? null : link.label,
                      )
                    }
                    className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-text-main transition-colors duration-500 flex items-center gap-2"
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-4 h-4 text-text-main/40 transition-transform duration-500 ${mobileExpanded === link.label ? "rotate-180" : ""}`}
                    />
                  </button>
                ) : (
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-text-main transition-colors duration-500"
                  >
                    {link.label}
                  </a>
                )}
              </div>

              {/* Mobile sub-links */}
              {link.items && (
                <motion.div
                  initial={false}
                  animate={{
                    height: mobileExpanded === link.label ? "auto" : 0,
                    opacity: mobileExpanded === link.label ? 1 : 0,
                    marginBottom: mobileExpanded === link.label ? 8 : 0,
                  }}
                  className="overflow-hidden flex flex-col gap-3 pl-4 border-l border-text-main/5"
                >
                  {link.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-body text-[10px] font-medium uppercase tracking-[0.15em] text-text-main/60 hover:text-accent transition-colors duration-300 py-1"
                    >
                      {item.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
