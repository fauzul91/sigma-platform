"use client";

import React from "react";
import { Platform, SocialPost } from "@/data/detectiveCasesData";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  CheckCircle2,
  AlertTriangle,
  Repeat2,
  Globe,
  CornerUpRight,
} from "lucide-react";

interface SocialPostMockupProps {
  platform: Platform;
  post: SocialPost;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export default function SocialPostMockup({ platform, post }: SocialPostMockupProps) {
  // Case 1: WhatsApp Forwarded Message Mockup
  if (platform === "whatsapp") {
    return (
      <div className="rounded-2xl border border-emerald-200/80 bg-[#eef7f0] p-4 sm:p-5 shadow-xs space-y-3">
        {/* WhatsApp Header Badge */}
        <div className="flex items-center justify-between border-b border-emerald-100 pb-2.5 text-xs">
          <div className="flex items-center space-x-2 text-emerald-800 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Pesan Grup WhatsApp</span>
          </div>
          <span className="text-[11px] font-bold text-slate-400">Kasus Bukti Digital</span>
        </div>

        {/* Forwarded Tag */}
        <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 italic">
          <CornerUpRight className="h-3 w-3 text-slate-400" />
          <span>Diteruskan berkali-kali</span>
        </div>

        {/* WhatsApp Chat Bubble */}
        <div className="bg-white rounded-2xl rounded-tl-xs p-4 border border-emerald-100 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700">
              ~ {post.username}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Hari ini 14:20</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line font-normal">
            {post.caption}
          </p>

          <div className="flex justify-end pt-1">
            <span className="text-[10px] text-slate-400 font-bold">✓✓ Terkirim ke 50+ kontak</span>
          </div>
        </div>
      </div>
    );
  }

  // Case 2: Instagram Post Mockup
  if (platform === "instagram") {
    return (
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs space-y-3.5">
        {/* Post Top Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Story Gradient Ring Avatar */}
            <div className="p-0.5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
              <div className="w-9 h-9 rounded-full bg-white p-0.5">
                <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center font-black text-xs text-slate-700">
                  {post.username.charAt(0)}
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                  {post.username}
                </span>
                <span className="text-[10px] text-slate-400">• 4 jam</span>
              </div>
              <span className="text-[11px] text-slate-400 block -mt-0.5">
                {post.handle}
              </span>
            </div>
          </div>
          <button type="button" className="text-slate-400 hover:text-slate-600">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Media Preview Box (Simulated Instagram Feed Graphic) */}
        <div className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 sm:p-8 text-center space-y-2 border border-slate-700">
          <span className="px-2.5 py-1 rounded-md bg-rose-600/90 text-white text-[10px] font-black uppercase tracking-wider inline-block">
            VIRAL ALERT
          </span>
          <p className="text-xs sm:text-sm font-bold text-slate-200 line-clamp-3 px-2">
            {post.caption.slice(0, 95)}...
          </p>
          {post.imageAlt && (
            <p className="text-[10px] text-slate-400 italic">[{post.imageAlt}]</p>
          )}
        </div>

        {/* Action Bar (Like, Comment, Share, Bookmark) */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center space-x-3 text-slate-700">
            <div className="flex items-center space-x-1 cursor-pointer">
              <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
              <span className="text-xs font-bold">{formatCount(post.likes || 1200)}</span>
            </div>
            <div className="flex items-center space-x-1 text-slate-600">
              <MessageCircle className="h-5 w-5" />
              <span className="text-xs font-medium">348</span>
            </div>
            <Share2 className="h-5 w-5 text-slate-600" />
          </div>
          <Bookmark className="h-5 w-5 text-slate-600" />
        </div>

        {/* Caption */}
        <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
          <span className="font-extrabold mr-1.5">{post.handle}</span>
          <span className="font-normal">{post.caption}</span>
        </div>
      </div>
    );
  }

  // Case 3: Twitter / X Post Mockup
  if (platform === "twitter") {
    return (
      <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-sm shrink-0">
              {post.username.charAt(0)}
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                  {post.username}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {post.handle}
                </span>
              </div>
              <span className="text-[10px] text-slate-400">Postingan Media Sosial X</span>
            </div>
          </div>
          <MoreHorizontal className="h-4 w-4 text-slate-400" />
        </div>

        <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-normal pt-1">
          {post.caption}
        </p>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-slate-500 text-xs font-semibold">
          <div className="flex items-center space-x-1.5">
            <MessageCircle className="h-4 w-4" />
            <span>284</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Repeat2 className="h-4 w-4 text-emerald-600" />
            <span>{formatCount(post.shares || 420)}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Heart className="h-4 w-4 text-rose-500" />
            <span>{formatCount(post.likes || 1800)}</span>
          </div>
          <Share2 className="h-4 w-4" />
        </div>
      </div>
    );
  }

  // Default: TikTok / Facebook / General Social Media Mockup
  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs space-y-3">
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
            {post.username.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                {post.username}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-[10px] text-slate-400">
              <span>{post.handle}</span>
              <span>•</span>
              <Globe className="h-3 w-3" />
            </div>
          </div>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
          {platform}
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
        {post.caption}
      </p>

      {post.imageAlt && (
        <div className="rounded-xl bg-slate-100 p-4 text-center text-xs text-slate-500 italic border border-slate-200/70">
          [{post.imageAlt}]
        </div>
      )}

      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
        <span className="flex items-center space-x-1">
          <span>👍</span>
          <span className="font-bold">{formatCount(post.likes || 320)} Suka</span>
        </span>
        <span>{formatCount(post.shares || 120)} Kali Dibagikan</span>
      </div>
    </div>
  );
}
