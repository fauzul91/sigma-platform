"use client";

import React, { useState } from "react";
import { Mail, CheckCircle, MessageCircle } from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

export default function KontakView() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      }, 2000);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <PageHeader
        title="HUBUNGI KAMI"
        description="Kader GARUDA dan pengelola SIGMA terbuka terhadap saran, undangan sosialisasi sekolah, kolaborasi instansi, atau masukan platform."
        badge="SEKRETARIAT & KONTAK"
        type="kontak"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-8 md:py-12 space-y-12">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Column 1: Contact details */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <div>
              <h2 className="text-xl font-bold text-neutral-dark">Informasi Kontak</h2>
              <p className="text-xs text-slate-400 mt-1 font-semibold">
                Hubungi kami melalui email resmi atau ikuti kanal media sosial kami.
              </p>
            </div>

            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
              <div className="flex items-center space-x-2.5 text-primary">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <p className="font-extrabold text-xs uppercase tracking-wider text-emerald-900">
                  E-Mail Resmi
                </p>
              </div>
              <div>
                <a
                  href="mailto:promahadesagunungmalang@gmail.com"
                  className="text-sm font-black text-slate-900 hover:text-primary transition-colors break-all"
                >
                  promahadesagunungmalang@gmail.com
                </a>
                <p className="text-[11px] text-slate-500 font-medium mt-1 leading-relaxed">
                  Terbuka untuk kolaborasi riset, pertanyaan program, atau undangan sosialisasi sekolah.
                </p>
              </div>
            </div>

            {/* Social Media Links: Instagram & TikTok (@promahadesa.sigma) */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Kanal Media Sosial
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/promahadesa.sigma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-pink-50 border border-slate-100 hover:border-pink-200 transition-all group cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-pink-600 shadow-2xs group-hover:scale-105 transition-transform">
                      <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-800 group-hover:text-pink-600 transition-colors">
                        Instagram
                      </p>
                      <p className="text-[11px] text-slate-500 font-semibold">
                        @promahadesa.sigma
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    Kunjungi &rarr;
                  </span>
                </a>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@promahadesa.sigma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-100 hover:border-slate-300 transition-all group cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-slate-900 shadow-2xs group-hover:scale-105 transition-transform">
                      <svg className="h-4 w-4 fill-current text-slate-900" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-800 group-hover:text-slate-950 transition-colors">
                        TikTok
                      </p>
                      <p className="text-[11px] text-slate-500 font-semibold">
                        @promahadesa.sigma
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                    Kunjungi &rarr;
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">

            {formSubmitted ? (
              <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
                <CheckCircle className="h-16 w-16 text-primary animate-bounce" />
                <h3 className="text-xl font-extrabold text-neutral-dark">Pesan Anda Terkirim!</h3>
                <p className="text-xs text-slate-500 max-w-xs leading-relaxed font-semibold">
                  Terima kasih sudah menghubungi kami. Kader GARUDA akan meninjau pesan Anda dan membalas melalui email secepatnya.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-5">

                <div>
                  <h2 className="text-xl font-bold text-neutral-dark">Form Hubungi Kami</h2>
                  <p className="text-xs text-slate-400 mt-1 font-semibold">Isi data di bawah ini untuk mengirimkan pesan langsung.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      placeholder="Masukkan nama lengkap"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Alamat Email</label>
                    <input
                      type="email"
                      required
                      placeholder="Masukkan email aktif"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Subjek Pesan</label>
                  <input
                    type="text"
                    placeholder="Masukkan perihal pesan (misal: Undangan Sosialisasi)"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Isi Pesan</label>
                  <textarea
                    required
                    placeholder="Tuliskan detail pesan Anda di sini..."
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-primary text-white font-extrabold text-xs hover:bg-primary-hover active:scale-98 transition-all flex items-center justify-center space-x-2 shadow-md shadow-emerald-600/10 cursor-pointer"
                >
                  <MessageCircle className="h-4.5 w-4.5" />
                  <span>Kirim Pesan Sekarang</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
