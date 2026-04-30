"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue, AnimatePresence } from "framer-motion";
import { ClickBurst } from "./click-burst";

/* ── Board images data ── */
const BOARD_IMAGES = [
  { src: "/bulletin/1.jpg", top: "1%", left: "8%", rotate: "-5deg", w: 220, z: 1, side: "left" as const, startVY: 0.1, label: "Search trend tools (GettyImages & iStock)" },
  { src: "/bulletin/6.jpg", top: "3%", left: "32%", rotate: "-2deg", w: 250, z: 1, side: "left" as const, startVY: 0.05, label: "50 emojis (Figma design)" },
  { src: "/bulletin/2.jpg", top: "4%", left: "55%", rotate: "3deg", w: 210, z: 1, side: "right" as const, startVY: 0.15, label: "Contribution submission app (GettyImages & iStock)" },
  { src: "/bulletin/10.jpg", top: "2%", left: "80%", rotate: "6deg", w: 235, z: 1, side: "right" as const, startVY: 0.2, label: "Abstract poster/wallpaper (Figma design)" },
  { src: "/bulletin/11.jpg", top: "30%", left: "2%", rotate: "4deg", w: 215, z: 1, side: "left" as const, startVY: 0.4, label: "Anonymous Letters Across Time (Figma Make)" },
  { src: "/bulletin/5.jpg", top: "28%", left: "26%", rotate: "6deg", w: 270, z: 3, side: "right" as const, startVY: 0.35, label: "yanliuos (Claude Code)" },
  { src: "/bulletin/3.jpg", top: "33%", left: "52%", rotate: "2deg", w: 340, z: 1, side: "right" as const, startVY: 0.45, label: "Vibe coding playlist (Claude Code)" },
  { src: "/bulletin/9.jpg", top: "30%", left: "78%", rotate: "-4deg", w: 260, z: 1, side: "right" as const, startVY: 0.5, label: "Food delivery app (Figma design)" },
  { src: "/bulletin/7.jpg", top: "72%", left: "5%", rotate: "-3deg", w: 240, z: 1, side: "left" as const, startVY: 0.7, label: "Abstract elements (Figma design)" },
  { src: "/bulletin/12.jpg", top: "70%", left: "32%", rotate: "-3deg", w: 270, z: 1, side: "right" as const, startVY: 0.7, label: "Landing pages (Figma design)" },
  { src: "/bulletin/8.jpg", top: "70%", left: "63%", rotate: "5deg", w: 300, z: 2, side: "right" as const, startVY: 0.65, label: "3D cabin (Claude Artifact)" },
];

/* ── ScatterImage — scroll-driven fly-in ── */
function ScatterImage({
  img,
  index,
  scrollYProgress,
  landed,
  arrowVisible,
  imgZIndex,
  setImgZIndex,
  zCounterRef,
  setBursts,
}: {
  img: typeof BOARD_IMAGES[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  landed: boolean;
  arrowVisible: boolean;
  imgZIndex: number[];
  setImgZIndex: React.Dispatch<React.SetStateAction<number[]>>;
  zCounterRef: React.MutableRefObject<number>;
  setBursts: React.Dispatch<React.SetStateAction<{ id: number; x: number; y: number }[]>>;
}) {
  const sideIndex = BOARD_IMAGES.slice(0, index).filter(b => b.side === img.side).length;

  const BOARD_W = 972;
  const BOARD_H = 578;
  const stackCenterX = img.side === "left" ? BOARD_W * 0.0 : BOARD_W * 0.85;
  const stackCenterY = -BOARD_H * 0.85;

  const finalX = parseFloat(img.left) / 100 * BOARD_W;
  const finalY = parseFloat(img.top) / 100 * BOARD_H;

  const jitterL = [0, 30, -20, 15, -10, 25, -15, 20, -25, 10];
  const jitterR = [0, -30, 20, -15, 10, -25, 15, -20, 25, -10];
  const spreadX = img.side === "left"
    ? (sideIndex - 2) * 50 + (jitterL[sideIndex] ?? 0)
    : (sideIndex - 2) * -50 + (jitterR[sideIndex] ?? 0);
  const spreadY = sideIndex * 70;

  const startX = (stackCenterX + spreadX) - finalX;
  const startY = (stackCenterY + spreadY) - finalY;

  const moveStart = 0.3;
  const moveEnd = 0.85;

  const scrollX = useTransform(scrollYProgress, [0, moveStart, moveEnd], [startX, startX, 0]);
  const scrollY = useTransform(scrollYProgress, [0, moveStart, moveEnd], [startY, startY, 0]);
  const scrollOpacity = useTransform(scrollYProgress, [0.25, 0.45, 0.85, 1], [0, 1, 1, 1]);

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const imgRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const cachedRect = useRef<DOMRect | null>(null);
  const tiltRaf = useRef<number | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    zCounterRef.current += 1;
    setImgZIndex((prev) => { const next = [...prev]; next[index] = zCounterRef.current; return next; });
    if (imgRef.current) cachedRect.current = imgRef.current.getBoundingClientRect();
  }, [index, setImgZIndex, zCounterRef]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = cachedRect.current;
    if (!rect) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (tooltipRef.current) {
      tooltipRef.current.style.transform = `translate3d(${clientX + 14}px, ${clientY + 14}px, 0)`;
    }
    if (tiltRaf.current != null) return;
    tiltRaf.current = requestAnimationFrame(() => {
      tiltRaf.current = null;
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      setTilt({ rotateX: -y * 20, rotateY: x * 20 });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (tiltRaf.current != null) { cancelAnimationFrame(tiltRaf.current); tiltRaf.current = null; }
    setTilt({ rotateX: 0, rotateY: 0 });
    setHovered(false);
    cachedRect.current = null;
  }, []);

  useEffect(() => () => {
    if (tiltRaf.current != null) cancelAnimationFrame(tiltRaf.current);
  }, []);

  return (
    <motion.div
      ref={imgRef}
      drag={landed}
      dragMomentum={false}
      whileDrag={{ scale: 1.08 }}
      onDragStart={() => {
        zCounterRef.current += 1;
        setImgZIndex((prev) => { const next = [...prev]; next[index] = zCounterRef.current; return next; });
      }}
      onTap={(e) => {
        const evt = e as unknown as MouseEvent;
        setBursts((prev) => [...prev, { id: Date.now(), x: evt.clientX, y: evt.clientY }]);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute cursor-grab active:cursor-grabbing"
      style={{
        top: img.top,
        left: img.left,
        width: img.w,
        rotate: img.rotate,
        zIndex: imgZIndex[index],
        x: landed ? dragX : scrollX,
        y: landed ? dragY : scrollY,
        opacity: scrollOpacity,
        perspective: 600,
      }}
    >
      <motion.img
        src={img.src}
        alt={img.label}
        className="w-full rounded-md shadow-lg"
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          scale: tilt.rotateX !== 0 || tilt.rotateY !== 0 ? 1.3 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        draggable={false}
      />
      {/* Cursor tooltip — portaled to body to escape parent transforms */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {hovered && (
            <div
              ref={tooltipRef}
              className="fixed top-0 left-0 pointer-events-none"
              style={{ zIndex: 9999, willChange: "transform" }}
            >
              <motion.div
                className="px-3 py-1.5 rounded-full bg-stone-900 text-white text-[11px] font-[family-name:var(--font-noto)] whitespace-nowrap"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                {img.label}
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  );
}

/* ── ScatterBoard — scroll-tracked wrapper ── */
export function ScatterBoard({
  imgZIndex,
  setImgZIndex,
  zCounterRef,
  setBursts,
  bursts,
  arrowVisible,
}: {
  imgZIndex: number[];
  setImgZIndex: React.Dispatch<React.SetStateAction<number[]>>;
  zCounterRef: React.MutableRefObject<number>;
  setBursts: React.Dispatch<React.SetStateAction<{ id: number; x: number; y: number }[]>>;
  bursts: { id: number; x: number; y: number }[];
  arrowVisible: boolean;
}) {
  const boardRef = useRef<HTMLDivElement>(null);
  const [landed, setLanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: boardRef,
    offset: ["start end", "center center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v >= 0.9 && !landed) setLanded(true);
    if (v < 0.85 && landed) setLanded(false);
  });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <>
      <motion.div
        className="w-full flex justify-center px-4 lg:px-6 pt-4 pb-4"
        initial={{ opacity: 0, y: 150, scale: 0.85 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, margin: "-150px" }}
      >
        <div className="w-[calc(100vw-32px)] lg:w-full max-w-[1200px] board-float">
          <div className="rounded-3xl p-[14px]" style={{
            background: "linear-gradient(160deg, #d6cfc4 0%, #c9c0b3 20%, #bfb5a6 80%, #b5aa9a 100%)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12), 0 24px 70px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.1)",
            borderTop: "1px solid rgba(255,255,255,0.4)",
            borderLeft: "1px solid rgba(255,255,255,0.25)",
            borderRight: "1px solid rgba(0,0,0,0.08)",
            borderBottom: "2px solid rgba(0,0,0,0.12)",
          }}>
          <div ref={boardRef} className={`${isMobile ? "min-h-[420px]" : "min-h-[750px]"} rounded-xl relative overflow-hidden`} style={{
            background: "#F7F1E8",
            boxShadow: "inset 0 2px 6px rgba(0,0,0,0.06)",
          }}>
            {/* Paper texture noise */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.15]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }} />
            {/* Dots pattern */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: `radial-gradient(circle, rgba(180, 160, 130, 0.3) 1.2px, transparent 1.2px)`,
              backgroundSize: "24px 24px",
            }} />
            {/* Coordinates */}
            <div className="absolute top-0 left-0 bottom-0 w-[24px] flex flex-col pointer-events-none select-none">
              {"47.6062°N 122.3321°W".split("").map((ch, i) => (
                <span key={i} className="font-mono text-[9px] text-stone-400 text-center" style={{ height: "29px", lineHeight: "29px" }}>
                  {ch}
                </span>
              ))}
            </div>
            {/* Scaled inner wrapper for mobile */}
            <div
              className="absolute inset-0"
              style={isMobile ? {
                transform: "scale(0.55)",
                transformOrigin: "top left",
                width: `${100 / 0.55}%`,
                height: `${100 / 0.55}%`,
              } : undefined}
            >
            {/* Showcase images — scatter animation */}
            {BOARD_IMAGES.map((img, i) =>
              isMobile ? (
                <motion.img
                  key={i}
                  src={img.src}
                  alt={`Showcase ${i + 1}`}
                  drag
                  dragMomentum={false}
                  whileDrag={{ scale: 1.08 }}
                  onDragStart={() => {
                    zCounterRef.current += 1;
                    setImgZIndex((prev) => { const next = [...prev]; next[i] = zCounterRef.current; return next; });
                  }}
                  onTap={(e) => {
                    const evt = e as unknown as MouseEvent;
                    setBursts((prev) => [...prev, { id: Date.now(), x: evt.clientX, y: evt.clientY }]);
                  }}
                  className="absolute rounded-md shadow-lg cursor-grab active:cursor-grabbing"
                  style={{
                    top: img.top,
                    left: img.left,
                    width: img.w,
                    rotate: img.rotate,
                    zIndex: imgZIndex[i],
                  }}
                  draggable={false}
                />
              ) : (
                <ScatterImage
                  key={i}
                  img={img}
                  index={i}
                  scrollYProgress={scrollYProgress}
                  landed={landed}
                  arrowVisible={arrowVisible}
                  imgZIndex={imgZIndex}
                  setImgZIndex={setImgZIndex}
                  zCounterRef={zCounterRef}
                  setBursts={setBursts}
                />
              )
            )}
            </div>
            {/* Click burst particles */}
            {bursts.map((b) => (
              <ClickBurst key={b.id} x={b.x} y={b.y} onDone={() => setBursts((prev) => prev.filter((p) => p.id !== b.id))} />
            ))}
          </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
