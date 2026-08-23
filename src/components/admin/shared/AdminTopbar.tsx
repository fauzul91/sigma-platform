"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ExternalLink, Menu } from "lucide-react";

interface AdminTopbarProps {
  onToggleSidebar?: () => void;
}

export default function AdminTopbar({ onToggleSidebar }: AdminTopbarProps) {
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    if (path.includes("/repropedia")) return "Repropedia";
    if (path.includes("/edukasi")) return "Edukasi & Media";
    if (path.includes("/karya-kader")) return "Karya Kader";
    if (path.includes("/kuis")) return "Kuis Interaktif";
    if (path.includes("/statistik")) return "Statistik Kasus";
    if (path.includes("/konseling")) return "Kader & Konselor";
    if (path.includes("/kegiatan")) return "Kegiatan & Event";
    if (path.includes("/organisasi")) return "Badan Organisasi";
    if (path.includes("/pengaturan")) return "Pengaturan Umum";
    return "Dashboard Analitik";
  };

  return (
    <header className="bg-white border-b border-slate-200/80 px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0 sticky top-0 z-20 shadow-xs">
      
      {/* Title & Mobile Toggle Trigger */}
      <div className="flex items-center space-x-3">
        {/* Mobile Hamburger menu toggle button */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-500 hover:text-neutral-dark hover:bg-slate-100 lg:hidden transition-colors cursor-pointer"
          aria-label="Buka Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">CMS</span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-300 hidden sm:inline" />
          <h1 className="text-sm sm:text-base font-extrabold text-neutral-dark">
            {getPageTitle(pathname)}
          </h1>
        </div>
      </div>

      <div className="flex items-center space-x-2.5 sm:space-x-3.5">
        <Link
          href="/beranda"
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:text-primary hover:border-primary/60 hover:bg-emerald-50/50 transition-all text-xs font-bold"
        >
          <span>Web Publik</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
        <div className="h-8 w-8 rounded-xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-black text-xs shadow-xs">
          AD
        </div>
      </div>
    </header>
  );
}
