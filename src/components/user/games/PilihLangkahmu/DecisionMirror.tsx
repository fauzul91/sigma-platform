"use client";

import React from "react";
import Link from "next/link";
import type {
  DecisionMirror as DecisionMirrorType,
  Scenario,
  DecisionHistoryEntry,
} from "@/data/pilihLangkahmu";
import {
  Sparkles,
  CheckCircle2,
  Lightbulb,
  BookOpen,
  RotateCcw,
  ArrowRight,
  Compass,
  HeartHandshake,
  ListChecks,
} from "lucide-react";

interface DecisionMirrorProps {
  scenario: Scenario;
  playerName: string;
  reflection: DecisionMirrorType;
  history: DecisionHistoryEntry[];
  onRestart: () => void;
  onExitToSelect: () => void;
}

export default function DecisionMirror({
  scenario,
  playerName,
  reflection,
  history,
  onRestart,
  onExitToSelect,
}: DecisionMirrorProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12 animate-fadeIn text-left">
      <div className="bg-[#fffbeb] rounded-3xl border-3 border-emerald-600 shadow-2xl overflow-hidden relative">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 p-6 sm:p-8 text-white relative">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-300 text-xs font-black uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>🪞 Cermin Keputusan</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-1">
            {playerName}, dalam situasi tadi...
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-medium">
            Kasus: <strong>{scenario.title}</strong> ({scenario.topic})
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* 1. Headline Banner: Pola Respon dalam Simulasi */}
          <div className="p-5 rounded-2xl bg-amber-500/15 border-2 border-amber-500/30 text-slate-900">
            <div className="flex items-center space-x-2 text-amber-800 text-xs font-black uppercase tracking-wider mb-1.5">
              <Compass className="w-4 h-4" />
              <span>Refleksi Pola Tindakanmu</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
              "{reflection.headline}"
            </p>
          </div>

          {/* 2. Jejak Pilihan 5 Langkah (Progress Review) */}
          {history.length > 0 && (
            <div className="p-5 rounded-2xl bg-white border border-amber-900/15 shadow-xs space-y-3">
              <div className="flex items-center space-x-2 text-slate-800 font-black text-xs uppercase tracking-wider">
                <ListChecks className="w-4 h-4 text-emerald-700" />
                <span>Jejak Keputusanmu (5 Langkah)</span>
              </div>
              <div className="space-y-2">
                {history.map((entry, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-3 text-xs sm:text-sm p-2.5 rounded-xl bg-slate-50 border border-slate-200/80"
                  >
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-black text-[11px] shrink-0 mt-0.5">
                      Langkah {entry.stepNumber} ✓
                    </span>
                    <span className="font-semibold text-slate-800 leading-snug">
                      {entry.choiceText}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. Dua Kolom Wawasan (Yang sudah baik & Yang bisa dicoba) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-900 font-black text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Yang Kamu Lakukan dengan Baik</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {reflection.whatWasGood}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-sky-50 border border-sky-200 space-y-2">
              <div className="flex items-center space-x-2 text-sky-900 font-black text-xs uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-sky-600" />
                <span>Yang Bisa Dicoba ke Depan</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {reflection.whatToTry}
              </p>
            </div>
          </div>

          {/* 4. Pengingat Inti (Coba Ingat...) */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white flex items-start space-x-3.5 shadow-md">
            <HeartHandshake className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="block text-[10px] font-black uppercase tracking-widest text-amber-400 mb-0.5">
                Coba Ingat...
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-100 leading-relaxed">
                {reflection.coreReminder}
              </p>
            </div>
          </div>

          {/* 5. Tautan Modul Repropedia */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-100/70 border border-emerald-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-emerald-700 text-white shrink-0 shadow-2xs">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-900 block">
                  Pelajari Lebih Lanjut di Repropedia
                </span>
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  {reflection.repropediaChapter.title}
                </span>
              </div>
            </div>
            <Link
              href={reflection.repropediaChapter.href}
              className="inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-white border border-emerald-600 text-emerald-900 font-extrabold text-xs hover:bg-emerald-50 transition-colors shadow-xs shrink-0"
            >
              <span>Buka Modul</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 6. Tombol Aksi Akhir */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-amber-900/15">
            <button
              onClick={onRestart}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Cerita Ini</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <Link
                href="/permainan"
                className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Menu Permainan
              </Link>

              <button
                onClick={onExitToSelect}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl bg-[#facc15] hover:bg-[#fde047] border-b-[4px] border-[#ca8a04] active:border-b-0 active:translate-y-1 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              >
                <span>Pilih Skenario Lain</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}