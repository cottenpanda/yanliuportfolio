"use client";

import React, { useRef, useEffect } from "react";

const particleColors = ["#e8445a", "#f4a8b5", "#ffb347", "#a78bfa", "#67e8f9", "#fbbf24", "#f9a8d4"];

export function ClickBurst({ x, y, onDone }: { x: number; y: number; onDone: () => void }) {
  const particles = useRef(
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      type: i % 2 === 0 ? "heart" : "sparkle",
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      angle: (Math.PI * 2 * i) / 8 + (Math.random() - 0.5) * 0.5,
      distance: 40 + Math.random() * 50,
      size: 8 + Math.random() * 6,
    }))
  ).current;

  useEffect(() => {
    const timer = setTimeout(onDone, 800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed pointer-events-none" style={{ left: x, top: y, zIndex: 50 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: 0,
            top: 0,
            animation: "burst-particle 0.7s ease-out forwards",
            ["--burst-x" as string]: `${Math.cos(p.angle) * p.distance}px`,
            ["--burst-y" as string]: `${Math.sin(p.angle) * p.distance - 30}px`,
          }}
        >
          {p.type === "heart" ? (
            <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill={p.color}>
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ) : (
            <svg width={p.size} height={p.size} viewBox="0 0 24 24" fill={p.color}>
              <path d="M12 0l3 9h9l-7.5 5.5L19.5 24 12 18l-7.5 6 3-9.5L0 9h9z" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}
