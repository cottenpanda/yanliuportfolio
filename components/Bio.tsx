"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/siteConfig";
import { renderBold } from "@/lib/renderBold";

export default function Bio() {
  return (
    <section className="px-6 md:px-12 lg:px-20 max-w-4xl mx-auto py-10">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="space-y-3"
      >
        {siteConfig.bio.map((paragraph, i) => {
          const isLast = i === siteConfig.bio.length - 1;
          return (
            <p
              key={i}
              className="text-ink-light leading-[1.75] text-[15px]"
            >
              {isLast ? (
                <>
                  {renderBold(paragraph.text.replace(" — let's connect.", ""))}
                  {" — "}
                  <a
                    href={siteConfig.connectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-dark underline underline-offset-2 decoration-accent-dark/30 hover:decoration-accent-dark transition-colors"
                  >
                    let&apos;s connect
                  </a>
                  .
                </>
              ) : (
                renderBold(paragraph.text)
              )}
            </p>
          );
        })}
      </motion.div>
    </section>
  );
}
