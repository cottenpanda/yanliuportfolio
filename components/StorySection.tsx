"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { renderBold } from "@/lib/renderBold";

interface StorySectionProps {
  title: string;
  description: string;
  highlights: { text: string }[];
  cta: { label: string; url: string };
  index: number;
}

export default function StorySection({
  title,
  description,
  highlights,
  cta,
}: StorySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="py-6"
    >
      <h3 className="font-serif text-xl font-semibold text-ink mb-2">
        {title}
      </h3>
      <p className="text-ink-light leading-[1.75] text-[15px]">
        {renderBold(description)}
      </p>
      {highlights.map((h, i) => (
        <p
          key={i}
          className="text-ink-light leading-[1.75] text-[15px] mt-2"
        >
          {renderBold(h.text)}
        </p>
      ))}
      <a
        href={cta.url}
        className="inline-block mt-2 text-sm text-accent-dark underline underline-offset-2 decoration-accent-dark/30 hover:decoration-accent-dark transition-colors"
      >
        {cta.label} &rarr;
      </a>
    </motion.div>
  );
}
