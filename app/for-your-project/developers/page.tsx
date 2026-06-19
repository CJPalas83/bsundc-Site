import type { Metadata } from "next";
import BuyerPageLayout from "../../components/BuyerPageLayout";

export const metadata: Metadata = {
  title: "For Developers & Builders",
  description:
    "A standardised single-line bathroom shower upgrade for projects — project-ready at turnover, owner can upgrade later. Project quotation, MOQ, and lead time on request.",
};

export default function DevelopersPage() {
  return (
    <BuyerPageLayout
      overline="For Developers & Builders"
      h1="Project-ready at turnover. Owner can upgrade later."
      h1Accent="upgrade"
      bullets={[
        "Single-line bathroom compatibility — no floor plan redesign or concealed plumbing rework",
        "Standardised upgrade package across units; consistent cost and installation logic",
        "Buyer can upgrade from cold-only to hot and cold post-turnover without additional wall work",
        "Project quotation, MOQ, and lead time confirmed by written offer",
      ]}
      ctaLabel="Ask About Project Solutions"
      ctaHref="/tap-to-shower?type=developer#inquiry"
      image="/images/webp_1920/tts-chrome-mattblack-1.webp"
      imageAlt="Tap-to-Shower installed in a bathroom — Chrome and Matt Black columns side by side"
    />
  );
}
