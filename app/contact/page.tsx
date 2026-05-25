"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import Overline from "../components/Overline";

/* ==============================
   ANIMATION VARIANTS
   ============================== */
const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ==============================
   DATA
   ============================== */
// [CJ] — Enquiry types align with TTS lead-capture buyer-type selector
//        (TICKET-003). Five mutually-exclusive options.
const enquiryTypes = [
  { value: "retailer",  label: "Retailer / Distributor" },
  { value: "developer", label: "Developer / Builder" },
  { value: "architect", label: "Architect / Specifier" },
  { value: "consumer",  label: "End Consumer" },
  { value: "general",   label: "General Enquiry" },
];

/* ==============================
   PAGE
   ============================== */
export default function ContactPage() {
  const [enquiryType, setEnquiryType] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  // Pre-select enquiry type from the ?type= URL parameter (set by buyer-page CTAs).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("type");
    const map: Record<string, string> = {
      retail: "retailer",
      developer: "developer",
      architect: "architect",
      consumer: "consumer",
      general: "general",
    };
    if (t && map[t]) setEnquiryType(map[t]);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const fd = new FormData(e.currentTarget);
    const phone = [fd.get("countryCode"), fd.get("phone")].filter(Boolean).join(" ").trim();
    const address = [fd.get("street"), fd.get("houseNumber"), fd.get("city"), fd.get("zip"), fd.get("country")]
      .filter(Boolean)
      .join(", ");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enquiryType: enquiryType || "general",
          firstName: (fd.get("firstName") as string) || "",
          lastName: (fd.get("lastName") as string) || "",
          company: (fd.get("company") as string) || "",
          email: (fd.get("email") as string) || "",
          phone,
          message: (fd.get("message") as string) || "",
          sourcePage: "Contact page",
          address,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative flex items-end bg-bg-main overflow-hidden min-h-[40vh] lg:min-h-[50vh]">
        {/* Decorative large text background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="font-heading text-[16vw] lg:text-[12vw] font-normal tracking-tighter text-text-main/[0.03] leading-none">
            CONTACT
          </span>
        </div>

        <div className="mx-auto max-w-[1600px] w-full px-6 md:px-16 pb-12 md:pb-16 pt-24 lg:pt-32">
          <motion.div
            initial="hidden"
            animate="show"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp}>
              <Overline withLine className="mb-6">
                Get In Touch
              </Overline>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight mb-6 text-text-main"
            >
              Let&apos;s{" "}
              <em className="text-accent">Talk</em>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body text-base md:text-lg text-text-body leading-relaxed max-w-xl"
            >
              For bathroom and kitchen product enquiries or partnership
              conversations, contact us below.
            </motion.p>
          </motion.div>
        </div>

        {/* Vertical label */}
        <span className="hidden lg:block vertical-text absolute right-16 bottom-16 font-body text-[10px] uppercase tracking-[0.3em] text-text-body/40">
          Contact / Enquiry
        </span>
      </section>

      {/* ===== FORM SECTION ===== */}
      <section className="bg-bg-alt border-t border-text-main/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-16 py-14 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
            {/* Left — Sidebar info */}
            <motion.aside
              className="lg:col-span-4 lg:sticky lg:top-28 self-start"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={stagger}
            >
              <motion.div variants={fadeUp}>
                <Overline withLine className="mb-6">
                  Contact Information
                </Overline>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="font-heading text-3xl md:text-4xl leading-[0.95] tracking-tight text-text-main mb-10"
              >
                Send us an <em className="text-accent">Enquiry</em>
              </motion.h2>

              <motion.div variants={fadeUp} className="space-y-8">
                {/* Email */}
                <div>
                  <span className="font-body text-[10px] uppercase tracking-[0.25em] text-text-body/60 block mb-2">
                    Email
                  </span>
                  <a
                    href="mailto:info@bsundc.com"
                    className="font-body text-sm text-text-main hover:text-accent transition-colors duration-200"
                  >
                    info@bsundc.com
                  </a>
                </div>

                {/* Response time */}
                <div>
                  <span className="font-body text-[10px] uppercase tracking-[0.25em] text-text-body/60 block mb-2">
                    Response Time
                  </span>
                  <p className="font-body text-sm text-text-body">
                    We typically respond within 1–2 business days.
                  </p>
                </div>

                {/* Decorative line */}
                <div className="h-px w-full bg-text-main/10" />

                <p className="font-body text-xs text-text-body/50 leading-relaxed">
                  All enquiries are treated with strict confidentiality.
                  Your information will only be used to respond to your
                  request.
                </p>
              </motion.div>
            </motion.aside>

            {/* Right — Form */}
            <motion.div
              className="lg:col-span-7 lg:col-start-6"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              variants={stagger}
            >
             <div className="bg-bg-main border border-text-main/10 shadow-sm p-8 md:p-12 lg:p-16">
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-bg-main border border-text-main/10 p-12 md:p-16 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl tracking-tight text-text-main mb-3">
                    Thank You
                  </h3>
                  <p className="font-body text-sm text-text-body max-w-md mx-auto">
                    Thank you. We received your enquiry and will respond as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-0 mt-0">
                  {/* Personal Information */}
                  <motion.div variants={fadeUp}>
                    <div className="border-b border-text-main/10 pb-2 mb-8">
                      <span className="font-body text-[10px] uppercase tracking-[0.25em] text-text-body/60">
                        Personal Information
                      </span>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-12">
                    <motion.div variants={fadeUp}>
                      <label
                        htmlFor="firstName"
                        className="block font-body text-xs font-medium uppercase tracking-[0.15em] text-text-main mb-2"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="First Name"
                        required
                        className="w-full bg-bg-main border border-text-main/10 px-4 py-3 font-body text-sm text-text-main placeholder:text-text-body/30 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                      />
                    </motion.div>

                    <motion.div variants={fadeUp}>
                      <label
                        htmlFor="lastName"
                        className="block font-body text-xs font-medium uppercase tracking-[0.15em] text-text-main mb-2"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Surname"
                        required
                        className="w-full bg-bg-main border border-text-main/10 px-4 py-3 font-body text-sm text-text-main placeholder:text-text-body/30 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                      />
                    </motion.div>
                  </div>

                  {/* Company */}
                  <motion.div variants={fadeUp}>
                    <div className="border-b border-text-main/10 pb-2 mb-8">
                      <span className="font-body text-[10px] uppercase tracking-[0.25em] text-text-body/60">
                        Company Details
                      </span>
                    </div>
                  </motion.div>

                  <div className="space-y-6 mb-12">
                    <motion.div variants={fadeUp}>
                      <label
                        htmlFor="company"
                        className="block font-body text-xs font-medium uppercase tracking-[0.15em] text-text-main mb-2"
                      >
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        placeholder="Company Name"
                        className="w-full bg-bg-main border border-text-main/10 px-4 py-3 font-body text-sm text-text-main placeholder:text-text-body/30 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                      />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <motion.div variants={fadeUp}>
                        <label
                          htmlFor="address"
                          className="block font-body text-xs font-medium uppercase tracking-[0.15em] text-text-main mb-2"
                        >
                          Address
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          <input
                            type="text"
                            id="address"
                            name="street"
                            placeholder="Street Address"
                            className="col-span-2 bg-bg-main border border-text-main/10 px-4 py-3 font-body text-sm text-text-main placeholder:text-text-body/30 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                          />
                          <input
                            type="text"
                            name="houseNumber"
                            placeholder="No."
                            className="bg-bg-main border border-text-main/10 px-4 py-3 font-body text-sm text-text-main placeholder:text-text-body/30 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                          />
                        </div>
                      </motion.div>

                      <motion.div variants={fadeUp}>
                        <label
                          htmlFor="city"
                          className="block font-body text-xs font-medium uppercase tracking-[0.15em] text-text-main mb-2"
                        >
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          placeholder="City Name"
                          className="w-full bg-bg-main border border-text-main/10 px-4 py-3 font-body text-sm text-text-main placeholder:text-text-body/30 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                        />
                      </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <motion.div variants={fadeUp}>
                        <label
                          htmlFor="zip"
                          className="block font-body text-xs font-medium uppercase tracking-[0.15em] text-text-main mb-2"
                        >
                          Zip Code
                        </label>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          placeholder="Zip Code"
                          className="w-full bg-bg-main border border-text-main/10 px-4 py-3 font-body text-sm text-text-main placeholder:text-text-body/30 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                        />
                      </motion.div>

                      <motion.div variants={fadeUp}>
                        <label
                          htmlFor="country"
                          className="block font-body text-xs font-medium uppercase tracking-[0.15em] text-text-main mb-2"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          placeholder="Country Name"
                          className="w-full bg-bg-main border border-text-main/10 px-4 py-3 font-body text-sm text-text-main placeholder:text-text-body/30 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Contact */}
                  <motion.div variants={fadeUp}>
                    <div className="border-b border-text-main/10 pb-2 mb-8">
                      <span className="font-body text-[10px] uppercase tracking-[0.25em] text-text-body/60">
                        Contact Details
                      </span>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-12">
                    <motion.div variants={fadeUp}>
                      <label
                        htmlFor="phone"
                        className="block font-body text-xs font-medium uppercase tracking-[0.15em] text-text-main mb-2"
                      >
                        Phone Number
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        <input
                          type="text"
                          name="countryCode"
                          placeholder="+ Code"
                          className="bg-bg-main border border-text-main/10 px-4 py-3 font-body text-sm text-text-main placeholder:text-text-body/30 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                        />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="Phone Number"
                          className="col-span-2 bg-bg-main border border-text-main/10 px-4 py-3 font-body text-sm text-text-main placeholder:text-text-body/30 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={fadeUp}>
                      {/* [CJ] — "E-Mail" → "Email Address" per form label standard. */}
                      <label
                        htmlFor="email"
                        className="block font-body text-xs font-medium uppercase tracking-[0.15em] text-text-main mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@mail.com"
                        required
                        className="w-full bg-bg-main border border-text-main/10 px-4 py-3 font-body text-sm text-text-main placeholder:text-text-body/30 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300"
                      />
                    </motion.div>
                  </div>

                  {/* Enquiry Type */}
                  <motion.div variants={fadeUp}>
                    <div className="border-b border-text-main/10 pb-2 mb-8">
                      <span className="font-body text-[10px] uppercase tracking-[0.25em] text-text-body/60">
                        Enquiry Type
                      </span>
                    </div>
                  </motion.div>

                  <motion.div
                    variants={fadeUp}
                    role="radiogroup"
                    aria-label="Enquiry type"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12"
                  >
                    {enquiryTypes.map((opt) => {
                      const isActive = enquiryType === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          role="radio"
                          aria-checked={isActive}
                          onClick={() => setEnquiryType(opt.value)}
                          className={`group relative text-left px-5 py-3.5 border transition-all duration-200 cursor-pointer ${
                            isActive
                              ? "bg-accent border-accent text-bg-main"
                              : "bg-bg-main border-text-main/10 text-text-main hover:border-accent/30 hover:bg-accent/[0.03]"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            {/* Custom radio */}
                            <span
                              className={`flex-shrink-0 w-4 h-4 rounded-full border flex items-center justify-center transition-all duration-200 ${
                                isActive
                                  ? "border-bg-main/40 bg-bg-main/20"
                                  : "border-text-main/20 group-hover:border-accent/40"
                              }`}
                            >
                              {isActive && (
                                <span className="w-1.5 h-1.5 rounded-full bg-bg-main" />
                              )}
                            </span>
                            <span className="font-body text-xs font-medium tracking-wide">
                              {opt.label}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                    {/* Hidden input so the value is included in form submissions */}
                    <input type="hidden" name="enquiryType" value={enquiryType} />
                  </motion.div>

                  {/* Message */}
                  <motion.div variants={fadeUp}>
                    <div className="border-b border-text-main/10 pb-2 mb-8">
                      <span className="font-body text-[10px] uppercase tracking-[0.25em] text-text-body/60">
                        Your Message
                      </span>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp} className="mb-12">
                    {/* [CJ] — "Write a Message" → "Message" per form label standard. */}
                    <label
                      htmlFor="message"
                      className="block font-body text-xs font-medium uppercase tracking-[0.15em] text-text-main mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Tell us about your project, requirements, or any questions you have..."
                      className="w-full bg-bg-main border border-text-main/10 px-4 py-3 font-body text-sm text-text-main placeholder:text-text-body/30 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all duration-300 resize-vertical min-h-[140px]"
                    />
                  </motion.div>

                  {/* Submit */}
                  <motion.div variants={fadeUp}>
                    <Button type="submit" variant="primary" size="lg" withArrow className="w-full md:w-auto">
                      Submit Enquiry
                    </Button>
                  </motion.div>
                </form>
              )}
             </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
