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
}

export default function AdminSidebar({ onLogout, isOpen, onClose }: AdminSidebarProps) {
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
        { href: "/admin/repropedia", label: "Repropedia", icon: BookOpen },
        { href: "/admin/karya-kader", label: "Karya Kader", icon: Palette },
        { href: "/admin/edukasi", label: "Edukasi & Media", icon: FileText },
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
        { href: "/admin/kegiatan", label: "Kegiatan & Event", icon: Calendar },
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
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 lg:hidden transition-all duration-300 animate-in fade-in"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0d131f] text-slate-300 flex flex-col justify-between shrink-0 p-4 border-r border-slate-800/80 transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="space-y-5 flex flex-col grow overflow-hidden">
          {/* Logo & Brand Header */}
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-800/80 shrink-0 px-1 pt-1">
            <div className="flex items-center space-x-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-emerald-500/20">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="font-extrabold text-white text-base leading-none tracking-tight block">
                  SIGMA CMS
                </span>
                <span className="text-[9px] text-emerald-400 font-bold tracking-widest uppercase block mt-1">
                  Admin Panel
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

          {/* Navigation Sections Menu */}
          <nav className="flex flex-col space-y-4 overflow-y-auto grow pr-1 scrollbar-thin scrollbar-thumb-slate-800">
            {sections.map((section) => (
              <div key={section.title} className="space-y-1">
                <p className="text-[10px] font-black uppercase text-slate-400/80 tracking-wider px-3.5 py-1">
                  {section.title}
                </p>
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
                        className={`px-3.5 py-2.5 rounded-xl flex items-center space-x-3 transition-all text-xs font-semibold cursor-pointer ${isActive
                            ? "bg-primary text-white shadow-md shadow-emerald-500/20 font-bold"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                          }`}
                      >
                        <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer (Logout) */}
        <div className="pt-3 border-t border-slate-800/80 shrink-0">
          <button
            onClick={onLogout}
            className="w-full px-3.5 py-2.5 bg-red-950/30 hover:bg-red-950/60 text-red-400 rounded-xl font-bold text-xs flex items-center justify-center space-x-2 border border-red-900/30 transition-all cursor-pointer"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Keluar Sesi</span>
          </button>
        </div>
      </aside>
    </>
  );
}
