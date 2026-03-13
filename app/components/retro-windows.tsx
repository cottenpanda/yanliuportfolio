"use client";

import React, { useState, useEffect } from "react";

export function RetroWindows() {
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

  return (
    <div className="hidden lg:block absolute top-[500px] right-[310px] z-20 hero-entrance" style={{ animation: "hero-slide-up 0.7s cubic-bezier(0.4,0,0.2,1) 3.55s both" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="w-[320px] transition-transform duration-300 hover:scale-105 cursor-pointer">
        <div className="rounded-lg overflow-hidden" style={{ background: "#F5F5F4", boxShadow: "0 4px 20px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1)" }}>
          <div
            className="flex items-center justify-between px-3 py-2"
            style={{
              background: "linear-gradient(to bottom, #FAFAF9, #F0EFED)",
              borderBottom: "1px solid #e7e5e4",
            }}
          >
            <div className="flex items-center gap-1.5">
              <div className="w-[11px] h-[11px] rounded-full bg-[#FF5F57] border border-[#E0443E]" />
              <div className="w-[11px] h-[11px] rounded-full bg-[#FEBC2E] border border-[#DEA123]" />
              <div className="w-[11px] h-[11px] rounded-full bg-[#28C840] border border-[#1AAB29]" />
            </div>
            <span className="text-[11px] text-stone-400 select-none">Contact info</span>
            <div className="w-[52px]" />
          </div>
          <div className="w-full h-[180px] p-3 overflow-hidden" style={{ background: "#ffffff" }}>
            {typed && (
              <p className="text-[11px] text-stone-700 whitespace-pre-wrap leading-relaxed" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif" }}>
                {typed}
                <span className="inline-block w-[5px] h-[11px] bg-stone-400 ml-[1px] align-text-bottom" style={{ animation: "blink 1s step-end infinite" }} />
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function StartMenu() {
  const menuItems = [
    { icon: "📁", label: "Work", url: "https://yanliu.design/" },
    { icon: "📄", label: "Documents" },
    { icon: "⚙️", label: "Settings" },
    { icon: "🔍", label: "Find" },
    { icon: "❓", label: "Help" },
  ];

  const bottomItems = [
    { icon: "😴", label: "Sleep" },
    { icon: "⏻", label: "Shut Down..." },
  ];

  return (
    <div className="hidden lg:block absolute top-[600px] right-[320px] z-25" style={{ transform: "scale(0.75)", transformOrigin: "bottom left" }}>
      <div className="rounded-xl overflow-hidden backdrop-blur-xl" style={{ background: "rgba(245, 245, 244, 0.85)", boxShadow: "0 8px 32px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.08)" }}>
        <div className="flex flex-col py-1">
          {menuItems.map((item) => {
            const inner = (
              <>
                <span className="text-[12px] w-[16px] text-center select-none">{item.icon}</span>
                <span className="text-[12px] text-stone-700 group-hover:text-white select-none flex-1">
                  {item.label}
                </span>
              </>
            );
            return item.url ? (
              <a key={item.label} href={item.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-[5px] mx-1 rounded-md hover:bg-blue-500 cursor-pointer group no-underline transition-colors">
                {inner}
              </a>
            ) : (
              <div key={item.label} className="flex items-center gap-2 px-3 py-[5px] mx-1 rounded-md hover:bg-blue-500 cursor-pointer group transition-colors">
                {inner}
              </div>
            );
          })}

          <div className="mx-3 my-1 border-t border-stone-200" />

          {bottomItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 px-3 py-[5px] mx-1 rounded-md hover:bg-blue-500 cursor-pointer group transition-colors"
            >
              <span className="text-[12px] w-[16px] text-center select-none">{item.icon}</span>
              <span className="text-[12px] text-stone-700 group-hover:text-white select-none">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
