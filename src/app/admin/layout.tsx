"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/shared/AdminSidebar";
import AdminTopbar from "@/components/admin/shared/AdminTopbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isLoginPage = pathname === "/admin/login";

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      router.push("/admin/login");
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col lg:flex-row font-sans">
      <AdminSidebar onLogout={handleLogout} />
      <div className="grow lg:pl-64 min-h-screen flex flex-col">
        <AdminTopbar />
        <main className="grow p-6 md:p-8 space-y-6">{children}</main>
      </div>
    </div>
  );
}
