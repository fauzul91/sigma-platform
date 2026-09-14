"use client";

import React from "react";
import type { ChatMessage } from "@/data/pilihLangkahmu";
import { User, Sparkles } from "lucide-react";

interface ChatBubbleProps {
  message: ChatMessage;
}

export default function ChatBubble({ message }: ChatBubbleProps) {
  if (message.sender === "narrator") {
    return (
      <div className="my-4 px-4 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900/90 text-xs sm:text-sm font-medium leading-relaxed shadow-2xs flex items-start space-x-3">
        <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <span className="italic">{message.text}</span>
      </div>
    );
  }

  const isUser = message.sender === "user";

  return (
    <div
      className={`flex items-end space-x-2 my-2.5 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs border border-emerald-600">
          {message.senderName ? message.senderName[0] : "K"}
        </div>
      )}

      <div
        className={`max-w-[82%] sm:max-w-[75%] px-4 py-3 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed shadow-2xs ${
          isUser
            ? "bg-emerald-700 text-white rounded-br-none border border-emerald-800"
            : "bg-white text-slate-800 rounded-bl-none border border-slate-200/90"
        }`}
      >
        {!isUser && message.senderName && (
          <span className="block text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider mb-1">
            {message.senderName}
          </span>
        )}
        <p className="whitespace-pre-line">{message.text}</p>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-xs shrink-0 shadow-2xs border border-amber-600">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}