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
    if (path.includes("/repropedia")) return "Repropedia Hub";
    if (path.includes("/edukasi")) return "Edukasi (Artikel & Video)";
    if (path.includes("/karya-kader")) return "Karya Kader (Moderasi)";
    if (path.includes("/kuis")) return "Kuis Interaktif";
    if (path.includes("/statistik")) return "Statistik (Data Kasus)";
    if (path.includes("/konseling")) return "Anggota Kader & Nomor Konselor";
    if (path.includes("/kegiatan")) return "Kegiatan & Event";
    if (path.includes("/pengaturan")) return "Pengaturan Umum";
    return "Analitik Dashboard";
  };

  return (
    <header className="bg-white border-b border-slate-200/80 px-6 py-4 flex items-center justify-between shrink-0 sticky top-0 z-20 shadow-sm">
      
      {/* Title & Mobile Toggle Trigger */}
      <div className="flex items-center space-x-3">
        {/* Mobile Hamburger menu toggle button */}
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-slate-500 hover:text-neutral-dark hover:bg-slate-100 lg:hidden transition-colors cursor-pointer"
          aria-label="Buka Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline">CMS Platform</span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-300 hidden sm:inline" />
          <span className="text-sm font-extrabold text-neutral-dark capitalize">
            {getPageTitle(pathname)}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Link
          href="/beranda"
          className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:text-primary hover:border-primary transition-all text-xs font-semibold"
        >
          <span>Lihat Web Publik</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
        <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shadow-md shadow-emerald-500/20">
          AD
        </div>
      </div>
    </header>
  );
}
