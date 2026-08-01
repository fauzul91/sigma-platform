"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, ArrowLeft, Activity, ShieldAlert, CheckCircle, Info } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Redirect instantly if already authenticated
    const authStatus = sessionStorage.getItem("adminAuth") === "true";
    if (authStatus) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        sessionStorage.setItem("adminAuth", "true");
        setShowToast(true);
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 1000);
      } else {
        setError("Kombinasi username atau password salah!");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="relative min-h-screen bg-slate-50 flex items-center justify-center px-6 sm:px-10 lg:px-16 py-12 overflow-hidden">
      
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-1/4 -z-10 h-[450px] w-[450px] rounded-full bg-emerald-100/30 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 -z-10 h-[400px] w-[400px] rounded-full bg-amber-100/20 blur-3xl" />

      {/* Floating success toast */}
      {showToast && (
        <div className="fixed top-5 right-5 z-50 px-5 py-3.5 rounded-2xl shadow-xl flex items-center space-x-2.5 text-xs font-bold border bg-emerald-50 border-emerald-200 text-emerald-800 animate-in slide-in-from-right duration-200">
          <CheckCircle className="h-4.5 w-4.5 text-emerald-600" />
          <span>Autentikasi berhasil! Mengalihkan...</span>
        </div>
      )}

      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-3xl border border-slate-100 shadow-2xl relative">
        
        {/* Back navigation button */}
        <Link
          href="/beranda"
          className="absolute -top-14 left-0 inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors bg-white px-3.5 py-2 rounded-xl border border-slate-200/60 shadow-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Kembali ke Beranda</span>
        </Link>

        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-emerald-500/10">
            <Activity className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-neutral-dark tracking-tight">CMS Admin SIGMA</h1>
            <p className="text-xs text-slate-400 mt-1 font-semibold">Silakan masuk untuk mengelola portal edukasi.</p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Username</label>
            <input
              type="text"
              required
              disabled={loading}
              placeholder="Masukkan username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">Password</label>
            <input
              type="password"
              required
              disabled={loading}
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
            />
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-100 flex items-start space-x-2 text-rose-800 text-xs font-semibold animate-in fade-in duration-200">
              <ShieldAlert className="h-4.5 w-4.5 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-neutral-dark hover:bg-slate-800 text-white font-extrabold text-xs transition-all flex items-center justify-center space-x-2 shadow-md active:scale-98 disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
            ) : (
              <>
                <Lock className="h-4 w-4" />
                <span>Masuk Sekarang</span>
              </>
            )}
          </button>

        </form>

        {/* Credentials Assistant */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-start space-x-2 text-slate-500">
          <Info className="h-4.5 w-4.5 text-primary shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-[10px] leading-relaxed font-semibold">
            <p className="text-neutral-dark font-bold">Bantuan Kredensial (Simulasi):</p>
            <p>Gunakan Username: <code className="bg-slate-200/80 px-1 rounded">admin</code> dan Password: <code className="bg-slate-200/80 px-1 rounded">admin123</code></p>
          </div>
        </div>

      </div>
    </div>
  );
}
