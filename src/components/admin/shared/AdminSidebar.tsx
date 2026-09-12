"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Palette,
  HelpCircle,
  UserCheck,
  Building2,
  Calendar,
  Settings,
  Shield,
  LogOut,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  onLogout?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function AdminSidebar({
  onLogout,
  isOpen,
  onClose,
  isCollapsed = false,
  onToggleCollapse,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const sections = [
    {
      title: "MENU",
      items: [
        { href: "/admin/dashboard", label: "Dashboard Analitik", icon: LayoutDashboard },
      ],
    },
    {
      title: "KONTEN & EDUKASI",
      items: [
        { href: "/admin/edukasi", label: "Edukasi & Media", icon: FileText },
        { href: "/admin/karya-kader", label: "Karya Kader", icon: Palette },
        { href: "/admin/kuis", label: "Kuis Interaktif", icon: HelpCircle },
      ],
    },
    {
      title: "SDM & ORGANISASI",
      items: [
        { href: "/admin/konseling", label: "Kader & Konselor", icon: UserCheck },
        { href: "/admin/organisasi", label: "Badan Organisasi", icon: Building2 },
      ],
    },
    {
      title: "EVENT",
      items: [
        { href: "/admin/kegiatan", label: "Galeri Kegiatan", icon: Calendar },
      ],
    },
    {
      title: "SISTEM",
      items: [
        { href: "/admin/pengaturan", label: "Pengaturan Umum", icon: Settings },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-all duration-300 animate-in fade-in"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 flex flex-col justify-between shrink-0 border-r border-slate-200/80 dark:border-slate-800 transition-all duration-300 ease-in-out lg:translate-x-0 shadow-xl lg:shadow-none ${
          isCollapsed ? "w-20 p-3.5" : "w-64 p-5"
        } ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="space-y-6 flex flex-col grow overflow-hidden">
          {/* Logo & Brand Header - Expands or contracts smoothly */}
          <div
            className={`flex items-center pb-4 border-b border-slate-100 dark:border-slate-800 shrink-0 ${
              isCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            <Link
              href="/admin/dashboard"
              className="group block"
              title="SIGMA Admin Workspace"
            >
              {isCollapsed ? (
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-xs">
                  <span className="text-xl font-black leading-none">σ</span>
                </div>
              ) : (
                <div>
                  <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white select-none lowercase leading-none block">
                    sigma<span className="text-emerald-600">.</span>
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-widest uppercase block mt-1">
                    Admin Workspace
                  </span>
                </div>
              )}
            </Link>

            {/* Mobile close button drawer trigger */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800 lg:hidden transition-colors cursor-pointer"
              aria-label="Tutup Menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Sections Menu */}
          <nav className="flex flex-col space-y-5 overflow-y-auto grow pr-1 -mr-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
            {sections.map((section) => (
              <div key={section.title} className="space-y-1.5">
                {!isCollapsed ? (
                  <p className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider px-3.5 pb-1">
                    {section.title}
                  </p>
                ) : (
                  <div className="h-px bg-slate-100 dark:bg-slate-800 my-1 mx-2" />
                )}
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/admin/dashboard" &&
                        pathname.startsWith(item.href + "/"));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        title={isCollapsed ? item.label : undefined}
                        className={`py-2.5 rounded-2xl flex items-center transition-all duration-200 text-xs cursor-pointer ${
                          isCollapsed
                            ? "px-0 justify-center"
                            : "px-3.5 space-x-3"
                        } ${
                          isActive
                            ? "bg-primary text-white font-bold shadow-xs"
                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/70 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/80 font-semibold"
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 shrink-0 transition-colors ${
                            isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300"
                          }`}
                        />
                        {!isCollapsed && <span className="truncate">{item.label}</span>}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer (Logout) */}
        <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 shrink-0">
          <button
            onClick={onLogout}
            title="Keluar Sesi"
            className={`w-full py-2.5 bg-slate-50 hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200/70 hover:border-rose-200 dark:bg-slate-800/70 dark:hover:bg-rose-950/40 dark:text-slate-400 dark:hover:text-rose-400 dark:border-slate-800 dark:hover:border-rose-900/50 rounded-2xl font-bold text-xs flex items-center justify-center transition-colors duration-200 cursor-pointer shadow-2xs ${
              isCollapsed ? "px-0" : "px-4 space-x-2"
            }`}
          >
            <LogOut className="h-3.5 w-3.5 shrink-0" />
            {!isCollapsed && <span>Keluar Sesi</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
