"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

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
function ImageFallback({ category, mobileOnly = false }: { category: string, mobileOnly?: boolean }) {
  return (
    <div className={`relative w-full ${mobileOnly ? 'h-56 mb-6 rounded-xl' : 'h-full min-h-[220px]'} overflow-hidden border border-white/5 bg-[#0a0a0a] flex items-center justify-center`}>
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
      <div className="relative z-20 flex flex-col items-center gap-4">
        <div className="w-px h-8 bg-[#008751]/40" />
        <span className="font-mono text-xs text-[#008751]/60 uppercase tracking-[0.3em]">
          [ VISUAL FEED UNAVAILABLE ]
        </span>
        <div className="w-px h-8 bg-[#008751]/40" />
      </div>
      {/* Corner grid marks */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#ccff00]/20" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[#ccff00]/20" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[#ccff00]/20" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#ccff00]/20" />
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
  // Tier 0: original URL → Tier 1: picsum fallback → Tier 2: UNAVAILABLE
  const picsumSeed = encodeURIComponent(title.slice(0, 20));
  const picsumFallback = `https://picsum.photos/seed/${picsumSeed}/1200/630`;

  const [imgSrc, setImgSrc] = useState(image || "");
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    console.log(`[Card] image prop → "${image}" — resetting`);
    if (image) { setImgSrc(image); setImgFailed(false); }
  }, [image]);

  const handleImgError = () => {
    console.warn(`[Card] ❌ onError: "${imgSrc.slice(0, 80)}"`);
    if (imgSrc !== picsumFallback) {
      console.log(`[Card] → Trying picsum fallback`);
      setImgSrc(picsumFallback);
    } else {
      console.warn(`[Card] → Picsum also failed. Showing UNAVAILABLE.`);
      setImgFailed(true);
    }
  };
  const handleImgLoad = () => console.log(`[Card] ✅ Loaded: "${imgSrc.slice(0, 80)}"`);

  const showFallback = !image || imgFailed;
  console.log(`[Card] render imgSrc=${imgSrc.slice(0,60)} imgFailed=${imgFailed} showFallback=${showFallback}`);
  const terminalDate = formatTerminalDate(date);

  const CardContent = (
    <div className="relative group overflow-hidden rounded-[2rem] border-l-[3px] border-t border-r border-b border-t-white/5 border-r-white/5 border-b-white/5 border-l-[#008751] bg-[#0d0d0d] transition-all duration-500 hover:border-l-[#ccff00] hover:bg-[#111] flex flex-col md:flex-row md:items-stretch h-full shadow-lg hover:-translate-y-1 hover:shadow-2xl">

      {/* CLASSIFIED hover stamp */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className="border-[3px] border-red-600/20 px-8 py-3 rotate-[-12deg] select-none"
          style={{ transform: "rotate(-12deg)" }}
        >
          <span className="font-black text-[32px] tracking-[0.3em] text-red-600/[0.07] uppercase">
            CLASSIFIED
          </span>
        </div>
      </div>

      {/* Hover glow accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#ccff00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none" />

      {/* ── DESKTOP IMAGE / FALLBACK LEFT PANE ── */}
      <div className="hidden md:block md:w-2/5 relative border-r border-white/5 overflow-hidden">
        {showFallback ? (
          <ImageFallback category={category} />
        ) : (
          <>
            {/* Scanline overlay on image */}
            <div
              className="absolute inset-0 pointer-events-none z-10 opacity-[0.04]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.2) 2px, rgba(255,255,255,0.2) 4px)",
              }}
            />
            <Image
              src={imgSrc}
              alt={title}
              fill
              className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
              onError={handleImgError}
              onLoad={handleImgLoad}
              unoptimized
            />
            {/* Horizontal gradient mapping into text block */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0d0d0d]/90 group-hover:to-[#111]/90 transition-colors" />
          </>
        )}
      </div>

      {/* ── RIGHT/MAIN TEXT PANE ── */}
      <div className="relative z-10 flex flex-col md:flex-grow md:w-3/5 h-full p-6 md:p-8">
        
        {/* Header: category + timestamp */}
        <div className="flex justify-between items-center mb-5 gap-3">
          <span className="font-mono text-xs font-black text-[#008751] uppercase tracking-[0.2em]">
            {category}
          </span>
          <span className="font-mono text-xs text-gray-500 uppercase tracking-wider shrink-0 hidden sm:block">
            {terminalDate}
          </span>
        </div>

        {/* ── MOBILE IMAGE (HIDDEN ON MD) ── */}
        <div className="block md:hidden">
          {showFallback ? (
            <ImageFallback category={category} mobileOnly={true} />
          ) : (
            <div className="relative w-full h-56 mb-6 overflow-hidden rounded-xl border border-white/5 group-hover:border-[#ccff00]/20 transition-all">
              <div
                className="absolute inset-0 pointer-events-none z-10 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.2) 2px, rgba(255,255,255,0.2) 4px)",
                }}
              />
              <Image
                src={imgSrc}
                alt={title}
                fill
                className="object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                onError={handleImgError}
                onLoad={handleImgLoad}
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/90 via-transparent to-transparent group-hover:from-[#111]/90 transition-colors" />
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-black text-white group-hover:text-[#ccff00] transition-colors duration-300 leading-[1.15] uppercase tracking-tighter">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="mt-4 text-base text-gray-400 leading-[1.7] line-clamp-3 font-medium flex-grow">
          {excerpt}
        </p>

        {/* Footer CTA */}
        {href && (
          <div className="mt-8 pt-5 border-t border-white/[0.05] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-black text-white uppercase tracking-[0.15em] group-hover:translate-x-1 transition-transform duration-300">
              {actionText}
              <svg className="w-5 h-5 text-[#ccff00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">AGENT ACTIVE</span>
              <div className="w-2 h-2 rounded-full bg-[#008751] animate-pulse" />
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
