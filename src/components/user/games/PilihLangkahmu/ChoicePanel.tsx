"use client";

import React from "react";
import type { ScenarioChoice } from "@/data/pilihLangkahmu";
import ChoiceCard from "./ChoiceCard";
import { MessageSquareCode } from "lucide-react";

interface ChoicePanelProps {
  choices: ScenarioChoice[];
  onSelectChoice: (choice: ScenarioChoice) => void;
  disabled?: boolean;
}

export default function ChoicePanel({
  choices,
  onSelectChoice,
  disabled,
}: ChoicePanelProps) {
  return (
    <div className="p-4 sm:p-5 bg-slate-100/90 border-t-2 border-slate-200/90 space-y-3 shrink-0 rounded-b-xl">
      <div className="flex items-center space-x-2 text-slate-600 text-xs font-bold uppercase tracking-wider">
        <MessageSquareCode className="w-3.5 h-3.5 text-emerald-700" />
        <span>Apa tindakan yang akan kamu ambil?</span>
      </div>

      <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-1">
        {choices.map((choice) => (
          <ChoiceCard
            key={choice.id}
            choice={choice}
            onSelect={onSelectChoice}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}