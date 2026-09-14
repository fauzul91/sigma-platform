"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Check, X, Sparkles } from "lucide-react";
import { MythItem } from "@/data/mythsData";

interface MythFeedbackProps {
  item: MythItem;
  userAnswer: "myth" | "fact";
  cardNumber: number;
  totalCards: number;
  isLast: boolean;
  onNext: () => void;
}

export default function MythFeedback({
  item,
  userAnswer,
  cardNumber,
  totalCards,
  isLast,
  onNext,
}: MythFeedbackProps) {
  const isCorrect = userAnswer === item.answer;
  const isFact = item.answer === "fact";

  // Enter/Space key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext]);

  return (
    <div className="relative w-full max-w-xl mx-auto select-none pt-4 pb-2 animate-in fade-in zoom-in-95 duration-200">
      {/* Background Deck Card (To preserve deck look) */}
      <div className="absolute inset-x-3 top-7 bottom-1 bg-[#fef7eb] rounded-2xl border-[3px] border-amber-600/35 transform -rotate-1.5 scale-[0.97] pointer-events-none shadow-md" />

      {/* Main Feedback Card */}
      <div className="relative w-full rounded-2xl border-[3.5px] border-emerald-600 bg-gradient-to-b from-white via-[#fffdf9] to-[#fef8ed] p-6 sm:p-8 lg:p-9 shadow-xl overflow-hidden space-y-5">
        {/* 4 Corner Tab Accents */}
        <div className="absolute top-0 left-0 w-0 h-0 border-t-[16px] border-r-[16px] border-t-emerald-600 border-r-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-0 h-0 border-t-[16px] border-l-[16px] border-t-emerald-600 border-l-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[16px] border-r-[16px] border-b-emerald-600 border-r-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[16px] border-l-[16px] border-b-emerald-600 border-l-transparent pointer-events-none z-10" />

        {/* Top Bar: Card Progress & Stamp */}
        <div className="flex items-center justify-between border-b-2 border-emerald-900/10 pb-3">
          <span className="text-xs font-black tracking-wider text-slate-500 uppercase">
            KARTU {cardNumber} DARI {totalCards}
          </span>

          {/* Stamped Result Pill */}
          <div
            className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider shadow-xs ${
              isCorrect
                ? "bg-emerald-600 text-white"
                : "bg-rose-600 text-white"
            }`}
          >
            {isCorrect ? <Check className="h-4 w-4 stroke-[3]" /> : <X className="h-4 w-4 stroke-[3]" />}
            <span>{isCorrect ? "Jawaban Tepat!" : "Kurang Tepat!"}</span>
          </div>
        </div>

        {/* Statement Recap */}
        <div className="text-center px-1">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-1">
            Pernyataan:
          </span>
          <p className="text-base sm:text-lg font-black text-slate-900 leading-snug">
            &ldquo;{item.statement}&rdquo;
          </p>
        </div>

        {/* Verdict Banner */}
        <div
          className={`p-4 rounded-2xl border-2 text-center space-y-1 ${
            isFact
              ? "bg-emerald-50 border-emerald-300 text-emerald-950"
              : "bg-rose-50 border-rose-300 text-rose-950"
          }`}
        >
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-500 block">
            Fakta Sebenarnya:
          </span>
          <h4 className="text-xl sm:text-2xl font-black uppercase tracking-wide">
            {isFact ? "Ini Adalah FAKTA ✓" : "Ini Adalah MITOS ✕"}
          </h4>
          <p className="text-xs sm:text-sm font-semibold text-slate-700 leading-relaxed pt-1 max-w-lg mx-auto">
            {item.explanation}
          </p>
        </div>

        {/* Repropedia Connection */}
        <div className="flex items-center justify-center text-center">
          <Link
            href="/repropedia"
            className="inline-flex items-center space-x-1.5 text-xs font-black text-emerald-700 hover:text-emerald-800 hover:underline"
          >
            <BookOpen className="h-4 w-4" />
            <span>Baca penjelasan materi selengkapnya di Repropedia</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Big 3D Tactile Next Button */}
        <div className="pt-1">
          <button
            type="button"
            onClick={onNext}
            className="w-full py-4 px-6 rounded-2xl bg-[#facc15] hover:bg-[#fde047] border-b-[5px] border-[#ca8a04] active:border-b-0 active:translate-y-1 text-slate-950 font-black text-sm sm:text-base tracking-wide shadow-lg hover:shadow-xl transition-all duration-100 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>{isLast ? "Lihat Skor Akhir" : "Lanjut ke Kartu Selanjutnya"}</span>
            <ArrowRight className="h-5 w-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
