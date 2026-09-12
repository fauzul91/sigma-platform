"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, PanelLeftClose, PanelLeft, Sun, Moon } from "lucide-react";

interface AdminTopbarProps {
  onToggleMobileSidebar?: () => void;
  isSidebarCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

export default function AdminTopbar({
  onToggleMobileSidebar,
  isSidebarCollapsed,
  onToggleCollapse,
  isDarkMode = false,
  onToggleTheme,
}: AdminTopbarProps) {
  const pathname = usePathname();

  const getPageTitle = (path: string) => {
    if (path.includes("/edukasi/baru")) return "Edukasi & Media / Tulis Baru";
    if (path.includes("/edukasi/edit")) return "Edukasi & Media / Edit Konten";
    if (path.includes("/edukasi")) return "Edukasi & Media";

    if (path.includes("/kegiatan/baru")) return "Galeri Kegiatan / Agenda Baru";
    if (path.includes("/kegiatan/edit")) return "Galeri Kegiatan / Edit Agenda";
    if (path.includes("/kegiatan")) return "Galeri Kegiatan";

    if (path.includes("/repropedia")) return "Repropedia";
    if (path.includes("/karya-kader")) return "Karya Kader";
    if (path.includes("/kuis")) return "Kuis Interaktif";
    if (path.includes("/statistik")) return "Statistik Kasus";
    if (path.includes("/konseling")) return "Kader & Konselor";
    if (path.includes("/organisasi")) return "Badan Organisasi";
    if (path.includes("/pengaturan")) return "Pengaturan Umum";
    return "Dashboard";
  };

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0 sticky top-0 z-20 transition-colors duration-300">
      
      {/* Left Title & Mobile/Desktop Toggle Triggers */}
      <div className="flex items-center space-x-3">
        {/* Mobile Hamburger menu toggle button */}
        <button
          onClick={onToggleMobileSidebar}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 lg:hidden transition-colors cursor-pointer"
          aria-label="Buka Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Desktop Sidebar Minimize / Expand Toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden lg:flex p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title={isSidebarCollapsed ? "Perluas Sidebar" : "Minimize Sidebar"}
          aria-label="Toggle Minimize Sidebar"
        >
          {isSidebarCollapsed ? (
            <PanelLeft className="h-5 w-5" />
          ) : (
            <PanelLeftClose className="h-5 w-5" />
          )}
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider hidden sm:inline">CMS</span>
          <ChevronRight className="h-3.5 w-3.5 text-slate-300 dark:text-slate-600 hidden sm:inline" />
          <h1 className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-slate-100">
            {getPageTitle(pathname)}
          </h1>
        </div>
      </div>

      {/* Right Action: Night Mode Toggle */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onToggleTheme}
          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-amber-300 dark:hover:bg-slate-800 transition-all cursor-pointer"
          title={isDarkMode ? "Beralih ke Mode Terang" : "Beralih ke Mode Gelap (Night Mode)"}
          aria-label="Toggle Night Mode"
        >
          {isDarkMode ? (
            <Sun className="h-5 w-5 text-amber-400 animate-in zoom-in-75 duration-200" />
          ) : (
            <Moon className="h-5 w-5 text-slate-600 animate-in zoom-in-75 duration-200" />
          )}
        </button>
      </div>
    </header>
  );
}
