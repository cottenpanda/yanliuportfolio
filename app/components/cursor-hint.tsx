"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CursorHint({
  label,
  children,
  className,
  delay = 4,
  duration = 3,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const [visible, setVisible] = useState(false);
  const [posReady, setPosReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pendingPos = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), delay * 1000);
    const hideTimer = setTimeout(() => setVisible(false), (delay + duration) * 1000);
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, [delay, duration]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    pendingPos.current = { x: e.clientX - rect.left + 14, y: e.clientY - rect.top + 14 };
    if (!posReady) setPosReady(true);
    if (rafRef.current != null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const p = pendingPos.current;
      if (p && tooltipRef.current) {
        tooltipRef.current.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
      }
    });
  };

  useEffect(() => () => {
    if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={ref}
      className={`relative ${className || ""}`}
      onMouseMove={handleMouseMove}
    >
      {children}
      <AnimatePresence>
        {visible && posReady && (
          <div
            ref={tooltipRef}
            className="absolute top-0 left-0 z-50 pointer-events-none"
            style={{ willChange: "transform" }}
          >
            <motion.div
              className="px-3 py-1.5 rounded-full bg-stone-900 text-white text-[11px] font-[family-name:var(--font-noto)] whitespace-nowrap"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
            >
              {label}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
