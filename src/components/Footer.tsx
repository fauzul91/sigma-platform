"use client";

import React from "react";
import Link from "next/link";
import { Activity, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-dark text-slate-300 mt-auto border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <Link href="/beranda" className="flex items-center space-x-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <span className="font-extrabold text-white text-lg leading-none tracking-tight block">
                  SIGMA
                </span>
                <span className="text-[10px] text-primary font-bold tracking-wider uppercase block">
                  Reproductive Health
                </span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Program SIGMA adalah platform digital edukasi kesehatan reproduksi remaja, pencegahan perkawinan anak, dan akses cepat layanan rujukan konseling sebaya & medis. Dikelola oleh Kader GARUDA.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-slate-400 hover:text-white" aria-label="Instagram">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-slate-400 hover:text-white" aria-label="YouTube">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163c-.272-1.016-1.072-1.816-2.088-2.088C19.565 3.545 12 3.545 12 3.545s-7.565 0-9.41.53c-1.016.272-1.816 1.072-2.088 2.088C0 8.008 0 12 0 12s0 3.992.502 5.837c.272 1.016 1.072 1.816 2.088 2.088 1.845.53 9.41.53 9.41.53s7.565 0 9.41-.53c1.016-.272 1.816-1.072 2.088-2.088.502-1.845.502-5.837.502-5.837s0-3.992-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors text-slate-400 hover:text-white" aria-label="Facebook">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Layanan Literasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/repropedia" className="hover:text-white transition-colors">Repropedia Hub</Link>
              </li>
              <li>
                <Link href="/edukasi" className="hover:text-white transition-colors">Edukasi & Media</Link>
              </li>
              <li>
                <Link href="/karya-kader" className="hover:text-white transition-colors">Karya Kader</Link>
              </li>
              <li>
                <Link href="/kuis" className="hover:text-white transition-colors">Kuis Kesehatan</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Sekretariat & Hubungi</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                <span>Jl. Garuda No. 45, Kecamatan Sehat, Kabupaten Aman, Indonesia</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <span>kader.garuda@sigma-repro.org</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>&copy; {currentYear} Program SIGMA (Kader GARUDA). All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link href="/admin/dashboard" className="hover:text-slate-400">Dashboard Pengelola</Link>
            <Link href="/tentang" className="hover:text-slate-400">Tentang Kami</Link>
            <Link href="/kontak" className="hover:text-slate-400">Kontak</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
