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
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden transition-all duration-300 animate-in fade-in"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0f172a] text-slate-300 flex flex-col justify-between shrink-0 p-5 border-r border-slate-800/60 transition-transform duration-300 ease-in-out lg:translate-x-0 shadow-2xl lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="space-y-6 flex flex-col grow overflow-hidden">
          {/* Logo & Brand Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800/50 shrink-0">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <span className="font-extrabold text-white text-base leading-none tracking-tight block">
                  SIGMA CMS
                </span>
                <span className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase block mt-1">
                  Admin Panel
                </span>
              </div>
            </div>

            {/* Mobile close button drawer trigger */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden transition-colors cursor-pointer"
              aria-label="Tutup Menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Sections Menu */}
          <nav className="flex flex-col space-y-5 overflow-y-auto grow pr-2 -mr-2 scrollbar-thin scrollbar-thumb-slate-800">
            {sections.map((section) => (
              <div key={section.title} className="space-y-1.5">
                <p className="text-[10px] font-black uppercase text-slate-500 tracking-wider px-3.5 pb-1">
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
                        className={`px-3.5 py-3 rounded-2xl flex items-center space-x-3 transition-all duration-200 text-[13px] font-semibold cursor-pointer ${
                          isActive
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-900/20 font-bold"
                            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                        }`}
                      >
                        <Icon className={`h-4.5 w-4.5 shrink-0 transition-colors ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-300"}`} />
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
        <div className="pt-5 mt-4 border-t border-slate-800/50 shrink-0">
          <button
            onClick={onLogout}
            className="w-full px-4 py-3 bg-slate-800/30 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-2xl font-bold text-xs flex items-center justify-center space-x-2 transition-colors duration-200 cursor-pointer"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Keluar Sesi</span>
          </button>
        </div>
      </aside>
    </>
  );
}
