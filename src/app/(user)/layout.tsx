"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import SosButton from "@/components/shared/SosButton";
import {
  GameFullscreenProvider,
  useGameFullscreen,
} from "@/context/GameFullscreenContext";

function UserLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isFullscreenGame } = useGameFullscreen();

  const isQuizSession =
    (pathname.startsWith("/kuis/") && pathname !== "/kuis") ||
    (pathname.startsWith("/permainan/kuis/") && pathname !== "/permainan/kuis");

  const hideChrome = isFullscreenGame || isQuizSession;

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      {!hideChrome && <Navbar />}
      <main className={`flex-grow flex flex-col ${hideChrome ? "" : "pt-[68px] md:pt-[76px]"}`}>
        {children}
      </main>
      {!hideChrome && <Footer />}
      {!hideChrome && <SosButton />}
    </div>
  );
}

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GameFullscreenProvider>
      <UserLayoutContent>{children}</UserLayoutContent>
    </GameFullscreenProvider>
  );
}