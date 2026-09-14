"use client";

import React from "react";
import type { ScenarioChoice } from "@/data/pilihLangkahmu";
import { ChevronRight } from "lucide-react";

interface ChoiceCardProps {
  choice: ScenarioChoice;
  onSelect: (choice: ScenarioChoice) => void;
  disabled?: boolean;
}

export default function ChoiceCard({
  choice,
  onSelect,
  disabled,
}: ChoiceCardProps) {
  return (
    <button
      onClick={() => onSelect(choice)}
      disabled={disabled}
      className="w-full text-left p-3.5 sm:p-4 rounded-xl bg-white hover:bg-emerald-50/80 border-2 border-slate-200 hover:border-emerald-600 active:translate-y-0.5 transition-all duration-150 shadow-2xs hover:shadow-sm group flex items-center justify-between gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-emerald-950 leading-snug">
        {choice.text}
      </span>
      <div className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-emerald-600 text-slate-500 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </button>
  );
}