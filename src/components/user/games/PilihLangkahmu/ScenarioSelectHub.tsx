"use client";

import React from "react";
import Image from "next/image";
import type { Scenario } from "@/data/pilihLangkahmu";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  User,
  Compass,
  Edit2,
  Sparkles,
} from "lucide-react";

interface ScenarioSelectHubProps {
  playerName: string;
  scenarios: Scenario[];
  onSelectScenario: (scenario: Scenario) => void;
  onChangeName: () => void;
  onBackToHub: () => void;
}

export default function ScenarioSelectHub({
  playerName,
  scenarios,
  onSelectScenario,
  onChangeName,
  onBackToHub,
}: ScenarioSelectHubProps) {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 sm:py-10 animate-fadeIn text-left select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-amber-900/10">
        <div className="space-y-1.5">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-800 text-xs font-black uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Pilih Langkahmu • Ruang Simulasi Remaja</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Halo, {playerName}!</span>
            <span className="text-amber-500">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Pilih situasi yang ingin kamu jelajahi. Setiap cerita terdiri dari 5 langkah keputusan nyata.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={onChangeName}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-bold transition-all shadow-2xs cursor-pointer"
            title="Ganti nama panggilan"
          >
            <Edit2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Ganti Nama</span>
          </button>

          <button
            onClick={onBackToHub}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#facc15] hover:bg-[#fde047] border-b-[3px] border-[#ca8a04] active:border-b-0 active:translate-y-0.5 text-slate-950 text-xs font-black transition-all shadow-md cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Menu Utama</span>
          </button>
        </div>
      </div>

      {/* Scenario Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {scenarios.map((s) => (
          <div
            key={s.id}
            className="relative rounded-3xl border-[3px] border-[#78350f]/40 bg-[#fffbeb] shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between group text-left"
          >
            {/* Corner Notch */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[24px] border-l-[24px] border-t-emerald-700 border-l-transparent pointer-events-none z-10" />

            {/* Card Content Top */}
            <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Thumbnail Character */}
              <div className="relative w-20 h-28 sm:w-24 sm:h-32 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-900/20 bg-slate-900 shadow-md group-hover:scale-105 transition-transform">
                <Image
                  src={s.coverImage}
                  alt={s.title}
                  fill
                  unoptimized
                  className="object-cover object-top"
                />
              </div>

              {/* Title and details */}
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-700 text-white shadow-2xs">
                    KASUS 0{s.number} • 5 LANGKAH
                  </span>
                  <div className="flex items-center space-x-1 text-[11px] font-bold text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-amber-700" />
                    <span>{s.duration}</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                  {s.icon} {s.title}
                </h3>

                <p className="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wide">
                  {s.topic}
                </p>

                <p className="text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed pt-0.5">
                  {s.subtitle}
                </p>
              </div>
            </div>

            {/* Card Footer CTA */}
            <div className="p-4 sm:p-5 pt-0">
              <button
                onClick={() => onSelectScenario(s)}
                className="w-full inline-flex items-center justify-center space-x-2 py-3 px-5 rounded-2xl bg-[#facc15] hover:bg-[#fde047] border-b-[4px] border-[#ca8a04] active:border-b-0 active:translate-y-1 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-md transition-all group/btn cursor-pointer"
              >
                <span>Mulai Simulasi Cerita</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}