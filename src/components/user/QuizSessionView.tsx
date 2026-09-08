"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  Award
} from "lucide-react";
import { QuizTopic } from "@/data/quizTopics";
import { userService } from "@/services/user/userService";
import { QuizQuestion } from "@/types";

interface QuizSessionViewProps {
  topic: QuizTopic;
}

export default function QuizSessionView({ topic }: QuizSessionViewProps) {
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

  const currentQ = questions[currentIdx] || questions[0];
  const progressPercent = Math.round(((currentIdx + 1) / questions.length) * 100);

  return (
    <div className="bg-white min-h-screen font-sans text-slate-800">
      
      {/* ================================================================ */}
      {/* SCREEN 1: PRE-QUIZ OVERVIEW (ELEGAN & MINIMALIS, TIDAK AI SLOP)   */}
      {/* ================================================================ */}
      {screen === "overview" && (
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-10 md:py-16">
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <Link
              href="/kuis"
              className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali ke Daftar Kuis</span>
            </Link>
          </div>

          {/* Main Card Container */}
          <div className="border border-slate-200/90 rounded-3xl p-6 sm:p-10 md:p-12 shadow-xs bg-white">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-center">
              
              {/* Left Visual Illustration Thumbnail */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-center p-6">
                  <Image
                    src={topic.image}
                    alt={topic.title}
                    fill
                    unoptimized
                    className="object-contain filter drop-shadow-sm p-4"
                  />
                </div>
              </div>

              {/* Right Content & Parameter Specs */}
              <div className="md:col-span-7 space-y-6 text-left">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-bold uppercase tracking-wider border border-emerald-200/60 mb-2">
                    {topic.categoryName}
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {topic.title}
                  </h1>
                  <p className="text-sm text-slate-600 font-medium leading-relaxed mt-2.5">
                    {topic.description}
                  </p>
                </div>

                {/* Minimalist Specs (Tanpa badge spam) */}
                <div className="grid grid-cols-3 gap-3 py-4 border-y border-slate-100">
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wide">
                      Jumlah Soal
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-800 mt-0.5 block">
                      {questions.length} Pertanyaan
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wide">
                      Estimasi
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-800 mt-0.5 block">
                      {topic.duration}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wide">
                      Tipe
                    </span>
                    <span className="text-sm sm:text-base font-extrabold text-slate-800 mt-0.5 block">
                      Pilihan Ganda
                    </span>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-1 flex flex-col sm:flex-row items-center gap-4">
                  <button
                    onClick={handleStartQuiz}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-primary hover:bg-emerald-700 text-white text-sm font-bold shadow-sm hover:shadow-md active:scale-98 transition-all flex items-center justify-center space-x-2"
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
      {/* SCREEN 2: ACTIVE QUIZ PLAY (INSPIRED BY REFERENCE 2 & 3)          */}
      {/* ================================================================ */}
      {screen === "play" && (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          
          {/* Outer Quiz Card (No purple background, clean white with crisp border) */}
          <div className="border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs bg-white space-y-8">
            
            {/* Top Bar: Title, Progress Bar %, and Timer Clock (Inspired by Image 2 & 3) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              
              {/* Category Info */}
              <div>
                <h3 className="font-extrabold text-base text-slate-900 leading-none">
                  {topic.shortTitle}
                </h3>
                <span className="text-xs text-slate-400 font-medium block mt-1">
                  Pertanyaan {currentIdx + 1} dari {questions.length}
                </span>
              </div>

              {/* Center Progress Bar with percentage */}
              <div className="flex-1 max-w-xs mx-auto sm:mx-6 w-full">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 mb-1.5">
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

              {/* Right: Timer Countdown Clock (Inspired by Image 2) */}
              <div className="flex items-center space-x-2 text-xs font-extrabold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80 shrink-0 self-start sm:self-auto">
                <Clock className="h-3.5 w-3.5 text-emerald-600" />
                <span>{formatTimer(secondsRemaining)}</span>
              </div>

            </div>

            {/* Question Text Area */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Pertanyaan {currentIdx + 1}
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                {currentQ.questionText}
              </h2>
            </div>

            {/* Option Cards (Inspired by Image 2 & 3 with A, B, C, D badges) */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const letter = String.fromCharCode(65 + idx); // A, B, C, D
                const isSelected = selectedOptionIdx === idx;
                const isCorrect = idx === currentQ.correctAnswer;

                let cardStyle = "border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50/50 text-slate-800";
                let letterStyle = "bg-slate-100 text-slate-600 border-slate-200";

                if (isSubmitted) {
                  if (isCorrect) {
                    cardStyle = "border-emerald-600 bg-emerald-50/60 text-emerald-950 font-bold ring-2 ring-emerald-500/20";
                    letterStyle = "bg-emerald-600 text-white border-emerald-600";
                  } else if (isSelected && !isCorrect) {
                    cardStyle = "border-rose-500 bg-rose-50/60 text-rose-950 ring-2 ring-rose-500/20";
                    letterStyle = "bg-rose-600 text-white border-rose-600";
                  } else {
                    cardStyle = "border-slate-100 bg-white text-slate-400 opacity-50";
                  }
                } else if (isSelected) {
                  cardStyle = "border-emerald-600 bg-emerald-50/30 text-emerald-950 font-bold ring-2 ring-emerald-500/20 shadow-2xs";
                  letterStyle = "bg-primary text-white border-emerald-700";
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 cursor-pointer text-sm font-medium ${cardStyle}`}
                  >
                    {/* Left Letter Badge (A, B, C, D like Image 3) */}
                    <div className="flex items-center space-x-3.5">
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shrink-0 border transition-colors ${letterStyle}`}
                      >
                        {letter}
                      </span>
                      <span className="leading-snug">{option}</span>
                    </div>

                    {/* Right Radio Indicator */}
                    <div className="shrink-0 pl-2">
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
                          className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
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
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/70 animate-in fade-in duration-200 space-y-1">
                <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-900">
                  <Sparkles className="h-4 w-4 text-emerald-700" />
                  <span>Penjelasan Edukasi:</span>
                </div>
                <p className="text-xs text-slate-700 font-medium leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Bottom Navigation Bar (Inspired by Image 2: Previous, Next, Submit) */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrevQuestion}
                disabled={currentIdx === 0 || isSubmitted}
                className={`inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
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
                  className={`px-6 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wide transition-all ${
                    selectedOptionIdx !== null
                      ? "bg-primary hover:bg-emerald-700 text-white shadow-sm active:scale-98 cursor-pointer"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  Kunci Jawaban
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-primary hover:bg-emerald-700 text-white text-xs font-extrabold uppercase tracking-wide shadow-sm hover:shadow-md active:scale-98 transition-all flex items-center space-x-1.5 cursor-pointer"
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
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs bg-white text-center space-y-6">
            
            {/* Score Badge */}
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-200">
              <Award className="h-8 w-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                Kuis Selesai
              </span>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-2">
                {correctCount === questions.length
                  ? "Sempurna! Semua Jawaban Tepat 🎉"
                  : "Bagus Sekali, Terus Berlatih! 👍"}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Kuis: {topic.title}
              </p>
            </div>

            {/* Score Grid */}
            <div className="grid grid-cols-2 gap-3 py-4 border-y border-slate-100 text-center">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wide">
                  Jawaban Benar
                </span>
                <span className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5 block">
                  {correctCount} <span className="text-sm font-semibold text-slate-400">/ {questions.length}</span>
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wide">
                  Tingkat Akurasi
                </span>
                <span className="text-xl sm:text-2xl font-black text-emerald-600 mt-0.5 block">
                  {Math.round((correctCount / questions.length) * 100)}%
                </span>
              </div>
            </div>

            {/* Reading Recommendation */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left space-y-1.5">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-800">
                <BookOpen className="h-4 w-4 text-emerald-600" />
                <span>Rekomendasi Modul Repropedia:</span>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Ingin memperdalam topik ini? Buka modul panduan resmi di Repropedia:
              </p>
              <Link
                href="/repropedia"
                className="inline-flex items-center space-x-1 text-xs font-bold text-primary hover:underline pt-1"
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
                className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-all flex items-center justify-center space-x-1.5 active:scale-98"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Ulangi Kuis Ini</span>
              </button>

              <Link
                href="/kuis"
                className="flex-1 py-3 rounded-xl bg-primary hover:bg-emerald-700 text-white font-bold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-sm active:scale-98"
              >
                <span>Daftar Kuis Lainnya</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
