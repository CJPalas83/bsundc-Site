"use client";

import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
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
    image: "/images/TTS%20Triptych.jpg",
    overline: "Flagship",
    title: "Tap-to-Shower™",
  },
  {
    href: "/collections/s2",
    image: "/images/S2TripTych.png",
    overline: "Residential",
    title: "S2 Collection",
  },
];

const buyerTiles = [
  {
    href: "/for-your-project/retailers",
    tag: "Trade",
    title: "Retailers and Distributors",
    tagline: "For shelves that don’t need explaining.",
    body: "Verified warranty terms. Ready packaging. No assembly, no staff training.",
    cta: "Ask About Retail Packages",
  },
  {
    href: "/for-your-project/developers",
    tag: "Project",
    title: "Developers and Builders",
    tagline: "For projects that already have enough variables.",
    body: "Bathroom and kitchen systems specifiable without redesign or plumbing rework.",
    cta: "Ask About Project Solutions",
  },
  {
    href: "/for-your-project/architects",
    tag: "Spec",
    title: "Architects and Specifiers",
    tagline: "For documents that go straight in.",
    body: "Full datasheets, dimensional drawings, CAD and BIM files.",
    cta: "Request Specification Support",
  },
  {
    href: "/for-your-project/consumers",
    tag: "Home",
    title: "Homeowners",
    tagline: "For your own bathroom or kitchen.",
    body: "Hot and cold shower comfort without a full bathroom renovation.",
    cta: "Request Information",
  },
];

/* ==============================
   MOBILE CAROUSELS
   Vertical scroll drives a horizontal track. Each carousel sits in a
   tall (~200vh) section with a sticky pin near the navbar; useScroll
   maps section progress to translateX on the track.
   ============================== */

function CollectionsMobile() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = featuredCollections.length + 1; // plus placeholder

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  };

  return (
    <section className="md:hidden relative bg-bg-feature border-t border-text-main/10 py-10">
      <div className="flex flex-col">
        {/* Heading */}
        <div className="px-6 pb-6">
          <Overline withLine className="mb-3">Product Lines</Overline>
          <h2 className="font-heading text-2xl tracking-tight text-text-main">
            The <em className="text-accent">Collections</em>
          </h2>
        </div>

        {/* Carousel */}
        <div className="relative px-6 pb-6">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredCollections.map((c) => (
                <div
                  key={c.href}
                  className="w-full shrink-0 flex flex-col gap-3"
                >
                  <Link
                    href={c.href}
                    className="flex-1 flex flex-col bg-bg-main border border-text-main/10 overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-shadow duration-200"
                  >
                    <div className="relative aspect-square w-full bg-bg-feature overflow-hidden">
                      <Image
                        src={c.image}
                        alt={c.title}
                        fill
                        sizes="100vw"
                        className="object-contain"
                      />
                    </div>
                    <div className="p-4">
                      <Overline className="mb-1.5">{c.overline}</Overline>
                      <h3 className="font-heading text-base text-text-main">
                        {c.title}
                      </h3>
                    </div>
                  </Link>
                </div>
              ))}
              {/* Placeholder slot */}
              <div className="w-full shrink-0 flex flex-col gap-3">
                <div className="flex-1 flex flex-col bg-bg-main border border-text-main/5 overflow-hidden">
                  <div className="relative aspect-square w-full bg-bg-feature flex flex-col items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-text-main/5 flex items-center justify-center text-text-body/30">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                        />
                      </svg>
                    </div>
                    <span className="font-body text-[9px] uppercase tracking-[0.2em] text-text-body/40">
                      Coming Soon
                    </span>
                  </div>
                  <div className="p-4">
                    <Overline className="mb-1.5">More to Follow</Overline>
                    <h3 className="font-heading text-base text-text-body/40">
                      Next Collection
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-8 top-[40%] -translate-y-1/2 p-2 bg-bg-main/70 backdrop-blur border border-text-main/10 rounded-full text-text-main shadow-sm hover:bg-bg-main transition-colors z-10 hover:cursor-pointer"
            aria-label="Previous collection"
          >
            <ChevronLeft className="w-5 h-5 " strokeWidth={1.5} />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-8 top-[40%] -translate-y-1/2 p-2 bg-bg-main/70 backdrop-blur border border-text-main/10 rounded-full text-text-main shadow-sm hover:bg-bg-main transition-colors z-10 hover:cursor-pointer"
            aria-label="Next collection"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Indicators */}
        <div className="px-6 pb-4 flex justify-center">
          <div className="flex justify-center gap-1.5">
            {Array.from({ length: totalItems }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "bg-accent scale-125" : "bg-text-main/20 hover:bg-text-main/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WhoWeServeMobile() {
  return (
    <section className="md:hidden relative border-t border-text-main/10 bg-bg-main py-10">
      <div className="flex flex-col">
        {/* Heading */}
        <div className="px-6 pb-6">
          <Overline withLine className="mb-3">Find Your Path</Overline>
          <h2 className="font-heading text-2xl tracking-tight text-text-main">
            Who We <em className="text-accent">Serve</em>
          </h2>
        </div>

        {/* Stacked Cards */}
        <div className="flex flex-col px-6 gap-4">
          {buyerTiles.map((t) => (
            <div key={t.href} className="w-full">
              <Link
                href={t.href}
                className="block bg-bg-main border border-text-main/15 hover:border-accent/50 transition-all duration-200 p-5"
              >
                <div className="flex items-baseline justify-between mb-2 gap-3">
                  <h3 className="font-heading text-lg text-text-main">
                    {t.title}
                  </h3>
                  <span className="font-body text-[10px] uppercase tracking-[0.25em] text-accent shrink-0">
                    {t.tag}
                  </span>
                </div>
                <p className="font-body text-sm text-text-body italic mb-3">
                  {t.tagline}
                </p>
                <p className="font-body text-xs text-text-body/70 mb-4">
                  {t.body}
                </p>
                <span className="inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-[0.2em] text-accent">
                  {t.cta}
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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

      {/* ===== 2. FEATURED COLLECTIONS — mobile carousel ===== */}
      <CollectionsMobile />

      {/* ===== 2. FEATURED COLLECTIONS (TRIPTYCH) — desktop ===== */}
      <SectionWrapper
        id="collections"
        rhythm="secondary"
        className="hidden md:block bg-bg-feature border-t border-text-main/10"
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
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8 md:mb-10"
          >
            <h2 className="font-heading text-3xl md:text-4xl leading-[1.05] tracking-tight text-text-main">
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
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8"
        >
          {featuredCollections.map((c) => (
            <motion.div key={c.href} variants={fadeUp}>
              <Link
                href={c.href}
                className="group block bg-bg-main border border-text-main/10 overflow-hidden hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] transition-shadow duration-200"
              >
                <div className="relative aspect-square overflow-hidden bg-bg-feature">
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <Overline className="mb-2">{c.overline}</Overline>
                  <h3 className="font-heading text-lg md:text-xl text-text-main group-hover:text-accent transition-colors duration-300">
                    {c.title}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Placeholder — third slot, no source asset yet */}
          <motion.div variants={fadeUp}>
            <div className="bg-bg-main border border-text-main/5 overflow-hidden">
              <div className="relative aspect-square bg-bg-feature flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-text-main/5 flex items-center justify-center text-text-body/30">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                    />
                  </svg>
                </div>
                <span className="font-body text-[9px] uppercase tracking-[0.2em] text-text-body/40">
                  Coming Soon
                </span>
              </div>
              <div className="p-5 md:p-6">
                <Overline className="mb-2">More to Follow</Overline>
                <h3 className="font-heading text-lg md:text-xl text-text-body/40">
                  Next Collection
                </h3>
              </div>
            </div>
          </motion.div>
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

      {/* ===== 3. AUDIENCE PATHS — mobile carousel ===== */}
      <WhoWeServeMobile />

      {/* ===== 3. AUDIENCE PATHS (pyramid) — desktop ===== */}
      <section className="hidden md:block px-6 md:px-16 py-12 md:py-16 border-t border-text-main/10">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left — heading (sticky on desktop) */}
            <motion.div
              className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <Overline withLine className="mb-6">
                  Find Your Path
                </Overline>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-heading text-3xl md:text-4xl leading-[1.05] tracking-tight text-text-main"
              >
                Who We <em className="text-accent">Serve</em>
              </motion.h2>
            </motion.div>

            {/* Right — tiles */}
            <motion.div
              className="lg:col-span-7 lg:col-start-6 flex flex-col gap-3 lg:gap-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
            >
              {/* RETAILER */}
              <motion.div variants={fadeUp}>
                <Link
                  href="/for-your-project/retailers"
                  className="group block bg-bg-main border-2 border-accent/40 hover:border-accent hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(15,94,138,0.10)] p-5 md:p-6 transition-all duration-200"
                >
                  <div className="flex items-baseline justify-between mb-3 gap-4">
                    <h3 className="font-heading text-xl md:text-2xl text-text-main">
                      Retailers and Distributors
                    </h3>
                    <span className="font-body text-[10px] uppercase tracking-[0.25em] text-accent shrink-0">
                      Trade
                    </span>
                  </div>
                  <p className="font-body text-sm text-text-body italic mb-4">
                    For shelves that don&apos;t need explaining.
                  </p>
                  <p className="font-body text-xs text-text-body/70 mb-4">
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
                  className="group block bg-bg-main border border-text-main/15 hover:border-accent/50 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,94,138,0.06)] p-4 md:p-5 transition-all duration-200"
                >
                  <div className="flex items-baseline justify-between mb-2 gap-4">
                    <h3 className="font-heading text-lg md:text-xl text-text-main">
                      Developers and Builders
                    </h3>
                    <span className="font-body text-[10px] uppercase tracking-[0.25em] text-text-body/50 shrink-0">
                      Project
                    </span>
                  </div>
                  <p className="font-body text-sm text-text-body italic mb-3">
                    For projects that already have enough variables.
                  </p>
                  <p className="font-body text-sm text-text-body/85 mb-3 leading-relaxed">
                    Bathroom and kitchen systems specifiable without redesign
                    or plumbing rework. Single-line retrofit available for
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
                  className="group block bg-bg-main border border-text-main/15 hover:border-accent/50 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,94,138,0.06)] p-4 transition-all duration-200"
                >
                  <div className="flex items-baseline justify-between mb-2 gap-4">
                    <h3 className="font-heading text-base md:text-lg text-text-main">
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
                    certification according to IEC 60335-2-35, subject to
                    model and market.
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
                  className="group block bg-bg-alt border border-text-main/10 hover:border-accent/40 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(15,94,138,0.06)] p-4 transition-all duration-200"
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
        </div>
      </section>

      <Footer />
    </>
  );
}
