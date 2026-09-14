"use client";

import React, { useState } from "react";
import { VerdictType } from "@/data/detectiveCasesData";
import { ShieldCheck, AlertTriangle, ShieldAlert, ArrowRight } from "lucide-react";

interface VerdictSelectorProps {
  onSubmit: (verdict: VerdictType) => void;
}

const VERDICTS = [
  {
    value: "trusted" as VerdictType,
    label: "TERPERCAYA",
    subtext: "Informasi kredibel dari institusi resmi yang dapat dipertanggungjawabkan.",
    icon: ShieldCheck,
    borderSelected: "border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/30",
    iconBg: "bg-emerald-600 text-white",
    indicatorColor: "border-emerald-600",
  },
  {
    value: "check" as VerdictType,
    label: "PERLU VERIFIKASI",
    subtext: "Mengandung fakta yang dipelintir, angka dilebih-lebihkan, atau konteks terputus.",
    icon: AlertTriangle,
    borderSelected: "border-amber-500 bg-amber-50 text-amber-950 ring-2 ring-amber-500/30",
    iconBg: "bg-amber-500 text-slate-950",
    indicatorColor: "border-amber-500",
  },
  {
    value: "misleading" as VerdictType,
    label: "MENYESATKAN",
    subtext: "Hoaks palsu, memancing kepanikan berlebihan, dan bertentangan dengan sains.",
    icon: ShieldAlert,
    borderSelected: "border-rose-600 bg-rose-50 text-rose-950 ring-2 ring-rose-500/30",
    iconBg: "bg-rose-600 text-white",
    indicatorColor: "border-rose-600",
  },
];

export default function VerdictSelector({ onSubmit }: VerdictSelectorProps) {
  const [selected, setSelected] = useState<VerdictType | null>(null);

  return (
    <div className="space-y-4 pt-2 animate-in fade-in duration-200">
      <div>
        <h4 className="text-sm sm:text-base font-black text-slate-900">
          Bagaimana Kesimpulan Detektifmu?
        </h4>
        <p className="text-xs text-slate-500 font-bold">
          Pilih salah satu status di bawah ini berdasarkan bukti yang telah kamu kumpulkan:
        </p>
      </div>

      <div className="space-y-2.5">
        {VERDICTS.map((item) => {
          const isSelected = selected === item.value;
          const Icon = item.icon;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setSelected(item.value)}
              className={`w-full text-left p-4 rounded-2xl border-[2.5px] transition-all flex items-center gap-3.5 cursor-pointer shadow-xs ${
                isSelected
                  ? item.borderSelected
                  : "border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50/60"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                  isSelected ? item.iconBg : "bg-slate-100 text-slate-600"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-sm font-black tracking-wide block">
                  {item.label}
                </span>
                <p className="text-xs text-slate-600 font-medium leading-snug pt-0.5">
                  {item.subtext}
                </p>
              </div>

              {/* Radio indicator */}
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  isSelected ? `${item.indicatorColor} bg-current` : "border-slate-300"
                }`}
              >
                {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Big 3D Tactile Submit Button */}
      <div className="pt-2">
        <button
          type="button"
          disabled={!selected}
          onClick={() => selected && onSubmit(selected)}
          className={`w-full py-4 px-6 rounded-2xl font-black text-sm sm:text-base tracking-wide transition-all duration-150 flex items-center justify-center space-x-2 ${
            selected
              ? "bg-[#facc15] hover:bg-[#fde047] border-b-[5px] border-[#ca8a04] active:border-b-0 active:translate-y-1 text-slate-950 shadow-lg hover:shadow-xl cursor-pointer"
              : "bg-slate-200 text-slate-400 border-b-[4px] border-slate-300 cursor-not-allowed"
          }`}
        >
          <span>Kunci Kesimpulan Investigasi</span>
          <ArrowRight className="h-5 w-5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
}
