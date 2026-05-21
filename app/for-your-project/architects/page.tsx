import type { Metadata } from "next";
import BuyerPageLayout from "../../components/BuyerPageLayout";

export const metadata: Metadata = {
  title: "For Architects & Specifiers",
  description:
    "Specify the Tap-to-Shower™ retrofit shower system for single-line bathroom layouts — neat visible routing, multiple finishes, and technical documentation on request.",
};

export default function ArchitectsPage() {
  return (
    <BuyerPageLayout
      overline="For Architects & Specifiers"
      h1="A smart specification choice for single-line supply."
      bullets={[
        "Retrofit-compatible shower system for single-line bathroom layouts",
        "Neat visible PEX tube routing — no concealed pipe requirement, no wall opening",
        "Available in Chrome, Matt Black, and Brushed Stainless Steel",
        "Technical documentation and dimensional drawings available on request",
      ]}
      ctaLabel="Request Specification Support"
      ctaHref="/contact?type=architect"
    />
  );
}
