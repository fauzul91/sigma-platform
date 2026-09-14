"use client";

import React from "react";
import Link from "next/link";
import { Award, ArrowRight, RotateCcw, X, BookOpen, Sparkles } from "lucide-react";

interface GameResultCardProps {
  score: number;
  total: number;
  gameName: string;
  xp: number;
  relatedTopicLabel: string;
  relatedTopicHref: string;
  playAgainHref: string;
  backHref: string;
}

function getEvaluation(score: number, total: number) {
  const percentage = Math.round((score / total) * 100);
  if (percentage >= 90) {
    return {
      title: "Luar Biasa! Pemahamanmu Sangat Tajam 🎉",
      subtitle: "Kamu berhasil mengidentifikasi hampir semua informasi dengan tepat.",
      stampText: "SEMPURNA ✓",
    };
  }
  if (percentage >= 70) {
    return {
      title: "Bagus Sekali! Daya Kritismu Teruji 👍",
      subtitle: "Sebagian besar informasi berhasil kamu analisis dan pahami dengan baik.",
      stampText: "TERUJI ✓",
    };
  }
  if (percentage >= 50) {
    return {
      title: "Cukup Baik, Terus Asah Kepekaanmu! 💡",
      subtitle: "Ada beberapa hal penting yang sering disalahpahami oleh remaja.",
      stampText: "BERLATIH 💡",
    };
  }
  return {
    title: "Awal yang Bagus untuk Mulai Belajar 🌱",
    subtitle: "Jangan berkecil hati, jadikan hasil ini langkah awal mengenali fakta kesehatan.",
    stampText: "EKSPLORASI 🌱",
  };
}

export default function GameResultCard({
  score,
  total,
  gameName,
  xp,
  relatedTopicLabel,
  relatedTopicHref,
  playAgainHref,
  backHref,
}: GameResultCardProps) {
  const percentage = Math.round((score / total) * 100);
  const evaluation = getEvaluation(score, total);

  return (
    <div className="bg-[#faf8f5] min-h-screen flex flex-col font-sans text-slate-800 selection:bg-emerald-100 selection:text-emerald-900 relative">
      {/* Subtle Diamond Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22 0 L44 22 L22 44 L0 22 Z' fill='none' stroke='%23000' stroke-width='1.5'/%3E%3C/svg%3E")`,
          backgroundSize: "36px 36px",
        }}
      />

      {/* Focus Header */}
      <header className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between shrink-0 relative z-10">
        <Link
          href={backHref}
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-black text-slate-600 hover:text-slate-900 transition-colors group"
        >
          <div className="w-8 h-8 rounded-xl bg-white border-2 border-slate-200 shadow-xs flex items-center justify-center group-hover:border-slate-400 group-hover:bg-slate-50 transition-all">
            <X className="h-4 w-4 text-slate-700" />
          </div>
          <span className="hidden sm:inline">Keluar</span>
        </Link>

        <Link href="/beranda" className="flex items-center space-x-1.5">
          <span className="text-2xl sm:text-3xl font-black tracking-tighter text-emerald-700 select-none lowercase">
            sigma<span className="text-amber-500">.</span>
          </span>
        </Link>

        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-black tracking-wide shadow-xs">
            {gameName}
          </span>
        </div>
      </header>

      {/* Main Results Container */}
      <div className="flex-1 flex flex-col justify-center items-center w-full px-4 sm:px-6 my-auto py-6 sm:py-8 lg:py-10 relative z-10">
        <div className="relative w-full max-w-xl mx-auto border-[3.5px] border-emerald-600 rounded-2xl bg-gradient-to-b from-white via-[#fffdf9] to-[#fef8ed] p-6 sm:p-8 lg:p-10 shadow-xl text-center space-y-6 overflow-hidden">
          
          {/* 4 Corner Tab Accents */}
          <div className="absolute top-0 left-0 w-0 h-0 border-t-[16px] border-r-[16px] border-t-emerald-600 border-r-transparent pointer-events-none z-10" />
          <div className="absolute top-0 right-0 w-0 h-0 border-t-[16px] border-l-[16px] border-t-emerald-600 border-l-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[16px] border-r-[16px] border-b-emerald-600 border-r-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[16px] border-l-[16px] border-b-emerald-600 border-l-transparent pointer-events-none z-10" />

          {/* Trophy / Result Icon */}
          <div className="w-18 h-18 lg:w-20 lg:h-20 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-md">
            <Award className="h-10 w-10 stroke-[2.2]" />
          </div>

          {/* Heading & Evaluation */}
          <div className="space-y-1.5">
            <span className="inline-block px-3.5 py-1 rounded-xl bg-emerald-600 text-white font-black text-xs uppercase tracking-wider shadow-xs">
              {evaluation.stampText}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              {evaluation.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-bold max-w-md mx-auto">
              {evaluation.subtitle}
            </p>
          </div>

          {/* Score Stats Grid */}
          <div className="grid grid-cols-2 gap-3 py-4 border-y-2 border-emerald-900/10 text-center">
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200/80 shadow-2xs">
              <span className="text-xs font-black text-slate-400 block uppercase tracking-wide">
                Jawaban Tepat
              </span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-600 block mt-0.5">
                {score} / {total}
              </span>
            </div>
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200/80 shadow-2xs">
              <span className="text-xs font-black text-slate-400 block uppercase tracking-wide">
                Tingkat Akurasi
              </span>
              <span className="text-2xl sm:text-3xl font-black text-slate-900 block mt-0.5">
                {percentage}%
              </span>
            </div>
          </div>

          {/* Calm XP Reward Note */}
          <div className="flex items-center justify-center space-x-2 text-xs font-black text-emerald-900 bg-emerald-100/70 border border-emerald-300/80 py-2.5 px-4 rounded-xl">
            <Sparkles className="h-4 w-4 text-emerald-600" />
            <span>+{xp} XP ditambahkan ke wawasan belajarmu</span>
          </div>

          {/* Repropedia Recommendation */}
          <div className="p-4 rounded-2xl bg-white border-2 border-emerald-900/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                <BookOpen className="h-4 w-4" />
              </div>
              <p className="text-xs text-slate-700 font-bold">
                Ingin tahu penjelasan mendalam tentang materi ini?
              </p>
            </div>
            <Link
              href={relatedTopicHref}
              className="inline-flex items-center space-x-1.5 text-xs font-black text-emerald-700 hover:text-emerald-800 whitespace-nowrap group shrink-0"
            >
              <span>{relatedTopicLabel}</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* 3D Tactile Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href={playAgainHref}
              className="flex-1 py-3.5 px-5 rounded-2xl bg-[#facc15] hover:bg-[#fde047] border-b-[4px] border-[#ca8a04] active:border-b-0 active:translate-y-1 text-slate-950 font-black text-sm shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center space-x-2"
            >
              <RotateCcw className="h-4 w-4 stroke-[2.5]" />
              <span>Mainkan Lagi</span>
            </Link>
            <Link
              href={backHref}
              className="flex-1 py-3.5 px-5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-slate-300 active:translate-y-1 text-slate-700 font-black text-sm shadow-xs transition-all flex items-center justify-center space-x-2"
            >
              <span>Ke Menu Permainan</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
