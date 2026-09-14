"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Sparkles } from "lucide-react";

interface MythCardProps {
  statement: string;
  category: string;
  cardNumber: number;
  totalCards: number;
  onSwipe: (answer: "myth" | "fact") => void;
}

export default function MythCard({
  statement,
  category,
  cardNumber,
  totalCards,
  onSwipe,
}: MythCardProps) {
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef<number | null>(null);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        onSwipe("myth");
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        onSwipe("fact");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSwipe]);

  // Unified Pointer handlers (works flawlessly across desktop mouse & mobile touch)
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {}
    startX.current = e.clientX;
    setIsDragging(true);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging || startX.current === null) return;
      const delta = e.clientX - startX.current;
      setDragX(delta);
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
      setIsDragging(false);
      const threshold = 70;
      if (dragX < -threshold) {
        onSwipe("myth");
      } else if (dragX > threshold) {
        onSwipe("fact");
      } else {
        setDragX(0);
      }
      startX.current = null;
      setTimeout(() => setDragX(0), 160);
    },
    [dragX, isDragging, onSwipe]
  );

  const handlePointerCancel = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
      setIsDragging(false);
      setDragX(0);
      startX.current = null;
    },
    [isDragging]
  );

  const rotation = Math.max(-14, Math.min(14, dragX * 0.09));
  const leftOpacity = Math.max(0, Math.min(1, -dragX / 70));
  const rightOpacity = Math.max(0, Math.min(1, dragX / 70));

  return (
    <div className="relative w-full max-w-xl mx-auto select-none pt-4 pb-2">
      {/* Background Deck Card 2 (Bottom layer for card-stack effect) */}
      <div className="absolute inset-x-4 top-10 bottom-0 bg-[#e8f5ec] rounded-2xl border-[3px] border-emerald-700/25 transform rotate-2 scale-[0.94] pointer-events-none shadow-sm" />

      {/* Background Deck Card 1 (Middle layer for card-stack effect) */}
      <div className="absolute inset-x-2 top-7 bottom-1 bg-[#fef7eb] rounded-2xl border-[3px] border-amber-600/35 transform -rotate-1.5 scale-[0.97] pointer-events-none shadow-md" />

      {/* Front Interactive Playing Card */}
      <div
        className="relative w-full cursor-grab active:cursor-grabbing rounded-2xl border-[3.5px] border-emerald-600 bg-gradient-to-b from-white via-[#fffdf9] to-[#fef8ed] p-6 sm:p-9 lg:p-10 shadow-xl overflow-hidden min-h-[310px] sm:min-h-[340px] flex flex-col justify-between"
        style={{
          transform: `translateX(${dragX}px) rotate(${rotation}deg)`,
          transition: isDragging ? "none" : "transform 0.2s cubic-bezier(0.2, 0.9, 0.3, 1)",
          touchAction: "none",
          willChange: "transform",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {/* 4 Corner Tab Accents (Gamified Quest Frame) */}
        <div className="absolute top-0 left-0 w-0 h-0 border-t-[16px] border-r-[16px] border-t-emerald-600 border-r-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[16px] border-l-[16px] border-t-emerald-600 border-l-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[16px] border-r-[16px] border-b-emerald-600 border-r-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[16px] border-l-[16px] border-b-emerald-600 border-l-transparent pointer-events-none z-10" />

        {/* Swipe Stamp Overlay - MITOS (Left Drag) */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-rose-500/20 via-rose-500/5 to-transparent flex items-center justify-start pl-6 sm:pl-10 z-20"
          style={{ opacity: leftOpacity }}
        >
          <div className="border-[4px] border-rose-600 text-rose-600 font-black text-2xl sm:text-3xl px-5 py-2 rounded-2xl uppercase tracking-wider -rotate-15 shadow-md bg-white/90">
            MITOS ✕
          </div>
        </div>

        {/* Swipe Stamp Overlay - FAKTA (Right Drag) */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-l from-emerald-500/20 via-emerald-500/5 to-transparent flex items-center justify-end pr-6 sm:pl-10 z-20"
          style={{ opacity: rightOpacity }}
        >
          <div className="border-[4px] border-emerald-600 text-emerald-600 font-black text-2xl sm:text-3xl px-5 py-2 rounded-2xl uppercase tracking-wider rotate-15 shadow-md bg-white/90">
            FAKTA ✓
          </div>
        </div>

        {/* Card Header: Category & Pip Counter */}
        <div className="flex items-center justify-between border-b-2 border-emerald-900/10 pb-3">
          <div className="flex items-center space-x-2 text-emerald-900">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider">
              {category.replace("-", " ")}
            </span>
          </div>

          <span className="text-xs font-black tracking-wider text-slate-500">
            KARTU {cardNumber} / {totalCards}
          </span>
        </div>

        {/* Main Statement Text */}
        <div className="py-6 sm:py-8 my-auto text-center px-2">
          <span className="text-4xl sm:text-5xl text-amber-400/80 font-serif leading-none block select-none mb-1">
            “
          </span>
          <p className="text-lg sm:text-xl lg:text-2xl font-black text-slate-900 leading-snug tracking-tight">
            {statement}
          </p>
          <span className="text-4xl sm:text-5xl text-amber-400/80 font-serif leading-none block select-none mt-1">
            ”
          </span>
        </div>

        {/* Bottom Card Gesture Indicator */}
        <div className="pt-3 border-t-2 border-emerald-900/10 flex items-center justify-between text-[11px] font-extrabold text-slate-400">
          <span className="text-rose-600">← Geser Kiri: Mitos</span>
          <span className="text-emerald-700">Geser Kanan: Fakta →</span>
        </div>
      </div>
    </div>
  );
}
