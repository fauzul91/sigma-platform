"use client";

import React from "react";
import Link from "next/link";
import type { Scenario } from "@/data/pilihLangkahmu";
import { ArrowLeft, RotateCcw, Compass, ListOrdered } from "lucide-react";

interface ScenarioHeaderProps {
  currentScenario: Scenario;
  scenarios: Scenario[];
  onSelectScenario: (scenario: Scenario) => void;
  onRestartScenario: () => void;
  showScenarioMenu?: boolean;
}

export default function ScenarioHeader({
  currentScenario,
  scenarios,
  onSelectScenario,
  onRestartScenario,
}: ScenarioHeaderProps) {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-amber-900/10 sticky top-0 z-30 px-4 sm:px-6 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Back to Hub + Brand */}
        <div className="flex items-center space-x-3">
          <Link
            href="/permainan"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Kembali ke Menu Permainan"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-emerald-800 font-black text-sm tracking-tight">
                sigma<span className="text-amber-500">.</span>
              </span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Pilih Langkahmu
              </span>
            </div>
            <p className="text-xs font-bold text-slate-800 line-clamp-1">
              Kasus 0{currentScenario.number}: {currentScenario.title}
            </p>
          </div>
        </div>

        {/* Right: Actions (Restart & Scenario Selector) */}
        <div className="flex items-center space-x-2">
          {/* Quick Scenario Selector */}
          <select
            value={currentScenario.id}
            onChange={(e) => {
              const selected = scenarios.find((s) => s.id === e.target.value);
              if (selected) onSelectScenario(selected);
            }}
            className="text-xs font-bold bg-slate-100 border border-slate-300 rounded-xl px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 max-w-[140px] sm:max-w-none"
          >
            {scenarios.map((s) => (
              <option key={s.id} value={s.id}>
                Kasus 0{s.number}: {s.title}
              </option>
            ))}
          </select>

          <button
            onClick={onRestartScenario}
            title="Mulai Ulang Skenario Ini"
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}