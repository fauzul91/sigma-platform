"use client";

import React, { useState } from "react";
import { HelpCircle, CheckCircle2, AlertCircle, RefreshCw, Award, ArrowRight, BookOpen } from "lucide-react";
import { quizQuestions, QuizQuestion } from "@/data/mockData";

export default function KuisPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQuestion: QuizQuestion = quizQuestions[currentIdx];
  const totalQuestions = quizQuestions.length;
  const progressPercent = Math.round(((currentIdx) / totalQuestions) * 100);
  const finalPercent = Math.round(((currentIdx + 1) / totalQuestions) * 100);

  const handleOptionClick = (optIdx: number) => {
    if (isSubmitted) return; // Lock options after submitting
    setSelectedOpt(optIdx);
  };

  const handleSubmit = () => {
    if (selectedOpt === null || isSubmitted) return;
    
    setIsSubmitted(true);
    if (selectedOpt === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < totalQuestions) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsSubmitted(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12 flex items-center">
      <div className="max-w-xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        
        {/* QUIZ FINISHED RESULTS SCREEN */}
        {quizFinished ? (
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-primary">
              <Award className="h-10 w-10 animate-bounce" />
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-extrabold text-primary bg-emerald-50 px-2.5 py-1 rounded uppercase tracking-wider">
                Hasil Akhir Kuis
              </span>
              <h1 className="text-2xl font-extrabold text-neutral-dark">Selamat! Kamu Selesai Belajar</h1>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-normal">
                Uji pemahamanmu membantu menguatkan literasi kesehatan reproduksi remaja dan pencegahan nikah dini.
              </p>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 max-w-xs mx-auto">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Skor Kamu</p>
              <h2 className="text-4xl font-extrabold text-neutral-dark mt-1">
                {score} <span className="text-slate-400 text-lg font-bold">/ {totalQuestions}</span>
              </h2>
              <p className="text-[11px] text-primary font-bold mt-2">
                {score === totalQuestions 
                  ? "Luar Biasa! Pemahaman Sempurna" 
                  : score >= totalQuestions / 2 
                    ? "Hebat! Pemahaman Cukup Baik" 
                    : "Terus Belajar di Repropedia!"}
              </p>
            </div>

            <div className="flex gap-4 max-w-xs mx-auto pt-4">
              <button
                onClick={handleReset}
                className="flex-1 py-3.5 rounded-xl border border-slate-200 text-neutral-dark font-extrabold text-xs hover:bg-slate-50 transition-all flex items-center justify-center space-x-2 active:scale-98"
              >
                <RefreshCw className="h-4 w-4 text-slate-400" />
                <span>Ulangi Kuis</span>
              </button>
              
              <a
                href="/repropedia"
                className="flex-1 py-3.5 rounded-xl bg-primary text-white font-extrabold text-xs hover:bg-primary-hover transition-all flex items-center justify-center space-x-1.5 active:scale-98 shadow-md shadow-emerald-600/10"
              >
                <BookOpen className="h-4 w-4" />
                <span>Baca Modul</span>
              </a>
            </div>
          </div>
        ) : (
          
          /* QUIZ INTERACTIVE QUESTION SCREEN */
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden animate-in fade-in duration-300">
            
            {/* Real-time Progress Bar */}
            <div className="w-full h-1.5 bg-slate-100">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${isSubmitted ? finalPercent : progressPercent}%` }}
              />
            </div>

            <div className="p-6 md:p-8 space-y-6">
              
              {/* Card Header metadata */}
              <div className="flex justify-between items-center">
                <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-primary text-[10px] font-extrabold uppercase tracking-wide">
                  {currentQuestion.category}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  Pertanyaan {currentIdx + 1} dari {totalQuestions}
                </span>
              </div>

              {/* Question Text */}
              <h2 className="text-base md:text-lg font-bold text-neutral-dark leading-snug">
                {currentQuestion.questionText}
              </h2>

              {/* Option Selection List */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((option, idx) => {
                  
                  // Style modifiers after submission
                  let optionStyle = "border-slate-200 bg-white text-slate-700 hover:bg-slate-50/50";
                  let prefixStyle = "bg-slate-100 text-slate-500";
                  
                  if (!isSubmitted) {
                    if (selectedOpt === idx) {
                      optionStyle = "border-primary bg-emerald-50/30 text-primary";
                      prefixStyle = "bg-primary text-white";
                    }
                  } else {
                    if (idx === currentQuestion.correctAnswer) {
                      optionStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-800 font-semibold";
                      prefixStyle = "bg-emerald-500 text-white";
                    } else if (selectedOpt === idx) {
                      optionStyle = "border-red-500 bg-red-500/10 text-red-800";
                      prefixStyle = "bg-red-500 text-white";
                    } else {
                      optionStyle = "border-slate-100 bg-slate-50/30 text-slate-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionClick(idx)}
                      disabled={isSubmitted}
                      className={`w-full p-4 rounded-2xl border text-left text-xs font-semibold flex items-start space-x-3.5 transition-all ${optionStyle}`}
                    >
                      <span className={`h-6 w-6 rounded-full shrink-0 flex items-center justify-center text-[11px] font-extrabold ${prefixStyle}`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="mt-0.5 leading-snug">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Answer submission action triggers */}
              {!isSubmitted ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedOpt === null}
                  className={`w-full py-3.5 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center space-x-1.5 shadow-sm active:scale-98 ${
                    selectedOpt !== null
                      ? "bg-primary text-white hover:bg-primary-hover cursor-pointer"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <CheckCircle2 className="h-4.5 w-4.5" />
                  <span>Kirim Jawaban</span>
                </button>
              ) : (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-3 duration-300">
                  
                  {/* Visual alert check */}
                  <div className={`p-4 rounded-2xl flex items-start space-x-3 text-xs ${
                    selectedOpt === currentQuestion.correctAnswer 
                      ? "bg-emerald-50 text-emerald-800" 
                      : "bg-red-50 text-red-800"
                  }`}>
                    {selectedOpt === currentQuestion.correctAnswer ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <h4 className="font-extrabold uppercase tracking-wide">
                        {selectedOpt === currentQuestion.correctAnswer ? "Jawaban Benar!" : "Jawaban Kurang Tepat"}
                      </h4>
                      <p className="text-[11px] leading-relaxed font-semibold">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full py-3.5 rounded-xl bg-neutral-dark text-white font-extrabold text-xs hover:bg-slate-800 transition-all flex items-center justify-center space-x-1.5 shadow-sm active:scale-98"
                  >
                    <span>{currentIdx + 1 === totalQuestions ? "Lihat Hasil Kuis" : "Lanjutkan Kuis"}</span>
                    <ArrowRight className="h-4.5 w-4.5" />
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
