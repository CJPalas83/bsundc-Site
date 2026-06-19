"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
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
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ==============================
   DATA
   ============================== */

// Hero carousel slides — each is a full-bleed image + caption
const heroSlides = [
  {
    id: "tts",
    image: "/images/webp_1920/tts-chrome-mattblack-1.webp",
    overline: "Flagship Product",
    heading: "Tap-to-Shower™",
    body: "Hot and cold shower comfort from a single cold-water point — no plumbing refit required.",
    cta: "See Tap-to-Shower™",
    href: "/tap-to-shower",
  },
  {
    id: "s2",
    image: "/images/S2TripTych.png",
    overline: "Residential",
    heading: "S2 Collection",
    body: "Modern sanitary fittings for residential and commercial interiors that need to last.",
    cta: "Explore S2 Collection",
    href: "/collections/s2",
  },
  {
    id: "range",
    image: "/images/TTS%20Triptych.jpg",
    overline: "Full Range",
    heading: "Bathroom, Kitchen & Shower",
    body: "Fittings, sensor taps, shower systems, kitchen collections — engineered and ready to specify.",
    cta: "Browse the Range",
    href: "/collections",
  },
];

// Collections triptych
const featuredCollections = [
  {
    href: "/tap-to-shower",
    image: "/images/TTS%20Triptych.jpg",
    overline: "Flagship",
    title: "Tap-to-Shower™",
    description: "The complete hot & cold shower experience retrofit from a single cold-water point.",
    cta: "Explore Tap-to-Shower™",
  },
  {
    href: "/collections/s2",
    image: "/images/S2TripTych.png",
    overline: "Residential",
    title: "S2 Collection",
    description: "Modern sanitary fittings designed for luxury and durability in residential projects.",
    cta: "Explore S2 Collection",
  },
];

// Strength pillars — the BS&C company intro triptych
const strengths = [
  {
    icon: "🇪🇺",
    label: "European Product Know-How",
    body: "Product architecture, safety standards, and design direction developed in Germany and Denmark.",
  },
  {
    icon: "🏭",
    label: "China Manufacturing Strength",
    body: "Manufactured in certified Chinese facilities with consistent quality control and competitive lead times.",
  },
  {
    icon: "🌏",
    label: "Built for Growing Markets",
    body: "Specified for the infrastructure realities of Southeast Asia — cold-water supply, retrofit constraints, and high-volume projects.",
  },
];

/* ==============================
   HERO CAROUSEL
   ============================== */
function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const total = heroSlides.length;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  const slide = heroSlides[current];

  return (
    <section
      className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-text-main"
      aria-label="Featured products carousel"
    >
      {/* Slides */}
      {heroSlides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={i !== current}
        >
          <Image
            src={s.image}
            alt={s.heading}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Caption */}
      <div className="absolute inset-x-0 bottom-0 px-6 md:px-16 pb-16 md:pb-24">
        <div className="mx-auto max-w-[1600px]">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="font-body text-[10px] uppercase tracking-[0.18em] text-white/60 mb-2">
              {slide.overline}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl text-white leading-tight mb-3 max-w-xl">
              {slide.heading}
            </h2>
            <p className="font-body text-base md:text-lg text-white/80 leading-relaxed mb-6 max-w-md">
              {slide.body}
            </p>
            <Link
              href={slide.href}
              className="inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-white border border-white/40 px-5 py-3 hover:bg-white hover:text-text-main transition-all duration-200"
            >
              {slide.cta}
              <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Prev / Next */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-2.5 bg-black/30 backdrop-blur border border-white/20 text-white hover:bg-black/50 transition-colors duration-200"
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-2.5 bg-black/30 backdrop-blur border border-white/20 text-white hover:bg-black/50 transition-colors duration-200"
      >
        <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2" role="tablist" aria-label="Slides">
        {heroSlides.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide: ${s.heading}`}
            onClick={() => setCurrent(i)}
            className={`h-px transition-all duration-400 ${
              i === current ? "w-8 bg-white" : "w-4 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <span className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-2 font-body text-[10px] text-white/40 tracking-[0.2em]">
        {String(current + 1).padStart(2, "0")}
        <span className="w-px h-8 bg-white/20" />
        {String(total).padStart(2, "0")}
      </span>
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

      {/* ===== 1. HERO CAROUSEL ===== */}
      <HeroCarousel />

      {/* ===== 2. WHO IS BS&C — Company intro ===== */}
      <SectionWrapper
        id="about-bsc"
        rhythm="primary"
        className="bg-bg-main border-t border-text-main/10"
      >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16"
        >
          {/* Left — anchor headline */}
          <motion.div variants={fadeUp} className="lg:col-span-5">
            <Overline withLine className="mb-5">
              Who We Are
            </Overline>
            <h1 className="font-heading text-4xl md:text-5xl leading-[1.1] tracking-tight text-text-main mb-6">
              European know-how.{" "}
              <em className="text-accent not-italic">China manufacturing strength.</em>{" "}
              Practical solutions for growing markets.
            </h1>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-body text-sm font-medium uppercase tracking-[0.12em] text-accent hover:gap-3 transition-all duration-200"
            >
              About BS&C <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
            </Link>
          </motion.div>

          {/* Right — three pillars */}
          <motion.div
            variants={stagger}
            className="lg:col-span-7 flex flex-col gap-8"
          >
            {strengths.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="flex gap-5 items-start border-b border-text-main/8 pb-8 last:border-0 last:pb-0"
              >
                <span className="text-2xl leading-none mt-0.5 shrink-0">{s.icon}</span>
                <div>
                  <h3 className="font-heading text-lg text-text-main mb-2">{s.label}</h3>
                  <p className="font-body text-base text-text-body leading-relaxed">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </SectionWrapper>

      {/* ===== 3. FEATURED COLLECTIONS (TRIPTYCH) ===== */}
      <SectionWrapper
        id="collections"
        rhythm="secondary"
        className="bg-bg-feature border-t border-text-main/10"
      >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <Overline withLine className="mb-5">
              Product Lines
            </Overline>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10"
          >
            <h2 className="font-heading text-3xl md:text-4xl leading-tight tracking-tight text-text-main">
              The <em className="text-accent not-italic">Collections</em>
            </h2>
            <p className="font-body text-base text-text-body leading-relaxed max-w-sm">
              Engineering precision across bathroom, kitchen, and retrofit shower lines.
            </p>
          </motion.div>
        </motion.div>

        {/* Triptych */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
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
                <div className="p-6 flex flex-col min-h-[170px]">
                  <Overline className="mb-2">{c.overline}</Overline>
                  <h3 className="font-heading text-xl text-text-main group-hover:text-accent transition-colors duration-200 mb-2">
                    {c.title}
                  </h3>
                  {c.description && (
                    <p className="font-body text-sm text-text-body leading-relaxed mb-4 line-clamp-2">
                      {c.description}
                    </p>
                  )}
                  {c.cta && (
                    <span className="mt-auto inline-flex items-center gap-1.5 font-body text-xs font-medium uppercase tracking-[0.12em] text-accent group-hover:gap-2.5 transition-all duration-200">
                      {c.cta}
                      <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}

          {/* Placeholder — third slot */}
          <motion.div variants={fadeUp}>
            <div className="bg-bg-main border border-text-main/5 overflow-hidden h-full">
              <div className="relative aspect-square bg-bg-feature flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-text-main/5 flex items-center justify-center text-text-body/30">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                  </svg>
                </div>
                <span className="font-body text-[9px] uppercase tracking-[0.15em] text-text-body/40">Coming Soon</span>
              </div>
              <div className="p-6">
                <Overline className="mb-2">More to Follow</Overline>
                <h3 className="font-heading text-xl text-text-body/35">Next Collection</h3>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* See more */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-t border-text-main/10 pt-6"
        >
          <Link
            href="/collections/kitchen"
            className="group inline-flex items-center gap-2 font-body text-sm font-medium uppercase tracking-[0.12em] text-accent hover:gap-3 transition-all duration-200"
          >
            See all collections
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </motion.div>
      </SectionWrapper>

      {/* ===== 4. TAP-TO-SHOWER FEATURE BAND ===== */}
      <section className="border-t border-text-main/10 bg-text-main">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[480px] overflow-hidden">
            <Image
              src="/images/webp_1200/tts-kit.webp"
              alt="Tap-to-Shower complete kit — tap, connection set, and heater"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Copy */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="flex flex-col justify-center px-8 md:px-16 py-16 md:py-24"
          >
            <motion.div variants={fadeUp}>
              <Overline className="mb-5 text-white/50">Flagship System</Overline>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl md:text-4xl text-white leading-tight mb-5"
            >
              Tap-to-Shower™
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body text-base text-white/75 leading-relaxed mb-4 max-w-md">
              One tap. One cold-water connection. Full hot and cold shower — installed in an afternoon, without touching existing plumbing.
            </motion.p>
            <motion.p variants={fadeUp} className="font-body text-base text-white/75 leading-relaxed mb-8 max-w-md">
              Designed for the infrastructure realities of Southeast Asia: cold-water-only supply, dense residential blocks, and retrofit constraints.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/tap-to-shower"
                className="inline-flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-[0.12em] text-text-main bg-white px-6 py-3 hover:bg-bg-alt transition-colors duration-200"
              >
                Explore the System <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
              </Link>
              <Link
                href="/tap-to-shower#inquiry"
                className="inline-flex items-center gap-2 font-body text-sm font-medium uppercase tracking-[0.12em] text-white border border-white/30 px-6 py-3 hover:border-white/60 transition-colors duration-200"
              >
                Enquire
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
