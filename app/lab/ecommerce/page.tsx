"use client";

import { useEcommerceSimulation } from "@/lib/ecommerce/simulation";
import LiveDemandStream from "@/components/ecommerce/LiveDemandStream";
import InventoryMatrix from "@/components/ecommerce/InventoryMatrix";
import SalesPerformanceChart from "@/components/ecommerce/SalesPerformanceChart";
import PriceCompetitivenessChart from "@/components/ecommerce/PriceCompetitivenessChart";
import StockOverviewDonuts from "@/components/ecommerce/StockOverviewDonuts";

interface KpiCardProps {
  value: string;
  label: string;
  delta: string;
  accent?: boolean;
}

function KpiCard({ value, label, delta, accent }: KpiCardProps) {
  return (
    <div
      className={`relative bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-4 flex flex-col gap-2 group hover:border-white/20 transition-colors overflow-hidden ${
        accent ? "border-l-2 border-l-electric-lime" : ""
      }`}
    >
      {/* Ambient glow for accent card */}
      {accent && (
        <div className="absolute top-0 left-0 w-20 h-full bg-electric-lime/5 blur-xl pointer-events-none" />
      )}
      {/* Value */}
      <span className="text-[28px] md:text-[32px] font-black text-white tracking-tight leading-none">
        {value}
      </span>
      {/* Label + Delta */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-gray-500 font-medium">{label}</span>
        <span className="text-[10px] font-bold text-electric-lime flex items-center gap-0.5">
          ▲ {delta}
        </span>
      </div>
    </div>
  );
}

export default function EcommerceIntelligenceLab() {
  const { skus, events, globalMetrics } = useEcommerceSimulation(1000);

  return (
    <main className="dark min-h-screen bg-[#050505] text-white">
      {/* Scan-line texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 4px)",
        }}
      />
      {/* Ambient glow */}
      <div className="fixed top-[-15%] left-[-5%] w-[45%] h-[45%] bg-electric-lime/5 blur-[160px] rounded-full pointer-events-none z-0" />

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050505]/80 backdrop-blur-2xl px-6 md:px-10 py-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/lab"
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 text-gray-500 hover:text-white hover:border-white/25 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </a>
            <div className="w-px h-5 bg-white/10" />
            <div>
              <h1 className="text-[11px] font-black uppercase tracking-[0.3em]">
                <span className="text-electric-lime">E-Commerce</span> Intelligence Lab
              </h1>
              <p className="font-mono text-[9px] text-gray-600 uppercase tracking-widest mt-0.5">
                Heuristic Pricing &amp; Demand Engine
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-electric-lime/5 border border-electric-lime/20 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-lime animate-pulse" />
            <span className="font-mono text-[9px] text-electric-lime uppercase font-bold tracking-widest">
              Simulation Active
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 py-6 relative z-10 flex flex-col gap-5">

        {/* ROW 1 — KPI Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
          <KpiCard
            value={`$${globalMetrics.revenue.toLocaleString()}`}
            label="Revenue"
            delta={`${globalMetrics.revenueDelta.toFixed(1)}%`}
            accent
          />
          <KpiCard
            value={`${globalMetrics.profitMargin.toFixed(1)}%`}
            label="Profit Margin"
            delta={`${globalMetrics.profitDelta.toFixed(1)}%`}
          />
          <KpiCard
            value={`${globalMetrics.marketShare.toFixed(1)}%`}
            label="Market Share"
            delta={`${globalMetrics.marketShareDelta.toFixed(1)}%`}
          />
          <KpiCard
            value={`${globalMetrics.ecomIndex.toFixed(1)}`}
            label="E-Com Index"
            delta={`${globalMetrics.ecomIndexDelta.toFixed(1)}%`}
          />
        </section>

        {/* ROW 2 — Matrix & Stream */}
        <section className="flex flex-col lg:flex-row gap-4 shrink-0 lg:h-[420px]">
          <div className="lg:w-[62%] h-[380px] lg:h-full min-h-0 overflow-hidden">
            <InventoryMatrix skus={skus} />
          </div>
          <div className="lg:w-[38%] h-[380px] lg:h-full min-h-0 overflow-hidden">
            <LiveDemandStream events={events} skus={skus} />
          </div>
        </section>

        {/* ROW 3 — Charts */}
        <section className="flex flex-col lg:flex-row gap-4 shrink-0 lg:h-[260px]">
          <div className="flex-1 h-[240px] lg:h-full min-w-0">
            <SalesPerformanceChart velocity={globalMetrics.revenueDelta} />
          </div>
          <div className="flex-1 h-[240px] lg:h-full min-w-0">
            <PriceCompetitivenessChart skus={skus} />
          </div>
          <div className="flex-1 h-[240px] lg:h-full min-w-0">
            <StockOverviewDonuts skus={skus} />
          </div>
        </section>

      </div>
    </main>
  );
}
