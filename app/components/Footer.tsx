"use client";

import Link from "next/link";
import React from "react";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Request Information", href: "/tap-to-shower#inquiry" },
  { label: "Privacy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="bg-text-main text-bg-main border-t border-bg-main/10">
      <div className="mx-auto max-w-[1600px] px-6 md:px-16 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo & tagline */}
          <div>
            <Link
              href="/"
              className="inline-block"
            >
              <img 
                src="/images/BSC%20Background%20Removed.png" 
                alt="BSC" 
                className="h-8 md:h-10 w-auto object-contain brightness-0 invert" 
              />
            </Link>
            {/* [CJ] — Tagline corrected: BSC = Bathroom and Kitchen Solutions.
                 Previous "Bathroom · Sanitary · Construction" was wrong on every page. */}
            <p className="font-body text-[10px] uppercase tracking-[0.25em] text-bg-main/40 mt-2">
              Bathroom and Kitchen Solutions
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
            {/* Links */}
            <div className="flex flex-wrap gap-6 md:gap-10">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-body text-xs font-medium uppercase tracking-[0.2em] text-bg-main/80 hover:text-accent transition-colors duration-500"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-bg-main/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="font-body text-[10px] text-bg-main/30 tracking-wider">
            © {new Date().getFullYear()} BSC. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="mailto:info@bsundc.com"
              className="font-body text-[10px] text-bg-main/30 hover:text-accent transition-colors duration-500 tracking-wider"
            >
              info@bsundc.com
            </Link>
          </div>
        </div>
      </div>
    </footer>

  );
}
