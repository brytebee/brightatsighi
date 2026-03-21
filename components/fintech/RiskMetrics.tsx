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
    accent: "#008751",
    format: (v: number) => v.toString(),
  },
  {
    key: "avgRisk" as keyof RiskMetricsProps,
    label: "Avg Risk Score",
    sub: "Aggregate heuristic",
    accent: "#ccff00",
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
    accent: "#ef4444",
    format: (v: number) => v.toString(),
    danger: (v: number) => v > 0,
  },
];

export default function RiskMetrics(props: RiskMetricsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {metrics.map(({ key, label, sub, accent, format, danger }) => {
        const value = props[key] as number;
        const isDanger = danger?.(value);
        return (
          <div
            key={key}
            className="relative group p-5 md:p-6 bg-[#0a0a0a] border border-white/[0.05] rounded-[1.5rem] overflow-hidden hover:border-white/10 transition-all duration-500"
          >
            {/* Left accent bar */}
            <div
              className="absolute top-0 left-0 w-[2.5px] h-full rounded-r-full opacity-70"
              style={{ background: isDanger ? "#ef4444" : accent }}
            />

            {/* Corner accent glow */}
            <div
              className="absolute top-0 right-0 w-20 h-20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full"
              style={{ background: isDanger ? "rgba(239,68,68,0.1)" : `${accent}18` }}
            />

            <div className="relative z-10 space-y-2">
              {/* Terminal-style label */}
              <p className="font-mono text-[9px] text-gray-600 uppercase tracking-[0.3em]">
                {label}
              </p>

              {/* Value */}
              <p
                className="text-[32px] md:text-[36px] font-black leading-none tabular-nums"
                style={{ color: isDanger ? "#ef4444" : "white" }}
              >
                {format(value)}
              </p>

              {/* Sub-label */}
              <div className="flex items-center gap-2 pt-1">
                <div
                  className="w-1 h-1 rounded-full"
                  style={{ background: isDanger ? "#ef4444" : accent }}
                />
                <p className="font-mono text-[9px] text-gray-600 uppercase tracking-widest">
                  {sub}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
