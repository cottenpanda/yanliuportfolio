"use client";

import { useState, useEffect } from "react";
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
                className="w-full h-full object-cover grayscale"
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

      {/* Arrow between hero and flip book */}
      <div className="flex justify-center pt-32 pb-0">
        <img src="/Arrow.svg" alt="" className="w-56" draggable={false} />
      </div>

      {/* Page flip book — portfolio sections */}
      <div className="w-full flex justify-center pt-0 pb-24">
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
