"use client";

import React from "react";
import { siteConfig } from "@/lib/siteConfig";

/* ── Dot matrix display — Figma logo ── */
const FIGMA_COLS = 18;
const FIGMA_ROWS = 18;
// prettier-ignore
const figmaGrid = [
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,0,0,0,
  0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,
  0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,
  0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,
  0,0,0,0,1,1,1,1,1,0,1,1,1,1,1,0,0,0,
  0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,
  0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,
  0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,
  0,0,0,0,1,1,1,1,1,0,1,1,1,1,0,0,0,0,
  0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,
  0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,
  0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,
  0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,
  0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
];

function getFigmaColor(i: number) {
  const row = Math.floor(i / FIGMA_COLS);
  const col = i % FIGMA_COLS;
  const isLeft = col < 9;
  if (row <= 6) return isLeft ? "#F24E1E" : "#FF7262";
  if (row <= 10) return isLeft ? "#A259FF" : "#1ABCFE";
  return "#0ACF83";
}

const figmaDotOrder = figmaGrid.reduce<number[]>((acc, val, i) => { if (val) acc.push(i); return acc; }, []);
const dotSequenceMap = new Map<number, number>();
figmaDotOrder.forEach((dotIndex, seqIndex) => dotSequenceMap.set(dotIndex, seqIndex));

export function DotMatrixBoard() {
  return (
    <a
      href={siteConfig.links.figma}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden lg:block absolute right-[250px] top-[280px] z-20 cursor-pointer transition-transform duration-300 ease-out rotate-[8deg] scale-[0.65] hover:scale-[0.72] hover:rotate-[3deg] group/matrix hero-entrance"
      style={{ willChange: "transform", animation: "hero-slide-right 0.7s cubic-bezier(0.4,0,0.2,1) 2.95s both" }}
    >
      <div className="rounded-2xl p-3" style={{
        background: "linear-gradient(160deg, #4a4a4a 0%, #3a3a3a 30%, #2d2d2d 100%)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.2)",
      }}>
        <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${FIGMA_COLS}, 1fr)` }}>
          {figmaGrid.map((on, i) => {
            const seq = dotSequenceMap.get(i) ?? 0;
            const color = on ? getFigmaColor(i) : "";
            return (
              <div
                key={i}
                className={`dot-led w-[7px] h-[7px] rounded-full${on ? " dot-on" : ""}`}
                style={{
                  "--dot-color": color,
                  "--dot-delay": `${seq * 12}ms`,
                } as React.CSSProperties}
              />
            );
          })}
        </div>
      </div>
    </a>
  );
}
