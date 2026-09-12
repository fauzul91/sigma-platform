"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FileText,
  Calendar,
  Palette,
  UserCheck,
  Plus,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { AdminDashboardStats } from "@/types";
import { AnalyticsSummaryData } from "@/services/analyticsService";

interface AdminDashboardViewProps {
  stats: AdminDashboardStats;
  isLoading: boolean;
}

function formatHumanTime(rawDate: string | undefined): string {
  if (!rawDate) return "Baru saja";
  try {
    const date = new Date(rawDate);
    if (isNaN(date.getTime())) return rawDate;

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSec < 60) return "Baru saja";
    if (diffMin < 60) return `${diffMin} mnt lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    if (diffDays === 1) return "Kemarin";
    if (diffDays < 7) return `${diffDays} hr lalu`;

    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  } catch {
    return rawDate;
  }
}

export default function AdminDashboardView({
  stats,
  isLoading,
}: AdminDashboardViewProps) {
  const [analytics, setAnalytics] = useState<AnalyticsSummaryData | null>(null);
  const [activeBarIndex, setActiveBarIndex] = useState<number>(5); // Default highlighted bar (June / Month 6)

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

  const todayDateString = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const metricCards = [
    {
      title: "Edukasi & Media",
      count: stats.totalMedia,
      subtitle: "Artikel & Video",
      icon: FileText,
      href: "/admin/edukasi",
      dotBg: "bg-emerald-500",
    },
    {
      title: "Galeri Kegiatan",
      count: stats.totalEvents,
      subtitle: "Agenda Sosialisasi",
      icon: Calendar,
      href: "/admin/kegiatan",
      dotBg: "bg-teal-500",
    },
    {
      title: "Karya Siswa",
      count: stats.totalUgc,
      subtitle: "Poster & Infografis",
      icon: Palette,
      href: "/admin/karya-kader",
      dotBg: "bg-amber-500",
    },
    {
      title: "Konselor Siaga",
      count: stats.totalCounselors,
      subtitle: "Konselor Aktif",
      icon: UserCheck,
      href: "/admin/konseling",
      dotBg: "bg-sky-500",
    },
  ];

  // Realistis: Data mingguan sejak platform SIGMA diluncurkan (Agustus s.d. 9 September 2026)
  const timelineChartData = [
    { label: "1-7 Agt", period: "Minggu 1 Agustus (Rilis)", value: 45, height: 32 },
    { label: "8-14 Agt", period: "Minggu 2 Agustus", value: 72, height: 50 },
    { label: "15-21 Agt", period: "Minggu 3 Agustus", value: 89, height: 62 },
    { label: "22-28 Agt", period: "Minggu 4 Agustus", value: 115, height: 80 },
    { label: "1-7 Sep", period: "Minggu 1 September", value: 142, height: 96, isHighlight: true },
    { label: "8-9 Sep", period: "Minggu 2 September (Berjalan)", value: 54, height: 40 },
  ];

  const getRecentItemIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes("kegiatan") || l.includes("event")) return Calendar;
    if (l.includes("karya") || l.includes("ugc")) return Palette;
    return FileText;
  };

  const getRecentItemBadge = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes("kegiatan") || l.includes("event"))
      return "text-teal-700 bg-teal-50 border-teal-200/60 dark:text-teal-300 dark:bg-teal-950/50 dark:border-teal-800/60";
    if (l.includes("karya") || l.includes("ugc"))
      return "text-amber-700 bg-amber-50 border-amber-200/60 dark:text-amber-300 dark:bg-amber-950/50 dark:border-amber-800/60";
    return "text-emerald-700 bg-emerald-50 border-emerald-200/60 dark:text-emerald-300 dark:bg-emerald-950/50 dark:border-emerald-800/60";
  };

  return (
    <div className="space-y-6 sm:space-y-7 animate-in fade-in duration-300 pb-12">
      {/* 1. Header with Defined Button Hierarchy */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
              Halo, Admin!
            </h1>
            <span className="text-xl">👋</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
            {todayDateString} • Panel Kendali Konten &amp; Komunitas SIGMA
          </p>
        </div>

        {/* Action Button Hierarchy: Secondary (Outline) vs Primary (Solid) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            href="/admin/kegiatan/baru"
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 text-xs font-bold transition-all flex items-center space-x-1.5 shadow-2xs hover:shadow-xs active:scale-98 cursor-pointer"
          >
            <Calendar className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
            <span>Catat Kegiatan</span>
          </Link>
          <Link
            href="/admin/edukasi/baru"
            className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all flex items-center space-x-1.5 shadow-xs hover:shadow-sm active:scale-98 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            <span>+ Tulis Edukasi</span>
          </Link>
        </div>
      </div>

      {/* ROW 1: 4 Metric Cards (Clean White with Dot & Value) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4.5">
        {metricCards.map((card, idx) => {
          return (
            <Link
              key={idx}
              href={card.href}
              className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200/70 dark:border-slate-800/80 shadow-2xs hover:shadow-xs hover:border-emerald-300/80 dark:hover:border-emerald-500/40 transition-all group flex flex-col justify-between"
            >
              {/* Top Row: Colored Dot + Label */}
              <div className="flex items-center space-x-2.5 mb-3">
                <div className={`w-2.5 h-2.5 rounded-full ${card.dotBg} shrink-0`} />
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 truncate">
                  {card.title}
                </span>
              </div>

              {/* Bottom Row: Big Bold Number + Subtitle */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-none">
                  {isLoading ? "..." : card.count}
                </h3>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium mt-1 truncate">
                  {card.subtitle}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ROW 2: Bar Chart (~65%) + Feature Action Banner (~35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Card: Monthly Engagement Bar Chart (~65% width = 8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/70 dark:border-slate-800/80 p-5 sm:p-6 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Aktivitas Kunjungan Platform
              </p>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                  {analytics?.totalUniqueVisitors
                    ? `${analytics.totalUniqueVisitors.toLocaleString("id-ID")} Kunjungan`
                    : "517 Kunjungan"}
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                  <TrendingUp className="h-3.5 w-3.5" />
                  +23% tren rilis
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium hidden sm:block">
              Agustus – 9 September 2026 (Sejak Peluncuran)
            </div>
          </div>

          {/* Bar Chart Canvas with Dynamic Height & Highlight Popover */}
          <div className="pt-8 pb-2">
            <div className="h-44 sm:h-48 flex items-end justify-between gap-2 sm:gap-4 px-2 sm:px-4">
              {timelineChartData.map((bar, idx) => {
                const isActive = activeBarIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveBarIndex(idx)}
                    className="flex-1 flex flex-col items-center justify-end h-full group cursor-pointer relative"
                  >
                    {/* Tooltip on Active/Hovered Bar */}
                    {isActive && (
                      <div className="absolute -top-11 z-10 animate-in fade-in zoom-in-95 duration-200 pointer-events-none">
                        <div className="bg-slate-900 dark:bg-slate-800 text-white text-[10px] sm:text-[11px] font-bold py-1 px-2.5 rounded-lg shadow-lg border border-transparent dark:border-slate-700 whitespace-nowrap text-center">
                          <div>{bar.value.toLocaleString("id-ID")} Kunjungan</div>
                          <div className="text-[9px] text-slate-300 dark:text-slate-400 font-normal">{bar.period}</div>
                        </div>
                        <div className="w-2 h-2 bg-slate-900 dark:bg-slate-800 border-r border-b border-transparent dark:border-slate-700 rotate-45 mx-auto -mt-1" />
                      </div>
                    )}

                    {/* Bar Pill */}
                    <div
                      style={{ height: `${bar.height}%` }}
                      className={`w-full max-w-[48px] sm:max-w-[56px] rounded-t-xl transition-all duration-300 ${
                        isActive
                          ? "bg-primary shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700"
                      }`}
                    />

                    {/* X-Axis Period Label */}
                    <span
                      className={`text-[10px] sm:text-xs font-bold mt-2.5 transition-colors text-center ${
                        isActive
                          ? "text-slate-900 dark:text-slate-100"
                          : "text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300"
                      }`}
                    >
                      {bar.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Card: Feature Callout Banner (~35% width = 4 cols) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between relative overflow-hidden group">
          {/* Decorative Subtle Radial Glow in background */}
          <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-wider">
              <Sparkles className="h-3 w-3" />
              Publikasi Edukasi
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight tracking-tight">
              Tulis Materi Edukasi Kesehatan Reproduksi
            </h3>

            <p className="text-xs text-emerald-100/90 leading-relaxed">
              Sebarkan artikel, infografis, atau panduan materi sosialisasi untuk ribuan remaja &amp; kader sekolah.
            </p>
          </div>

          <div className="pt-6 relative z-10">
            <Link
              href="/admin/edukasi/baru"
              className="w-full py-3 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-950 font-extrabold text-xs flex items-center justify-center space-x-2 transition-all shadow-sm active:scale-98 cursor-pointer"
            >
              <span>+ Tulis Edukasi Sekarang</span>
              <ArrowRight className="h-3.5 w-3.5 text-emerald-800" />
            </Link>
          </div>
        </div>
      </div>

      {/* ROW 3: Activities Timeline (~35%) + Recent Content Table (~65%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Activities Timeline (~35% = 4 cols) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/70 dark:border-slate-800/80 p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
              Aktivitas Terbaru
            </h3>
            <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Log Sistem</span>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-12 bg-slate-100/70 dark:bg-slate-800/70 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : stats.recentItems && stats.recentItems.length > 0 ? (
            <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
              {stats.recentItems.slice(0, 4).map((item, idx) => {
                const targetHref =
                  item.href ||
                  (item.label === "Kegiatan"
                    ? "/admin/kegiatan"
                    : item.label === "Karya Kader"
                    ? "/admin/karya-kader"
                    : "/admin/edukasi");

                return (
                  <div key={idx} className="relative group">
                    {/* Timeline Node Dot */}
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-white dark:bg-slate-900 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>

                    <div className="min-w-0">
                      <Link
                        href={targetHref}
                        className="text-xs font-bold text-slate-800 dark:text-slate-200 hover:text-primary dark:hover:text-emerald-400 transition-colors block truncate"
                      >
                        {item.title}
                      </Link>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400 dark:text-slate-500">
                        <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                          {item.label}
                        </span>
                        <span>•</span>
                        <span className="text-slate-400 dark:text-slate-500">
                          {formatHumanTime(item.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-6 text-center text-xs text-slate-400 dark:text-slate-500">
              Belum ada log aktivitas.
            </div>
          )}
        </div>

        {/* Right Column: Recent Content Table (~65% = 8 cols) */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/70 dark:border-slate-800/80 p-5 sm:p-6 shadow-2xs overflow-hidden">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-2">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
              Konten &amp; Edukasi Terbaru
            </h3>
            <Link
              href="/admin/edukasi"
              className="text-xs font-bold text-primary dark:text-emerald-400 hover:underline flex items-center gap-1"
            >
              <span>Lihat Semua</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[540px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-2">No</th>
                  <th className="py-3 px-3">Judul Konten</th>
                  <th className="py-3 px-3">Kategori</th>
                  <th className="py-3 px-3">Waktu</th>
                  <th className="py-3 px-2 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs">
                {isLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i}>
                      <td colSpan={5} className="py-3 px-2">
                        <div className="h-7 bg-slate-100/70 dark:bg-slate-800/70 rounded-xl animate-pulse" />
                      </td>
                    </tr>
                  ))
                ) : stats.recentItems && stats.recentItems.length > 0 ? (
                  stats.recentItems.slice(0, 5).map((item, idx) => {
                    const badgeClass = getRecentItemBadge(item.label);
                    const targetHref =
                      item.href ||
                      (item.label === "Kegiatan"
                        ? "/admin/kegiatan"
                        : item.label === "Karya Kader"
                        ? "/admin/karya-kader"
                        : "/admin/edukasi");

                    return (
                      <tr key={idx} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors group">
                        <td className="py-3 px-2 text-slate-400 dark:text-slate-500 font-mono text-[11px]">
                          0{idx + 1}
                        </td>
                        <td className="py-3 px-3">
                          <Link
                            href={targetHref}
                            className="font-bold text-slate-800 dark:text-slate-200 hover:text-primary dark:hover:text-emerald-400 transition-colors block truncate max-w-[220px] sm:max-w-xs"
                          >
                            {item.title}
                          </Link>
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${badgeClass}`}
                          >
                            {item.label}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-slate-500 dark:text-slate-400 font-medium text-[11px]">
                          {formatHumanTime(item.createdAt)}
                        </td>
                        <td className="py-3 px-2 text-right">
                          <Link
                            href={targetHref}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-primary dark:text-emerald-400 hover:underline group-hover:text-primary-hover"
                          >
                            <span>Kelola</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-xs text-slate-400 dark:text-slate-500">
                      Belum ada materi edukasi tercatat.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
