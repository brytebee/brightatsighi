"use client";

import Image from "next/image";
import { useState } from "react";

interface IntelligenceCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  status: string;
  image?: string;
  href?: string;
  actionText?: string;
}

// Format raw date string into terminal-style timestamp
function formatTerminalDate(raw: string): string {
  try {
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    return `[${yyyy}-${mm}-${dd} | ${hh}:${min} UTC]`;
  } catch {
    return raw;
  }
}

// Branded no-image fallback
function ImageFallback({ category }: { category: string }) {
  return (
    <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl border border-white/5 bg-[#0a0a0a] flex items-center justify-center">
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 4px)",
          backgroundSize: "100% 4px",
        }}
      />
      {/* Category watermark */}
      <span className="absolute inset-0 flex items-center justify-center text-[64px] font-black uppercase text-white/[0.03] tracking-tighter select-none pointer-events-none">
        {category.replace(/-/g, " ")}
      </span>
      {/* Center label */}
      <div className="relative z-20 flex flex-col items-center gap-3">
        <div className="w-px h-8 bg-[#008751]/40" />
        <span className="font-mono text-[9px] text-[#008751]/60 uppercase tracking-[0.3em]">
          [ VISUAL FEED UNAVAILABLE ]
        </span>
        <div className="w-px h-8 bg-[#008751]/40" />
      </div>
      {/* Corner grid marks */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#ccff00]/20" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#ccff00]/20" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#ccff00]/20" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#ccff00]/20" />
    </div>
  );
}

export default function IntelligenceCard({
  title,
  excerpt,
  date,
  category,
  image,
  href,
  actionText = "Open Dossier",
}: IntelligenceCardProps) {
  const [imgError, setImgError] = useState(false);
  const showFallback = !image || imgError;
  const terminalDate = formatTerminalDate(date);

  const CardContent = (
    <div className="relative group overflow-hidden rounded-[2rem] border-l-[3px] border-t border-r border-b border-t-white/5 border-r-white/5 border-b-white/5 border-l-[#008751] bg-[#0d0d0d] transition-all duration-500 hover:border-l-[#ccff00] hover:bg-[#111] flex flex-col h-full shadow-lg">

      {/* CLASSIFIED hover stamp */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="border-[3px] border-red-600/20 px-6 py-2 rotate-[-12deg] select-none"
          style={{ transform: "rotate(-12deg)" }}
        >
          <span className="font-black text-[28px] tracking-[0.3em] text-red-600/[0.07] uppercase">
            CLASSIFIED
          </span>
        </div>
      </div>

      {/* Hover glow accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#ccff00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full p-5 md:p-6">
        {/* Header: category + timestamp */}
        <div className="flex justify-between items-start mb-4 gap-2">
          <span className="font-mono text-[10px] font-black text-[#008751] uppercase tracking-[0.2em]">
            {category}
          </span>
          <span className="font-mono text-[9px] text-gray-600 uppercase tracking-wider shrink-0">
            {terminalDate}
          </span>
        </div>

        {/* Image or fallback */}
        {showFallback ? (
          <ImageFallback category={category} />
        ) : (
          <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl border border-white/5 group-hover:border-[#ccff00]/20 transition-all">
            {/* Scanline overlay on image */}
            <div
              className="absolute inset-0 pointer-events-none z-10 opacity-[0.04]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.2) 2px, rgba(255,255,255,0.2) 4px)",
              }}
            />
            <Image
              src={image!}
              alt={title}
              fill
              className="object-cover opacity-70 group-hover:opacity-90 transition-all duration-500 group-hover:scale-105"
              onError={() => setImgError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/90 via-transparent to-transparent" />
          </div>
        )}

        {/* Title */}
        <h3 className="text-[22px] md:text-[26px] font-black text-white group-hover:text-[#ccff00] transition-colors duration-300 leading-[1.1] uppercase tracking-tighter">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="mt-3 text-[14px] text-gray-500 leading-[1.8] line-clamp-3 font-medium">
          {excerpt}
        </p>

        {/* Footer CTA */}
        {href && (
          <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between">
            <div className="flex items-center gap-2 text-[10px] font-black text-white uppercase tracking-[0.15em] group-hover:translate-x-1 transition-transform duration-300">
              {actionText}
              <svg className="w-4 h-4 text-[#ccff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] text-gray-600 font-mono uppercase tracking-widest">AGENT ACTIVE</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#008751] animate-pulse" />
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block h-full">
        {CardContent}
      </a>
    );
  }

  return CardContent;
}
