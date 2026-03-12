"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const appTools = [
  { label: "Claude", icon: "/app-claude.jpg" },
  { label: "Figma", icon: "/app-figma.jpg" },
  { label: "Cursor", icon: "/app-cursor.jpg" },
  { label: "Google AI Studio", icon: "/app-google-ai.jpg" },
  { label: "Lovable", icon: "/app-lovable.jpg" },
  { label: "Codex", icon: "/app-codex.jpg" },
  { label: "GitHub", icon: "/app-github.jpg" },
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
const spreadX = [-165, 0, 165];

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
      <div className="text-[9px] text-stone-400 uppercase tracking-wider self-start mb-2">Energy Level</div>
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
      <div className="text-[9px] text-stone-400 mt-1">Feeling great</div>
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
      <svg width="130" height="130" viewBox="0 0 130 130">
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
          const lR = radarMaxR + 14;
          const x = radarCx + lR * Math.cos(radarAngle(i));
          const y = radarCy + lR * Math.sin(radarAngle(i));
          return <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" className="text-[8px] fill-stone-600">{s.label}</text>;
        })}
      </svg>
    </motion.div>
  );
}

const reminders = [
  "Think deeply",
  "Stay data-driven",
  "Experiment often",
  "Simplify complexity",
  "Detail-focused",
  "Stay curious, stay humble",
];

function ReminderCard() {
  const [hovered, setHovered] = useState(false);
  const [visibleCount, setVisibleCount] = useState(reminders.length);

  useEffect(() => {
    if (hovered) {
      setVisibleCount(0);
      const timers = reminders.map((_, i) =>
        setTimeout(() => setVisibleCount(i + 1), (i + 1) * 200)
      );
      return () => timers.forEach(clearTimeout);
    } else {
      setVisibleCount(reminders.length);
    }
  }, [hovered]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ rotate: -2, scale: 1.02, boxShadow: "4px 6px 16px rgba(0,0,0,0.1)" }}
      transition={{ delay: 0.05 }}
      className="cursor-pointer origin-top-left relative flex flex-col"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
        <div className="p-3 pt-2">
          <div className="text-[9px] text-stone-400 uppercase tracking-wider mb-2 font-medium">Design Notes</div>
          <ul className="space-y-[4px] text-[11px] text-stone-600 leading-snug">
            {reminders.map((r, i) => (
              <motion.li
                key={i}
                animate={{ opacity: i < visibleCount ? 1 : 0, x: i < visibleCount ? 0 : -8 }}
                transition={{ duration: 0.25 }}
              >
                • {r}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
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

  const [todos, setTodos] = useState([
    { text: "Fix that weird animation bug", done: false },
    { text: "Ship the tiny tool I started", done: false },
    { text: "Prototype 3 new ideas", done: false },
    { text: "Try OpenClaw", done: false },
    { text: "Try not to open 20 tabs", done: false },
    { text: "Clean up my messy desktop", done: false },
    { text: "Celebrate small wins", done: false },
  ]);

  const toggleTodo = (index: number) => {
    setTodos(prev => prev.map((t, i) => i === index ? { ...t, done: !t.done } : t));
  };



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
          <WeatherCard />

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="bg-white/80 rounded-xl p-3 flex-1">
            <div className="text-[9px] text-stone-400 uppercase tracking-wider mb-3">To-Do</div>
            <div className="space-y-2.5">
              {todos.map((item, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[11px] cursor-pointer" onClick={() => toggleTodo(i)}>
                  <div className={`w-3.5 h-3.5 rounded-[3px] border-[1.5px] flex items-center justify-center shrink-0 transition-colors ${item.done ? "bg-blue-500 border-blue-500" : "border-stone-300"}`}>
                    {item.done && <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M2.5 6l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <span className={`transition-colors ${item.done ? "text-stone-400 line-through" : "text-stone-600"}`}>{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Goals - spans 2 columns, matches height of weather + todo */}
        <FunFactsWidget />
      </div>

      {/* Dock: tool icons */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-white/60 backdrop-blur-sm rounded-xl px-6 py-7 flex justify-evenly">
        {appTools.map((tool, i) => (
          <motion.img
            key={i}
            src={tool.icon}
            alt={tool.label}
            title={tool.label}
            className="w-[36px] h-[36px] object-cover rounded-[9px] cursor-default"
            whileHover={{ scale: 1.2, y: -4 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        ))}
      </motion.div>
    </div>
  );
}
