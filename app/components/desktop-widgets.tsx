"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Matter from "matter-js";

const appTools = [
  { label: "Claude", icon: "/app-claude.jpg", glow: "#D97706" },
  { label: "Figma", icon: "/app-figma.jpg", glow: "#A259FF" },
  { label: "Cursor", icon: "/app-cursor.jpg", glow: "#3B82F6" },
  { label: "Google AI Studio", icon: "/app-google-ai.jpg", glow: "#4285F4" },
  { label: "Lovable", icon: "/app-lovable.jpg", glow: "#F472B6" },
  { label: "Codex", icon: "/app-codex.jpg", glow: "#10B981" },
  { label: "GitHub", icon: "/app-github.jpg", glow: "#8B5CF6" },
  { label: "ChatGPT", icon: "/app-chatgpt.jpg", glow: "#10A37F" },
];

export function WidgetClock() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const h = time.getHours() % 12;
  const m = time.getMinutes();
  const s = time.getSeconds();
  const hDeg = h * 30 + m * 0.5;
  const mDeg = m * 6;
  const sDeg = s * 6;
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="none" stroke="#57534e" strokeWidth="1" />
        {[...Array(12)].map((_, i) => (
          <line key={i} x1="50" y1="8" x2="50" y2="14" stroke="#a8a29e" strokeWidth="1.5" transform={`rotate(${i * 30} 50 50)`} />
        ))}
        <line x1="50" y1="50" x2="50" y2="22" stroke="white" strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${hDeg} 50 50)`} />
        <line x1="50" y1="50" x2="50" y2="16" stroke="white" strokeWidth="1.5" strokeLinecap="round" transform={`rotate(${mDeg} 50 50)`} />
        <line x1="50" y1="50" x2="50" y2="14" stroke="#ef4444" strokeWidth="0.8" strokeLinecap="round" transform={`rotate(${sDeg} 50 50)`} />
        <circle cx="50" cy="50" r="2.5" fill="white" />
      </svg>
      <div className="text-center">
        <div className="text-[22px] font-semibold text-white tabular-nums">
          {time.getHours().toString().padStart(2, "0")}:{m.toString().padStart(2, "0")}
        </div>
        <div className="text-[10px] text-stone-400">
          {days[time.getDay()]}, {time.getDate()} {months[time.getMonth()]}
        </div>
      </div>
    </div>
  );
}

const funFacts = [
  {
    front: "Boba Tea",
    emoji: "", image: "/Boba tea.png",
    back: "~500 cups in 3 years.",
  },
  {
    front: "Robotics",
    emoji: "", image: "/Robot.png",
    back: "Former Global Launch Manager at ABB Robotics. Launched the IRB 120 robot — now displayed at the Shanghai Science and Technology Museum.",
  },
  {
    front: "2014",
    emoji: "", image: "/Seattle.png",
    back: "Moved to Seattle.\nMany ideas — and coffees — later.",
  },
];

const stackRotations = [3, -2, 5];
const spreadX = [-190, 0, 190];

function PolaroidCard({ fact, index, spread, isFlipped, onFlip, onHoverCard }: {
  fact: typeof funFacts[0]; index: number; spread: boolean; isFlipped: boolean; onFlip: (i: number) => void; onHoverCard: () => void;
}) {
  return (
    <motion.div
      animate={{
        x: spread ? spreadX[index] : 0,
        y: spread ? 0 : index * -4,
        rotate: spread ? 0 : stackRotations[index],
        zIndex: isFlipped ? 20 : spread ? 10 : funFacts.length - index,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="absolute cursor-pointer"
      style={{ width: 155, perspective: 800 }}
      onMouseEnter={onHoverCard}
      onClick={(e) => { e.stopPropagation(); if (spread) onFlip(index); }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ transformStyle: "preserve-3d", position: "relative" }}
      >
        {/* Front */}
        <div
          className="rounded-sm bg-[#fafaf8] shadow-[0_2px_10px_rgba(0,0,0,0.12),0_1px_3px_rgba(0,0,0,0.08)] flex flex-col p-[6px] pb-[20px]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="bg-stone-100 flex items-center justify-center overflow-hidden" style={{ aspectRatio: "4/5" }}>
            {fact.image ? (
              <img src={fact.image} alt={fact.front} className="w-full h-full object-contain p-2" />
            ) : (
              <span className="text-[40px]">{fact.emoji}</span>
            )}
          </div>
        </div>
        {/* Back */}
        <div
          className="rounded-sm bg-stone-800 shadow-[0_2px_10px_rgba(0,0,0,0.15)] p-4 absolute inset-0 flex flex-col justify-center"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="text-[10px] text-stone-400 uppercase tracking-wider mb-2">{fact.front}</div>
          <p className="text-[11px] text-stone-200 leading-relaxed">{fact.back}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

function FunFactsWidget() {
  const [spread, setSpread] = useState(false);
  const [flippedSet, setFlippedSet] = useState<Set<number>>(new Set());

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="col-span-2 bg-white/80 rounded-xl p-3 flex flex-col"
      onMouseLeave={() => { setSpread(false); setFlippedSet(new Set()); }}
    >
      <div className="text-[9px] text-stone-400 uppercase tracking-wider mb-2">Fun Facts</div>
      <div className="flex-1 flex items-center justify-center relative" style={{ minHeight: 180 }}>
        {funFacts.map((fact, i) => (
          <PolaroidCard
            key={fact.front}
            fact={fact}
            index={i}
            spread={spread}
            isFlipped={flippedSet.has(i)}
            onFlip={(idx) => setFlippedSet(prev => {
              const next = new Set(prev);
              if (next.has(idx)) next.delete(idx); else next.add(idx);
              return next;
            })}
            onHoverCard={() => setSpread(true)}
          />
        ))}
      </div>
    </motion.div>
  );
}

const circumference = 2 * Math.PI * 32;

function EnergyCircle() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white/80 rounded-xl p-3 flex flex-col items-center cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="text-[9px] text-stone-400 uppercase tracking-wider self-start mb-4">Energy Level</div>
      <div className="relative w-[80px] h-[80px]">
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="32" fill="none" stroke="#e7e5e4" strokeWidth="6" />
          <motion.circle
            key={hovered ? "active" : "idle"}
            cx="40" cy="40" r="32"
            fill="none" stroke="#10b981" strokeWidth="6"
            strokeLinecap="butt"
            strokeDasharray={circumference}
            initial={hovered ? { strokeDashoffset: circumference } : false}
            animate={{ strokeDashoffset: circumference * (1 - 0.95) }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            transform="rotate(-90 40 40)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[18px] font-semibold text-stone-700 leading-none">95%</span>
        </div>
      </div>
      <div className="text-[10px] text-stone-600 mt-1">Feeling great</div>
    </motion.div>
  );
}

const radarStats = [
  { label: "Coffee", value: 90 },
  { label: "Tea", value: 65 },
  { label: "Music", value: 80 },
  { label: "Sunlight", value: 55 },
  { label: "Curiosity", value: 100 },
  { label: "Ideas", value: 95 },
];
const radarCx = 65, radarCy = 62, radarMaxR = 45, radarLevels = 4, radarN = radarStats.length;
const radarAngle = (i: number) => (Math.PI * 2 * i) / radarN - Math.PI / 2;
const radarPt = (i: number, r: number) => `${radarCx + r * Math.cos(radarAngle(i))},${radarCy + r * Math.sin(radarAngle(i))}`;

function FuelMixRadar() {
  const [revealCount, setRevealCount] = useState(radarN);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const startReveal = () => {
    setRevealCount(0);
    timersRef.current = radarStats.map((_, i) =>
      setTimeout(() => setRevealCount(i + 1), (i + 1) * 150)
    );
  };
  const stopReveal = () => {
    timersRef.current.forEach(clearTimeout);
    setRevealCount(radarN);
  };

  const getPoints = (count: number) =>
    radarStats.map((s, i) => radarPt(i, i < count ? (s.value / 100) * radarMaxR : 0)).join(" ");

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="bg-white/80 rounded-xl p-3 flex flex-col items-center cursor-pointer"
      onMouseEnter={startReveal}
      onMouseLeave={stopReveal}
    >
      <div className="text-[9px] text-stone-400 uppercase tracking-wider self-start mb-1">Fuel Mix</div>
      <svg width="170" height="150" viewBox="-20 -10 170 150">
        {[...Array(radarLevels)].map((_, l) => {
          const r = radarMaxR * ((l + 1) / radarLevels);
          const pts = radarStats.map((_, i) => radarPt(i, r)).join(" ");
          return <polygon key={l} points={pts} fill="none" stroke="#e7e5e4" strokeWidth="0.5" />;
        })}
        {radarStats.map((_, i) => (
          <line key={i} x1={radarCx} y1={radarCy} x2={Number(radarPt(i, radarMaxR).split(",")[0])} y2={Number(radarPt(i, radarMaxR).split(",")[1])} stroke="#e7e5e4" strokeWidth="0.5" />
        ))}
        <motion.polygon
          animate={{ points: getPoints(revealCount) }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          fill="rgba(59,130,246,0.15)"
          stroke="#3b82f6"
          strokeWidth="1.5"
        />
        {radarStats.map((_, i) => {
          const [x, y] = radarPt(i, (radarStats[i].value / 100) * radarMaxR).split(",").map(Number);
          return (
            <motion.circle
              key={i}
              cx={x} cy={y} r="2" fill="#3b82f6"
              animate={{ opacity: i < revealCount ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            />
          );
        })}
        {radarStats.map((s, i) => {
          const lR = radarMaxR + 18;
          const x = radarCx + lR * Math.cos(radarAngle(i));
          const y = radarCy + lR * Math.sin(radarAngle(i));
          return <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="text-[10px] fill-stone-600">{s.label}</text>;
        })}
      </svg>
    </motion.div>
  );
}

const designChips = [
  { label: "Think deeply", color: "#10b981" },
  { label: "Data-driven", color: "#3b82f6" },
  { label: "Detail-focused", color: "#a78bfa" },
  { label: "Stay curious", color: "#f59e0b" },
  { label: "Exploring often", color: "#f472b6" },
  { label: "Learn by building", color: "#06b6d4" },
];

const CHIP_W = 95;
const CHIP_H = 22;
const AREA_W = 280;
const AREA_H = 155;

/* Organized grid positions for hover state */
const organizedPositions = (() => {
  const gap = 6;
  const rows: { x: number; y: number }[][] = [];
  let row: { x: number; y: number }[] = [];
  let cx = 0;
  const chipWidths = [85, 78, 95, 82, 100, 110];
  designChips.forEach((_, i) => {
    const w = chipWidths[i];
    if (cx + w > AREA_W && row.length > 0) {
      rows.push(row);
      row = [];
      cx = 0;
    }
    row.push({ x: cx, y: 0 });
    cx += w + gap;
  });
  if (row.length) rows.push(row);
  const totalH = rows.length * (CHIP_H + gap) - gap;
  const startY = (AREA_H - totalH) / 2;
  const result: { x: number; y: number }[] = [];
  let idx = 0;
  rows.forEach((r, ri) => {
    const rowW = r.length > 0 ? r[r.length - 1].x + (chipWidths[idx + r.length - 1] || CHIP_W) : 0;
    const offsetX = (AREA_W - rowW) / 2;
    r.forEach((pos) => {
      result.push({ x: pos.x + offsetX, y: startY + ri * (CHIP_H + gap) });
      idx++;
    });
  });
  return result;
})();

function ReminderCard() {
  const [hovered, setHovered] = useState(false);
  const [physicsActive, setPhysicsActive] = useState(false);
  const [chipStates, setChipStates] = useState<{ x: number; y: number; angle: number }[]>(
    designChips.map(() => ({ x: AREA_W / 2, y: -30, angle: 0 }))
  );
  const engineRef = useRef<Matter.Engine | null>(null);
  const rafRef = useRef<number>(0);
  const hasLandedRef = useRef(false);

  const startPhysics = useCallback(() => {
    if (engineRef.current) Matter.Engine.clear(engineRef.current);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const engine = Matter.Engine.create({ gravity: { x: 0, y: 0.56 } });
    engineRef.current = engine;

    const floor = Matter.Bodies.rectangle(AREA_W / 2, AREA_H + 10, AREA_W + 40, 20, { isStatic: true });
    const wallL = Matter.Bodies.rectangle(-10, AREA_H / 2, 20, AREA_H * 2, { isStatic: true });
    const wallR = Matter.Bodies.rectangle(AREA_W + 10, AREA_H / 2, 20, AREA_H * 2, { isStatic: true });
    Matter.Composite.add(engine.world, [floor, wallL, wallR]);

    const startXs = [35, 110, 190, 55, 160, 240];
    const bodies = designChips.map((_, i) => {
      return Matter.Bodies.rectangle(
        startXs[i], -20 - i * 35,
        CHIP_W, CHIP_H,
        { restitution: 0.25, friction: 0.5, frictionAir: 0.01, angle: ((Math.random() - 0.5) * Math.PI) / 5 }
      );
    });
    Matter.Composite.add(engine.world, bodies);

    setPhysicsActive(true);
    const step = () => {
      Matter.Engine.update(engine, 1000 / 60);
      setChipStates(bodies.map(b => ({
        x: b.position.x - CHIP_W / 2,
        y: b.position.y - CHIP_H / 2,
        angle: b.angle,
      })));
      // Check if all bodies are nearly still
      const allStopped = bodies.every(b => {
        const speed = Math.sqrt(b.velocity.x ** 2 + b.velocity.y ** 2);
        return speed < 0.3;
      });
      if (allStopped && bodies[bodies.length - 1].position.y > 0) {
        hasLandedRef.current = true;
        // Keep the final positions, stop the loop
        cancelAnimationFrame(rafRef.current);
        setPhysicsActive(false);
        return;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
  }, []);

  // Run physics on mount (first landing on desktop)
  useEffect(() => {
    startPhysics();
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ boxShadow: "4px 6px 16px rgba(0,0,0,0.1)" }}
      transition={{ delay: 0.05 }}
      className="cursor-pointer origin-top-left relative flex flex-col h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        // Re-run physics on mouse leave
        startPhysics();
      }}
    >
      {/* Binder clip */}
      <div className="flex justify-center -mb-[6px] relative z-10">
        <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
          <rect x="8" y="0" width="12" height="10" rx="2" fill="#57534e" />
          <rect x="10" y="2" width="8" height="6" rx="1" fill="#44403c" />
          <path d="M6 10 C6 6, 10 4, 14 4 C18 4, 22 6, 22 10" stroke="#78716c" strokeWidth="2" fill="none" />
        </svg>
      </div>
      <div className="relative">
        <div className="absolute top-[4px] left-[3px] right-[-6px] bottom-[-6px] bg-stone-700 rounded-[4px]" />
      <div className="bg-white rounded-[3px] shadow-[0_1px_4px_rgba(0,0,0,0.08)] relative overflow-hidden">
        <div className="h-[3px] w-full" style={{ background: "repeating-linear-gradient(90deg, #e7e5e4 0px, #e7e5e4 3px, transparent 3px, transparent 6px)" }} />
        <div className="p-3 pt-2 pb-5">
          <div className="text-[9px] text-stone-400 uppercase tracking-wider mb-3 font-medium">Design Notes</div>
          <div className="relative" style={{ width: AREA_W, height: AREA_H }}>
            {designChips.map((chip, i) => {
              const target = hovered && !physicsActive
                ? { x: organizedPositions[i].x, y: organizedPositions[i].y, angle: 0 }
                : chipStates[i];
              return (
                <span
                  key={chip.label}
                  className="absolute px-[10px] py-[4px] rounded-full text-[10px] font-medium text-white whitespace-nowrap"
                  style={{
                    backgroundColor: chip.color,
                    left: target.x,
                    top: target.y,
                    transform: `rotate(${target.angle}rad)`,
                    transition: hovered && !physicsActive
                      ? `left 0.5s ease-in ${i * 0.06}s, top 0.5s ease-in ${i * 0.06}s, transform 0.5s ease-in ${i * 0.06}s`
                      : "none",
                  }}
                >
                  {chip.label}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </motion.div>
  );
}

/* ── Dock with macOS-style magnification + brand glow ── */
const BASE_SIZE = 36;
const MAX_SIZE = 54;
const MAGNIFY_RANGE = 150;

function DockBar() {
  const mouseX = useMotionValue(-1000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-white/60 backdrop-blur-sm rounded-xl px-4 flex justify-evenly items-end"
      style={{ height: MAX_SIZE + 28 }}
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(-1000)}
    >
      {appTools.map((tool, i) => (
        <DockIcon key={i} tool={tool} mouseX={mouseX} />
      ))}
    </motion.div>
  );
}

function DockIcon({ tool, mouseX }: {
  tool: typeof appTools[number]; mouseX: ReturnType<typeof useMotionValue<number>>;
}) {
  const iconRef = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (mx: number) => {
    if (!iconRef.current) return MAGNIFY_RANGE + 1;
    const rect = iconRef.current.getBoundingClientRect();
    return mx - (rect.left + rect.width / 2);
  });

  const size = useTransform(distance, [-MAGNIFY_RANGE, 0, MAGNIFY_RANGE], [BASE_SIZE, MAX_SIZE, BASE_SIZE]);
  const glowOpacity = useTransform(distance, [-MAGNIFY_RANGE, 0, MAGNIFY_RANGE], [0, 0.7, 0]);

  return (
    <div ref={iconRef} className="relative flex items-end justify-center" style={{ marginBottom: 14 }}>
      {/* Brand glow */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          bottom: -8,
          left: "50%",
          x: "-50%",
          width: useTransform(size, (s: number) => s + 16),
          height: useTransform(size, (s: number) => s + 16),
          background: `radial-gradient(circle, ${tool.glow}60 0%, transparent 70%)`,
          opacity: glowOpacity,
        }}
      />
      <motion.img
        src={tool.icon}
        alt={tool.label}
        title={tool.label}
        className="object-cover rounded-[9px] cursor-default relative z-[1]"
        style={{ width: size, height: size }}
        draggable={false}
      />
    </div>
  );
}

const journeyData = [
  { step: "Studied law", tag: "LAW" },
  { step: "Worked in robotics", tag: "GLOBAL LAUNCH" },
  { step: "Became a product designer", tag: "TECH" },
  { step: "Designing AI products", tag: "AI" },
  { step: "Building with AI", tag: "AI" },
  { step: "Won Claude vibe-coding challenge", tag: "AI" },
  { step: "Shipped a chrome extension", tag: "AI" },
  { step: "AI native designer", tag: "NOW", hollow: true, pulse: true },
];

function JourneyTimeline() {
  const [hovered, setHovered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);

  React.useEffect(() => {
    if (!hovered) {
      setVisibleCount(0);
      return;
    }
    if (visibleCount >= journeyData.length) return;
    const timer = setTimeout(() => setVisibleCount((c) => c + 1), 150);
    return () => clearTimeout(timer);
  }, [hovered, visibleCount]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="rounded-xl p-4 flex-1 cursor-default"
      style={{ background: "rgba(255,255,255,0.8)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="text-[9px] text-stone-400 uppercase tracking-[0.2em] mb-4 font-mono">My Journey</div>
      <div className="space-y-0">
        {journeyData.map((item, i) => {
          const isLast = i === journeyData.length - 1;
          if (isLast) return null;
          return (
            <div
              key={i}
              className="flex items-center gap-3 py-[10px] transition-opacity duration-300"
              style={{
                opacity: hovered ? (i < visibleCount ? 1 : 0) : 1,
                borderBottom: i < journeyData.length - 2 ? "1px solid rgba(214,211,209,0.5)" : "none",
              }}
            >
              <span className="text-[11px] text-stone-400 font-mono w-[20px] shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="shrink-0 w-[8px] h-[8px] rounded-full bg-stone-300" />
              <span className="text-[12px] text-stone-400 flex-1">{item.step}</span>
              <span
                className="text-[8px] font-medium tracking-wider px-2 py-0.5 rounded-full shrink-0"
                style={{ background: "#f5f5f4", color: "#a8a29e" }}
              >
                {item.tag}
              </span>
            </div>
          );
        })}
      </div>
      {/* Highlighted last item */}
      <div
        className="mt-3 rounded-xl px-5 py-4 flex items-center gap-3 transition-opacity duration-300"
        style={{
          background: "#f5f5f4",
          border: "1px solid rgba(214,211,209,0.6)",
          opacity: hovered ? (journeyData.length - 1 < visibleCount ? 1 : 0) : 1,
        }}
      >
        <span className="text-[11px] text-stone-400 font-mono w-[20px] shrink-0">
          {String(journeyData.length).padStart(2, "0")}
        </span>
        <div className="relative shrink-0 w-[10px] h-[10px]">
          <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-30" />
          <div className="w-[10px] h-[10px] rounded-full bg-emerald-500 relative" />
        </div>
        <div className="flex-1">
          <span className="text-[15px] text-stone-800 font-semibold block leading-tight whitespace-nowrap">{journeyData[journeyData.length - 1].step}</span>
        </div>
        <span
          className="text-[10px] font-medium tracking-wider px-3 py-1.5 rounded-full shrink-0"
          style={{ background: "#ecfdf5", color: "#059669" }}
        >
          NOW
        </span>
      </div>
    </motion.div>
  );
}

function WeatherCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      style={{ boxShadow: hovered ? "0 4px 20px rgba(251,191,36,0.3), 0 0 40px rgba(251,191,36,0.12)" : "none" }}
      className="bg-white/80 rounded-xl px-3 py-2.5 cursor-pointer overflow-hidden relative transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-center gap-2">
        <img src="/weather-thumbnail.jpg" alt="Seattle" className="w-[48px] h-[48px] rounded-lg object-cover flex-shrink-0" />
        <div>
          <div className="text-[9px] text-stone-400 uppercase tracking-wider mb-1">Seattle</div>
          <div className="flex items-center gap-1.5">
            <motion.span
              className="material-symbols-outlined text-amber-400"
              style={{ fontSize: 18 }}
              animate={{ y: hovered ? -2 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              sunny
            </motion.span>
            <span className="text-[18px] font-light text-stone-700 leading-none">72°</span>
          </div>
          <div className="text-[9px] text-stone-400 mt-1">Sunny, perfect weather for building things</div>
        </div>
      </div>
    </motion.div>
  );
}

export function DesktopWidgets() {
  const today = new Date();
  const currentDay = today.getDate();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const monthName = today.toLocaleString("default", { month: "short" });
  const year = today.getFullYear();


  return (
    <div className="p-3 flex flex-col gap-3">
      {/* Top row: Reminders, Energy, Calendar */}
      <div className="grid grid-cols-3 gap-3">
        <ReminderCard />

        <EnergyCircle />

        <FuelMixRadar />
      </div>

      {/* Bottom row: Weather + To-Do (left), Goals (right) */}
      <div className="grid grid-cols-3 gap-3">
        {/* Left column: Weather + To-Do stacked */}
        <div className="flex flex-col gap-3">
          <JourneyTimeline />
        </div>

        {/* Goals - spans 2 columns, matches height of weather + todo */}
        <FunFactsWidget />
      </div>

      {/* Dock: tool icons with magnification */}
      <DockBar />
    </div>
  );
}
