"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type {
  Scenario,
  ScenarioScene,
  ScenarioChoice,
  ChatMessage,
  DecisionHistoryEntry,
} from "@/data/pilihLangkahmu";
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Menu,
  X,
  Volume2,
  VolumeX,
  Sparkles,
} from "lucide-react";

interface VisualNovelStageProps {
  scenario: Scenario;
  playerName: string;
  onFinishScenario: (history: DecisionHistoryEntry[]) => void;
  onExitToHub: () => void;
  onRestartScenario: () => void;
}

export default function VisualNovelStage({
  scenario,
  playerName,
  onFinishScenario,
  onExitToHub,
  onRestartScenario,
}: VisualNovelStageProps) {
  // State management
  const [currentSceneId, setCurrentSceneId] = useState<string>(
    scenario.startSceneId || "step_1"
  );
  const [messageIndex, setMessageIndex] = useState<number>(0);
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [transitionNote, setTransitionNote] = useState<string | null>(null);
  const [history, setHistory] = useState<DecisionHistoryEntry[]>([]);

  const currentScene: ScenarioScene =
    scenario.scenes[currentSceneId] ||
    scenario.scenes[scenario.startSceneId] ||
    Object.values(scenario.scenes)[0];
  const currentMessage: ChatMessage | undefined =
    currentScene?.messages?.[messageIndex] || currentScene?.messages?.[0];

  // Replace {name} placeholder with user's name
  const formatText = (text: string): string => {
    return text.replace(/{name}/g, playerName);
  };

  // Typewriter effect
  useEffect(() => {
    if (!currentMessage) return;

    const fullText = formatText(currentMessage.text);
    setDisplayedText("");
    setIsTyping(true);

    let charIdx = 0;
    const interval = setInterval(() => {
      charIdx++;
      setDisplayedText(fullText.slice(0, charIdx));

      if (charIdx >= fullText.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 22); // 22ms per character typing speed

    return () => clearInterval(interval);
  }, [currentSceneId, messageIndex]);

  // Click handler on dialogue box: skip typing or advance
  const handleDialogueBoxClick = () => {
    if (!currentMessage) return;

    const fullText = formatText(currentMessage.text);

    // If still typing, complete immediately
    if (isTyping) {
      setDisplayedText(fullText);
      setIsTyping(false);
      return;
    }

    // If more messages in current scene, advance message
    if (messageIndex < (currentScene?.messages?.length || 1) - 1) {
      setMessageIndex((prev) => prev + 1);
      return;
    }

    // If at end of messages and this is an ending scene with no choices
    if (currentScene?.isEnding || !currentScene?.choices || currentScene.choices.length === 0) {
      onFinishScenario(history);
    }
  };

  // Choice selection handler with transition bridge
  const handleSelectChoice = (choice: ScenarioChoice) => {
    if (isTransitioning || selectedChoiceId) return;

    setSelectedChoiceId(choice.id);
    setIsTransitioning(true);
    setTransitionNote(choice.consequence || "Beberapa saat kemudian...");

    // Record decision to history
    const entry: DecisionHistoryEntry = {
      stepNumber: currentScene.stepNumber,
      sceneId: currentSceneId,
      choiceId: choice.id,
      choiceText: choice.text,
      reflectionKey: choice.reflectionKey,
    };
    const updatedHistory = [...history, entry];
    setHistory(updatedHistory);

    // Consequence transition timer (800ms)
    setTimeout(() => {
      const nextScene = scenario.scenes[choice.nextSceneId];
      if (!nextScene || nextScene.isEnding || !nextScene.choices || nextScene.choices.length === 0) {
        if (nextScene) {
          setCurrentSceneId(choice.nextSceneId);
          setMessageIndex(0);
          setSelectedChoiceId(null);
          setIsTransitioning(false);
          setTransitionNote(null);
        } else {
          onFinishScenario(updatedHistory);
        }
      } else {
        setCurrentSceneId(choice.nextSceneId);
        setMessageIndex(0);
        setSelectedChoiceId(null);
        setIsTransitioning(false);
        setTransitionNote(null);
      }
    }, 850);
  };

  // Check if choices should be visible (at last message and typing finished)
  const isLastMessage =
    messageIndex === currentScene.messages.length - 1;
  const showChoices =
    isLastMessage &&
    !isTyping &&
    currentScene.choices &&
    currentScene.choices.length > 0;

  // Speaker configuration
  const isNarrator = currentMessage?.sender === "narrator";
  const isUserSpeaker = currentMessage?.sender === "user";
  const speakerName = isNarrator
    ? "Catatan Situasi"
    : isUserSpeaker
    ? playerName
    : currentMessage?.senderName || "Karakter";

  // Current Character Portrait image
  const characterImage = isNarrator
    ? null
    : isUserSpeaker
    ? "/assets/characters/player_boy.png"
    : currentMessage?.characterImage || "/assets/characters/ibu.jpg";

  return (
    <div className="relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden select-none bg-radial from-[#1e3a2f] via-[#0f241c] to-[#08150f] text-slate-100">
      {/* 1. Subtle Diamond Pattern Backdrop Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22 0 L44 22 L22 44 L0 22 Z' fill='none' stroke='%23fff' stroke-width='1.5'/%3E%3C/svg%3E")`,
          backgroundSize: "36px 36px",
        }}
      />

      {/* 2. Top HUD Navigation Bar */}
      <header className="relative z-20 w-full max-w-4xl mx-auto px-4 pt-4 flex items-center justify-between">
        {/* Left: Pause Menu Button */}
        <button
          onClick={() => setIsPaused(true)}
          className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-black/40 hover:bg-black/60 border border-white/20 text-white font-bold text-xs backdrop-blur-md transition-all cursor-pointer"
          title="Buka Menu Pause"
        >
          <Menu className="w-4 h-4 text-amber-400" />
          <span className="hidden sm:inline">Menu</span>
        </button>

        {/* Center: Connected Progress Dots (Langkah 1 s.d. 5) */}
        <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/15">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-300 mr-1">
            Langkah {currentScene.stepNumber}/5
          </span>
          <div className="flex items-center space-x-1 sm:space-x-1.5">
            {[1, 2, 3, 4, 5].map((step) => {
              const isCompleted = step < currentScene.stepNumber;
              const isCurrent = step === currentScene.stepNumber;

              return (
                <React.Fragment key={step}>
                  <div
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      isCompleted
                        ? "bg-emerald-400 ring-2 ring-emerald-400/40"
                        : isCurrent
                        ? "bg-amber-400 scale-125 ring-3 ring-amber-400/50 animate-pulse"
                        : "bg-white/25"
                    }`}
                  />
                  {step < 5 && (
                    <div
                      className={`w-2 sm:w-3 h-0.5 ${
                        step < currentScene.stepNumber
                          ? "bg-emerald-400"
                          : "bg-white/20"
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Right: Restart Current Scenario */}
        <button
          onClick={onRestartScenario}
          className="p-2 rounded-xl bg-black/40 hover:bg-black/60 border border-white/20 text-white transition-all backdrop-blur-md cursor-pointer"
          title="Ulangi Skenario"
        >
          <RotateCcw className="w-4 h-4 text-slate-300" />
        </button>
      </header>

      {/* 3. Central Stage: Character Portrait Display */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-end pb-3 sm:pb-4 pointer-events-none">
        {/* Soft Ambient Light Glow behind character */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        {/* Character Portrait with Talking Reaction */}
        {characterImage ? (
          <div
            className={`relative w-52 sm:w-64 md:w-72 h-64 sm:h-80 md:h-96 transition-all duration-300 filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)] ${
              isTyping ? "scale-105" : "scale-100"
            }`}
          >
            <Image
              src={characterImage}
              alt={speakerName}
              fill
              unoptimized
              className="object-contain object-bottom"
              priority
            />
          </div>
        ) : (
          /* Narrator / Atmosphere visual */
          <div className="my-auto px-6 py-4 rounded-2xl bg-black/40 backdrop-blur-md border border-amber-400/30 text-amber-200 text-xs sm:text-sm font-semibold max-w-lg text-center animate-fadeIn shadow-lg">
            <Sparkles className="w-5 h-5 text-amber-400 mx-auto mb-1.5 animate-pulse" />
            <span>Pikirkan langkahmu dengan jernih. Setiap tindakan memiliki arti.</span>
          </div>
        )}
      </div>

      {/* 4. Consequence Transition Bridge Overlay */}
      {isTransitioning && transitionNote && (
        <div className="absolute inset-0 z-40 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-6 animate-fadeIn">
          <div className="bg-[#fffbeb] border-3 border-emerald-600 rounded-3xl p-6 sm:p-8 max-w-md text-center shadow-2xl text-slate-900 space-y-3">
            <div className="inline-flex items-center space-x-1.5 text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Pilihanmu Disimpan</span>
            </div>
            <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed italic">
              "{transitionNote}"
            </p>
            <div className="pt-2 flex justify-center space-x-1.5">
              <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </div>
      )}

      {/* 5. Choice Selection Cards (Staggered Entrance) */}
      {showChoices && !isTransitioning && (
        <div className="relative z-30 w-full max-w-3xl mx-auto px-4 mb-3 animate-fadeIn">
          <div className="bg-slate-950/85 backdrop-blur-md border-2 border-amber-400/70 rounded-2xl p-4 sm:p-5 shadow-2xl space-y-2.5">
            <div className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-amber-300 flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Apa yang akan kamu lakukan?</span>
            </div>

            <div className="space-y-2">
              {currentScene.choices!.map((choice, idx) => (
                <button
                  key={choice.id}
                  onClick={() => handleSelectChoice(choice)}
                  style={{ animationDelay: `${idx * 90}ms` }}
                  className="w-full text-left p-3.5 sm:p-4 rounded-xl bg-white/95 hover:bg-emerald-50 border-2 border-amber-200 hover:border-emerald-600 text-slate-900 font-bold text-xs sm:text-sm leading-snug transition-all duration-150 shadow-md active:translate-y-0.5 flex items-center justify-between group cursor-pointer animate-fadeIn"
                >
                  <span>{choice.text}</span>
                  <div className="w-6 h-6 rounded-lg bg-slate-200 group-hover:bg-emerald-600 text-slate-600 group-hover:text-white flex items-center justify-center shrink-0 ml-3 transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. Dialogue Box matching user reference image media_1789392332086.png */}
      <div className="relative z-20 w-full max-w-3xl mx-auto px-4 pb-4 sm:pb-6">
        <div
          onClick={handleDialogueBoxClick}
          className="relative bg-[#fffbeb] border-[3.5px] border-[#78350f]/40 rounded-3xl p-5 sm:p-6 shadow-2xl cursor-pointer hover:border-[#78350f]/60 transition-all text-left"
        >
          {/* Speaker Badge Tab on top-left */}
          <div className="absolute -top-4 left-6 px-4 py-1 rounded-full bg-[#ea580c] border border-amber-300 text-white font-black text-xs sm:text-sm tracking-wide shadow-md">
            {speakerName}
          </div>

          {/* Dialogue Text Content with Typewriter Effect */}
          <div className="min-h-[64px] sm:min-h-[76px] flex items-start pt-1">
            <p className="text-sm sm:text-base md:text-lg text-slate-900 font-bold leading-relaxed whitespace-pre-line">
              {displayedText}
              {isTyping && (
                <span className="inline-block w-2 h-4 ml-1 bg-amber-600 animate-pulse align-middle" />
              )}
            </p>
          </div>

          {/* Bottom Controls inside Dialogue Box */}
          <div className="flex items-center justify-between pt-3 mt-2 border-t border-amber-900/10 text-xs">
            <span className="text-[11px] sm:text-xs font-black text-amber-900/70 uppercase tracking-wider">
              {isNarrator
                ? "Narasi Situasi"
                : `Langkah ${currentScene.stepNumber} / 5`}
            </span>

            {/* Tap/Click anywhere hint & tactile Next button */}
            <div className="flex items-center space-x-2">
              <span className="hidden sm:inline text-[10px] text-slate-500 font-semibold italic">
                {isTyping ? "Klik untuk percepat" : "Klik untuk lanjut"}
              </span>

              {!showChoices && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDialogueBoxClick();
                  }}
                  className="inline-flex items-center space-x-1 px-4 py-1.5 rounded-xl bg-[#facc15] hover:bg-[#fde047] border-b-[3px] border-[#ca8a04] active:border-b-0 active:translate-y-0.5 text-slate-950 font-black text-xs tracking-wide shadow-xs transition-all cursor-pointer"
                >
                  <span>
                    {isLastMessage && currentScene.isEnding
                      ? "Lihat Hasil ➔"
                      : "Lanjut"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 7. Pause Modal Menu */}
      {isPaused && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-[#fffbeb] border-3 border-amber-600 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-slate-900 shadow-2xl text-center space-y-4">
            <div className="flex items-center justify-between border-b border-amber-900/10 pb-3">
              <span className="text-xs font-black uppercase text-amber-800 tracking-wider">
                Simulasi Dijeda
              </span>
              <button
                onClick={() => setIsPaused(false)}
                className="p-1 rounded-lg hover:bg-slate-200 text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900">{scenario.title}</h3>
              <p className="text-xs font-bold text-emerald-800 uppercase mt-0.5">
                {scenario.topic}
              </p>
              <p className="text-xs font-semibold text-slate-600 mt-2">
                Progres: Langkah {currentScene.stepNumber} dari 5
              </p>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => setIsPaused(false)}
                className="w-full py-3 rounded-xl bg-[#facc15] hover:bg-[#fde047] border-b-[4px] border-[#ca8a04] text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-md"
              >
                Lanjutkan Cerita
              </button>

              <button
                onClick={() => {
                  setIsPaused(false);
                  onRestartScenario();
                }}
                className="w-full py-2.5 rounded-xl border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-bold text-xs sm:text-sm"
              >
                Mulai Ulang Kasus Ini
              </button>

              <button
                onClick={() => {
                  setIsPaused(false);
                  onExitToHub();
                }}
                className="w-full py-2.5 rounded-xl border-2 border-rose-300 hover:border-rose-400 text-rose-700 font-bold text-xs sm:text-sm"
              >
                Keluar ke Pilih Cerita
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}