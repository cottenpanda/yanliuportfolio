"use client";

import React from "react";
import { motion } from "framer-motion";

export function RippedPaperNote() {
  return (
    <motion.div
      className="w-full flex justify-center px-6 -mt-14 pb-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative select-none" style={{ transform: "rotate(2deg)" }}>
        {/* Sticky note SVG as background */}
        <div
          className="relative w-[340px] md:w-[400px]"
          style={{ filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.12)) drop-shadow(0 2px 4px rgba(0,0,0,0.08))" }}
        >
          <img
            src="/sticky-notes.svg"
            alt=""
            className="w-full h-auto block"
            draggable={false}
          />

          {/* White paper area with ruled lines overlay */}
          <div className="absolute inset-0">
            {/* Line pattern */}
            <div className="absolute left-[4%] right-[4%] top-[22%] bottom-[4%] pointer-events-none" style={{
              backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 23px, rgba(180,195,210,0.25) 23px, rgba(180,195,210,0.25) 24px)",
            }} />

            {/* Text */}
            <div className="relative z-10 px-10 md:px-12 pt-[15%]">
              <p
                className="text-left text-[14px] md:text-[15px] text-stone-600 leading-[1.8] tracking-[0.04em] font-[family-name:var(--font-noto)]"
              >
                I care about craft, how clearly things communicate, handle edge cases, and build trust. Always in &ldquo;let me try this&rdquo; mode, curious, building, and exploring.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
