"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TiptapToolbar from "./TiptapToolbar";

interface TiptapEditorProps {
  initialContent?: any;
  onChange: (json: JSONContent) => void;
  placeholder?: string;
}

export default function TiptapEditor({
  initialContent,
  onChange,
  placeholder = "Tulis isi artikel edukasi di sini...",
}: TiptapEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
        dropcursor: {
          color: "#059669",
          width: 2,
        },
      }),
      Image.configure({
        inline: false,
        allowBase64: false,
        HTMLAttributes: {
          class:
            "rounded-2xl shadow-md my-5 max-h-[500px] object-cover mx-auto w-auto max-w-full border border-slate-200/80",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            "text-emerald-600 font-bold underline decoration-emerald-500/40 hover:text-emerald-700 transition-colors",
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: initialContent || {
      type: "doc",
      content: [
        {
          type: "paragraph",
        },
      ],
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-slate max-w-none focus:outline-none min-h-[380px] p-5 sm:p-8 bg-white rounded-b-2xl font-sans text-slate-850 leading-relaxed text-sm sm:text-base selection:bg-emerald-100 selection:text-emerald-900 prose-p:text-justify text-justify",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  // Sync content if editing an existing article asynchronously
  useEffect(() => {
    if (editor && initialContent && !editor.isDestroyed) {
      const currentJson = JSON.stringify(editor.getJSON());
      const newJson = JSON.stringify(initialContent);
      if (currentJson !== newJson) {
        editor.commands.setContent(initialContent);
      }
    }
  }, [initialContent, editor]);

  return (
    <div className="border border-slate-200/90 rounded-2xl bg-white shadow-xs focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all overflow-hidden flex flex-col">
      <TiptapToolbar editor={editor} />
      <div className="flex-1 overflow-y-auto max-h-[75vh]">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
