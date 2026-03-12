"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const quotes = [
  "\u201CJust keep moving forward\u201D",
  "\u201CDone is better than perfect\u201D",
  "\u201CStay curious, keep building\u201D",
  "\u201CDesign is how it works\u201D",
  "\u201CShip it, then iterate\u201D",
  "\u201CLearn by doing\u201D",
];

export function RippedPaperNote() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  const stopRotating = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  };

  const startRotating = () => {
    stopRotating();
    setFading(true);
    const t1 = setTimeout(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
      setFading(false);
    }, 200);
    timeoutRefs.current.push(t1);
    timerRef.current = setInterval(() => {
      setFading(true);
      const t2 = setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setFading(false);
      }, 200);
      timeoutRefs.current.push(t2);
    }, 1200);
  };

  useEffect(() => {
    return () => stopRotating();
  }, []);

  return (
    <motion.div
      className="w-full flex justify-center px-6 -mt-14 pb-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative cursor-pointer select-none" style={{ transform: "rotate(-1.5deg)" }} onMouseEnter={startRotating} onMouseLeave={stopRotating}>
        {/* Tape — top left */}
        <div className="absolute -top-3 -left-4 w-[70px] h-[22px] z-10" style={{
          background: "linear-gradient(135deg, rgba(240,218,130,0.7) 0%, rgba(230,200,100,0.5) 100%)",
          transform: "rotate(-32deg)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          backdropFilter: "blur(1px)",
          clipPath: "polygon(2% 0%, 6% 2%, 12% 0%, 18% 1%, 25% 0%, 32% 2%, 38% 0%, 45% 1%, 52% 0%, 58% 2%, 65% 0%, 72% 1%, 78% 0%, 85% 2%, 92% 0%, 98% 1%, 100% 0%, 100% 100%, 97% 98%, 91% 100%, 85% 98%, 78% 100%, 72% 99%, 65% 100%, 58% 98%, 52% 100%, 45% 99%, 38% 100%, 32% 98%, 25% 100%, 18% 99%, 12% 100%, 6% 98%, 0% 100%)",
        }} />
        {/* Tape — top right */}
        <div className="absolute -top-3 -right-4 w-[70px] h-[22px] z-10" style={{
          background: "linear-gradient(135deg, rgba(240,218,130,0.7) 0%, rgba(230,200,100,0.5) 100%)",
          transform: "rotate(28deg)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          backdropFilter: "blur(1px)",
          clipPath: "polygon(3% 0%, 8% 2%, 15% 0%, 22% 1%, 28% 0%, 35% 2%, 42% 0%, 48% 1%, 55% 0%, 62% 2%, 68% 0%, 75% 1%, 82% 0%, 88% 2%, 95% 0%, 100% 1%, 100% 100%, 96% 98%, 90% 100%, 83% 99%, 76% 100%, 70% 98%, 63% 100%, 56% 99%, 50% 100%, 43% 98%, 36% 100%, 30% 99%, 23% 100%, 16% 98%, 10% 100%, 4% 99%, 0% 100%)",
        }} />
        {/* Tape — bottom left */}
        <div className="absolute -bottom-3 -left-3 w-[65px] h-[22px] z-10" style={{
          background: "linear-gradient(135deg, rgba(240,218,130,0.7) 0%, rgba(230,200,100,0.5) 100%)",
          transform: "rotate(25deg)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          backdropFilter: "blur(1px)",
          clipPath: "polygon(1% 0%, 7% 2%, 14% 0%, 20% 1%, 27% 0%, 34% 2%, 40% 0%, 47% 1%, 53% 0%, 60% 2%, 67% 0%, 73% 1%, 80% 0%, 87% 2%, 93% 0%, 100% 2%, 100% 100%, 95% 98%, 88% 100%, 82% 99%, 75% 100%, 68% 98%, 62% 100%, 55% 99%, 48% 100%, 42% 98%, 35% 100%, 28% 99%, 22% 100%, 15% 98%, 8% 100%, 2% 99%, 0% 100%)",
        }} />
        {/* Tape — bottom right */}
        <div className="absolute -bottom-3 -right-4 w-[65px] h-[22px] z-10" style={{
          background: "linear-gradient(135deg, rgba(240,218,130,0.7) 0%, rgba(230,200,100,0.5) 100%)",
          transform: "rotate(-30deg)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          backdropFilter: "blur(1px)",
          clipPath: "polygon(0% 1%, 5% 0%, 11% 2%, 18% 0%, 24% 1%, 31% 0%, 38% 2%, 44% 0%, 51% 1%, 57% 0%, 64% 2%, 70% 0%, 77% 1%, 84% 0%, 90% 2%, 97% 0%, 100% 1%, 100% 100%, 94% 98%, 87% 100%, 81% 99%, 74% 100%, 67% 98%, 61% 100%, 54% 99%, 47% 100%, 41% 98%, 34% 100%, 27% 99%, 21% 100%, 14% 98%, 7% 100%, 1% 99%, 0% 100%)",
        }} />

        {/* Paper */}
        <div style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.15)) drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>
        <div className="relative w-[380px] md:w-[460px] px-10 py-12 overflow-hidden" style={{
          background: "#ECE9DD",
          clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 14px), 96% 100%, 92% calc(100% - 9px), 87% 100%, 82% calc(100% - 6px), 76% 100%, 71% calc(100% - 12px), 66% 100%, 60% calc(100% - 7px), 54% 100%, 48% calc(100% - 13px), 42% 100%, 36% calc(100% - 5px), 30% 100%, 24% calc(100% - 10px), 18% 100%, 12% calc(100% - 7px), 6% 100%, 2% calc(100% - 11px), 0% 100%)",
        }}>
          {/* Dots pattern */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle, rgba(180,200,220,0.35) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }} />

          {/* Quote */}
          <div className="relative z-10 overflow-hidden h-[32px] md:h-[36px]">
            <p
              key={quoteIndex}
              className="text-center text-lg md:text-xl text-stone-700 leading-relaxed quote-slide-in font-[family-name:var(--font-courier-prime)]"
              style={{ fontStyle: "italic" }}
            >
              {quotes[quoteIndex]}
            </p>
          </div>
        </div>
        </div>
      </div>
    </motion.div>
  );
}
