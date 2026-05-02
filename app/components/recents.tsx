"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const impactStats = [
  { endNum: 20, suffix: "M+", label: "UNSPLASH PHOTO VIEWS" },
  { endNum: 670, suffix: "K+", label: "FIGMA FILE USES" },
  { endNum: 40, suffix: "K", label: "IMPRESSIONS, ONE POST" },
];

function CountUp({ end, suffix, duration = 1500, autoStart = false }: { end: number; suffix: string; duration?: number; autoStart?: boolean }) {
  const [count, setCount] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!autoStart && key === 0) return;
    setCount(0);
    let startTime: number | null = null;
    let raf: number;

    function tick(ts: number) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoStart, key, end, duration]);

  return (
    <span onMouseEnter={() => setKey(k => k + 1)} className="cursor-default">
      {count}{suffix}
    </span>
  );
}

const aiProjects = [
  {
    year: "2026",
    title: "Awwwards",
    detail: "Vibe-coded portfolio received Awwwards Honorable Mention",
    tags: [{ label: "AWARD", color: "#9a8058", bg: "#f2ead8" }],
  },
  {
    year: "2026",
    title: "Bestfolios",
    detail: "Vibe-coded portfolio featured on Bestfolios",
    tags: [{ label: "AWARD", color: "#9a8058", bg: "#f2ead8" }],
  },
  {
    year: "2026",
    title: "Wall of Portfolios",
    detail: "Vibe-coded portfolio featured on Wall of Portfolios",
    tags: [{ label: "AWARD", color: "#9a8058", bg: "#f2ead8" }],
  },
  {
    year: "2026",
    title: "CSSDesign Award",
    detail: "Vibe-coded portfolio recognized with Special Kudos (March 18)",
    tags: [{ label: "AWARD", color: "#9a8058", bg: "#f2ead8" }],
  },
  {
    year: "2026",
    title: "Figma Makeathon — Anonymous Letters Across Time",
    detail: "15K impressions · 550 likes on X",
    tags: [{ label: "SHIPPED", color: "#a08060", bg: "#f0e4d6" }],
  },
  {
    year: "2026",
    title: "Vibe Coding Playlist",
    detail: "20+ AI experiments using Claude Code, Cursor, Figma Make, Google AI Studio",
    tags: [{ label: "SHIPPED", color: "#a08060", bg: "#f0e4d6" }],
  },
  {
    year: "2025",
    title: "Cozy Journaling",
    detail: "Built with Claude Sonnet 4.5",
    tags: [{ label: "AWARD", color: "#9a8058", bg: "#f2ead8" }],
  },
  {
    year: "2025",
    title: "Focus Now Chrome Extension",
    detail: "Built with Claude Code · Shipped on Chrome Web Store",
    tags: [{ label: "SHIPPED", color: "#a08060", bg: "#f0e4d6" }],
  },
  {
    year: "2025",
    title: "yanliu Desktop OS",
    detail: "Fully functional desktop environment · 40K impressions · 1K engagements on X",
    tags: [{ label: "SHIPPED", color: "#a08060", bg: "#f0e4d6" }],
  },
];

const additionalAchievements = [
  { year: "2022", title: "Figma Community", detail: "670K+ uses · Finalist, Favorite Graphic Resources" },
  { year: "–", title: "Unsplash", detail: "20M+ views · 150K downloads" },
  { year: "2018", title: "Google Startup Weekend", detail: "Excellence in Execution" },
  { year: "2018", title: "UW Dubstech Protothon", detail: "1st place, UX Competition" },
  { year: "2017", title: "Darby Smart IIT Program", detail: "1st place, video-creation · 150K+ views" },
  { year: "2016", title: "CommLead — #doyouseeme", detail: "Top 5 Capstone, UW MCDM Master's program" },
];

export function RecentStatus() {
  const [visible, setVisible] = useState(false);
  const [countStarted, setCountStarted] = useState(false);
  useEffect(() => {
    setVisible(true);
    const t = setTimeout(() => setCountStarted(true), 300);
    return () => clearTimeout(t);
  }, []);

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: 6 },
    animate: visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 },
    transition: { duration: 0.3, delay },
  });

  return (
    <div className="p-5 overflow-y-auto h-full font-[family-name:var(--font-noto)]">
      {/* Impact at a Glance */}
      <motion.div {...fadeIn(0)} className="text-[11px] text-stone-400 uppercase tracking-[0.2em] font-mono mb-4">
        Impact at a Glance
      </motion.div>
      <motion.div {...fadeIn(0.05)} className="grid grid-cols-3 gap-3 mb-8">
        {impactStats.map((stat, i) => (
          <div key={i} className="rounded-lg border border-stone-300/50 px-3 py-3" style={{ background: "#EDECE5" }}>
            <div className="text-[22px] font-semibold text-stone-800 leading-tight">
              <CountUp end={stat.endNum} suffix={stat.suffix} autoStart={countStarted} />
            </div>
            <div className="text-[10px] text-stone-400 uppercase tracking-[0.1em] mt-1 font-mono">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* AI Projects & Builds */}
      <motion.div {...fadeIn(0.1)} className="text-[11px] text-stone-400 uppercase tracking-[0.2em] font-mono mb-3 pb-2 border-b border-stone-200/50">
        AI Projects & Builds
      </motion.div>
      <div className="space-y-0">
        {aiProjects.map((item, i) => (
          <motion.div
            key={i}
            {...fadeIn(0.15 + i * 0.05)}
            className="flex gap-4 py-3 pl-3 -ml-3 rounded-lg relative cursor-default transition-all duration-200 hover:bg-stone-100/80 hover:pl-5 group"
            style={{ borderBottom: "1px solid rgba(214,211,209,0.4)" }}
          >
            <div className="absolute left-0 top-[12px] bottom-[12px] w-[3px] rounded-full bg-stone-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <span className="text-[11px] text-stone-400 font-mono w-[36px] shrink-0 pt-[2px]">{item.year}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] text-stone-800 font-semibold leading-snug">{item.title}</div>
              <div className="text-[12px] text-stone-500 mt-0.5 leading-relaxed inline">
                {item.detail}
                {item.tags.map((tag, ti) => (
                  <span
                    key={ti}
                    className="text-[10px] font-mono font-medium tracking-[0.08em] uppercase px-2 py-0.5 rounded ml-1.5 inline-block align-middle"
                    style={{ color: tag.color, background: tag.bg }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Achievements */}
      <motion.div {...fadeIn(0.5)} className="text-[11px] text-stone-400 uppercase tracking-[0.2em] font-mono mt-8 mb-3 pb-2 border-b border-stone-200/50">
        Additional Achievements
      </motion.div>
      <div className="space-y-0">
        {additionalAchievements.map((item, i) => (
          <motion.div
            key={i}
            {...fadeIn(0.55 + i * 0.05)}
            className="flex gap-4 py-3 pl-3 -ml-3 rounded-lg relative cursor-default transition-all duration-200 hover:bg-stone-100/80 hover:pl-5 group"
            style={{ borderBottom: i < additionalAchievements.length - 1 ? "1px solid rgba(214,211,209,0.4)" : "none" }}
          >
            <div className="absolute left-0 top-[12px] bottom-[12px] w-[3px] rounded-full bg-stone-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <span className="text-[11px] text-stone-400 font-mono w-[36px] shrink-0 pt-[2px]">{item.year}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] text-stone-800 font-semibold leading-snug">{item.title}</div>
              <div className="text-[12px] text-stone-500 mt-0.5">{item.detail}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export const randomIdeas = [
  "Design a tool that turns notes into flowers",
  "Visualize your thoughts as a constellation",
  "Turn daily mood into a color palette",
  "Build a curiosity tracker",
  "Turn random doodles into posters",
  "Generate a new idea every morning",
  "Design a tiny tool that encourages focus",
  "Turn screenshots into visual stories",
  "Create a map of your ideas",
  "Visualize how curiosity grows over time",
  "Build a tool that turns words into shapes",
  "Generate a random interface challenge",
  "Turn unfinished ideas into prompts",
  "Build a tiny tool that makes people smile",
  "Turn random thoughts into design prompts",
  "Generate a new creative constraint every day",
  "Visualize how ideas evolve",
  "Turn sketches into animations",
  "Build a playful productivity toy",
  "Turn mistakes into new experiments",
  "Create a curiosity dashboard",
  "Turn inspiration into a visual archive",
  "Generate a daily design challenge",
  "Turn random photos into patterns",
  "Build a tiny AI brainstorming partner",
  "Turn your ideas into a branching tree",
  "Create a visual diary of experiments",
  "Generate weird interface ideas",
  "Turn random words into product concepts",
  "Build a tiny creativity engine",
  "Visualize your energy throughout the day",
  "Turn music into generative visuals",
  "Build a random prototype generator",
  "Turn design principles into a game",
  "Create a map of unfinished projects",
  "Turn daily observations into design ideas",
  "Generate a tool that simplifies something annoying",
  "Turn random shapes into interface components",
  "Build a curiosity playground",
  "Turn everyday objects into design prompts",
  "Generate an idea worth prototyping today",
  "Turn AI prompts into visual experiments",
  "Create a tiny tool that sparks creativity",
  "Turn boredom into a design challenge",
  "Build something weird just to see what happens",
  "Turn inspiration into interactive sketches",
  "Create a random design lab",
  "Turn a simple idea into a prototype in one hour",
  "Build a tool that visualizes imagination",
  "Generate an idea you would never normally try",
];

export const ideaFrequency = [2, 5, 3, 7, 4, 8, 6, 9, 5, 7, 3, 6];
