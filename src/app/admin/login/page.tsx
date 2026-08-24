"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  BookOpen,
  Brain,
  Shield,
  MessageCircle,
  HeartHandshake,
} from "lucide-react";

const slides = [
  {
    icon: BookOpen,
    category: "REPROPEDIA",
    title: "Edukasi Remaja Sehat & Tepercaya",
    subtitle: "Dapatkan wawasan seputar kesehatan reproduksi dengan panduan ramah remaja.",
  },
  {
    icon: Brain,
    category: "KELAS SEJIWA",
    title: "Ruang Konseling & Mental Health",
    subtitle: "Pendampingan konseling yang aman, nyaman, dan mendukung kesehatan jiwa.",
  },
  {
    icon: Shield,
    category: "KADER GARUDA",
    title: "Kolaborasi Remaja & Komunitas",
    subtitle: "Wadah aksi nyata, kuis seru, serta pemberdayaan potensi siswa.",
  },
];

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // State Slider Sisi Kiri
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

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
    <div className="min-h-screen w-full bg-[#fbfdfc] flex items-stretch font-sans select-none overflow-x-hidden">
      
      {/* ================= LEFT PANEL: FUN & YOUTHFUL BRANDING (Desktop / 45%) ================= */}
      <div className="hidden lg:flex lg:w-[45%] p-6 xl:p-8 flex-col justify-between bg-emerald-50/60 border-r border-emerald-100/80 relative overflow-hidden">
        
        {/* Subtle Decorative Elements (Natural & Controlled) */}
        <div className="absolute top-12 left-10 w-24 h-24 bg-emerald-200/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-16 right-10 w-32 h-32 bg-teal-200/30 rounded-full blur-3xl pointer-events-none" />

        {/* Back to Home Navigation (Moved to Left Panel) */}
        <div className="relative z-10 flex items-center">
           <Link
            href="/beranda"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors bg-emerald-100/50 hover:bg-emerald-200/50 border border-emerald-200/80 px-3.5 py-2 rounded-xl backdrop-blur-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali ke Beranda</span>
          </Link>
        </div>

        {/* Middle Visual Section: Illustration + Slide Text */}
        <div className="relative z-10 my-auto py-4 space-y-6 max-w-lg mx-auto">
          
          {/* Main Friendly Illustration */}
          <div className="w-full flex justify-center relative my-2">
            <div className="w-64 h-56 xl:w-72 xl:h-64 relative drop-shadow-md">
              <Image
                src="/assets/student_illustration.png"
                alt="Siswa Belajar Bersama SIGMA"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Playful Floating Badges */}
            <div className="absolute top-2 right-4 bg-white/90 backdrop-blur-sm border border-emerald-100 shadow-sm px-3 py-1.5 rounded-full flex items-center space-x-1.5 text-xs text-slate-700 font-semibold animate-bounce-slow">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ruang Aman</span>
            </div>
            <div className="absolute bottom-2 left-4 bg-white/90 backdrop-blur-sm border border-emerald-100 shadow-sm px-3 py-1.5 rounded-full flex items-center space-x-1.5 text-xs text-slate-700 font-semibold">
              <HeartHandshake className="w-3.5 h-3.5 text-teal-600" />
              <span>Pendampingan</span>
            </div>
          </div>

          {/* Dynamic Info Slider */}
          <div className="min-h-[120px] flex flex-col justify-end text-center px-4">
            {slides.map((slide, index) => {
              const Icon = slide.icon;
              const isActive = index === currentSlide;
              return (
                <div
                  key={slide.title}
                  className={`transition-all duration-500 ease-in-out ${
                    isActive
                      ? "opacity-100 translate-y-0 relative"
                      : "opacity-0 translate-y-3 absolute inset-x-0 pointer-events-none"
                  }`}
                >
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-[11px] font-bold tracking-wide uppercase mb-2">
                    <Icon className="w-3.5 h-3.5 text-emerald-700" />
                    <span>{slide.category}</span>
                  </div>
                  <h2 className="text-xl xl:text-2xl font-bold text-slate-800 mb-2 leading-tight">
                    {slide.title}
                  </h2>
                  <p className="text-slate-600 text-xs xl:text-sm leading-relaxed max-w-sm mx-auto">
                    {slide.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center space-x-2 pt-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentSlide
                    ? "w-7 bg-emerald-600"
                    : "w-2 bg-emerald-200 hover:bg-emerald-300"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="relative z-10 text-center text-xs text-slate-400 font-medium">
          SIGMA — Sahabat Informasi Generasi Muda & Anak
        </div>

      </div>

      {/* ================= RIGHT PANEL: LOGIN FORM (Desktop 55% / Mobile Single Column) ================= */}
      <div className="w-full lg:w-[55%] p-6 sm:p-10 lg:p-14 xl:p-16 flex flex-col justify-between bg-white min-h-screen">
        
        {/* Top Bar Navigation (Only visible on mobile now) */}
        <div className="flex lg:hidden justify-between items-center mb-6 sm:mb-8">
           <Link
            href="/beranda"
            className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-600 hover:text-emerald-700 transition-colors bg-slate-50 hover:bg-slate-100 border border-slate-200/80 px-3.5 py-2 rounded-xl"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Kembali</span>
          </Link>

          {/* Mobile Only Brand Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              S
            </div>
            <span className="font-bold text-slate-800 text-sm">SIGMA</span>
          </div>
        </div>

        {/* Space filler for desktop to keep form centered vertically when top bar is hidden */}
        <div className="hidden lg:block h-8"></div>

        {/* Main Login Form Area */}
        <div className="my-auto max-w-md w-full mx-auto space-y-6">
          
          {/* Header Greeting */}
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              Selamat Datang <span className="animate-pulse">👋</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
              Masuk ke akun pengurus untuk mengelola modul edukasi dan portal SIGMA.
            </p>
          </div>

          {/* Error State Banner */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-center space-x-2.5 animate-in fade-in duration-200">
              <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Credentials Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Username Input */}
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
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-xs font-bold text-slate-700 block">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all pr-11"
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

            {/* Remember Me & Lupa Password */}
            <div className="flex items-center justify-between pt-1 text-xs">
              <label className="flex items-center space-x-2 text-slate-600 cursor-pointer font-medium select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-0 cursor-pointer"
                />
                <span>Ingat saya</span>
              </label>

              <button
               type="button"
                onClick={() => alert("Silakan hubungi administrator utama untuk reset kata sandi.")}
                className="text-emerald-700 hover:text-emerald-800 font-semibold hover:underline"
              >
                Lupa password?
              </button>
            </div>

            {/* Primary CTA Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 mt-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-sm font-bold flex items-center justify-center space-x-2 shadow-sm shadow-emerald-600/20 active:scale-[0.99] transition-all disabled:opacity-60 cursor-pointer"
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

        {/* Security & Access Footer */}
        <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-center space-x-2 text-xs text-slate-400 font-medium">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Akses Terenkripsi Portal Pengurus SIGMA</span>
        </div>

      </div>

    </div>
  );
}