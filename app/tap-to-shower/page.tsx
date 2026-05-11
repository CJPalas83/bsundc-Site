"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Clock, ShieldCheck, Wrench, Layers, Palette, ArrowRight, CheckCircle2, Mail } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionWrapper from "../components/SectionWrapper";
import EditorialImage from "../components/EditorialImage";
import Overline from "../components/Overline";
import Button from "../components/Button";

/* ==============================
   ANIMATION VARIANTS
   ============================== */
const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const revealImage: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const, delay: 0.2 },
  },
};

/* ==============================
   LOCAL COMPONENTS
   ============================== */
const FAQAccordion = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div variants={fadeUp} className="border border-text-main/10 bg-bg-main overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none cursor-pointer"
      >
        <span className="font-heading text-xl text-text-main pr-8">{question}</span>
        <ChevronDown className={`w-5 h-5 text-accent transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }} 
            animate={{ height: "auto", opacity: 1 }} 
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-8 pb-6 text-text-body font-body leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function TapToShowerCollection() {
  const [buyerType, setBuyerType] = useState("");
  const [showCompany, setShowCompany] = useState(true);

  // [CJ] — Fixed: was reading window.location.hash which broke type pre-selection
  //        on in-page navigation. Now reads search params (?type=retail) so direct
  //        URL loads (e.g. shared links) still pre-select the correct buyer type.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type");
    if (type) {
      const typeMap: Record<string, string> = {
        retail: "retailer",
        developer: "developer",
        architect: "architect",
        consumer: "consumer",
      };
      const mapped = typeMap[type] || "";
      setBuyerType(mapped);
      setShowCompany(mapped !== "consumer");
    }
  }, []);

  const handleBuyerTypeChange = (value: string) => {
    setBuyerType(value);
    setShowCompany(value !== "consumer");
  };

  // [CJ] — Fixed: Who It's For CTAs were linking to #inquiry?type=retail which
  //        matched no element ID (form ID is "inquiry"), so clicking did nothing.
  //        This handler sets buyer type state directly and smooth-scrolls to the form.
  const scrollToInquiry = (type: string) => {
    const typeMap: Record<string, string> = {
      retail: "retailer",
      developer: "developer",
      architect: "architect",
    };
    setBuyerType(typeMap[type] || "");
    setShowCompany(true);
    document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar />

      <main className="bg-bg-main min-h-screen pt-20 lg:pt-24">
        {/* ===== HERO SECTION ===== */}
        <SectionWrapper id="tts-hero" pt="pt-8 lg:pt-12" className="pb-16 lg:pb-32">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            <div className="lg:col-span-6">
              <motion.h1 
                variants={fadeUp}
                className="font-heading text-5xl md:text-7xl lg:text-8xl leading-[0.85] tracking-tight mb-8 text-text-main"
              >
                Turn a Cold Tap{" "}
                into a <em className="text-accent italic">Hot</em> Shower.
              </motion.h1>

              <motion.p 
                variants={fadeUp}
                className="font-body text-lg md:text-xl text-text-body leading-relaxed max-w-lg mb-3"
              >
                Retrofit any single-line bathroom in 30 to 45 minutes — no concealed plumbing, no wall work.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="font-body text-sm text-text-body/60 mb-10"
              >
                Engineered in Germany and Denmark. Available across the Philippines.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <a href="#inquiry" className="w-full sm:w-auto">
                  <Button variant="primary" className="w-full">Request Product Information</Button>
                </a>
                {/* [CJ] — Changed from "Watch How It Works": no video exists at destination,
                     label was a broken promise. "How It Works" matches the section accurately. */}
                <a href="#how-it-works" className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full">How It Works</Button>
                </a>
              </motion.div>
            </div>

            <div className="lg:col-span-6">
               <motion.div variants={revealImage} className="relative overflow-hidden w-full aspect-[16/9]">
                  <EditorialImage 
                    src="/images/shower.png" 
                    alt="Tap-to-Shower retrofit system installed in a bathroom" 
                    aspect="16/9"
                    priority
                    className="object-cover"
                  />
               </motion.div>
            </div>
          </motion.div>
        </SectionWrapper>

        {/* ===== 1. WHAT IS TTS ===== */}
        <SectionWrapper id="what-is-tts" className="bg-bg-alt border-t border-text-main/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp}><Overline withLine className="mb-6">The Concept</Overline></motion.div>
              <motion.h2 variants={fadeUp} className="font-heading text-4xl lg:text-5xl tracking-tight mb-6 text-text-main">
                What is <em className="text-accent italic">Tap-to-Shower™</em>?
              </motion.h2>
              <motion.p variants={fadeUp} className="font-body text-lg text-text-body leading-relaxed mb-6">
                Most Philippine bathrooms have a single cold-water line. Upgrading to a hot and cold shower has traditionally meant breaking tiles, rerouting pipes, and weeks of renovation.
              </motion.p>
              {/* [CJ] — ™ dropped on second mention per house style:
                   ™ on first mention per section only (first mention is the H2 above). */}
              <motion.p variants={fadeUp} className="font-body text-lg text-text-body leading-relaxed">
                Tap-to-Shower is a retrofit system. An external PEX line and a specialised connection kit convert a single cold-water line into a thermostatic-ready hot and cold shower without concealing new plumbing behind walls.
              </motion.p>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={revealImage} className="relative aspect-square">
              <EditorialImage src="/images/carousel/shower-product.png" alt="Tap to Shower Concept" aspect="1/1" className="object-cover rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.1)]" />
            </motion.div>
          </div>
        </SectionWrapper>

        {/* ===== 2. THE FACTS ===== */}
        <SectionWrapper id="features">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center max-w-3xl mx-auto mb-16">
             <motion.div variants={fadeUp} className="flex justify-center mb-6"><Overline withLine>The Facts</Overline></motion.div>
             <motion.h2 variants={fadeUp} className="font-heading text-4xl lg:text-5xl tracking-tight text-text-main">
                Five Things to <em className="text-accent italic">Know</em>
             </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: Clock, title: "30–45 Min Install" },
              { icon: ShieldCheck, title: "3-Year Limited Warranty" },
              { icon: Layers, title: "CB Certified Heater*" },
              { icon: Wrench, title: "Single-Line PEX Retrofit" },
              { icon: Palette, title: "Chrome · Black · Brushed SS" }
            ].map((feat, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="bg-bg-alt p-8 border border-text-main/5 hover:border-accent/20 transition-colors duration-200 text-center">
                <feat.icon className="w-7 h-7 text-accent mb-4 mx-auto" strokeWidth={1.5} />
                <h3 className="font-heading text-base text-text-main">{feat.title}</h3>
              </motion.div>
            ))}
          </div>
          <p className="font-body text-[10px] text-text-body/50 text-center mt-6">
            * Compatible instant water heater models may be supplied with CB certification according to IEC 60335-2-35, subject to model and market.
          </p>
        </SectionWrapper>

        {/* ===== 3. HOW IT WORKS ===== */}
        <SectionWrapper id="how-it-works" className="bg-text-main text-bg-main" dark>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="lg:col-span-5">
              <motion.div variants={fadeUp}><Overline withLine dark className="mb-6">Installation</Overline></motion.div>
              <motion.h2 variants={fadeUp} className="font-heading text-4xl lg:text-5xl tracking-tight mb-6 text-bg-main">
                How It <em className="text-accent italic">Works</em>
              </motion.h2>
              <motion.p variants={fadeUp} className="font-body text-lg text-bg-main/70 leading-relaxed mb-10">
                The PEX retrofit connection set is designed for professional installation in 30 to 45 minutes. No concealed plumbing required.
              </motion.p>
              <div className="space-y-8">
                {[
                  "The Tap-to-Shower™ column mounts to the existing G½″ cold-water outlet.",
                  "The instant water heater installs wall-hung, with a 6m cuttable PEX tube run to the column.",
                  "Push connectors and a safety valve complete the connection.",
                  "The retrofit is complete. Hot and cold water at the tap."
                ].map((step, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex gap-6 items-start">
                     <span className="font-heading text-3xl text-accent leading-none">0{i+1}</span>
                     <p className="font-body text-bg-main/90 pt-1">{step}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={revealImage} className="lg:col-span-7 aspect-square">
               <EditorialImage src="/images/carousel/fittings.png" alt="Installation process" aspect="1/1" className="opacity-90 rounded-sm" />
            </motion.div>
          </div>
        </SectionWrapper>

        {/* ===== 4. WHO IT'S FOR ===== */}
        <SectionWrapper id="who-its-for" className="bg-bg-feature border-y border-text-main/10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center max-w-3xl mx-auto mb-16">
             <motion.div variants={fadeUp} className="flex justify-center mb-6"><Overline withLine>For You</Overline></motion.div>
             <motion.h2 variants={fadeUp} className="font-heading text-4xl lg:text-5xl tracking-tight text-text-main">
                Who It&apos;s <em className="text-accent italic">For</em>
             </motion.h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { 
                title: "Retailers / Distributors", 
                headline: "Stock a Product That Explains Itself at the Shelf",
                bullets: [
                  "Ready retail package with clear value-for-money story",
                  "Strong shelf-level product explanation — no staff training required",
                  "Margin and turnover relevance in cold-water bathroom markets"
                ],
                cta: "Ask About Retail Packages",
                type: "retail"
              },
              { 
                title: "Developers / Builders", 
                headline: "Specify Now. Let Buyers Upgrade Later.",
                bullets: [
                  "Single-line bathroom compatibility — no floor plan redesign",
                  "No additional plumbing runs or concealed pipework required",
                  "Cost and project simplicity with optional buyer upgrade logic"
                ],
                cta: "Ask About Project Solutions",
                type: "developer"
              },
              { 
                title: "Architects / Specifiers", 
                headline: "No Need to Redraw Single-Line Bathroom Concepts",
                bullets: [
                  "Specification-friendly — suitable for homes, condos, and hospitality",
                  "Clean and compact installation with no concealed pipe requirement",
                  "Technical support, dimensional drawings, and datasheets available"
                ],
                cta: "Request Specification Support",
                type: "architect"
              },
              { 
                title: "End Consumers", 
                headline: "Hot Shower Comfort Without Opening Your Wall",
                bullets: [
                  "Neat visible installation in approximately 30 to 45 minutes",
                  "Available in Chrome, Matt Black, and Brushed Stainless Steel",
                  "3-year limited warranty on the tap"
                ],
                cta: "Find Out Where to Buy",
                type: "consumer"
              }
            ].map((group, i) => (
              <motion.div key={i} initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp} className="bg-bg-main p-8 border border-text-main/10 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="font-heading text-2xl text-text-main mb-2">{group.title}</h3>
                <p className="font-body text-sm font-medium text-accent mb-4 italic">{group.headline}</p>
                <ul className="space-y-2 mb-8 flex-grow">
                  {group.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex items-start gap-3">
                      <span className="block w-1.5 h-1.5 mt-2 bg-accent shrink-0" />
                      <span className="font-body text-sm text-text-body leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={group.type === "consumer" ? "/where-to-buy" : "#inquiry"}
                  onClick={group.type !== "consumer" ? (e) => { e.preventDefault(); scrollToInquiry(group.type); } : undefined}
                  className="mt-auto inline-flex w-fit"
                >
                  <Button variant="link" className="group/btn !p-0 !h-auto flex items-center gap-2 text-accent">
                    {group.cta} <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </Button>
                </a>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>

        {/* ===== 5. WHY THIS SYSTEM ===== */}
        <SectionWrapper id="why-this-system">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={revealImage} className="lg:col-span-6 relative">
              <div className="aspect-square bg-bg-alt flex items-center justify-center p-12 border border-text-main/5">
                 <ShieldCheck className="w-full h-full max-w-[240px] text-text-main/5" strokeWidth={0.5} />
                 <div className="absolute inset-0 flex items-center justify-center p-8 text-center backdrop-blur-sm">
                    <p className="font-heading text-4xl md:text-5xl text-text-main max-w-sm tracking-tight leading-tight">
                       IEC 60335. <br/><em className="text-accent italic">Worldbex.</em> <br/>Three years.
                    </p>
                 </div>
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="lg:col-span-6">
              <motion.div variants={fadeUp}><Overline withLine className="mb-6">Trust Signals</Overline></motion.div>
              <motion.h2 variants={fadeUp} className="font-heading text-4xl tracking-tight mb-10 text-text-main">
                Why This <em className="text-accent italic">System</em>
              </motion.h2>
              <div className="space-y-8">
                 {[
                   { title: "3-year limited warranty", desc: "Brass HP59 body and ceramic cartridges, covered for three years from date of purchase." },
                   { title: "CB Certified Heater*", desc: "Compatible instant water heater models may be supplied with CB certification according to IEC 60335-2-35, subject to model and market." },
                   { title: "Worldbex 2026", desc: "Featured exhibitor at Worldbex 2026, SMX Convention Center, Pasay City, Philippines." }
                 ].map((signal, i) => (
                   <motion.div key={i} variants={fadeUp} className="flex gap-5">
                      <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" />
                      <div>
                        <h4 className="font-body font-medium text-text-main text-lg mb-2">{signal.title}</h4>
                        <p className="font-body text-text-body leading-relaxed">{signal.desc}</p>
                      </div>
                   </motion.div>
                 ))}
              </div>
            </motion.div>
          </div>
        </SectionWrapper>

        {/* ===== 6. INSTALL SEQUENCE GALLERY (inside How It Works arc) ===== */}
        <SectionWrapper id="install-gallery" className="bg-bg-main pb-0" pt="pt-0" noPadding>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
              {/* [CJ] — Alt text rewritten to describe actual image content.
                   Previous alt text fabricated a step-by-step install sequence
                   that didn't match the images (generic product/lifestyle shots). */}
              {[
                { src: "/images/shower.png", alt: "Tap-to-Shower system in a finished bathroom" },
                { src: "/images/carousel/fittings.png", alt: "Tap-to-Shower PEX fittings and connection components" },
                { src: "/images/carousel/shower-product.png", alt: "Tap-to-Shower tap and column assembly" },
                { src: "/images/hero.png", alt: "Tap-to-Shower installed and operational" }
              ].map((img, i) => (
                <motion.div key={i} variants={fadeUp} className="aspect-square bg-bg-alt relative overflow-hidden group">
                  <EditorialImage 
                    src={img.src} 
                    alt={img.alt} 
                    aspect="1/1" 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-600" 
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </SectionWrapper>

        {/* ===== DIFFERENTIATOR (F06) ===== */}
        <SectionWrapper id="differentiator" className="border-t border-text-main/10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="max-w-3xl mx-auto text-center">
            <motion.div variants={fadeUp} className="flex justify-center mb-6"><Overline withLine>The Difference</Overline></motion.div>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl lg:text-5xl tracking-tight mb-8 text-text-main">
              Not Just a Heater. A Complete Shower <em className="text-accent italic">Solution.</em>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body text-lg text-text-body leading-relaxed">
              A standard instant water heater typically provides one outlet — usually a hand shower. Tap-to-Shower™ creates a more complete hot and cold shower solution: tap control, overhead shower, hand shower, and a cleaner visual result for single-line bathrooms. The difference is not the heat source. It is the shower experience it makes possible.
            </motion.p>
          </motion.div>
        </SectionWrapper>

        {/* ===== 7. FAQ ===== */}
        <SectionWrapper id="faq" className="bg-bg-alt border-t border-text-main/10 mt-1">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="max-w-4xl mx-auto">
            <motion.div variants={fadeUp} className="text-center mb-16">
              <Overline withLine className="mb-6 justify-center">Support</Overline>
              <h2 className="font-heading text-4xl lg:text-5xl tracking-tight text-text-main">
                Frequently Asked <em className="text-accent italic">Questions</em>
              </h2>
            </motion.div>
            <div className="space-y-4">
              {[
                { q: "What is Tap-to-Shower™?", a: "Tap-to-Shower™ is a shower concept for bathrooms with only one cold-water outlet. When connected to a suitable instant single-point water heater, it allows hot and cold water to be controlled at the tap without opening the wall or adding concealed pipework." },
                { q: "Does the tap itself heat the water?", a: "No. The tap connects to an instant single-point water heater via a flexible PEX tube. The heater warms the water; the Tap-to-Shower™ tap controls the mix and flow at the shower point." },
                { q: "Which water heater can be used?", a: "Tap-to-Shower™ is compatible with suitable instant single-point water heaters with a G½\" connection. The included connection set is designed for this purpose." },
                { q: "Is any wall work required?", a: "No major wall modification is required. The PEX tube routes along the wall surface and is fixed with the included brackets and clips. No concealed pipework needs to be added." },
                { q: "Does installation need a plumber?", a: "BSC recommends installation by a qualified professional plumber and, where applicable, a qualified electrician for the water heater connection." },
                { q: "What water pressure is required?", a: "The system requires a minimum water pressure suitable for the connected instant water heater. It is not suitable for very low pressure or gravity-fed roof-tank installations." },
                { q: "What finishes are available?", a: "Chrome, Matt Black, and Brushed Stainless Steel." },
                { q: "What warranty applies?", a: "The Tap-to-Shower™ tap carries a 3-year limited warranty. Compatible instant water heater models may carry their own warranty — please confirm with BSC at time of order." },
                { q: "Where can it be purchased in the Philippines?", a: "Philippine availability is currently being prepared. Please contact BSC directly for purchasing and distribution enquiries." },
                { q: "Can it be used for retail distribution or project supply?", a: "Yes. BSC supplies Tap-to-Shower™ for retail stocking, project specification, and distribution. Contact BSC to discuss commercial terms." }
              ].map((faq, i) => (
                <FAQAccordion key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </motion.div>
        </SectionWrapper>

        {/* ===== 7. LEAD CAPTURE FORM ===== */}
        <section id="inquiry" className="bg-bg-alt border-t border-text-main/10">
             <SectionWrapper pt="pt-24 lg:pt-32" pb="pb-24 lg:pb-32">
                <div className="relative z-10 max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={stagger}
                    className="lg:col-span-5"
                  >
                    <motion.div variants={fadeUp}>
                      <Overline withLine className="mb-6">Get In Touch</Overline>
                    </motion.div>
                    <motion.h2 variants={fadeUp} className="font-heading text-4xl md:text-5xl lg:text-6xl text-text-main tracking-tight mb-8">
                       Submit an <br/><em className="text-accent italic">Enquiry</em>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="font-body text-text-body text-lg mb-10 leading-relaxed">
                       Specifications, technical drawings, and project pricing available on request. Submit an enquiry below or contact info@bsundc.com directly.
                    </motion.p>
                    <motion.div variants={fadeUp} className="space-y-6">
                       <div className="flex items-center gap-4 text-text-body">
                          <Check className="w-5 h-5 text-accent" />
                          <span className="font-body text-sm uppercase tracking-widest">Professional Technical Support</span>
                       </div>
                       <div className="flex items-center gap-4 text-text-body">
                          <Check className="w-5 h-5 text-accent" />
                          <span className="font-body text-sm uppercase tracking-widest">Bulk pricing and project rates available on request</span>
                       </div>
                       <div className="flex items-center gap-4 text-text-body">
                          <Check className="w-5 h-5 text-accent" />
                          <span className="font-body text-sm uppercase tracking-widest">CAD / BIM Files Available</span>
                       </div>
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="lg:col-span-7"
                  >
                    <div className="bg-bg-main border border-text-main/10 shadow-sm p-8 md:p-12 lg:p-16">
                      <div className="space-y-8">
                        <div>
                          <label htmlFor="buyerType" className="block font-body text-xs font-medium uppercase tracking-[0.15em] text-text-main mb-3">Enquiry Type</label>
                          <select 
                            id="buyerType" 
                            name="buyerType" 
                            value={buyerType}
                            onChange={(e) => handleBuyerTypeChange(e.target.value)}
                            disabled
                            className="w-full bg-bg-alt border border-text-main/10 px-5 py-4 font-body text-sm text-text-main focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all appearance-none disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            <option value="">Select an option</option>
                            <option value="retailer">Retailer / Distributor</option>
                            <option value="developer">Developer / Builder</option>
                            <option value="architect">Architect / Specifier</option>
                            <option value="consumer">End Consumer</option>
                            <option value="general">General Enquiry</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <label htmlFor="inquiry-name" className="block font-body text-xs font-medium uppercase tracking-[0.15em] text-text-main mb-3">Full Name</label>
                            <input type="text" id="inquiry-name" name="name" disabled className="w-full bg-bg-alt border border-text-main/10 px-5 py-4 font-body text-sm text-text-main transition-all disabled:opacity-60 disabled:cursor-not-allowed" />
                          </div>
                          <div>
                            <label htmlFor="inquiry-email" className="block font-body text-xs font-medium uppercase tracking-[0.15em] text-text-main mb-3">Email Address</label>
                            <input type="email" id="inquiry-email" name="email" disabled className="w-full bg-bg-alt border border-text-main/10 px-5 py-4 font-body text-sm text-text-main transition-all disabled:opacity-60 disabled:cursor-not-allowed" />
                          </div>
                        </div>
                        {showCompany && (
                          <div>
                            <label htmlFor="inquiry-company" className="block font-body text-xs font-medium uppercase tracking-[0.15em] text-text-main mb-3">Company <span className="text-text-body/50 normal-case tracking-normal">(optional)</span></label>
                            <input type="text" id="inquiry-company" name="company" disabled className="w-full bg-bg-alt border border-text-main/10 px-5 py-4 font-body text-sm text-text-main transition-all disabled:opacity-60 disabled:cursor-not-allowed" />
                          </div>
                        )}
                        <div>
                          <label htmlFor="inquiry-message" className="block font-body text-xs font-medium uppercase tracking-[0.15em] text-text-main mb-3">Message</label>
                          <textarea id="inquiry-message" name="message" rows={5} disabled className="w-full bg-bg-alt border border-text-main/10 px-5 py-4 font-body text-sm text-text-main transition-all resize-y disabled:opacity-60 disabled:cursor-not-allowed" placeholder="Tell us about your project or enquiry."></textarea>
                        </div>
                        <div className="bg-bg-alt border border-text-main/10 p-6 text-center">
                          <p className="font-body text-sm text-text-body mb-4">
                            The online enquiry form is in finalisation. Direct contact: info@bsundc.com or +86 158 21 48 42 72.
                          </p>
                          <a href="mailto:info@bsundc.com?subject=Tap-to-Shower Enquiry" className="inline-flex">
                            <Button variant="primary" size="lg" className="w-full sm:w-auto">
                              <Mail className="w-4 h-4 mr-3" />
                              Email info@bsundc.com
                            </Button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
             </SectionWrapper>
        </section>
      </main>

      <Footer />
    </>
  );
}
