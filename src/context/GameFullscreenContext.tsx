"use client";

import React, { createContext, useContext, useState } from "react";

interface GameFullscreenContextType {
  isFullscreenGame: boolean;
  setIsFullscreenGame: (val: boolean) => void;
}

const GameFullscreenContext = createContext<GameFullscreenContextType>({
  isFullscreenGame: false,
  setIsFullscreenGame: () => {},
});

export function GameFullscreenProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isFullscreenGame, setIsFullscreenGame] = useState(false);

  return (
    <GameFullscreenContext.Provider
      value={{ isFullscreenGame, setIsFullscreenGame }}
    >
      {children}
    </GameFullscreenContext.Provider>
  );
}

export function useGameFullscreen() {
  return useContext(GameFullscreenContext);
}