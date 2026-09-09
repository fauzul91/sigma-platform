"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff } from "lucide-react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const DotMatrix = ({ className }: { className?: string; }) => (
  <svg
    className={className}
    width="54"
    height="54"
    fill="currentColor"
    viewBox="0 0 54 54"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="5" cy="5" r="2" />
    <circle cx="19" cy="5" r="2" />
    <circle cx="33" cy="5" r="2" />
    <circle cx="47" cy="5" r="2" />
    <circle cx="5" cy="19" r="2" />
    <circle cx="19" cy="19" r="2" />
    <circle cx="33" cy="19" r="2" />
    <circle cx="47" cy="19" r="2" />
    <circle cx="5" cy="33" r="2" />
    <circle cx="19" cy="33" r="2" />
    <circle cx="33" cy="33" r="2" />
    <circle cx="47" cy="33" r="2" />
    <circle cx="5" cy="47" r="2" />
    <circle cx="19" cy="47" r="2" />
    <circle cx="33" cy="47" r="2" />
    <circle cx="47" cy="47" r="2" />
  </svg>
);

const slides = [
  {
    title: "Aksi Nyata Bersama Kader GARUDA",
    subtitle:
      "Sinergi aktif pemuda Desa Gunungmalang dalam menginspirasi sesama dan menyuarakan perlindungan hak-hak anak.",
  },
  {
    title: "Edukasi Ramah & Berbasis Fakta",
    subtitle:
      "Platform terpadu pencegahan perkawinan anak, edukasi kesehatan reproduksi, dan pendampingan konseling ramah remaja.",
  },
  {
    title: "Ruang Konseling Aman & Rahasia",
    subtitle:
      "Pendampingan konseling sebaya dan rujukan terpercaya tanpa stigma untuk melindungi hak dan masa depan remaja.",
  },
];

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          window.location.href = "/admin/dashboard";
        } else {
          setErrorMsg(data?.error || "Username atau kata sandi salah.");
          setIsLoading(false);
        }
      })
      .catch(() => {
        setErrorMsg("Terjadi kesalahan. Coba lagi.");
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Header bar hijau selaras dengan background Navbar */}
      <div className="h-[68px] md:h-[76px] bg-primary border-b border-emerald-500/20">
        <Navbar />
      </div>

      {/* Main Section: Background Full-Bleed Edge-to-Edge */}
      <main className="flex-grow flex flex-col relative">
        {/* Background Split 50/50 Full-Bleed Edge-to-Edge (Kiri Hijau Primary, Kanan Putih) */}
        <div className="absolute inset-0 flex pointer-events-none">
          <div className="hidden lg:block lg:w-1/2 bg-primary h-full" />
          <div className="w-full lg:w-1/2 bg-white h-full" />
        </div>

        {/* Konten Dalam: Diselaraskan dengan container & padding-x Navbar (max-w-7xl px-6 sm:px-10 lg:px-12) */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex-grow flex flex-col lg:flex-row min-h-[calc(100vh-68px)] md:min-h-[calc(100vh-76px)]">

          {/* ================= SISI KIRI: BACKGROUND HIJAU FULL-BLEED, KONTEN SEJAJAR LOGO NAVBAR ================= */}
          <div
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="hidden lg:flex lg:w-1/2 py-8 sm:py-10 lg:py-12 lg:pr-10 xl:pr-14 flex-col justify-between text-white select-none relative"
          >
            {/* Subtle Grid Dot Accents */}
            <DotMatrix className="absolute top-8 right-8 text-white/15 pointer-events-none" />
            <DotMatrix className="absolute bottom-10 left-2 text-white/15 pointer-events-none" />

            {/* Tengah: Card Showcase Visual UI (Mockup aktivitas & metrik SIGMA) */}
            <div className="relative z-10 my-auto py-6 sm:py-8 max-w-sm w-full mx-auto">

              {/* Floating Notification Kiri Atas */}
              <div className="hidden sm:flex absolute -top-1 -right-2 bg-white/95 backdrop-blur-md rounded-xl p-2.5 px-3.5 shadow-xl border border-slate-100 items-center space-x-2.5 text-xs text-slate-700 z-20">
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">
                  ✓
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-[11px] leading-tight">Konseling Terjadwal</p>
                  <p className="text-[10px] text-emerald-600 font-semibold">Aman &amp; Rahasia</p>
                </div>
              </div>

              {/* Main White Card Mockup */}
              <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-2xl text-slate-800 relative z-10">
                {/* Top Stats Row */}
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Edukasi Siswa
                    </p>
                    <p className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
                      1.420+ <span className="text-xs font-semibold text-emerald-600">Aktif</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Konseling Sebaya
                    </p>
                    <p className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">
                      98.4% <span className="text-xs font-semibold text-teal-600">Puas</span>
                    </p>
                  </div>
                </div>

                {/* Mini Trend Line Chart */}
                <div className="py-3.5">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 font-medium">
                    <span>Aktivitas Edukasi Bulanan</span>
                    <span className="font-bold text-emerald-600">+28% bln ini</span>
                  </div>
                  <svg
                    viewBox="0 0 260 65"
                    className="w-full h-14 sm:h-16 overflow-visible"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="sigGreenFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#059669" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 48 Q 45 42, 70 28 T 135 32 T 200 14 T 260 6 L 260 65 L 0 65 Z"
                      fill="url(#sigGreenFill)"
                    />
                    <path
                      d="M0 48 Q 45 42, 70 28 T 135 32 T 200 14 T 260 6"
                      stroke="#059669"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <circle cx="200" cy="14" r="3.5" fill="#059669" />
                    <circle cx="260" cy="6" r="3.5" fill="#059669" />
                  </svg>
                  <div className="flex justify-between text-[10px] text-slate-400 font-medium pt-1">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>Mei</span>
                  </div>
                </div>

                {/* Micro Recent Log */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-slate-600 font-medium text-[11px]">Modul Repropedia</span>
                  </div>
                  <span className="font-bold text-slate-900 text-[11px]">Pubertas &amp; Gizi</span>
                </div>
              </div>

              {/* Floating Notification Kanan Bawah */}
              <div className="hidden sm:flex absolute -bottom-2 -left-2 bg-white/95 backdrop-blur-md rounded-xl p-2.5 px-3.5 shadow-xl border border-slate-100 items-center space-x-2.5 text-xs text-slate-700 z-20">
                <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-xs">
                  ★
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-[11px] leading-tight">Kader GARUDA Siaga</p>
                  <p className="text-[10px] text-slate-500 font-medium">Desa Gunungmalang</p>
                </div>
              </div>

            </div>

            {/* Bawah: Text Slider Murni (Headline + Subtitle + Dots) */}
            <div className="relative z-10 pt-2">
              <div className="min-h-[85px] sm:min-h-[92px]">
                {slides.map((slide, index) => {
                  const isActive = index === currentSlide;
                  return (
                    <div
                      key={slide.title}
                      className={`transition-all duration-500 ease-in-out ${isActive
                        ? "opacity-100 translate-y-0 relative z-10"
                        : "opacity-0 translate-y-3 absolute inset-0 pointer-events-none z-0"
                        }`}
                    >
                      <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight mb-2 tracking-tight">
                        {slide.title}
                      </h2>
                      <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-md font-normal">
                        {slide.subtitle}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Dots Indicator (Sesuai Referensi Image 1) */}
              <div className="flex items-center space-x-2 pt-3">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === currentSlide
                      ? "w-7 bg-white"
                      : "w-2 bg-white/40 hover:bg-white/70"
                      }`}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ================= SISI KANAN: BACKGROUND PUTIH FULL-BLEED, KONTEN SEJAJAR NAVBAR ================= */}
          <div className="w-full lg:w-1/2 py-8 sm:py-10 lg:py-12 lg:pl-10 xl:pl-14 flex flex-col justify-between bg-white lg:bg-transparent">
            <div className="hidden lg:block h-2"></div>

            <div className="my-auto max-w-md w-full mx-auto space-y-6 py-4">

              {/* Header Greeting */}
              <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Masuk ke Akun Anda
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                  Kelola modul edukasi, layanan konseling, dan portal SIGMA.
                </p>
              </div>

              {/* Error Banner */}
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center space-x-2.5 animate-in fade-in duration-200">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Form: Tetap Username & Password */}
              <form onSubmit={handleLogin} className="space-y-4">

                {/* Username Field */}
                <div className="space-y-1.5">
                  <label htmlFor="username" className="text-xs font-bold text-slate-700 block">
                    Username / Email
                  </label>
                  <input
                    id="username"
                    type="text"
                    required
                    placeholder="Masukkan username atau email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-900 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-xs font-bold text-slate-700 block">
                      Kata Sandi
                    </label>
                    <button
                      type="button"
                      onClick={() => alert("Silakan hubungi administrator utama untuk reset kata sandi.")}
                      className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold hover:underline cursor-pointer"
                    >
                      Lupa kata sandi?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-900 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all pr-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                      aria-label={
                        showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center pt-1 text-xs">
                  <label className="flex items-center space-x-2 text-slate-600 cursor-pointer font-medium select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0 cursor-pointer"
                    />
                    <span>Ingat saya di perangkat ini</span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 mt-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-bold flex items-center justify-center space-x-2 shadow-sm shadow-emerald-600/20 active:scale-[0.99] transition-all disabled:opacity-60 cursor-pointer"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <span>Masuk</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

              </form>

            </div>

            {/* Security Banner di Bawah Form */}
            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-center space-x-2 text-xs text-slate-400 font-medium">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Akses Terenkripsi Portal Pengurus SIGMA</span>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}