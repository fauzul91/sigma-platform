"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Sparkles, ArrowRight, ArrowLeft, Clock, Compass, Layers } from "lucide-react";
import { getShuffledMyths, MythItem } from "@/data/mythsData";
import { useGameFullscreen } from "@/context/GameFullscreenContext";
import MythCard from "./MythCard";
import MythFeedback from "./MythFeedback";
import SwipeControls from "./SwipeControls";
import GameResultCard from "../GameResultCard";

type GamePhase = "overview" | "playing" | "feedback" | "result";

export default function MythOrFactGameView() {
  const [cards, setCards] = useState<MythItem[]>(() => getShuffledMyths(10));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<GamePhase>("overview");
  const [userAnswer, setUserAnswer] = useState<"myth" | "fact" | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  const { setIsFullscreenGame } = useGameFullscreen();

  // Fullscreen only when playing, feedback, or results
  useEffect(() => {
    const isFullscreen = phase === "playing" || phase === "feedback" || phase === "result";
    setIsFullscreenGame(isFullscreen);
  }, [phase, setIsFullscreenGame]);

  useEffect(() => {
    return () => {
      setIsFullscreenGame(false);
    };
  }, [setIsFullscreenGame]);

  const answeredRef = useRef(false);

  const currentCard = cards[currentIndex];
  const totalCards = cards.length;
  const isLastCard = currentIndex === totalCards - 1;
  const progressPercent = Math.round(((currentIndex + (phase === "feedback" ? 1 : 0)) / totalCards) * 100);

  const handleStartGame = () => {
    setCards(getShuffledMyths(10));
    setCurrentIndex(0);
    setUserAnswer(null);
    setCorrectCount(0);
    answeredRef.current = false;
    setPhase("playing");
  };

  const handleAnswer = useCallback(
    (answer: "myth" | "fact") => {
      if (answeredRef.current || phase !== "playing" || !currentCard) return;
      answeredRef.current = true;

      const isCorrect = answer === currentCard.answer;
      setUserAnswer(answer);
      setPhase("feedback");

      if (isCorrect) {
        setCorrectCount((c) => c + 1);
      }
    },
    [currentCard, phase]
  );

  const handleNext = useCallback(() => {
    answeredRef.current = false;
    setUserAnswer(null);

    if (isLastCard) {
      setPhase("result");
    } else {
      setCurrentIndex((i) => i + 1);
      setPhase("playing");
    }
  }, [isLastCard]);

  // 1. Overview Screen (Before starting game, regular page with Navbar & Footer)
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
          <div className="bg-[#fffbeb] border-[3.5px] border-emerald-600 rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden relative space-y-6">
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[28px] border-l-[28px] border-t-emerald-600 border-l-transparent pointer-events-none" />

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center border-b border-amber-900/10 pb-6">
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-emerald-100/70 border-2 border-emerald-300 flex items-center justify-center p-3 shrink-0 shadow-sm">
                <Image
                  src="/assets/hero_section/quiz.webp"
                  alt="Mitos atau Fakta"
                  fill
                  unoptimized
                  className="object-contain p-2"
                />
              </div>

              <div className="space-y-2">
                <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-700 text-white">
                  REFLEKSI CEPAT • 10 KARTU
                </span>
                <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Mitos atau Fakta?
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                  Tantangan interaktif untuk menguji seberapa jeli kamu membedakan mitos populer dan fakta medis seputar pubertas dan kesehatan reproduksi.
                </p>
              </div>
            </div>

            {/* Game Rules */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-xs sm:text-sm text-emerald-950 font-medium space-y-1.5">
              <span className="font-extrabold block text-emerald-900 uppercase tracking-wide text-xs">
                Cara Bermain:
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-700">
                <li>Baca pernyataan yang muncul pada kartu.</li>
                <li>Pilih tombol <strong>MITOS</strong> (atau geser kiri) jika menurutmu pernyataan itu keliru.</li>
                <li>Pilih tombol <strong>FAKTA</strong> (atau geser kanan) jika menurutmu pernyataan itu benar.</li>
                <li>Setiap kartu akan dilengkapi penjelasan ilmiah yang tervalidasi.</li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleStartGame}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2.5 px-8 py-3.5 rounded-xl bg-[#facc15] hover:bg-[#fde047] border-b-[4px] border-[#ca8a04] active:border-b-0 active:translate-y-1 text-slate-950 font-black text-sm tracking-wide shadow-md transition-all cursor-pointer"
              >
                <span>Mulai Permainan (Layar Penuh)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Result Screen
  if (phase === "result") {
    return (
      <GameResultCard
        score={correctCount}
        total={totalCards}
        gameName="Mitos atau Fakta?"
        xp={correctCount >= 8 ? 30 : correctCount >= 5 ? 20 : 15}
        relatedTopicLabel="Pelajari Fakta Lengkap di Repropedia"
        relatedTopicHref="/repropedia"
        playAgainHref="/permainan/mitos-fakta"
        onPlayAgain={handleStartGame}
        backHref="/permainan"
      />
    );
  }

  // 3. Fullscreen Gameplay (Playing & Feedback)
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

        {/* Right: Game Title */}
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-black tracking-wide shadow-xs">
            Mitos atau Fakta?
          </span>
        </div>
      </header>

      {/* Main Game Stage */}
      <div className="flex-1 flex flex-col justify-center items-center w-full px-4 sm:px-6 my-auto py-4 sm:py-6 relative z-10">
        <div className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6">
          
          {/* Game HUD */}
          <div className="flex items-center justify-between gap-4 px-2">
            <div className="flex items-center space-x-2 font-black text-xs sm:text-sm text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>KARTU {currentIndex + 1} / {totalCards}</span>
            </div>

            {/* Smooth Progress Bar */}
            <div className="flex-1 max-w-xs bg-slate-200/80 rounded-full h-2.5 overflow-hidden shadow-inner border border-slate-300/60">
              <div
                className="bg-emerald-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Score Counter */}
            <div className="flex items-center space-x-1.5 text-xs sm:text-sm font-black text-emerald-800 bg-emerald-100/90 border border-emerald-300/80 px-3 py-1 rounded-xl shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              <span>{correctCount} TEPAT</span>
            </div>
          </div>

          {/* Phase: Interactive Swiping Deck */}
          {phase === "playing" && (
            <div className="space-y-4">
              <MythCard
                statement={currentCard.statement}
                category={currentCard.category}
                cardNumber={currentIndex + 1}
                totalCards={totalCards}
                onSwipe={handleAnswer}
              />
              <SwipeControls onAnswer={handleAnswer} />
            </div>
          )}

          {/* Phase: Feedback Card */}
          {phase === "feedback" && userAnswer !== null && (
            <MythFeedback
              item={currentCard}
              userAnswer={userAnswer}
              cardNumber={currentIndex + 1}
              totalCards={totalCards}
              isLast={isLastCard}
              onNext={handleNext}
            />
          )}

        </div>
      </div>
    </div>
  );
}