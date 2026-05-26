"use client";

import React from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import Overline from "../../../components/Overline";
import { getProduct } from "../../productData";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const imgIcon = (
  <svg
    className="w-12 h-12"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="0.8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
    />
  </svg>
);

export default function ProductDetailPage() {
  const params = useParams();
  const collectionSlug = params.collection as string;
  const productCode = params.product as string;

  const result = getProduct(collectionSlug, productCode);

  if (!result) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-bg-main">
          <div className="text-center px-6">
            <h1 className="font-heading text-4xl md:text-5xl tracking-tight text-text-main mb-4">
              Product Not Found
            </h1>
            <p className="font-body text-text-body/60 mb-8">
              The product you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href={`/collections/${collectionSlug}`}
              className="inline-flex items-center gap-2 font-body text-[11px] font-semibold uppercase tracking-[0.15em] text-accent hover:text-text-main transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              Back to Collection
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const { product, section, collection } = result;
  const compliance = product.compliance ?? collection.compliance;
  const features = product.features ?? collection.features;

  return (
    <>
      <Navbar />

      {/* Breadcrumb + Back */}
      <div className="bg-bg-main pt-24 md:pt-28 pb-4 border-b border-text-main/5">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16">
          <Link
            href={`/collections/${collectionSlug}`}
            className="inline-flex items-center gap-2 font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-text-body/50 hover:text-accent transition-colors duration-300"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            {collection.title} Collection
          </Link>
        </div>
      </div>

      {/* Product Hero */}
      <section className="bg-bg-main">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Large Product Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative aspect-square bg-bg-feature border border-text-main/5 flex items-center justify-center overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] group "
            >
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              ) : (
                <div className="flex flex-col items-center gap-4 text-text-body/20">
                  {imgIcon}
                  <span className="font-body text-[10px] uppercase tracking-[0.2em]">
                    Product Image
                  </span>
                </div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial="hidden"
              animate="show"
              variants={stagger}
              className="lg:sticky lg:top-28"
            >
              <motion.div variants={fadeUp}>
                <Overline withLine className="mb-5">
                  {section.overline}
                </Overline>
              </motion.div>

              <motion.div variants={fadeUp} className="mb-3">
                <span className="inline-block font-body text-[10px] font-semibold uppercase tracking-[0.2em] text-accent bg-accent/5 px-3 py-1">
                  {product.code}
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-heading text-3xl sm:text-4xl md:text-5xl leading-[0.95] tracking-tight text-text-main mb-6"
              >
                {product.name}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="font-body text-sm md:text-base text-text-body leading-relaxed mb-10 max-w-lg"
              >
                {product.desc}
              </motion.p>

              {/* Specifications */}
              <motion.div variants={fadeUp} className="mb-8">
                <h2 className="font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-text-main mb-4 flex items-center gap-3">
                  <span className="h-px w-6 bg-text-main/20" />
                  Product Specifications
                </h2>
                <ul className="space-y-2">
                  {product.specs.map((spec, i) => (
                    <li
                      key={i}
                      className="font-body text-sm text-text-body flex items-start gap-3"
                    >
                      <span className="mt-2 w-1 h-1 rounded-full bg-accent/50 flex-shrink-0" />
                      {spec}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Configuration Options */}
              {product.config.length > 0 && (
                <motion.div variants={fadeUp} className="mb-8">
                  <h2 className="font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-text-main mb-4 flex items-center gap-3">
                    <span className="h-px w-6 bg-text-main/20" />
                    Configuration Options
                  </h2>
                  <ul className="space-y-2">
                    {product.config.map((cfg, i) => (
                      <li
                        key={i}
                        className="font-body text-sm text-text-body flex items-start gap-3"
                      >
                        <span className="mt-2 w-1 h-1 rounded-full bg-text-main/20 flex-shrink-0" />
                        {cfg}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Compliance */}
              {compliance.length > 0 && (
                <motion.div variants={fadeUp} className="mb-8">
                  <h2 className="font-body text-[10px] font-semibold uppercase tracking-[0.25em] text-text-main mb-4 flex items-center gap-3">
                    <span className="h-px w-6 bg-text-main/20" />
                    Compliant With
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {compliance.map((c, i) => (
                      <span
                        key={i}
                        className="font-body text-[10px] text-text-body/80 bg-bg-alt px-3 py-1.5 border border-text-main/5"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Feature Badges */}
              <motion.div variants={fadeUp}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-text-main/10">
                  {features.map((f) => (
                    <div
                      key={f.label}
                      className="flex flex-col items-center gap-1.5 py-3"
                    >
                      <f.icon size={24}/>
                      <span className="font-body text-[9px] uppercase tracking-[0.15em] text-text-body/80 text-center leading-tight">
                        {f.label}
                      </span>
                    </div>
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
