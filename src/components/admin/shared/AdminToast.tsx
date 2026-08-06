import React from "react";
import { CheckCircle, AlertCircle, Info } from "lucide-react";

interface AdminToastProps {
  toast: {
    message: string;
    type: "success" | "info" | "danger";
  } | null;
}

export default function AdminToast({ toast }: AdminToastProps) {
  if (!toast) return null;

  return (
    <div className={`fixed top-5 right-5 z-50 px-5 py-3.5 rounded-2xl shadow-xl flex items-center space-x-2.5 text-xs font-bold border transition-all animate-in slide-in-from-right duration-200 ${
      toast.type === "success" 
        ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
        : toast.type === "danger" 
          ? "bg-rose-50 border-rose-200 text-rose-800" 
          : "bg-blue-50 border-blue-200 text-blue-800"
    }`}>
      {toast.type === "success" && <CheckCircle className="h-4.5 w-4.5 text-emerald-600" />}
      {toast.type === "danger" && <AlertCircle className="h-4.5 w-4.5 text-rose-600" />}
      {toast.type === "info" && <Info className="h-4.5 w-4.5 text-blue-600" />}
      <span>{toast.message}</span>
    </div>
  );
}
