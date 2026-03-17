"use client";

import Image from "next/image";

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

export default function IntelligenceCard({
  title,
  excerpt,
  date,
  category,
  status,
  image,
  href,
  actionText = "Open Dossier",
}: IntelligenceCardProps) {
  const CardContent = (
    <div className="relative group overflow-hidden rounded-[2rem] border border-white/[0.05] bg-[#111] backdrop-blur-3xl p-5 md:p-6 transition-all hover:border-electric-lime/40 ring-1 ring-white/5 hover:ring-electric-lime/20 flex flex-col h-full shadow-lg">
      {/* Decorative Corner Accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-electric-lime/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" />

      {/* Hover Background Accent */}
      <div className="absolute -inset-px bg-gradient-to-br from-eagles-green/10 via-transparent to-electric-lime/5 opacity-0 group-hover:opacity-100 transition-all duration-700 blur-[1px]" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black font-mono text-eagles-green uppercase tracking-[0.2em]">
              {category}
            </span>
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
              {date}
            </span>
          </div>
          <div
            className={`text-[9px] px-2 py-1 rounded-full border ${status === "APPROVED" ? "border-eagles-green/40 text-eagles-green bg-eagles-green/5" : "border-yellow-500/40 text-yellow-500 bg-yellow-500/5"} font-black font-mono uppercase tracking-tighter`}
          >
            {status}
          </div>
        </div>

        {image && (
          <div className="relative w-full h-48 mb-4 overflow-hidden rounded-xl border border-white/5 group-hover:border-electric-lime/20 transition-all">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
          </div>
        )}

        <h3 className="text-2xl font-black text-white group-hover:text-electric-lime transition-all duration-300 leading-[1.1] uppercase tracking-tighter">
          {title}
        </h3>

        <p className="mt-4 text-gray-400 text-sm leading-relaxed line-clamp-3 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
          {excerpt}
        </p>

        {href && (
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center text-[10px] font-black text-white uppercase tracking-[0.1em] group-hover:translate-x-1 transition-transform">
              {actionText}
              <svg
                className="ml-2 w-4 h-4 text-electric-lime"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>

            {/* Micro-Animation: Pulse indicating AI generation */}
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-gray-600 font-mono uppercase tracking-widest">
                Agent Active
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-electric-lime animate-pulse" />
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
