"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Search,
  BookOpen,
  ArrowRight,
  Compass,
  Lock,
  Gamepad2,
  Layers,
} from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

interface GameCardItem {
  id: string;
  title: string;
  category: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  imageGradient: string;
  borderColor: string;
  cornerColor: string;
  shadowColor: string;
  bgCard: string;
  badgeBg: string;
  badgeText: string;
  buttonText: string;
  isLocked?: boolean;
}

const GAMES_DATA: GameCardItem[] = [
  {
    id: "mitos-fakta",
    title: "Mitos atau Fakta?",
    category: "REFLEKSI CEPAT",
    description:
      "Tantangan interaktif untuk menguji seberapa jeli kamu membedakan mitos populer dan fakta medis terverifikasi seputar pubertas dan kesehatan reproduksi.",
    href: "/permainan/mitos-fakta",
    imageSrc: "/assets/hero_section/quiz.webp",
    imageAlt: "Ilustrasi Mitos atau Fakta SIGMA",
    imageGradient: "from-emerald-700 via-teal-800 to-emerald-950",
    borderColor: "border-emerald-600",
    cornerColor: "text-emerald-600",
    shadowColor: "#059669",
    bgCard: "bg-[#fed7aa]/35 hover:bg-[#fed7aa]/45",
    badgeBg: "bg-emerald-600 text-white",
    badgeText: "10 Kartu Soal",
    buttonText: "Jelajahi",
  },
  {
    id: "detektif",
    title: "Detektif Informasi",
    category: "LITERASI DIGITAL",
    description:
      "Peta investigasi interaktif untuk menganalisis kebenaran postingan media sosial viral, mengumpulkan bukti digital, dan memutuskan kesimpulan faktanya.",
    href: "/permainan/detektif",
    imageSrc: "/assets/hero_section/edukasi.webp",
    imageAlt: "Ilustrasi Detektif Informasi SIGMA",
    imageGradient: "from-teal-900 via-slate-900 to-emerald-950",
    borderColor: "border-amber-500",
    cornerColor: "text-amber-500",
    shadowColor: "#d97706",
    bgCard: "bg-[#fed7aa]/35 hover:bg-[#fed7aa]/45",
    badgeBg: "bg-amber-600 text-white",
    badgeText: "5 Kasus Medsos",
    buttonText: "Jelajahi",
  },
  {
    id: "kuis",
    title: "Kuis Pemahaman",
    category: "EVALUASI MATERI",
    description:
      "Peta evaluasi wawasan terstruktur untuk menguji dan memperdalam penguasaan materi 5 modul resmi SIGMA melalui kuis pilihan ganda yang santai.",
    href: "/permainan/kuis",
    imageSrc: "/assets/hero_section/repropedia.webp",
    imageAlt: "Ilustrasi Kuis Pemahaman SIGMA",
    imageGradient: "from-emerald-800 via-emerald-700 to-teal-900",
    borderColor: "border-emerald-600",
    cornerColor: "text-emerald-600",
    shadowColor: "#059669",
    bgCard: "bg-[#fed7aa]/35 hover:bg-[#fed7aa]/45",
    badgeBg: "bg-emerald-700 text-white",
    badgeText: "5 Topik Pilihan",
    buttonText: "Jelajahi",
  },
  {
    id: "pilih-langkahmu",
    title: "Pilih Langkahmu",
    category: "SIMULASI KEPUTUSAN",
    description:
      "Simulasi cerita bercabang interaktif untuk melatih kemampuan mengambil keputusan yang sehat, aman, dan bertanggung jawab dalam pergaulan remaja.",
    href: "/permainan/pilih-langkahmu",
    imageSrc: "/assets/quiz/batasan_diri.webp",
    imageAlt: "Ilustrasi Pilih Langkahmu SIGMA",
    imageGradient: "from-purple-900 via-slate-900 to-emerald-950",
    borderColor: "border-emerald-600",
    cornerColor: "text-emerald-600",
    shadowColor: "#059669",
    bgCard: "bg-[#fed7aa]/35 hover:bg-[#fed7aa]/45",
    badgeBg: "bg-purple-700 text-white",
    badgeText: "4 Kasus Nyata",
    buttonText: "Jelajahi",
    isLocked: false,
  },
];

export default function GamesHubView() {
  return (
    <div className="bg-[#faf8f5] min-h-screen font-sans relative selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. Subtle Diamond Pattern Overlay (Matching Reference media_1789382624632.png) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22 0 L44 22 L22 44 L0 22 Z' fill='none' stroke='%23000' stroke-width='1.5'/%3E%3C/svg%3E")`,
          backgroundSize: "36px 36px",
        }}
      />

      {/* 2. Standard Clean SIGMA Page Header */}
      <div className="relative z-10">
        <PageHeader
          title="PERMAINAN EDUKASI"
          description="Eksplorasi ruang belajar interaktif melalui simulasi, adu ketelitian fakta, dan kuis pemahaman yang dirancang seru, edukatif, dan ramah remaja."
          badge="RUANG BELAJAR INTERAKTIF"
          type="permainan"
        />
      </div>

      {/* 3. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 relative z-10">
        
        {/* Intro Banner Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 mb-8 sm:mb-10 border-b border-amber-900/10">
          <div className="max-w-2xl space-y-2 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100/80 border border-emerald-200/80 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
              <Compass className="h-3.5 w-3.5 text-emerald-700" />
              <span>Peta Petualangan Belajar</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Pilih Ruang Petualanganmu
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              Jelajahi beragam tantangan interaktif untuk mengasah cara berpikir kritis,
              mengenali fakta kesehatan reproduksi, dan melindungi dirimu di dunia digital.
            </p>
          </div>

          {/* Clean Mascot Greeting on the right */}
          <div className="hidden md:flex items-center space-x-3 shrink-0">
            <div className="relative w-20 h-20">
              <Image
                src="/assets/hero_section/quiz.webp"
                alt="Maskot Permainan SIGMA"
                fill
                unoptimized
                className="object-contain filter drop-shadow-sm"
              />
            </div>
            <div className="text-xs font-black text-emerald-900 bg-white/90 border border-emerald-200/90 px-4 py-2.5 rounded-2xl max-w-[180px] leading-snug shadow-2xs">
              Pilih ruang petualangan yang ingin kamu jelajahi! 👋
            </div>
          </div>
        </div>

        {/* 4. Gamified Adventure Cards Grid (Matching reference media_1789382624632.png) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {GAMES_DATA.map((game) => (
            <div
              key={game.id}
              className={`relative rounded-sm border-[3.5px] ${game.borderColor} ${game.bgCard} shadow-md hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row overflow-hidden group`}
            >
              {/* 4 Corner Tab Accents (Inspired by reference notches) */}
              <div
                className={`absolute top-0 left-0 w-0 h-0 border-t-[18px] border-r-[18px] border-t-current border-r-transparent pointer-events-none z-20 ${game.cornerColor}`}
              />
              <div
                className={`absolute top-0 right-0 w-0 h-0 border-t-[18px] border-l-[18px] border-t-current border-l-transparent pointer-events-none z-20 ${game.cornerColor}`}
              />
              <div
                className={`absolute bottom-0 left-0 w-0 h-0 border-b-[18px] border-r-[18px] border-b-current border-r-transparent pointer-events-none z-20 ${game.cornerColor}`}
              />
              <div
                className={`absolute bottom-0 right-0 w-0 h-0 border-b-[18px] border-l-[18px] border-b-current border-l-transparent pointer-events-none z-20 ${game.cornerColor}`}
              />

              {/* Left Side: Eye-catching Thematic Artwork Thumbnail */}
              <div
                className={`sm:w-5/12 h-52 sm:h-auto shrink-0 relative overflow-hidden bg-gradient-to-b ${game.imageGradient} flex flex-col items-center justify-center p-4 border-b-[3px] sm:border-b-0 sm:border-r-[3.5px] ${game.borderColor}`}
              >
                {/* Visual Glow Backdrop */}
                <div className="absolute inset-0 bg-radial from-white/10 to-transparent opacity-60 pointer-events-none" />

                {/* Thematic Illustration Image */}
                <div className="relative w-36 h-36 sm:w-40 sm:h-40 group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={game.imageSrc}
                    alt={game.imageAlt}
                    fill
                    unoptimized
                    className="object-contain filter drop-shadow-md"
                  />
                </div>

                {/* Subtitle / Category Badge in Thumbnail */}
                <div className="absolute bottom-2.5 inset-x-3 text-center">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-xs ${game.badgeBg}`}
                  >
                    {game.badgeText}
                  </span>
                </div>
              </div>

              {/* Right Side: Title, Description & 3D Tactile Button */}
              <div className="sm:w-7/12 p-5 sm:p-6 lg:p-7 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  {/* Category Pill */}
                  <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-slate-500 block">
                    {game.category}
                  </span>

                  {/* Playful Stylized Title with Outline/Shadow */}
                  <h3
                    className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight drop-shadow-[0_2px_3px_rgba(0,0,0,0.35)]"
                    style={{
                      textShadow: `0 2px 0 ${game.shadowColor}, 0 3px 4px rgba(0,0,0,0.35)`,
                    }}
                  >
                    {game.title}
                  </h3>

                  {/* Description Paragraph */}
                  <p className="text-xs sm:text-sm text-slate-800 font-bold leading-relaxed pt-1">
                    {game.description}
                  </p>
                </div>

                {/* Bottom Action Button: Tactile 3D Button (Matching Reference) */}
                <div className="flex justify-end pt-2">
                  {game.isLocked ? (
                    <div className="inline-flex items-center space-x-2 px-6 sm:px-7 py-2.5 rounded-xl bg-slate-300/80 border-b-[4px] border-slate-400/80 text-slate-600 font-black text-xs sm:text-sm shadow-xs cursor-not-allowed select-none">
                      <Lock className="h-4 w-4" />
                      <span>{game.buttonText}</span>
                    </div>
                  ) : (
                    <Link
                      href={game.href}
                      className="inline-flex items-center justify-center space-x-2 px-7 sm:px-8 py-2.5 rounded-xl bg-[#facc15] hover:bg-[#fde047] border-b-[4px] border-[#ca8a04] active:border-b-0 active:translate-y-1 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-150 group/btn"
                    >
                      <span>{game.buttonText}</span>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 5. Bottom Recommendation Note connecting to Repropedia */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-white/90 border border-amber-900/10 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-700">
          <div className="flex items-center space-x-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-100/80 text-emerald-900 shrink-0">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="font-black text-slate-900 text-sm mb-0.5">
                Ingin mempelajari materi dasarnya terlebih dahulu?
              </p>
              <p className="font-medium text-slate-600 leading-relaxed">
                Semua pertanyaan dan kasus dalam ruang permainan ini merujuk langsung pada modul resmi di menu <strong>Repropedia</strong>.
              </p>
            </div>
          </div>
          <Link
            href="/repropedia"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl border-2 border-emerald-600 bg-white hover:bg-emerald-50 text-emerald-800 font-extrabold text-xs shrink-0 transition-all shadow-2xs"
          >
            <span>Buka Modul Repropedia</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
