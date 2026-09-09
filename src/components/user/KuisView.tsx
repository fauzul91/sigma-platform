"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, HelpCircle, BookOpen } from "lucide-react";
import { QUIZ_TOPICS } from "@/data/quizTopics";
import PageHeader from "@/components/shared/PageHeader";

export default function KuisView() {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 1. Page Header (Standard Clean Green Header) */}
      <PageHeader
        title="KUIS EDUKASI"
        description="Pilih topik materi kuis interaktif untuk menguji dan memperdalam pemahaman kesehatan reproduksi, hak anak, dan batasan diri secara santai dan menyenangkan."
        badge="KUIS INTERAKTIF"
        type="kuis"
      />

      {/* 2. Main Content Container (Clean White Background, No Motifs) */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-10 sm:py-14">

        {/* Section Intro with Mascot (Inspired by Reference Image 1) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 mb-8 border-b border-slate-100">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Pilihan Topik Kuis
            </h2>
            <p className="text-sm text-slate-600 font-medium leading-relaxed">
              Jelajahi beragam kategori materi edukasi melalui kuis interaktif ramah remaja. Setiap kuis dilengkapi pembahasan ilmiah yang mudah dipahami.
            </p>
          </div>

          {/* Clean Mascot Illustration on the right (Inspired by Image 1) */}
          <div className="hidden md:flex items-center space-x-3 shrink-0">
            <div className="relative w-20 h-20">
              <Image
                src="/assets/hero_section/quiz.webp"
                alt="Maskot Kuis SIGMA"
                fill
                unoptimized
                className="object-contain filter drop-shadow-sm"
              />
            </div>
            <div className="text-xs font-bold text-emerald-800 bg-emerald-50/80 border border-emerald-200/80 px-3.5 py-2 rounded-2xl max-w-[160px] leading-snug">
              Siap uji wawasanmu hari ini? 👋
            </div>
          </div>
        </div>

        {/* 3. Horizontal Grid Cards (Inspired by Reference Image 1) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {QUIZ_TOPICS.map((topic) => (
            <div
              key={topic.id}
              className="group border border-slate-200/90 hover:border-emerald-400 rounded-3xl p-5 sm:p-6 bg-white shadow-xs hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-5 items-stretch justify-between"
            >
              {/* Left Side: Dedicated Visual Illustration Thumbnail */}
              <div className="sm:w-44 h-36 sm:h-auto rounded-2xl bg-emerald-50/60 border border-emerald-100/80 flex items-center justify-center p-4 relative overflow-hidden shrink-0 group-hover:bg-emerald-50 transition-colors">
                <Image
                  src={topic.image}
                  alt={topic.title}
                  fill
                  unoptimized
                  className="object-contain filter drop-shadow-sm p-3 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Right Side: Title, Description, Minimal Specs & Action Button */}
              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                    {topic.categoryName}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-3">
                    {topic.description}
                  </p>
                </div>

                {/* Footer: Specs & Start Quiz Link Button */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center space-x-3 text-[11px] font-bold text-slate-400">
                    <span className="flex items-center space-x-1">
                      <HelpCircle className="h-3.5 w-3.5 text-slate-400" />
                      <span>{topic.fallbackQuestions.length} Soal</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3.5 w-3.5 text-slate-400" />
                      <span>{topic.duration}</span>
                    </span>
                  </div>

                  <Link
                    href={`/kuis/${topic.slug}`}
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-emerald-700 text-white text-xs font-bold shadow-xs hover:shadow-sm active:scale-98 transition-all shrink-0"
                  >
                    <span>Mulai Kuis</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4. Bottom Info Note */}
        <div className="mt-12 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-emerald-100/70 text-emerald-800 shrink-0">
              <BookOpen className="h-4 w-4" />
            </div>
            <p className="font-medium leading-relaxed">
              Ingin membaca materi selengkapnya sebelum mencoba kuis? Pelajari langsung melalui buku modul resmi di menu <strong>Repropedia</strong>.
            </p>
          </div>
          <Link
            href="/repropedia"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs shrink-0 transition-colors"
          >
            <span>Buka Repropedia</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
