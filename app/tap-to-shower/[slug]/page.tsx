"use client";

import React, { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SectionWrapper from "../../components/SectionWrapper";
import EditorialImage from "../../components/EditorialImage";
import Overline from "../../components/Overline";
import Button from "../../components/Button";
import { ttsCollections, SpecGroup } from "../data";
import { ImageComparisonSlider } from "@/components/ui/image-comparison-slider-horizontal";

/* ==============================
   ANIMATION VARIANTS
   ============================== */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const stagger: Variants = {
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

/* ==============================
   COMPONENTS
   ============================== */

const SpecificationGrid = ({ groups }: { groups: SpecGroup[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
    {groups.map((group) => (
      <motion.div key={group.title} variants={fadeUp} className="group">
        <h3 className="font-heading text-xl mb-6 pb-4 border-b border-text-main/10 group-hover:border-accent transition-colors duration-200 text-text-main">
          {group.title}
        </h3>
        <ul className="space-y-4">
          {group.items.map((item) => (
            <li key={item.label} className="flex justify-between items-start gap-4">
              <span className="font-body text-[10px] uppercase tracking-wider text-text-body mt-1">
                {item.label}
              </span>
              <span className="font-body text-sm text-text-main text-right font-medium">
                {item.value}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    ))}
  </div>
);

const VerticalSpecificationList = ({ groups }: { groups: SpecGroup[] }) => (
  <div className="space-y-16">
    {groups.map((group) => (
      <motion.div key={group.title} variants={fadeUp} className="group">
        <h3 className="font-heading text-2xl mb-8 pb-4 border-b border-text-main/10 group-hover:border-accent transition-colors duration-200 text-text-main">
          {group.title}
        </h3>
        <ul className="space-y-5">
          {group.items.map((item) => (
            <li key={item.label} className="flex justify-between items-start gap-8">
              <span className="font-body text-[11px] uppercase tracking-[0.2em] text-text-body mt-1 whitespace-nowrap">
                {item.label}
              </span>
              <span className="font-body text-base text-text-main text-right font-medium">
                {item.value}
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    ))}
  </div>
);

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = ttsCollections.find((p) => p.id === slug);

  const [activeVariant, setActiveVariant] = useState(0);

  if (!product) {
    notFound();
  }

  const currentSpecs = product.variants 
    ? (product.variants[activeVariant]?.specs || [])
    : (product.specGroups || []);

  return (
    <>
      <Navbar />

      <main className="bg-bg-main min-h-screen pt-16 lg:pt-20">
        {/* ===== HERO OVERVIEW ===== */}
        <SectionWrapper id="product-hero" pt="pt-6 lg:pt-10" className="pb-12 lg:pb-16">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start"
          >
            {/* Left Content */}
            <div className="lg:col-span-6">
              <motion.div variants={fadeUp} className="mb-12">
                <Link
                  href="/tap-to-shower"
                  className="group inline-flex items-center gap-2 font-body text-[10px] uppercase tracking-[0.2em] text-text-body hover:text-text-main transition-colors duration-300"
                >
                  <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
                  Back to Collection
                </Link>
              </motion.div>

              <motion.div variants={fadeUp}>
                <Overline withLine className="mb-6">
                  {product.code} {product.warranty && `| ${product.warranty}`}
                </Overline>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-heading text-4xl md:text-6xl tracking-tight mb-6 text-text-main"
              >
                {product.name}
              </motion.h1>

              <motion.p 
                variants={fadeUp}
                className="font-body text-lg md:text-xl text-text-body leading-relaxed mb-10 max-w-xl"
              >
                {product.heroDescription || product.description}
              </motion.p>

              {product.systemBlurb && (
                <motion.div variants={fadeUp} className="mb-10 border-l-2 border-accent pl-5 max-w-xl">
                  <span className="block font-body text-[10px] font-medium uppercase tracking-[0.25em] text-accent mb-2">
                    Part of the Tap-to-Shower™ single-line hot &amp; cold shower upgrade system.
                  </span>
                  <p className="font-body text-sm text-text-body leading-relaxed">
                    {product.systemBlurb}
                  </p>
                </motion.div>
              )}

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                 <Button>Request Product Information</Button>
                 <Button variant="secondary">Request Specification Support</Button>
              </motion.div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                className="relative overflow-hidden aspect-[4/5] shadow-[0_32px_64px_rgba(0,0,0,0.12)]"
              >
                <EditorialImage 
                  src={product.variants 
                    ? (product.variants[activeVariant]?.heroImage || product.variants[activeVariant]?.image || product.heroImage || product.image) 
                    : (product.heroImage || product.image)} 
                  alt={product.name} 
                  aspect="4/5"
                  priority
                />
              </motion.div>
            </div>
          </motion.div>
        </SectionWrapper>

        {/* ===== VARIANT TOGGLE (Optional) ===== */}
        {product.variants && (
          <section className="bg-bg-alt border-t border-b border-text-main/10">
            <SectionWrapper id="variants" pt="pt-12" pb="pb-12">
              <div className="flex flex-col items-center">
                 <span className="font-body text-[10px] uppercase tracking-[0.3em] text-text-body mb-8">
                    Select Model Specification
                 </span>
                 <div className="flex gap-4 p-1.5 bg-text-main/5 rounded-full">
                    {product.variants.map((variant, index) => (
                      <button
                        key={variant.name}
                        onClick={() => setActiveVariant(index)}
                        className={`px-8 py-3 rounded-full font-body text-xs uppercase tracking-widest transition-all duration-200 ${
                          activeVariant === index 
                            ? "bg-text-main text-bg-main shadow-lg" 
                            : "text-text-main/60 hover:text-text-main"
                        }`}
                      >
                        {variant.name}
                      </button>
                    ))}
                 </div>
                 
                 {product.variants[activeVariant]?.warranty && (
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-6 font-body text-sm text-accent italic"
                    >
                       * {product.variants[activeVariant]?.warranty}
                    </motion.p>
                 )}
              </div>
            </SectionWrapper>
          </section>
        )}

        {/* ===== SPECIFICATIONS SECTION ===== */}
        <section className="bg-bg-feature">
          <SectionWrapper id="specifications" pt="pt-14 lg:pt-20" pb="pb-14 lg:pb-20">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={stagger}
            >
              <motion.div variants={fadeUp} className="mb-20">
                <Overline withLine className="mb-4">Technical Details</Overline>
                <h2 className="font-heading text-4xl md:text-5xl tracking-tight text-text-main">
                  Product <em className="text-accent">Specifications</em>
                </h2>
              </motion.div>

              {(slug === "complete-kit" || slug === "tap-only" || slug === "upgrade-kit") ? (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                  {/* Slider Side */}
                  <motion.div 
                    variants={fadeUp}
                    className="lg:col-span-5 order-2 lg:order-1"
                  >
                    <div className="flex flex-col gap-12 sticky top-32">
                      <div className="rounded-2xl border border-text-main/5 overflow-hidden shadow-2xl bg-bg-main aspect-[9/16] lg:aspect-[1/2]">
                        <ImageComparisonSlider
                          leftImage={slug === "complete-kit" ? "/images/tsc1-1.png" : product.image}
                          rightImage={slug === "complete-kit" ? "/images/tsc1-2.png" : product.image}
                          altLeft={`${product.name} photography`}
                          altRight={`${product.name} technical dimensions`}
                        />
                      </div>

                      {slug === "complete-kit" && (
                        <motion.div 
                          variants={fadeUp}
                          className="rounded-2xl border border-text-main/5 overflow-hidden shadow-2xl bg-bg-main p-8 lg:p-12 flex items-center justify-center"
                        >
                           <Image 
                              src="/images/tsc1-3.png" 
                              alt={`${product.name} technical diagram`}
                              width={800}
                              height={800}
                              className="w-full h-auto object-contain max-h-[600px]"
                           />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>

                  {/* Specs Side */}
                  <div className="lg:col-span-7 order-1 lg:order-2">
                    <VerticalSpecificationList groups={currentSpecs} />

                    {/* Options & Compliance inside the column */}
                    {(product.options || product.compliance) && (
                      <div className="pt-12 mt-16 border-t border-text-main/10 flex flex-col gap-10">
                        {product.options && (
                          <motion.div variants={fadeUp}>
                            <h3 className="font-heading text-2xl mb-8 text-text-main">{product.options.title}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                              {product.options.items.map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                  <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" />
                                  <span className="font-body text-base text-text-body leading-relaxed">{item}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {product.compliance && (
                          <motion.div variants={fadeUp}>
                            <h3 className="font-heading text-2xl mb-8 text-text-main">Compliant with</h3>
                            <div className="flex flex-wrap gap-4">
                              {product.compliance.map((item) => (
                                <div key={item} className="px-6 py-4 border border-text-main/10 bg-bg-main/50 backdrop-blur-sm">
                                  <span className="font-body text-xs font-bold tracking-widest text-text-main">{item}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <SpecificationGrid groups={currentSpecs} />
                  
                  {/* CONFIG OPTIONS & COMPLIANCE for other layouts (stays below) */}
                  {(product.options || product.compliance) && (
                    <div className="mt-32 pt-24 border-t border-text-main/10 grid grid-cols-1 md:grid-cols-2 gap-20">
                      {product.options && (
                        <motion.div variants={fadeUp}>
                          <h3 className="font-heading text-2xl mb-8 text-text-main">{product.options.title}</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                            {product.options.items.map((item) => (
                              <div key={item} className="flex items-center gap-3">
                                <span className="w-1 h-1 bg-accent rounded-full" />
                                <span className="font-body text-sm text-text-body leading-relaxed">{item}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {product.compliance && (
                        <motion.div variants={fadeUp}>
                          <h3 className="font-heading text-2xl mb-8 text-text-main">Compliant with</h3>
                          <div className="flex flex-wrap gap-4">
                            {product.compliance.map((item) => (
                              <div key={item} className="px-6 py-4 border border-text-main/10 bg-bg-main/50 backdrop-blur-sm">
                                <span className="font-body text-xs font-bold tracking-widest text-text-main">{item}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </SectionWrapper>
        </section>

        {/* ===== FOOTER CTA ===== */}
        <SectionWrapper id="pdp-cta" className="bg-bg-cta overflow-hidden border-t border-accent/20">
           <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl">
                 <Overline withLine className="mb-6">Global Sales</Overline>
                 <h2 className="font-heading text-3xl md:text-5xl text-text-main tracking-tight mb-4">
                    Request <em className="text-accent">Information</em>
                 </h2>
                 <p className="font-body text-text-body text-lg">
                    Interested in {product.name} for your project? Contact our sales team for pricing and availability.
                 </p>
              </div>
              <div className="flex gap-4">
                 <Button size="lg">Submit Enquiry</Button>
                 <Link href="/tap-to-shower">
                   <Button
                    variant="secondary"
                    size="lg"
                    className="border-text-main/20 text-text-main hover:bg-text-main hover:text-bg-main whitespace-nowrap"
                   >
                      View Collection
                   </Button>
                 </Link>
              </div>
           </div>
        </SectionWrapper>
      </main>

      <Footer />
    </>
  );
}
