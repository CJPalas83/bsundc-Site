"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const navLinks = [
  {
    label: "Tap-to-Shower™",
    href: "/tap-to-shower",
    items: [
      { label: "Overview", href: "/tap-to-shower" },
      { label: "Retailers & Distributors", href: "/for-your-project/retailers" },
      { label: "Developers & Builders", href: "/for-your-project/developers" },
      { label: "Architects & Specifiers", href: "/for-your-project/architects" },
      { label: "Homeowners", href: "/for-your-project/consumers" },
      { label: "Enquire", href: "/tap-to-shower#inquiry" },
    ],
  },
  {
    label: "Product Range",
    href: "/collections",
    items: [
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
  const [hovered, setHovered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSticky = scrolled || hovered || menuOpen;

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        isSticky
          ? "bg-white border-b border-text-main/10 shadow-sm"
          : "bg-transparent border-b border-white/25"
      }`}
    >
      <div className="mx-auto max-w-400 flex items-center justify-between px-6 md:px-16 h-[50px] md:h-[64px]">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/images/bsc-logo.png"
            alt="BSC"
            className={`h-9 md:h-11 w-auto object-contain transition-all duration-300 ${
              isSticky ? "filter-none" : "brightness-0 invert"
            }`}
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <div
              key={link.label}
              className="relative py-5"
              onMouseEnter={() => link.items && setActiveDropdown(link.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {link.items ? (
                <Link
                  href={link.href}
                  className={`flex items-center gap-2 font-body text-[14px] md:text-[15px] font-bold uppercase tracking-[0.06em] transition-colors duration-200 ${
                    isSticky ? "text-text-main hover:text-accent" : "text-white hover:text-white/80"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      activeDropdown === link.label ? "rotate-180" : ""
                    } ${isSticky ? "text-text-main" : "text-white"}`}
                  />
                </Link>
              ) : (
                <a
                  href={link.href}
                  className={`flex items-center gap-2 font-body text-[14px] md:text-[15px] font-bold uppercase tracking-[0.06em] transition-colors duration-200 ${
                    isSticky ? "text-text-main hover:text-accent" : "text-white hover:text-white/80"
                  }`}
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
                    className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white border border-text-main/10 shadow-2xl overflow-hidden py-2"
                  >
                    {link.items.map((item, idx) => (
                      <motion.a
                        key={item.label}
                        href={item.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.04 + 0.05 }}
                        className="block px-6 py-3 font-body text-[13px] md:text-[14px] font-bold uppercase tracking-[0.06em] text-text-main/80 hover:text-accent hover:bg-accent/5 transition-all duration-200"
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
            className={`block h-px transition-all duration-300 ${
              isSticky ? "bg-text-main" : "bg-white"
            } ${menuOpen ? "w-5 rotate-45 translate-y-[3px]" : "w-5"}`}
          />
          <span
            className={`block h-px transition-all duration-300 ${
              isSticky ? "bg-text-main" : "bg-white"
            } ${menuOpen ? "w-5 -rotate-45 -translate-y-[3px]" : "w-4"}`}
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
        className="md:hidden overflow-hidden bg-white border-b border-text-main/10"
      >
        <div className="px-6 py-8 flex flex-col gap-6">
          {navLinks.map((link) => (
            <div key={link.label} className="flex flex-col">
              <div className="flex items-center justify-between">
                {link.items ? (
                  <button
                    onClick={() =>
                      setMobileExpanded(
                        mobileExpanded === link.label ? null : link.label,
                      )
                    }
                    className="font-body text-[14px] font-bold uppercase tracking-[0.06em] text-text-main transition-colors duration-200 flex items-center gap-2"
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-4 h-4 text-text-main/40 transition-transform duration-300 ${
                        mobileExpanded === link.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-body text-[14px] font-bold uppercase tracking-[0.06em] text-text-main transition-colors duration-200"
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
                    marginTop: mobileExpanded === link.label ? 16 : 0,
                    marginBottom: mobileExpanded === link.label ? 8 : 0,
                  }}
                  className="overflow-hidden flex flex-col gap-3 pl-4 border-l border-text-main/5"
                >
                  {link.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-body text-[13px] font-bold uppercase tracking-[0.06em] text-text-main/70 hover:text-accent transition-colors duration-200 py-1"
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
