"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Navbar from "./components/Navbar";
import SectionWrapper from "./components/SectionWrapper";
import EditorialImage from "./components/EditorialImage";
import Overline from "./components/Overline";
import Button from "./components/Button";
import VideoShowcase from "./components/VideoShowcase";
import CollectionCarousel from "./components/CollectionCarousel";
import Footer from "./components/Footer";
import Link from "next/link";

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

// [CJ] — Replaced the old stats block. Previous entries were filler-shaped
//        ("30+ Years of Experience", "DE German Engineering"). Each new entry
//        is anchored to a verifiable product fact: install time, warranty term,
//        engineering origin, catalogue scale.
const proofStats = [
  { number: "30–45", unit: "min", label: "Install Time" },
  { number: "3", unit: "yr", label: "Limited Warranty" },
  { number: "DE · DK", unit: "", label: "Engineered" },
  { number: "11", unit: "", label: "Collections" },
];

// [CJ] — Cert-mark strip beneath the stats. Only certifications confirmed in
//        BSC's product documentation are listed. ISO 9001 / ISO 14001 pulled
//        pending written confirmation from BSC that they hold these.
const certMarks = ["CB IEC 60335*", "Worldbex 2026"];

/* ==============================
   PAGE
   ============================== */
export default function Home() {
  return (
    <>
      <Navbar />

      {/* ===== 1. BROAD BSC HERO ===== */}
      <section className="relative lg:min-h-screen flex items-center overflow-hidden">
        <div className="mx-auto max-w-[1600px] w-full px-6 md:px-16 pb-16 md:pb-24 pt-28 lg:pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 lg:items-start">
            <div className="lg:col-span-7 lg:col-start-1">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <Overline withLine className="mb-6">
                  Bathroom and Kitchen Solutions
                </Overline>

                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-8 text-text-main">
                  European Bathroom and Kitchen Solutions{" "}
                  <br />
                  for <em className="text-accent italic">Southeast Asian Markets.</em>
                </h1>

                <p className="font-body text-base md:text-lg text-text-body leading-relaxed max-w-2xl mb-10">
                  BSC develops, engineers, and supplies bathroom, kitchen, and retrofit shower solutions — designed in Germany and Denmark, produced through qualified partners in China.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link href="/tap-to-shower" className="w-full sm:w-auto">
                    <Button variant="primary" size="lg" className="w-full sm:w-auto">
                      Discover Tap-to-Shower™
                    </Button>
                  </Link>
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                      Contact BSC
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 2. FLAGSHIP PRODUCT — TAP-TO-SHOWER ===== */}
      <section className="border-t border-text-main/10">
        {/* MOBILE: image with text overlay */}
        <div className="lg:hidden relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <EditorialImage
              src="/images/shower.png"
              alt="BSC premium rain shower system"
              aspect="3/4"
              className="w-full"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

          <motion.div
            className="absolute inset-x-0 bottom-0 p-6 pb-10"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <Overline withLine dark className="mb-4">
                Flagship
              </Overline>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-heading text-3xl sm:text-4xl leading-[0.95] tracking-tight text-text-white mb-4"
            >
              Tap-to-<em className="text-accent italic">Shower™</em>
              <br />
              Collection
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="font-body text-sm text-text-white md:text-text-body  leading-relaxed mb-6 max-w-sm"
            >
              Tap-to-Shower™ turns a single-line (cold-only) bathroom
              into a hot and cold shower without concealed plumbing or wall
              work. Engineered in Germany and Denmark.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
                  <a href="/tap-to-shower" className="w-full sm:w-auto">
                    <Button
                      variant="primary"
                      size="lg"
                      className="group w-full sm:w-auto"
                    >
                      Discover Tap-to-Shower™
                    </Button>
                  </a>
                  <a href="/tap-to-shower#inquiry" className="w-full sm:w-auto">
                    <Button variant="secondary" size="lg" onDark className="w-full sm:w-auto">
                      Request Information
                    </Button>
                  </a>
                </div>
            </motion.div>
          </motion.div>
        </div>

        {/* DESKTOP: side-by-side layout */}
        <div className="hidden lg:block">
          <div className="mx-auto max-w-[1600px] px-16 py-24">
            <div className="grid grid-cols-12 gap-16 items-center">
              <motion.div
                className="col-span-6 col-start-1 relative"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <EditorialImage
                  src="/images/shower.png"
                  alt="BSC premium rain shower system"
                  aspect="5/6"
                  className="shadow-[0_8px_32px_rgba(0,0,0,0.1)]"
                />
                <span className="vertical-text absolute -right-10 top-8 font-body text-[10px] uppercase tracking-[0.3em] text-text-body/40">
                  Flagship / Tap-to-Shower
                </span>
              </motion.div>

              <motion.div
                className="col-span-5 col-start-8"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={stagger}
              >
                <motion.div variants={fadeUp}>
                  <Overline withLine className="mb-6">
                    Flagship
                  </Overline>
                </motion.div>

                <motion.h2
                  variants={fadeUp}
                  className="font-heading text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-8 text-text-main"
                >
                  Tap-to-<em className="text-accent italic">Shower™</em>
                  <br />
                  Collection
                </motion.h2>

                <motion.p
                  variants={fadeUp}
                  className="font-body text-lg text-text-body leading-relaxed mb-8 max-w-md"
                >
                  Tap-to-Shower™ turns a single-line (cold-only) bathroom
                  into a hot and cold shower without concealed plumbing or wall
                  work. Engineered in Germany and Denmark.
                </motion.p>

                <motion.ul variants={fadeUp} className="space-y-4 mb-10">
                  {[
                    "Complete Tap-to-Shower Kit",
                    "Tap-to-Shower Tap Only",
                    "Tap-to-Shower Upgrade Kit",
                    "Tap-to-Shower Connection Set",
                    "Instant Water Heater",
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="block w-1.5 h-1.5 mt-2 bg-accent shrink-0" />
                      <span className="font-body text-sm text-text-main/80 leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </motion.ul>

                <motion.div variants={fadeUp}>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
                  <Link href="/tap-to-shower" className="w-full sm:w-auto">
                    <Button
                      variant="primary"
                      size="lg"
                      className="group w-full sm:w-auto"
                    >
                      Discover Tap-to-Shower™
                    </Button>
                  </Link>
                  <Link href="/tap-to-shower#inquiry" className="w-full sm:w-auto">
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                      Request Information
                    </Button>
                  </Link>
                </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== 3. BENEFIT CARDS ===== */}
      <section className="bg-bg-alt border-t border-b border-text-main/10 px-6 md:px-16 py-20 md:py-28">
        <div className="mx-auto max-w-[1600px]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp} className="flex justify-center mb-6">
              <Overline withLine>Why Tap-to-Shower™</Overline>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-4xl md:text-5xl lg:text-6xl tracking-tight text-text-main"
            >
              Four Reasons to <em className="text-accent italic">Choose</em>
            </motion.h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {[
              { title: "Easy Upgrade", desc: "Retrofit any single-line bathroom in 30 to 45 minutes without concealed pipework or wall work." },
              { title: "Hot & Cold Control", desc: "Single lever ceramic cartridge controls hot and cold water at the shower point — no separate mixer required." },
              { title: "Clean Installation", desc: "External PEX tube routes neatly along the wall surface with included brackets and clips. No tiles broken." },
              { title: "Value for Money", desc: "Complete kit, tap-only, or upgrade set — three entry points for every budget and project type." },
            ].map((card, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-bg-main p-8 border border-text-main/10 hover:border-accent/30 transition-colors duration-300"
              >
                <span className="block font-heading text-5xl text-accent/20 mb-4 leading-none">
                  0{i + 1}
                </span>
                <h3 className="font-heading text-xl text-text-main mb-3">{card.title}</h3>
                <p className="font-body text-sm text-text-body leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== 4. AUDIENCE PATHS ===== */}
      <section className="px-6 md:px-16 py-20 md:py-28">
        <div className="mx-auto max-w-[1600px]">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="mb-12"
          >
            <motion.div variants={fadeUp}>
              <Overline withLine className="mb-6">Find Your Path</Overline>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-4xl md:text-5xl lg:text-6xl tracking-tight text-text-main"
            >
              Who We <em className="text-accent italic">Serve</em>
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
                href="/tap-to-shower?type=retail#inquiry"
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
                <ul className="space-y-2.5 mb-5">
                  <li className="flex items-start gap-3 font-body text-sm text-text-main/85">
                    <span className="block w-1 h-1 mt-2 bg-accent shrink-0" />
                    <span>
                      <strong className="font-medium">Tap-to-Shower™</strong> — single-line shower retrofit. 3-year warranty.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 font-body text-sm text-text-main/85">
                    <span className="block w-1 h-1 mt-2 bg-accent shrink-0" />
                    <span>
                      <strong className="font-medium">S2 Faucets</strong> — chrome and brushed core line. Residential and light commercial.
                    </span>
                  </li>
                  <li className="flex items-start gap-3 font-body text-sm text-text-main/85">
                    <span className="block w-1 h-1 mt-2 bg-accent shrink-0" />
                    <span>
                      <strong className="font-medium">Sensor Products</strong> — touchless taps and flush valves. Commercial and hospitality.
                    </span>
                  </li>
                </ul>
                <p className="font-body text-xs text-text-body/70 mb-5">
                  Verified warranty terms. Ready packaging. No assembly, no staff training.
                </p>
                <span className="inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-[0.2em] text-accent group-hover:gap-3 transition-all duration-200">
                  Stockist Enquiry <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </span>
              </Link>
            </motion.div>

            {/* DEVELOPER */}
            <motion.div variants={fadeUp}>
              <Link
                href="/tap-to-shower?type=developer#inquiry"
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
                  Bathroom and kitchen systems specifiable without redesign or plumbing rework. Single-line retrofit available for cold-water markets.
                </p>
                <span className="inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-[0.2em] text-accent group-hover:gap-3 transition-all duration-200">
                  Request Project Guide <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </span>
              </Link>
            </motion.div>

            {/* ARCHITECT */}
            <motion.div variants={fadeUp}>
              <Link
                href="/tap-to-shower?type=architect#inquiry"
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
                  Full datasheets, dimensional drawings, CAD and BIM files. Compatible water heaters may be supplied with CB certification according to IEC 60335-2-35, subject to model and market.
                </p>
                <span className="inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-[0.2em] text-accent group-hover:gap-3 transition-all duration-200">
                  Request Datasheets <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </span>
              </Link>
            </motion.div>

            {/* HOMEOWNER */}
            <motion.div variants={fadeUp}>
              <Link
                href="/where-to-buy"
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
                    Where to Buy <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== 5. FEATURED COLLECTIONS ===== */}
      <SectionWrapper id="collections" className="bg-bg-feature">
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
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tight text-text-main">
              The <em className="text-accent italic">Collections</em>
            </h2>
            <p className="font-body text-sm md:text-base text-text-body/60 max-w-sm leading-relaxed">
              Each collection is a distinct expression of our design philosophy
              — unified by engineering precision, differentiated by purpose.
            </p>
          </motion.div>
        </motion.div>

        <CollectionCarousel />
      </SectionWrapper>

      {/* ===== PROOF BLOCK ===== */}
      <section className="bg-bg-alt border-t border-b border-text-main/10 px-6 md:px-16 py-20 md:py-28">
        <div className="mx-auto max-w-[1600px]">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-14 md:mb-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {proofStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className={`text-center ${
                  i < proofStats.length - 1
                    ? "lg:border-r lg:border-text-main/10"
                    : ""
                }`}
              >
                <span className="block font-heading text-5xl md:text-6xl lg:text-7xl text-text-main tracking-tight leading-none mb-3">
                  {stat.number}
                  {stat.unit && (
                    <span className="font-heading text-2xl md:text-3xl lg:text-4xl ml-1 text-accent">
                      {stat.unit}
                    </span>
                  )}
                </span>
                <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.25em] text-text-body">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="border-t border-text-main/10 pt-10"
          >
            <motion.p
              variants={fadeUp}
              className="font-body text-[10px] uppercase tracking-[0.25em] text-text-body/50 text-center mb-6"
            >
              Certified to
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center gap-3 md:gap-4"
            >
              {certMarks.map((mark) => (
                <span
                  key={mark}
                  className="font-body text-xs font-medium uppercase tracking-[0.2em] text-text-main border border-text-main/20 px-4 py-2"
                >
                  {mark}
                </span>
              ))}
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="font-body text-[10px] text-text-body/40 text-center mt-4"
            >
              *Compatible instant water heater models may be supplied with CB certification according to IEC 60335-2-35, subject to model and market.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
