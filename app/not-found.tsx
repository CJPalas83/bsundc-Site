import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-bg-main px-6 py-24">
      <div className="max-w-xl w-full text-center">
        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-text-body/50 mb-6">
          Error 404
        </p>
        <h1 className="font-heading text-5xl md:text-7xl leading-[0.95] tracking-tight text-text-main mb-6">
          Page not found
        </h1>
        <p className="font-body text-base text-text-body leading-relaxed mb-10">
          The page you&apos;re looking for has been moved, renamed, or
          doesn&apos;t exist. Let&apos;s get you back to something useful.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-text-main text-bg-main font-body text-xs uppercase tracking-[0.2em] hover:bg-accent transition-colors duration-500"
          >
            Return Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 border border-text-main/20 text-text-main font-body text-xs uppercase tracking-[0.2em] hover:border-accent hover:text-accent transition-colors duration-500"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
