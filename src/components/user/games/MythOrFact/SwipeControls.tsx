"use client";

import React from "react";
import { X, Check } from "lucide-react";

interface SwipeControlsProps {
  onAnswer: (answer: "myth" | "fact") => void;
}

export default function SwipeControls({ onAnswer }: SwipeControlsProps) {
  return (
    <div className="w-full max-w-xl mx-auto space-y-3 pt-2">
      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        {/* Big 3D Tactile MITOS Button */}
        <button
          type="button"
          onClick={() => onAnswer("myth")}
          className="group relative rounded-2xl bg-rose-500 hover:bg-rose-400 border-b-[5px] border-rose-700 active:border-b-0 active:translate-y-1 text-white font-black text-base sm:text-lg py-4 px-5 shadow-lg active:shadow-sm transition-all duration-100 flex items-center justify-center space-x-3 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <X className="h-5 w-5 stroke-[3]" />
          </div>
          <span>MITOS</span>
          <span className="text-[11px] font-extrabold text-rose-100 bg-rose-700/60 px-2 py-0.5 rounded-md hidden sm:inline">
            [ ← ]
          </span>
        </button>

        {/* Big 3D Tactile FAKTA Button */}
        <button
          type="button"
          onClick={() => onAnswer("fact")}
          className="group relative rounded-2xl bg-emerald-500 hover:bg-emerald-400 border-b-[5px] border-emerald-700 active:border-b-0 active:translate-y-1 text-white font-black text-base sm:text-lg py-4 px-5 shadow-lg active:shadow-sm transition-all duration-100 flex items-center justify-center space-x-3 cursor-pointer"
        >
          <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Check className="h-5 w-5 stroke-[3]" />
          </div>
          <span>FAKTA</span>
          <span className="text-[11px] font-extrabold text-emerald-100 bg-emerald-700/60 px-2 py-0.5 rounded-md hidden sm:inline">
            [ → ]
          </span>
        </button>
      </div>

      <p className="text-center text-xs text-slate-500 font-bold">
        Tekan tombol atau gunakan tombol panah kiri / kanan pada keyboard
      </p>
    </div>
  );
}
