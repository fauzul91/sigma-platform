"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Activity, ChevronDown } from "lucide-react";
import { LogIn } from "lucide-react";

interface SubmenuItem {
  label: string;
  href: string;
  desc: string;
}

interface MenuItem {
  type: "link" | "dropdown";
  label: string;
  href?: string;
  items?: SubmenuItem[];
}

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
      items: [
        { label: "Repropedia Hub", href: "/repropedia", desc: "Materi kesehatan reproduksi" },
        { label: "Artikel & Video", href: "/edukasi", desc: "Artikel edukasi dan video" },
        { label: "Kuis Kesehatan", href: "/kuis", desc: "Kuis interaktif berhadiah" },
      ],
    },
    {
      type: "dropdown",
      label: "Komunitas",
      items: [
        { label: "Karya Siswa", href: "/karya-kader", desc: "Poster & infografis siswa" },
        { label: "Kegiatan & Event", href: "/kegiatan", desc: "Dokumentasi seminar & workshop" },
      ],
    },
    {
      type: "dropdown",
      label: "Bantuan",
      items: [
        { label: "Konseling & Rujukan", href: "/konseling", desc: "Peer counseling & WhatsApp" },
        { label: "FAQ Umum", href: "/faq", desc: "Tanya jawab reproduksi" },
        { label: "Hubungi Kami", href: "/kontak", desc: "Alamat dan form kontak" },
      ],
    },
    {
      type: "link",
      label: "Tentang",
      href: "/tentang",
    },
  ];

  // Auto close mobile menu on page navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open to prevent page background scrolling
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

  useEffect(() => {
    if (!isOpen) {
      setOpenMobileDropdown(null);
    }
  }, [isOpen]);

  const isActive = (menu: MenuItem) => {
    if (menu.type === "link" && menu.href) {
      if (menu.href === "/beranda") {
        return pathname === "/beranda" || pathname === "/";
      }
      return pathname === menu.href || pathname.startsWith(menu.href + "/");
    }
    if (menu.type === "dropdown" && menu.items) {
      return menu.items.some((item) => {
        const itemPath = item.href.split("#")[0];
        if (itemPath === "/beranda" || itemPath === "/") {
          return false;
        }
        return pathname === itemPath || pathname.startsWith(itemPath + "/");
      });
    }
    return false;
  };

  const toggleMobileDropdown = (label: string) => {
    setOpenMobileDropdown((prev) => (prev === label ? null : label));
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] py-3 md:py-3.5 transition-all duration-200 ${
          isScrolled
            ? "bg-primary/95 backdrop-blur-md shadow-md shadow-emerald-950/15 border-b border-emerald-500/30"
            : "bg-primary border-b border-transparent"
        }`}
      >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/beranda" className="flex items-center space-x-2.5 shrink-0 group">
            <div className="relative z-10 flex items-center">
              <span className="text-3xl sm:text-4xl font-black tracking-tighter text-white select-none lowercase">
                sigma<span className="text-emerald-300">.</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {menuStructure.map((menu) => (
              <div key={menu.label} className="relative group">
                {menu.type === "link" && menu.href ? (
                  <Link
                    href={menu.href}
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 block ${
                      isActive(menu)
                        ? "text-white bg-emerald-700/90 shadow-xs"
                        : "text-emerald-50/90 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {menu.label}
                  </Link>
                ) : (
                  <>
                    <button
                      type="button"
                      className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-1 ${
                        isActive(menu)
                          ? "text-white bg-emerald-700/90 shadow-xs"
                          : "text-emerald-50/90 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span>{menu.label}</span>
                      <ChevronDown className="h-4 w-4 text-emerald-200 transition-transform group-hover:rotate-180 duration-200" />
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute left-0 pt-3 -mt-2 hidden group-hover:block w-64 z-50">
                      <div className="bg-white border border-slate-100 rounded-2xl shadow-xl p-2.5 animate-in fade-in slide-in-from-top-2 duration-150">
                        {menu.items?.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="block px-4 py-2.5 hover:bg-emerald-50/60 rounded-xl transition-colors group/item"
                          >
                            <p className="text-xs font-bold text-neutral-dark group-hover/item:text-primary transition-colors">
                              {item.label}
                            </p>
                            <p className="text-[10px] text-slate-400 mt-0.5 font-medium leading-normal">
                              {item.desc}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </nav>

          {/* Action CTAs & Mobile Toggle */}
          <div className="flex items-center space-x-2.5 shrink-0">
            {/* Masuk: Tombol Sekunder (Outline White) */}
            <Link
              href="/admin/login"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/30 text-white hover:bg-white/10 hover:border-white/60 text-xs sm:text-sm font-semibold transition-all group"
            >
              <span>Masuk</span>
            </Link>

            {/* Jelajahi Repropedia: Tombol Utama (Solid White Pop on Green) */}
            <Link
              href="/repropedia"
              className="hidden sm:flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white text-primary text-sm font-bold hover:bg-emerald-50 transition-all shadow-sm shadow-emerald-950/20"
            >
              <span>Jelajahi Repropedia</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 lg:hidden transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
    </header>

    {/* Mobile Drawer Overlay - Rendered as a sibling to avoid containing-block clipping from header backdrop-filter */}
    {isOpen && (
      <div
        id="mobile-nav-drawer"
        className="fixed inset-x-0 bottom-0 top-[58px] md:top-[66px] z-[55] bg-primary border-t border-emerald-500/30 lg:hidden overflow-y-auto overscroll-contain animate-in slide-in-from-top duration-200"
      >
        <div className="p-4 sm:p-6 pb-28 space-y-4 max-w-lg mx-auto">
          <nav className="flex flex-col space-y-1">
            {menuStructure.map((menu) => (
              <div key={menu.label} className="border-b border-emerald-600/40 pb-1">
                {menu.type === "link" && menu.href ? (
                  <Link
                    href={menu.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-semibold transition-all block ${
                      isActive(menu)
                        ? "text-white bg-emerald-700/90"
                        : "text-emerald-50/90 hover:bg-white/10"
                    }`}
                  >
                    {menu.label}
                  </Link>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleMobileDropdown(menu.label)}
                      className={`w-full px-4 py-3 rounded-xl text-base font-semibold transition-all flex items-center justify-between ${
                        isActive(menu)
                          ? "text-white bg-emerald-700/90"
                          : "text-emerald-50/90 hover:bg-white/10"
                      }`}
                    >
                      <span>{menu.label}</span>
                      <ChevronDown
                        className={`h-5 w-5 text-emerald-200 transition-transform duration-200 ${
                          openMobileDropdown === menu.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openMobileDropdown === menu.label && (
                      <div className="pl-4 pr-2 py-1 space-y-1 bg-emerald-700/40 rounded-xl mt-1">
                        {menu.items?.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2.5 text-sm font-semibold text-emerald-100 hover:text-white transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}

            {/* Mobile CTA Buttons */}
            <div className="pt-3 space-y-2">
              <Link
                href="/admin/login"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 text-base font-bold transition-all shadow-sm"
              >
                <span>Masuk</span>
              </Link>
              <Link
                href="/repropedia"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-white hover:bg-emerald-50 text-primary text-base font-bold transition-all shadow-sm"
              >
                <span>Jelajahi Repropedia</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    )}
  </>
  );
}