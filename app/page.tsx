"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent, useMotionValue } from "framer-motion";
import { siteConfig } from "@/lib/siteConfig";
import { renderBold } from "@/lib/renderBold";

/* ── Typing effect hook ── */
function useTypingEffect(text: string, speed = 28) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
}

/* ── Local time ── */
function LocalTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours();
      const m = String(now.getMinutes()).padStart(2, "0");
      const hour12 = h % 12 || 12;
      const ampm = h >= 12 ? "PM" : "AM";
      setTime(`SEA ${String(hour12).padStart(2, "0")}:${m} ${ampm}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  if (!time) return null;

  return (
    <div className="hidden lg:flex flex-col items-end font-[family-name:var(--font-noto)] tracking-widest uppercase">
      <span className="text-[9px]" style={{ color: "#9e9e9e" }}>Local Time</span>
      <span className="text-[11px] text-stone-800 font-medium">{time}</span>
    </div>
  );
}

/* ── Star background ── */
function StarBackground() {
  const [stars, setStars] = useState<
    { id: number; left: string; top: string; size: number; delay: number; duration: number }[]
  >([]);

  useEffect(() => {
    const s = [];
    for (let i = 0; i < 60; i++) {
      s.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      });
    }
    setStars(s);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full bg-text-muted/20"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Floating code decorations ── */
const decorations = [
  { symbol: "{ }", top: "6%", left: "8%", size: "text-2xl", rotate: "-12deg", delay: "0s" },
  { symbol: "< / >", top: "4%", left: "35%", size: "text-lg", rotate: "8deg", delay: "1.2s" },
  { symbol: "[ ]", top: "8%", right: "20%", size: "text-xl", rotate: "15deg", delay: "0.6s" },
  { symbol: "=>", top: "3%", right: "10%", size: "text-2xl", rotate: "-5deg", delay: "2s" },
  { symbol: "//", top: "12%", right: "5%", size: "text-lg", rotate: "20deg", delay: "0.8s" },
  { symbol: "( )", bottom: "10%", left: "6%", size: "text-xl", rotate: "10deg", delay: "1.5s" },
  { symbol: "&&", bottom: "8%", left: "30%", size: "text-lg", rotate: "-8deg", delay: "0.3s" },
  { symbol: "!=", bottom: "12%", right: "35%", size: "text-xl", rotate: "12deg", delay: "1.8s" },
  { symbol: "++", bottom: "6%", right: "15%", size: "text-2xl", rotate: "-15deg", delay: "2.5s" },
  { symbol: "/* */", bottom: "10%", right: "5%", size: "text-sm", rotate: "6deg", delay: "0.9s" },
  { symbol: ";;", top: "18%", left: "3%", size: "text-sm", rotate: "-20deg", delay: "1.1s" },
  { symbol: "$ _", top: "15%", right: "3%", size: "text-lg", rotate: "18deg", delay: "2.2s" },
];

function FloatingDecorations() {
  return (
    <div className="hidden md:block fixed inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {decorations.map((d, i) => (
        <span
          key={i}
          className={`absolute font-mono ${d.size} text-text-muted/10 select-none code-decoration`}
          style={{
            top: d.top,
            left: d.left,
            right: d.right,
            bottom: d.bottom,
            "--rotate": d.rotate,
            animationDelay: d.delay,
          } as React.CSSProperties}
        >
          {d.symbol}
        </span>
      ))}
    </div>
  );
}

/* ── Mac folder icon ── */
function MacFolder() {
  return (
    <div
      className="hidden lg:block absolute left-[440px] top-[560px] z-30 group cursor-pointer rotate-[6deg] transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:rotate-[2deg] hero-entrance"
      style={{ perspective: "500px", animation: "hero-slide-up 0.7s cubic-bezier(0.4,0,0.2,1) 3.3s both" }}
    >
      <div className="relative w-[155px] h-[155px] transition-all duration-300 group-hover:drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)]">
        {/* Back panel — stays in place */}
        <img
          src="/mac-folder-back-opt.svg"
          alt=""
          className="absolute inset-0 w-full h-full z-0"
          draggable={false}
        />
        {/* Items that pop out on hover */}
        {/* iPad + notebook — left */}
        <img
          src="/Ipad and notebook.svg"
          alt="iPad and notebook"
          className="absolute left-1/2 bottom-[30%] w-[105px] -translate-x-1/2 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 group-hover:-translate-y-[75px] group-hover:-translate-x-[140px] group-hover:rotate-[-15deg] z-10"
          style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.25))" }}
          draggable={false}
        />
        {/* Claude logo — upper center-right */}
        <img
          src="/Claude logo.svg"
          alt="Claude"
          className="absolute left-1/2 bottom-[30%] w-[65px] -translate-x-1/2 transition-all duration-500 ease-out delay-75 opacity-0 group-hover:opacity-100 group-hover:-translate-y-[95px] group-hover:-translate-x-[30px] group-hover:rotate-[5deg] z-10"
          style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.25))" }}
          draggable={false}
        />
        {/* Laptop — right */}
        <img
          src="/laptop.svg"
          alt="Laptop"
          className="absolute left-1/2 bottom-[30%] w-[105px] -translate-x-1/2 transition-all duration-500 ease-out delay-150 opacity-0 group-hover:opacity-100 group-hover:-translate-y-[65px] group-hover:translate-x-[40px] group-hover:rotate-[10deg] z-10"
          style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.25))" }}
          draggable={false}
        />
        {/* Front panel — rotates open on hover */}
        <img
          src="/mac-folder-front-opt.svg"
          alt="Folder"
          className="absolute inset-0 w-full h-full z-20 transition-transform duration-500 ease-out origin-bottom group-hover:[transform:rotateX(-22deg)]"
          draggable={false}
        />
      </div>
    </div>
  );
}

/* ── Dot matrix display — Figma logo ── */
// 13x17 grid: Figma logo — clean 1px outline, matching reference
const FIGMA_COLS = 18;
const FIGMA_ROWS = 18;
// prettier-ignore
// Figma logo: Row1: rect+rect. Row2: rect+circle. Row3: teardrop (left only). Each shape 3 inner rows.
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

// Figma brand colors mapped by row + column (matching actual logo)
function getFigmaColor(i: number) {
  const row = Math.floor(i / FIGMA_COLS);
  const col = i % FIGMA_COLS;
  const isLeft = col < 9; // left half of the grid

  // Row 1: top section (rows 2-6) — red left, red/orange right
  if (row <= 6) return isLeft ? "#F24E1E" : "#FF7262";
  // Row 2: middle section (rows 7-10) — purple left, blue right
  if (row <= 10) return isLeft ? "#A259FF" : "#1ABCFE";
  // Row 3: bottom section (rows 11+) — green (left only in logo)
  return "#0ACF83";
}

// Pre-compute sequence index for each dot (for staggered transition-delay)
const figmaDotOrder = figmaGrid.reduce<number[]>((acc, val, i) => { if (val) acc.push(i); return acc; }, []);
const dotSequenceMap = new Map<number, number>();
figmaDotOrder.forEach((dotIndex, seqIndex) => dotSequenceMap.set(dotIndex, seqIndex));

function DotMatrixBoard() {
  return (
    <a
      href={siteConfig.links.figma}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden lg:block absolute right-[250px] top-[280px] z-20 cursor-pointer transition-transform duration-300 ease-out rotate-[8deg] scale-[0.65] hover:scale-[0.72] hover:rotate-[3deg] group/matrix hero-entrance"
      style={{ willChange: "transform", animation: "hero-slide-right 0.7s cubic-bezier(0.4,0,0.2,1) 3.45s both" }}
    >
      {/* Display panel */}
      <div className="rounded-2xl p-3" style={{
        background: "linear-gradient(160deg, #4a4a4a 0%, #3a3a3a 30%, #2d2d2d 100%)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.2)",
      }}>
        {/* LED grid */}
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

/* ── Vinyl playlist card (floating decoration) ── */
function VinylCard() {
  return (
    <a href="https://cottenpanda.github.io/vibecodingplaylist/" target="_blank" rel="noopener noreferrer" className="hidden lg:block absolute left-[80px] top-[410px] z-30 transition-all duration-300 -rotate-[5deg] hover:rotate-[2deg] hover:scale-110 hover:-translate-y-5 cursor-pointer group/vinyl hero-entrance" style={{ overflow: "visible", animation: "hero-slide-left 0.7s cubic-bezier(0.4,0,0.2,1) 3.0s both" }}>
      <div className="relative w-[240px]" style={{ overflow: "visible" }}>
        {/* Vinyl record — outside card, centered with margin */}
        <div className="absolute inset-x-0 top-[24px] flex justify-center z-10 pointer-events-none" style={{ overflow: "visible" }}>
          <img
            src="/Vinyl.png"
            alt="Vinyl record"
            className="w-36 h-36 vinyl-spin transition-all duration-500 ease-out group-hover/vinyl:scale-[2.3] group-hover/vinyl:-translate-y-[70px] group-hover/vinyl:-translate-x-[20px] group-hover/vinyl:drop-shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
            style={{ willChange: "transform" }}
            draggable={false}
          />
        </div>
        {/* Card */}
        <div className="relative bg-white border border-editor-border rounded-2xl shadow-sm flex flex-col items-center w-[240px] pt-6 pb-6 overflow-hidden">
          {/* Animated blobs — hidden by default, appear on hover */}
          <div className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500 ease-out group-hover/vinyl:opacity-100">
            <div className="vinyl-blob vinyl-blob-1" />
            <div className="vinyl-blob vinyl-blob-2" />
            <div className="vinyl-blob vinyl-blob-3" />
          </div>
          {/* Spacer matching default vinyl size */}
          <div className="relative z-[1] w-36 h-36" />
          {/* Info */}
          <div className="relative z-[1] mt-4 text-center">
            <p className="font-[family-name:var(--font-courier-prime)] text-[10px] text-text-primary uppercase tracking-widest mb-1">Playlist</p>
            <h3 className="font-[family-name:var(--font-courier-prime)] text-text-primary font-bold text-lg leading-tight mb-1">Vibe Coding</h3>
            <p className="font-[family-name:var(--font-courier-prime)] text-text-primary text-xs mb-1">19 projects</p>
            <p className="font-[family-name:var(--font-courier-prime)] text-text-primary text-[11px] leading-snug">Built with creativity<br/>and curiosity.</p>
          </div>
        </div>
      </div>
    </a>
  );
}

/* ── Hanging name badge ── */
function NameBadge() {
  return (
    <div className="hidden lg:flex flex-col items-center absolute left-[40px] top-[-80px] z-20 badge-drop">
     <a href="https://www.linkedin.com/in/uwyanliudesign" target="_blank" rel="noopener noreferrer" className="badge-swing flex flex-col items-center cursor-pointer group/badge">
      {/* Lanyard strap — extra tall to avoid gap when swinging */}
      <div className="w-[26px] h-[240px] bg-stone-800 relative shadow-sm z-0">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 3px)",
        }} />
        <span className="absolute bottom-[40%] left-1/2 -translate-x-1/2 -rotate-90 font-mono text-[6px] font-bold text-white/60 tracking-[0.2em] uppercase whitespace-nowrap select-none">
          yanliu.design
        </span>
      </div>

      {/* Badge card — overlaps lanyard so strap threads through */}
      <div className="rounded-xl w-[210px] -mt-8 relative" style={{ perspective: "800px" }}>
       <div className="rounded-xl p-[6px] relative" style={{
        background: "linear-gradient(170deg, #57534e 0%, #44403c 15%, #292524 60%, #1c1917 100%)",
        borderTop: "1.5px solid rgba(255,255,255,0.15)",
        borderLeft: "1px solid rgba(255,255,255,0.08)",
        borderRight: "1px solid rgba(0,0,0,0.3)",
        borderBottom: "2px solid rgba(0,0,0,0.4)",
        transform: "rotateX(1deg)",
        transformStyle: "preserve-3d",
      }}>
        {/* Glossy reflection sweep */}
        <div className="absolute inset-0 rounded-xl pointer-events-none z-20" style={{
          background: "linear-gradient(115deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 15%, transparent 40%, transparent 85%, rgba(255,255,255,0.03) 100%)",
        }} />
        {/* Lanyard pass-through behind card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[26px] h-[22px] bg-stone-800 z-0 rounded-b-sm" />
        {/* Slot hole */}
        <div className="relative z-10 flex justify-center pt-1 pb-0">
          <div className="w-8 h-[6px] rounded-full border border-stone-500/50" style={{
            background: "linear-gradient(180deg, #1c1917, #292524)",
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
          }} />
        </div>
        <div className="rounded-lg overflow-hidden flex flex-col relative z-10" style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(0,0,0,0.3)",
        }}>
          {/* Top section — with grid + name */}
          <div className="relative px-4 pt-4 pb-4" style={{
            background: "linear-gradient(175deg, #6b6560 0%, #57534e 20%, #44403c 100%)",
          }}>
            {/* Grid lines overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.12]" style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }} />
            {/* Name */}
            <div className="relative z-10">
              <h3 className="text-white font-extrabold text-[32px] leading-[1.05] tracking-[0.15em]">刘彦</h3>
              <p className="font-[family-name:var(--font-courier-prime)] text-white/50 text-[9px] uppercase tracking-[0.1em] mt-2">Seattle-based<br />Senior Product Designer</p>
            </div>
            {/* Starburst accent */}
            <img src="/yellow-star.svg" alt="" className="absolute top-3 right-3 z-10 w-12 h-12" draggable={false} />
          </div>

          {/* Bottom section — dark with profile photo */}
          <div className="px-4 pt-5 pb-5 flex flex-col items-center" style={{
            background: "linear-gradient(180deg, #1c1917, #0c0a09)",
          }}>
            <div className="w-32 h-32 rounded-full overflow-hidden bg-stone-600 relative" style={{
              border: "3px solid #57534e",
            }}>
              <img
                src="/profile.png"
                alt="Yan Liu"
                className="w-full h-full object-cover group-hover/badge:opacity-0 transition-opacity duration-300"
                draggable={false}
              />
              <video
                src="/badge-hover.mp4"
                muted
                loop
                playsInline
                autoPlay
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover/badge:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
       </div>
      </div>
     </a>
    </div>
  );
}

/* ── Retro OICQ/Win98 browser windows (stacked) ── */
function RetroWindows() {
  const [hovered, setHovered] = useState(false);
  const [typed, setTyped] = useState("");
  const bioText = "Hi, I'm Yan. I currently work at Getty Images. On the side, I explore AI tools, make random doodles, take photos, and share designs.\n\nyanliudesignlife@gmail.com";

  useEffect(() => {
    if (!hovered) { setTyped(""); return; }
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(bioText.slice(0, i));
      if (i >= bioText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [hovered]);

  const windows = [
    { title: "Design projects", top: 0, left: 0, z: 10 },
    { title: "contact info", top: 24, left: 24, z: 20 },
  ];

  /* Win98 3D beveled border */
  const bevel = {
    borderTop: "2px solid #dfdfdf",
    borderLeft: "2px solid #dfdfdf",
    borderRight: "2px solid #404040",
    borderBottom: "2px solid #404040",
  };

  /* Inset bevel (for content area) */
  const inset = {
    borderTop: "2px solid #808080",
    borderLeft: "2px solid #808080",
    borderRight: "2px solid #ffffff",
    borderBottom: "2px solid #ffffff",
  };

  /* Title bar button */
  const TitleBtn = ({ children }: { children: React.ReactNode }) => (
    <div
      className="w-[16px] h-[14px] flex items-center justify-center select-none"
      style={{
        background: "#c0c0c0",
        borderTop: "1px solid #dfdfdf",
        borderLeft: "1px solid #dfdfdf",
        borderRight: "1px solid #404040",
        borderBottom: "1px solid #404040",
        fontSize: "9px",
        lineHeight: 1,
        fontFamily: "monospace",
        color: "#000",
      }}
    >
      {children}
    </div>
  );

  return (
    <div className="hidden lg:block absolute top-[500px] right-[310px] z-20 hero-entrance" style={{ animation: "hero-slide-up 0.7s cubic-bezier(0.4,0,0.2,1) 4.05s both" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="relative w-[350px] h-[290px]">
        {windows.map((win, i) => (
          <div
            key={i}
            className="absolute w-[320px] transition-transform duration-300 hover:scale-105 cursor-pointer"
            style={{
              top: win.top,
              left: win.left,
              zIndex: win.z,
            }}
          >
            {/* Window frame */}
            <div style={{ background: "#c0c0c0", ...bevel, boxShadow: "2px 4px 12px rgba(0,0,0,0.25)" }}>
              {/* Title bar */}
              <div
                className="flex items-center justify-between px-[3px] py-[2px]"
                style={{
                  background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
                  margin: "2px 2px 0 2px",
                }}
              >
                <div className="flex items-center gap-[4px] min-w-0">
                  {/* Tiny app icon */}
                  <div className="w-[14px] h-[14px] flex items-center justify-center shrink-0">
                    <div className="w-[10px] h-[10px] rounded-sm" style={{
                      background: "linear-gradient(135deg, #ffcc00 30%, #ff6600 100%)",
                      border: "0.5px solid #cc8800",
                    }} />
                  </div>
                  <span className="text-white text-[11px] font-bold truncate select-none" style={{ fontFamily: "Tahoma, 'Microsoft YaHei', sans-serif", textShadow: "1px 1px 0 rgba(0,0,0,0.4)" }}>
                    {win.title}
                  </span>
                </div>
                <div className="flex gap-[2px] shrink-0 ml-1">
                  <TitleBtn>_</TitleBtn>
                  <TitleBtn>□</TitleBtn>
                  <TitleBtn>×</TitleBtn>
                </div>
              </div>

              {/* Menu bar */}
              <div className="px-[4px] py-[1px] mx-[2px]" style={{ background: "#c0c0c0" }}>
                <div className="flex gap-3">
                  {["文件(F)", "编辑(E)", "帮助(H)"].map((m) => (
                    <span key={m} className="text-[10px] text-black select-none" style={{ fontFamily: "Tahoma, 'Microsoft YaHei', sans-serif" }}>{m}</span>
                  ))}
                </div>
              </div>

              {/* Content area — sunken inset */}
              <div className="mx-[4px] mb-[4px]" style={inset}>
                <div className="w-full h-[180px] p-2 overflow-hidden" style={{ background: "#ffffff" }}>
                  {i === windows.length - 1 && typed && (
                    <p className="text-[11px] text-black font-[family-name:var(--font-courier-prime)] whitespace-pre-wrap leading-none">
                      {typed}
                      <span className="inline-block w-[5px] h-[11px] bg-black ml-[1px] align-text-bottom" style={{ animation: "blink 1s step-end infinite" }} />
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Win95 Start Menu ── */
function StartMenu() {
  const bevel = {
    borderTop: "2px solid #dfdfdf",
    borderLeft: "2px solid #dfdfdf",
    borderRight: "2px solid #404040",
    borderBottom: "2px solid #404040",
  };

  const menuItems = [
    { icon: "📁", label: "Work", arrow: true, url: "https://yanliu.design/" },
    { icon: "📄", label: "Documents", arrow: true },
    { icon: "⚙️", label: "Settings", arrow: true },
    { icon: "🔍", label: "Find", arrow: true },
    { icon: "❓", label: "Help", arrow: false },
    { icon: "▶️", label: "Run...", arrow: false },
  ];

  const bottomItems = [
    { icon: "⏸️", label: "Suspend" },
    { icon: "🔌", label: "Shut Down..." },
  ];

  return (
    <div className="hidden lg:block absolute top-[600px] right-[320px] z-25" style={{ transform: "scale(0.75)", transformOrigin: "bottom left" }}>
      <div style={{ background: "#c0c0c0", ...bevel, boxShadow: "3px 4px 12px rgba(0,0,0,0.25)" }}>
        <div className="flex">
          {/* Vertical sidebar */}
          <div className="w-[26px] relative" style={{ background: "linear-gradient(180deg, #000080 0%, #1084d0 100%)" }}>
            <span
              className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white font-bold text-[11px] select-none whitespace-nowrap"
              style={{
                writingMode: "vertical-rl",
                transform: "translateX(-50%) rotate(180deg)",
                fontFamily: "Tahoma, sans-serif",
                letterSpacing: "0.05em",
                textShadow: "1px 1px 0 rgba(0,0,0,0.4)",
              }}
            >
              Windows95
            </span>
          </div>

          {/* Menu content */}
          <div className="flex flex-col py-[3px]">
            {menuItems.map((item) => {
              const inner = (
                <>
                  <span className="text-[12px] w-[16px] text-center select-none">{item.icon}</span>
                  <span className="text-[11px] text-black group-hover:text-white select-none flex-1" style={{ fontFamily: "Tahoma, 'Microsoft YaHei', sans-serif" }}>
                    {item.label}
                  </span>
                  {item.arrow && <span className="text-[8px] text-black group-hover:text-white select-none ml-2">▶</span>}
                </>
              );
              return item.url ? (
                <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-[8px] px-[10px] py-[4px] hover:bg-[#000080] hover:text-white cursor-pointer group no-underline">
                  {inner}
                </a>
              ) : (
                <div key={item.label} className="flex items-center gap-[8px] px-[10px] py-[4px] hover:bg-[#000080] hover:text-white cursor-pointer group">
                  {inner}
                </div>
              );
            })}

            {/* Separator */}
            <div className="mx-[4px] my-[3px]" style={{ borderTop: "1px solid #808080", borderBottom: "1px solid #ffffff" }} />

            {bottomItems.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-[8px] px-[10px] py-[4px] hover:bg-[#000080] hover:text-white cursor-pointer group"
              >
                <span className="text-[12px] w-[16px] text-center select-none">{item.icon}</span>
                <span className="text-[11px] text-black group-hover:text-white select-none" style={{ fontFamily: "Tahoma, 'Microsoft YaHei', sans-serif" }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}




/* ── Animated arrow ── */
const arrowPaths = [
  "M187.418 100.888C184.669 115.245 168.05 99.4773 166.62 94.4026C168.046 80.7408 185.173 94.7285 187.418 100.888Z",
  "M230.193 144.086C230.178 152.113 224.037 153.337 219.911 148.761C215.114 143.442 207.323 135.325 203.501 129.654C203.489 128.77 203.495 127.368 203.831 126.546C208.765 114.482 220.032 131.56 224.062 135.846C226.01 137.917 228.91 141.723 230.193 144.086Z",
  "M262.852 197.241C262.538 201.244 258.779 204.617 255.731 202.874C250.188 199.705 242.577 182.664 240.4 177.391C240.811 172.953 245.37 169.373 248.846 172.226C253.368 175.938 261.748 191.803 262.852 197.241Z",
  "M288.344 249.242C286.035 258.701 280.676 252.257 279.493 257.212C278.573 261.062 274.34 264.106 271.077 261.238C267.988 258.522 267.787 254.172 267.473 250.283C261.15 248.491 252.511 249.362 255.299 240.018C258.232 236.14 260.817 237.017 265.082 237.703C264.293 234.523 263.961 233.016 265.621 230.058C267.09 227.44 269.868 226.722 272.311 228.469C276.185 231.238 276.84 237.191 277.725 241.551C279.865 242.293 284.078 243.813 285.724 245.178L285.918 245.342C287.375 246.559 287.627 247.435 288.344 249.242Z",
  "M227.666 239.906C227.8 241.976 227.565 245.698 224.995 246.379C216.324 248.674 206.437 250.052 197.49 250.94C196.136 251.074 194.21 248.216 193.556 247.247C193.068 241.671 196.129 239.954 201.152 239.083C208.394 237.829 216.011 235.944 223.371 236.174C225.198 236.231 226.763 238.574 227.666 239.906Z",
  "M167.982 254.684C168.002 255.752 168.057 256.92 167.878 257.973C167.641 259.37 166.773 260.5 165.614 261.258C161.977 263.639 143.216 272.214 139.633 271.358C137.591 270.87 136.602 269.44 135.538 267.762C134.859 258.475 147.73 257.601 154.535 253.691C159.448 250.868 164.47 249.531 167.982 254.684Z",
  "M115.273 286.058C114.906 291.296 110.368 294.164 107.493 298.144C104.58 302.183 102.603 308.313 98.3001 311.069C94.7425 313.351 91.9026 309.869 90.4115 307.043C90.3509 301.763 96.9688 293.417 99.9659 289.159C103.852 283.643 110.925 276.646 115.273 286.058Z",
  "M331.365 291.507C331.143 294.022 329.88 296.475 327.294 297.189C320.341 299.098 317.805 288.751 314.745 284.43C312.426 281.16 307.951 276.668 306.953 273C307.622 269.147 310.636 264.712 314.84 267.47C321.315 271.718 329.001 284.277 331.365 291.507Z",
  "M275.45 292.709C275.676 297.781 261.653 331.287 253.008 315.798C252.769 310.593 257.509 306.871 259.592 302.417C262.461 296.283 267.411 280.453 275.45 292.709Z",
  "M235.969 338.157C236.456 344.212 231.107 347.317 225.915 349.579C219.101 352.546 209.948 361.233 204.538 353.14C204.35 351.106 204.126 348.35 206.188 347.117C213.328 342.838 221.15 338.767 228.518 334.882C231.662 333.226 234.216 335.712 235.969 338.157Z",
  "M118.156 356.544C118.113 357.212 118.032 357.88 117.914 358.536C116.201 367.87 106.168 361.47 101.842 358.233C96.428 354.178 92.889 349.609 89.6811 343.757C89.6002 343.163 89.5865 341.478 89.8823 340.959C96.3533 329.637 102.616 344.001 106.912 347.683C111.434 351.559 115.681 351.036 118.156 356.544Z",
  "M179.184 361.723C179.013 363.661 178.259 366.255 176.165 366.961C170.865 368.475 164.389 369.135 158.8 369.256C151.785 369.409 147.593 371.24 144.351 364.192C144.945 356.547 152.029 358.087 157.829 357.647C163.033 357.257 168.207 356.771 173.403 356.51C176.795 356.34 178.203 358.93 179.184 361.723Z",
  "M343.699 342.847C344.022 347.566 345.74 356.111 339.207 357C337.67 357.22 336.109 356.809 334.877 355.862C331.667 353.368 332.049 341.506 331.531 336.659C331.082 332.911 329.72 327.818 331.989 325.017C333.008 323.759 334.483 322.962 336.091 322.792C344.009 322.041 343.261 337.48 343.699 342.847Z",
  "M343.035 388.249C342.851 393.516 340.855 410.308 339.581 415.397C335.578 419.95 331.656 419.551 328.695 414.181C328.213 408.345 330.903 398.023 331.194 391.619C331.518 384.48 338.463 380.625 343.035 388.249Z",
  "M342.326 478.498C342.236 480.391 340.908 482.769 339.626 484.018C334.202 489.297 311.49 520.367 307.083 522.256C305.615 522.239 305.866 522.467 304.878 521.766C303.123 518.325 299.56 485.458 298.784 479.382C298.295 476.153 296.692 469.919 299.419 467.645C301.941 466.682 311.992 470.04 315.67 470.965C317.627 463.594 318.947 456.19 321.314 448.943C323.679 441.709 333.054 444.262 332.272 450.732C331.382 458.095 328.879 466.732 326.872 473.945C330.943 474.999 339.014 476.585 342.326 478.498Z",
];

function ArrowAnimated({ onVisible }: { onVisible?: () => void } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); onVisible?.(); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [onVisible]);

  return (
    <div ref={ref} className="flex justify-center -mt-48 -mb-16 pb-0">
      <svg width="470" height="591" viewBox="0 0 470 591" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-36">
        {arrowPaths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="#2D2D2D"
            className="transition-all duration-500 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(12px)",
              transitionDelay: `${i * 80}ms`,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

/* ── Ripped paper with tape ── */
const quotes = [
  "\u201CJust keep moving forward\u201D",
  "\u201CDone is better than perfect\u201D",
  "\u201CStay curious, keep building\u201D",
  "\u201CDesign is how it works\u201D",
  "\u201CShip it, then iterate\u201D",
  "\u201CLearn by doing\u201D",
];

/* ── Draw-in stars ── */
function DrawInStars() {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <svg ref={ref} width="392" height="591" viewBox="0 0 392 591" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[130px] opacity-60">
      {[
        "M143.648 87.2461C151.672 87.7935 147.319 94.1353 146.708 98.9248C145.908 105.206 146.738 111.268 147.354 117.506C147.605 120.051 147.232 122.931 147.578 125.512C148.715 132.562 151.247 138.999 154.707 145.22C156.469 148.664 157.77 152.429 159.817 155.718C168.293 169.317 181.448 177.717 196.465 182.641C201.786 184.385 209.354 182.733 214.121 185.886C215.666 186.908 215.376 191.525 215.413 193.393C207.365 198.403 200.408 199.549 193.678 206.881C186.076 215.163 178.568 223.782 172.41 233.211C170.791 235.689 169.207 240.194 167.894 243.044C155.972 269.363 149.949 297.969 150.244 326.858C150.254 329.989 150.281 332.878 150.545 336.107C150.961 341.443 153.67 347.385 151.864 352.646C151.199 354.582 147.96 357.093 146.019 355.866C143.617 354.351 142.358 349.518 141.426 346.906C137.345 333.6 137.109 317.538 133.806 304.047C130.793 291.742 129.506 277.685 124.24 266.17C114.905 245.761 92.6621 229.163 69.6889 238.853L69.4507 238.728C68.0834 237.992 66.2859 236.989 65.8335 235.489C66.5886 232.914 71.4027 233.304 71.7612 230.36C70.8145 228.951 68.6154 228.636 66.9594 228.228C67.4857 227.008 71.9301 225.841 73.1967 225.01C88.6697 214.81 104.785 203.418 116.115 188.573C122.443 180.282 125.838 170.896 126.69 160.674C126.948 157.577 128.319 153.337 128.822 150.029C130.327 140.119 130.703 130.229 132.074 120.328C132.232 119.23 132.529 118.04 132.009 117.025C131.141 115.33 132.333 113.505 132.393 111.768C132.429 109.752 132.165 107.529 132.249 105.487C132.227 102.128 133.896 88.6152 137.338 87.8242C139.704 89.155 140.171 87.7941 143.648 87.2461ZM142.718 140.326C141.187 143.22 140.431 150.143 139.583 153.877C135.88 171.044 132.993 187.318 119.647 199.985C117.35 202.166 113.039 206.675 110.684 208.837C108.224 211.095 89.8708 225.399 89.8432 226.248C93.9546 227.425 101.616 229.259 105.207 230.912C112.69 234.357 122.298 243.616 127.747 249.806C138.78 262.342 139.613 280.614 144.128 295.63L144.649 295.561C146.15 293.555 146.668 285.855 147.185 282.881C152.243 253.771 163.688 226.297 184.251 204.675C186.357 202.461 188.341 199.961 190.446 197.722C192.481 195.556 194.941 193.942 196.785 191.589C177.109 187.393 161.374 174.635 151.937 158.041C150.426 155.384 143.901 140.904 142.718 140.326Z",
        "M243.8 297.496C248.848 297.006 250.001 302.68 250.997 306.125C254.959 319.823 257.526 334.304 260.468 348.179C263.304 355.269 265.704 362.486 270.474 368.592C273.676 372.69 276.97 374.514 280.116 379.004C281.986 381.67 285.317 383.459 287.915 386.287C292.447 391.225 302.403 393.422 300.709 401.738C299.464 404.405 288.894 407.841 285.413 408.967C272.733 413.065 265.104 422.446 260.057 434.491C251.282 455.877 245.138 478.251 241.76 501.12C240.773 507.682 241.164 513.757 241.099 520.359C241.046 525.836 242.161 530.615 239.038 535.616C237.901 536.845 236.703 537.662 235.366 538.646C234.905 538.456 234.45 538.248 234.003 538.025C232.547 537.301 230.981 536.594 230.437 535.001C231.022 531.714 228.434 528.765 228.897 525.883C229.848 519.964 228.831 514.989 228.758 509.18C228.6 496.696 228.965 482.706 226.417 470.465C224.67 462.07 219.239 451.901 215.475 444.13C212.367 438.165 210.14 434.162 206.141 429.189C199.874 421.393 190.455 424.451 186.777 420.135C186.266 418.692 185.64 411.425 185.83 410.929C186.409 409.411 193.365 406.046 194.809 404.655C201.486 398.235 207.653 392.368 213.655 385.289C217.357 380.923 219.53 379.191 222.852 374.378C231.481 361.871 235.787 352.409 236.327 337.06C236.391 335.242 236.87 332.506 237.331 330.645L236.872 329.773C236.955 325.572 236.877 321.02 236.899 316.848C236.925 311.893 236.842 306.358 237.936 301.582C238.368 299.701 241.964 298.37 243.8 297.496ZM248.626 345.643C248.052 357.347 239.473 373.27 232.674 382.799C229.445 387.324 224.243 392.575 220.463 396.82C217.904 399.697 215.206 403.291 212.429 405.845C209.801 408.263 207.028 410.012 204.483 412.71C214.012 417.67 217.368 421.096 222.883 430.278C226.129 435.683 228.878 440.739 231.144 446.698C232.426 449.771 234.369 452.657 235.513 455.791C236.56 458.703 236.981 465.06 238.571 467.4L239.115 467.651L239.66 467.279L239.772 466.944C240.961 463.34 241.217 459.213 242.446 455.58C244.696 448.926 246.597 441.622 248.945 435.037C250.774 429.909 254.125 424.882 255.961 419.645C256.546 418.202 258.231 416.372 259.043 415.001C262.535 409.189 267.398 404.829 273.345 401.585C276.429 399.9 280.933 398.745 284.41 396.887L284.185 396.59C282.426 394.322 280.926 393.99 278.95 392.068C271.699 385.01 264.628 378.563 259.603 369.603C258.727 368.038 257.006 366.648 256.028 365.115C254.697 362.919 253.759 358.9 252.661 356.796C251.551 354.666 249.838 346.683 248.626 345.643Z",
        "M277.844 172.601C280.634 172.267 281.5 173.15 283.477 174.907C284.893 181.762 281.669 188.817 284.013 195.149C287.122 203.547 292.505 211.713 300.645 215.755C305.035 215.022 307.792 214.542 309.786 219.397C309.616 219.848 308.745 222.14 308.511 222.379C304.848 226.14 299.964 223.5 295.698 227.753C293.362 230.082 291.595 231.941 290.028 234.886C288.911 236.987 288.446 239.423 287.683 241.528C285.448 247.723 284.087 252.189 283.614 258.989C283.428 261.663 284.981 271.795 283.076 274.533C282.789 274.946 279.098 276.28 278.383 276.229C277.551 275.59 276.301 274.621 275.836 273.648C272.476 266.616 273.505 256.47 272.269 248.879C271.516 244.254 266.753 236.453 262.861 233.754C260.928 232.414 256.157 230.18 253.72 230.114C252.923 230.093 249.315 230.792 248.31 230.979C244.435 225.744 246.201 220.781 253.024 221.055C258.056 216.343 262.829 215.647 267.748 211.693C270.363 209.592 274.758 199.293 274.594 195.756C274.45 192.658 273.232 188.094 273.208 184.628C273.185 181.285 273.947 178.218 274.041 174.871C275.555 173.808 276.184 173.369 277.844 172.601ZM280.413 207.688C277.541 212.937 274.574 216.287 269.361 219.428C267.549 220.519 265.163 221.886 263.577 223.246C271.795 227.715 272.801 229.1 277.719 236.982L279.542 239.896C281.575 235.344 284.187 229.353 287.039 225.311C287.678 224.405 290.129 221.99 291.116 220.877C286.459 215.707 284.244 213.396 280.413 207.688Z",
        "M98.1129 395.252C99.6581 395.503 101.105 395.665 102.152 396.986C104.734 400.244 103.829 409.747 103.306 413.712C105.523 410.191 107.678 406.645 110.46 403.537C112.541 401.211 116.556 399.508 118.322 403.15C118.276 403.82 106.13 420.245 104.961 421.706C108.784 421.172 111.865 419.87 115.533 418.785C118.149 418.009 124.159 417.285 124.926 420.999C124.355 425.235 110.585 428.181 106.786 428.487C109.567 431.171 112.875 433.474 115.25 436.498C117.896 439.868 115.792 441.008 115.387 443.614C112.009 446.549 105.713 438.743 103.758 436.55C104.186 440.997 105.619 447.063 101.787 450.367C99.8428 451.313 97.2538 453.013 96.4632 449.625C95.3553 444.878 95.7199 439.271 95.7733 434.357C93.796 437.199 86.9729 446.806 83.143 445.663C78.8212 441.346 91.2846 428.865 94.1325 425.988C91.4289 426.6 77.1455 428.467 75.7902 426.404C76.3468 422.542 85.9268 421.504 88.9612 421.449C86.6609 419.4 77.6027 411.911 78.348 409.028C80.8325 399.425 92.6875 413.871 95.1044 417.253C96.0602 410.434 94.7032 399.783 98.1129 395.252Z",
        "M229.763 66.9453C232.321 66.9667 234.573 67.9299 235.681 70.4858C236.665 72.7575 236.233 73.8647 235.388 76.1099C237.321 74.7094 241.207 70.9297 242.779 70.1967C250.662 69.8544 240.66 80.2878 239.284 81.8153C243.835 82.8515 248.222 81.2877 252.51 82.9225C253.948 83.4708 255.534 85.6493 254.259 86.8907C250.322 90.7253 244.39 88.9823 239.371 90.1496C242.054 93.0393 250.16 99.2457 247.067 103.375C243.924 105.029 237.979 98.0311 235.834 95.8769C235.695 99.4036 235.852 106.469 234.234 109.388C233.784 110.201 232.547 110.367 231.643 110.563C226.77 109.131 229.097 104.095 228.607 100.161C228.426 98.7052 228.381 97.8666 228.012 96.392L227.4 97.1654C225.709 99.2942 223.141 102.888 220.392 102.78C213.702 102.516 217.24 97.8929 219.403 95.0952C221.189 92.7842 222.172 91.3642 224.095 89.3762C221.331 91.2133 219.06 92.3638 215.666 92.6255C213.226 92.8134 211.043 92.4429 211.268 89.4128C211.508 86.2007 213.154 84.8352 215.395 82.8336C217.802 82.7805 221.003 82.1119 223.352 81.5679C220.564 78.5552 217.422 75.2851 215.691 71.5634C217.158 70.5239 217.835 70.2105 219.484 69.4458C221.239 70.9675 226.5 76.8131 227.613 77.2841C229.334 76.5898 228.224 72.5745 228.585 70.637C228.901 68.9437 229.065 68.5492 229.763 66.9453Z",
        "M306.138 458.215C308.317 459.259 312.385 458.247 317.11 460.007C318.697 463.441 319.896 465.807 320.591 469.57C319.312 472.522 318.914 476.306 317.543 479.137C315.583 483.188 310.907 484.755 306.914 486.068C305.835 485.737 305.728 485.756 304.608 486.051L304.407 486.105C301.806 485.211 298.18 482.963 296.272 480.975C288.015 472.384 300.044 463.755 306.138 458.215ZM311.42 466.746C309.648 471.81 306.794 465.151 302.954 469.142C299.75 472.472 299.624 474.238 302.969 477.357C303.901 477.958 304.79 478.567 305.803 479.02C312.015 477.816 311.236 475.017 313.702 470.238C313.023 468.894 312.566 467.724 311.42 466.746Z",
        "M73.0671 107.452C87.199 105.792 87.6666 122.055 80.5359 130.05C77.614 133.325 76.8401 134.453 72.405 135.088C71.0876 134.751 70.3183 134.668 68.9636 134.631C64.7838 134.515 62.4184 130.528 61.4636 126.983C58.7356 116.854 63.1025 110.117 73.0671 107.452ZM76.4675 114.611C75.8785 114.292 75.7681 114.212 75.0407 114.279C72.2454 115.185 69.1657 116.119 67.7507 118.958C65.9503 122.571 67.613 127.53 71.5329 128.841C73.5284 128.385 74.2436 128.263 75.8825 126.886C79.1536 124.136 80.9781 117.059 76.4675 114.611Z",
        "M320.842 290.773C324.125 291.437 330.155 290.86 332.129 293.708C336.179 299.543 331.685 306.33 327.41 309.816C326.148 310.613 325.328 310.584 323.954 310.619C318.017 310.769 314.792 306.368 314.841 300.741C314.89 295.437 317.306 294.28 320.842 290.773Z",
        "M149.365 488.215C154.631 488.63 162.584 489.588 161.526 497.556C160.914 502.162 159.568 504.632 155.864 507.454C144.841 514.351 139.364 493.695 149.365 488.215Z",
        "M58.9879 297.84C66.4688 297.046 71.5925 301.692 69.5231 309.262C68.4721 313.105 65.8903 314.975 62.6291 316.802C61.4813 317.35 60.0447 317.76 58.815 318.153C55.2642 317.316 54.8849 316.816 52.855 313.772C52.9564 309.894 51.722 306.408 53.9133 302.344C55.1635 300.027 56.5588 298.659 58.9879 297.84Z",
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="#1C1C1C"
          strokeWidth="2"
          fill="#1C1C1C"
          className="stars-draw-path"
          style={{
            strokeDasharray: 2000,
            strokeDashoffset: visible ? 0 : 2000,
            fillOpacity: visible ? 1 : 0,
            transition: `stroke-dashoffset 2s ease-out ${i * 0.15}s, fill-opacity 0.5s ease-out ${1.5 + i * 0.15}s`,
          }}
        />
      ))}
    </svg>
  );
}

/* ── Scroll-triggered text reveal ── */
function TypedText({ text, start, delay = 0 }: { text: string; start: boolean; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!start) return;
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [start, delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span className="relative">
      <span className="invisible">{text}</span>
      <span className="absolute inset-0">
        {started ? displayed : ""}
        {started && displayed.length < text.length && (
          <span className="inline-block w-[2px] h-[1em] bg-stone-600 align-middle animate-pulse ml-[1px]" />
        )}
      </span>
    </span>
  );
}

function ScrollRevealText() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-[800px] mx-auto px-6 py-12 text-center">
      {/* Easter egg grid cells */}
      {easterEggCells.map((cell, i) => (
        <EasterEggCell
          key={i}
          containerRef={ref}
          col={cell.col}
          row={cell.row}
          animIdx={cell.animIdx}
          cardOffset={cell.cardOffset}
          cardRotate={cell.cardRotate}
        />
      ))}
      {/* Left: computer */}
      <div
        className="hidden lg:block absolute -left-[175px] top-[48px] w-[160px] transition-all duration-700 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0) rotate(-15deg)" : "translateX(-60px) rotate(-15deg)",
        }}
      >
        <img
          src="/computer.png"
          alt=""
          className="w-full transition-transform duration-300 ease-out hover:scale-110 hover:-translate-y-2 cursor-pointer"
          draggable={false}
        />
      </div>

      {/* Right: earbuds */}
      <div
        className="hidden lg:block absolute -right-[170px] top-[20px] w-[140px] transition-all duration-700 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0) rotate(-5deg)" : "translateX(60px) rotate(-5deg)",
          transitionDelay: "0.2s",
        }}
      >
        <img
          src="/earbuds.png"
          alt=""
          className="w-full transition-transform duration-300 ease-out hover:scale-110 hover:-translate-y-2 cursor-pointer"
          draggable={false}
        />
      </div>

      <p
        className="font-[family-name:var(--font-courier-prime)] text-[17px] md:text-[20px] text-stone-600 leading-relaxed transition-all duration-700 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
        }}
      >
        I turn ambiguity{" "}
        <img
          src="/messy.svg"
          alt=""
          className="inline-block w-[45px] h-auto align-middle -mt-6 -mx-3"
          draggable={false}
        />{" "}
        into clear product{" "}
        <span className="relative inline-block">
          <img
            src="/highlights.svg"
            alt=""
            className="absolute -top-4 left-[10%] -translate-x-1/2 w-[22px] h-auto pointer-events-none"
            draggable={false}
          />
          design
        </span>{" "}
        direction and ship with cross-functional teams{" "}
        <span className="inline-flex items-center border border-stone-500 px-2.5 pt-[2px] pb-[0px] rounded-sm">
          <TypedText text="at speed." start={visible} delay={700} />
        </span>
      </p>
      <p
        className="font-[family-name:var(--font-courier-prime)] text-[17px] md:text-[20px] text-stone-600 leading-relaxed mt-6 transition-all duration-700 ease-out delay-500"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transitionDelay: "0.5s",
        }}
      >
        <img
          src="/star.svg"
          alt=""
          className="inline-block w-[36px] h-auto align-middle -ml-0.5 mr-1 -mt-1"
          draggable={false}
        />
        Outside work,{" "}
        <span className="inline-flex items-center border border-stone-500 pl-2.5 pr-2 pt-[2px] pb-[0px] rounded-sm">
          <TypedText text="I build with AI," start={visible} delay={1400} />
        </span>{" "}
        prototyping ideas and exploring the edge of design and technology.
      </p>
    </div>
  );
}

/* ── 3D wireframe helpers ── */
function rotateY(x: number, y: number, z: number, a: number): [number, number, number] {
  return [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
}
function rotateX(x: number, y: number, z: number, a: number): [number, number, number] {
  return [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];
}
function project(x: number, y: number, z: number, d: number, cx: number, cy: number): [number, number] {
  const f = d / (d + z);
  return [cx + x * f, cy + y * f];
}

function WireframeCanvas({ draw }: { draw: (ctx: CanvasRenderingContext2D, t: number) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = 150 * dpr;
    canvas.height = 150 * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    let raf: number;
    const animate = (time: number) => {
      ctx.clearRect(0, 0, 150, 150);
      ctx.strokeStyle = "#292524";
      ctx.lineWidth = 0.8;
      draw(ctx, time * 0.001);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [draw]);
  return <canvas ref={canvasRef} width={150} height={150} className="w-[150px] h-[150px]" />;
}

/* ── Easter egg grid animations ── */
const gridAnimations = [
  // Wireframe globe
  () => {
    const draw = useRef((ctx: CanvasRenderingContext2D, t: number) => {
      const cx = 75, cy = 75, r = 40, s = 200;
      ctx.beginPath();
      // Longitude lines
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
      // Latitude lines
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
      // Rings around tube (cross-sections)
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
      // Rings along tube (longitudinal)
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
      // Build grid points in 3D, then project
      const pts: [number, number][][] = [];
      for (let r = 0; r < rows; r++) {
        pts[r] = [];
        for (let c = 0; c < cols; c++) {
          const x3d = (c - cols / 2) * spacing;
          const z3d = (r - rows / 2) * spacing;
          const y3d = Math.sin(c * 0.4 + r * 0.3 + t * 1.5) * 8;
          // Tilt: rotate around X axis for perspective
          const tilt = 1.1;
          const ry = y3d * Math.cos(tilt) - z3d * Math.sin(tilt);
          const rz = y3d * Math.sin(tilt) + z3d * Math.cos(tilt);
          pts[r][c] = project(x3d, ry, rz, 200, cx, cy);
        }
      }
      // Horizontal lines
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          c === 0 ? ctx.moveTo(pts[r][c][0], pts[r][c][1]) : ctx.lineTo(pts[r][c][0], pts[r][c][1]);
        }
        ctx.stroke();
      }
      // Vertical lines
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

// Grid cell positions (col, row relative to container's snapped grid) + card offsets
const easterEggCells = [
  { col: -2, row: -3, animIdx: 0, cardOffset: [60, -50] as [number, number], cardRotate: 2 },
  { col: -3, row: 5, animIdx: 1, cardOffset: [60, -50] as [number, number], cardRotate: -2 },
  { col: 16, row: -3, animIdx: 2, cardOffset: [-170, -50] as [number, number], cardRotate: -2 },
  { col: 17, row: 5, animIdx: 3, cardOffset: [-170, -50] as [number, number], cardRotate: 2 },
];

function EasterEggCell({ containerRef, col, row, animIdx, cardOffset, cardRotate }: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  col: number; row: number; animIdx: number;
  cardOffset: [number, number]; cardRotate: number;
}) {
  const GRID = 56;
  const [open, setOpen] = useState(false);
  const [snapOffset, setSnapOffset] = useState({ x: 0, y: 0 });
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
      // How far the container's top-left is from the nearest grid line
      const offX = ((bodyX % GRID) + GRID) % GRID;
      const offY = ((bodyY % GRID) + GRID) % GRID;
      setSnapOffset({ x: -offX, y: -offY });
    };
    // Recalculate periodically until layout settles (animations above may shift position)
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
          <div className="w-full h-full relative border border-dashed border-stone-300 rounded-[1px]">
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/egg:opacity-100 transition-opacity duration-200">
              <span className="text-stone-400 text-lg font-light select-none">+</span>
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

function RippedPaperNote() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  const stopRotating = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];
  };

  const startRotating = () => {
    stopRotating();
    setFading(true);
    const t1 = setTimeout(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
      setFading(false);
    }, 200);
    timeoutRefs.current.push(t1);
    timerRef.current = setInterval(() => {
      setFading(true);
      const t2 = setTimeout(() => {
        setQuoteIndex((prev) => (prev + 1) % quotes.length);
        setFading(false);
      }, 200);
      timeoutRefs.current.push(t2);
    }, 1200);
  };

  useEffect(() => {
    return () => stopRotating();
  }, []);

  return (
    <motion.div
      className="w-full flex justify-center px-6 -mt-14 pb-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative cursor-pointer select-none" style={{ transform: "rotate(-1.5deg)" }} onMouseEnter={startRotating} onMouseLeave={stopRotating}>
        {/* Tape — top left */}
        <div className="absolute -top-3 -left-4 w-[70px] h-[22px] z-10" style={{
          background: "linear-gradient(135deg, rgba(240,218,130,0.7) 0%, rgba(230,200,100,0.5) 100%)",
          transform: "rotate(-32deg)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          backdropFilter: "blur(1px)",
          clipPath: "polygon(2% 0%, 6% 2%, 12% 0%, 18% 1%, 25% 0%, 32% 2%, 38% 0%, 45% 1%, 52% 0%, 58% 2%, 65% 0%, 72% 1%, 78% 0%, 85% 2%, 92% 0%, 98% 1%, 100% 0%, 100% 100%, 97% 98%, 91% 100%, 85% 98%, 78% 100%, 72% 99%, 65% 100%, 58% 98%, 52% 100%, 45% 99%, 38% 100%, 32% 98%, 25% 100%, 18% 99%, 12% 100%, 6% 98%, 0% 100%)",
        }} />
        {/* Tape — top right */}
        <div className="absolute -top-3 -right-4 w-[70px] h-[22px] z-10" style={{
          background: "linear-gradient(135deg, rgba(240,218,130,0.7) 0%, rgba(230,200,100,0.5) 100%)",
          transform: "rotate(28deg)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          backdropFilter: "blur(1px)",
          clipPath: "polygon(3% 0%, 8% 2%, 15% 0%, 22% 1%, 28% 0%, 35% 2%, 42% 0%, 48% 1%, 55% 0%, 62% 2%, 68% 0%, 75% 1%, 82% 0%, 88% 2%, 95% 0%, 100% 1%, 100% 100%, 96% 98%, 90% 100%, 83% 99%, 76% 100%, 70% 98%, 63% 100%, 56% 99%, 50% 100%, 43% 98%, 36% 100%, 30% 99%, 23% 100%, 16% 98%, 10% 100%, 4% 99%, 0% 100%)",
        }} />
        {/* Tape — bottom left */}
        <div className="absolute -bottom-3 -left-3 w-[65px] h-[22px] z-10" style={{
          background: "linear-gradient(135deg, rgba(240,218,130,0.7) 0%, rgba(230,200,100,0.5) 100%)",
          transform: "rotate(25deg)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          backdropFilter: "blur(1px)",
          clipPath: "polygon(1% 0%, 7% 2%, 14% 0%, 20% 1%, 27% 0%, 34% 2%, 40% 0%, 47% 1%, 53% 0%, 60% 2%, 67% 0%, 73% 1%, 80% 0%, 87% 2%, 93% 0%, 100% 2%, 100% 100%, 95% 98%, 88% 100%, 82% 99%, 75% 100%, 68% 98%, 62% 100%, 55% 99%, 48% 100%, 42% 98%, 35% 100%, 28% 99%, 22% 100%, 15% 98%, 8% 100%, 2% 99%, 0% 100%)",
        }} />
        {/* Tape — bottom right */}
        <div className="absolute -bottom-3 -right-4 w-[65px] h-[22px] z-10" style={{
          background: "linear-gradient(135deg, rgba(240,218,130,0.7) 0%, rgba(230,200,100,0.5) 100%)",
          transform: "rotate(-30deg)",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          backdropFilter: "blur(1px)",
          clipPath: "polygon(0% 1%, 5% 0%, 11% 2%, 18% 0%, 24% 1%, 31% 0%, 38% 2%, 44% 0%, 51% 1%, 57% 0%, 64% 2%, 70% 0%, 77% 1%, 84% 0%, 90% 2%, 97% 0%, 100% 1%, 100% 100%, 94% 98%, 87% 100%, 81% 99%, 74% 100%, 67% 98%, 61% 100%, 54% 99%, 47% 100%, 41% 98%, 34% 100%, 27% 99%, 21% 100%, 14% 98%, 7% 100%, 1% 99%, 0% 100%)",
        }} />

        {/* Paper */}
        <div style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.15)) drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>
        <div className="relative w-[380px] md:w-[460px] px-10 py-12 overflow-hidden" style={{
          background: "#ECE9DD",
          clipPath: "polygon(0% 0%, 100% 0%, 100% calc(100% - 14px), 96% 100%, 92% calc(100% - 9px), 87% 100%, 82% calc(100% - 6px), 76% 100%, 71% calc(100% - 12px), 66% 100%, 60% calc(100% - 7px), 54% 100%, 48% calc(100% - 13px), 42% 100%, 36% calc(100% - 5px), 30% 100%, 24% calc(100% - 10px), 18% 100%, 12% calc(100% - 7px), 6% 100%, 2% calc(100% - 11px), 0% 100%)",
        }}>
          {/* Dots pattern */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle, rgba(180,200,220,0.35) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }} />

          {/* Quote */}
          <div className="relative z-10 overflow-hidden h-[32px] md:h-[36px]">
            <p
              key={quoteIndex}
              className="text-center text-lg md:text-xl text-stone-700 leading-relaxed quote-slide-in font-[family-name:var(--font-courier-prime)]"
              style={{ fontStyle: "italic" }}
            >
              {quotes[quoteIndex]}
            </p>
          </div>
        </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Flip book with parallax ── */
function FlipBookParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [300, -150]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.75, 0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.35], [0, 0.4, 1]);

  return (
    <div ref={ref} className="w-full flex justify-center mt-12 pb-8 overflow-visible">
      <motion.div style={{ y, scale, opacity }} className="w-full max-w-[1200px]">
        <iframe
          src="/page-flip-test.html"
          className="w-full border-none"
          style={{ height: "800px" }}
          title="Portfolio flip book"
        />
      </motion.div>
    </div>
  );
}

/* ── Click burst particles ── */
const particleColors = ["#e8445a", "#f4a8b5", "#ffb347", "#a78bfa", "#67e8f9", "#fbbf24", "#f9a8d4"];

function ClickBurst({ x, y, onDone }: { x: number; y: number; onDone: () => void }) {
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
  // Which image within its left/right group (0-4)
  const sideIndex = BOARD_IMAGES.slice(0, index).filter(b => b.side === img.side).length;

  // Stack positions above the board (in the gap between hero and board)
  const BOARD_W = 972;
  const BOARD_H = 578;
  const stackCenterX = img.side === "left" ? BOARD_W * 0.0 : BOARD_W * 0.85;
  const stackCenterY = -BOARD_H * 0.85;

  // Final position in board (from percentage props)
  const finalX = parseFloat(img.left) / 100 * BOARD_W;
  const finalY = parseFloat(img.top) / 100 * BOARD_H;

  // Spread images out so each is visible (cascade down and outward)
  const spreadX = img.side === "left"
    ? (sideIndex - 2) * 50 + [0, 30, -20, 15, -10][sideIndex]
    : (sideIndex - 2) * -50 + [0, -30, 20, -15, 10][sideIndex];
  const spreadY = sideIndex * 70;

  const startX = (stackCenterX + spreadX) - finalX;
  const startY = (stackCenterY + spreadY) - finalY;

  // Fly to board positions via scroll
  const moveStart = 0.3;
  const moveEnd = 0.85;

  const scrollX = useTransform(scrollYProgress, [0, moveStart, moveEnd], [startX, startX, 0]);
  const scrollY = useTransform(scrollYProgress, [0, moveStart, moveEnd], [startY, startY, 0]);
  const [visible, setVisible] = useState(false);
  const [hasLanded, setHasLanded] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.25 && !visible) setVisible(true);
    if (landed && !hasLanded) setHasLanded(true);
  });
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  return (
    <motion.img
      src={img.src}
      alt={`Showcase ${index + 1}`}
      drag={landed}
      dragMomentum={false}
      whileHover={{ scale: 1.05 }}
      whileDrag={{ scale: 1.08 }}
      onDragStart={() => {
        zCounterRef.current += 1;
        setImgZIndex((prev) => { const next = [...prev]; next[index] = zCounterRef.current; return next; });
      }}
      onTap={(e) => {
        const evt = e as unknown as MouseEvent;
        setBursts((prev) => [...prev, { id: Date.now(), x: evt.clientX, y: evt.clientY }]);
      }}
      className="absolute rounded-md shadow-lg cursor-grab active:cursor-grabbing transition-opacity duration-[800ms] ease-in"
      style={{
        top: img.top,
        left: img.left,
        width: img.w,
        rotate: img.rotate,
        zIndex: imgZIndex[index],
        x: hasLanded ? dragX : scrollX,
        y: hasLanded ? dragY : scrollY,
        opacity: hasLanded || visible ? 1 : 0,
      }}
      draggable={false}
    />
  );
}

/* ── ScatterBoard — scroll-tracked wrapper ── */
function ScatterBoard({
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
      <motion.p
        className="text-center font-[family-name:var(--font-courier-prime)] text-[13px] text-[#A8A29E] mb-1"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
      >Drag and drop to move</motion.p>
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
                  whileHover={{ scale: 1.05 }}
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

/* ── Tab definitions ── */
const tabs = siteConfig.sections.map((s) => ({
  id: s.id,
  label: s.id
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" "),
}));

/* ── Main page ── */
export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const { displayed, done } = useTypingEffect(siteConfig.name, 80);
  const activeSection = siteConfig.sections[activeTab];
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [imgZIndex, setImgZIndex] = useState<number[]>([1, 1, 2, 3, 3, 1, 1, 4, 1, 1]);
  const zCounterRef = useRef(10);
  const [arrowVisible, setArrowVisible] = useState(false);
  const onArrowVisible = useRef(() => setArrowVisible(true)).current;
  const [pageBursts, setPageBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  const burstCounter = useRef(0);
  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest("a, button, iframe")) return;
    const id = burstCounter.current++;
    setPageBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
  };

  return (
    <div className="relative" style={{ overflowX: "clip" }} onClick={handlePageClick}>
      <StarBackground />
      {pageBursts.map((b) => (
        <ClickBurst key={b.id} x={b.x} y={b.y} onDone={() => setPageBursts((prev) => prev.filter((p) => p.id !== b.id))} />
      ))}

      {/* Hero — full viewport, centered */}
      <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
      <div className="relative w-[1400px] h-[900px] overflow-visible" style={{ maxWidth: "100vw", transform: "translateX(-25px)" }}>
        <MacFolder />
        <DotMatrixBoard />
        <VinylCard />
        <NameBadge />
        <RetroWindows />
        {/* Ripped paper + ice coffee + plant */}
        <div className="hidden lg:block absolute top-[20px] left-[600px] -translate-x-1/2 z-20 rotate-[-5deg] transition-all duration-300 hover:scale-110 hover:rotate-[1deg] group/paper hero-entrance" style={{ animation: "hero-fade-in 0.7s cubic-bezier(0.4,0,0.2,1) 3.15s both" }}>
          <img
            src="/ripped-paper.png"
            alt="Ripped paper note"
            className="w-[520px] opacity-100 drop-shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-all duration-300"
            draggable={false}
          />
          <div className="absolute top-[50%] left-[55%] -translate-x-1/2 -translate-y-1/2">
            <img src="/ice-coffee.png" alt="Ice coffee" className="w-[85px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)] hover:coffee-wobble" draggable={false} />
          </div>
          <div className="absolute top-[70%] left-[16%] -translate-x-1/2 -translate-y-1/2">
            <img src="/plant.png" alt="Plant" className="w-[150px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-all duration-300 scale-[1.45] rotate-[-5deg] -translate-y-3 hover:drop-shadow-[0_12px_20px_rgba(0,0,0,0.3)] plant-hover" draggable={false} />
          </div>
          <div className="absolute top-1/2 left-[80%] -translate-x-1/2 -translate-y-1/2 group/pencil">
            <img src="/apple-pencil.png" alt="Apple Pencil" className="pencil-img w-[70px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-all duration-300 group-hover/pencil:scale-110 group-hover/pencil:-translate-y-2" draggable={false} />
            {/* Hand drawn line that reveals on hover */}
            <div className="absolute -bottom-[6px] left-[0px] w-[90px] h-[12px] pointer-events-none overflow-hidden">
              <img
                src="/hand-drawn-line.svg"
                alt=""
                className="w-full h-full object-contain pencil-line"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Flower vase sticker */}
        <div className="hidden lg:block absolute left-[410px] top-[355px] z-20 group/flower hero-entrance" style={{ animation: "hero-pop 0.7s cubic-bezier(0.4,0,0.2,1) 3.6s both" }}>
          <div className="relative w-[100px] rotate-[-6deg] transition-all duration-500 ease-out group-hover/flower:scale-[1.8] group-hover/flower:rotate-[-2deg] group-hover/flower:-translate-y-6 group-hover/flower:z-40" style={{ willChange: "transform" }}>
            <img
              src="/flower.png"
              alt=""
              className="w-full transition-opacity duration-500 ease-out group-hover/flower:opacity-0"
              draggable={false}
            />
            <img
              src="/flower hover.png"
              alt=""
              className="absolute inset-0 w-full opacity-0 transition-opacity duration-500 ease-out group-hover/flower:opacity-100 flower-glitch-target"
              draggable={false}
            />
          </div>
        </div>

        {/* Local time */}
        <div className="hidden lg:block absolute right-[10px] top-[20px] z-20 hero-entrance" style={{ animation: "hero-fade-in 0.6s cubic-bezier(0.4,0,0.2,1) 4.2s both" }}>
          <LocalTime />
        </div>

        {/* Concert ticket */}
        <div
          className="hidden lg:block absolute right-[80px] top-[100px] z-30 w-[370px] rotate-[4deg] transition-transform duration-300 ease-out hover:scale-[1.5] hover:rotate-[1deg] group/ticket hero-entrance"
          style={{ willChange: "transform", animation: "hero-fade-in 0.7s cubic-bezier(0.4,0,0.2,1) 3.75s both" }}
        >
          <img
            src="/ticket.jpg"
            alt="Design x Technology ticket"
            className="w-full opacity-95"
            draggable={false}
          />
          {/* Scan shimmer effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover/ticket:opacity-100">
            <div
              className="absolute top-0 -left-full w-full h-full group-hover/ticket:animate-[ticket-scan_2.2s_ease-in-out_infinite]"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255,100,100,0.08) 25%, rgba(255,200,50,0.12) 35%, rgba(100,255,150,0.12) 45%, rgba(255,255,255,0.3) 50%, rgba(100,180,255,0.12) 55%, rgba(200,100,255,0.12) 65%, rgba(255,100,150,0.08) 75%, transparent 100%)",
                filter: "blur(1.5px)",
              }}
            />
          </div>
        </div>

        {/* Image collage */}
        <a href="https://unsplash.com/@yl1980s" target="_blank" rel="noopener noreferrer" className="hidden lg:block absolute right-[-20px] top-[200px] z-10 rotate-[6deg] transition-transform duration-300 ease-out hover:rotate-[2deg] hover:scale-105 cursor-pointer group/collage overflow-visible hero-entrance"
      style={{ willChange: "transform", animation: "hero-fade-in 0.7s cubic-bezier(0.4,0,0.2,1) 3.9s both" }}>
          <div className="relative overflow-visible">
            <img
              src="/cat.png"
              alt="Cat peeking"
              className="absolute top-[30%] right-[15%] w-[180px] z-20 transition-[transform,opacity] duration-500 ease-out scale-0 opacity-0 origin-center group-hover/collage:scale-100 group-hover/collage:opacity-100 group-hover/collage:rotate-[8deg] drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)] group-hover/collage:-translate-y-3"
              style={{ willChange: "transform, opacity" }}
            />
            <img
              src="/image-collage.png"
              alt="Photo collage"
              className="w-[340px] rounded-xl shadow-lg relative z-10"
            />
          </div>
        </a>
        {/* Center text */}
        <div className="absolute top-[42%] left-[calc(50%+30px)] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
          <div className="relative mb-4 hero-entrance overflow-hidden" style={{ animation: "hero-blur-in 0.6s ease-out 0.3s both" }}>
            <img src="/yan-liu.svg" alt="Yan Liu" className="h-[80px] md:h-[100px]" draggable={false} />
            {/* Glare sweep */}
            <div className="absolute inset-0 pointer-events-none" style={{ animation: "hero-glare 1.2s ease-in-out 1.0s both" }}>
              <div className="absolute top-0 h-full w-[60%] -skew-x-12" style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 25%, rgba(255,255,255,0.8) 48%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.8) 52%, rgba(255,255,255,0.25) 75%, transparent 100%)",
              }} />
            </div>
          </div>
          <p className="font-[family-name:var(--font-courier-prime)] text-sm md:text-base text-text-secondary text-center tracking-[0.2em] uppercase hero-entrance" style={{ lineHeight: "1.8", animation: "hero-fade-in 0.5s cubic-bezier(0.4,0,0.2,1) 2.4s both" }}>
            Design like a strategist
          </p>
          <p className="font-[family-name:var(--font-courier-prime)] text-sm md:text-base text-text-secondary text-center tracking-[0.2em] uppercase hero-entrance" style={{ lineHeight: "1.8", animation: "hero-fade-in 0.5s cubic-bezier(0.4,0,0.2,1) 2.7s both" }}>
            Ship like a builder
          </p>
        </div>
      </div>
      </div>


      {/* Bulletin board */}
      <div className="mt-8" />
      <ScatterBoard
        imgZIndex={imgZIndex}
        setImgZIndex={setImgZIndex}
        zCounterRef={zCounterRef}
        arrowVisible={arrowVisible}
        setBursts={setBursts}
        bursts={bursts}
      />

      {/* Ripped paper quote + bio with decorative images */}
      <div className="mt-[220px]" />
      <div className="relative" style={{ transform: "translateX(-20px)" }}>
        <RippedPaperNote />
        <ScrollRevealText />
      </div>

      {/* Page flip book — portfolio sections */}
      <FlipBookParallax />

      {/* Social icons */}
      <motion.div
        className="flex justify-center gap-5 pt-12 pb-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        <motion.a variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.4 }} href="https://x.com/yanliudesign" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-stone-800 transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </motion.a>
        <motion.a variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.4 }} href="https://www.linkedin.com/in/uwyanliudesign" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-stone-800 transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </motion.a>
        <motion.a variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.4 }} href="https://www.figma.com/@yanliu" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-stone-800 transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.564v4.49c0 2.476-2.014 4.49-4.49 4.49h-.074zm-.024-7.51a3.023 3.023 0 00-3.019 3.019c0 1.665 1.355 3.019 3.019 3.019s3.019-1.355 3.019-3.019v-3.019H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.098-7.509a3.023 3.023 0 00-3.019 3.019c0 1.665 1.355 3.019 3.019 3.019s3.019-1.355 3.019-3.019-1.355-3.019-3.019-3.019z"/></svg>
        </motion.a>
        <motion.a variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.4 }} href="https://github.com/cottenpanda" target="_blank" rel="noopener noreferrer" className="text-stone-500 hover:text-stone-800 transition-colors">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
        </motion.a>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="w-full flex flex-col items-center gap-4 pt-4 pb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="flex items-center gap-3">
          <img src="/star.svg" alt="" className="w-5 h-5 brightness-0 opacity-70 animate-spin" style={{ animationDuration: "4s" }} draggable={false} />
          <p className="font-[family-name:var(--font-courier-prime)] text-[15px] tracking-wide" style={{ color: "#212121" }}>
            Vibe-coded by Yan Liu · Learning by building
          </p>
          <img src="/star.svg" alt="" className="w-5 h-5 brightness-0 opacity-70 animate-spin" style={{ animationDuration: "4s" }} draggable={false} />
        </div>
      </motion.footer>



      {/* Sections — hidden for now */}
      <div className="hidden flex-col items-center px-4 pb-24 relative z-10">
        {/* Navigation pills */}
        <nav className="flex flex-wrap justify-center gap-3 mb-16">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2 rounded-full font-mono text-xs transition-all ${
                i === activeTab
                  ? "bg-accent/15 text-accent border border-accent/30"
                  : "text-text-muted hover:text-text-secondary border border-editor-border hover:border-text-muted/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Section content card */}
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <h2 className="font-hand text-4xl md:text-5xl text-text-primary">
                {activeSection.title}
              </h2>
              <p className="text-text-secondary leading-relaxed text-base md:text-lg">
                {renderBold(activeSection.description)}
              </p>
              {activeSection.highlights.length > 0 && (
                <ul className="space-y-3">
                  {activeSection.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 text-text-secondary/90 leading-relaxed">
                      <span className="text-accent mt-1 shrink-0">-</span>
                      <span>{renderBold(h.text)}</span>
                    </li>
                  ))}
                </ul>
              )}
              {activeSection.cta && activeSection.cta.url && (
                <a
                  href={activeSection.cta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-sm text-accent hover:text-accent/80 transition-colors underline decoration-accent/30 hover:decoration-accent underline-offset-4"
                >
                  {activeSection.cta.label} &rarr;
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="mt-24 text-center">
          <p className="font-mono text-xs text-text-muted">
            &copy; {siteConfig.footer.copyright} {siteConfig.footer.domain}
          </p>
        </footer>
      </div>
    </div>
  );
}
