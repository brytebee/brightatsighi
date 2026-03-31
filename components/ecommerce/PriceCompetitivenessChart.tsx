"use client";

import React from "react";
import { SKU } from "@/lib/ecommerce/simulation";

export default function PriceCompetitivenessChart({ skus }: { skus?: SKU[] }) {
  const safeSkus = skus && skus.length > 0 ? skus : [];
  const topSkus = [...safeSkus].sort((a, b) => b.velocity - a.velocity).slice(0, 3);

  const allPrices = topSkus.flatMap((s) => [s.price, s.competitorPrice, s.competitorPrice * 1.15]);
  const maxPrice = Math.max(...(allPrices.length ? allPrices : [100])) * 1.15;

  const barGroups =
    topSkus.length >= 3
      ? topSkus.map((s) => ({
          label: s.name,
          bars: [
            (s.price / maxPrice) * 140,
            (s.competitorPrice / maxPrice) * 140,
            ((s.competitorPrice * 1.15) / maxPrice) * 140,
          ],
        }))
      : [
          { label: "Product A", bars: [105, 120, 115] },
          { label: "Product B", bars: [85, 90, 95] },
          { label: "Product C", bars: [140, 135, 150] },
        ];

  const W = 400;
  const H = 160;
  const groupW = W / barGroups.length;
  const barW = 14;
  const gap = 5;
  const baseY = H - 20;

  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-4 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-eagles-green rounded-full" />
          <h3 className="text-white text-sm font-semibold tracking-wide">Price Competitiveness</h3>
        </div>
        <div className="flex items-center gap-3 text-[9px] font-mono">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-eagles-green inline-block" /> Your Price</span>
          <span className="flex items-center gap-1 text-gray-500"><span className="w-2 h-2 rounded-sm bg-electric-lime inline-block" /> Comp. A</span>
          <span className="flex items-center gap-1 text-gray-600"><span className="w-2 h-2 rounded-sm bg-[#88aa00] inline-block" /> Comp. B</span>
        </div>
      </div>

      <div className="flex-1 relative min-h-0">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="pc-bar1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#008751" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#008751" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="pc-bar2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ccff00" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ccff00" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="pc-bar3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#88aa00" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#88aa00" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines */}
          {[0.33, 0.66, 1.0].map((t) => (
            <line
              key={t}
              x1="0" y1={baseY - t * 130} x2={W} y2={baseY - t * 130}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}

          {/* Bars + Labels */}
          {barGroups.map((group, gi) => {
            const centerX = gi * groupW + groupW / 2;
            const startX = centerX - (barW * 3 + gap * 2) / 2;

            return (
              <g key={gi}>
                {group.bars.map((h, bi) => (
                  <rect
                    key={bi}
                    x={startX + bi * (barW + gap)}
                    y={baseY - h}
                    width={barW}
                    height={h}
                    fill={`url(#pc-bar${bi + 1})`}
                    rx="2"
                  />
                ))}
                <text
                  x={centerX}
                  y={H - 4}
                  textAnchor="middle"
                  fontSize="8"
                  fill="rgba(156,163,175,0.8)"
                  fontFamily="monospace"
                >
                  {group.label}
                </text>
              </g>
            );
          })}

          {/* Baseline */}
          <line x1="0" y1={baseY} x2={W} y2={baseY} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}
