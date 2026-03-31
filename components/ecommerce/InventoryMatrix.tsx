"use client";

import { SKU } from "@/lib/ecommerce/simulation";

export default function InventoryMatrix({ skus }: { skus: SKU[] }) {
  return (
    <div className="bg-[#050505] border border-white/5 rounded-3xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-400">
           Heuristic Inventory Matrix
        </h3>
        <span className="text-[9px] font-mono text-electric-lime px-2 py-1 bg-electric-lime/10">
           ACTIVE SCAN
        </span>
      </div>

      <div className="overflow-x-auto w-full flex-1 custom-scrollbar">
        <table className="w-full text-left font-mono">
          <thead>
            <tr className="text-[9px] uppercase tracking-[0.2em] text-gray-600 border-b border-white/10">
              <th className="pb-4 font-black w-2/5">SKU / Designation</th>
              <th className="pb-4 font-black">Velocity</th>
              <th className="pb-4 font-black">Stock</th>
              <th className="pb-4 font-black w-1/4">Competitive Intel</th>
              <th className="pb-4 font-black text-right">Health Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-[11px] text-gray-300">
            {skus.sort((a,b) => b.healthScore - a.healthScore).map((sku) => (
              <tr key={sku.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="py-5 font-sans">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold text-white tracking-tight">{sku.name}</span>
                    <span className="text-[9px] font-mono text-gray-600 tracking-widest uppercase">
                       {sku.id} // {sku.category}
                    </span>
                  </div>
                </td>
                
                <td className="py-5">
                  <div className="flex items-center gap-2">
                    <span className="text-electric-lime">+{sku.velocity}</span>
                    <span className="text-[8px] text-gray-600">REQ/m</span>
                  </div>
                </td>
                
                <td className="py-5">
                  <span className={`${sku.stock < 10 ? 'text-red-500 font-bold' : 'text-gray-300'}`}>
                    {sku.stock} UNITS
                  </span>
                </td>
                
                <td className="py-5">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                       <span className="text-gray-500 line-through text-[9px]">
                         {sku.competitorPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                       </span>
                       <span className={`font-bold ${sku.price < sku.competitorPrice ? 'text-electric-lime' : sku.price > sku.competitorPrice ? 'text-red-500' : 'text-gray-300'}`}>
                         {sku.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                       </span>
                    </div>
                    {sku.competitorStockStatus === 'OUT_OF_STOCK' && (
                       <span className="text-[8px] font-black uppercase text-electric-lime px-1.5 py-0.5 border border-electric-lime/30 inline-block w-fit">
                         OPP: ADV. OUT OF STOCK
                       </span>
                    )}
                  </div>
                </td>

                <td className="py-5 text-right w-24">
                  <div className="flex flex-col items-end gap-1.5 w-full">
                     <span className={`font-black text-lg ${sku.healthScore > 75 ? 'text-electric-lime' : sku.healthScore > 50 ? 'text-orange-500' : 'text-red-500'}`}>
                       {sku.healthScore}
                     </span>
                     <div className="w-full h-1 bg-white/5 relative overflow-hidden flex justify-end">
                        <div 
                          className={`h-full ${sku.healthScore > 75 ? 'bg-electric-lime' : sku.healthScore > 50 ? 'bg-orange-500' : 'bg-red-500'}`}
                          style={{ width: `${sku.healthScore}%` }}
                        />
                     </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
