"use client";

import React from "react";
import Link from "next/link";
import { Check, AlertCircle, ArrowRight, BookOpen } from "lucide-react";
import { VerdictType } from "@/data/detectiveCasesData";

interface InvestigationResultProps {
  correctVerdict: VerdictType;
  userVerdict: VerdictType;
  conclusion: string;
  relatedTopic?: string;
  isLast: boolean;
  onNext: () => void;
}

const VERDICT_NAMES: Record<VerdictType, string> = {
  trusted: "TERPERCAYA",
  check: "PERLU VERIFIKASI",
  misleading: "MENYESATKAN",
};

export default function InvestigationResult({
  correctVerdict,
  userVerdict,
  conclusion,
  relatedTopic,
  isLast,
  onNext,
}: InvestigationResultProps) {
  const isCorrect = userVerdict === correctVerdict;

  return (
    <div className="w-full space-y-5 animate-in fade-in duration-200">
      {/* Debrief Stamp Banner */}
      <div
        className={`p-5 rounded-2xl border-2 flex items-center justify-between gap-3 ${
          isCorrect
            ? "bg-emerald-50 border-emerald-300 text-emerald-950"
            : "bg-amber-50 border-amber-300 text-amber-950"
        }`}
      >
        <div className="flex items-center space-x-3.5">
          <div
            className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
              isCorrect ? "bg-emerald-600 text-white" : "bg-amber-500 text-slate-950"
            }`}
          >
            {isCorrect ? <Check className="h-6 w-6 stroke-[3]" /> : <AlertCircle className="h-6 w-6 stroke-[2.5]" />}
          </div>
          <div>
            <span className="text-base sm:text-lg font-black uppercase tracking-tight block">
              {isCorrect ? "Kasus Terpecahkan! 🎯" : "Kesimpulan Belum Tepat 👀"}
            </span>
            <p className="text-xs sm:text-sm font-bold text-slate-600">
              {isCorrect
                ? "Daya analisis dan ketelitianmu dalam membaca fakta sangat tajam!"
                : "Postingan ini memang terdengar meyakinkan, namun ada celah penting."}
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Box */}
      <div className="grid grid-cols-2 gap-3 text-center">
        <div className="p-3.5 sm:p-4 rounded-xl border-2 border-slate-200 bg-white">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-1">
            Pilihanmu
          </span>
          <span className="text-sm sm:text-base font-black text-slate-800">
            {VERDICT_NAMES[userVerdict]}
          </span>
        </div>
        <div className="p-3.5 sm:p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-700 block mb-1">
            Verdict Resmi
          </span>
          <span className="text-sm sm:text-base font-black text-emerald-900">
            {VERDICT_NAMES[correctVerdict]} ✓
          </span>
        </div>
      </div>

      {/* Forensic Fact Debrief */}
      <div className="p-5 rounded-2xl bg-white border-2 border-emerald-900/15 space-y-2">
        <span className="text-xs font-black uppercase tracking-wider text-emerald-800 block">
          Catatan Fakta Forensik:
        </span>
        <p className="text-xs sm:text-sm text-slate-700 font-bold leading-relaxed">
          {conclusion}
        </p>

        {relatedTopic && (
          <div className="pt-2">
            <Link
              href="/repropedia"
              className="inline-flex items-center space-x-1.5 text-xs font-black text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Pelajari literasi &amp; fakta selengkapnya di Repropedia</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* Big 3D Tactile Next Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onNext}
          className="w-full py-4 px-6 rounded-2xl bg-[#facc15] hover:bg-[#fde047] border-b-[5px] border-[#ca8a04] active:border-b-0 active:translate-y-1 text-slate-950 font-black text-sm sm:text-base tracking-wide shadow-lg hover:shadow-xl transition-all duration-150 flex items-center justify-center space-x-2 cursor-pointer"
        >
          <span>{isLast ? "Lihat Hasil Akhir Investigasi" : "Lanjut ke Kasus Berikutnya"}</span>
          <ArrowRight className="h-5 w-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
