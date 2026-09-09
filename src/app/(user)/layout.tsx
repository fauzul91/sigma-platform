"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import SosButton from "@/components/shared/SosButton";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isQuizSession = pathname.startsWith("/kuis/") && pathname !== "/kuis";

  if (isQuizSession) {
    return (
      <main className="min-h-screen flex flex-col bg-slate-50/70">
        {children}
      </main>
    );
  }

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
