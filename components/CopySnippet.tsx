"use client";

import React, { useState } from "react";

interface CopySnippetProps {
  label: string;
  snippet: string;
}

export default function CopySnippet({ label, snippet }: CopySnippetProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="group space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-px w-6 bg-white/10" />
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-500 group-hover:text-electric-lime transition-colors">
            {label} Segment
          </span>
        </div>
        <button
          onClick={handleCopy}
          type="button"
          className={`text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border transition-all duration-300 ${
            copied
              ? "bg-electric-lime text-black border-electric-lime"
              : "bg-white/5 text-gray-400 border-white/10 hover:border-white/20 hover:text-white"
          }`}
        >
          {copied ? "SECURED IN CLIPBOARD" : "COPY ASSET"}
        </button>
      </div>
      <div className="relative">
        <div className="absolute -inset-px bg-linear-to-r from-white/5 to-transparent rounded-2xl pointer-events-none" />
        <pre className="relative bg-black/40 border border-white/5 rounded-2xl p-6 text-[13px] font-medium leading-relaxed text-gray-400 whitespace-pre-wrap font-sans">
          {snippet}
        </pre>
      </div>
    </div>
  );
}
