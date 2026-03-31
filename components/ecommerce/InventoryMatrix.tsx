"use client";

import { SKU } from "@/lib/ecommerce/simulation";

// Renders 3 colored LED squares representing stock health visually
function StockLEDs({ stock }: { stock: number }) {
  // Three tiers: high (>100), medium (21–100), low (≤20)
  const high = stock > 100;
  const medium = stock > 20 && stock <= 100;
  const low = stock <= 20;

  const dots = [
    { active: high || medium || low, color: high ? "bg-electric-lime shadow-[0_0_4px_#ccff00]" : medium ? "bg-yellow-400 shadow-[0_0_4px_#facc15]" : "bg-red-500 shadow-[0_0_4px_#ef4444]" },
    { active: high || medium, color: high ? "bg-electric-lime shadow-[0_0_4px_#ccff00]" : medium ? "bg-yellow-400 shadow-[0_0_4px_#facc15]" : "bg-white/10" },
    { active: high, color: high ? "bg-electric-lime shadow-[0_0_4px_#ccff00]" : "bg-white/10" },
  ];

  return (
    <div className="flex items-center gap-1">
      {dots.map((dot, i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-[2px] ${dot.active ? dot.color : "bg-white/10"}`}
        />
      ))}
    </div>
  );
}

export default function InventoryMatrix({ skus }: { skus: SKU[] }) {
  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl h-full flex flex-col min-h-0">
      {/* Header */}
      <div className="shrink-0 flex items-center gap-2 px-5 py-4 border-b border-white/10">
        <div className="w-1 h-4 bg-electric-lime rounded-full" />
        <h3 className="text-white text-sm font-semibold tracking-wide">Inventory Matrix</h3>
      </div>

      {/* Scrollable table */}
      <div className="flex-1 overflow-auto min-h-0 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full">
        <table className="w-full text-left font-mono text-[11px] border-collapse">
          <thead>
            <tr className="text-gray-500 text-[10px] uppercase tracking-wider border-b border-white/10 sticky top-0 bg-[#0a0a0a] z-10">
              <th className="px-5 py-3 font-normal">Product</th>
              <th className="px-3 py-3 font-normal">Stock Level</th>
              <th className="px-3 py-3 font-normal">Velocity</th>
              <th className="px-3 py-3 font-normal">Health</th>
              <th className="px-3 py-3 font-normal text-right">Optimal Price</th>
              <th className="px-5 py-3 font-normal text-right">Current Price</th>
            </tr>
          </thead>
          <tbody>
            {skus.map((sku, idx) => {
              const velLabel = sku.velocity > 100 ? "High" : sku.velocity < 50 ? "Low" : "Medium";
              const velColor =
                sku.velocity > 100
                  ? "text-electric-lime"
                  : sku.velocity < 50
                  ? "text-red-400"
                  : "text-yellow-400";

              let healthLabel = "Strong";
              let healthClasses = "text-electric-lime border-electric-lime/40 bg-electric-lime/10";
              if (sku.healthScore >= 80) {
                healthLabel = "Strong";
                healthClasses = "text-electric-lime border-electric-lime/40 bg-electric-lime/10";
              } else if (sku.healthScore >= 60) {
                healthLabel = "Healthy";
                healthClasses = "text-green-400 border-green-400/40 bg-green-400/10";
              } else if (sku.healthScore >= 40) {
                healthLabel = "Moderate";
                healthClasses = "text-yellow-400 border-yellow-400/40 bg-yellow-400/10";
              } else if (sku.healthScore >= 20) {
                healthLabel = "At Risk";
                healthClasses = "text-orange-400 border-orange-400/40 bg-orange-400/10";
              } else {
                healthLabel = "Critical";
                healthClasses = "text-red-500 border-red-500/40 bg-red-500/10";
              }

              return (
                <tr
                  key={sku.id}
                  className={`border-b border-white/[0.05] hover:bg-white/[0.03] transition-colors ${
                    idx % 2 === 0 ? "" : "bg-white/[0.01]"
                  }`}
                >
                  {/* Product name */}
                  <td className="px-5 py-3.5 text-gray-200 font-sans font-medium text-[12px]">
                    {sku.name}
                  </td>

                  {/* Stock LEDs */}
                  <td className="px-3 py-3.5">
                    <StockLEDs stock={sku.stock} />
                  </td>

                  {/* Velocity */}
                  <td className={`px-3 py-3.5 font-semibold ${velColor}`}>
                    {velLabel}
                  </td>

                  {/* Health pill */}
                  <td className="px-3 py-3.5">
                    <span className={`px-2.5 py-0.5 rounded border text-[10px] font-bold tracking-wide ${healthClasses}`}>
                      {healthLabel}
                    </span>
                  </td>

                  {/* Optimal Price */}
                  <td className="px-3 py-3.5 text-right text-gray-400">
                    ${sku.optimalPrice.toFixed(2)}
                  </td>

                  {/* Current Price */}
                  <td className="px-5 py-3.5 text-right text-white font-bold">
                    ${sku.price.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
