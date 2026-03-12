"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const statusItems = [
  { action: "Designing", detail: "AI products", color: "#10b981" },
  { action: "Building", detail: "small tools", color: "#3b82f6" },
  { action: "Exploring", detail: "vibe coding and AI", color: "#a78bfa" },
  { action: "Collecting", detail: "ideas & thoughts", color: "#f59e0b" },
  { action: "Drinking", detail: "Matcha from Yan tea", color: "#6ee7b7" },
  { action: "Listening", detail: "Charlie Puth - Home (feat. Hikaru Utada)", color: "#f472b6" },
];

function TypewriterText({ text, delay }: { text: string; delay: number }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const timeout = setTimeout(() => {
      intervalId = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length && intervalId) clearInterval(intervalId);
      }, 35);
    }, delay);
    return () => {
      clearTimeout(timeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, delay]);
  return (
    <span className="text-stone-700">
      {displayed}
      {displayed.length < text.length && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="text-stone-400"
        >
          |
        </motion.span>
      )}
    </span>
  );
}

export function RecentStatus() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(0);
    const t = statusItems.map((_, i) => setTimeout(() => setCount(i + 1), 600 + i * 500));
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center pt-32">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-[11px] text-stone-400 uppercase tracking-[0.2em] mb-8 relative"
      >
        System Status
        <motion.div
          className="absolute -bottom-2 left-0 right-0 h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, #a8a29e, transparent)" }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </motion.div>
      <div className="space-y-3">
        {statusItems.slice(0, count).map((s, i) => (
          <motion.div
            key={s.action}
            initial={{ opacity: 0, x: -30, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            className="flex items-center gap-3 text-[14px]"
          >
            <motion.span
              animate={{
                boxShadow: [
                  `0 0 0px ${s.color}`,
                  `0 0 8px ${s.color}`,
                  `0 0 0px ${s.color}`,
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-stone-400 w-[80px] flex-shrink-0">{s.action}</span>
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              className="text-stone-300"
            >
              →
            </motion.span>
            <TypewriterText text={s.detail} delay={i * 500 + 300} />
          </motion.div>
        ))}
      </div>
      {count >= statusItems.length && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, type: "spring" }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <motion.div
            className="w-40 h-[3px] rounded-full overflow-hidden bg-stone-200"
          >
            <motion.div
              className="h-full rounded-full"
              style={{ background: "linear-gradient(90deg, #10b981, #3b82f6, #a78bfa, #f472b6)" }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </motion.div>
          <motion.span
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-emerald-500 text-[11px] tracking-wide flex items-center gap-2"
          >
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ●
            </motion.span>
            All systems nominal
          </motion.span>
        </motion.div>
      )}
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
