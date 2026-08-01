"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, CheckCircle, MessageCircle } from "lucide-react";

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
    <div className="bg-slate-50 min-h-screen py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h1 className="text-4xl font-extrabold text-neutral-dark tracking-tight">Hubungi Kami</h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed font-semibold">
            Kader GARUDA terbuka terhadap saran, undangan sosialisasi sekolah, kolaborasi instansi, atau masukan platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Contact details */}
          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
            <div>
              <h2 className="text-xl font-bold text-neutral-dark">Informasi Sekretariat</h2>
              <p className="text-xs text-slate-400 mt-1 font-semibold">Tatap muka langsung atau hubungi kontak alternatif.</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-xs text-slate-600 font-semibold">
                <div className="p-2 rounded-xl bg-emerald-50 text-primary shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-neutral-dark">Alamat Kantor</p>
                  <p className="leading-relaxed">Jl. Garuda No. 45, Kecamatan Sehat, Kabupaten Aman, Jawa Barat, Indonesia</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs text-slate-600 font-semibold">
                <div className="p-2 rounded-xl bg-emerald-50 text-primary shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-neutral-dark">Nomor Telepon</p>
                  <p>+62 812-3456-7890</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs text-slate-600 font-semibold">
                <div className="p-2 rounded-xl bg-emerald-50 text-primary shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-bold text-neutral-dark">E-Mail Resmi</p>
                  <p>kader.garuda@sigma-repro.org</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-slate-100 space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sosial Media</h3>
              <div className="flex space-x-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 bg-slate-50 rounded-xl text-slate-400 hover:text-primary hover:bg-emerald-50 border border-slate-100 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 bg-slate-50 rounded-xl text-slate-400 hover:text-primary hover:bg-emerald-50 border border-slate-100 transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.163c-.272-1.016-1.072-1.816-2.088-2.088C19.565 3.545 12 3.545 12 3.545s-7.565 0-9.41.53c-1.016.272-1.816 1.072-2.088 2.088C0 8.008 0 12 0 12s0 3.992.502 5.837c.272 1.016 1.072 1.816 2.088 2.088 1.845.53 9.41.53 9.41.53s7.565 0 9.41-.53c1.016-.272 1.816-1.072 2.088-2.088.502-1.845.502-5.837.502-5.837s0-3.992-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 bg-slate-50 rounded-xl text-slate-400 hover:text-primary hover:bg-emerald-50 border border-slate-100 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
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
