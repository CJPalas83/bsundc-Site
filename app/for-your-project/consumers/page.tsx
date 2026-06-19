import type { Metadata } from "next";
import BuyerPageLayout from "../../components/BuyerPageLayout";

export const metadata: Metadata = {
  title: "For Homeowners",
  description:
    "Hot and cold shower comfort from a single cold-water outlet — without a full bathroom renovation. Controlled at the tap, multiple finishes, 3-year limited tap warranty.",
};

export default function ConsumersPage() {
  return (
    <BuyerPageLayout
      overline="For Homeowners"
      h1="Hot and cold shower comfort without a full bathroom renovation."
      h1Accent="renovation"
      bullets={[
        "Connects to your existing single cold-water outlet — no major plumbing changes",
        "Hot and cold water controlled at the tap; set the heater once, adjust comfort daily",
        "Clean, visible installation under suitable site conditions",
        "Available in Chrome, Matt Black, and Brushed Stainless Steel; 3-year limited tap warranty",
      ]}
      ctaLabel="Request Information"
      ctaHref="/tap-to-shower?type=consumer#inquiry"
      image="/images/webp_1200/tts-chrome.webp"
      imageAlt="Tap-to-Shower Chrome — full installed shower column"
    />
  );
}
