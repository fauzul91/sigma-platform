import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

const tiptapExtensions = [
  StarterKit.configure({
    heading: {
      levels: [2, 3, 4],
    },
  }),
  Image.configure({
    inline: false,
    HTMLAttributes: {
      class: "rounded-2xl max-w-full my-6 border border-slate-200/80 shadow-xs mx-auto",
      loading: "lazy",
    },
  }),
  Link.configure({
    HTMLAttributes: {
      class: "text-emerald-600 hover:text-emerald-700 underline font-semibold transition-colors",
      target: "_blank",
      rel: "noopener noreferrer",
    },
  }),
];

/**
 * Check if the content string is a valid Tiptap JSON document string
 */
export function isTiptapJson(content: string | undefined | null): boolean {
  if (!content) return false;
  const trimmed = content.trim();
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return false;
  try {
    const parsed = JSON.parse(trimmed);
    return Boolean(parsed && parsed.type === "doc" && Array.isArray(parsed.content));
  } catch {
    return false;
  }
}

/**
 * Convert Tiptap JSON string or legacy text into styled HTML
 */
export function renderTiptapToHtml(content: string | undefined | null): string {
  if (!content) return "";
  const trimmed = content.trim();

  // If it's a Tiptap JSON document
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed);
      if (parsed && parsed.type === "doc") {
        return generateHTML(parsed, tiptapExtensions);
      }
    } catch {
      // Fallback below
    }
  }

  // If it's already HTML (e.g. starts with HTML tags)
  if (trimmed.startsWith("<") && trimmed.endsWith(">")) {
    return trimmed;
  }

  // Plain text fallback: split by double newlines into paragraphs
  return trimmed
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br />")}</p>`)
    .join("");
}

/**
 * Extract clean, human-readable plain text from Tiptap JSON or raw content
 */
export function getArticleExcerpt(content: string | undefined | null, maxLength = 160): string {
  if (!content) return "";
  const trimmed = content.trim();

  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed);
      const text = extractTextFromNode(parsed);
      if (text) {
        return truncateText(text.trim(), maxLength);
      }
    } catch {
      // Fallback
    }
  }

  // Strip any HTML tags
  const clean = trimmed.replace(/<[^>]*>/g, "").replace(/\s+/g, " ");
  return truncateText(clean.trim(), maxLength);
}

function extractTextFromNode(node: any): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (node.type === "text" && node.text) return node.text;

  if (Array.isArray(node.content)) {
    return node.content
      .map((child: any) => extractTextFromNode(child))
      .filter(Boolean)
      .join(" ");
  }

  return "";
}

function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}
