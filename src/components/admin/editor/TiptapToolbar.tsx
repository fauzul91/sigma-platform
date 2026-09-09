"use client";

import React, { useRef, useState } from "react";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Minus,
  Link2,
  Unlink,
  Image as ImageIcon,
  Loader2,
  Undo,
  Redo,
} from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinary";

interface TiptapToolbarProps {
  editor: Editor | null;
}

export default function TiptapToolbar({ editor }: TiptapToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
  const [showLinkModal, setShowLinkModal] = useState<boolean>(false);
  const [linkUrl, setLinkUrl] = useState<string>("");

  if (!editor) {
    return null;
  }

  // Handle set link
  const openLinkModal = () => {
    const previousUrl = editor.getAttributes("link").href || "";
    setLinkUrl(previousUrl);
    setShowLinkModal(true);
  };

  const handleApplyLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (linkUrl.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      let finalUrl = linkUrl.trim();
      if (!/^https?:\/\//i.test(finalUrl)) {
        finalUrl = `https://${finalUrl}`;
      }
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: finalUrl, target: "_blank" })
        .run();
    }
    setShowLinkModal(false);
  };

  const handleUnlink = () => {
    editor.chain().focus().unsetLink().run();
  };

  // Handle inline image upload
  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const url = await uploadToCloudinary(file);
      if (url) {
        editor.chain().focus().setImage({ src: url, alt: file.name }).run();
      }
    } catch (err: any) {
      alert(err.message || "Gagal mengunggah gambar ke Cloudinary.");
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="bg-slate-50/95 border-b border-slate-200/90 px-3 py-2 rounded-t-2xl flex flex-wrap items-center gap-1 sticky top-0 z-10 backdrop-blur-xs">
      {/* Hidden File Input for Image Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
        onChange={handleImageFileChange}
        className="hidden"
      />

      {/* 1. Text Formatting (Bold, Italic, Strikethrough) */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
          editor.isActive("bold")
            ? "bg-emerald-100 text-emerald-800 font-bold shadow-2xs"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
        }`}
        title="Tebal (Bold: Ctrl+B)"
      >
        <Bold className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
          editor.isActive("italic")
            ? "bg-emerald-100 text-emerald-800 font-bold shadow-2xs"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
        }`}
        title="Miring (Italic: Ctrl+I)"
      >
        <Italic className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
          editor.isActive("strike")
            ? "bg-emerald-100 text-emerald-800 font-bold shadow-2xs"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
        }`}
        title="Coret (Strikethrough)"
      >
        <Strikethrough className="h-4 w-4" />
      </button>

      {/* Separator */}
      <div className="h-5 w-[1px] bg-slate-300 mx-1" />

      {/* 2. Headings (Level 2 & Level 3 - No H1) */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
          editor.isActive("heading", { level: 2 })
            ? "bg-emerald-100 text-emerald-800 font-bold shadow-2xs"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
        }`}
        title="Judul Bab (Heading 2)"
      >
        <Heading2 className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
          editor.isActive("heading", { level: 3 })
            ? "bg-emerald-100 text-emerald-800 font-bold shadow-2xs"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
        }`}
        title="Sub-Judul (Heading 3)"
      >
        <Heading3 className="h-4 w-4" />
      </button>

      {/* Separator */}
      <div className="h-5 w-[1px] bg-slate-300 mx-1" />

      {/* 3. Lists (Bullet & Ordered) */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
          editor.isActive("bulletList")
            ? "bg-emerald-100 text-emerald-800 font-bold shadow-2xs"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
        }`}
        title="Daftar Poin (Bullet List)"
      >
        <List className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
          editor.isActive("orderedList")
            ? "bg-emerald-100 text-emerald-800 font-bold shadow-2xs"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
        }`}
        title="Daftar Bernomor (Numbered List)"
      >
        <ListOrdered className="h-4 w-4" />
      </button>

      {/* Separator */}
      <div className="h-5 w-[1px] bg-slate-300 mx-1" />

      {/* 4. Blockquote & Horizontal Rule */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
          editor.isActive("blockquote")
            ? "bg-emerald-100 text-emerald-800 font-bold shadow-2xs"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
        }`}
        title="Kutipan (Blockquote)"
      >
        <Quote className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className="p-1.5 rounded-lg text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 transition-colors cursor-pointer"
        title="Garis Pemisah (Divider)"
      >
        <Minus className="h-4 w-4" />
      </button>

      {/* Separator */}
      <div className="h-5 w-[1px] bg-slate-300 mx-1" />

      {/* 5. Link & Unlink */}
      <button
        type="button"
        onClick={openLinkModal}
        className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
          editor.isActive("link")
            ? "bg-emerald-100 text-emerald-800 font-bold shadow-2xs"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/70"
        }`}
        title="Sisipkan Tautan (Link)"
      >
        <Link2 className="h-4 w-4" />
      </button>

      {editor.isActive("link") && (
        <button
          type="button"
          onClick={handleUnlink}
          className="p-1.5 rounded-lg text-xs text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          title="Hapus Tautan"
        >
          <Unlink className="h-4 w-4" />
        </button>
      )}

      {/* 6. Inline Cloudinary Image Upload Button */}
      <button
        type="button"
        onClick={handleImageButtonClick}
        disabled={isUploadingImage}
        className="p-1.5 rounded-lg text-xs text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors flex items-center space-x-1 cursor-pointer disabled:opacity-50"
        title="Unggah & Sisipkan Gambar (Cloudinary)"
      >
        {isUploadingImage ? (
          <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
        ) : (
          <ImageIcon className="h-4 w-4 text-emerald-600" />
        )}
        <span className="text-[11px] font-bold text-emerald-700 hidden sm:inline">
          {isUploadingImage ? "Mengunggah..." : "Gambar"}
        </span>
      </button>

      {/* Separator */}
      <div className="h-5 w-[1px] bg-slate-300 mx-1" />

      {/* 7. Undo & Redo */}
      <button
        type="button"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="p-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 disabled:opacity-30 transition-colors cursor-pointer"
        title="Urungkan (Undo: Ctrl+Z)"
      >
        <Undo className="h-4 w-4" />
      </button>

      <button
        type="button"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="p-1.5 rounded-lg text-xs text-slate-500 hover:text-slate-900 hover:bg-slate-200/70 disabled:opacity-30 transition-colors cursor-pointer"
        title="Ulangi (Redo: Ctrl+Y)"
      >
        <Redo className="h-4 w-4" />
      </button>

      {/* Simple Link Modal Popover */}
      {showLinkModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 w-full max-w-sm shadow-xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <h4 className="text-sm font-black text-slate-900 mb-1">Sisipkan Tautan</h4>
            <p className="text-xs text-slate-500 mb-3 font-medium">
              Masukkan alamat URL web tujuan (contoh: https://...)
            </p>
            <form onSubmit={handleApplyLink} className="space-y-3">
              <input
                type="url"
                required
                autoFocus
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-mono"
              />
              <div className="flex justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-primary hover:bg-emerald-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  Terapkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
