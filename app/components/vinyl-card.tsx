"use client";

import React from "react";

export function VinylCard() {
  return (
    <a href="https://cottenpanda.github.io/vibecodingplaylist/" target="_blank" rel="noopener noreferrer" className="hidden lg:block absolute left-[80px] top-[410px] z-30 transition-all duration-300 -rotate-[5deg] hover:rotate-[2deg] hover:scale-110 hover:-translate-y-5 cursor-pointer group/vinyl hero-entrance" style={{ overflow: "visible", animation: "hero-slide-left 0.7s cubic-bezier(0.4,0,0.2,1) 2.5s both" }}>
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
            <p className="font-[family-name:var(--font-noto)] text-[10px] text-text-primary uppercase tracking-widest mb-1">Playlist</p>
            <h3 className="font-[family-name:var(--font-noto)] text-text-primary font-bold text-lg leading-tight mb-1">Vibe Coding</h3>
            <p className="font-[family-name:var(--font-noto)] text-text-primary text-xs mb-1">19 projects</p>
            <p className="font-[family-name:var(--font-noto)] text-text-primary text-[11px] leading-snug">Built with creativity<br/>and curiosity.</p>
          </div>
        </div>
      </div>
    </a>
  );
}
