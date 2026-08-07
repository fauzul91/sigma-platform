import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface AdminPaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export default function AdminPagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
}: AdminPaginationProps) {
  const totalPages = Math.ceil(totalItems / pageSize);

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 mt-4 text-[11px] md:text-xs text-slate-500 font-semibold select-none">
      <div className="text-center sm:text-left">
        Menampilkan{" "}
        <span className="text-neutral-dark font-extrabold">
          {Math.min((currentPage - 1) * pageSize + 1, totalItems)}
        </span>{" "}
        sampai{" "}
        <span className="text-neutral-dark font-extrabold">
          {Math.min(currentPage * pageSize, totalItems)}
        </span>{" "}
        dari <span className="text-neutral-dark font-extrabold">{totalItems}</span> data
      </div>

      <div className="flex items-center space-x-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white text-slate-600 transition-colors cursor-pointer"
          aria-label="Halaman Sebelumnya"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {Array.from({ length: totalPages }).map((_, idx) => {
          const pageNum = idx + 1;
          const isActive = currentPage === pageNum;
          return (
            <button
              type="button"
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-primary border-primary text-white font-extrabold shadow-sm"
                  : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white text-slate-600 transition-colors cursor-pointer"
          aria-label="Halaman Selanjutnya"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
