"use client";

import { motion, Variants } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionWrapper from "../components/SectionWrapper";
import Overline from "../components/Overline";
import Button from "../components/Button";
import Link from "next/link";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

export default function WhereToBuy() {
  return (
    <>
      <Navbar />

      <main className="bg-bg-main min-h-screen pt-20 lg:pt-24">
        <SectionWrapper pt="pt-16 lg:pt-24" pb="pb-24 lg:pb-40">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div variants={fadeUp}>
              <Overline withLine className="mb-6 justify-center">
                Availability
              </Overline>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight mb-8 text-text-main"
            >
              Retail and Distribution <em className="text-accent">Availability</em>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body text-lg md:text-xl text-text-body leading-relaxed mb-12"
            >
              Retail and distribution availability across the Philippines is
              currently being prepared. For project, retail, or consumer
              purchasing enquiries, please contact BSC directly.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Request Information
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Ask About Availability
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </SectionWrapper>
      </main>

      <Footer />
    </>
  );
}
