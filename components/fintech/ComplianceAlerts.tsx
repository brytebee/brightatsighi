"use client";

import React, { useEffect, useState } from "react";

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
  { color: string; bg: string; border: string; glow: string }
> = {
  CRITICAL: {
    color: "#ff3366", // Radiant Crimson
    bg: "rgba(255,51,102,0.03)",
    border: "rgba(255,51,102,0.4)",
    glow: "rgba(255,51,102,0.2)",
  },
  HIGH: {
    color: "#ff8c00",
    bg: "rgba(255,140,0,0.03)",
    border: "rgba(255,140,0,0.3)",
    glow: "rgba(255,140,0,0.1)",
  },
  MEDIUM: {
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.02)",
    border: "rgba(245,158,11,0.15)",
    glow: "rgba(245,158,11,0.05)",
  },
  LOW: {
    color: "#00e676", // Cyber Emerald
    bg: "rgba(0,230,118,0.02)",
    border: "rgba(0,230,118,0.15)",
    glow: "rgba(0,230,118,0.02)",
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes pulseBorderCritical {
          0% { border-color: rgba(255,51,102,0.4); box-shadow: 0 0 0 transparent; }
          50% { border-color: #ff3366; box-shadow: 0 0 15px rgba(255,51,102,0.4); }
          100% { border-color: rgba(255,51,102,0.4); box-shadow: 0 0 0 transparent; }
        }
      `}} />
      <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-4 px-2 pb-2 border-b border-white/[0.05]">
        <div className="relative flex items-center justify-center w-2 h-2">
          <div className="absolute inset-0 rounded-full bg-[#ff3366] animate-ping opacity-75" />
          <div className="relative w-1.5 h-1.5 rounded-full bg-[#ff3366]" />
        </div>
        <h3 className="font-mono text-[11px] font-black uppercase tracking-[0.4em] text-white">
          Active Threats
        </h3>
        <div className="flex-1" />
        <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest bg-white/[0.05] px-2 py-1 rounded">
          {alerts.length} Detects
        </span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, i) => {
          const cfg = severityConfig[alert.severity] ?? severityConfig["MEDIUM"];
          const isCritical = alert.severity === "CRITICAL";

          return (
            <div
              key={alert.id}
              className={`group relative p-5 rounded-2xl transition-all duration-500 overflow-hidden backdrop-blur-2xl ${
                mounted ? "animate-[fadeInRight_0.4s_ease-out_forwards]" : "opacity-0"
              } ${isCritical ? "animate-[pulseBorderCritical_2s_infinite]" : ""}`}
              style={{
                background: cfg.bg,
                border: `1px solid ${cfg.border}`,
                boxShadow: `0 4px 20px ${cfg.glow}`,
                animationDelay: `${i * 100}ms`,
              }}
            >
              
              {/* Left severity indicator line */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px]"
                style={{ background: cfg.color, boxShadow: `0 0 10px ${cfg.color}80` }}
              />

              <div className="pl-3 space-y-4">
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-[9px] font-black uppercase tracking-[0.25em] px-2 py-1 rounded bg-black/50 border shadow-sm"
                      style={{
                        color: cfg.color,
                        borderColor: cfg.border,
                      }}
                    >
                      {alert.severity}
                    </span>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-white truncate max-w-[120px] sm:max-w-[200px]">
                      {alert.type}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-gray-500 shrink-0 tracking-widest bg-black/40 px-2 py-1 rounded">
                    {formatAlertTime(alert.timestamp)}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[13px] font-sans text-gray-400 leading-snug">
                  {alert.description}
                </p>

                {/* Footer details: score & action */}
                {alert.metadata?.riskScore && (
                  <div className="pt-3 border-t border-white/[0.05] flex items-center justify-between">
                    <div className="flex items-center gap-3 w-2/3">
                      <span className="font-mono text-[8px] text-gray-600 uppercase tracking-[0.2em] shrink-0">
                        Risk Level
                      </span>
                      <div className="flex-1 h-1.5 bg-black/80 rounded-full overflow-hidden border border-white/[0.05]">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${alert.metadata.riskScore}%`,
                            background: `linear-gradient(90deg, transparent, ${cfg.color})`,
                            boxShadow: `0 0 10px ${cfg.color}`,
                          }}
                        />
                      </div>
                      <span
                        className="font-mono text-[10px] font-black tabular-nums"
                        style={{ color: cfg.color }}
                      >
                        {alert.metadata.riskScore}%
                      </span>
                    </div>

                    <button
                      className="group/btn flex items-center gap-1 font-mono text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded bg-white/[0.02] border hover:bg-white/[0.05] transition-all"
                      style={{ borderColor: cfg.border, color: cfg.color }}
                    >
                      Investigate
                      <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {alerts.length === 0 && (
          <div className="py-16 flex flex-col items-center justify-center border border-dashed border-white/[0.05] rounded-2xl bg-white/[0.01] backdrop-blur-xl font-mono text-center space-y-4">
            <div className="w-8 h-8 rounded-full border border-[#00e676]/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#00e676]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-[#00e676] text-[10px] font-black uppercase tracking-[0.4em]">
                PERIMETER SECURE
              </p>
              <p className="text-gray-600 text-[9px] uppercase tracking-widest mt-1">
                Zero anomaly detects
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
