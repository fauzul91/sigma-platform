"use client";

import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  MapPin,
  Clock,
  Navigation,
  ChevronRight,
} from "lucide-react";
import { userService } from "@/services/user/userService";
import { Counselor } from "@/types";
import { ListSkeleton } from "@/components/shared/Skeletons";

interface FlowNode {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  actionRequired: string;
}

export default function KonselingView() {
  const [selectedNode, setSelectedNode] = useState<string>("siswa");
  const [counselingDirectory, setCounselingDirectory] = useState<Counselor[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

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
      title: "1. Siswa (Kamu)",
      subtitle: "Kondisi Awal / Butuh Teman Bercerita",
      description:
        "Siswa merasa cemas, bingung seputar pubertas, menghadapi ancaman pernikahan dini, atau mengalami kekerasan seksual.",
      actionRequired:
        "Mencari info di SIGMA atau menekan tombol darurat SOS untuk menghubungi bantuan.",
    },
    kader: {
      id: "kader",
      title: "2. Kader GARUDA",
      subtitle: "Konselor Sebaya (Pertolongan Pertama)",
      description:
        "Teman sebaya yang telah dilatih mendengarkan curhatan tanpa menghakimi, menjaga kerahasiaan, dan memberikan dukungan emosional dasar.",
      actionRequired:
        "Jika masalah bersifat ringan, selesai di sini. Jika perlu penanganan medis/hukum, kader mengantar ke Guru BK.",
    },
    bk: {
      id: "bk",
      title: "3. Guru BK Sekolah",
      subtitle: "Penanganan Formal Sekolah & Mediasi",
      description:
        "Guru Bimbingan Konseling profesional sekolah yang memiliki wewenang memediasi masalah dengan orang tua, pihak sekolah, dan dinas perlindungan.",
      actionRequired:
        "Jika ada gejala klinis kecemasan tinggi atau keluhan fisik reproduksi, Guru BK merujuk siswa ke Puskesmas.",
    },
    puskesmas: {
      id: "puskesmas",
      title: "4. Unit KIA/KB Puskesmas",
      subtitle: "Pemeriksaan Medis & Konsultasi Klinis",
      description:
        "Pihak medis resmi (dokter/bidan) memeriksa kesehatan organ reproduksi, memberikan obat/terapi fisik, dan memvalidasi kondisi klinis siswa.",
      actionRequired:
        "Jika siswa membutuhkan terapi trauma psikologis berat akibat kekerasan seksual, dokter merujuk ke Psikolog Klinis.",
    },
    psikolog: {
      id: "psikolog",
      title: "5. Psikolog Profesional",
      subtitle: "Terapi Pemulihan Trauma & Jiwa",
      description:
        "Tenaga ahli psikolog klinis/psikiater yang melakukan konseling intensif untuk menyembuhkan trauma mendalam dan mengembalikan kesehatan mental secara holistik.",
      actionRequired:
        "Langkah akhir pemulihan kesejahteraan jiwa siswa secara berkelanjutan.",
    },
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h1 className="text-4xl font-extrabold text-neutral-dark tracking-tight">
            Rujukan Konseling & Kontak
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold">
            Jaringan bantuan aman bagi siswa. Hubungi konselor sebaya atau
            layanan rujukan resmi di bawah ini.
          </p>
        </div>

        {/* INTERACTIVE MERMAID-LIKE STEP CHART */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-lg font-bold text-neutral-dark">
              Alur Layanan Rujukan SIGMA
            </h2>
            <p className="text-xs text-slate-400 mt-1 font-semibold">
              Klik salah satu tahap alur untuk mempelajari alurnya.
            </p>
          </div>

          {/* Graphical Flow nodes */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            {Object.values(flowchartNodes).map((node, index) => (
              <React.Fragment key={node.id}>
                {/* Node Box */}
                <button
                  onClick={() => setSelectedNode(node.id)}
                  className={`w-full lg:w-44 p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                    selectedNode === node.id
                      ? "bg-primary border-primary text-white shadow-lg scale-105"
                      : "bg-slate-50 border-slate-200 text-neutral-dark hover:bg-slate-100"
                  }`}
                >
                  <h3 className="text-xs font-extrabold uppercase tracking-wide leading-tight">
                    {node.id === "siswa"
                      ? "1. Mulai"
                      : node.id === "kader"
                        ? "2. Sebaya"
                        : node.id === "bk"
                          ? "3. Sekolah"
                          : node.id === "puskesmas"
                            ? "4. Medis"
                            : "5. Pemulihan"}
                  </h3>
                  <p className="text-[11px] font-bold mt-1 opacity-80 truncate">
                    {node.title.split(". ")[1]}
                  </p>
                </button>

                {/* Arrow indicator */}
                {index < 4 && (
                  <ChevronRight className="h-6 w-6 text-slate-300 rotate-90 lg:rotate-0 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Node detail display box */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 max-w-2xl mx-auto space-y-3 animate-in fade-in duration-300">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-extrabold text-primary bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-wider">
                  Detail Tahap Alur
                </span>
                <h3 className="text-base font-extrabold text-neutral-dark mt-1.5">
                  {flowchartNodes[selectedNode].title}
                </h3>
                <p className="text-xs text-slate-400 font-semibold">
                  {flowchartNodes[selectedNode].subtitle}
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {flowchartNodes[selectedNode].description}
            </p>
            <div className="p-3 bg-white rounded-xl border border-slate-100 text-xs text-slate-500 font-bold">
              <span className="text-primary">Tindakan Rujukan:</span>{" "}
              {flowchartNodes[selectedNode].actionRequired}
            </div>
          </div>
        </div>

        {/* CONTACT DIRECTORY GRID */}
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-neutral-dark text-center">
            Direktori Kontak Pendamping
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoading ? (
              <>
                <ListSkeleton />
                <ListSkeleton />
                <ListSkeleton />
                <ListSkeleton />
              </>
            ) : (
              counselingDirectory.map((contact) => (
              <div
                key={contact.id}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-205"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="px-2.5 py-0.5 rounded bg-emerald-50 text-primary text-[10px] font-extrabold uppercase tracking-wide">
                        {contact.role}
                      </span>
                      <h3 className="text-lg font-bold text-neutral-dark mt-2">
                        {contact.name}
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-500 font-medium">
                    <p className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-slate-400 shrink-0" />
                      <span>{contact.operationalHours}</span>
                    </p>
                    {contact.locationName && (
                      <p className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                        <span>{contact.locationName}</span>
                      </p>
                    )}
                  </div>

                  {/* Embedded Google Maps if map url exists (hidden for Puskesmas) */}
                  {contact.locationMapUrl && contact.role !== "Puskesmas" && (
                    <div className="rounded-2xl overflow-hidden h-36 border border-slate-200 mt-2 bg-slate-100">
                      <iframe
                        src={contact.locationMapUrl}
                        className="w-full h-full border-none"
                        loading="lazy"
                        title={`Peta Lokasi: ${contact.name}`}
                      />
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex gap-3">
                  <a
                    href={`https://wa.me/${contact.whatsappNumber.replace("+", "")}?text=${encodeURIComponent("Halo " + contact.name + ", saya butuh informasi/layanan dari SIGMA.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2.5 rounded-xl bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <MessageSquare className="h-4.5 w-4.5" />
                    <span>WhatsApp</span>
                  </a>
                  {/* Only Puskesmas should show a route button */}
                  {contact.role === "Puskesmas" ? (
                    contact.locationMapUrl ? (
                      <a
                        href={contact.locationMapUrl.replace(
                          "maps/embed?pb=",
                          "maps?pb=",
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 rounded-xl border border-slate-200 text-neutral-dark text-xs font-bold hover:bg-slate-50 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <Navigation className="h-4.5 w-4.5 text-primary" />
                        <span>Rute Lokasi</span>
                      </a>
                    ) : contact.locationName ? (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.locationName)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 rounded-xl border border-slate-200 text-neutral-dark text-xs font-bold hover:bg-slate-50 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                      >
                        <Navigation className="h-4.5 w-4.5 text-primary" />
                        <span>Rute Lokasi</span>
                      </a>
                    ) : null
                  ) : null}
                </div>
              </div>
            ))
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
