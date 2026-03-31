"use client";

import { useEffect, useRef } from "react";
import { EcommerceEvent, SKU } from "@/lib/ecommerce/simulation";

export default function LiveDemandStream({ events, skus }: { events: EcommerceEvent[], skus: SKU[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to top since newest events are prepended
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [events]);

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="shrink-0 flex items-center gap-2 px-5 py-4 border-b border-white/10">
        <div className="w-1 h-4 bg-electric-lime rounded-full" />
        <h3 className="text-white text-sm font-semibold tracking-wide">Live Demand Stream</h3>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-electric-lime animate-pulse" />
          <span className="text-[9px] font-mono text-electric-lime uppercase tracking-widest">Live</span>
        </div>
      </div>

      {/* Stream */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto min-h-0 px-4 py-3 space-y-0 font-mono text-[11px]
          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-white/10
          [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        {events.map((event) => {
          const ts = new Date(event.timestamp).toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          });

          const msg = event.metadata?.message ?? `${event.type} — ${event.skuId}`;
          const isHighlight = event.metadata?.highlight === true;

          // Split message on the dollar amount for targeted coloring
          const dollarIdx = msg.indexOf("$");
          const beforeDollar = dollarIdx >= 0 ? msg.slice(0, dollarIdx) : msg;
          const dollarPart = dollarIdx >= 0 ? msg.slice(dollarIdx) : "";

          return (
            <div key={event.id} className="group">
              <div className="flex items-start gap-2 py-2 px-1 rounded hover:bg-white/[0.03] transition-colors">
                {/* Arrow */}
                <span className={`shrink-0 mt-px ${isHighlight ? "text-electric-lime" : "text-gray-600"}`}>
                  ▶
                </span>

                {/* Timestamp */}
                <span className="shrink-0 text-gray-500">[{ts}]</span>

                {/* Message */}
                <span className={isHighlight ? "text-gray-300" : "text-gray-500"}>
                  {beforeDollar}
                  {dollarPart && (
                    <span className="text-electric-lime font-bold drop-shadow-[0_0_6px_rgba(204,255,0,0.7)]">
                      {dollarPart}
                    </span>
                  )}
                </span>
              </div>

              {/* Dashed separator */}
              <div className="border-b border-dashed border-white/[0.06] mx-1" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
