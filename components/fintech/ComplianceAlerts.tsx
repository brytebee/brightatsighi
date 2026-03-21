"use client";

import React from "react";

interface ComplianceAlert {
  id: string;
  severity: string;
  type: string;
  description: string;
  metadata: any;
  resolved: boolean;
  timestamp: Date | string;
}

const severityConfig: Record<
  string,
  { color: string; bg: string; border: string; dot: string }
> = {
  CRITICAL: {
    color: "#ef4444",
    bg: "rgba(239,68,68,0.06)",
    border: "rgba(239,68,68,0.25)",
    dot: "bg-red-500",
  },
  HIGH: {
    color: "#f97316",
    bg: "rgba(249,115,22,0.05)",
    border: "rgba(249,115,22,0.2)",
    dot: "bg-orange-500",
  },
  MEDIUM: {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.04)",
    border: "rgba(245,158,11,0.15)",
    dot: "bg-yellow-500",
  },
  LOW: {
    color: "#008751",
    bg: "rgba(0,135,81,0.04)",
    border: "rgba(0,135,81,0.15)",
    dot: "bg-[#008751]",
  },
};

function formatAlertTime(ts: Date | string): string {
  try {
    const d = new Date(ts);
    const hh = String(d.getUTCHours()).padStart(2, "0");
    const mm = String(d.getUTCMinutes()).padStart(2, "0");
    const ss = String(d.getUTCSeconds()).padStart(2, "0");
    return `${hh}:${mm}:${ss} UTC`;
  } catch {
    return "--:--:-- UTC";
  }
}

export default function ComplianceAlerts({
  alerts,
}: {
  alerts: ComplianceAlert[];
}) {
  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="flex items-center gap-3 px-1">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        <h3 className="font-mono text-[10px] font-black uppercase tracking-[0.35em] text-red-500/80">
          Compliance Alerts
        </h3>
        <div className="h-px flex-1 bg-red-500/10" />
        <span className="font-mono text-[9px] text-gray-600 uppercase tracking-widest">
          {alerts.length} active
        </span>
      </div>

      <div className="space-y-2.5">
        {alerts.map((alert) => {
          const cfg =
            severityConfig[alert.severity] ?? severityConfig["MEDIUM"];
          return (
            <div
              key={alert.id}
              className="relative p-5 rounded-2xl border transition-all duration-300 overflow-hidden"
              style={{
                background: cfg.bg,
                borderColor: cfg.border,
              }}
            >
              {/* Left severity stripe */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[2.5px] rounded-r-full"
                style={{ background: cfg.color }}
              />

              <div className="pl-2 space-y-3">
                {/* Header row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {/* Severity badge */}
                    <span
                      className="font-mono text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border"
                      style={{
                        color: cfg.color,
                        borderColor: cfg.border,
                        background: cfg.bg,
                      }}
                    >
                      {alert.severity}
                    </span>
                    {/* Type */}
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-gray-600">
                      {alert.type}
                    </span>
                  </div>
                  {/* Timestamp */}
                  <span className="font-mono text-[9px] text-gray-700 shrink-0">
                    {formatAlertTime(alert.timestamp)}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[13px] font-medium leading-relaxed text-gray-300">
                  {alert.description}
                </p>

                {/* Tags */}
                {alert.metadata?.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {alert.metadata.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="font-mono text-[8px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.05] text-gray-600"
                      >
                        #{tag.replace(/\s+/g, "_")}
                      </span>
                    ))}
                  </div>
                )}

                {/* Risk score */}
                {alert.metadata?.riskScore && (
                  <div className="flex items-center justify-between pt-1 border-t border-white/[0.04]">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[9px] text-gray-600 uppercase tracking-widest">
                        Risk Score
                      </span>
                      <div className="flex-1 w-24 h-1 bg-white/[0.05] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${alert.metadata.riskScore}%`,
                            background: cfg.color,
                          }}
                        />
                      </div>
                      <span
                        className="font-mono text-[9px] font-black"
                        style={{ color: cfg.color }}
                      >
                        {alert.metadata.riskScore}%
                      </span>
                    </div>
                    <button
                      className="font-mono text-[9px] font-black uppercase tracking-widest hover:underline transition-colors"
                      style={{ color: cfg.color }}
                    >
                      Investigate →
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {alerts.length === 0 && (
          <div className="py-16 flex flex-col items-center justify-center border border-dashed border-white/[0.05] rounded-2xl bg-[#0a0a0a] font-mono text-center space-y-2">
            <div className="w-px h-8 bg-[#008751]/30 mx-auto" />
            <p className="text-[#008751]/60 text-[9px] uppercase tracking-[0.3em]">
              PERIMETER SECURE
            </p>
            <p className="text-gray-700 text-[9px] uppercase tracking-widest">
              No active breaches detected
            </p>
            <div className="w-px h-8 bg-[#008751]/30 mx-auto" />
          </div>
        )}
      </div>
    </div>
  );
}
