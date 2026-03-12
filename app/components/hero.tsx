"use client";

import React, { useState, useEffect } from "react";

/* ── Typing effect hook ── */
export function useTypingEffect(text: string, speed = 28) {
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
export function LocalTime() {
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
export function StarBackground() {
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

export function FloatingDecorations() {
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
export function MacFolder() {
  return (
    <div
      className="hidden lg:block absolute left-[440px] top-[560px] z-30 group cursor-pointer rotate-[6deg] transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:rotate-[2deg] hero-entrance"
      style={{ perspective: "500px", animation: "hero-slide-up 0.7s cubic-bezier(0.4,0,0.2,1) 2.8s both" }}
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

/* ── Hanging name badge ── */
export function NameBadge() {
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
              <p className="font-[family-name:var(--font-noto)] text-white/50 text-[9px] uppercase tracking-[0.1em] mt-2">Seattle-based<br />Senior Product Designer</p>
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
