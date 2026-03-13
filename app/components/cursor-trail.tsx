"use client";

import React, { useEffect, useRef } from "react";

const SIZE = 48;

export function PencilCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX - SIZE * 0.25}px, ${e.clientY - SIZE * 0.8}px)`;
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block"
      style={{ width: SIZE, height: SIZE }}
    >
      <img src="/pencil-cursor.svg" alt="" width={SIZE} height={SIZE} draggable={false} />
    </div>
  );
}
