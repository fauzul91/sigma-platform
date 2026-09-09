"use client";

import React, { useState, useEffect } from "react";
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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load persisted collapse and theme state on client mount (default: light)
  useEffect(() => {
    try {
      const savedCollapse = localStorage.getItem("admin_sidebar_collapsed");
      if (savedCollapse === "true") {
        setIsSidebarCollapsed(true);
      }

      const savedTheme = localStorage.getItem("admin_theme");
      if (savedTheme === "dark") {
        setIsDarkMode(true);
        document.documentElement.classList.add("dark");
      }
    } catch {}

    return () => {
      // Ensure dark class is removed when leaving CMS to keep public website clean
      document.documentElement.classList.remove("dark");
    };
  }, []);

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("admin_sidebar_collapsed", String(next));
      } catch {}
      return next;
    });
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("admin_theme", next ? "dark" : "light");
      } catch {}
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  // Auto-collapse mobile drawer on route change
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  // Lock scroll when mobile sidebar drawer is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileSidebarOpen]);

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
    <div
      className={`min-h-screen flex flex-col lg:flex-row font-sans transition-colors duration-300 overflow-x-hidden max-w-full ${
        isDarkMode ? "dark bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <AdminSidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        onLogout={handleLogout}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
      />
      <div
        className={`grow min-w-0 max-w-full min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        <AdminTopbar
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
          isSidebarCollapsed={isSidebarCollapsed}
          onToggleCollapse={toggleSidebarCollapse}
          isDarkMode={isDarkMode}
          onToggleTheme={toggleTheme}
        />
        <main className="grow min-w-0 max-w-full p-4 sm:p-6 lg:p-8 space-y-6">{children}</main>
      </div>
    </div>
  );
}
