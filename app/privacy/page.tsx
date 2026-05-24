import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How BSC collects, uses, and protects information you share through our website and enquiry forms.",
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-bg-main">
      {/* ===== HEADER ===== */}
      <section className="border-b border-text-main/10 pt-32 lg:pt-40 pb-16">
        <div className="mx-auto max-w-[900px] px-6 md:px-16">
          <p className="font-body text-[10px] uppercase tracking-[0.3em] text-text-body/50 mb-6">
            Legal
          </p>
          <h1 className="font-heading text-5xl md:text-7xl leading-[0.95] tracking-tight text-text-main mb-6">
            Privacy <em className="text-accent">Policy</em>
          </h1>
          <p className="font-body text-sm text-text-body/60">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </section>

      {/* ===== BODY ===== */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[760px] px-6 md:px-16 space-y-10 font-body text-base text-text-body leading-relaxed">

          <div>
            <h2 className="font-heading text-2xl md:text-3xl text-text-main mb-4 tracking-tight">1. Introduction</h2>
            <p>
              This Privacy Policy explains how BSC (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and protects information when you visit our website or submit an enquiry. By using this site, you consent to the practices described here.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl md:text-3xl text-text-main mb-4 tracking-tight">2. Information We Collect</h2>
            <p className="mb-3">When you submit an enquiry through our contact form, we may collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Name and contact details (email, phone, address)</li>
              <li>Company or organisation name, where provided</li>
              <li>The content of your message and any product collections you indicate interest in</li>
              <li>Basic technical information (browser type, device, pages visited) for site analytics</li>
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-2xl md:text-3xl text-text-main mb-4 tracking-tight">3. How We Use Your Information</h2>
            <p className="mb-3">We use the information you provide to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Respond to your enquiry and provide requested product information</li>
              <li>Connect you with authorised dealers or project partners where relevant</li>
              <li>Improve our website, products, and services</li>
              <li>Comply with legal and regulatory obligations</li>
            </ul>
            <p className="mt-3">We do not sell, rent, or trade your personal information to third parties.</p>
          </div>

          <div>
            <h2 className="font-heading text-2xl md:text-3xl text-text-main mb-4 tracking-tight">4. Data Sharing</h2>
            <p>
              We may share your information only with: (a) authorised BSC dealers or partners directly relevant to your enquiry, (b) service providers who help us operate the site (e.g. email delivery, hosting), bound by confidentiality, and (c) authorities where required by law.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl md:text-3xl text-text-main mb-4 tracking-tight">5. Data Retention</h2>
            <p>
              We retain enquiry data only as long as needed to respond to your request and maintain reasonable business records, after which it is deleted or anonymised.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl md:text-3xl text-text-main mb-4 tracking-tight">6. Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal information by contacting us at{" "}
              <a href="mailto:info@bsundc.com" className="text-accent hover:underline">info@bsundc.com</a>.
              Where applicable under your jurisdiction, you may also withdraw consent or lodge a complaint with a data protection authority.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl md:text-3xl text-text-main mb-4 tracking-tight">7. Cookies & Analytics</h2>
            <p>
              This site may use minimal cookies for essential functionality and anonymous analytics. We do not use cookies for advertising or cross-site tracking.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl md:text-3xl text-text-main mb-4 tracking-tight">8. Security</h2>
            <p>
              We apply reasonable technical and organisational measures to protect your information. However, no online transmission can be guaranteed 100% secure.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl md:text-3xl text-text-main mb-4 tracking-tight">9. Updates to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date at the top of this page reflects the most recent revision.
            </p>
          </div>

          <div>
            <h2 className="font-heading text-2xl md:text-3xl text-text-main mb-4 tracking-tight">10. Contact</h2>
            <p>
              For questions about this policy or your personal information, contact us at{" "}
              <a href="mailto:info@bsundc.com" className="text-accent hover:underline">info@bsundc.com</a>{" "}
              or through our{" "}
              <Link href="/contact" className="text-accent hover:underline">contact page</Link>.
            </p>
          </div>

        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
