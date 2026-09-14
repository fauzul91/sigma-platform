"use client";

import React from "react";
import type { Scenario } from "@/data/pilihLangkahmu";
import { ArrowRight, Clock, Tag, Compass, Sparkles, BookOpen } from "lucide-react";
import Image from "next/image";

interface SituationIntroProps {
  scenario: Scenario;
  onStart: () => void;
  onBackToHub: () => void;
}

export default function SituationIntro({
  scenario,
  onStart,
  onBackToHub,
}: SituationIntroProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 animate-fadeIn">
      <div className="bg-white rounded-3xl border-3 border-emerald-600/90 shadow-xl overflow-hidden relative">
        {/* Decorative corner notch */}
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[28px] border-l-[28px] border-t-emerald-600 border-l-transparent z-10" />

        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 p-6 sm:p-8 text-white relative">
          <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest text-amber-300 mb-2">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-400/20 border border-amber-300/30">
              KASUS 0{scenario.number}
            </span>
            <span>•</span>
            <span>{scenario.topic}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight mb-2 flex items-center gap-3">
            <span>{scenario.icon}</span>
            <span>{scenario.title}</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 font-medium">
            {scenario.subtitle}
          </p>

          <div className="flex items-center space-x-4 mt-6 text-xs text-slate-300 font-semibold">
            <div className="flex items-center space-x-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>Estimasi: {scenario.duration}</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/15">
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>Simulasi Cerita Bercabang</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs sm:text-sm font-medium leading-relaxed space-y-2">
            <div className="flex items-center space-x-2 text-amber-800 font-bold uppercase tracking-wider text-[11px]">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Cara Kerja Simulasi Ini:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-700 font-medium">
              <li>Kamu akan menghadapi percakapan situasi kehidupan nyata.</li>
              <li>Pilih tindakan yang menurutmu paling tepat dari sudut pandangmu.</li>
              <li>Tidak ada skor, tidak ada nilai benar/salah, dan tidak ada Game Over.</li>
              <li>Di akhir cerita, kamu akan melihat <strong>Cermin Keputusan</strong> yang merefleksikan pola tindakanmu.</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <button
              onClick={onBackToHub}
              className="w-full sm:w-auto px-6 py-3 rounded-xl border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-xs sm:text-sm transition-colors text-center"
            >
              Kembali ke Hub Permainan
            </button>

            <button
              onClick={onStart}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-xl bg-[#facc15] hover:bg-[#fde047] border-b-[4px] border-[#ca8a04] active:border-b-0 active:translate-y-1 text-slate-950 font-black text-sm tracking-wide shadow-md transition-all group"
            >
              <span>Mulai Simulasi Cerita</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}