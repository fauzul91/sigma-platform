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
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl animate-in zoom-in-95 duration-200 text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
          <AlertCircle className="h-7 w-7 animate-pulse" />
        </div>
        <div>
          <h3 className="font-extrabold text-neutral-dark text-lg">Hapus Data?</h3>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed">
            Apakah Anda yakin ingin menghapus <strong>"{deleteTarget.title}"</strong>? Tindakan ini tidak dapat dibatalkan.
          </p>
        </div>
        <div className="flex gap-3 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-500 text-xs font-bold hover:bg-slate-50 transition-all"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md shadow-rose-600/10 transition-all"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
