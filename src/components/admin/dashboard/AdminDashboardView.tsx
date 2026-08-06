"use client";

import React from "react";
import {
  BookOpen,
  FileText,
  Image,
  Calendar,
  Users,
  HelpCircle,
  Clock,
  Sparkles,
} from "lucide-react";
import { AdminDashboardStats } from "@/types";

interface AdminDashboardViewProps {
  stats: AdminDashboardStats;
  isLoading: boolean;
}

function formatRelativeTime(isoString: string): string {
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60_000);
  const diffHour = Math.floor(diffMs / 3_600_000);
  const diffDay = Math.floor(diffMs / 86_400_000);

  if (diffMin < 1) return "Baru saja";
  if (diffMin < 60) return `${diffMin} menit yang lalu`;
  if (diffHour < 24) return `${diffHour} jam yang lalu`;
  if (diffDay < 7) return `${diffDay} hari yang lalu`;
  return new Date(isoString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const labelColorMap: Record<string, string> = {
  Repropedia: "bg-emerald-100 text-emerald-700",
  Edukasi: "bg-blue-100 text-blue-700",
  "Karya Kader": "bg-violet-100 text-violet-700",
};

export default function AdminDashboardView({
  stats,
  isLoading,
}: AdminDashboardViewProps) {
  const cards = [
    {
      label: "Modul Repropedia",
      value: stats.totalModules,
      icon: <BookOpen className="h-5 w-5 text-emerald-600" />,
      bg: "bg-emerald-50",
      sub: "Total modul literasi",
    },
    {
      label: "Konten Edukasi",
      value: stats.totalMedia,
      icon: <FileText className="h-5 w-5 text-blue-600" />,
      bg: "bg-blue-50",
      sub: "Artikel & video",
    },
    {
      label: "Karya Kader",
      value: stats.totalUgc,
      icon: <Image className="h-5 w-5 text-violet-600" />,
      bg: "bg-violet-50",
      sub: "Poster & infografis",
    },
    {
      label: "Kegiatan",
      value: stats.totalEvents,
      icon: <Calendar className="h-5 w-5 text-amber-600" />,
      bg: "bg-amber-50",
      sub: "Event terdokumentasi",
    },
    {
      label: "Konselor Aktif",
      value: stats.totalCounselors,
      icon: <Users className="h-5 w-5 text-rose-600" />,
      bg: "bg-rose-50",
      sub: "Kader & pendamping",
    },
    {
      label: "Soal Kuis",
      value: stats.totalQuizzes,
      icon: <HelpCircle className="h-5 w-5 text-teal-600" />,
      bg: "bg-teal-50",
      sub: "Pertanyaan interaktif",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-extrabold text-neutral-dark">
          Selamat Datang, Admin
        </h1>
        <p className="text-xs text-slate-400 font-semibold mt-1">
          Ringkasan konten yang tersimpan di Supabase — diperbarui setiap sesi.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="p-5 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-3"
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.bg}`}
            >
              {card.icon}
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {card.label}
              </p>
              {isLoading ? (
                <div className="h-8 w-12 bg-slate-100 animate-pulse rounded-lg mt-1" />
              ) : (
                <h3 className="text-3xl font-extrabold text-neutral-dark mt-0.5">
                  {card.value}
                </h3>
              )}
              <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                {card.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-neutral-dark flex items-center space-x-1.5 border-b border-slate-100 pb-3">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Konten Terbaru Ditambahkan</span>
        </h3>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-4 bg-slate-100 animate-pulse rounded-md w-full"
              />
            ))}
          </div>
        ) : stats.recentItems.length === 0 ? (
          <p className="text-xs text-slate-400 font-semibold py-4 text-center">
            Belum ada konten yang ditambahkan.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100 text-xs text-slate-500 font-medium">
            {stats.recentItems.map((item, idx) => (
              <li
                key={idx}
                className="py-3 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className={`shrink-0 inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wide ${
                      labelColorMap[item.label] ?? "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="truncate text-neutral-dark font-semibold">
                    {item.title}
                  </span>
                </div>
                <span className="shrink-0 flex items-center gap-1 text-[10px] text-slate-400 font-semibold whitespace-nowrap">
                  <Clock className="h-3 w-3" />
                  {formatRelativeTime(item.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
