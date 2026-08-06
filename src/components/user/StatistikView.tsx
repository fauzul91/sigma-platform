"use client";

import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { Info, TrendingDown, Calendar, BarChart3, Database } from "lucide-react";
import { userService } from "@/services/user/userService";
import { StatRecord } from "@/types";

export default function StatistikView() {
  const [mounted, setMounted] = useState(false);
  const [statsData, setStatsData] = useState<StatRecord[]>([]);

  useEffect(() => {
    setMounted(true);
    userService.getStatisticsCases().then((data) => {
      setStatsData(data);
    });
  }, []);

  // Calculate totals per year
  const chartData = statsData.map((record) => {
    const total = 
      record["Desa Sukamaju"] + 
      record["Desa Harapan"] + 
      record["Desa Mekarjaya"] + 
      record["Desa Kertajaya"];
    return {
      ...record,
      Total: total
    };
  });

  const total2022 = chartData.find(d => d.year === 2022)?.Total || 0;
  const total2026 = chartData.find(d => d.year === 2026)?.Total || 0;
  const declinePercentage = Math.round(((total2022 - total2026) / total2022) * 100);

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h1 className="text-4xl font-extrabold text-neutral-dark tracking-tight">Statistik & Data Kasus</h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold">
            Dashboard visualisasi data perkawinan anak tingkat kecamatan di bawah pengawasan dinas kesehatan setempat.
          </p>
        </div>

        {/* Aggregated Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm flex items-center space-x-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-primary flex items-center justify-center shrink-0">
              <TrendingDown className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Penurunan Kasus</p>
              <h3 className="text-2xl font-extrabold text-neutral-dark mt-1">-{declinePercentage}%</h3>
              <p className="text-xs text-slate-500 font-medium">Sejak tahun 2022</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm flex items-center space-x-4">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tahun Pengamatan</p>
              <h3 className="text-2xl font-extrabold text-neutral-dark mt-1">5 Tahun</h3>
              <p className="text-xs text-slate-500 font-medium">2022 s.d. 2026</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-sm flex items-center space-x-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <BarChart3 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Kasus Tercatat (2026)</p>
              <h3 className="text-2xl font-extrabold text-neutral-dark mt-1">{total2026} Jiwa</h3>
              <p className="text-xs text-slate-500 font-medium">Penurunan signifikan</p>
            </div>
          </div>

        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Trend Chart (Line Chart) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-neutral-dark">Tren Kasus Tahunan (2022 - 2026)</h2>
              <p className="text-xs text-slate-400 mt-1 font-semibold">Menampilkan agregat akumulatif pernikahan anak pertahun.</p>
            </div>
            
            <div className="h-72 w-full">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} fontWeight={600} />
                    <YAxis stroke="#94a3b8" fontSize={11} fontWeight={600} />
                    <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "12px", border: "1px solid #e2e8f0" }} />
                    <Line type="monotone" dataKey="Total" stroke="#059669" strokeWidth={3} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full bg-slate-50 rounded-2xl animate-pulse" />
              )}
            </div>
          </div>

          {/* Village Comparison Chart (Bar Chart) */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-bold text-neutral-dark">Perbandingan Kasus per Desa (2025 s.d. 2026)</h2>
              <p className="text-xs text-slate-400 mt-1 font-semibold">Perbandingan efektivitas penurunan kasus antar desa.</p>
            </div>

            <div className="h-72 w-full">
              {mounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData.filter(d => d.year >= 2025)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} fontWeight={600} />
                    <YAxis stroke="#94a3b8" fontSize={11} fontWeight={600} />
                    <Tooltip contentStyle={{ fontSize: "12px", borderRadius: "12px", border: "1px solid #e2e8f0" }} />
                    <Legend wrapperStyle={{ fontSize: "11px", fontWeight: 600 }} />
                    <Bar dataKey="Desa Sukamaju" fill="#059669" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Desa Harapan" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Desa Mekarjaya" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Desa Kertajaya" fill="#ec4899" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full bg-slate-50 rounded-2xl animate-pulse" />
              )}
            </div>
          </div>

        </div>

        {/* Data Table & Privacy Disclaimer */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-4">
            <div>
              <h2 className="text-lg font-bold text-neutral-dark">Tabel Angka Kejadian Perkawinan Anak</h2>
              <p className="text-xs text-slate-400 mt-1 font-semibold">Tabel data mentah historis perkembangan daerah binaan SIGMA.</p>
            </div>

            <div className="inline-flex items-center space-x-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-slate-500 text-xs font-bold shrink-0">
              <Database className="h-4 w-4 text-primary" />
              <span>Sumber: Kantor Urusan Agama (KUA) Kec. Sehat</span>
            </div>
          </div>

          {/* Raw Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-medium text-slate-500">
              <thead className="bg-slate-50 text-neutral-dark font-extrabold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Tahun</th>
                  <th className="py-3 px-4">Desa Sukamaju</th>
                  <th className="py-3 px-4">Desa Harapan</th>
                  <th className="py-3 px-4">Desa Mekarjaya</th>
                  <th className="py-3 px-4">Desa Kertajaya</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Total Akumulasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {chartData.map((record) => (
                  <tr key={record.year} className="hover:bg-slate-50/50">
                    <td className="py-3.5 px-4 font-bold text-neutral-dark">{record.year}</td>
                    <td className="py-3.5 px-4">{record["Desa Sukamaju"]} kasus</td>
                    <td className="py-3.5 px-4">{record["Desa Harapan"]} kasus</td>
                    <td className="py-3.5 px-4">{record["Desa Mekarjaya"]} kasus</td>
                    <td className="py-3.5 px-4">{record["Desa Kertajaya"]} kasus</td>
                    <td className="py-3.5 px-4 font-bold text-primary text-right">{record.Total} kasus</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Strict Privacy Disclaimer */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/50 flex items-start space-x-3 text-amber-800">
            <Info className="h-5 w-5 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-extrabold uppercase tracking-wide">Pemberitahuan Kepatuhan Privasi (Zero-PII)</h4>
              <p className="text-[11px] leading-relaxed text-amber-700 font-semibold">
                Sesuai dengan regulasi perlindungan data pribadi dan hak asasi anak, seluruh data statistik yang ditampilkan di platform SIGMA bersifat data agregasi kuantitatif (jumlah angka kasar). Kami sama sekali tidak menyimpan, mentransmisikan, atau menampilkan data identitas personal anak (PII) seperti nama, alamat spesifik, nama orang tua, atau catatan medis individu.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
