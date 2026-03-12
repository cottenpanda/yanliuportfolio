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

  const windows = [
    { title: "Design projects", top: 0, left: 0, z: 10 },
    { title: "contact info", top: 24, left: 24, z: 20 },
  ];

  const bevel = {
    borderTop: "2px solid #dfdfdf",
    borderLeft: "2px solid #dfdfdf",
    borderRight: "2px solid #404040",
    borderBottom: "2px solid #404040",
  };

  const inset = {
    borderTop: "2px solid #808080",
    borderLeft: "2px solid #808080",
    borderRight: "2px solid #ffffff",
    borderBottom: "2px solid #ffffff",
  };

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
    <div className="hidden lg:block absolute top-[500px] right-[310px] z-20 hero-entrance" style={{ animation: "hero-slide-up 0.7s cubic-bezier(0.4,0,0.2,1) 3.55s both" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
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
            <div style={{ background: "#c0c0c0", ...bevel, boxShadow: "2px 4px 12px rgba(0,0,0,0.25)" }}>
              <div
                className="flex items-center justify-between px-[3px] py-[2px]"
                style={{
                  background: "linear-gradient(90deg, #000080 0%, #1084d0 100%)",
                  margin: "2px 2px 0 2px",
                }}
              >
                <div className="flex items-center gap-[4px] min-w-0">
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

              <div className="px-[4px] py-[1px] mx-[2px]" style={{ background: "#c0c0c0" }}>
                <div className="flex gap-3">
                  {["文件(F)", "编辑(E)", "帮助(H)"].map((m) => (
                    <span key={m} className="text-[10px] text-black select-none" style={{ fontFamily: "Tahoma, 'Microsoft YaHei', sans-serif" }}>{m}</span>
                  ))}
                </div>
              </div>

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

export function StartMenu() {
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
