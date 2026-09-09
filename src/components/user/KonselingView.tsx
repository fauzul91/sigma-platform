"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  MessageCircle,
  MapPin,
  Clock,
  Navigation,
  ChevronRight,
  ShieldCheck,
  HeartHandshake,
  UserCheck,
  Building2,
  Stethoscope,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { userService } from "@/services/user/userService";
import { Counselor } from "@/types";
import { ListSkeleton } from "@/components/shared/Skeletons";
import PageHeader from "@/components/shared/PageHeader";

interface FlowNode {
  id: string;
  stepNum: string;
  title: string;
  shortLabel: string;
  subtitle: string;
  description: string;
  actionRequired: string;
  icon: any;
}

export default function KonselingView() {
  const [selectedNode, setSelectedNode] = useState<string>("siswa");
  const [counselingDirectory, setCounselingDirectory] = useState<Counselor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [roleFilter, setRoleFilter] = useState<string>("all");

  useEffect(() => {
    setIsLoading(true);
    userService.getCounselors().then((data) => {
      setCounselingDirectory(data);
      setIsLoading(false);
    });
  }, []);

  const flowchartNodes: Record<string, FlowNode> = {
    siswa: {
      id: "siswa",
      stepNum: "01",
      title: "Siswa Remaja (Kamu)",
      shortLabel: "1. Mulai Cerita",
      subtitle: "Langkah awal saat butuh tempat aman untuk curhat",
      description:
        "Ketika kamu merasa cemas, bingung seputar perubahan pubertas, menghadapi tekanan pernikahan dini, atau mengalami perlakuan tidak pantas/kekerasan.",
      actionRequired:
        "Hubungi Kader GARUDA secara anonim atau tekan tombol darurat SOS di website jika membutuhkan pertolongan segera.",
      icon: UserCheck,
    },
    kader: {
      id: "kader",
      stepNum: "02",
      title: "Kader GARUDA (Sebaya)",
      shortLabel: "2. Kader Sebaya",
      subtitle: "Teman sebaya terlatih & pendengar tanpa stigma",
      description:
        "Teman seusiamu yang telah dibekali pelatihan konseling ramah remaja. Siap mendengarkan ceritamu, menjaga rahasia 100%, dan memberikan dukungan emosional.",
      actionRequired:
        "Untuk keluhan ringan dan curhat harian diselesaikan di tahap ini. Jika butuh tindakan formal atau mediasi sekolah, kader mendampingimu ke Guru BK.",
      icon: HeartHandshake,
    },
    bk: {
      id: "bk",
      stepNum: "03",
      title: "Guru Bimbingan Konseling (BK)",
      shortLabel: "3. Guru BK",
      subtitle: "Pendampingan formal & perlindungan di lingkungan sekolah",
      description:
        "Guru BK sekolah berwenang memediasi masalah dengan pihak sekolah, berkomunikasi dengan orang tua, serta mencegah risiko putus sekolah akibat pernikahan dini.",
      actionRequired:
        "Jika ditemukan keluhan fisik reproduksi atau trauma berat, Guru BK berkoordinasi untuk membuat surat rujukan resmi ke Puskesmas.",
      icon: Building2,
    },
    puskesmas: {
      id: "puskesmas",
      stepNum: "04",
      title: "Unit KIA / KB Puskesmas",
      shortLabel: "4. Puskesmas",
      subtitle: "Pemeriksaan medis resmi & edukasi klinis",
      description:
        "Tenaga medis profesional (dokter dan bidan desa) memeriksa kesehatan fisik organ reproduksi secara rahasia, memberikan pengobatan, serta validasi medis.",
      actionRequired:
        "Jika siswa memerlukan terapi pemulihan psikologis mendalam dari dampak kekerasan seksual, pihak medis merujuk ke Psikolog Klinis.",
      icon: Stethoscope,
    },
    psikolog: {
      id: "psikolog",
      stepNum: "05",
      title: "Psikolog Profesional",
      shortLabel: "5. Pemulihan Jiwa",
      subtitle: "Terapi trauma mendalam & pemulihan holistik",
      description:
        "Psikolog klinis atau psikiater memberikan konseling intensif untuk menyembuhkan trauma, memulihkan kepercayaan diri, dan menata masa depan remaja.",
      actionRequired:
        "Tahap pendampingan lanjutan hingga remaja kembali pulih, berdaya, dan siap melanjutkan cita-citanya.",
      icon: Sparkles,
    },
  };

  const filteredCounselors = useMemo(() => {
    if (roleFilter === "all") return counselingDirectory;
    return counselingDirectory.filter((c) => {
      const r = c.role.toLowerCase();
      if (roleFilter === "kader") return r.includes("kader") || r.includes("sebaya");
      if (roleFilter === "bk") return r.includes("bk") || r.includes("guru");
      if (roleFilter === "puskesmas") return r.includes("puskesmas");
      if (roleFilter === "psikolog") return r.includes("psikolog");
      return true;
    });
  }, [counselingDirectory, roleFilter]);

  const activeNode = flowchartNodes[selectedNode];
  const ActiveIcon = activeNode.icon;

  const getRoleBadgeStyle = (role: string) => {
    const r = role.toLowerCase();
    if (r.includes("kader") || r.includes("sebaya")) {
      return "bg-emerald-50 text-emerald-800 border-emerald-200";
    }
    if (r.includes("bk") || r.includes("guru")) {
      return "bg-blue-50 text-blue-800 border-blue-200";
    }
    if (r.includes("puskesmas")) {
      return "bg-teal-50 text-teal-800 border-teal-200";
    }
    if (r.includes("psikolog")) {
      return "bg-purple-50 text-purple-800 border-purple-200";
    }
    return "bg-slate-50 text-slate-700 border-slate-200";
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* 1. Page Header */}
      <PageHeader
        title="RUJUKAN & KONSELING"
        description="Ruang aman dan pendampingan konseling ramah remaja. Hubungi konselor sebaya terlatih atau akses alur rujukan medis resmi secara rahasia dan bebas stigma."
        badge="RUANG AMAN & RAHASIA"
        type="konseling"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-8 md:py-12 space-y-12 sm:space-y-14">

        {/* 2. SAFE SPACE REASSURANCE BANNER */}
        <div className="bg-gradient-to-br from-emerald-50 via-teal-50/40 to-amber-50/40 rounded-3xl p-6 sm:p-8 border border-emerald-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow-2xs">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>100% Rahasia &amp; Bebas Penghakiman</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              Kamu Berhak Didengarkan dan Dilindungi
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Semua cerita, keluhan, dan konsultasimu dijamin kerahasiaannya. Kader GARUDA dan jaringan rujukan SIGMA siap mendampingimu mencari jalan keluar terbaik tanpa rasa takut atau malu.
            </p>
          </div>

          {/* Quick Pillars */}
          <div className="flex flex-wrap md:flex-col gap-2 shrink-0 border-t md:border-t-0 md:border-l border-emerald-200/60 pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
            <div className="px-3.5 py-1.5 rounded-xl bg-white/90 border border-emerald-200/70 shadow-2xs text-xs font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Tanpa Biaya (Gratis)</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white/90 border border-emerald-200/70 shadow-2xs text-xs font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Konselor Sebaya Terlatih</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-white/90 border border-emerald-200/70 shadow-2xs text-xs font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              <span>Rujukan Medis &amp; BK Siap</span>
            </div>
          </div>
        </div>

        {/* 3. MINIMALIST STEPPER: ALUR RUJUKAN */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 md:p-10 shadow-xs space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              Alur Layanan Pendampingan &amp; Rujukan
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Pilih salah satu tahapan untuk melihat alur penanganan bertahap yang aman bagi siswa.
            </p>
          </div>

          {/* Horizontal Segmented Stepper */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start md:justify-center">
            {Object.values(flowchartNodes).map((node, index) => {
              const isSelected = selectedNode === node.id;
              return (
                <React.Fragment key={node.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedNode(node.id)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all shrink-0 cursor-pointer flex items-center gap-2 border shadow-2xs ${isSelected
                      ? "bg-emerald-700 text-white border-emerald-800 shadow-md ring-2 ring-emerald-600/30 scale-102"
                      : "bg-slate-50 text-slate-600 border-slate-200/80 hover:bg-slate-100 hover:text-slate-900"
                      }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center ${isSelected ? "bg-white text-emerald-800" : "bg-slate-200 text-slate-600"
                        }`}
                    >
                      {index + 1}
                    </span>
                    <span>{node.shortLabel.split(". ")[1]}</span>
                  </button>

                  {index < 4 && (
                    <ChevronRight className="h-4 w-4 text-slate-300 shrink-0 hidden md:block" />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Active Stage Detail Card */}
          <div className="p-6 sm:p-7 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 shadow-xs space-y-5 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-200/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black shadow-sm">
                  <ActiveIcon className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded border border-emerald-200">
                      Tahap {activeNode.stepNum}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900">
                      {activeNode.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {activeNode.subtitle}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1.5 shadow-2xs">
                <p className="font-extrabold text-slate-800 uppercase tracking-wide text-[10px] text-emerald-800">
                  Kondisi yang Dihadapi:
                </p>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {activeNode.description}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200/80 space-y-1.5 shadow-2xs">
                <p className="font-extrabold text-slate-800 uppercase tracking-wide text-[10px] text-emerald-800">
                  Tindakan &amp; Langkah Rujukan:
                </p>
                <p className="text-slate-600 font-medium leading-relaxed">
                  {activeNode.actionRequired}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. DIREKTORI KONTAK PENDAMPING */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Direktori Kontak Pendamping
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Pilih pendamping sebaya, guru BK, atau unit medis resmi untuk berkonsultasi langsung.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {[
                { key: "all", label: "Semua" },
                { key: "kader", label: "Kader Sebaya" },
                { key: "bk", label: "Guru BK" },
                { key: "puskesmas", label: "Puskesmas" },
                { key: "psikolog", label: "Psikolog" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setRoleFilter(tab.key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${roleFilter === tab.key
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <ListSkeleton />
              <ListSkeleton />
              <ListSkeleton />
              <ListSkeleton />
            </div>
          ) : filteredCounselors.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200/80 p-6 space-y-2">
              <p className="text-sm font-bold text-slate-700">Tidak ada kontak untuk kategori ini</p>
              <p className="text-xs text-slate-400">Silakan pilih kategori lain atau tampilkan semua kontak.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredCounselors.map((contact) => {
                const waNumberClean = contact.whatsappNumber.replace(/[^0-9]/g, "");
                const waGreeting = encodeURIComponent(
                  `Halo ${contact.name}, saya siswa yang ingin berkonsultasi mengenai informasi/pendampingan dari Program SIGMA.`
                );
                const waUrl = `https://wa.me/${waNumberClean}?text=${waGreeting}`;

                return (
                  <div
                    key={contact.id}
                    className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-3.5">
                      {/* Top Meta: Role badge & Name */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${getRoleBadgeStyle(
                              contact.role
                            )}`}
                          >
                            {contact.role}
                          </span>
                          <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                            {contact.name}
                          </h3>
                        </div>
                      </div>

                      {/* Details: Clock & Location */}
                      <div className="space-y-2 text-xs text-slate-600 font-medium pt-1">
                        <p className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-emerald-600 shrink-0" />
                          <span>{contact.operationalHours}</span>
                        </p>
                        {contact.locationName && (
                          <p className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-snug">{contact.locationName}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-slate-100 flex items-center gap-2.5">
                      {/* WhatsApp Button */}
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white text-xs font-black flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Chat via WhatsApp</span>
                      </a>

                      {/* Route Link Button (if map url or location exists) */}
                      {contact.locationMapUrl ? (
                        <a
                          href={contact.locationMapUrl.replace("maps/embed?pb=", "maps?pb=")}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                          title="Buka Peta Lokasi"
                        >
                          <Navigation className="h-4 w-4 text-emerald-700" />
                          <span className="hidden sm:inline">Peta</span>
                        </a>
                      ) : contact.locationName ? (
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            contact.locationName
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                          title="Buka Peta Lokasi"
                        >
                          <Navigation className="h-4 w-4 text-emerald-700" />
                          <span className="hidden sm:inline">Peta</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
