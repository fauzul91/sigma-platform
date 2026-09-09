"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  GraduationCap,
  Award,
  Palette,
  HelpCircle,
  ChevronRight,
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
    imageSrc: "/assets/hero_section/repropedia.webp",
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
    imageSrc: "/assets/hero_section/edukasi.webp",
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
    imageSrc: "/assets/hero_section/garuda.webp",
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
    imageSrc: "/assets/hero_section/karya.webp",
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
    imageSrc: "/assets/hero_section/quiz.webp",
    imageAlt: "3D Piala & Trophy Quiz Kesehatan",
    accentBadge: "bg-indigo-400/20 text-indigo-100 border-indigo-300/30",
    pillBg: "bg-white/95 text-indigo-950 hover:bg-indigo-50 backdrop-blur-sm",
    pillText: "text-indigo-950 font-semibold",
    icon: HelpCircle,
  },
];

export default function HeroCardsDeck() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState<number>(0);
  const mobileScrollRef = React.useRef<HTMLDivElement>(null);

  // Cards separation for tablet layout
  const garudaCard = HERO_CARDS.find((c) => c.isMain) || HERO_CARDS[2];
  const otherCards = HERO_CARDS.filter((c) => !c.isMain);

  // Scroll listener for mobile carousel to detect active center card
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const container = mobileScrollRef.current;
    const cardElements = container.querySelectorAll<HTMLElement>(".mobile-snap-card");
    if (!cardElements.length) return;

    const centerPosition = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDiff = Infinity;

    cardElements.forEach((cardEl, idx) => {
      const cardCenter = cardEl.offsetLeft + cardEl.offsetWidth / 2;
      const diff = Math.abs(centerPosition - cardCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeMobileIndex) {
      setActiveMobileIndex(closestIndex);
    }
  };

  // Scroll to card programmatically when dot is tapped
  const scrollToCard = (index: number) => {
    if (!mobileScrollRef.current) return;
    const container = mobileScrollRef.current;
    const cardElements = container.querySelectorAll<HTMLElement>(".mobile-snap-card");
    if (cardElements[index]) {
      const cardEl = cardElements[index];
      const targetLeft = cardEl.offsetLeft - (container.clientWidth - cardEl.offsetWidth) / 2;
      container.scrollTo({ left: Math.max(0, targetLeft), behavior: "smooth" });
      setActiveMobileIndex(index);
    }
  };

  return (
    <div className="relative w-full pb-0 overflow-visible">
      {/* ========================================================================= */}
      {/* 1. DESKTOP VIEW (lg: 1024px+): 5-Card Fan-Out 3D Floating Deck             */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex items-end justify-center w-full max-w-6xl mx-auto px-4 perspective-1000 min-h-[460px] lg:min-h-[500px]">
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

      {/* ========================================================================= */}
      {/* 2. TABLET VIEW (sm to lg: 640px - 1023px): 1 Hero Banner + 2x2 Clean Grid  */}
      {/* ========================================================================= */}
      <div className="hidden sm:block lg:hidden w-full max-w-2xl md:max-w-3xl mx-auto px-4 sm:px-6">
        {/* Top Hero Banner: Card 03 - Kader Garuda */}
        <Link href={garudaCard.href} className="block group">
          <div
            className={`relative w-full rounded-3xl overflow-hidden border ${garudaCard.borderColor} bg-gradient-to-r ${garudaCard.bgGradient} p-5 md:p-6 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]`}
          >
            {/* Ambient glow */}
            <div
              className="absolute inset-0 rounded-3xl blur-2xl opacity-40 -z-10 pointer-events-none"
              style={{ backgroundColor: garudaCard.glowColor }}
            />
            {/* Sheen sweep effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/12 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between gap-5">
              <div className="space-y-2 flex-1">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/25 text-amber-200 border border-amber-300/40">
                  <Award className="h-3.5 w-3.5 text-amber-300" />
                  <span>03 · {garudaCard.tag}</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {garudaCard.title}
                </h3>

                <p className="text-xs md:text-sm text-white/90 font-medium leading-relaxed">
                  {garudaCard.subtitle}
                </p>

                <div className="pt-2">
                  <span
                    className={`inline-flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs md:text-sm font-bold shadow-lg transition-transform duration-200 group-hover:scale-105 ${garudaCard.pillBg}`}
                  >
                    <span className={garudaCard.pillText}>{garudaCard.ctaText}</span>
                    <ArrowUpRight className={`h-4 w-4 ${garudaCard.pillText}`} />
                  </span>
                </div>
              </div>

              {/* Mascot 3D Illustration */}
              <div className="relative w-36 h-36 md:w-44 md:h-44 shrink-0 flex items-center justify-center">
                <Image
                  src={garudaCard.imageSrc}
                  alt={garudaCard.imageAlt}
                  fill
                  unoptimized
                  sizes="(max-width: 768px) 150px, 180px"
                  priority
                  className="object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </Link>

        {/* 2x2 Grid for Other 4 Features */}
        <div className="grid grid-cols-2 gap-3.5 md:gap-4 mt-3.5 md:mt-4">
          {otherCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <Link key={card.id} href={card.href} className="block group">
                <div
                  className={`relative w-full h-[220px] md:h-[240px] rounded-2xl md:rounded-3xl overflow-hidden border ${card.borderColor} bg-gradient-to-b ${card.bgGradient} p-4 md:p-5 flex flex-col justify-between shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}
                >
                  {/* Subtle Glow */}
                  <div
                    className="absolute inset-0 rounded-2xl md:rounded-3xl blur-xl opacity-30 -z-10 pointer-events-none"
                    style={{ backgroundColor: card.glowColor }}
                  />

                  {/* Top Header */}
                  <div className="relative z-10 w-full">
                    <div className="flex items-center justify-between gap-1.5">
                      <div className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-white/80">
                        <IconComponent className="h-3.5 w-3.5 text-white/90" />
                        <span>{card.number}</span>
                      </div>
                      <div
                        className={`shrink-0 flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] md:text-xs font-bold shadow-sm transition-transform duration-200 group-hover:scale-105 ${card.pillBg}`}
                      >
                        <span className={card.pillText}>{card.ctaText}</span>
                        <ArrowUpRight className={`h-3 w-3 ${card.pillText}`} />
                      </div>
                    </div>

                    <h4 className="mt-1.5 text-base md:text-lg font-extrabold text-white leading-tight truncate">
                      {card.title}
                    </h4>
                    <p className="text-[11px] md:text-xs text-white/85 font-medium truncate">
                      {card.subtitle}
                    </p>
                  </div>

                  {/* Center Illustration */}
                  <div className="relative z-1 flex-1 flex items-center justify-center my-auto">
                    <div className="relative w-24 h-24 md:w-28 md:h-28 flex items-center justify-center">
                      <Image
                        src={card.imageSrc}
                        alt={card.imageAlt}
                        fill
                        unoptimized
                        sizes="(max-width: 768px) 100px, 120px"
                        className="object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-108"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MOBILE VIEW (< 640px): Smooth Snap Carousel with Peek Effect & Dots    */}
      {/* ========================================================================= */}
      <div className="block sm:hidden w-full overflow-hidden">
        {/* Horizontal Snap Carousel */}
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-3.5 px-6 py-2 scrollbar-hide"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {HERO_CARDS.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                className="mobile-snap-card shrink-0 snap-center w-[78vw] max-w-[285px] h-[370px] relative rounded-[28px] overflow-hidden group"
              >
                <Link href={card.href} className="block w-full h-full">
                  {/* Ambient Glow */}
                  <div
                    className="absolute inset-0 rounded-[28px] blur-xl opacity-60 -z-10 pointer-events-none"
                    style={{ backgroundColor: card.glowColor }}
                  />

                  {/* Card Container */}
                  <div
                    className={`relative w-full h-full rounded-[28px] overflow-hidden border ${card.borderColor} bg-gradient-to-b ${card.bgGradient} p-5 flex flex-col justify-between shadow-xl`}
                  >
                    {/* Header */}
                    <div className="relative z-20 w-full">
                      <div className="flex items-center justify-between gap-2">
                        <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/15 text-white backdrop-blur-sm">
                          <IconComponent className="h-3 w-3" />
                          <span>{card.number} · {card.tag}</span>
                        </div>

                        <div className={`shrink-0 flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold shadow-md ${card.pillBg}`}>
                          <span className={card.pillText}>{card.ctaText}</span>
                          <ArrowUpRight className={`h-3.5 w-3.5 ${card.pillText}`} />
                        </div>
                      </div>

                      <h3 className="mt-2.5 text-lg font-extrabold text-white leading-tight truncate">
                        {card.title}
                      </h3>

                      <p className="mt-0.5 text-xs text-white/90 font-medium leading-normal whitespace-nowrap overflow-hidden text-ellipsis">
                        {card.subtitle}
                      </p>
                    </div>

                    {/* 3D Illustration */}
                    <div className="relative z-10 flex-1 flex items-center justify-center my-auto">
                      <div className="relative w-[165px] h-[165px] flex items-center justify-center">
                        <Image
                          src={card.imageSrc}
                          alt={card.imageAlt}
                          fill
                          unoptimized
                          sizes="180px"
                          priority={card.isMain}
                          className="object-contain p-1 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)]"
                        />
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="relative z-20 pt-2 flex items-center justify-between border-t border-white/15 text-white/75 text-xs font-medium">
                      <span className="font-mono">{card.number} / 05</span>
                      <span className="flex items-center">
                        Buka fitur <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {HERO_CARDS.map((card, idx) => {
            const isActive = activeMobileIndex === idx;
            return (
              <button
                key={card.id}
                onClick={() => scrollToCard(idx)}
                aria-label={`Lihat fitur ${card.title}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-6 bg-emerald-600 shadow-sm"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Ground Lighting / Rising Glow Base (Desktop Only) */}
      <div className="hidden lg:block relative -mt-10 h-10 w-full max-w-4xl mx-auto pointer-events-none">
        <div className="h-full w-full bg-gradient-to-t from-emerald-100/40 via-transparent to-transparent blur-xl" />
      </div>
    </div>
  );
}
