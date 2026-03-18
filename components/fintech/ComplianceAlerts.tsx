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

export default function ComplianceAlerts({ alerts }: { alerts: ComplianceAlert[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-white/10" />
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 whitespace-nowrap">
          Security & Compliance Alerts
        </h3>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-6 bg-black/40 border rounded-3xl transition-all duration-300 ${
              alert.severity === "CRITICAL"
                ? "border-red-500/50 bg-red-500/5"
                : "border-white/10 hover:border-white/20"
            }`}
          >
            <div className="flex items-start justify-between gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      alert.severity === "CRITICAL"
                        ? "bg-red-500 text-white"
                        : "bg-white/10 text-gray-400"
                    }`}
                  >
                    {alert.severity}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500">
                    {alert.type}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-300 leading-relaxed">
                  {alert.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {alert.metadata?.tags?.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-white/5 border border-white/5 text-[8px] font-mono text-gray-600"
                    >
                      #{tag.replace(/\s+/g, "_").toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-right">
                <div className="text-[10px] font-mono text-gray-600 uppercase">
                  {new Date(alert.timestamp).toLocaleTimeString()}
                </div>
                <button className="mt-4 text-[9px] font-black uppercase tracking-widest text-eagles-green hover:underline">
                  Investigate →
                </button>
              </div>
            </div>
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="py-20 text-center border border-dashed border-white/5 rounded-3xl bg-white/1">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
              No Active Perimeter Breaches
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
