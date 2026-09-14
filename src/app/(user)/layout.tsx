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

  // In fullscreen game mode or active quiz session: No Navbar, No Footer, No SosButton
  if (isFullscreenGame || isQuizSession) {
    return (
      <main className="min-h-screen flex flex-col bg-[#faf8f5]">
        {children}
      </main>
    );
  }

  // Standard website view with Navbar and Footer
  return (
    <>
      <Navbar />
      <main className="flex-grow pt-[68px] md:pt-[76px]">
        {children}
      </main>
      <Footer />
      <SosButton />
    </>
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