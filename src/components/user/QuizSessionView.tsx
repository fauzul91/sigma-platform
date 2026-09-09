"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Clock,
  HelpCircle,
  RefreshCw,
  BookOpen,
  Sparkles,
  ChevronLeft,
  Check,
  Award,
  X
} from "lucide-react";
import { QuizTopic } from "@/data/quizTopics";
import { userService } from "@/services/user/userService";
import { QuizQuestion } from "@/types";

interface QuizSessionViewProps {
  topic: QuizTopic;
}

export default function QuizSessionView({ topic }: QuizSessionViewProps) {
  const router = useRouter();
  const [screen, setScreen] = useState<"overview" | "play" | "results">("overview");

  // Questions state (populated from Supabase or fallback)
  const [questions, setQuestions] = useState(topic.fallbackQuestions);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  // Timer countdown (e.g. 3 minutes = 180 seconds)
  const [secondsRemaining, setSecondsRemaining] = useState(180);

  useEffect(() => {
    userService.getQuizQuestions().then((dbQuestions: QuizQuestion[]) => {
      if (!dbQuestions || dbQuestions.length === 0) return;
      const matched = dbQuestions
        .filter((q) => q.category === topic.slug || topic.aliases?.includes(q.category))
        .map((q) => ({
          id: q.id,
          questionText: q.questionText,
          options: q.options || [],
          correctAnswer: q.correctAnswer ?? 0,
          explanation: q.explanation || "",
        }));

      if (matched.length > 0) {
        setQuestions(matched);
      }
    });
  }, [topic.slug]);

  // Timer countdown effect during play screen
  useEffect(() => {
    if (screen !== "play") return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setScreen("results");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [screen]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")} Min`;
  };

  const handleStartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOptionIdx(null);
    setIsSubmitted(false);
    setCorrectCount(0);
    setSecondsRemaining(180);
    setScreen("play");
  };

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOptionIdx(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIdx === null || isSubmitted) return;
    setIsSubmitted(true);
    const isCorrect = selectedOptionIdx === questions[currentIdx].correctAnswer;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptionIdx(null);
      setIsSubmitted(false);
    } else {
      setScreen("results");
    }
  };

  const handlePrevQuestion = () => {
    if (currentIdx > 0 && !isSubmitted) {
      setCurrentIdx((prev) => prev - 1);
      setSelectedOptionIdx(null);
    }
  };

  const handleExitQuiz = () => {
    if (screen === "play" && !isSubmitted) {
      const confirmExit = window.confirm(
        "Yakin ingin keluar dari kuis? Progres jawaban Anda tidak akan tersimpan."
      );
      if (!confirmExit) return;
    }
    router.push("/kuis");
  };

  const currentQ = questions[currentIdx] || questions[0];
  const progressPercent = Math.round(((currentIdx + 1) / questions.length) * 100);

  return (
    <div className="bg-slate-50/70 min-h-screen flex flex-col font-sans text-slate-800 selection:bg-emerald-100">
      {/* Minimalist Dedicated Quiz Header Bar (Focus Mode Safety Hatch) */}
      <header className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between shrink-0">
        {/* Left: Exit button */}
        <button
          type="button"
          onClick={handleExitQuiz}
          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-center group-hover:border-slate-300 group-hover:bg-slate-50 transition-all">
            <X className="h-4 w-4 text-slate-600" />
          </div>
          <span className="hidden sm:inline">Keluar Kuis</span>
        </button>

        {/* Center: Brand logo */}
        <Link href="/beranda" className="flex items-center space-x-1.5 group">
          <span className="text-2xl sm:text-3xl font-black tracking-tighter text-primary select-none lowercase">
            sigma<span className="text-emerald-500">.</span>
          </span>
        </Link>

        {/* Right: Topic Badge */}
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">
            Mode Kuis
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-100/70 text-emerald-800 text-[11px] font-extrabold border border-emerald-200/60">
            {topic.shortTitle}
          </span>
        </div>
      </header>

      {/* Main Content Area: Centered vertically in remaining height */}
      <div className="flex-1 flex flex-col justify-center items-center w-full px-4 sm:px-6 pb-6 sm:pb-8">
        {/* ================================================================ */}
        {/* SCREEN 1: PRE-QUIZ OVERVIEW (ELEGAN & MINIMALIS, TIDAK AI SLOP)   */}
        {/* ================================================================ */}
        {screen === "overview" && (
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 my-auto py-2 sm:py-4">

          {/* Main Card Container */}
          <div className="border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm bg-white">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">
              
              {/* Left Visual Illustration Thumbnail */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 lg:w-60 lg:h-60 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-center p-5">
                  <Image
                    src={topic.image}
                    alt={topic.title}
                    fill
                    unoptimized
                    className="object-contain filter drop-shadow-sm p-3"
                  />
                </div>
              </div>

              {/* Right Content & Parameter Specs */}
              <div className="md:col-span-7 space-y-5 text-left">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-wider border border-emerald-200/60 mb-2">
                    {topic.categoryName}
                  </span>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                    {topic.title}
                  </h1>
                  <p className="text-sm lg:text-base text-slate-600 font-medium leading-relaxed mt-2">
                    {topic.description}
                  </p>
                </div>

                {/* Minimalist Specs */}
                <div className="grid grid-cols-3 gap-3 py-3.5 border-y border-slate-100">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wide">
                      Jumlah Soal
                    </span>
                    <span className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-800 mt-0.5 block">
                      {questions.length} Pertanyaan
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wide">
                      Estimasi
                    </span>
                    <span className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-800 mt-0.5 block">
                      {topic.duration}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wide">
                      Tipe
                    </span>
                    <span className="text-sm sm:text-base lg:text-lg font-extrabold text-slate-800 mt-0.5 block">
                      Pilihan Ganda
                    </span>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-1 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={handleStartQuiz}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-primary hover:bg-emerald-700 text-white text-sm lg:text-base font-bold shadow-sm hover:shadow-md active:scale-98 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Mulai Kuis Sekarang</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <span className="text-xs text-slate-400 font-medium">
                    Santai &amp; tidak ada penalti nilai salah
                  </span>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

      {/* ================================================================ */}
      {/* SCREEN 2: ACTIVE QUIZ PLAY (OPTIMIZED VIEWPORT FIT FOR LAPTOPS)   */}
      {/* ================================================================ */}
      {screen === "play" && (
        <div className="w-full max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 my-auto py-3 sm:py-5 lg:py-6">
          
          {/* Outer Quiz Card: Balanced padding and spacing so next button stays in view */}
          <div className="border border-slate-200/90 rounded-3xl p-5 sm:p-7 lg:p-9 shadow-sm bg-white space-y-4 sm:space-y-6">
            
            {/* Top Bar: Title, Progress Bar %, and Timer Clock */}
            <div className="flex items-center justify-between gap-3 sm:gap-6 pb-3.5 sm:pb-4 border-b border-slate-100">
              
              {/* Category Info */}
              <div className="shrink-0">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-none">
                  {topic.shortTitle}
                </h3>
                <span className="text-[11px] sm:text-xs text-slate-400 font-medium block mt-1">
                  Pertanyaan {currentIdx + 1} dari {questions.length}
                </span>
              </div>

              {/* Center Progress Bar with percentage */}
              <div className="flex-1 max-w-xs sm:max-w-sm mx-3 sm:mx-6 w-full hidden sm:block">
                <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold text-slate-400 mb-1">
                  <span>Progres Belajar</span>
                  <span className="text-emerald-700 font-extrabold">{progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-300 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Right: Timer Countdown Clock */}
              <div className="flex items-center space-x-1.5 text-xs sm:text-sm font-extrabold text-slate-700 bg-slate-50 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl border border-slate-200/80 shrink-0 shadow-2xs">
                <Clock className="h-3.5 w-3.5 text-emerald-600" />
                <span>{formatTimer(secondsRemaining)}</span>
              </div>

            </div>

            {/* Question Text Area */}
            <div className="space-y-1 sm:space-y-1.5">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-700">
                Pertanyaan {currentIdx + 1}
              </span>
              <h2 className="text-base sm:text-lg lg:text-2xl font-black text-slate-900 leading-snug tracking-tight">
                {currentQ.questionText}
              </h2>
            </div>

            {/* Option Cards: 2-column grid on desktop/laptop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 sm:gap-3 lg:gap-3.5">
              {currentQ.options.map((option, idx) => {
                const letter = String.fromCharCode(65 + idx); // A, B, C, D
                const isSelected = selectedOptionIdx === idx;
                const isCorrect = idx === currentQ.correctAnswer;

                let cardStyle = "border-slate-200 bg-white hover:border-emerald-400 hover:bg-emerald-50/20 text-slate-800 shadow-2xs hover:shadow-xs";
                let letterStyle = "bg-slate-100 text-slate-600 border-slate-200";

                if (isSubmitted) {
                  if (isCorrect) {
                    cardStyle = "border-emerald-600 bg-emerald-50/60 text-emerald-950 font-bold ring-2 ring-emerald-500/20 shadow-xs";
                    letterStyle = "bg-emerald-600 text-white border-emerald-600";
                  } else if (isSelected && !isCorrect) {
                    cardStyle = "border-rose-500 bg-rose-50/60 text-rose-950 ring-2 ring-rose-500/20 shadow-xs";
                    letterStyle = "bg-rose-600 text-white border-rose-600";
                  } else {
                    cardStyle = "border-slate-100 bg-white text-slate-400 opacity-50";
                  }
                } else if (isSelected) {
                  cardStyle = "border-emerald-600 bg-emerald-50/30 text-emerald-950 font-bold ring-2 ring-emerald-500/20 shadow-xs";
                  letterStyle = "bg-primary text-white border-emerald-700";
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-3.5 sm:p-4 lg:p-4.5 rounded-xl sm:rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer text-xs sm:text-sm lg:text-base font-medium ${cardStyle}`}
                  >
                    {/* Left Letter Badge (A, B, C, D) */}
                    <div className="flex items-center space-x-3 sm:space-x-3.5 min-w-0">
                      <span
                        className={`w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center font-black text-xs sm:text-sm shrink-0 border transition-colors ${letterStyle}`}
                      >
                        {letter}
                      </span>
                      <span className="leading-snug break-words">{option}</span>
                    </div>

                    {/* Right Radio Indicator */}
                    <div className="shrink-0 pl-1">
                      {isSubmitted ? (
                        isCorrect ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        ) : isSelected ? (
                          <XCircle className="h-5 w-5 text-rose-600" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-300" />
                        )
                      ) : (
                        <div
                          className={`w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected
                              ? "border-emerald-600 bg-emerald-600"
                              : "border-slate-300"
                          }`}
                        >
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation Box (Revealed after answer submitted) */}
            {isSubmitted && (
              <div className="p-3.5 sm:p-4 lg:p-4.5 rounded-xl sm:rounded-2xl bg-emerald-50/50 border border-emerald-200/70 animate-in fade-in duration-200 space-y-1">
                <div className="flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-emerald-900">
                  <Sparkles className="h-4 w-4 text-emerald-700" />
                  <span>Penjelasan Edukasi:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Bottom Navigation Bar */}
            <div className="pt-3.5 sm:pt-4 lg:pt-5 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrevQuestion}
                disabled={currentIdx === 0 || isSubmitted}
                className={`inline-flex items-center space-x-1.5 px-3.5 sm:px-4 lg:px-5 py-2 sm:py-2.5 lg:py-3 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                  currentIdx > 0 && !isSubmitted
                    ? "border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
                    : "border-slate-100 text-slate-300 cursor-not-allowed opacity-40"
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Sebelumnya</span>
              </button>

              {!isSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmitAnswer}
                  disabled={selectedOptionIdx === null}
                  className={`px-5 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wide transition-all ${
                    selectedOptionIdx !== null
                      ? "bg-primary hover:bg-emerald-700 text-white shadow-sm hover:shadow-md active:scale-98 cursor-pointer"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  Kunci Jawaban
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-5 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-xl bg-primary hover:bg-emerald-700 text-white text-xs sm:text-sm font-extrabold uppercase tracking-wide shadow-sm hover:shadow-md active:scale-98 transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>
                    {currentIdx + 1 < questions.length
                      ? "Pertanyaan Berikutnya"
                      : "Selesai & Lihat Hasil"}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>

          </div>

        </div>
      )}

      {/* ================================================================ */}
      {/* SCREEN 3: RESULTS SUMMARY (MINIMALIS & JELAS)                     */}
      {/* ================================================================ */}
      {screen === "results" && (
        <div className="w-full max-w-xl mx-auto px-4 sm:px-6 my-auto py-6 sm:py-8 lg:py-10">
          <div className="border border-slate-200/90 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm bg-white text-center space-y-6">
            
            {/* Score Badge */}
            <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
              <Award className="h-8 w-8 lg:h-10 lg:w-10" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                Kuis Selesai
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                {correctCount === questions.length
                  ? "Sempurna! Semua Jawaban Tepat 🎉"
                  : "Bagus Sekali, Terus Berlatih! 👍"}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium">
                Kuis: {topic.title}
              </p>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 gap-3 py-4 border-y border-slate-100 text-center">
              <div className="p-3.5 sm:p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 block uppercase tracking-wide">
                  Jawaban Benar
                </span>
                <span className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 mt-0.5 block">
                  {correctCount} <span className="text-sm font-semibold text-slate-400">/ {questions.length}</span>
                </span>
              </div>
              <div className="p-3.5 sm:p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] sm:text-xs font-bold text-slate-400 block uppercase tracking-wide">
                  Tingkat Akurasi
                </span>
                <span className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-600 mt-0.5 block">
                  {Math.round((correctCount / questions.length) * 100)}%
                </span>
              </div>
            </div>

            {/* Reading Recommendation */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-1.5">
              <div className="flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-slate-800">
                <BookOpen className="h-4 w-4 text-emerald-600" />
                <span>Rekomendasi Modul Repropedia:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Ingin memperdalam topik ini? Buka modul panduan resmi di Repropedia:
              </p>
              <Link
                href="/repropedia"
                className="inline-flex items-center space-x-1 text-xs sm:text-sm font-bold text-primary hover:underline pt-1"
              >
                <span>Buka Buku Panduan Repropedia</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleStartQuiz}
                className="flex-1 py-3 sm:py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-1.5 active:scale-98 cursor-pointer"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Ulangi Kuis</span>
              </button>
              <Link
                href="/kuis"
                className="flex-1 py-3 sm:py-3.5 rounded-xl bg-primary hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center space-x-1.5 shadow-sm active:scale-98"
              >
                <span>Pilih Kuis Lain</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>
        </div>
      )}

      </div>
    </div>
  );
}
