"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, UserCheck } from "lucide-react";

interface PlayerNameModalProps {
  initialName?: string;
  onSubmitName: (name: string) => void;
  onBackToHub: () => void;
}

export default function PlayerNameModal({
  initialName = "",
  onSubmitName,
  onBackToHub,
}: PlayerNameModalProps) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Silakan masukkan nama panggilanmu terlebih dahulu.");
      return;
    }
    if (trimmed.length > 20) {
      setError("Nama panggilan maksimal 20 karakter ya.");
      return;
    }
    setError("");
    onSubmitName(trimmed);
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col justify-between p-4 sm:p-6 select-none">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between w-full max-w-4xl mx-auto z-10">
        <button
          type="button"
          onClick={onBackToHub}
          className="inline-flex items-center space-x-2 px-4 sm:px-5 py-2 rounded-xl bg-[#facc15] hover:bg-[#fde047] border-b-[4px] border-[#ca8a04] active:border-b-0 active:translate-y-1 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-md transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </button>

        {/* Top Right Stepper matching user reference image */}
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-black text-amber-950 uppercase tracking-widest bg-amber-200/80 px-3 py-1 rounded-full border border-amber-300">
            IDENTITAS PEMAIN
          </span>
          <div className="flex space-x-1">
            <div className="w-5 h-1.5 bg-[#ca8a04] rounded-full" />
            <div className="w-2.5 h-1.5 bg-amber-300 rounded-full" />
            <div className="w-2.5 h-1.5 bg-amber-300 rounded-full" />
          </div>
        </div>
      </div>

      {/* Center Modal Card matching media_1789392349482.png */}
      <div className="w-full max-w-md mx-auto my-auto z-10 py-6">
        <div className="bg-[#fffbeb] border-[3.5px] border-[#78350f]/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative text-left">
          {/* Subtle corner badge */}
          <span className="block text-[11px] font-extrabold uppercase tracking-widest text-[#92400e] mb-2">
            LANGKAH 1 DARI 2
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
            Siapa namamu?
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mb-6">
            Tulis nama panggilan yang ingin digunakan karakter sepanjang perjalanan simulasi cerita.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="playerName"
                className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2"
              >
                Nama panggilan
              </label>
              <input
                id="playerName"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Contoh: Aruna"
                autoFocus
                className="w-full px-4 py-3.5 rounded-2xl bg-white border-2 border-amber-400/80 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/20 text-slate-900 font-bold text-sm sm:text-base outline-none transition-all placeholder:text-slate-400"
              />
              {error && (
                <p className="text-xs font-bold text-rose-600 mt-2 animate-shake">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-4 inline-flex items-center justify-center space-x-2 py-3.5 px-6 rounded-2xl bg-[#facc15] hover:bg-[#fde047] border-b-[4px] border-[#ca8a04] active:border-b-0 active:translate-y-1 text-slate-950 font-black text-sm tracking-wide shadow-md transition-all cursor-pointer"
            >
              <span>Lanjut ke Cerita</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="w-full max-w-4xl mx-auto flex justify-between items-center text-xs text-slate-500 font-medium z-10 opacity-70">
        <span>SIGMA • Ruang Petualangan Remaja</span>
        <span>Simulasi Pengambilan Keputusan</span>
      </div>
    </div>
  );
}