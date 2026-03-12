"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue } from "framer-motion";
import { ClickBurst } from "./click-burst";

/* ── Board images data ── */
const BOARD_IMAGES = [
  { src: "/bulletin/1.jpg", top: "1%", left: "8%", rotate: "-5deg", w: 220, z: 1, side: "left" as const, startVY: 0.1 },
  { src: "/bulletin/2.jpg", top: "6%", left: "58%", rotate: "3deg", w: 210, z: 1, side: "right" as const, startVY: 0.15 },
  { src: "/bulletin/3.jpg", top: "40%", left: "60%", rotate: "2deg", w: 280, z: 1, side: "right" as const, startVY: 0.45 },
  { src: "/bulletin/11.jpg", top: "34%", left: "2%", rotate: "4deg", w: 215, z: 1, side: "left" as const, startVY: 0.4 },
  { src: "/bulletin/5.jpg", top: "31%", left: "30%", rotate: "6deg", w: 270, z: 3, side: "right" as const, startVY: 0.35 },
  { src: "/bulletin/6.jpg", top: "3%", left: "31%", rotate: "-2deg", w: 210, z: 1, side: "left" as const, startVY: 0.05 },
  { src: "/bulletin/7.jpg", top: "74%", left: "12%", rotate: "-3deg", w: 240, z: 1, side: "left" as const, startVY: 0.7 },
  { src: "/bulletin/8.jpg", top: "70%", left: "42%", rotate: "5deg", w: 215, z: 2, side: "right" as const, startVY: 0.65 },
  { src: "/bulletin/9.jpg", top: "65%", left: "72%", rotate: "-4deg", w: 205, z: 1, side: "left" as const, startVY: 0.75 },
  { src: "/bulletin/10.jpg", top: "12%", left: "80%", rotate: "6deg", w: 235, z: 1, side: "right" as const, startVY: 0.2 },
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

  const spreadX = img.side === "left"
    ? (sideIndex - 2) * 50 + [0, 30, -20, 15, -10][sideIndex]
    : (sideIndex - 2) * -50 + [0, -30, 20, -15, 10][sideIndex];
  const spreadY = sideIndex * 70;

  const startX = (stackCenterX + spreadX) - finalX;
  const startY = (stackCenterY + spreadY) - finalY;

  const moveStart = 0.3;
  const moveEnd = 0.85;

  const scrollX = useTransform(scrollYProgress, [0, moveStart, moveEnd], [startX, startX, 0]);
  const scrollY = useTransform(scrollYProgress, [0, moveStart, moveEnd], [startY, startY, 0]);
  const scrollOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.85, 1], [0, 1, 1, 1]);

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const imgRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = imgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rotateX: -y * 20, rotateY: x * 20 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
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
        alt={`Showcase ${index + 1}`}
        className="w-full rounded-md shadow-lg"
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          scale: tilt.rotateX !== 0 || tilt.rotateY !== 0 ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        draggable={false}
      />
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
        className="w-full flex justify-center px-6 pt-4 pb-4"
        initial={{ opacity: 0, y: 150, scale: 0.85 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, margin: "-150px" }}
      >
        <div className="w-full max-w-[1000px] board-float">
          <div className="rounded-3xl p-[14px]" style={{
            background: "linear-gradient(160deg, #d6cfc4 0%, #c9c0b3 20%, #bfb5a6 80%, #b5aa9a 100%)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12), 0 24px 70px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.1)",
            borderTop: "1px solid rgba(255,255,255,0.4)",
            borderLeft: "1px solid rgba(255,255,255,0.25)",
            borderRight: "1px solid rgba(0,0,0,0.08)",
            borderBottom: "2px solid rgba(0,0,0,0.12)",
          }}>
          <div ref={boardRef} className="min-h-[578px] rounded-xl relative overflow-visible" style={{
            background: "linear-gradient(150deg, #f5f0e8 0%, #efe9df 35%, #e8e1d5 100%)",
            boxShadow: "inset 0 2px 6px rgba(0,0,0,0.06)",
          }}>
            {/* Paper texture noise */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.08]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }} />
            {/* Dots pattern */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: `radial-gradient(circle, rgba(180, 160, 130, 0.3) 1.2px, transparent 1.2px)`,
              backgroundSize: "24px 24px",
            }} />
            {/* Row numbers */}
            <div className="absolute top-0 left-0 bottom-0 w-[24px] flex flex-col pointer-events-none select-none">
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i} className="font-mono text-[9px] text-stone-400 text-right pr-1" style={{ height: "36px", lineHeight: "36px" }}>
                  {i + 1}
                </span>
              ))}
            </div>
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
