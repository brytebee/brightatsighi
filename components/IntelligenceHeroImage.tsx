"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function IntelligenceHeroImage({
  image,
  title,
}: {
  image?: string;
  title: string;
}) {
  const picsumSeed = encodeURIComponent(title.slice(0, 20));
  const picsumFallback = `https://picsum.photos/seed/${picsumSeed}/1200/630`;

  const [imgSrc, setImgSrc] = useState(image || "");
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => {
    if (image) {
      setImgSrc(image);
      setImgFailed(false);
    }
  }, [image]);

  const handleImgError = () => {
    if (imgSrc !== picsumFallback) {
      setImgSrc(picsumFallback);
    } else {
      setImgFailed(true);
    }
  };

  if (imgFailed || !image) {
    return (
      <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 4px)",
            backgroundSize: "100% 4px",
          }}
        />
        <div className="relative z-20 flex flex-col items-center gap-4">
          <div className="w-px h-8 bg-[#ccff00]/40" />
          <span className="font-mono text-[10px] text-[#ccff00]/60 uppercase tracking-[0.3em]">
            [ VISUAL CORRUPTED // RESTORING FROM ARCHIVE ]
          </span>
          <div className="w-px h-8 bg-[#ccff00]/40" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Image
        src={imgSrc}
        alt={title}
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-105"
        onError={handleImgError}
        unoptimized
      />
      {/* Scanlines on image */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      <div className="absolute bottom-6 left-6 px-4 py-2 bg-black/50 backdrop-blur-md rounded-2xl border border-white/5 font-mono text-[9px] font-black uppercase tracking-[0.2em] text-white/50">
        Satellite Imagery Verified
      </div>
    </>
  );
}
