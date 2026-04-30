"use client";

import React, { useEffect, useRef } from "react";

const DOT_SIZE = 22;
const HALF = DOT_SIZE / 2;

export function YellowDotCursor({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;

    el.style.opacity = "1";

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - HALF}px, ${e.clientY - HALF}px)`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
      style={{
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: "50%",
        background: "#FFFFFF",
        mixBlendMode: "difference",
        opacity: 0,
        willChange: "transform",
      }}
    />
  );
}
