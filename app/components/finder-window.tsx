"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/lib/siteConfig";
import { renderBold } from "@/lib/renderBold";
import { DesktopWidgets } from "./desktop-widgets";
import { RecentStatus } from "./recents";

const folderColors = [
  { bg: "#4A9EE8", tab: "#3B8AD4", label: "white" },
  { bg: "#E8A44A", tab: "#D49236", label: "white" },
  { bg: "#5ABE7A", tab: "#48A866", label: "white" },
  { bg: "#E86B6B", tab: "#D45555", label: "white" },
  { bg: "#A87ADB", tab: "#9466C4", label: "white" },
];

const folderImages = [
  "/sheet-work.jpg",
  "/sheet-ai.jpg",
  "/sheet-community.jpg",
  "/sheet-lens.jpg",
  "/sheet-sketch.jpg",
];

const folderIcons = [
  "/folder-icon-work.svg",
  "/folder-icon-ai.svg",
  "/folder-icon-community.svg",
  "/folder-icon-lens.svg",
  "/folder-icon-sketch.svg",
];

const folderContent = [
  {
    title: "Design for AI Products",
    description: "From **multimodal conversational interfaces to search and AI modification**, turning complex ideas into intuitive product experiences.\n\nRecent work includes natural language search, search trend dashboards, contributor platform redesigns, internal search editing tools, and watermark systems for Getty Images and iStock.",
    cta: { label: "Projects at work (password required)", url: "https://yanliu.design" },
  },
  {
    title: "Design with AI and beyond",
    description: "Experimenting and building with AI tools — prototyping ideas quickly and shipping projects along the way.\n\nHighlights include launching my first **Chrome extension Focus Now** to park extra tabs and reduce clutter, and Cozy Journaling, winner of the **Built with Claude Sonnet 4.5 \"Keep Creating\" Award**.",
    cta: { label: "Vibe coding projects", url: "https://cottenpanda.github.io/vibecodingplaylist" },
  },
  {
    title: "Community Impact",
    description: "My Figma Community files have over **500K+** uses.\n\n**100+ Abstract Shapes / Elements** was a finalist for Favorite Graphic Resources in the **2022 Figma Community Awards**.\n\n**50+ Abstract Geometric Shapes** was featured during the Day 2 virtual broadcast at **Config 2024**.",
    cta: { label: "Figma designs", url: "https://www.figma.com/@yanliu" },
  },
  {
    title: "Through My Lens",
    description: "Nature helps me step away from daily routines and reset my perspective.\n\nMy photography has reached **19M+ views** and **150K+ downloads**, and has been used across platforms including BuzzFeed, Notion, Trello, Mailchimp, Fever, and Figma.",
    cta: { label: "Photos on Unsplash", url: "https://unsplash.com/@yl1980s" },
  },
  {
    title: "From Sketch to Merch",
    description: "I create illustrations and black-and-white doodles as a way to unwind and explore visual ideas.\n\nIn 2022, I collaborated with **SHEIN X Artist** to launch my merchandise collection, YANLIU.\n\nI share work on **Instagram and RedNote**.",
    cta: [
      { label: "Instagram", url: "https://www.instagram.com/yanliudesign" },
      { label: "RedNote", url: "https://www.xiaohongshu.com/user/profile/5cf87836000000001803f1b3?xhsshare=CopyLink&appuid=5cf87836000000001803f1b3&apptime=1654372327" },
    ],
  },
];

const appTools = [
  { label: "Claude", icon: "/app-claude.jpg" },
  { label: "Figma", icon: "/app-figma.jpg" },
  { label: "Cursor", icon: "/app-cursor.jpg" },
  { label: "Google AI Studio", icon: "/app-google-ai.jpg" },
  { label: "Lovable", icon: "/app-lovable.jpg" },
  { label: "Codex", icon: "/app-codex.jpg" },
  { label: "GitHub", icon: "/app-github.jpg" },
];

const sidebarItems = [
  { id: "yanliu", label: "yanliu", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { id: "desktop", label: "Desktop", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
  { id: "recents", label: "Recents", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> },
];

function FolderIcon({ color, title, onClick, isSelected, icon }: {
  color: typeof folderColors[number];
  title: string;
  onClick: () => void;
  isSelected: boolean;
  icon: string;
}) {
  return (
    <motion.button
      onClick={onClick}
      className="flex flex-col items-center gap-2.5 group cursor-pointer"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative w-[96px] h-[80px]" style={{ filter: isSelected ? `drop-shadow(0 2px 8px ${color.bg}66)` : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}>
        <svg viewBox="0 0 96 80" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="12" width="96" height="68" rx="8" fill={color.tab} />
          <path
            d="M0 20 C0 14.5, 4.5 10, 10 10 L32 10 Q36 10, 38 6 Q40 2, 44 2 L86 2 Q94 2, 96 10 L96 20 L0 20 Z"
            fill={color.tab}
          />
        </svg>
        <div
          className="absolute left-[1px] right-[1px] bottom-[1px] h-[62px] rounded-[7px] transition-shadow duration-200"
          style={{
            backgroundColor: color.bg,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.06)",
          }}
        />
        <img
          src={icon}
          alt=""
          className="absolute left-1/2 -translate-x-1/2 bottom-[10px] w-[44px] h-[44px] object-contain pointer-events-none"
          style={{ filter: "brightness(0) saturate(0)", opacity: 0.1, mixBlendMode: "multiply" }}
        />
      </div>
      <span className={`text-[11px] leading-tight text-center max-w-[100px] transition-colors duration-200 ${
        isSelected ? "text-stone-900 font-medium" : "text-stone-500 group-hover:text-stone-700"
      }`}>
        {title}
      </span>
    </motion.button>
  );
}

function FolderSideSheet({ folderIndex, onClose, onNavigate }: {
  folderIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const content = folderContent[folderIndex];
  const color = folderColors[folderIndex];
  const image = folderImages[folderIndex];
  const icon = folderIcons[folderIndex];
  const nextIndex = (folderIndex + 1) % folderContent.length;

  return (
    <motion.div
      className="absolute inset-0 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="absolute inset-0 backdrop-blur-sm bg-black/5 cursor-pointer"
        onClick={onClose}
      />
      <motion.div
        className="absolute top-0 right-0 z-20 h-full w-[480px] border-l border-stone-200 shadow-xl overflow-hidden rounded-l-xl"
        style={{ backgroundColor: "#FAF8F5" }}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.06] rounded-l-xl overflow-hidden" style={{
          backgroundImage: "url(/noise-texture.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }} />

        <div className="relative flex items-center justify-between px-5 py-3 border-b border-stone-200/60 z-10" style={{ backgroundColor: `${color.bg}08` }}>
          <div className="flex items-center gap-2.5">
            <img src={icon} alt="" className="w-5 h-5 object-contain" style={{ filter: `brightness(0) saturate(0) opacity(0.5)` }} />
            <span className="text-[14px] text-stone-700 font-medium">
              {content.title}
            </span>
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate(nextIndex); }}
              className="flex items-center gap-0.5 text-[12px] text-stone-400 hover:text-stone-600 transition-colors cursor-pointer ml-1"
            >
              <span>Next</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="relative h-[calc(100%-45px)] overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={folderIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative w-full">
                <img src={image} alt={content.title} className="w-full h-auto object-contain" />
              </div>

              <div className="relative p-5 space-y-4">
                {content.description.split("\n\n").map((para, i) => (
                  <p key={i} className="text-stone-600 leading-relaxed text-[14px]">
                    {renderBold(para)}
                  </p>
                ))}
                {content.cta && (
                  <div className="flex gap-4">
                    {(Array.isArray(content.cta) ? content.cta : [content.cta]).map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-[14px] underline underline-offset-4 decoration-stone-300 hover:decoration-stone-500 transition-colors"
                        style={{ color: color.bg }}
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

function LockNotification({ onUnlock }: { onUnlock: () => void }) {
  return (
    <motion.div
      className="absolute inset-0 z-20 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-white/60 px-6 py-5 w-[340px] text-center"
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.97 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
      >
        <div className="flex justify-center mb-3">
          <div className="bg-stone-100 rounded-full px-3 py-1.5 flex items-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-500 bell-shake">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
        </div>
        <p className="text-[11px] font-semibold tracking-widest uppercase text-stone-500 mb-1.5">Reminder</p>
        <p className="text-[14px] text-stone-700 leading-snug mb-4">
          Tools evolve. Curiosity stays.<br />Small steps move things forward.
        </p>
        <div className="flex border-t border-stone-200">
          <button
            onClick={onUnlock}
            className="flex-1 py-2.5 text-[14px] text-blue-500 font-medium hover:bg-stone-50 transition-colors border-r border-stone-200 rounded-bl-2xl"
          >
            Okay!
          </button>
          <button
            onClick={onUnlock}
            className="flex-1 py-2.5 text-[14px] text-blue-500 font-medium hover:bg-stone-50 transition-colors rounded-br-2xl"
          >
            Got it!
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FolderWindowContent() {
  const [openFolder, setOpenFolder] = useState<number | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState("yanliu");

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[1000px] font-[family-name:var(--font-noto)]">
        <div className="relative bg-[#F5F5F4] border border-stone-200 rounded-xl shadow-lg overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-stone-200 bg-gradient-to-b from-[#FAFAF9] to-[#F0EFED]">
            <div className="flex gap-1.5">
              <div className="w-[11px] h-[11px] rounded-full bg-[#FF5F57] border border-[#E0443E]" />
              <div className="w-[11px] h-[11px] rounded-full bg-[#FEBC2E] border border-[#DEA123]" />
              <div className="w-[11px] h-[11px] rounded-full bg-[#28C840] border border-[#1AAB29]" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-[11px] text-stone-400">
                ~/yan-liu/portfolio
              </span>
            </div>
            <div className="w-[52px]" />
          </div>

          <div className="relative h-[620px] min-w-[1000px] overflow-hidden flex">
            <div className="w-[170px] shrink-0 bg-[#F0EFED]/60 backdrop-blur-sm border-r border-stone-200/60 py-3 px-2">
              <p className="text-[11px] font-medium text-stone-400 px-2 mb-1">Favorites</p>
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveSidebar(item.id); setOpenFolder(null); }}
                  className={`w-full flex items-center gap-2 px-2 py-[5px] rounded-md text-[12px] text-left cursor-pointer transition-colors ${
                    activeSidebar === item.id
                      ? "bg-[#D4E4F7] text-stone-800"
                      : "text-stone-600 hover:bg-stone-200/40"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="relative flex-1 min-h-[620px] overflow-hidden">
              <AnimatePresence>
                {!unlocked && (
                  <motion.div
                    className="absolute inset-0 z-10 backdrop-blur-md bg-white/30"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {!unlocked && (
                  <LockNotification onUnlock={() => setUnlocked(true)} />
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {activeSidebar === "yanliu" ? (
                  <motion.div
                    key="yanliu"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-full"
                  >
                    <div className={`pt-10 pl-10 pr-6 ${!unlocked ? "select-none pointer-events-none" : ""}`}>
                      <div className="flex gap-x-14 gap-y-8 flex-wrap content-start">
                        {siteConfig.sections.map((section, i) => (
                          <FolderIcon
                            key={section.id}
                            color={folderColors[i]}
                            title={section.title}
                            icon={folderIcons[i]}
                            isSelected={openFolder === i}
                            onClick={() => setOpenFolder(openFolder === i ? null : i)}
                          />
                        ))}
                      </div>
                    </div>

                    <AnimatePresence>
                      {openFolder !== null && unlocked && (
                        <FolderSideSheet
                          key="sheet"
                          folderIndex={openFolder}
                          onClose={() => setOpenFolder(null)}
                          onNavigate={(i) => setOpenFolder(i)}
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : activeSidebar === "applications" ? (
                  <motion.div
                    key="applications"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-full overflow-hidden"
                  >
                    <div className="grid grid-cols-5 gap-y-6 gap-x-2 px-8 py-8 justify-items-center">
                      {appTools.map((tool, i) => (
                        <div key={i} className="flex flex-col items-center gap-1.5">
                          <img src={tool.icon} alt={tool.label} className="w-[56px] h-[56px] object-cover rounded-[13px] shadow-sm" />
                          <span className="text-[11px] text-stone-600 text-center leading-tight">{tool.label}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : activeSidebar === "documents" ? (
                  <motion.div
                    key="documents"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-[620px] overflow-hidden"
                  >
                    <div className="grid grid-cols-4 gap-x-2 gap-y-4 p-5 items-start content-start">
                      {[
                        { name: "Yan Liu\nresume.pdf", color: "#3b82f6" },
                        { name: "Portfolio\nCase Study.pdf", color: "#8b5cf6" },
                      ].map((doc, i) => (
                        <motion.a
                          key={doc.name}
                          href="https://yanliu.design/"
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          whileHover={{ y: -4 }}
                          className="flex flex-col items-center gap-1.5 cursor-pointer group"
                        >
                          <div className="relative w-[90px] h-[110px]">
                            <svg width="90" height="110" viewBox="0 0 90 110" fill="none">
                              <path d="M6 2h58l20 20v82a4 4 0 01-4 4H6a4 4 0 01-4-4V6a4 4 0 014-4z" fill="white" stroke="#d4d4d4" strokeWidth="0.8"/>
                              <path d="M64 2v16a4 4 0 004 4h16" fill="#ebebeb" stroke="#d4d4d4" strokeWidth="0.8" strokeLinejoin="round"/>
                              <rect x="12" y="28" width="30" height="3" rx="1.5" fill="#c8c8c8"/>
                              <rect x="12" y="36" width="56" height="2" rx="1" fill="#e0e0e0"/>
                              <rect x="12" y="42" width="50" height="2" rx="1" fill="#e0e0e0"/>
                              <rect x="12" y="48" width="54" height="2" rx="1" fill="#e0e0e0"/>
                              <rect x="12" y="54" width="42" height="2" rx="1" fill="#e0e0e0"/>
                              <rect x="12" y="60" width="56" height="2" rx="1" fill="#e0e0e0"/>
                              <rect x="12" y="66" width="38" height="2" rx="1" fill="#e0e0e0"/>
                              <rect x="12" y="72" width="48" height="2" rx="1" fill="#e0e0e0"/>
                              <text x="45" y="95" textAnchor="middle" fill="#a8a29e" fontSize="12" fontWeight="500">PDF</text>
                            </svg>
                          </div>
                          <span className="text-[11px] text-stone-600 group-hover:text-stone-800 text-center leading-tight max-w-[100px] transition-colors whitespace-pre-line">{doc.name}</span>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                ) : activeSidebar === "desktop" ? (
                  <motion.div
                    key="desktop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-[620px] overflow-hidden"
                  >
                    <DesktopWidgets />
                  </motion.div>
                ) : activeSidebar === "recents" ? (
                  <motion.div
                    key="recents"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-[620px] overflow-hidden"
                  >
                    <RecentStatus />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-[620px]"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortfolioViewer() {
  return (
    <motion.section
      className="flex flex-col items-center px-6 pt-52 pb-12"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, margin: "-60px" }}
    >
      <FolderWindowContent />
    </motion.section>
  );
}
