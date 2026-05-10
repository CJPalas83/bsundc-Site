"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar";
import SectionWrapper from "../components/SectionWrapper";
import Overline from "../components/Overline";
import Footer from "../components/Footer";
import { Leaf, Zap, Sparkles } from "lucide-react";

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
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ==============================
   DATA
   ============================== */
const brands = ["Hansgrohe", "Grohe", "Neoperl", "Kohler"];

const markets = [
  { country: "Philippines", code: "PH" },
  { country: "Korea", code: "KR" },
  { country: "Malaysia", code: "MY" },
  { country: "Brunei", code: "BN" },
  { country: "Singapore", code: "SG" },
];

/* ==============================
   PAGE
   ============================== */
export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative flex items-end bg-bg-main overflow-hidden min-h-[60vh] lg:min-h-[70vh]">
        {/* Decorative large text background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-heading text-[20vw] lg:text-[16vw] font-bold tracking-tighter text-text-main/3 leading-none">
            BSC
          </span>
        </div>

        <div className="mx-auto max-w-400 w-full px-6 md:px-16 pb-16 md:pb-24 pt-32 lg:pt-40">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp}>
              <Overline withLine className="mb-6">
                About Us
              </Overline>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8 text-text-main"
            >
              European Bathroom and Kitchen{" "}
              <em className="text-accent italic">Product Development</em>
              <br />
              for Southeast Asian <em className="text-accent italic">Markets</em>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body text-base md:text-lg text-text-body leading-relaxed max-w-xl"
            >
              BSC develops, engineers, and supplies bathroom, kitchen, and
              retrofit shower solutions designed in Germany and Denmark and
              produced through qualified subcontracting partners in China.
            </motion.p>
          </motion.div>
        </div>

        {/* Vertical label */}
        <span className="hidden lg:block vertical-text absolute right-16 bottom-16 font-body text-[10px] uppercase tracking-[0.3em] text-text-body/40">
          About / Est. 2018
        </span>
      </section>

      {/* ===== ABOUT BSC ===== */}
      <SectionWrapper id="about-bsc" className="border-t border-text-main/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left — Heading */}
          <motion.div
            className="lg:col-span-4"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <Overline withLine className="mb-6">
                Who We Are
              </Overline>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-text-main"
            >
              About <em className="text-accent italic">BSC</em>
            </motion.h2>
          </motion.div>

          {/* Right — Copy */}
          <motion.div
            className="lg:col-span-7 lg:col-start-6"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              className="font-body text-base md:text-lg text-text-body leading-relaxed mb-8 drop-cap"
            >
              BSC develops, engineers, and supplies bathroom, kitchen, and
              retrofit shower solutions for the building industry. Products are
              designed in Germany and Denmark, ensuring consistent quality
              standards and engineering rigour.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="font-body text-base md:text-lg text-text-body leading-relaxed mb-10"
            >
              To maintain cost efficiency, certified production is entrusted
              to reliable sub-contractors in China. Sales and marketing
              efforts are focused on Southeast Asia, with a presence
              in the Philippines, Korea, Malaysia, Brunei, and
              Singapore.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="font-body text-sm md:text-base text-text-main font-medium leading-relaxed border-l-2 border-accent pl-6"
            >
              BSC combines European product development capability with
              qualified manufacturing and regional market knowledge to
              deliver dependable bathroom and kitchen solutions.
            </motion.p>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ===== MARKETS (Visual strip) ===== */}
      <section className="bg-bg-alt border-t border-b border-text-main/10 px-6 md:px-16 py-12 md:py-16">
        <div className="mx-auto max-w-400">
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 md:gap-16"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {markets.map((m) => (
              <motion.div
                key={m.country}
                variants={fadeUp}
                className="flex flex-col items-center gap-2"
              >
                <span className="font-heading text-2xl md:text-3xl tracking-tight text-text-main font-bold">
                  {m.code}
                </span>
                <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.25em] text-text-body">
                  {m.country}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== MISSION — TOMORROW'S TREND ===== */}
      <SectionWrapper id="mission" className="border-b border-text-main/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left — large visual accent */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative aspect-4/5 bg-bg-feature overflow-hidden">
              {/* Decorative geometric pattern */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Concentric rings */}
                  <div className="absolute inset-[10%] border border-accent/10 rounded-full" />
                  <div className="absolute inset-[20%] border border-accent/15 rounded-full" />
                  <div className="absolute inset-[30%] border border-accent/20 rounded-full" />
                  <div className="absolute inset-[40%] border border-accent/30 rounded-full" />

                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 md:w-28 md:h-28 bg-accent/10 rounded-full flex items-center justify-center">
                      <svg
                        className="w-10 h-10 md:w-14 md:h-14 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inner border */}
              <div
                className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]"
                aria-hidden="true"
              />
            </div>

            <span className="hidden lg:block vertical-text absolute -right-10 top-8 font-body text-[10px] uppercase tracking-[0.3em] text-text-body/40">
              Mission / Innovation
            </span>
          </motion.div>

          {/* Right — Copy */}
          <motion.div
            className="lg:col-span-6 lg:col-start-7"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
          >
            <motion.div variants={fadeUp}>
              <Overline withLine className="mb-6">
                Our Mission
              </Overline>
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="font-heading text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-8 text-text-main"
            >
              Practical Solutions,
              <br />
              Proven <em className="text-accent italic">Standards</em>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="font-body text-base md:text-lg text-text-body leading-relaxed mb-8"
            >
              BSC’s mission is to develop and supply dependable bathroom and
              kitchen products that meet the practical requirements of
              Southeast Asian building projects. The company is committed to
              consistent quality, efficient production, and functional design
              that performs reliably across residential, commercial, and
              hospitality applications.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="font-body text-base md:text-lg text-text-body leading-relaxed mb-10"
            >
              By maintaining close control over engineering standards and
              production processes, BSC works to deliver measurable value
              to its partners and end users.
            </motion.p>

            {/* Key pillars */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-text-main/10"
            >
              {[
                { label: "Sustainability", icon: Leaf },
                { label: "Efficiency", icon: Zap },
                { label: "Design", icon: Sparkles },
              ].map((pillar) => (
                <div
                  key={pillar.label}
                  className="text-center flex flex-col items-center gap-2"
                >
                  <pillar.icon className="text-2xl" />
                  <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.25em] text-text-body">
                    {pillar.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ===== COMPANY INFORMATION / FOUNDER ===== */}
      <section className="bg-bg-main border-b border-text-main/10">
        <div className="mx-auto max-w-400 px-6 md:px-16 py-20 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Right image — portrait */}
            <motion.div
              className="lg:col-span-4 lg:col-start-9 order-1 lg:order-2 relative"
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="relative aspect-3/4 overflow-hidden group">
                <Image
                  src="/images/about/Screenshot 2026-04-25 154719.png"
                  alt="Bastian Schaefer — Founder of BSC"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover grayscale transition-all duration-1500 ease-out group-hover:grayscale-0 group-hover:scale-105"
                />
                {/* Inner border */}
                <div
                  className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] transition-shadow duration-700 group-hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]"
                  aria-hidden="true"
                />
              </div>

              {/* Caption */}
              <div className="mt-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-text-main/10" />
                <span className="font-body text-[10px] uppercase tracking-[0.25em] text-text-body/60">
                  Bastian Schaefer · Founder
                </span>
              </div>
            </motion.div>

            {/* Left — Copy */}
            <motion.div
              className="lg:col-span-7 order-2 lg:order-1"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <Overline withLine className="mb-6">
                  Company Information
                </Overline>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="font-heading text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-10 text-text-main"
              >
                Built on <em className="text-accent italic">Experience</em>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="font-body text-base md:text-lg text-text-body leading-relaxed mb-6"
              >
                BSC, founded by Bastian Schaefer, a seasoned professional with
                over 30 years of experience in the building products industry,
                specializes in kitchen and bathroom products. Offering ODM and
                OEM solutions to clients in Southeast Asia and Europe.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="font-body text-base md:text-lg text-text-body leading-relaxed mb-6"
              >
                Bastian has previously worked with renowned global brands like
                Hansgrohe, Grohe, Neoperl, and Kohler, leveraging his industry
                knowledge and network to achieve mutually beneficial outcomes.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="font-body text-base md:text-lg text-text-body leading-relaxed mb-10"
              >
                Multiple patents for plumbing products are evidence of the
                company&apos;s inventive capabilities. With a focus on fostering
                enduring partnerships, BSC brings long-term value to its
                customer base.
              </motion.p>

              {/* Brand logos / text marquee */}
              <motion.div
                variants={fadeUp}
                className="border-t border-text-main/10 pt-8"
              >
                <span className="font-body text-[10px] uppercase tracking-[0.25em] text-text-body/60 block mb-6">
                  Previously associated with
                </span>
                <div className="flex flex-wrap items-center gap-6 md:gap-10">
                  {brands.map((brand) => (
                    <span
                      key={brand}
                      className="font-heading text-xl md:text-2xl tracking-tight text-text-main/20 hover:text-text-main/60 transition-colors duration-500"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CERTIFICATIONS =====
           [CJ] — Cert images sourced from bsundc.com pending higher-resolution
           assets from BSC. Kept in pre-production to demonstrate intended layout
           and visual treatment. Flag to BSC at handover. */}
      <section className="bg-bg-alt border-b border-text-main/10 px-6 md:px-16 py-20 md:py-28">
        <div className="mx-auto max-w-400">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeUp}>
              <Overline withLine className="mb-6 justify-center">
                Quality Assurance
              </Overline>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="font-heading text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight text-text-main"
            >
              Certified <em className="text-accent italic">Excellence</em>
            </motion.h2>
          </motion.div>

          {/* Certificates grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {/* ISO 9001 */}
            <motion.div
              variants={fadeUp}
              className="group relative bg-bg-main overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-shadow duration-700"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-[#f5f5f5]">
                <Image
                  src="/images/about/ISO 9001.webp"
                  alt="ISO 9001:2015 Quality Management System Certificate"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 border-t border-text-main/5">
                <h3 className="font-heading text-lg tracking-tight text-text-main mb-1">
                  ISO 9001:2015
                </h3>
                <p className="font-body text-[11px] uppercase tracking-[0.2em] text-text-body/60">
                  Quality Management System
                </p>
              </div>
            </motion.div>

            {/* ISO 14001 */}
            <motion.div
              variants={fadeUp}
              className="group relative bg-bg-main overflow-hidden shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-shadow duration-700"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-[#f5f5f5]">
                <Image
                  src="/images/about/ISO 14001.webp"
                  alt="ISO 14001:2015 Environmental Management System Certificate"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 border-t border-text-main/5">
                <h3 className="font-heading text-lg tracking-tight text-text-main mb-1">
                  ISO 14001:2015
                </h3>
                <p className="font-body text-[11px] uppercase tracking-[0.2em] text-text-body/60">
                  Environmental Management System
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="bg-text-main px-6 md:px-16 py-16 md:py-24">
        <div className="mx-auto max-w-400">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
          >
            {[
              { number: "30+", label: "Years of Experience" },
              { number: "5+", label: "Countries Served" },
              { number: "ISO", label: "9001 & 14001 Certified" },
              { number: "ODM", label: "& OEM Solutions" },
            ].map((stat, i, arr) => (
              <motion.div
                key={stat.label}
                variants={fadeUp}
                className={`text-center ${
                  i < arr.length - 1 ? "lg:border-r lg:border-bg-main/10" : ""
                }`}
              >
                <span className="block font-heading text-4xl md:text-5xl lg:text-6xl text-bg-main tracking-tight leading-none mb-3">
                  {stat.number}
                </span>
                <span className="font-body text-[10px] md:text-xs uppercase tracking-[0.25em] text-bg-main/50">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
