"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, ShieldCheck, Wrench, Layers, Palette, ArrowRight, CheckCircle2 } from "lucide-react";
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
    } catch {
      setInquiryStatus("error");
    }
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
                into a <em className="text-accent">Hot</em> Shower.
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

        {/* ===== 1. WHAT IS TTS ===== */}
        <SectionWrapper id="what-is-tts" className="bg-bg-alt border-t border-text-main/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger}>
              <motion.div variants={fadeUp}><Overline withLine className="mb-6">The Concept</Overline></motion.div>
              <motion.h2 variants={fadeUp} className="font-heading text-4xl lg:text-5xl tracking-tight mb-6 text-text-main">
                What is <em className="text-accent">Tap-to-Shower™</em>?
              </motion.h2>
              <motion.p variants={fadeUp} className="font-body text-lg text-text-body leading-relaxed mb-6">
                Most Philippine bathrooms have a single cold-water line. Upgrading to a hot and cold shower has traditionally meant breaking tiles, rerouting pipes, and weeks of renovation.
              </motion.p>
              {/* [CJ] — ™ dropped on second mention per house style:
                   ™ on first mention per section only (first mention is the H2 above). */}
              <motion.p variants={fadeUp} className="font-body text-lg text-text-body leading-relaxed">
                Tap-to-Shower is a retrofit system. An external PEX line and a specialised connection kit convert a single cold-water line into a hot and cold shower without concealing new plumbing behind walls. Hot and cold water mixed and controlled at the tap.
              </motion.p>
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={revealImage} className="relative aspect-square bg-bg-alt">
              <EditorialImage src="/images/webp_cutouts/tts-connection-set.webp" alt="Tap-to-Shower connection set — PEX tube, push connectors, and brackets" aspect="1/1" className="object-contain p-12" />
            </motion.div>
          </div>
        </SectionWrapper>

        {/* ===== 2. THE FACTS ===== */}
        <SectionWrapper id="features">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center max-w-3xl mx-auto mb-16">
            <motion.div variants={fadeUp} className="flex justify-center mb-6"><Overline withLine>The Facts</Overline></motion.div>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl lg:text-5xl tracking-tight text-text-main">
              Five Things to <em className="text-accent">Know</em>
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
                How It <em className="text-accent">Works</em>
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
        </SectionWrapper>

        {/* ===== 4. WHO IT'S FOR ===== */}
        <SectionWrapper id="who-its-for" className="bg-bg-feature border-y border-text-main/10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="text-center max-w-3xl mx-auto mb-16">
            <motion.div variants={fadeUp} className="flex justify-center mb-6"><Overline withLine>For You</Overline></motion.div>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl lg:text-5xl tracking-tight text-text-main">
              Who It&apos;s <em className="text-accent">For</em>
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
                cta: "Request Information",
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
                  href={group.type === "consumer" ? "/contact?type=consumer" : "#inquiry"}
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
              <EditorialImage src="/images/webp_1200/tts-matt-black.webp" alt="Tap-to-Shower in Matt Black — full installed shower column" aspect="4/5" className="object-cover" />
            </motion.div>
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="lg:col-span-6">
              <motion.div variants={fadeUp}><Overline withLine className="mb-6">Trust Signals</Overline></motion.div>
              <motion.h2 variants={fadeUp} className="font-heading text-4xl tracking-tight mb-10 text-text-main">
                Why This <em className="text-accent">System</em>
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

        {/* ===== DIFFERENTIATOR (F06) ===== */}
        <SectionWrapper id="differentiator" className="border-t border-text-main/10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="max-w-3xl mx-auto text-center">
            <motion.div variants={fadeUp} className="flex justify-center mb-6"><Overline withLine>The Difference</Overline></motion.div>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl lg:text-5xl tracking-tight mb-8 text-text-main">
              Not Just a Heater. A Complete Shower <em className="text-accent">Solution.</em>
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
                Frequently Asked <em className="text-accent">Questions</em>
              </h2>
            </motion.div>
            <div className="space-y-4">
              {[
                { q: "What is Tap-to-Shower™?", a: "Tap-to-Shower™ is a shower concept for single-line (cold-water only) bathrooms. When connected to a suitable instant single-point water heater, it allows hot and cold water to be controlled at the tap without opening the wall or adding concealed pipework." },
                { q: "How is it different from a normal instant water heater shower?", a: "A standard instant water heater typically provides one outlet — a hand shower. Tap-to-Shower™ provides the complete shower interface: tap control, overhead shower, hand shower, and a column rail — with temperature and flow adjusted at the tap, not the heater." },
                { q: "Do I need to open the wall or change concealed plumbing?", a: "No concealed pipe rerouting or wall opening is required under suitable site conditions. The PEX tube routes neatly along the wall surface and is fixed with included brackets and clips." },
                { q: "What heater type is suitable?", a: "Tap-to-Shower™ is compatible with suitable instant single-point water heaters with a G½\" connection. Booster-pump configured heaters are generally not suitable." },
                { q: "How does the user adjust temperature and flow?", a: "Set the water heater to its operating temperature once at installation. After that, open the tap and adjust both flow and temperature at the shower point — from cold to hot — just like a conventional mixer shower." },
                { q: "Can it be sold with or without a heater?", a: "Yes. Tap-to-Shower™ is available as a tap only (TTS-01), a connection set (TF01-C), or as a complete kit with a compatible water heater." },
                { q: "What finishes are available?", a: "Chrome, Matt Black, and Brushed Stainless Steel." },
                { q: "What water pressure is required?", a: "The system requires a minimum water pressure suitable for the connected instant water heater. Very low pressure and rooftop tank-fed installations are generally not suitable unless a specific approved configuration is confirmed." },
                { q: "Is it suitable for rooftop tank-fed installations?", a: "Generally not suitable. Rooftop gravity-fed systems typically do not produce the minimum pressure required for the instant water heater to operate correctly." },
                { q: "Can it be used with booster-pump configured instant heaters?", a: "Not unless a specific approved package is confirmed. Booster-pump heater configurations can affect flow and pressure compatibility." },
                { q: "What warranty is available?", a: "The Tap-to-Shower™ tap carries a 3-year limited warranty. Compatible instant water heater models may carry their own warranty — confirm with BSC at time of order." },
                { q: "Where can retailers, developers, or homeowners enquire?", a: "Contact BSC directly through the enquiry form on this page or via the Contact page. Enquiry type selection routes your message to the right person." }
              ].map((faq, i) => (
                <FAQAccordion key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>
          </motion.div>
        </SectionWrapper>

        {/* ===== SUITABILITY ===== */}
        <SectionWrapper id="suitability" className="border-t border-text-main/10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true }} variants={stagger} className="max-w-3xl mx-auto text-center">
            <motion.div variants={fadeUp} className="flex justify-center mb-6"><Overline withLine>Suitability</Overline></motion.div>
            <motion.h2 variants={fadeUp} className="font-heading text-4xl lg:text-5xl tracking-tight mb-8 text-text-main">
              Before You Specify or <em className="text-accent">Install</em>
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body text-lg text-text-body leading-relaxed">
              Tap-to-Shower™ requires a minimum water pressure suitable for the connected instant water heater. It is not suitable for very low pressure supplies or rooftop gravity-tank-fed installations unless a specific approved configuration is confirmed. It is not suitable for booster-pump configured instant heaters unless approved. Electrical installation of the water heater must be carried out by a qualified person.
            </motion.p>
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
