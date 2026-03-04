"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/siteConfig";

export default function Hero() {
  return (
    <section className="px-6 md:px-12 lg:px-20 max-w-4xl mx-auto pt-16 md:pt-24 pb-12">
      <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-14">
        {/* Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-shrink-0"
        >
          <div className="w-32 h-40 md:w-40 md:h-52 rounded-xl bg-warm overflow-hidden">
            <img
              src="/flower.png"
              alt="Flower"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Intro */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex-1"
        >
          <p className="text-accent-dark text-xs tracking-[0.25em] uppercase font-medium mb-2">
            Hi! I&apos;m
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-ink tracking-tight leading-none">
            {siteConfig.name}
          </h1>
          <p className="mt-3 text-ink-light font-serif italic text-base md:text-lg">
            {siteConfig.tagline}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-ink-light/70">
            {[
              { label: "Resume", href: siteConfig.links.resume },
              { label: "LinkedIn", href: siteConfig.links.linkedin },
              { label: "Email", href: `mailto:${siteConfig.links.email}` },
              { label: "X", href: siteConfig.links.twitter },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-accent-dark transition-colors underline underline-offset-2 decoration-ink-light/20 hover:decoration-accent-dark"
              >
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
