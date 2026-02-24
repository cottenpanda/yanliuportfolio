"use client";

import { siteConfig } from "@/lib/siteConfig";

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 lg:px-20 max-w-4xl mx-auto pt-8 pb-12">
      <div className="h-px bg-accent/20 mb-6" />
      <div className="flex justify-between items-center text-xs text-ink-light/40">
        <p>&copy; {siteConfig.footer.copyright} {siteConfig.footer.domain}</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hover:text-accent-dark transition-colors"
        >
          Back to top &uarr;
        </button>
      </div>
    </footer>
  );
}
