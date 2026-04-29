"use client";

import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

interface Flower {
  id: number;
  x: number;
  y: number;
  flower_type: number;
}

function PixelFlower({ flower, isNew, size = 32 }: { flower: Flower; isNew: boolean; size?: number }) {
  const { x, y, id } = flower;
  const rotation = (((id * 2654435761) >>> 0) % 1000) / 1000 * 16 - 8;

  return (
    <img
      src="/pixel-flower.svg"
      alt=""
      className="absolute pointer-events-none"
      draggable={false}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: size,
        height: size,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        animation: isNew ? "flower-grow 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both" : undefined,
        imageRendering: "pixelated",
      }}
    />
  );
}

export function Garden({ isMobile = false }: { isMobile?: boolean }) {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [newFlowerId, setNewFlowerId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("flowers")
        .select("id, x, y, flower_type")
        .order("created_at", { ascending: true })
        .limit(1000);
      if (data) setFlowers(data);
      setLoading(false);
    };
    load();
  }, []);

  // Clear animation state after it completes
  useEffect(() => {
    if (newFlowerId) {
      const timer = setTimeout(() => setNewFlowerId(null), 600);
      return () => clearTimeout(timer);
    }
  }, [newFlowerId]);

  useEffect(() => {
    if (showThanks) {
      const timer = setTimeout(() => setShowThanks(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [showThanks]);

  const hasPlanted = typeof window !== "undefined" && localStorage.getItem("garden-planted") === "true";
  const [planted, setPlanted] = useState(hasPlanted);

  const plantFlower = useCallback(async (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (localStorage.getItem("garden-planted") === "true") {
      setPlanted(true);
      return;
    }

    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    let clientX: number, clientY: number;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    const flower_type = Math.floor(Math.random() * 6);

    const { data, error } = await supabase
      .from("flowers")
      .insert({ x, y, flower_type, color: "#1e1e1e" })
      .select("id, x, y, flower_type")
      .single();

    if (!error && data) {
      setFlowers((prev) => [...prev, data]);
      setNewFlowerId(data.id);
      localStorage.setItem("garden-planted", "true");
      setPlanted(true);
      setShowThanks(true);
    }
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <div className="text-[12px] text-stone-400 uppercase tracking-[0.2em] font-mono">Community Garden</div>
          <div className="text-[13px] text-stone-500 mt-0.5">
            {loading ? "Loading flowers…" : `${flowers.length} flower${flowers.length !== 1 ? "s" : ""} planted by visitors`}
          </div>
        </div>
        {!loading && (
          <div className="flex items-center gap-2">
            <span
              className="text-[12px] text-stone-800 bg-stone-200 border border-stone-300 px-3 py-1 rounded-full shadow-sm transition-opacity duration-500"
              style={{ opacity: showThanks ? 1 : 0 }}
            >
              Thanks for planting!
            </span>
            <span className="text-[12px] text-stone-400">{planted ? "You planted one 🌸" : isMobile ? "Tap to plant" : "Click to plant"}</span>
          </div>
        )}
      </div>

      <div
        className="flex-1 relative mx-3 mb-3 rounded-lg overflow-hidden"
        style={{ background: "#FAF8F5", cursor: "crosshair" }}
        onClick={plantFlower}
        onTouchStart={plantFlower}
      >
        {flowers.map((flower) => (
          <PixelFlower
            key={flower.id}
            flower={flower}
            isNew={flower.id === newFlowerId}
            size={isMobile ? 14 : 15}
          />
        ))}

        {flowers.length === 0 && !loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-[14px] text-stone-400">Be the first to plant a flower</p>
          </div>
        )}
      </div>
    </div>
  );
}
