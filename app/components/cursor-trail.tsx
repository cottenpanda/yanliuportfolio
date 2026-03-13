"use client";

import React, { useEffect, useRef, useCallback } from "react";

const TRAIL_LENGTH = 12;
const COLORS = ["#d6cfc4", "#c9b99a", "#e8ddd0", "#b8a88a"];

interface Dot {
  x: number;
  y: number;
  age: number;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const lastAddRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
    const now = Date.now();
    if (now - lastAddRef.current > 20) {
      dotsRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      if (dotsRef.current.length > TRAIL_LENGTH) dotsRef.current.shift();
      lastAddRef.current = now;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dots = dotsRef.current;
      for (let i = 0; i < dots.length; i++) {
        dots[i].age++;
        const progress = i / dots.length;
        const opacity = progress * 0.4;
        const radius = progress * 4 + 1;
        const color = COLORS[i % COLORS.length];

        ctx.beginPath();
        ctx.arc(dots[i].x, dots[i].y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Remove old dots
      dotsRef.current = dots.filter((d) => d.age < 40);

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
}
