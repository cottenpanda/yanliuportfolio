"use client";

import React, { useState, useEffect } from "react";

const terminalLines = [
  { prompt: "$ whoami", output: "Yan Liu — Product Designer @ Getty Images" },
  { prompt: "$ ls interests/", output: "AI/  designs/  doodles/  photography/" },
];

export function RetroWindows() {
  const [hovered, setHovered] = useState(false);
  const [display, setDisplay] = useState<string[]>([]);
  const [showCat, setShowCat] = useState(false);

  useEffect(() => {
    if (!hovered) { setDisplay([]); setShowCat(false); return; }
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let delay = 0;

    terminalLines.forEach((line, lineIdx) => {
      for (let c = 1; c <= line.prompt.length; c++) {
        timeouts.push(setTimeout(() => {
          setDisplay(prev => {
            const next = [...prev];
            next[lineIdx * 2] = line.prompt.slice(0, c);
            return next;
          });
        }, delay));
        delay += 25;
      }
      delay += 200;
      timeouts.push(setTimeout(() => {
        setDisplay(prev => {
          const next = [...prev];
          next[lineIdx * 2 + 1] = line.output;
          return next;
        });
      }, delay));
      delay += 300;
    });

    timeouts.push(setTimeout(() => setShowCat(true), delay));

    return () => timeouts.forEach(clearTimeout);
  }, [hovered]);

  const allDone = display.length > 0 && display[terminalLines.length * 2 - 1] !== undefined;

  return (
    <div className="hidden lg:block absolute top-[500px] right-[310px] z-20 hero-entrance" style={{ animation: "hero-slide-up 0.7s cubic-bezier(0.4,0,0.2,1) 3.55s both" }} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="w-[340px] transition-transform duration-300 hover:scale-105 cursor-pointer">
        <div className="rounded-lg overflow-hidden" style={{ background: "#ffffff", boxShadow: "0 4px 20px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.1)", border: "1px solid #e7e5e4" }}>
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
            <span className="text-[11px] text-stone-400 select-none">yan-liu — zsh</span>
            <div className="w-[52px]" />
          </div>
          <div className="w-full h-[220px] p-3 overflow-hidden font-mono text-[11px] leading-[1.7]">
            {terminalLines.map((line, i) => (
              <div key={i}>
                {display[i * 2] !== undefined && (
                  <div className="text-stone-800">
                    <span className="text-emerald-600">~</span>{" "}
                    {display[i * 2]}
                    {display[i * 2 + 1] === undefined && (
                      <span className="inline-block w-[6px] h-[12px] bg-stone-400 ml-[1px] align-text-bottom" style={{ animation: "blink 1s step-end infinite" }} />
                    )}
                  </div>
                )}
                {display[i * 2 + 1] !== undefined && (
                  <div className="text-stone-500 mb-1">{display[i * 2 + 1]}</div>
                )}
              </div>
            ))}
            {allDone && !showCat && (
              <div className="text-stone-800">
                <span className="text-emerald-600">~</span> $
                <span className="inline-block w-[6px] h-[12px] bg-stone-400 ml-[1px] align-text-bottom" style={{ animation: "blink 1s step-end infinite" }} />
              </div>
            )}
            {showCat && (
              <>
                <div className="text-stone-800 mb-1">
                  <span className="text-emerald-600">~</span> $ cat dance.sh
                </div>
                <div className="flex justify-center">
                  <img src="/cat-dance.gif" alt="Dancing cat" className="h-[90px]" draggable={false} />
                </div>
              </>
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
