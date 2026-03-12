"use client";

import React, { useState, useEffect, useRef } from "react";
import { WireframeCanvas, rotateY, rotateX, project } from "./wireframe";

/* ── Easter egg grid animations ── */
export const gridAnimations = [
  // Wireframe globe
  () => {
    const draw = useRef((ctx: CanvasRenderingContext2D, t: number) => {
      const cx = 75, cy = 75, r = 40, s = 200;
      ctx.beginPath();
      for (let lon = 0; lon < 8; lon++) {
        const a = (lon / 8) * Math.PI * 2 + t * 0.5;
        for (let i = 0; i <= 30; i++) {
          const lat = (i / 30) * Math.PI - Math.PI / 2;
          const x = r * Math.cos(lat) * Math.cos(a);
          const y = r * Math.sin(lat);
          const z = r * Math.cos(lat) * Math.sin(a);
          const [px, py] = project(x, y, z, s, cx, cy);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
      }
      for (let lat = 1; lat < 6; lat++) {
        const phi = (lat / 6) * Math.PI - Math.PI / 2;
        for (let i = 0; i <= 40; i++) {
          const a = (i / 40) * Math.PI * 2 + t * 0.5;
          const x = r * Math.cos(phi) * Math.cos(a);
          const y = r * Math.sin(phi);
          const z = r * Math.cos(phi) * Math.sin(a);
          const [px, py] = project(x, y, z, s, cx, cy);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
      }
      ctx.stroke();
    }).current;
    return <WireframeCanvas draw={draw} />;
  },
  // Wireframe cube
  () => {
    const draw = useRef((ctx: CanvasRenderingContext2D, t: number) => {
      const cx = 75, cy = 75, s = 200, sz = 35;
      const verts: [number, number, number][] = [
        [-sz,-sz,-sz],[sz,-sz,-sz],[sz,sz,-sz],[-sz,sz,-sz],
        [-sz,-sz,sz],[sz,-sz,sz],[sz,sz,sz],[-sz,sz,sz],
      ];
      const edges = [[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]];
      const projected = verts.map(([x, y, z]) => {
        let [rx, ry, rz] = rotateY(x, y, z, t * 0.5);
        [rx, ry, rz] = rotateX(rx, ry, rz, 0.5);
        return project(rx, ry, rz, s, cx, cy);
      });
      ctx.beginPath();
      edges.forEach(([a, b]) => {
        ctx.moveTo(projected[a][0], projected[a][1]);
        ctx.lineTo(projected[b][0], projected[b][1]);
      });
      ctx.stroke();
    }).current;
    return <WireframeCanvas draw={draw} />;
  },
  // Wireframe torus
  () => {
    const draw = useRef((ctx: CanvasRenderingContext2D, t: number) => {
      const cx = 75, cy = 75, s = 200, R = 30, rr = 14;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let i = 0; i < 20; i++) {
        const theta = (i / 20) * Math.PI * 2;
        for (let j = 0; j <= 32; j++) {
          const phi = (j / 32) * Math.PI * 2;
          const x = (R + rr * Math.cos(phi)) * Math.cos(theta);
          const y = rr * Math.sin(phi);
          const z = (R + rr * Math.cos(phi)) * Math.sin(theta);
          let [rx, ry, rz] = rotateX(x, y, z, t * 0.4 + 0.5);
          [rx, ry, rz] = rotateY(rx, ry, rz, t * 0.6);
          const [px, py] = project(rx, ry, rz, s, cx, cy);
          j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
      }
      for (let j = 0; j < 12; j++) {
        const phi = (j / 12) * Math.PI * 2;
        for (let i = 0; i <= 40; i++) {
          const theta = (i / 40) * Math.PI * 2;
          const x = (R + rr * Math.cos(phi)) * Math.cos(theta);
          const y = rr * Math.sin(phi);
          const z = (R + rr * Math.cos(phi)) * Math.sin(theta);
          let [rx, ry, rz] = rotateX(x, y, z, t * 0.4 + 0.5);
          [rx, ry, rz] = rotateY(rx, ry, rz, t * 0.6);
          const [px, py] = project(rx, ry, rz, s, cx, cy);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
      }
      ctx.stroke();
    }).current;
    return <WireframeCanvas draw={draw} />;
  },
  // Wave grid with perspective
  () => {
    const draw = useRef((ctx: CanvasRenderingContext2D, t: number) => {
      const cols = 16, rows = 16, spacing = 7;
      const cx = 75, cy = 65;
      ctx.lineWidth = 0.5;
      const pts: [number, number][][] = [];
      for (let r = 0; r < rows; r++) {
        pts[r] = [];
        for (let c = 0; c < cols; c++) {
          const x3d = (c - cols / 2) * spacing;
          const z3d = (r - rows / 2) * spacing;
          const y3d = Math.sin(c * 0.4 + r * 0.3 + t * 1.5) * 8;
          const tilt = 1.1;
          const ry = y3d * Math.cos(tilt) - z3d * Math.sin(tilt);
          const rz = y3d * Math.sin(tilt) + z3d * Math.cos(tilt);
          pts[r][c] = project(x3d, ry, rz, 200, cx, cy);
        }
      }
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          c === 0 ? ctx.moveTo(pts[r][c][0], pts[r][c][1]) : ctx.lineTo(pts[r][c][0], pts[r][c][1]);
        }
        ctx.stroke();
      }
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          r === 0 ? ctx.moveTo(pts[r][c][0], pts[r][c][1]) : ctx.lineTo(pts[r][c][0], pts[r][c][1]);
        }
        ctx.stroke();
      }
    }).current;
    return <WireframeCanvas draw={draw} />;
  },
];

export const easterEggCells = [
  { col: -2, row: -3, animIdx: 0, cardOffset: [60, -50] as [number, number], cardRotate: 2 },
  { col: -3, row: 6, animIdx: 1, cardOffset: [60, -50] as [number, number], cardRotate: -2 },
  { col: 16, row: -3, animIdx: 2, cardOffset: [-170, -50] as [number, number], cardRotate: -2 },
  { col: 17, row: 6, animIdx: 3, cardOffset: [-170, -50] as [number, number], cardRotate: 2 },
];

export function EasterEggCell({ containerRef, col, row, animIdx, cardOffset, cardRotate }: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  col: number; row: number; animIdx: number;
  cardOffset: [number, number]; cardRotate: number;
}) {
  const GRID = 56;
  const [open, setOpen] = useState(false);
  const [snapOffset, setSnapOffset] = useState({ x: 0, y: 0 });
  const [sparkled, setSparkled] = useState(false);
  const [blinking, setBlinking] = useState(false);
  const Anim = gridAnimations[animIdx];
  const cardW = 160;
  const cardH = 160;
  const cellRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (cellRef.current?.contains(e.target as Node)) return;
      if (cardRef.current?.contains(e.target as Node)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  useEffect(() => {
    const compute = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const bodyX = rect.left;
      const bodyY = rect.top + scrollY;
      const offX = ((bodyX % GRID) + GRID) % GRID;
      const offY = ((bodyY % GRID) + GRID) % GRID;
      setSnapOffset({ x: -offX, y: -offY });
    };
    const timers = [100, 500, 1000, 2000].map(ms => setTimeout(compute, ms));
    window.addEventListener("resize", compute);
    return () => { timers.forEach(clearTimeout); window.removeEventListener("resize", compute); };
  }, [containerRef]);

  const cellX = snapOffset.x + col * GRID;
  const cellY = snapOffset.y + row * GRID;


  return (
    <>
      {/* Grid cell */}
      <div
        ref={cellRef}
        className="absolute hidden lg:block cursor-pointer z-10 group/egg"
        style={{ left: cellX, top: cellY, width: GRID, height: GRID }}
        onClick={() => setOpen(!open)}
      >
        {!open ? (
          <div
            className="w-full h-full relative border border-dashed rounded-[1px] egg-border"
            ref={(el) => {
              if (el && !sparkled) {
                const obs = new IntersectionObserver(([entry]) => {
                  if (entry.isIntersecting) {
                    setTimeout(() => {
                      let count = 0;
                      const dark = "rgba(28, 25, 23, 0.8)";
                      const light = "rgba(214, 211, 209, 1)";
                      setBlinking(true);
                      const interval = setInterval(() => {
                        el.style.borderColor = count % 2 === 0 ? dark : light;
                        count++;
                        if (count >= 6) { clearInterval(interval); el.style.borderColor = ""; setBlinking(false); }
                      }, 200);
                      setSparkled(true);
                    }, animIdx * 250);
                    obs.disconnect();
                  }
                }, { threshold: 0.5 });
                obs.observe(el);
              }
            }}
          >
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${blinking ? "opacity-100" : "opacity-0 group-hover/egg:opacity-100"}`}>
              <span className="text-stone-700 text-lg font-light select-none">+</span>
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-[16px] h-[16px] bg-stone-900" />
          </div>
        )}
      </div>

      {open && (
        <>
          <div
            ref={cardRef}
            className="absolute hidden lg:block z-30"
            style={{
              left: cellX + cardOffset[0],
              top: cellY + cardOffset[1],
              width: cardW, height: cardH,
              transform: `rotate(${cardRotate}deg)`,
              animation: "grid-flip-in 0.4s ease-out both",
            }}
          >
            <div
              className="relative w-full h-full rounded-xl flex items-center justify-center overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(28px) saturate(1.6)",
                WebkitBackdropFilter: "blur(28px) saturate(1.6)",
                border: "1px solid rgba(255,255,255,0.7)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
              }}
            >
              <Anim />
            </div>
          </div>
        </>
      )}
    </>
  );
}
