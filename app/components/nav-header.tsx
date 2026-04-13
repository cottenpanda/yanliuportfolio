"use client";

import React from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Playground", href: "#playground" },
];

export function NavHeader() {
  return (
    <nav className="relative z-[100]">
      <div className="mx-auto max-w-[1400px] px-8 pt-6 pb-3 flex items-center justify-between">
        <a
          href="/"
          className="font-[family-name:var(--font-noto)] text-[13px] font-medium text-stone-700 hover:text-stone-900 transition-colors tracking-wide"
        >
          Yan Liu
        </a>
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-noto)] text-[12px] text-stone-500 hover:text-stone-800 transition-colors tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
