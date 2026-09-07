"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Activity, ChevronDown } from "lucide-react";

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
    window.addEventListener("scroll", handleScroll);
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
        { label: "FAQ Umum", href: "/beranda#faq", desc: "Tanya jawab reproduksi" },
        { label: "Hubungi Kami", href: "/kontak", desc: "Alamat dan form kontak" },
      ],
    },
    {
      type: "link",
      label: "Tentang",
      href: "/tentang",
    },
  ];

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
    <header
      className={`fixed left-0 right-0 z-40 transition-all duration-300 ${isScrolled
        ? "top-0 md:top-4 py-3 md:py-0"
        : "top-0 py-4 md:py-5"
        }`}
    >
      <div
        className={`mx-auto transition-all duration-300 border ${isScrolled
          ? "max-w-7xl px-6 sm:px-10 md:max-w-6xl md:px-8 md:py-2.5 md:rounded-2xl md:bg-white md:shadow-xl md:border-slate-100 border-transparent bg-white shadow-md"
          : "max-w-7xl px-6 sm:px-10 lg:px-16 border-transparent bg-white/95 md:bg-transparent"
          }`}
      >
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/beranda" className="flex items-center space-x-2.5 shrink-0 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-neutral-dark text-lg leading-none tracking-tight block">
                SIGMA
              </span>
              <span className="text-[10px] text-primary font-bold tracking-wider uppercase block">
                Reproductive Health
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
                    className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 block ${isActive(menu)
                      ? "text-primary bg-primary-light"
                      : "text-slate-600 hover:text-primary hover:bg-slate-50"
                      }`}
                  >
                    {menu.label}
                  </Link>
                ) : (
                  <>
                    <button
                      type="button"
                      className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center space-x-1 ${isActive(menu)
                        ? "text-primary bg-primary-light"
                        : "text-slate-600 hover:text-primary hover:bg-slate-50"
                        }`}
                    >
                      <span>{menu.label}</span>
                      <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 duration-200" />
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
            {/* Button Medical Quiz (Solid Orange) */}
            <Link
              href="/kuis"
              className="hidden sm:flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition-colors shadow-sm"
            >
              <span>Medical Quiz</span>
            </Link>

            {/* Button Masuk */}
            <Link
              href="/admin/login"
              className="hidden sm:flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors shadow-sm"
            >
              <span>Masuk</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-neutral-dark lg:hidden transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 top-15 z-30 bg-white border-t border-slate-100 lg:hidden overflow-y-auto animate-in slide-in-from-top duration-200">
          <div className="p-4 space-y-4">
            <nav className="flex flex-col space-y-1">
              {menuStructure.map((menu) => (
                <div key={menu.label} className="border-b border-slate-50 pb-1">
                  {menu.type === "link" && menu.href ? (
                    <Link
                      href={menu.href}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 rounded-xl text-base font-semibold transition-all block ${isActive(menu)
                        ? "text-primary bg-primary-light"
                        : "text-slate-600 hover:bg-slate-50"
                        }`}
                    >
                      {menu.label}
                    </Link>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => toggleMobileDropdown(menu.label)}
                        className={`w-full px-4 py-3 rounded-xl text-base font-semibold transition-all flex items-center justify-between ${isActive(menu)
                          ? "text-primary bg-primary-light"
                          : "text-slate-600 hover:bg-slate-50"
                          }`}
                      >
                        <span>{menu.label}</span>
                        <ChevronDown
                          className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${openMobileDropdown === menu.label ? "rotate-180" : ""
                            }`}
                        />
                      </button>

                      {openMobileDropdown === menu.label && (
                        <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50/50 rounded-xl mt-1">
                          {menu.items?.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="block px-4 py-2.5 text-sm font-semibold text-slate-500 hover:text-primary transition-colors"
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
                  href="/kuis"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-orange-500 text-white text-base font-bold transition-all shadow-sm"
                >
                  <span>Medical Quiz</span>
                </Link>

                <Link
                  href="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-primary hover:bg-primary-hover text-white text-base font-bold transition-all shadow-sm"
                >
                  <span>Masuk</span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}