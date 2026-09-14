"use client";

import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Search, ShieldCheck, ArrowRight, ArrowLeft } from "lucide-react";
import { DETECTIVE_CASES, DetectiveCase, VerdictType } from "@/data/detectiveCasesData";
import { useGameFullscreen } from "@/context/GameFullscreenContext";
import SocialPostMockup from "./SocialPostMockup";
import ClueCard from "./ClueCard";
import VerdictSelector from "./VerdictSelector";
import InvestigationResult from "./InvestigationResult";
import GameResultCard from "../GameResultCard";

type GamePhase = "overview" | "investigate" | "verdict" | "result-final";

export default function DetectiveGameView() {
  const [cases] = useState<DetectiveCase[]>(DETECTIVE_CASES);
  const [caseIndex, setCaseIndex] = useState(0);
  const [phase, setPhase] = useState<GamePhase>("overview");
  const [openedClues, setOpenedClues] = useState<number[]>([]);
  const [selectedVerdict, setSelectedVerdict] = useState<VerdictType | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const { setIsFullscreenGame } = useGameFullscreen();

  // Fullscreen only during active investigation, verdict, or final result
  useEffect(() => {
    const isFullscreen = phase === "investigate" || phase === "verdict" || phase === "result-final";
    setIsFullscreenGame(isFullscreen);
  }, [phase, setIsFullscreenGame]);

  useEffect(() => {
    return () => {
      setIsFullscreenGame(false);
    };
  }, [setIsFullscreenGame]);

  const currentCase = cases[caseIndex] || cases[0];
  const totalCases = cases.length;
  const isLastCase = caseIndex === totalCases - 1;
  const progressPercent = Math.round(((caseIndex + (phase === "verdict" ? 1 : 0)) / totalCases) * 100);

  const handleStartGame = () => {
    setCaseIndex(0);
    setOpenedClues([]);
    setSelectedVerdict(null);
    setCorrectCount(0);
    setPhase("investigate");
  };

  const handleOpenClue = useCallback((index: number) => {
    setOpenedClues((prev) =>
      prev.includes(index) ? prev : [...prev, index]
    );
  }, []);

  const handleSubmitVerdict = useCallback(
    (verdict: VerdictType) => {
      setSelectedVerdict(verdict);
      setPhase("verdict");
      if (verdict === currentCase.correctVerdict) {
        setCorrectCount((c) => c + 1);
      }
    },
    [currentCase]
  );

  const handleNextCase = useCallback(() => {
    if (isLastCase) {
      setPhase("result-final");
    } else {
      setCaseIndex((i) => i + 1);
      setPhase("investigate");
      setOpenedClues([]);
      setSelectedVerdict(null);
    }
  }, [isLastCase]);

  // 1. Overview Screen (Before starting, standard page with Navbar & Footer)
  if (phase === "overview") {
    return (
      <div className="bg-[#faf8f5] min-h-screen font-sans relative selection:bg-emerald-100 selection:text-emerald-900 py-10 sm:py-14">
        {/* Subtle Diamond Pattern Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035] z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22 0 L44 22 L22 44 L0 22 Z' fill='none' stroke='%23000' stroke-width='1.5'/%3E%3C/svg%3E")`,
            backgroundSize: "36px 36px",
          }}
        />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-left animate-fadeIn">
          {/* Back Button */}
          <Link
            href="/permainan"
            className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-slate-900 mb-6 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Hub Permainan</span>
          </Link>

          {/* Overview Quest Card */}
          <div className="bg-[#fffbeb] border-[3.5px] border-amber-500 rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden relative space-y-6">
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[28px] border-l-[28px] border-t-amber-500 border-l-transparent pointer-events-none" />

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center border-b border-amber-900/10 pb-6">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-amber-100/70 border-2 border-amber-300 flex items-center justify-center p-3 shrink-0 shadow-sm">
                <Image
                  src="/assets/hero_section/edukasi.webp"
                  alt="Detektif Informasi"
                  fill
                  unoptimized
                  className="object-contain p-2"
                />
              </div>

              <div className="space-y-2">
                <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-600 text-white">
                  LITERASI DIGITAL • 5 KASUS MEDSOS
                </span>
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Detektif Informasi
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Peta investigasi interaktif untuk menganalisis kebenaran postingan viral media sosial, mengumpulkan bukti forensik digital, dan memutuskan kesimpulan faktanya.
                </p>
              </div>
            </div>

            {/* Game Rules */}
            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-950 font-medium space-y-1.5">
              <span className="font-extrabold block text-amber-900 uppercase tracking-wide text-xs">
                Cara Bermain:
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Amati postingan medsos viral di sebelah kiri meja kerja.</li>
                <li>Buka berkas bukti digital satu per satu untuk menemukan petunjuk forensik.</li>
                <li>Tentukan kesimpulan: <strong>TERPERCAYA</strong>, <strong>PERLU VERIFIKASI</strong>, atau <strong>MENYESATKAN</strong>.</li>
                <li>Kunci kesimpulanmu dan pelajari debrief investigasi ilmiah resminya.</li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleStartGame}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-xl bg-[#facc15] hover:bg-[#fde047] border-b-[4px] border-[#ca8a04] active:border-b-0 active:translate-y-1 text-slate-950 font-black text-sm tracking-wide shadow-md transition-all cursor-pointer"
              >
                <span>Mulai Investigasi (Layar Penuh)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Result Final Screen
  if (phase === "result-final") {
    return (
      <GameResultCard
        score={correctCount}
        total={totalCases}
        gameName="Detektif Informasi"
        xp={correctCount >= 4 ? 30 : correctCount >= 2 ? 20 : 15}
        relatedTopicLabel="Tingkatkan Literasi Digital di Repropedia"
        relatedTopicHref="/repropedia"
        playAgainHref="/permainan/detektif"
        onPlayAgain={handleStartGame}
        backHref="/permainan"
      />
    );
  }

  // 3. Fullscreen Investigation Board
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

      {/* Focus Header Bar */}
      <header className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between shrink-0 relative z-10">
        <button
          onClick={() => setPhase("overview")}
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-black text-slate-600 hover:text-slate-900 transition-colors group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-white border-2 border-slate-200 shadow-xs flex items-center justify-center group-hover:border-slate-400 group-hover:bg-slate-50 transition-all">
            <X className="h-4 w-4 text-slate-700" />
          </div>
          <span className="hidden sm:inline">Keluar</span>
        </button>

        {/* Center: Brand logo */}
        <Link href="/beranda" className="flex items-center space-x-1.5">
          <span className="text-2xl sm:text-3xl font-black tracking-tighter text-emerald-700 select-none lowercase">
            sigma<span className="text-amber-500">.</span>
          </span>
        </Link>

        {/* Right: Game Badge */}
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black tracking-wide shadow-xs">
            Detektif Informasi
          </span>
        </div>
      </header>

      {/* Main Investigation Stage */}
      <div className="flex-1 flex flex-col justify-center items-center w-full px-4 sm:px-6 my-auto py-4 sm:py-6 relative z-10">
        <div className="w-full max-w-4xl lg:max-w-5xl mx-auto space-y-4 sm:space-y-6">
          
          {/* Top Investigation HUD */}
          <div className="flex items-center justify-between gap-4 px-2">
            <div className="flex items-center space-x-2 font-black text-xs sm:text-sm text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <span>KASUS {caseIndex + 1} / {totalCases}</span>
            </div>

            {/* Progress Bar */}
            <div className="flex-1 max-w-xs bg-slate-200/80 rounded-full h-2.5 overflow-hidden shadow-inner border border-slate-300/60">
              <div
                className="bg-amber-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Shield Check Counter */}
            <div className="flex items-center space-x-1.5 text-xs sm:text-sm font-black text-amber-900 bg-amber-100/90 border border-amber-300/80 px-3 py-1 rounded-xl shadow-2xs">
              <ShieldCheck className="h-3.5 w-3.5 text-amber-600" />
              <span>{correctCount} TERPECAHKAN</span>
            </div>
          </div>

          {/* Investigation Desk (Split Screen) */}
          <div className="bg-[#fffbeb] border-[3.5px] border-amber-500 rounded-3xl p-5 sm:p-7 shadow-xl relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Left Column: Social Media Evidence Mockup */}
              <div className="lg:col-span-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-900 uppercase tracking-wide flex items-center space-x-1.5">
                    <Search className="w-3.5 h-3.5 text-amber-600" />
                    <span>Barang Bukti Medsos</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    Platform: {currentCase.platform}
                  </span>
                </div>

                <SocialPostMockup post={currentCase.post} platform={currentCase.platform} />
              </div>

              {/* Right Column: Clues or Verdict Phase */}
              <div className="lg:col-span-6 space-y-4">
                {phase === "investigate" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <span className="text-xs font-black text-slate-700 uppercase tracking-wide block">
                        Berkas Petunjuk ({openedClues.length}/{currentCase.clues.length} Terungkap)
                      </span>
                      <div className="space-y-2">
                        {currentCase.clues.map((clue, idx) => (
                          <ClueCard
                            key={`${currentCase.id}-clue-${idx}`}
                            clue={clue}
                            index={idx}
                            isOpen={openedClues.includes(idx)}
                            canOpen={idx === 0 || openedClues.includes(idx - 1)}
                            onOpen={() => handleOpenClue(idx)}
                          />
                        ))}
                      </div>
                    </div>

                    <VerdictSelector
                      onSubmit={handleSubmitVerdict}
                    />
                  </div>
                )}

                {phase === "verdict" && selectedVerdict && (
                  <InvestigationResult
                    correctVerdict={currentCase.correctVerdict}
                    userVerdict={selectedVerdict}
                    conclusion={currentCase.conclusion}
                    relatedTopic={currentCase.relatedTopic}
                    isLast={isLastCase}
                    onNext={handleNextCase}
                  />
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}