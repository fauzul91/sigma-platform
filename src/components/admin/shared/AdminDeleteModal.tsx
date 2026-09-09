import React from "react";
import { AlertCircle } from "lucide-react";

interface AdminDeleteModalProps {
  deleteTarget: {
    type: string;
    id: string | number;
    title: string;
  } | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function AdminDeleteModal({ deleteTarget, onCancel, onConfirm }: AdminDeleteModalProps) {
  if (!deleteTarget) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200 text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400">
          <AlertCircle className="h-7 w-7 animate-pulse" />
        </div>
        <div>
          <h3 className="font-extrabold text-neutral-dark dark:text-slate-100 text-lg">Hapus Data?</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Apakah Anda yakin ingin menghapus <strong>"{deleteTarget.title}"</strong>? Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/10 transition-all cursor-pointer"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
