"use client";

import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
      className="hidden lg:block absolute left-[36.5%] bottom-[7%] z-30 group cursor-pointer rotate-[6deg] transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:rotate-[2deg]"
      style={{ perspective: "500px" }}
    >
      <div className="relative w-[130px] h-[130px] transition-all duration-300 group-hover:drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)]">
        {/* Back panel — stays in place */}
        <img
          src="/mac-folder-back.svg"
          alt=""
          className="absolute inset-0 w-full h-full z-0"
          draggable={false}
        />
        {/* Items that pop out on hover */}
        {/* iPad + notebook — left */}
        <img
          src="/Ipad and notebook.svg"
          alt="iPad and notebook"
          className="absolute left-1/2 bottom-[30%] w-[90px] -translate-x-1/2 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 group-hover:-translate-y-[75px] group-hover:-translate-x-[140px] group-hover:rotate-[-15deg] z-10"
          style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.25))" }}
          draggable={false}
        />
        {/* Claude logo — upper center-right */}
        <img
          src="/Claude logo.svg"
          alt="Claude"
          className="absolute left-1/2 bottom-[30%] w-[55px] -translate-x-1/2 transition-all duration-500 ease-out delay-75 opacity-0 group-hover:opacity-100 group-hover:-translate-y-[95px] group-hover:-translate-x-[30px] group-hover:rotate-[5deg] z-10"
          style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.25))" }}
          draggable={false}
        />
        {/* Laptop — right */}
        <img
          src="/laptop.svg"
          alt="Laptop"
          className="absolute left-1/2 bottom-[30%] w-[90px] -translate-x-1/2 transition-all duration-500 ease-out delay-150 opacity-0 group-hover:opacity-100 group-hover:-translate-y-[65px] group-hover:translate-x-[40px] group-hover:rotate-[10deg] z-10"
          style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.25))" }}
          draggable={false}
        />
        {/* Front panel — rotates open on hover */}
        <img
          src="/mac-folder-front.svg"
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

function DotMatrixBoard() {
  return (
    <a
      href={siteConfig.links.figma}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden lg:block absolute right-[18%] top-[12%] z-20 cursor-pointer transition-transform duration-300 rotate-[8deg] scale-[0.55] hover:scale-[0.62] hover:rotate-[3deg]"
    >
      {/* Display panel */}
      <div className="rounded-2xl p-3" style={{
        background: "linear-gradient(160deg, #4a4a4a 0%, #3a3a3a 30%, #2d2d2d 100%)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.2)",
      }}>
        {/* LED grid */}
        <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${FIGMA_COLS}, 1fr)` }}>
          {figmaGrid.map((on, i) => (
            <div
              key={i}
              className="w-[7px] h-[7px] rounded-full"
              style={{
                background: on
                  ? "radial-gradient(circle at 40% 35%, #ffffff, #e0e0e0 50%, #aaa 100%)"
                  : "radial-gradient(circle at 40% 35%, #3a3a3a, #2a2a2a 60%, #222 100%)",
                boxShadow: on
                  ? "0 0 6px rgba(255,255,255,0.5), 0 0 2px rgba(255,255,255,0.8)"
                  : "inset 0 1px 2px rgba(0,0,0,0.6), 0 0.5px 0 rgba(255,255,255,0.05)",
                border: on ? "none" : "0.5px solid rgba(80,80,80,0.5)",
              }}
            />
          ))}
        </div>
      </div>
    </a>
  );
}

/* ── Vinyl playlist card (floating decoration) ── */
function VinylCard() {
  return (
    <a href="https://cottenpanda.github.io/vibecodingplaylist/" target="_blank" rel="noopener noreferrer" className="hidden lg:block absolute left-[8%] bottom-[-1%] z-30 transition-all duration-300 -rotate-[5deg] hover:rotate-[2deg] hover:scale-110 hover:-translate-y-5 cursor-pointer">
      <div className="bg-white border border-editor-border rounded-2xl p-6 shadow-sm flex flex-col items-center w-[240px]">
        {/* Vinyl record */}
        <img
          src="/Vinyl.png"
          alt="Vinyl record"
          className="w-36 h-36 vinyl-spin"
          draggable={false}
        />

        {/* Info */}
        <div className="mt-4 text-center">
          <p className="font-[family-name:var(--font-noto)] text-[10px] text-text-muted uppercase tracking-widest mb-1">Playlist</p>
          <h3 className="font-[family-name:var(--font-noto)] text-text-primary font-bold text-lg leading-tight mb-1">Vibe Coding</h3>
          <p className="font-[family-name:var(--font-noto)] text-text-muted text-xs mb-1">18 projects</p>
          <p className="font-[family-name:var(--font-noto)] text-text-muted/70 text-[11px] leading-snug">Built with creativity<br/>and curiosity.</p>
        </div>
      </div>
    </a>
  );
}

/* ── Hanging name badge ── */
function NameBadge() {
  return (
    <div className="hidden lg:flex flex-col items-center absolute left-[4%] top-[-80px] z-20 badge-drop">
     <a href="https://www.linkedin.com/in/uwyanliudesign" target="_blank" rel="noopener noreferrer" className="badge-swing flex flex-col items-center cursor-pointer">
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
              backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }} />
            {/* Name */}
            <div className="relative z-10">
              <h3 className="text-white font-extrabold text-[32px] leading-[1.05] tracking-[0.15em]">刘彦</h3>
              <p className="font-mono text-white/50 text-[10px] uppercase tracking-[0.15em] mt-2">Product Designer</p>
            </div>
            {/* Starburst accent */}
            <img src="/star.svg" alt="" className="absolute top-3 right-3 z-10 w-12 h-12" draggable={false} />
          </div>

          {/* Bottom section — dark with profile photo */}
          <div className="px-4 pt-5 pb-5 flex flex-col items-center" style={{
            background: "linear-gradient(180deg, #1c1917, #0c0a09)",
          }}>
            <div className="w-32 h-32 rounded-full overflow-hidden bg-stone-600" style={{
              border: "3px solid #57534e",
              borderTopColor: "#6b6560",
              borderBottomColor: "#3a3633",
            }}>
              <img
                src="/profile.png"
                alt="Yan Liu"
                className="w-full h-full object-cover"
                draggable={false}
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
  const email = "yanliudesignlife@gmail.com";

  useEffect(() => {
    if (!hovered) { setTyped(""); return; }
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(email.slice(0, i));
      if (i >= email.length) clearInterval(interval);
    }, 50);
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
    <div className="hidden lg:block absolute bottom-[-4%] right-[21%] z-20" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="relative w-[300px] h-[240px]">
        {windows.map((win, i) => (
          <div
            key={i}
            className="absolute w-[230px] transition-transform duration-300 hover:scale-105 cursor-pointer"
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
                <div className="w-full h-[110px] p-2" style={{ background: "#ffffff" }}>
                  {i === windows.length - 1 && typed && (
                    <span className="text-[11px] text-black font-mono">
                      {typed}
                      <span className="inline-block w-[5px] h-[11px] bg-black ml-[1px] align-text-bottom" style={{ animation: "blink 1s step-end infinite" }} />
                    </span>
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
    <div className="hidden lg:block absolute bottom-[4%] right-[24%] z-25" style={{ transform: "scale(0.75)", transformOrigin: "bottom left" }}>
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

function ArrowAnimated() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex justify-center -mt-24 pb-0">
      <svg width="470" height="591" viewBox="0 0 470 591" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-56">
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
  const [imgZIndex, setImgZIndex] = useState<number[]>([1, 1, 1, 1, 3, 1, 1, 2, 1, 1]);
  const zCounterRef = useRef(10);

  return (
    <div className="bg-background relative overflow-x-hidden">
      <StarBackground />
      <FloatingDecorations />

      {/* Hero — full viewport, centered */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 relative z-10 animate-fade-in">
        <MacFolder />
        <DotMatrixBoard />
        <VinylCard />
        <NameBadge />
        <RetroWindows />
        {/* Ripped paper + ice coffee + plant */}
        <div className="hidden lg:block absolute top-[3%] left-[45%] -translate-x-1/2 z-20 rotate-[-2deg] transition-all duration-300 hover:scale-110 hover:rotate-[1deg] group/paper">
          <img
            src="/ripped-paper.png"
            alt="Ripped paper note"
            className="w-[520px] opacity-80 group-hover/paper:opacity-100 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-opacity duration-300"
            draggable={false}
          />
          <div className="absolute top-[50%] left-[62%] -translate-x-1/2 -translate-y-1/2">
            <img src="/ice-coffee.png" alt="Ice coffee" className="w-[70px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-125 hover:rotate-[6deg] hover:-translate-y-3" draggable={false} />
          </div>
          <div className="absolute top-[70%] left-[35%] -translate-x-1/2 -translate-y-1/2">
            <img src="/plant.png" alt="Plant" className="w-[120px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-125 hover:rotate-[-5deg] hover:-translate-y-3" draggable={false} />
          </div>
          <div className="absolute top-1/2 left-[88%] -translate-x-1/2 -translate-y-1/2">
            <img src="/apple-pencil.png" alt="Apple Pencil" className="w-[70px] drop-shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition-all duration-300 hover:scale-125 hover:rotate-[4deg] hover:-translate-y-3" draggable={false} />
          </div>
        </div>

        {/* Milk tea doodle */}
        <img
          src="/milk-tea.png"
          alt="Milk tea"
          className="hidden lg:block absolute right-[3%] top-[10%] z-30 w-[160px] rotate-[6deg] opacity-40 transition-all duration-300 hover:scale-[1.3] hover:rotate-[2deg] hover:opacity-80"
          draggable={false}
        />

        {/* Image collage */}
        <a href="https://unsplash.com/@yl1980s" target="_blank" rel="noopener noreferrer" className="hidden lg:block absolute right-[-3%] bottom-[-3%] z-10 rotate-[6deg] transition-transform duration-300 hover:rotate-[2deg] hover:scale-105 cursor-pointer group/collage overflow-visible">
          <div className="relative overflow-visible">
            <img
              src="/cat.png"
              alt="Cat peeking"
              className="absolute top-[30%] right-[15%] w-[180px] z-20 transition-all duration-500 ease-out scale-0 opacity-0 origin-center group-hover/collage:scale-100 group-hover/collage:opacity-100 group-hover/collage:rotate-[8deg] drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)] group-hover/collage:-translate-y-3"
            />
            <img
              src="/image-collage.png"
              alt="Photo collage"
              className="w-[340px] rounded-xl shadow-lg relative z-10"
            />
          </div>
        </a>
        <h1 className="font-[family-name:var(--font-noto)] text-5xl md:text-7xl font-bold text-text-primary mb-4">
          {displayed}
          {!done && (
            <span className="inline-block w-[3px] h-[0.7em] bg-text-primary align-text-bottom ml-[2px] cursor-blink" />
          )}
        </h1>
        <p className="font-[family-name:var(--font-noto)] text-xs md:text-sm text-text-secondary uppercase tracking-[0.25em] mb-1">
          {siteConfig.subtitle}
        </p>
        <p className="font-[family-name:var(--font-noto)] text-xs md:text-sm text-text-secondary max-w-lg text-center leading-relaxed tracking-[0.08em] mt-2">
          {siteConfig.tagline}
        </p>
      </div>

      {/* Arrow between hero and bulletin board */}
      <ArrowAnimated />

      {/* Bulletin board */}
      <div className="w-full flex justify-center px-6 pt-4 pb-4">
        <div className="w-full max-w-[1000px]">
          {/* Dark frame */}
          <div className="rounded-3xl p-[14px]" style={{
            background: "linear-gradient(160deg, #3a3a3a 0%, #2a2a2a 20%, #1c1c1c 80%, #111111 100%)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.35), 0 24px 70px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.4)",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            borderLeft: "1px solid rgba(255,255,255,0.06)",
            borderRight: "1px solid rgba(0,0,0,0.3)",
            borderBottom: "2px solid rgba(0,0,0,0.5)",
          }}>
          <div className="min-h-[578px] rounded-xl relative" style={{
            background: "linear-gradient(150deg, #2a2a2a 0%, #1a1a1a 35%, #111111 100%)",
            border: "1px solid rgba(0,0,0,0.4)",
            boxShadow: "inset 0 2px 6px rgba(0,0,0,0.4), inset 0 -1px 0 rgba(255,255,255,0.05)",
          }}>
            {/* Paper texture noise */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.18]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }} />
            {/* Grid pattern */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: `
                linear-gradient(rgba(200, 170, 120, 0.12) 1px, transparent 1px),
                linear-gradient(90deg, rgba(200, 170, 120, 0.12) 1px, transparent 1px)
              `,
              backgroundSize: "36px 36px",
            }} />
            {/* Row numbers */}
            <div className="absolute top-0 left-0 bottom-0 w-[24px] flex flex-col pointer-events-none select-none">
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i} className="font-mono text-[9px] text-stone-600 text-right pr-1" style={{ height: "36px", lineHeight: "36px" }}>
                  {i + 1}
                </span>
              ))}
            </div>
            {/* Showcase images — draggable */}
            {[
              { src: "/bulletin/1.jpg", top: "4%", left: "8%", rotate: "-5deg", w: 220, z: 1 },
              { src: "/bulletin/2.jpg", top: "6%", left: "58%", rotate: "3deg", w: 210, z: 1 },
              { src: "/bulletin/3.jpg", top: "3%", left: "31%", rotate: "-2deg", w: 250, z: 1 },
              { src: "/bulletin/4.jpg", top: "38%", left: "5%", rotate: "4deg", w: 215, z: 1 },
              { src: "/bulletin/5.jpg", top: "35%", left: "38%", rotate: "6deg", w: 240, z: 3 },
              { src: "/bulletin/6.jpg", top: "40%", left: "68%", rotate: "2deg", w: 210, z: 1 },
              { src: "/bulletin/7.jpg", top: "74%", left: "12%", rotate: "-3deg", w: 240, z: 1 },
              { src: "/bulletin/8.jpg", top: "70%", left: "42%", rotate: "5deg", w: 215, z: 2 },
              { src: "/bulletin/9.jpg", top: "65%", left: "72%", rotate: "-4deg", w: 205, z: 1 },
              { src: "/bulletin/10.jpg", top: "12%", left: "80%", rotate: "6deg", w: 235, z: 1 },
            ].map((img, i) => (
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
            ))}

            {/* Click burst particles */}
            {bursts.map((b) => (
              <ClickBurst key={b.id} x={b.x} y={b.y} onDone={() => setBursts((prev) => prev.filter((p) => p.id !== b.id))} />
            ))}
          </div>
          </div>
        </div>
      </div>

      {/* Arrow between hero and flip book */}
      <ArrowAnimated />

      {/* Page flip book — portfolio sections */}
      <div className="w-full flex justify-center -mt-16 pb-24">
        <iframe
          src="/page-flip-test.html"
          className="w-full max-w-[1200px] border-none"
          style={{ height: "800px" }}
          title="Portfolio flip book"
        />
      </div>

      {/* Footer */}
      <footer className="w-full text-center py-12">
        <p className="text-sm text-text-muted">
          Vibe-coded by Yan Liu · Learning by building
        </p>
      </footer>

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
