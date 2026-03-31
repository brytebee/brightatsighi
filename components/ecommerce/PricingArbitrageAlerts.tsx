"use client";

import { ArbitrageAlert } from "@/lib/ecommerce/simulation";

export default function PricingArbitrageAlerts({ alerts }: { alerts: ArbitrageAlert[] }) {
  return (
    <div className="flex flex-col h-full space-y-4">
      <div className="p-1 pb-3 border-b border-white/10 flex items-center justify-between">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">
           Heuristic Actions
        </h3>
        <span className="text-[10px] font-mono text-electric-lime">{alerts.length} PENDING</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar pr-2">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            className={`p-4 rounded-xl border ${alert.type === 'OPPORTUNITY' ? 'border-electric-lime/20 bg-electric-lime/5' : 'border-red-500/20 bg-red-500/5'} group relative overflow-hidden`}
          >
            <div className={`absolute top-0 left-0 bottom-0 w-1 ${alert.type === 'OPPORTUNITY' ? 'bg-electric-lime' : 'bg-red-500'}`} />
            
            <div className="flex items-start justify-between mb-3">
              <span className={`text-[9px] font-black uppercase tracking-widest ${alert.type === 'OPPORTUNITY' ? 'text-electric-lime' : 'text-red-500'}`}>
                {alert.type}
              </span>
              <span className="text-[9px] font-mono text-gray-500">{new Date(alert.timestamp).toLocaleTimeString()}</span>
            </div>

            <p className="text-xs text-gray-300 font-medium leading-relaxed mb-4">
              {alert.message}
            </p>

            <button className={`w-full py-2.5 rounded-lg border text-[9px] font-black uppercase tracking-[0.2em] transition-all
              ${alert.type === 'OPPORTUNITY' 
                ? 'border-electric-lime/30 text-electric-lime hover:bg-electric-lime/10' 
                : 'border-red-500/30 text-red-500 hover:bg-red-500/10'}`}>
              {alert.action}
            </button>
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="h-40 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl text-gray-600">
             <span className="animate-spin text-electric-lime mb-2">⧗</span>
             <p className="text-[10px] uppercase font-black tracking-[0.2em]">All clear</p>
          </div>
        )}
      </div>
    </div>
  );
}
