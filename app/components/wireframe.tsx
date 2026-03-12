"use client";

import React, { useRef, useEffect } from "react";

/* ── 3D wireframe helpers ── */
export function rotateY(x: number, y: number, z: number, a: number): [number, number, number] {
  return [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
}
export function rotateX(x: number, y: number, z: number, a: number): [number, number, number] {
  return [x, y * Math.cos(a) - z * Math.sin(a), y * Math.sin(a) + z * Math.cos(a)];
}
export function project(x: number, y: number, z: number, d: number, cx: number, cy: number): [number, number] {
  const f = d / (d + z);
  return [cx + x * f, cy + y * f];
}

export function WireframeCanvas({ draw }: { draw: (ctx: CanvasRenderingContext2D, t: number) => void }) {
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
