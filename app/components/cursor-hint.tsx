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
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const posReady = useRef(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), delay * 1000);
    const hideTimer = setTimeout(() => setVisible(false), (delay + duration) * 1000);
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, [delay, duration]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left + 14, y: e.clientY - rect.top + 14 });
      posReady.current = true;
    }
  };

  return (
    <div
      ref={ref}
      className={`relative ${className || ""}`}
      onMouseMove={handleMouseMove}
    >
      {children}
      <AnimatePresence>
        {visible && posReady.current && (
          <motion.div
            className="absolute z-50 pointer-events-none px-3 py-1.5 rounded-full bg-stone-900 text-white text-[11px] font-[family-name:var(--font-noto)] whitespace-nowrap"
            style={{ left: pos.x, top: pos.y }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
