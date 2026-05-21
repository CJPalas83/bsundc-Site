import type { Metadata } from "next";
import BuyerPageLayout from "../../components/BuyerPageLayout";

export const metadata: Metadata = {
  title: "For Retailers & Distributors",
  description:
    "Stock the Tap-to-Shower™ hot and cold shower upgrade — ready retail packages, a clear value-for-money story, and trade enquiry on request.",
};

export default function RetailersPage() {
  return (
    <BuyerPageLayout
      overline="For Retailers & Distributors"
      h1="Add a hot & cold shower upgrade to your range."
      bullets={[
        "Ready retail package — tap only, connection set, or complete kit with heater",
        "Shelf-ready with clear value-for-money story; no staff training required",
        "With-heater and without-heater configurations for flexible merchandising",
        "3-year limited warranty on the tap; trade enquiry and quotation on request",
      ]}
      ctaLabel="Ask About Retail Packages"
      ctaHref="/contact?type=retail"
    />
  );
}
