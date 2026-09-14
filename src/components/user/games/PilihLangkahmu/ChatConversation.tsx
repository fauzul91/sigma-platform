"use client";

import React, { useEffect, useRef } from "react";
import type { ScenarioScene } from "@/data/pilihLangkahmu";
import ChatBubble from "./ChatBubble";
import { Compass } from "lucide-react";

interface ChatConversationProps {
  scene: ScenarioScene;
  lastConsequence?: string;
  isTransitioning?: boolean;
}

export default function ChatConversation({
  scene,
  lastConsequence,
  isTransitioning,
}: ChatConversationProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [scene, lastConsequence]);

  return (
    <div className="flex-1 flex flex-col justify-between overflow-y-auto p-4 sm:p-6 space-y-4">
      {/* Consequence banner from previous choice if exists */}
      {lastConsequence && (
        <div className="mb-2 p-3.5 rounded-xl bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-semibold flex items-start space-x-2 animate-fadeIn">
          <span className="text-emerald-700 font-bold shrink-0">✓ Kamu memilih:</span>
          <span>{lastConsequence}</span>
        </div>
      )}

      {/* Situation Context Banner */}
      {scene.situationContext && (
        <div className="p-4 rounded-xl bg-slate-900 text-slate-100 border-l-4 border-amber-400 text-xs sm:text-sm font-medium leading-relaxed shadow-sm flex items-start space-x-3 mb-3">
          <Compass className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="block text-[10px] font-extrabold uppercase tracking-widest text-amber-400 mb-0.5">
              Konteks Situasi
            </span>
            <p className="text-slate-200">{scene.situationContext}</p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="space-y-1">
        {scene.messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}
      </div>

      {/* Typing indicator when transitioning */}
      {isTransitioning && (
        <div className="flex items-center space-x-2 p-3 bg-white/80 rounded-full w-fit border border-slate-200 shadow-2xs">
          <span className="text-xs text-slate-500 font-medium">Situasi berlanjut...</span>
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}