"use client";

import { useEcommerceSimulation } from "@/lib/ecommerce/simulation";
import LiveDemandStream from "@/components/ecommerce/LiveDemandStream";
import PricingArbitrageAlerts from "@/components/ecommerce/PricingArbitrageAlerts";
import InventoryMatrix from "@/components/ecommerce/InventoryMatrix";

export default function EcommerceIntelligenceLab() {
  const { skus, events, alerts, globalMetrics } = useEcommerceSimulation(1000); // 1 tick per second for speed

  return (
    <main className="dark min-h-screen bg-black text-white selection:bg-electric-lime selection:text-black">
      {/* Background scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.15) 2px, rgba(255,255,255,0.15) 4px)",
        }}
      />
      
      {/* Header Ambient glow */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#ccff00]/5 blur-[140px] rounded-full pointer-events-none z-0" />

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.05] bg-black/70 backdrop-blur-2xl px-6 md:px-12 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/lab" className="flex items-center gap-2 text-gray-500 hover:text-white transition-colors group">
              <div className="w-8 h-8 rounded-lg border border-white/[0.06] flex items-center justify-center group-hover:border-white/20 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </div>
            </a>
            <div className="w-px h-5 bg-white/[0.06]" />
            <div>
              <h1 className="text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                <span className="text-electric-lime">E-Commerce</span> Intelligence
              </h1>
              <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-0.5">
                Heuristic Pricing & Demand Engine
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-electric-lime/5 border border-electric-lime/20 rounded-full">
            <div className="w-1.5 h-1.5 rounded-full bg-electric-lime animate-pulse" />
            <span className="font-mono text-[9px] text-electric-lime uppercase font-bold tracking-widest">
              Simulation Active
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 relative z-10 flex flex-col gap-8 h-[calc(100vh-80px)]">
        
        {/* TOP ROW: Vital Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
          <div className="bg-[#050505] border border-white/5 rounded-2xl p-6 flex flex-col justify-between group hover:border-white/10 transition-colors">
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Active Carts</span>
             <div>
               <p className="text-4xl md:text-5xl font-black text-white group-hover:text-electric-lime transition-colors">
                 {globalMetrics.activeCarts}
               </p>
               <span className="text-[9px] font-mono text-gray-500 uppercase">Globally Tracked</span>
             </div>
          </div>
          <div className="bg-[#050505] border border-white/5 rounded-2xl p-6 flex flex-col justify-between group hover:border-white/10 transition-colors">
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">GMV Run Rate (1H)</span>
             <div>
               <p className="text-4xl md:text-5xl font-black text-white group-hover:text-electric-lime transition-colors">
                 {globalMetrics.gmvVelocity.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
               </p>
               <span className="text-[9px] font-mono text-gray-500 uppercase">Revenue Velocity</span>
             </div>
          </div>
          <div className="bg-[#050505] border border-white/5 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-electric-lime/10 blur-3xl pointer-events-none rounded-full" />
             <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Autonomic Actions Triggered</span>
             <div>
               <p className="text-4xl md:text-5xl font-black text-electric-lime drop-shadow-[0_0_15px_rgba(204,255,0,0.4)]">
                 {globalMetrics.arbitrageOpportunities}
               </p>
               <span className="text-[9px] font-mono text-gray-500 uppercase">Arbitrage Found</span>
             </div>
          </div>
        </section>

        {/* BOTTOM ROW: Matrix & Streams */}
        <section className="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-8 min-h-0 pb-12">
          
          {/* Left: Inventory Matrix (70%) */}
          <div className="lg:w-[65%] h-full">
            <InventoryMatrix skus={skus} />
          </div>

          {/* Right: Heuristic Streams (35%) */}
          <div className="lg:w-[35%] h-full flex flex-col gap-6">
            <div className="flex-1 min-h-0">
               <LiveDemandStream events={events} skus={skus} />
            </div>
            <div className="h-[250px] shrink-0 bg-[#050505] border border-white/10 rounded-3xl p-4 md:p-6 shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-20 overflow-hidden relative">
               <PricingArbitrageAlerts alerts={alerts} />
            </div>
          </div>

        </section>
      </div>
    </main>
  );
}
