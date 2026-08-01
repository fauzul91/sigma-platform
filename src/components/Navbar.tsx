"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, Menu, X, Shield, Activity, HelpCircle } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/beranda", label: "Beranda" },
    { href: "/tentang", label: "Tentang" },
    { href: "/repropedia", label: "Repropedia" },
    { href: "/edukasi", label: "Edukasi" },
    { href: "/karya-kader", label: "Karya Kader" },
    { href: "/kegiatan", label: "Kegiatan" },
    { href: "/konseling", label: "Konseling" },
    { href: "/statistik", label: "Statistik" },
    { href: "/kuis", label: "Kuis" },
    { href: "/kontak", label: "Kontak" },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/edukasi?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsOpen(false);
    }
  };

  const isActive = (path: string) => {
    if (path === "/beranda" && pathname === "/") return true;
    return pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "glass-nav shadow-md py-3"
          : "bg-white/95 md:bg-transparent py-4 md:py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex relative max-w-xs w-full"
          >
            <input
              type="text"
              placeholder="Cari artikel, modul..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 rounded-full border border-slate-200 bg-slate-50/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          </form>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-primary bg-primary-light"
                    : "text-slate-600 hover:text-primary hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Admin Dashboard CTA & Mobile Toggle */}
          <div className="flex items-center space-x-2 shrink-0">
            <Link
              href="/admin/dashboard"
              className="hidden sm:flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-neutral-dark text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
            >
              <Shield className="h-3.5 w-3.5" />
              <span>CMS Admin</span>
            </Link>

            {/* Mobile Menu Button */}
            <button
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
        <div className="fixed inset-0 top-[60px] z-30 bg-white border-t border-slate-100 lg:hidden overflow-y-auto animate-in slide-in-from-top duration-200">
          <div className="p-4 space-y-4">
            
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Cari artikel, modul..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            </form>

            {/* Mobile Navigation List */}
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                    isActive(link.href)
                      ? "text-primary bg-primary-light"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Admin CTA inside mobile menu */}
              <Link
                href="/admin/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-neutral-dark text-base font-bold transition-all mt-4"
              >
                <Shield className="h-5 w-5" />
                <span>Masuk Dashboard Admin</span>
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
