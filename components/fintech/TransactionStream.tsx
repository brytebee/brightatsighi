"use client";

import React from "react";

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
  if (score > 90) return "#ef4444";
  if (score > 75) return "#f59e0b";
  return "#008751";
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
  return (
    <div className="space-y-3">
      {/* Stream header */}
      <div className="flex items-center justify-between px-5 py-3 bg-[#0a0a0a] border border-white/[0.05] rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
          <h3 className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-white/60">
            Live Transaction Intake
          </h3>
        </div>
        <span className="font-mono text-[9px] text-gray-600 uppercase tracking-widest">
          {transactions.length} units
        </span>
      </div>

      {/* Transaction rows */}
      <div className="space-y-2">
        {transactions.map((trx, idx) => {
          const color = riskColor(trx.riskScore);
          const label = riskLabel(trx.riskScore);
          return (
            <div
              key={trx.id}
              className="group relative flex items-center justify-between px-5 py-4 bg-[#0a0a0a] border border-white/[0.04] rounded-2xl hover:border-white/10 transition-all duration-300 overflow-hidden"
            >
              {/* Left risk bar */}
              <div
                className="absolute left-0 top-1/4 bottom-1/4 w-[2.5px] rounded-r-full transition-all duration-300"
                style={{
                  background: color,
                  boxShadow: `0 0 8px ${color}60`,
                }}
              />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at left, ${color}08 0%, transparent 60%)`,
                }}
              />

              {/* Left: merchant + sender */}
              <div className="flex items-center gap-4 pl-2 min-w-0">
                <div className="shrink-0 w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.05] flex items-center justify-center">
                  <span className="font-black text-[9px] text-white/40 uppercase">
                    {trx.merchant.slice(0, 2)}
                  </span>
                </div>
                <div className="min-w-0 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-[13px] text-white truncate">
                      {trx.merchant}
                    </span>
                    <span className="font-mono text-[9px] text-gray-600 tracking-tighter shrink-0">
                      {trx.id}
                    </span>
                  </div>
                  <div className="font-mono text-[10px] text-gray-600 uppercase tracking-wider truncate">
                    {trx.sender} · {trx.location} · {trx.channel}
                  </div>
                </div>
              </div>

              {/* Tags on hover */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                {trx.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] font-mono text-[8px] uppercase tracking-widest text-gray-500"
                  >
                    #{tag.replace(/\s+/g, "_")}
                  </span>
                ))}
              </div>

              {/* Right: amount + risk */}
              <div className="text-right space-y-0.5 shrink-0">
                <div className="font-black text-[13px] text-white tabular-nums">
                  {trx.amount.toLocaleString("en-NG", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  <span className="text-[10px] text-gray-600 font-mono">
                    {trx.currency}
                  </span>
                </div>
                <div className="flex items-center justify-end gap-1.5">
                  <div
                    className="w-1 h-1 rounded-full"
                    style={{ background: color }}
                  />
                  <span
                    className="font-mono text-[9px] font-black uppercase tracking-widest"
                    style={{ color }}
                  >
                    {label} {trx.riskScore}%
                  </span>
                </div>
                <div className="font-mono text-[9px] text-gray-700">
                  {formatTimestamp(trx.timestamp)}
                </div>
              </div>
            </div>
          );
        })}

        {transactions.length === 0 && (
          <div className="py-24 flex flex-col items-center justify-center border border-dashed border-white/[0.05] rounded-2xl bg-[#0a0a0a] font-mono">
            <p className="text-[#008751] text-[10px] uppercase tracking-[0.3em] mb-2">
              {">"} STREAM_BUFFER: EMPTY
              <span className="animate-pulse">█</span>
            </p>
            <p className="text-gray-700 text-[9px] uppercase tracking-widest">
              Trigger a simulation burst to populate feed
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
