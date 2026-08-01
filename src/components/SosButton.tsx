"use client";

import React, { useState } from "react";
import { Phone, MessageSquare, AlertCircle, X, ShieldAlert, Heart, Calendar } from "lucide-react";

export default function SosButton() {
  const [isOpen, setIsOpen] = useState(false);

  const emergencyContacts = [
    {
      name: "Konseling Sebaya (Kader GARUDA)",
      role: "Hubungi pendamping sebaya yang ramah & rahasia terjamin",
      phone: "+6281234567890",
      type: "whatsapp",
      message: "Halo Kader GARUDA, saya butuh teman cerita terkait kesehatan reproduksi/masalah yang saya hadapi.",
    },
    {
      name: "Guru BK (Bimbingan Konseling) Sekolah",
      role: "Layanan konsultasi psikologis di lingkungan sekolah",
      phone: "+6289876543210",
      type: "whatsapp",
      message: "Halo Ibu/Bapak Guru BK, saya siswa SIGMA ingin menjadwalkan konseling tatap muka.",
    },
    {
      name: "Layanan Puskesmas Terdekat",
      role: "Layanan kesehatan fisik, konsultasi medis, dan KB",
      phone: "+628555123456",
      type: "whatsapp",
      message: "Halo Puskesmas, saya ingin menanyakan perihal layanan kesehatan reproduksi remaja.",
    },
    {
      name: "Hotline Sahabat Perempuan & Anak (SAPA 129)",
      role: "Layanan darurat kekerasan seksual dan hak anak (Pemerintah)",
      phone: "129",
      type: "call",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-sos text-white shadow-xl hover:bg-sos-hover focus:outline-none transition-all duration-300 transform hover:scale-110 active:scale-95"
          aria-label="Tombol Darurat SOS"
        >
          {/* Pulsing rings */}
          <span className="absolute -inset-1 rounded-full bg-sos/40 animate-ping opacity-75"></span>
          <span className="absolute -inset-2 rounded-full bg-sos/20 animate-pulse"></span>
          
          <AlertCircle className="h-8 w-8 relative z-10 animate-bounce" />
          
          <span className="absolute right-20 scale-0 group-hover:scale-100 bg-neutral-dark text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap transition-all duration-300">
            Butuh Bantuan Cepat? (SOS)
          </span>
        </button>
      )}

      {/* SOS Panel overlay */}
      {isOpen && (
        <div className="relative w-80 md:w-96 rounded-2xl bg-white p-5 shadow-2xl border border-red-100 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-start justify-between border-b border-red-500/10 pb-3">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-lg bg-red-50 text-sos">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-dark text-lg leading-tight">Hubungi Bantuan</h3>
                <p className="text-xs text-slate-500 font-medium">Layanan aman, rahasia, & gratis</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className="p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-md hover:border-emerald-100 transition-all duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-semibold text-neutral-dark leading-snug">{contact.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5 leading-normal">{contact.role}</p>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center space-x-2">
                  {contact.type === "whatsapp" ? (
                    <a
                      href={`https://wa.me/${contact.phone.replace("+", "")}?text=${encodeURIComponent(contact.message || "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center space-x-1.5 w-full py-1.5 rounded-lg bg-emerald-500 text-white font-medium text-xs hover:bg-emerald-600 active:scale-98 transition-all"
                    >
                      <MessageSquare className="h-3.5 w-3.5" />
                      <span>WhatsApp Chat</span>
                    </a>
                  ) : (
                    <a
                      href={`tel:${contact.phone}`}
                      className="flex items-center justify-center space-x-1.5 w-full py-1.5 rounded-lg bg-sos text-white font-medium text-xs hover:bg-sos-hover active:scale-98 transition-all"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      <span>Telepon {contact.phone}</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-center">
            <a
              href="/konseling"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center space-x-1 text-xs font-semibold text-primary hover:text-primary-hover transition-colors"
            >
              <Heart className="h-3.5 w-3.5 fill-current" />
              <span>Lihat Alur Konseling Lengkap</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
