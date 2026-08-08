"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  BookOpen,
  FileText,
  Users,
  HelpCircle,
  Database,
  Settings,
  Unlock,
  Calendar,
  Building2,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  onLogout?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ onLogout, isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin/dashboard", label: "Analitik Dashboard", icon: BarChart2 },
    { href: "/admin/repropedia", label: "Repropedia Hub", icon: BookOpen },
    { href: "/admin/edukasi", label: "Edukasi & Media", icon: FileText },
    { href: "/admin/karya-kader", label: "Karya Kader", icon: Users },
    { href: "/admin/kuis", label: "Kuis Interaktif", icon: HelpCircle },
    { href: "/admin/statistik", label: "Statistik Kasus", icon: Database },
    { href: "/admin/konseling", label: "Kader & Konselor", icon: Users },
    { href: "/admin/organisasi", label: "Badan Organisasi", icon: Building2 },
    { href: "/admin/kegiatan", label: "Kegiatan & Event", icon: Calendar },
    { href: "/admin/pengaturan", label: "Pengaturan Umum", icon: Settings },
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
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 lg:w-64 bg-neutral-dark text-slate-300 flex flex-col justify-between shrink-0 p-5 border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6">
          
          {/* Logo & Brand Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-emerald-500/10">
                <Unlock className="h-4.5 w-4.5" />
              </div>
              <div>
                <span className="font-extrabold text-white text-base leading-none tracking-tight block">
                  SIGMA CMS
                </span>
                <span className="text-[9px] text-slate-400 font-bold tracking-wider uppercase block mt-1">
                  Administrator
                </span>
              </div>
            </div>

            {/* Mobile close button drawer trigger */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden transition-colors cursor-pointer"
              aria-label="Tutup Menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links Menu */}
          <nav className="flex flex-col space-y-1 text-xs font-bold uppercase tracking-wider overflow-y-auto max-h-[calc(100vh-200px)] pr-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin/dashboard" &&
                  pathname.startsWith(item.href + "/"));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-3 rounded-xl flex items-center space-x-2.5 transition-colors cursor-pointer text-left ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-emerald-500/10"
                      : "hover:bg-slate-800 text-slate-300"
                  }`}
                >
                  <Icon className="h-4.5 w-4.5 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer (Logout) */}
        <button
          onClick={onLogout}
          className="mt-6 px-4 py-3 bg-red-950/40 text-red-400 hover:bg-red-950/60 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 border border-red-900/30 transition-all cursor-pointer w-full"
        >
          <span>Keluar Sesi</span>
        </button>
      </aside>
    </>
  );
}
