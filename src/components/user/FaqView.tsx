"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Search,
  MessageCircle,
  ShieldCheck,
  HeartHandshake,
  HelpCircle,
  PhoneCall,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

interface FaqItem {
  id: string;
  category: "repro" | "pernikahan" | "kekerasan" | "konseling";
  question: string;
  answer: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: "faq-1",
    category: "repro",
    question: "Apa itu kesehatan reproduksi remaja dan mengapa sangat penting?",
    answer:
      "Kesehatan reproduksi remaja adalah kondisi sehat secara fisik, mental, dan sosial yang utuh pada seluruh fungsi dan sistem reproduksi. Pemahaman yang benar sejak dini melindungi remaja dari mitos keliru, infeksi menular seksual (IMS), kehamilan yang tidak diinginkan, serta membantu remaja mengenali perubahan tubuhnya saat masa pubertas dengan percaya diri.",
  },
  {
    id: "faq-2",
    category: "repro",
    question: "Bagaimana cara menjaga kebersihan organ reproduksi dengan benar setiap hari?",
    answer:
      "Gantilah pakaian dalam minimal 2 kali sehari atau setiap kali terasa lembap. Gunakan celana dalam berbahan katun yang menyerap keringat. Bilas organ intim dengan air bersih mengalir dari arah depan ke belakang (bukan sebaliknya) agar kuman dari anus tidak berpindah, dan keringkan dengan handuk atau tisu bersih sebelum memakai pakaian.",
  },
  {
    id: "faq-3",
    category: "pernikahan",
    question: "Berapa batas usia minimal pernikahan yang sah menurut hukum di Indonesia?",
    answer:
      "Berdasarkan Undang-Undang Republik Indonesia Nomor 16 Tahun 2019 (perubahan atas UU No. 1 Tahun 1974 tentang Perkawinan), batas minimal usia untuk melangsungkan perkawinan bagi laki-laki maupun perempuan adalah 19 tahun. Menikahkan anak di bawah usia 19 tahun melanggar hukum dan berisiko tinggi terhadap kesehatan dan masa depan anak.",
  },
  {
    id: "faq-4",
    category: "pernikahan",
    question: "Mengapa pernikahan usia anak sangat berisiko bagi kesehatan fisik remaja perempuan?",
    answer:
      "Organ reproduksi dan panggul perempuan di bawah usia 19 tahun belum matang sempurna. Kehamilan pada usia anak meningkatkan risiko preeklampsia (tekanan darah tinggi berbahaya), anemia berat, pendarahan obstetrik hebat, robekan jalan lahir (fistula obstetrik), kelahiran prematur, stunting pada bayi, hingga risiko kematian ibu dan bayi.",
  },
  {
    id: "faq-5",
    category: "pernikahan",
    question: "Apa dampak psikologis dan sosial dari pernikahan dini bagi remaja?",
    answer:
      "Remaja yang menikah dini sering kali mengalami putus sekolah, hilangnya kesempatan meraih cita-cita, isolasi dari pertemanan sebaya, serta rentan mengalami depresi, trauma emosional, dan kekerasan dalam rumah tangga (KDRT) akibat ketidaksiapan mental mengemban peran orang dewasa.",
  },
  {
    id: "faq-6",
    category: "kekerasan",
    question: "Apa saja bentuk-bentuk kekerasan seksual yang harus diwaspadai remaja?",
    answer:
      "Kekerasan seksual tidak hanya kontak fisik (seperti pemaksaan sentuhan seksual atau pemerkosaan), tetapi juga meliputi kekerasan non-fisik (catcalling/komentar mesum, tatapan tidak pantas, memperlihatkan konten pornografi tanpa izin) dan kekerasan seksual berbasis elektronik (KSBE) seperti meminta foto intim atau menyebarkan konten pribadi tanpa persetujuan.",
  },
  {
    id: "faq-7",
    category: "kekerasan",
    question: "Apa yang harus saya lakukan jika mengalami atau melihat indikasi kekerasan seksual?",
    answer:
      "Segera cari tempat aman dan hubungi orang dewasa yang kamu percayai (seperti guru BK, orang tua, atau kader GARUDA). Simpan bukti percakapan jika terjadi di media sosial. Jangan merasa bersalah karena korban sama sekali TIDAK bersalah. Kamu juga dapat menekan tombol SOS di platform SIGMA atau melapor ke layanan darurat SAPA 129.",
  },
  {
    id: "faq-8",
    category: "konseling",
    question: "Apakah cerita dan data saya benar-benar dirahasiakan saat konseling di SIGMA?",
    answer:
      "Ya, 100% rahasia dan bebas penghakiman. Kader GARUDA dan Guru BK telah dilatih mematuhi kode etik kerahasiaan konselor sebaya. Cerita masalah pribadimu tidak akan dibagikan kepada teman sekelas atau pihak manapun tanpa persetujuanmu, kecuali dalam kondisi darurat yang mengancam keselamatan jiwamu.",
  },
  {
    id: "faq-9",
    category: "konseling",
    question: "Bagaimana cara melakukan konseling sebaya di platform SIGMA?",
    answer:
      "Kamu cukup membuka menu 'Konseling & Kontak' di platform SIGMA, lalu pilih konselor sebaya atau nomor layanan rujukan yang tersedia. Kamu bisa memilih untuk mengirim pesan via WhatsApp secara langsung atau berkonsultasi langsung di ruang BK sekolah mitra SMPN 4 Sumberjambe.",
  },
  {
    id: "faq-10",
    category: "konseling",
    question: "Apakah layanan konsultasi dan materi belajar di platform SIGMA berbayar?",
    answer:
      "Seluruh layanan di platform SIGMA — mulai dari membaca modul Repropedia, mengerjakan Kuis Kesehatan, membaca artikel, hingga sesi konseling sebaya — adalah 100% GRATIS dan terbuka untuk seluruh siswa dan remaja di Gunungmalang dan sekitarnya.",
  },
];

const CATEGORIES = [
  { id: "all", label: "Semua Pertanyaan" },
  { id: "repro", label: "Kesehatan Reproduksi" },
  { id: "pernikahan", label: "Pencegahan Nikah Anak" },
  { id: "kekerasan", label: "Kekerasan Seksual & Hak" },
  { id: "konseling", label: "Konseling & Kerahasiaan" },
];

export default function FaqView() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFaqId, setOpenFaqId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* 1. Shared Page Header */}
      <PageHeader
        title="FAQ UMUM"
        description="Temukan jawaban atas pertanyaan yang paling sering diajukan seputar kesehatan reproduksi, pubertas, pencegahan pernikahan usia anak, serta panduan bantuan aman bersama SIGMA."
        badge="TANYA JAWAB &amp; PANDUAN"
        type="faq"
      />

      {/* 2. Main Content Container */}
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-14 space-y-10">
        
        {/* Search & Category Filter Bar */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pertanyaan, kata kunci, atau topik kesehatan..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-all"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-primary text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-white border-emerald-300 shadow-md ring-1 ring-emerald-500/10"
                      : "bg-white border-slate-200/80 shadow-xs hover:border-emerald-200"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-4.5 text-left flex justify-between items-center gap-4 cursor-pointer"
                  >
                    <span className="font-extrabold text-sm sm:text-base text-neutral-dark leading-snug">
                      {faq.question}
                    </span>
                    <span
                      className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? "bg-primary text-white rotate-90"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-medium bg-white animate-in fade-in duration-200 border-t border-slate-50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <HelpCircle className="h-10 w-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-700">
                Tidak ada pertanyaan yang sesuai
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Coba gunakan kata kunci lain atau pilih kategori &ldquo;Semua Pertanyaan&rdquo;.
              </p>
            </div>
          )}
        </div>

        {/* Need More Help / Contact CTA Card */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/15 text-[10px] font-black uppercase tracking-wider text-emerald-100">
              <Sparkles className="h-3 w-3" />
              <span>Masih Butuh Teman Cerita?</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black tracking-tight">
              Punya Pertanyaan Spesifik atau Butuh Konseling?
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 font-medium max-w-lg">
              Kader GARUDA siap mendengarkan secara rahasia dan aman. Kamu tidak sendirian.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/konseling"
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-extrabold shadow-md transition-all active:scale-95"
            >
              <HeartHandshake className="h-4 w-4" />
              <span>Ruang Konseling</span>
            </Link>
            <Link
              href="/kontak"
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs sm:text-sm font-extrabold backdrop-blur-xs transition-all border border-white/20"
            >
              <span>Hubungi Kami</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
