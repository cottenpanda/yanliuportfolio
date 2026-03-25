"use client";

import React, { useEffect, useRef, useState } from "react";

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }
function easeOutBack(t: number) {
  const c1 = 1.70158, c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}
function easeInQuad(t: number) { return t * t; }

type AnimProps = { x: number; y: number; scale?: number; opacity?: number; rotate?: number };

function animate(el: HTMLElement, from: AnimProps, to: AnimProps, duration: number, easeFn: (t: number) => number) {
  return new Promise<void>(resolve => {
    const start = performance.now();
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      const e = easeFn(t);
      const x = from.x + (to.x - from.x) * e;
      const y = from.y + (to.y - from.y) * e;
      const scale = (from.scale ?? 1) + ((to.scale ?? 1) - (from.scale ?? 1)) * e;
      const opacity = (from.opacity ?? 1) + ((to.opacity ?? 1) - (from.opacity ?? 1)) * e;
      const rotate = (from.rotate ?? 0) + ((to.rotate ?? 0) - (from.rotate ?? 0)) * e;
      el.style.left = x + "px";
      el.style.top = y + "px";
      el.style.opacity = String(opacity);
      el.style.transform = `scale(${scale}) rotate(${rotate}deg)`;
      if (t < 1) requestAnimationFrame(tick);
      else resolve();
    }
    requestAnimationFrame(tick);
  });
}

function delay(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export function OpeningAnimation({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const FONT_SIZE = 100;
    const CENTER_X = window.innerWidth / 2;
    const CENTER_Y = window.innerHeight / 2;

    const letterDefs = [
      { char: "Y", group: "first" },
      { char: "a", group: "first" },
      { char: "n", group: "first" },
      { char: "L", group: "second" },
      { char: "i", group: "second" },
      { char: "u", group: "second" },
    ];

    // Create dot for "i"
    const iDot = document.createElement("div");
    Object.assign(iDot.style, {
      position: "absolute", width: "22px", height: "22px",
      borderRadius: "50%", background: "#ffffff", opacity: "0", willChange: "transform, opacity",
    });
    container.appendChild(iDot);

    // Create letter elements
    const els = letterDefs.map(def => {
      const el = document.createElement("div");
      Object.assign(el.style, {
        position: "absolute", fontSize: "100px", fontWeight: "900",
        color: "#ffffff", opacity: "0", willChange: "transform, opacity",
        userSelect: "none", lineHeight: "1", fontFamily: "'Noto Sans', sans-serif",
      });
      el.textContent = def.char === "i" ? "\u0131" : def.char;
      container.appendChild(el);
      return { el, char: def.char, group: def.group };
    });

    // Measure and compute final positions
    els.forEach(o => { o.el.style.opacity = "0.01"; });

    const yanGaps = [-6, 4];
    const liuGaps = [0, 4];
    const wordGap = 36;
    const widths = els.map(o => o.el.offsetWidth);

    const yanWidth = widths[0] + yanGaps[0] + widths[1] + yanGaps[1] + widths[2];
    const liuWidth = widths[3] + liuGaps[0] + widths[4] + liuGaps[1] + widths[5];
    const totalWidth = yanWidth + wordGap + liuWidth;

    let x = CENTER_X - totalWidth / 2;
    const y = CENTER_Y - FONT_SIZE / 2;
    const finalPos: { x: number; y: number }[] = [];

    finalPos.push({ x, y }); x += widths[0] + yanGaps[0];
    finalPos.push({ x, y }); x += widths[1] + yanGaps[1];
    finalPos.push({ x, y }); x += widths[2] + wordGap;
    finalPos.push({ x, y }); x += widths[3] + liuGaps[0];
    finalPos.push({ x, y }); x += widths[4] + liuGaps[1];
    finalPos.push({ x, y });

    els.forEach(o => { o.el.style.opacity = "0"; });

    // Flash element
    const flash = document.createElement("div");
    Object.assign(flash.style, {
      position: "absolute", width: "10px", height: "10px", borderRadius: "50%",
      background: "radial-gradient(circle, rgba(200,160,120,0.6) 0%, transparent 70%)",
      pointerEvents: "none", opacity: "0",
    });
    container.appendChild(flash);

    async function run() {
      const yEl = els[0];
      const lEl = els[3];

      // STEP 1: Y rises from bottom
      const yCenterX = CENTER_X - yEl.el.offsetWidth / 2;
      const yStartY = window.innerHeight + 50;
      const yEndY = CENTER_Y - FONT_SIZE / 2;

      await animate(yEl.el,
        { x: yCenterX, y: yStartY, scale: 4, opacity: 0.5 },
        { x: yCenterX, y: yEndY, scale: 1.2, opacity: 1 },
        700, easeOutCubic
      );
      await delay(150);

      // STEP 2: L falls from top
      const lStartX = CENTER_X - lEl.el.offsetWidth / 2 + 20;
      const lStartY = -120;
      const lCollideY = CENTER_Y - FONT_SIZE / 2;

      lEl.el.style.opacity = "1";
      await animate(lEl.el,
        { x: lStartX, y: lStartY, scale: 1, opacity: 1 },
        { x: lStartX, y: lCollideY, scale: 1, opacity: 1 },
        600, easeInQuad
      );

      // STEP 3: Collision flash + shake
      flash.style.left = CENTER_X - 5 + "px";
      flash.style.top = CENTER_Y - 5 + "px";
      flash.style.animation = "flashBurst 0.5s ease-out forwards";
      container!.style.animation = "shake 0.4s ease-out";

      await Promise.all([
        animate(yEl.el,
          { x: CENTER_X - yEl.el.offsetWidth / 2, y: CENTER_Y - FONT_SIZE / 2, scale: 1.2, opacity: 1 },
          { x: CENTER_X - yEl.el.offsetWidth / 2 - 40, y: CENTER_Y - FONT_SIZE / 2, scale: 1.3, opacity: 1 },
          150, easeOutCubic
        ),
        animate(lEl.el,
          { x: lStartX, y: lCollideY, scale: 1, opacity: 1 },
          { x: lStartX + 40, y: lCollideY, scale: 1.3, opacity: 1 },
          150, easeOutCubic
        ),
      ]);

      // STEP 4: Other letters burst out immediately
      const burstLetters = [
        { obj: els[1], angle: -140, dist: 250, burstX: 0, burstY: 0 },
        { obj: els[2], angle: -200, dist: 220, burstX: 0, burstY: 0 },
        { obj: els[4], angle: -20, dist: 200, burstX: 0, burstY: 0 },
        { obj: els[5], angle: 30, dist: 260, burstX: 0, burstY: 0 },
      ];

      const burstPromises = burstLetters.map(bl => {
        const rad = bl.angle * Math.PI / 180;
        bl.burstX = CENTER_X + Math.cos(rad) * bl.dist - 25;
        bl.burstY = CENTER_Y + Math.sin(rad) * bl.dist - FONT_SIZE / 2;
        return animate(bl.obj.el,
          { x: CENTER_X - 25, y: CENTER_Y - FONT_SIZE / 2, scale: 0.3, opacity: 0, rotate: (Math.random() - 0.5) * 60 },
          { x: bl.burstX, y: bl.burstY, scale: 1.1, opacity: 1, rotate: (Math.random() - 0.5) * 20 },
          450, easeOutCubic
        );
      });
      await Promise.all(burstPromises);
      container!.style.animation = "";
      await delay(200);

      // STEP 5: Settle into final positions
      const settlePromises = els.map((obj, i) => {
        const currentX = parseFloat(obj.el.style.left) || 0;
        const currentY = parseFloat(obj.el.style.top) || 0;
        return animate(obj.el,
          { x: currentX, y: currentY, scale: parseFloat(obj.el.style.transform?.match(/scale\(([^)]+)\)/)?.[1] || "1"), opacity: 1, rotate: 0 },
          { x: finalPos[i].x, y: finalPos[i].y, scale: 1, opacity: 1, rotate: 0 },
          800, easeOutBack
        );
      });
      await Promise.all(settlePromises);

      // STEP 6: Dot of "i" bounces in immediately
      await delay(100);
      const iEl = els[4].el;
      const iRect = iEl.getBoundingClientRect();
      const dotFinalX = iRect.left + iRect.width / 2 - 11;
      const dotFinalY = iRect.top - 2;

      await animate(iDot,
        { x: dotFinalX, y: -50, scale: 1, opacity: 1 },
        { x: dotFinalX, y: dotFinalY, scale: 1, opacity: 1 },
        400, easeInQuad
      );
      await animate(iDot,
        { x: dotFinalX, y: dotFinalY, scale: 1.3, opacity: 1 },
        { x: dotFinalX, y: dotFinalY - 15, scale: 1, opacity: 1 },
        150, easeOutCubic
      );
      await animate(iDot,
        { x: dotFinalX, y: dotFinalY - 15, scale: 1, opacity: 1 },
        { x: dotFinalX, y: dotFinalY, scale: 1, opacity: 1 },
        200, easeInQuad
      );

      // Done — slide out
      await delay(400);
      setFadeOut(true);
      setTimeout(onComplete, 700);
    }

    const timer = setTimeout(run, 100);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "#1e1e1e",
        transform: fadeOut ? "translateY(100%)" : "translateY(0)",
        transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
        fontFamily: "'Noto Sans', sans-serif",
      }}
    >
      <style>{`
        @keyframes flashBurst {
          0% { transform: scale(0); opacity: 1; }
          100% { transform: scale(40); opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-4px, 2px); }
          20% { transform: translate(3px, -3px); }
          30% { transform: translate(-2px, 4px); }
          40% { transform: translate(4px, -1px); }
          50% { transform: translate(-3px, -2px); }
          60% { transform: translate(2px, 3px); }
          70% { transform: translate(-1px, -4px); }
          80% { transform: translate(3px, 2px); }
          90% { transform: translate(-2px, -1px); }
        }
      `}</style>
    </div>
  );
}
