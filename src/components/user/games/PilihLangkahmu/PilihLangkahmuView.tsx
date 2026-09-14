"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  ALL_SCENARIOS,
  type Scenario,
  type DecisionHistoryEntry,
  type ReflectionKey,
} from "@/data/pilihLangkahmu";
import { useGameFullscreen } from "@/context/GameFullscreenContext";
import PlayerNameModal from "./PlayerNameModal";
import ScenarioSelectHub from "./ScenarioSelectHub";
import VisualNovelStage from "./VisualNovelStage";
import DecisionMirror from "./DecisionMirror";

type ViewState = "enter_name" | "select_scenario" | "playing" | "reflection";

const STORAGE_KEY = "sigma_player_name";

export default function PilihLangkahmuView() {
  const [playerName, setPlayerName] = useState<string>("Kawan");
  const [viewState, setViewState] = useState<ViewState>("select_scenario");
  const [activeScenario, setActiveScenario] = useState<Scenario>(ALL_SCENARIOS[0]);
  const [history, setHistory] = useState<DecisionHistoryEntry[]>([]);
  const [stageKey, setStageKey] = useState<number>(0);
  const [isClient, setIsClient] = useState<boolean>(false);

  const { setIsFullscreenGame } = useGameFullscreen();

  // Fullscreen controller: only fullscreen during actual gameplay and reflection
  useEffect(() => {
    const isFullscreen = viewState === "playing" || viewState === "reflection";
    setIsFullscreenGame(isFullscreen);
  }, [viewState, setIsFullscreenGame]);

  useEffect(() => {
    return () => {
      setIsFullscreenGame(false);
    };
  }, [setIsFullscreenGame]);

  // Load player name from localStorage on mount
  useEffect(() => {
    setIsClient(true);
    const savedName = localStorage.getItem(STORAGE_KEY);
    if (savedName && savedName.trim()) {
      setPlayerName(savedName.trim());
      setViewState("select_scenario");
    } else {
      setViewState("enter_name");
    }
  }, []);

  // Handle name submission
  const handleNameSubmit = (name: string) => {
    setPlayerName(name);
    localStorage.setItem(STORAGE_KEY, name);
    setViewState("select_scenario");
  };

  // Handle scenario selection
  const handleSelectScenario = (scenario: Scenario) => {
    setActiveScenario(scenario);
    setHistory([]);
    setStageKey((k) => k + 1);
    setViewState("playing");
  };

  // Handle finish scenario -> Go to Cermin Keputusan
  const handleFinishScenario = (finalHistory: DecisionHistoryEntry[]) => {
    setHistory(finalHistory);
    setViewState("reflection");
  };

  // Restart current scenario
  const handleRestartScenario = () => {
    setHistory([]);
    setStageKey((k) => k + 1);
    setViewState("playing");
  };

  // Dominant reflection key calculator
  const dominantReflection = useMemo(() => {
    if (history.length === 0) {
      return Object.values(activeScenario.reflections)[0];
    }

    const counts: Record<ReflectionKey, number> = {
      protect_boundary: 0,
      avoid_conflict: 0,
      seek_support: 0,
      communicate_directly: 0,
      reconsider: 0,
    };

    history.forEach((h) => {
      counts[h.reflectionKey] = (counts[h.reflectionKey] || 0) + 1;
    });

    let maxKey: ReflectionKey = history[history.length - 1].reflectionKey;
    let maxCount = 0;
    (Object.keys(counts) as ReflectionKey[]).forEach((key) => {
      if (counts[key] > maxCount) {
        maxCount = counts[key];
        maxKey = key;
      }
    });

    return activeScenario.reflections[maxKey] || Object.values(activeScenario.reflections)[0];
  }, [history, activeScenario]);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 1. Regular View (Select Scenario & Enter Name): Normal website page with Navbar and Footer
  if (viewState === "select_scenario" || viewState === "enter_name") {
    return (
      <div className="bg-[#faf8f5] min-h-screen font-sans relative selection:bg-emerald-100 selection:text-emerald-900 flex flex-col justify-between">
        {/* Subtle Diamond Pattern Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035] z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22 0 L44 22 L22 44 L0 22 Z' fill='none' stroke='%23000' stroke-width='1.5'/%3E%3C/svg%3E")`,
            backgroundSize: "36px 36px",
          }}
        />

        <main className="relative z-10 w-full flex-1 flex flex-col justify-center py-6 sm:py-10">
          {viewState === "enter_name" ? (
            <PlayerNameModal
              initialName={playerName === "Kawan" ? "" : playerName}
              onSubmitName={handleNameSubmit}
              onBackToHub={() => {
                if (playerName && playerName !== "Kawan") {
                  setViewState("select_scenario");
                } else {
                  window.location.href = "/permainan";
                }
              }}
            />
          ) : (
            <ScenarioSelectHub
              playerName={playerName}
              scenarios={ALL_SCENARIOS}
              onSelectScenario={handleSelectScenario}
              onChangeName={() => setViewState("enter_name")}
              onBackToHub={() => {
                window.location.href = "/permainan";
              }}
            />
          )}
        </main>
      </div>
    );
  }

  // 2. Fullscreen Immersive Canvas (Playing, Reflection)
  return (
    <div className="bg-[#08150f] min-h-screen font-sans relative selection:bg-emerald-500 selection:text-white flex flex-col justify-between overflow-x-hidden">
      {/* Rich Forest / Emerald Ambient Radial Gradient matching visual novel stage */}
      <div className="fixed inset-0 bg-radial from-[#1e3a2f] via-[#0f241c] to-[#08150f] pointer-events-none z-0" />

      {/* Subtle Diamond Pattern Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.04] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='44' height='44' viewBox='0 0 44 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M22 0 L44 22 L22 44 L0 22 Z' fill='none' stroke='%23fff' stroke-width='1.5'/%3E%3C/svg%3E")`,
          backgroundSize: "36px 36px",
        }}
      />

      <main className="relative z-10 w-full flex-1 flex flex-col justify-center">
        {viewState === "playing" && (
          <VisualNovelStage
            key={`${activeScenario.id}-${stageKey}`}
            scenario={activeScenario}
            playerName={playerName || "Kawan"}
            onFinishScenario={handleFinishScenario}
            onExitToHub={() => setViewState("select_scenario")}
            onRestartScenario={handleRestartScenario}
          />
        )}

        {viewState === "reflection" && (
          <DecisionMirror
            scenario={activeScenario}
            playerName={playerName || "Kawan"}
            reflection={dominantReflection}
            history={history}
            onRestart={handleRestartScenario}
            onExitToSelect={() => setViewState("select_scenario")}
          />
        )}
      </main>
    </div>
  );
}