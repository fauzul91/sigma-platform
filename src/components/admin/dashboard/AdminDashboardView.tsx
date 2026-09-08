"use client";

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  FileText,
  Users,
  Clock,
  TrendingUp,
  Award,
  UserCheck,
  Edit3,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  MoreVertical,
  Plus
} from "lucide-react";
import Link from "next/link";
import { AdminDashboardStats } from "@/types";
import { AnalyticsSummaryData } from "@/services/analyticsService";

interface AdminDashboardViewProps {
  stats: AdminDashboardStats;
  isLoading: boolean;
}

export default function AdminDashboardView({
  stats,
  isLoading,
}: AdminDashboardViewProps) {
  const [analytics, setAnalytics] = useState<AnalyticsSummaryData | null>(null);

  // Fetch live web analytics data from /api/analytics/track
  useEffect(() => {
    let isMounted = true;
    fetch(`/api/analytics/track?period=30d`)
      .then((res) => res.json())
      .then((res) => {
        if (isMounted && res.success) {
          setAnalytics(res.data);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-10">
      {/* 1. Header & Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
            Halo, Admin! <span className="animate-bounce origin-bottom inline-block">👋</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Selamat datang kembali. Berikut adalah ringkasan aktivitas konten dan komunitas hari ini.
          </p>
        </div>

        <div className="flex items-center shrink-0">
          <Link
            href="/admin/edukasi"
            className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-500/20 transition-all flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Buat Edukasi</span>
          </Link>
        </div>
      </div>

      {/* 2. Stat Cards (Meridian Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
        
        {/* Card 1: Distribusi Status Media & Edukasi */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <FileText className="h-6 w-6" />
            </div>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold uppercase tracking-wide rounded-lg border border-emerald-100">
              Edukasi & Media
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-800">
              {isLoading ? "..." : stats.totalMedia}
            </h3>
            <p className="text-sm text-slate-500 font-medium mt-1">Total Artikel & Video</p>
          </div>
          
          <div className="mt-5 pt-5 border-t border-slate-100 space-y-3">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">Terbit</span>
              <span className="text-emerald-600">Aktif</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden flex">
              <div className="bg-emerald-500 h-2 rounded-l-full" style={{ width: '85%' }}></div>
              <div className="bg-slate-400 h-2" style={{ width: '10%' }}></div>
              <div className="bg-slate-200 h-2 rounded-r-full" style={{ width: '5%' }}></div>
            </div>
            <div className="flex items-center space-x-4 text-[10px] font-bold text-slate-400">
              <div className="flex items-center space-x-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span>Published</span></div>
              <div className="flex items-center space-x-1"><div className="w-2 h-2 rounded-full bg-slate-400"></div><span>Draft</span></div>
              <div className="flex items-center space-x-1"><div className="w-2 h-2 rounded-full bg-slate-200"></div><span>Review</span></div>
            </div>
          </div>
        </div>

        {/* Card 2: Ringkasan Pengunjung */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl">
              <Users className="h-6 w-6" />
            </div>
            <span className="px-2.5 py-1 bg-teal-50 text-teal-700 text-[11px] font-bold uppercase tracking-wide rounded-lg border border-teal-100">
              Trafik Pembaca
            </span>
          </div>
          <div>
            <h3 className="text-3xl font-black text-slate-800">
              {analytics ? analytics.totalUniqueVisitors.toLocaleString("id-ID") : "1.250"}
            </h3>
            <p className="text-sm text-slate-500 font-medium mt-1">Pembaca Aktif (30 Hari)</p>
          </div>
          
          <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-full">
                <TrendingUp className="h-4 w-4" />
              </div>
              <span className="text-sm font-bold text-emerald-600">+12.5%</span>
            </div>
            <span className="text-xs text-slate-400 font-medium">Bulan sebelumnya</span>
          </div>
        </div>

        {/* Card 3: Data Komunitas GARUDA - Distinct Color Scheme */}
        <div className="bg-emerald-700 p-6 rounded-3xl shadow-sm flex flex-col justify-between relative overflow-hidden text-white">
          <div className="absolute -top-12 -right-12 h-32 w-32 bg-emerald-600 rounded-full blur-2xl"></div>
          
          <div className="flex items-start justify-between mb-4 relative z-10">
            <div className="p-3 bg-emerald-600 text-emerald-50 rounded-2xl shadow-sm">
              <Award className="h-6 w-6" />
            </div>
            <span className="px-2.5 py-1 bg-emerald-600/80 text-emerald-50 text-[11px] font-bold uppercase tracking-wide rounded-lg border border-emerald-500">
              Kader Garuda
            </span>
          </div>
          <div className="relative z-10">
            <h3 className="text-3xl font-black text-white">
              {isLoading ? "..." : stats.totalCounselors}
            </h3>
            <p className="text-sm text-emerald-100 font-medium mt-1">Kader Remaja Aktif</p>
          </div>
          
          <div className="mt-5 pt-5 border-t border-emerald-600/50 space-y-3 relative z-10">
             <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-800/40 border border-emerald-600/50">
                <div className="flex items-center space-x-3">
                  <UserCheck className="h-5 w-5 text-emerald-300" />
                  <span className="text-sm font-bold text-emerald-50">Telah Diverifikasi</span>
                </div>
                <span className="text-sm font-black text-white">82%</span>
             </div>
          </div>
        </div>
      </div>

      {/* 3. Main Grid Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left Col (2/3): Katalog Konten Edukasi */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-500" />
              Konten Edukasi & Media Terbaru
            </h2>
            <Link href="/admin/edukasi" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group">
              Lihat Semua <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {isLoading ? (
              <div className="text-sm text-slate-400">Memuat konten...</div>
            ) : (
              stats.recentItems.slice(0, 3).map((item, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-5 border border-slate-200/60 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 group-hover:scale-110 transition-transform">
                        <FileText className="h-6 w-6" />
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-600 text-[10px] font-extrabold uppercase border border-emerald-100">
                        {item.label}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-800 mb-1 line-clamp-2">{item.title}</h3>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                    <span className="text-[11px] font-bold text-slate-400">{item.createdAt}</span>
                    <Link href="/admin/edukasi" className="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 text-xs font-bold transition-colors">
                      Kelola Konten
                    </Link>
                  </div>
                </div>
              ))
            )}

            {/* Create New Item */}
            <Link href="/admin/edukasi" className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-3xl p-5 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-emerald-300 transition-colors cursor-pointer min-h-[180px]">
              <div className="w-12 h-12 rounded-full bg-white text-emerald-500 shadow-sm flex items-center justify-center mb-3">
                <Plus className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-700">Buat Edukasi Baru</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-[200px]">Mulai draft artikel atau materi edukasi video untuk remaja</p>
            </Link>
          </div>
        </div>

        {/* Right Col (1/3): Feed Aktivitas */}
        <div className="space-y-6">
           <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
              <Clock className="h-5 w-5 text-emerald-500" />
              Log Aktivitas
            </h2>
            <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors">
              <MoreVertical className="h-4 w-4" />
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="p-6 space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse shrink-0"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-3 bg-slate-100 animate-pulse rounded w-3/4"></div>
                      <div className="h-2 bg-slate-100 animate-pulse rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {/* Item 1 */}
                <div className="p-5 flex items-start gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 font-medium leading-snug">
                      <span className="font-bold text-slate-900">Modul Repropedia</span> berhasil diterbitkan oleh <span className="font-bold text-slate-900">Dr. Sarah</span>.
                    </p>
                    <p className="text-xs text-slate-400 mt-1 font-medium">10 menit yang lalu</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="p-5 flex items-start gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                      <Users className="h-5 w-5 text-slate-500" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-teal-500 rounded-full border-2 border-white flex items-center justify-center">
                      <UserCheck className="h-2 w-2 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 font-medium leading-snug">
                      <span className="font-bold text-slate-900">Budi Santoso</span> terverifikasi sebagai Kader GARUDA (SMPN 4).
                    </p>
                    <p className="text-xs text-slate-400 mt-1 font-medium">2 jam yang lalu</p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="p-5 flex items-start gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 border border-slate-200">
                    <Edit3 className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 font-medium leading-snug">
                      Draft <span className="font-bold text-slate-900">Kuis Interaktif</span> diperbarui. Menunggu persetujuan admin.
                    </p>
                    <p className="text-xs text-slate-400 mt-1 font-medium">5 jam yang lalu</p>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="p-5 flex items-start gap-4 hover:bg-slate-50/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 border border-slate-200">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-700 font-medium leading-snug">
                      Terdapat 3 laporan dari fitur <span className="font-bold text-slate-900">Konseling Sebaya</span> yang belum diulas.
                    </p>
                    <p className="text-xs text-slate-400 mt-1 font-medium">1 hari yang lalu</p>
                  </div>
                </div>

              </div>
            )}
            
            <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
              <button className="text-xs font-bold text-slate-500 hover:text-emerald-600 transition-colors">
                Tampilkan Semua Aktivitas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
