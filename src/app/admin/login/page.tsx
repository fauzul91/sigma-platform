"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  Activity,
} from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
          // Full page reload to ensure cookie is properly set and middleware runs
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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans select-none">
      {/* Soft Pastel Glowing Backdrop Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-200/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-amber-100/30 rounded-full blur-[80px] pointer-events-none" />

      {/* Grid overlay for tech look (light gray lines) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50 pointer-events-none" />

      {/* Back to Home CTA */}
      <Link
        href="/beranda"
        className="absolute top-6 left-6 inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-slate-800 bg-white/80 hover:bg-white border border-slate-200/80 px-4 py-2.5 rounded-xl transition-all shadow-sm backdrop-blur-md z-20 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4 text-primary" />
        <span>Kembali ke Beranda</span>
      </Link>

      {/* Glassmorphic Light Login Card */}
      <div className="w-full max-w-md bg-white/90 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl shadow-slate-100/80 border border-slate-200/60 relative z-10 space-y-6 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-100 text-primary mb-3 shadow-inner shadow-emerald-500/5">
            <Activity className="h-7 w-7" />
          </div>
          <h1 className="text-2xl font-extrabold text-neutral-dark tracking-tight">
            Portal CMS Admin
          </h1>
          <p className="text-xs text-slate-400 font-bold leading-relaxed">
            Masuk untuk mengelola modul edukasi, publikasi karya, dan data rujukan SIGMA
          </p>
        </div>

        {/* Error notification block */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center space-x-2 animate-in fade-in duration-200">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form elements */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Username Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">
              Username Admin
            </label>
            <input
              type="text"
              required
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-neutral-dark text-xs font-semibold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-sans"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-neutral-dark text-xs font-semibold placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-sans pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={
                  showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
                }
              >
                {showPassword ? (
                  <EyeOff className="h-4.5 w-4.5" />
                ) : (
                  <Eye className="h-4.5 w-4.5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/10 active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4.5 w-4.5 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <span>Masuk ke Dashboard</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </>
            )}
          </button>

        </form>

        {/* Footer encrypted status */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-center space-x-1.5 text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span>Akses Terenkripsi Pengurus SIGMA</span>
        </div>

      </div>
    </div>
  );
}