"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  Award,
  Palette,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck
} from "lucide-react";

export interface HeroCardData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tag: string;
  isMain?: boolean;
  href: string;
  ctaText: string;
  rotation: number;
  sizeTier: "small" | "medium" | "large";
  zIndex: number;
  bgGradient: string;
  glowColor: string;
  borderColor: string;
  imageSrc: string;
  imageAlt: string;
  accentBadge: string;
  pillBg: string;
  pillText: string;
  icon: React.ElementType;
}

const HERO_CARDS: HeroCardData[] = [
  {
    id: "repropedia",
    number: "01",
    title: "Repropedia",
    subtitle: "Kenali kesehatanmu",
    tag: "Ensiklopedia",
    isMain: false,
    href: "/repropedia",
    ctaText: "Pelajari",
    rotation: -10,
    sizeTier: "small",
    zIndex: 10,
    bgGradient: "from-teal-500 via-cyan-700 to-slate-950",
    glowColor: "rgba(20, 184, 166, 0.35)",
    borderColor: "border-teal-400/30",
    imageSrc: "/assets/hero-cards/repropedia.svg",
    imageAlt: "3D Ensiklopedia Kesehatan Repropedia",
    accentBadge: "bg-teal-400/20 text-teal-100 border-teal-300/30",
    pillBg: "bg-white/95 text-teal-950 hover:bg-teal-50 backdrop-blur-sm",
    pillText: "text-teal-950 font-semibold",
    icon: BookOpen,
  },
  {
    id: "edukasi",
    number: "02",
    title: "Materi Edukasi",
    subtitle: "Belajar jadi lebih seru",
    tag: "Video & Info",
    isMain: false,
    href: "/edukasi",
    ctaText: "Tonton",
    rotation: -5,
    sizeTier: "medium",
    zIndex: 20,
    bgGradient: "from-rose-500 via-rose-700 to-slate-950",
    glowColor: "rgba(244, 63, 94, 0.35)",
    borderColor: "border-rose-400/30",
    imageSrc: "/assets/hero-cards/edukasi.svg",
    imageAlt: "3D Smart Study Monitor Edukasi",
    accentBadge: "bg-rose-400/20 text-rose-100 border-rose-300/30",
    pillBg: "bg-white/95 text-rose-950 hover:bg-rose-50 backdrop-blur-sm",
    pillText: "text-rose-950 font-semibold",
    icon: GraduationCap,
  },
  {
    id: "garuda",
    number: "03",
    title: "Kader Garuda",
    subtitle: "Jadi bagian dari perubahan",
    tag: "Pilar Utama",
    isMain: true,
    href: "/tentang",
    ctaText: "Jelajahi",
    rotation: 0,
    sizeTier: "large",
    zIndex: 30,
    bgGradient: "from-emerald-500 via-emerald-700 to-slate-950",
    glowColor: "rgba(16, 185, 129, 0.55)",
    borderColor: "border-emerald-300/60 ring-2 ring-amber-400/50",
    imageSrc: "/assets/hero-cards/garuda.svg",
    imageAlt: "3D Maskot Kader Garuda SIGMA",
    accentBadge: "bg-amber-400/25 text-amber-200 border-amber-300/40",
    pillBg: "bg-amber-400 text-slate-950 hover:bg-amber-300 shadow-lg shadow-amber-500/25",
    pillText: "text-slate-950 font-bold",
    icon: Award,
  },
  {
    id: "karya",
    number: "04",
    title: "Karya Remaja",
    subtitle: "Ekspresikan kreativitasmu",
    tag: "Ruang Kreasi",
    isMain: false,
    href: "/karya-kader",
    ctaText: "Karya",
    rotation: 5,
    sizeTier: "medium",
    zIndex: 20,
    bgGradient: "from-amber-500 via-orange-600 to-slate-950",
    glowColor: "rgba(245, 158, 11, 0.35)",
    borderColor: "border-amber-400/30",
    imageSrc: "/assets/hero-cards/karya.svg",
    imageAlt: "3D Palet Seni Karya Remaja",
    accentBadge: "bg-amber-400/20 text-amber-100 border-amber-300/30",
    pillBg: "bg-white/95 text-amber-950 hover:bg-amber-50 backdrop-blur-sm",
    pillText: "text-amber-950 font-semibold",
    icon: Palette,
  },
  {
    id: "quiz",
    number: "05",
    title: "Med-Quiz",
    subtitle: "Uji pengetahuanmu",
    tag: "Kuis Interaktif",
    isMain: false,
    href: "/kuis",
    ctaText: "Mulai",
    rotation: 10,
    sizeTier: "small",
    zIndex: 10,
    bgGradient: "from-indigo-500 via-indigo-700 to-slate-950",
    glowColor: "rgba(99, 102, 241, 0.35)",
    borderColor: "border-indigo-400/30",
    imageSrc: "/assets/hero-cards/quiz.svg",
    imageAlt: "3D Piala & Trophy Quiz Kesehatan",
    accentBadge: "bg-indigo-400/20 text-indigo-100 border-indigo-300/30",
    pillBg: "bg-white/95 text-indigo-950 hover:bg-indigo-50 backdrop-blur-sm",
    pillText: "text-indigo-950 font-semibold",
    icon: HelpCircle,
  },
];

export default function HeroCardsDeck() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number>(2); // Center card (Kader Garuda) default

  return (
    <div className="relative w-full pb-0 overflow-visible">
      {/* Floating interactive peer badges (inspired by reference image) */}
      <div className="hidden md:flex items-end justify-center w-full max-w-6xl mx-auto px-4 perspective-1000 min-h-[460px] lg:min-h-[500px]">
        {HERO_CARDS.map((card, index) => {
          const isHovered = hoveredIndex === index;
          const isAnyHovered = hoveredIndex !== null;

          // Sizing classes based on tier - balanced widths so titles & subtitles fit on 1 line
          const sizeClasses =
            card.sizeTier === "large"
              ? "w-[260px] lg:w-[290px] h-[400px] lg:h-[455px]"
              : card.sizeTier === "medium"
                ? "w-[230px] lg:w-[260px] h-[355px] lg:h-[405px]"
                : "w-[205px] lg:w-[235px] h-[315px] lg:h-[360px]";

          // Negative margin to overlap cards
          const overlapClass =
            index === 0
              ? ""
              : "-ml-7 lg:-ml-9";

          // Dynamic transform values
          const currentRotation = isHovered ? 0 : card.rotation;
          const currentY = isHovered ? -36 : 0;
          const currentScale = isHovered ? 1.05 : isAnyHovered ? 0.97 : 1;
          const currentZIndex = isHovered ? 50 : card.zIndex;
          const currentOpacity = isHovered ? 1 : isAnyHovered ? 0.88 : 1;

          // Enlarged proportional illustration sizing so graphics stand out gracefully
          const imageSizeClass =
            card.sizeTier === "large"
              ? "h-[195px] lg:h-[230px] w-[195px] lg:w-[230px]"
              : card.sizeTier === "medium"
                ? "h-[165px] lg:h-[195px] w-[165px] lg:w-[195px]"
                : "h-[145px] lg:h-[175px] w-[145px] lg:w-[175px]";

          return (
            <motion.div
              key={card.id}
              initial={{ y: 90, opacity: 0, rotate: card.rotation }}
              animate={{
                y: currentY,
                opacity: currentOpacity,
                rotate: currentRotation,
                scale: currentScale,
                zIndex: currentZIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 26,
                mass: 0.8,
              }}
              style={{
                transformOrigin: "bottom center",
                zIndex: currentZIndex,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`relative shrink-0 ${sizeClasses} ${overlapClass} cursor-pointer select-none group`}
            >
              <Link href={card.href} className="block w-full h-full">
                {/* Ambient glow backdrop */}
                <div
                  className="absolute inset-0 rounded-[28px] lg:rounded-[32px] transition-all duration-300 pointer-events-none -z-10"
                  style={{
                    backgroundColor: card.glowColor,
                    filter: isHovered ? "blur(32px)" : "blur(18px)",
                    opacity: isHovered ? 0.9 : card.isMain ? 0.5 : 0.28,
                    transform: isHovered ? "scale(1.08)" : "scale(0.96)",
                  }}
                />

                {/* Card Main Container */}
                <div
                  className={`relative w-full h-full rounded-[28px] lg:rounded-[32px] overflow-hidden border bg-gradient-to-b ${card.bgGradient} p-4 lg:p-5 flex flex-col justify-between shadow-2xl transition-all duration-300`}
                >
                  {/* Sheen sweep effect on card hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/15 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Top: Header - Title + CTA on Row 1, Subtitle on Row 2 (Full Width) */}
                  <div className="relative z-20 w-full">
                    <div className="flex items-center justify-between gap-1.5">
                      <h3 className="text-[15px] lg:text-[17px] font-extrabold text-white leading-tight tracking-tight drop-shadow-sm truncate">
                        {card.title}
                      </h3>

                      {/* Action Pill Button */}
                      <div
                        className={`shrink-0 flex items-center space-x-1 px-2.5 lg:px-3 py-1 lg:py-1.5 rounded-full text-[11px] lg:text-xs font-bold transition-all duration-200 transform group-hover:scale-105 shadow-md ${card.pillBg}`}
                      >
                        <span className={card.pillText}>{card.ctaText}</span>
                        <ArrowUpRight className={`h-3.5 w-3.5 ${card.pillText} transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5`} />
                      </div>
                    </div>

                    {/* Subtitle - exactly 1 clean line spanning full width */}
                    <p className="mt-1 text-xs lg:text-[13px] text-white/90 font-medium leading-normal whitespace-nowrap overflow-hidden text-ellipsis">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Center/Bottom: 3D Illustration - Enlarged, Proportional & Contained */}
                  <div className="relative z-10 flex-1 flex items-center justify-center my-auto overflow-hidden">
                    <div className={`relative ${imageSizeClass} flex items-center justify-center`}>
                      <Image
                        src={card.imageSrc}
                        alt={card.imageAlt}
                        fill
                        unoptimized
                        sizes="260px"
                        priority={card.isMain}
                        className="object-contain p-1 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] transition-transform duration-500 ease-out group-hover:scale-108"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* MOBILE (< 768px): Touch-Friendly Carousel with Active Center Focus */}
      <div className="block md:hidden w-full max-w-sm mx-auto px-4">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-1.5 mb-4 overflow-x-auto pb-1 scrollbar-hide">
          {HERO_CARDS.map((card, idx) => {
            const isActive = mobileActiveIndex === idx;
            return (
              <button
                key={card.id}
                onClick={() => setMobileActiveIndex(idx)}
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all ${isActive
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                  }`}
              >
                {card.number}
              </button>
            );
          })}
        </div>

        {/* Active Card Viewer */}
        <div className="relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            {(() => {
              const card = HERO_CARDS[mobileActiveIndex];
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.92, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="w-full max-w-[290px] h-[400px] relative"
                >
                  <Link href={card.href} className="block w-full h-full">
                    {/* Ambient Glow */}
                    <div
                      className="absolute inset-0 rounded-[28px] blur-xl opacity-60 -z-10"
                      style={{ backgroundColor: card.glowColor }}
                    />

                    {/* Card container */}
                    <div
                      className={`relative w-full h-full rounded-[28px] overflow-hidden border ${card.borderColor} bg-gradient-to-b ${card.bgGradient} p-4 flex flex-col justify-between shadow-xl`}
                    >
                      {/* Top Header - Row 1: Title + CTA, Row 2: Subtitle (1 line) */}
                      <div className="relative z-20 w-full">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-lg font-extrabold text-white leading-tight truncate">
                            {card.title}
                          </h3>

                          <div className={`shrink-0 flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold shadow-md ${card.pillBg}`}>
                            <span className={card.pillText}>{card.ctaText}</span>
                            <ArrowUpRight className={`h-3.5 w-3.5 ${card.pillText}`} />
                          </div>
                        </div>

                        <p className="mt-1 text-xs text-white/90 font-medium leading-normal whitespace-nowrap overflow-hidden text-ellipsis">
                          {card.subtitle}
                        </p>
                      </div>

                      {/* Illustration - Enlarged & Contained */}
                      <div className="relative z-10 flex-1 flex items-center justify-center my-auto">
                        <div className="relative w-[185px] h-[185px] flex items-center justify-center">
                          <Image
                            src={card.imageSrc}
                            alt={card.imageAlt}
                            fill
                            unoptimized
                            sizes="220px"
                            priority
                            className="object-contain p-1 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]"
                          />
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="relative z-20 pt-2 flex items-center justify-between border-t border-white/10 text-white/70 text-xs">
                        <span className="font-mono">{card.number} / 05</span>
                        <span>Klik untuk membuka &rarr;</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })()}
          </AnimatePresence>

          {/* Previous / Next Arrows */}
          <button
            onClick={() =>
              setMobileActiveIndex((prev) =>
                prev === 0 ? HERO_CARDS.length - 1 : prev - 1
              )
            }
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/90 shadow-md text-slate-700 hover:bg-white"
            aria-label="Previous card"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={() =>
              setMobileActiveIndex((prev) =>
                prev === HERO_CARDS.length - 1 ? 0 : prev + 1
              )
            }
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/90 shadow-md text-slate-700 hover:bg-white"
            aria-label="Next card"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Ground Lighting / Rising Glow Base */}
      <div className="relative -mt-10 h-10 w-full max-w-4xl mx-auto pointer-events-none">
        <div className="h-full w-full bg-gradient-to-t from-emerald-100/40 via-transparent to-transparent blur-xl" />
      </div>
    </div>
  );
}
