"use client";

import React from "react";
import Link from "next/link";
import { Activity, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-primary text-white pt-16 pb-12 sm:pt-20 sm:pb-16 mt-auto">
      {/* 1. TOP HOOK HEADLINE (NO BUTTONS, SOLID BG-PRIMARY) */}
      <div className="max-w-4xl mx-auto px-6 text-center space-y-3">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
          Bersama SIGMA, Ciptakan Ruang Aman &amp; Wujudkan Masa Depan Gemilang Remaja
        </h2>
        <p className="text-emerald-100/90 text-sm sm:text-base font-medium max-w-2xl mx-auto leading-relaxed">
          Edukasi kesehatan reproduksi yang inklusif, pendampingan konseling ramah remaja, dan kolaborasi nyata bersama kader muda di Desa Gunungmalang.
        </p>
      </div>

      {/* 2. GIANT WHITE ROUNDED CARD CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-14">
        <div className="bg-white rounded-[32px] md:rounded-[44px] p-8 sm:p-12 lg:p-14 text-neutral-dark shadow-2xl">

          {/* Main 4-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">

            {/* Kolom 1: SIGMA & Deskripsi Program */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                PROGRAM SIGMA
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                Program SIGMA (Sinergi Edukasi dan Pencegahan Perkawinan Anak) adalah platform digital edukasi kesehatan reproduksi remaja, pencegahan perkawinan anak, dan akses cepat layanan rujukan konseling sebaya &amp; medis. Dikelola bersama kader muda di Desa Gunungmalang.
              </p>
            </div>

            {/* Kolom 2: Eksplorasi (Urutan: beranda, repro, edukasi, karya kader, kuis, FAQ) */}
            <div className="lg:col-span-2 sm:pl-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Eksplorasi
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-slate-600">
                <li>
                  <Link href="/beranda" className="hover:text-primary transition-colors">
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link href="/repropedia" className="hover:text-primary transition-colors">
                    Repropedia
                  </Link>
                </li>
                <li>
                  <Link href="/edukasi" className="hover:text-primary transition-colors">
                    Edukasi
                  </Link>
                </li>
                <li>
                  <Link href="/karya-kader" className="hover:text-primary transition-colors">
                    Karya Kader
                  </Link>
                </li>
                <li>
                  <Link href="/kuis" className="hover:text-primary transition-colors">
                    Kuis
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-primary transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Kolom 3: Aktivitas (Urutan: Galeri, kegiatan, konseling) */}
            <div className="lg:col-span-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                Aktivitas
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-slate-600">
                <li>
                  <Link href="/kegiatan" className="hover:text-primary transition-colors">
                    Galeri
                  </Link>
                </li>
                <li>
                  <Link href="/kegiatan" className="hover:text-primary transition-colors">
                    Kegiatan
                  </Link>
                </li>
                <li>
                  <Link href="/konseling" className="hover:text-primary transition-colors">
                    Konseling
                  </Link>
                </li>
              </ul>
            </div>

            {/* Kolom 4: Maps SIGMA (SMPN 4 Sumberjambe) */}
            <div className="lg:col-span-4 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Maps SIGMA
              </h3>
              <div className="flex items-start space-x-1.5 text-xs font-bold text-slate-700">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <span>SMPN 4 Sumberjambe</span>
                  <p className="text-[11px] font-normal text-slate-500 leading-tight">
                    Gunungmalang, Kec. Sumberjambe, Kab. Jember, Jawa Timur
                  </p>
                </div>
              </div>

              {/* Responsive Google Maps Embed */}
              <div className="w-full h-36 sm:h-40 rounded-2xl overflow-hidden border border-slate-200 shadow-xs relative bg-slate-100">
                <iframe
                  src="https://maps.google.com/maps?q=SMPN+4+Sumberjambe,+Gunungmalang,+Jember&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Lokasi SMPN 4 Sumberjambe"
                  className="w-full h-full"
                />
              </div>

              <div>
                <a
                  href="https://maps.google.com/?q=SMPN+4+Sumberjambe,+Gunungmalang,+Jember"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-primary hover:underline"
                >
                  <span>Buka di Google Maps</span>
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>

          </div>

          {/* Divider */}
          <div className="border-t border-slate-100 my-8 sm:my-10" />

          {/* Bottom Row: Big Bold Wordmark, Social Media & Copyright */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Big Stylish SIGMA Wordmark */}
            <div className="flex items-baseline space-x-3">
              <span className="text-4xl sm:text-5xl font-black tracking-tighter text-primary select-none lowercase">
                sigma
              </span>
              <span className="text-xs font-bold text-slate-400 hidden sm:inline-block">
                • Ruang Aman Remaja
              </span>
            </div>

            {/* Social Media: Instagram & TikTok @promahadesagunungmalang */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-xs font-bold text-slate-400 mr-1">Social Media:</span>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/promahadesa.sigma"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-pink-50 text-slate-700 hover:text-pink-600 transition-all text-xs font-bold group"
              >
                <svg className="h-4 w-4 fill-current text-pink-600 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                <span>@promahadesa.sigma</span>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@promahadesa.sigma"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-950 transition-all text-xs font-bold group"
              >
                <svg className="h-3.5 w-3.5 fill-current text-slate-900 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                </svg>
                <span>@promahadesa.sigma</span>
              </a>
            </div>

            {/* Copyright & Meta */}
            <div className="text-center md:text-right text-xs text-slate-400 font-medium">
              <p>&copy; {currentYear} Program SIGMA. All rights reserved.</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Promahadesa Desa Gunungmalang
              </p>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}
