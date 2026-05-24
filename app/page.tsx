"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import SectionWrapper from "./components/SectionWrapper";
import Overline from "./components/Overline";
import Footer from "./components/Footer";

/* ==============================
   ANIMATION VARIANTS
   ============================== */
const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ==============================
   DATA
   ============================== */
const featuredCollections = [
  {
    href: "/tap-to-shower",
    image: "/images/webp_1200/tts-chrome.webp",
    overline: "Flagship",
    title: "Tap-to-Shower™",
  },
  {
    href: "/collections/s2",
    image: "/images/carousel/s2.png",
    overline: "Residential",
    title: "S2 Collection",
  },
  {
    href: "/collections/bathroom",
    image: "/images/carousel/bathroom.png",
    overline: "Bathroom Ceramics",
    title: "Bathroom Collection",
  },
];

/* ==============================
   PAGE
   ============================== */
export default function Home() {
  return (
    <>
      <Navbar />

      {/* ===== 1. VIDEO HERO ===== */}
      <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-text-main">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/webp_1920/tts-chrome-mattblack-1.webp"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/tts-hero.mp4" type="video/mp4" />
        </video>

        {/* Subtle gradient overlay for caption legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Caption — editorial bottom-left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-x-0 bottom-0 px-6 md:px-16 pb-12 md:pb-20"
        >
          <div className="mx-auto max-w-[1600px]">
            <p className="font-body text-text-white/95 text-lg md:text-[21px] leading-snug tracking-tight max-w-xl">
              Engineered in Germany and Denmark.
            </p>
          </div>
        </motion.div>

        {/* Vertical hairline label */}
        <span className="hidden lg:block vertical-text absolute right-8 bottom-12 font-body text-[10px] uppercase tracking-[0.3em] text-text-white/40">
          Flagship / Tap-to-Shower
        </span>
      </section>

      {/* ===== 2. FEATURED COLLECTIONS (TRIPTYCH) ===== */}
      <SectionWrapper
        id="collections"
        className="bg-bg-feature border-t border-text-main/10"
      >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <Overline withLine className="mb-6">
              Product Lines
            </Overline>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-text-main">
              The <em className="text-accent">Collections</em>
            </h2>
            <p className="font-body text-sm md:text-base text-text-body/70 max-w-sm leading-relaxed">
              Engineering precision across bathroom, kitchen, and retrofit
              shower lines.
            </p>
          </motion.div>
        </motion.div>

        {/* Triptych */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10"
        >
          {featuredCollections.map((c) => (
            <motion.div key={c.href} variants={fadeUp}>
              <Link
                href={c.href}
                className="group block bg-bg-main border border-text-main/10 overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-shadow duration-500"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-bg-feature">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6 md:p-7">
                  <Overline className="mb-3">{c.overline}</Overline>
                  <h3 className="font-heading text-xl md:text-2xl text-text-main group-hover:text-accent transition-colors duration-300">
                    {c.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* See more */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="border-t border-text-main/10 pt-6"
        >
          <Link
            href="/collections/kitchen"
            className="group inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-[0.2em] text-accent hover:gap-3 transition-all duration-200"
          >
            See all collections
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </motion.div>
      </SectionWrapper>

      {/* ===== 3. AUDIENCE PATHS — moved to last per pivot ===== */}
      <section className="px-6 md:px-16 py-20 md:py-28 border-t border-text-main/10">
        <div className="mx-auto max-w-[1600px]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mb-12"
          >
            <motion.div variants={fadeUp}>
              <Overline withLine className="mb-6">
                Find Your Path
              </Overline>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-4xl md:text-5xl lg:text-6xl tracking-tight text-text-main"
            >
              Who We <em className="text-accent">Serve</em>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="flex flex-col gap-3 lg:gap-4"
          >
            {/* RETAILER */}
            <motion.div variants={fadeUp}>
              <Link
                href="/for-your-project/retailers"
                className="group block bg-bg-main border-2 border-accent/40 hover:border-accent p-6 md:p-8 transition-colors duration-200"
              >
                <div className="flex items-baseline justify-between mb-3 gap-4">
                  <h3 className="font-heading text-2xl md:text-3xl text-text-main">
                    Retailers and Distributors
                  </h3>
                  <span className="font-body text-[10px] uppercase tracking-[0.25em] text-accent shrink-0">
                    Trade
                  </span>
                </div>
                <p className="font-body text-sm text-text-body italic mb-5">
                  For shelves that don&apos;t need explaining.
                </p>
                <p className="font-body text-xs text-text-body/70 mb-5">
                  Verified warranty terms. Ready packaging. No assembly, no
                  staff training.
                </p>
                <span className="inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-[0.2em] text-accent group-hover:gap-3 transition-all duration-200">
                  Ask About Retail Packages
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </span>
              </Link>
            </motion.div>

            {/* DEVELOPER */}
            <motion.div variants={fadeUp}>
              <Link
                href="/for-your-project/developers"
                className="group block bg-bg-main border border-text-main/15 hover:border-accent/50 p-5 md:p-6 transition-colors duration-200"
              >
                <div className="flex items-baseline justify-between mb-2 gap-4">
                  <h3 className="font-heading text-xl md:text-2xl text-text-main">
                    Developers and Builders
                  </h3>
                  <span className="font-body text-[10px] uppercase tracking-[0.25em] text-text-body/50 shrink-0">
                    Project
                  </span>
                </div>
                <p className="font-body text-sm text-text-body italic mb-3">
                  For projects that already have enough variables.
                </p>
                <p className="font-body text-sm text-text-body/85 mb-4 leading-relaxed">
                  Bathroom and kitchen systems specifiable without redesign or
                  plumbing rework. Single-line retrofit available for
                  cold-water markets.
                </p>
                <span className="inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-[0.2em] text-accent group-hover:gap-3 transition-all duration-200">
                  Ask About Project Solutions
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </span>
              </Link>
            </motion.div>

            {/* ARCHITECT */}
            <motion.div variants={fadeUp}>
              <Link
                href="/for-your-project/architects"
                className="group block bg-bg-main border border-text-main/15 hover:border-accent/50 p-4 md:p-5 transition-colors duration-200"
              >
                <div className="flex items-baseline justify-between mb-2 gap-4">
                  <h3 className="font-heading text-lg md:text-xl text-text-main">
                    Architects and Specifiers
                  </h3>
                  <span className="font-body text-[10px] uppercase tracking-[0.25em] text-text-body/50 shrink-0">
                    Spec
                  </span>
                </div>
                <p className="font-body text-sm text-text-body italic mb-2">
                  For documents that go straight in.
                </p>
                <p className="font-body text-sm text-text-body/85 mb-3 leading-relaxed">
                  Full datasheets, dimensional drawings, CAD and BIM files.
                  Compatible water heaters may be supplied with CB
                  certification according to IEC 60335-2-35, subject to model
                  and market.
                </p>
                <span className="inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-[0.2em] text-accent group-hover:gap-3 transition-all duration-200">
                  Request Specification Support
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </span>
              </Link>
            </motion.div>

            {/* HOMEOWNER */}
            <motion.div variants={fadeUp}>
              <Link
                href="/for-your-project/consumers"
                className="group block bg-bg-alt border border-text-main/10 hover:border-accent/40 p-4 transition-colors duration-200"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-heading text-base md:text-lg text-text-main">
                      Homeowners
                    </h3>
                    <p className="font-body text-xs text-text-body italic">
                      For your own bathroom or kitchen.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 font-body text-[10px] font-medium uppercase tracking-[0.2em] text-accent shrink-0 group-hover:gap-2 transition-all duration-200">
                    Request Information
                    <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
