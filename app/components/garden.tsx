"use client";

import React, { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";

interface Flower {
  id: number;
  x: number;
  y: number;
  flower_type: number;
  color: string;
}

function PixelFlower({ flower, isNew }: { flower: Flower; isNew: boolean }) {
  const { x, y } = flower;

  return (
    <img
      src="/pixel-flower.svg"
      alt=""
      className="absolute pointer-events-none"
      draggable={false}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: 32,
        height: 32,
        transform: "translate(-50%, -50%)",
        animation: isNew ? "flower-grow 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both" : undefined,
        imageRendering: "pixelated",
      }}
    />
  );
}

export function Garden() {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [newFlowerId, setNewFlowerId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Load flowers
  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("flowers")
        .select("*")
        .order("created_at", { ascending: true });
      if (data) setFlowers(data);
      setLoading(false);
    };
    load();
  }, []);

  const plantFlower = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const flower_type = Math.floor(Math.random() * 6);

    const { data, error } = await supabase
      .from("flowers")
      .insert({ x, y, flower_type, color: "#1e1e1e" })
      .select()
      .single();

    if (!error && data) {
      setFlowers((prev) => [...prev, data]);
      setNewFlowerId(data.id);
    }
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <div className="text-[12px] text-stone-400 uppercase tracking-[0.2em] font-mono">Community Garden</div>
          <div className="text-[13px] text-stone-500 mt-0.5">
            {flowers.length} flower{flowers.length !== 1 ? "s" : ""} planted by visitors
          </div>
        </div>
        {!loading && (
          <div className="text-[12px] text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full animate-pulse">
            Click to plant
          </div>
        )}
      </div>

      {/* Garden area */}
      <div
        className="flex-1 relative mx-3 mb-3 rounded-lg overflow-hidden"
        style={{
          background: "#FAF8F5",
          cursor: "crosshair",
        }}
        onClick={plantFlower}
      >

        {/* Flowers */}
        {flowers.map((flower) => (
          <PixelFlower
            key={flower.id}
            flower={flower}
            isNew={flower.id === newFlowerId}
          />
        ))}

        {/* Empty state */}
        {flowers.length === 0 && !loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-[14px] text-stone-400">Be the first to plant a flower</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes flower-grow {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
