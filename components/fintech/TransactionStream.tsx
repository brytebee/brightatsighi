"use client";

import React, { useEffect, useState } from "react";

interface Transaction {
  id: string;
  amount: number;
  currency: string;
  merchant: string;
  sender: string;
  location: string;
  channel: string;
  status: string;
  riskScore: number;
  tags: string[];
  timestamp: Date | string;
}

function riskColor(score: number): string {
  if (score > 90) return "#ff3366"; // Radiant Crimson
  if (score > 75) return "#ccff00"; // Neon Chartreuse elevated
  return "#00e676"; // Cyber Emerald
}

function riskLabel(score: number): string {
  if (score > 90) return "CRITICAL";
  if (score > 75) return "ELEVATED";
  return "STABLE";
}

function formatTimestamp(ts: Date | string): string {
  try {
    const d = new Date(ts);
    return d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  } catch {
    return "--:--:--";
  }
}

export default function TransactionStream({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes slideInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
      <div className="space-y-4">
      {/* Stream Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-4">
          <div className="relative flex items-center justify-center w-3 h-3">
            <div className="absolute inset-0 rounded-full bg-[#ccff00] animate-ping opacity-75" />
            <div className="relative w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
          </div>
          <h3 className="font-mono text-[11px] font-black uppercase tracking-[0.4em] text-white">
            Live Ticker Stream
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 rounded bg-white/[0.05] font-mono text-[9px] text-[#ccff00] uppercase tracking-widest">
            {transactions.length} Units Active
          </span>
        </div>
      </div>

      {/* Transaction Rows */}
      <div className="space-y-3 relative">
        {/* Connection pipeline visual */}
        <div className="absolute left-6 top-2 bottom-4 w-px bg-gradient-to-b from-[#ccff00]/20 via-white/[0.05] to-transparent z-0 hidden sm:block" />

        {transactions.map((trx, idx) => {
          const color = riskColor(trx.riskScore);
          const label = riskLabel(trx.riskScore);
          return (
            <div
              key={trx.id}
              className={`group relative z-10 flex flex-col md:flex-row md:items-center justify-between px-6 py-5 bg-black/40 backdrop-blur-3xl border border-white/[0.05] rounded-2xl hover:border-white/[0.15] hover:bg-white/[0.03] transition-all duration-500 overflow-hidden transform hover:translate-x-1 ${
                mounted ? "animate-[slideInDown_0.4s_ease-out_forwards]" : "opacity-0"
              }`}
            >
              
              {/* Left risk bar (ambient edge glow) */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px] opacity-80 group-hover:w-[3px] group-hover:opacity-100 transition-all duration-300 shadow-[0_0_15px_currentColor]"
                style={{ background: color, color: color }}
              />

              {/* Hover dynamic radial gradient */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{
                  background: `radial-gradient(1000px circle at left, ${color}10, transparent 40%)`,
                }}
              />

              {/* Left: merchant + sender */}
              <div className="flex items-start md:items-center gap-5 min-w-0">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.1] shadow-inner flex items-center justify-center relative overflow-hidden group-hover:border-white/[0.2] transition-colors">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="font-mono font-bold text-[11px] text-white/50 uppercase">
                    {trx.merchant.slice(0, 2)}
                  </span>
                </div>
                <div className="min-w-0 flex flex-col justify-center space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-sans font-semibold text-[14px] text-white truncate tracking-tight">
                      {trx.merchant}
                    </span>
                    <span className="font-mono text-[9px] text-[#ccff00]/60 tracking-tighter shrink-0 px-1.5 py-0.5 rounded bg-[#ccff00]/10 border border-[#ccff00]/20">
                      {trx.id}
                    </span>
                  </div>
                  <div className="font-mono text-[10px] text-gray-500 uppercase tracking-widest truncate">
                    {trx.sender} <span className="text-gray-700">/</span> {trx.location} <span className="text-gray-700">/</span> {trx.channel}
                  </div>
                </div>
              </div>

              {/* Tags visible on hover (or always on large screens in the middle) */}
              <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 opacity-30 group-hover:opacity-100 transition-opacity duration-300">
                {trx.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-sm bg-black/50 border border-white/[0.1] font-mono text-[9px] uppercase tracking-widest text-[#ccff00]"
                  >
                    #{tag.replace(/\s+/g, "_")}
                  </span>
                ))}
              </div>

              {/* Right: amount + risk */}
              <div className="text-right space-y-1 shrink-0 mt-4 md:mt-0 relative">
                <div className="font-mono font-black text-[15px] text-white tabular-nums tracking-tight">
                  <span className="text-gray-500 font-normal mr-1">{trx.currency}</span>
                  {trx.amount.toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span
                    className={`font-mono text-[10px] font-black uppercase tracking-[0.2em] ${trx.riskScore > 90 ? "animate-pulse" : ""}`}
                    style={{ color: color, textShadow: `0 0 10px ${color}80` }}
                  >
                    [{label} {trx.riskScore}%]
                  </span>
                </div>
                <div className="font-mono text-[9px] text-gray-600 tracking-widest">
                  {formatTimestamp(trx.timestamp)}
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform opacity-0 group-hover:opacity-100 text-white/40">→</span>
                </div>
              </div>
            </div>
          );
        })}

        {transactions.length === 0 && (
          <div className="py-24 flex flex-col items-center justify-center border border-dashed border-white/[0.1] rounded-2xl bg-white/[0.01] backdrop-blur-xl font-mono relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(204,255,0,0.03)_0%,transparent_70%)]" />
            <div className="relative flex flex-col items-center space-y-4">
              <div className="w-12 h-12 rounded-full border border-[#ccff00]/30 flex items-center justify-center shadow-[0_0_30px_rgba(204,255,0,0.1)]">
                <div className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping" />
              </div>
              <p className="text-[#ccff00] text-[11px] font-black uppercase tracking-[0.4em] drop-shadow-[0_0_10px_rgba(204,255,0,0.5)]">
                {">"} LISTENING ON SECURE SOCKET
                <span className="animate-pulse ml-1">█</span>
              </p>
              <p className="text-gray-500 text-[9px] uppercase tracking-widest">
                Awaiting telemetry...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
