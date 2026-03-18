"use client";

import React from "react";

interface RiskMetricsProps {
  totalTransactions: number;
  avgRisk: number;
  activeAlerts: number;
  criticalCases: number;
}

export default function RiskMetrics({ totalTransactions, avgRisk, activeAlerts, criticalCases }: RiskMetricsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div className="relative group p-6 bg-white/2 border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500">
        <div className="absolute top-0 left-0 w-1 h-full bg-eagles-green opacity-40" />
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">
          Total Analyzed
        </div>
        <div className="text-3xl font-black text-white">{totalTransactions}</div>
        <div className="text-[9px] font-mono text-gray-600 mt-2 uppercase">Real-time Units</div>
      </div>

      <div className="relative group p-6 bg-white/2 border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500">
        <div className="absolute top-0 left-0 w-1 h-full bg-electric-lime opacity-40" />
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">
          System Risk
        </div>
        <div className={`text-3xl font-black ${avgRisk > 70 ? "text-red-500" : "text-electric-lime"}`}>
          {avgRisk.toFixed(1)}%
        </div>
        <div className="text-[9px] font-mono text-gray-600 mt-2 uppercase">Aggregate Score</div>
      </div>

      <div className="relative group p-6 bg-white/2 border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500">
        <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500 opacity-40" />
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">
          Active Alerts
        </div>
        <div className="text-3xl font-black text-white">{activeAlerts}</div>
        <div className="text-[9px] font-mono text-gray-600 mt-2 uppercase">Pending Review</div>
      </div>

      <div className="relative group p-6 bg-white/2 border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500">
        <div className="absolute top-0 left-0 w-1 h-full bg-red-600 opacity-40" />
        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-2">
          Critical Cases
        </div>
        <div className="text-3xl font-black text-red-500">{criticalCases}</div>
        <div className="text-[9px] font-mono text-gray-600 mt-2 uppercase">Immediate Priority</div>
      </div>
    </div>
  );
}
