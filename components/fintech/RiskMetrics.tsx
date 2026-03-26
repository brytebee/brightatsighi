"use client";

import React from "react";

interface RiskMetricsProps {
  totalTransactions: number;
  avgRisk: number;
  activeAlerts: number;
  criticalCases: number;
}

const metrics = [
  {
    key: "totalTransactions" as keyof RiskMetricsProps,
    label: "Transactions Analyzed",
    sub: "Real-time units",
    accent: "#00e676", // Cybernetic Emerald
    format: (v: number) => v.toString(),
  },
  {
    key: "avgRisk" as keyof RiskMetricsProps,
    label: "Avg Risk Score",
    sub: "Aggregate heuristic",
    accent: "#ccff00", // Neon Chartreuse
    format: (v: number) => `${v.toFixed(1)}%`,
    danger: (v: number) => v > 70,
  },
  {
    key: "activeAlerts" as keyof RiskMetricsProps,
    label: "Active Alerts",
    sub: "Pending review",
    accent: "#f59e0b",
    format: (v: number) => v.toString(),
    danger: (v: number) => v > 0,
  },
  {
    key: "criticalCases" as keyof RiskMetricsProps,
    label: "Critical Cases",
    sub: "Immediate priority",
    accent: "#ff3366", // Radiant Crimson
    format: (v: number) => v.toString(),
    danger: (v: number) => v > 0,
  },
];

export default function RiskMetrics(props: RiskMetricsProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map(({ key, label, sub, accent, format, danger }, i) => {
        const value = props[key] as number;
        const isDanger = danger?.(value);
        const finalColor = isDanger ? "#ff3366" : accent;

        return (
          <div
            key={key}
            className="relative group p-6 bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-[1.5rem] overflow-hidden hover:border-white/[0.15] hover:bg-white/[0.04] transition-all duration-500 animate-[fadeIn_0.5s_ease-out_forwards]"
            style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}
          >
            {/* Top glowing edge */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[2px]"
              style={{ background: finalColor }}
            />

            {/* Corner ambient glow */}
            <div
              className="absolute -top-10 -right-10 w-32 h-32 blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-700 rounded-full pointer-events-none"
              style={{ background: finalColor }}
            />

            {/* Subtle rotating ring background element */}
            <div className="absolute top-1/2 -right-1/4 w-48 h-48 border border-white/[0.02] rounded-full border-dashed group-hover:rotate-[180deg] transition-transform duration-[3s] ease-out pointer-events-none" />
            <div className="absolute top-1/2 -right-1/4 w-32 h-32 border border-white/[0.01] rounded-full group-hover:-rotate-[180deg] transition-transform duration-[3s] ease-out pointer-events-none" />

            <div className="relative z-10 flex flex-col h-full justify-between space-y-4">
              {/* Terminal-style label */}
              <div className="flex items-center gap-2">
                <div
                  className={`w-1.5 h-1.5 rounded-sm ${
                    isDanger ? "animate-pulse" : ""
                  }`}
                  style={{ background: finalColor, boxShadow: `0 0 10px ${finalColor}80` }}
                />
                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-[0.25em]">
                  {label}
                </p>
              </div>

              {/* Value Box */}
              <div>
                <p
                  className="font-mono text-[40px] md:text-[48px] font-black leading-none tabular-nums tracking-tighter drop-shadow-lg"
                  style={{
                    color: "white",
                    textShadow: `0 0 30px ${finalColor}40`,
                  }}
                >
                  {format(value)}
                </p>
              </div>

              {/* Sub-label terminal output */}
              <div className="flex items-center gap-2 pt-2 border-t border-white/[0.05]">
                <span className="text-gray-600 font-mono text-[9px] uppercase tracking-widest">
                  {">"} {sub}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
}
