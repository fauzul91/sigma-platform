"use client";

import React from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import SosButton from "@/components/shared/SosButton";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
