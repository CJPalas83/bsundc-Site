"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, ShieldCheck, Wrench, Layers, Palette, ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionWrapper from "../components/SectionWrapper";
import EditorialImage from "../components/EditorialImage";
import Overline from "../components/Overline";
import Button from "../components/Button";
import TapToShowerNav from "./TapToShowerNav";
import { trackEvent } from "../lib/analytics";
import Card from "../components/Card";
import Heading from "../components/Heading";

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
  const [inquiryStatus, setInquiryStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

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
      // Reading window.location.search must happen post-mount to avoid SSR
      // hydration mismatch — setState here is intentional, runs once on mount.
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
      consumer: "consumer",
    };
    const mapped = typeMap[type] || "";
    setBuyerType(mapped);
    setShowCompany(mapped !== "consumer");
    document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInquiryStatus("submitting");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiryType: buyerType || "general",
          firstName: (fd.get("name") as string) || "",
          lastName: "",
          company: (fd.get("company") as string) || "",
          email: (fd.get("email") as string) || "",
          phone: "",
          message: (fd.get("message") as string) || "",
          sourcePage: "Tap-to-Shower page",
        }),
      });
      if (!res.ok) throw new Error();
      setInquiryStatus("success");
      trackEvent("form_submit", { type: buyerType || "general", page: "tap-to-shower" });
    } catch {
      setInquiryStatus("error");
    }
  };

  return (
    <>
      <Navbar />
      <TapToShowerNav />

      <main className="bg-bg-main min-h-screen pt-16 lg:pt-20">
        {/* ===== HERO SECTION ===== */}
        <SectionWrapper id="tts-hero" pt="pt-6 lg:pt-10" className="pb-12 lg:pb-20">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
          >
            <div className="lg:col-span-6">
              <Heading
                level="h1"
                className="leading-[0.95] tracking-tight mb-6"
              >
                The Hot &amp; Cold Shower Experience. <span className="text-accent">Without</span> the Bathroom Renovation.
              </Heading>

              <motion.p
                variants={fadeUp}
                className="font-body text-lg md:text-xl text-text-body leading-relaxed max-w-lg mb-3"
              >
                Upgrade your bathroom with complete temperature control and high-flow overhead performance — directly from your existing cold-water line.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="font-body text-sm text-text-body/60 mb-10"
              >
                European know-how. Available across Southeast Asia.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="primary" 
                  className="w-full sm:w-auto"
                  onClick={() => scrollToInquiry("general")}
                >
                  Request Product Information
                </Button>
                <a href="#how-it-works" className="w-full sm:w-auto">
                  <Button variant="secondary" className="w-full">How It Works</Button>
                </a>
              </motion.div>
            </div>

            <div className="lg:col-span-6">
              <motion.div variants={revealImage} className="relative overflow-hidden w-full aspect-[4/5]">
                <EditorialImage
                  src="/images/webp_1920/tts-chrome-mattblack-2.webp"
                  alt="Tap-to-Shower in Chrome and Matt Black — installed shower columns in a real bathroom"
                  aspect="4/5"
                  priority
                  className="object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </SectionWrapper>

        {/* ===== PROBLEM SECTION ===== */}
        <SectionWrapper id="problem" rhythm="secondary" className="bg-bg-alt border-t border-text-main/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp}><Overline withLine className="mb-6">The Challenge</Overline></motion.div>
              <Heading level="h2" className="mb-6">
                The Single-Line Bathroom <span className="text-accent">Problem</span>
              </Heading>
              <motion.p variants={fadeUp} className="font-body text-lg text-text-body leading-relaxed mb-6">
                Most bathrooms in the region start with a single cold-water outlet. Upgrading to a hot and cold shower traditionally requires breaking open tiled walls, rerouting concealed pipes, and weeks of messy, expensive renovations.
              </motion.p>
              <motion.p variants={fadeUp} className="font-body text-lg text-text-body leading-relaxed">
                For developers, builders, and homeowners alike, upgrading single-line layouts has been an all-or-nothing plumbing project. Until now.
              </motion.p>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={revealImage} className="relative aspect-[4/3] bg-bg-alt overflow-hidden">
              <EditorialImage src="/images/webp_1920/tts-chrome-mattblack-1.webp" alt="Single-line bathroom plumbing challenge illustration" aspect="16/9" className="object-cover w-full h-full" />
            </motion.div>
          </div>
        </SectionWrapper>

        {/* ===== CONCEPT SECTION ===== */}
        <SectionWrapper id="what-is-tts" rhythm="secondary" className="border-t border-text-main/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="lg:order-2">
              <motion.div variants={fadeUp}><Overline withLine className="mb-6">The Concept</Overline></motion.div>
              <Heading level="h2" className="mb-6">
                Introducing <span className="text-accent">Tap-to-Shower™</span>
              </Heading>
              <motion.p variants={fadeUp} className="font-body text-lg text-text-body leading-relaxed mb-6">
                Tap-to-Shower mixes hot and cold water and controls flow directly at the tap point. It connects to a single-point instant water heater via a neat, surface-mounted PEX connection set.
              </motion.p>
              <motion.p variants={fadeUp} className="font-body text-lg text-text-body leading-relaxed">
                You get the convenience of a modern overhead rain shower and hand shower combo with complete temperature mixing, while leaving your tiled walls completely intact.
              </motion.p>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={revealImage} className="relative aspect-square bg-bg-alt lg:order-1">
              <EditorialImage src="/images/webp_cutouts/tts-connection-set.webp" alt="Tap-to-Shower connection set — PEX tube, push connectors, and brackets" aspect="1/1" className="object-contain p-12" />
            </motion.div>
          </div>
        </SectionWrapper>

        {/* ===== DIFFERENTIATOR SECTION ===== */}
        <SectionWrapper id="more-than-heater" rhythm="secondary" className="bg-bg-feature border-t border-text-main/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="lg:col-span-5">
              <motion.div variants={fadeUp}><Overline withLine className="mb-6">The Difference</Overline></motion.div>
              <Heading level="h2" className="mb-6">
                More Than a Heater with a Hand <span className="text-accent">Shower</span>
              </Heading>
              <motion.p variants={fadeUp} className="font-body text-lg text-text-body leading-relaxed mb-8">
                A basic instant water heater typically provides only a single hand shower outlet and requires adjustments directly on the heater unit. Tap-to-Shower replaces that basic interface with a premium, fully integrated system.
              </motion.p>
              <motion.div variants={revealImage} className="relative overflow-hidden w-full aspect-[4/5] rounded-sm">
                <EditorialImage src="/images/webp_1200/tts-matt-black.webp" alt="Tap-to-Shower in Matt Black — full installed shower column" aspect="4/5" className="object-cover" />
              </motion.div>
            </motion.div>

            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="lg:col-span-7 space-y-8 lg:pt-24">
              {[
                { title: "Tap Control & Temperature Mixing", desc: "Set the water heater operating temperature once at installation. Adjust daily comfort and mix hot/cold water directly at the single-lever tap point." },
                { title: "Overhead Rain & Hand Shower", desc: "A premium column rail carrying both a generous overhead rain shower and a flexible hand shower outlet, easily switchable." },
                { title: "Clean Surface Routing", desc: "Specially designed brackets route PEX tubing flush to the wall, creating a clean, professional, and secure visual result." },
                { title: "Complete Integrated Package", desc: "A single SKU delivers the column, valve, connection set, and optional compatible high-performance instant heater." }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="flex gap-5">
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="font-body font-medium text-text-main text-lg mb-2">{item.title}</h4>
                    <p className="font-body text-text-body leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </SectionWrapper>

        {/* ===== HOW IT WORKS ===== */}
        <SectionWrapper id="how-it-works" rhythm="secondary" className="bg-text-main text-bg-main" dark>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-16">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="lg:col-span-5">
              <motion.div variants={fadeUp}><Overline withLine dark className="mb-6">Installation</Overline></motion.div>
              <Heading level="h2" className="mb-6 text-bg-main">
                How It <span className="text-accent">Works</span>
              </Heading>
              <motion.p variants={fadeUp} className="font-body text-lg text-bg-main/70 leading-relaxed mb-10">
                The PEX retrofit connection set is designed for professional installation with no concealed plumbing or wall opening required.
              </motion.p>
              <div className="space-y-8">
                {[
                  "The Tap-to-Shower™ column mounts to the existing G½″ cold-water outlet.",
                  "The instant water heater installs wall-hung, with a 6m cuttable PEX tube run to the column.",
                  "Push connectors and a safety valve complete the connection.",
                  "The retrofit is complete. Hot and cold water mixed at the tap."
                ].map((step, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex gap-6 items-start">
                    <span className="font-heading text-3xl text-accent leading-none">0{i + 1}</span>
                    <p className="font-body text-bg-main/90 pt-1">{step}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={revealImage} className="lg:col-span-7 aspect-square">
              <EditorialImage src="/images/webp_1200/tts-kit.webp" alt="Tap-to-Shower kit — tap, connection set, and water heater laid out together" aspect="1/1" className="opacity-90 rounded-sm" />
            </motion.div>
          </div>

          {/* GALLERY EMBEDDED IN INSTALL ARC */}
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              {[
                { src: "/images/webp_1200/tts-chrome-tap-body.webp", alt: "Tap-to-Shower chrome tap body with spout" },
                { src: "/images/webp_1200/tts-chrome-hand-shower.webp", alt: "Tap-to-Shower chrome hand shower detail" },
                { src: "/images/webp_1200/tts-chrome-overhead.webp", alt: "Tap-to-Shower chrome overhead shower detail" },
                { src: "/images/webp_1200/tts-connection-set.webp", alt: "Tap-to-Shower connection set — PEX tube, push connectors, and brackets" }
              ].map((img, i) => (
                <motion.div key={i} variants={fadeUp} className="aspect-square bg-bg-alt relative overflow-hidden group">
                  <EditorialImage
                    src={img.src}
                    alt={img.alt}
                    aspect="1/1"
                    className="object-cover w-full h-full"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </SectionWrapper>

        {/* ===== WHO WE SERVE / BUYER GATEWAY ===== */}
        <SectionWrapper id="who-its-for" rhythm="secondary" className="bg-bg-feature border-y border-text-main/10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center max-w-3xl mx-auto mb-16">
            <motion.div variants={fadeUp} className="flex justify-center mb-6"><Overline withLine>For You</Overline></motion.div>
            <Heading level="h2" className="mb-4">
              Who We <span className="text-accent">Serve</span>
            </Heading>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Retailers / Distributors",
                headline: "Stock a Product That Explains Itself at the Shelf",
                bullets: [
                  "Ready retail package with clear value-for-money story",
                  "Strong shelf-level product explanation — no staff training required",
                  "Margin and turnover relevance in cold-water markets"
                ],
                cta: "Ask About Retail Packages",
                href: "/for-your-project/retailers"
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
                href: "/for-your-project/developers"
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
                href: "/for-your-project/architects"
              },
              {
                title: "End Consumers",
                headline: "Hot Shower Comfort Without Opening Your Wall",
                bullets: [
                  "Neat visible installation suited for various site layouts",
                  "Available in Chrome, Matt Black, and Brushed Stainless Steel",
                  "3-year limited warranty on the tap"
                ],
                cta: "Request Information",
                href: "/for-your-project/consumers"
              }
            ].map((group, i) => (
              <Card key={i} className="flex flex-col h-full bg-bg-main" hoverable>
                <Heading level="h3" className="mb-2">{group.title}</Heading>
                <p className="font-body text-sm font-medium text-accent mb-4 italic">{group.headline}</p>
                <ul className="space-y-2 mb-8 flex-grow">
                  {group.bullets.map((bullet, bi) => (
                    <li key={bi} className="flex items-start gap-3">
                      <span className="block w-1.5 h-1.5 mt-2 bg-accent shrink-0" />
                      <span className="font-body text-sm text-text-body leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
                <Link href={group.href} className="mt-auto">
                  <Button
                    variant="link"
                    className="group/btn !p-0 !h-auto flex items-center gap-2 text-accent"
                  >
                    {group.cta} <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </SectionWrapper>

        {/* ===== WHAT TO KNOW BEFORE CHOOSING ===== */}
        <SectionWrapper id="features" rhythm="secondary">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center max-w-3xl mx-auto mb-16">
            <motion.div variants={fadeUp} className="flex justify-center mb-6"><Overline withLine>Technical Details</Overline></motion.div>
            <Heading level="h2">
              What to Know Before <span className="text-accent">Choosing</span>
            </Heading>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { 
                icon: Clock, 
                title: "Tap Control, External Heater",
                desc: "The single-lever tap controls water mixing and flow. Water heating is performed by a connected separate single-point water heater (tap body itself does not heat)." 
              },
              { 
                icon: Wrench, 
                title: "Professional Installation", 
                desc: "Designed for simple surface-mount installation by a qualified plumber. Actual setup times will vary based on layout and wall materials." 
              },
              { 
                icon: ShieldCheck, 
                title: "Single-Line Supply Connection", 
                desc: "Connects directly to your existing single G½″ cold-water outlet without wall restructuring or internal pipe modifications." 
              },
              { 
                icon: Layers, 
                title: "Model-Specific Certification", 
                desc: "Compatible water heaters may carry CB certification under IEC 60335-2-35. Certification compliance is subject to specific heater models and local market requirements." 
              },
              { 
                icon: Palette, 
                title: "Tap Warranty & Finishes", 
                desc: "The tap carries a 3-year limited warranty and is available in Chrome, Matt Black, and Brushed Stainless Steel. Water heater warranty depends on the package." 
              }
            ].map((feat, i) => (
              <Card key={i} className="flex flex-col h-full bg-bg-alt text-center" hoverable={false}>
                <feat.icon className="w-7 h-7 text-accent mb-4 mx-auto" strokeWidth={1.5} />
                <Heading level="h3" className="text-base text-text-main mb-3">{feat.title}</Heading>
                <p className="font-body text-xs text-text-body/80 leading-relaxed mt-auto">{feat.desc}</p>
              </Card>
            ))}
          </div>
        </SectionWrapper>

        {/* ===== FAQ SECTION ===== */}
        <SectionWrapper id="faq" rhythm="secondary" className="bg-bg-alt border-t border-text-main/10 mt-1">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="max-w-4xl mx-auto">
            <motion.div variants={fadeUp} className="text-center mb-16">
              <Overline withLine className="mb-6 justify-center">Support</Overline>
              <Heading level="h2" className="text-center">
                Frequently Asked <span className="text-accent">Questions</span>
              </Heading>
            </motion.div>
            <div className="space-y-4">
              {[
                { 
                  q: "What is Tap-to-Shower™?", 
                  a: "Tap-to-Shower™ is a retrofitting shower system for single-line (cold-water only) bathrooms. When paired with a compatible single-point instant water heater, it allows hot and cold water to be mixed and controlled directly at the tap body without opening your walls or modifying concealed pipework." 
                },
                { 
                  q: "How is it different from a standard instant water heater setup?", 
                  a: "A typical instant water heater provides only a single hand shower outlet and requires you to adjust temperature at the heater unit itself. Tap-to-Shower™ provides a complete dual-outlet shower interface (overhead rain shower and hand shower) with volume and temperature mixed right at the tap lever." 
                },
                { 
                  q: "Do I need to break tiles or change concealed plumbing?", 
                  a: "No wall opening or tile breakages are required under suitable site conditions. The connection set routes PEX tubing cleanly along the surface of your wall, secured with the included mounting brackets." 
                },
                { 
                  q: "What water pressure is required and is it gravity-fed friendly?", 
                  a: "The system requires water pressure that matches the operating threshold of the connected instant water heater. Rooftop gravity-tank-fed supplies typically do not produce sufficient pressure to trigger instant heaters and are not suitable unless a specific approved configuration is confirmed." 
                },
                { 
                  q: "Can it be used with booster-pump heaters?", 
                  a: "Compatibility with booster-pump heaters depends on the specific pump and flow ratings. Standard booster-pump configurations can affect flow compatibility, so only approved packages should be utilized." 
                },
                { 
                  q: "What warranty coverage is included?", 
                  a: "The Tap-to-Shower™ tap body and cartridges are covered by a 3-year limited warranty. Connected instant water heater units carry their own separate manufacturer warranty (confirm specific package details with BSC at time of purchase)." 
                }
              ].map((faq, i) => (
                <FAQAccordion key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </motion.div>
        </SectionWrapper>

        {/* ===== 7. LEAD CAPTURE FORM ===== */}
        <section id="inquiry" className="bg-bg-alt border-t border-text-main/10">
          <SectionWrapper pt="pt-14 lg:pt-20" pb="pb-14 lg:pb-20">
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
                <motion.h2 variants={fadeUp} className="font-heading text-3xl md:text-4xl lg:text-5xl text-text-main tracking-tight mb-6">
                  Submit an <em className="text-accent">Enquiry</em>
                </motion.h2>
                <motion.p variants={fadeUp} className="font-body text-text-body text-lg mb-10 leading-relaxed">
                  Specifications, technical drawings, and project pricing available on request. Submit an enquiry below or contact info@bsundc.com directly.
                </motion.p>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="lg:col-span-7"
              >
                <div className="bg-bg-main border border-text-main/10 shadow-sm p-8 md:p-12 lg:p-16">
                  {inquiryStatus === "success" ? (
                    <div className="text-center py-10">
                      <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                        <CheckCircle2 className="w-7 h-7 text-accent" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-heading text-2xl text-text-main mb-3">Thank you</h3>
                      <p className="font-body text-text-body max-w-md mx-auto leading-relaxed">
                        Thank you. We received your enquiry and will respond as soon as possible.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleInquirySubmit} className="space-y-8">
                      <div>
                        <label htmlFor="buyerType" className="block font-body text-xs font-medium uppercase tracking-[0.15em] text-text-main mb-3">Enquiry Type</label>
                        <select
                          id="buyerType"
                          name="buyerType"
                          value={buyerType}
                          onChange={(e) => handleBuyerTypeChange(e.target.value)}
                          className="w-full bg-bg-alt border border-text-main/10 px-5 py-4 font-body text-sm text-text-main focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all appearance-none"
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
                          <input type="text" id="inquiry-name" name="name" required className="w-full bg-bg-alt border border-text-main/10 px-5 py-4 font-body text-sm text-text-main focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all" />
                        </div>
                        <div>
                          <label htmlFor="inquiry-email" className="block font-body text-xs font-medium uppercase tracking-[0.15em] text-text-main mb-3">Email Address</label>
                          <input type="email" id="inquiry-email" name="email" required className="w-full bg-bg-alt border border-text-main/10 px-5 py-4 font-body text-sm text-text-main focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all" />
                        </div>
                      </div>
                      {showCompany && (
                        <div>
                          <label htmlFor="inquiry-company" className="block font-body text-xs font-medium uppercase tracking-[0.15em] text-text-main mb-3">Company <span className="text-text-body/50 normal-case tracking-normal">(optional)</span></label>
                          <input type="text" id="inquiry-company" name="company" className="w-full bg-bg-alt border border-text-main/10 px-5 py-4 font-body text-sm text-text-main focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all" />
                        </div>
                      )}
                      <div>
                        <label htmlFor="inquiry-message" className="block font-body text-xs font-medium uppercase tracking-[0.15em] text-text-main mb-3">Message</label>
                        <textarea id="inquiry-message" name="message" rows={5} required className="w-full bg-bg-alt border border-text-main/10 px-5 py-4 font-body text-sm text-text-main focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all resize-y" placeholder="Tell us about your project or enquiry."></textarea>
                      </div>
                      {inquiryStatus === "error" && (
                        <p className="font-body text-sm text-red-600">Something went wrong. Please email info@bsundc.com directly.</p>
                      )}
                      <p className="font-body text-xs text-text-body/70">
                        By submitting this form, you agree to our <a href="/privacy" className="text-accent hover:underline">Privacy Policy</a>.
                      </p>
                      <Button type="submit" variant="primary" size="lg" disabled={inquiryStatus === "submitting"} className="w-full sm:w-auto">
                        {inquiryStatus === "submitting" ? "Submitting…" : "Submit Enquiry"}
                      </Button>
                    </form>
                  )}
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
