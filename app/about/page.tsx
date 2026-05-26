"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar";
import SectionWrapper from "../components/SectionWrapper";
import Overline from "../components/Overline";
import Footer from "../components/Footer";

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
      <section className="relative flex items-end bg-bg-main overflow-hidden">
        {/* Decorative large text background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-heading text-[16vw] lg:text-[12vw] font-bold tracking-tighter text-text-main/3 leading-none">
            BSC
          </span>
        </div>

        <div className="mx-auto max-w-400 w-full px-6 md:px-16 pb-10 md:pb-12 pt-20 lg:pt-24">
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
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight mb-6 text-text-main"
            >
              Engineered in Europe.
              <br />
              Built for <em className="text-accent">Southeast Asia</em>.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body text-base md:text-lg text-text-body leading-relaxed max-w-xl"
            >
              BSC develops, engineers, and supplies bathroom, kitchen, and
              retrofit shower solutions — designed in Germany and Denmark,
              produced through qualified partners in China.
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
              className="font-heading text-3xl md:text-4xl lg:text-5xl leading-[0.95] tracking-tight text-text-main"
            >
              About <em className="text-accent">BSC</em>
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

      {/* ===== COMPANY INFORMATION / FOUNDER ===== */}
      <section className="bg-bg-main border-b border-text-main/10">
        <div className="mx-auto max-w-400 px-6 md:px-16 py-14 md:py-20">
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
                  className="object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-105"
                />
                {/* Inner border */}
                <div
                  className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)] transition-shadow duration-300 group-hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)]"
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
                className="font-heading text-3xl md:text-4xl lg:text-5xl leading-[0.95] tracking-tight mb-8 text-text-main"
              >
                Built on <em className="text-accent">Experience</em>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="font-body text-base md:text-lg text-text-body leading-relaxed mb-6"
              >
                BSC, founded by Bastian Schaefer, specializes in kitchen and bathroom products. Offering ODM and
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
                      className="font-heading text-xl md:text-2xl tracking-tight text-text-main/20 hover:text-text-main/60 transition-colors duration-200"
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


      <Footer />
    </>
  );
}
