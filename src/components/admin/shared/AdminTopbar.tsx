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
    return "Dashboard";
  };

  return (
    <header className="bg-white border-b border-slate-200/60 px-4 sm:px-6 py-4 flex items-center justify-between shrink-0 sticky top-0 z-20">
      
      {/* Title & Mobile Toggle Trigger */}
      <div className="flex items-center space-x-3 lg:w-1/3">
        {/* Mobile Hamburger menu toggle button */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-500 hover:text-neutral-dark hover:bg-slate-100 lg:hidden transition-colors cursor-pointer"
          aria-label="Buka Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">CMS</span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-300 hidden sm:inline" />
          <h1 className="text-sm sm:text-base font-extrabold text-slate-800">
            {getPageTitle(pathname)}
          </h1>
        </div>
      </div>

      {/* Center Space Filler (Since Search Bar is removed) */}
      <div className="hidden lg:flex flex-1 justify-center max-w-md mx-4"></div>

      {/* Right Actions */}
      <div className="flex items-center justify-end space-x-2 sm:space-x-4 lg:w-1/3">
        <Link
          href="/beranda"
          className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 rounded-2xl border border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all text-xs font-bold"
        >
          <span>Web Publik</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
        
        {/* User Avatar */}
        <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-200 border border-emerald-300/50 text-emerald-800 flex items-center justify-center font-black text-xs shadow-sm cursor-pointer hover:shadow-md transition-shadow">
          AD
        </div>
      </div>
    </header>
  );
}
