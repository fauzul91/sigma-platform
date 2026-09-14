"use client";

import React from "react";
import {
  Search,
  AlertTriangle,
  Stethoscope,
  Scale,
  BarChart2,
  Lock,
  Unlock,
  CheckCircle2,
} from "lucide-react";
import { DetectiveClue, ClueType } from "@/data/detectiveCasesData";

interface ClueCardProps {
  index: number;
  clue: DetectiveClue;
  isOpen: boolean;
  onOpen: (index: number) => void;
  canOpen: boolean;
}

const CLUE_TITLES: Record<ClueType, { label: string; icon: React.ComponentType<{ className?: string }> }> = {
  source: { label: "Pemeriksaan Sumber & Akun", icon: Search },
  language: { label: "Analisis Bahasa & Pola Panik", icon: AlertTriangle },
  medical: { label: "Verifikasi Medis & Ilmiah", icon: Stethoscope },
  legal: { label: "Verifikasi Regulasi Hukum", icon: Scale },
  statistic: { label: "Pengecekan Data & Angka", icon: BarChart2 },
};

export default function ClueCard({
  index,
  clue,
  isOpen,
  onOpen,
  canOpen,
}: ClueCardProps) {
  const config = CLUE_TITLES[clue.type] || CLUE_TITLES.source;
  const Icon = config.icon;

  if (isOpen) {
    return (
      <div className="rounded-2xl border-2 border-emerald-500 bg-[#f0fdf4] p-4 sm:p-5 shadow-xs space-y-2 animate-in fade-in duration-200">
        <div className="flex items-center justify-between border-b border-emerald-200/80 pb-2">
          <div className="flex items-center space-x-2 text-emerald-900 font-black text-xs sm:text-sm uppercase tracking-wide">
            <Icon className="h-4 w-4 text-emerald-700" />
            <span>Petunjuk #{index + 1}: {config.label}</span>
          </div>
          <span className="text-emerald-700 font-extrabold text-xs flex items-center space-x-1">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Terbuka</span>
          </span>
        </div>

        <div className="pt-1 space-y-1">
          <h4 className="text-sm font-black text-slate-900">
            {clue.title}
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
            {clue.content}
          </p>
        </div>
      </div>
    );
  }

  if (canOpen) {
    return (
      <button
        type="button"
        onClick={() => onOpen(index)}
        className="w-full text-left p-4 rounded-2xl border-2 border-amber-300 bg-[#fefce8] hover:bg-[#fef9c3] hover:border-amber-500 transition-all flex items-center justify-between gap-3 shadow-xs hover:shadow-md cursor-pointer group"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xs shrink-0 group-hover:scale-110 transition-transform">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <span className="text-xs font-black text-amber-900 block">
              Petunjuk #{index + 1}: {config.label}
            </span>
            <span className="text-[11px] text-slate-600 font-semibold">
              Ketuk untuk membuka hasil pemeriksaan bukti
            </span>
          </div>
        </div>

        <span className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shrink-0 transition-colors shadow-2xs">
          <Unlock className="h-3.5 w-3.5" />
          <span>Buka Bukti</span>
        </span>
      </button>
    );
  }

  // Locked State
  return (
    <div className="w-full p-4 rounded-2xl border-2 border-slate-200/80 bg-slate-100/70 opacity-60 flex items-center justify-between select-none">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-xl bg-slate-300 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0">
          <Lock className="h-4 w-4" />
        </div>
        <span className="text-xs font-black text-slate-500">
          Petunjuk #{index + 1}: {config.label} (Terkunci)
        </span>
      </div>
      <span className="text-[11px] font-bold text-slate-400">
        Buka bukti sebelumnya
      </span>
    </div>
  );
}
