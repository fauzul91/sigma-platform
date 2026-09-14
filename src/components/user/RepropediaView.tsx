"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  BookOpen,
  Download,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Layers,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  LayoutGrid,
  Zap,
  FileText,
  Bookmark,
  BookmarkCheck,
  X,
  List,
  Sparkles,
  Search
} from "lucide-react";
import PageHeader from "@/components/shared/PageHeader";

export interface RepropediaSubBab {
  id: number;
  babNumber: string;
  title: string;
  page: number;
  pageRange: string;
  summary: string;
}

export const REPROPEDIA_SUB_BABS: RepropediaSubBab[] = [
  {
    id: 0,
    babNumber: "Pengantar",
    title: "Kata Pengantar & Pendahuluan",
    page: 1,
    pageRange: "Hal. 1 - 3",
    summary:
      "Cover resmi modul, prakata tim penyusun Promahadesa Gunungmalang, serta susunan daftar isi lengkap modul edukasi kesehatan reproduksi remaja.",
  },
  {
    id: 1,
    babNumber: "Bab 01",
    title: "Kesehatan Reproduksi",
    page: 4,
    pageRange: "Hal. 4 - 5",
    summary:
      "Pengenalan dasar kesehatan reproduksi remaja, perubahan fisik & biologis masa pubertas, serta panduan menjaga kebersihan organ reproduksi sejak dini tanpa rasa malu.",
  },
  {
    id: 2,
    babNumber: "Bab 02",
    title: "Hak-hak Anak",
    page: 6,
    pageRange: "Hal. 6",
    summary:
      "Memahami 4 pilar hak fundamental anak (hak hidup, tumbuh kembang, perlindungan khusus, dan partisipasi) serta perlindungan hukum bagi setiap remaja.",
  },
  {
    id: 3,
    babNumber: "Bab 03",
    title: "Risiko & Dampak Perkawinan Anak",
    page: 7,
    pageRange: "Hal. 7 - 9",
    summary:
      "Menelaah risiko komprehensif perkawinan dini terhadap kesiapan fisik, organ reproduksi, kesehatan mental, bahaya stunting, putus sekolah, hingga regulasi batas minimal usia 19 tahun sesuai UU No. 16/2019.",
  },
  {
    id: 4,
    babNumber: "Bab 04",
    title: "Bentuk-bentuk Kekerasan Seksual",
    page: 10,
    pageRange: "Hal. 10 - 13",
    summary:
      "Mengenali ragam bentuk pelecehan dan kekerasan seksual, baik verbal, non-fisik, fisik, hingga kekerasan di ranah digital (KBGO) serta sinyal bahaya (red flags) dalam relasi.",
  },
  {
    id: 5,
    babNumber: "Bab 05",
    title: "Pencegahan Kekerasan Seksual",
    page: 14,
    pageRange: "Hal. 14 - 17",
    summary:
      "Panduan praktis menjaga batasan tubuh (body boundaries & consent), berani menolak perlakuan yang tidak pantas, serta membangun lingkungan pergaulan sebaya yang aman.",
  },
  {
    id: 6,
    babNumber: "Bab 06",
    title: "Apa yang Harus Dilakukan Jika Mengalami Kekerasan Seksual",
    page: 18,
    pageRange: "Hal. 18 - 20",
    summary:
      "Langkah tanggap darurat, penanganan trauma, cara mencari pertolongan yang aman, alur rujukan medis & psikologis, serta kontak layanan bantuan & pendampingan resmi.",
  },
  {
    id: 7,
    babNumber: "Bab 07",
    title: "Bermain Teka-Teki Silang",
    page: 21,
    pageRange: "Hal. 21 - 24",
    summary:
      "Lembar aktivitas edukasi interaktif dan kuis Teka-Teki Silang (TTS) tematik untuk mengevaluasi dan menguji pemahaman materi kesehatan reproduksi secara seru dan menyenangkan.",
  },
];

const PDF_FILE_PATH = "/assets/BUKU REPROPEDIA_SIGMA.pdf";
const TOTAL_PAGES = 24;
const STORAGE_LAST_READ_KEY = "sigma_repropedia_last_page";
const STORAGE_BOOKMARKS_KEY = "sigma_repropedia_bookmarks";

// Helper to resolve which Bab a page belongs to
export function getBabForPage(page: number): RepropediaSubBab {
  if (page <= 3) return REPROPEDIA_SUB_BABS[0];
  if (page <= 5) return REPROPEDIA_SUB_BABS[1];
  if (page === 6) return REPROPEDIA_SUB_BABS[2];
  if (page <= 9) return REPROPEDIA_SUB_BABS[3];
  if (page <= 13) return REPROPEDIA_SUB_BABS[4];
  if (page <= 17) return REPROPEDIA_SUB_BABS[5];
  if (page <= 20) return REPROPEDIA_SUB_BABS[6];
  return REPROPEDIA_SUB_BABS[7];
}

export function getPageSectionTitle(page: number): string {
  if (page === 1) return "Cover Depan";
  if (page === 2) return "Prakata / Kata Pengantar";
  if (page === 3) return "Daftar Isi Modul";
  const bab = getBabForPage(page);
  return `${bab.babNumber}: ${bab.title}`;
}

export default function RepropediaView() {
  const searchParams = useSearchParams();
  const viewerRef = useRef<HTMLDivElement>(null);
  const readerStageRef = useRef<HTMLDivElement>(null);
  const readingModeStageRef = useRef<HTMLDivElement>(null);

  // View Mode: "interactive" (Fast WebP pages) or "pdf" (native iframe)
  const [viewMode, setViewMode] = useState<"interactive" | "pdf">("interactive");

  // Current page state (1 to 24, default page 1 = Pendahuluan)
  const [currentPage, setCurrentPage] = useState<number>(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      const p = parseInt(pageParam, 10);
      if (p >= 1 && p <= TOTAL_PAGES) return p;
    }
    const babParam = searchParams.get("bab");
    if (babParam !== null && babParam !== "") {
      const b = parseInt(babParam, 10);
      const found = REPROPEDIA_SUB_BABS.find((item) => item.id === b);
      if (found) return found.page;
    }
    return 1; // Start at Pendahuluan (Halaman 1)
  });

  const [zoom, setZoom] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Experience enhancements
  const [isReadingMode, setIsReadingMode] = useState<boolean>(false);
  const [activeDrawer, setActiveDrawer] = useState<"none" | "toc" | "grid" | "bookmarks">("none");
  const [isJumpModalOpen, setIsJumpModalOpen] = useState<boolean>(false);
  const [jumpPageInput, setJumpPageInput] = useState<string>("");
  const [jumpError, setJumpError] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [showResumeBanner, setShowResumeBanner] = useState<{ show: boolean; page: number } | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(
        window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize Bookmarks & Resume Reading Prompt from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const savedBms = localStorage.getItem(STORAGE_BOOKMARKS_KEY);
      if (savedBms) {
        setBookmarks(JSON.parse(savedBms));
      }

      const hasUrlParam = searchParams.get("page") || searchParams.get("bab");
      const savedLastRead = localStorage.getItem(STORAGE_LAST_READ_KEY);
      if (!hasUrlParam && savedLastRead) {
        const lastPage = parseInt(savedLastRead, 10);
        if (lastPage > 1 && lastPage <= TOTAL_PAGES) {
          setShowResumeBanner({ show: true, page: lastPage });
        }
      }
    } catch {
      // ignore storage errors
    }
  }, [searchParams]);

  // Save last read page
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_LAST_READ_KEY, currentPage.toString());
    } catch {
      // ignore storage errors
    }
  }, [currentPage]);

  // Lock body scroll and hide global layout elements during reading mode
  useEffect(() => {
    if (isReadingMode) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("repropedia-reading-active");
    } else {
      document.body.classList.remove("repropedia-reading-active");
      if (activeDrawer !== "none") {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("repropedia-reading-active");
    };
  }, [isReadingMode, activeDrawer]);

  const handleZoomReset = useCallback(() => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  const handleZoomIn = useCallback(() => {
    setZoom((z) => Math.min(3, Math.round((z + 0.25) * 100) / 100));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((z) => {
      const next = Math.max(0.75, Math.round((z - 0.25) * 100) / 100);
      if (next <= 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  }, []);

  const handleDoubleClick = useCallback((e?: React.MouseEvent) => {
    if (e) {
      const target = e.target as HTMLElement;
      if (target.closest("button, input, a, [role='button']")) return;
    }

    if (zoom > 1.1) {
      handleZoomReset();
    } else {
      const targetZoom = 2.2;
      if (e) {
        const stage = isReadingMode ? readingModeStageRef.current : readerStageRef.current;
        const rect = stage?.getBoundingClientRect();
        const centerX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
        const centerY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
        const stageW = rect?.width || 800;
        const stageH = rect?.height || 600;

        const clickOffsetX = e.clientX - centerX;
        const clickOffsetY = e.clientY - centerY;

        const maxBoundX = Math.max(0, (stageW * (targetZoom - 1)) / 2);
        const maxBoundY = Math.max(0, (stageH * (targetZoom - 1)) / 2);

        let targetPanX = -clickOffsetX * (targetZoom - 1);
        let targetPanY = -clickOffsetY * (targetZoom - 1);

        targetPanX = Math.max(-maxBoundX, Math.min(maxBoundX, targetPanX));
        targetPanY = Math.max(-maxBoundY, Math.min(maxBoundY, targetPanY));

        setZoom(targetZoom);
        setPanOffset({ x: Math.round(targetPanX), y: Math.round(targetPanY) });
      } else {
        setZoom(targetZoom);
        setPanOffset({ x: 0, y: 0 });
      }
    }
  }, [zoom, isReadingMode, handleZoomReset]);

  const handleExitReadingMode = useCallback(() => {
    setIsReadingMode(false);
    handleZoomReset();
    if (typeof document !== "undefined" && document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
  }, [handleZoomReset]);

  const toggleBrowserFullscreen = useCallback(() => {
    if (typeof document === "undefined") return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  // Resolve PDF viewer URL
  const getPdfViewerUrl = useCallback(() => {
    if (typeof window === "undefined") return PDF_FILE_PATH;
    const encodedPath = encodeURI(PDF_FILE_PATH);
    if (!isMobile) {
      return `${encodedPath}#page=${currentPage}&toolbar=1&navpanes=0`;
    }
    const origin = window.location.origin;
    const isLocal = origin.includes("localhost") || origin.includes("127.0.0.1");
    const fullPdfUrl = isLocal
      ? `https://ruangsigma.site${encodedPath}`
      : `${origin}${encodedPath}`;
    return `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(fullPdfUrl)}`;
  }, [isMobile, currentPage]);

  const activeBab = getBabForPage(currentPage);

  // Sync URL params without page reload
  const syncUrl = useCallback((page: number) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("page", page.toString());
      const bab = getBabForPage(page);
      url.searchParams.set("bab", bab.id.toString());
      window.history.replaceState({}, "", url.toString());
    }
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      const target = Math.max(1, Math.min(TOTAL_PAGES, page));
      if (target !== currentPage) {
        setCurrentPage(target);
        syncUrl(target);
      }
    },
    [currentPage, syncUrl]
  );

  const goToNextPage = useCallback(() => {
    if (currentPage < TOTAL_PAGES) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, goToPage]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  // Pre-load adjacent pages
  useEffect(() => {
    if (typeof window === "undefined") return;
    const preload = (p: number) => {
      if (p >= 1 && p <= TOTAL_PAGES) {
        const img = new window.Image();
        img.src = `/assets/repropedia/pages/page_${p}.webp`;
      }
    };
    preload(currentPage - 1);
    preload(currentPage + 1);
    preload(currentPage + 2);
  }, [currentPage]);

  // Reset zoom & pan when switching page
  useEffect(() => {
    handleZoomReset();
  }, [currentPage, handleZoomReset]);

  // Toggle Bookmark
  const handleToggleBookmark = (page: number) => {
    setBookmarks((prev) => {
      const next = prev.includes(page)
        ? prev.filter((p) => p !== page)
        : [...prev, page].sort((a, b) => a - b);
      try {
        localStorage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const isCurrentPageBookmarked = bookmarks.includes(currentPage);

  // Jump to Page Execution
  const handleOpenJumpModal = () => {
    setJumpPageInput(currentPage.toString());
    setJumpError(null);
    setIsJumpModalOpen(true);
  };

  const handleExecuteJump = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const target = parseInt(jumpPageInput, 10);
    if (isNaN(target) || target < 1 || target > TOTAL_PAGES) {
      setJumpError(`Halaman tidak valid (harus 1 - ${TOTAL_PAGES})`);
      return;
    }
    goToPage(target);
    setIsJumpModalOpen(false);
    setJumpError(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement)?.isContentEditable
      ) {
        return;
      }

      if (e.key === "Escape") {
        if (isJumpModalOpen) {
          setIsJumpModalOpen(false);
          return;
        }
        if (activeDrawer !== "none") {
          setActiveDrawer("none");
          return;
        }
        if (isReadingMode) {
          handleExitReadingMode();
          return;
        }
      }

      if (viewMode !== "interactive") return;

      if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        goToNextPage();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goToPrevPage();
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === "-" || e.key === "_") {
        e.preventDefault();
        handleZoomOut();
      } else if (e.key === "0") {
        e.preventDefault();
        handleZoomReset();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextPage, goToPrevPage, viewMode, isReadingMode, activeDrawer, isJumpModalOpen, handleZoomIn, handleZoomOut, handleZoomReset]);

  // Multi-touch, Focal Pinch-to-zoom, Pan & Touch Swipe support
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const touchEndY = useRef<number | null>(null);
  const panStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isPinching = useRef<boolean>(false);
  const pinchStartDist = useRef<number | null>(null);
  const pinchStartZoom = useRef<number>(1);
  const pinchStartPan = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const pinchStartFocal = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const tapPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMoved = useRef<boolean>(false);
  const lastTapTime = useRef<number>(0);

  // Desktop mouse drag to pan
  const isMouseDown = useRef<boolean>(false);
  const mouseStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const mousePanStart = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1.05) return;
    const target = e.target as HTMLElement;
    if (target.closest("button, input, a, [role='button'], [data-no-touch]")) return;
    isMouseDown.current = true;
    mouseStart.current = { x: e.clientX, y: e.clientY };
    mousePanStart.current = { ...panOffset };
    setIsInteracting(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDown.current || zoom <= 1.05) return;
    const dx = e.clientX - mouseStart.current.x;
    const dy = e.clientY - mouseStart.current.y;
    const stage = isReadingMode ? readingModeStageRef.current : readerStageRef.current;
    const rect = stage?.getBoundingClientRect();
    const stageW = rect?.width || 800;
    const stageH = rect?.height || 600;
    const maxBoundX = Math.max(0, (stageW * (zoom - 1)) / 2 + 40);
    const maxBoundY = Math.max(0, (stageH * (zoom - 1)) / 2 + 40);

    setPanOffset({
      x: Math.round(Math.max(-maxBoundX, Math.min(maxBoundX, mousePanStart.current.x + dx))),
      y: Math.round(Math.max(-maxBoundY, Math.min(maxBoundY, mousePanStart.current.y + dy))),
    });
  };

  const handleMouseUp = () => {
    if (isMouseDown.current) {
      isMouseDown.current = false;
      setIsInteracting(false);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // 1. Guard interactive controls: clicking buttons, inputs, slider must never trigger canvas gestures or zoom
    const target = e.target as HTMLElement;
    if (target.closest("button, input, a, [role='button'], [data-no-touch]")) {
      touchStartX.current = null;
      touchStartY.current = null;
      touchEndX.current = null;
      touchEndY.current = null;
      lastTapTime.current = 0; // Explicitly reset tap timer so fast double-clicking next/prev buttons never triggers double-tap zoom
      return;
    }

    const stage = isReadingMode ? readingModeStageRef.current : readerStageRef.current;
    const rect = stage?.getBoundingClientRect();
    const centerX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const centerY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;

    if (e.touches.length === 2) {
      // 2 fingers: pinch-to-zoom start with focal point tracking
      isPinching.current = true;
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const dist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const midX = (t1.clientX + t2.clientX) / 2;
      const midY = (t1.clientY + t2.clientY) / 2;

      pinchStartDist.current = dist;
      pinchStartZoom.current = zoom;
      pinchStartPan.current = { ...panOffset };
      pinchStartFocal.current = { x: midX - centerX, y: midY - centerY };
      setIsInteracting(true);
    } else if (e.touches.length === 1) {
      // 1 finger touch: pan if zoomed, or track for swipe / tap
      isPinching.current = false;
      const t = e.touches[0];
      touchStartX.current = t.clientX;
      touchStartY.current = t.clientY;
      touchEndX.current = t.clientX;
      touchEndY.current = t.clientY;
      tapPos.current = { x: t.clientX, y: t.clientY };
      panStart.current = { ...panOffset };
      hasMoved.current = false;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest("button, input, a, [role='button'], [data-no-touch]")) {
      return;
    }

    const stage = isReadingMode ? readingModeStageRef.current : readerStageRef.current;
    const rect = stage?.getBoundingClientRect();
    const centerX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const centerY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const stageW = rect?.width || 380;
    const stageH = rect?.height || 600;

    if (e.touches.length === 2 && isPinching.current && pinchStartDist.current) {
      // 2-finger pinch with anchored focal point (directed zoom)
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const currentDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const currentMidX = (t1.clientX + t2.clientX) / 2;
      const currentMidY = (t1.clientY + t2.clientY) / 2;

      const currentFocalX = currentMidX - centerX;
      const currentFocalY = currentMidY - centerY;

      const scaleRatio = currentDist / pinchStartDist.current;
      const newZoom = Math.min(3.5, Math.max(1, Math.round(pinchStartZoom.current * scaleRatio * 100) / 100));

      // Calculate anchor-preserved pan (like real PDF viewer)
      const docX = (pinchStartFocal.current.x - pinchStartPan.current.x) / pinchStartZoom.current;
      const docY = (pinchStartFocal.current.y - pinchStartPan.current.y) / pinchStartZoom.current;

      let nextPanX = currentFocalX - docX * newZoom;
      let nextPanY = currentFocalY - docY * newZoom;

      const maxBoundX = Math.max(0, (stageW * (newZoom - 1)) / 2 + 35);
      const maxBoundY = Math.max(0, (stageH * (newZoom - 1)) / 2 + 35);

      if (newZoom <= 1.05) {
        nextPanX = 0;
        nextPanY = 0;
      } else {
        nextPanX = Math.max(-maxBoundX, Math.min(maxBoundX, nextPanX));
        nextPanY = Math.max(-maxBoundY, Math.min(maxBoundY, nextPanY));
      }

      setZoom(newZoom);
      setPanOffset({ x: Math.round(nextPanX), y: Math.round(nextPanY) });
      setIsInteracting(true);
    } else if (e.touches.length === 1 && !isPinching.current && touchStartX.current !== null && touchStartY.current !== null) {
      const t = e.touches[0];
      const currentX = t.clientX;
      const currentY = t.clientY;
      touchEndX.current = currentX;
      touchEndY.current = currentY;

      const dx = currentX - touchStartX.current;
      const dy = currentY - touchStartY.current;

      if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
        hasMoved.current = true;
      }

      if (zoom > 1.05) {
        // Zoomed in: pan / drag document canvas smoothly
        setIsInteracting(true);
        const maxBoundX = Math.max(0, (stageW * (zoom - 1)) / 2 + 40);
        const maxBoundY = Math.max(0, (stageH * (zoom - 1)) / 2 + 40);

        const nextX = Math.max(-maxBoundX, Math.min(maxBoundX, panStart.current.x + dx));
        const nextY = Math.max(-maxBoundY, Math.min(maxBoundY, panStart.current.y + dy));
        setPanOffset({ x: Math.round(nextX), y: Math.round(nextY) });
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    setIsInteracting(false);

    const target = e.target as HTMLElement;
    if (target.closest("button, input, a, [role='button'], [data-no-touch]")) {
      touchStartX.current = null;
      touchStartY.current = null;
      touchEndX.current = null;
      touchEndY.current = null;
      lastTapTime.current = 0;
      return;
    }

    if (e.touches.length === 0) {
      if (isPinching.current) {
        isPinching.current = false;
        pinchStartDist.current = null;
        if (zoom < 1.1) {
          handleZoomReset();
        }
        return;
      }

      // Check for double-tap directed towards tap position
      const now = Date.now();
      const timeSinceLastTap = now - lastTapTime.current;
      if (!hasMoved.current && timeSinceLastTap < 300) {
        if (zoom > 1.1) {
          handleZoomReset();
        } else {
          // Zoom directed into the tapped spot (like real PDF viewers)
          const targetZoom = 2.2;
          const stage = isReadingMode ? readingModeStageRef.current : readerStageRef.current;
          const rect = stage?.getBoundingClientRect();
          const centerX = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
          const centerY = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
          const stageW = rect?.width || 380;
          const stageH = rect?.height || 600;

          const tapOffsetX = tapPos.current.x - centerX;
          const tapOffsetY = tapPos.current.y - centerY;

          const maxBoundX = Math.max(0, (stageW * (targetZoom - 1)) / 2);
          const maxBoundY = Math.max(0, (stageH * (targetZoom - 1)) / 2);

          let targetPanX = -tapOffsetX * (targetZoom - 1);
          let targetPanY = -tapOffsetY * (targetZoom - 1);

          targetPanX = Math.max(-maxBoundX, Math.min(maxBoundX, targetPanX));
          targetPanY = Math.max(-maxBoundY, Math.min(maxBoundY, targetPanY));

          setZoom(targetZoom);
          setPanOffset({ x: Math.round(targetPanX), y: Math.round(targetPanY) });
        }
        lastTapTime.current = 0;
        return;
      }
      lastTapTime.current = now;

      // Single-finger horizontal swipe to change page (only active when not zoomed in)
      if (zoom <= 1.05 && touchStartX.current !== null && touchEndX.current !== null) {
        const deltaX = touchStartX.current - touchEndX.current;
        const deltaY = (touchStartY.current ?? 0) - (touchEndY.current ?? 0);
        const minSwipeDist = 45;

        // Verify gesture is primarily horizontal
        if (Math.abs(deltaX) > minSwipeDist && Math.abs(deltaX) > Math.abs(deltaY) * 1.1) {
          if (deltaX > 0) {
            goToNextPage();
          } else {
            goToPrevPage();
          }
        }
      }

      touchStartX.current = null;
      touchStartY.current = null;
      touchEndX.current = null;
      touchEndY.current = null;
    }
  };

  const handleSelectBab = (bab: RepropediaSubBab) => {
    handleZoomReset();
    goToPage(bab.page);
    setActiveDrawer("none");
    if (typeof window !== "undefined" && window.innerWidth < 1024 && viewerRef.current) {
      viewerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      {/* 1. Page Header */}
      <PageHeader
        title="REPROPEDIA"
        description="Pusat literasi kesehatan reproduksi remaja, materi edukasi terstruktur, dan panduan tumbuh kembang terpercaya."
        badge="MODUL RESMI"
        type="repropedia"
      />

      {/* 2. Document Summary Banner Bar */}
      <div className="border-b border-slate-200/80 bg-white sticky top-0 z-20 shadow-2xs backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-2.5 sm:py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
          <div>
            <div className="hidden sm:flex items-center space-x-2 text-[11px] font-extrabold text-emerald-700 uppercase tracking-wider mb-0.5">
              <span>E-Book Resmi SIGMA Platform</span>
            </div>
            <h2 className="text-sm sm:text-base lg:text-lg font-black text-slate-900 leading-snug">
              Repropedia: Modul Kesehatan Reproduksi Remaja
            </h2>
            <p className="hidden sm:block text-xs text-slate-500 font-medium mt-0.5">
              Pengantar &amp; 7 Sub-Bab Utama • {TOTAL_PAGES} Halaman • Resolusi Tinggi WebP • PDF Lengkap 5.1 MB
            </p>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0 w-full sm:w-auto">
            {/* Mode Switcher Pills */}
            <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200/80">
              <button
                onClick={() => setViewMode("interactive")}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  viewMode === "interactive"
                    ? "bg-white text-emerald-800 shadow-xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Mode E-Book Cepat (WebP)"
              >
                <Zap className="h-3.5 w-3.5 text-emerald-600" />
                <span>E-Book Cepat</span>
              </button>
              <button
                onClick={() => setViewMode("pdf")}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                  viewMode === "pdf"
                    ? "bg-white text-emerald-800 shadow-xs border border-slate-200"
                    : "text-slate-600 hover:text-slate-900"
                }`}
                title="Mode Dokumen PDF"
              >
                <FileText className="h-3.5 w-3.5 text-slate-500" />
                <span>Dokumen PDF</span>
              </button>
            </div>

            {/* Reading Mode Launcher Button */}
            {viewMode === "interactive" && (
              <button
                onClick={() => setIsReadingMode(true)}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-xs hover:shadow-sm transition-all cursor-pointer"
                title="Masuk ke Mode Baca Layar Penuh"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span>Mode Baca</span>
              </button>
            )}

            <a
              href={PDF_FILE_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all border border-slate-200"
              title="Buka PDF di Tab Baru"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Buka Asli</span>
            </a>

            <a
              href={PDF_FILE_PATH}
              download="BUKU REPROPEDIA_SIGMA.pdf"
              className="inline-flex items-center space-x-1 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold shadow-xs hover:shadow-sm active:scale-98 transition-all"
              title="Unduh file PDF"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Unduh PDF</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Main Content Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-10 py-3 sm:py-5 lg:py-6">
        {/* Resume Reading Banner (Non-intrusive Toast) */}
        {showResumeBanner?.show && (
          <div className="mb-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3 sm:p-4 rounded-2xl shadow-sm flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="p-1.5 rounded-lg bg-white/20 shrink-0">
                <Sparkles className="h-4 w-4 text-emerald-100" />
              </div>
              <p className="text-xs sm:text-sm font-bold truncate">
                Lanjutkan membaca terakhir dari{" "}
                <span className="underline font-black">Halaman {showResumeBanner.page}</span>?
              </p>
            </div>
            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => {
                  goToPage(showResumeBanner.page);
                  setShowResumeBanner(null);
                }}
                className="px-3 py-1 bg-white text-emerald-800 rounded-xl text-xs font-black hover:bg-emerald-50 transition-all cursor-pointer shadow-xs"
              >
                Lanjutkan
              </button>
              <button
                onClick={() => setShowResumeBanner(null)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors cursor-pointer"
                title="Tutup prompt"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Quick Selector Strip */}
        <div className="lg:hidden mb-3">
          <div className="flex items-center justify-between mb-1.5 px-0.5">
            <span className="text-[11px] font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-emerald-600" />
              Daftar Bab &amp; Pengantar:
            </span>
            <button
              onClick={() => setActiveDrawer("toc")}
              className="text-[10px] font-bold text-emerald-700 hover:underline flex items-center gap-0.5 cursor-pointer"
            >
              Lihat Semua →
            </button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none">
            {REPROPEDIA_SUB_BABS.map((bab) => {
              const isActive = bab.id === activeBab.id;
              return (
                <button
                  key={bab.id}
                  onClick={() => handleSelectBab(bab)}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 border cursor-pointer ${
                    isActive
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span className="font-mono text-[11px]">{bab.babNumber}</span>
                  <span className="opacity-60">•</span>
                  <span className="max-w-[140px] truncate">{bab.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-start">
          {/* Left Panel: Daftar Isi Sidebar (Desktop Only) */}
          {!isSidebarCollapsed && (
            <div className="hidden lg:block lg:col-span-4 space-y-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-800 tracking-tight">
                        Daftar Isi Modul
                      </h3>
                      <p className="text-[11px] text-slate-400 font-semibold">
                        Struktur resmi Repropedia
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100/70 text-emerald-800 text-[10px] font-black">
                    Pengantar + 7 Bab
                  </span>
                </div>

                {/* Sub-Bab Cards List */}
                <div className="mt-4 space-y-2.5 max-h-[70vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200">
                  {REPROPEDIA_SUB_BABS.map((bab) => {
                    const isActive = bab.id === activeBab.id;
                    return (
                      <div
                        key={bab.id}
                        onClick={() => handleSelectBab(bab)}
                        className={`group relative p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                          isActive
                            ? "bg-emerald-50/70 border-emerald-500 shadow-xs ring-2 ring-emerald-500/20"
                            : "bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50/80"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center space-x-1.5">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-black tracking-wider uppercase ${
                                isActive
                                  ? "bg-emerald-600 text-white"
                                  : "bg-slate-100 text-slate-600 group-hover:bg-emerald-100 group-hover:text-emerald-700"
                              }`}
                            >
                              {bab.babNumber}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400">
                              {bab.pageRange}
                            </span>
                          </div>

                          {isActive && (
                            <span className="inline-flex items-center space-x-1 text-[10px] font-black text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span>Sedang Dibaca</span>
                            </span>
                          )}
                        </div>

                        <h4
                          className={`text-xs sm:text-sm font-extrabold leading-snug transition-colors ${
                            isActive
                              ? "text-emerald-950 font-black"
                              : "text-slate-800 group-hover:text-emerald-700"
                          }`}
                        >
                          {bab.title}
                        </h4>

                        <p className="mt-1 text-[11px] text-slate-500 line-clamp-2 font-medium leading-relaxed">
                          {bab.summary}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Sidebar Bottom Action: Bookmark list shortcut */}
                {bookmarks.length > 0 && (
                  <button
                    onClick={() => setActiveDrawer("bookmarks")}
                    className="w-full mt-3 p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-slate-700 hover:text-emerald-800 text-xs font-bold transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <BookmarkCheck className="h-3.5 w-3.5 text-emerald-600" />
                      Halaman Ditandai ({bookmarks.length})
                    </span>
                    <ChevronRight className="h-3.5 w-3.5 opacity-60" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Right Panel: Reading Canvas (Wider & Dynamic Sizing) */}
          <div
            ref={viewerRef}
            className={`w-full transition-all duration-300 ${
              isSidebarCollapsed ? "lg:col-span-12 max-w-5xl mx-auto" : "lg:col-span-8"
            } space-y-3`}
          >
            <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-md overflow-hidden flex flex-col">
              {/* Refactored Clean Header Toolbar */}
              <div className="px-3.5 sm:px-5 py-2.5 bg-slate-900 text-white flex items-center justify-between gap-2.5 border-b border-slate-800">
                {/* Left: Document Section Identity */}
                <div className="flex items-center space-x-2 min-w-0">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="text-xs sm:text-sm font-extrabold text-white truncate">
                    Repropedia <span className="text-slate-500 font-normal mx-1">·</span>
                    <span className="text-emerald-300 font-bold">
                      {activeBab.babNumber === "Pengantar" ? "Pengantar" : activeBab.babNumber}
                    </span>
                  </span>
                  <span className="hidden sm:inline-block text-slate-400 text-xs font-medium truncate max-w-[150px] lg:max-w-[200px]">
                    ({getPageSectionTitle(currentPage)})
                  </span>
                </div>

                {/* Right: Secondary Controls & Clean Page Counter */}
                <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
                  {/* Interactive Page Counter (Click opens Jump to Page) */}
                  <button
                    onClick={handleOpenJumpModal}
                    className="group px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-black transition-all flex items-center space-x-1 cursor-pointer"
                    title="Klik untuk melompat ke halaman"
                  >
                    <span>
                      Hal. {currentPage} / {TOTAL_PAGES}
                    </span>
                    <Search className="h-3 w-3 opacity-60 group-hover:opacity-100 transition-opacity" />
                  </button>

                  {/* Bookmark Button (Desktop) */}
                  {viewMode === "interactive" && (
                    <button
                      onClick={() => handleToggleBookmark(currentPage)}
                      className={`hidden sm:inline-flex p-1.5 rounded-lg border transition-all cursor-pointer ${
                        isCurrentPageBookmarked
                          ? "bg-amber-500/20 border-amber-400 text-amber-300"
                          : "bg-slate-800 border-slate-700 text-slate-300 hover:text-white"
                      }`}
                      title={
                        isCurrentPageBookmarked
                          ? "Hapus dari Halaman Ditandai"
                          : "Tandai Halaman Ini (Bookmark)"
                      }
                    >
                      {isCurrentPageBookmarked ? (
                        <BookmarkCheck className="h-3.5 w-3.5 text-amber-400" />
                      ) : (
                        <Bookmark className="h-3.5 w-3.5" />
                      )}
                    </button>
                  )}

                  {/* Visual Grid Toggle (Desktop) */}
                  {viewMode === "interactive" && (
                    <button
                      onClick={() => setActiveDrawer("grid")}
                      className="hidden sm:inline-flex p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 cursor-pointer"
                      title="Buka Daftar Halaman (Thumbnail)"
                    >
                      <LayoutGrid className="h-3.5 w-3.5" />
                    </button>
                  )}

                  {/* Mobile Table of Contents Trigger */}
                  <button
                    onClick={() => setActiveDrawer("toc")}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 cursor-pointer lg:hidden"
                    title="Buka Daftar Isi"
                  >
                    <List className="h-3.5 w-3.5" />
                  </button>

                  {/* Desktop Sidebar Collapse Toggle */}
                  <button
                    onClick={() => setIsSidebarCollapsed((prev) => !prev)}
                    className="hidden lg:flex p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 cursor-pointer"
                    title={
                      isSidebarCollapsed
                        ? "Tampilkan Daftar Isi Samping"
                        : "Lebarkan Area Baca (Sembunyikan Sidebar)"
                    }
                  >
                    <Layers className="h-3.5 w-3.5" />
                  </button>

                  {/* Dedicated Mode Baca Button */}
                  {viewMode === "interactive" && (
                    <button
                      onClick={() => setIsReadingMode(true)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs transition-colors flex items-center space-x-1 cursor-pointer"
                      title="Masuk ke Mode Baca Layar Penuh"
                    >
                      <Maximize2 className="h-3 w-3" />
                      <span className="hidden sm:inline">Mode Baca</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Optimized Canvas Reading Stage (Fit-Height & Preserved Aspect Ratio) */}
              <div
                ref={readerStageRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onDoubleClick={handleDoubleClick}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                className={`relative w-full h-[66vh] sm:h-[76vh] lg:h-[82vh] min-h-[460px] max-h-[860px] bg-slate-950 overflow-hidden flex items-center justify-center p-2 sm:p-4 select-none touch-none ${
                  zoom > 1.05 ? (isInteracting ? "cursor-grabbing" : "cursor-grab") : ""
                }`}
              >
                {viewMode === "interactive" ? (
                  <>
                    {/* Floating Zoom & Pan Indicator Badge */}
                    {zoom > 1.05 && (
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 bg-slate-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full shadow-xl border border-emerald-500/40 flex items-center space-x-2 text-xs font-bold pointer-events-auto animate-in fade-in zoom-in-95 duration-150">
                        <span className="text-emerald-400 font-black">{Math.round(zoom * 100)}%</span>
                        <span className="text-slate-400 text-[11px] hidden xs:inline">· Geser layar untuk jelajah</span>
                        <button
                          onClick={handleZoomReset}
                          className="ml-1 px-2.5 py-0.5 bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-full text-[11px] text-white font-black transition-colors cursor-pointer"
                          title="Kembalikan ukuran normal (100%)"
                        >
                          Reset 1x
                        </button>
                      </div>
                    )}

                    {/* Floating Navigation Chevron - Left */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToPrevPage();
                      }}
                      onTouchStart={(e) => e.stopPropagation()}
                      onTouchEnd={(e) => e.stopPropagation()}
                      disabled={currentPage <= 1}
                      className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white items-center justify-center shadow-lg backdrop-blur-xs border border-white/10 disabled:opacity-20 disabled:pointer-events-none transition-all active:scale-95 touch-manipulation cursor-pointer select-none"
                      title="Halaman Sebelumnya (Panah Kiri / PageUp)"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>

                    {/* Page Image Container with Preserved Aspect Ratio */}
                    <div
                      className="w-full h-full flex items-center justify-center will-change-transform"
                      style={{
                        transform: `translate3d(${panOffset.x}px, ${panOffset.y}px, 0px) scale(${zoom})`,
                        transformOrigin: "center center",
                        transition: isInteracting ? "none" : "transform 200ms ease-out",
                      }}
                    >
                      <div className="relative shadow-2xl rounded-sm sm:rounded-md overflow-hidden bg-white w-full h-full max-w-full max-h-full aspect-[1191/1685] flex items-center justify-center border border-slate-800 pointer-events-none">
                        <img
                          src={`/assets/repropedia/pages/page_${currentPage}.webp`}
                          alt={`Halaman ${currentPage} - ${getPageSectionTitle(currentPage)}`}
                          className="w-auto h-auto max-w-full max-h-full object-contain block mx-auto transition-opacity duration-150 select-none pointer-events-none"
                          loading="eager"
                          draggable={false}
                        />
                      </div>
                    </div>

                    {/* Floating Navigation Chevron - Right */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToNextPage();
                      }}
                      onTouchStart={(e) => e.stopPropagation()}
                      onTouchEnd={(e) => e.stopPropagation()}
                      disabled={currentPage >= TOTAL_PAGES}
                      className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white items-center justify-center shadow-lg backdrop-blur-xs border border-white/10 disabled:opacity-20 disabled:pointer-events-none transition-all active:scale-95 touch-manipulation cursor-pointer select-none"
                      title="Halaman Selanjutnya (Panah Kanan / PageDown)"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                ) : (
                  /* Native PDF Mode */
                  <div className="w-full h-full flex flex-col bg-slate-900">
                    {isMobile && (
                      <div className="px-3 py-1.5 bg-slate-800 text-slate-300 text-[10px] flex items-center justify-between border-b border-slate-700">
                        <span className="font-semibold text-emerald-300">
                          Viewer PDF Mobile
                        </span>
                        <a
                          href={PDF_FILE_PATH}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                        >
                          <span>Buka Asli</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                    <iframe
                      src={getPdfViewerUrl()}
                      title={`Buku Repropedia - ${activeBab.title}`}
                      className="w-full h-full border-0 bg-white flex-1"
                    />
                  </div>
                )}
              </div>

              {/* Simplified Footer Navigation Bar */}
              {viewMode === "interactive" && (
                <div className="px-3 sm:px-5 py-2.5 bg-white border-t border-slate-100 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2 sm:gap-4">
                    {/* Previous Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToPrevPage();
                      }}
                      onTouchStart={(e) => e.stopPropagation()}
                      onTouchEnd={(e) => e.stopPropagation()}
                      disabled={currentPage <= 1}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-30 disabled:pointer-events-none text-xs font-bold flex items-center space-x-1 transition-all touch-manipulation cursor-pointer select-none"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span className="hidden sm:inline">Sebelumnya</span>
                    </button>

                    {/* Interactive Slider */}
                    <div className="flex-1 flex items-center space-x-2 sm:space-x-3 max-w-lg mx-auto">
                      <span className="text-[10px] font-bold text-slate-400">1</span>
                      <input
                        type="range"
                        min="1"
                        max={TOTAL_PAGES}
                        value={currentPage}
                        onChange={(e) => goToPage(parseInt(e.target.value, 10))}
                        className="w-full h-1.5 sm:h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 touch-manipulation"
                        title={`Geser Halaman (Saat ini: ${currentPage})`}
                      />
                      <span className="text-[10px] font-bold text-slate-400">{TOTAL_PAGES}</span>
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        goToNextPage();
                      }}
                      onTouchStart={(e) => e.stopPropagation()}
                      onTouchEnd={(e) => e.stopPropagation()}
                      disabled={currentPage >= TOTAL_PAGES}
                      className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-emerald-700 text-white disabled:opacity-30 disabled:pointer-events-none text-xs font-bold flex items-center space-x-1 transition-all shadow-xs touch-manipulation cursor-pointer select-none"
                    >
                      <span className="hidden sm:inline">Selanjutnya</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Secondary Quick Action Bar */}
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-slate-700">
                        {getPageSectionTitle(currentPage)}
                      </span>
                    </div>

                    {/* Zoom & Quick shortcuts */}
                    <div className="flex items-center space-x-2">
                      <div className="hidden sm:flex items-center space-x-1 bg-slate-100 px-1.5 py-0.5 rounded-lg border border-slate-200">
                        <button
                          onClick={handleZoomOut}
                          disabled={zoom <= 0.75}
                          className="p-1 rounded text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                          title="Perkecil"
                        >
                          <ZoomOut className="h-3 w-3" />
                        </button>
                        <button
                          onClick={handleZoomReset}
                          className="px-1 text-[10px] font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                          title="Reset"
                        >
                          {Math.round(zoom * 100)}%
                        </button>
                        <button
                          onClick={handleZoomIn}
                          disabled={zoom >= 3}
                          className="p-1 rounded text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                          title="Perbesar"
                        >
                          <ZoomIn className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        onClick={handleOpenJumpModal}
                        className="text-[11px] font-bold text-emerald-700 hover:underline cursor-pointer"
                      >
                        Lompat Halaman
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* DEDICATED "MODE BACA" (IMMERSIVE FULLSCREEN OVERLAY)          */}
      {/* ============================================================ */}
      {isReadingMode && (
        <div className="fixed inset-0 z-[100] bg-slate-950/98 backdrop-blur-md flex flex-col select-none animate-in fade-in duration-200">
          {/* Top Floating Toolbar */}
          <div className="px-3 sm:px-6 py-2 sm:py-2.5 bg-slate-900/95 border-b border-white/10 flex items-center justify-between gap-2 text-white">
            {/* Left Cluster: Close / Back on mobile, Badge + Section Title on Desktop */}
            <div className="flex items-center space-x-2 min-w-0">
              {/* Mobile Exit Button (Touch-Friendly X with label) */}
              <button
                onClick={handleExitReadingMode}
                className="sm:hidden p-1.5 rounded-xl bg-white/10 hover:bg-rose-600 text-white flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                title="Tutup Mode Baca"
              >
                <X className="h-4 w-4" />
                <span className="text-[11px] font-bold pr-0.5">Tutup</span>
              </button>

              {/* Desktop Mode Baca Badge */}
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-emerald-600 text-[10px] font-black uppercase tracking-wider shrink-0">
                Mode Baca
              </span>

              {/* Section Title */}
              <span className="text-xs sm:text-sm font-black text-slate-200 truncate">
                {activeBab.babNumber === "Pengantar" ? "Pengantar" : activeBab.babNumber}
                <span className="hidden md:inline text-slate-400 font-medium"> · {activeBab.title}</span>
              </span>
            </div>

            {/* Right Controls Cluster */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">
              {/* Jump to page counter */}
              <button
                onClick={handleOpenJumpModal}
                className="px-2 sm:px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] sm:text-xs font-mono font-bold text-emerald-300 transition-colors cursor-pointer"
                title="Lompat Halaman"
              >
                {currentPage} / {TOTAL_PAGES}
              </button>

              {/* Bookmark Toggle */}
              <button
                onClick={() => handleToggleBookmark(currentPage)}
                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                  isCurrentPageBookmarked
                    ? "bg-amber-500/30 border-amber-400 text-amber-300"
                    : "bg-white/10 border-white/10 text-slate-300 hover:text-white"
                }`}
                title="Tandai Halaman"
              >
                {isCurrentPageBookmarked ? (
                  <BookmarkCheck className="h-4 w-4 text-amber-400" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </button>

              {/* Drawer Menu Button (TOC, Grid, Bookmarks) */}
              <button
                onClick={() => setActiveDrawer("toc")}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Buka Daftar Isi & Halaman"
              >
                <List className="h-4 w-4" />
              </button>

              {/* Desktop-Only: Thumbnail Grid Toggle */}
              <button
                onClick={() => setActiveDrawer("grid")}
                className="hidden md:inline-flex p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Buka Daftar Halaman (Thumbnail)"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>

              {/* Desktop-Only: Zoom In / Out */}
              <div className="hidden lg:flex items-center space-x-1 bg-white/10 px-1 py-0.5 rounded-lg border border-white/10">
                <button
                  onClick={handleZoomOut}
                  disabled={zoom <= 0.75}
                  className="p-1 rounded text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                  title="Perkecil"
                >
                  <ZoomOut className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={handleZoomReset}
                  className="px-1 text-[11px] font-bold text-slate-200 hover:text-white cursor-pointer"
                  title="Reset"
                >
                  {Math.round(zoom * 100)}%
                </button>
                <button
                  onClick={handleZoomIn}
                  disabled={zoom >= 3}
                  className="p-1 rounded text-slate-300 hover:text-white disabled:opacity-30 cursor-pointer"
                  title="Perbesar"
                >
                  <ZoomIn className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Desktop-Only: Browser Fullscreen Toggle */}
              <button
                onClick={toggleBrowserFullscreen}
                className="hidden md:inline-flex p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Layar Penuh Monitor"
              >
                <Maximize2 className="h-4 w-4" />
              </button>

              {/* Desktop Exit Button */}
              <button
                onClick={handleExitReadingMode}
                className="hidden sm:inline-flex px-3 py-1.5 rounded-xl bg-white/15 hover:bg-rose-600 text-white text-xs font-black transition-all items-center space-x-1 cursor-pointer"
                title="Keluar dari Mode Baca (Tombol Escape)"
              >
                <Minimize2 className="h-3.5 w-3.5" />
                <span>Keluar (Esc)</span>
              </button>
            </div>
          </div>

          {/* Reading Mode Stage */}
          <div
            ref={readingModeStageRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onDoubleClick={handleDoubleClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className={`flex-1 relative flex items-center justify-center p-1 sm:p-4 overflow-hidden select-none touch-none ${
              zoom > 1.05 ? (isInteracting ? "cursor-grabbing" : "cursor-grab") : ""
            }`}
          >
            {/* Floating Zoom & Pan Indicator Badge */}
            {zoom > 1.05 && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 bg-slate-900/90 backdrop-blur-md text-white px-3 py-1.5 rounded-full shadow-xl border border-emerald-500/40 flex items-center space-x-2 text-xs font-bold pointer-events-auto animate-in fade-in zoom-in-95 duration-150">
                <span className="text-emerald-400 font-black">{Math.round(zoom * 100)}%</span>
                <span className="text-slate-400 text-[11px] hidden xs:inline">· Geser layar untuk jelajah</span>
                <button
                  onClick={handleZoomReset}
                  className="ml-1 px-2.5 py-0.5 bg-white/20 hover:bg-white/30 active:bg-white/40 rounded-full text-[11px] text-white font-black transition-colors cursor-pointer"
                  title="Kembalikan ukuran normal (100%)"
                >
                  Reset 1x
                </button>
              </div>
            )}

            {/* Nav Left - Hidden on small mobile to not block book content */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevPage();
              }}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              disabled={currentPage <= 1}
              className="hidden sm:flex absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white items-center justify-center shadow-xl border border-white/10 disabled:opacity-20 disabled:pointer-events-none transition-all active:scale-95 touch-manipulation cursor-pointer select-none"
              title="Sebelumnya (Panah Kiri)"
            >
              <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>

            {/* Document Image - Maximized Viewport with Zoom & Pan */}
            <div
              className="w-full h-full flex items-center justify-center will-change-transform"
              style={{
                transform: `translate3d(${panOffset.x}px, ${panOffset.y}px, 0px) scale(${zoom})`,
                transformOrigin: "center center",
                transition: isInteracting ? "none" : "transform 200ms ease-out",
              }}
            >
              <div className="relative shadow-2xl rounded-sm sm:rounded-md overflow-hidden bg-white w-full h-full max-w-full max-h-full aspect-[1191/1685] flex items-center justify-center pointer-events-none">
                <img
                  src={`/assets/repropedia/pages/page_${currentPage}.webp`}
                  alt={`Halaman ${currentPage} - ${getPageSectionTitle(currentPage)}`}
                  className="w-auto h-auto max-w-full max-h-full object-contain block mx-auto select-none pointer-events-none"
                  loading="eager"
                  draggable={false}
                />
              </div>
            </div>

            {/* Nav Right - Hidden on small mobile to not block book content */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNextPage();
              }}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              disabled={currentPage >= TOTAL_PAGES}
              className="hidden sm:flex absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-slate-900/80 hover:bg-emerald-600 text-white items-center justify-center shadow-xl border border-white/10 disabled:opacity-20 disabled:pointer-events-none transition-all active:scale-95 touch-manipulation cursor-pointer select-none"
              title="Selanjutnya (Panah Kanan)"
            >
              <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
            </button>
          </div>

          {/* Bottom Navigation & Progress Bar in Reading Mode */}
          <div className="px-3 sm:px-8 py-2 sm:py-2.5 bg-slate-900/95 border-t border-white/10 flex items-center justify-between gap-2.5 sm:gap-4 text-xs text-slate-300">
            {/* Previous Page Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevPage();
              }}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              disabled={currentPage <= 1}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-20 disabled:pointer-events-none text-white font-bold flex items-center gap-1 transition-all touch-manipulation cursor-pointer select-none shrink-0"
              title="Halaman Sebelumnya"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Sebelumnya</span>
            </button>

            {/* Center Slider */}
            <div className="flex-1 max-w-xl mx-auto flex items-center space-x-2 sm:space-x-3 min-w-0">
              <span className="font-mono text-[10px] text-slate-400 shrink-0">1</span>
              <input
                type="range"
                min="1"
                max={TOTAL_PAGES}
                value={currentPage}
                onChange={(e) => goToPage(parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 touch-manipulation"
              />
              <span className="font-mono text-[10px] text-slate-400 shrink-0">{TOTAL_PAGES}</span>
            </div>

            {/* Next Page Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNextPage();
              }}
              onTouchStart={(e) => e.stopPropagation()}
              onTouchEnd={(e) => e.stopPropagation()}
              disabled={currentPage >= TOTAL_PAGES}
              className="px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-20 disabled:pointer-events-none text-white font-black flex items-center gap-1 transition-all touch-manipulation cursor-pointer shadow-xs select-none shrink-0"
              title="Halaman Selanjutnya"
            >
              <span className="hidden sm:inline">Selanjutnya</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* DRAWER / MODAL: DAFTAR ISI, DAFTAR HALAMAN & BOOKMARKS       */}
      {/* ============================================================ */}
      {activeDrawer !== "none" && (
        <div className="fixed inset-0 z-[110] flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setActiveDrawer("none")}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
          />

          {/* Drawer Body */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
            {/* Drawer Header with Tabs */}
            <div className="p-3 sm:p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50 gap-2">
              <div className="flex items-center space-x-1 sm:space-x-1.5 overflow-x-auto scrollbar-none min-w-0">
                <button
                  onClick={() => setActiveDrawer("toc")}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
                    activeDrawer === "toc"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Daftar Isi
                </button>
                <button
                  onClick={() => setActiveDrawer("grid")}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
                    activeDrawer === "grid"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Halaman (24)
                </button>
                <button
                  onClick={() => setActiveDrawer("bookmarks")}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-extrabold transition-all cursor-pointer shrink-0 ${
                    activeDrawer === "bookmarks"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Tandai ({bookmarks.length})
                </button>
              </div>

              <button
                onClick={() => setActiveDrawer("none")}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer shrink-0"
                title="Tutup (Esc)"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* 1. Tab: DAFTAR ISI STRUKTURAL */}
              {activeDrawer === "toc" && (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-400 mb-2">
                    Pilih bab untuk membaca langsung:
                  </div>
                  {REPROPEDIA_SUB_BABS.map((bab) => {
                    const isActive = bab.id === activeBab.id;
                    return (
                      <div
                        key={bab.id}
                        onClick={() => handleSelectBab(bab)}
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                          isActive
                            ? "bg-emerald-50 border-emerald-500 shadow-xs ring-2 ring-emerald-500/20"
                            : "bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                              isActive ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {bab.babNumber}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400">
                            {bab.pageRange}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                          {bab.title}
                        </h4>
                        <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">
                          {bab.summary}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 2. Tab: DAFTAR HALAMAN (VISUAL THUMBNAIL GRID) */}
              {activeDrawer === "grid" && (
                <div>
                  <div className="text-xs font-bold text-slate-400 mb-3">
                    Overview 24 Halaman Repropedia:
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((pageNum) => {
                      const isSelected = pageNum === currentPage;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => {
                            goToPage(pageNum);
                            setActiveDrawer("none");
                          }}
                          className={`flex flex-col items-center gap-1.5 p-1.5 rounded-xl border transition-all cursor-pointer ${
                            isSelected
                              ? "bg-emerald-50 border-emerald-600 ring-2 ring-emerald-500/30"
                              : "bg-white border-slate-200 hover:border-emerald-300 hover:bg-slate-50"
                          }`}
                        >
                          <div className="w-full aspect-[1191/1685] rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                            <img
                              src={`/assets/repropedia/pages/page_${pageNum}.webp`}
                              alt={`Halaman ${pageNum}`}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <span
                            className={`text-[11px] font-bold ${
                              isSelected ? "text-emerald-700 font-extrabold" : "text-slate-600"
                            }`}
                          >
                            Hal. {pageNum}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 3. Tab: BOOKMARKS (HALAMAN DITANDAI) */}
              {activeDrawer === "bookmarks" && (
                <div className="space-y-3">
                  <div className="text-xs font-bold text-slate-400 mb-2">
                    Halaman tersimpan untuk dibaca nanti:
                  </div>
                  {bookmarks.length === 0 ? (
                    <div className="text-center py-10 text-slate-400">
                      <Bookmark className="h-8 w-8 mx-auto mb-2 opacity-30" />
                      <p className="text-xs font-semibold">Belum ada halaman yang ditandai.</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Gunakan tombol bookmark saat membaca untuk menyimpan halaman penting.
                      </p>
                    </div>
                  ) : (
                    bookmarks.map((bmPage) => {
                      const bab = getBabForPage(bmPage);
                      return (
                        <div
                          key={bmPage}
                          className="p-3 rounded-xl border border-slate-200 bg-white hover:border-emerald-300 flex items-center justify-between gap-3 group"
                        >
                          <button
                            onClick={() => {
                              goToPage(bmPage);
                              setActiveDrawer("none");
                            }}
                            className="flex-1 text-left cursor-pointer"
                          >
                            <span className="text-[10px] font-black text-emerald-700 uppercase">
                              Halaman {bmPage} · {bab.babNumber}
                            </span>
                            <h4 className="text-xs font-bold text-slate-800">
                              {getPageSectionTitle(bmPage)}
                            </h4>
                          </button>
                          <button
                            onClick={() => handleToggleBookmark(bmPage)}
                            className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Hapus bookmark"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* MODAL: LOMPAT KE HALAMAN                                     */}
      {/* ============================================================ */}
      {isJumpModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div
            onClick={() => setIsJumpModalOpen(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs animate-in fade-in"
          />
          <div className="relative bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200 z-10 animate-in zoom-in-95 duration-150">
            <h3 className="text-base font-black text-slate-900 mb-1">Lompat ke Halaman</h3>
            <p className="text-xs text-slate-500 font-medium mb-4">
              Pilih nomor halaman antara 1 hingga {TOTAL_PAGES}.
            </p>

            <form onSubmit={handleExecuteJump} className="space-y-4">
              <div>
                <input
                  type="number"
                  min="1"
                  max={TOTAL_PAGES}
                  value={jumpPageInput}
                  onChange={(e) => {
                    setJumpPageInput(e.target.value);
                    setJumpError(null);
                  }}
                  autoFocus
                  placeholder={`Contoh: 7`}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-slate-900 text-lg font-black text-center outline-hidden"
                />
                {jumpError && (
                  <p className="text-[11px] font-bold text-rose-500 mt-1.5 text-center">
                    {jumpError}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsJumpModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-emerald-700 text-white text-xs font-black transition-all shadow-xs cursor-pointer"
                >
                  Buka Halaman
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
