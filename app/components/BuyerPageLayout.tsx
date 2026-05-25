"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SectionWrapper from "./SectionWrapper";
import EditorialImage from "./EditorialImage";
import Overline from "./Overline";
import Button from "./Button";

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const revealImage: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const, delay: 0.2 },
  },
};

export interface BuyerPageProps {
  overline: string;
  h1: string;
  /** Optional substring of h1 to wrap in the accent color. Must appear in h1. */
  h1Accent?: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  image?: string;
  imageAlt?: string;
}

function renderH1(h1: string, accent?: string): React.ReactNode {
  if (!accent) return h1;
  const idx = h1.indexOf(accent);
  if (idx === -1) return h1;
  return (
    <>
      {h1.slice(0, idx)}
      <em className="text-accent">{accent}</em>
      {h1.slice(idx + accent.length)}
    </>
  );
}

export default function BuyerPageLayout({
  overline,
  h1,
  h1Accent,
  bullets,
  ctaLabel,
  ctaHref,
  image,
  imageAlt,
}: BuyerPageProps) {
  return (
    <>
      <Navbar />

      <main className="bg-bg-main min-h-screen pt-16 lg:pt-20">
        {/* ===== HERO ===== */}
        <SectionWrapper rhythm="hero">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            {/* Left — copy (~60%) */}
            <div className="lg:col-span-7">
              <motion.div variants={fadeUp}>
                <Overline withLine className="mb-6">{overline}</Overline>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-heading text-3xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-8 text-text-main"
              >
                {renderH1(h1, h1Accent)}
              </motion.h1>

              <motion.ul variants={fadeUp} className="space-y-4 mb-10 measure-body">
                {bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="block w-1.5 h-1.5 mt-2.5 bg-accent shrink-0" />
                    <span className="font-body text-base md:text-lg text-text-body leading-relaxed">
                      {bullet}
                    </span>
                  </li>
                ))}
              </motion.ul>

              <motion.div variants={fadeUp}>
                <Link href={ctaHref} className="inline-flex">
                  <Button variant="primary" size="lg">{ctaLabel}</Button>
                </Link>
              </motion.div>
            </div>

            {/* Right — image / placeholder (~40%) */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={revealImage}
              className="lg:col-span-5"
            >
              {image ? (
                <EditorialImage
                  src={image}
                  alt={imageAlt || h1}
                  aspect="4/5"
                  className="object-cover rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                />
              ) : (
                <div className="aspect-4/5 bg-bg-alt border border-text-main/10 flex items-center justify-center">
                  <span className="font-body text-[10px] uppercase tracking-[0.3em] text-text-body/40">
                    Image to follow
                  </span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </SectionWrapper>

        {/* ===== SYSTEM CONTEXT ===== */}
        <SectionWrapper className="bg-bg-alt border-t border-text-main/10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-body text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
              Part of the Tap-to-Shower™ system
            </p>
            <h2 className="font-heading text-2xl md:text-3xl tracking-tight text-text-main mb-6">
              One single-line hot &amp; cold shower upgrade.
            </h2>
            <Link href="/tap-to-shower" className="inline-flex">
              <Button variant="secondary" size="lg">How It Works</Button>
            </Link>
          </div>
        </SectionWrapper>
      </main>

      <Footer />
    </>
  );
}
