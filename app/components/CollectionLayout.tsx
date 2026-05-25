"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Overline from "./Overline";

export interface Product {
  name: string;
  desc: string;
  specs: string[];
  config: string[];
  code: string;
  image?: string;
  placeholder?: boolean;
  compliance?: string[];
  features?: { label: string; icon: React.ElementType }[];
}

export interface Section {
  id: string;
  title: string;
  overline: string;
  products: Product[];
}

export interface CollectionConfig {
  bgText: string;
  title: string;
  titleAccent: string;
  description: string;
  verticalLabel: string;
  collectionSlug: string;
  sections: Section[];
  compliance: string[];
  features: { label: string; icon: React.ElementType }[];
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const imgIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
  </svg>
);

function ProductCard({
  product,
  collectionSlug,
}: {
  product: Product;
  collectionSlug: string;
}) {
  if (product.placeholder) {
    return (
      <motion.article
        variants={fadeUp}
        className="bg-bg-main border border-text-main/5 shadow-[0_1px_8px_rgba(0,0,0,0.03)] overflow-hidden opacity-40"
      >
        <div className="relative aspect-square bg-bg-feature border-b border-text-main/5 flex flex-col items-center justify-center gap-2">
          <div className="w-9 h-9 rounded-full bg-text-main/5 flex items-center justify-center text-text-body/20">
            {imgIcon}
          </div>
          <span className="font-body text-[8px] uppercase tracking-[0.2em] text-text-body/20">
            Coming Soon
          </span>
        </div>
        <div className="px-3 py-3">
          <span className="inline-block font-body text-[9px] font-semibold uppercase tracking-[0.15em] text-text-body/40 bg-text-main/5 px-2 py-0.5">
            {product.code}
          </span>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article variants={fadeUp}>
      <Link
        href={`/collections/${collectionSlug}/${encodeURIComponent(product.code)}`}
        className="group block bg-bg-main border border-text-main/5 shadow-[0_1px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500 overflow-hidden"
      >
        {/* Product Image */}
        <div className="relative aspect-square bg-bg-feature border-b border-text-main/5 flex flex-col items-center justify-center gap-2 overflow-hidden">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain  group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <>
              <div className="w-9 h-9 rounded-full bg-text-main/5 flex items-center justify-center text-text-body/30 group-hover:text-accent/50 transition-colors duration-500">
                {imgIcon}
              </div>
              <span className="font-body text-[8px] uppercase tracking-[0.2em] text-text-body/30">
                Product Image
              </span>
            </>
          )}
        </div>

        {/* Product Info */}
        <div className="px-3 py-3 space-y-1.5">
          <h3 className="font-heading text-[11px] sm:text-xs tracking-tight text-text-main leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-300">
            {product.name}
          </h3>
          <span className="inline-block font-body text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.15em] text-accent/80 bg-accent/5 px-2 py-0.5">
            {product.code}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default function CollectionLayout({ config }: { config: CollectionConfig }) {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative flex items-end bg-bg-main overflow-hidden min-h-[45vh] lg:min-h-[55vh]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-heading text-[16vw] lg:text-[12vw] font-bold tracking-tighter text-text-main/[0.03] leading-none">
            {config.bgText}
          </span>
        </div>
        <div className="mx-auto max-w-[1600px] w-full px-6 md:px-16 pb-12 md:pb-16 pt-24 lg:pt-32">
          <motion.div initial="hidden" animate="show" variants={stagger} className="max-w-3xl">
            <motion.div variants={fadeUp}>
              <Overline withLine className="mb-6">Products Collection</Overline>
            </motion.div>
            <motion.h1
              variants={fadeUp}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight mb-6 text-text-main"
            >
              {config.title}{" "}
              <em className="text-accent">{config.titleAccent}</em>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="font-body text-base md:text-lg text-text-body leading-relaxed max-w-xl"
            >
              {config.description}
            </motion.p>
          </motion.div>
        </div>
        <span className="hidden lg:block vertical-text absolute right-16 bottom-16 font-body text-[10px] uppercase tracking-[0.3em] text-text-body/40">
          {config.verticalLabel}
        </span>
      </section>

      {/* Section Nav */}
      <nav className="sticky top-14 md:top-16 z-20 bg-bg-main/95 backdrop-blur-sm border-t border-b border-text-main/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-3 -mx-2">
            {config.sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex-shrink-0 px-4 py-2 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-text-body/60 hover:text-accent hover:bg-accent/5 transition-all duration-300"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Product Sections */}
      {config.sections.map((section, sIdx) => (
        <section
          key={section.id}
          id={section.id}
          className={`scroll-mt-28 ${sIdx % 2 === 0 ? "bg-bg-alt" : "bg-bg-main"} border-b border-text-main/10`}
        >
          <div className="mx-auto max-w-[1600px] px-6 md:px-16 py-16 md:py-24">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
              className="mb-10 md:mb-14"
            >
              <motion.div variants={fadeUp}>
                <Overline withLine className="mb-6">{section.overline}</Overline>
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="font-heading text-3xl md:text-4xl lg:text-5xl leading-[0.95] tracking-tight text-text-main"
              >
                {section.title.includes("—") ? (
                  <>
                    {section.title.split("—")[0]}
                    <br className="hidden md:block" />
                    <em className="text-accent">— {section.title.split("—")[1]}</em>
                  </>
                ) : (
                  <>
                    {section.title}{" "}
                    <em className="text-accent">Products</em>
                  </>
                )}
              </motion.h2>
            </motion.div>

            {/* Compact product grid */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-40px" }}
              variants={stagger}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5"
            >
              {section.products.map((product) => (
                <ProductCard
                  key={product.code}
                  product={product}
                  collectionSlug={config.collectionSlug}
                />
              ))}
            </motion.div>
          </div>
        </section>
      ))}

      <Footer />
    </>
  );
}
