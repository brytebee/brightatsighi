"use client";

import React, { useEffect, useState, useRef } from "react";

export default function SalesPerformanceChart({ velocity }: { velocity: number }) {
  const [history, setHistory] = useState<{ sales: number; profit: number }[]>(() =>
    Array(12)
      .fill(0)
      .map((_, i) => ({
        sales: 80 + Math.sin(i * 0.8) * 40 + Math.random() * 20,
        profit: 50 + Math.sin(i * 0.6) * 20 + Math.random() * 15,
      }))
  );

  const prevVelocity = useRef(velocity);
  useEffect(() => {
    prevVelocity.current = velocity;
  }, [velocity]);

  useEffect(() => {
    const interval = setInterval(() => {
      setHistory((prev) => {
        const next = [...prev.slice(1)];
        const noise = Math.random() * 30 - 15;
        const signal = Math.min(155, Math.max(25, prev[prev.length - 1].sales + noise));
        const profit = Math.min(120, Math.max(15, signal * 0.65 + Math.random() * 15 - 7));
        next.push({ sales: signal, profit });
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const W = 400;
  const H = 160;
  const pad = { top: 10, right: 10, bottom: 10, left: 0 };
  const chartW = W - pad.left - pad.right;
  const chartH = H - pad.top - pad.bottom;

  const toX = (i: number) => pad.left + (i / (history.length - 1)) * chartW;
  const toY = (v: number) => pad.top + chartH - (v / 170) * chartH;

  const salesPoints = history.map((h, i) => `${toX(i)},${toY(h.sales)}`).join(" ");
  const profitPoints = history.map((h, i) => `${toX(i)},${toY(h.profit)}`).join(" ");
  const areaPoints = `${toX(0)},${H} ${salesPoints} ${toX(history.length - 1)},${H}`;

  const yLabels = ["20k", "15k", "10k", "5k"];

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-electric-lime rounded-full" />
          <h3 className="text-white text-sm font-semibold tracking-wide">Sales Performance</h3>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-electric-lime shadow-[0_0_4px_#ccff00]" />
            <span className="text-gray-400">Sales</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-0.5 bg-eagles-green" />
            <span className="text-gray-500">Profit</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="flex flex-1 gap-2 min-h-0">
        {/* Y axis */}
        <div className="flex flex-col justify-between text-[8px] text-gray-600 font-mono py-1 shrink-0">
          {yLabels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="flex-1">
          <defs>
            <linearGradient id="sales-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ccff00" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#ccff00" stopOpacity="0.01" />
            </linearGradient>
            <filter id="line-glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((t) => (
            <line
              key={t}
              x1={pad.left}
              y1={pad.top + chartH * t}
              x2={W - pad.right}
              y2={pad.top + chartH * t}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}

          {/* Area fill */}
          <polygon points={areaPoints} fill="url(#sales-area)" />

          {/* Profit line */}
          <polyline
            points={profitPoints}
            fill="none"
            stroke="#008751"
            strokeWidth="1.5"
            opacity="0.7"
          />

          {/* Sales line */}
          <polyline
            points={salesPoints}
            fill="none"
            stroke="#ccff00"
            strokeWidth="2"
            filter="url(#line-glow)"
          />

          {/* Sales data points */}
          {history.map((h, i) => (
            <circle
              key={i}
              cx={toX(i)}
              cy={toY(h.sales)}
              r="3"
              fill="#050505"
              stroke="#ccff00"
              strokeWidth="1.5"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}
