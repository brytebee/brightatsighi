"use client";

import React from "react";
import { SKU } from "@/lib/ecommerce/simulation";

export default function StockOverviewDonuts({ skus }: { skus?: SKU[] }) {
  const safeSkus = skus && skus.length > 0 ? skus : [];
  const total = safeSkus.length || 1;

  const inStock = safeSkus.filter((s) => s.stock > 20).length;
  const lowStock = safeSkus.filter((s) => s.stock <= 20 && s.stock > 0).length;
  const outOfStock = safeSkus.filter((s) => s.stock === 0).length;

  const data = [
    {
      label: "In Stock",
      value: Math.round((inStock / total) * 100) || 62,
      color: "#ccff00",
      glow: "rgba(204,255,0,0.5)",
    },
    {
      label: "Low Stock",
      value: Math.round((lowStock / total) * 100) || 15,
      color: "#eab308",
      glow: "rgba(234,179,8,0.5)",
    },
    {
      label: "Out of Stock",
      value: Math.round((outOfStock / total) * 100) || 23,
      color: "#ef4444",
      glow: "rgba(239,68,68,0.5)",
    },
  ];

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-4 bg-electric-lime rounded-full" />
        <h3 className="text-white text-sm font-semibold tracking-wide">Stock Overview</h3>
      </div>

      {/* Donuts */}
      <div className="flex-1 flex items-center justify-around">
        {data.map((item, index) => {
          const r = 38;
          const circ = 2 * Math.PI * r;
          const dashOffset = circ - (item.value / 100) * circ;

          return (
            <div key={index} className="flex flex-col items-center gap-3">
              {/* Ring */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                {/* Outer glow */}
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-25 pointer-events-none"
                  style={{ backgroundColor: item.color }}
                />
                <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                  <defs>
                    <filter id={`ring-glow-${index}`}>
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  {/* Track */}
                  <circle cx="48" cy="48" r={r} fill="none" stroke="#1c1c1c" strokeWidth="8" />
                  {/* Progress */}
                  <circle
                    cx="48"
                    cy="48"
                    r={r}
                    fill="none"
                    stroke={item.color}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circ}
                    strokeDashoffset={dashOffset}
                    filter={`url(#ring-glow-${index})`}
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                {/* Center value */}
                <span className="absolute text-[17px] font-black text-white font-mono z-10">
                  {item.value}%
                </span>
              </div>

              {/* Label */}
              <span className="text-[10px] font-mono text-gray-400 text-center leading-tight">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
