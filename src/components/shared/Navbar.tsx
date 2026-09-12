"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Newspaper,
  Brain,
  Palette,
  Calendar,
  HeartHandshake,
  HelpCircle,
  Phone,
  ArrowRight,
  LogIn,
  ShieldAlert,
} from "lucide-react";

interface SubmenuItem {
  label: string;
  href: string;
  desc: string;
  icon: React.ElementType;
  badge?: string;
}

interface MenuDropdown {
  type: "dropdown";
  label: string;
  categoryTag: string;
  subTag: string;
  items: SubmenuItem[];
  footerLink?: {
    label: string;
    href: string;
  };
  hasSosAlert?: boolean;
}

interface MenuLink {
  type: "link";
  label: string;
  href: string;
}

type MenuItem = MenuLink | MenuDropdown;

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDesktopDropdown, setOpenDesktopDropdown] = useState<string | null>(null);
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>(null);

  const desktopNavRef = useRef<HTMLElement | null>(null);
  const leaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle scroll detection for sticky navbar transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsOpen(false);
    setOpenDesktopDropdown(null);
    setOpenMobileAccordion(null);
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Click outside to close desktop dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        desktopNavRef.current &&
        !desktopNavRef.current.contains(event.target as Node)
      ) {
        setOpenDesktopDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDesktopDropdown(null);
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const menuStructure: MenuItem[] = [
    {
      type: "link",
      label: "Beranda",
      href: "/beranda",
    },
    {
      type: "dropdown",
      label: "Belajar",
      categoryTag: "BELAJAR",
      subTag: "Materi & Interaksi",
      footerLink: {
        label: "Jelajahi semua materi",
        href: "/repropedia",
      },
      items: [
        {
          label: "Repropedia Hub",
          href: "/repropedia",
          desc: "Kenali tubuh, hak, dan kesehatanmu.",
          icon: BookOpen,
        },
        {
          label: "Artikel & Video",
          href: "/edukasi",
          desc: "Temukan informasi terbaru untukmu.",
          icon: Newspaper,
        },
        {
          label: "Quiz Interaktif",
          href: "/kuis",
          desc: "Uji pengetahuanmu dan kumpulkan badge.",
          icon: Brain,
          badge: "Seru",
        },
      ],
    },
    {
      type: "dropdown",
      label: "Komunitas",
      categoryTag: "KOMUNITAS",
      subTag: "Ruang Kreasi",
      items: [
        {
          label: "Karya Siswa",
          href: "/karya-kader",
          desc: "Lihat karya dan kreativitas remaja.",
          icon: Palette,
          badge: "Kreatif",
        },
        {
          label: "Galeri Kegiatan",
          href: "/kegiatan",
          desc: "Ikuti kegiatan dan aktivitas SIGMA.",
          icon: Calendar,
        },
      ],
    },
    {
      type: "dropdown",
      label: "Bantuan",
      categoryTag: "BUTUH BANTUAN?",
      subTag: "Aman & Rahasia",
      hasSosAlert: true,
      items: [
        {
          label: "Konseling & Rujukan",
          href: "/konseling",
          desc: "Cerita dan cari bantuan yang tepat.",
          icon: HeartHandshake,
        },
        {
          label: "FAQ",
          href: "/faq",
          desc: "Jawaban untuk pertanyaan umum.",
          icon: HelpCircle,
        },
        {
          label: "Hubungi Kami",
          href: "/kontak",
          desc: "Kontak tim SIGMA.",
          icon: Phone,
        },
      ],
    },
    {
      type: "link",
      label: "Tentang",
      href: "/tentang",
    },
  ];

  // Active state evaluation
  const isActive = useCallback(
    (menu: MenuItem) => {
      if (menu.type === "link") {
        if (menu.href === "/beranda") {
          return pathname === "/beranda" || pathname === "/";
        }
        return pathname === menu.href || pathname.startsWith(menu.href + "/");
      }
      if (menu.type === "dropdown") {
        return menu.items.some((item) => {
          const itemPath = item.href.split("#")[0];
          if (itemPath === "/beranda" || itemPath === "/") {
            return false;
          }
          if (itemPath === "/edukasi") {
            return (
              pathname === "/edukasi" ||
              pathname.startsWith("/edukasi/") ||
              pathname.startsWith("/artikel/")
            );
          }
          return pathname === itemPath || pathname.startsWith(itemPath + "/");
        });
      }
      return false;
    },
    [pathname]
  );

  const isItemActive = useCallback(
    (href: string) => {
      if (href === "/edukasi") {
        return (
          pathname === "/edukasi" ||
          pathname.startsWith("/edukasi/") ||
          pathname.startsWith("/artikel/")
        );
      }
      return pathname === href || pathname.startsWith(href + "/");
    },
    [pathname]
  );

  // Hybrid mouse events with debounce buffer for diagonal movement
  const handleMouseEnter = (label: string) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setOpenDesktopDropdown(label);
  };

  const handleMouseLeave = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
    }
    leaveTimerRef.current = setTimeout(() => {
      setOpenDesktopDropdown(null);
    }, 150);
  };

  const handleDropdownTriggerClick = (label: string) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setOpenDesktopDropdown((prev) => (prev === label ? null : label));
  };

  const toggleMobileAccordion = (label: string) => {
    setOpenMobileAccordion((prev) => (prev === label ? null : label));
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-200 ${
          isScrolled
            ? "py-2.5 md:py-3 bg-primary/95 backdrop-blur-md shadow-md shadow-emerald-950/15 border-b border-emerald-500/30"
            : "py-3.5 md:py-4 bg-primary border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left Cluster: Brand Logo + Desktop Navigation */}
            <div className="flex items-center gap-5 xl:gap-7 min-w-0">
              {/* Brand Logo */}
              <Link
                href="/beranda"
                className="flex items-center gap-2 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-lg"
                aria-label="SIGMA Beranda"
              >
                <span className="text-3xl sm:text-4xl font-black tracking-tighter text-white select-none lowercase transition-transform group-hover:scale-[1.02]">
                  sigma<span className="text-emerald-300">.</span>
                </span>
              </Link>

              {/* Subtle vertical divider */}
              <div className="hidden lg:block h-5 w-[1px] bg-white/15 shrink-0" aria-hidden="true" />

              {/* Desktop Navigation */}
              <nav
                ref={desktopNavRef}
                className="hidden lg:flex items-center space-x-1 xl:space-x-1.5"
                aria-label="Navigasi Utama"
              >
              {menuStructure.map((menu) => {
                const active = isActive(menu);

                if (menu.type === "link") {
                  return (
                    <Link
                      key={menu.label}
                      href={menu.href}
                      className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                        active
                          ? "text-white bg-emerald-700/90 shadow-xs ring-1 ring-white/15"
                          : "text-emerald-50/90 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {menu.label}
                    </Link>
                  );
                }

                const isDropdownOpen = openDesktopDropdown === menu.label;

                return (
                  <div
                    key={menu.label}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(menu.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      onClick={() => handleDropdownTriggerClick(menu.label)}
                      aria-haspopup="true"
                      aria-expanded={isDropdownOpen}
                      className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                        active || isDropdownOpen
                          ? "text-white bg-emerald-700/90 shadow-xs ring-1 ring-white/15"
                          : "text-emerald-50/90 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span>{menu.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-emerald-200 transition-transform duration-200 ${
                          isDropdownOpen ? "rotate-180 text-white" : ""
                        }`}
                      />
                    </button>

                    {/* Rich Desktop Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute left-0 top-full pt-2.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div
                          className={`bg-white rounded-2xl shadow-xl shadow-slate-950/15 border border-slate-100 p-2 text-slate-800 ${
                            menu.label === "Belajar"
                              ? "w-[410px]"
                              : menu.label === "Komunitas"
                              ? "w-[360px]"
                              : "w-[380px]"
                          }`}
                        >
                          {/* Card Category Header */}
                          <div className="px-3 pt-2 pb-1.5 flex items-center justify-between border-b border-slate-100">
                            <span className="text-[10px] font-extrabold tracking-wider uppercase text-slate-400">
                              {menu.categoryTag}
                            </span>
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                              {menu.subTag}
                            </span>
                          </div>

                          {/* Items List */}
                          <div className="mt-1 space-y-1">
                            {menu.items.map((item) => {
                              const activeSub = isItemActive(item.href);
                              const IconComponent = item.icon;

                              return (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  onClick={() => setOpenDesktopDropdown(null)}
                                  className={`flex items-start gap-3 p-2.5 rounded-xl transition-all group/item ${
                                    activeSub
                                      ? "bg-emerald-50/80 border border-emerald-200/60"
                                      : "hover:bg-slate-50 border border-transparent"
                                  }`}
                                >
                                  {/* Single-tone unified icon container */}
                                  <div
                                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200 ${
                                      activeSub
                                        ? "bg-emerald-600 text-white shadow-xs"
                                        : "bg-emerald-50 text-emerald-700 group-hover/item:bg-emerald-600 group-hover/item:text-white"
                                    }`}
                                  >
                                    <IconComponent className="h-4 w-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5">
                                      <p
                                        className={`text-xs font-bold transition-colors ${
                                          activeSub
                                            ? "text-emerald-700"
                                            : "text-slate-800 group-hover/item:text-emerald-700"
                                        }`}
                                      >
                                        {item.label}
                                      </p>
                                      {item.badge && (
                                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                          {item.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed mt-0.5">
                                      {item.desc}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>

                          {/* Belajar Footer Link */}
                          {menu.footerLink && (
                            <div className="mt-1.5 pt-1.5 border-t border-slate-100">
                              <Link
                                href={menu.footerLink.href}
                                onClick={() => setOpenDesktopDropdown(null)}
                                className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 transition-colors group/foot"
                              >
                                <span>{menu.footerLink.label}</span>
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/foot:translate-x-1" />
                              </Link>
                            </div>
                          )}

                          {/* Bantuan Subtle Emergency Callout */}
                          {menu.hasSosAlert && (
                            <div className="mt-1.5 pt-1.5 border-t border-slate-100">
                              <Link
                                href="/konseling"
                                onClick={() => setOpenDesktopDropdown(null)}
                                className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-200/70 transition-colors group/sos"
                              >
                                <div className="flex items-center gap-2.5">
                                  <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                                    <ShieldAlert className="h-3.5 w-3.5" />
                                  </div>
                                  <div>
                                    <p className="text-xs font-bold text-slate-800 group-hover/sos:text-emerald-800 transition-colors">
                                      Butuh bantuan segera?
                                    </p>
                                    <p className="text-[10px] text-slate-500 font-medium">
                                      Akses kontak darurat & konseling cepat
                                    </p>
                                  </div>
                                </div>
                                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover/sos:text-emerald-700 transition-transform group-hover/sos:translate-x-0.5" />
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>

          {/* Actions & Mobile Trigger */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Masuk: Secondary Action */}
              <Link
                href="/admin/login"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/25 text-white hover:bg-white/10 hover:border-white/50 text-xs sm:text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <LogIn className="h-3.5 w-3.5 text-emerald-200" />
                <span>Masuk</span>
              </Link>

              {/* Jelajahi Repropedia: Primary CTA */}
              <Link
                href="/repropedia"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-4.5 py-2 sm:py-2.5 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 text-xs sm:text-sm font-extrabold transition-all shadow-sm shadow-emerald-950/20 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Jelajahi Repropedia</span>
                <ArrowRight className="h-3.5 w-3.5 text-emerald-700" />
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-xl text-white hover:bg-white/10 lg:hidden transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                aria-label={isOpen ? "Tutup menu" : "Buka menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Option A: Full-Screen Pure White Sheet) */}
      {isOpen && (
        <div className="fixed inset-0 z-[70] bg-white flex flex-col lg:hidden animate-in fade-in duration-200 text-slate-900">
          {/* Drawer Header */}
          <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 shrink-0">
            <Link
              href="/beranda"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 group focus-visible:outline-none"
            >
              <span className="text-3xl font-black tracking-tighter text-emerald-700 select-none lowercase">
                sigma<span className="text-emerald-500">.</span>
              </span>
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all"
              aria-label="Tutup navigasi"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Drawer Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-2 pb-36">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 pb-1">
              Navigasi
            </p>

            {menuStructure.map((menu) => {
              const active = isActive(menu);

              if (menu.type === "link") {
                return (
                  <Link
                    key={menu.label}
                    href={menu.href}
                    onClick={() => setIsOpen(false)}
                    className={`min-h-[48px] px-4 py-3 rounded-xl text-base font-bold transition-all flex items-center justify-between active:scale-[0.99] ${
                      active
                        ? "bg-emerald-50 text-emerald-800 border-l-4 border-emerald-600 shadow-xs"
                        : "text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    <span>{menu.label}</span>
                    <ChevronRight
                      className={`h-4 w-4 ${
                        active ? "text-emerald-600" : "text-slate-400"
                      }`}
                    />
                  </Link>
                );
              }

              const isAccordionOpen = openMobileAccordion === menu.label;

              return (
                <div key={menu.label} className="space-y-1">
                  <button
                    type="button"
                    onClick={() => toggleMobileAccordion(menu.label)}
                    className={`w-full min-h-[48px] px-4 py-3 rounded-xl text-base font-bold transition-all flex items-center justify-between active:scale-[0.99] ${
                      active
                        ? "bg-emerald-50/70 text-emerald-800"
                        : "text-slate-800 hover:bg-slate-50"
                    }`}
                  >
                    <span>{menu.label}</span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-200 ${
                        isAccordionOpen
                          ? "rotate-180 text-emerald-600"
                          : "text-slate-400"
                      }`}
                    />
                  </button>

                  {/* 1-Level Accordion Content */}
                  {isAccordionOpen && (
                    <div className="mt-1 space-y-1.5 p-2.5 bg-slate-50/90 rounded-2xl border border-slate-200/70">
                      {menu.items.map((item) => {
                        const IconComponent = item.icon;
                        const activeSub = isItemActive(item.href);

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`min-h-[50px] flex items-center gap-3 p-3 rounded-xl transition-all active:scale-[0.99] ${
                              activeSub
                                ? "bg-emerald-50/90 border border-emerald-200 text-emerald-950 shadow-xs"
                                : "bg-white border border-slate-200/60 hover:border-slate-300 text-slate-800 shadow-2xs"
                            }`}
                          >
                            {/* Single-tone unified icon in mobile */}
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                activeSub
                                  ? "bg-emerald-600 text-white shadow-xs"
                                  : "bg-emerald-50 text-emerald-700"
                              }`}
                            >
                              <IconComponent className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                              <div className="flex items-center gap-1.5">
                                <p
                                  className={`text-sm font-bold leading-tight ${
                                    activeSub
                                      ? "text-emerald-900"
                                      : "text-slate-800"
                                  }`}
                                >
                                  {item.label}
                                </p>
                                {item.badge && (
                                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p
                                className={`text-xs mt-0.5 leading-snug line-clamp-1 ${
                                  activeSub
                                    ? "text-emerald-700/90 font-medium"
                                    : "text-slate-500 font-normal"
                                }`}
                              >
                                {item.desc}
                              </p>
                            </div>
                            <ChevronRight
                              className={`h-4 w-4 shrink-0 ${
                                activeSub
                                  ? "text-emerald-600"
                                  : "text-slate-300"
                              }`}
                            />
                          </Link>
                        );
                      })}

                      {/* Belajar Footer Link */}
                      {menu.footerLink && (
                        <Link
                          href={menu.footerLink.href}
                          onClick={() => setIsOpen(false)}
                          className="min-h-[44px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-100/50 transition-colors"
                        >
                          <span>→ {menu.footerLink.label}</span>
                          <ArrowRight className="h-3.5 w-3.5 text-emerald-600" />
                        </Link>
                      )}

                      {/* Bantuan Subtle Callout */}
                      {menu.hasSosAlert && (
                        <Link
                          href="/konseling"
                          onClick={() => setIsOpen(false)}
                          className="min-h-[48px] flex items-center justify-between p-3 rounded-xl bg-rose-50/80 border border-rose-100 text-rose-900 hover:bg-rose-100/80 transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                              <ShieldAlert className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-rose-900">
                                Butuh Bantuan Cepat?
                              </p>
                              <p className="text-[10px] text-rose-600 font-medium">
                                Akses nomor darurat & konseling
                              </p>
                            </div>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-rose-500" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Drawer Footer Actions (Sticky at bottom) */}
          <div className="p-4 sm:p-6 border-t border-slate-100 bg-white/95 backdrop-blur-md space-y-2.5 shadow-lg shadow-slate-900/5">
            <Link
              href="/admin/login"
              onClick={() => setIsOpen(false)}
              className="w-full h-12 flex items-center justify-center gap-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 text-sm font-bold transition-all active:scale-[0.99]"
            >
              <LogIn className="h-4 w-4 text-slate-500" />
              <span>Masuk</span>
            </Link>
            <Link
              href="/repropedia"
              onClick={() => setIsOpen(false)}
              className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-extrabold shadow-md shadow-emerald-700/20 transition-all active:scale-[0.99]"
            >
              <span>Jelajahi Repropedia</span>
              <ArrowRight className="h-4 w-4 text-white" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}