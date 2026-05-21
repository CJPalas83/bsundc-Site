import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bsundc.com"),
  title: {
    default: "BSC — Bathroom and Kitchen Products. Designed in Germany and Denmark.",
    template: "%s · BSC",
  },
  description:
    "BSC develops and supplies bathroom, kitchen, and retrofit shower products for residential and commercial projects across Southeast Asia. Enquire directly.",
  applicationName: "BSC",
  authors: [{ name: "Bastian Schaefer Consulting" }],
  openGraph: {
    title: "BSC — Bathroom and Kitchen Products. Designed in Germany and Denmark.",
    description:
      "BSC develops and supplies bathroom, kitchen, and retrofit shower products for residential and commercial projects across Southeast Asia. Enquire directly.",
    type: "website",
    siteName: "BSC",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BSC — Bathroom and Kitchen Products. Designed in Germany and Denmark.",
    description:
      "BSC develops and supplies bathroom, kitchen, and retrofit shower products for residential and commercial projects across Southeast Asia.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning>
        {children}

        {/* Paper noise texture overlay */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Editorial grid lines — desktop only */}
        <div className="hidden lg:block pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
          <div className="grid-line" style={{ left: "8.33%" }} />
          <div className="grid-line" style={{ left: "33.33%" }} />
          <div className="grid-line" style={{ left: "66.66%" }} />
          <div className="grid-line" style={{ left: "91.66%" }} />
        </div>
      </body>
    </html>
  );
}
