"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabase";

const MERGE_SIZE = 100; // flowers per consolidated bloom
const ANIM_MS = 950; // scatter / gather duration

interface Flower {
  id: number;
  x: number;
  y: number;
  flower_type: number;
}

interface BigBloom {
  id: number;
  x: number;
  y: number;
  row: number;
  groupIndex: number;
}

export function Garden({ isMobile = false }: { isMobile?: boolean }) {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [newFlowerId, setNewFlowerId] = useState<number | null>(null);
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [showThanks, setShowThanks] = useState(false);
  const [tidy, setTidy] = useState(false); // default: scattered, organic mess
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("flowers")
        .select("id, x, y, flower_type")
        .order("created_at", { ascending: true })
        .limit(10000);
      if (data) setFlowers(data);
      setLoading(false);
    };
    load();
  }, []);

  // Lay the consolidated blooms along a wavy sine path that snakes row to row,
  // and tag every flower with the bloom it flies home to when tidied.
  const { bigBlooms, placed } = useMemo(() => {
    const groups = Math.floor(flowers.length / MERGE_SIZE);

    // Fit all blooms on a single horizontal string until we run out of width;
    // only wrap to a second swag once the cap is hit.
    const MAX_PER_ROW = isMobile ? 6 : 14;
    const perRow = Math.min(Math.max(groups, 1), MAX_PER_ROW);
    const gapX = isMobile ? 14 : 6.5;
    const rowGap = isMobile ? 24 : 22;
    const startX = isMobile ? 10 : 8;
    const startY = 28;
    const amp = isMobile ? 5 : 5; // wave height (% of garden)

    const blooms: BigBloom[] = [];
    for (let g = 0; g < groups; g++) {
      const row = Math.floor(g / perRow);
      const col = g % perRow;
      const x = startX + col * gapX;
      const y = startY + row * rowGap + amp * Math.sin(g * 0.9);
      blooms.push({ id: flowers[g * MERGE_SIZE].id, x, y, row, groupIndex: g });
    }

    const placed = flowers.map((f, i) => {
      const g = Math.floor(i / MERGE_SIZE);
      const inGroup = g < groups;
      return {
        flower: f,
        inGroup,
        targetX: inGroup ? blooms[g].x : f.x,
        targetY: inGroup ? blooms[g].y : f.y,
      };
    });

    return { bigBlooms: blooms, placed };
  }, [flowers, isMobile]);

  // One draped string per row (a swag), each segment sagging between blooms.
  const garlandPaths = useMemo(() => {
    const SAG = 4; // how far the string dips between two blooms (viewBox units)
    const rows: BigBloom[][] = [];
    for (const b of bigBlooms) {
      (rows[b.row] ||= []).push(b);
    }
    const paths: string[] = [];
    for (const arr of rows) {
      if (!arr || arr.length < 2) continue;
      let d = `M ${arr[0].x} ${arr[0].y}`;
      for (let i = 1; i < arr.length; i++) {
        const a = arr[i - 1];
        const b = arr[i];
        const cx = (a.x + b.x) / 2;
        const cy = (a.y + b.y) / 2 + SAG; // control point pulled down = drape
        d += ` Q ${cx} ${cy} ${b.x} ${b.y}`;
      }
      paths.push(d);
    }
    return paths;
  }, [bigBlooms]);

  useEffect(() => {
    if (newFlowerId) {
      const t = setTimeout(() => setNewFlowerId(null), 600);
      return () => clearTimeout(t);
    }
  }, [newFlowerId]);

  useEffect(() => {
    if (showThanks) {
      const t = setTimeout(() => setShowThanks(false), 2500);
      return () => clearTimeout(t);
    }
  }, [showThanks]);

  const hasPlanted = typeof window !== "undefined" && localStorage.getItem("garden-planted") === "true";
  const [planted, setPlanted] = useState(hasPlanted);

  const setMode = useCallback(
    (next: boolean) => {
      if (animating || next === tidy) return;
      setAnimating(true);
      setHoveredGroup(null);
      setTidy(next);
      setTimeout(() => setAnimating(false), ANIM_MS);
    },
    [animating, tidy]
  );

  const plantFlower = useCallback(async (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (localStorage.getItem("garden-planted") === "true") {
      setPlanted(true);
      return;
    }

    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    let clientX: number, clientY: number;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    const flower_type = Math.floor(Math.random() * 6);

    const { data, error } = await supabase
      .from("flowers")
      .insert({ x, y, flower_type, color: "#1e1e1e" })
      .select("id, x, y, flower_type")
      .single();

    if (!error && data) {
      setFlowers((prev) => [...prev, data]);
      setNewFlowerId(data.id);
      localStorage.setItem("garden-planted", "true");
      setPlanted(true);
      setShowThanks(true);
    }
  }, []);

  const bigSize = isMobile ? 28 : 36;
  const smallSize = isMobile ? 14 : 15;
  const hasBlooms = bigBlooms.length > 0;

  const segBtn = (active: boolean) =>
    `text-[12px] px-3 py-1 rounded-full transition-colors ${
      active ? "bg-stone-800 text-white shadow-sm" : "text-stone-500 hover:text-stone-700"
    }`;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <div className="text-[12px] text-stone-400 uppercase tracking-[0.2em] font-mono">Community Garden</div>
          <div className="text-[13px] text-stone-500 mt-0.5">
            {loading
              ? "Loading flowers…"
              : `${flowers.length} flower${flowers.length !== 1 ? "s" : ""} planted by visitors${
                  hasBlooms ? ` · ${bigBlooms.length} in full bloom` : ""
                }`}
          </div>
        </div>
        {!loading && (
          <div className="flex items-center gap-2">
            <span
              className="text-[12px] text-stone-800 bg-stone-200 border border-stone-300 px-3 py-1 rounded-full shadow-sm transition-opacity duration-500"
              style={{ opacity: showThanks ? 1 : 0 }}
            >
              Thanks for planting!
            </span>
            {hasBlooms && (
              <div
                className={`flex items-center gap-0.5 bg-stone-100 border border-stone-300 rounded-full p-0.5 ${
                  animating ? "opacity-60 pointer-events-none" : ""
                }`}
              >
                <button onClick={() => setMode(false)} className={segBtn(!tidy)}>
                  Scatter
                </button>
                <button onClick={() => setMode(true)} className={segBtn(tidy)}>
                  Tidy up
                </button>
              </div>
            )}
            <span className="text-[12px] text-stone-400">{planted ? "You planted one 🌸" : isMobile ? "Tap to plant" : "Click to plant"}</span>
          </div>
        )}
      </div>

      <div
        className="flex-1 relative mx-3 mb-3 rounded-lg overflow-hidden"
        style={{ background: "#FAF8F5", cursor: "crosshair" }}
        onClick={plantFlower}
        onTouchStart={plantFlower}
      >
        {/* Continuous dashed garland threading every bloom in order */}
        {hasBlooms && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
              zIndex: 1,
              opacity: tidy ? 1 : 0,
              transition: `opacity 0.5s ease ${tidy ? ANIM_MS * 0.5 : 0}ms`,
              transformOrigin: "50% 0%",
              animation: tidy ? "garland-sway 6s ease-in-out infinite" : undefined,
            }}
          >
            {garlandPaths.map((d, i) => (
              <path
                key={i}
                d={d}
                fill="none"
                stroke="#C9B89B"
                strokeWidth={1.5}
                strokeDasharray="3 3"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>
        )}

        {/* Consolidated blooms — pop in once their flowers have gathered */}
        {bigBlooms.map((bloom) => (
          <div
            key={`big-${bloom.id}`}
            className="absolute"
            style={{
              left: `${bloom.x}%`,
              top: `${bloom.y}%`,
              width: bigSize,
              height: bigSize,
              zIndex: 2,
              pointerEvents: tidy ? "auto" : "none",
              opacity: tidy ? 1 : 0,
              transform: `translate(-50%, -50%) scale(${tidy ? 1 : 0.3})`,
              transition: `opacity 0.45s ease ${tidy ? ANIM_MS * 0.55 : 0}ms, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${tidy ? ANIM_MS * 0.5 : 0}ms`,
            }}
            onMouseEnter={() => tidy && setHoveredGroup(bloom.groupIndex)}
            onMouseLeave={() => setHoveredGroup(null)}
          >
            <img
              src="/pixel-flower.svg"
              alt=""
              draggable={false}
              className="w-full h-full"
              style={{
                imageRendering: "pixelated",
                animation: tidy
                  ? `bloom-sway ${3.2 + (bloom.groupIndex % 5) * 0.25}s ease-in-out ${(bloom.groupIndex % 7) * 0.18}s infinite`
                  : undefined,
              }}
            />
          </div>
        ))}

        {hoveredGroup !== null && bigBlooms[hoveredGroup] && (
          <div
            className="absolute pointer-events-none z-10 px-2.5 py-1 rounded-md bg-stone-800 text-white text-[11px] whitespace-nowrap shadow-md"
            style={{
              left: `${bigBlooms[hoveredGroup].x}%`,
              top: `${bigBlooms[hoveredGroup].y}%`,
              transform: `translate(-50%, calc(-50% - ${bigSize / 2 + 14}px))`,
            }}
          >
            Full bloom · {MERGE_SIZE} flowers
          </div>
        )}

        {/* Every individual flower — flies to its bloom when tidied */}
        {placed.map(({ flower, inGroup, targetX, targetY }) => {
          const merged = tidy && inGroup;
          const rotation = (((flower.id * 2654435761) >>> 0) % 1000) / 1000 * 16 - 8;
          const stagger = inGroup ? (flower.id % 12) * 18 : 0;
          return (
            <img
              key={flower.id}
              src="/pixel-flower.svg"
              alt=""
              className="absolute pointer-events-none"
              draggable={false}
              style={{
                left: `${merged ? targetX : flower.x}%`,
                top: `${merged ? targetY : flower.y}%`,
                width: smallSize,
                height: smallSize,
                zIndex: 1,
                opacity: merged ? 0 : 1,
                transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(${merged ? 0 : 1})`,
                transition: inGroup
                  ? `left ${ANIM_MS}ms cubic-bezier(0.5,0,0.4,1) ${stagger}ms, top ${ANIM_MS}ms cubic-bezier(0.5,0,0.4,1) ${stagger}ms, transform ${ANIM_MS}ms ease ${stagger}ms, opacity ${ANIM_MS * 0.6}ms ease ${stagger + ANIM_MS * 0.4}ms`
                  : undefined,
                animation:
                  flower.id === newFlowerId
                    ? "flower-grow 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both"
                    : undefined,
                imageRendering: "pixelated",
              }}
            />
          );
        })}

        {flowers.length === 0 && !loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-[14px] text-stone-400">Be the first to plant a flower</p>
          </div>
        )}
      </div>
    </div>
  );
}
