"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to error reporting service in production
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
  }, [error]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-bg-main px-6 py-16 md:py-20">
      <div className="max-w-xl w-full text-center">
        <p className="font-body text-[10px] uppercase tracking-[0.3em] text-text-body/50 mb-6">
          Something went wrong
        </p>
        <h1 className="font-heading text-4xl md:text-6xl leading-[0.95] tracking-tight text-text-main mb-6">
          Unexpected <em className="text-accent">error</em>
        </h1>
        <p className="font-body text-base text-text-body leading-relaxed mb-10">
          We&apos;ve hit an unexpected issue. You can try again, or head back
          home and try a different path.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center px-8 py-3 bg-text-main text-bg-main font-body text-xs uppercase tracking-[0.2em] hover:bg-accent transition-colors duration-500"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 border border-text-main/20 text-text-main font-body text-xs uppercase tracking-[0.2em] hover:border-accent hover:text-accent transition-colors duration-500"
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
