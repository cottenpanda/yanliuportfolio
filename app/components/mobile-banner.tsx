"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function MobileBanner() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          className="lg:hidden sticky top-[44px] z-[999] mx-4 mt-1 mb-0 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg border border-stone-700/30"
          style={{ background: "rgba(28,25,23,0.92)", backdropFilter: "blur(12px)" }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <span className="text-[20px] leading-none shrink-0">🖥️</span>
          <p className="font-[family-name:var(--font-noto)] text-[12px] text-stone-300 leading-snug flex-1">
            Best experienced on desktop — grab a bigger screen for the full experience.
          </p>
          <button
            onClick={() => setDismissed(true)}
            className="text-stone-500 hover:text-stone-300 text-[18px] leading-none px-1 shrink-0"
            aria-label="Dismiss"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
